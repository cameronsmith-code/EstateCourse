/**
 * Guardianship Enum Humanization
 *
 * Centralized interpretation of guardianship structured values into
 * natural language.  No raw enum value, snake_case key, or internal ID
 * should ever reach human-facing output.
 *
 * These functions are used by the Narrative Builder and the Document
 * Builder — NOT by the renderers.  The renderers consume only
 * pre-humanized ClarifyDocument content.
 */

// ─── Relationship continuity types ────────────────────────────────────────────

const CONTINUITY_LABELS: Record<string, string> = {
  playdates_visits: 'play dates and visits',
  weekend_visits: 'weekend visits',
  sleepovers: 'sleepovers',
  shared_activity: 'shared activities',
  camp_together: 'summer camp together',
  birthdays_occasions: 'birthday celebrations and special occasions',
  video_calls: 'video calls to stay connected between visits',
  gaming_online: 'gaming and online connection',
  contact_friend_parents: 'staying in touch with the friend\'s parents',
  regular_sibling: 'regular sibling-style time together',
};

export function humanizeContinuityIdeas(ideas: string[]): string[] {
  return ideas.map(i => CONTINUITY_LABELS[i] || humanizeSnakeCase(i));
}

export function interpretContinuityParagraph(
  ideas: string[],
  childName: string,
  personName: string,
  parentLabel: string
): string {
  if (ideas.length === 0) return '';
  const humanized = humanizeContinuityIdeas(ideas);
  if (humanized.length === 1) {
    return `${parentLabel} would hope ${personName} helps preserve that connection through ${humanized[0]}.`;
  }
  if (humanized.length === 2) {
    return `${parentLabel} would hope ${personName} makes a deliberate effort to keep ${childName} connected to ${personName} through ${humanized[0]} and ${humanized[1]}.`;
  }
  const last = humanized.pop()!;
  return `${parentLabel} would hope ${personName} helps keep ${childName} in ${childName}'s life through ${humanized.join(', ')}, and ${last}.`;
}

// ─── Connection relationship types ────────────────────────────────────────────

const RELATIONSHIP_TYPE_LABELS: Record<string, string> = {
  friend: 'a friend',
  family_member: 'a family member',
  extended_family: 'extended family',
  coach: 'a coach',
  teacher: 'a teacher',
  mentor: 'a mentor',
  neighbour: 'a neighbour',
  teammate: 'a teammate',
  camp_friend: 'a camp friend',
  best_friend: 'a best friend',
  sibling: 'a sibling',
  cousin: 'a cousin',
  grandparent: 'a grandparent',
};

export function humanizeRelationshipTypes(types: string[]): string {
  if (types.length === 0) return 'an important person';
  const labels = types.map(t => RELATIONSHIP_TYPE_LABELS[t] || humanizeSnakeCase(t));
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  const last = labels.pop()!;
  return `${labels.join(', ')}, and ${last}`;
}

// ─── Connection contexts ──────────────────────────────────────────────────────

const CONTEXT_LABELS: Record<string, string> = {
  school: 'school',
  sports: 'sports',
  neighbourhood: 'their neighbourhood',
  camp: 'camp',
  family_gatherings: 'family gatherings',
  church: 'church',
  community_program: 'a community program',
  online: 'online communities',
  daycare: 'daycare',
  extended_family: 'extended family connections',
};

export function humanizeContexts(contexts: string[]): string {
  if (contexts.length === 0) return 'shared experiences';
  const labels = contexts.map(c => CONTEXT_LABELS[c] || humanizeSnakeCase(c));
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  const last = labels.pop()!;
  return `${labels.join(', ')}, and ${last}`;
}

// ─── Tradition participant types ──────────────────────────────────────────────

const PARTICIPANT_LABELS: Record<string, string> = {
  sibling: 'siblings',
  close_friend: 'close friends',
  grandparents: 'grandparents',
  cousin: 'cousins',
  extended_family: 'extended family',
  parents: 'parents',
  teammates: 'teammates',
  coach: 'coaches',
  neighbour: 'neighbours',
  community_group: 'community groups',
};

export function humanizeParticipantTypes(types: string[]): string {
  if (types.length === 0) return 'family and friends';
  const labels = types.map(t => PARTICIPANT_LABELS[t] || humanizeSnakeCase(t));
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  const last = labels.pop()!;
  return `${labels.join(', ')}, and ${last}`;
}

// ─── Funding record-keeping ───────────────────────────────────────────────────

const RECORD_KEEPING_LABELS: Record<string, string> = {
  keep_simple: 'They would prefer to keep record-keeping simple and practical rather than tracking every expense.',
  detailed_tracking: 'They are comfortable with more detailed record-keeping if it helps ensure transparency.',
  trustee_manages: 'They would expect the trustee to handle record-keeping and provide periodic summaries.',
};

export function humanizeRecordKeeping(preference: string): string {
  return RECORD_KEEPING_LABELS[preference] || humanizeSnakeCase(preference);
}

// ─── Adult sibling role ───────────────────────────────────────────────────────

