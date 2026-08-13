/**
 * Guardianship Audience Composer — Core Architecture
 *
 * Turns a GuardianshipNarrativeModel into audience-specific document plans.
 *
 * ONE TRUTH, MULTIPLE USEFUL VIEWS.
 *
 * The Composer:
 *   - selects relevant blocks via relevance routing
 *   - orders and groups them into sections
 *   - omits irrelevant material (dynamic omission)
 *   - controls repetition (full explanation once + cross-reference elsewhere)
 *   - preserves evidence, limitations, and parent voice on every block
 *   - never reads questionnaire answers directly
 *
 * The Composer does NOT:
 *   - interpret raw questionnaire answers
 *   - invent new conclusions
 *   - change evidence types
 *   - resolve legal uncertainty
 *   - design the final PDF
 */

import type {
  GuardianshipNarrativeModel,
  NarrativeBlock,
  GuardianshipChildNarrative,
  GuardianshipAudience,
  NarrativeImportance,
  NarrativeSourceType,
  ImmediateActionNarrative,
  QuickReferenceItem,
  ReadinessNarrative,
} from './guardianshipNarrativeTypes';
import type { ClarifyReviewItem, OutputEvidence, NarrativeLimitation, NextAction, VerificationType, LimitationImportance } from './outputConfidenceTypes';

// ─── Audience Document Contract ──────────────────────────────────────────────

export interface AudienceDocumentMetadata {
  familyName?: string;
  generatedAt?: string;
  sourceModelVersion?: string;
}

export interface GuardianshipAudienceSection {
  id: string;
  heading: string;
  purpose?: string;
  priority: NarrativeImportance;
  blocks: NarrativeBlock[];
  childIds?: string[];
  collapsibleInUI?: boolean;
}

export interface GuardianshipAudienceDocument {
  audience: GuardianshipAudience;
  title: string;
  purpose: string;
  sections: GuardianshipAudienceSection[];
  quickReference?: QuickReferenceItem[];
  reviewItems?: ClarifyReviewItem[];
  limitations?: ClarifyReviewItem[];
  metadata?: AudienceDocumentMetadata;
}

// ─── Section Blueprint ────────────────────────────────────────────────────────
//
// A blueprint declares what a section *should* contain. The composer
// resolves each blueprint against the filtered narrative and omits
// sections that end up empty (dynamic omission).

interface SectionBlueprint {
  id: string;
  heading: string;
  purpose?: string;
  priority: NarrativeImportance;
  /** Which narrative areas to pull blocks from, in order. */
  sources: SectionSource[];
  /** Optional: only include blocks matching these child IDs. */
  childIds?: string[];
  collapsibleInUI?: boolean;
}

type SectionSource =
  | { area: 'familyContext' }
  | { area: 'guardianPlan' }
  | { area: 'familyRoles' }
  | { area: 'financialResources' }
  | { area: 'fundingPhilosophy' }
  | { area: 'coordination' }
  | { area: 'documents' }
  | { area: 'readiness'; subsection: 'decisionsMade' | 'thingsWorthConfirming' | 'thingsStillToDo' }
  | { area: 'children'; subsection?: keyof Pick<GuardianshipChildNarrative, 'introduction' | 'education' | 'healthcare' | 'supportTransition' | 'peopleAndConnections' | 'activities' | 'communitiesAndTraditions' | 'inheritance' | 'adultTransition'> }
  | { area: 'immediateActions' };

// ─── Relevance Routing ────────────────────────────────────────────────────────
//
// Audience tags are the starting point but not sufficient. The router also
// considers block type, importance, evidence type, limitations, and
// professional-review routing to make a final relevance decision.

/**
 * Determine whether a narrative block is relevant to a given audience.
 *
 * Routing considers:
 *   1. Explicit audience tags (if present, they are authoritative)
 *   2. Block type + importance (readiness items route differently)
 *   3. Evidence type (professional-review items route to the relevant professional)
 *   4. Limitation metadata (limitations with a reviewerType route to that reviewer)
 *   5. Privacy / need-to-know (emotional/personal content not sent to professionals
 *      unless it has a professional-review limitation)
 */
