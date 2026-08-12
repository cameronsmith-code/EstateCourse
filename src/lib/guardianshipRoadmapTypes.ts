export type ChildStatus = 'minor' | 'adult_dependant' | 'adult_independent';

export type MoveStatus = 'likely' | 'possible' | 'unlikely' | 'undecided';

export type PlanningPerson = {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  city: string;
  province: string;
  country: string;
};

export type GuardianAssignment = {
  id: string;
  guardianPersonIds: string[];
  guardianPeople: PlanningPerson[];
  alternatePersonIds: string[];
  alternatePeople: PlanningPerson[];
  childIds: string[];
  childNames: string[];
  spokenWith: string;
  inWill: string;
  considered: string;
  notes?: string;
  isHousehold: boolean;
  householdLabel: string;
  guardianCommunity: string;
  currentCommunity: string;
  isCrossBorder: boolean;
  isCrossProvince: boolean;
  moveStatus: MoveStatus;
};

export type AdultSiblingRole = {
  adultSiblingChildId: string;
  adultSiblingName: string;
  role: string;
  notResponsibleFor: string[];
  forMinorChildIds: string[];
  forMinorChildNames: string[];
};

export type ActivityEntry = {
  name: string;
  type: string;
  importance: string;
  frequency: string;
};

export type PersonalProfile = {
  communicationStyle?: string;
  emotionalExpression?: string;
  comfortStrategies?: string;
  socialChallenges?: string;
  behaviouralConsiderations?: string;
  importantRoutines?: string;
  activities: ActivityEntry[];
  socialAdditionalNotes?: string;
  transitionEasier?: string;
  missedMost?: string;
  feelConnected?: string;
};

export type EducationTransition = {
  schoolName?: string;
  schoolPhone?: string;
  schoolAddress?: string;
  currentGrade?: string;
  hasIEP: boolean;
  iepDetails?: string;
  iepDocumentLocation?: string;
  iepImportance?: string;
  schoolChangeExpected?: string;
  newSchoolNotes?: string;
  recordLocation?: string;
  learningStyleNotes?: string;
  schoolExtraSupport?: string;
  schoolFocusHelps?: string;
};

export type MedicationEntry = {
  name: string;
  treats: string;
  prescribed: boolean;
  prescribedBy?: string;
  otherInfo?: string;
};

export type AllergyEntry = {
  details: string;
  severity: string;
  medications?: string;
  epipen?: string;
};

export type HealthcareProvider = {
  id: string;
  name: string;
  role: string;
  category: string;
  phone?: string;
  email?: string;
  city?: string;
  province?: string;
  resolved: boolean;
};

export type HealthcareTransition = {
  providers: HealthcareProvider[];
  selectedProviders: HealthcareProvider[];
  pharmacyName?: string;
  hasMedications: boolean;
  medications: MedicationEntry[];
  hasAllergies: boolean;
  allergies: AllergyEntry[];
  medicalConditions?: string;
  carePlanWritten?: string;
  carePlanStored?: string;
  providerSelectionsResolved: boolean;
  recordLocation?: string;
  medicationNotes?: string;
};

export type SupportTransitionRow = {
  supportType: string;
  supportTypeLabel: string;
  currentProvider?: string;
  purpose: string;
  transitionAction: string;
  recordLocation?: string;
  notes?: string;
};

export type ImportantConnection = {
  id: string;
  name: string;
  relationshipTypes: string[];
  contexts: string[];
  whyItMatters: string;
  importance: string;
  importanceLabel: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  continuityIdeas: string[];
  hasContactInfo: boolean;
  moveComplicates: boolean;
};

export type CommunityItem = {
  id: string;
  type: string;
  typeLabel: string;
  name: string;
  importanceNotes: string;
  continuityPreference: string;
};

export type TraditionItem = {
  id: string;
  name: string;
  type: string;
  typeLabel: string;
  participantTypes: string[];
  participantNotes: string;
  importanceNotes: string;
  continueIfPractical: string;
};

