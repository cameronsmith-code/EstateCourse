export type ChildStatus = 'minor' | 'adult_dependant' | 'adult_independent';

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

export type GuardianContext = {
  guardian?: PlanningPerson;
  alternateGuardian?: PlanningPerson;
  guardianSpokenWith: string;
  guardianInWill: string;
  guardianConsidered: string;
  guardianCommunity: string;
  childCommunity: string;
  moveExpected: string;
  isCrossBorder: boolean;
  isCrossProvince: boolean;
  appliesToChildNames: string[];
};

export type PersonalProfile = {
  communicationStyle?: string;
  emotionalExpression?: string;
  comfortStrategies?: string;
  socialChallenges?: string;
  behaviouralConsiderations?: string;
  importantRoutines?: string;
  activities?: Array<{
    name: string;
    type: string;
    importance: string;
    frequency: string;
  }>;
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
  schoolChangeExpected?: string;
  newSchoolNotes?: string;
  recordLocation?: string;
  learningStyleNotes?: string;
  schoolExtraSupport?: string;
  schoolFocusHelps?: string;
};

export type HealthcareProvider = {
  name: string;
  role: string;
  category: string;
  phone?: string;
  email?: string;
  city?: string;
  province?: string;
};

export type HealthcareTransition = {
  providers: HealthcareProvider[];
  pharmacyName?: string;
  medications?: string;
  medicationList?: Array<{ name: string; dose: string; schedule: string }>;
  allergies?: string;
  allergyList?: Array<{ name: string; severity: string }>;
  medicalConditions?: string;
  carePlanWritten?: string;
  carePlanStored?: string;
  providersToContact: string[];
  recordLocation?: string;
  medicationNotes?: string;
};

export type SupportTransitionRow = {
  supportType: string;
  currentProvider?: string;
  purpose?: string;
  ifChildMoves: string;
};

export type ImportantConnection = {
  name: string;
  relationshipType: string;
  contexts: string[];
  whyItMatters: string;
  importance: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  continuityIdeas: string[];
  moveComplicates: boolean;
};

export type CommunityItem = {
  type: string;
  name: string;
  importanceNotes: string;
  continuityPreference: string;
};

export type TraditionItem = {
  name: string;
  type: string;
  participantTypes: string[];
  participantNotes: string;
  importanceNotes: string;
  continueIfPractical: string;
};

export type PersonToKeepClose = {
  name: string;
  relationship: string;
  role: 'emotional' | 'formal';
  notes?: string;
};

export type InheritanceInfo = {
  type?: string;
  stages?: Array<{ age: string; fraction: string; description: string }>;
  trusteeName?: string;
  specialArrangement?: string;
  knownTrustType?: string;
  description?: string;
};

export type AdultTransitionInfo = {
  futureIndependenceLevel?: string;
  futureFinancialHelp?: string;
  futurePersonalHealthHelp?: string;
  dtcStatus?: string;
  dtcDocLocation?: string;
  futureCaregiverName?: string;
  futureCaregiverResponsibility?: string;
  reviewNeeded?: boolean;
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
  cityOfResidence?: string;
  provinceTerritory?: string;
  countryOfResidence?: string;
  guardianContext?: GuardianContext;
  personalProfile: PersonalProfile;
  educationTransition?: EducationTransition;
  healthcareTransition?: HealthcareTransition;
  supportTransition?: SupportTransitionRow[];
  importantConnections?: ImportantConnection[];
  communities?: CommunityItem[];
  traditions?: TraditionItem[];
  peopleToKeepClose?: PersonToKeepClose[];
  adultSiblingRole?: string;
  adultSiblingNotResponsible?: string[];
  inheritance?: InheritanceInfo;
  adultTransition?: AdultTransitionInfo;
  firstDaysPriorities?: string[];
};

export type RoleAssignment = {
  responsibility: string;
  firstChoice?: string;
  backup?: string;
  childIds?: string[];
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
  childId?: string;
};

export type ReadinessCategory = {
  decisionsMade: string[];
  thingsWorthConfirming: string[];
  thingsStillToDo: string[];
};

export type ImmediateAction = {
  action: string;
  priority: number;
  childIds?: string[];
  conditional: boolean;
};

export type GuardianshipRoadmapModel = {
  family: {
    clientNames: string[];
    children: Array<{ id: string; name: string; nickname: string; status: ChildStatus }>;
    reportDate: Date;
    provinceOfMajority: string;
    ageOfMajority: number;
  };
  guardianPlan: {
    primaryGuardian?: PlanningPerson;
    alternateGuardian?: PlanningPerson;
    guardianSpokenWith: string;
    guardianInWill: string;
    appliesToChildren: string[];
    trusteePersonName?: string;
  };
  children: GuardianshipChildProfile[];
  roles: RoleAssignment[];
  financialResources: FinancialResourceSummary[];
  documents: DocumentRegistryEntry[];
  readiness: ReadinessCategory;
  immediateActions: ImmediateAction[];
  crossReferences: Array<{ section: string; description: string }>;
};