export function isNarrativeRelevantToAudience(
  block: NarrativeBlock,
  audience: GuardianshipAudience
): boolean {
  // 1. If the block has explicit audience tags, respect them.
  if (block.audiences && block.audiences.length > 0) {
    return block.audiences.includes(audience);
  }

  // 2. Blocks without audience tags default to client + guardian only.
  //    Professionals only receive untagged blocks if they carry a
  //    professional-review limitation or evidence type.
  if (audience === 'client' || audience === 'guardian') {
    return true;
  }

  // 3. For professionals, check whether the block has professional-review routing.
  if (audience === 'estateLawyer') {
    return hasProfessionalReviewRouting(block, 'estateLawyer', 'lawyer');
  }

  if (audience === 'accountant') {
    return hasProfessionalReviewRouting(block, 'accountant');
  }

  // 4. Trustee audiences: receive blocks about inheritance, documents, and
  //    financial resources even without explicit tags.
  if (audience === 'estateTrustee' || audience === 'inheritanceTrustee' || audience === 'attorneyForProperty') {
    return block.type === 'crossReference'
      || block.sourceType === 'professionalReview'
      || !!block.limitation;
  }

  return false;
}

function hasProfessionalReviewRouting(
  block: NarrativeBlock,
  ...reviewerTypes: VerificationType[]
): boolean {
  // Check limitation reviewerType
  if (block.limitation?.reviewerType && reviewerTypes.includes(block.limitation.reviewerType)) {
    return true;
  }

  // Check evidence verificationType
  if (block.evidence?.verificationType && reviewerTypes.includes(block.evidence.verificationType)) {
    return true;
  }

  // professionalReview source type alone is not sufficient — it must also
  // have a reviewer routing (limitation.reviewerType or evidence.verificationType)
  // matching one of the requested reviewer types. Otherwise the block is
  // a generic professional-review item that goes to the client only.

  // Check nextAction for reviewer hints
  if (block.nextAction?.description) {
    const desc = block.nextAction.description.toLowerCase();
    if (reviewerTypes.includes('estateLawyer') || reviewerTypes.includes('lawyer')) {
      if (desc.includes('lawyer') || desc.includes('estate') || desc.includes('legal')) return true;
    }
    if (reviewerTypes.includes('accountant')) {
      if (desc.includes('accountant') || desc.includes('tax') || desc.includes('financial')) return true;
    }
  }

  return false;
}

// ─── Repetition Control ───────────────────────────────────────────────────────
//
// The composer tracks which blocks have already been fully explained.
// Subsequent sections receive a cross-reference instead of repeating the
// full content.

interface RepetitionTracker {
  /** Block IDs that have been fully rendered. */
  explained: Set<string>;
  /** Rule IDs that have been fully explained, keyed by section id. */
  explainedRulesBySection: Map<string, Set<string>>;
  /** The current section being resolved. */
  currentSectionId: string | null;
}

function createRepetitionTracker(): RepetitionTracker {
  return { explained: new Set(), explainedRulesBySection: new Map(), currentSectionId: null };
}

/**
 * If a block's rule has already been fully explained in a DIFFERENT section,
 * return a compact cross-reference block instead of the full original.
 * Blocks within the same section are never collapsed (e.g. multiple children
 * with the same SCHOOL-01 rule should all show in full).
 */
function applyRepetitionControl(
  block: NarrativeBlock,
  tracker: RepetitionTracker
): NarrativeBlock {
  if (
    tracker.currentSectionId
    && block.importance !== 'primary'
    && block.type !== 'parentVoice'
  ) {
    // Check if this rule was explained in a DIFFERENT section
    let explainedElsewhere = false;
    for (const [sectionId, rules] of tracker.explainedRulesBySection) {
      if (sectionId !== tracker.currentSectionId && rules.has(block.ruleId)) {
        explainedElsewhere = true;
        break;
      }
    }

    if (explainedElsewhere) {
      return {
        ...block,
        type: 'crossReference',
        body: block.heading
          ? `See "${block.heading}" above for details.`
          : 'See above for details.',
        bullets: undefined,
        importance: 'reference',
      };
    }
  }

  // Mark as explained if it's a primary or important block
  if (block.importance === 'primary' || block.importance === 'important') {
    tracker.explained.add(block.id);
    if (tracker.currentSectionId) {
      let rules = tracker.explainedRulesBySection.get(tracker.currentSectionId);
      if (!rules) {
        rules = new Set();
        tracker.explainedRulesBySection.set(tracker.currentSectionId, rules);
      }
      rules.add(block.ruleId);
    }
  }

  return block;
}

