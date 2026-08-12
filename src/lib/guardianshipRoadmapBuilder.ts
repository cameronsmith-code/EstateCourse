import type {
  GuardianshipRoadmapModel,
  GuardianshipChildProfile,
  ChildStatus,
  MoveStatus,
  PlanningPerson,
  GuardianAssignment,
  AdultSiblingRole,
  ActivityEntry,
  PersonalProfile,
  EducationTransition,
  HealthcareProvider,
  HealthcareTransition,
  MedicationEntry,
  AllergyEntry,
  SupportTransitionRow,
  ImportantConnection,
  CommunityItem,
  TraditionItem,
  PersonToKeepClose,
  ClientInheritanceInfo,
  AdultTransitionInfo,
  RoleAssignment,
  FinancialResourceSummary,
  DocumentRegistryEntry,
  ReadinessCategory,
  ImmediateAction,
} from './guardianshipRoadmapTypes';
import { getAgeOfMajority, getProvinceName, normalizeProvinceCode } from './jurisdiction';

type AnswersMap = Map<string, Record<string, unknown>>;
type ChildRecord = Record<string, string | undefined>;

function computeAge(dateOfBirth: string | undefined): number | undefined {
  if (!dateOfBirth) return undefined;
  const birth = new Date(dateOfBirth);
  if (isNaN(birth.getTime())) return undefined;
  const today = new Date();
  const age = (today.getTime() - birth.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  return Math.floor(age);
}

function classifyChild(child: ChildRecord | undefined, ageOfMajority: number): ChildStatus {
  if (!child?.dateOfBirth) return 'minor';
  const age = computeAge(child.dateOfBirth);
  if (age === undefined || age < ageOfMajority) return 'minor';
  const isDisabled = child.disabled === 'yes' || child.disabled === 'not_sure';
  const isIndependent = child.independent === 'yes';
  if (isIndependent && !isDisabled) return 'adult_independent';
  return 'adult_dependant';
}

function derivePlanningFocus(status: ChildStatus, disabled: boolean, disabilityUncertain: boolean): string {
  if (status === 'adult_independent') return 'Adult — independent';
  if (status === 'adult_dependant') {
    if (disabled) return 'Adult — ongoing support needs';
    return 'Adult — may need support';
  }
  if (disabled) return 'Minor — ongoing support needs';
  if (disabilityUncertain) return 'Minor — support needs being assessed';
  return 'Minor';
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

function findPerson(persons: PlanningPerson[], id: string | undefined): PlanningPerson | undefined {
  if (!id) return undefined;
  return persons.find(p => p.id === id);
}

function buildCommunityString(city?: string, province?: string, country?: string): string {
  const parts = [city, province ? getProvinceName(province) || province : undefined, country].filter(Boolean);
  return parts.join(', ');
}

function parseMoveStatus(raw: string | undefined): MoveStatus {
  switch (raw) {
    case 'yes_most_likely': return 'likely';
    case 'possibly': return 'possible';
    case 'no_remain_current': return 'unlikely';
    default: return 'undecided';
  }
}

function isCrossBorder(childCountry: string, guardianCountry: string): boolean {
  const c1 = (childCountry || 'Canada').trim().toLowerCase();
  const c2 = (guardianCountry || '').trim().toLowerCase();
  if (!c2) return false;
  return c1 !== c2;
}

function isCrossProvince(childProvince: string, childCountry: string, guardianProvince: string, guardianCountry: string): boolean {
  if (isCrossBorder(childCountry, guardianCountry)) return false;
  const p1 = normalizeProvinceCode(childProvince);
  const p2 = normalizeProvinceCode(guardianProvince);
  if (!p1 || !p2) return false;
  return p1 !== p2;
}

function buildHouseholdLabel(people: PlanningPerson[]): { label: string; isHousehold: boolean } {
  if (people.length === 0) return { label: '', isHousehold: false };
  if (people.length === 1) return { label: people[0].name, isHousehold: false };
  const names = people.map(p => p.name).filter(Boolean);
  if (names.length <= 1) return { label: names[0] || '', isHousehold: false };
  const last = names[names.length - 1];
  const rest = names.slice(0, -1);
  return { label: `${rest.join(' & ')} ${last}`, isHousehold: true };
}

const ACTIVITY_IMPORTANCE_MAP: Record<string, string> = {
  'Critical': 'Critical',
  'Important': 'Important',
  'Nice to have': 'Nice to have',
};

function buildActivities(child: ChildRecord): ActivityEntry[] {
  const raw = parseJsonArray<{
    activityName?: string; activityType?: string; importanceLevel?: string; frequency?: string;
  }>(child.activityList);
  return raw.map(a => ({
    name: String(a.activityName || ''),
    type: String(a.activityType || ''),
    importance: ACTIVITY_IMPORTANCE_MAP[a.importanceLevel || ''] || a.importanceLevel || '',
    frequency: String(a.frequency || ''),
  }));
}

function buildPersonalProfile(child: ChildRecord): PersonalProfile {
  return {
    communicationStyle: child.communicationStyle,
    emotionalExpression: child.emotionalExpression,
    comfortStrategies: child.comfortStrategies,
    socialChallenges: child.socialChallenges,
    behaviouralConsiderations: child.behaviouralConsiderations,
    importantRoutines: child.importantRoutines,
    activities: buildActivities(child),
    socialAdditionalNotes: child.socialAdditionalNotes,
    transitionEasier: child.transitionEasierText,
    missedMost: child.belongingMissedMost,
    feelConnected: child.belongingFeelConnected,
  };
}

function buildEducationTransition(child: ChildRecord): EducationTransition | undefined {
  if (!child.attendingSchool || child.attendingSchool === 'no') return undefined;
  return {
    schoolName: child.schoolName,
    schoolPhone: child.schoolPhone,
    schoolAddress: child.schoolAddress,
    currentGrade: child.currentGrade,
    hasIEP: child.hasIEP === 'yes',
    iepDetails: child.individualEducationPlan,
    iepDocumentLocation: child.iepDocumentLocation,
    iepImportance: child.transitionIEPImportance,
    schoolChangeExpected: child.transitionSchoolChangeExpected,
    newSchoolNotes: child.transitionNewSchoolNotes,
    recordLocation: child.transitionEducationRecordLocation,
    learningStyleNotes: child.learningStyleNotes,
    schoolExtraSupport: child.schoolExtraSupport,
    schoolFocusHelps: child.schoolFocusHelps,
  };
}

function buildAllProviders(child: ChildRecord): HealthcareProvider[] {
  const providers: HealthcareProvider[] = [];
  const categories = ['family', 'school', 'doctor', 'other'];
  for (const cat of categories) {
    const count = parseInt(child[`careCoord_${cat}_count`] || '0', 10);
    for (let i = 0; i < count; i++) {
      const name = child[`careCoord_${cat}_${i}_name`];
      if (!name) continue;
      providers.push({
        id: `${cat}_${i}`,
        name,
        role: child[`careCoord_${cat}_${i}_role`] || '',
        category: cat,
        phone: child[`careCoord_${cat}_${i}_phone`],
        email: child[`careCoord_${cat}_${i}_email`],
        city: child[`careCoord_${cat}_${i}_city`],
        province: child[`careCoord_${cat}_${i}_province`],
        resolved: true,
      });
    }
  }
  return providers;
}

function buildMedications(child: ChildRecord): MedicationEntry[] {
  return parseJsonArray<{
    name?: string; treats?: string; prescription?: string; prescribedBy?: string; otherInfo?: string;
  }>(child.medicationList).map(m => ({
    name: String(m.name || ''),
    treats: String(m.treats || ''),
    prescribed: m.prescription === 'yes',
    prescribedBy: m.prescribedBy,
    otherInfo: m.otherInfo,
  }));
}

function buildAllergies(child: ChildRecord): AllergyEntry[] {
  return parseJsonArray<{
    details?: string; severity?: string; medications?: string; epipen?: string;
  }>(child.allergyList).map(a => ({
    details: String(a.details || ''),
    severity: String(a.severity || ''),
    medications: a.medications,
    epipen: a.epipen,
  }));
}

function buildHealthcareTransition(
  child: ChildRecord,
  allProviders: HealthcareProvider[]
): HealthcareTransition {
  const selectionIds = (child.transitionProviderSelections || '')
    .split(',').filter(Boolean);

  let selectedProviders: HealthcareProvider[] = [];
  if (selectionIds.includes('all_providers')) {
    selectedProviders = allProviders.filter(p => p.category !== 'family');
  } else if (selectionIds.includes('not_sure_providers')) {
    selectedProviders = [];
  } else {
    selectedProviders = selectionIds
      .map(id => {
        const provider = allProviders.find(p => p.id === id);
        if (provider) return provider;
        return {
          id,
          name: '',
          role: '',
          category: '',
          resolved: false,
        } as HealthcareProvider;
      });
  }

  const medications = buildMedications(child);
  const allergies = buildAllergies(child);

  return {
    providers: allProviders,
    selectedProviders,
    pharmacyName: child.pharmacyName,
    hasMedications: child.medications === 'yes' && medications.length > 0,
    medications,
    hasAllergies: child.allergies === 'yes' && allergies.length > 0,
    allergies,
    medicalConditions: child.medicalIssues === 'yes' ? child.medicalIssuesDescription : undefined,
    carePlanWritten: child.carePlanWritten,
    carePlanStored: child.carePlanStored,
    providerSelectionsResolved: selectedProviders.every(p => p.resolved),
    recordLocation: child.transitionHealthRecordLocation,
    medicationNotes: child.transitionMedicationNotes,
  };
}

const SUPPORT_TYPE_RULES: Record<string, { label: string; purpose: string; action: string }> = {
  cognitive_developmental: {
    label: 'Cognitive or developmental',
    purpose: 'Developmental assessment and cognitive supports',
    action: 'Transfer developmental/medical records and request referral or transition support for a local specialist.',
  },
  physical: {
    label: 'Physical disability',
    purpose: 'Mobility and physical therapy supports',
    action: 'Share current therapy goals and help establish a local physiotherapy or physical support provider.',
  },
  medical_condition: {
    label: 'Medical condition',
    purpose: 'Ongoing medical care and condition management',
    action: 'Transfer medical records and request referral to a local specialist or family physician for continuity of care.',
  },
  mental_health: {
    label: 'Mental health',
    purpose: 'Counselling and mental health supports',
    action: 'Share current treatment context and help connect with a local counsellor or mental health provider.',
  },
  learning: {
    label: 'Learning disability',
    purpose: 'Educational accommodations and learning supports',
    action: 'Provide the current IEP and related records to the new school. Share learning assessments.',
  },
  complex_care: {
    label: 'Complex care',
    purpose: 'Complex care coordination across multiple providers',
    action: 'Transfer full care plan, medication lists, and provider contacts. Establish a local care coordinator.',
  },
  prefer_no_label: {
    label: 'General support',
    purpose: 'General support services',
    action: 'Share current support arrangements and help establish equivalent local supports.',
  },
  existing_supports: {
    label: 'All current supports',
    purpose: 'Continuity of all existing supports',
    action: 'Transfer full documentation and establish equivalent providers in the new community.',
  },
  other: {
    label: 'Other support',
    purpose: 'Other identified support needs',
    action: 'Share current arrangements and help establish equivalent local support.',
  },
};

function buildSupportTransition(
  child: ChildRecord,
  _moveStatus: MoveStatus
): SupportTransitionRow[] | undefined {
  if (child.disabled !== 'yes' && child.disabled !== 'not_sure') return undefined;

  const selectedIds = (child.transitionSupportSelections || '')
    .split(',').filter(Boolean);
  if (selectedIds.length === 0) return undefined;

  return selectedIds.map(id => {
    const rules = SUPPORT_TYPE_RULES[id] || SUPPORT_TYPE_RULES.other;
    let recordLocation: string | undefined;
    if (id === 'learning' || id === 'existing_supports') {
      recordLocation = child.transitionEducationRecordLocation || child.iepDocumentLocation;
    }
    return {
      supportType: id,
      supportTypeLabel: rules.label,
      currentProvider: undefined,
      purpose: rules.purpose,
      transitionAction: rules.action,
      recordLocation,
      notes: child.transitionSupportNotes,
    };
  });
}

const RELATIONSHIP_LABELS: Record<string, string> = {
  best_friend: 'Best friend', close_friend: 'Close friend', school_friend: 'School friend',
  neighbourhood_friend: 'Neighbourhood friend', sports_friend: 'Sports friend', camp_friend: 'Camp friend',
  cousin: 'Cousin', family_friend: 'Family friend', trusted_adult: 'Trusted adult',
  coach_mentor: 'Coach / mentor', other: 'Other',
};

const IMPORTANCE_LABELS: Record<string, string> = {
  especially_important: 'Especially important', important: 'Important',
  nice_to_maintain: 'Nice to maintain', not_sure: 'Not sure',
};

const COMMUNITY_TYPE_LABELS: Record<string, string> = {
  school_group: 'School friend group', neighbourhood: 'Neighbourhood friends', sports_team: 'Sports team',
  camp_community: 'Camp community', faith: 'Faith community', cultural: 'Cultural community',
  club_activity: 'Club / activity group', cousins_family: 'Cousins / extended family', other: 'Other',
};

const TRADITION_TYPE_LABELS: Record<string, string> = {
  overnight_camp: 'Overnight camp', day_camp: 'Day camp', cottage_week: 'Cottage week',
  camping_trip: 'Camping trip', tournament: 'Tournament', cousin_weekend: 'Cousin weekend',
  birthday_tradition: 'Birthday tradition', holiday_gathering: 'Holiday gathering',
  religious_cultural: 'Religious / cultural tradition', other: 'Other',
};

function buildImportantConnections(child: ChildRecord, moveLikely: boolean): ImportantConnection[] {
  const raw = parseJsonArray<{
    id?: string; displayName?: string; connectionType?: string; contexts?: string[];
    importance?: string; relationshipNotes?: string;
    contactName?: string; contactPhone?: string; contactEmail?: string; continuityIdeas?: string[];
  }>(child.belongingConnections);

  return raw.map(c => {
    const types = (c.connectionType || '').split(',').filter(Boolean);
    const hasContact = !!(c.contactName || c.contactPhone || c.contactEmail);
    return {
      id: String(c.id || ''),
      name: String(c.displayName || ''),
      relationshipTypes: types.map(t => RELATIONSHIP_LABELS[t] || t),
      contexts: Array.isArray(c.contexts) ? c.contexts.map(String) : [],
      whyItMatters: String(c.relationshipNotes || ''),
      importance: String(c.importance || ''),
      importanceLabel: IMPORTANCE_LABELS[c.importance || ''] || c.importance || '',
      contactName: c.contactName,
      contactPhone: c.contactPhone,
      contactEmail: c.contactEmail,
      continuityIdeas: Array.isArray(c.continuityIdeas) ? c.continuityIdeas.map(String) : [],
      hasContactInfo: hasContact,
      moveComplicates: moveLikely && c.importance === 'especially_important',
    };
  });
}

function buildCommunities(child: ChildRecord): CommunityItem[] {
  return parseJsonArray<{
    id?: string; type?: string; name?: string; importanceNotes?: string; continuityPreference?: string;
  }>(child.belongingCommunities).map(c => ({
    id: String(c.id || ''),
    type: String(c.type || ''),
    typeLabel: COMMUNITY_TYPE_LABELS[c.type || ''] || c.type || '',
    name: String(c.name || ''),
    importanceNotes: String(c.importanceNotes || ''),
    continuityPreference: String(c.continuityPreference || ''),
  }));
}

function buildTraditions(child: ChildRecord): TraditionItem[] {
  return parseJsonArray<{
    id?: string; type?: string; name?: string; participantTypes?: string[];
    participantNotes?: string; importanceNotes?: string; continueIfPractical?: string;
  }>(child.belongingTraditions).map(t => ({
    id: String(t.id || ''),
    name: String(t.name || ''),
    type: String(t.type || ''),
    typeLabel: TRADITION_TYPE_LABELS[t.type || ''] || t.type || '',
    participantTypes: Array.isArray(t.participantTypes) ? t.participantTypes.map(String) : [],
    participantNotes: String(t.participantNotes || ''),
    importanceNotes: String(t.importanceNotes || ''),
    continueIfPractical: String(t.continueIfPractical || ''),
  }));
}

function resolveFamilySelections(
  selectionsStr: string,
  planningPersons: PlanningPerson[],
  childrenData: ChildRecord[],
  childIndex: number
): PersonToKeepClose[] {
  const ids = (selectionsStr || '').split(',').filter(Boolean);
  const result: PersonToKeepClose[] = [];
  const seen = new Set<string>();

  for (const id of ids) {
    if (seen.has(id)) continue;
    seen.add(id);

    if (id.startsWith('adult_sib_')) {
      const sibIdx = parseInt(id.replace('adult_sib_', ''), 10);
      const sib = childrenData[sibIdx];
      if (sib) {
        result.push({
          id,
          name: sib.nickname || sib.name || '',
          relationship: 'Adult sibling',
          sourceType: 'adult_sibling',
          resolved: true,
        });
      } else {
        result.push({ id, name: '', relationship: 'Adult sibling', sourceType: 'adult_sibling', resolved: false });
      }
    } else if (id.startsWith('sibling_')) {
      const sibIdx = parseInt(id.replace('sibling_', ''), 10);
      const sib = childrenData[sibIdx];
      if (sib && sibIdx !== childIndex) {
        result.push({
          id,
          name: sib.nickname || sib.name || '',
          relationship: 'Sibling',
          sourceType: 'minor_sibling',
          resolved: true,
        });
      } else {
        result.push({ id, name: '', relationship: 'Sibling', sourceType: 'minor_sibling', resolved: false });
      }
    } else if (id.startsWith('pp_')) {
      const person = planningPersons.find(p => p.id === id);
      if (person) {
        result.push({
          id,
          name: person.name,
          relationship: person.relationship || 'Family member',
          sourceType: 'planning_person',
          phone: person.phone,
          email: person.email,
          city: person.city,
          province: person.province,
          resolved: true,
        });
      } else {
        result.push({ id, name: '', relationship: '', sourceType: 'planning_person', resolved: false });
      }
    } else if (id === 'parent1') {
      result.push({ id, name: 'Parent / Guardian 1', relationship: 'Parent', sourceType: 'parent', resolved: true });
    } else if (id === 'parent2') {
      result.push({ id, name: 'Parent / Guardian 2', relationship: 'Parent', sourceType: 'parent', resolved: true });
    } else if (id === 'important_adults') {
      result.push({ id, name: 'Important adults', relationship: 'Important adult', sourceType: 'important_adults', resolved: true });
    }
  }

  return result;
}

function buildAdultSiblingRoles(
  childrenData: ChildRecord[],
  childProfiles: GuardianshipChildProfile[],
  _ageOfMajority: number
): AdultSiblingRole[] {
  const roles: AdultSiblingRole[] = [];
  const adultIndependents = childProfiles
    .map((c, i) => ({ c, i }))
    .filter(({ c }) => c.status === 'adult_independent');

  for (const adult of adultIndependents) {
    const minors = childProfiles
      .map((c, i) => ({ c, i }))
      .filter(({ c }) => c.status === 'minor');

    const forMinorChildIds: string[] = [];
    const forMinorChildNames: string[] = [];
    let role = '';
    const notResponsibleSet = new Set<string>();

    for (const minor of minors) {
      const minorRecord = childrenData[minor.i];
      if (!minorRecord) continue;
      const roleKey = `transitionAdultSiblingRole_${adult.i}`;
      const notRespKey = `transitionAdultSiblingNotResponsible_${adult.i}`;
      const childRole = minorRecord[roleKey];
      if (childRole) {
        if (!role) role = childRole;
        forMinorChildIds.push(minor.c.childId);
        forMinorChildNames.push(minor.c.nickname || minor.c.name);
      }
      const notResp = (minorRecord[notRespKey] || '').split(',').filter(Boolean);
      notResp.forEach(n => notResponsibleSet.add(n));
    }

    if (forMinorChildIds.length > 0 || role) {
      roles.push({
        adultSiblingChildId: adult.c.childId,
        adultSiblingName: adult.c.nickname || adult.c.name,
        role,
        notResponsibleFor: Array.from(notResponsibleSet),
        forMinorChildIds,
        forMinorChildNames,
      });
    }
  }

  return roles;
}

function buildInheritance(
  childIndex: number,
  willsAnswers: Record<string, unknown>
): ClientInheritanceInfo[] {
  const currentWillData = willsAnswers.currentWillData as Record<string, unknown> | undefined;
  const clients = (currentWillData?.clients as Array<Record<string, unknown>>) || [];
  const results: ClientInheritanceInfo[] = [];

  for (const client of clients) {
    const clientId = client.clientId as 'client1' | 'client2';
    const clientName = String(client.clientName || clientId === 'client1' ? 'Client 1' : 'Client 2');

    const arrangements = (client.childSpecificArrangements as Array<Record<string, unknown>>) || [];
    const match = arrangements.find(a => {
      const cid = String(a.childId || '');
      return cid === `child_${childIndex}` || cid === String(childIndex);
    });

    const stages = ((client.trustStages as Array<Record<string, unknown>>) || []).map(s => ({
      age: String(s.age || ''),
      fraction: String(s.fraction || ''),
      description: String(s.description || ''),
    }));

    const info: ClientInheritanceInfo = {
      clientId,
      clientName,
      inheritanceType: client.inheritanceType as string | undefined,
      stages,
      trusteeName: client.trustTrusteeName as string | undefined,
      trusteePersonId: client.trustTrusteePersonId as string | undefined,
    };

    if (match) {
      info.childSpecificArrangement = {
        hasDifferentArrangement: String(match.hasDifferentArrangement || ''),
        specialArrangement: match.specialArrangement as string | undefined,
        knownTrustType: match.knownTypeName as string | undefined,
        description: match.description as string | undefined,
      };
    }

    if (info.inheritanceType || info.childSpecificArrangement || info.trusteeName) {
      results.push(info);
    }
  }

  return results;
}

function buildAdultTransition(child: ChildRecord): AdultTransitionInfo | undefined {
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
    supportLocationDependent: child.supportLocationDependent,
    supportLocationDependentDetails: child.supportLocationDependentDetails,
  };
}

function buildFirstDaysPriorities(child: ChildRecord): string[] | undefined {
  const count = parseInt(child.transitionFirstDaysCount || '0', 10);
  if (!count) return undefined;
  const items: string[] = [];
  for (let i = 0; i < count; i++) {
    const val = child[`transitionFirstDays_${i}`];
    if (val) items.push(val);
  }
  return items.length > 0 ? items : undefined;
}

function buildGuardianAssignments(
  childrenData: ChildRecord[],
  childProfiles: GuardianshipChildProfile[],
  planningPersons: PlanningPerson[]
): GuardianAssignment[] {
  const assignments: GuardianAssignment[] = [];
  const processed = new Set<number>();

  for (let i = 0; i < childrenData.length; i++) {
    if (processed.has(i)) continue;
    if (childProfiles[i].status !== 'minor') continue;

    const child = childrenData[i];
    const guardianId = child.guardianPersonId;
    const alternateId = child.alternateGuardianPersonId;
    if (!guardianId) continue;

    const guardian = findPerson(planningPersons, guardianId);
    const alternate = findPerson(planningPersons, alternateId);

    const guardianPeople = guardian ? [guardian] : [];
    const alternatePeople = alternate ? [alternate] : [];

    const appliesTo = (child.guardianAppliesTo || '')
      .split(',').filter(Boolean).map(s => parseInt(s, 10));

    const childIds: string[] = [];
    const childNames: string[] = [];
    const childIndices: number[] = [i];
    processed.add(i);

    if (appliesTo.length > 0) {
      for (const sibIdx of appliesTo) {
        if (sibIdx < childrenData.length && !processed.has(sibIdx)) {
          const sibStatus = classifyChild(childrenData[sibIdx], getAgeOfMajority(childrenData[sibIdx].provinceTerritory));
          if (sibStatus === 'minor') {
            childIndices.push(sibIdx);
            processed.add(sibIdx);
          }
        }
      }
    }

    for (const idx of childIndices) {
      childIds.push(childProfiles[idx].childId);
      childNames.push(childProfiles[idx].nickname || childProfiles[idx].name);
    }

    const guardianCommunity = guardian
      ? buildCommunityString(guardian.city, guardian.province, guardian.country)
      : '';
    const firstChild = childProfiles[childIndices[0]];
    const currentCommunity = buildCommunityString(
      firstChild.cityOfResidence,
      firstChild.provinceTerritory,
      firstChild.countryOfResidence
    );

    const guardianLabel = buildHouseholdLabel(guardianPeople);

    assignments.push({
      id: `ga_${i}`,
      guardianPersonIds: guardianPeople.map(p => p.id),
      guardianPeople,
      alternatePersonIds: alternatePeople.map(p => p.id),
      alternatePeople,
      childIds,
      childNames,
      spokenWith: child.guardianSpokenWith || '',
      inWill: child.guardianInWill || '',
      considered: child.guardianConsidered || '',
      notes: child.guardianNotes,
      isHousehold: guardianLabel.isHousehold,
      householdLabel: guardianLabel.label,
      guardianCommunity,
      currentCommunity,
      isCrossBorder: guardian
        ? isCrossBorder(firstChild.countryOfResidence || '', guardian.country)
        : false,
      isCrossProvince: guardian
        ? isCrossProvince(firstChild.provinceTerritory || '', firstChild.countryOfResidence || '', guardian.province, guardian.country)
        : false,
      moveStatus: parseMoveStatus(child.transitionMoveExpected),
    });
  }

  return assignments;
}

function buildRoles(
  children: GuardianshipChildProfile[],
  guardianAssignments: GuardianAssignment[],
  adultSiblingRoles: AdultSiblingRole[]
): RoleAssignment[] {
  const roles: RoleAssignment[] = [];

  for (const assignment of guardianAssignments) {
    const guardianLabel = assignment.householdLabel || assignment.guardianPeople.map(p => p.name).join(', ');
    const alternateLabel = assignment.alternatePeople.length > 0
      ? buildHouseholdLabel(assignment.alternatePeople).label
      : undefined;

    for (const childName of assignment.childNames) {
      roles.push({
        responsibility: `Day-to-day care of ${childName}`,
        childName,
        firstChoice: guardianLabel,
        backup: alternateLabel,
        isHousehold: assignment.isHousehold,
      });
    }
  }

  for (const child of children) {
    for (const inheritance of child.inheritanceByClient) {
      if (inheritance.trusteeName) {
        roles.push({
          responsibility: `Manage ${child.nickname || child.name}'s inheritance`,
          childName: child.nickname || child.name,
          firstChoice: inheritance.trusteeName,
        });
      }
    }
  }

  for (const role of adultSiblingRoles) {
    if (role.role && role.forMinorChildNames.length > 0) {
      roles.push({
        responsibility: `Maintain sibling connection — ${role.adultSiblingName} for ${role.forMinorChildNames.join(' and ')}`,
        firstChoice: role.adultSiblingName,
      });
    }
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
  const respAccounts = investments.filter(a => String(a.accountType || '').toLowerCase().includes('resp'));
  resources.push({
    type: 'resp',
    exists: respAccounts.length > 0,
    childIds,
    crossReference: 'See Family Financial Map for account details',
  });

  const rdspAccounts = investments.filter(a => String(a.accountType || '').toLowerCase().includes('rdsp'));
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

  for (const client of clients) {
    const clientId = client.clientId as 'client1' | 'client2';
    const db = (client.documentBasics as Record<string, unknown>) || {};
    const hasWill = db.hasWill === 'yes';
    const willLocation = db.willLocation as string | undefined;
    const clientLabel = clientId === 'client1' ? 'Client 1' : 'Client 2';

    docs.push({
      type: 'will',
      label: `${clientLabel}'s Last Will and Testament`,
      exists: hasWill,
      locationKnown: !!willLocation,
      location: willLocation,
      clientId,
    });

    if (db.hasSecondaryWill === 'yes') {
      const secLocation = db.secondaryWillLocation as string | undefined;
      docs.push({
        type: 'secondary_will',
        label: `${clientLabel}'s Secondary Will`,
        exists: true,
        locationKnown: !!secLocation,
        location: secLocation,
        clientId,
      });
    }
  }

  for (const child of children) {
    const name = child.nickname || child.name;
    if (child.educationTransition?.iepDocumentLocation) {
      docs.push({
        type: 'iep',
        label: `IEP for ${name}`,
        exists: child.educationTransition.hasIEP,
        locationKnown: true,
        location: child.educationTransition.iepDocumentLocation,
        childId: child.childId,
      });
    }
    if (child.educationTransition?.recordLocation) {
      docs.push({
        type: 'education_records',
        label: `Education records for ${name}`,
        exists: true,
        locationKnown: true,
        location: child.educationTransition.recordLocation,
        childId: child.childId,
      });
    }
    if (child.healthcareTransition?.recordLocation) {
      docs.push({
        type: 'health_records',
        label: `Health records for ${name}`,
        exists: true,
        locationKnown: true,
        location: child.healthcareTransition.recordLocation,
        childId: child.childId,
      });
    }
    if (child.healthcareTransition?.carePlanStored) {
      docs.push({
        type: 'care_plan',
        label: `Care plan for ${name}`,
        exists: child.healthcareTransition.carePlanWritten === 'yes',
        locationKnown: true,
        location: child.healthcareTransition.carePlanStored,
        childId: child.childId,
      });
    }
    if (child.adultTransition?.dtcDocLocation) {
      docs.push({
        type: 'dtc',
        label: `Disability Tax Credit documentation for ${name}`,
        exists: child.adultTransition.dtcStatus === 'yes' || child.adultTransition.dtcStatus === 'in-progress',
        locationKnown: true,
        location: child.adultTransition.dtcDocLocation,
        childId: child.childId,
      });
    }
    if (child.birthCertificateLocation) {
      docs.push({
        type: 'birth_certificate',
        label: `Birth certificate for ${name}`,
        exists: true,
        locationKnown: true,
        location: child.birthCertificateLocation,
        childId: child.childId,
      });
    }
  }

  return docs;
}

function buildReadiness(
  children: GuardianshipChildProfile[],
  guardianAssignments: GuardianAssignment[],
  willsAnswers: Record<string, unknown>
): ReadinessCategory {
  const decisionsMade: string[] = [];
  const thingsWorthConfirming: string[] = [];
  const thingsStillToDo: string[] = [];

  const currentWillData = willsAnswers.currentWillData as Record<string, unknown> | undefined;
  const clients = (currentWillData?.clients as Array<Record<string, unknown>>) || [];
  const hasAnyWill = clients.some(c => (c.documentBasics as Record<string, unknown>)?.hasWill === 'yes');

  for (const child of children) {
    if (child.status !== 'minor') continue;
    const name = child.nickname || child.name;
    const assignment = guardianAssignments.find(a => a.childIds.includes(child.childId));

    if (assignment?.guardianPeople.length) {
      const guardianName = assignment.householdLabel;
      if (assignment.spokenWith === 'yes_agreed' && assignment.inWill === 'yes') {
        decisionsMade.push(`Guardian selected for ${name}: ${guardianName}`);
      } else if (assignment.spokenWith === 'yes_not_confirmed') {
        thingsWorthConfirming.push(`Confirm guardian appointment with ${guardianName} for ${name}`);
      } else if (assignment.spokenWith === 'not_yet' || assignment.spokenWith === 'not_sure') {
        thingsWorthConfirming.push(`Have the guardianship conversation with ${guardianName} for ${name}`);
      } else if (!assignment.spokenWith) {
        thingsStillToDo.push(`Guardian for ${name} selected but not yet contacted`);
      }
      if (assignment.inWill === 'no' || assignment.inWill === 'not_sure') {
        thingsWorthConfirming.push(`Confirm whether ${name}'s guardian is named in the Will`);
      }
      if (assignment.inWill === 'no_will') {
        thingsStillToDo.push(`No Will in place — guardianship appointment for ${name} may not be legally effective`);
      }
      if (!assignment.alternatePeople.length) {
        thingsStillToDo.push(`No alternate guardian identified for ${name}`);
      }
      if (!assignment.guardianCommunity) {
        thingsWorthConfirming.push(`Guardian location for ${name} is incomplete — community unknown`);
      }
    } else {
      thingsStillToDo.push(`No guardian selected for ${name}`);
    }

    if (child.status === 'minor' && child.disabled) {
      const ht = child.healthcareTransition;
      if (ht && !ht.recordLocation) {
        thingsStillToDo.push(`Location of important health records for ${name} is not known`);
      }
      const st = child.supportTransition;
      if (!st || st.length === 0) {
        thingsStillToDo.push(`Support needs identified for ${name} but support transition plan incomplete`);
      }
      const at = child.adultTransition;
      if (at?.dtcStatus === 'yes' && !at.dtcDocLocation) {
        thingsStillToDo.push(`DTC documentation location unknown for ${name}`);
      }
      if (at?.reviewNeeded) {
        thingsWorthConfirming.push(`${name} is approaching adulthood — future support review may be needed`);
      }
    }

    const et = child.educationTransition;
    if (et) {
      if (et.schoolChangeExpected === 'yes_most_likely' || et.schoolChangeExpected === 'possibly') {
        if (!et.recordLocation) {
          thingsStillToDo.push(`School change likely for ${name} but education records location unknown`);
        }
      }
    }

    const moveStatus = assignment?.moveStatus;
    if (moveStatus === 'likely' || moveStatus === 'possible') {
      const importantConns = (child.importantConnections || []).filter(c => c.importance === 'especially_important');
      for (const conn of importantConns) {
        if (!conn.hasContactInfo) {
          thingsWorthConfirming.push(`Especially important connection for ${name} — ${conn.name} — has no practical contact info`);
        }
        if (conn.continuityIdeas.length === 0) {
          thingsStillToDo.push(`Move likely for ${name} but no continuity ideas captured for ${conn.name}`);
        }
      }
    }

    for (const inheritance of child.inheritanceByClient) {
      if (!inheritance.trusteeName && inheritance.inheritanceType && inheritance.inheritanceType !== 'outright') {
        thingsWorthConfirming.push(`Trustee for ${name}'s inheritance is unclear in ${inheritance.clientName}'s Will understanding`);
      }
      if (inheritance.inheritanceType === 'not_sure') {
        thingsWorthConfirming.push(`${inheritance.clientName} is unsure how their Will handles ${name}'s inheritance`);
      }
      const arr = inheritance.childSpecificArrangement;
      if (arr?.hasDifferentArrangement === 'yes' && (!arr.description && !arr.knownTrustType)) {
        thingsWorthConfirming.push(`Special arrangement for ${name} in ${inheritance.clientName}'s Will but details unclear`);
      }
    }
  }

  if (!hasAnyWill) {
    thingsStillToDo.push('No Will in place — guardianship appointments may not be legally effective');
  }

  return { decisionsMade, thingsWorthConfirming, thingsStillToDo };
}

function buildImmediateActions(
  children: GuardianshipChildProfile[],
  guardianAssignments: GuardianAssignment[],
  adultSiblingRoles: AdultSiblingRole[],
  willsAnswers: Record<string, unknown>,
  estateTrusteesAnswers: Record<string, unknown>
): ImmediateAction[] {
  const actions: ImmediateAction[] = [];
  const seen = new Set<string>();

  const addAction = (id: string, action: string, priority: number, childIds: string[], childNames: string[], conditional = false, isParentWish = false) => {
    if (seen.has(id)) return;
    seen.add(id);
    actions.push({ id, action, priority, childIds, childNames, conditional, isParentWish });
  };

  for (const assignment of guardianAssignments) {
    if (!assignment.guardianPeople.length) continue;
    const guardianName = assignment.householdLabel;
    const phone = assignment.guardianPeople[0]?.phone ? ` at ${assignment.guardianPeople[0].phone}` : '';
    const childLabel = assignment.childNames.length > 1
      ? assignment.childNames.join(' and ')
      : assignment.childNames[0];
    addAction(
      `guardian_contact_${assignment.id}`,
      `Contact ${guardianName}${phone} — the intended guardian${assignment.isHousehold ? 's' : ''} for ${childLabel}`,
      1,
      assignment.childIds,
      assignment.childNames,
    );
  }

  const minorChildren = children.filter(c => c.status === 'minor');
  if (minorChildren.length > 1) {
    addAction(
      'keep_together',
      'Keep the minor children together where reasonably possible',
      2,
      minorChildren.map(c => c.childId),
      minorChildren.map(c => c.nickname || c.name),
    );
  }

  for (const role of adultSiblingRoles) {
    if (role.forMinorChildNames.length > 0) {
      addAction(
        `sibling_contact_${role.adultSiblingChildId}`,
        `Contact ${role.adultSiblingName} — important sibling connection for ${role.forMinorChildNames.join(' and ')}`,
        3,
        [],
        role.forMinorChildNames,
      );
    }
  }

  for (const child of minorChildren) {
    const people = (child.peopleToKeepClose || []).filter(p => p.resolved && p.name);
    if (people.length > 0) {
      const names = people.map(p => p.name).join(', ');
      addAction(
        `people_contact_${child.childId}`,
        `Contact ${names} — important relationships for ${child.nickname || child.name}`,
        4,
        [child.childId],
        [child.nickname || child.name],
      );
    }
  }

  const currentWillData = willsAnswers.currentWillData as Record<string, unknown> | undefined;
  const clients = (currentWillData?.clients as Array<Record<string, unknown>>) || [];
  const hasWill = clients.some(c => (c.documentBasics as Record<string, unknown>)?.hasWill === 'yes');
  const etName = estateTrusteesAnswers.client1EstateTrusteeName as string | undefined;
  if (hasWill && etName) {
    addAction('estate_trustee', `Locate Wills and contact Estate Trustee ${etName}`, 5, [], []);
  }

  const recordActions: Array<{ childId: string; childName: string; parts: string[] }> = [];
  for (const child of minorChildren) {
    const parts: string[] = [];
    if (child.educationTransition?.recordLocation) {
      parts.push(`education records from ${child.educationTransition.recordLocation}`);
    }
    if (child.healthcareTransition?.recordLocation) {
      parts.push(`health records from ${child.healthcareTransition.recordLocation}`);
    }
    if (child.birthCertificateLocation) {
      parts.push(`birth certificate from ${child.birthCertificateLocation}`);
    }
    if (parts.length > 0) {
      recordActions.push({ childId: child.childId, childName: child.nickname || child.name, parts });
    }
  }
  if (recordActions.length === 1) {
    const r = recordActions[0];
    addAction('gather_records', `Gather ${r.parts.join(' and ')} for ${r.childName}`, 6, [r.childId], [r.childName]);
  } else if (recordActions.length > 1) {
    const allParts = recordActions.flatMap(r => r.parts);
    addAction('gather_records_all', `Gather records: ${allParts.join('; ')}`, 6,
      recordActions.map(r => r.childId), recordActions.map(r => r.childName));
  }

  for (const child of minorChildren) {
    const important = (child.importantConnections || []).filter(c => c.importance === 'especially_important' && c.name);
    if (important.length > 0) {
      const names = important.map(c => c.name).join(', ');
      addAction(
        `keep_connected_${child.childId}`,
        `Help ${child.nickname || child.name} stay connected — identify ${names} as key relationships`,
        7,
        [child.childId],
        [child.nickname || child.name],
      );
    }
  }

  addAction('avoid_changes', 'Avoid unnecessary extra changes initially — allow time for adjustment before making non-essential transitions', 8, [], [], true);

  for (const child of minorChildren) {
    if (child.firstDaysPriorities && child.firstDaysPriorities.length > 0) {
      const name = child.nickname || child.name;
      for (let i = 0; i < child.firstDaysPriorities.length; i++) {
        const item = child.firstDaysPriorities[i];
        if (item) {
          addAction(
            `firstdays_${child.childId}_${i}`,
            `${name}: ${item}`,
            9 + i,
            [child.childId],
            [name],
            false,
            true,
          );
        }
      }
    }
  }

  return actions.sort((a, b) => a.priority - b.priority);
}

export function buildGuardianshipRoadmap(allAnswers: AnswersMap): GuardianshipRoadmapModel {
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

  const childrenData = (childrenAnswers.childrenData as Array<ChildRecord>) || [];
  const planningPersons = parsePlanningPersons(childrenAnswers.planningPersons);

  const childProfiles: GuardianshipChildProfile[] = childrenData.map((child, index) => {
    const status = classifyChild(child, ageOfMajority);
    const disabled = child.disabled === 'yes';
    const disabilityUncertain = child.disabled === 'not_sure';
    const age = computeAge(child.dateOfBirth);
    const moveStatus = parseMoveStatus(child.transitionMoveExpected);
    const moveLikely = moveStatus === 'likely' || moveStatus === 'possible';
    const allProviders = buildAllProviders(child);

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
      supportNeedTypes: (child.supportNeedTypes || '').split(',').filter(Boolean),
      cityOfResidence: child.cityOfResidence,
      provinceTerritory: child.provinceTerritory,
      countryOfResidence: child.countryOfResidence,
      personalProfile: buildPersonalProfile(child),
      educationTransition: buildEducationTransition(child),
      healthcareTransition: buildHealthcareTransition(child, allProviders),
      supportTransition: buildSupportTransition(child, moveStatus),
      importantConnections: buildImportantConnections(child, moveLikely),
      communities: buildCommunities(child),
      traditions: buildTraditions(child),
      peopleToKeepClose: resolveFamilySelections(
        child.transitionPeopleSelections || child.belongingFamilySelections || '',
        planningPersons,
        childrenData,
        index
      ),
      adultSiblingRoles: [],
      inheritanceByClient: buildInheritance(index, willsAnswers),
      adultTransition: buildAdultTransition(child),
      firstDaysPriorities: buildFirstDaysPriorities(child),
      birthCertificateLocation: child.birthCertificateLocation,
    };
  });

  const guardianAssignments = buildGuardianAssignments(childrenData, childProfiles, planningPersons);
  const adultSiblingRoles = buildAdultSiblingRoles(childrenData, childProfiles, ageOfMajority);

  for (const child of childProfiles) {
    if (child.status === 'minor') {
      child.adultSiblingRoles = adultSiblingRoles.filter(r => r.forMinorChildIds.includes(child.childId));
    }
  }

  const roles = buildRoles(childProfiles, guardianAssignments, adultSiblingRoles);
  const financialResources = buildFinancialResources(
    childProfiles, lifeInsuranceAnswers, financialFootprintAnswers, familyTrustsAnswers
  );
  const documents = buildDocuments(childProfiles, willsAnswers);
  const readiness = buildReadiness(childProfiles, guardianAssignments, willsAnswers);
  const immediateActions = buildImmediateActions(
    childProfiles, guardianAssignments, adultSiblingRoles, willsAnswers, estateTrusteesAnswers
  );

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
      provinceOfResidence: province,
      ageOfMajority,
    },
    guardianAssignments,
    children: childProfiles,
    adultSiblingRoles,
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


export { buildGuardianshipRoadmap }