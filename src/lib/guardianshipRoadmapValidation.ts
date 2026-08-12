import type { GuardianshipRoadmapModel } from './guardianshipRoadmapTypes';

export type ValidationFinding = {
  level: 'error' | 'warning';
  message: string;
  childId?: string;
};

const RAW_ID_PATTERNS = [
  /^doctor_\d+$/,
  /^support_\d+$/,
  /^adult_sib_\d+$/,
  /^sibling_\d+$/,
  /^pp_/,
];

function looksLikeRawId(value: string): boolean {
  return RAW_ID_PATTERNS.some(p => p.test(value));
}

export function validateGuardianshipRoadmap(model: GuardianshipRoadmapModel): ValidationFinding[] {
  const findings: ValidationFinding[] = [];

  for (const child of model.children) {
    if (!child.name && !child.nickname) {
      findings.push({ level: 'error', message: `Child at index ${child.index} has no name`, childId: child.childId });
    }

    if (child.status === 'minor' && child.age !== undefined && child.age >= model.family.ageOfMajority) {
      findings.push({ level: 'error', message: `${child.nickname || child.name} classified as minor but age ${child.age} >= age of majority ${model.family.ageOfMajority}`, childId: child.childId });
    }

    if (child.status === 'adult_independent') {
      const assignment = model.guardianAssignments.find(a => a.childIds.includes(child.childId));
      if (assignment) {
        findings.push({ level: 'warning', message: `Adult independent child ${child.nickname || child.name} appears in a guardian assignment`, childId: child.childId });
      }
    }

    if (child.healthcareTransition) {
      for (const provider of child.healthcareTransition.selectedProviders) {
        if (!provider.resolved) {
          findings.push({ level: 'warning', message: `Healthcare provider ID ${provider.id} not resolved for ${child.nickname || child.name}`, childId: child.childId });
        }
      }
    }

    for (const person of child.peopleToKeepClose || []) {
      if (!person.resolved && person.name) {
        findings.push({ level: 'warning', message: `Person to keep close ${person.name} not resolved for ${child.nickname || child.name}`, childId: child.childId });
      }
      if (person.name && looksLikeRawId(person.name)) {
        findings.push({ level: 'error', message: `Raw ID ${person.name} in peopleToKeepClose for ${child.nickname || child.name}`, childId: child.childId });
      }
    }

    for (const conn of child.importantConnections || []) {
      if (conn.name && looksLikeRawId(conn.name)) {
        findings.push({ level: 'error', message: `Raw ID in importantConnection name for ${child.nickname || child.name}`, childId: child.childId });
      }
    }

    for (const support of child.supportTransition || []) {
      if (looksLikeRawId(support.supportTypeLabel)) {
        findings.push({ level: 'error', message: `Raw ID in supportTypeLabel for ${child.nickname || child.name}`, childId: child.childId });
      }
    }
  }

  for (const assignment of model.guardianAssignments) {
    for (const id of assignment.guardianPersonIds) {
      if (!assignment.guardianPeople.find(p => p.id === id)) {
        findings.push({ level: 'error', message: `Guardian assignment references nonexistent person ID ${id}` });
      }
    }
    for (const id of assignment.alternatePersonIds) {
      if (!assignment.alternatePeople.find(p => p.id === id)) {
        findings.push({ level: 'error', message: `Alternate guardian assignment references nonexistent person ID ${id}` });
      }
    }
  }

  const actionTexts = new Set<string>();
  for (const action of model.immediateActions) {
    if (actionTexts.has(action.action)) {
      findings.push({ level: 'warning', message: `Duplicate immediate action: ${action.action}` });
    }
    actionTexts.add(action.action);
  }

  const docKeys = new Set<string>();
  for (const doc of model.documents) {
    const key = `${doc.type}_${doc.childId || ''}_${doc.clientId || ''}`;
    if (docKeys.has(key)) {
      findings.push({ level: 'warning', message: `Duplicate document record: ${doc.label}` });
    }
    docKeys.add(key);
  }

  return findings;
}