// ─── Block Integrity Preservation ─────────────────────────────────────────────
//
// Every composed block must retain its evidence, limitation, nextAction,
// and source metadata. The composer never strips these fields.

function preserveBlockIntegrity(block: NarrativeBlock): NarrativeBlock {
  // Ensure evidence, limitation, and nextAction are never dropped.
  // This is a passthrough — the function exists to make the contract explicit
  // and to serve as a hook if future transformations need to preserve metadata.
  return {
    ...block,
    evidence: block.evidence,
    limitation: block.limitation,
    nextAction: block.nextAction,
    sourceType: block.sourceType,
    ruleId: block.ruleId,
  };
}

// ─── Dynamic Omission ─────────────────────────────────────────────────────────
//
// If resolving a section blueprint produces zero blocks, the section is
// omitted entirely. No empty headings.

function resolveSection(
  blueprint: SectionBlueprint,
  narrative: GuardianshipNarrativeModel,
  audience: GuardianshipAudience,
  tracker: RepetitionTracker
): GuardianshipAudienceSection | null {
  tracker.currentSectionId = blueprint.id;
  const blocks: NarrativeBlock[] = [];

  for (const source of blueprint.sources) {
    const sourceBlocks = extractBlocks(narrative, source);
    for (const block of sourceBlocks) {
      if (!isNarrativeRelevantToAudience(block, audience)) continue;
      if (blueprint.childIds && block.childIds) {
        if (!block.childIds.some(id => blueprint.childIds!.includes(id))) continue;
      }
      const controlled = applyRepetitionControl(block, tracker);
      blocks.push(preserveBlockIntegrity(controlled));
    }
  }

  if (blocks.length === 0) return null;

  return {
    id: blueprint.id,
    heading: blueprint.heading,
    purpose: blueprint.purpose,
    priority: blueprint.priority,
    blocks,
    childIds: blueprint.childIds,
    collapsibleInUI: blueprint.collapsibleInUI,
  };
}

function extractBlocks(
  narrative: GuardianshipNarrativeModel,
  source: SectionSource
): NarrativeBlock[] {
  switch (source.area) {
    case 'familyContext':
      return narrative.familyContext;
    case 'guardianPlan':
      return narrative.guardianPlan;
    case 'familyRoles':
      return narrative.familyRoles;
    case 'financialResources':
      return narrative.financialResources;
    case 'fundingPhilosophy':
      return narrative.fundingPhilosophy;
    case 'coordination':
      return narrative.coordination;
    case 'documents':
      return narrative.documents;
    case 'readiness':
      return narrative.readiness[source.subsection];
    case 'immediateActions':
      // Immediate actions are not NarrativeBlock[] — they're ImmediateActionNarrative[].
      // We don't convert them here; sections using this source are handled specially
      // in the composer. Return empty so the blueprint resolver skips them.
      return [];
    case 'children': {
      if (!source.subsection) {
        // Flatten all child subsections
        return narrative.children.flatMap(c =>
          [
            ...(c.introduction || []),
            ...(c.education || []),
            ...(c.healthcare || []),
            ...(c.supportTransition || []),
            ...(c.peopleAndConnections || []),
            ...(c.activities || []),
            ...(c.communitiesAndTraditions || []),
            ...(c.inheritance || []),
            ...(c.adultTransition || []),
          ]
        );
      }
      return narrative.children.flatMap(c => c[source.subsection!] || []);
    }
    default:
      return [];
  }
}

// ─── Quick Reference Filtering ────────────────────────────────────────────────

function filterQuickReference(
  items: QuickReferenceItem[],
  audience: GuardianshipAudience
): QuickReferenceItem[] {
  // All audiences get role and document items.
  // Client gets everything.
  // Guardian gets person + document + role (not financial details).
  // Lawyer gets document + role.
  // Accountant gets financial + document + role.
  switch (audience) {
    case 'client':
      return items;
    case 'guardian':
      return items.filter(i => i.category !== 'financial');
    case 'estateLawyer':
      return items.filter(i => i.category === 'document' || i.category === 'role');
    case 'accountant':
      return items.filter(i => i.category === 'financial' || i.category === 'document' || i.category === 'role');
    default:
      return items.filter(i => i.category === 'document' || i.category === 'role');
  }
}