export type PersonToKeepClose = {
  id: string;
  name: string;
  relationship: string;
  sourceType: 'minor_sibling' | 'adult_sibling' | 'planning_person' | 'parent' | 'important_adults';
  phone?: string;
  email?: string;
  city?: string;
  province?: string;
  resolved: boolean;
};

export type InheritanceStage = {
  age: string;
  fraction: string;
  description: string;
};

export type ClientInheritanceInfo = {
  clientId: 'client1' | 'client2';
  clientName: string;
  inheritanceType?: string;
  stages: InheritanceStage[];
  trusteeName?: string;
  trusteePersonId?: string;
  childSpecificArrangement?: {
    hasDifferentArrangement: string;
    specialArrangement?: string;
    knownTrustType?: string;
    description?: string;
  };
};

export type AdultTransitionInfo = {
  futureIndependenceLevel?: string;
  futureFinancialHelp?: string;
  futurePersonalHealthHelp?: string;
  dtcStatus?: string;
  dtcDocLocation?: string;
  futureCaregiverName?: string;
  futureCaregiverResponsibility?: string;
  reviewNeeded: boolean;
  supportLocationDependent?: string;
  supportLocationDependentDetails?: string;
};

export type GuardianshipChildProfile = {
  childId: string;
  index: number;
  name: string;
  nickname: string;
  dateOfBirth?: string;
  age?: number;
  status: ChildStatus;
  planningFocus: string;
  disabled: boolean;
  disabilityUncertain: boolean;
  supportNeedTypes: string[];
  cityOfResidence?: string;
  provinceTerritory?: string;
  countryOfResidence?: string;
  personalProfile: PersonalProfile;
  educationTransition?: EducationTransition;
  healthcareTransition?: HealthcareTransition;
  supportTransition?: SupportTransitionRow[];
  importantConnections?: ImportantConnection[];
  communities?: CommunityItem[];
  traditions?: TraditionItem[];
  peopleToKeepClose?: PersonToKeepClose[];
  adultSiblingRoles: AdultSiblingRole[];
  inheritanceByClient: ClientInheritanceInfo[];
  adultTransition?: AdultTransitionInfo;
  firstDaysPriorities?: string[];
  birthCertificateLocation?: string;
};

export type RoleAssignment = {
  responsibility: string;
  childId?: string;
  childName?: string;
  firstChoice?: string;
  backup?: string;
  isHousehold?: boolean;
};

export type FinancialResourceSummary = {
  type: 'life_insurance' | 'resp' | 'rdsp' | 'trust';
  exists: boolean;
  childIds: string[];
  crossReference: string;
};

export type DocumentRegistryEntry = {
  type: string;
  label: string;
  exists: boolean;
  locationKnown: boolean;
  location?: string;
  clientId?: 'client1' | 'client2';
  childId?: string;
};

export type ReadinessCategory = {
  decisionsMade: string[];
  thingsWorthConfirming: string[];
  thingsStillToDo: string[];
};

export type ImmediateAction = {
  id: string;
  action: string;
  priority: number;
  childIds: string[];
  childNames: string[];
  conditional: boolean;
  isParentWish: boolean;
};

export type GuardianshipRoadmapModel = {
  family: {
    clientNames: string[];
    children: Array<{ id: string; name: string; nickname: string; status: ChildStatus }>;
    reportDate: Date;
    provinceOfResidence: string;
    ageOfMajority: number;
  };
  guardianAssignments: GuardianAssignment[];
  children: GuardianshipChildProfile[];
  adultSiblingRoles: AdultSiblingRole[];
  roles: RoleAssignment[];
  financialResources: FinancialResourceSummary[];
  documents: DocumentRegistryEntry[];
  readiness: ReadinessCategory;
  immediateActions: ImmediateAction[];
  crossReferences: Array<{ section: string; description: string }>;
};
