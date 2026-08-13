import type { GuardianshipRoadmapModel, GuardianAssignment, GuardianshipChildProfile } from './guardianshipRoadmapTypes';
import type {
  NarrativeBlock,
  NarrativeImportance,
  NarrativeSourceType,
  GuardianshipNarrativeModel,
  GuardianshipChildNarrative,
  ImmediateActionNarrative,
  QuickReferenceItem,
  ReadinessNarrative,
  NarrativeContext,
  GuardianshipAudience,
} from './guardianshipNarrativeTypes';
import { getParentLabel, ALL_AUDIENCES, GUARDIAN_AUDIENCES, LAWYER_AUDIENCES, ACCOUNTANT_AUDIENCES, TRUSTEE_AUDIENCES, CLIENT_PLANNING_AUDIENCES } from './guardianshipNarrativeTypes';

let blockCounter = 0;

function nextBlockId(): string {
  blockCounter++;
  return `nb_${blockCounter}`;
}

function makeBlock(
  ruleId: string,
  type: NarrativeBlock['type'],
  importance: NarrativeImportance,
  sourceType: NarrativeSourceType,
  opts: Partial<NarrativeBlock> & { audiences?: GuardianshipAudience[] } = {},
): NarrativeBlock {
  return {
    id: nextBlockId(),
    ruleId,
    type,
    importance,
    sourceType,
    ...opts,
  };
}

function guardianLabel(a: GuardianAssignment): string {
  return a.householdLabel || a.guardianPeople.map(p => p.name).join(' and ') || 'the intended guardian';
}

function pluralGuardian(a: GuardianAssignment): string {
  return a.isHousehold ? 'guardians' : 'guardian';
}

function moveAdverb(moveStatus: string): string {
  switch (moveStatus) {
    case 'likely': return 'would most likely';
    case 'possible': return 'might';
    case 'unlikely': return 'are not expected to';
    default: return 'may or may not';
  }
}

function communityString(assignment: GuardianAssignment): string {
  return assignment.guardianCommunity || 'their guardian\'s community';
}