// ─── Review Items & Limitations Filtering ─────────────────────────────────────

function filterReviewItems(
  items: ClarifyReviewItem[] | undefined,
  audience: GuardianshipAudience
): ClarifyReviewItem[] | undefined {
  if (!items || items.length === 0) return undefined;

  return items.filter(item => {
    // Route based on verificationType
    if (audience === 'estateLawyer') {
      return item.verificationType === 'estateLawyer'
        || item.verificationType === 'lawyer'
        || item.evidence.limitationReason === 'legalInterpretationRequired'
        || item.evidence.verificationType === 'estateLawyer';
    }
    if (audience === 'accountant') {
      return item.verificationType === 'accountant'
        || item.evidence.limitationReason === 'taxInterpretationRequired'
        || item.evidence.verificationType === 'accountant';
    }
    // Client and guardian see all review items
    return true;
  });
}

function filterLimitations(
  limitations: ClarifyReviewItem[] | undefined,
  audience: GuardianshipAudience
): ClarifyReviewItem[] | undefined {
  if (!limitations || limitations.length === 0) return undefined;
  return filterReviewItems(limitations, audience);
}

// ─── Section Blueprint Registry ───────────────────────────────────────────────
//
// The generic blueprint set covers the common narrative areas. Future
// audience-specific strategies will extend or override these. For now,
// this provides the architecture and a sensible default ordering.

const DEFAULT_BLUEPRINTS: SectionBlueprint[] = [
  {
    id: 'family-context',
    heading: 'Family Context',
    priority: 'primary',
    sources: [{ area: 'familyContext' }],
  },
  {
    id: 'guardian-plan',
    heading: 'Guardian Plan',
    priority: 'primary',
    sources: [{ area: 'guardianPlan' }],
  },
  {
    id: 'children',
    heading: 'Children',
    priority: 'primary',
    sources: [{ area: 'children' }],
  },
  {
    id: 'family-roles',
    heading: 'Who Does What',
    priority: 'important',
    sources: [{ area: 'familyRoles' }],
  },
  {
    id: 'financial-resources',
    heading: 'Financial Resources',
    priority: 'important',
    sources: [{ area: 'financialResources' }],
  },
  {
    id: 'funding-philosophy',
    heading: 'Funding Philosophy',
    priority: 'important',
    sources: [{ area: 'fundingPhilosophy' }],
  },
  {
    id: 'coordination',
    heading: 'Working Together',
    priority: 'important',
    sources: [{ area: 'coordination' }],
  },
  {
    id: 'documents',
    heading: 'Documents',
    priority: 'supporting',
    sources: [{ area: 'documents' }],
  },
  {
    id: 'readiness',
    heading: 'Readiness',
    priority: 'important',
    sources: [
      { area: 'readiness', subsection: 'decisionsMade' },
      { area: 'readiness', subsection: 'thingsWorthConfirming' },
      { area: 'readiness', subsection: 'thingsStillToDo' },
    ],
  },
];

// ─── Main Composer ────────────────────────────────────────────────────────────

export interface ComposeOptions {
  clientNames?: string[];
  reportDate?: Date;
  /** Override the default blueprint set with audience-specific blueprints. */
  blueprints?: SectionBlueprint[];
  /** Additional review items from the roadmap model. */
  reviewItems?: ClarifyReviewItem[];
  /** Additional limitations from the roadmap model. */
  limitations?: ClarifyReviewItem[];
}

/**
 * Compose a GuardianshipAudienceDocument from the narrative model.
 *
 * This is the core architecture. Audience-specific section ordering,
 * emphasis, and omission will be implemented in the next task by
 * providing audience-specific blueprints.
 */
