import type {
  GuardianshipRoadmapModel,
  GuardianshipChildProfile,
  ChildStatus,
  PlanningPerson,
  GuardianContext,
  PersonalProfile,
  EducationTransition,
  HealthcareTransition,
  HealthcareProvider,
  SupportTransitionRow,
  ImportantConnection,
  CommunityItem,
  TraditionItem,
  PersonToKeepClose,
  InheritanceInfo,
  AdultTransitionInfo,
  RoleAssignment,
  FinancialResourceSummary,
  DocumentRegistryEntry,
  ReadinessCategory,
  ImmediateAction,
} from './guardianshipRoadmapTypes';

type AnswersMap = Map<string, Record<string, unknown>>;

const HIGHER_MAJORITY_PROVINCES = ['bc', 'british columbia', 'nova scotia', 'new brunswick', 'newfoundland', 'nl', 'ns', 'nb'];

function getAgeOfMajority(province: string): number {
  const p = province.toLowerCase();
  return HIGHER_MAJORITY_PROVINCES.some(s => p.includes(s)) ? 19 : 18;
}

function computeAge(dateOfBirth: string): number | undefined {
  if (!dateOfBirth) return undefined;
  const birth = new Date(dateOfBirth);
  if (isNaN(birth.getTime())) return undefined;
  const today = new Date();
  const age = (today.getTime() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  return Math.floor(age);
}

function classifyChild(
  child: Record<string, string> | undefined,
  ageOfMajority: number
): ChildStatus {
  if (!child?.dateOfBirth) return 'minor';
  const age = computeAge(child.dateOfBirth);
  if (age === undefined || age < ageOfMajority) return 'minor';
  const isDisabled = child.disabled === 'yes' || child.disabled === 'not_sure';
  const isIndependent = child.independent === 'yes';
  if (isIndependent && !isDisabled) return 'adult_independent';
  return 'adult_dependant';
}

function derivePlanningFocus(
  status: ChildStatus,
  disabled: boolean,
  disabilityUncertain: boolean
): string {
  if (status === 'adult_independent') return 'Adult — independent';
  if (status === 'adult_dependant') {
    if (disabled) return 'Adult — ongoing support needs';
    return 'Adult — may need support';
  }
  if (disabled) return 'Minor — ongoing support needs';
  if (disabilityUncertain) return 'Minor — support needs being assessed';
  return 'Minor';
}

function parsePlanningPersons(raw: unknown): PlanningPerson[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((p: Record<string, unknown>) => ({
    id: String(p.id || ''),
    name: String(p.name || ''),
    relationship: String(p.relationship || ''),
    phone: String(p.phone || ''),
    email: String(p.email || ''),
    city: String(p.city || ''),
    province: String(p.province || ''),
    country: String(p.country || ''),
  }));
}

function findPerson(persons: PlanningPerson[], id?: string): PlanningPerson | undefined {
  if (!id) return undefined;
  return persons.find(p => p.id === id);
}

function buildCommunityString(city?: string, province?: string, country?: string): string {
  const parts = [city, province, country].filter(Boolean);
  return parts.join(', ');
}

function isCrossBorder(childCountry: string, guardianCountry: string): boolean {
  const c1 = (childCountry || '').trim().toLowerCase();
  const c2 = (guardianCountry || '').trim().toLowerCase();
  if (!c1 || !c2) return false;
  return c1 !== c2;
}

function isCrossProvince(childProvince: string, childCountry: string, guardianProvince: string, guardianCountry: string): boolean {
  if (isCrossBorder(childCountry, guardianCountry)) return false;
  const p1 = (childProvince || '').trim().toLowerCase();
  const p2 = (guardianProvince || '').trim().toLowerCase();
  if (!p1 || !p2) return false;
  return p1 !== p2;
}

function parseJsonArray<T>(raw: string | undefined): T[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function buildGuardianContext(
  child: Record<string, string>,
  childrenData: Record<string, string>[],
  planningPersons: PlanningPerson[]
): GuardianContext | undefined {
  const guardianId = child.guardianPersonId;
  const alternateId = child.alternateGuardianPersonId;
  const guardian = findPerson(planningPersons, guardianId);
  const alternate = findPerson(planningPersons, alternateId);

  if (!guardian && !alternate && !child.guardianConsidered) return undefined;

  const appliesTo = (child.guardianAppliesTo || '').split(',').filter(Boolean);
  const appliesToNames = appliesTo.map(idx => {
    const i = parseInt(idx, 10);
    const c = childrenData[i];
    return c?.nickname || c?.name || '';
  }).filter(Boolean);

  const childCommunity = buildCommunityString(
    child.cityOfResidence,
    child.provinceTerritory,
    child.countryOfResidence
  );
  const guardianCommunity = guardian
    ? buildCommunityString(guardian.city, guardian.province, guardian.country)
    : '';

  return {
    guardian,
    alternateGuardian: alternate,
    guardianSpokenWith: child.guardianSpokenWith || '',
    guardianInWill: child.guardianInWill || '',
    guardianConsidered: child.guardianConsidered || '',
    guardianCommunity,
    childCommunity,
    moveExpected: child.transitionMoveExpected || '',
    isCrossBorder: guardian
      ? isCrossBorder(child.countryOfResidence, guardian.country)
      : false,
    isCrossProvince: guardian
      ? isCrossProvince(child.provinceTerritory, child.countryOfResidence, guardian.province, guardian.country)
      : false,
    appliesToChildNames: appliesToNames,
  };
}

function buildPersonalProfile(child: Record<string, string>): PersonalProfile {
  const activities = parseJsonArray<{
    name?: string; type?: string; importance?: string; frequency?: string;
  }>(child.activityList).map(a => ({
    name: String(a.name || ''),
    type: String(a.type || ''),
    importance: String(a.importance || ''),
    frequency: String(a.frequency || ''),
  }));

  return {
    communicationStyle: child.communicationStyle,
    emotionalExpression: child.emotionalExpression,
    comfortStrategies: child.comfortStrategies,
    socialChallenges: child.socialChallenges,
    behaviouralConsiderations: child.behaviouralConsiderations,
    importantRoutines: child.importantRoutines,
    activities,
    socialAdditionalNotes: child.socialAdditionalNotes,
    transitionEasier: child.transitionEasierText,
    missedMost: child.belongingMissedMost,
    feelConnected: child.belongingFeelConnected,
  };
}

function buildEducationTransition(child: Record<string, string>): EducationTransition | undefined {
  if (!child.attendingSchool || child.attendingSchool === 'no') return undefined;

  return {
    schoolName: child.schoolName,
    schoolPhone: child.schoolPhone,
    schoolAddress: child.schoolAddress,
    currentGrade: child.currentGrade,
    hasIEP: child.hasIEP === 'yes',
    iepDetails: child.individualEducationPlan,
    iepDocumentLocation: child.iepDocumentLocation,
    schoolChangeExpected: child.transitionSchoolChangeExpected,
    newSchoolNotes: child.transitionNewSchoolNotes,
    recordLocation: child.transitionEducationRecordLocation,
    learningStyleNotes: child.learningStyleNotes,
    schoolExtraSupport: child.schoolExtraSupport,
    schoolFocusHelps: child.schoolFocusHelps,
  };
}

function buildHealthcareTransition(child: Record<string, string>): HealthcareTransition {
  const providers: HealthcareProvider[] = [];
  const categories = ['family', 'school', 'doctor', 'other'];
  for (const cat of categories) {
    const count = parseInt(child[`careCoord_${cat}_count`] || '0', 10);
    for (let i = 0; i < count; i++) {
      const name = child[`careCoord_${cat}_${i}_name`];
      if (!name) continue;
      providers.push({
        name,
        role: child[`careCoord_${cat}_${i}_role`] || '',
        category: cat,
        phone: child[`careCoord_${cat}_${i}_phone`],
        email: child[`careCoord_${cat}_${i}_email`],
        city: child[`careCoord_${cat}_${i}_city`],
        province: child[`careCoord_${cat}_${i}_province`],
      });
    }
  }

  const medicationList = parseJsonArray<{ name?: string; dose?: string; schedule?: string }>(
    child.medicationList
  ).map(m => ({
    name: String(m.name || ''),
    dose: String(m.dose || ''),
    schedule: String(m.schedule || ''),
  }));

  const allergyList = parseJsonArray<{ name?: string; severity?: string }>(
    child.allergyList
  ).map(a => ({
    name: String(a.name || ''),
    severity: String(a.severity || ''),
  }));

  const providersToContact = (child.transitionProviderSelections || '')
    .split(',').filter(Boolean);

  return {
    providers,
    pharmacyName: child.pharmacyName,
    medications: child.medications,
    medicationList,
    allergies: child.allergies,
    allergyList,
    medicalConditions: child.medicalIssues === 'yes' ? child.medicalIssuesDescription : undefined,
    carePlanWritten: child.carePlanWritten,
    carePlanStored: child.carePlanStored,
    providersToContact,
    recordLocation: child.transitionHealthRecordLocation,
    medicationNotes: child.transitionMedicationNotes,
  };
}

function buildSupportTransition(
  child: Record<string, string>,
  moveLikely: boolean
): SupportTransitionRow[] | undefined {
  if (child.disabled !== 'yes' && child.disabled !== 'not_sure') return undefined;

  const supportsList = parseJsonArray<{ name?: string; provider?: string; purpose?: string }>(
    child.disabilitySupportsList
  );

  const selectedSupports = (child.transitionSupportSelections || '')
    .split(',').filter(Boolean);

  if (supportsList.length === 0 && selectedSupports.length === 0) return undefined;

  return supportsList.map(s => ({
    supportType: String(s.name || ''),
    currentProvider: String(s.provider || ''),
    purpose: String(s.purpose || ''),
    ifChildMoves: moveLikely
      ? 'Re-establish with a local provider in the guardian\'s community if practical.'
      : 'Continue with current provider if practical.',
  }));
}

function buildImportantConnections(
  child: Record<string, string>,
  moveLikely: boolean
): ImportantConnection[] {
  const raw = parseJsonArray<{
    displayName?: string; connectionType?: string; contexts?: string[];
    importance?: string; relationshipNotes?: string;
    contactName?: string; contactPhone?: string; contactEmail?: string;
    continuityIdeas?: string[];
  }>(child.belongingConnections);

  return raw.map(c => ({
    name: String(c.displayName || ''),
    relationshipType: String(c.connectionType || ''),
    contexts: Array.isArray(c.contexts) ? c.contexts.map(String) : [],
    whyItMatters: String(c.relationshipNotes || ''),
    importance: String(c.importance || ''),
    contactName: c.contactName,
    contactPhone: c.contactPhone,
    contactEmail: c.contactEmail,
    continuityIdeas: Array.isArray(c.continuityIdeas) ? c.continuityIdeas.map(String) : [],
    moveComplicates: moveLikely && c.importance === 'especially_important',
  }));
}

function buildCommunities(child: Record<string, string>): CommunityItem[] {
  return parseJsonArray<{
    type?: string; name?: string; importanceNotes?: string; continuityPreference?: string;
  }>(child.belongingCommunities).map(c => ({
    type: String(c.type || ''),
    name: String(c.name || ''),
    importanceNotes: String(c.importanceNotes || ''),
    continuityPreference: String(c.continuityPreference || ''),
  }));
}

function buildTraditions(child: Record<string, string>): TraditionItem[] {
  return parseJsonArray<{
    type?: string; name?: string; participantTypes?: string[];
    participantNotes?: string; importanceNotes?: string; continueIfPractical?: string;
  }>(child.belongingTraditions).map(t => ({
    name: String(t.name || ''),
    type: String(t.type || ''),
    participantTypes: Array.isArray(t.participantTypes) ? t.participantTypes.map(String) : [],
    participantNotes: String(t.participantNotes || ''),
    importanceNotes: String(t.importanceNotes || ''),
    continueIfPractical: String(t.continueIfPractical || ''),
  }));
}

function resolveFamilySelections(
  selections: string,
  planningPersons: PlanningPerson[],
  childrenData: Record<string, string>[]
): PersonToKeepClose[] {
  const ids = selections.split(',').filter(Boolean);
  const result: PersonToKeepClose[] = [];

  for (const id of ids) {
    if (id.startsWith('adult_sib_')) {
      const sibIdx = parseInt(id.replace('adult_sib_', ''), 10);
      const sib = childrenData[sibIdx];
      if (sib) {
        result.push({
          name: sib.nickname || sib.name || '',
          relationship: 'Adult sibling',
          role: 'emotional',
        });
      }
    } else if (id.startsWith('pp_')) {
      const person = planningPersons.find(p => p.id === id);
      if (person) {
        result.push({
          name: person.name,
          relationship: person.relationship || 'Family member',
          role: 'emotional',
        });
      }
    } else if (id === 'parent1') {
      result.push({ name: 'Parent / Guardian 1', relationship: 'Parent', role: 'emotional' });
    } else if (id === 'parent2') {
      result.push({ name: 'Parent / Guardian 2', relationship: 'Parent', role: 'emotional' });
    }
  }

  return result;
}

function buildInheritance(
  childIndex: number,
  willsAnswers: Record<string, unknown>
): InheritanceInfo | undefined {
  const currentWillData = willsAnswers.currentWillData as Record<string, unknown> | undefined;
  const clients = (currentWillData?.clients as Array<Record<string, unknown>>) || [];

  for (const client of clients) {
    const arrangements = (client.childSpecificArrangements as Array<Record<string, unknown>>) || [];
    const match = arrangements.find(a => {
      const cid = String(a.childId || '');
      return cid === `child_${childIndex}` || cid === String(childIndex);
    });
    if (match) {
      return {
        type: String(client.inheritanceType || ''),
        stages: ((client.trustStages as Array<Record<string, unknown>>) || []).map(s => ({
          age: String(s.age || ''),
          fraction: String(s.fraction || ''),
          description: String(s.description || ''),
        })),
        trusteeName: String(client.trustTrusteeName || ''),
        specialArrangement: String(match.specialArrangement || ''),
        knownTrustType: String(match.knownTypeName || ''),
        description: String(match.description || ''),
      };
    }

    if (client.inheritanceType) {
      return {
        type: String(client.inheritanceType || ''),
        stages: ((client.trustStages as Array<Record<string, unknown>>) || []).map(s => ({
          age: String(s.age || ''),
          fraction: String(s.fraction || ''),
          description: String(s.description || ''),
        })),
        trusteeName: String(client.trustTrusteeName || ''),
      };
    }
  }

  return undefined;
}

function buildAdultTransition(child: Record<string, string>): AdultTransitionInfo | undefined {
  if (child.disabled !== 'yes' && child.disabled !== 'not_sure') return undefined;

  const age = computeAge(child.dateOfBirth);
  const reviewNeeded = age !== undefined && age >= 14 && age < 19;

  return {
    futureIndependenceLevel: child.futureIndependenceLevel,
    futureFinancialHelp: child.futureFinancialHelp,
    futurePersonalHealthHelp: child.futurePersonalHealthHelp,
    dtcStatus: child.disabilityTaxCredit,
    dtcDocLocation: child.disabilityTaxCreditDocLocation,
    futureCaregiverName: child.futureCareTeamSelection,
    futureCaregiverResponsibility: child.futureCareTeamResponsibility,
    reviewNeeded,
  };
}

function buildFirstDaysPriorities(
  child: Record<string, string>
): string[] | undefined {
  const count = parseInt(child.transitionFirstDaysCount || '0', 10);
  if (!count) return undefined;
  const items: string[] = [];
  for (let i = 0; i < count; i++) {
    const val = child[`transitionFirstDays_${i}`];
    if (val) items.push(val);
  }
  return items.length > 0 ? items : undefined;
}

function buildRoles(
  children: GuardianshipChildProfile[],
  willsAnswers: Record<string, unknown>,
  estateTrusteesAnswers: Record<string, unknown>
): RoleAssignment[] {
  const roles: RoleAssignment[] = [];
  const minorChildren = children.filter(c => c.status === 'minor');

  if (minorChildren.length > 0) {
    const firstChild = minorChildren[0];
    const guardian = firstChild.guardianContext?.guardian;
    const alternate = firstChild.guardianContext?.alternateGuardian;

    roles.push({
      responsibility: 'Day-to-day care of minor children',
      firstChoice: guardian?.name,
      backup: alternate?.name,
      childIds: minorChildren.map(c => c.childId),
    });
  }

  const currentWillData = willsAnswers.currentWillData as Record<string, unknown> | undefined;
  const clients = (currentWillData?.clients as Array<Record<string, unknown>>) || [];
  const trusteeName = clients.find(c => c.trustTrusteeName)?.trustTrusteeName as string | undefined;
  if (trusteeName) {
    roles.push({
      responsibility: 'Manage children\'s inheritance / trust',
      firstChoice: trusteeName,
      childIds: minorChildren.map(c => c.childId),
    });
  }

  const etName = estateTrusteesAnswers.client1EstateTrusteeName as string | undefined;
  const etAltName = estateTrusteesAnswers.client1AlternateEstateTrustee1Name as string | undefined;
  if (etName) {
    roles.push({
      responsibility: 'Estate administration',
      firstChoice: etName,
      backup: etAltName,
    });
  }

  const adultIndependent = children.find(c => c.status === 'adult_independent');
  if (adultIndependent?.adultSiblingRole) {
    roles.push({
      responsibility: 'Maintain sibling connection (emotional support, not caregiving)',
      firstChoice: adultIndependent.name,
      childIds: minorChildren.map(c => c.childId),
    });
  }

  return roles.filter(r => r.firstChoice || r.backup);
}

function buildFinancialResources(
  children: GuardianshipChildProfile[],
  lifeInsuranceAnswers: Record<string, unknown>,
  financialFootprintAnswers: Record<string, unknown>,
  familyTrustsAnswers: Record<string, unknown>
): FinancialResourceSummary[] {
  const resources: FinancialResourceSummary[] = [];
  const childIds = children.map(c => c.childId);

  const c1HasLI = lifeInsuranceAnswers.client1HasLifeInsurance === 'yes';
  const c2HasLI = lifeInsuranceAnswers.client2HasLifeInsurance === 'yes';
  resources.push({
    type: 'life_insurance',
    exists: c1HasLI || c2HasLI,
    childIds,
    crossReference: 'See Family Financial Map for policy details',
  });

  const investments = (financialFootprintAnswers.investmentsData as Array<Record<string, unknown>>) || [];
  const respAccounts = investments.filter(a =>
    String(a.accountType || '').toLowerCase().includes('resp')
  );
  resources.push({
    type: 'resp',
    exists: respAccounts.length > 0,
    childIds,
    crossReference: 'See Family Financial Map for account details',
  });

  const rdspAccounts = investments.filter(a =>
    String(a.accountType || '').toLowerCase().includes('rdsp')
  );
  resources.push({
    type: 'rdsp',
    exists: rdspAccounts.length > 0,
    childIds: children.filter(c => c.disabled).map(c => c.childId),
    crossReference: 'See Family Financial Map for account details',
  });

  const trusts = (familyTrustsAnswers.familyTrustsData as Array<Record<string, unknown>>) || [];
  resources.push({
    type: 'trust',
    exists: trusts.length > 0,
    childIds,
    crossReference: 'See Family Trusts section for details',
  });

  return resources;
}

function buildDocuments(
  children: GuardianshipChildProfile[],
  willsAnswers: Record<string, unknown>
): DocumentRegistryEntry[] {
  const docs: DocumentRegistryEntry[] = [];

  const currentWillData = willsAnswers.currentWillData as Record<string, unknown> | undefined;
  const clients = (currentWillData?.clients as Array<Record<string, unknown>>) || [];
  const client1Will = clients.find(c => c.clientId === 'client1');
  const hasWill = (client1Will?.documentBasics as Record<string, unknown>)?.hasWill === 'yes';
  const willLocation = (client1Will?.documentBasics as Record<string, unknown>)?.willLocation as string | undefined;

  docs.push({
    type: 'will',
    label: 'Last Will and Testament',
    exists: hasWill,
    locationKnown: !!willLocation,
    location: willLocation,
  });

  for (const child of children) {
    if (child.educationTransition?.iepDocumentLocation) {
      docs.push({
        type: 'iep',
        label: `IEP for ${child.nickname || child.name}`,
        exists: child.educationTransition.hasIEP,
        locationKnown: true,
        location: child.educationTransition.iepDocumentLocation,
        childId: child.childId,
      });
    }
    if (child.educationTransition?.recordLocation) {
      docs.push({
        type: 'education_records',
        label: `Education records for ${child.nickname || child.name}`,
        exists: true,
        locationKnown: true,
        location: child.educationTransition.recordLocation,
        childId: child.childId,
      });
    }
    if (child.healthcareTransition?.recordLocation) {
      docs.push({
        type: 'health_records',
        label: `Health records for ${child.nickname || child.name}`,
        exists: true,
        locationKnown: true,
        location: child.healthcareTransition.recordLocation,
        childId: child.childId,
      });
    }
    if (child.healthcareTransition?.carePlanStored) {
      docs.push({
        type: 'care_plan',
        label: `Care plan for ${child.nickname || child.name}`,
        exists: child.healthcareTransition.carePlanWritten === 'yes',
        locationKnown: true,
        location: child.healthcareTransition.carePlanStored,
        childId: child.childId,
      });
    }
    if (child.adultTransition?.dtcDocLocation) {
      docs.push({
        type: 'dtc',
        label: `Disability Tax Credit documentation for ${child.nickname || child.name}`,
        exists: child.adultTransition.dtcStatus === 'yes',
        locationKnown: true,
        location: child.adultTransition.dtcDocLocation,
        childId: child.childId,
      });
    }
  }

  return docs;
}

function buildReadiness(
  children: GuardianshipChildProfile[],
  willsAnswers: Record<string, unknown>
): ReadinessCategory {
  const decisionsMade: string[] = [];
  const thingsWorthConfirming: string[] = [];
  const thingsStillToDo: string[] = [];

  for (const child of children) {
    if (child.status !== 'minor') continue;
    const ctx = child.guardianContext;
    const name = child.nickname || child.name;

    if (ctx?.guardian) {
      if (ctx.guardianSpokenWith === 'yes_agreed' && ctx.guardianInWill === 'yes') {
        decisionsMade.push(`Guardian selected for ${name}: ${ctx.guardian.name}`);
      } else if (ctx.guardianSpokenWith === 'yes_not_confirmed') {
        thingsWorthConfirming.push(`Confirm guardian appointment with ${ctx.guardian.name} for ${name}`);
      } else if (ctx.guardianSpokenWith === 'not_yet' || ctx.guardianSpokenWith === 'not_sure') {
        thingsWorthConfirming.push(`Have the guardianship conversation with ${ctx.guardian.name} for ${name}`);
      }
      if (ctx.guardianInWill === 'no' || ctx.guardianInWill === 'not_sure') {
        thingsWorthConfirming.push(`Confirm whether ${name}'s guardian is named in the Will`);
      }
      if (ctx.guardianInWill === 'no_will') {
        thingsStillToDo.push(`No Will in place — guardianship appointment for ${name} may not be legally effective`);
      }
      if (!ctx.alternateGuardian) {
        thingsStillToDo.push(`No alternate guardian identified for ${name}`);
      }
    } else {
      thingsStillToDo.push(`No guardian selected for ${name}`);
    }

    if (child.disabled && child.healthcareTransition?.recordLocation === undefined) {
      thingsStillToDo.push(`Location of important health records for ${name} is not known`);
    }
    if (child.educationTransition && !child.educationTransition.recordLocation) {
      thingsStillToDo.push(`Location of education records for ${name} is not known`);
    }
  }

  const currentWillData = willsAnswers.currentWillData as Record<string, unknown> | undefined;
  const clients = (currentWillData?.clients as Array<Record<string, unknown>>) || [];
  const client1Will = clients.find(c => c.clientId === 'client1');
  const hasWill = (client1Will?.documentBasics as Record<string, unknown>)?.hasWill === 'yes';
  if (!hasWill) {
    thingsStillToDo.push('No Will in place — guardianship appointments may not be legally effective');
  }

  return { decisionsMade, thingsWorthConfirming, thingsStillToDo };
}

function buildImmediateActions(
  children: GuardianshipChildProfile[],
  willsAnswers: Record<string, unknown>,
  estateTrusteesAnswers: Record<string, unknown>
): ImmediateAction[] {
  const actions: ImmediateAction[] = [];
  const minorChildren = children.filter(c => c.status === 'minor');

  for (const child of minorChildren) {
    const ctx = child.guardianContext;
    if (ctx?.guardian) {
      const phone = ctx.guardian.phone ? ` at ${ctx.guardian.phone}` : '';
      actions.push({
        action: `Contact ${ctx.guardian.name}${phone} — the intended guardian for ${child.nickname || child.name}`,
        priority: 1,
        childIds: [child.childId],
        conditional: false,
      });
    }
  }

  const guardianIds = new Set<string>();
  for (const child of minorChildren) {
    const id = child.guardianContext?.guardian?.id;
    if (id) guardianIds.add(id);
  }
  if (guardianIds.size > 0 && minorChildren.length > 1) {
    actions.push({
      action: 'Keep the minor children together where reasonably possible',
      priority: 2,
      childIds: minorChildren.map(c => c.childId),
      conditional: false,
    });
  }

  for (const child of minorChildren) {
    const people = child.peopleToKeepClose || [];
    if (people.length > 0) {
      const names = people.map(p => p.name).filter(Boolean).join(', ');
      if (names) {
        actions.push({
          action: `Contact ${names} — important family connections for ${child.nickname || child.name}`,
          priority: 3,
          childIds: [child.childId],
          conditional: false,
        });
      }
    }
  }

  const currentWillData = willsAnswers.currentWillData as Record<string, unknown> | undefined;
  const clients = (currentWillData?.clients as Array<Record<string, unknown>>) || [];
  const client1Will = clients.find(c => c.clientId === 'client1');
  const hasWill = (client1Will?.documentBasics as Record<string, unknown>)?.hasWill === 'yes';
  const etName = estateTrusteesAnswers.client1EstateTrusteeName as string | undefined;
  if (hasWill && etName) {
    actions.push({
      action: `Locate Wills and contact Estate Trustee ${etName}`,
      priority: 4,
      conditional: false,
    });
  }

  for (const child of minorChildren) {
    const locations: string[] = [];
    if (child.educationTransition?.recordLocation) locations.push(`education records from ${child.educationTransition.recordLocation}`);
    if (child.healthcareTransition?.recordLocation) locations.push(`health records from ${child.healthcareTransition.recordLocation}`);
    if (locations.length > 0) {
      actions.push({
        action: `Gather ${locations.join(' and ')} for ${child.nickname || child.name}`,
        priority: 5,
        childIds: [child.childId],
        conditional: false,
      });
    }
  }

  for (const child of minorChildren) {
    const important = (child.importantConnections || []).filter(c => c.importance === 'especially_important');
    if (important.length > 0) {
      const names = important.map(c => c.name).filter(Boolean).join(', ');
      if (names) {
        actions.push({
          action: `Help ${child.nickname || child.name} stay connected — identify ${names} as key relationships`,
          priority: 6,
          childIds: [child.childId],
          conditional: false,
        });
      }
    }
  }

  actions.push({
    action: 'Avoid unnecessary extra changes initially — allow time for adjustment before making non-essential transitions',
    priority: 7,
    conditional: true,
  });

  return actions.sort((a, b) => a.priority - b.priority);
}

export function buildGuardianshipRoadmap(
  allAnswers: AnswersMap
): GuardianshipRoadmapModel {
  const aboutYou = allAnswers.get('aboutYou') || {};
  const childrenAnswers = allAnswers.get('children') || {};
  const willsAnswers = allAnswers.get('wills') || {};
  const estateTrusteesAnswers = allAnswers.get('estateTrustees') || {};
  const lifeInsuranceAnswers = allAnswers.get('lifeInsurance') || {};
  const financialFootprintAnswers = allAnswers.get('financialFootprint') || {};
  const familyTrustsAnswers = allAnswers.get('familyTrusts') || {};

  const province = String(aboutYou.province || '');
  const ageOfMajority = getAgeOfMajority(province);

  const clientNames: string[] = [];
  const c1Name = String(aboutYou.fullName || '');
  if (c1Name) clientNames.push(c1Name);
  const hasSpouse = aboutYou.maritalStatus === 'married' || aboutYou.maritalStatus === 'common_law';
  if (hasSpouse) {
    const c2Name = String(aboutYou.spouseName || '');
    if (c2Name) clientNames.push(c2Name);
  }

  const childrenData = (childrenAnswers.childrenData as Array<Record<string, string>>) || [];
  const planningPersons = parsePlanningPersons(childrenAnswers.planningPersons);

  const childProfiles: GuardianshipChildProfile[] = childrenData.map((child, index) => {
    const status = classifyChild(child, ageOfMajority);
    const disabled = child.disabled === 'yes';
    const disabilityUncertain = child.disabled === 'not_sure';
    const age = computeAge(child.dateOfBirth);
    const moveLikely = child.transitionMoveExpected === 'yes_most_likely' || child.transitionMoveExpected === 'possibly';

    return {
      childId: `child_${index}`,
      index,
      name: child.name || '',
      nickname: child.nickname || '',
      dateOfBirth: child.dateOfBirth,
      age,
      status,
      planningFocus: derivePlanningFocus(status, disabled, disabilityUncertain),
      disabled,
      disabilityUncertain,
      cityOfResidence: child.cityOfResidence,
      provinceTerritory: child.provinceTerritory,
      countryOfResidence: child.countryOfResidence,
      guardianContext: buildGuardianContext(child, childrenData, planningPersons),
      personalProfile: buildPersonalProfile(child),
      educationTransition: buildEducationTransition(child),
      healthcareTransition: buildHealthcareTransition(child),
      supportTransition: buildSupportTransition(child, moveLikely),
      importantConnections: buildImportantConnections(child, moveLikely),
      communities: buildCommunities(child),
      traditions: buildTraditions(child),
      peopleToKeepClose: resolveFamilySelections(
        child.belongingFamilySelections || '',
        planningPersons,
        childrenData
      ),
      adultSiblingRole: status === 'adult_independent'
        ? childrenData.find((c, i) => {
            const sibStatus = classifyChild(c, ageOfMajority);
            return sibStatus === 'minor' && i !== index;
          })
          ? (childrenData.find((c, i) => {
              const sibStatus = classifyChild(c, ageOfMajority);
              return sibStatus === 'minor' && i !== index;
            })?.[`transitionAdultSiblingRole_${index}`] || undefined)
          : undefined
        : undefined,
      adultSiblingNotResponsible: status === 'adult_independent'
        ? ((child[`transitionAdultSiblingNotResponsible_${index}`] || '').split(',').filter(Boolean))
        : undefined,
      inheritance: buildInheritance(index, willsAnswers),
      adultTransition: buildAdultTransition(child),
      firstDaysPriorities: buildFirstDaysPriorities(child),
    };
  });

  const firstMinor = childProfiles.find(c => c.status === 'minor');
  const guardianPlan = {
    primaryGuardian: firstMinor?.guardianContext?.guardian,
    alternateGuardian: firstMinor?.guardianContext?.alternateGuardian,
    guardianSpokenWith: firstMinor?.guardianContext?.guardianSpokenWith || '',
    guardianInWill: firstMinor?.guardianContext?.guardianInWill || '',
    appliesToChildren: firstMinor?.guardianContext?.appliesToChildNames || [],
    trusteePersonName: (() => {
      const currentWillData = willsAnswers.currentWillData as Record<string, unknown> | undefined;
      const clients = (currentWillData?.clients as Array<Record<string, unknown>>) || [];
      return clients.find(c => c.trustTrusteeName)?.trustTrusteeName as string | undefined;
    })(),
  };

  const roles = buildRoles(childProfiles, willsAnswers, estateTrusteesAnswers);
  const financialResources = buildFinancialResources(
    childProfiles, lifeInsuranceAnswers, financialFootprintAnswers, familyTrustsAnswers
  );
  const documents = buildDocuments(childProfiles, willsAnswers);
  const readiness = buildReadiness(childProfiles, willsAnswers);
  const immediateActions = buildImmediateActions(childProfiles, willsAnswers, estateTrusteesAnswers);

  return {
    family: {
      clientNames,
      children: childProfiles.map(c => ({
        id: c.childId,
        name: c.name,
        nickname: c.nickname,
        status: c.status,
      })),
      reportDate: new Date(),
      provinceOfMajority: province,
      ageOfMajority,
    },
    guardianPlan,
    children: childProfiles,
    roles,
    financialResources,
    documents,
    readiness,
    immediateActions,
    crossReferences: financialResources
      .filter(r => r.exists)
      .map(r => ({ section: r.type, description: r.crossReference })),
  };
}