function buildFamilyContext(ctx: NarrativeContext): NarrativeBlock[] {
  const { model, parentLabel } = ctx;
  const blocks: NarrativeBlock[] = [];

  const minorChildren = model.children.filter(c => c.status === 'minor');
  const adultChildren = model.children.filter(c => c.status !== 'minor');

  const childList = minorChildren.map(c => c.nickname || c.name).join(' and ');
  const hasGuardian = model.guardianAssignments.length > 0;

  let intro = `${parentLabel} have prepared this Guardianship Roadmap for `;
  if (minorChildren.length === 1) {
    intro += `${childList}, their minor child.`;
  } else if (minorChildren.length > 1) {
    intro += `${childList}, their minor children.`;
  } else {
    intro += `their family.`;
  }

  if (adultChildren.length > 0) {
    const adultNames = adultChildren.map(c => c.nickname || c.name).join(' and ');
    intro += ` ${adultNames} ${adultChildren.length === 1 ? 'is an adult' : 'are adults'} and ${adultChildren.length === 1 ? 'is' : 'are'} not subject to guardianship, but ${adultChildren.length === 1 ? 'is' : 'are'} included where relevant to family dynamics.`;
  }

  blocks.push(makeBlock('GUARDIAN-01', 'intro', 'primary', 'knownFact', {
    heading: 'About This Roadmap',
    body: intro,
  audiences: ALL_AUDIENCES,
  }));

  if (hasGuardian && model.guardianAssignments.length > 0) {
    const firstAssignment = model.guardianAssignments[0];
    const guardianName = guardianLabel(firstAssignment);
    const allGuardianChildren = model.guardianAssignments.flatMap(a => a.childNames);
    blocks.push(makeBlock('GUARDIAN-01', 'context', 'primary', 'parentPreference', {
      heading: 'Who Would Step In',
      body: `${parentLabel} intend ${guardianName} to act as ${pluralGuardian(firstAssignment)} for ${allGuardianChildren.join(' and ')}. This document is meant to help ${guardianName} understand the children and carry out the parents' wishes.`,
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  if (model.family.provinceOfResidence) {
    const province = model.family.provinceOfResidence;
    blocks.push(makeBlock('GUARDIAN-01', 'context', 'reference', 'knownFact', {
      body: `The family lives in ${province}. The age of majority there is ${model.family.ageOfMajority}.`,
    audiences: [...GUARDIAN_AUDIENCES, ...LAWYER_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  return blocks;
}

function buildGuardianPlan(ctx: NarrativeContext): NarrativeBlock[] {
  const { model, parentLabel } = ctx;
  const blocks: NarrativeBlock[] = [];

  for (const assignment of model.guardianAssignments) {
    const gLabel = guardianLabel(assignment);
    const childLabel = assignment.childNames.length > 1
      ? assignment.childNames.join(' and ')
      : assignment.childNames[0];

    // GUARDIAN-01: Who steps in
    blocks.push(makeBlock('GUARDIAN-01', 'context', 'primary', 'parentPreference', {
      heading: `Guardian for ${childLabel}`,
      body: `${parentLabel} intend ${gLabel} to act as ${pluralGuardian(assignment)} for ${childLabel} if they are no longer able to care for ${assignment.childNames.length > 1 ? 'them' : 'him or her'}.`,
      childIds: assignment.childIds,
      personIds: assignment.guardianPersonIds,
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));

    // GUARDIAN-02: Approached and agreed?
    if (assignment.spokenWith === 'yes_agreed') {
      blocks.push(makeBlock('GUARDIAN-02', 'context', 'primary', 'knownFact', {
        body: `${gLabel} ${assignment.isHousehold ? 'have' : 'has'} been asked and ${assignment.isHousehold ? 'have' : 'has'} agreed to act as ${pluralGuardian(assignment)} for ${childLabel}.`,
        childIds: assignment.childIds,
        personIds: assignment.guardianPersonIds,
      audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    } else if (assignment.spokenWith === 'yes_not_confirmed') {
      blocks.push(makeBlock('GUARDIAN-02', 'readiness', 'important', 'parentUnderstanding', {
        body: `${parentLabel} have spoken with ${gLabel} but have not yet formally confirmed the arrangement.`,
        childIds: assignment.childIds,
      audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    } else if (assignment.spokenWith === 'not_yet') {
      blocks.push(makeBlock('GUARDIAN-02', 'readiness', 'important', 'parentPreference', {
        body: `${gLabel} ${assignment.isHousehold ? 'have' : 'has'} not yet been approached about this role. This is an important conversation to have.`,
        childIds: assignment.childIds,
      audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    }

    // GUARDIAN-03: In Will?
    if (assignment.inWill === 'yes') {
      blocks.push(makeBlock('GUARDIAN-03', 'context', 'primary', 'parentUnderstanding', {
        body: `${parentLabel} believe their Will${model.family.clientNames.length > 1 ? 's' : ''} name${model.family.clientNames.length > 1 ? '' : 's'} ${gLabel} as ${pluralGuardian(assignment)} for ${childLabel}.`,
        childIds: assignment.childIds,
      audiences: [...GUARDIAN_AUDIENCES, ...LAWYER_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    } else if (assignment.inWill === 'no' || assignment.inWill === 'not_sure') {
      blocks.push(makeBlock('GUARDIAN-03', 'readiness', 'important', 'parentUnderstanding', {
        body: `${parentLabel} are not sure whether ${gLabel} ${assignment.isHousehold ? 'are' : 'is'} currently named in their Will. This is worth confirming.`,
        childIds: assignment.childIds,
      audiences: [...LAWYER_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    } else if (assignment.inWill === 'no_will') {
      blocks.push(makeBlock('GUARDIAN-05', 'readiness', 'primary', 'knownFact', {
        body: `${parentLabel} do not currently have a Will. The guardian intentions in this document should be reviewed with an estate lawyer to make them legally effective.`,
        childIds: assignment.childIds,
      audiences: [...LAWYER_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    }

    // GUARDIAN-04: Alternate
    if (assignment.alternatePeople.length > 0) {
      const altLabel = assignment.alternatePeople.map(p => p.name).join(' and ');
      blocks.push(makeBlock('GUARDIAN-04', 'context', 'important', 'parentPreference', {
        body: `If ${gLabel} ${assignment.isHousehold ? 'are' : 'is'} unable to act, ${parentLabel} would want ${altLabel} to serve as alternate ${pluralGuardian(assignment)} for ${childLabel}.`,
        childIds: assignment.childIds,
        personIds: assignment.alternatePersonIds,
      audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    }

    // MOVE-01: Likely move
    if (assignment.moveStatus === 'likely' || assignment.moveStatus === 'possible') {
      const moveVerb = moveAdverb(assignment.moveStatus);
      const community = communityString(assignment);
      blocks.push(makeBlock('MOVE-01', 'transition', 'primary', 'derived', {
        heading: assignment.moveStatus === 'likely' ? 'A Likely Move' : 'A Possible Move',
        body: `${parentLabel} expect ${childLabel} ${moveVerb} move to ${community} to live with ${gLabel}. This would mean establishing a new daily life in a new community.`,
        childIds: assignment.childIds,
      audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));

      // MOVE-03: Cross-province / cross-border
      if (assignment.isCrossBorder) {
        blocks.push(makeBlock('MOVE-03', 'transition', 'important', 'derived', {
          body: `This move would cross an international border. Guardianship, healthcare, and school arrangements may be affected by the difference in legal systems.`,
          childIds: assignment.childIds,
        audiences: [...GUARDIAN_AUDIENCES, ...LAWYER_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
        }));
      } else if (assignment.isCrossProvince) {
        blocks.push(makeBlock('MOVE-03', 'transition', 'important', 'derived', {
          body: `This move would be to a different province. Age of majority, healthcare systems, and education rules may differ between provinces.`,
          childIds: assignment.childIds,
        audiences: [...GUARDIAN_AUDIENCES, ...LAWYER_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
        }));
      }
    }

    // Parent voice: guardian notes
    if (assignment.notes) {
      blocks.push(makeBlock('PARENT-VOICE-01', 'parentVoice', 'important', 'parentPreference', {
        body: assignment.notes,
        childIds: assignment.childIds,
      audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    }
  }

  return blocks;
}

function buildChildIntroduction(child: GuardianshipChildProfile, ctx: NarrativeContext): NarrativeBlock[] {
  const blocks: NarrativeBlock[] = [];
  const name = child.nickname || child.name;
  const { parentLabel } = ctx;

  let intro = `${name} is ${child.age !== undefined ? `${child.age} years old` : 'a minor'}`;
  if (child.status === 'minor') {
    intro += ` and would be subject to guardianship`;
  }
  intro += `.`;

  if (child.planningFocus && child.planningFocus !== 'Minor') {
    const focusMap: Record<string, string> = {
      'Minor — ongoing support needs': `${name} has ongoing support needs that are part of daily life.`,
      'Minor — support needs being assessed': `${name}'s support needs are still being assessed.`,
      'Adult — ongoing support needs': `${name} is an adult with ongoing support needs.`,
      'Adult — may need support': `${name} is an adult who may need support.`,
    };
    const focusText = focusMap[child.planningFocus];
    if (focusText) intro += ` ${focusText}`;
  }

  blocks.push(makeBlock('GUARDIAN-01', 'intro', 'primary', 'knownFact', {
    heading: name,
    body: intro,
    childIds: [child.childId],
  audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
  }));

  // Parent voice: what parents want you to know
  const pp = child.personalProfile;
  if (pp) {
    const voiceParts: string[] = [];
    if (pp.communicationStyle) voiceParts.push(`How ${name} communicates: ${pp.communicationStyle}`);
    if (pp.emotionalExpression) voiceParts.push(`How ${name} expresses emotions: ${pp.emotionalExpression}`);
    if (pp.comfortStrategies) voiceParts.push(`What helps ${name} feel safe: ${pp.comfortStrategies}`);
    if (pp.importantRoutines) voiceParts.push(`Important routines: ${pp.importantRoutines}`);
    if (pp.behaviouralConsiderations) voiceParts.push(`Behavioural considerations: ${pp.behaviouralConsiderations}`);

    if (voiceParts.length > 0) {
      blocks.push(makeBlock('PARENT-VOICE-01', 'parentVoice', 'primary', 'parentPreference', {
        heading: `What ${parentLabel} want you to know about ${name}`,
        body: voiceParts.join('\n\n'),
        childIds: [child.childId],
      audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    }

    if (pp.transitionEasier || pp.missedMost || pp.feelConnected) {
      const transitionParts: string[] = [];
      if (pp.transitionEasier) transitionParts.push(`What would make transition easier: ${pp.transitionEasier}`);
      if (pp.missedMost) transitionParts.push(`What ${name} would miss most: ${pp.missedMost}`);
      if (pp.feelConnected) transitionParts.push(`What could help ${name} feel connected: ${pp.feelConnected}`);

      blocks.push(makeBlock('PARENT-VOICE-01', 'parentVoice', 'important', 'parentPreference', {
        heading: `Helping ${name} through transition`,
        body: transitionParts.join('\n\n'),
        childIds: [child.childId],
      audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    }
  }

  return blocks;
}

function buildEducationBlocks(child: GuardianshipChildProfile, ctx: NarrativeContext): NarrativeBlock[] {
  const et = child.educationTransition;
  if (!et) return [];

  const blocks: NarrativeBlock[] = [];
  const name = child.nickname || child.name;
  const { parentLabel } = ctx;
  const assignment = ctx.model.guardianAssignments.find(a => a.childIds.includes(child.childId));
  const moveLikely = assignment?.moveStatus === 'likely' || assignment?.moveStatus === 'possible';

  // SCHOOL-01: School as transition resource
  if (moveLikely && (et.schoolChangeExpected === 'yes_most_likely' || et.schoolChangeExpected === 'possibly')) {
    const schoolName = et.schoolName ? `${et.schoolName}` : 'their current school';
    blocks.push(makeBlock('SCHOOL-01', 'transition', 'important', 'derived', {
      heading: 'School',
      body: `${name} will likely attend a new school after moving to ${assignment?.guardianCommunity || 'the guardian\'s community'}. ${name}'s current school, ${schoolName}, is included as a starting point for transferring academic history, learning supports, and other information to the new school.`,
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  } else if (et.schoolName) {
    blocks.push(makeBlock('SCHOOL-01', 'context', 'important', 'knownFact', {
      heading: 'School',
      body: `${name} currently attends ${et.schoolName}.`,
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  // SCHOOL-02: IEP and learning supports
  if (et.hasIEP && et.iepDetails) {
    blocks.push(makeBlock('SCHOOL-02', 'transition', 'important', 'knownFact', {
      heading: 'Learning Supports',
      body: `${name} currently has learning supports in place. ${name}'s current IEP and related records can help the new school understand the accommodations rather than starting from zero.`,
      bullets: [et.iepDetails],
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));

    if (et.iepDocumentLocation) {
      blocks.push(makeBlock('SCHOOL-02', 'crossReference', 'reference', 'knownFact', {
        body: `The IEP document is located at: ${et.iepDocumentLocation}.`,
        childIds: [child.childId],
      audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    }
  }

  // SCHOOL-03: Education records location
  if (et.recordLocation) {
    blocks.push(makeBlock('SCHOOL-03', 'crossReference', 'reference', 'knownFact', {
      body: `Education records for ${name} are at: ${et.recordLocation}.`,
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  // Parent voice: school notes
  if (et.learningStyleNotes || et.schoolFocusHelps || et.schoolExtraSupport) {
    const parts: string[] = [];
    if (et.learningStyleNotes) parts.push(et.learningStyleNotes);
    if (et.schoolFocusHelps) parts.push(et.schoolFocusHelps);
    if (et.schoolExtraSupport) parts.push(et.schoolExtraSupport);
    blocks.push(makeBlock('PARENT-VOICE-01', 'parentVoice', 'important', 'parentPreference', {
      heading: `What helps ${name} at school`,
      body: parts.join('\n\n'),
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  // Parent voice: new school notes
  if (et.newSchoolNotes) {
    blocks.push(makeBlock('PARENT-VOICE-01', 'parentVoice', 'important', 'parentPreference', {
      body: `${parentLabel}'s notes about a new school: ${et.newSchoolNotes}`,
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  return blocks;
}

function buildHealthcareBlocks(child: GuardianshipChildProfile): NarrativeBlock[] {
  const ht = child.healthcareTransition;
  if (!ht) return [];

  const blocks: NarrativeBlock[] = [];
  const name = child.nickname || child.name;

  // HEALTH-01: Current providers as transition resources
  if (ht.providers.length > 0) {
    blocks.push(makeBlock('HEALTH-01', 'transition', 'important', 'knownFact', {
      heading: 'Healthcare',
      body: `${name}'s current care team knows ${name}'s history. If care moves closer to the guardians' home, these professionals can be useful starting points for transferring records, current treatment information, and relevant referrals.`,
      bullets: ht.providers.filter(p => p.name).map(p => `${p.name} — ${p.role}${p.phone ? `, ${p.phone}` : ''}`),
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  // HEALTH-02: Medications
  if (ht.hasMedications && ht.medications.length > 0) {
    blocks.push(makeBlock('HEALTH-02', 'transition', 'primary', 'knownFact', {
      heading: 'Medications',
      body: `${name} currently takes medication that should be continued and managed carefully.`,
      bullets: ht.medications.map(m => `${m.name} — treats ${m.treats}${m.prescribedBy ? `, prescribed by ${m.prescribedBy}` : ''}`),
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  // HEALTH-03: Allergies
  if (ht.hasAllergies && ht.allergies.length > 0) {
    blocks.push(makeBlock('HEALTH-03', 'transition', 'primary', 'knownFact', {
      heading: 'Allergies',
      body: `${name} has allergies that must be communicated to new caregivers and schools.`,
      bullets: ht.allergies.map(a => `${a.details} — severity: ${a.severity}${a.medications ? `, medications: ${a.medications}` : ''}${a.epipen ? `, EpiPen: ${a.epipen}` : ''}`),
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  // HEALTH-04: Care plan
  if (ht.carePlanWritten === 'yes' && ht.carePlanStored) {
    blocks.push(makeBlock('HEALTH-04', 'crossReference', 'reference', 'knownFact', {
      body: `A written care plan exists for ${name} and is stored at: ${ht.carePlanStored}.`,
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  // Cross-reference: health records location
  if (ht.recordLocation) {
    blocks.push(makeBlock('HEALTH-01', 'crossReference', 'reference', 'knownFact', {
      body: `Health records for ${name} are at: ${ht.recordLocation}.`,
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  // Parent voice: medication notes
  if (ht.medicationNotes) {
    blocks.push(makeBlock('PARENT-VOICE-01', 'parentVoice', 'important', 'parentPreference', {
      body: ht.medicationNotes,
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  // Medical conditions
  if (ht.medicalConditions) {
    blocks.push(makeBlock('HEALTH-01', 'context', 'important', 'knownFact', {
      body: `${name} has the following medical condition${ht.medicalConditions.includes(',') ? 's' : ''}: ${ht.medicalConditions}.`,
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  return blocks;
}

function buildSupportTransitionBlocks(child: GuardianshipChildProfile): NarrativeBlock[] {
  const supports = child.supportTransition;
  if (!supports || supports.length === 0) return [];

  const blocks: NarrativeBlock[] = [];
  const name = child.nickname || child.name;

  blocks.push(makeBlock('SUPPORT-01', 'transition', 'primary', 'knownFact', {
    heading: 'Transition of Supports',
    body: `${name} has support needs that are part of daily life. Here is what exists now, why it matters, and what the transition job is.`,
    childIds: [child.childId],
  audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
  }));

  for (const support of supports) {
    const bullets: string[] = [];

    if (support.currentProvider?.name) {
      bullets.push(`Current provider: ${support.currentProvider.name}${support.currentProvider.role ? ` (${support.currentProvider.role})` : ''}`);
    }

    blocks.push(makeBlock('SUPPORT-01', 'transition', 'primary', 'knownFact', {
      heading: support.supportTypeLabel,
      body: `${support.purpose}. ${support.transitionAction}`,
      bullets: bullets.length > 0 ? bullets : undefined,
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));

    // SUPPORT-02: Provider can help transfer
    if (support.currentProvider?.name) {
      blocks.push(makeBlock('SUPPORT-02', 'context', 'important', 'derived', {
        body: `${support.currentProvider.name} can help transfer history and records to a new provider.`,
        childIds: [child.childId],
      audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    }

    if (support.recordLocation) {
      blocks.push(makeBlock('SUPPORT-01', 'crossReference', 'reference', 'knownFact', {
        body: `Records related to this support are at: ${support.recordLocation}.`,
        childIds: [child.childId],
      audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    }
  }

  // Parent voice: support transition notes
  if (supports[0]?.notes) {
    blocks.push(makeBlock('PARENT-VOICE-03', 'parentVoice', 'important', 'parentPreference', {
      body: supports[0].notes,
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  return blocks;
}

function buildConnectionBlocks(child: GuardianshipChildProfile, ctx: NarrativeContext): NarrativeBlock[] {
  const connections = child.importantConnections;
  if (!connections || connections.length === 0) return [];

  const blocks: NarrativeBlock[] = [];
  const name = child.nickname || child.name;
  const { parentLabel } = ctx;
  const assignment = ctx.model.guardianAssignments.find(a => a.childIds.includes(child.childId));
  const moveLikely = assignment?.moveStatus === 'likely' || assignment?.moveStatus === 'possible';

  const importantConnections = connections.filter(c => c.name);

  if (importantConnections.length === 0) return [];

  if (moveLikely) {
    const especiallyImportant = importantConnections.filter(c => c.importance === 'especially_important');
    if (especiallyImportant.length > 0) {
      blocks.push(makeBlock('CONNECTION-01', 'transition', 'primary', 'derived', {
        heading: 'Important Relationships',
        body: `A new home does not have to mean leaving every part of ${name}'s old life behind. ${parentLabel} have identified relationships that matter especially to ${name} and may need intentional effort to maintain after a move.`,
        childIds: [child.childId],
      audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    }
  }

  for (const conn of importantConnections) {
    const relationshipLabel = conn.relationshipTypes.length > 0 ? conn.relationshipTypes.join(', ') : 'an important person';
    const importancePrefix = conn.importance === 'especially_important'
      ? `${conn.name} is especially important to ${name}.`
      : `${conn.name} is important to ${name}.`;

    let body = `${importancePrefix} ${conn.name} is ${relationshipLabel}.`;
    if (conn.contexts.length > 0) {
      body += ` They share a connection through ${conn.contexts.join(' and ')}.`;
    }

    blocks.push(makeBlock('CONNECTION-01', 'context', 'important', 'parentPreference', {
      heading: conn.name,
      body,
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));

    // Parent voice: why this matters
    if (conn.whyItMatters) {
      blocks.push(makeBlock('PARENT-VOICE-01', 'parentVoice', 'primary', 'parentPreference', {
        body: conn.whyItMatters,
        childIds: [child.childId],
      audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    }

    // CONNECTION-02: Continuity ideas
    if (conn.continuityIdeas.length > 0) {
      blocks.push(makeBlock('CONNECTION-02', 'action', 'important', 'parentPreference', {
        body: `${parentLabel}'s ideas for keeping ${name} and ${conn.name} connected:`,
        bullets: conn.continuityIdeas,
        childIds: [child.childId],
      audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    }

    // CONNECTION-03: Contact info
    if (conn.hasContactInfo) {
      const contactParts: string[] = [];
      if (conn.contactName) contactParts.push(`Contact: ${conn.contactName}`);
      if (conn.contactPhone) contactParts.push(`Phone: ${conn.contactPhone}`);
      if (conn.contactEmail) contactParts.push(`Email: ${conn.contactEmail}`);
      blocks.push(makeBlock('CONNECTION-01', 'crossReference', 'reference', 'knownFact', {
        body: contactParts.join(' | '),
        childIds: [child.childId],
      audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    } else if (conn.importance === 'especially_important' && moveLikely) {
      blocks.push(makeBlock('CONNECTION-03', 'readiness', 'important', 'derived', {
        body: `No practical contact information has been recorded for ${conn.name}. It would be worth obtaining so the relationship can be maintained after a move.`,
        childIds: [child.childId],
      audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    }
  }

  return blocks;
}

function buildActivitiesBlocks(child: GuardianshipChildProfile, ctx: NarrativeContext): NarrativeBlock[] {
  const activities = child.personalProfile?.activities;
  if (!activities || activities.length === 0) return [];

  const blocks_list: NarrativeBlock[] = [];
  const name = child.nickname || child.name;
  const { parentLabel } = ctx;
  const assignment = ctx.model.guardianAssignments.find(a => a.childIds.includes(child.childId));
  const moveLikely = assignment?.moveStatus === 'likely' || assignment?.moveStatus === 'possible';

  const critical = activities.filter(a => a.importance === 'Critical' && a.name);
  const important = activities.filter(a => a.importance === 'Important' && a.name);
  const allNamed = activities.filter(a => a.name);

  if (allNamed.length === 0) return [];

  for (const activity of critical) {
    blocks_list.push(makeBlock('ACTIVITY-02', 'context', 'primary', 'parentPreference', {
      heading: activity.name,
      body: `${activity.name} is a critical part of ${name}'s routine${activity.frequency ? ` — ${activity.frequency}` : ''}. ${parentLabel} would hope ${name} can continue this in ${moveLikely ? 'the new community' : 'daily life'} while staying connected with ${moveLikely ? 'former teammates and coaches where practical' : 'existing connections where practical'}.`,
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  for (const activity of important) {
    blocks_list.push(makeBlock('ACTIVITY-01', 'context', 'supporting', 'parentPreference', {
      heading: activity.name,
      body: `${activity.name} is an important part of ${name}'s life${activity.frequency ? ` — ${activity.frequency}` : ''}. Maintaining this activity would help ${name} feel settled.`,
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  const niceToHave = allNamed.filter(a => a.importance !== 'Critical' && a.importance !== 'Important');
  if (niceToHave.length > 0) {
    blocks_list.push(makeBlock('ACTIVITY-01', 'context', 'supporting', 'parentPreference', {
      body: `Other activities: ${niceToHave.map(a => a.name).join(', ')}.`,
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  return blocks_list;
}

function buildCommunitiesAndTraditionsBlocks(child: GuardianshipChildProfile): NarrativeBlock[] {
  const blocks: NarrativeBlock[] = [];
  const name = child.nickname || child.name;
  const communities = child.communities || [];
  const traditions = child.traditions || [];

  if (communities.length === 0 && traditions.length === 0) return [];

  const hasCommunities = communities.some(c => c.name);
  const hasTraditions = traditions.some(t => t.name);

  if (hasCommunities || hasTraditions) {
    blocks.push(makeBlock('COMMUNITY-01', 'context', 'supporting', 'parentPreference', {
      heading: 'Familiar Parts of Life Worth Keeping',
      body: `These are the communities and traditions that help ${name} feel at home.`,
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  for (const community of communities.filter(c => c.name)) {
    blocks.push(makeBlock('COMMUNITY-01', 'context', 'supporting', 'parentPreference', {
      heading: community.typeLabel,
      body: `${community.name}${community.importanceNotes ? ` — ${community.importanceNotes}` : ''}`,
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  for (const tradition of traditions.filter(t => t.name)) {
    const participantLabel = tradition.participantTypes.length > 0
      ? tradition.participantTypes.join(', ')
      : 'family';
    blocks.push(makeBlock('TRADITION-01', 'context', 'supporting', 'parentPreference', {
      heading: tradition.typeLabel,
      body: `${tradition.name} — with ${participantLabel}${tradition.importanceNotes ? `. ${tradition.importanceNotes}` : ''}${tradition.continueIfPractical === 'yes' ? `. ${child.nickname || child.name}'s parents would like this to continue if practical.` : ''}`,
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  return blocks;
}

function buildInheritanceBlocks(child: GuardianshipChildProfile, ctx: NarrativeContext): NarrativeBlock[] {
  const inheritanceRecords = child.inheritanceByClient;
  if (inheritanceRecords.length === 0) return [];

  const blocks: NarrativeBlock[] = [];
  const name = child.nickname || child.name;
  const { parentLabel } = ctx;

  for (const record of inheritanceRecords) {
    const clientName = record.clientName;

    // INHERITANCE-01: Managed in stages
    if (record.inheritanceType && record.inheritanceType !== 'outright' && record.inheritanceType !== 'not_sure') {
      let body = `${name}'s inheritance from ${clientName} is intended to be managed rather than paid to ${name} all at once.`;

      if (record.stages.length > 0) {
        body += ` ${clientName} understands that ${name} would receive the inheritance in stages over time:`;
        blocks.push(makeBlock('INHERITANCE-01', 'context', 'important', 'parentUnderstanding', {
          heading: `Inheritance from ${clientName}`,
          body,
          bullets: record.stages.map(s => `At age ${s.age}: ${s.fraction}${s.description ? ` — ${s.description}` : ''}`),
          childIds: [child.childId],
        audiences: [...TRUSTEE_AUDIENCES, ...LAWYER_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
        }));
      } else {
        blocks.push(makeBlock('INHERITANCE-01', 'context', 'important', 'parentUnderstanding', {
          heading: `Inheritance from ${clientName}`,
          body,
          childIds: [child.childId],
        audiences: [...TRUSTEE_AUDIENCES, ...LAWYER_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
        }));
      }

      // INHERITANCE-02: Trustee
      if (record.trusteeName) {
        blocks.push(makeBlock('INHERITANCE-02', 'context', 'important', 'parentUnderstanding', {
          body: `${clientName} believes ${record.trusteeName} would manage the inheritance.`,
          childIds: [child.childId],
        audiences: [...TRUSTEE_AUDIENCES, ...LAWYER_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
        }));
      }

      // INHERITANCE-04: Uncertainty
      blocks.push(makeBlock('INHERITANCE-04', 'readiness', 'important', 'parentUnderstanding', {
        body: `This reflects ${parentLabel}'s understanding of their Will. Consider confirming the specifics with an estate lawyer.`,
        childIds: [child.childId],
      audiences: [...LAWYER_AUDIENCES, ...TRUSTEE_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    } else if (record.inheritanceType === 'outright') {
      blocks.push(makeBlock('INHERITANCE-01', 'context', 'important', 'parentUnderstanding', {
        heading: `Inheritance from ${clientName}`,
        body: `${clientName} understands that ${name} would receive their inheritance directly.`,
        childIds: [child.childId],
      audiences: [...TRUSTEE_AUDIENCES, ...LAWYER_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    } else if (record.inheritanceType === 'not_sure') {
      blocks.push(makeBlock('INHERITANCE-04', 'readiness', 'important', 'parentUnderstanding', {
        heading: `Inheritance from ${clientName}`,
        body: `${clientName} is unsure how their Will handles ${name}'s inheritance. This is worth confirming with an estate lawyer.`,
        childIds: [child.childId],
      audiences: [...LAWYER_AUDIENCES, ...TRUSTEE_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    }

    // INHERITANCE-03: Child-specific trust arrangement
    const arr = record.childSpecificArrangement;
    if (arr?.hasDifferentArrangement === 'yes') {
      let body = `${parentLabel} believe ${name}'s inheritance from ${clientName} is intended to be managed through a special trust arrangement designed around ${name}'s longer-term needs.`;
      if (arr.knownTrustType) {
        body += ` They believe this is structured as a ${arr.knownTrustType}.`;
      }
      if (arr.description) {
        body += ` ${arr.description}`;
      }
      blocks.push(makeBlock('INHERITANCE-03', 'context', 'primary', 'parentUnderstanding', {
        heading: `Special Arrangement for ${name}`,
        body,
        childIds: [child.childId],
      audiences: [...TRUSTEE_AUDIENCES, ...LAWYER_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));

      blocks.push(makeBlock('INHERITANCE-04', 'readiness', 'primary', 'professionalReview', {
        body: `Consider confirming the structure and its implications for government benefits with the estate lawyer.`,
        childIds: [child.childId],
      audiences: [...LAWYER_AUDIENCES, ...TRUSTEE_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    }
  }

  return blocks;
}

function buildAdultTransitionBlocks(child: GuardianshipChildProfile, ctx: NarrativeContext): NarrativeBlock[] {
  const at = child.adultTransition;
  if (!at) return [];

  const blocks: NarrativeBlock[] = [];
  const name = child.nickname || child.name;
  const { parentLabel } = ctx;

  blocks.push(makeBlock('ADULT-TRANSITION-01', 'transition', 'primary', 'parentPreference', {
    heading: 'Looking Ahead',
    body: `${name} may need support beyond age ${ctx.model.family.ageOfMajority}. Here is what ${parentLabel} currently expect.`,
    childIds: [child.childId],
  audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
  }));

  const bullets: string[] = [];
  if (at.futureIndependenceLevel) {
    const independenceMap: Record<string, string> = {
      'fully_independent': `${parentLabel} expect ${name} to be fully independent`,
      'mostly_independent': `${parentLabel} expect ${name} to be mostly independent with some support`,
      'needs_significant_support': `${parentLabel} expect ${name} to need significant ongoing support`,
      'not_sure': `${parentLabel} are not yet sure about ${name}'s future level of independence`,
    };
    if (independenceMap[at.futureIndependenceLevel]) bullets.push(independenceMap[at.futureIndependenceLevel]);
  }
  if (at.futureFinancialHelp) {
    const helpMap: Record<string, string> = {
      'yes': `${name} may need help with financial decisions`,
      'no': `${name} is expected to manage finances independently`,
      'unsure': `${parentLabel} are unsure whether ${name} will need financial help`,
    };
    if (helpMap[at.futureFinancialHelp]) bullets.push(helpMap[at.futureFinancialHelp]);
  }
  if (at.futurePersonalHealthHelp === 'yes') bullets.push(`${name} may need help with personal care and health decisions`);
  if (at.futureCaregiverName) bullets.push(`Future caregiver consideration: ${at.futureCaregiverName}`);

  if (bullets.length > 0) {
    blocks.push(makeBlock('ADULT-TRANSITION-01', 'context', 'important', 'parentPreference', {
      bullets,
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  // ADULT-TRANSITION-02: DTC
  if (at.dtcStatus === 'yes') {
    blocks.push(makeBlock('ADULT-TRANSITION-02', 'crossReference', 'important', 'knownFact', {
      body: `${name} has a Disability Tax Credit in place${at.dtcDocLocation ? `. Documentation is at: ${at.dtcDocLocation}` : '.'}`,
      childIds: [child.childId],
    audiences: [...ACCOUNTANT_AUDIENCES, ...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  } else if (at.dtcStatus === 'in-progress') {
    blocks.push(makeBlock('ADULT-TRANSITION-02', 'readiness', 'important', 'parentUnderstanding', {
      body: `An application for the Disability Tax Credit for ${name} is in progress.`,
      childIds: [child.childId],
    audiences: [...ACCOUNTANT_AUDIENCES, ...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  // Review milestone
  if (at.reviewNeeded) {
    blocks.push(makeBlock('ADULT-TRANSITION-02', 'readiness', 'important', 'derived', {
      body: `${name} is approaching adulthood. A review of future support arrangements may be needed soon.`,
      childIds: [child.childId],
    audiences: [...ACCOUNTANT_AUDIENCES, ...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  if (at.supportLocationDependent === 'yes' && at.supportLocationDependentDetails) {
    blocks.push(makeBlock('ADULT-TRANSITION-01', 'transition', 'important', 'parentPreference', {
      body: `${name}'s support needs may depend on where ${name} lives: ${at.supportLocationDependentDetails}`,
      childIds: [child.childId],
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  return blocks;
}

function buildChildNarrative(child: GuardianshipChildProfile, ctx: NarrativeContext): GuardianshipChildNarrative {
  const narrative: GuardianshipChildNarrative = {
    childId: child.childId,
    childName: child.nickname || child.name,
  };

  narrative.introduction = buildChildIntroduction(child, ctx);
  narrative.education = buildEducationBlocks(child, ctx);
  narrative.healthcare = buildHealthcareBlocks(child);
  narrative.supportTransition = buildSupportTransitionBlocks(child);
  narrative.peopleAndConnections = buildConnectionBlocks(child, ctx);
  narrative.activities = buildActivitiesBlocks(child, ctx);
  narrative.communitiesAndTraditions = buildCommunitiesAndTraditionsBlocks(child);
  narrative.inheritance = buildInheritanceBlocks(child, ctx);

  if (child.adultTransition) {
    narrative.adultTransition = buildAdultTransitionBlocks(child, ctx);
  }

  // Remove empty arrays
  for (const key of Object.keys(narrative) as Array<keyof GuardianshipChildNarrative>) {
    if (Array.isArray(narrative[key]) && (narrative[key] as NarrativeBlock[]).length === 0) {
      delete narrative[key];
    }
  }

  return narrative;
}

function buildFamilyRoles(ctx: NarrativeContext): NarrativeBlock[] {
  const { model, parentLabel } = ctx;
  const blocks: NarrativeBlock[] = [];

  const seenRoles = new Set<string>();
  for (const role of model.roles) {
    const childLabel = role.childName ? ` for ${role.childName}` : '';
    const roleKey = `${role.responsibility}|${role.childName || ''}|${role.firstChoice || ''}`;
    if (seenRoles.has(roleKey)) continue;
    seenRoles.add(roleKey);
    blocks.push(makeBlock('ROLE-01', 'summary', 'important', 'parentPreference', {
      heading: role.responsibility,
      body: `First choice: ${role.firstChoice || 'not decided'}${role.backup ? `. Backup: ${role.backup}` : ''}${childLabel}.`,
    audiences: [...GUARDIAN_AUDIENCES, ...TRUSTEE_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  // SIBLING-01: Adult sibling roles
  for (const siblingRole of model.adultSiblingRoles) {
    blocks.push(makeBlock('SIBLING-01', 'context', 'primary', 'parentPreference', {
      heading: `${siblingRole.adultSiblingName} — a sister, not a replacement parent`,
      body: `${siblingRole.adultSiblingName} is ${siblingRole.adultSiblingName === model.children.find(c => c.childId === siblingRole.adultSiblingChildId)?.nickname ? 'an adult sibling' : 'an adult family member'} who matters to the younger children. ${parentLabel} see ${siblingRole.adultSiblingName} as a sister${siblingRole.forMinorChildNames.length > 0 ? ` to ${siblingRole.forMinorChildNames.join(' and ')}` : ''}, not as a replacement parent.`,
    audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));

    // SIBLING-02: Role and limits
    if (siblingRole.role) {
      const roleMap: Record<string, string> = {
        'emotional_support': 'providing emotional support and sibling connection',
        'family_discussions': 'being part of family discussions',
        'practical_help': 'helping with practical matters from time to time',
        'other': siblingRole.role,
      };
      blocks.push(makeBlock('SIBLING-02', 'context', 'important', 'parentPreference', {
        body: `${parentLabel} would hope ${siblingRole.adultSiblingName} can help by ${roleMap[siblingRole.role] || siblingRole.role}.`,
      audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    }

    if (siblingRole.notResponsibleFor.length > 0) {
      const notRespMap: Record<string, string> = {
        'primary_caregiver': 'becoming the primary caregiver',
        'managing_finances': "managing the children's finances",
        'providing_housing': 'providing housing',
        'medical_decisions': 'making medical decisions',
      };
      const items = siblingRole.notResponsibleFor.map(r => notRespMap[r] || r);
      blocks.push(makeBlock('SIBLING-02', 'context', 'important', 'parentPreference', {
        body: `${parentLabel} specifically do not expect ${siblingRole.adultSiblingName} to be responsible for:`,
        bullets: items,
      audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    }
  }

  return blocks;
}

function buildFinancialResources(ctx: NarrativeContext): NarrativeBlock[] {
  const { model, parentLabel } = ctx;
  const blocks: NarrativeBlock[] = [];

  for (const fr of model.financialResources) {
    if (!fr.exists) continue;

    if (fr.type === 'life_insurance') {
      blocks.push(makeBlock('FINANCIAL-01', 'crossReference', 'important', 'knownFact', {
        heading: 'Life Insurance',
        body: `Life insurance is in place for the family. See the Family Financial Map for policy details.`,
      audiences: [...ACCOUNTANT_AUDIENCES, ...TRUSTEE_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    } else if (fr.type === 'resp') {
      const childLabel = fr.childNames.length > 0 ? ` for ${fr.childNames.join(' and ')}` : '';
      blocks.push(makeBlock('FINANCIAL-02', 'crossReference', 'important', 'knownFact', {
        heading: 'RESP',
        body: `An RESP exists${childLabel}${fr.institution ? ` at ${fr.institution}` : ''}. See the Family Financial Map for account details.`,
        childIds: fr.childIds,
      audiences: [...ACCOUNTANT_AUDIENCES, ...TRUSTEE_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    } else if (fr.type === 'rdsp') {
      const childLabel = fr.childNames.length > 0 ? ` for ${fr.childNames.join(' and ')}` : '';
      blocks.push(makeBlock('FINANCIAL-03', 'crossReference', 'important', 'knownFact', {
        heading: 'RDSP',
        body: `An RDSP exists${childLabel}${fr.institution ? ` at ${fr.institution}` : ''}. This is a registered disability savings plan. See the Family Financial Map for account details.`,
        childIds: fr.childIds,
      audiences: [...ACCOUNTANT_AUDIENCES, ...TRUSTEE_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    } else if (fr.type === 'trust') {
      blocks.push(makeBlock('FINANCIAL-01', 'crossReference', 'reference', 'knownFact', {
        heading: 'Family Trusts',
        body: `Family trusts have been identified. See the Family Trusts section for details.`,
      audiences: [...ACCOUNTANT_AUDIENCES, ...TRUSTEE_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    }
  }

  void parentLabel;
  return blocks;
}

function buildDocuments(ctx: NarrativeContext): NarrativeBlock[] {
  const { model } = ctx;
  const blocks: NarrativeBlock[] = [];

  const existingDocs = model.documents.filter(d => d.exists || d.locationKnown);
  if (existingDocs.length === 0) return [];

  blocks.push(makeBlock('DOC-01', 'summary', 'reference', 'knownFact', {
    heading: 'Where to Find Important Documents',
    body: `These are the documents and locations identified during the questionnaire.`,
  audiences: ALL_AUDIENCES,
  }));

  for (const doc of existingDocs) {
    const locationText = doc.locationKnown && doc.location
      ? `Located at: ${doc.location}`
      : 'Location unknown';
    blocks.push(makeBlock('DOC-01', 'crossReference', 'reference', 'knownFact', {
      heading: doc.label,
      body: `${doc.exists ? 'Exists' : 'May exist'}. ${locationText}.`,
      childIds: doc.childId ? [doc.childId] : undefined,
    audiences: ALL_AUDIENCES,
    }));
  }

  return blocks;
}

function buildReadiness(ctx: NarrativeContext): ReadinessNarrative {
  const { model, parentLabel } = ctx;
  const r = model.readiness;

  const decisionsMade: NarrativeBlock[] = r.decisionsMade.map(text =>
    makeBlock('READINESS-01', 'readiness', 'important', 'knownFact', {
      body: text,
    })
  );

  const thingsWorthConfirming: NarrativeBlock[] = r.thingsWorthConfirming.map(text =>
    makeBlock('READINESS-02', 'readiness', 'important', 'professionalReview', {
      body: text,
    })
  );

  const thingsStillToDo: NarrativeBlock[] = r.thingsStillToDo.map(text =>
    makeBlock('READINESS-03', 'readiness', 'primary', 'derived', {
      body: text,
    })
  );

  // Add summary block
  if (decisionsMade.length > 0) {
    decisionsMade.unshift(makeBlock('READINESS-01', 'summary', 'important', 'knownFact', {
      heading: 'Decisions You\'ve Made',
      body: `${parentLabel} have settled on these important decisions.`,
    audiences: [...CLIENT_PLANNING_AUDIENCES],
    }));
  }
  if (thingsWorthConfirming.length > 0) {
    thingsWorthConfirming.unshift(makeBlock('READINESS-02', 'summary', 'important', 'professionalReview', {
      heading: 'Things Worth Confirming',
      body: `These items may benefit from professional confirmation.`,
    audiences: [...LAWYER_AUDIENCES, ...ACCOUNTANT_AUDIENCES, ...TRUSTEE_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }
  if (thingsStillToDo.length > 0) {
    thingsStillToDo.unshift(makeBlock('READINESS-03', 'summary', 'primary', 'derived', {
      heading: 'Things Still To Do',
      body: `These items still need attention.`,
    audiences: [...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  return { decisionsMade, thingsWorthConfirming, thingsStillToDo };
}

function buildImmediateActions(ctx: NarrativeContext): ImmediateActionNarrative[] {
  const { model, parentLabel } = ctx;
  const actions: ImmediateActionNarrative[] = [];

  const seenActions = new Map<string, typeof model.immediateActions[number] & { mergedChildNames: string[] }>();
  for (const action of model.immediateActions) {
    const key = action.id.startsWith('people_contact') ? 'people_contact'
      : action.id.startsWith('keep_connected') ? 'keep_connected'
      : action.id;
    const existing = seenActions.get(key);
    if (existing) {
      for (const cn of action.childNames) {
        if (!existing.mergedChildNames.includes(cn)) existing.mergedChildNames.push(cn);
      }
    } else {
      seenActions.set(key, { ...action, mergedChildNames: [...action.childNames] });
    }
  }
  const dedupedActions = Array.from(seenActions.values());
  let actionPriority = 0;

  for (const action of dedupedActions) {
    actionPriority++;
    let heading = action.action;
    let body = '';
    let ruleId = 'IMMEDIATE-01';

    // Determine rule and refine heading/body
    if (action.id.startsWith('guardian_contact')) {
      ruleId = 'IMMEDIATE-01';
      heading = `Contact the intended guardian${action.childNames.length > 1 ? 's' : ''}`;
      body = `Reach out to the person${action.childNames.length > 1 ? 's' : ''} identified as guardian${action.childNames.length > 1 ? 's' : ''} for ${action.childNames.join(' and ')}.`;
    } else if (action.id.startsWith('keep_together')) {
      ruleId = 'IMMEDIATE-02';
      heading = 'Keep minor siblings together where reasonably possible';
      body = `If practical, keeping the children together can provide stability during a difficult time.`;
    } else if (action.id.startsWith('sibling_contact')) {
      ruleId = 'IMMEDIATE-03';
      heading = 'Contact important family';
      body = action.action.replace(/^Contact /, '');
    } else if (action.id.startsWith('people_contact')) {
      ruleId = 'IMMEDIATE-03';
      heading = 'Contact important people in the children\'s lives';
      body = action.action.replace(/^Contact /, 'Reach out to ');
    } else if (action.id === 'estate_trustee') {
      ruleId = 'IMMEDIATE-04';
      heading = 'Locate the Wills and contact the Estate Trustee';
      body = action.action.replace(/^Locate /, '');
    } else if (action.id.startsWith('gather_records')) {
      ruleId = 'IMMEDIATE-05';
      heading = 'Gather school and health records';
      body = action.action.replace(/^Gather /, '');
    } else if (action.id.startsWith('keep_connected')) {
      ruleId = 'IMMEDIATE-06';
      heading = 'Help the children stay connected to important people';
      const nameMatch = action.action.match(/identify ([^ ]+) as key relationships/);
      body = nameMatch ? `Identify ${nameMatch[1]} as a key relationship to preserve.` : action.action;
    } else if (action.id.startsWith('firstdays_')) {
      ruleId = 'IMMEDIATE-07';
      heading = `Follow ${parentLabel}'s first-days wishes`;
      body = action.action;
    } else if (action.id === 'avoid_changes') {
      ruleId = 'IMMEDIATE-08';
      heading = 'Avoid unnecessary changes initially';
      body = action.action;
    } else {
      body = action.action;
    }

    actions.push({
      id: action.id,
      heading,
      body,
      personNames: [],
      childNames: action.mergedChildNames,
      priority: actionPriority,
      isParentWish: action.isParentWish,
      ruleId,
    });
  }

  return actions;
}

function buildQuickReference(ctx: NarrativeContext): QuickReferenceItem[] {
  const { model } = ctx;
  const items: QuickReferenceItem[] = [];
  let id = 0;

  // Guardians
  for (const assignment of model.guardianAssignments) {
    items.push({
      id: `qr_${id++}`,
      label: `Guardian for ${assignment.childNames.join(' and ')}`,
      value: assignment.householdLabel,
      category: 'person',
      childIds: assignment.childIds,
    });
    if (assignment.alternatePeople.length > 0) {
      items.push({
        id: `qr_${id++}`,
        label: `Alternate guardian for ${assignment.childNames.join(' and ')}`,
        value: assignment.alternatePeople.map(p => p.name).join(' and '),
        category: 'person',
        childIds: assignment.childIds,
      });
    }
  }

  // Estate Trustees
  for (const et of model.estateTrustees) {
    if (et.primaryTrustee?.name) {
      items.push({
        id: `qr_${id++}`,
        label: `Estate Trustee (${et.clientName})`,
        value: et.primaryTrustee.name,
        category: 'role',
      });
    }
  }

  // Inheritance Trustees (deduplicated by child+trustee)
  const seenTrustees = new Set<string>();
  for (const child of model.children) {
    for (const record of child.inheritanceByClient) {
      if (record.trusteeName) {
        const key = `${child.childId}|${record.trusteeName}`;
        if (seenTrustees.has(key)) continue;
        seenTrustees.add(key);
        items.push({
          id: `qr_${id++}`,
          label: `Inheritance trustee for ${child.nickname || child.name}`,
          value: record.trusteeName,
          category: 'role',
          childIds: [child.childId],
        });
      }
    }
  }

  // Financial resources
  for (const fr of model.financialResources.filter(r => r.exists)) {
    const labelMap: Record<string, string> = {
      'life_insurance': 'Life Insurance',
      'resp': 'RESP',
      'rdsp': 'RDSP',
      'trust': 'Family Trust',
    };
    items.push({
      id: `qr_${id++}`,
      label: labelMap[fr.type] || fr.type,
      value: fr.childNames.length > 0 ? `For ${fr.childNames.join(', ')}` : 'See Financial Map',
      category: 'financial',
      childIds: fr.childIds.length > 0 ? fr.childIds : undefined,
    });
  }

  // Documents with locations
  for (const doc of model.documents.filter(d => d.locationKnown && d.location)) {
    items.push({
      id: `qr_${id++}`,
      label: doc.label,
      value: doc.location || '',
      category: 'document',
      childIds: doc.childId ? [doc.childId] : undefined,
    });
  }

  return items;
}

function buildFundingPhilosophyNarrative(ctx: NarrativeContext): NarrativeBlock[] {
  const { model, parentLabel } = ctx;
  const fp = model.fundingPhilosophy;
  if (!fp) return [];

  const blocks: NarrativeBlock[] = [];
  const guardianAudience = [...GUARDIAN_AUDIENCES, ...TRUSTEE_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES];
  const lawyerAudience = [...LAWYER_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES];
  const accountantAudience = [...ACCOUNTANT_AUDIENCES, ...TRUSTEE_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES];

  const overallApproachLabels: Record<string, string> = {
    majorExpensesOnly: 'resources should cover major expenses related to the children, not everyday household costs',
    shareIncrementalCosts: 'resources should share the incremental costs the children add to the household',
    generousHouseholdSupport: 'resources should generously support the whole guardian household, recognizing that the children benefit from a stable home',
    custom: '',
    unsure: 'they were still working through how resources should support the guardian household',
  };

  // FUNDING-01: Overall philosophy
  if (fp.overallApproach) {
    const label = overallApproachLabels[fp.overallApproach] || '';
    const body = label
      ? `${parentLabel} wanted ${label}.`
      : `${parentLabel} wanted resources to be available to support the guardian household.`;
    blocks.push(makeBlock('FUNDING-01', 'context', 'primary', 'parentPreference', {
      heading: 'How Parents Thought About Financial Support',
      body,
      audiences: guardianAudience,
    }));
  }

  // FUNDING-02: Everyday household costs
  if (fp.everydayExpenseApproach) {
    blocks.push(makeBlock('FUNDING-02', 'context', 'important', 'parentPreference', {
      heading: 'Everyday Household Costs',
      body: fp.everydayExpenseApproach,
      audiences: guardianAudience,
    }));
  }

  // FUNDING-03: Child-specific costs
  if (fp.meaningfulExpenseApproach) {
    blocks.push(makeBlock('FUNDING-03', 'context', 'important', 'parentPreference', {
      heading: 'Meaningful Child-Specific Costs',
      body: fp.meaningfulExpenseApproach,
      audiences: guardianAudience,
    }));
  }

  // FUNDING-04: Major household changes
  if (fp.majorHouseholdExpenseApproach) {
    blocks.push(makeBlock('FUNDING-04', 'context', 'important', 'parentPreference', {
      heading: 'Major Household Changes',
      body: fp.majorHouseholdExpenseApproach,
      audiences: guardianAudience,
    }));
  }

  // FUNDING-05: Housing support
  if (fp.housingPreference) {
    const wantsHousing = fp.housingPreference === 'yes' || fp.housingPreference === 'open_to_it';
    const body = wantsHousing
      ? `${parentLabel} would want resources available to help the guardian household adapt its living situation if taking in the children made that necessary.`
      : `${parentLabel} did not specifically anticipate supporting a larger home, but the overall funding philosophy still applies.`;

    blocks.push(makeBlock('FUNDING-05', 'context', 'important', 'parentPreference', {
      heading: 'Housing Support',
      body,
      audiences: [...guardianAudience, ...LAWYER_AUDIENCES],
    }));

    if (wantsHousing) {
      blocks.push(makeBlock('FUNDING-05', 'limitation', 'important', 'professionalReview', {
        body: 'Whether trust or estate resources can be used for housing depends on the legal authority granted. Worth confirming with an estate lawyer.',
        audiences: lawyerAudience,
      }));
    }
  }

  // FUNDING-06: Vehicle support
  if (fp.vehiclePreference) {
    const wantsVehicle = fp.vehiclePreference === 'yes' || fp.vehiclePreference === 'open_to_it';
    const vehicleBody = fp.vehicleNotes || (wantsVehicle
      ? `${parentLabel} would consider supporting a larger vehicle if needed.`
      : `${parentLabel} did not specifically anticipate vehicle support.`);
    blocks.push(makeBlock('FUNDING-06', 'context', 'supporting', 'parentPreference', {
      heading: 'Vehicle Support',
      body: vehicleBody,
      audiences: guardianAudience,
    }));
  }

  // FUNDING-07: Guardian reducing work
  if (fp.workReductionPreference) {
    const wantsWorkReduction = fp.workReductionPreference === 'yes' || fp.workReductionPreference === 'open_to_it';
    const workBody = fp.workReductionNotes || (wantsWorkReduction
      ? `${parentLabel} recognized that taking in the children might require reducing work hours. They would want resources to help offset that lost income.`
      : `${parentLabel} did not specifically anticipate lost-income support.`);
    blocks.push(makeBlock('FUNDING-07', 'context', 'important', 'parentPreference', {
      heading: 'Guardian Reducing Work',
      body: workBody,
      audiences: [...guardianAudience, ...ACCOUNTANT_AUDIENCES],
    }));
  }

  // FUNDING-08: Childcare / household help
  if (fp.householdHelpPreference) {
    const wantsHelp = fp.householdHelpPreference === 'yes' || fp.householdHelpPreference === 'open_to_it';
    blocks.push(makeBlock('FUNDING-08', 'context', 'supporting', 'parentPreference', {
      heading: 'Childcare or Household Help',
      body: wantsHelp
        ? `${parentLabel} would support hiring childcare or household help if it would ease the transition.`
        : `${parentLabel} did not specifically anticipate household help.`,
      audiences: guardianAudience,
    }));
  }

  // FUNDING-09: Shared household benefit
  if (fp.sharedHouseholdBenefitPhilosophy) {
    blocks.push(makeBlock('FUNDING-09', 'context', 'important', 'parentPreference', {
      heading: 'Expenses That Benefit the Whole Household',
      body: fp.sharedHouseholdBenefitPhilosophy,
      audiences: [...guardianAudience, ...ACCOUNTANT_AUDIENCES],
    }));
  }

  // FUNDING-10: Fairness within guardian household
  if (fp.guardianOwnChildrenFairnessNotes) {
    blocks.push(makeBlock('FUNDING-10', 'context', 'important', 'parentPreference', {
      heading: 'Fairness Within the Guardian Household',
      body: fp.guardianOwnChildrenFairnessNotes,
      audiences: guardianAudience,
    }));
  }

  // FUNDING-11: Record-keeping philosophy
  if (fp.recordKeepingPreference) {
    blocks.push(makeBlock('FUNDING-11', 'context', 'important', 'parentPreference', {
      heading: 'Record-Keeping Philosophy',
      body: fp.recordKeepingPreference,
      audiences: [...guardianAudience, ...ACCOUNTANT_AUDIENCES, ...TRUSTEE_AUDIENCES],
    }));
  }

  // FUNDING-12: Parent message about financial support
  if (fp.parentMessageToGuardian) {
    blocks.push(makeBlock('FUNDING-12', 'parentVoice', 'primary', 'parentPreference', {
      heading: 'A Message From the Parents About Financial Support',
      body: fp.parentMessageToGuardian,
      audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
    }));
  }

  return blocks;
}

function buildCoordinationNarrative(ctx: NarrativeContext): NarrativeBlock[] {
  const { model, parentLabel } = ctx;
  const coords = model.careFundingCoordination;
  if (!coords || coords.length === 0) return [];

  const blocks: NarrativeBlock[] = [];
  const fp = model.fundingPhilosophy;
  const guardianAudience = [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES];
  const trusteeAudience = [...TRUSTEE_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES];
  const lawyerAudience = [...LAWYER_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES];

  // Find scenarios where coordination is needed (different people)
  const needsCoordination = coords.filter(c => c.coordinationNeeded);
  const samePerson = coords.filter(c => c.samePeople);

  // COORDINATION-02: Same person holds both roles — only when there is mixed same/different
  if (samePerson.length > 0 && needsCoordination.length === 0 && samePerson.length < coords.length) {
    blocks.push(makeBlock('COORDINATION-02', 'context', 'primary', 'derived', {
      heading: 'One Person, Two Roles',
      body: `The same person who would provide day-to-day care also manages the financial resources. This simplifies decision-making because one person holds both perspectives.`,
      audiences: guardianAudience,
    }));
  }

  // COORDINATION-01: Different people hold care and financial roles
  if (needsCoordination.length > 0) {
    blocks.push(makeBlock('COORDINATION-01', 'context', 'primary', 'derived', {
      heading: 'Working Together for the Children',
      body: `The person providing day-to-day care and the person managing financial resources are different. This means two people need to work together. Each was chosen for different reasons — but for the same purpose.`,
      audiences: [...guardianAudience, ...trusteeAudience],
    }));

    // COORDINATION-03: Guardian judgment
    if (fp?.guardianJudgmentWeight || fp?.guardianJudgmentNotes) {
      const judgmentBody = fp.guardianJudgmentNotes
        || (fp.guardianJudgmentWeight === 'primary'
          ? `${parentLabel} wanted the guardian's day-to-day judgment to carry significant weight.`
          : fp.guardianJudgmentWeight === 'equal'
            ? `${parentLabel} wanted the guardian and financial decision-maker to have equal say.`
            : `${parentLabel} wanted major financial decisions to carry more weight than day-to-day preferences.`);
      blocks.push(makeBlock('COORDINATION-03', 'context', 'important', 'parentPreference', {
        heading: 'How Much Weight to Give the Guardian Perspective',
        body: judgmentBody,
        audiences: [...guardianAudience, ...trusteeAudience],
      }));
    }

    // COORDINATION-04: Long-term financial responsibility
    if (fp?.financialDecisionMakerShouldUnderstand && fp.financialDecisionMakerShouldUnderstand.length > 0) {
      blocks.push(makeBlock('COORDINATION-04', 'context', 'important', 'parentPreference', {
        heading: 'What the Financial Decision-Maker Should Understand',
        body: fp.financialDecisionMakerShouldUnderstand.join('; '),
        audiences: [...trusteeAudience, ...GUARDIAN_AUDIENCES],
      }));
    }

    // COORDINATION-05: Major decisions requiring discussion
    if (fp?.discussionRequiredFor && fp.discussionRequiredFor.length > 0) {
      blocks.push(makeBlock('COORDINATION-05', 'context', 'important', 'parentPreference', {
        heading: 'Major Decisions That Should Involve Discussion',
        body: fp.discussionRequiredFor.join('; '),
        audiences: [...guardianAudience, ...trusteeAudience],
      }));
    }

    // COORDINATION-06: Discussion threshold
    if (fp?.hasDiscussionThreshold || fp?.discussionThresholdAmount) {
      const thresholdBody = fp.hasDiscussionThreshold === 'yes' && fp.discussionThresholdAmount
        ? `${parentLabel} wanted the guardian and financial decision-maker to discuss any expense above ${fp.discussionThresholdAmount}.`
        : `${parentLabel} wanted the guardian and financial decision-maker to use judgment about when to consult each other.`;
      blocks.push(makeBlock('COORDINATION-06', 'context', 'supporting', 'parentPreference', {
        heading: 'When to Consult Each Other',
        body: thresholdBody,
        audiences: [...guardianAudience, ...trusteeAudience],
      }));
    }

    // COORDINATION-07: Disagreement process
    if (fp?.disagreementApproach && fp.disagreementApproach.length > 0) {
      blocks.push(makeBlock('COORDINATION-07', 'context', 'important', 'parentPreference', {
        heading: 'If They Disagree',
        body: fp.disagreementApproach.join('; '),
        audiences: [...guardianAudience, ...trusteeAudience, ...LAWYER_AUDIENCES],
      }));
    }

    // COORDINATION-08: Professional escalation
    if (fp?.escalationPersonIds && fp.escalationPersonIds.length > 0) {
      const escalationNames = fp.escalationPersonIds.join(', ');
      blocks.push(makeBlock('COORDINATION-08', 'context', 'important', 'parentPreference', {
        heading: 'Who to Involve If They Cannot Resolve Something',
        body: `${parentLabel} suggested involving: ${escalationNames}.`,
        audiences: [...guardianAudience, ...trusteeAudience, ...LAWYER_AUDIENCES],
      }));
    }

    // COORDINATION-09: Parent message to guardian
    if (fp?.parentMessageToGuardian) {
      blocks.push(makeBlock('COORDINATION-09', 'parentVoice', 'important', 'parentPreference', {
        heading: `A Message for the Guardian`,
        body: fp.parentMessageToGuardian,
        audiences: [...GUARDIAN_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    }

    // COORDINATION-10: Parent message to financial decision-maker
    if (fp?.parentMessageToFinancialDecisionMaker) {
      blocks.push(makeBlock('COORDINATION-10', 'parentVoice', 'important', 'parentPreference', {
        heading: `A Message for the Financial Decision-Maker`,
        body: fp.parentMessageToFinancialDecisionMaker,
        audiences: [...TRUSTEE_AUDIENCES, ...CLIENT_PLANNING_AUDIENCES],
      }));
    }

    // COORDINATION-11: Parent message about working together
    if (fp?.parentMessageAboutWorkingTogether) {
      blocks.push(makeBlock('COORDINATION-11', 'parentVoice', 'primary', 'parentPreference', {
        heading: `A Message About Working Together`,
        body: fp.parentMessageAboutWorkingTogether,
        audiences: [...guardianAudience, ...trusteeAudience],
      }));
    }
  }

  // Identity confidence limitation
  if (coords.some(c => c.identityConfidence === 'low')) {
    blocks.push(makeBlock('COORDINATION-01', 'limitation', 'important', 'professionalReview', {
      body: 'Some role comparisons could not be made with full confidence because identity references were not fully resolved. Worth confirming which roles the same person holds.',
      audiences: lawyerAudience,
    }));
  }

  return blocks;
}

function filterBlocksByAudience(blocks: NarrativeBlock[], audience: GuardianshipAudience): NarrativeBlock[] {
  return blocks.filter(b => !b.audiences || b.audiences.length === 0 || b.audiences.includes(audience));
}

function filterChildByAudience(child: GuardianshipChildNarrative, audience: GuardianshipAudience): GuardianshipChildNarrative {
  return {
    ...child,
    introduction: filterBlocksByAudience(child.introduction || [], audience),
    personalProfile: filterBlocksByAudience(child.personalProfile || [], audience),
    education: filterBlocksByAudience(child.education || [], audience),
    healthcare: filterBlocksByAudience(child.healthcare || [], audience),
    supportTransition: filterBlocksByAudience(child.supportTransition || [], audience),
    peopleAndConnections: filterBlocksByAudience(child.peopleAndConnections || [], audience),
    activities: filterBlocksByAudience(child.activities || [], audience),
    communitiesAndTraditions: filterBlocksByAudience(child.communitiesAndTraditions || [], audience),
    inheritance: filterBlocksByAudience(child.inheritance || [], audience),
    adultTransition: filterBlocksByAudience(child.adultTransition || [], audience),
  };
}

export function getNarrativeForAudience(
  narrative: GuardianshipNarrativeModel,
  audience: GuardianshipAudience
): GuardianshipNarrativeModel {
  return {
    familyContext: filterBlocksByAudience(narrative.familyContext, audience),
    guardianPlan: filterBlocksByAudience(narrative.guardianPlan, audience),
    children: narrative.children.map(c => filterChildByAudience(c, audience)),
    familyRoles: filterBlocksByAudience(narrative.familyRoles, audience),
    financialResources: filterBlocksByAudience(narrative.financialResources, audience),
    fundingPhilosophy: filterBlocksByAudience(narrative.fundingPhilosophy, audience),
    coordination: filterBlocksByAudience(narrative.coordination, audience),
    documents: filterBlocksByAudience(narrative.documents, audience),
    readiness: {
      decisionsMade: filterBlocksByAudience(narrative.readiness.decisionsMade, audience),
      thingsWorthConfirming: filterBlocksByAudience(narrative.readiness.thingsWorthConfirming, audience),
      thingsStillToDo: filterBlocksByAudience(narrative.readiness.thingsStillToDo, audience),
    },
    immediateActions: narrative.immediateActions,
    quickReference: narrative.quickReference,
  };
}

export function buildGuardianshipNarrative(model: GuardianshipRoadmapModel): GuardianshipNarrativeModel {
  blockCounter = 0;

  const clientNames = model.family.clientNames;
  const parentLabel = getParentLabel(clientNames);
  const ctx: NarrativeContext = { model, clientNames, parentLabel };

  const familyContext = buildFamilyContext(ctx);
  const guardianPlan = buildGuardianPlan(ctx);
  const children = model.children
    .filter(c => c.status === 'minor')
    .map(c => buildChildNarrative(c, ctx));
  const familyRoles = buildFamilyRoles(ctx);
  const financialResources = buildFinancialResources(ctx);
  const documents = buildDocuments(ctx);
  const readiness = buildReadiness(ctx);
  const immediateActions = buildImmediateActions(ctx);
  const quickReference = buildQuickReference(ctx);

  const fundingPhilosophy = buildFundingPhilosophyNarrative(ctx);
  const coordination = buildCoordinationNarrative(ctx);

  return {
    familyContext,
    guardianPlan,
    children,
    familyRoles,
    financialResources,
    fundingPhilosophy,
    coordination,
    documents,
    readiness,
    immediateActions,
    quickReference,
  };
}