export function composeGuardianshipForAudience(
  narrativeModel: GuardianshipNarrativeModel,
  audience: GuardianshipAudience,
  options?: ComposeOptions
): GuardianshipAudienceDocument {
  const blueprints = options?.blueprints || DEFAULT_BLUEPRINTS;
  const tracker = createRepetitionTracker();

  const sections: GuardianshipAudienceSection[] = [];
  for (const blueprint of blueprints) {
    const section = resolveSection(blueprint, narrativeModel, audience, tracker);
    if (section) sections.push(section);
  }

  // Immediate actions: convert to a section if any exist and are relevant
  if (narrativeModel.immediateActions.length > 0) {
    const actionsSection = buildImmediateActionsSection(narrativeModel.immediateActions, audience);
    if (actionsSection) sections.push(actionsSection);
  }

  // Quick reference
  const quickRef = filterQuickReference(narrativeModel.quickReference, audience);
  const filteredQuickRef = quickRef.length > 0 ? quickRef : undefined;

  // Review items and limitations
  const reviewItems = filterReviewItems(options?.reviewItems, audience);
  const limitations = filterLimitations(options?.limitations, audience);

  // Metadata
  const metadata: AudienceDocumentMetadata = {
    familyName: options?.clientNames?.join(' & '),
    generatedAt: (options?.reportDate || new Date()).toISOString(),
    sourceModelVersion: 'guardianship-v1',
  };

  // Title and purpose are placeholder defaults for the architecture.
  // Audience-specific titles will be set in the next task.
  const titleMap: Record<GuardianshipAudience, string> = {
    client: 'Your Guardianship Roadmap',
    guardian: 'Guardianship Roadmap',
    estateLawyer: 'Guardianship Roadmap — Professional Review',
    accountant: 'Guardianship Roadmap — Professional Review',
    estateTrustee: 'Guardianship Roadmap — Trustee Review',
    inheritanceTrustee: 'Guardianship Roadmap — Trustee Review',
    attorneyForProperty: 'Guardianship Roadmap — Attorney Review',
  };

  const purposeMap: Record<GuardianshipAudience, string> = {
    client: 'A complete picture of your plan and what remains to be done.',
    guardian: 'What you need to know, who to call, and how the parents want you to approach this.',
    estateLawyer: 'Professional review of the guardianship plan, trust structures, and legal readiness.',
    accountant: 'Financial resources, funding approach, and tax-related considerations.',
    estateTrustee: 'Your responsibilities and the context you need to carry them out.',
    inheritanceTrustee: 'Your responsibilities and the context you need to carry them out.',
    attorneyForProperty: 'Your responsibilities and the context you need to carry them out.',
  };

  return {
    audience,
    title: titleMap[audience],
    purpose: purposeMap[audience],
    sections,
    quickReference: filteredQuickRef,
    reviewItems,
    limitations,
    metadata,
  };
}

// ─── Immediate Actions Section Builder ────────────────────────────────────────

function buildImmediateActionsSection(
  actions: ImmediateActionNarrative[],
  audience: GuardianshipAudience
): GuardianshipAudienceSection | null {
  // Immediate actions are relevant to client and guardian.
  // For professionals, only include if they involve a professional next step.
  let relevant: ImmediateActionNarrative[];

  if (audience === 'client' || audience === 'guardian') {
    relevant = actions;
  } else {
    // For professionals, only include actions that reference them
    relevant = actions.filter(a => {
      const text = `${a.heading} ${a.body}`.toLowerCase();
      if (audience === 'estateLawyer') return text.includes('lawyer') || text.includes('legal') || text.includes('estate');
      if (audience === 'accountant') return text.includes('accountant') || text.includes('tax') || text.includes('financial');
      return false;
    });
  }

  if (relevant.length === 0) return null;

  // Convert ImmediateActionNarrative to NarrativeBlock for the section
  const blocks: NarrativeBlock[] = relevant.map(a => ({
    id: a.id,
    ruleId: a.ruleId,
    type: 'action',
    heading: a.heading,
    body: a.body,
    childIds: a.childNames.length > 0 ? undefined : undefined, // childNames are text, not IDs
    importance: a.priority <= 3 ? 'primary' : a.priority <= 6 ? 'important' : 'supporting',
    sourceType: a.isParentWish ? 'parentPreference' : 'derived',
  }));

  return {
    id: 'immediate-actions',
    heading: 'If Something Happened Tomorrow',
    purpose: 'The first steps, in priority order',
    priority: 'primary',
    blocks,
  };
}

// ─── Public Exports for Future Audience Strategies ────────────────────────────

export type { SectionBlueprint, SectionSource };
export { DEFAULT_BLUEPRINTS };