const SIBLING_ROLE_LABELS: Record<string, string> = {
  emotional_support: 'providing emotional support and a familiar presence',
  family_discussions: 'being part of family discussions about the children',
  practical_help: 'helping with practical day-to-day things',
  financial_support: 'contributing financially where possible',
  other: 'being there in whatever way feels right',
};

export function humanizeSiblingRole(role: string): string {
  return SIBLING_ROLE_LABELS[role] || humanizeSnakeCase(role);
}

const SIBLING_NOT_RESPONSIBLE_LABELS: Record<string, string> = {
  primary_caregiver: 'being a primary caregiver or replacement parent',
  managing_finances: 'managing the children\'s finances',
  providing_housing: 'providing housing for the children',
  medical_decisions: 'making medical decisions',
  career_sacrifice: 'sacrificing their own career to care for the children',
};

export function humanizeSiblingNotResponsible(items: string[]): string[] {
  return items.map(r => SIBLING_NOT_RESPONSIBLE_LABELS[r] || humanizeSnakeCase(r));
}

// ─── Trust type ───────────────────────────────────────────────────────────────

const TRUST_TYPE_LABELS: Record<string, string> = {
  discretionary_trust: 'a discretionary trust',
  bare_trust: 'a bare trust',
  family_trust: 'a family trust',
  alter_ego_trust: 'an alter ego trust',
  spousal_trust: 'a spousal trust',
  testamentary_trust: 'a testamentary trust',
  disabled_person_trust: 'a trust for persons with disabilities',
};

export function humanizeTrustType(type: string): string {
  return TRUST_TYPE_LABELS[type] || humanizeSnakeCase(type);
}

// ─── Financial resource type ──────────────────────────────────────────────────

const FINANCIAL_TYPE_LABELS: Record<string, string> = {
  life_insurance: 'Life Insurance',
  resp: 'RESP (Registered Education Savings Plan)',
  rdsp: 'RDSP (Registered Disability Savings Plan)',
  trust: 'Trust',
  savings: 'Savings',
  investment: 'Investments',
  pension: 'Pension',
};

export function humanizeFinancialType(type: string): string {
  return FINANCIAL_TYPE_LABELS[type] || humanizeSnakeCase(type);
}

// ─── Fallback: snake_case to readable ─────────────────────────────────────────

export function humanizeSnakeCase(value: string): string {
  return value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toLowerCase())
    .replace(/^\w/, c => c.toUpperCase());
}

// ─── Low-information text detection ───────────────────────────────────────────

const LOW_INFO_PATTERNS = [
  /^(n\/?a)$/i,
  /^(same as above)$/i,
  /^(already entered)$/i,
  /^(nothing)$/i,
  /^(see above)$/i,
  /^(none)$/i,
  /^(nothing to add)$/i,
  /^(i'?ve already entered this\.?)$/i,
];

export function isLowInformationText(text: string | undefined): boolean {
  if (!text) return false;
  const trimmed = text.trim();
  if (trimmed.length < 3) return true;
  return LOW_INFO_PATTERNS.some(p => p.test(trimmed));
}

// ─── Document QA sanitization ─────────────────────────────────────────────────

const SNAKE_CASE_PATTERN = /[a-z]+_[a-z]+/;
const JSON_PATTERN = /^\[{|^{|"name"\s*:/;
const RAW_ID_PATTERN = /^(pp_|conn_|nb_|child_)/;

export interface QaFinding {
  severity: 'blocking' | 'warning';
  path: string;
  issue: string;
  sample: string;
}

export function sanitizeClarifyDocument(doc: {
  sections: { id: string; heading: string; blocks: { type: string; text?: string; title?: string; items?: string[]; heading?: string }[] }[];
  quickReference?: { label: string; value: string }[];
}): QaFinding[] {
  const findings: QaFinding[] = [];
  const checkText = (text: string | undefined, path: string) => {
    if (!text) return;
    if (SNAKE_CASE_PATTERN.test(text) && text.length < 60) {
      // Short strings with snake_case are suspicious
      if (/[a-z]+_[a-z]+/.test(text) && !text.includes(' ')) {
        findings.push({
          severity: 'blocking',
          path,
          issue: 'Raw enum value detected',
          sample: text,
        });
      }
    }
    if (JSON_PATTERN.test(text)) {
      findings.push({
        severity: 'blocking',
        path,
        issue: 'Serialized JSON detected',
        sample: text.substring(0, 50),
      });
    }
    if (RAW_ID_PATTERN.test(text) && text.length < 20) {
      findings.push({
        severity: 'warning',
        path,
        issue: 'Internal ID detected',
        sample: text,
      });
    }
  };

  for (const section of doc.sections) {
    checkText(section.heading, `${section.id}.heading`);
    for (const block of section.blocks) {
      checkText(block.text, `${section.id}.${block.type}.text`);
      checkText(block.title, `${section.id}.${block.type}.title`);
      checkText(block.heading, `${section.id}.${block.type}.heading`);
      if (block.items) {
        for (const item of block.items) {
          checkText(item, `${section.id}.${block.type}.items`);
        }
      }
    }
  }

  if (doc.quickReference) {
    for (const qr of doc.quickReference) {
      checkText(qr.value, `quickRef.${qr.label}`);
    }
  }

  return findings;
}
