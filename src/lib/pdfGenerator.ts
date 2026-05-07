import { jsPDF } from 'jspdf';

interface ChildData {
  name?: string;
  nickname?: string;
  dateOfBirth?: string;
  parentsOption?: string;
  otherParentName?: string;
  childSupportStatus?: string;
  childSupportDocLocation?: string;
  disabled?: string;
  disabilityTaxCredit?: string;
  disabilityNature?: string;
  disabilityFormalDiagnosis?: string;
  disabilityCoordinator?: string;
  disabilityLongTermPlan?: string;
  disabilityLongTermPlanDoc?: string;
  disabilityFunding?: string;
  disabilitySeverity?: string;
  disabilityCare?: string;
  disabilityContacts?: string;
  disabilityOther?: string;
  independent?: string;
  medications?: string;
  medicationList?: string;
  allergies?: string;
  allergyList?: string;
  allergyMedication?: string;
  allergyMedicationDescription?: string;
  medicalIssues?: string;
  medicalIssuesDescription?: string;
  attendingSchool?: string;
  additionalEducationInfo?: string;
  additionalEducationDetails?: string;
  schoolName?: string;
  schoolContact?: string;
  schoolStrengths?: string;
  schoolExtraSupport?: string;
  schoolFocusHelps?: string;
  schoolDistractions?: string;
  schoolCalmingStrategies?: string;
  hasIEP?: string;
  individualEducationPlan?: string;
  iepDocumentLocation?: string;
  schoolActivitiesImportant?: string;
  homeworkRoutines?: string;
  educationHopes?: string;
  learningStyleNotes?: string;
  behaviouralConsiderations?: string;
  educationAdditionalDetails?: string;
  canadianResident?: string;
  provinceTerritory?: string;
  overAgeMajority?: string;
  countryOfResidence?: string;
  hasSpouse?: string;
  spouseName?: string;
  hasChildren?: string;
  numberOfGrandchildren?: string;
  [key: string]: string | undefined;
}

interface SolePropLicense {
  nature?: string;
  documentLocation?: string;
}

interface SolePropSocialAccount {
  platform?: string;
  credentialsLocation?: string;
}

interface SolePropOnlinePersona {
  name?: string;
  credentialsLocation?: string;
}

interface SolePropAsset {
  name?: string;
  type?: string;
  recordsLocation?: string;
}

interface SolePropLiability {
  lenderName?: string;
  liabilityType?: string;
  lenderContact?: string;
  documentationLocation?: string;
}

interface SolePropData {
  registeredName?: string;
  natureOfBusiness?: string;
  hasLicenses?: string;
  licenses?: SolePropLicense[];
  bookkeeper?: string;
  bookkeeperFirm?: string;
  bookkeeperContact?: string;
  bookkeeperPhone?: string;
  bookkeeperEmail?: string;
  bookkeeperWebsite?: string;
  accountingRecordsLocation?: string;
  hasDigitalAssets?: string;
  website?: string;
  websiteCredentialsLocation?: string;
  domainProvider?: string;
  domainCredentialsLocation?: string;
  socialAccounts?: SolePropSocialAccount[];
  onlinePersonas?: SolePropOnlinePersona[];
  hasMajorAssets?: string;
  assets?: SolePropAsset[];
  hasLiabilities?: string;
  liabilities?: SolePropLiability[];
  dissolutionPlan?: string;
  dissolutionPlanDocLocation?: string;
  executorAuthority?: string;
}

interface PersonalGuaranteePdf {
  natureOfDebt?: string;
  documentationLocation?: string;
}

interface LiabilityInsurancePolicyPdf {
  description?: string;
  documentationLocation?: string;
}

interface PartnershipItem {
  registeredName?: string;
  natureOfBusiness?: string;
  partnershipType?: string;
  hasWrittenAgreement?: string;
  agreementDocLocation?: string;
  agreementHasDeathProvisions?: string;
  continuityContinues?: string;
  hasBuySellAgreement?: string;
  buySellDocLocation?: string;
  buySellFundedByInsurance?: string;
  buySellInsuranceDocLocation?: string;
  hasValuationMethod?: string;
  valuationMethodDocLocation?: string;
  hasPersonalGuarantees?: string;
  personalGuarantees?: PersonalGuaranteePdf[];
  isProfessionalPartnership?: string;
  hasLiabilityInsurance?: string;
  liabilityInsurancePolicies?: LiabilityInsurancePolicyPdf[];
}

interface FormData {
  fullName?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  country?: string;
  email?: string;
  phone?: string;
  hasSpouse?: string;
  spouseName?: string;
  maritalStatus?: string;
  hasMarriageContract?: string;
  marriageContractLocation?: string;
  client1HasPreviousRelationship?: string;
  client1NumberOfPreviousRelationships?: string;
  client1PreviousRelationshipsData?: Array<Record<string, string>>;
  client2HasPreviousRelationship?: string;
  client2NumberOfPreviousRelationships?: string;
  client2PreviousRelationshipsData?: Array<Record<string, string>>;
  client1IsTrustBeneficiary?: string;
  client1BeneficiaryTrustCount?: string;
  client1BeneficiaryTrustsData?: Array<Record<string, string>>;
  client1IsSpousalTrustBeneficiary?: string;
  client1SpousalTrustDocumentLocation?: string;
  client2IsTrustBeneficiary?: string;
  client2BeneficiaryTrustCount?: string;
  client2BeneficiaryTrustsData?: Array<Record<string, string>>;
  spouseSameAddress?: string;
  spouseDateOfBirth?: string;
  spouseAddress?: string;
  spouseCity?: string;
  spouseProvince?: string;
  spousePostalCode?: string;
  spouseCountry?: string;
  spouseEmail?: string;
  spousePhone?: string;
  hasChildren?: string;
  numberOfChildren?: string;
  childrenData?: ChildData[];
  hasFamilyTrust?: string;
  trustLegalName?: string;
  trustDeedLocation?: string;
  trustYearEstablished?: string;
  trustBeneficiariesCount?: string;
  trustBeneficiariesData?: Array<{
    beneficiaryName?: string;
    relationshipToSettlor?: string;
    countryOfResidence?: string;
    phoneNumber?: string;
    emailAddress?: string;
  }>;
  hasSoleProprietorship?: string;
  soleProprietorshipCount?: string;
  client1SolePropsData?: SolePropData[];
  hasPartnership?: string;
  partnershipCount?: string;
  client1PartnershipsData?: PartnershipItem[];
  client2HasSoleProprietorship?: string;
  client2SoleProprietorshipCount?: string;
  client2SolePropsData?: SolePropData[];
  client2HasPartnership?: string;
  client2PartnershipCount?: string;
  client2PartnershipsData?: PartnershipItem[];
  spousesPoaPersonalCare?: string;
  spouseIsPoaPersonalCare?: string;
  spousesPoaProperty?: string;
  spouseIsPoaProperty?: string;
  spousePoaPropertyHasDocAccess?: string;
  client1UsesAccountant?: string;
  client1AccountingRecordsLocation?: string;
  client2UsesAccountant?: string;
  client2AccountingRecordsLocation?: string;
  accountantSamePerson?: string;
  client1IsCameronSmithAdvisor?: string;
  client1FinancialAdvisors?: string;
  client1FinancialAdvisorsData?: Array<{
    name?: string;
    firm?: string;
    phone?: string;
    email?: string;
  }>;
  client2IsCameronSmithAdvisor?: string;
  client2FinancialAdvisors?: string;
  client2FinancialAdvisorsData?: Array<{
    name?: string;
    firm?: string;
    phone?: string;
    email?: string;
  }>;
  client1HasPoaPersonalCare?: string;
  client1SpouseIsPoaPersonalCare?: string;
  client1PoaPersonalCareName?: string;
  client1PoaPersonalCarePhone?: string;
  client1PoaPersonalCareEmail?: string;
  client1PoaPersonalCareRelationship?: string;
  client1PoaPersonalCareIsCanadaResident?: string;
  client1PoaPersonalCareCountry?: string;
  client1PoaPersonalCareProvince?: string;
  client1PoaPersonalCareCity?: string;
  client1PoaPersonalCareHasDocCopy?: string;
  client1HasAlternatePoaPersonalCare?: string;
  client1AlternatePoaPersonalCareCount?: string;
  client1AlternatePoaPersonalCareData?: Array<Record<string, string>>;
  client1HasContingentPoaPersonalCare?: string;
  client1PoaPersonalCareCount?: string;
  client1PoaPersonalCareDocLocation?: string;
  client1PoaPersonalCareData?: Array<{
    name?: string;
    phone?: string;
    email?: string;
    relationship?: string;
    country?: string;
    otherCountry?: string;
    province?: string;
    city?: string;
    providedCopy?: string;
    isCanadaResident?: string;
    hasDocCopy?: string;
  }>;
  client1HasPoaProperty?: string;
  client1HasContingentPoaProperty?: string;
  client1PoaPropertyCount?: string;
  client1PoaPropertyData?: Array<{
    name?: string;
    phone?: string;
    email?: string;
    relationship?: string;
    country?: string;
    otherCountry?: string;
    province?: string;
    city?: string;
  }>;
  client1HasEstateTrustee?: string;
  client1EstateTrusteeCount?: string;
  client1EstateTrusteeData?: Array<{
    type?: string;
    name?: string;
    phone?: string;
    email?: string;
    relationship?: string;
    country?: string;
    otherCountry?: string;
    province?: string;
    city?: string;
    companyName?: string;
    companyAddress?: string;
    contactName?: string;
    providedCopy?: string;
  }>;
  client2HasPoaPersonalCare?: string;
  client2SpouseIsPoaPersonalCare?: string;
  client2PoaPersonalCareName?: string;
  client2PoaPersonalCarePhone?: string;
  client2PoaPersonalCareEmail?: string;
  client2PoaPersonalCareRelationship?: string;
  client2PoaPersonalCareIsCanadaResident?: string;
  client2PoaPersonalCareCountry?: string;
  client2PoaPersonalCareProvince?: string;
  client2PoaPersonalCareCity?: string;
  client2PoaPersonalCareHasDocCopy?: string;
  client2HasAlternatePoaPersonalCare?: string;
  client2AlternatePoaPersonalCareCount?: string;
  client2AlternatePoaPersonalCareData?: Array<Record<string, string>>;
  client2HasContingentPoaPersonalCare?: string;
  client2PoaPersonalCareCount?: string;
  client2PoaPersonalCareDocLocation?: string;
  client2PoaPersonalCareData?: Array<{
    name?: string;
    phone?: string;
    email?: string;
    relationship?: string;
    country?: string;
    otherCountry?: string;
    province?: string;
    city?: string;
    providedCopy?: string;
    isCanadaResident?: string;
    hasDocCopy?: string;
  }>;
  client2HasPoaProperty?: string;
  client2HasContingentPoaProperty?: string;
  client2SpouseIsPoaProperty?: string;
  client2SpousePoaPropertyHasDocAccess?: string;
  client2PoaPropertyCount?: string;
  client2PoaPropertyDocLocation?: string;
  client2PoaPropertyData?: Array<{
    name?: string;
    phone?: string;
    email?: string;
    relationship?: string;
    country?: string;
    otherCountry?: string;
    province?: string;
    city?: string;
  }>;
  client2HasEstateTrustee?: string;
  client2EstateTrusteeCount?: string;
  client2EstateTrusteeData?: Array<{
    type?: string;
    name?: string;
    phone?: string;
    email?: string;
    relationship?: string;
    country?: string;
    otherCountry?: string;
    province?: string;
    city?: string;
    companyName?: string;
    companyAddress?: string;
    contactName?: string;
    providedCopy?: string;
  }>;
  client1PoaPersonalCareHasDocCopy?: string;
  client1PoaPropertyHasDocCopy?: string;
  client2PoaPersonalCareHasDocCopy?: string;
  client2PoaPropertyHasDocCopy?: string;
  client1EstateTrusteeKnowsWillLocation?: string;
  client2EstateTrusteeKnowsWillLocation?: string;
  client1HasLivingWill?: string;
  client2HasLivingWill?: string;
  client1HasHensonTrust?: string;
  bankingStructure?: string;
  jointBankCount?: string;
  jointInstitutionsData?: Array<{ name?: string }>;
  client1BankCount?: string;
  client1InstitutionsData?: Array<{ name?: string }>;
  client2BankCount?: string;
  client2InstitutionsData?: Array<{ name?: string }>;
  mixedJointBankCount?: string;
  mixedJointInstitutionsData?: Array<{ name?: string }>;
  mixedClient1BankCount?: string;
  mixedClient1InstitutionsData?: Array<{ name?: string }>;
  mixedClient2BankCount?: string;
  mixedClient2InstitutionsData?: Array<{ name?: string }>;
  propertiesData?: Array<{
    propertyName?: string;
    propertyType?: string;
    propertyOwner?: string;
    trustName?: string;
    corporationName?: string;
    otherDetails?: string;
    hasAdditionalOwners?: string;
    additionalOwnersCount?: string;
    hasSuccessionPlan?: string;
    successionPlanLocation?: string;
    rentalAgreementsLocation?: string;
    revenueExpensesLocation?: string;
    capitalExpendituresLocation?: string;
  }>;
  hasDebts?: string;
  debtsData?: Array<{
    debtType?: string;
    debtOwner?: string;
    hasOtherOnLoan?: string;
    otherPersonName?: string;
    otherPersonPhone?: string;
    isSecured?: string;
    securedBy?: string;
  }>;
  client1HasCreditCards?: string;
  client1CreditCardCount?: string;
  creditCardsData?: Array<{
    company?: string;
    lastFourDigits?: string;
    expiryDate?: string;
    otherParties?: string;
  }>;
  client2HasCreditCards?: string;
  client2CreditCardCount?: string;
  client2CreditCardsData?: Array<{
    company?: string;
    lastFourDigits?: string;
    expiryDate?: string;
    otherParties?: string;
  }>;
  client1HasWorkBenefits?: string;
  client2HasWorkBenefits?: string;
  client1HasLifeInsurance?: string;
  client1LifeInsuranceCount?: string;
  client2HasLifeInsurance?: string;
  client2LifeInsuranceCount?: string;
  client1HasDisabilityInsurance?: string;
  client1DisabilityInsuranceCount?: string;
  client2HasDisabilityInsurance?: string;
  client2DisabilityInsuranceCount?: string;
  client1HasCriticalIllness?: string;
  client1CriticalIllnessCount?: string;
  client2HasCriticalIllness?: string;
  client2CriticalIllnessCount?: string;
  hasHomeInsurance?: string;
  homeInsuranceDocLocation?: string;
  hasAdditionalProperties?: string;
  additionalPropertiesCount?: string;
  additionalProperty1DocLocation?: string;
  additionalProperty2DocLocation?: string;
  additionalProperty3DocLocation?: string;
  additionalProperty4DocLocation?: string;
  additionalProperty5DocLocation?: string;
  additionalProperty6DocLocation?: string;
  additionalProperty7DocLocation?: string;
  additionalProperty8DocLocation?: string;
  additionalProperty9DocLocation?: string;
  additionalProperty10DocLocation?: string;
  client1HasVehicleInsurance?: string;
  client1VehicleDescription?: string;
  client1VehicleInsuranceDocLocation?: string;
  client2HasVehicleInsurance?: string;
  client2VehicleDescription?: string;
  client2VehicleInsuranceDocLocation?: string;
  hasAdditionalVehicles?: string;
  additionalVehiclesCount?: string;
  additionalVehicle1Description?: string;
  additionalVehicle1DocLocation?: string;
  additionalVehicle2Description?: string;
  additionalVehicle2DocLocation?: string;
  additionalVehicle3Description?: string;
  additionalVehicle3DocLocation?: string;
  additionalVehicle4Description?: string;
  additionalVehicle4DocLocation?: string;
  additionalVehicle5Description?: string;
  additionalVehicle5DocLocation?: string;
  additionalVehicle6Description?: string;
  additionalVehicle6DocLocation?: string;
  additionalVehicle7Description?: string;
  additionalVehicle7DocLocation?: string;
  additionalVehicle8Description?: string;
  additionalVehicle8DocLocation?: string;
  additionalVehicle9Description?: string;
  additionalVehicle9DocLocation?: string;
  additionalVehicle10Description?: string;
  additionalVehicle10DocLocation?: string;
  hasCorporation?: string;
  corporationCount?: string;
  ownsCorporation?: string;
  numberOfCorporations?: string;
  corporationsData?: Array<{
    legalName?: string;
    incorporatedInCanada?: string;
    jurisdiction?: string;
    corporationType?: string;
    corporationTypeOther?: string;
    owners?: string;
    articlesLocation?: string;
    minuteBookLocation?: string;
    hasOtherOwner?: string;
    otherOwners?: string;
    hasShareholderAgreement?: string;
    shareholderAgreementLocation?: string;
  }>;
  client1HasFuneralArrangements?: string;
  client1HasDiscussedFuneral?: string;
  client1FuneralWrittenDown?: string;
  client1FuneralDocLocation?: string;
  client2HasFuneralArrangements?: string;
  client2HasDiscussedFuneral?: string;
  client2FuneralWrittenDown?: string;
  client2FuneralDocLocation?: string;
  client1HasPension?: string;
  client1PensionsData?: Array<Record<string, string>>;
  client2HasPension?: string;
  client2PensionsData?: Array<Record<string, string>>;
  client1HasESOP?: string;
  client1ESOPEmployer?: string;
  client1ESOPLocation?: string;
  client2HasESOP?: string;
  client2ESOPEmployer?: string;
  client2ESOPLocation?: string;
}

const getOrdinalLabel = (num: number): string => {
  const ordinals = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'];
  return ordinals[num - 1] || `${num}th`;
};

export const generatePDF = (formData: FormData) => {
  console.log('PDF Generator - Full FormData:', formData);
  console.log('PDF Generator - Previous Relationships Check:', {
    client1HasPreviousRelationship: formData.client1HasPreviousRelationship,
    client1NumberOfPreviousRelationships: formData.client1NumberOfPreviousRelationships,
    client1PreviousRelationshipsData: formData.client1PreviousRelationshipsData,
    client2HasPreviousRelationship: formData.client2HasPreviousRelationship,
    client2NumberOfPreviousRelationships: formData.client2NumberOfPreviousRelationships,
    client2PreviousRelationshipsData: formData.client2PreviousRelationshipsData,
  });

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18; // Increased margin for premium feel
  const fieldWidth = pageWidth - margin * 2;
  let yPosition = margin;
  let pageNumber = 1;

  // Professional Color Palette
  const colors = {
    navyBlue: [30, 58, 95] as [number, number, number],
    mediumGray: [100, 100, 100] as [number, number, number],
    lightGray: [240, 240, 240] as [number, number, number],
    darkText: [40, 40, 40] as [number, number, number],
    black: [0, 0, 0] as [number, number, number],
    borderGray: [200, 200, 200] as [number, number, number],
    tableBorder: [180, 180, 180] as [number, number, number],
    tableHeader: [220, 230, 242] as [number, number, number],
  };

  // Transform POA Personal Care data: merge primary flat fields with alternates
  if (formData.client1HasPoaPersonalCare === 'yes' && formData.client1SpouseIsPoaPersonalCare !== 'yes') {
    const primaryPOA: Record<string, string | undefined> = {
      name: formData.client1PoaPersonalCareName,
      phone: formData.client1PoaPersonalCarePhone,
      email: formData.client1PoaPersonalCareEmail,
      relationship: formData.client1PoaPersonalCareRelationship,
      isCanadaResident: formData.client1PoaPersonalCareIsCanadaResident,
      country: formData.client1PoaPersonalCareCountry,
      province: formData.client1PoaPersonalCareProvince,
      city: formData.client1PoaPersonalCareCity,
      hasDocCopy: formData.client1PoaPersonalCareHasDocCopy,
    };

    const alternates: Array<Record<string, string | undefined>> = [];

    // Collect alternates from flat fields (up to 5)
    for (let i = 1; i <= 5; i++) {
      const nameKey = `client1AlternatePoaPersonalCare${i}Name` as keyof typeof formData;
      if (formData[nameKey]) {
        alternates.push({
          name: formData[`client1AlternatePoaPersonalCare${i}Name` as keyof typeof formData] as string,
          phone: formData[`client1AlternatePoaPersonalCare${i}Phone` as keyof typeof formData] as string,
          email: formData[`client1AlternatePoaPersonalCare${i}Email` as keyof typeof formData] as string,
          relationship: formData[`client1AlternatePoaPersonalCare${i}Relationship` as keyof typeof formData] as string,
          isCanadaResident: formData[`client1AlternatePoaPersonalCare${i}IsCanadaResident` as keyof typeof formData] as string,
          country: formData[`client1AlternatePoaPersonalCare${i}Country` as keyof typeof formData] as string,
          province: formData[`client1AlternatePoaPersonalCare${i}Province` as keyof typeof formData] as string,
          city: formData[`client1AlternatePoaPersonalCare${i}City` as keyof typeof formData] as string,
          hasDocCopy: formData[`client1AlternatePoaPersonalCare${i}HasDocCopy` as keyof typeof formData] as string,
        });
      }
    }

    const allPOAs = [primaryPOA, ...alternates];

    formData.client1PoaPersonalCareData = allPOAs;
    formData.client1PoaPersonalCareCount = allPOAs.length.toString();
    formData.client1HasContingentPoaPersonalCare = alternates.length > 0 ? 'yes' : 'no';
  }

  if (formData.client2HasPoaPersonalCare === 'yes' && formData.client2SpouseIsPoaPersonalCare !== 'yes') {
    const primaryPOA: Record<string, string | undefined> = {
      name: formData.client2PoaPersonalCareName,
      phone: formData.client2PoaPersonalCarePhone,
      email: formData.client2PoaPersonalCareEmail,
      relationship: formData.client2PoaPersonalCareRelationship,
      isCanadaResident: formData.client2PoaPersonalCareIsCanadaResident,
      country: formData.client2PoaPersonalCareCountry,
      province: formData.client2PoaPersonalCareProvince,
      city: formData.client2PoaPersonalCareCity,
      hasDocCopy: formData.client2PoaPersonalCareHasDocCopy,
    };

    const alternates: Array<Record<string, string | undefined>> = [];

    // Collect alternates from flat fields (up to 5)
    for (let i = 1; i <= 5; i++) {
      const nameKey = `client2AlternatePoaPersonalCare${i}Name` as keyof typeof formData;
      if (formData[nameKey]) {
        alternates.push({
          name: formData[`client2AlternatePoaPersonalCare${i}Name` as keyof typeof formData] as string,
          phone: formData[`client2AlternatePoaPersonalCare${i}Phone` as keyof typeof formData] as string,
          email: formData[`client2AlternatePoaPersonalCare${i}Email` as keyof typeof formData] as string,
          relationship: formData[`client2AlternatePoaPersonalCare${i}Relationship` as keyof typeof formData] as string,
          isCanadaResident: formData[`client2AlternatePoaPersonalCare${i}IsCanadaResident` as keyof typeof formData] as string,
          country: formData[`client2AlternatePoaPersonalCare${i}Country` as keyof typeof formData] as string,
          province: formData[`client2AlternatePoaPersonalCare${i}Province` as keyof typeof formData] as string,
          city: formData[`client2AlternatePoaPersonalCare${i}City` as keyof typeof formData] as string,
          hasDocCopy: formData[`client2AlternatePoaPersonalCare${i}HasDocCopy` as keyof typeof formData] as string,
        });
      }
    }

    const allPOAs = [primaryPOA, ...alternates];

    formData.client2PoaPersonalCareData = allPOAs;
    formData.client2PoaPersonalCareCount = allPOAs.length.toString();
    formData.client2HasContingentPoaPersonalCare = alternates.length > 0 ? 'yes' : 'no';
  }

  // Add a new page, increment counter, and stamp page number top-right
  const addPage = () => {
    doc.addPage();
    pageNumber++;
    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...colors.mediumGray);
    const numStr = String(pageNumber);
    doc.setFont(undefined, 'bold');
    const numWidth = doc.getTextWidth(numStr);
    doc.setFont(undefined, 'normal');
    doc.text('Page | ', pageWidth - margin - numWidth, 12, { align: 'right' });
    doc.setFont(undefined, 'bold');
    doc.text(numStr, pageWidth - margin, 12, { align: 'right' });
    doc.setFont(undefined, 'normal');
    doc.setFillColor(255, 255, 255);
    doc.setTextColor(...colors.darkText);
  };

  // Helper function: Check if new page is needed
  const checkPageBreak = (spaceNeeded: number) => {
    if (yPosition + spaceNeeded > pageHeight - 20) {
      addPage();
      yPosition = 22;
      return true;
    }
    return false;
  };

  // Helper function: Draw section header
  const addSectionHeader = (title: string) => {
    checkPageBreak(20);
    yPosition += 14;

    // Background box for section header
    doc.setFillColor(...colors.lightGray);
    doc.rect(margin, yPosition - 4, fieldWidth, 10, 'F');

    // Section title
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colors.navyBlue);
    doc.text(title, margin + 3, yPosition + 3);

    // Accent line
    doc.setDrawColor(...colors.navyBlue);
    doc.setLineWidth(0.8);
    doc.line(margin, yPosition + 6.5, pageWidth - margin, yPosition + 6.5);

    doc.setFont(undefined, 'normal');
    doc.setTextColor(...colors.darkText);
    doc.setFillColor(255, 255, 255);
    yPosition += 14;
  };

  // Helper function: Draw subsection header
  const addSubsectionHeader = (title: string) => {
    checkPageBreak(15);
    yPosition += 10;

    // Left accent bar
    doc.setFillColor(...colors.navyBlue);
    doc.rect(margin, yPosition - 3, 2, 8, 'F');

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colors.mediumGray);
    doc.text(title, margin + 5, yPosition + 3);

    doc.setFont(undefined, 'normal');
    doc.setTextColor(...colors.darkText);
    doc.setFillColor(255, 255, 255);
    yPosition += 10;
  };

  // Introduction Page (Page 1)
  yPosition = 35;

  // Title Page Design (at top of page 1)
  // Title background box
  doc.setFillColor(...colors.lightGray);
  doc.rect(margin - 3, yPosition - 8, fieldWidth + 6, 28, 'F');

  // Main title
  doc.setFontSize(24);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(...colors.navyBlue);
  doc.text('Estate Planning Questionnaire', pageWidth / 2, yPosition, { align: 'center' });

  // Subtitle
  yPosition += 10;
  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(...colors.mediumGray);
  doc.text('Comprehensive Estate & Financial Planning Document', pageWidth / 2, yPosition, { align: 'center' });

  // Decorative line
  yPosition += 8;
  doc.setDrawColor(...colors.navyBlue);
  doc.setLineWidth(1);
  doc.line(margin + 20, yPosition, pageWidth - margin - 20, yPosition);

  yPosition += 15;

  // Date generated
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(...colors.mediumGray);
  doc.text(currentDate, pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 15;

  // Welcome title
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(...colors.navyBlue);
  const welcomeLines = doc.splitTextToSize('Welcome to your Estate Planning Companion from Clarify Wealth.', fieldWidth);
  welcomeLines.forEach((line: string) => {
    doc.text(line, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 8;
  });

  yPosition += 5;

  // Introduction body text
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(...colors.darkText);

  const introText = [
    'First, thank you for taking the time to prepare this document. While completing it may take some effort—and you may prefer to work through it in sections—it will ultimately save many times that effort for those who may need to rely on it in the future.',
    '',
    'Most Canadians remain underprepared when it comes to estate planning. A report on Estate Planning published in April 2022 by the National Institute on Aging (NAI), in collaboration with Royal Trust, found that only 28% of Canadians aged 35–54 have a Power of Attorney in place, and just 53% of Canadians over age 55 have one.',
    '',
    'This document is designed to make life significantly easier for your Powers of Attorney and heirs when they are called upon to look after your affairs—whether during your lifetime or after your passing.',
    '',
    'It is not intended to replace or override any appointments or instructions set out in your legal documents. Rather, it is meant to support those documents by helping the individuals responsible for carrying out your wishes do so in an organized and efficient manner.',
    '',
    'Store this document along with your Power of Attorney documents so it will be readily available for those who it will help.',
    '',
    'Congratulations on taking this important step. Your heirs and Powers of Attorney will be grateful that you did.'
  ];

  introText.forEach((paragraph) => {
    if (paragraph === '') {
      yPosition += 5;
    } else {
      const lines = doc.splitTextToSize(paragraph, fieldWidth);
      lines.forEach((line: string) => {
        if (yPosition > pageHeight - 30) {
          addPage();
          yPosition = 22;
        }
        doc.text(line, margin, yPosition);
        yPosition += 5;
      });
    }
  });

  // Start new page for questionnaire content
  addPage();
  yPosition = 35;

  // Instructions
  doc.setFontSize(9);
  doc.setTextColor(...colors.mediumGray);
  doc.text('This is a fillable PDF document - click on the fields to enter your information', pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 15;
  doc.setTextColor(...colors.darkText);
  doc.setFontSize(10);

  // Helper function: Add form field
  const addField = (label: string, fieldName: string, value: string, height: number = 7) => {
    checkPageBreak(height + 8);

    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...colors.mediumGray);
    doc.text(label, margin, yPosition);
    yPosition += 3;

    // Field border
    doc.setDrawColor(...colors.borderGray);
    doc.setLineWidth(0.3);
    doc.rect(margin, yPosition, fieldWidth, height);

    const field = new doc.AcroFormTextField();
    field.fieldName = fieldName;
    field.Rect = [margin, yPosition, fieldWidth, height];
    field.value = value;
    field.fontSize = 10;
    field.textColor = colors.darkText;
    doc.addField(field);

    yPosition += height + 5;
    doc.setTextColor(...colors.darkText);
  };

  addSectionHeader('Contact Information');

  const basicTableCellHeight = 8;
  const basicLabelWidth = fieldWidth * 0.35;
  const basicValueWidth = fieldWidth * 0.65;

  const renderBasicChart = (title: string, rows: { label: string; value: string }[], prefix: string) => {
    const totalH = rows.length * basicTableCellHeight;
    checkPageBreak(20 + totalH);
    addSubsectionHeader(title);
    yPosition += 2;
    rows.forEach((row, rowIndex) => {
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      const labelLines = doc.splitTextToSize(row.label, basicLabelWidth - 3);
      const dynH = Math.max(basicTableCellHeight, labelLines.length * 5 + 3);
      const rowY = yPosition;
      doc.setDrawColor(...colors.tableBorder);
      doc.setLineWidth(0.3);
      doc.setFillColor(255, 255, 255);
      doc.rect(margin, rowY, basicLabelWidth, dynH, 'FD');
      doc.setFillColor(...colors.tableHeader);
      doc.rect(margin + basicLabelWidth, rowY, basicValueWidth, dynH, 'FD');

      doc.setTextColor(...colors.darkText);
      doc.text(labelLines, margin + 1, rowY + 5);

      const vf = new doc.AcroFormTextField();
      vf.fieldName = `${prefix}_row_${rowIndex}`;
      vf.Rect = [margin + basicLabelWidth + 0.5, rowY + 0.5, basicValueWidth - 1, dynH - 1];
      vf.fontSize = 9;
      vf.textColor = colors.darkText;
      vf.borderStyle = 'none';
      vf.value = row.value || '';
      doc.addField(vf);

      yPosition += dynH;
    });
    yPosition += 6;
  };

  const estLabelWidth = fieldWidth * 0.40;
  const estValueWidth = fieldWidth * 0.60;
  const estRowH = 8;

  const renderEstateRow = (label: string, value: string, fieldName: string) => {
    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);
    const labelLines = doc.splitTextToSize(label, estLabelWidth - 4);
    const dynH = Math.max(estRowH, labelLines.length * 5 + 3);
    checkPageBreak(dynH + 2);
    const rowY = yPosition;
    doc.setDrawColor(...colors.tableBorder);
    doc.setLineWidth(0.3);
    doc.setFillColor(255, 255, 255);
    doc.rect(margin, rowY, estLabelWidth, dynH, 'FD');
    doc.setFillColor(...colors.tableHeader);
    doc.rect(margin + estLabelWidth, rowY, estValueWidth, dynH, 'FD');
    doc.setTextColor(...colors.darkText);
    doc.text(labelLines, margin + 2, rowY + 5.5);
    const f = new doc.AcroFormTextField();
    f.fieldName = fieldName;
    f.Rect = [margin + estLabelWidth + 0.5, rowY + 0.5, estValueWidth - 1, dynH - 1];
    f.fontSize = 9;
    f.textColor = colors.darkText;
    f.borderStyle = 'none';
    f.value = value;
    doc.addField(f);
    yPosition += dynH;
  };

  const acctLabelWidth = fieldWidth * 0.30;
  const acctCol2Width = fieldWidth * 0.23;
  const acctCol3Width = fieldWidth * 0.23;
  const acctCol4Width = fieldWidth * 0.24;
  const acctRowH = 8;

  const renderAccountRow = (label: string, fieldName: string, isEditable: boolean, col2Val = '', col3Val = '', col4Val = '') => {
    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);
    const labelLines = doc.splitTextToSize(label, acctLabelWidth - 4);
    const dynH = Math.max(acctRowH, labelLines.length * 5 + 3);
    checkPageBreak(dynH + 2);
    const rowY = yPosition;
    doc.setDrawColor(...colors.tableBorder);
    doc.setLineWidth(0.3);
    doc.setFillColor(255, 255, 255);
    doc.rect(margin, rowY, acctLabelWidth, dynH, 'FD');
    doc.setFillColor(...colors.tableHeader);
    doc.rect(margin + acctLabelWidth, rowY, acctCol2Width, dynH, 'FD');
    doc.rect(margin + acctLabelWidth + acctCol2Width, rowY, acctCol3Width, dynH, 'FD');
    doc.rect(margin + acctLabelWidth + acctCol2Width + acctCol3Width, rowY, acctCol4Width, dynH, 'FD');
    doc.setTextColor(...colors.darkText);
    if (isEditable) {
      const lf = new doc.AcroFormTextField();
      lf.fieldName = `${fieldName}_col1`;
      lf.Rect = [margin + 0.5, rowY + 0.5, acctLabelWidth - 1, dynH - 1];
      lf.fontSize = 9; lf.textColor = colors.darkText; lf.borderStyle = 'none'; lf.value = label;
      doc.addField(lf);
    } else {
      doc.text(labelLines, margin + 2, rowY + 5.5);
    }
    const f2 = new doc.AcroFormTextField();
    f2.fieldName = `${fieldName}_col2`;
    f2.Rect = [margin + acctLabelWidth + 0.5, rowY + 0.5, acctCol2Width - 1, dynH - 1];
    f2.fontSize = 9; f2.textColor = colors.darkText; f2.borderStyle = 'none'; f2.value = col2Val;
    doc.addField(f2);
    const f3 = new doc.AcroFormTextField();
    f3.fieldName = `${fieldName}_col3`;
    f3.Rect = [margin + acctLabelWidth + acctCol2Width + 0.5, rowY + 0.5, acctCol3Width - 1, dynH - 1];
    f3.fontSize = 9; f3.textColor = colors.darkText; f3.borderStyle = 'none'; f3.value = col3Val;
    doc.addField(f3);
    const f4 = new doc.AcroFormTextField();
    f4.fieldName = `${fieldName}_col4`;
    f4.Rect = [margin + acctLabelWidth + acctCol2Width + acctCol3Width + 0.5, rowY + 0.5, acctCol4Width - 1, dynH - 1];
    f4.fontSize = 9; f4.textColor = colors.darkText; f4.borderStyle = 'none'; f4.value = col4Val;
    doc.addField(f4);
    yPosition += dynH;
  };

  const renderAccountTable = (prefix: string, rows: { label: string; editable?: boolean }[]) => {
    const headerLabels = ['Account Type', 'Institution', 'Last 4 Digits', 'Beneficiary'];
    checkPageBreak(10);
    const hRowY = yPosition;
    doc.setDrawColor(...colors.tableBorder);
    doc.setLineWidth(0.3);
    doc.setFillColor(255, 255, 255);
    doc.rect(margin, hRowY, acctLabelWidth, acctRowH, 'FD');
    doc.rect(margin + acctLabelWidth, hRowY, acctCol2Width, acctRowH, 'FD');
    doc.rect(margin + acctLabelWidth + acctCol2Width, hRowY, acctCol3Width, acctRowH, 'FD');
    doc.rect(margin + acctLabelWidth + acctCol2Width + acctCol3Width, hRowY, acctCol4Width, acctRowH, 'FD');
    doc.setFont(undefined, 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...colors.darkText);
    doc.text(headerLabels[0], margin + 2, hRowY + 5.5);
    doc.text(headerLabels[1], margin + acctLabelWidth + 2, hRowY + 5.5);
    doc.text(headerLabels[2], margin + acctLabelWidth + acctCol2Width + 2, hRowY + 5.5);
    doc.text(headerLabels[3], margin + acctLabelWidth + acctCol2Width + acctCol3Width + 2, hRowY + 5.5);
    yPosition += acctRowH;
    rows.forEach((row, i) => {
      renderAccountRow(row.label, `${prefix}_row${i}`, !!row.editable);
    });
    yPosition += 4;
  };

  const renderBankTable = (prefix: string, data?: { name?: string; branch?: string; accountType?: string; last4?: string; contact?: string; onlineBanking?: string }) => {
    renderEstateRow('Institution Name:', data?.name || '', `${prefix}_name`);
    renderEstateRow('Branch/Location:', data?.branch || '', `${prefix}_branch`);
    renderEstateRow('Account Type:', data?.accountType || '', `${prefix}_type`);
    renderEstateRow('Last 4 Digits of Account Number:', data?.last4 || '', `${prefix}_last4`);
    renderEstateRow('Primary Contact Person:', data?.contact || '', `${prefix}_contact`);
    renderEstateRow('Online Banking Access:', data?.onlineBanking || '', `${prefix}_online`);
    renderEstateRow('Other Details:', '', `${prefix}_other`);
    yPosition += 4;
  };

  const render4ColTableHeader = (headers: [string, string, string, string], cellH: number) => {
    const cw = fieldWidth / 4;
    checkPageBreak(cellH + 2);
    const rowY = yPosition;
    doc.setDrawColor(...colors.tableBorder);
    doc.setLineWidth(0.3);
    doc.setFillColor(255, 255, 255);
    doc.rect(margin, rowY, cw, cellH, 'FD');
    doc.rect(margin + cw, rowY, cw, cellH, 'FD');
    doc.rect(margin + cw * 2, rowY, cw, cellH, 'FD');
    doc.rect(margin + cw * 3, rowY, cw, cellH, 'FD');
    doc.setFont(undefined, 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...colors.darkText);
    headers.forEach((h, idx) => {
      const lines = h.split('\n');
      lines.forEach((line, li) => doc.text(line, margin + cw * idx + 2, rowY + 3.5 + li * 3.5));
    });
    yPosition += cellH;
  };

  const render4ColTableRow = (labelLines: string[], fieldNames: [string, string, string], cellH: number, isEditable = false) => {
    const cw = fieldWidth / 4;
    checkPageBreak(cellH + 2);
    const rowY = yPosition;
    doc.setDrawColor(...colors.tableBorder);
    doc.setLineWidth(0.3);
    doc.setFillColor(255, 255, 255);
    doc.rect(margin, rowY, cw, cellH, 'FD');
    doc.rect(margin + cw, rowY, cw, cellH, 'FD');
    doc.rect(margin + cw * 2, rowY, cw, cellH, 'FD');
    doc.rect(margin + cw * 3, rowY, cw, cellH, 'FD');
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...colors.darkText);
    if (isEditable) {
      const lf = new doc.AcroFormTextField();
      lf.fieldName = `${fieldNames[0]}_label`;
      lf.Rect = [margin + 0.5, rowY + 0.5, cw - 1, cellH - 1];
      lf.fontSize = 8; lf.textColor = colors.darkText; lf.borderStyle = 'none';
      lf.value = labelLines.join(' ');
      doc.addField(lf);
    } else {
      labelLines.forEach((line, li) => doc.text(line, margin + 2, rowY + 3.5 + li * 3.5));
    }
    [fieldNames[0], fieldNames[1], fieldNames[2]].forEach((fn, idx) => {
      const f = new doc.AcroFormTextField();
      f.fieldName = fn;
      f.Rect = [margin + cw * (idx + 1) + 0.5, rowY + 0.5, cw - 1, cellH - 1];
      f.fontSize = 8; f.textColor = colors.darkText; f.borderStyle = 'none';
      doc.addField(f);
    });
    yPosition += cellH;
  };

  const isCouple = formData.maritalStatus === 'married' || formData.maritalStatus === 'common_law';
  const sameAddress = formData.spouseSameAddress === 'yes';
  const c1Name = formData.fullName || 'Client 1';
  const c2Name = formData.spouseName || 'Client 2';

  const client1Rows = [
    { label: "Client 1's Full Name:", value: c1Name },
    { label: 'Date of Birth:', value: formData.dateOfBirth || '' },
    { label: 'Email Address:', value: formData.email || '' },
    { label: 'Phone Number:', value: formData.phone || '' },
    ...(!sameAddress ? [
      { label: 'Address:', value: formData.address || '' },
      { label: 'City:', value: formData.city || '' },
      { label: 'Province:', value: formData.province || '' },
      { label: 'Postal Code:', value: formData.postalCode || '' },
    ] : []),
  ];
  renderBasicChart(`${c1Name} Contact Information:`, client1Rows, 'basic_client1');

  if (isCouple) {
    const client2Rows = [
      { label: "Client 2's Full Name:", value: c2Name },
      { label: 'Date of Birth:', value: formData.spouseDateOfBirth || '' },
      { label: 'Email Address:', value: formData.spouseEmail || '' },
      { label: 'Phone Number:', value: formData.spousePhone || '' },
      ...(!sameAddress ? [
        { label: 'Address:', value: formData.spouseAddress || '' },
        { label: 'City:', value: formData.spouseCity || '' },
        { label: 'Province:', value: formData.spouseProvince || '' },
        { label: 'Postal Code:', value: formData.spousePostalCode || '' },
      ] : []),
    ];
    renderBasicChart(`${c2Name} Contact Information:`, client2Rows, 'basic_client2');

    if (sameAddress) {
      const jointRows = [
        { label: 'Address:', value: formData.address || '' },
        { label: 'City:', value: formData.city || '' },
        { label: 'Province:', value: formData.province || '' },
        { label: 'Postal Code:', value: formData.postalCode || '' },
      ];
      renderBasicChart(`${c1Name} and ${c2Name} Address Information:`, jointRows, 'basic_joint');
    }
  }

  if (isCouple && formData.hasMarriageContract === 'yes') {
    checkPageBreak(25);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colors.mediumGray);
    doc.text('Marriage Contract:', margin, yPosition);
    yPosition += 6;

    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...colors.darkText);
    const labelText = `(${c1Name}) and (${c2Name}), have a marriage contract, and the document is located:`;
    doc.text(labelText, margin, yPosition);
    yPosition += 6;

    doc.setDrawColor(...colors.borderGray);
    doc.setLineWidth(0.3);
    doc.rect(margin, yPosition, fieldWidth, 6);

    const marriageContractField = new doc.AcroFormTextField();
    marriageContractField.fieldName = 'marriageContractLocation';
    marriageContractField.Rect = [margin, yPosition, fieldWidth, 6];
    marriageContractField.fontSize = 9;
    marriageContractField.textColor = colors.darkText;
    marriageContractField.value = formData.marriageContractLocation || '';
    doc.addField(marriageContractField);

    yPosition += 10;
  }

  const client1Name = formData.fullName || 'Client 1';
  const client2Name = formData.spouseName || 'Client 2';

  const hasAnyPreviousRelationships =
    formData.client1HasPreviousRelationship === 'yes' ||
    formData.client2HasPreviousRelationship === 'yes';

  if (hasAnyPreviousRelationships) {
    addSectionHeader('Previous Relationships');
  }

  if (formData.client1HasPreviousRelationship === 'yes' && formData.client1PreviousRelationshipsData) {
    const prevRelCount = parseInt(formData.client1NumberOfPreviousRelationships || '0');
    const prevRelData = formData.client1PreviousRelationshipsData.slice(0, prevRelCount);

    console.log('Client 1 Previous Relationships Data:', prevRelData);

    prevRelData.forEach((relationship, index) => {
      console.log(`Client 1 Relationship ${index}:`, relationship);

      addSubsectionHeader(`${client1Name}'s Previous Relationship ${index + 1}`);

      const tableWidth = fieldWidth;
      const col1Width = tableWidth * 0.20;
      const col2Width = tableWidth * 0.16;
      const col3Width = tableWidth * 0.20;
      const col4Width = tableWidth * 0.18;
      const col5Width = tableWidth * 0.13;
      const col6Width = tableWidth * 0.13;
      const headerHeight = 12;
      const dataRowHeight = 12;

      checkPageBreak(headerHeight + dataRowHeight + 20);

      doc.setDrawColor(...colors.borderGray);
      doc.setLineWidth(0.3);
      doc.setFontSize(8);

      doc.setFillColor(...colors.lightGray);
      doc.rect(margin, yPosition, col1Width, headerHeight, 'FD');
      doc.rect(margin + col1Width, yPosition, col2Width, headerHeight, 'FD');
      doc.rect(margin + col1Width + col2Width, yPosition, col3Width, headerHeight, 'FD');
      doc.rect(margin + col1Width + col2Width + col3Width, yPosition, col4Width, headerHeight, 'FD');
      doc.rect(margin + col1Width + col2Width + col3Width + col4Width, yPosition, col5Width, headerHeight, 'FD');
      doc.rect(margin + col1Width + col2Width + col3Width + col4Width + col5Width, yPosition, col6Width, headerHeight, 'FD');

      doc.setTextColor(...colors.darkText);
      doc.text('Partner Name:', margin + 1, yPosition + 4, { maxWidth: col1Width - 2 });
      doc.text('Spousal Support?', margin + col1Width + 1, yPosition + 4, { maxWidth: col2Width - 2 });
      doc.text('Spousal Support Termination Date:', margin + col1Width + col2Width + 1, yPosition + 4, { maxWidth: col3Width - 2 });
      doc.text('Document Location:', margin + col1Width + col2Width + col3Width + 1, yPosition + 4, { maxWidth: col4Width - 2 });
      doc.text('Date of Separation:', margin + col1Width + col2Width + col3Width + col4Width + 1, yPosition + 4, { maxWidth: col5Width - 2 });
      doc.text('Date of Divorce:', margin + col1Width + col2Width + col3Width + col4Width + col5Width + 1, yPosition + 4, { maxWidth: col6Width - 2 });

      yPosition += headerHeight;

      doc.rect(margin, yPosition, col1Width, dataRowHeight, 'D');
      doc.rect(margin + col1Width, yPosition, col2Width, dataRowHeight, 'D');
      doc.rect(margin + col1Width + col2Width, yPosition, col3Width, dataRowHeight, 'D');
      doc.rect(margin + col1Width + col2Width + col3Width, yPosition, col4Width, dataRowHeight, 'D');
      doc.rect(margin + col1Width + col2Width + col3Width + col4Width, yPosition, col5Width, dataRowHeight, 'D');
      doc.rect(margin + col1Width + col2Width + col3Width + col4Width + col5Width, yPosition, col6Width, dataRowHeight, 'D');

      const partnerNameField = new doc.AcroFormTextField();
      partnerNameField.fieldName = `client1PrevRel${index}Name`;
      partnerNameField.Rect = [margin, yPosition, col1Width, dataRowHeight];
      partnerNameField.value = relationship.name || '';
      partnerNameField.fontSize = 8;
      partnerNameField.textColor = colors.darkText;
      doc.addField(partnerNameField);

      const spousalSupportField = new doc.AcroFormTextField();
      spousalSupportField.fieldName = `client1PrevRel${index}SpousalSupport`;
      spousalSupportField.Rect = [margin + col1Width, yPosition, col2Width, dataRowHeight];
      spousalSupportField.value = relationship.hasSpousalSupport === 'yes' ? 'Yes' : (relationship.hasSpousalSupport === 'no' ? 'No' : '');
      spousalSupportField.fontSize = 8;
      spousalSupportField.textColor = colors.darkText;
      doc.addField(spousalSupportField);

      const terminationDateField = new doc.AcroFormTextField();
      terminationDateField.fieldName = `client1PrevRel${index}TerminationDate`;
      terminationDateField.Rect = [margin + col1Width + col2Width, yPosition, col3Width, dataRowHeight];
      terminationDateField.value = relationship.supportTerminationDate || '';
      terminationDateField.fontSize = 8;
      terminationDateField.textColor = colors.darkText;
      doc.addField(terminationDateField);

      const docLocationField = new doc.AcroFormTextField();
      docLocationField.fieldName = `client1PrevRel${index}DocLocation`;
      docLocationField.Rect = [margin + col1Width + col2Width + col3Width, yPosition, col4Width, dataRowHeight];
      docLocationField.value = relationship.supportDocumentLocation || '';
      docLocationField.fontSize = 8;
      docLocationField.textColor = colors.darkText;
      doc.addField(docLocationField);

      const dateOfSeparationField = new doc.AcroFormTextField();
      dateOfSeparationField.fieldName = `client1PrevRel${index}DateOfSeparation`;
      dateOfSeparationField.Rect = [margin + col1Width + col2Width + col3Width + col4Width, yPosition, col5Width, dataRowHeight];
      dateOfSeparationField.value = relationship.dateOfSeparation || '';
      dateOfSeparationField.fontSize = 8;
      dateOfSeparationField.textColor = colors.darkText;
      doc.addField(dateOfSeparationField);

      const dateOfDivorceField = new doc.AcroFormTextField();
      dateOfDivorceField.fieldName = `client1PrevRel${index}DateOfDivorce`;
      dateOfDivorceField.Rect = [margin + col1Width + col2Width + col3Width + col4Width + col5Width, yPosition, col6Width, dataRowHeight];
      dateOfDivorceField.value = relationship.dateOfDivorce || '';
      dateOfDivorceField.fontSize = 8;
      dateOfDivorceField.textColor = colors.darkText;
      doc.addField(dateOfDivorceField);

      yPosition += dataRowHeight + 5;

      checkPageBreak(25);
      doc.setFontSize(9);
      doc.setTextColor(...colors.darkText);
      doc.text('Other Information:', margin, yPosition);
      yPosition += 5;

      doc.setDrawColor(...colors.borderGray);
      doc.setLineWidth(0.3);
      const otherInfoHeight = 20;
      doc.rect(margin, yPosition, tableWidth, otherInfoHeight, 'D');

      const otherInfoField = new doc.AcroFormTextField();
      otherInfoField.fieldName = `client1PrevRel${index}OtherInfo`;
      otherInfoField.Rect = [margin, yPosition, tableWidth, otherInfoHeight];
      otherInfoField.value = relationship.otherInfo || '';
      otherInfoField.fontSize = 9;
      otherInfoField.textColor = colors.darkText;
      otherInfoField.multiline = true;
      doc.addField(otherInfoField);
      yPosition += otherInfoHeight + 5;
    });
  }

  if ((formData.maritalStatus === 'married' || formData.maritalStatus === 'common_law') && formData.client2HasPreviousRelationship === 'yes' && formData.client2PreviousRelationshipsData) {
    const prevRelCount = parseInt(formData.client2NumberOfPreviousRelationships || '0');
    const prevRelData = formData.client2PreviousRelationshipsData.slice(0, prevRelCount);

    console.log('Client 2 Previous Relationships Data:', prevRelData);

    prevRelData.forEach((relationship, index) => {
      console.log(`Client 2 Relationship ${index}:`, relationship);

      addSubsectionHeader(`${client2Name}'s Previous Relationship ${index + 1}`);

      const tableWidth = fieldWidth;
      const col1Width = tableWidth * 0.20;
      const col2Width = tableWidth * 0.16;
      const col3Width = tableWidth * 0.20;
      const col4Width = tableWidth * 0.18;
      const col5Width = tableWidth * 0.13;
      const col6Width = tableWidth * 0.13;
      const headerHeight = 12;
      const dataRowHeight = 12;

      checkPageBreak(headerHeight + dataRowHeight + 20);

      doc.setDrawColor(...colors.borderGray);
      doc.setLineWidth(0.3);
      doc.setFontSize(8);

      doc.setFillColor(...colors.lightGray);
      doc.rect(margin, yPosition, col1Width, headerHeight, 'FD');
      doc.rect(margin + col1Width, yPosition, col2Width, headerHeight, 'FD');
      doc.rect(margin + col1Width + col2Width, yPosition, col3Width, headerHeight, 'FD');
      doc.rect(margin + col1Width + col2Width + col3Width, yPosition, col4Width, headerHeight, 'FD');
      doc.rect(margin + col1Width + col2Width + col3Width + col4Width, yPosition, col5Width, headerHeight, 'FD');
      doc.rect(margin + col1Width + col2Width + col3Width + col4Width + col5Width, yPosition, col6Width, headerHeight, 'FD');

      doc.setTextColor(...colors.darkText);
      doc.text('Partner Name:', margin + 1, yPosition + 4, { maxWidth: col1Width - 2 });
      doc.text('Spousal Support?', margin + col1Width + 1, yPosition + 4, { maxWidth: col2Width - 2 });
      doc.text('Spousal Support Termination Date:', margin + col1Width + col2Width + 1, yPosition + 4, { maxWidth: col3Width - 2 });
      doc.text('Document Location:', margin + col1Width + col2Width + col3Width + 1, yPosition + 4, { maxWidth: col4Width - 2 });
      doc.text('Date of Separation:', margin + col1Width + col2Width + col3Width + col4Width + 1, yPosition + 4, { maxWidth: col5Width - 2 });
      doc.text('Date of Divorce:', margin + col1Width + col2Width + col3Width + col4Width + col5Width + 1, yPosition + 4, { maxWidth: col6Width - 2 });

      yPosition += headerHeight;

      doc.rect(margin, yPosition, col1Width, dataRowHeight, 'D');
      doc.rect(margin + col1Width, yPosition, col2Width, dataRowHeight, 'D');
      doc.rect(margin + col1Width + col2Width, yPosition, col3Width, dataRowHeight, 'D');
      doc.rect(margin + col1Width + col2Width + col3Width, yPosition, col4Width, dataRowHeight, 'D');
      doc.rect(margin + col1Width + col2Width + col3Width + col4Width, yPosition, col5Width, dataRowHeight, 'D');
      doc.rect(margin + col1Width + col2Width + col3Width + col4Width + col5Width, yPosition, col6Width, dataRowHeight, 'D');

      const partnerNameField = new doc.AcroFormTextField();
      partnerNameField.fieldName = `client2PrevRel${index}Name`;
      partnerNameField.Rect = [margin, yPosition, col1Width, dataRowHeight];
      partnerNameField.value = relationship.name || '';
      partnerNameField.fontSize = 8;
      partnerNameField.textColor = colors.darkText;
      doc.addField(partnerNameField);

      const spousalSupportField = new doc.AcroFormTextField();
      spousalSupportField.fieldName = `client2PrevRel${index}SpousalSupport`;
      spousalSupportField.Rect = [margin + col1Width, yPosition, col2Width, dataRowHeight];
      spousalSupportField.value = relationship.hasSpousalSupport === 'yes' ? 'Yes' : (relationship.hasSpousalSupport === 'no' ? 'No' : '');
      spousalSupportField.fontSize = 8;
      spousalSupportField.textColor = colors.darkText;
      doc.addField(spousalSupportField);

      const terminationDateField = new doc.AcroFormTextField();
      terminationDateField.fieldName = `client2PrevRel${index}TerminationDate`;
      terminationDateField.Rect = [margin + col1Width + col2Width, yPosition, col3Width, dataRowHeight];
      terminationDateField.value = relationship.supportTerminationDate || '';
      terminationDateField.fontSize = 8;
      terminationDateField.textColor = colors.darkText;
      doc.addField(terminationDateField);

      const docLocationField = new doc.AcroFormTextField();
      docLocationField.fieldName = `client2PrevRel${index}DocLocation`;
      docLocationField.Rect = [margin + col1Width + col2Width + col3Width, yPosition, col4Width, dataRowHeight];
      docLocationField.value = relationship.supportDocumentLocation || '';
      docLocationField.fontSize = 8;
      docLocationField.textColor = colors.darkText;
      doc.addField(docLocationField);

      const dateOfSeparationField = new doc.AcroFormTextField();
      dateOfSeparationField.fieldName = `client2PrevRel${index}DateOfSeparation`;
      dateOfSeparationField.Rect = [margin + col1Width + col2Width + col3Width + col4Width, yPosition, col5Width, dataRowHeight];
      dateOfSeparationField.value = relationship.dateOfSeparation || '';
      dateOfSeparationField.fontSize = 8;
      dateOfSeparationField.textColor = colors.darkText;
      doc.addField(dateOfSeparationField);

      const dateOfDivorceField = new doc.AcroFormTextField();
      dateOfDivorceField.fieldName = `client2PrevRel${index}DateOfDivorce`;
      dateOfDivorceField.Rect = [margin + col1Width + col2Width + col3Width + col4Width + col5Width, yPosition, col6Width, dataRowHeight];
      dateOfDivorceField.value = relationship.dateOfDivorce || '';
      dateOfDivorceField.fontSize = 8;
      dateOfDivorceField.textColor = colors.darkText;
      doc.addField(dateOfDivorceField);

      yPosition += dataRowHeight + 5;

      checkPageBreak(25);
      doc.setFontSize(9);
      doc.setTextColor(...colors.darkText);
      doc.text('Other Information:', margin, yPosition);
      yPosition += 5;

      doc.setDrawColor(...colors.borderGray);
      doc.setLineWidth(0.3);
      const otherInfoHeight = 20;
      doc.rect(margin, yPosition, tableWidth, otherInfoHeight, 'D');

      const otherInfoField = new doc.AcroFormTextField();
      otherInfoField.fieldName = `client2PrevRel${index}OtherInfo`;
      otherInfoField.Rect = [margin, yPosition, tableWidth, otherInfoHeight];
      otherInfoField.value = relationship.otherInfo || '';
      otherInfoField.fontSize = 9;
      otherInfoField.textColor = colors.darkText;
      otherInfoField.multiline = true;
      doc.addField(otherInfoField);
      yPosition += otherInfoHeight + 5;
    });
  }

  if (formData.hasChildren === 'yes' && formData.childrenData && formData.childrenData.length > 0) {
    addPage();
    yPosition = 12;
    addSectionHeader('Guardian Roadmap');

    const childCount = formData.numberOfChildren === '6+' ? 6 : parseInt(formData.numberOfChildren || '0');
    const childrenToProcess = formData.childrenData.slice(0, childCount);

    const provinces18 = ['Alberta', 'Manitoba', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'];
    const provinces19 = ['British Columbia', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Yukon'];

    const getAgeOfMajorityText = (child: ChildData): string => {
      let parentProvince = '';
      if (child.parentsOption === 'both' || child.parentsOption === 'client1-other') {
        parentProvince = formData.province || '';
      } else if (child.parentsOption === 'client2-other') {
        parentProvince = formData.spouseProvince || formData.province || '';
      } else {
        parentProvince = formData.province || '';
      }

      const nickname = child.nickname || child.name || 'the child';

      if (!parentProvince || !child.dateOfBirth) return '';

      const isProvince18 = provinces18.some(p => parentProvince.toLowerCase() === p.toLowerCase());
      const isProvince19 = provinces19.some(p => parentProvince.toLowerCase() === p.toLowerCase());

      if (!isProvince18 && !isProvince19) return '';

      const majorityAge = isProvince18 ? 18 : 19;
      const dob = new Date(child.dateOfBirth);
      const majorityDate = new Date(dob);
      majorityDate.setFullYear(majorityDate.getFullYear() + majorityAge);

      const today = new Date();
      const normalizedProvince = [...provinces18, ...provinces19].find(
        p => p.toLowerCase() === parentProvince.toLowerCase()
      ) || parentProvince;

      if (today >= majorityDate) {
        return `${nickname} has reached the age of majority.`;
      }

      const yyyy = majorityDate.getFullYear();
      const mm = String(majorityDate.getMonth() + 1).padStart(2, '0');
      const dd = String(majorityDate.getDate()).padStart(2, '0');
      const formattedDate = `${yyyy}/${mm}/${dd}`;

      return `${nickname} will reach the age of majority in ${normalizedProvince} on ${formattedDate}.`;
    };

    const childTableCellHeight = 8;
    const childLabelWidth = fieldWidth * 0.35;
    const childValueWidth = fieldWidth * 0.65;

    childrenToProcess.forEach((child, index) => {
      const nickname = child.nickname || child.name || `Child ${index + 1}`;
      const subheaderTitle = `${nickname} Guardian Information:`;
      checkPageBreak(70);
      addSubsectionHeader(subheaderTitle);
      yPosition += 2;

      let parentLabel = '';
      if (child.parentsOption === 'both') {
        const c1 = formData.fullName || 'Client 1';
        const c2 = formData.spouseName || 'Client 2';
        parentLabel = `${c1} and ${c2}`;
      } else if (child.parentsOption === 'client1-other') {
        const c1 = formData.fullName || 'Client 1';
        parentLabel = `${c1} and ${child.otherParentName || 'other'}`;
      } else if (child.parentsOption === 'client2-other') {
        const c2 = formData.spouseName || 'Client 2';
        parentLabel = `${c2} and ${child.otherParentName || 'other'}`;
      }

      const ageOfMajorityText = getAgeOfMajorityText(child);

      const independentLabel = child.independent === 'yes' ? 'Yes' : child.independent === 'no' ? 'No' : '';
      const medicationsLabel = child.medications === 'yes' ? 'Yes' : child.medications === 'no' ? 'No' : '';
      const allergiesLabel = child.allergies === 'yes' ? 'Yes' : child.allergies === 'no' ? 'No' : '';

      const isAboveAgeOfMajority = (() => {
        if (child.dateOfBirth) {
          const dob = new Date(child.dateOfBirth);
          const today = new Date();
          const age = today.getFullYear() - dob.getFullYear() -
            (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);
          return age >= 18;
        }
        return child.overAgeMajority === 'yes';
      })();
      const isFinanciallyIndependent = child.independent === 'yes';
      const hideMedAllergy = isAboveAgeOfMajority && isFinanciallyIndependent;

      const childRows = [
        { label: "Child's Full Name:", value: child.name || '' },
        { label: 'Preferred name/nickname:', value: child.nickname || '' },
        { label: 'Citizenship(s):', value: '' },
        (() => {
          const city = child.cityOfResidence || '';
          let residesIn = '';
          if (child.canadianResident === 'yes') {
            const province = child.provinceTerritory || '';
            residesIn = [city, province, 'Canada'].filter(Boolean).join(', ');
          } else {
            const country = child.countryOfResidence || '';
            residesIn = [city, country].filter(Boolean).join(', ');
          }
          return { label: 'Resides in:', value: residesIn };
        })(),
        { label: 'Child of:', value: parentLabel },
        { label: 'Date of Birth (YYYY/MM/DD):', value: child.dateOfBirth || '' },
        { label: 'Age of Majority:', value: ageOfMajorityText },
        { label: 'Financially Independent:', value: independentLabel },
        ...(!hideMedAllergy ? [{ label: 'On Long-Term Medications:', value: medicationsLabel }] : []),
        ...(!hideMedAllergy ? [{ label: `Does ${nickname} have any allergies?`, value: allergiesLabel }] : []),
        ...(child.independent !== 'yes' ? [{ label: `Is ${nickname} attending school?`, value: child.attendingSchool === 'yes' ? 'Yes' : child.attendingSchool === 'no' ? 'No' : '' }] : []),
        { label: 'Spouse or Common Law Partner:', value: child.hasSpouse === 'yes' ? `Yes - ${child.spouseName || ''}`.trim() : child.hasSpouse === 'no' ? 'No' : '' },
        (() => {
          if (child.hasChildren !== 'yes') {
            return { label: `Does ${nickname} have any children?`, value: child.hasChildren === 'no' ? 'No' : '' };
          }
          const count = parseInt(child.numberOfGrandchildren || '0');
          const names = Array.from({ length: Math.min(count, 20) })
            .map((_, i) => child[`grandchild${i + 1}Name`] || '')
            .filter(Boolean)
            .join(', ');
          return { label: `Does ${nickname} have any children?`, value: names ? `Yes - ${names}` : 'Yes' };
        })(),
      ];

      childRows.forEach((row, rowIndex) => {
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        const labelLines = doc.splitTextToSize(row.label, childLabelWidth - 3);
        const dynH = Math.max(childTableCellHeight, labelLines.length * 5 + 3);
        const rowY = yPosition;
        doc.setDrawColor(...colors.tableBorder);
        doc.setLineWidth(0.3);
        doc.setFillColor(255, 255, 255);
        doc.rect(margin, rowY, childLabelWidth, dynH, 'FD');
        doc.setFillColor(255, 255, 255);
        doc.rect(margin + childLabelWidth, rowY, childValueWidth, dynH, 'FD');

        doc.setTextColor(...colors.darkText);
        doc.text(labelLines, margin + 1, rowY + 5);

        const valueField = new doc.AcroFormTextField();
        valueField.fieldName = `child_${index}_row_${rowIndex}`;
        valueField.Rect = [margin + childLabelWidth + 0.5, rowY + 0.5, childValueWidth - 1, dynH - 1];
        valueField.fontSize = 9;
        valueField.textColor = colors.darkText;
        valueField.borderStyle = 'none';
        valueField.value = row.value || '';
        doc.addField(valueField);

        yPosition += dynH;
      });

      yPosition += 6;

      if (child.disabled === 'yes') {
        const disRows_preview: { large?: boolean }[] = [
          {}, {}, {}, {}, {}, {},
          { large: true }, { large: true }, { large: true },
        ];
        const disPreviewH = disRows_preview.reduce((acc, r) => acc + (r.large ? 28 : 8), 0);
        checkPageBreak(20 + disPreviewH + 4);
        const disabilitySubheading = `${nickname} Disability Information`;
        addSubsectionHeader(disabilitySubheading);
        yPosition += 2;

        const disLabelWidth = fieldWidth * 0.40;
        const disValueWidth = fieldWidth * 0.60;
        const disRowH = 8;
        const disLargeRowH = 28;

        const dtcValue = (() => {
          if (child.disabilityTaxCredit === 'yes') return 'Yes';
          if (child.disabilityTaxCredit === 'no') return 'No';
          if (child.disabilityTaxCredit === 'not-looked') return "I/we haven't looked into this";
          return '';
        })();

        const disRows: { label: string; value: string; large?: boolean }[] = [
          { label: 'Nature of disability:', value: child.disabilityNature || '' },
          { label: 'Formal diagnosis? (yes/no)', value: child.disabilityFormalDiagnosis || '' },
          { label: 'Describe the nature and severity of the disability:', value: child.disabilitySeverity || '', large: true },
          { label: 'Do they qualify for the Disability Tax Credit (DTC)?', value: dtcValue },
          { label: 'Who is the primary coordinator of care today?', value: child.disabilityCoordinator || '' },
          { label: 'Is there a long-term plan already in place?', value: child.disabilityLongTermPlan || '' },
          { label: 'Any funding tied to residency or caregiver status?', value: child.disabilityFunding || '' },
          { label: 'Describe any care and assistance provided:', value: child.disabilityCare || '', large: true },
          { label: 'Other information that would help support a potential guardian:', value: child.disabilityOther || '', large: true },
        ];

        disRows.forEach((row, ri) => {
          doc.setFontSize(8.5);
          doc.setFont(undefined, 'normal');
          const labelLines = doc.splitTextToSize(row.label, disLabelWidth - 2);
          const baseH = row.large ? disLargeRowH : disRowH;
          const rowH = Math.max(baseH, labelLines.length * 5 + 3);
          const rowY = yPosition;

          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);
          doc.setFillColor(255, 255, 255);
          doc.rect(margin, rowY, disLabelWidth, rowH, 'FD');
          doc.setFillColor(255, 255, 255);
          doc.rect(margin + disLabelWidth, rowY, disValueWidth, rowH, 'FD');

          doc.setTextColor(...colors.darkText);
          doc.text(labelLines, margin + 1, rowY + 5);

          const valField = new doc.AcroFormTextField();
          valField.fieldName = `child_${index}_dis_${ri}`;
          valField.Rect = [margin + disLabelWidth + 0.5, rowY + 0.5, disValueWidth - 1, rowH - 1];
          valField.fontSize = 8.5;
          valField.textColor = colors.darkText;
          valField.borderStyle = 'none';
          valField.value = row.value || '';
          if (row.large) valField.multiline = true;
          doc.addField(valField);

          yPosition += rowH;
        });

        yPosition += 6;

        if (child.disabilityTaxCredit === 'not-looked') {
          checkPageBreak(120);
          yPosition += 4;

          doc.setFontSize(10);
          doc.setFont(undefined, 'bold');
          doc.setTextColor(...colors.darkText);
          doc.text('Additional Reading - Disability Tax Credit', margin, yPosition);
          doc.setFont(undefined, 'normal');
          yPosition += 6;

          const dtcParagraphs: { label?: string; body: string }[] = [
            { body: 'The Disability Tax Credit (DTC) is a non-refundable tax credit in Canada designed to help reduce the income tax liability for individuals with disabilities or their supporting persons.' },
            { label: 'Tax Credit Amount:', body: ' The DTC amount varies each year and is comprised of a federal and, in most cases provincial component.  It is a non-refundable tax credit, meaning it can reduce the amount of income tax the individual owes, but it will not result in a refund if the individual does not owe any tax.' },
            { label: 'Transfer to a Supporting Person:', body: ' If the person with the disability does not have taxable income or cannot use the entire credit amount, it can be transferred, or a portion of it can be transferred, to a spouse, common-law partner, or another supporting person (such as a parent or other relative).' },
            { label: 'Other Benefits:', body: ' Being eligible for the DTC can open the door to other government programs and benefits, such as the RDSP, the Child Disability Benefit, and certain tax credits and deductions for medical expenses.' },
            { label: 'Application Process:', body: ' To apply, the individual must have a medical doctor or another qualified health professional complete and submit Form 2201 (Disability Tax Certificate) to the CRA.  After reviewing the form, the CRA will notify the individual if their application is approved.' },
            { label: 'Periodic Review:', body: ' The CRA may approve the DTC for a specific number of years, after which the individual might need to reapply or provide updated medical information.' },
          ];

          const dtcBoxX = margin;
          const dtcBoxWidth = fieldWidth;
          const dtcBoxStartY = yPosition;

          doc.setFontSize(8.5);
          doc.setTextColor(...colors.darkText);

          let dtcTextY = dtcBoxStartY + 4;
          const dtcLineH = 5;
          const dtcPad = 3;

          dtcParagraphs.forEach(({ label, body }) => {
            const fullText = (label || '') + body;
            const lines = doc.splitTextToSize(fullText, dtcBoxWidth - dtcPad * 2);
            checkPageBreak(lines.length * dtcLineH + 4);

            if (label) {
              const labelWidth = doc.getTextWidth(label);
              lines.forEach((line: string, li: number) => {
                if (li === 0) {
                  doc.setFont(undefined, 'bold');
                  doc.text(label, dtcBoxX + dtcPad, dtcTextY);
                  doc.setFont(undefined, 'normal');
                  const rest = line.slice(label.length);
                  if (rest) doc.text(rest, dtcBoxX + dtcPad + labelWidth, dtcTextY);
                } else {
                  doc.setFont(undefined, 'normal');
                  doc.text(line, dtcBoxX + dtcPad, dtcTextY);
                }
                dtcTextY += dtcLineH;
              });
            } else {
              doc.setFont(undefined, 'normal');
              lines.forEach((line: string) => {
                doc.text(line, dtcBoxX + dtcPad, dtcTextY);
                dtcTextY += dtcLineH;
              });
            }
            dtcTextY += 2;
          });

          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);
          doc.rect(dtcBoxX, dtcBoxStartY, dtcBoxWidth, dtcTextY - dtcBoxStartY + 2);

          yPosition = dtcTextY + 6;
        }
      }

      const isMinor = (() => {
        if (child.dateOfBirth) {
          const dob = new Date(child.dateOfBirth);
          const today = new Date();
          const age = today.getFullYear() - dob.getFullYear() -
            (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);
          return age < 18;
        }
        return child.overAgeMajority === 'no';
      })();

      const isDisabled = child.disabled === 'yes';
      const isNotFinanciallyIndependent = child.independent === 'no';
      const showChecklist = (isMinor || isDisabled) && isNotFinanciallyIndependent;
      const showDisabilityDocs = isDisabled && (child.disabilityTaxCredit === 'yes' || child.disabilityTaxCredit === 'not-looked');

      if (showChecklist) {
        addSubsectionHeader(`${nickname} Medical and Care:`);

        const medColWidths = [fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25];
        const medColX = [
          margin,
          margin + medColWidths[0],
          margin + medColWidths[0] + medColWidths[1],
          margin + medColWidths[0] + medColWidths[1] + medColWidths[2],
        ];
        const medHeaderHeight = 10;
        const medRowH = 8;

        const medHeaders = ['Contact Name:', 'Office Address:', 'Office Phone:', 'Other Details:'];
        const medContactRows = ['Family Doctor:', 'Dentist:', 'Optometrist:', 'Other:', 'Other:', 'Other:'];

        checkPageBreak(medHeaderHeight + medContactRows.length * medRowH + 4);

        const medHeaderY = yPosition;
        doc.setFontSize(8);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...colors.darkText);
        doc.setDrawColor(...colors.tableBorder);
        doc.setLineWidth(0.3);
        medHeaders.forEach((h, ci) => {
          doc.rect(medColX[ci], medHeaderY, medColWidths[ci], medHeaderHeight);
          doc.text(h, medColX[ci] + 1, medHeaderY + 6);
        });
        doc.setFont(undefined, 'normal');
        yPosition += medHeaderHeight;

        medContactRows.forEach((rowLabel, ri) => {
          const rowY = yPosition;
          const isOtherRow = rowLabel === 'Other:';
          doc.setFontSize(8);
          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);
          medColWidths.forEach((w, ci) => {
            doc.rect(medColX[ci], rowY, w, medRowH);
          });
          doc.setFont(undefined, 'normal');
          doc.setTextColor(...colors.darkText);

          if (isOtherRow) {
            const col0Field = new doc.AcroFormTextField();
            col0Field.fieldName = `child_${index}_med_${ri}_col0`;
            col0Field.Rect = [medColX[0] + 0.5, rowY + 0.5, medColWidths[0] - 1, medRowH - 1];
            col0Field.fontSize = 8;
            col0Field.textColor = colors.darkText;
            col0Field.borderStyle = 'none';
            col0Field.value = '';
            doc.addField(col0Field);
          } else {
            doc.text(rowLabel, medColX[0] + 1, rowY + 5);
          }

          for (let ci = 1; ci < 4; ci++) {
            const valueField = new doc.AcroFormTextField();
            valueField.fieldName = `child_${index}_med_${ri}_col${ci}`;
            valueField.Rect = [medColX[ci] + 0.5, rowY + 0.5, medColWidths[ci] - 1, medRowH - 1];
            valueField.fontSize = 8;
            valueField.textColor = colors.darkText;
            valueField.borderStyle = 'none';
            valueField.value = '';
            doc.addField(valueField);
          }

          yPosition += medRowH;
        });

        yPosition += 6;

        if (child.medications === 'yes' && child.medicationList) {
          type MedEntry = { name: string; treats: string; prescription: string; prescribedBy: string; otherInfo: string; hasAdditional: string };
          const medList = JSON.parse(child.medicationList || '[]') as MedEntry[];
          if (medList.length > 0) {
            medList.forEach((med, mi) => {
              const hasPrescription = med.prescription === 'yes';
              const chartRows: { label: string; fieldKey: string; value: string }[] = [
                { label: 'Name of medication:', fieldKey: 'name', value: med.name || '' },
                { label: 'What does it treat?', fieldKey: 'treats', value: med.treats || '' },
                { label: 'Does it require a prescription?', fieldKey: 'prescription', value: med.prescription === 'yes' ? 'Yes' : med.prescription === 'no' ? 'No' : '' },
              ];
              if (hasPrescription) {
                chartRows.push({ label: 'Prescribed by:', fieldKey: 'prescribedBy', value: med.prescribedBy || '' });
              }
              chartRows.push({ label: 'Other information:', fieldKey: 'otherInfo', value: med.otherInfo || '' });
              const medInfoRowH = 8;
              checkPageBreak(16 + chartRows.length * medInfoRowH + 8);

              addSubsectionHeader(`Medication Information${medList.length > 1 ? ` #${mi + 1}` : ''}:`);

              const medLabelWidth = fieldWidth * 0.45;
              const medValueWidth = fieldWidth * 0.55;

              chartRows.forEach((row) => {
                doc.setFontSize(8.5);
                doc.setFont(undefined, 'normal');
                const labelLines = doc.splitTextToSize(row.label, medLabelWidth - 3);
                const dynH = Math.max(medInfoRowH, labelLines.length * 5 + 3);
                const rowY = yPosition;
                doc.setDrawColor(...colors.tableBorder);
                doc.setLineWidth(0.3);
                doc.setFillColor(255, 255, 255);
                doc.rect(margin, rowY, medLabelWidth, dynH, 'FD');
                doc.setFillColor(255, 255, 255);
                doc.rect(margin + medLabelWidth, rowY, medValueWidth, dynH, 'FD');

                doc.setTextColor(...colors.darkText);
                doc.text(labelLines, margin + 1, rowY + 5);

                const valField = new doc.AcroFormTextField();
                valField.fieldName = `child_${index}_medinfo_${mi}_${row.fieldKey}`;
                valField.Rect = [margin + medLabelWidth + 0.5, rowY + 0.5, medValueWidth - 1, dynH - 1];
                valField.fontSize = 8.5;
                valField.textColor = colors.darkText;
                valField.borderStyle = 'none';
                valField.value = row.value || '';
                doc.addField(valField);

                yPosition += dynH;
              });

              yPosition += 6;
            });
          }
        }

        if (isMinor || isNotFinanciallyIndependent) {
          checkPageBreak(16 + 8 + 6);
          addSubsectionHeader(`${nickname} Blood Type:`);
          const btRowH = 8;
          const btLabelWidth = fieldWidth * 0.45;
          const btValueWidth = fieldWidth * 0.55;
          doc.setFontSize(8);
          doc.setFont(undefined, 'bold');
          doc.setTextColor(...colors.darkText);
          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);
          doc.setFillColor(255, 255, 255);
          doc.rect(margin, yPosition, btLabelWidth, btRowH, 'FD');
          doc.text('Blood Type:', margin + 2, yPosition + 5.5);
          doc.setFillColor(255, 255, 255);
          doc.rect(margin + btLabelWidth, yPosition, btValueWidth, btRowH, 'FD');
          doc.setFont(undefined, 'normal');
          const btField = new doc.AcroFormTextField();
          btField.fieldName = `child_${index}_blood_type`;
          btField.Rect = [margin + btLabelWidth + 0.5, yPosition + 0.5, btValueWidth - 1, btRowH - 1];
          btField.fontSize = 8;
          btField.value = '';
          doc.addField(btField);
          yPosition += btRowH + 6;
        }

        if (child.allergies === 'yes' && child.allergyList) {
          type AllergyEntry = { details: string; severity: string; medications: string; epipen: string; requiredFor: string; otherInfo: string; hasAdditional?: string };
          const allergyList = JSON.parse(child.allergyList || '[]') as AllergyEntry[];
          if (allergyList.length > 0) {
            allergyList.forEach((allergy, ai) => {
              const allergyChartRows: { label: string; fieldKey: string; value: string }[] = [
                { label: 'Allergic to:', fieldKey: 'details', value: allergy.details || '' },
                { label: 'Severity:', fieldKey: 'severity', value: allergy.severity || '' },
                { label: 'Medications:', fieldKey: 'medications', value: allergy.medications || '' },
                { label: 'Carry an EpiPen?', fieldKey: 'epipen', value: allergy.epipen || '' },
                { label: 'Required for (School, activities, etc.)', fieldKey: 'requiredFor', value: allergy.requiredFor || '' },
                { label: 'Other Information:', fieldKey: 'otherInfo', value: allergy.otherInfo || '' },
              ];
              const allergyRowH = 8;
              checkPageBreak(16 + allergyChartRows.length * allergyRowH + 8);

              addSubsectionHeader(`${nickname} Allergy Information${allergyList.length > 1 ? ` #${ai + 1}` : ''}:`);

              const allergyLabelWidth = fieldWidth * 0.45;
              const allergyValueWidth = fieldWidth * 0.55;

              allergyChartRows.forEach((row) => {
                doc.setFontSize(8.5);
                doc.setFont(undefined, 'normal');
                const labelLines = doc.splitTextToSize(row.label, allergyLabelWidth - 3);
                const dynH = Math.max(allergyRowH, labelLines.length * 5 + 3);
                const rowY = yPosition;
                checkPageBreak(dynH + 2);
                doc.setDrawColor(...colors.tableBorder);
                doc.setLineWidth(0.3);
                doc.setFillColor(255, 255, 255);
                doc.rect(margin, rowY, allergyLabelWidth, dynH, 'FD');
                doc.setFillColor(255, 255, 255);
                doc.rect(margin + allergyLabelWidth, rowY, allergyValueWidth, dynH, 'FD');

                doc.setTextColor(...colors.darkText);
                doc.text(labelLines, margin + 1, rowY + 5);

                const valField = new doc.AcroFormTextField();
                valField.fieldName = `child_${index}_allergy_${ai}_${row.fieldKey}`;
                valField.Rect = [margin + allergyLabelWidth + 0.5, rowY + 0.5, allergyValueWidth - 1, dynH - 1];
                valField.fontSize = 8.5;
                valField.textColor = colors.darkText;
                valField.borderStyle = 'none';
                valField.value = row.value || '';
                doc.addField(valField);

                yPosition += dynH;
              });

              yPosition += 6;
            });
          }
        }

        if (child.medicalIssues === 'yes') {
          checkPageBreak(40);
          addSubsectionHeader(`${nickname} Additional Medical Information:`);

          const addlMedRowH = Math.max(16, Math.ceil((child.medicalIssuesDescription?.length || 0) / 80) * 5 + 10);
          const rowY = yPosition;
          checkPageBreak(addlMedRowH + 2);
          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);
          doc.rect(margin, rowY, fieldWidth, addlMedRowH);

          const addlMedField = new doc.AcroFormTextField();
          addlMedField.fieldName = `child_${index}_medicalIssuesDescription`;
          addlMedField.Rect = [margin + 0.5, rowY + 0.5, fieldWidth - 1, addlMedRowH - 1];
          addlMedField.fontSize = 9;
          addlMedField.textColor = colors.darkText;
          addlMedField.borderStyle = 'none';
          addlMedField.multiline = true;
          addlMedField.value = child.medicalIssuesDescription || '';
          doc.addField(addlMedField);

          yPosition += addlMedRowH + 6;
        }

        if ((isMinor || isNotFinanciallyIndependent) && child.attendingSchool !== undefined) {
          const eduPreviewH = child.attendingSchool === 'yes'
            ? (8 + 8 + 20 + 20 + 20 + 20)
            : 20;
          checkPageBreak(20 + eduPreviewH + 4);
          addSubsectionHeader(`${nickname} Academic Snapshot:`);
          yPosition += 2;

          const eduLabelWidth = fieldWidth * 0.40;
          const eduValueWidth = fieldWidth * 0.60;
          const eduRowH = 8;
          const eduLargeRowH = 20;

          if (child.attendingSchool === 'yes') {
            const eduRows = [
              { label: 'School Name:', large: false, value: child.schoolName || '' },
              { label: 'School Contact Information:', large: false, value: child.schoolContact || '' },
              { label: `What subjects does ${nickname} naturally enjoy or succeed in?`, large: true, value: child.schoolStrengths || '' },
              { label: 'Where do they typically need extra support?', large: true, value: child.schoolExtraSupport || '' },
              { label: `What helps ${nickname} stay focused?`, large: true, value: child.schoolFocusHelps || '' },
              { label: 'What tends to distract or overwhelm them?', large: true, value: child.schoolDistractions || '' },
              { label: 'Is there an Individual Education Plan (IEP)?', large: false, value: child.hasIEP ? (child.hasIEP === 'yes' ? 'Yes' : 'No') : '' },
              ...(child.hasIEP === 'yes' ? [
                { label: 'IEP Details:', large: true, value: child.individualEducationPlan || '' },
              ] : []),
              { label: "Which school activities are most important for your child's confidence and social life?", large: true, value: child.schoolActivitiesImportant || '' },
              { label: 'What are your homework routines?', large: true, value: child.homeworkRoutines || '' },
              { label: "What are your hopes or expectations for your child's education over the next few years?", large: true, value: child.educationHopes || '' },
              { label: 'Learning style notes or concerns:', large: true, value: child.learningStyleNotes || '' },
              { label: 'Behavioural considerations (e.g., anxiety, ADHD triggers)', large: true, value: child.behaviouralConsiderations || '' },
              { label: `If ${nickname} is having a difficult day at school, what strategies work best to calm or support them?`, large: true, value: child.schoolCalmingStrategies || '' },
              { label: 'Additional details:', large: true, value: child.educationAdditionalDetails || '' },
            ];

            eduRows.forEach((row, rowIndex) => {
              doc.setFontSize(8.5);
              doc.setFont(undefined, 'normal');
              const labelLines = doc.splitTextToSize(row.label, eduLabelWidth - 2);
              const baseRh = row.large ? eduLargeRowH : eduRowH;
              const rh = Math.max(baseRh, labelLines.length * 5 + 3);
              const rowY = yPosition;
              doc.setDrawColor(...colors.tableBorder);
              doc.setLineWidth(0.3);
              doc.setFillColor(255, 255, 255);
              doc.rect(margin, rowY, eduLabelWidth, rh, 'FD');
              doc.setFillColor(255, 255, 255);
              doc.rect(margin + eduLabelWidth, rowY, eduValueWidth, rh, 'FD');

              doc.setTextColor(...colors.darkText);
              doc.text(labelLines, margin + 1, rowY + 4.5);

              const eduField = new doc.AcroFormTextField();
              eduField.fieldName = `child_${index}_edu_${rowIndex}`;
              eduField.Rect = [margin + eduLabelWidth + 0.5, rowY + 0.5, eduValueWidth - 1, rh - 1];
              eduField.fontSize = 9;
              eduField.textColor = colors.darkText;
              eduField.borderStyle = 'none';
              eduField.multiline = row.large;
              eduField.value = row.value;
              doc.addField(eduField);

              yPosition += rh;
            });

            yPosition += 6;
          } else if (child.attendingSchool === 'no' && child.additionalEducationInfo === 'yes') {
            checkPageBreak(20);
            const addlEduRowH = Math.max(16, Math.ceil((child.additionalEducationDetails?.length || 0) / 80) * 5 + 10);
            const rowY = yPosition;
            checkPageBreak(addlEduRowH + 2);
            doc.setDrawColor(...colors.tableBorder);
            doc.setLineWidth(0.3);
            doc.rect(margin, rowY, fieldWidth, addlEduRowH);

            const addlEduField = new doc.AcroFormTextField();
            addlEduField.fieldName = `child_${index}_additionalEducationDetails`;
            addlEduField.Rect = [margin + 0.5, rowY + 0.5, fieldWidth - 1, addlEduRowH - 1];
            addlEduField.fontSize = 9;
            addlEduField.textColor = colors.darkText;
            addlEduField.borderStyle = 'none';
            addlEduField.multiline = true;
            addlEduField.value = child.additionalEducationDetails || '';
            doc.addField(addlEduField);

            yPosition += addlEduRowH + 6;
          }
        }

        if (isMinor || isNotFinanciallyIndependent) {
          checkPageBreak(30);
          addSubsectionHeader(`${nickname} Social Snapshot:`);

          doc.setFontSize(9);
          doc.setFont(undefined, 'italic');
          doc.setTextColor(...colors.mediumGray);
          const socialDescLines = doc.splitTextToSize(
            "This section helps a guardian preserve the child\u2019s relationships, routines, and emotional stability during a period of major life disruption.",
            fieldWidth
          );
          doc.text(socialDescLines, margin, yPosition);
          doc.setFont(undefined, 'normal');
          doc.setTextColor(...colors.darkText);
          yPosition += socialDescLines.length * 5 + 4;

          const socialLabelWidth = fieldWidth * 0.40;
          const socialValueWidth = fieldWidth * 0.60;
          const socialRowH = 8;
          const socialLargeRowH = 20;

          const friendList: Array<{ friendName: string; relationship: string; cityLocation: string; parentGuardianName: string; parentPhone: string; parentEmail: string; whyImportant: string; activitiesTogether: string; hasAdditional: string }> = JSON.parse(child.friendList || '[]');

          if (friendList.length > 0) {
            friendList.forEach((friend, fi) => {
              checkPageBreak(20);
              doc.setFontSize(9);
              doc.setFont(undefined, 'bolditalic');
              doc.setTextColor(...colors.darkText);
              doc.text(`Friend / Key Relationship #${fi + 1}`, margin, yPosition);
              doc.setFont(undefined, 'normal');
              yPosition += 6;

              const friendRows = [
                { label: "Friend's Name:", value: friend.friendName || '' },
                { label: 'Relationship:', value: friend.relationship || '' },
                { label: 'City / Location:', value: friend.cityLocation || '' },
                { label: 'Parent / Guardian Name:', value: friend.parentGuardianName || '' },
                { label: 'Parent Phone Number:', value: friend.parentPhone || '' },
                { label: 'Parent Email:', value: friend.parentEmail || '' },
                { label: `Why is this relationship important to ${nickname}?`, value: friend.whyImportant || '', large: true },
                { label: 'What clubs, activities, camps, etc. do they do together?', value: friend.activitiesTogether || '', large: true },
              ];

              friendRows.forEach((row, ri) => {
                doc.setFontSize(8.5);
                doc.setFont(undefined, 'normal');
                const labelLines = doc.splitTextToSize(row.label, socialLabelWidth - 2);
                const baseRh = (row as { large?: boolean }).large ? socialLargeRowH : socialRowH;
                const rh = Math.max(baseRh, labelLines.length * 5 + 3);
                const rowY = yPosition;
                checkPageBreak(rh + 2);
                doc.setDrawColor(...colors.tableBorder);
                doc.setLineWidth(0.3);
                doc.setFillColor(255, 255, 255);
                doc.rect(margin, rowY, socialLabelWidth, rh, 'FD');
                doc.setFillColor(255, 255, 255);
                doc.rect(margin + socialLabelWidth, rowY, socialValueWidth, rh, 'FD');

                doc.setTextColor(...colors.darkText);
                doc.text(labelLines, margin + 1, rowY + 4.5);

                const friendField = new doc.AcroFormTextField();
                friendField.fieldName = `child_${index}_friend_${fi}_${ri}`;
                friendField.Rect = [margin + socialLabelWidth + 0.5, rowY + 0.5, socialValueWidth - 1, rh - 1];
                friendField.fontSize = 9;
                friendField.textColor = colors.darkText;
                friendField.borderStyle = 'none';
                friendField.multiline = !!(row as { large?: boolean }).large;
                friendField.value = row.value;
                doc.addField(friendField);

                yPosition += rh;
              });

              yPosition += 4;
            });
          }

          const activityList: Array<{ activityName: string; activityType: string; importanceLevel: string; frequency: string; hasSharedFriends: string; sharedFriendIds: string[]; otherFriends: Array<{ friendName: string; relationship: string; cityLocation: string; parentGuardianName: string; parentPhone: string; parentEmail: string; whyImportant: string; activitiesTogether: string }>; }> = JSON.parse(child.activityList || '[]');

          if (activityList.length > 0) {
            checkPageBreak(12);
            doc.setFontSize(9);
            doc.setFont(undefined, 'bolditalic');
            doc.setTextColor(...colors.darkText);
            doc.text(`Extracurricular Activities, Hobbies & Identity Anchors:`, margin, yPosition);
            doc.setFont(undefined, 'normal');
            yPosition += 6;

            const actColWidths = [fieldWidth * 0.22, fieldWidth * 0.16, fieldWidth * 0.14, fieldWidth * 0.16, fieldWidth * 0.32];
            const actColX = [margin, margin + actColWidths[0], margin + actColWidths[0] + actColWidths[1], margin + actColWidths[0] + actColWidths[1] + actColWidths[2], margin + actColWidths[0] + actColWidths[1] + actColWidths[2] + actColWidths[3]];
            const actHeaders = ['Activity Name', 'Type', 'Importance', 'Frequency', 'Participating Friends'];
            const actHeaderH = 9;
            checkPageBreak(actHeaderH + 2);
            doc.setFontSize(7.5);
            doc.setFont(undefined, 'bold');
            doc.setDrawColor(...colors.tableBorder);
            doc.setLineWidth(0.3);
            actHeaders.forEach((h, ci) => {
              doc.rect(actColX[ci], yPosition, actColWidths[ci], actHeaderH);
              doc.text(h, actColX[ci] + 1, yPosition + 6);
            });
            doc.setFont(undefined, 'normal');
            yPosition += actHeaderH;

            activityList.forEach((act, ai) => {
              const friendNames = [
                ...(act.sharedFriendIds || []).filter(id => id !== '__other__'),
                ...(act.otherFriends || []).map(f => f.friendName).filter(Boolean),
              ].join(', ');
              const actRowH = 10;
              checkPageBreak(actRowH + 2);
              const rowY = yPosition;
              doc.setDrawColor(...colors.tableBorder);
              doc.setLineWidth(0.3);
              actColWidths.forEach((w, ci) => {
                doc.rect(actColX[ci], rowY, w, actRowH);
              });
              doc.setFontSize(7.5);
              doc.setTextColor(...colors.darkText);
              [act.activityName || '', act.activityType || '', act.importanceLevel || '', act.frequency || '', friendNames].forEach((val, ci) => {
                const actField = new doc.AcroFormTextField();
                actField.fieldName = `child_${index}_activity_${ai}_col${ci}`;
                actField.Rect = [actColX[ci] + 0.5, rowY + 0.5, actColWidths[ci] - 1, actRowH - 1];
                actField.fontSize = 7.5;
                actField.textColor = colors.darkText;
                actField.borderStyle = 'none';
                actField.value = val;
                doc.addField(actField);
              });
              yPosition += actRowH;
            });
            yPosition += 4;
          }

          checkPageBreak(12);
          doc.setFontSize(9);
          doc.setFont(undefined, 'bolditalic');
          doc.setTextColor(...colors.darkText);
          doc.text(`Understanding How ${nickname} Experiences and Processes the World:`, margin, yPosition);
          doc.setFont(undefined, 'normal');
          yPosition += 6;

          const socialRows = [
            { label: `What daily or weekly routines are most important to ${nickname}'s sense of stability?`, large: true, value: child.importantRoutines || '' },
            { label: `Are there any important adults outside the immediate family who play a meaningful role in ${nickname}'s life?`, large: true, value: child.importantAdults || '' },
            { label: `How does ${nickname} typically express or manage difficult emotions?`, large: true, value: child.emotionalExpression || '' },
            { label: `What comforts ${nickname} when they are upset, scared, or overwhelmed?`, large: true, value: child.comfortStrategies || '' },
            { label: 'Are there any social or emotional challenges a guardian should be aware of?', large: true, value: child.socialChallenges || '' },
            { label: 'Additional notes about social and emotional world:', large: true, value: child.socialAdditionalNotes || '' },
          ];

          socialRows.forEach((row, rowIndex) => {
            doc.setFontSize(8.5);
            doc.setFont(undefined, 'normal');
            const labelLines = doc.splitTextToSize(row.label, socialLabelWidth - 2);
            const baseRh = row.large ? socialLargeRowH : socialRowH;
            const rh = Math.max(baseRh, labelLines.length * 5 + 3);
            const rowY = yPosition;
            checkPageBreak(rh + 2);
            doc.setDrawColor(...colors.tableBorder);
            doc.setLineWidth(0.3);
            doc.setFillColor(255, 255, 255);
            doc.rect(margin, rowY, socialLabelWidth, rh, 'FD');
            doc.setFillColor(255, 255, 255);
            doc.rect(margin + socialLabelWidth, rowY, socialValueWidth, rh, 'FD');

            doc.setTextColor(...colors.darkText);
            doc.text(labelLines, margin + 1, rowY + 4.5);

            const socialField = new doc.AcroFormTextField();
            socialField.fieldName = `child_${index}_social_${rowIndex}`;
            socialField.Rect = [margin + socialLabelWidth + 0.5, rowY + 0.5, socialValueWidth - 1, rh - 1];
            socialField.fontSize = 9;
            socialField.textColor = colors.darkText;
            socialField.borderStyle = 'none';
            socialField.multiline = row.large;
            socialField.value = row.value;
            doc.addField(socialField);

            yPosition += rh;
          });

          yPosition += 6;
        }

        addSubsectionHeader(`${nickname} Document Checklist:`);

        const checklistRows: Array<{ label: string; prefill?: string }> = [
          { label: 'Birth Certificate:' },
          { label: 'Citizenship Certificate (if applicable):' },
          { label: 'Health Card:' },
          { label: 'Social Insurance Number:' },
          { label: 'Passport:' },
          ...(isMinor || isNotFinanciallyIndependent ? [{ label: 'Location of Immunization Records:' }] : []),
          ...(child.hasIEP === 'yes' ? [{ label: 'IEP Document:', prefill: child.iepDocumentLocation || '' }] : []),
        ];

        const col1W = fieldWidth * 0.25;
        const col2W = fieldWidth * 0.25;
        const col3W = fieldWidth * 0.25;
        const col4W = fieldWidth * 0.25;
        const colX = [margin, margin + col1W, margin + col1W + col2W, margin + col1W + col2W + col3W];
        const colWidths = [col1W, col2W, col3W, col4W];
        const headerHeight = 10;
        const rowH = 8;

        checkPageBreak(headerHeight + checklistRows.length * rowH + 4);

        const headers = ['Document Type:', 'Document Location:', 'Who can access it?', 'Backup copy (and location)?'];
        const headerRowY = yPosition;
        doc.setFontSize(8);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...colors.darkText);
        doc.setDrawColor(...colors.tableBorder);
        doc.setLineWidth(0.3);
        headers.forEach((h, ci) => {
          doc.rect(colX[ci], headerRowY, colWidths[ci], headerHeight);
          doc.text(h, colX[ci] + 1, headerRowY + 6);
        });
        doc.setFont(undefined, 'normal');
        yPosition += headerHeight;

        checklistRows.forEach((row, ri) => {
          const rowY = yPosition;
          doc.setFontSize(8);
          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);

          colWidths.forEach((w, ci) => {
            doc.rect(colX[ci], rowY, w, rowH);
          });

          doc.setFont(undefined, 'normal');
          doc.setTextColor(...colors.darkText);
          doc.text(row.label, colX[0] + 1, rowY + 5);

          for (let ci = 1; ci < 4; ci++) {
            const cellField = new doc.AcroFormTextField();
            cellField.fieldName = `child_${index}_checklist_${ri}_col${ci}`;
            cellField.Rect = [colX[ci] + 0.5, rowY + 0.5, colWidths[ci] - 1, rowH - 1];
            cellField.fontSize = 8;
            cellField.textColor = colors.darkText;
            cellField.borderStyle = 'none';
            cellField.value = ci === 1 && row.prefill ? row.prefill : '';
            doc.addField(cellField);
          }

          yPosition += rowH;
        });

        if (showDisabilityDocs) {
          yPosition += 4;
          checkPageBreak(50);

          doc.setFontSize(8.5);
          doc.setFont(undefined, 'bolditalic');
          doc.setTextColor(...colors.darkText);
          doc.text('Disability Related Documentation:', margin, yPosition);
          doc.setFont(undefined, 'normal');
          yPosition += 5;

          const disDocRows = [
            'Location of approved Form T2001',
            'Location of CRA approved Notice of Determination:',
            'Location of long-term care plan document:',
          ];

          const disDocPrefill: Record<number, string> = {
            2: child.disabilityLongTermPlanDoc || '',
          };

          disDocRows.forEach((docLabel, ri) => {
            const labelLines = doc.splitTextToSize(docLabel, col1W - 2);
            const neededH = Math.max(rowH, labelLines.length * 4.5 + 3);
            checkPageBreak(neededH + 2);
            const rowY = yPosition;

            doc.setFontSize(8);
            doc.setDrawColor(...colors.tableBorder);
            doc.setLineWidth(0.3);

            colWidths.forEach((w, ci) => {
              doc.rect(colX[ci], rowY, w, neededH);
            });

            doc.setFont(undefined, 'normal');
            doc.setTextColor(...colors.darkText);
            let labelTextY = rowY + 4.5;
            labelLines.forEach((ll: string) => {
              doc.text(ll, colX[0] + 1, labelTextY);
              labelTextY += 4.5;
            });

            for (let ci = 1; ci < 4; ci++) {
              const cellField = new doc.AcroFormTextField();
              cellField.fieldName = `child_${index}_disdoc_${ri}_col${ci}`;
              cellField.Rect = [colX[ci] + 0.5, rowY + 0.5, colWidths[ci] - 1, neededH - 1];
              cellField.fontSize = 8;
              cellField.textColor = colors.darkText;
              cellField.borderStyle = 'none';
              cellField.value = ci === 1 ? (disDocPrefill[ri] || '') : '';
              doc.addField(cellField);
            }

            yPosition += neededH;
          });
        }

        yPosition += 6;

        const allFriends: Array<{ friendName: string; relationship: string; cityLocation: string; parentGuardianName: string; parentPhone: string; parentEmail: string; whyImportant: string; activitiesTogether: string; source: string }> = [];

        const mainFriendList: Array<{ friendName: string; relationship: string; cityLocation: string; parentGuardianName: string; parentPhone: string; parentEmail: string; whyImportant: string; activitiesTogether: string }> = JSON.parse(child.friendList || '[]');
        mainFriendList.forEach(f => {
          if (f.friendName) allFriends.push({ ...f, source: 'Key Relationship' });
        });

        const actListForContacts: Array<{ activityName: string; sharedFriendIds: string[]; otherFriends: Array<{ friendName: string; relationship: string; cityLocation: string; parentGuardianName: string; parentPhone: string; parentEmail: string; whyImportant: string; activitiesTogether: string }> }> = JSON.parse(child.activityList || '[]');
        actListForContacts.forEach(act => {
          (act.otherFriends || []).forEach(f => {
            if (f.friendName && !allFriends.some(af => af.friendName === f.friendName)) {
              allFriends.push({ ...f, source: act.activityName || 'Activity' });
            }
          });
        });

        if (allFriends.length > 0) {
          checkPageBreak(20);
          doc.setFontSize(9);
          doc.setFont(undefined, 'bolditalic');
          doc.setTextColor(...colors.darkText);
          doc.text('Friends and Contacts:', margin, yPosition);
          doc.setFont(undefined, 'normal');
          yPosition += 6;

          const fcColWidths = [fieldWidth * 0.16, fieldWidth * 0.13, fieldWidth * 0.13, fieldWidth * 0.16, fieldWidth * 0.14, fieldWidth * 0.14, fieldWidth * 0.14];
          const fcColX: number[] = [];
          fcColWidths.reduce((acc, w, i) => { fcColX[i] = acc; return acc + w; }, margin);
          const fcHeaders = ['Name', 'Relationship', 'City/Location', 'Parent/Guardian', 'Phone', 'Email', 'Activities Together'];
          const fcHeaderH = 9;
          checkPageBreak(fcHeaderH + 2);
          doc.setFontSize(7);
          doc.setFont(undefined, 'bold');
          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);
          fcHeaders.forEach((h, ci) => {
            doc.rect(fcColX[ci], yPosition, fcColWidths[ci], fcHeaderH);
            doc.text(h, fcColX[ci] + 1, yPosition + 6);
          });
          doc.setFont(undefined, 'normal');
          yPosition += fcHeaderH;

          allFriends.forEach((f, fi) => {
            const fcRowH = 10;
            checkPageBreak(fcRowH + 2);
            const rowY = yPosition;
            doc.setDrawColor(...colors.tableBorder);
            doc.setLineWidth(0.3);
            fcColWidths.forEach((w, ci) => {
              doc.rect(fcColX[ci], rowY, w, fcRowH);
            });
            [f.friendName || '', f.relationship || '', f.cityLocation || '', f.parentGuardianName || '', f.parentPhone || '', f.parentEmail || '', f.activitiesTogether || ''].forEach((val, ci) => {
              const fcField = new doc.AcroFormTextField();
              fcField.fieldName = `child_${index}_fc_${fi}_col${ci}`;
              fcField.Rect = [fcColX[ci] + 0.5, rowY + 0.5, fcColWidths[ci] - 1, fcRowH - 1];
              fcField.fontSize = 7;
              fcField.textColor = colors.darkText;
              fcField.borderStyle = 'none';
              fcField.value = val;
              doc.addField(fcField);
            });
            yPosition += fcRowH;
          });
          yPosition += 6;
        }
      }
    });

    const hasChildSupport = childrenToProcess.some(child =>
      (child.parentsOption === 'client1-other' || child.parentsOption === 'client2-other') &&
      (child.childSupportStatus === 'receiving' || child.childSupportStatus === 'paying')
    );

    const hasSpousalSupport =
      (formData.client1PreviousRelationshipsData?.some(rel => rel.hasSpousalSupport === 'yes')) ||
      (formData.client2PreviousRelationshipsData?.some(rel => rel.hasSpousalSupport === 'yes'));

    if (hasChildSupport || hasSpousalSupport) {
      if (yPosition > 150) {
        addPage();
        yPosition = 12;
      }

      doc.setFont(undefined, 'bold');
      doc.setFontSize(12);
      doc.text('Additional Reading - Child & Spousal Support Payments After Death', margin, yPosition);
      yPosition += 8;

      doc.setFont(undefined, 'normal');
      doc.setFontSize(9);

      const supportText = [
        'The existence of legally mandated support payments introduces specific debt and liability claims against',
        'the estate prior to any distributions to the heirs.',
        '',
        '• Child Support: The financial responsibility relating to child support is shared between federal and',
        '  provincial/territorial governments. Child support obligations are not extinguished by filing for',
        '  bankruptcy, meaning they the continual financial obligation survives the death of the payor and must',
        '  be paid by the estate. The responsibility for child support is a shared obligation between the federal',
        '  and provincial/territorial governments. The executor (or administrator) must ensure that the',
        '  deceased\'s debts are paid before assets are distributed to heirs. Child support payments are',
        '  therefore treated as a continuing financial obligation of the estate.',
        '',
        '• Spousal Support: is generally intended to ensure the recipient spouse partakes in the payor spouse\'s',
        '  wealth accumulated during the marriage. Like child support, the spousal support obligation typically',
        '  continues against the estate, although support payments are sometimes subject to review based on',
        '  changes in income.',
        '',
        '• Dependent Relief Claims: The minor children, and potentially the former spouse (depending on local',
        '  support rules), qualify as dependants of the deceased. If the stator distribution of the estate under',
        '  intestacy rules fails to provide adequately for these dependants, they may be able to apply to the',
        '  courts for relief against the estate. In some provinces, certain assets that pass outside the estate',
        '  (like insurance proceeds or registered plans with named beneficiaries) may be available to satisfy',
        '  dependant relief or family law claims.'
      ];

      supportText.forEach(line => {
        if (yPosition > 280) {
          addPage();
          yPosition = 12;
        }
        doc.text(line, margin, yPosition);
        yPosition += 5;
      });

      yPosition += 12;
    }
  }

  if (formData.hasFamilyTrust === 'yes') {
    addPage();
    yPosition = 12;
    addSectionHeader('Family Trust Information');

    const trustInfoRows = [
      { label: 'Trust 1 - Legal Name:', value: formData.trustLegalName || '' },
      { label: 'Trust Deed Location:', value: formData.trustDeedLocation || '' },
      { label: 'Year Established:', value: formData.trustYearEstablished || '' },
      { label: 'Number of Beneficiaries:', value: formData.trustBeneficiariesCount || '' },
    ];

    const cellHeight = 8;
    const labelWidth = fieldWidth * 0.35;
    const valueWidth = fieldWidth * 0.65;

    trustInfoRows.forEach((row, index) => {
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      const labelLines = doc.splitTextToSize(row.label, labelWidth - 3);
      const dynH = Math.max(cellHeight, labelLines.length * 5 + 3);
      const rowY = yPosition;

      doc.setDrawColor(...colors.tableBorder);
      doc.setLineWidth(0.3);
      doc.setFillColor(255, 255, 255);
      doc.rect(margin, rowY, labelWidth, dynH, 'FD');
      doc.setFillColor(255, 255, 255);
      doc.rect(margin + labelWidth, rowY, valueWidth, dynH, 'FD');

      doc.setTextColor(...colors.darkText);
      doc.text(labelLines, margin + 1, rowY + 5);

      const field = new doc.AcroFormTextField();
      field.fieldName = `trust_${index}`;
      field.Rect = [margin + labelWidth + 0.5, rowY + 0.5, valueWidth - 1, dynH - 1];
      field.fontSize = 9;
      field.textColor = colors.darkText;
      field.borderStyle = 'none';
      field.value = row.value;
      doc.addField(field);

      yPosition += cellHeight;
    });

    yPosition += 8;

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colors.darkText);
    doc.text('Trust Beneficiaries:', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 6;

    const beneficiaryCount = parseInt(formData.trustBeneficiariesCount || '0');
    const beneCellHeight = 6;
    const beneLabelWidth = fieldWidth * 0.35;
    const beneValueWidth = fieldWidth * 0.65;

    for (let i = 0; i < beneficiaryCount; i++) {
      const beneficiary = formData.trustBeneficiariesData?.[i];

      checkPageBreak(6 + 5 * beneCellHeight + 8);

      // Beneficiary header
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...colors.darkText);
      doc.text(`Beneficiary ${i + 1}:`, margin, yPosition);
      yPosition += 6;

      const beneFields = [
        { label: 'Beneficiary Name:', value: beneficiary?.beneficiaryName || '', fieldName: 'name' },
        { label: 'Relationship to Settlor:', value: beneficiary?.relationshipToSettlor || '', fieldName: 'relationship' },
        { label: 'Country of Residence:', value: beneficiary?.countryOfResidence || '', fieldName: 'country' },
        { label: 'Phone Number:', value: beneficiary?.phoneNumber || '', fieldName: 'phone' },
        { label: 'Email Address:', value: beneficiary?.emailAddress || '', fieldName: 'email' },
      ];

      beneFields.forEach((field) => {
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        const labelLines = doc.splitTextToSize(field.label, beneLabelWidth - 3);
        const dynH = Math.max(beneCellHeight, labelLines.length * 5 + 3);
        const rowY = yPosition;

        doc.setDrawColor(...colors.tableBorder);
        doc.setLineWidth(0.3);
        doc.setFillColor(255, 255, 255);
        doc.rect(margin, rowY, beneLabelWidth, dynH, 'FD');
        doc.setFillColor(255, 255, 255);
        doc.rect(margin + beneLabelWidth, rowY, beneValueWidth, dynH, 'FD');

        doc.setTextColor(...colors.darkText);
        doc.text(labelLines, margin + 1, rowY + 4);

        const inputField = new doc.AcroFormTextField();
        inputField.fieldName = `trust_beneficiary_${i + 1}_${field.fieldName}`;
        inputField.Rect = [margin + beneLabelWidth + 0.5, rowY + 0.5, beneValueWidth - 1, dynH - 1];
        inputField.fontSize = 8;
        inputField.textColor = colors.darkText;
        inputField.borderStyle = 'none';
        inputField.value = field.value;
        doc.addField(inputField);

        yPosition += dynH;
      });

      yPosition += 8;
    }

    yPosition += 8;

    if (yPosition + 80 > pageHeight - margin) {
      addPage();
      yPosition = 12;
    }

    addSubsectionHeader('Trust and Professional Contracts:');
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text('For clients with Trusts, your Estate Trustee must know your \'Quarterback Team\' to manage transitions or wind-ups effectively.', margin, yPosition);
    yPosition += 8;

    const tpcRowHeight = 10;
    const tpcHeaderHeight = 12;
    const tpcCol1Width = fieldWidth * 0.25;
    const tpcCol2Width = fieldWidth * 0.25;
    const tpcCol3Width = fieldWidth * 0.25;
    const tpcCol4Width = fieldWidth * 0.25;

    const tpcHeaders = ['Professional:', 'Name:', 'Firm/Contact Info:', 'Role in the Estate:'];
    const tpcRowLabels = ['Lawyer(s):', 'Accountant/Tax Prep(s):', 'Other:'];

    let currentY = yPosition;
    doc.setLineWidth(0.3);

    tpcHeaders.forEach((header, colIdx) => {
      const colWidths = [tpcCol1Width, tpcCol2Width, tpcCol3Width, tpcCol4Width];
      const xPos = margin + colWidths.slice(0, colIdx).reduce((a, b) => a + b, 0);
      doc.setDrawColor(...colors.tableBorder);
      doc.setFillColor(250, 250, 250);
      doc.rect(xPos, currentY, colWidths[colIdx], tpcHeaderHeight, 'FD');
      doc.setFontSize(8);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(0, 0, 0);
      const lines = doc.splitTextToSize(header, colWidths[colIdx] - 2);
      const textY = currentY + (tpcHeaderHeight - lines.length * 2.5) / 2 + 2.5;
      doc.text(lines, xPos + 1, textY);
    });

    currentY += tpcHeaderHeight;

    tpcRowLabels.forEach((label, rowIdx) => {
      const rowY = currentY;

      doc.setDrawColor(...colors.tableBorder);
      doc.setLineWidth(0.3);
      doc.rect(margin, rowY, tpcCol1Width, tpcRowHeight);
      doc.setFontSize(8);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...colors.darkText);
      doc.text(label, margin + 1, rowY + 6);

      [tpcCol2Width, tpcCol3Width, tpcCol4Width].forEach((colWidth, colIdx) => {
        const xPos = margin + [tpcCol1Width, tpcCol1Width + tpcCol2Width, tpcCol1Width + tpcCol2Width + tpcCol3Width][colIdx];
        doc.setDrawColor(...colors.tableBorder);
        doc.setLineWidth(0.3);
        doc.rect(xPos, rowY, colWidth, tpcRowHeight);

        const field = new doc.AcroFormTextField();
        field.fieldName = `trust_professional_${rowIdx}_${colIdx + 1}`;
        field.Rect = [xPos + 0.5, rowY + 0.5, colWidth - 1, tpcRowHeight - 1];
        field.fontSize = 8;
        field.textColor = colors.darkText;
        field.borderStyle = 'none';
        doc.addField(field);
      });

      currentY += tpcRowHeight;
    });

    yPosition = currentY + 12;

    if (yPosition + 80 > pageHeight - margin) {
      addPage();
      yPosition = 12;
    }

    addSubsectionHeader('Trustee Information:');

    const tiRowHeight = 10;
    const tiHeaderHeight = 12;
    const tiRowCount = 6;
    const tiCol1Width = fieldWidth * 0.40;
    const tiCol2Width = fieldWidth * 0.30;
    const tiCol3Width = fieldWidth * 0.30;

    const tiHeaders = ['Trustee Name:', 'Phone Number:', 'Email Address:'];

    currentY = yPosition;
    doc.setLineWidth(0.3);

    tiHeaders.forEach((header, colIdx) => {
      const colWidths = [tiCol1Width, tiCol2Width, tiCol3Width];
      const xPos = margin + colWidths.slice(0, colIdx).reduce((a, b) => a + b, 0);
      doc.setDrawColor(...colors.tableBorder);
      doc.setFillColor(250, 250, 250);
      doc.rect(xPos, currentY, colWidths[colIdx], tiHeaderHeight, 'FD');
      doc.setFontSize(8);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(0, 0, 0);
      const lines = doc.splitTextToSize(header, colWidths[colIdx] - 2);
      const textY = currentY + (tiHeaderHeight - lines.length * 2.5) / 2 + 2.5;
      doc.text(lines, xPos + 1, textY);
    });

    currentY += tiHeaderHeight;

    for (let rowIdx = 0; rowIdx < tiRowCount; rowIdx++) {
      const rowY = currentY;
      [tiCol1Width, tiCol2Width, tiCol3Width].forEach((colWidth, colIdx) => {
        const xPos = margin + [0, tiCol1Width, tiCol1Width + tiCol2Width][colIdx];
        doc.setDrawColor(...colors.tableBorder);
        doc.setLineWidth(0.3);
        doc.rect(xPos, rowY, colWidth, tiRowHeight);

        const field = new doc.AcroFormTextField();
        field.fieldName = `trust_trustee_${rowIdx}_${colIdx}`;
        field.Rect = [xPos + 0.5, rowY + 0.5, colWidth - 1, tiRowHeight - 1];
        field.fontSize = 8;
        field.textColor = colors.darkText;
        field.borderStyle = 'none';
        doc.addField(field);
      });

      currentY += tiRowHeight;
    }

    yPosition = currentY + 12;

    if (yPosition + 100 > pageHeight - margin) {
      addPage();
      yPosition = 12;
    }

    addSubsectionHeader('Trust Contents:');

    const tcRowHeight = 10;
    const tcHeaderHeight = 12;
    const tcRowCount = 8;
    const tcCol1Width = fieldWidth * 0.25;
    const tcCol2Width = fieldWidth * 0.25;
    const tcCol3Width = fieldWidth * 0.25;
    const tcCol4Width = fieldWidth * 0.25;

    const tcHeaders = ['Asset Type:', 'Estimated Value:', 'Book Value/Cost Base:', 'Other Information:'];

    currentY = yPosition;
    doc.setLineWidth(0.3);

    tcHeaders.forEach((header, colIdx) => {
      const colWidths = [tcCol1Width, tcCol2Width, tcCol3Width, tcCol4Width];
      const xPos = margin + colWidths.slice(0, colIdx).reduce((a, b) => a + b, 0);
      doc.setDrawColor(...colors.tableBorder);
      doc.setFillColor(250, 250, 250);
      doc.rect(xPos, currentY, colWidths[colIdx], tcHeaderHeight, 'FD');
      doc.setFontSize(8);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(0, 0, 0);
      const lines = doc.splitTextToSize(header, colWidths[colIdx] - 2);
      const textY = currentY + (tcHeaderHeight - lines.length * 2.5) / 2 + 2.5;
      doc.text(lines, xPos + 1, textY);
    });

    currentY += tcHeaderHeight;

    for (let rowIdx = 0; rowIdx < tcRowCount; rowIdx++) {
      const rowY = currentY;
      [tcCol1Width, tcCol2Width, tcCol3Width, tcCol4Width].forEach((colWidth, colIdx) => {
        const xPos = margin + [0, tcCol1Width, tcCol1Width + tcCol2Width, tcCol1Width + tcCol2Width + tcCol3Width][colIdx];
        doc.setDrawColor(...colors.tableBorder);
        doc.setLineWidth(0.3);
        doc.rect(xPos, rowY, colWidth, tcRowHeight);

        const field = new doc.AcroFormTextField();
        field.fieldName = `trust_contents_${rowIdx}_${colIdx}`;
        field.Rect = [xPos + 0.5, rowY + 0.5, colWidth - 1, tcRowHeight - 1];
        field.fontSize = 8;
        field.textColor = colors.darkText;
        field.borderStyle = 'none';
        doc.addField(field);
      });

      currentY += tcRowHeight;
    }

    yPosition = currentY + 8;
  }

  addPage();
  yPosition = 12;
  addSectionHeader('Sole Proprietorships and Partnerships');

  const hasSpouseForBusiness = (formData.maritalStatus === 'married' || formData.maritalStatus === 'common_law');
  const businessClient1Name = formData.fullName || 'Client 1';
  const businessClient2Name = formData.spouseName || 'Client 2';

  const renderSolePropDetails = (sp: SolePropData, idx: number, clientName: string) => {
    const pageHeight = doc.internal.pageSize.height;
    const checkPage = (needed: number) => {
      if (yPosition + needed > pageHeight - 15) {
        addPage();
        yPosition = 15;
      }
    };

    checkPage(30);
    yPosition += 6;
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colors.darkText);
    doc.text(`${clientName} — ${sp.registeredName || `Sole Proprietorship ${idx + 1}`}`, margin, yPosition);
    yPosition += 8;

    addSubsectionHeader('Business Identification and Records');

    {
      const spIdRows: [string, string][] = [];
      if (sp.registeredName !== undefined) spIdRows.push(['Registered Name of the Business:', sp.registeredName]);
      if (sp.natureOfBusiness !== undefined) spIdRows.push(['Nature of Business:', sp.natureOfBusiness]);
      if (spIdRows.length > 0) {
        const labelColW = 70;
        const valueColW = fieldWidth - labelColW;
        const rowH = 8;
        checkPage(spIdRows.length * rowH + 2);
        spIdRows.forEach(([label, val], rowIdx) => {
          doc.setFont(undefined, 'normal');
          doc.setFontSize(9);
          const labelLines = doc.splitTextToSize(label, labelColW - 3);
          const dynH = Math.max(rowH, labelLines.length * 5 + 3);
          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);
          doc.setFillColor(255, 255, 255);
          doc.rect(margin, yPosition, labelColW, dynH, 'FD');
          doc.setFillColor(255, 255, 255);
          doc.rect(margin + labelColW, yPosition, valueColW, dynH, 'FD');
          doc.setTextColor(...colors.darkText);
          doc.text(labelLines, margin + 2, yPosition + 5.5);
          const fldSpIdVal = new doc.AcroFormTextField();
          fldSpIdVal.fieldName = `sp_id_val_${idx}_row_${rowIdx}`;
          fldSpIdVal.Rect = [margin + labelColW + 0.5, yPosition + 0.5, valueColW - 1, dynH - 1];
          fldSpIdVal.fontSize = 9;
          fldSpIdVal.textColor = colors.darkText;
          fldSpIdVal.borderStyle = 'none';
          fldSpIdVal.value = val;
          doc.addField(fldSpIdVal);
          yPosition += dynH;
        });
        yPosition += 4;
      }
    }

    if (sp.hasLicenses === 'no') {
      checkPage(10);
      doc.setFont(undefined, 'normal');
      const noLicText = `${clientName} indicated that they do not have any professional or municipal licenses related to ${sp.registeredName || `Sole Proprietorship ${idx + 1}`}.`;
      const noLicLines = doc.splitTextToSize(noLicText, fieldWidth);
      doc.text(noLicLines, margin, yPosition);
      yPosition += noLicLines.length * 6 + 4;
    } else if (sp.hasLicenses === 'yes' && sp.licenses && sp.licenses.length > 0) {
      const licLabelColW = 70;
      const licValueColW = fieldWidth - licLabelColW;
      const licRowH = 8;

      sp.licenses.forEach((lic, li) => {
        checkPage(licRowH * 3 + 10);
        doc.setFont(undefined, 'bold');
        doc.setFontSize(9);
        doc.text(`License ${li + 1}`, margin, yPosition);
        yPosition += 5;

        const licRows: [string, string, string][] = [
          ['Nature of License:', lic.nature || '', `sp_lic_nature_${idx}_${li}`],
          ['Location of Original Documents:', lic.documentLocation || '', `sp_lic_loc_${idx}_${li}`],
          ['Other Information:', '', `sp_lic_other_${idx}_${li}`],
        ];

        licRows.forEach(([label, value, fieldName]) => {
          doc.setFont(undefined, 'normal');
          doc.setFontSize(8);
          const labelLines = doc.splitTextToSize(label, licLabelColW - 3);
          const dynH = Math.max(licRowH, labelLines.length * 5 + 3);
          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);
          doc.setFillColor(255, 255, 255);
          doc.rect(margin, yPosition, licLabelColW, dynH, 'FD');
          doc.setFillColor(255, 255, 255);
          doc.rect(margin + licLabelColW, yPosition, licValueColW, dynH, 'FD');
          doc.setTextColor(...colors.darkText);
          doc.text(labelLines, margin + 2, yPosition + 5.5);
          const licField = new doc.AcroFormTextField();
          licField.fieldName = fieldName;
          licField.Rect = [margin + licLabelColW + 0.5, yPosition + 0.5, licValueColW - 1, dynH - 1];
          licField.fontSize = 8;
          licField.textColor = colors.darkText;
          licField.borderStyle = 'none';
          licField.value = value;
          doc.addField(licField);
          yPosition += dynH;
        });

        doc.setFontSize(9);
        yPosition += 4;
      });
    }

    if (sp.bookkeeper === 'no' || sp.bookkeeper === 'yes') {
      const acctLabelColW = 70;
      const acctValueColW = fieldWidth - acctLabelColW;
      const acctRowH = 8;

      addSubsectionHeader('Accounting Information:');

      if (sp.bookkeeper === 'no') {
        const noAcctRows: [string, string, string][] = [
          ['Name of Accountant:', `${clientName} does their own accounting`, `sp_acct_name_${idx}`],
          ['Location of Accounting Documents:', sp.accountingRecordsLocation || '', `sp_acct_loc_${idx}`],
        ];
        checkPage(noAcctRows.length * acctRowH + 2);
        noAcctRows.forEach(([label, prefill, fieldName]) => {
          doc.setFont(undefined, 'normal');
          doc.setFontSize(9);
          const labelLines = doc.splitTextToSize(label, acctLabelColW - 3);
          const dynH = Math.max(acctRowH, labelLines.length * 5 + 3);
          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);
          doc.setFillColor(255, 255, 255);
          doc.rect(margin, yPosition, acctLabelColW, dynH, 'FD');
          doc.setFillColor(255, 255, 255);
          doc.rect(margin + acctLabelColW, yPosition, acctValueColW, dynH, 'FD');
          doc.setTextColor(...colors.darkText);
          doc.text(labelLines, margin + 2, yPosition + 5.5);
          const acctField = new doc.AcroFormTextField();
          acctField.fieldName = fieldName;
          acctField.Rect = [margin + acctLabelColW + 0.5, yPosition + 0.5, acctValueColW - 1, dynH - 1];
          acctField.fontSize = 8;
          acctField.textColor = colors.darkText;
          acctField.borderStyle = 'none';
          acctField.value = prefill;
          doc.addField(acctField);
          yPosition += dynH;
        });
      } else {
        const yesAcctRows: [string, string, string][] = [
          ['Name of Accounting Firm/Book Keeper:', sp.bookkeeperFirm || '', `sp_acct_firm_${idx}`],
          ['Key Contact:', sp.bookkeeperContact || '', `sp_acct_contact_${idx}`],
          ['Phone Number:', sp.bookkeeperPhone || '', `sp_acct_phone_${idx}`],
          ['Email Address:', sp.bookkeeperEmail || '', `sp_acct_email_${idx}`],
          ['Website:', sp.bookkeeperWebsite || '', `sp_acct_website_${idx}`],
          ['Location of Accounting Records:', sp.accountingRecordsLocation || '', `sp_acct_loc_${idx}`],
        ];
        checkPage(yesAcctRows.length * acctRowH + 2);
        yesAcctRows.forEach(([label, prefill, fieldName]) => {
          doc.setFont(undefined, 'normal');
          doc.setFontSize(9);
          const labelLines = doc.splitTextToSize(label, acctLabelColW - 3);
          const dynH = Math.max(acctRowH, labelLines.length * 5 + 3);
          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);
          doc.setFillColor(255, 255, 255);
          doc.rect(margin, yPosition, acctLabelColW, dynH, 'FD');
          doc.setFillColor(255, 255, 255);
          doc.rect(margin + acctLabelColW, yPosition, acctValueColW, dynH, 'FD');
          doc.setTextColor(...colors.darkText);
          doc.text(labelLines, margin + 2, yPosition + 5.5);
          const acctField = new doc.AcroFormTextField();
          acctField.fieldName = fieldName;
          acctField.Rect = [margin + acctLabelColW + 0.5, yPosition + 0.5, acctValueColW - 1, dynH - 1];
          acctField.fontSize = 8;
          acctField.textColor = colors.darkText;
          acctField.borderStyle = 'none';
          acctField.value = prefill;
          doc.addField(acctField);
          yPosition += dynH;
        });
      }
      yPosition += 4;
    }

    if (sp.hasDigitalAssets === 'yes') {
      const daLabelColW = 70;
      const daValueColW = fieldWidth - daLabelColW;
      const daRowH = 8;

      addSubsectionHeader('Digital Assets:');

      const daMainRows: [string, string, string][] = [];
      if (sp.website !== undefined) daMainRows.push(['Website:', sp.website || '', `sp_website_${idx}`]);
      if (sp.websiteCredentialsLocation !== undefined) daMainRows.push(['Website Credentials Location:', sp.websiteCredentialsLocation || '', `sp_website_creds_${idx}`]);
      if (sp.domainProvider !== undefined) daMainRows.push(['Domain Provider:', sp.domainProvider || '', `sp_domain_${idx}`]);
      if (sp.domainCredentialsLocation !== undefined) daMainRows.push(['Domain Credentials Location:', sp.domainCredentialsLocation || '', `sp_domain_creds_${idx}`]);

      if (daMainRows.length > 0) {
        checkPage(daMainRows.length * daRowH + 2);
        daMainRows.forEach(([label, prefill, fieldName]) => {
          doc.setFont(undefined, 'normal');
          doc.setFontSize(9);
          const labelLines = doc.splitTextToSize(label, daLabelColW - 3);
          const dynH = Math.max(daRowH, labelLines.length * 5 + 3);
          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);
          doc.setFillColor(255, 255, 255);
          doc.rect(margin, yPosition, daLabelColW, dynH, 'FD');
          doc.setFillColor(255, 255, 255);
          doc.rect(margin + daLabelColW, yPosition, daValueColW, dynH, 'FD');
          doc.setTextColor(...colors.darkText);
          doc.text(labelLines, margin + 2, yPosition + 5.5);
          const daField = new doc.AcroFormTextField();
          daField.fieldName = fieldName;
          daField.Rect = [margin + daLabelColW + 0.5, yPosition + 0.5, daValueColW - 1, dynH - 1];
          daField.fontSize = 8;
          daField.textColor = colors.darkText;
          daField.borderStyle = 'none';
          daField.value = prefill;
          doc.addField(daField);
          yPosition += dynH;
        });
        yPosition += 4;
      }

      if (sp.socialAccounts && sp.socialAccounts.length > 0) {
        addSubsectionHeader('Social Media Accounts:');

        sp.socialAccounts.forEach((sa, si) => {
          const saRows: [string, string, string][] = [];
          if (sa.platform !== undefined) saRows.push([`Account ${si + 1}:`, sa.platform || '', `sp_social_platform_${idx}_${si}`]);
          if (sa.credentialsLocation !== undefined) saRows.push(['Credentials Location:', sa.credentialsLocation || '', `sp_social_creds_${idx}_${si}`]);
          if (saRows.length > 0) {
            checkPage(saRows.length * daRowH + 2);
            saRows.forEach(([label, prefill, fieldName]) => {
              doc.setFont(undefined, 'normal');
              doc.setFontSize(9);
              const labelLines = doc.splitTextToSize(label, daLabelColW - 3);
              const dynH = Math.max(daRowH, labelLines.length * 5 + 3);
              doc.setDrawColor(...colors.tableBorder);
              doc.setLineWidth(0.3);
              doc.setFillColor(255, 255, 255);
              doc.rect(margin, yPosition, daLabelColW, dynH, 'FD');
              doc.setFillColor(255, 255, 255);
              doc.rect(margin + daLabelColW, yPosition, daValueColW, dynH, 'FD');
              doc.setTextColor(...colors.darkText);
              doc.text(labelLines, margin + 2, yPosition + 5.5);
              const saField = new doc.AcroFormTextField();
              saField.fieldName = fieldName;
              saField.Rect = [margin + daLabelColW + 0.5, yPosition + 0.5, daValueColW - 1, dynH - 1];
              saField.fontSize = 8;
              saField.textColor = colors.darkText;
              saField.borderStyle = 'none';
              saField.value = prefill;
              doc.addField(saField);
              yPosition += dynH;
            });
            yPosition += 2;
          }
        });
        yPosition += 2;
      }

      if (sp.onlinePersonas && sp.onlinePersonas.length > 0) {
        addSubsectionHeader('Online Personas:');

        sp.onlinePersonas.forEach((op, oi) => {
          const opRows: [string, string, string][] = [];
          if (op.name !== undefined) opRows.push([`Persona ${oi + 1}:`, op.name || '', `sp_persona_name_${idx}_${oi}`]);
          if (op.credentialsLocation !== undefined) opRows.push(['Credentials Location:', op.credentialsLocation || '', `sp_persona_creds_${idx}_${oi}`]);
          if (opRows.length > 0) {
            checkPage(opRows.length * daRowH + 2);
            opRows.forEach(([label, prefill, fieldName]) => {
              doc.setFont(undefined, 'normal');
              doc.setFontSize(9);
              const labelLines = doc.splitTextToSize(label, daLabelColW - 3);
              const dynH = Math.max(daRowH, labelLines.length * 5 + 3);
              doc.setDrawColor(...colors.tableBorder);
              doc.setLineWidth(0.3);
              doc.setFillColor(255, 255, 255);
              doc.rect(margin, yPosition, daLabelColW, dynH, 'FD');
              doc.setFillColor(255, 255, 255);
              doc.rect(margin + daLabelColW, yPosition, daValueColW, dynH, 'FD');
              doc.setTextColor(...colors.darkText);
              doc.text(labelLines, margin + 2, yPosition + 5.5);
              const opField = new doc.AcroFormTextField();
              opField.fieldName = fieldName;
              opField.Rect = [margin + daLabelColW + 0.5, yPosition + 0.5, daValueColW - 1, dynH - 1];
              opField.fontSize = 8;
              opField.textColor = colors.darkText;
              opField.borderStyle = 'none';
              opField.value = prefill;
              doc.addField(opField);
              yPosition += dynH;
            });
            yPosition += 2;
          }
        });
        yPosition += 2;
      }
    }

    addSubsectionHeader('Asset and Liability Inventory');

    if (sp.hasMajorAssets === 'no') {
      checkPage(7);
      doc.setFont(undefined, 'normal');
      doc.text('No major assets.', margin, yPosition);
      yPosition += 7;
    } else if (sp.hasMajorAssets === 'yes' && sp.assets && sp.assets.length > 0) {
      checkPage(8);
      doc.setFontSize(9);
      doc.setFont(undefined, 'bolditalic');
      doc.setTextColor(...colors.darkText);
      const majorAssetsHeading = 'Major Assets:';
      doc.text(majorAssetsHeading, margin, yPosition);
      doc.setLineWidth(0.3);
      doc.line(margin, yPosition + 1, margin + doc.getTextWidth(majorAssetsHeading), yPosition + 1);
      yPosition += 6;
      const assetLabelColW = 70;
      const assetValueColW = fieldWidth - assetLabelColW;
      const assetRowH = 8;
      sp.assets.forEach((asset, ai) => {
        checkPage(14);
        doc.setFont(undefined, 'bold');
        doc.setFontSize(9);
        doc.text(`${asset.name || `Asset ${ai + 1}`}:`, margin, yPosition);
        yPosition += 5;
        const assetFields: [string, string, string][] = [
          ['Asset Name:', asset.name || '', `sp_asset_name_${idx}_${ai}`],
          ['Asset Type:', asset.type || '', `sp_asset_type_${idx}_${ai}`],
          ['Location of Records:', asset.recordsLocation || '', `sp_asset_loc_${idx}_${ai}`],
        ];
        assetFields.forEach(([label, val, fieldName]) => {
          doc.setFont(undefined, 'normal');
          doc.setFontSize(9);
          const labelLines = doc.splitTextToSize(label, assetLabelColW - 3);
          const dynH = Math.max(assetRowH, labelLines.length * 5 + 3);
          checkPage(dynH + 2);
          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);
          doc.setFillColor(255, 255, 255);
          doc.rect(margin, yPosition, assetLabelColW, dynH, 'FD');
          doc.setFillColor(255, 255, 255);
          doc.rect(margin + assetLabelColW, yPosition, assetValueColW, dynH, 'FD');
          doc.setTextColor(...colors.darkText);
          doc.text(labelLines, margin + 2, yPosition + 5.5);
          const fldAssetVal = new doc.AcroFormTextField();
          fldAssetVal.fieldName = fieldName;
          fldAssetVal.Rect = [margin + assetLabelColW + 0.5, yPosition + 0.5, assetValueColW - 1, dynH - 1];
          fldAssetVal.fontSize = 9;
          fldAssetVal.textColor = colors.darkText;
          fldAssetVal.borderStyle = 'none';
          fldAssetVal.value = val;
          doc.addField(fldAssetVal);
          yPosition += dynH;
        });
        yPosition += 4;
      });
    }

    if (sp.hasLiabilities === 'no') {
      checkPage(7);
      doc.setFont(undefined, 'normal');
      doc.text('No outstanding liabilities or debts.', margin, yPosition);
      yPosition += 7;
    } else if (sp.hasLiabilities === 'yes' && sp.liabilities && sp.liabilities.length > 0) {
      checkPage(8);
      doc.setFontSize(9);
      doc.setFont(undefined, 'bolditalic');
      doc.setTextColor(...colors.darkText);
      const liabHeading = 'Outstanding Liabilities / Debts:';
      doc.text(liabHeading, margin, yPosition);
      doc.setLineWidth(0.3);
      doc.line(margin, yPosition + 1, margin + doc.getTextWidth(liabHeading), yPosition + 1);
      yPosition += 6;
      const liabLabelColW = 70;
      const liabValueColW = fieldWidth - liabLabelColW;
      const liabRowH = 8;
      sp.liabilities.forEach((liability, li) => {
        checkPage(18);
        doc.setFont(undefined, 'bold');
        doc.setFontSize(9);
        const liabLabel = [liability.lenderName, liability.liabilityType].filter(Boolean).join(' - ');
        doc.text(liabLabel ? `${liabLabel}:` : `Liability ${li + 1}:`, margin, yPosition);
        yPosition += 5;
        const liabilityFields: [string, string, string][] = [
          ['Lender Name:', liability.lenderName || '', `sp_liab_lender_${idx}_${li}`],
          ['Liability Type:', liability.liabilityType || '', `sp_liab_type_${idx}_${li}`],
          ['Lender Contact:', liability.lenderContact || '', `sp_liab_contact_${idx}_${li}`],
          ['Location of Documentation:', liability.documentationLocation || '', `sp_liab_loc_${idx}_${li}`],
        ];
        liabilityFields.forEach(([label, val, fieldName]) => {
          doc.setFont(undefined, 'normal');
          doc.setFontSize(9);
          const labelLines = doc.splitTextToSize(label, liabLabelColW - 3);
          const dynH = Math.max(liabRowH, labelLines.length * 5 + 3);
          checkPage(dynH + 2);
          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);
          doc.setFillColor(255, 255, 255);
          doc.rect(margin, yPosition, liabLabelColW, dynH, 'FD');
          doc.setFillColor(255, 255, 255);
          doc.rect(margin + liabLabelColW, yPosition, liabValueColW, dynH, 'FD');
          doc.setTextColor(...colors.darkText);
          doc.text(labelLines, margin + 2, yPosition + 5.5);
          const fldLiabVal = new doc.AcroFormTextField();
          fldLiabVal.fieldName = fieldName;
          fldLiabVal.Rect = [margin + liabLabelColW + 0.5, yPosition + 0.5, liabValueColW - 1, dynH - 1];
          fldLiabVal.fontSize = 9;
          fldLiabVal.textColor = colors.darkText;
          fldLiabVal.borderStyle = 'none';
          fldLiabVal.value = val;
          doc.addField(fldLiabVal);
          yPosition += dynH;
        });
        yPosition += 4;
      });
    }

    addSubsectionHeader('Business Continuity and Succession');

    const businessName = sp.registeredName || `Business ${idx + 1}`;

    doc.setFont(undefined, 'bold');
    doc.setFontSize(9);
    const dissolutionQuestion = 'Since a sole proprietorship dissolves on death, do you have a plan for the orderly disposal of business assets and liabilities?';
    const dissolutionLines = doc.splitTextToSize(dissolutionQuestion, pageWidth - margin * 2);
    checkPage(dissolutionLines.length * 5 + 10);
    doc.text(dissolutionLines, margin, yPosition);
    yPosition += dissolutionLines.length * 5 + 2;

    doc.setFont(undefined, 'normal');
    if (sp.dissolutionPlan === 'yes') {
      doc.text('Yes', margin + 4, yPosition);
      yPosition += 6;
      if (sp.dissolutionPlanDocLocation) {
        checkPage(7);
        doc.setFont(undefined, 'bold');
        doc.text('Location of Documentation:', margin + 4, yPosition);
        doc.setFont(undefined, 'normal');
        const fldDissolutionLoc1 = new doc.AcroFormTextField();
        fldDissolutionLoc1.fieldName = `sp_dissolution_loc_${idx}`;
        fldDissolutionLoc1.Rect = [margin + 4 + doc.getTextWidth('Location of Documentation:') + 1, yPosition - 5.5, pageWidth - (margin + 4 + doc.getTextWidth('Location of Documentation:') + 1) - margin, 7];
        fldDissolutionLoc1.fontSize = 9;
        fldDissolutionLoc1.textColor = colors.darkText;
        fldDissolutionLoc1.borderStyle = 'none';
        fldDissolutionLoc1.value = sp.dissolutionPlanDocLocation || '';
        doc.addField(fldDissolutionLoc1);
        yPosition += 6;
      }
    } else if (sp.dissolutionPlan === 'beneficiary') {
      const beneficiaryLines = doc.splitTextToSize('I intend for a beneficiary to carry on the business', pageWidth - margin * 2 - 4);
      checkPage(beneficiaryLines.length * 5 + 10);
      doc.text(beneficiaryLines, margin + 4, yPosition);
      yPosition += beneficiaryLines.length * 5 + 2;
      if (sp.dissolutionPlanDocLocation) {
        checkPage(7);
        doc.setFont(undefined, 'bold');
        doc.text('Location of Documentation:', margin + 4, yPosition);
        doc.setFont(undefined, 'normal');
        const fldDissolutionLoc2 = new doc.AcroFormTextField();
        fldDissolutionLoc2.fieldName = `sp_dissolution_loc_${idx}`;
        fldDissolutionLoc2.Rect = [margin + 4 + doc.getTextWidth('Location of Documentation:') + 1, yPosition - 5.5, pageWidth - (margin + 4 + doc.getTextWidth('Location of Documentation:') + 1) - margin, 7];
        fldDissolutionLoc2.fontSize = 9;
        fldDissolutionLoc2.textColor = colors.darkText;
        fldDissolutionLoc2.borderStyle = 'none';
        fldDissolutionLoc2.value = sp.dissolutionPlanDocLocation || '';
        doc.addField(fldDissolutionLoc2);
        yPosition += 6;
      }
    } else if (sp.dissolutionPlan === 'no' || !sp.dissolutionPlan) {
      doc.text('No', margin + 4, yPosition);
      yPosition += 6;
      checkPage(12);
      doc.setFillColor(255, 255, 200);
      const todoText = `TO DO: Develop a plan for the disposal of ${businessName}'s assets and liabilities.`;
      const todoLines = doc.splitTextToSize(todoText, pageWidth - margin * 2 - 12);
      const todoBoxHeight = todoLines.length * 5 + 6;
      doc.rect(margin, yPosition, pageWidth - margin * 2, todoBoxHeight, 'F');
      doc.setDrawColor(180, 140, 0);
      doc.rect(margin, yPosition, pageWidth - margin * 2, todoBoxHeight, 'S');
      doc.setTextColor(80, 60, 0);
      doc.setFont(undefined, 'bold');
      doc.text(todoLines, margin + 4, yPosition + 5);
      doc.setTextColor(...colors.darkText);
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(200, 200, 200);
      yPosition += todoBoxHeight + 4;
    }

    checkPage(10);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(10);
    doc.text('EXECUTOR INSTRUCTIONS AND AUTHORITY', margin, yPosition);
    yPosition += 7;
    doc.setFontSize(9);

    const executorQuestion = "Does your will authorize your executor to own, manage, and operate business assets until they can be sold or distributed? (without this authority, succession legislation may force an estate trustee to liquidate risky business shares at 'fire-sale' prices)";
    const executorQuestionLines = doc.splitTextToSize(executorQuestion, pageWidth - margin * 2);
    checkPage(executorQuestionLines.length * 5 + 10);
    doc.text(executorQuestionLines, margin, yPosition);
    yPosition += executorQuestionLines.length * 5 + 2;

    doc.setFont(undefined, 'normal');
    const executorAuthorityLabels: Record<string, string> = {
      yes: 'Yes',
      no: 'No',
      unsure: "I'm not sure",
      not_applicable: "The business doesn't have any assets of significant value to worry about",
    };
    if (sp.executorAuthority && executorAuthorityLabels[sp.executorAuthority]) {
      const authorityText = executorAuthorityLabels[sp.executorAuthority];
      const authorityLines = doc.splitTextToSize(authorityText, pageWidth - margin * 2 - 4);
      checkPage(authorityLines.length * 5 + 6);
      doc.text(authorityLines, margin + 4, yPosition);
      yPosition += authorityLines.length * 5 + 4;
    }

    doc.setFontSize(10);

    // Document Summary Table
    type DocRow = { document: string; description: string; location: string };
    const docRows: DocRow[] = [];

    if (sp.hasLicenses === 'yes' && sp.licenses && sp.licenses.length > 0) {
      sp.licenses.forEach((lic, li) => {
        docRows.push({
          document: `License ${li + 1}`,
          description: lic.nature || '—',
          location: lic.documentLocation || '—',
        });
      });
    }

    if (sp.accountingRecordsLocation) {
      docRows.push({
        document: 'Accounting Records',
        description: sp.bookkeeperFirm ? `Maintained by ${sp.bookkeeperFirm}` : 'Business accounting records',
        location: sp.accountingRecordsLocation,
      });
    }

    if (sp.hasDigitalAssets === 'yes') {
      if (sp.websiteCredentialsLocation) {
        docRows.push({
          document: 'Website Credentials',
          description: sp.website ? `Login credentials for ${sp.website}` : 'Business website credentials',
          location: sp.websiteCredentialsLocation,
        });
      }
      if (sp.domainCredentialsLocation) {
        docRows.push({
          document: 'Domain Credentials',
          description: sp.domainProvider ? `Domain registrar credentials (${sp.domainProvider})` : 'Domain registrar credentials',
          location: sp.domainCredentialsLocation,
        });
      }
      if (sp.socialAccounts && sp.socialAccounts.length > 0) {
        sp.socialAccounts.forEach((sa) => {
          if (sa.credentialsLocation) {
            docRows.push({
              document: 'Social Media Credentials',
              description: sa.platform ? `Login credentials for ${sa.platform}` : 'Social media account credentials',
              location: sa.credentialsLocation,
            });
          }
        });
      }
      if (sp.onlinePersonas && sp.onlinePersonas.length > 0) {
        sp.onlinePersonas.forEach((op) => {
          if (op.credentialsLocation) {
            docRows.push({
              document: 'Online Persona Credentials',
              description: op.name ? `Credentials for persona: ${op.name}` : 'Online persona credentials',
              location: op.credentialsLocation,
            });
          }
        });
      }
    }

    if (sp.hasMajorAssets === 'yes' && sp.assets && sp.assets.length > 0) {
      sp.assets.forEach((asset) => {
        if (asset.recordsLocation) {
          docRows.push({
            document: 'Asset Records',
            description: asset.name ? `${asset.name}${asset.type ? ` (${asset.type})` : ''}` : 'Business asset records',
            location: asset.recordsLocation,
          });
        }
      });
    }

    if (sp.hasLiabilities === 'yes' && sp.liabilities && sp.liabilities.length > 0) {
      sp.liabilities.forEach((liability) => {
        if (liability.documentationLocation) {
          docRows.push({
            document: 'Liability Documentation',
            description: liability.lenderName
              ? `${liability.liabilityType ? `${liability.liabilityType} — ` : ''}${liability.lenderName}`
              : liability.liabilityType || 'Outstanding debt/liability',
            location: liability.documentationLocation,
          });
        }
      });
    }

    if (sp.dissolutionPlanDocLocation && (sp.dissolutionPlan === 'yes' || sp.dissolutionPlan === 'beneficiary')) {
      docRows.push({
        document: 'Dissolution / Succession Plan',
        description: sp.dissolutionPlan === 'beneficiary'
          ? 'Plan for beneficiary to carry on the business'
          : 'Plan for orderly disposal of business assets and liabilities',
        location: sp.dissolutionPlanDocLocation,
      });
    }

    if (docRows.length > 0) {
      checkPage(30);
      yPosition += 4;
      doc.setFont(undefined, 'bold');
      doc.setFontSize(10);
      doc.setFillColor(...colors.navyBlue);
      doc.rect(margin, yPosition - 4, fieldWidth, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.text(`${businessName} — Document Summary`, margin + 3, yPosition + 2);
      doc.setTextColor(...colors.darkText);
      yPosition += 10;

      const colWidths = [45, 65, fieldWidth - 45 - 65];
      const colX = [margin, margin + 45, margin + 45 + 65];
      const rowHeight = 7;
      const headerHeight = 8;

      checkPage(headerHeight + rowHeight);
      doc.setFillColor(220, 228, 240);
      doc.rect(margin, yPosition, fieldWidth, headerHeight, 'F');
      doc.setDrawColor(...colors.borderGray);
      doc.setLineWidth(0.3);
      doc.rect(margin, yPosition, fieldWidth, headerHeight, 'S');
      doc.setFont(undefined, 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...colors.navyBlue);
      const headers = ['Document', 'Description', 'Location'];
      headers.forEach((h, hi) => {
        doc.text(h, colX[hi] + 2, yPosition + 5.5);
        if (hi < 2) {
          doc.setDrawColor(...colors.borderGray);
          doc.line(colX[hi + 1], yPosition, colX[hi + 1], yPosition + headerHeight);
        }
      });
      yPosition += headerHeight;

      docRows.forEach((row, ri) => {
        const cellTexts = [
          doc.splitTextToSize(row.document, colWidths[0] - 4),
          doc.splitTextToSize(row.description, colWidths[1] - 4),
          doc.splitTextToSize(row.location, colWidths[2] - 4),
        ];
        const maxLines = Math.max(...cellTexts.map((t) => t.length));
        const cellHeight = maxLines * 5 + 4;

        checkPage(cellHeight + 2);
        if (ri % 2 === 0) {
          doc.setFillColor(248, 250, 252);
          doc.rect(margin, yPosition, fieldWidth, cellHeight, 'F');
        }
        doc.setDrawColor(...colors.borderGray);
        doc.setLineWidth(0.2);
        doc.rect(margin, yPosition, fieldWidth, cellHeight, 'S');
        cellTexts.forEach((lines, ci) => {
          if (ci < 2) {
            doc.line(colX[ci + 1], yPosition, colX[ci + 1], yPosition + cellHeight);
          }
        });

        doc.setFont(undefined, 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(...colors.darkText);
        cellTexts.forEach((lines, ci) => {
          lines.forEach((line: string, li: number) => {
            doc.text(line, colX[ci] + 2, yPosition + 5 + li * 5);
          });
        });
        yPosition += cellHeight;
      });

      yPosition += 6;
      doc.setFontSize(10);
    }
  };

  const renderPartnershipDetails = (p: PartnershipItem, idx: number, clientName: string) => {
    const businessName = p.registeredName || `Partnership ${idx + 1}`;
    const pageHeight = doc.internal.pageSize.height;
    const checkPage = (needed: number) => {
      if (yPosition + needed > pageHeight - 15) {
        addPage();
        yPosition = 15;
      }
    };

    checkPage(12);
    yPosition += 4;
    doc.setFont(undefined, 'bold');
    doc.setFontSize(11);
    doc.text(`${clientName}'s Partnership ${idx + 1}: ${businessName}`, margin, yPosition);
    yPosition += 8;

    addSubsectionHeader('Business Identification and Records');

    {
      const pIdRows: [string, string][] = [];
      if (p.registeredName !== undefined) pIdRows.push(['Registered Name of the Business:', p.registeredName]);
      if (p.natureOfBusiness !== undefined) pIdRows.push(['Nature of Business:', p.natureOfBusiness]);
      if (pIdRows.length > 0) {
        const labelColW = 70;
        const valueColW = fieldWidth - labelColW;
        const rowH = 8;
        checkPage(pIdRows.length * rowH + 2);
        pIdRows.forEach(([label, val], rowIdx) => {
          doc.setFont(undefined, 'normal');
          doc.setFontSize(9);
          const labelLines = doc.splitTextToSize(label, labelColW - 3);
          const dynH = Math.max(rowH, labelLines.length * 5 + 3);
          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);
          doc.setFillColor(255, 255, 255);
          doc.rect(margin, yPosition, labelColW, dynH, 'FD');
          doc.setFillColor(255, 255, 255);
          doc.rect(margin + labelColW, yPosition, valueColW, dynH, 'FD');
          doc.setTextColor(...colors.darkText);
          doc.text(labelLines, margin + 2, yPosition + 5.5);
          const fldPIdVal = new doc.AcroFormTextField();
          fldPIdVal.fieldName = `p_id_val_${idx}_row_${rowIdx}`;
          fldPIdVal.Rect = [margin + labelColW + 0.5, yPosition + 0.5, valueColW - 1, dynH - 1];
          fldPIdVal.fontSize = 9;
          fldPIdVal.textColor = colors.darkText;
          fldPIdVal.borderStyle = 'none';
          fldPIdVal.value = val;
          doc.addField(fldPIdVal);
          yPosition += dynH;
        });
        yPosition += 4;
      }
    }

    const pLabelColW = 70;
    const pValueColW = fieldWidth - pLabelColW;
    const pRowH = 8;

    const renderPRow = (label: string, value: string, fieldName: string) => {
      doc.setFont(undefined, 'normal');
      doc.setFontSize(9);
      const labelLines = doc.splitTextToSize(label, pLabelColW - 4);
      const dynamicRowH = Math.max(pRowH, labelLines.length * 5 + 3);
      checkPage(dynamicRowH + 2);
      doc.setDrawColor(...colors.tableBorder);
      doc.setLineWidth(0.3);
      doc.setFillColor(255, 255, 255);
      doc.rect(margin, yPosition, pLabelColW, dynamicRowH, 'FD');
      doc.setFillColor(255, 255, 255);
      doc.rect(margin + pLabelColW, yPosition, pValueColW, dynamicRowH, 'FD');
      doc.setTextColor(...colors.darkText);
      doc.text(labelLines, margin + 2, yPosition + 5.5);
      const f = new doc.AcroFormTextField();
      f.fieldName = fieldName;
      f.Rect = [margin + pLabelColW + 0.5, yPosition + 0.5, pValueColW - 1, dynamicRowH - 1];
      f.fontSize = 8;
      f.textColor = colors.darkText;
      f.borderStyle = 'none';
      f.value = value;
      doc.addField(f);
      yPosition += dynamicRowH;
    };

    const typeLabel = p.partnershipType === 'general'
      ? 'General Partner (with unlimited personal liability)'
      : p.partnershipType === 'limited' ? 'Limited Partner (with limited liability)' : '';
    if (typeLabel) renderPRow('Type of Partnership:', typeLabel, `p_type_${idx}`);

    renderPRow('Written Partnership Agreement:', p.hasWrittenAgreement === 'yes' ? 'Yes' : p.hasWrittenAgreement === 'no' ? 'No' : '', `p_agreement_yesno_${idx}`);

    if (p.hasWrittenAgreement === 'yes') {
      if (p.agreementDocLocation) renderPRow('Location of Original Document:', p.agreementDocLocation, `p_agreement_loc_${idx}`);
      if (p.agreementHasDeathProvisions) {
        const provisionLabels: Record<string, string> = { yes: 'Yes', no: 'No', unsure: "I'm not sure" };
        renderPRow('Contains provisions for death or incapacity of a partner:', provisionLabels[p.agreementHasDeathProvisions] || p.agreementHasDeathProvisions, `p_agreement_provisions_${idx}`);
      }
    }

    addSubsectionHeader('Continuity and Buy-Sell Provisions');

    if (p.continuityContinues) {
      const continuityLabels: Record<string, string> = {
        continues: 'Continues with remaining partners',
        wound_up: 'Wound up',
        unsure: "I'm not sure",
      };
      renderPRow('Business continuation upon death or incapacity:', continuityLabels[p.continuityContinues] || p.continuityContinues, `p_continuity_${idx}`);
    }

    if (p.hasBuySellAgreement) {
      renderPRow('Buy-sell agreement obliging remaining partners to purchase interest:', p.hasBuySellAgreement === 'yes' ? 'Yes' : 'No', `p_buysell_yesno_${idx}`);
    }

    if (p.hasBuySellAgreement === 'yes') {
      if (p.buySellDocLocation) renderPRow('Location of buy/sell document:', p.buySellDocLocation, `p_buysell_loc_${idx}`);
      if (p.buySellFundedByInsurance) renderPRow('Buy/sell agreement funded by life insurance:', p.buySellFundedByInsurance === 'yes' ? 'Yes' : 'No', `p_buysell_insurance_yesno_${idx}`);
      if (p.buySellFundedByInsurance === 'yes' && p.buySellInsuranceDocLocation) {
        renderPRow('Location of buy/sell life insurance documentation:', p.buySellInsuranceDocLocation, `p_buysell_insurance_loc_${idx}`);
      }
    }

    if (p.hasValuationMethod) {
      renderPRow('Written valuation method for partnership interest:', p.hasValuationMethod === 'yes' ? 'Yes' : 'No', `p_valuation_yesno_${idx}`);
    }
    if (p.hasValuationMethod === 'yes' && p.valuationMethodDocLocation) {
      renderPRow('Location of valuation method documentation:', p.valuationMethodDocLocation, `p_valuation_loc_${idx}`);
    }

    addSubsectionHeader('Liability and Fiduciary Risks');

    if (p.hasPersonalGuarantees) {
      renderPRow('Personal guarantees for partnership debts or bank loans:', p.hasPersonalGuarantees === 'yes' ? 'Yes' : 'No', `p_personal_guarantees_yesno_${idx}`);
    }

    if (p.hasPersonalGuarantees === 'yes' && p.personalGuarantees && p.personalGuarantees.length > 0) {
      p.personalGuarantees.forEach((g, gIdx) => {
        checkPage(20);
        yPosition += 4;
        doc.setFont(undefined, 'bolditalic');
        doc.setFontSize(9);
        doc.setTextColor(...colors.darkText);
        const pgLabel = `Personal Guarantee ${gIdx + 1}:`;
        doc.text(pgLabel, margin, yPosition);
        doc.setLineWidth(0.3);
        doc.line(margin, yPosition + 1, margin + doc.getTextWidth(pgLabel), yPosition + 1);
        yPosition += 6;
        if (g.natureOfDebt) renderPRow('Nature of the debt:', g.natureOfDebt, `p_guarantee_debt_${idx}_${gIdx}`);
        if (g.documentationLocation) renderPRow('Documentation location:', g.documentationLocation, `p_guarantee_doc_${idx}_${gIdx}`);
        yPosition += 2;
      });
    }

    if (p.isProfessionalPartnership) {
      renderPRow('Professional partnership (law, accounting, etc.):', p.isProfessionalPartnership === 'yes' ? 'Yes' : 'No', `p_professional_yesno_${idx}`);
    }

    if (p.isProfessionalPartnership === 'yes') {
      if (p.hasLiabilityInsurance) {
        renderPRow('Liability or errors and omissions insurance:', p.hasLiabilityInsurance === 'yes' ? 'Yes' : 'No', `p_liability_insurance_yesno_${idx}`);
      }
      if (p.hasLiabilityInsurance === 'yes' && p.liabilityInsurancePolicies && p.liabilityInsurancePolicies.length > 0) {
        p.liabilityInsurancePolicies.forEach((pol, pIdx) => {
          checkPage(20);
          yPosition += 4;
          doc.setFont(undefined, 'bolditalic');
          doc.setFontSize(9);
          doc.setTextColor(...colors.darkText);
          const polLabel = `Policy ${pIdx + 1}:`;
          doc.text(polLabel, margin, yPosition);
          doc.setLineWidth(0.3);
          doc.line(margin, yPosition + 1, margin + doc.getTextWidth(polLabel), yPosition + 1);
          yPosition += 6;
          if (pol.description) renderPRow('Description:', pol.description, `p_policy_desc_${idx}_${pIdx}`);
          if (pol.documentationLocation) renderPRow('Documentation location:', pol.documentationLocation, `p_policy_doc_${idx}_${pIdx}`);
          yPosition += 2;
        });
      }
    }

    doc.setFontSize(10);

    // Document Summary Table
    type PDocRow = { document: string; description: string; location: string };
    const pDocRows: PDocRow[] = [];

    if (p.agreementDocLocation && p.hasWrittenAgreement === 'yes') {
      pDocRows.push({
        document: 'Partnership Agreement',
        description: p.agreementHasDeathProvisions === 'yes'
          ? 'Written agreement including death/incapacity provisions'
          : 'Written partnership agreement',
        location: p.agreementDocLocation,
      });
    }

    if (p.buySellDocLocation && p.hasBuySellAgreement === 'yes') {
      pDocRows.push({
        document: 'Buy-Sell Agreement',
        description: p.buySellFundedByInsurance === 'yes'
          ? 'Buy-sell agreement (funded by life insurance)'
          : 'Buy-sell agreement',
        location: p.buySellDocLocation,
      });
    }

    if (p.buySellInsuranceDocLocation && p.buySellFundedByInsurance === 'yes') {
      pDocRows.push({
        document: 'Buy-Sell Life Insurance',
        description: 'Life insurance funding the buy-sell agreement',
        location: p.buySellInsuranceDocLocation,
      });
    }

    if (p.valuationMethodDocLocation && p.hasValuationMethod === 'yes') {
      pDocRows.push({
        document: 'Valuation Method',
        description: 'Written method for valuing partnership interest',
        location: p.valuationMethodDocLocation,
      });
    }

    if (p.hasPersonalGuarantees === 'yes' && p.personalGuarantees && p.personalGuarantees.length > 0) {
      p.personalGuarantees.forEach((g, gi) => {
        if (g.documentationLocation) {
          pDocRows.push({
            document: `Personal Guarantee ${gi + 1}`,
            description: g.natureOfDebt ? `Guarantee on: ${g.natureOfDebt}` : 'Personal guarantee on partnership debt',
            location: g.documentationLocation,
          });
        }
      });
    }

    if (p.hasLiabilityInsurance === 'yes' && p.liabilityInsurancePolicies && p.liabilityInsurancePolicies.length > 0) {
      p.liabilityInsurancePolicies.forEach((pol, pi) => {
        if (pol.documentationLocation) {
          pDocRows.push({
            document: `Liability Insurance Policy ${pi + 1}`,
            description: pol.description || 'Liability / errors and omissions insurance policy',
            location: pol.documentationLocation,
          });
        }
      });
    }

    if (pDocRows.length > 0) {
      checkPage(30);
      yPosition += 4;
      doc.setFont(undefined, 'bold');
      doc.setFontSize(10);
      doc.setFillColor(...colors.navyBlue);
      doc.rect(margin, yPosition - 4, fieldWidth, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.text(`${businessName} — Document Summary`, margin + 3, yPosition + 2);
      doc.setTextColor(...colors.darkText);
      yPosition += 10;

      const pColWidths = [45, 65, fieldWidth - 45 - 65];
      const pColX = [margin, margin + 45, margin + 45 + 65];
      const pHeaderHeight = 8;

      checkPage(pHeaderHeight + 7);
      doc.setFillColor(220, 228, 240);
      doc.rect(margin, yPosition, fieldWidth, pHeaderHeight, 'F');
      doc.setDrawColor(...colors.borderGray);
      doc.setLineWidth(0.3);
      doc.rect(margin, yPosition, fieldWidth, pHeaderHeight, 'S');
      doc.setFont(undefined, 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...colors.navyBlue);
      const pHeaders = ['Document', 'Description', 'Location'];
      pHeaders.forEach((h, hi) => {
        doc.text(h, pColX[hi] + 2, yPosition + 5.5);
        if (hi < 2) {
          doc.setDrawColor(...colors.borderGray);
          doc.line(pColX[hi + 1], yPosition, pColX[hi + 1], yPosition + pHeaderHeight);
        }
      });
      yPosition += pHeaderHeight;

      pDocRows.forEach((row, ri) => {
        const cellTexts = [
          doc.splitTextToSize(row.document, pColWidths[0] - 4),
          doc.splitTextToSize(row.description, pColWidths[1] - 4),
          doc.splitTextToSize(row.location, pColWidths[2] - 4),
        ];
        const maxLines = Math.max(...cellTexts.map((t) => t.length));
        const cellHeight = maxLines * 5 + 4;

        checkPage(cellHeight + 2);
        if (ri % 2 === 0) {
          doc.setFillColor(248, 250, 252);
          doc.rect(margin, yPosition, fieldWidth, cellHeight, 'F');
        }
        doc.setDrawColor(...colors.borderGray);
        doc.setLineWidth(0.2);
        doc.rect(margin, yPosition, fieldWidth, cellHeight, 'S');
        cellTexts.forEach((lines, ci) => {
          if (ci < 2) {
            doc.line(pColX[ci + 1], yPosition, pColX[ci + 1], yPosition + cellHeight);
          }
        });

        doc.setFont(undefined, 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(...colors.darkText);
        cellTexts.forEach((lines, ci) => {
          lines.forEach((line: string, li: number) => {
            doc.text(line, pColX[ci] + 2, yPosition + 5 + li * 5);
          });
        });
        yPosition += cellHeight;
      });

      yPosition += 6;
      doc.setFontSize(10);
    }
  };

  if (formData.hasSoleProprietorship === 'yes' || formData.hasPartnership === 'yes') {
    yPosition += 6;
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colors.darkText);
    doc.text(`${businessClient1Name}'s Business Information`, margin, yPosition);
    yPosition += 10;

    if (formData.hasSoleProprietorship === 'yes') {
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...colors.darkText);
      doc.text(`${businessClient1Name} has ownership in a sole proprietorship.`, margin, yPosition);
      yPosition += 8;
      if (formData.soleProprietorshipCount) {
        doc.setFont(undefined, 'bold');
        doc.text('Number of Sole Proprietorships:', margin, yPosition);
        doc.setFont(undefined, 'normal');
        doc.text(` ${formData.soleProprietorshipCount}`, margin + 58, yPosition);
        yPosition += 8;
      }

      const c1SoleProps = formData.client1SolePropsData || [];
      const c1Count = parseInt(formData.soleProprietorshipCount || '0') || 0;
      for (let i = 0; i < c1Count; i++) {
        renderSolePropDetails(c1SoleProps[i] || {}, i, businessClient1Name);
      }
    }

    if (formData.hasPartnership === 'yes') {
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...colors.darkText);
      doc.text(`${businessClient1Name} has ownership interests in a partnership.`, margin, yPosition);
      yPosition += 8;
      if (formData.partnershipCount) {
        doc.setFont(undefined, 'bold');
        doc.text('Number of Partnerships:', margin, yPosition);
        doc.setFont(undefined, 'normal');
        doc.text(` ${formData.partnershipCount}`, margin + 46, yPosition);
        yPosition += 8;
      }

      const c1Partnerships = formData.client1PartnershipsData || [];
      const c1PCount = parseInt(formData.partnershipCount || '0') || 0;
      for (let i = 0; i < c1PCount; i++) {
        renderPartnershipDetails(c1Partnerships[i] || {}, i, businessClient1Name);
      }
    }
  }

  if (hasSpouseForBusiness && (formData.client2HasSoleProprietorship === 'yes' || formData.client2HasPartnership === 'yes')) {
    yPosition += 10;
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colors.darkText);
    doc.text(`${businessClient2Name}'s Business Information`, margin, yPosition);
    yPosition += 10;

    if (formData.client2HasSoleProprietorship === 'yes') {
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...colors.darkText);
      doc.text(`${businessClient2Name} has ownership in a sole proprietorship.`, margin, yPosition);
      yPosition += 8;
      if (formData.client2SoleProprietorshipCount) {
        doc.setFont(undefined, 'bold');
        doc.text('Number of Sole Proprietorships:', margin, yPosition);
        doc.setFont(undefined, 'normal');
        doc.text(` ${formData.client2SoleProprietorshipCount}`, margin + 58, yPosition);
        yPosition += 8;
      }

      const c2SoleProps = formData.client2SolePropsData || [];
      const c2Count = parseInt(formData.client2SoleProprietorshipCount || '0') || 0;
      for (let i = 0; i < c2Count; i++) {
        renderSolePropDetails(c2SoleProps[i] || {}, i, businessClient2Name);
      }
    }

    if (formData.client2HasPartnership === 'yes') {
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...colors.darkText);
      doc.text(`${businessClient2Name} has ownership interests in a partnership.`, margin, yPosition);
      yPosition += 8;
      if (formData.client2PartnershipCount) {
        doc.setFont(undefined, 'bold');
        doc.text('Number of Partnerships:', margin, yPosition);
        doc.setFont(undefined, 'normal');
        doc.text(` ${formData.client2PartnershipCount}`, margin + 46, yPosition);
        yPosition += 8;
      }

      const c2Partnerships = formData.client2PartnershipsData || [];
      const c2PCount = parseInt(formData.client2PartnershipCount || '0') || 0;
      for (let i = 0; i < c2PCount; i++) {
        renderPartnershipDetails(c2Partnerships[i] || {}, i, businessClient2Name);
      }
    }
  }

  addPage();
  yPosition = 12;
  addSectionHeader('Corporate Information');

  const hasSpouseForCorp = (formData.maritalStatus === 'married' || formData.maritalStatus === 'common_law');
  const corpClient1Name = formData.fullName || 'Client 1';
  const corpClient2Name = formData.spouseName || 'Client 2';

  if (formData.ownsCorporation === 'no') {
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...colors.darkText);
    if (hasSpouseForCorp) {
      doc.text(`(${corpClient1Name}) and (${corpClient2Name}), indicated that they do not own a corporation.`, margin, yPosition);
    } else {
      doc.text(`(${corpClient1Name}), indicated that they do not own a corporation.`, margin, yPosition);
    }
    yPosition += 8;
  } else if (formData.ownsCorporation === 'yes') {
    const corporationCount = parseInt(formData.numberOfCorporations || '0');

    if (corporationCount > 0) {
      for (let i = 0; i < corporationCount; i++) {
        const corporation = formData.corporationsData?.[i];
        const ordinal = getOrdinalLabel(i + 1);

        addSubsectionHeader(`${ordinal} Corporation:${corporation?.legalName ? ` ${corporation.legalName}` : ''}`);

        const corporationTypeValue = corporation?.corporationType === 'Other' && corporation?.corporationTypeOther
          ? `${corporation.corporationType} - ${corporation.corporationTypeOther}`
          : (corporation?.corporationType || '');

        let ownersArray: string[] = [];
        if (corporation?.owners) {
          ownersArray = corporation.owners.split(',');
        }
        if (corporation?.otherOwners) {
          try {
            const otherOwnersList = typeof corporation.otherOwners === 'string'
              ? JSON.parse(corporation.otherOwners)
              : corporation.otherOwners;
            if (Array.isArray(otherOwnersList)) {
              ownersArray = [...ownersArray, ...otherOwnersList.filter((owner: string) => owner && owner.trim() !== '')];
            }
          } catch (e) {
            console.error('Error parsing otherOwners:', e);
          }
        }
        const ownersValue = ownersArray.join(', ');

        const shareholderAgreementValue = corporation?.hasShareholderAgreement === 'yes'
          ? (corporation?.shareholderAgreementLocation || '')
          : (corporation?.hasShareholderAgreement === 'no' ? 'No shareholder agreement' : '');

        const corpRows = [
          { label: `${ordinal} Corporation's Name:`, value: corporation?.legalName || '', fieldName: 'name' },
          { label: 'This company was incorporated in:', value: corporation?.jurisdiction || '', fieldName: 'jurisdiction' },
          { label: 'Type of corporation:', value: corporationTypeValue, fieldName: 'type' },
          { label: 'Owner(s):', value: ownersValue, fieldName: 'owners' },
          { label: 'Location of the Articles of Incorporation:', value: corporation?.articlesLocation || '', fieldName: 'articlesLocation' },
          { label: 'Location of Corporate Minute Book:', value: corporation?.minuteBookLocation || '', fieldName: 'minuteBookLocation' },
          { label: 'Shareholder Agreement:', value: shareholderAgreementValue, fieldName: 'shareholderAgreement' },
        ];

        if (corporation?.corporationType === 'Holding Company') {
          corpRows.push({
            label: 'Holding Company Assets:',
            value: corporation?.holdingCompanyAssets || '',
            fieldName: 'holdingCompanyAssets'
          });
        }

        const cellHeight = 8;
        const labelWidth = fieldWidth * 0.40;
        const valueWidth = fieldWidth * 0.60;

        const tableHeight = corpRows.reduce((sum, row) => {
          return sum + (row.fieldName === 'holdingCompanyAssets' ? 24 : cellHeight);
        }, 0);

        if (yPosition + tableHeight > pageHeight - margin) {
          addPage();
          yPosition = 12;
          addSubsectionHeader(`${ordinal} Corporation:${corporation?.legalName ? ` ${corporation.legalName}` : ''}`);
        }

        corpRows.forEach((row, rowIndex) => {
          const isHoldingAssets = row.fieldName === 'holdingCompanyAssets';
          doc.setFontSize(9);
          doc.setFont(undefined, 'normal');
          const labelLines = doc.splitTextToSize(row.label, labelWidth - 3);
          const baseH = isHoldingAssets ? 24 : cellHeight;
          const rowHeight = Math.max(baseH, labelLines.length * 5 + 3);
          const rowY = yPosition;

          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);
          doc.setFillColor(255, 255, 255);
          doc.rect(margin, rowY, labelWidth, rowHeight, 'FD');
          doc.setFillColor(255, 255, 255);
          doc.rect(margin + labelWidth, rowY, valueWidth, rowHeight, 'FD');

          doc.setTextColor(...colors.darkText);
          doc.text(labelLines, margin + 1, rowY + 5);

          const field = new doc.AcroFormTextField();
          field.fieldName = `corporation_${i + 1}_${row.fieldName}`;
          field.Rect = [margin + labelWidth + 0.5, rowY + 0.5, valueWidth - 1, rowHeight - 1];
          field.fontSize = 9;
          field.textColor = colors.darkText;
          field.borderStyle = 'none';
          field.value = row.value;
          if (isHoldingAssets) {
            field.multiline = true;
          }
          doc.addField(field);

          yPosition += rowHeight;
        });

        yPosition += 12;

        const corpName = corporation?.legalName || `${ordinal} Corporation`;

        const bpcTableHeight = 14 + (4 * 10) + 8;
        if (yPosition + bpcTableHeight > pageHeight - margin) {
          addPage();
          yPosition = 12;
        }

        const allPtRows = [
          'Lawyer(s):',
          'Accountant/Tax Prep(s):',
          'Trustee(s):',
          'Life/Disability/Critical Illness Provider(s):',
          'Corporate Accountant:',
          'Commercial Banker:',
          'Business Valuator:',
          'Other:',
          'Other:',
        ];
        const ptRowHeight = 10;
        const ptHeaderHeight = 14;
        const ptTableHeight = ptHeaderHeight + (allPtRows.length * ptRowHeight) + 14;

        if (yPosition + ptTableHeight > pageHeight - margin) {
          addPage();
          yPosition = 12;
        }

        addSubsectionHeader(`${corpName} - Professional Team:`);
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.text('These are the professionals that are related to your corporate needs:', margin, yPosition);
        yPosition += 8;

        const ptCol1Width = fieldWidth * 0.25;
        const ptCol2Width = fieldWidth * 0.25;
        const ptCol3Width = fieldWidth * 0.25;
        const ptCol4Width = fieldWidth * 0.25;

        const ptHeaders = ['Professional:', 'Name:', 'Firm & Contact Info:', 'Primary Role:'];

        let currentY = yPosition;
        doc.setLineWidth(0.3);

        ptHeaders.forEach((header, colIdx) => {
          const colWidths = [ptCol1Width, ptCol2Width, ptCol3Width, ptCol4Width];
          const xPos = margin + colWidths.slice(0, colIdx).reduce((a, b) => a + b, 0);
          doc.setDrawColor(...colors.tableBorder);
          doc.setFillColor(250, 250, 250);
          doc.rect(xPos, currentY, colWidths[colIdx], ptHeaderHeight, 'FD');
          doc.setFontSize(8);
          doc.setFont(undefined, 'bold');
          doc.setTextColor(0, 0, 0);
          const lines = doc.splitTextToSize(header, colWidths[colIdx] - 2);
          const textY = currentY + (ptHeaderHeight - lines.length * 3) / 2 + 3;
          doc.text(lines, xPos + 1, textY);
        });

        currentY += ptHeaderHeight;

        allPtRows.forEach((rowLabel, rowIdx) => {
          const rowY = currentY;
          doc.setDrawColor(...colors.tableBorder);
          doc.setFillColor(255, 255, 255);
          doc.setLineWidth(0.3);
          doc.rect(margin, rowY, ptCol1Width, ptRowHeight, 'FD');

          doc.setFontSize(7);
          doc.setFont(undefined, 'normal');
          doc.setTextColor(...colors.darkText);
          doc.text(rowLabel, margin + 1, rowY + 6);

          [ptCol2Width, ptCol3Width, ptCol4Width].forEach((colWidth, colIdx) => {
            const xPos = margin + ptCol1Width + [0, ptCol2Width, ptCol2Width + ptCol3Width][colIdx];
            doc.rect(xPos, rowY, colWidth, ptRowHeight);

            const field = new doc.AcroFormTextField();
            field.fieldName = `corp_${i + 1}_pt_${rowIdx}_${colIdx}`;
            field.Rect = [xPos + 0.5, rowY + 0.5, colWidth - 1, ptRowHeight - 1];
            field.fontSize = 7;
            field.textColor = colors.darkText;
            field.borderStyle = 'none';
            field.multiline = true;
            doc.addField(field);
          });

          currentY += ptRowHeight;
        });

        yPosition = currentY + 12;

        const fopgRowHeight = 10;
        const fopgHeaderHeight = 18;
        const fopgRowCount = 4;
        const fopgTableHeight = fopgHeaderHeight + (fopgRowCount * fopgRowHeight) + 8;

        if (yPosition + fopgTableHeight > pageHeight - margin) {
          addPage();
          yPosition = 12;
        }

        addSubsectionHeader(`${corpName} - Financial Obligations and Personal Guarantees:`);

        const fopgCol1Width = fieldWidth * 0.20;
        const fopgCol2Width = fieldWidth * 0.22;
        const fopgCol3Width = fieldWidth * 0.18;
        const fopgCol4Width = fieldWidth * 0.15;
        const fopgCol5Width = fieldWidth * 0.25;

        const fopgHeaders = ['Creditor/Bank:', 'Loan Type (term, LOC, Mortgage):', 'Account Number:', 'Personal Guarantee? (Y/N)', 'Location of Supporting Documents'];

        currentY = yPosition;
        doc.setLineWidth(0.3);

        fopgHeaders.forEach((header, colIdx) => {
          const colWidths = [fopgCol1Width, fopgCol2Width, fopgCol3Width, fopgCol4Width, fopgCol5Width];
          const xPos = margin + colWidths.slice(0, colIdx).reduce((a, b) => a + b, 0);
          doc.setDrawColor(...colors.tableBorder);
          doc.setFillColor(250, 250, 250);
          doc.rect(xPos, currentY, colWidths[colIdx], fopgHeaderHeight, 'FD');
          doc.setFontSize(7);
          doc.setFont(undefined, 'bold');
          doc.setTextColor(0, 0, 0);
          const lines = doc.splitTextToSize(header, colWidths[colIdx] - 2);
          const textY = currentY + (fopgHeaderHeight - lines.length * 2.5) / 2 + 2.5;
          doc.text(lines, xPos + 1, textY);
        });

        currentY += fopgHeaderHeight;

        for (let rowIdx = 0; rowIdx < fopgRowCount; rowIdx++) {
          const rowY = currentY;
          [fopgCol1Width, fopgCol2Width, fopgCol3Width, fopgCol4Width, fopgCol5Width].forEach((colWidth, colIdx) => {
            const xPos = margin + [0, fopgCol1Width, fopgCol1Width + fopgCol2Width, fopgCol1Width + fopgCol2Width + fopgCol3Width, fopgCol1Width + fopgCol2Width + fopgCol3Width + fopgCol4Width][colIdx];
            doc.setDrawColor(...colors.tableBorder);
            doc.setLineWidth(0.3);
            doc.rect(xPos, rowY, colWidth, fopgRowHeight);

            const field = new doc.AcroFormTextField();
            field.fieldName = `corp_${i + 1}_fopg_${rowIdx}_${colIdx}`;
            field.Rect = [xPos + 0.5, rowY + 0.5, colWidth - 1, fopgRowHeight - 1];
            field.fontSize = 7;
            field.textColor = colors.darkText;
            field.borderStyle = 'none';
            field.multiline = true;
            doc.addField(field);
          });

          currentY += fopgRowHeight;
        }

        yPosition = currentY + 12;

        const bcrmRowHeight = 10;
        const bcrmHeaderHeight = 18;
        const bcrmRows = ['Key Person', 'Buy-Sell Funding', 'Overhead Expense', 'Commercial General Liability'];
        const bcrmTableHeight = bcrmHeaderHeight + (bcrmRows.length * bcrmRowHeight) + 14;

        if (yPosition + bcrmTableHeight > pageHeight - margin) {
          addPage();
          yPosition = 12;
        }

        addSubsectionHeader(`${corpName} - Business Continuity and Risk Management:`);
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.text('Insurance is often the primary source of liquidity for funding buy/sell agreements or paying terminal taxes.', margin, yPosition);
        yPosition += 8;

        const bcrmCol1Width = fieldWidth * 0.18;
        const bcrmCol2Width = fieldWidth * 0.18;
        const bcrmCol3Width = fieldWidth * 0.18;
        const bcrmCol4Width = fieldWidth * 0.18;
        const bcrmCol5Width = fieldWidth * 0.13;
        const bcrmCol6Width = fieldWidth * 0.15;

        const bcrmHeaders = ['Policy Type:', 'Insurance Carrier:', 'Key Contact:', 'Policy Number:', 'Beneficiary/Purpose:', 'Location of Supporting Documents'];

        currentY = yPosition;
        doc.setLineWidth(0.3);

        bcrmHeaders.forEach((header, colIdx) => {
          const colWidths = [bcrmCol1Width, bcrmCol2Width, bcrmCol3Width, bcrmCol4Width, bcrmCol5Width, bcrmCol6Width];
          const xPos = margin + colWidths.slice(0, colIdx).reduce((a, b) => a + b, 0);
          doc.setDrawColor(...colors.tableBorder);
          doc.setFillColor(250, 250, 250);
          doc.rect(xPos, currentY, colWidths[colIdx], bcrmHeaderHeight, 'FD');
          doc.setFontSize(6.5);
          doc.setFont(undefined, 'bold');
          doc.setTextColor(0, 0, 0);
          const lines = doc.splitTextToSize(header, colWidths[colIdx] - 2);
          const textY = currentY + (bcrmHeaderHeight - lines.length * 2.5) / 2 + 2.5;
          doc.text(lines, xPos + 1, textY);
        });

        currentY += bcrmHeaderHeight;

        bcrmRows.forEach((rowLabel, rowIdx) => {
          const rowY = currentY;
          doc.setDrawColor(...colors.tableBorder);
          doc.setFillColor(255, 255, 255);
          doc.setLineWidth(0.3);
          doc.rect(margin, rowY, bcrmCol1Width, bcrmRowHeight, 'FD');

          doc.setFontSize(7);
          doc.setFont(undefined, 'normal');
          doc.setTextColor(...colors.darkText);
          doc.text(rowLabel, margin + 1, rowY + 6);

          [bcrmCol2Width, bcrmCol3Width, bcrmCol4Width, bcrmCol5Width, bcrmCol6Width].forEach((colWidth, colIdx) => {
            const xPos = margin + bcrmCol1Width + [0, bcrmCol2Width, bcrmCol2Width + bcrmCol3Width, bcrmCol2Width + bcrmCol3Width + bcrmCol4Width, bcrmCol2Width + bcrmCol3Width + bcrmCol4Width + bcrmCol5Width][colIdx];
            doc.rect(xPos, rowY, colWidth, bcrmRowHeight);

            const field = new doc.AcroFormTextField();
            field.fieldName = `corp_${i + 1}_bcrm_${rowIdx}_${colIdx}`;
            field.Rect = [xPos + 0.5, rowY + 0.5, colWidth - 1, bcrmRowHeight - 1];
            field.fontSize = 7;
            field.textColor = colors.darkText;
            field.borderStyle = 'none';
            field.multiline = true;
            doc.addField(field);
          });

          currentY += bcrmRowHeight;
        });

        yPosition = currentY + 12;

        const sbstRowHeight = 10;
        const sbstHeaderHeight = 18;
        const sbstRows = [
          { label: 'Chosen Successor:', placeholder: 'e.g. Shareholder Agreement' },
          { label: 'Buy-Sell Trigger Events:', placeholder: 'e.g. Death, Disability, Divorce' },
          { label: 'Valuation Method:', placeholder: 'e.g. Formula vs. Independent Valuation' },
          { label: 'Other Scenario:', placeholder: '' },
          { label: 'Other Scenario:', placeholder: '' }
        ];
        const sbstTableHeight = sbstHeaderHeight + (sbstRows.length * sbstRowHeight) + 14;

        if (yPosition + sbstTableHeight > pageHeight - margin) {
          addPage();
          yPosition = 12;
        }

        addSubsectionHeader(`${corpName} - Succession and Buy-Sell Triggers:`);
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.text('Identify the roadmap for who takes control and how they are supposed to pay for it.', margin, yPosition);
        yPosition += 8;

        const sbstCol1Width = fieldWidth * 0.20;
        const sbstCol2Width = fieldWidth * 0.30;
        const sbstCol3Width = fieldWidth * 0.25;
        const sbstCol4Width = fieldWidth * 0.25;

        const sbstHeaders = ['Succession Detail:', 'Response/Instruction:', 'Location of Governing Agreement:', 'Other Information:'];

        currentY = yPosition;
        doc.setLineWidth(0.3);

        sbstHeaders.forEach((header, colIdx) => {
          const colWidths = [sbstCol1Width, sbstCol2Width, sbstCol3Width, sbstCol4Width];
          const xPos = margin + colWidths.slice(0, colIdx).reduce((a, b) => a + b, 0);
          doc.setDrawColor(...colors.tableBorder);
          doc.setFillColor(250, 250, 250);
          doc.rect(xPos, currentY, colWidths[colIdx], sbstHeaderHeight, 'FD');
          doc.setFontSize(8);
          doc.setFont(undefined, 'bold');
          doc.setTextColor(0, 0, 0);
          const lines = doc.splitTextToSize(header, colWidths[colIdx] - 2);
          const textY = currentY + (sbstHeaderHeight - lines.length * 3) / 2 + 3;
          doc.text(lines, xPos + 1, textY);
        });

        currentY += sbstHeaderHeight;

        sbstRows.forEach((row, rowIdx) => {
          const rowY = currentY;
          doc.setDrawColor(...colors.tableBorder);
          doc.setFillColor(255, 255, 255);
          doc.setLineWidth(0.3);
          doc.rect(margin, rowY, sbstCol1Width, sbstRowHeight, 'FD');

          doc.setFontSize(7);
          doc.setFont(undefined, 'normal');
          doc.setTextColor(...colors.darkText);
          doc.text(row.label, margin + 1, rowY + 6);

          [sbstCol2Width, sbstCol3Width, sbstCol4Width].forEach((colWidth, colIdx) => {
            const xPos = margin + sbstCol1Width + [0, sbstCol2Width, sbstCol2Width + sbstCol3Width][colIdx];
            doc.setDrawColor(...colors.tableBorder);
            doc.rect(xPos, rowY, colWidth, sbstRowHeight);

            const field = new doc.AcroFormTextField();
            field.fieldName = `corp_${i + 1}_sbst_${rowIdx}_${colIdx}`;
            field.Rect = [xPos + 0.5, rowY + 0.5, colWidth - 1, sbstRowHeight - 1];
            field.fontSize = 7;
            field.textColor = colors.darkText;
            field.borderStyle = 'none';
            field.multiline = true;
            if (colIdx === 0 && row.placeholder) {
              field.value = row.placeholder;
            }
            doc.addField(field);
          });

          currentY += sbstRowHeight;
        });

        yPosition = currentY + 8;
      }
    }
  }

  addPage();
  yPosition = 12;
  addSectionHeader('Who is on your Team?');

  doc.setFontSize(9);
  doc.setTextColor(...colors.mediumGray);
  doc.text('Your Power(s) of Attorney and Estate Trustees should not act in a vacuum.', margin, yPosition);
  yPosition += 5;
  doc.text('This section lists the core professionals who already know your history.', margin, yPosition);
  yPosition += 8;
  doc.setTextColor(...colors.darkText);
  yPosition += 10;

  const hasSpouse = (formData.maritalStatus === 'married' || formData.maritalStatus === 'common_law');

  if (formData.client1HasWill === 'no' && (!hasSpouse || formData.client2HasWill === 'no')) {
    checkPageBreak(100);

    const clientsWithoutWill: string[] = [];
    if (formData.client1HasWill === 'no') {
      clientsWithoutWill.push(client1Name);
    }
    if (hasSpouse && formData.client2HasWill === 'no') {
      clientsWithoutWill.push(client2Name);
    }

    const clientNameText = clientsWithoutWill.join(' and ');

    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text(`Why Having a Will is Essential (${clientNameText} indicated they don't have one)`, margin, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const introText = `If you pass away without a valid Will, you are considered to have died "intestate." This creates several serious problems for your loved ones:`;
    const introLines = doc.splitTextToSize(introText, fieldWidth);
    introLines.forEach((line: string) => {
      checkPageBreak(6);
      doc.text(line, margin, yPosition);
      yPosition += 5;
    });
    yPosition += 3;

    const bulletPoints = [
      { title: 'The Government Decides:', text: 'Instead of you choosing who gets your money and property, provincial laws follow a rigid formula to distribute your assets.' },
      { title: 'Loss of Control:', text: 'You lose the ability to choose your own executor. A court will appoint an administrator, and it may not be the person you would have wanted.' },
      { title: 'Higher Taxes:', text: 'Without a Will, you cannot use tax-planning strategies (like trusts) that help keep more money in your family\'s pockets rather than the government\'s.' },
      { title: 'Family Conflict:', text: 'Intestacy often leads to legal battles and arguments among family members who may disagree on who should get what.' },
      { title: 'Delays and Costs:', text: 'Settling an estate without a Will is much slower and more expensive, meaning your family has to wait longer to receive their inheritance.' }
    ];

    bulletPoints.forEach((bullet) => {
      checkPageBreak(15);
      doc.setFont(undefined, 'bold');
      doc.text('• ' + bullet.title, margin + 3, yPosition);
      yPosition += 5;

      doc.setFont(undefined, 'normal');
      const bulletLines = doc.splitTextToSize(bullet.text, fieldWidth - 6);
      bulletLines.forEach((line: string) => {
        checkPageBreak(6);
        doc.text(line, margin + 6, yPosition);
        yPosition += 5;
      });
      yPosition += 2;
    });

    yPosition += 8;

    const childrenData = formData.childrenData;
    const hasDependentChildren = childrenData && Array.isArray(childrenData) && childrenData.some((child: any) => child?.financiallyIndependent === 'no');

    if (hasDependentChildren) {
      checkPageBreak(100);

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Special Considerations for Minor or Dependent Children', margin, yPosition);
      yPosition += 8;

      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      const introText = `${clientNameText}, you have children who are under the age of majority or who rely on you for support, a Will is your only way to protect them:`;
      const introLines = doc.splitTextToSize(introText, fieldWidth);
      introLines.forEach((line: string) => {
        checkPageBreak(6);
        doc.text(line, margin, yPosition);
        yPosition += 5;
      });
      yPosition += 3;

      const childBulletPoints = [
        { title: 'Choosing a Guardian:', text: 'You can name a guardian (called a "tutor" in Quebec) to raise your children if both parents are gone. Without this, a judge will decide who takes your children.' },
        { title: 'Setting Up Trusts:', text: 'A Will allows you to create testamentary trusts. This means a trusted person manages the money for your kids so they don\'t receive a massive lump sum at age 18 or 19.' },
        { title: 'Staging Inheritances:', text: 'You can decide that your children receive their inheritance in stages (for example, some at age 25 and the rest at 30) rather than all at once.' },
        { title: 'Protecting Disability Benefits:', text: 'For children with special needs, you can set up a Henson Trust. This allows them to receive an inheritance without losing their government disability payments.' },
        { title: 'Keeping the Government Out:', text: 'If you don\'t have a Will, the Public Trustee may take control of your children\'s money until they turn 18, which can be very restrictive and costly.' }
      ];

      childBulletPoints.forEach((bullet) => {
        checkPageBreak(15);
        doc.setFont(undefined, 'bold');
        doc.text('• ' + bullet.title, margin + 3, yPosition);
        yPosition += 5;

        doc.setFont(undefined, 'normal');
        const bulletLines = doc.splitTextToSize(bullet.text, fieldWidth - 6);
        bulletLines.forEach((line: string) => {
          checkPageBreak(6);
          doc.text(line, margin + 6, yPosition);
          yPosition += 5;
        });
        yPosition += 2;
      });

      yPosition += 8;
    }
  } else if (formData.client1HasWill === 'yes' || formData.client2HasWill === 'yes') {
    const bothHaveWills = formData.client1HasWill === 'yes' && formData.client2HasWill === 'yes';
    const sameLawyer = formData.willsSameLawyer === 'yes';

    if (formData.client1HasWill === 'yes') {
      checkPageBreak(25);

      if (formData.client1WillYear) {
        const currentYear = new Date().getFullYear();
        const willYear = parseInt(formData.client1WillYear);
        const yearsOld = currentYear - willYear;

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text(`${client1Name} has a Will, created in ${formData.client1WillYear}.`, margin, yPosition);
        yPosition += 6;

        if (yearsOld >= 5) {
          checkPageBreak(40);
          doc.setFontSize(9);
          doc.setFont(undefined, 'normal');
          const warningText = `${client1Name}, you indicated that your last Will was prepared in ${formData.client1WillYear}. There is no specific number of years after which a Will legally expires, but many sources emphasize that an out-of-date Will can sometimes be worse than having no Will at all. Most legal professionals and financial advisors recommend that a Will and estate plan should be professionally reviewed at least every three to five years. Reviewing your Will at these intervals ensures that the document remains valid, reflects your current intentions, and complies with any evolving tax or succession laws.`;
          const warningLines = doc.splitTextToSize(warningText, fieldWidth);
          warningLines.forEach((line: string) => {
            checkPageBreak(6);
            doc.text(line, margin, yPosition);
            yPosition += 5;
          });
          yPosition += 5;
        }
      }
    }

    if (formData.client1HasWill === 'yes' && formData.client1WillLocation) {
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text(`${client1Name}'s Will is located: ${formData.client1WillLocation}`, margin, yPosition);
      yPosition += 6;
    }

    if (formData.client1HasSecondaryWill === 'yes' && formData.client1SecondaryWillLocation) {
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text(`${client1Name} has a secondary Will, and it is located: ${formData.client1SecondaryWillLocation}`, margin, yPosition);
      yPosition += 6;
    }

    if (formData.client1HasSecondaryWill === 'yes' && formData.client1SecondaryWillJurisdiction) {
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text(`${client1Name}'s secondary Will was prepared in ${formData.client1SecondaryWillJurisdiction}.`, margin, yPosition);
      yPosition += 6;
    }

    if (formData.client1HasWill === 'yes' && formData.client1HasWillMeaningfulChanges === 'yes' && formData.client1WillMeaningfulChangesDetails) {
      checkPageBreak(30);
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      const meaningfulChangesText = `${client1Name} indicated that they have had meaningful changes in their life. They indicated: ${formData.client1WillMeaningfulChangesDetails} Based on the major changes, it is recommended that they update their Will, so that these changes and ${client1Name}'s wishes are up to date.`;
      const changesLines = doc.splitTextToSize(meaningfulChangesText, fieldWidth);
      changesLines.forEach((line: string) => {
        checkPageBreak(6);
        doc.text(line, margin, yPosition);
        yPosition += 5;
      });
      yPosition += 5;
    } else if (formData.client1HasWill === 'yes' && formData.client1HasWillMeaningfulChanges === 'no') {
      checkPageBreak(20);
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      const noChangesText = `${client1Name} indicated that there have been no meaningful changes in their life, family, or financial situation that could affect their wishes.`;
      const noChangesLines = doc.splitTextToSize(noChangesText, fieldWidth);
      noChangesLines.forEach((line: string) => {
        checkPageBreak(6);
        doc.text(line, margin, yPosition);
        yPosition += 5;
      });
      yPosition += 5;
    }

    const hasDisabledChild = formData.childrenData && Array.isArray(formData.childrenData) &&
      formData.childrenData.some((child: any) => child?.disabled === 'yes');

    if (formData.client1HasWill === 'yes' && hasDisabledChild) {
      checkPageBreak(30);

      const disabledChild = formData.childrenData?.find((child: any) => child?.disabled === 'yes');
      const disabledChildName = disabledChild?.name || 'their disabled child';

      if (formData.client1HasHensonTrust === 'yes') {
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text(`${client1Name} indicated that they have included an Absolute Discretionary Trust ("Henson Trust" in Ontario) in their Will.`, margin, yPosition);
        yPosition += 6;
      } else if (formData.client1HasHensonTrust === 'no') {
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text(`${client1Name} indicated that they have not included an Absolute Discretionary Trust ("Henson Trust" in Ontario) in their Will.`, margin, yPosition);
        yPosition += 6;
      }

      if (formData.client1HasHensonTrust) {
        checkPageBreak(100);

        doc.setFont(undefined, 'bold');
        doc.setFontSize(11);
        doc.text('Additional Reading - Absolute Discretionary Trusts ("Henson Trusts" in Ontario)', margin, yPosition);
        yPosition += 8;

        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);

        const hensonText = `A Henson Trust is a very important tool for families who have a child with a disability. It is what experts call an "absolute discretionary trust," which means the person you choose to manage the money (the trustee) has the final say on when and how much money is paid out. The big advantage of this structure is that the child does not legally own the assets and has no power to demand payments from the trust. This is key because most provincial government programs have strict limits on how much wealth a person can have before they lose their help; because the child doesn't "own" the trust money, it usually won't be counted against them, allowing them to keep their government disability benefits.

You should explore this as an option with your legal and CFP® professionals because if you simply leave money to a disabled child in a normal way, it could actually hurt them financially. Without a trust, an outright inheritance could push them over the asset limit, causing them to be disqualified from their monthly support check and other essentials like dental care and prescription drug coverage. A Henson Trust protects these benefits while still allowing the child to use the trust money for things that improve their quality of life, such as home care attendants or specialized medical equipment. It is a reliable way to ensure your loved one has financial security and is well taken care of even after you are gone.`;

        const hensonLines = doc.splitTextToSize(hensonText, fieldWidth);
        hensonLines.forEach((line: string) => {
          checkPageBreak(6);
          doc.text(line, margin, yPosition);
          yPosition += 5;
        });

        yPosition += 10;
      }
    }

    if (formData.client2HasWill === 'yes' && hasSpouse) {
      checkPageBreak(25);

      if (formData.client2WillYear) {
        const currentYear = new Date().getFullYear();
        const willYear = parseInt(formData.client2WillYear);
        const yearsOld = currentYear - willYear;

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text(`${client2Name} has a Will, created in ${formData.client2WillYear}.`, margin, yPosition);
        yPosition += 6;

        if (yearsOld >= 5) {
          checkPageBreak(40);
          doc.setFontSize(9);
          doc.setFont(undefined, 'normal');
          const warningText = `${client2Name}, you indicated that your last Will was prepared in ${formData.client2WillYear}. There is no specific number of years after which a Will legally expires, but many sources emphasize that an out-of-date Will can sometimes be worse than having no Will at all. Most legal professionals and financial advisors recommend that a Will and estate plan should be professionally reviewed at least every three to five years. Reviewing your Will at these intervals ensures that the document remains valid, reflects your current intentions, and complies with any evolving tax or succession laws.`;
          const warningLines = doc.splitTextToSize(warningText, fieldWidth);
          warningLines.forEach((line: string) => {
            checkPageBreak(6);
            doc.text(line, margin, yPosition);
            yPosition += 5;
          });
          yPosition += 5;
        }
      }

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text(`In what jurisdiction was ${client2Name}'s Will prepared?`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 2;

      doc.rect(margin, yPosition, fieldWidth, 6);

      const jurisdictionField2 = new doc.AcroFormTextField();
      jurisdictionField2.fieldName = 'client2_will_jurisdiction';
      jurisdictionField2.Rect = [margin, yPosition, fieldWidth, 6];
      jurisdictionField2.fontSize = 9;
      jurisdictionField2.textColor = colors.darkText;
      jurisdictionField2.value = formData.client2WillJurisdiction || '';
      jurisdictionField2.defaultValue = 'e.g., Ontario, British Columbia, etc.';
      doc.addField(jurisdictionField2);
      yPosition += 14;
    }

    if (formData.client2HasWill === 'yes' && formData.client2WillLocation && hasSpouse) {
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text(`${client2Name} has a Will, and it is located: ${formData.client2WillLocation}`, margin, yPosition);
      yPosition += 6;
    }

    if (formData.client2HasSecondaryWill === 'yes' && formData.client2SecondaryWillLocation && hasSpouse) {
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text(`${client2Name} has a secondary Will, and it is located: ${formData.client2SecondaryWillLocation}`, margin, yPosition);
      yPosition += 6;
    }

    if (formData.client2HasSecondaryWill === 'yes' && formData.client2SecondaryWillJurisdiction && hasSpouse) {
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text(`${client2Name}'s secondary Will was prepared in ${formData.client2SecondaryWillJurisdiction}.`, margin, yPosition);
      yPosition += 6;
    }

    if (formData.client2HasWill === 'yes' && formData.client2HasWillMeaningfulChanges === 'yes' && formData.client2WillMeaningfulChangesDetails && hasSpouse) {
      checkPageBreak(30);
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      const meaningfulChangesText = `${client2Name} indicated that they have had meaningful changes in their life. They indicated: ${formData.client2WillMeaningfulChangesDetails} Based on the major changes, it is recommended that they update their Will, so that these changes and ${client2Name}'s wishes are up to date.`;
      const changesLines = doc.splitTextToSize(meaningfulChangesText, fieldWidth);
      changesLines.forEach((line: string) => {
        checkPageBreak(6);
        doc.text(line, margin, yPosition);
        yPosition += 5;
      });
      yPosition += 5;
    } else if (formData.client2HasWill === 'yes' && formData.client2HasWillMeaningfulChanges === 'no' && hasSpouse) {
      checkPageBreak(20);
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      const noChangesText = `${client2Name} indicated that there have been no meaningful changes in their life, family, or financial situation that could affect their wishes.`;
      const noChangesLines = doc.splitTextToSize(noChangesText, fieldWidth);
      noChangesLines.forEach((line: string) => {
        checkPageBreak(6);
        doc.text(line, margin, yPosition);
        yPosition += 5;
      });
      yPosition += 5;
    }

    if ((formData.client1HasWill === 'yes' && (formData.client1WillJurisdiction || formData.client1WillLocation)) ||
        (formData.client2HasWill === 'yes' && (formData.client2WillJurisdiction || formData.client2WillLocation) && hasSpouse)) {
      yPosition += 4;
    }
  }

  if (formData.client1HasPoaPersonalCare === 'yes') {
    const client1Name = formData.fullName || 'Client 1';
    const client2Name = formData.spouseName || 'Client 2';

    checkPageBreak(40);

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');

    if (formData.client1SpouseIsPoaPersonalCare === 'yes') {
      doc.text(`${client1Name}'s Power of Attorney for Personal Care:`, margin, yPosition);
      yPosition += 6;
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.text(`${client2Name} is the primary Power of Attorney for Personal Care.`, margin, yPosition);
      yPosition += 6;

      if (formData.client1PoaPersonalCareHasDocCopy) {
        const docCopyLabel =
          formData.client1PoaPersonalCareHasDocCopy === 'yes_on_file' ? 'Yes, on their files' :
          formData.client1PoaPersonalCareHasDocCopy === 'no_can_access' ? 'No, but they know how to access the document if/when necessary' :
          'No, this has not been discussed';
        doc.text(`Document copy status: ${docCopyLabel}`, margin, yPosition);
        yPosition += 6;
      }
    } else if (formData.spousesPoaPersonalCare === 'yes') {
      doc.text('Powers of Attorney for Personal Care:', margin, yPosition);
      yPosition += 6;
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.text(`(${client1Name}) and (${client2Name}), indicated that they are each other's Powers of Attorney for Personal Care.`, margin, yPosition);
      yPosition += 6;
    } else if (formData.client1PoaPersonalCareName) {
      doc.text(`${client1Name}'s Primary Power of Attorney for Personal Care:`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      {
        const poaLabelColW = 70;
        const poaValueColW = fieldWidth - poaLabelColW;
        const poaRowH = 8;
        const provinceLabels: Record<string, string> = {
          alberta: 'Alberta', british_columbia: 'British Columbia', manitoba: 'Manitoba',
          new_brunswick: 'New Brunswick', newfoundland_labrador: 'Newfoundland and Labrador',
          northwest_territories: 'Northwest Territories', nova_scotia: 'Nova Scotia',
          nunavut: 'Nunavut', ontario: 'Ontario', prince_edward_island: 'Prince Edward Island',
          quebec: 'Quebec', saskatchewan: 'Saskatchewan', yukon: 'Yukon'
        };
        let locationVal = '';
        if (formData.client1PoaPersonalCareProvince) {
          const pl = provinceLabels[formData.client1PoaPersonalCareProvince] || formData.client1PoaPersonalCareProvince;
          locationVal = formData.client1PoaPersonalCareCity ? `${formData.client1PoaPersonalCareCity}, ${pl}` : pl;
        } else if (formData.client1PoaPersonalCareCountry) {
          locationVal = formData.client1PoaPersonalCareCity ? `${formData.client1PoaPersonalCareCity}, ${formData.client1PoaPersonalCareCountry}` : formData.client1PoaPersonalCareCountry;
        }
        const docCopyVal = formData.client1PoaPersonalCareHasDocCopy === 'yes_on_file' ? 'Yes, on their files' :
          formData.client1PoaPersonalCareHasDocCopy === 'no_can_access' ? 'No, but they know how to access the document if/when necessary' :
          formData.client1PoaPersonalCareHasDocCopy ? 'No, this has not been discussed' : '';
        const c1PcRows: [string, string, string][] = [
          ['Name:', formData.client1PoaPersonalCareName || '', 'c1_poa_pc_name'],
          ['Phone:', formData.client1PoaPersonalCarePhone || '', 'c1_poa_pc_phone'],
          ['Email:', formData.client1PoaPersonalCareEmail || '', 'c1_poa_pc_email'],
          ['Relationship:', formData.client1PoaPersonalCareRelationship || '', 'c1_poa_pc_relationship'],
          ['Location:', locationVal, 'c1_poa_pc_location'],
          ['Document copy:', docCopyVal, 'c1_poa_pc_doc_copy'],
        ].filter(([, val]) => val) as [string, string, string][];
        c1PcRows.forEach(([label, val, fieldName]) => {
          doc.setFont(undefined, 'normal');
          doc.setFontSize(9);
          const labelLines = doc.splitTextToSize(label, poaLabelColW - 3);
          const dynH = Math.max(poaRowH, labelLines.length * 5 + 3);
          checkPageBreak(dynH + 2);
          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);
          doc.setFillColor(255, 255, 255);
          doc.rect(margin, yPosition, poaLabelColW, dynH, 'FD');
          doc.rect(margin + poaLabelColW, yPosition, poaValueColW, dynH, 'FD');
          doc.setTextColor(...colors.darkText);
          doc.text(labelLines, margin + 2, yPosition + 5.5);
          const fld = new doc.AcroFormTextField();
          fld.fieldName = fieldName;
          fld.Rect = [margin + poaLabelColW + 0.5, yPosition + 0.5, poaValueColW - 1, dynH - 1];
          fld.fontSize = 9;
          fld.textColor = colors.darkText;
          fld.borderStyle = 'none';
          fld.value = val;
          doc.addField(fld);
          yPosition += dynH;
        });
        yPosition += 4;
      }

      doc.setFontSize(9);
      doc.setFont(undefined, 'bold');
      doc.text('POA for Personal Care Type:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      doc.text('☐ Enduring/Continuing   ☐ Springing', margin + 55, yPosition);
      yPosition += 8;
    } else {
      doc.text(`${client1Name}'s Power of Attorney for Personal Care:`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 8;
    }

    if (formData.client1HasContingentPoaPersonalCare === 'no') {
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('Alternate Power(s) of Attorney for Personal Care:', margin, yPosition);
      yPosition += 6;
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.text(`${client1Name} indicated that they have not named alternate Power(s) of Attorney for Personal Care.`, margin, yPosition);
      yPosition += 10;
    } else if (formData.client1HasContingentPoaPersonalCare === 'yes' && formData.client1PoaPersonalCareCount) {
      const poaCount = parseInt(formData.client1PoaPersonalCareCount, 10);

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('Alternate Power(s) of Attorney for Personal Care:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 8;

      const poaCellHeight = 6;
      const totalPoaRows = poaCount + (formData.spouseIsPoaPersonalCare === 'yes' ? 1 : 0);
      checkPageBreak(poaCellHeight + totalPoaRows * poaCellHeight + 4);
      const poaColWidths = [fieldWidth * 0.22, fieldWidth * 0.18, fieldWidth * 0.22, fieldWidth * 0.23, fieldWidth * 0.15];
      let poaTableY = yPosition;

      doc.setDrawColor(...colors.tableBorder);
      doc.setLineWidth(0.3);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...colors.darkText);

      const poaCol1X = margin;
      const poaCol2X = margin + poaColWidths[0];
      const poaCol3X = margin + poaColWidths[0] + poaColWidths[1];
      const poaCol4X = margin + poaColWidths[0] + poaColWidths[1] + poaColWidths[2];
      const poaCol5X = margin + poaColWidths[0] + poaColWidths[1] + poaColWidths[2] + poaColWidths[3];

      doc.rect(poaCol1X, poaTableY, poaColWidths[0], poaCellHeight, 'FD');
      doc.rect(poaCol2X, poaTableY, poaColWidths[1], poaCellHeight, 'FD');
      doc.rect(poaCol3X, poaTableY, poaColWidths[2], poaCellHeight, 'FD');
      doc.rect(poaCol4X, poaTableY, poaColWidths[3], poaCellHeight, 'FD');
      doc.rect(poaCol5X, poaTableY, poaColWidths[4], poaCellHeight, 'FD');

      doc.text('Name:', poaCol1X + 0.5, poaTableY + 4);
      doc.text('Phone Number:', poaCol2X + 0.5, poaTableY + 4);
      doc.text('Email Address:', poaCol3X + 0.5, poaTableY + 4);
      doc.text('Relationship to You:', poaCol4X + 0.5, poaTableY + 4);
      doc.text('Has Access to Documentation?', poaCol5X + 0.5, poaTableY + 4);

      poaTableY += poaCellHeight;

      if (formData.spouseIsPoaPersonalCare === 'yes') {

        doc.setDrawColor(...colors.tableBorder);
        doc.setLineWidth(0.3);
        doc.setFillColor(255, 255, 255);
        doc.setFont(undefined, 'normal');

        doc.rect(poaCol1X, poaTableY, poaColWidths[0], poaCellHeight, 'FD');
        doc.setFillColor(...colors.tableHeader);
        doc.rect(poaCol2X, poaTableY, poaColWidths[1], poaCellHeight, 'FD');
        doc.rect(poaCol3X, poaTableY, poaColWidths[2], poaCellHeight, 'FD');
        doc.rect(poaCol4X, poaTableY, poaColWidths[3], poaCellHeight, 'FD');
        doc.rect(poaCol5X, poaTableY, poaColWidths[4], poaCellHeight, 'FD');

        const spouseField1 = new doc.AcroFormTextField();
        spouseField1.fieldName = 'poa_personal_care_spouse_name';
        spouseField1.Rect = [poaCol1X + 0.3, poaTableY + 0.3, poaColWidths[0] - 0.6, poaCellHeight - 0.6];
        spouseField1.fontSize = 7;
        spouseField1.textColor = [0, 0, 0];
        spouseField1.borderStyle = 'none';
        spouseField1.value = client2Name;
        doc.addField(spouseField1);

        const spouseField2 = new doc.AcroFormTextField();
        spouseField2.fieldName = 'poa_personal_care_spouse_phone';
        spouseField2.Rect = [poaCol2X + 0.3, poaTableY + 0.3, poaColWidths[1] - 0.6, poaCellHeight - 0.6];
        spouseField2.fontSize = 7;
        spouseField2.textColor = [0, 0, 0];
        spouseField2.borderStyle = 'none';
        spouseField2.value = formData.spousePhone || '';
        doc.addField(spouseField2);

        const spouseField3 = new doc.AcroFormTextField();
        spouseField3.fieldName = 'poa_personal_care_spouse_email';
        spouseField3.Rect = [poaCol3X + 0.3, poaTableY + 0.3, poaColWidths[2] - 0.6, poaCellHeight - 0.6];
        spouseField3.fontSize = 7;
        spouseField3.textColor = [0, 0, 0];
        spouseField3.borderStyle = 'none';
        spouseField3.value = formData.spouseEmail || '';
        doc.addField(spouseField3);

        const spouseField4 = new doc.AcroFormTextField();
        spouseField4.fieldName = 'poa_personal_care_spouse_relationship';
        spouseField4.Rect = [poaCol4X + 0.3, poaTableY + 0.3, poaColWidths[3] - 0.6, poaCellHeight - 0.6];
        spouseField4.fontSize = 7;
        spouseField4.textColor = [0, 0, 0];
        spouseField4.borderStyle = 'none';
        spouseField4.value = 'Spouse/Common Law Partner';
        doc.addField(spouseField4);

        const spouseField5 = new doc.AcroFormTextField();
        spouseField5.fieldName = 'poa_personal_care_spouse_providedcopy';
        spouseField5.Rect = [poaCol5X + 0.3, poaTableY + 0.3, poaColWidths[4] - 0.6, poaCellHeight - 0.6];
        spouseField5.fontSize = 7;
        spouseField5.textColor = [0, 0, 0];
        spouseField5.borderStyle = 'none';
        spouseField5.value = '';
        doc.addField(spouseField5);

        poaTableY += poaCellHeight;
      }

      for (let i = 0; i < poaCount; i++) {
        const poaData = formData.client1PoaPersonalCareData?.[i];

        doc.setDrawColor(...colors.tableBorder);
        doc.setLineWidth(0.3);
        doc.setFillColor(255, 255, 255);
        doc.setFont(undefined, 'normal');

        doc.rect(poaCol1X, poaTableY, poaColWidths[0], poaCellHeight, 'FD');
        doc.setFillColor(...colors.tableHeader);
        doc.rect(poaCol2X, poaTableY, poaColWidths[1], poaCellHeight, 'FD');
        doc.rect(poaCol3X, poaTableY, poaColWidths[2], poaCellHeight, 'FD');
        doc.rect(poaCol4X, poaTableY, poaColWidths[3], poaCellHeight, 'FD');
        doc.rect(poaCol5X, poaTableY, poaColWidths[4], poaCellHeight, 'FD');

        const field1 = new doc.AcroFormTextField();
        field1.fieldName = `poa_personal_care_${i}_name`;
        field1.Rect = [poaCol1X + 0.3, poaTableY + 0.3, poaColWidths[0] - 0.6, poaCellHeight - 0.6];
        field1.fontSize = 7;
        field1.textColor = [0, 0, 0];
        field1.borderStyle = 'none';
        field1.value = poaData?.name || '';
        doc.addField(field1);

        const field2 = new doc.AcroFormTextField();
        field2.fieldName = `poa_personal_care_${i}_phone`;
        field2.Rect = [poaCol2X + 0.3, poaTableY + 0.3, poaColWidths[1] - 0.6, poaCellHeight - 0.6];
        field2.fontSize = 7;
        field2.textColor = [0, 0, 0];
        field2.borderStyle = 'none';
        field2.value = poaData?.phone || '';
        doc.addField(field2);

        const field3 = new doc.AcroFormTextField();
        field3.fieldName = `poa_personal_care_${i}_email`;
        field3.Rect = [poaCol3X + 0.3, poaTableY + 0.3, poaColWidths[2] - 0.6, poaCellHeight - 0.6];
        field3.fontSize = 7;
        field3.textColor = [0, 0, 0];
        field3.borderStyle = 'none';
        field3.value = poaData?.email || '';
        doc.addField(field3);

        const field4 = new doc.AcroFormTextField();
        field4.fieldName = `poa_personal_care_${i}_relationship`;
        field4.Rect = [poaCol4X + 0.3, poaTableY + 0.3, poaColWidths[3] - 0.6, poaCellHeight - 0.6];
        field4.fontSize = 7;
        field4.textColor = [0, 0, 0];
        field4.borderStyle = 'none';
        field4.value = poaData?.relationship || '';
        doc.addField(field4);

        const field5 = new doc.AcroFormTextField();
        field5.fieldName = `poa_personal_care_${i}_providedcopy`;
        field5.Rect = [poaCol5X + 0.3, poaTableY + 0.3, poaColWidths[4] - 0.6, poaCellHeight - 0.6];
        field5.fontSize = 7;
        field5.textColor = [0, 0, 0];
        field5.borderStyle = 'none';
        field5.value = poaData?.providedCopy === 'yes_copy' ? 'Yes - they have a copy' :
                        poaData?.providedCopy === 'yes_instructions' ? 'Yes - instructions provided' :
                        poaData?.providedCopy === 'no' ? 'No' : '';
        doc.addField(field5);

        poaTableY += poaCellHeight;

        if (poaData?.country || poaData?.city) {
          if (poaTableY > 270) {
            addPage();
            poaTableY = 12;
          }

          doc.setFontSize(7);
          doc.setFont(undefined, 'italic');
          const residenceText = `   Residence: ${poaData?.country === 'Other' ? (poaData?.otherCountry || 'Unknown') : (poaData?.country || 'N/A')}${poaData?.country === 'Canada' && poaData?.province ? `, ${poaData.province}` : ''}${poaData?.city ? `, ${poaData.city}` : ''}`;
          doc.text(residenceText, poaCol1X, poaTableY + 4);
          poaTableY += 6;
        }
      }

      yPosition = poaTableY + 10;
    }

    if (formData.client1PoaPersonalCareDocLocation) {
      if (yPosition > 260) {
        addPage();
        yPosition = 12;
      }

      doc.setFontSize(9);
      doc.setFont(undefined, 'bold');
      doc.text('Document Location:', margin, yPosition);
      yPosition += 6;

      doc.setFont(undefined, 'normal');
      const docLocationField = new doc.AcroFormTextField();
      docLocationField.fieldName = 'client1_poa_personal_care_doc_location';
      docLocationField.Rect = [margin, yPosition, fieldWidth, 8];
      docLocationField.fontSize = 9;
      docLocationField.textColor = [0, 0, 0];
      docLocationField.value = formData.client1PoaPersonalCareDocLocation || '';
      doc.addField(docLocationField);
      yPosition += 10;
    }

    if (formData.client1PoaPersonalCareHasDocCopy) {
      if (yPosition > 260) {
        addPage();
        yPosition = 12;
      }

      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      const clientName = formData.fullName || 'The client';
      let docCopyText = '';
      if (formData.client1PoaPersonalCareHasDocCopy === 'yes_copy') {
        docCopyText = `${clientName} indicated that the Power(s) of Attorney for Personal Care have a copy of the most recent documentation in their files.`;
      } else if (formData.client1PoaPersonalCareHasDocCopy === 'yes_instructions') {
        docCopyText = `${clientName} indicated that the Power(s) of Attorney for Personal Care have instructions on where/how to access the most recent documentation.`;
      } else if (formData.client1PoaPersonalCareHasDocCopy === 'no') {
        docCopyText = `${clientName} indicated that the Power(s) of Attorney for Personal Care do not have access to the most recent documentation.`;
      }
      const docCopyLines = doc.splitTextToSize(docCopyText, fieldWidth);
      doc.text(docCopyLines, margin, yPosition);
      yPosition += docCopyLines.length * 5 + 5;
    }
  }

  if (formData.client1HasLivingWill === 'yes') {
    if (yPosition > 260) {
      addPage();
      yPosition = 12;
    }

    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    const clientName = formData.fullName || 'The client';
    const livingWillText = `Note that ${clientName}'s Power of Attorney(ies) for Personal Care also have Living Will instructions.`;
    const livingWillLines = doc.splitTextToSize(livingWillText, fieldWidth);
    doc.text(livingWillLines, margin, yPosition);
    yPosition += livingWillLines.length * 5 + 5;
  }

  if (formData.client2HasPoaPersonalCare === 'yes') {
    const client1Name = formData.fullName || 'Client 1';
    const client2Name = formData.spouseName || 'Client 2';

    checkPageBreak(40);

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');

    if (formData.client2SpouseIsPoaPersonalCare === 'yes') {
      doc.text(`${client2Name}'s Power of Attorney for Personal Care:`, margin, yPosition);
      yPosition += 6;
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.text(`${client1Name} is the primary Power of Attorney for Personal Care.`, margin, yPosition);
      yPosition += 6;

      if (formData.client2PoaPersonalCareHasDocCopy) {
        const docCopyLabel =
          formData.client2PoaPersonalCareHasDocCopy === 'yes_on_file' ? 'Yes, on their files' :
          formData.client2PoaPersonalCareHasDocCopy === 'no_can_access' ? 'No, but they know how to access the document if/when necessary' :
          'No, this has not been discussed';
        doc.text(`Document copy status: ${docCopyLabel}`, margin, yPosition);
        yPosition += 6;
      }
    } else if (formData.spousesPoaPersonalCare === 'yes') {
      doc.text(`${client2Name}'s Power of Attorney for Personal Care:`, margin, yPosition);
      yPosition += 6;
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.text(`(Note: (${client1Name}) and (${client2Name}), are each other's primary POA for Personal Care)`, margin, yPosition);
      yPosition += 6;
    } else if (formData.client2PoaPersonalCareName) {
      doc.text(`${client2Name}'s Primary Power of Attorney for Personal Care:`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      {
        const poaLabelColW = 70;
        const poaValueColW = fieldWidth - poaLabelColW;
        const poaRowH = 8;
        const provinceLabels: Record<string, string> = {
          alberta: 'Alberta', british_columbia: 'British Columbia', manitoba: 'Manitoba',
          new_brunswick: 'New Brunswick', newfoundland_labrador: 'Newfoundland and Labrador',
          northwest_territories: 'Northwest Territories', nova_scotia: 'Nova Scotia',
          nunavut: 'Nunavut', ontario: 'Ontario', prince_edward_island: 'Prince Edward Island',
          quebec: 'Quebec', saskatchewan: 'Saskatchewan', yukon: 'Yukon'
        };
        let locationVal = '';
        if (formData.client2PoaPersonalCareProvince) {
          const pl = provinceLabels[formData.client2PoaPersonalCareProvince] || formData.client2PoaPersonalCareProvince;
          locationVal = formData.client2PoaPersonalCareCity ? `${formData.client2PoaPersonalCareCity}, ${pl}` : pl;
        } else if (formData.client2PoaPersonalCareCountry) {
          locationVal = formData.client2PoaPersonalCareCity ? `${formData.client2PoaPersonalCareCity}, ${formData.client2PoaPersonalCareCountry}` : formData.client2PoaPersonalCareCountry;
        }
        const docCopyVal = formData.client2PoaPersonalCareHasDocCopy === 'yes_on_file' ? 'Yes, on their files' :
          formData.client2PoaPersonalCareHasDocCopy === 'no_can_access' ? 'No, but they know how to access the document if/when necessary' :
          formData.client2PoaPersonalCareHasDocCopy ? 'No, this has not been discussed' : '';
        const c2PcRows: [string, string, string][] = [
          ['Name:', formData.client2PoaPersonalCareName || '', 'c2_poa_pc_name'],
          ['Phone:', formData.client2PoaPersonalCarePhone || '', 'c2_poa_pc_phone'],
          ['Email:', formData.client2PoaPersonalCareEmail || '', 'c2_poa_pc_email'],
          ['Relationship:', formData.client2PoaPersonalCareRelationship || '', 'c2_poa_pc_relationship'],
          ['Location:', locationVal, 'c2_poa_pc_location'],
          ['Document copy:', docCopyVal, 'c2_poa_pc_doc_copy'],
        ].filter(([, val]) => val) as [string, string, string][];
        c2PcRows.forEach(([label, val, fieldName]) => {
          doc.setFont(undefined, 'normal');
          doc.setFontSize(9);
          const labelLines = doc.splitTextToSize(label, poaLabelColW - 3);
          const dynH = Math.max(poaRowH, labelLines.length * 5 + 3);
          checkPageBreak(dynH + 2);
          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);
          doc.setFillColor(255, 255, 255);
          doc.rect(margin, yPosition, poaLabelColW, dynH, 'FD');
          doc.rect(margin + poaLabelColW, yPosition, poaValueColW, dynH, 'FD');
          doc.setTextColor(...colors.darkText);
          doc.text(labelLines, margin + 2, yPosition + 5.5);
          const fld = new doc.AcroFormTextField();
          fld.fieldName = fieldName;
          fld.Rect = [margin + poaLabelColW + 0.5, yPosition + 0.5, poaValueColW - 1, dynH - 1];
          fld.fontSize = 9;
          fld.textColor = colors.darkText;
          fld.borderStyle = 'none';
          fld.value = val;
          doc.addField(fld);
          yPosition += dynH;
        });
        yPosition += 4;
      }

      doc.setFontSize(9);
      doc.setFont(undefined, 'bold');
      doc.text('POA for Personal Care Type:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      doc.text('☐ Enduring/Continuing   ☐ Springing', margin + 55, yPosition);
      yPosition += 8;
    } else {
      doc.text(`${client2Name}'s Power of Attorney for Personal Care:`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 8;
    }
  }

  if (formData.client2HasContingentPoaPersonalCare === 'no') {
    const client2Name = formData.spouseName || 'Client 2';

    if (yPosition > 260) {
      addPage();
      yPosition = 12;
    }

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Alternate Power(s) of Attorney for Personal Care:', margin, yPosition);
    yPosition += 6;
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text(`${client2Name} indicated that they have not named alternate Power(s) of Attorney for Personal Care.`, margin, yPosition);
    yPosition += 10;
  } else if (formData.client2HasContingentPoaPersonalCare === 'yes' && formData.client2PoaPersonalCareCount) {
    const poaCount = parseInt(formData.client2PoaPersonalCareCount, 10);

    const poaCellHeight = 6;
    checkPageBreak(8 + poaCellHeight + poaCount * poaCellHeight + 4);

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Alternate Power(s) of Attorney for Personal Care:', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 8;

    const poaColWidths = [fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25];
    let poaTableY = yPosition;

    doc.setDrawColor(...colors.tableBorder);
    doc.setLineWidth(0.3);
    doc.setFillColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...colors.darkText);

    const poaCol1X = margin;
    const poaCol2X = margin + poaColWidths[0];
    const poaCol3X = margin + poaColWidths[0] + poaColWidths[1];
    const poaCol4X = margin + poaColWidths[0] + poaColWidths[1] + poaColWidths[2];

    doc.rect(poaCol1X, poaTableY, poaColWidths[0], poaCellHeight, 'FD');
    doc.rect(poaCol2X, poaTableY, poaColWidths[1], poaCellHeight, 'FD');
    doc.rect(poaCol3X, poaTableY, poaColWidths[2], poaCellHeight, 'FD');
    doc.rect(poaCol4X, poaTableY, poaColWidths[3], poaCellHeight, 'FD');

    doc.text('Name:', poaCol1X + 0.5, poaTableY + 4);
    doc.text('Phone Number:', poaCol2X + 0.5, poaTableY + 4);
    doc.text('Email Address:', poaCol3X + 0.5, poaTableY + 4);
    doc.text('Relationship to You:', poaCol4X + 0.5, poaTableY + 4);

    poaTableY += poaCellHeight;

    for (let i = 0; i < poaCount; i++) {
      const poaData = formData.client2PoaPersonalCareData?.[i];

      doc.setDrawColor(...colors.tableBorder);
      doc.setLineWidth(0.3);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'normal');

      doc.rect(poaCol1X, poaTableY, poaColWidths[0], poaCellHeight, 'FD');
      doc.setFillColor(...colors.tableHeader);
      doc.rect(poaCol2X, poaTableY, poaColWidths[1], poaCellHeight, 'FD');
      doc.rect(poaCol3X, poaTableY, poaColWidths[2], poaCellHeight, 'FD');
      doc.rect(poaCol4X, poaTableY, poaColWidths[3], poaCellHeight, 'FD');

      const field1 = new doc.AcroFormTextField();
      field1.fieldName = `poa_personal_care_client2_${i}_name`;
      field1.Rect = [poaCol1X + 0.3, poaTableY + 0.3, poaColWidths[0] - 0.6, poaCellHeight - 0.6];
      field1.fontSize = 7;
      field1.textColor = [0, 0, 0];
      field1.borderStyle = 'none';
      field1.value = poaData?.name || '';
      doc.addField(field1);

      const field2 = new doc.AcroFormTextField();
      field2.fieldName = `poa_personal_care_client2_${i}_phone`;
      field2.Rect = [poaCol2X + 0.3, poaTableY + 0.3, poaColWidths[1] - 0.6, poaCellHeight - 0.6];
      field2.fontSize = 7;
      field2.textColor = [0, 0, 0];
      field2.borderStyle = 'none';
      field2.value = poaData?.phone || '';
      doc.addField(field2);

      const field3 = new doc.AcroFormTextField();
      field3.fieldName = `poa_personal_care_client2_${i}_email`;
      field3.Rect = [poaCol3X + 0.3, poaTableY + 0.3, poaColWidths[2] - 0.6, poaCellHeight - 0.6];
      field3.fontSize = 7;
      field3.textColor = [0, 0, 0];
      field3.borderStyle = 'none';
      field3.value = poaData?.email || '';
      doc.addField(field3);

      const field4 = new doc.AcroFormTextField();
      field4.fieldName = `poa_personal_care_client2_${i}_relationship`;
      field4.Rect = [poaCol4X + 0.3, poaTableY + 0.3, poaColWidths[3] - 0.6, poaCellHeight - 0.6];
      field4.fontSize = 7;
      field4.textColor = [0, 0, 0];
      field4.borderStyle = 'none';
      field4.value = poaData?.relationship || '';
      doc.addField(field4);

      poaTableY += poaCellHeight;

      if (poaData?.country || poaData?.city) {
        if (poaTableY > 270) {
          addPage();
          poaTableY = 12;
        }

        doc.setFontSize(7);
        doc.setFont(undefined, 'italic');
        const residenceText = `   Residence: ${poaData?.country === 'Other' ? (poaData?.otherCountry || 'Unknown') : (poaData?.country || 'N/A')}${poaData?.country === 'Canada' && poaData?.province ? `, ${poaData.province}` : ''}${poaData?.city ? `, ${poaData.city}` : ''}`;
        doc.text(residenceText, poaCol1X, poaTableY + 4);
        poaTableY += 6;
      }
    }

    yPosition = poaTableY + 10;

    if (formData.client2PoaPersonalCareDocLocation) {
      if (yPosition > 260) {
        addPage();
        yPosition = 12;
      }

      doc.setFontSize(9);
      doc.setFont(undefined, 'bold');
      doc.text('Document Location:', margin, yPosition);
      yPosition += 6;

      doc.setFont(undefined, 'normal');
      const docLocationField = new doc.AcroFormTextField();
      docLocationField.fieldName = 'client2_poa_personal_care_doc_location';
      docLocationField.Rect = [margin, yPosition, fieldWidth, 8];
      docLocationField.fontSize = 9;
      docLocationField.textColor = [0, 0, 0];
      docLocationField.value = formData.client2PoaPersonalCareDocLocation || '';
      doc.addField(docLocationField);
      yPosition += 10;
    }

    if (formData.client2PoaPersonalCareHasDocCopy) {
      if (yPosition > 260) {
        addPage();
        yPosition = 12;
      }

      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      const client2Name = formData.spouseName || 'Client 2';
      let docCopyText = '';
      if (formData.client2PoaPersonalCareHasDocCopy === 'yes_copy') {
        docCopyText = `${client2Name} indicated that the Power(s) of Attorney for Personal Care have a copy of the most recent documentation in their files.`;
      } else if (formData.client2PoaPersonalCareHasDocCopy === 'yes_instructions') {
        docCopyText = `${client2Name} indicated that the Power(s) of Attorney for Personal Care have instructions on where/how to access the most recent documentation.`;
      } else if (formData.client2PoaPersonalCareHasDocCopy === 'no') {
        docCopyText = `${client2Name} indicated that the Power(s) of Attorney for Personal Care do not have access to the most recent documentation.`;
      }
      const docCopyLines = doc.splitTextToSize(docCopyText, fieldWidth);
      doc.text(docCopyLines, margin, yPosition);
      yPosition += docCopyLines.length * 5 + 5;
    }

    if (formData.client2HasLivingWill === 'yes') {
      if (yPosition > 260) {
        addPage();
        yPosition = 12;
      }

      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      const livingWillText = `Note that ${client2Name}'s Power of Attorney(ies) for Personal Care also have Living Will instructions.`;
      const livingWillLines = doc.splitTextToSize(livingWillText, fieldWidth);
      doc.text(livingWillLines, margin, yPosition);
      yPosition += livingWillLines.length * 5 + 5;
    }
  }

  // Additional Reading for Powers of Attorney for Personal Care
  if (formData.client1HasWill === 'yes') {
    if (yPosition > 150) {
      addPage();
      yPosition = 12;
    }

    doc.setFont(undefined, 'bold');
    doc.setFontSize(11);
    doc.text('Additional Reading - Powers of Attorney for Personal Care', margin, yPosition);
    yPosition += 8;

    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);

    const poaReadingText = [
      'In Ontario, a Power of Attorney for Personal Care is a legal document that allows a person (the "grantor" or',
      '"Donor") to appoint someone they trust (the "attorney") to make decisions about their personal life and healthcare',
      'if they become mentally incapable of doing so themselves.',
      '',
      'The following outline details the legal framework in Ontario, responsibilities, and best practices for creating an',
      'effective plan.',
      ''
    ];

    poaReadingText.forEach(line => {
      if (yPosition > 280) {
        addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 1
    doc.setFont(undefined, 'bold');
    doc.setFontSize(9);
    if (yPosition > 270) {
      addPage();
      yPosition = 12;
    }
    doc.text('1. How does a Power of Attorney for Personal Care Come into Force?', margin, yPosition);
    yPosition += 6;

    doc.setFont(undefined, 'normal');
    const section1Text = [
      'Unlike a Power of Attorney for Property, which can be effective immediately, a Power of Attorney for Personal',
      'Care is typically "springing" or "enduring"',
      '',
      '• Capacity Trigger: It generally only comes into effect when the grantor is determined to be mentally incapable',
      '  of making their own personal care decisions.',
      '• Defining Incapacity: A person is considered "incapable" if they can no longer understand information relevant',
      '  to making a personal care decision or appreciate the foreseeable consequences of a decision (or lack thereof).',
      '• Activation Mechanisms: To avoid ambiguity, the document can specify a triggering event, such as a functional',
      '  capacity assessment performed by a physician or another qualified person.',
      ''
    ];

    section1Text.forEach(line => {
      if (yPosition > 280) {
        addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 2
    doc.setFont(undefined, 'bold');
    if (yPosition > 270) {
      addPage();
      yPosition = 12;
    }
    doc.text('Responsibilities and Duties of the Attorney:', margin, yPosition);
    yPosition += 6;

    doc.setFont(undefined, 'normal');
    const section2Text = [
      'An attorney for personal care acts as a fiduciary, meaning they must act with the utmost good faith and always in',
      'the best interests of the grantor. Their specific responsibilities in Ontario include:',
      '',
      '• Healthcare and Treatment: Consenting to or refusing medical treatments, diagnostic tests, and surgical',
      '  procedures.',
      '• Living Arrangements: Deciding where the grantor lives, such as moving them into an assisted living facility or',
      '  nursing home.',
      '• Daily Quality of Life: Managing decisions regarding diet and nutrition, clothing, hygiene, and general safety.',
      '• Following Wishes: The attorney must follow any specific instructions or known wishes the grantor has expressed',
      '  while capable. If wishes are unknown, the attorney must act based on the grantor\'s known values and beliefs to',
      '  determine their best interests.',
      ''
    ];

    section2Text.forEach(line => {
      if (yPosition > 280) {
        addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 3
    doc.setFont(undefined, 'bold');
    if (yPosition > 270) {
      addPage();
      yPosition = 12;
    }
    doc.text('Revocation and Rescinding of the POA:', margin, yPosition);
    yPosition += 6;

    doc.setFont(undefined, 'normal');
    const section3Text = [
      'As long as the grantor remains mentally capable, they maintain full control over the status of their POA:',
      '',
      '• Revocation: The grantor can revoke a POA at any time by providing written notice to the attorney and any',
      '  relevant parties (such as doctors or financial institutions).',
      '• New Documents: Executing a new POA typically revokes any previous version unless the document explicitly',
      '  states that multiple POAs are intended to coexist.',
      '• Death: A POA automatically terminates upon the death of the grantor, at which point the Will becomes the',
      '  governing document.',
      '• Marital Status: In most jurisdictions, including Ontario, a POA in favour of a spouse is not automatically',
      '  revoked by separation or divorce, it must be explicitly rescinded by the grantor.',
      ''
    ];

    section3Text.forEach(line => {
      if (yPosition > 280) {
        addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 4
    doc.setFont(undefined, 'bold');
    if (yPosition > 270) {
      addPage();
      yPosition = 12;
    }
    doc.text('Best Practices for an Effective POA:', margin, yPosition);
    yPosition += 6;

    doc.setFont(undefined, 'normal');
    const section4Text = [
      'To ensure the attorney is in the best position to provide seamless care, the following practices are',
      'recommended:',
      '',
      '• Include a "Living Will": Also known as a personal directive, this document provides specific guidance on',
      '  end-of-life care, such as Do Not Resuscitate (DNR) orders or instructions regarding life support. This takes the',
      '  emotion burden off the attorney by documenting exactly what the grantor wants.',
      '• Choose a Competent Succession: Grantors should name a contingent or alternate attorney in case the primary',
      '  choice dies, becomes incapable, or is otherwise unable to act.',
      '• Address Residency and Availability: The attorney should ideally live in the same jurisdiction as the grantor to',
      '  avoid practical and regulatory challenges in giving instructions to local healthcare providers.',
      '• Selection and Communication: The attorney should be someone trustworthy and organized. It is essential to',
      '  discuss these roles with the intended attorney beforehand so they are not surprised by their responsibilities',
      '  during a crisis.',
      '• Strict Witnessing Rules: In Ontario, a POA is only valid if witnessed by people who do not have a conflict of',
      '  interest. A witness cannot be the attorney (or their spouse), the grantor\'s spouse, or a child of the grantor.'
    ];

    section4Text.forEach(line => {
      if (yPosition > 280) {
        addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Check if any POA for Personal Care lives in a different location than the client
    const client1Province = formData.province;
    const client1Country = formData.country || 'Canada';
    const client2Province = formData.spouseProvince;
    const client2Country = formData.spouseCountry || (formData.maritalStatus === 'married' || formData.maritalStatus === 'common_law' ? 'Canada' : undefined);

    let hasGeographicConcern = false;

    // Check client1's POAs
    if (formData.client1PoaPersonalCareData && Array.isArray(formData.client1PoaPersonalCareData)) {
      for (const poa of formData.client1PoaPersonalCareData) {
        if (poa.country && poa.country !== client1Country) {
          hasGeographicConcern = true;
          break;
        }
        if (poa.country === 'Canada' && client1Country === 'Canada' && poa.province && poa.province !== client1Province) {
          hasGeographicConcern = true;
          break;
        }
      }
    }

    // Check client2's POAs if not already found
    if (!hasGeographicConcern && formData.client2PoaPersonalCareData && Array.isArray(formData.client2PoaPersonalCareData) && client2Country) {
      for (const poa of formData.client2PoaPersonalCareData) {
        if (poa.country && poa.country !== client2Country) {
          hasGeographicConcern = true;
          break;
        }
        if (poa.country === 'Canada' && client2Country === 'Canada' && poa.province && poa.province !== client2Province) {
          hasGeographicConcern = true;
          break;
        }
      }
    }

    // Add Geographic/Jurisdictional Concerns section if needed
    if (hasGeographicConcern) {
      yPosition += 4;

      doc.setFont(undefined, 'bold');
      if (yPosition > 270) {
        addPage();
        yPosition = 12;
      }
      doc.text('Geographic / Jurisdictional Concerns', margin, yPosition);
      yPosition += 6;

      doc.setFont(undefined, 'normal');
      const geoConcernText = [
        'It was indicated that a Power of Attorney for Personal Care resides in a different province, territory or',
        'country. If a Power of Attorney for Personal Care (POAPC) lives in a different province or country, practical',
        'and legal complications can arise when health decisions need to be made quickly. Health-care providers often',
        'prefer dealing with someone who can be physically present to consult with doctors, review care options, and',
        'sign documents. If the attorney cannot attend in person, it may slow decision-making or create communication',
        'gaps during critical moments. In some cases, institutions may be unfamiliar with out-of-province documents or',
        'require additional verification before accepting instructions, which can create delays in urgent care situations.',
        '',
        'To address this, many people structure their personal care powers of attorney with multiple layers of support.',
        'One option is appointing a local primary attorney for personal care who can be physically present with the',
        'patient and medical team. Another approach is naming co-attorneys, pairing a trusted local person with a family',
        'member who lives elsewhere so decisions can still reflect the broader family\'s wishes. Alternatively, the',
        'out-of-province person can remain the primary attorney while a local alternate attorney is named who can step',
        'in if distance becomes a barrier. This structure helps ensure that someone trusted, available, and familiar with',
        'the local healthcare system can act quickly if personal care decisions are required.'
      ];

      geoConcernText.forEach(line => {
        if (yPosition > 280) {
          addPage();
          yPosition = 12;
        }
        doc.text(line, margin, yPosition);
        yPosition += 4.5;
      });
    }

    yPosition += 12;
  }

  if (formData.client1HasPoaProperty === 'yes') {
    const client1Name = formData.fullName || 'Client 1';
    const client2Name = formData.spouseName || 'Client 2';

    if (yPosition > 230) {
      addPage();
      yPosition = 12;
    }

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');

    if (formData.spouseIsPoaProperty === 'yes') {
      doc.text(`${client1Name}'s Powers of Attorney for Property:`, margin, yPosition);
      yPosition += 6;
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.text(`${client1Name} indicated that ${client2Name} (spouse/common law partner) is their POA for Property.`, margin, yPosition);
      yPosition += 6;

      if (formData.spousePoaPropertyHasDocAccess) {
        const docAccessLabel =
          formData.spousePoaPropertyHasDocAccess === 'yes_copy' ? 'Yes - they have a copy' :
          formData.spousePoaPropertyHasDocAccess === 'yes_instructions' ? 'Yes - they have instructions on where/how to access the documentation' :
          'No';
        doc.text(`Does ${client2Name} have access to ${client1Name}'s most recent POA for Property documentation? ${docAccessLabel}`, margin, yPosition);
        yPosition += 6;
      }
    } else if (formData.spousesPoaProperty === 'yes') {
      doc.text('Powers of Attorney for Property:', margin, yPosition);
      yPosition += 6;
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.text(`(${client1Name}) and (${client2Name}), indicated that they are each other's Powers of Attorney for Property.`, margin, yPosition);
      yPosition += 6;
    } else {
      doc.text(`${client1Name}'s Powers of Attorney for Property:`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 8;
    }
  }

  if (formData.client1HasContingentPoaProperty === 'no') {
    const client1Name = formData.fullName || 'Client 1';

    if (yPosition > 260) {
      addPage();
      yPosition = 12;
    }

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Contingent Power(s) of Attorney:', margin, yPosition);
    yPosition += 6;
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text(`${client1Name} indicated that they have not named other or contingent Power(s) of Attorney for Property - consider updating this.`, margin, yPosition);
    yPosition += 10;
  } else if (formData.client1HasContingentPoaProperty === 'yes' && formData.client1PoaPropertyCount) {
    const poaPropertyCount = parseInt(formData.client1PoaPropertyCount, 10);

    if (yPosition > 210) {
      addPage();
      yPosition = 12;
    }

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Contingent Power(s) of Attorney:', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 8;

    const poaPropertyCellHeight = 6;
    const poaPropertyColWidths = [fieldWidth * 0.25, fieldWidth * 0.2, fieldWidth * 0.27, fieldWidth * 0.28];
    let poaPropertyTableY = yPosition;

    doc.setDrawColor(...colors.tableBorder);
    doc.setLineWidth(0.3);
    doc.setFillColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...colors.darkText);

    const poaPropertyCol1X = margin;
    const poaPropertyCol2X = margin + poaPropertyColWidths[0];
    const poaPropertyCol3X = margin + poaPropertyColWidths[0] + poaPropertyColWidths[1];
    const poaPropertyCol4X = margin + poaPropertyColWidths[0] + poaPropertyColWidths[1] + poaPropertyColWidths[2];

    doc.rect(poaPropertyCol1X, poaPropertyTableY, poaPropertyColWidths[0], poaPropertyCellHeight, 'FD');
    doc.rect(poaPropertyCol2X, poaPropertyTableY, poaPropertyColWidths[1], poaPropertyCellHeight, 'FD');
    doc.rect(poaPropertyCol3X, poaPropertyTableY, poaPropertyColWidths[2], poaPropertyCellHeight, 'FD');
    doc.rect(poaPropertyCol4X, poaPropertyTableY, poaPropertyColWidths[3], poaPropertyCellHeight, 'FD');

    doc.text('Name:', poaPropertyCol1X + 0.5, poaPropertyTableY + 4);
    doc.text('Phone Number:', poaPropertyCol2X + 0.5, poaPropertyTableY + 4);
    doc.text('Email Address:', poaPropertyCol3X + 0.5, poaPropertyTableY + 4);
    doc.text('Relationship to You:', poaPropertyCol4X + 0.5, poaPropertyTableY + 4);

    poaPropertyTableY += poaPropertyCellHeight;

    for (let i = 0; i < poaPropertyCount; i++) {
      if (poaPropertyTableY > 275) {
        addPage();
        poaPropertyTableY = 12;
      }

      doc.setDrawColor(...colors.tableBorder);
      doc.setLineWidth(0.3);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'normal');

      doc.rect(poaPropertyCol1X, poaPropertyTableY, poaPropertyColWidths[0], poaPropertyCellHeight, 'FD');
      doc.setFillColor(...colors.tableHeader);
      doc.rect(poaPropertyCol2X, poaPropertyTableY, poaPropertyColWidths[1], poaPropertyCellHeight, 'FD');
      doc.rect(poaPropertyCol3X, poaPropertyTableY, poaPropertyColWidths[2], poaPropertyCellHeight, 'FD');
      doc.rect(poaPropertyCol4X, poaPropertyTableY, poaPropertyColWidths[3], poaPropertyCellHeight, 'FD');

      const poaPropertyData = formData.client1PoaPropertyData?.[i];

      const field1 = new doc.AcroFormTextField();
      field1.fieldName = `poa_property_${i}_name`;
      field1.Rect = [poaPropertyCol1X + 0.3, poaPropertyTableY + 0.3, poaPropertyColWidths[0] - 0.6, poaPropertyCellHeight - 0.6];
      field1.fontSize = 7;
      field1.textColor = [0, 0, 0];
      field1.borderStyle = 'none';
      field1.value = poaPropertyData?.name || '';
      doc.addField(field1);

      const field2 = new doc.AcroFormTextField();
      field2.fieldName = `poa_property_${i}_phone`;
      field2.Rect = [poaPropertyCol2X + 0.3, poaPropertyTableY + 0.3, poaPropertyColWidths[1] - 0.6, poaPropertyCellHeight - 0.6];
      field2.fontSize = 7;
      field2.textColor = [0, 0, 0];
      field2.borderStyle = 'none';
      field2.value = poaPropertyData?.phone || '';
      doc.addField(field2);

      const field3 = new doc.AcroFormTextField();
      field3.fieldName = `poa_property_${i}_email`;
      field3.Rect = [poaPropertyCol3X + 0.3, poaPropertyTableY + 0.3, poaPropertyColWidths[2] - 0.6, poaPropertyCellHeight - 0.6];
      field3.fontSize = 7;
      field3.textColor = [0, 0, 0];
      field3.borderStyle = 'none';
      field3.value = poaPropertyData?.email || '';
      doc.addField(field3);

      const field4 = new doc.AcroFormTextField();
      field4.fieldName = `poa_property_${i}_relationship`;
      field4.Rect = [poaPropertyCol4X + 0.3, poaPropertyTableY + 0.3, poaPropertyColWidths[3] - 0.6, poaPropertyCellHeight - 0.6];
      field4.fontSize = 7;
      field4.textColor = [0, 0, 0];
      field4.borderStyle = 'none';
      field4.value = poaPropertyData?.relationship || '';
      doc.addField(field4);

      poaPropertyTableY += poaPropertyCellHeight;

      if (poaPropertyData?.country || poaPropertyData?.city) {
        if (poaPropertyTableY > 270) {
          addPage();
          poaPropertyTableY = 12;
        }

        doc.setFontSize(7);
        doc.setFont(undefined, 'italic');
        const residenceText = `   Residence: ${poaPropertyData?.country === 'Other' ? (poaPropertyData?.otherCountry || 'Unknown') : (poaPropertyData?.country || 'N/A')}${poaPropertyData?.country === 'Canada' && poaPropertyData?.province ? `, ${poaPropertyData.province}` : ''}${poaPropertyData?.city ? `, ${poaPropertyData.city}` : ''}`;
        doc.text(residenceText, poaPropertyCol1X, poaPropertyTableY + 4);
        poaPropertyTableY += 6;
      }
    }

    yPosition = poaPropertyTableY + 10;
  }

  if (formData.client1PoaPropertyHasDocCopy) {
    if (yPosition > 260) {
      addPage();
      yPosition = 12;
    }

    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    const client1Name = formData.fullName || 'The client';
    let docCopyText = '';
    if (formData.client1PoaPropertyHasDocCopy === 'yes_copy') {
      docCopyText = `${client1Name} indicated that the Power(s) of Attorney for Property have a copy of the most recent documentation in their files.`;
    } else if (formData.client1PoaPropertyHasDocCopy === 'yes_instructions') {
      docCopyText = `${client1Name} indicated that the Power(s) of Attorney for Property have instructions on where/how to access the most recent documentation.`;
    } else if (formData.client1PoaPropertyHasDocCopy === 'no') {
      docCopyText = `${client1Name} indicated that the Power(s) of Attorney for Property do not have access to the most recent documentation.`;
    }
    const docCopyLines = doc.splitTextToSize(docCopyText, fieldWidth);
    doc.text(docCopyLines, margin, yPosition);
    yPosition += docCopyLines.length * 5 + 10;
  }

  if (formData.client2HasPoaProperty === 'yes') {
    const client2Name = formData.spouseName || 'Client 2';

    if (yPosition > 230) {
      addPage();
      yPosition = 12;
    }

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');

    if (formData.client2SpouseIsPoaProperty === 'yes') {
      const client1Name = formData.fullName || 'Client 1';
      doc.text(`${client2Name}'s Powers of Attorney for Property:`, margin, yPosition);
      yPosition += 6;
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.text(`${client2Name} indicated that ${client1Name} (spouse/common law partner) is their POA for Property.`, margin, yPosition);
      yPosition += 6;

      if (formData.client2SpousePoaPropertyHasDocAccess) {
        const docAccessLabel =
          formData.client2SpousePoaPropertyHasDocAccess === 'yes_copy' ? 'Yes - they have a copy' :
          formData.client2SpousePoaPropertyHasDocAccess === 'yes_instructions' ? 'Yes - they have instructions on where/how to access the documentation' :
          'No';
        doc.text(`Does ${client1Name} have access to ${client2Name}'s most recent POA for Property documentation? ${docAccessLabel}`, margin, yPosition);
        yPosition += 6;
      }
    } else if (formData.spousesPoaProperty === 'yes') {
      const client1Name = formData.fullName || 'Client 1';
      doc.text(`${client2Name}'s Powers of Attorney for Property:`, margin, yPosition);
      yPosition += 6;
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.text(`(Note: (${client1Name}) and (${client2Name}), are each other's primary POA for Property)`, margin, yPosition);
      yPosition += 6;
    } else {
      doc.text(`${client2Name}'s Powers of Attorney for Property:`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 8;
    }
  }

  if (formData.client2HasContingentPoaProperty === 'no') {
    const client2Name = formData.spouseName || 'Client 2';

    if (yPosition > 260) {
      addPage();
      yPosition = 12;
    }

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Contingent Power(s) of Attorney:', margin, yPosition);
    yPosition += 6;
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text(`${client2Name} indicated that they have not named other or contingent Power(s) of Attorney for Property - consider updating this.`, margin, yPosition);
    yPosition += 10;
  } else if (formData.client2HasContingentPoaProperty === 'yes' && formData.client2PoaPropertyCount) {
    const poaPropertyCount = parseInt(formData.client2PoaPropertyCount, 10);

    if (yPosition > 210) {
      addPage();
      yPosition = 12;
    }

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Contingent Power(s) of Attorney:', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 8;

    const poaPropertyCellHeight = 6;
    const poaPropertyColWidths = [fieldWidth * 0.25, fieldWidth * 0.2, fieldWidth * 0.27, fieldWidth * 0.28];
    let poaPropertyTableY = yPosition;

    doc.setDrawColor(...colors.tableBorder);
    doc.setLineWidth(0.3);
    doc.setFillColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...colors.darkText);

    const poaPropertyCol1X = margin;
    const poaPropertyCol2X = margin + poaPropertyColWidths[0];
    const poaPropertyCol3X = margin + poaPropertyColWidths[0] + poaPropertyColWidths[1];
    const poaPropertyCol4X = margin + poaPropertyColWidths[0] + poaPropertyColWidths[1] + poaPropertyColWidths[2];

    doc.rect(poaPropertyCol1X, poaPropertyTableY, poaPropertyColWidths[0], poaPropertyCellHeight, 'FD');
    doc.rect(poaPropertyCol2X, poaPropertyTableY, poaPropertyColWidths[1], poaPropertyCellHeight, 'FD');
    doc.rect(poaPropertyCol3X, poaPropertyTableY, poaPropertyColWidths[2], poaPropertyCellHeight, 'FD');
    doc.rect(poaPropertyCol4X, poaPropertyTableY, poaPropertyColWidths[3], poaPropertyCellHeight, 'FD');

    doc.text('Name:', poaPropertyCol1X + 0.5, poaPropertyTableY + 4);
    doc.text('Phone Number:', poaPropertyCol2X + 0.5, poaPropertyTableY + 4);
    doc.text('Email Address:', poaPropertyCol3X + 0.5, poaPropertyTableY + 4);
    doc.text('Relationship to You:', poaPropertyCol4X + 0.5, poaPropertyTableY + 4);

    poaPropertyTableY += poaPropertyCellHeight;

    for (let i = 0; i < poaPropertyCount; i++) {
      if (poaPropertyTableY > 275) {
        addPage();
        poaPropertyTableY = 12;
      }

      const poaData = formData.client2PoaPropertyData?.[i];

      doc.setDrawColor(...colors.tableBorder);
      doc.setLineWidth(0.3);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'normal');

      doc.rect(poaPropertyCol1X, poaPropertyTableY, poaPropertyColWidths[0], poaPropertyCellHeight, 'FD');
      doc.setFillColor(...colors.tableHeader);
      doc.rect(poaPropertyCol2X, poaPropertyTableY, poaPropertyColWidths[1], poaPropertyCellHeight, 'FD');
      doc.rect(poaPropertyCol3X, poaPropertyTableY, poaPropertyColWidths[2], poaPropertyCellHeight, 'FD');
      doc.rect(poaPropertyCol4X, poaPropertyTableY, poaPropertyColWidths[3], poaPropertyCellHeight, 'FD');

      const field1 = new doc.AcroFormTextField();
      field1.fieldName = `poa_property_client2_${i}_name`;
      field1.Rect = [poaPropertyCol1X + 0.3, poaPropertyTableY + 0.3, poaPropertyColWidths[0] - 0.6, poaPropertyCellHeight - 0.6];
      field1.fontSize = 7;
      field1.textColor = [0, 0, 0];
      field1.borderStyle = 'none';
      field1.value = poaData?.name || '';
      doc.addField(field1);

      const field2 = new doc.AcroFormTextField();
      field2.fieldName = `poa_property_client2_${i}_phone`;
      field2.Rect = [poaPropertyCol2X + 0.3, poaPropertyTableY + 0.3, poaPropertyColWidths[1] - 0.6, poaPropertyCellHeight - 0.6];
      field2.fontSize = 7;
      field2.textColor = [0, 0, 0];
      field2.borderStyle = 'none';
      field2.value = poaData?.phone || '';
      doc.addField(field2);

      const field3 = new doc.AcroFormTextField();
      field3.fieldName = `poa_property_client2_${i}_email`;
      field3.Rect = [poaPropertyCol3X + 0.3, poaPropertyTableY + 0.3, poaPropertyColWidths[2] - 0.6, poaPropertyCellHeight - 0.6];
      field3.fontSize = 7;
      field3.textColor = [0, 0, 0];
      field3.borderStyle = 'none';
      field3.value = poaData?.email || '';
      doc.addField(field3);

      const field4 = new doc.AcroFormTextField();
      field4.fieldName = `poa_property_client2_${i}_relationship`;
      field4.Rect = [poaPropertyCol4X + 0.3, poaPropertyTableY + 0.3, poaPropertyColWidths[3] - 0.6, poaPropertyCellHeight - 0.6];
      field4.fontSize = 7;
      field4.textColor = [0, 0, 0];
      field4.borderStyle = 'none';
      field4.value = poaData?.relationship || '';
      doc.addField(field4);

      poaPropertyTableY += poaPropertyCellHeight;

      if (poaData?.country || poaData?.city) {
        if (poaPropertyTableY > 270) {
          addPage();
          poaPropertyTableY = 12;
        }

        doc.setFontSize(7);
        doc.setFont(undefined, 'italic');
        const residenceText = `   Residence: ${poaData?.country === 'Other' ? (poaData?.otherCountry || 'Unknown') : (poaData?.country || 'N/A')}${poaData?.country === 'Canada' && poaData?.province ? `, ${poaData.province}` : ''}${poaData?.city ? `, ${poaData.city}` : ''}`;
        doc.text(residenceText, poaPropertyCol1X, poaPropertyTableY + 4);
        poaPropertyTableY += 6;
      }
    }

    yPosition = poaPropertyTableY + 10;

    if (formData.client2PoaPropertyDocLocation) {
      if (yPosition > 260) {
        addPage();
        yPosition = 12;
      }

      doc.setFontSize(9);
      doc.setFont(undefined, 'bold');
      doc.text('Document Location:', margin, yPosition);
      yPosition += 6;

      doc.setFont(undefined, 'normal');
      const docLocationField = new doc.AcroFormTextField();
      docLocationField.fieldName = 'client2_poa_property_doc_location';
      docLocationField.Rect = [margin, yPosition, fieldWidth, 8];
      docLocationField.fontSize = 9;
      docLocationField.textColor = [0, 0, 0];
      docLocationField.value = formData.client2PoaPropertyDocLocation || '';
      doc.addField(docLocationField);
      yPosition += 10;
    }

    if (formData.client2PoaPropertyHasDocCopy) {
      if (yPosition > 260) {
        addPage();
        yPosition = 12;
      }

      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      const client2Name = formData.spouseName || 'Client 2';
      let docCopyText = '';
      if (formData.client2PoaPropertyHasDocCopy === 'yes_copy') {
        docCopyText = `${client2Name} indicated that the Power(s) of Attorney for Property have a copy of the most recent documentation in their files.`;
      } else if (formData.client2PoaPropertyHasDocCopy === 'yes_instructions') {
        docCopyText = `${client2Name} indicated that the Power(s) of Attorney for Property have instructions on where/how to access the most recent documentation.`;
      } else if (formData.client2PoaPropertyHasDocCopy === 'no') {
        docCopyText = `${client2Name} indicated that the Power(s) of Attorney for Property do not have access to the most recent documentation.`;
      }
      const docCopyLines = doc.splitTextToSize(docCopyText, fieldWidth);
      doc.text(docCopyLines, margin, yPosition);
      yPosition += docCopyLines.length * 5 + 10;
    }
  }

  // Additional Reading for Powers of Attorney for Property
  if (formData.client1HasWill === 'yes') {
    if (yPosition > 150) {
      addPage();
      yPosition = 12;
    }

    doc.setFont(undefined, 'bold');
    doc.setFontSize(11);
    doc.text('Additional Reading - Powers of Attorney for Property', margin, yPosition);
    yPosition += 8;

    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);

    const poaPropertyReadingText = [
      'A Power of Attorney for Property (POAP) is a legal document in which one person (the "donor" or "grantor") grants',
      'another person or trust company (the "attorney") the authority to make decisions regarding their finances,',
      'property, and assets. Unlike a personal care directive which handles healthcare, the POAP is a fiduciary tool',
      'focused on maintaining the grantor\'s economic well-being.',
      '',
      'To position the attorney to successfully fulfil their role, the following breakdown outlines the legal requirements',
      'and best practices in Ontario:',
      ''
    ];

    poaPropertyReadingText.forEach(line => {
      if (yPosition > 280) {
        addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 1: How a POA Comes into Force
    doc.setFont(undefined, 'bold');
    doc.setFontSize(9);
    if (yPosition > 270) {
      addPage();
      yPosition = 12;
    }
    doc.text('How a POA Comes into Force:', margin, yPosition);
    yPosition += 6;

    doc.setFont(undefined, 'normal');
    const poaPropSection1Text = [
      'An attorney must understand precisely when their authority begins to avoid legal liability or administrative delays.',
      '',
      '• Immediate Effect: Unless the document specifies otherwise, the POADP takes effect immediately upon being',
      '  signed and witnessed. However, while the grantor remains capable, their decisions take precedence over the',
      '  attorney\'s.',
      '• Springing POA: A grantor may choose to have the power to "spring" into effect only upon a triggering event,',
      '  such as a formal finding of mental incapacity by a physician or a qualified capacity assessor.',
      '• Enduring (Continuing) Status: For a POA to be useful during a grantor\'s most vulnerable moments, it must be',
      '  "enduring" or "continuing." This requires a specific clause stating the power continues notwithstanding the',
      '  donor\'s loss of mental capacity. Without this clause, the attorney\'s power is extinguished exactly when it is',
      '  often needed most.',
      ''
    ];

    poaPropSection1Text.forEach(line => {
      if (yPosition > 280) {
        addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 2: Responsibilities and Fiduciary Duties
    doc.setFont(undefined, 'bold');
    if (yPosition > 270) {
      addPage();
      yPosition = 12;
    }
    doc.text('Responsibilities and Fiduciary Duties:', margin, yPosition);
    yPosition += 6;

    doc.setFont(undefined, 'normal');
    const poaPropSection2Text = [
      'The attorney is a fiduciary, meaning they are legally and ethically bound to act with utmost good faith and always',
      'in the best interests of the grantor.',
      '',
      '• Asset Management: The attorney is responsible for paying bills, managing investment accounts, collecting',
      '  income, and protecting the value of real property.',
      '• Standard of Care: The attorney must exercise a degree of care and skill that a "person of ordinary prudence"',
      '  would use. If the attorney is a professional (like an accountant or lawyer), they may be held to a higher',
      '  standard of care based on their expertise.',
      '• Recordkeeping: Attorneys have a strict duty to keep complete and accurate accounts of all transactions,',
      '  including receipts, disbursements, and investment statements.',
      ''
    ];

    poaPropSection2Text.forEach(line => {
      if (yPosition > 280) {
        addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 3: Revocation and Termination
    doc.setFont(undefined, 'bold');
    if (yPosition > 270) {
      addPage();
      yPosition = 12;
    }
    doc.text('Revocation and Termination:', margin, yPosition);
    yPosition += 6;

    doc.setFont(undefined, 'normal');
    const poaPropSection3Text = [
      'A Power of Attorney for Property remains valid until one of the following occurs:',
      '',
      '• Revocation: While the grantor is mentally capable, they may revoke the POA at any time by providing written',
      '  notice to the attorney and relevant third parties, such as banks.',
      '• Automatic Termination: The power terminates upon the death of the grantor (at which point the Will takes',
      '  over) or the death/incapacity of the attorney.',
      '• Relationship Breakdown: In most cases, separation or divorce does not automatically revoke a POA in favor of',
      '  a spouse; it must be explicitly rescinded or replaced by the grantor.',
      ''
    ];

    poaPropSection3Text.forEach(line => {
      if (yPosition > 280) {
        addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 4: Best Practices for an Effective POA
    doc.setFont(undefined, 'bold');
    if (yPosition > 270) {
      addPage();
      yPosition = 12;
    }
    doc.text('Best Practices for an Effective POA:', margin, yPosition);
    yPosition += 6;

    doc.setFont(undefined, 'normal');
    const poaPropSection4Text = [
      'To ensure the attorney is in the best position to care for the grantor, the following strategies should be',
      'implemented during the drafting phase:',
      '',
      '• Express Authority for Specific Tasks: Statutory law limits an attorney\'s power. If the grantor wants the',
      '  attorney to have the authority to delegate investment decisions to a professional manager, make charitable gifts,',
      '  or implement estate planning strategies (like an estate freeze), these powers must be explicitly granted in the',
      '  document.',
      '• Naming Contingents: To avoid a total loss of authority if the primary attorney is unable to act, grantors should',
      '  always name a substitute or alternate attorney.',
      '• Jurisdictional Residency: Ideally, the attorney should live in the same jurisdiction as the grantor. A',
      '  non-resident attorney may face compliance hurdles, such as an Ontario financial advisor being legally unable to',
      '  take investment instructions from an attorney residing in the U.S.',
      '• Avoiding Sham Situations: The grantor must genuinely understand that they are transferring control. If the',
      '  grantor retains informal control or has no real intention of losing control of the property, the trust or POA',
      '  arrangement could be ruled a "sham" and invalidated by a court.',
      '• Corporate Considerations: A POA allows an attorney to manage shares of a corporation but does not',
      '  automatically grant them a seat as a director. The attorney must use their voting power as a shareholder to elect',
      '  themselves (or another person) to the board.'
    ];

    poaPropSection4Text.forEach(line => {
      if (yPosition > 280) {
        addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 12;
  }

  if (formData.client1HasEstateTrustee === 'yes' && formData.client1EstateTrusteeCount) {
    const estateTrusteeCount = parseInt(formData.client1EstateTrusteeCount, 10);
    const estateTrusteeData = formData.client1EstateTrusteeData || [];

    if (yPosition > 210) {
      addPage();
      yPosition = 12;
    }

    const client1Name = formData.fullName || 'Client 1';
    addSubsectionHeader(`${client1Name}'s Estate Trustees:`);

    const etCellHeight = 6;

    for (let i = 0; i < estateTrusteeCount; i++) {
      const trustee = estateTrusteeData[i] || {};
      const isCorporate = trustee.type === 'corporate';

      if (yPosition > 240) {
        addPage();
        yPosition = 12;
      }

      doc.setFontSize(9);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...colors.darkText);
      doc.text(`Estate Trustee #${i + 1}${isCorporate ? ' (Corporate Trustee)' : ' (Person)'}`, margin, yPosition);
      yPosition += 6;

      if (isCorporate) {
        const etColWidths = [fieldWidth * 0.3, fieldWidth * 0.7];
        let etTableY = yPosition;

        const labelCol = margin;
        const valueCol = margin + etColWidths[0];

        const fields = [
          { label: 'Trust Company Name:', key: 'companyName' },
          { label: 'Trust Company Address:', key: 'companyAddress' },
          { label: 'Key Contact Name:', key: 'contactName' },
          { label: 'Phone Number:', key: 'phone' },
          { label: 'Email:', key: 'email' },
          { label: 'Has Access to Documentation?', key: 'providedCopy' }
        ];

        fields.forEach((field, idx) => {
          if (etTableY > 275) {
            addPage();
            etTableY = 12;
          }

          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);
          doc.setFillColor(255, 255, 255);
          doc.setFont(undefined, 'normal');
          doc.setFontSize(8);
          doc.setTextColor(...colors.darkText);
          doc.rect(labelCol, etTableY, etColWidths[0], etCellHeight, 'FD');
          doc.text(field.label, labelCol + 0.5, etTableY + 4);

          doc.setFillColor(...colors.tableHeader);
          doc.rect(valueCol, etTableY, etColWidths[1], etCellHeight, 'FD');

          const fieldObj = new doc.AcroFormTextField();
          fieldObj.fieldName = `estate_trustee_${i}_${field.key}`;
          fieldObj.Rect = [valueCol + 0.3, etTableY + 0.3, etColWidths[1] - 0.6, etCellHeight - 0.6];
          fieldObj.fontSize = 7;
          fieldObj.textColor = [0, 0, 0];
          fieldObj.borderStyle = 'none';
          const value = trustee[field.key as keyof typeof trustee] || '';
          fieldObj.value = field.key === 'providedCopy' ?
            (value === 'yes_copy' ? 'Yes - they have a copy' :
             value === 'yes_instructions' ? 'Yes - instructions provided' :
             value === 'no' ? 'No' : '') :
            String(value);
          doc.addField(fieldObj);

          etTableY += etCellHeight;
        });

        yPosition = etTableY + 8;
      } else {
        const etColWidths = [fieldWidth * 0.22, fieldWidth * 0.18, fieldWidth * 0.22, fieldWidth * 0.23, fieldWidth * 0.15];
        let etTableY = yPosition;

        const etCol1X = margin;
        const etCol2X = margin + etColWidths[0];
        const etCol3X = margin + etColWidths[0] + etColWidths[1];
        const etCol4X = margin + etColWidths[0] + etColWidths[1] + etColWidths[2];
        const etCol5X = margin + etColWidths[0] + etColWidths[1] + etColWidths[2] + etColWidths[3];

        doc.setDrawColor(...colors.tableBorder);
        doc.setLineWidth(0.3);
        doc.setFillColor(255, 255, 255);
        doc.setFont(undefined, 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...colors.darkText);

        doc.rect(etCol1X, etTableY, etColWidths[0], etCellHeight, 'FD');
        doc.rect(etCol2X, etTableY, etColWidths[1], etCellHeight, 'FD');
        doc.rect(etCol3X, etTableY, etColWidths[2], etCellHeight, 'FD');
        doc.rect(etCol4X, etTableY, etColWidths[3], etCellHeight, 'FD');
        doc.rect(etCol5X, etTableY, etColWidths[4], etCellHeight, 'FD');

        doc.text('Name:', etCol1X + 0.5, etTableY + 4);
        doc.text('Phone Number:', etCol2X + 0.5, etTableY + 4);
        doc.text('Email Address:', etCol3X + 0.5, etTableY + 4);
        doc.text('Relationship:', etCol4X + 0.5, etTableY + 4);
        doc.text('Has Access to Documentation?', etCol5X + 0.5, etTableY + 4);

        etTableY += etCellHeight;

        if (etTableY > 275) {
          addPage();
          etTableY = 12;
        }

        doc.setDrawColor(...colors.tableBorder);
        doc.setLineWidth(0.3);
        doc.setFillColor(255, 255, 255);
        doc.setFont(undefined, 'normal');

        doc.rect(etCol1X, etTableY, etColWidths[0], etCellHeight, 'FD');
        doc.setFillColor(...colors.tableHeader);
        doc.rect(etCol2X, etTableY, etColWidths[1], etCellHeight, 'FD');
        doc.rect(etCol3X, etTableY, etColWidths[2], etCellHeight, 'FD');
        doc.rect(etCol4X, etTableY, etColWidths[3], etCellHeight, 'FD');
        doc.rect(etCol5X, etTableY, etColWidths[4], etCellHeight, 'FD');

        const field1 = new doc.AcroFormTextField();
        field1.fieldName = `estate_trustee_${i}_name`;
        field1.Rect = [etCol1X + 0.3, etTableY + 0.3, etColWidths[0] - 0.6, etCellHeight - 0.6];
        field1.fontSize = 7;
        field1.textColor = [0, 0, 0];
        field1.borderStyle = 'none';
        field1.value = trustee.name || '';
        doc.addField(field1);

        const field2 = new doc.AcroFormTextField();
        field2.fieldName = `estate_trustee_${i}_phone`;
        field2.Rect = [etCol2X + 0.3, etTableY + 0.3, etColWidths[1] - 0.6, etCellHeight - 0.6];
        field2.fontSize = 7;
        field2.textColor = [0, 0, 0];
        field2.borderStyle = 'none';
        field2.value = trustee.phone || '';
        doc.addField(field2);

        const field3 = new doc.AcroFormTextField();
        field3.fieldName = `estate_trustee_${i}_email`;
        field3.Rect = [etCol3X + 0.3, etTableY + 0.3, etColWidths[2] - 0.6, etCellHeight - 0.6];
        field3.fontSize = 7;
        field3.textColor = [0, 0, 0];
        field3.borderStyle = 'none';
        field3.value = trustee.email || '';
        doc.addField(field3);

        const field4 = new doc.AcroFormTextField();
        field4.fieldName = `estate_trustee_${i}_relationship`;
        field4.Rect = [etCol4X + 0.3, etTableY + 0.3, etColWidths[3] - 0.6, etCellHeight - 0.6];
        field4.fontSize = 7;
        field4.textColor = [0, 0, 0];
        field4.borderStyle = 'none';
        field4.value = trustee.relationship || '';
        doc.addField(field4);

        const field5 = new doc.AcroFormTextField();
        field5.fieldName = `estate_trustee_${i}_providedcopy`;
        field5.Rect = [etCol5X + 0.3, etTableY + 0.3, etColWidths[4] - 0.6, etCellHeight - 0.6];
        field5.fontSize = 7;
        field5.textColor = [0, 0, 0];
        field5.borderStyle = 'none';
        field5.value = trustee.providedCopy === 'yes_copy' ? 'Yes - they have a copy' :
                        trustee.providedCopy === 'yes_instructions' ? 'Yes - instructions provided' :
                        trustee.providedCopy === 'no' ? 'No' : '';
        doc.addField(field5);

        etTableY += etCellHeight;

        if (trustee.country || trustee.city) {
          if (etTableY > 270) {
            addPage();
            etTableY = 12;
          }

          doc.setFontSize(7);
          doc.setFont(undefined, 'italic');
          const residenceText = `   Residence: ${trustee.country === 'Other' ? (trustee.otherCountry || 'Unknown') : (trustee.country || 'N/A')}${trustee.country === 'Canada' && trustee.province ? `, ${trustee.province}` : ''}${trustee.city ? `, ${trustee.city}` : ''}`;
          doc.text(residenceText, etCol1X, etTableY + 4);
          etTableY += 6;
        }

        yPosition = etTableY + 8;
      }
    }

    yPosition += 2;

    const clientName = formData.fullName || 'The client';

    if (formData.client1EstateTrusteeKnowsWillLocation === 'yes') {
      if (yPosition > 260) {
        addPage();
        yPosition = 12;
      }

      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      const knowsLocationText = `${clientName} indicated that their Estate Trustees know where to find/access the most recent copy of their Will.`;
      const knowsLocationLines = doc.splitTextToSize(knowsLocationText, fieldWidth);
      doc.text(knowsLocationLines, margin, yPosition);
      yPosition += knowsLocationLines.length * 5 + 5;
    } else if (formData.client1EstateTrusteeKnowsWillLocation === 'no') {
      if (yPosition > 240) {
        addPage();
        yPosition = 12;
      }

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('Recommended Action:', margin, yPosition);
      yPosition += 6;

      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      const recommendedActionText = `${clientName} is advised to speak with their named Estate Trustees to show them the location of their most recent Will. Sharing this completed document with them is also advisable to make their jobs easier.`;
      const recommendedActionLines = doc.splitTextToSize(recommendedActionText, fieldWidth);
      doc.text(recommendedActionLines, margin, yPosition);
      yPosition += recommendedActionLines.length * 5 + 10;
    }
  }

  if (formData.client2HasEstateTrustee === 'yes' && formData.client2EstateTrusteeCount) {
    const etCount = parseInt(formData.client2EstateTrusteeCount, 10);
    const estateTrusteeData = formData.client2EstateTrusteeData || [];

    if (yPosition > 210) {
      addPage();
      yPosition = 12;
    }

    const client2Name = formData.spouseName || 'Client 2';
    addSubsectionHeader(`${client2Name}'s Estate Trustees:`);

    const etCellHeight = 6;

    for (let i = 0; i < etCount; i++) {
      const trustee = estateTrusteeData[i] || {};
      const isCorporate = trustee.type === 'corporate';

      if (yPosition > 240) {
        addPage();
        yPosition = 12;
      }

      doc.setFontSize(9);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...colors.darkText);
      doc.text(`Estate Trustee #${i + 1}${isCorporate ? ' (Corporate Trustee)' : ' (Person)'}`, margin, yPosition);
      yPosition += 6;

      if (isCorporate) {
        const etColWidths = [fieldWidth * 0.3, fieldWidth * 0.7];
        let etTableY = yPosition;

        const labelCol = margin;
        const valueCol = margin + etColWidths[0];

        const fields = [
          { label: 'Trust Company Name:', key: 'companyName' },
          { label: 'Trust Company Address:', key: 'companyAddress' },
          { label: 'Key Contact Name:', key: 'contactName' },
          { label: 'Phone Number:', key: 'phone' },
          { label: 'Email:', key: 'email' },
          { label: 'Has Access to Documentation?', key: 'providedCopy' }
        ];

        fields.forEach((field, idx) => {
          if (etTableY > 275) {
            addPage();
            etTableY = 12;
          }

          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);
          doc.setFillColor(255, 255, 255);
          doc.setFont(undefined, 'normal');
          doc.setFontSize(8);
          doc.setTextColor(...colors.darkText);
          doc.rect(labelCol, etTableY, etColWidths[0], etCellHeight, 'FD');
          doc.text(field.label, labelCol + 0.5, etTableY + 4);

          doc.setFillColor(...colors.tableHeader);
          doc.rect(valueCol, etTableY, etColWidths[1], etCellHeight, 'FD');

          const fieldObj = new doc.AcroFormTextField();
          fieldObj.fieldName = `estate_trustee_client2_${i}_${field.key}`;
          fieldObj.Rect = [valueCol + 0.3, etTableY + 0.3, etColWidths[1] - 0.6, etCellHeight - 0.6];
          fieldObj.fontSize = 7;
          fieldObj.textColor = [0, 0, 0];
          fieldObj.borderStyle = 'none';
          fieldObj.value = trustee[field.key] || '';
          doc.addField(fieldObj);

          etTableY += etCellHeight;
        });

        yPosition = etTableY + 8;
      } else {
        const etColWidths = [fieldWidth * 0.22, fieldWidth * 0.18, fieldWidth * 0.22, fieldWidth * 0.23, fieldWidth * 0.15];
        let etTableY = yPosition;

        const etCol1X = margin;
        const etCol2X = margin + etColWidths[0];
        const etCol3X = margin + etColWidths[0] + etColWidths[1];
        const etCol4X = margin + etColWidths[0] + etColWidths[1] + etColWidths[2];
        const etCol5X = margin + etColWidths[0] + etColWidths[1] + etColWidths[2] + etColWidths[3];

        doc.setDrawColor(...colors.tableBorder);
        doc.setLineWidth(0.3);
        doc.setFillColor(255, 255, 255);
        doc.setFont(undefined, 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...colors.darkText);

        doc.rect(etCol1X, etTableY, etColWidths[0], etCellHeight, 'FD');
        doc.rect(etCol2X, etTableY, etColWidths[1], etCellHeight, 'FD');
        doc.rect(etCol3X, etTableY, etColWidths[2], etCellHeight, 'FD');
        doc.rect(etCol4X, etTableY, etColWidths[3], etCellHeight, 'FD');
        doc.rect(etCol5X, etTableY, etColWidths[4], etCellHeight, 'FD');

        doc.text('Name:', etCol1X + 0.5, etTableY + 4);
        doc.text('Phone Number:', etCol2X + 0.5, etTableY + 4);
        doc.text('Email Address:', etCol3X + 0.5, etTableY + 4);
        doc.text('Relationship:', etCol4X + 0.5, etTableY + 4);
        doc.text('Has Access to Documentation?', etCol5X + 0.5, etTableY + 4);

        etTableY += etCellHeight;

        if (etTableY > 275) {
          addPage();
          etTableY = 12;
        }

        doc.setDrawColor(...colors.tableBorder);
        doc.setLineWidth(0.3);
        doc.setFillColor(255, 255, 255);
        doc.setFont(undefined, 'normal');

        doc.rect(etCol1X, etTableY, etColWidths[0], etCellHeight, 'FD');
        doc.setFillColor(...colors.tableHeader);
        doc.rect(etCol2X, etTableY, etColWidths[1], etCellHeight, 'FD');
        doc.rect(etCol3X, etTableY, etColWidths[2], etCellHeight, 'FD');
        doc.rect(etCol4X, etTableY, etColWidths[3], etCellHeight, 'FD');

        const field1 = new doc.AcroFormTextField();
        field1.fieldName = `estate_trustee_client2_${i}_name`;
        field1.Rect = [etCol1X + 0.3, etTableY + 0.3, etColWidths[0] - 0.6, etCellHeight - 0.6];
        field1.fontSize = 7;
        field1.textColor = [0, 0, 0];
        field1.borderStyle = 'none';
        field1.value = trustee?.name || '';
        doc.addField(field1);

        const field2 = new doc.AcroFormTextField();
        field2.fieldName = `estate_trustee_client2_${i}_phone`;
        field2.Rect = [etCol2X + 0.3, etTableY + 0.3, etColWidths[1] - 0.6, etCellHeight - 0.6];
        field2.fontSize = 7;
        field2.textColor = [0, 0, 0];
        field2.borderStyle = 'none';
        field2.value = trustee?.phone || '';
        doc.addField(field2);

        const field3 = new doc.AcroFormTextField();
        field3.fieldName = `estate_trustee_client2_${i}_email`;
        field3.Rect = [etCol3X + 0.3, etTableY + 0.3, etColWidths[2] - 0.6, etCellHeight - 0.6];
        field3.fontSize = 7;
        field3.textColor = [0, 0, 0];
        field3.borderStyle = 'none';
        field3.value = trustee?.email || '';
        doc.addField(field3);

        const field4 = new doc.AcroFormTextField();
        field4.fieldName = `estate_trustee_client2_${i}_relationship`;
        field4.Rect = [etCol4X + 0.3, etTableY + 0.3, etColWidths[3] - 0.6, etCellHeight - 0.6];
        field4.fontSize = 7;
        field4.textColor = [0, 0, 0];
        field4.borderStyle = 'none';
        field4.value = trustee?.relationship || '';
        doc.addField(field4);

        etTableY += etCellHeight;

        if (trustee?.country || trustee?.city) {
          if (etTableY > 270) {
            addPage();
            etTableY = 12;
          }

          doc.setFontSize(7);
          doc.setFont(undefined, 'italic');
          const residenceText = `   Residence: ${trustee.country === 'Other' ? (trustee.otherCountry || 'Unknown') : (trustee.country || 'N/A')}${trustee.country === 'Canada' && trustee.province ? `, ${trustee.province}` : ''}${trustee.city ? `, ${trustee.city}` : ''}`;
          doc.text(residenceText, etCol1X, etTableY + 4);
          etTableY += 6;
        }

        yPosition = etTableY + 8;
      }
    }

    yPosition += 2;

    if (formData.client2EstateTrusteeKnowsWillLocation === 'yes') {
      if (yPosition > 240) {
        addPage();
        yPosition = 12;
      }

      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      const knowsLocationText = `${client2Name} indicated that their Estate Trustees know where to find/access the most recent copy of their Will.`;
      const knowsLocationLines = doc.splitTextToSize(knowsLocationText, fieldWidth);
      doc.text(knowsLocationLines, margin, yPosition);
      yPosition += knowsLocationLines.length * 5 + 5;
    } else if (formData.client2EstateTrusteeKnowsWillLocation === 'no') {
      if (yPosition > 240) {
        addPage();
        yPosition = 12;
      }

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('Recommended Action:', margin, yPosition);
      yPosition += 6;

      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      const recommendedActionText = `${client2Name} is advised to speak with their named Estate Trustees to show them the location of their most recent Will. Sharing this completed document with them is also advisable to make their jobs easier.`;
      const recommendedActionLines = doc.splitTextToSize(recommendedActionText, fieldWidth);
      doc.text(recommendedActionLines, margin, yPosition);
      yPosition += recommendedActionLines.length * 5 + 10;
    }
  }

  // Additional Reading for Estate Trustees
  if (formData.client1HasWill === 'yes') {
    if (yPosition > 150) {
      addPage();
      yPosition = 12;
    }

    doc.setFont(undefined, 'bold');
    doc.setFontSize(11);
    doc.text('Additional Reading: Estate Trustees, Executors/Executrix, or Liquidators', margin, yPosition);
    yPosition += 8;

    doc.setFont(undefined, 'bold');
    doc.setFontSize(9);
    doc.text('Estate Trustee (in Ontario, Executor/Executrix or Liquidator in other jurisdictions):', margin, yPosition);
    yPosition += 6;

    doc.setFont(undefined, 'normal');
    const estateTrusteeIntroText = [
      'In Ontario, the term Estate Trustee is the specific designation of the individual or institution responsible for',
      'administering a deceased person\'s estate. If named in a Will, the role is officially called Estate Trustee with a',
      'Will. If the person died without a Will, the person appointed by the court is an Estate Trustee without a Will',
      '(formerly \'administrator\').',
      '',
      'The role is a significant fiduciary responsibility that requires settling the estate according to the deceased\'s wishes',
      'and provincial law.',
      ''
    ];

    estateTrusteeIntroText.forEach(line => {
      if (yPosition > 280) {
        addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 1: Preliminary Duties and Probate
    doc.setFont(undefined, 'bold');
    if (yPosition > 270) {
      addPage();
      yPosition = 12;
    }
    doc.text('Preliminary Duties and Probate:', margin, yPosition);
    yPosition += 6;

    doc.setFont(undefined, 'normal');
    const etSection1Text = [
      'The Estate Trustee\'s work begins immediately following the death.',
      '',
      '• Funeral and Proof of Death: They are responsible for arranging the funeral (unless family members have',
      '  already done so) and obtaining multiple original copies of the proof-of-death certificate from the funeral director',
      '  to provide to various institutions.',
      '• Obtaining a Certificate of Appointment: In Ontario, the process of \'probating\' a Will involves applying to the',
      '  court for a Certificate of Appointment of the Trustee with a Will. This document confirms the trustee\'s legal',
      '  authority to deal with assets like bank accounts and real estate.',
      '• Ontario Probate Taxes: Trustees must pay the Estate Administration Tax (probate tax) to the provincial',
      '  government. In Ontario, this is currently calculated as $15 for every $1,000 (or 1.5%) of the estate\'s value that',
      '  exceeds $50,000.',
      ''
    ];

    etSection1Text.forEach(line => {
      if (yPosition > 280) {
        addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 2: Safeguarding and Valuing Assets
    doc.setFont(undefined, 'bold');
    if (yPosition > 270) {
      addPage();
      yPosition = 12;
    }
    doc.text('Safeguarding and Valuing Assets:', margin, yPosition);
    yPosition += 6;

    doc.setFont(undefined, 'normal');
    const etSection2Text = [
      'The Trustee must act as a \'prudent investor\' to protect the estate\'s value.',
      '',
      '• Inventory: They must locate and prepare a comprehensive inventory of all assets (bank accounts, investments,',
      '  real estate and digital assets) and liabilities (debts, loans, and credit cards).',
      '• Protection: This includes changing locks on property, ensuring adequate insurance is in place for vacant homes',
      '  or stored vehicles, and sometimes managing a business for a period to prevent loss of value.',
      '• Estate Account: They should open a specific bank account to manage all incoming funds and pay the estate\'s',
      '  expenses and debts.',
      ''
    ];

    etSection2Text.forEach(line => {
      if (yPosition > 280) {
        addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 3: Tax and Legal Obligations
    doc.setFont(undefined, 'bold');
    if (yPosition > 270) {
      addPage();
      yPosition = 12;
    }
    doc.text('Tax and Legal Obligations:', margin, yPosition);
    yPosition += 6;

    doc.setFont(undefined, 'normal');
    const etSection3Text = [
      'Tax compliance is one of the most critical aspects of the role:',
      '',
      '• Filing Returns: The trustee must file the deceased\'s final (terminal) income tax return and potentially an',
      '  optional \'rights or things\' return. They may also need to file annual T3 Trust Returns for any income earned by',
      '  the estate after the date of death.',
      '• Clearance Certificate: Before distributing assets, the trustee should obtain a tax clearance certificate from the',
      '  CRA. This confirms all taxes are paid and relieves the trustee of personal liability for future tax claims.',
      ''
    ];

    etSection3Text.forEach(line => {
      if (yPosition > 280) {
        addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 4: Distribution and Final Accounting
    doc.setFont(undefined, 'bold');
    if (yPosition > 270) {
      addPage();
      yPosition = 12;
    }
    doc.text('Distribution and Final Accounting:', margin, yPosition);
    yPosition += 6;

    doc.setFont(undefined, 'normal');
    const etSection4Text = [
      '• Settling Claims: The trustee must advertise for creditors to identify potential claims and ensure all legitimate',
      '  debts are paid before beneficiaries receive anything.',
      '• Distribution: Once debts and taxes are satisfied, the trustee distributes specific bequests and the remaining',
      '  \'residue\' of the estate to the beneficiaries instructed by the Will.',
      '• Accounting and Releases: The final tax is providing an accounting of the estate to the beneficiaries, showing all',
      '  money received and spend. They should obtain signed releases from adult beneficiaries to waive their right to',
      '  sue the trustee in the future.',
      ''
    ];

    etSection4Text.forEach(line => {
      if (yPosition > 280) {
        addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 5: Compensation
    doc.setFont(undefined, 'bold');
    if (yPosition > 270) {
      addPage();
      yPosition = 12;
    }
    doc.text('Compensation:', margin, yPosition);
    yPosition += 6;

    doc.setFont(undefined, 'normal');
    const etSection5Text = [
      'In Ontario, Estate Trustees are entitled to a \'fair and reasonable\' fee for their work, which typically ranges from',
      '3% to 5% of the gross value of the estate, depending on the complexity and time involved.',
      '',
      'Given the number of tasks involved, it is recommended that you select a person(s) or a professional trust company',
      'who is/are geographically close to where you currently reside.'
    ];

    etSection5Text.forEach(line => {
      if (yPosition > 280) {
        addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 12;
  }

  // Funeral Arrangements Section
  const showFuneralSection =
    formData.client1HasFuneralArrangements === 'yes' ||
    formData.client1HasDiscussedFuneral === 'yes' ||
    formData.client2HasFuneralArrangements === 'yes' ||
    formData.client2HasDiscussedFuneral === 'yes';

  if (showFuneralSection) {
    if (yPosition > 210) {
      addPage();
      yPosition = 12;
    }

    addSubsectionHeader('Funeral and Cemetery Arrangements:');

    if (formData.client1HasFuneralArrangements === 'yes' || formData.client1HasDiscussedFuneral === 'yes') {
      doc.setFontSize(9);

      if (formData.client1HasFuneralArrangements === 'yes') {
        doc.text(`${client1Name} has made arrangements for Funeral and Cemetery services.`, margin, yPosition);
        yPosition += 5;

        doc.text('Document located at:', margin, yPosition);
        yPosition += 6;

        const boxHeight = 8;
        const boxY = yPosition;
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.rect(margin, boxY, fieldWidth, boxHeight);

        const field = new doc.AcroFormTextField();
        field.fieldName = 'client1_funeral_arrangements_location';
        field.Rect = [margin + 0.5, boxY + 0.5, fieldWidth - 1, boxHeight - 1];
        field.fontSize = 8;
        field.textColor = [0, 0, 0];
        field.borderStyle = 'none';
        if (formData.client1FuneralArrangementsLocation) {
          field.value = formData.client1FuneralArrangementsLocation;
        }
        doc.addField(field);

        yPosition = boxY + boxHeight + 8;
      }

      if (formData.client1HasDiscussedFuneral === 'yes') {
        doc.text(`${client1Name} has discussed the type of funeral they would like.`, margin, yPosition);
        yPosition += 5;
      }

      if (formData.client1FuneralWrittenDown === 'yes') {
        doc.text('This information is written down and located:', margin, yPosition);
        yPosition += 6;

        const boxHeight = 8;
        const boxY = yPosition;
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.rect(margin, boxY, fieldWidth, boxHeight);

        const field = new doc.AcroFormTextField();
        field.fieldName = 'client1_funeral_doc_location';
        field.Rect = [margin + 0.5, boxY + 0.5, fieldWidth - 1, boxHeight - 1];
        field.fontSize = 8;
        field.textColor = [0, 0, 0];
        field.borderStyle = 'none';
        if (formData.client1FuneralDocLocation) {
          field.value = formData.client1FuneralDocLocation;
        }
        doc.addField(field);

        yPosition = boxY + boxHeight + 8;
      } else {
        yPosition += 3;
      }
    }

    if ((formData.client2HasFuneralArrangements === 'yes' || formData.client2HasDiscussedFuneral === 'yes') && hasSpouse) {
      if (yPosition > 240) {
        addPage();
        yPosition = 12;
      }

      doc.setFontSize(9);

      if (formData.client2HasFuneralArrangements === 'yes') {
        doc.text(`${client2Name} has made arrangements for Funeral and Cemetery services.`, margin, yPosition);
        yPosition += 5;

        doc.text('Document located at:', margin, yPosition);
        yPosition += 6;

        const boxHeight = 8;
        const boxY = yPosition;
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.rect(margin, boxY, fieldWidth, boxHeight);

        const field = new doc.AcroFormTextField();
        field.fieldName = 'client2_funeral_arrangements_location';
        field.Rect = [margin + 0.5, boxY + 0.5, fieldWidth - 1, boxHeight - 1];
        field.fontSize = 8;
        field.textColor = [0, 0, 0];
        field.borderStyle = 'none';
        if (formData.client2FuneralArrangementsLocation) {
          field.value = formData.client2FuneralArrangementsLocation;
        }
        doc.addField(field);

        yPosition = boxY + boxHeight + 8;
      }

      if (formData.client2HasDiscussedFuneral === 'yes') {
        doc.text(`${client2Name} has communicated to loved ones what type of funeral they would like to have.`, margin, yPosition);
        yPosition += 5;
      }

      if (formData.client2FuneralWrittenDown === 'yes') {
        doc.text('This information is written down and stored at:', margin, yPosition);
        yPosition += 6;

        const boxHeight = 8;
        const boxY = yPosition;
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.rect(margin, boxY, fieldWidth, boxHeight);

        const field = new doc.AcroFormTextField();
        field.fieldName = 'client2_funeral_doc_location';
        field.Rect = [margin + 0.5, boxY + 0.5, fieldWidth - 1, boxHeight - 1];
        field.fontSize = 8;
        field.textColor = [0, 0, 0];
        field.borderStyle = 'none';
        if (formData.client2FuneralDocLocation) {
          field.value = formData.client2FuneralDocLocation;
        }
        doc.addField(field);

        yPosition = boxY + boxHeight + 8;
      } else {
        yPosition += 3;
      }

      if (formData.client2HasDiscussedFuneral === 'no') {
        if (yPosition > 230) {
          addPage();
          yPosition = 12;
        }

        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('Action Item:', margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 5;

        const actionText = 'Discuss and document your wishes related to funeral or remembrance to help your loved ones honor you under your terms.';
        const wrappedActionText = doc.splitTextToSize(actionText, fieldWidth);
        wrappedActionText.forEach((line: string) => {
          doc.text(line, margin, yPosition);
          yPosition += 4.5;
        });
        yPosition += 3;
      }
    }
  }

  const hasAccountingInfo = formData.client1UsesAccountant || formData.client2UsesAccountant;

  if (hasAccountingInfo) {
    const bothUseAccountant = formData.client1UsesAccountant === 'yes' && formData.client2UsesAccountant === 'yes';
    const sameAccountant = formData.accountantSamePerson === 'yes';

    if (bothUseAccountant && sameAccountant) {
      if (yPosition > 210) {
        addPage();
        yPosition = 12;
      }

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('Accountant/Tax Professional:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 4;
      doc.setFontSize(8);
      doc.text(`(${client1Name}) and (${client2Name}), use the same accountant:`, margin, yPosition);
      yPosition += 4;
      doc.text('Location of tax returns for the last 3-5 years and financial statements.', margin, yPosition);
      yPosition += 6;

      renderEstateRow('Name:', '', 'accountant_shared_name');
      renderEstateRow('Firm:', '', 'accountant_shared_firm');
      renderEstateRow('Phone Number:', '', 'accountant_shared_phone');
      renderEstateRow('Email Address:', '', 'accountant_shared_email');
      renderEstateRow('City, Province:', '', 'accountant_shared_city');
      renderEstateRow('What Year did you begin working with this person?', '', 'accountant_shared_year');
      renderEstateRow('Other Details:', '', 'accountant_shared_other1');
      renderEstateRow('Other Details:', '', 'accountant_shared_other2');
      renderEstateRow('Other Details:', '', 'accountant_shared_other3');
      yPosition += 6;
    } else if (bothUseAccountant && !sameAccountant) {
      if (yPosition > 210) {
        addPage();
        yPosition = 12;
      }

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('Accountant/Tax Professional:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 4;
      doc.setFontSize(8);
      doc.text(`(${client1Name}) and (${client2Name}), use separate accountants.`, margin, yPosition);
      yPosition += 6;

      [client1Name, client2Name].forEach((clientName, clientIndex) => {
        if (yPosition > 200) {
          addPage();
          yPosition = 12;
        }

        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text(`${clientName}:`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 4;
        doc.setFontSize(8);
        doc.text('Location of tax returns for the last 3-5 years and financial statements.', margin, yPosition);
        yPosition += 6;

        renderEstateRow('Name:', '', `accountant_client${clientIndex + 1}_name`);
        renderEstateRow('Firm:', '', `accountant_client${clientIndex + 1}_firm`);
        renderEstateRow('Phone Number:', '', `accountant_client${clientIndex + 1}_phone`);
        renderEstateRow('Email Address:', '', `accountant_client${clientIndex + 1}_email`);
        renderEstateRow('City, Province:', '', `accountant_client${clientIndex + 1}_city`);
        renderEstateRow('What Year did you begin working with this person?', '', `accountant_client${clientIndex + 1}_year`);
        renderEstateRow('Other Details:', '', `accountant_client${clientIndex + 1}_other1`);
        renderEstateRow('Other Details:', '', `accountant_client${clientIndex + 1}_other2`);
        renderEstateRow('Other Details:', '', `accountant_client${clientIndex + 1}_other3`);
        yPosition += 6;
      });
    } else {
      if (yPosition > 210) {
        addPage();
        yPosition = 12;
      }

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('Accountant/Tax Professional:', margin, yPosition);
      yPosition += 6;

      if (formData.client1UsesAccountant === 'yes') {
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text(`${client1Name}:`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 4;
        doc.setFontSize(8);
        doc.text('Location of tax returns for the last 3-5 years and financial statements.', margin, yPosition);
        yPosition += 6;

        renderEstateRow('Name:', '', 'accountant_c1only_name');
        renderEstateRow('Firm:', '', 'accountant_c1only_firm');
        renderEstateRow('Phone Number:', '', 'accountant_c1only_phone');
        renderEstateRow('Email Address:', '', 'accountant_c1only_email');
        renderEstateRow('City, Province:', '', 'accountant_c1only_city');
        renderEstateRow('What Year did you begin working with this person?', '', 'accountant_c1only_year');
        renderEstateRow('Other Details:', '', 'accountant_c1only_other1');
        renderEstateRow('Other Details:', '', 'accountant_c1only_other2');
        renderEstateRow('Other Details:', '', 'accountant_c1only_other3');
        yPosition += 6;
      }

      if (formData.client2UsesAccountant === 'yes') {
        if (yPosition > 200) {
          addPage();
          yPosition = 12;
        }

        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text(`${client2Name}:`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 4;
        doc.setFontSize(8);
        doc.text('Location of tax returns for the last 3-5 years and financial statements.', margin, yPosition);
        yPosition += 6;

        renderEstateRow('Name:', '', 'accountant_c2only_name');
        renderEstateRow('Firm:', '', 'accountant_c2only_firm');
        renderEstateRow('Phone Number:', '', 'accountant_c2only_phone');
        renderEstateRow('Email Address:', '', 'accountant_c2only_email');
        renderEstateRow('City, Province:', '', 'accountant_c2only_city');
        renderEstateRow('What Year did you begin working with this person?', '', 'accountant_c2only_year');
        renderEstateRow('Other Details:', '', 'accountant_c2only_other1');
        renderEstateRow('Other Details:', '', 'accountant_c2only_other2');
        renderEstateRow('Other Details:', '', 'accountant_c2only_other3');
        yPosition += 6;
      }
    }

    if (formData.client1UsesAccountant === 'no' && formData.client1AccountingRecordsLocation) {
      if (yPosition > 260) {
        addPage();
        yPosition = 12;
      }

      doc.setFontSize(8);
      doc.setFont(undefined, 'normal');
      doc.text(`${client1Name} indicated that they do their accounting on their own, and the location of their past records are: ${formData.client1AccountingRecordsLocation}`, margin, yPosition, { maxWidth: fieldWidth });
      yPosition += 10;
    }

    if (formData.client2UsesAccountant === 'no' && formData.client2AccountingRecordsLocation) {
      if (yPosition > 260) {
        addPage();
        yPosition = 12;
      }

      doc.setFontSize(8);
      doc.setFont(undefined, 'normal');
      doc.text(`${client2Name} indicated that they do their accounting on their own, and the location of their past records are: ${formData.client2AccountingRecordsLocation}`, margin, yPosition, { maxWidth: fieldWidth });
      yPosition += 10;
    }
  }

  const client1AdvisorCount = parseInt(formData.client1FinancialAdvisors || '0');
  const client2AdvisorCount = parseInt(formData.client2FinancialAdvisors || '0');

  const client1HasCameronSmith = formData.client1IsCameronSmithAdvisor === 'yes';
  const client2HasCameronSmith = formData.client2IsCameronSmithAdvisor === 'yes';
  const bothHaveCameronSmith = client1HasCameronSmith && client2HasCameronSmith && hasSpouse;

  if (bothHaveCameronSmith && client1AdvisorCount > 0) {
    if (yPosition > 190) {
      addPage();
      yPosition = 12;
    }

    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...colors.darkText);
    doc.text(`${client1Name} and ${client2Name} both indicated that Cameron Smith is their financial planner.`, margin, yPosition, { maxWidth: fieldWidth });
    yPosition += 8;

    const advisorData = formData.client1FinancialAdvisorsData?.[0];

    renderEstateRow('Firm Name:', advisorData?.firm || '', 'advisor_cameron_firm');
    renderEstateRow('Key Contact:', advisorData?.name || '', 'advisor_cameron_contact');
    renderEstateRow('Phone Number:', advisorData?.phone || '', 'advisor_cameron_phone');
    renderEstateRow('Email Address:', advisorData?.email || '', 'advisor_cameron_email');
    renderEstateRow('City, Province:', '', 'advisor_cameron_city');
    renderEstateRow('What Year did you begin working with this person?', '', 'advisor_cameron_year');
    renderEstateRow('Where are past statements/tax documents stored?', '', 'advisor_cameron_docs');
    renderEstateRow('Other Details:', '', 'advisor_cameron_other1');
    renderEstateRow('Other Details:', '', 'advisor_cameron_other2');
    yPosition += 6;

    if (client1AdvisorCount > 1) {
      for (let advisorIndex = 1; advisorIndex < client1AdvisorCount; advisorIndex++) {
        if (yPosition > 190) {
          addPage();
          yPosition = 12;
        }

        const advisorData = formData.client1FinancialAdvisorsData?.[advisorIndex];

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text(`Financial Advisor/Investment Manager - ${client1Name} (${advisorIndex + 1} of ${client1AdvisorCount}):`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 4;
        doc.setFontSize(8);
        doc.text('Contact details for the person managing your portfolios and the location of current statements.', margin, yPosition);
        yPosition += 6;

        renderEstateRow('Firm Name:', advisorData?.firm || '', `advisor_c1_${advisorIndex + 1}_firm`);
        renderEstateRow('Key Contact:', advisorData?.name || '', `advisor_c1_${advisorIndex + 1}_contact`);
        renderEstateRow('Phone Number:', advisorData?.phone || '', `advisor_c1_${advisorIndex + 1}_phone`);
        renderEstateRow('Email Address:', advisorData?.email || '', `advisor_c1_${advisorIndex + 1}_email`);
        renderEstateRow('City, Province:', '', `advisor_c1_${advisorIndex + 1}_city`);
        renderEstateRow('What Year did you begin working with this person?', '', `advisor_c1_${advisorIndex + 1}_year`);
        renderEstateRow('Where are past statements/tax documents stored?', '', `advisor_c1_${advisorIndex + 1}_docs`);
        renderEstateRow('Other Details:', '', `advisor_c1_${advisorIndex + 1}_other1`);
        renderEstateRow('Other Details:', '', `advisor_c1_${advisorIndex + 1}_other2`);
        yPosition += 4;

        checkPageBreak(20);
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...colors.darkText);
        const institutionLabel = advisorData?.firm ? `${advisorData.firm} Accounts Held` : `Institution ${advisorIndex + 1} Accounts Held`;
        doc.text(institutionLabel, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 6;

        renderAccountTable(`acct_c1_adv${advisorIndex + 1}`, [
          { label: 'RRSP' }, { label: 'Spousal RRSP' }, { label: 'Locked In RRSP/LIRA' },
          { label: 'RRIF' }, { label: 'Spousal RRIF' }, { label: 'Life Income Fund (LIF)' },
          { label: 'TFSA' }, { label: 'Non-Registered Account' }, { label: 'RESP' },
          { label: 'RDSP' }, { label: 'FHSA' },
          { label: 'In Trust For:', editable: true }, { label: 'Other:', editable: true }, { label: 'Joint with _____:', editable: true },
        ]);
        yPosition += 6;
      }
    }

    if (client2AdvisorCount > 1) {
      for (let advisorIndex = 1; advisorIndex < client2AdvisorCount; advisorIndex++) {
        if (yPosition > 190) {
          addPage();
          yPosition = 12;
        }

        const advisorData = formData.client2FinancialAdvisorsData?.[advisorIndex];

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text(`Financial Advisor/Investment Manager - ${client2Name} (${advisorIndex + 1} of ${client2AdvisorCount}):`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 4;
        doc.setFontSize(8);
        doc.text('Contact details for the person managing your portfolios and the location of current statements.', margin, yPosition);
        yPosition += 6;

        renderEstateRow('Firm Name:', advisorData?.firm || '', `advisor_c2_${advisorIndex + 1}_firm`);
        renderEstateRow('Key Contact:', advisorData?.name || '', `advisor_c2_${advisorIndex + 1}_contact`);
        renderEstateRow('Phone Number:', advisorData?.phone || '', `advisor_c2_${advisorIndex + 1}_phone`);
        renderEstateRow('Email Address:', advisorData?.email || '', `advisor_c2_${advisorIndex + 1}_email`);
        renderEstateRow('City, Province:', '', `advisor_c2_${advisorIndex + 1}_city`);
        renderEstateRow('What Year did you begin working with this person?', '', `advisor_c2_${advisorIndex + 1}_year`);
        renderEstateRow('Where are past statements/tax documents stored?', '', `advisor_c2_${advisorIndex + 1}_docs`);
        renderEstateRow('Other Details:', '', `advisor_c2_${advisorIndex + 1}_other1`);
        renderEstateRow('Other Details:', '', `advisor_c2_${advisorIndex + 1}_other2`);
        yPosition += 4;

        checkPageBreak(20);
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...colors.darkText);
        const institutionLabel = advisorData?.firm ? `${advisorData.firm} Accounts Held` : `Institution ${advisorIndex + 1} Accounts Held`;
        doc.text(institutionLabel, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 6;

        renderAccountTable(`acct_c2_adv${advisorIndex + 1}`, [
          { label: 'RRSP' }, { label: 'Spousal RRSP' }, { label: 'Locked In RRSP/LIRA' },
          { label: 'RRIF' }, { label: 'Spousal RRIF' }, { label: 'Life Income Fund (LIF)' },
          { label: 'TFSA' }, { label: 'Non-Registered Account' }, { label: 'RESP' },
          { label: 'RDSP' }, { label: 'FHSA' },
          { label: 'In Trust For:', editable: true }, { label: 'Other:', editable: true }, { label: 'Joint with _____:', editable: true },
        ]);
        yPosition += 6;
      }
    }
  } else if (client1AdvisorCount > 0) {
    for (let advisorIndex = 0; advisorIndex < client1AdvisorCount; advisorIndex++) {
      if (yPosition > 190) {
        addPage();
        yPosition = 12;
      }

      const advisorData = formData.client1FinancialAdvisorsData?.[advisorIndex];

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text(`Financial Advisor/Investment Manager - ${client1Name} (${advisorIndex + 1} of ${client1AdvisorCount}):`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 4;
      doc.setFontSize(8);
      doc.text('Contact details for the person managing your portfolios and the location of current statements.', margin, yPosition);
      yPosition += 6;

      renderEstateRow('Firm Name:', advisorData?.firm || '', `advisor_c1solo_${advisorIndex + 1}_firm`);
      renderEstateRow('Key Contact:', advisorData?.name || '', `advisor_c1solo_${advisorIndex + 1}_contact`);
      renderEstateRow('Phone Number:', advisorData?.phone || '', `advisor_c1solo_${advisorIndex + 1}_phone`);
      renderEstateRow('Email Address:', advisorData?.email || '', `advisor_c1solo_${advisorIndex + 1}_email`);
      renderEstateRow('City, Province:', '', `advisor_c1solo_${advisorIndex + 1}_city`);
      renderEstateRow('What Year did you begin working with this person?', '', `advisor_c1solo_${advisorIndex + 1}_year`);
      renderEstateRow('Where are past statements/tax documents stored?', '', `advisor_c1solo_${advisorIndex + 1}_docs`);
      renderEstateRow('Other Details:', '', `advisor_c1solo_${advisorIndex + 1}_other1`);
      renderEstateRow('Other Details:', '', `advisor_c1solo_${advisorIndex + 1}_other2`);
      yPosition += 4;

      checkPageBreak(20);
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...colors.darkText);
      const institutionLabel_c1 = advisorData?.firm ? `${advisorData.firm} Accounts Held` : `Institution ${advisorIndex + 1} Accounts Held`;
      doc.text(institutionLabel_c1, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      renderAccountTable(`acct_c1solo_adv${advisorIndex + 1}`, [
        { label: 'RRSP' }, { label: 'Spousal RRSP' }, { label: 'Locked In RRSP/LIRA' },
        { label: 'RRIF' }, { label: 'Spousal RRIF' }, { label: 'Life Income Fund (LIF)' },
        { label: 'TFSA' }, { label: 'Non-Registered Account' }, { label: 'RESP' },
        { label: 'RDSP' }, { label: 'FHSA' }, { label: 'Group RRSP:' }, { label: 'Deferred Profit-Sharing Plan:' },
        { label: 'In Trust For:', editable: true }, { label: 'Joint with _____:', editable: true },
        { label: 'Other:', editable: true }, { label: 'Other:', editable: true }, { label: 'Other:', editable: true },
      ]);
      yPosition += 6;
    }
  }

  if (client2AdvisorCount > 0 && hasSpouse) {
    for (let advisorIndex = 0; advisorIndex < client2AdvisorCount; advisorIndex++) {
      if (yPosition > 190) {
        addPage();
        yPosition = 12;
      }

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...colors.darkText);
      doc.text(`Financial Advisor/Investment Manager - ${client2Name} (${advisorIndex + 1} of ${client2AdvisorCount}):`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 4;
      doc.setFontSize(8);
      doc.text('Contact details for the person managing your portfolios and the location of current statements.', margin, yPosition);
      yPosition += 6;

      const advisorData = formData.client2FinancialAdvisorsData?.[advisorIndex];

      renderEstateRow('Firm Name:', advisorData?.firm || '', `advisor_c2solo_${advisorIndex + 1}_firm`);
      renderEstateRow('Key Contact:', advisorData?.name || '', `advisor_c2solo_${advisorIndex + 1}_contact`);
      renderEstateRow('Phone Number:', advisorData?.phone || '', `advisor_c2solo_${advisorIndex + 1}_phone`);
      renderEstateRow('Email Address:', advisorData?.email || '', `advisor_c2solo_${advisorIndex + 1}_email`);
      renderEstateRow('City, Province:', '', `advisor_c2solo_${advisorIndex + 1}_city`);
      renderEstateRow('What Year did you begin working with this person?', '', `advisor_c2solo_${advisorIndex + 1}_year`);
      renderEstateRow('Where are past statements/tax documents stored?', '', `advisor_c2solo_${advisorIndex + 1}_docs`);
      renderEstateRow('Other Details:', '', `advisor_c2solo_${advisorIndex + 1}_other1`);
      renderEstateRow('Other Details:', '', `advisor_c2solo_${advisorIndex + 1}_other2`);
      yPosition += 4;

      checkPageBreak(20);
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...colors.darkText);
      const institutionLabel_c2 = advisorData?.firm ? `${advisorData.firm} Accounts Held` : `Institution ${advisorIndex + 1} Accounts Held`;
      doc.text(institutionLabel_c2, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      renderAccountTable(`acct_c2solo_adv${advisorIndex + 1}`, [
        { label: 'RRSP' }, { label: 'Spousal RRSP' }, { label: 'Locked In RRSP/LIRA' },
        { label: 'RRIF' }, { label: 'Spousal RRIF' }, { label: 'Life Income Fund (LIF)' },
        { label: 'TFSA' }, { label: 'Non-Registered Account' }, { label: 'RESP' },
        { label: 'RDSP' }, { label: 'FHSA' }, { label: 'Group RRSP:' }, { label: 'Deferred Profit-Sharing Plan:' },
        { label: 'In Trust For:', editable: true }, { label: 'Joint with _____:', editable: true },
        { label: 'Other:', editable: true }, { label: 'Other:', editable: true }, { label: 'Other:', editable: true },
      ]);
      yPosition += 6;
    }
  }

  // Additional Reading Section for Funeral Arrangements
  const needsFuneralReading = formData.client1HasFuneralArrangements === 'no' ||
                               (hasSpouse && formData.client2HasFuneralArrangements === 'no');

  if (needsFuneralReading) {
    if (yPosition > 200) {
      addPage();
      yPosition = 12;
    }

    doc.setFont(undefined, 'bold');
    doc.setFontSize(12);
    doc.text('Additional Reading', margin, yPosition);
    yPosition += 8;

    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);

    const funeralText = [
      'Prepaying for burial and funeral costs in Canada typically involves establishing an eligible funeral',
      'arrangement (EFA), which is a formal agreement designed to fund these services for one or more',
      'individuals. Prepayment covers "funeral services" (memorials, cremation, or burial arrangements) and',
      '"cemetery services" (property and items like markers, urns, shrubs, and interment vaults).',
      '',
      'If you would like to know more about prepaying funeral services, please reach out to Cameron Smith',
      'to discuss further.'
    ];

    funeralText.forEach(line => {
      if (yPosition > 280) {
        addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 5;
    });

    yPosition += 12;
  }

  // Additional Reading Section for Secondary Wills
  const needsSecondaryWillReading = formData.client1HasSecondaryWill === 'no' ||
                                     (hasSpouse && formData.client2HasSecondaryWill === 'no');

  if (needsSecondaryWillReading) {
    if (yPosition > 120) {
      addPage();
      yPosition = 12;
    }

    doc.setFont(undefined, 'bold');
    doc.setFontSize(12);
    doc.text('Additional Reading - How do Secondary Wills Work?', margin, yPosition);
    yPosition += 8;

    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);

    const secondaryWillText = [
      'In the intake form it was indicated that one or more parties selected \'No\' to having a Secondary Will.',
      'They are a niche Estate Administration Tax avoidance strategy that people use. Here is a brief overview',
      'of what the strategy entails and how they work.',
      '',
      'How do Secondary Wills work in Ontario?',
      '',
      'Secondary Wills, typically used as part of a multiple Wills strategy, are a financial and estate planning',
      'technique utilized primarily in jurisdictions that impose significant fees on probate, such as Ontario.',
      'The central purpose of employing secondary Wills in Ontario is to minimize or avoid probate fees (also',
      'called estate administration tax) on high-value assets that do not legally require the Will to be validated',
      'in court.',
      '',
      'Here are the details on how Secondary Wills function in Ontario:',
      '',
      'The Mechanism of Multiple Wills:',
      '',
      'The strategy involves deliberately segregating assets into two distinct Wills to control which properties',
      'are subject to the provincial probate process:',
      '',
      'a.  The Primary Will: This document deals exclusively with assets that legally require a grant of probate',
      '    (or Certificate of Appointment of Estate Trustee with a Will, in Ontario) for the executor to obtain',
      '    legal title and distribute the property. These usually include assets held solely in the deceased\'s name',
      '    where the financial institution (like a bank or brokerage firm) requires legal validation, such as bank',
      '    accounts and investment portfolios.',
      '',
      'b.  The Secondary Will: This document covers assets that typically do not require probate to transfer legal',
      '    ownership. In Ontario, the secondary Will is commonly used to transfer specific high-value assets such',
      '    as privately held securities of a private corporation or personal effects like artwork and jewelry.',
      '',
      'Benefits and Application:',
      '',
      'By structuring the estate this way, the executor only needs to submit the primary Will for probate, thereby',
      'avoiding the imposition of probate fees on the assets listed in the non-probated secondary will.',
      '',
      'a.  Non-Probateable Assets: The secondary Will functions successfully because provincial corporate statues',
      '    may grant the corporation\'s directors the authority to transfer the shares of a deceased shareholder',
      '    without requiring the Will to be probated.',
      '',
      'b.  Cost Savings: Since the probate tax is based on the value of the assets that pass through the probated',
      '    Will, this technique is a method to reduce the total probate fee payable. Ontario charges potentially',
      '    significant probate taxes, which provides a strong motivation for implementing this planning.',
      '',
      'Risks and Considerations in Ontario:',
      '',
      'The use of this probate planning technique carries risks and complexity, especially in jurisdictions known',
      'to challenge such arrangements.',
      '',
      'a.  Aggressive Scrutiny: Ontario, especially, has been very aggressive in challenging attempts to reduce',
      '    or bypass probate through this method.',
      '',
      'b.  Ancillary Requirements: Even if the secondary Will is intended to avoid probate, there are circumstances',
      '    where it might still be required. For example, if the secondary Will creates trusts – or if financial',
      '    institutions have internal policies requiring probate documentation to open accounts for the resultant',
      '    trust – a grant of probate may still be necessary.',
      '',
      'c.  Irrevocability: When using Multiple Wills, care must be taken during the drafting process to ensure',
      '    that the execution and revocation clauses are explicitly written so that the execution of one Will does',
      '    not inadvertently revoke the other.'
    ];

    secondaryWillText.forEach(line => {
      if (yPosition > 280) {
        addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 5;
    });

    yPosition += 12;
  }

  const bankingStructure = formData.bankingStructure;
  let totalBankCount = 0;

  if (!hasSpouse) {
    totalBankCount = parseInt(formData.client1BankCount || '0');
  } else if (bankingStructure === 'joint') {
    totalBankCount = parseInt(formData.jointBankCount || '0');
  } else if (bankingStructure === 'individual') {
    totalBankCount = parseInt(formData.client1BankCount || '0') + parseInt(formData.client2BankCount || '0');
  } else if (bankingStructure === 'mixed') {
    totalBankCount = parseInt(formData.mixedJointBankCount || '0') + parseInt(formData.mixedClient1BankCount || '0') + parseInt(formData.mixedClient2BankCount || '0');
  }

  if (totalBankCount > 0) {
    addPage();
    yPosition = 12;
    addSectionHeader('Your Financial Footprint');

    doc.setFontSize(9);
    doc.setTextColor(...colors.mediumGray);
    doc.text('Banking and financial account information', margin, yPosition);
    yPosition += 12;
    doc.setTextColor(...colors.darkText);

    if (bankingStructure === 'joint') {
      const jointCount = parseInt(formData.jointBankCount || '0');
      const jointInstitutions = formData.jointInstitutionsData || [];
      for (let i = 0; i < jointCount; i++) {
        if (yPosition > 180) {
          addPage();
          yPosition = 12;
        }

        const institutionName = jointInstitutions[i]?.name || `Institution ${i + 1}`;
        addSubsectionHeader(`${institutionName} - Joint Banking Account`);
        renderBankTable(`bank_joint_${i + 1}`, jointInstitutions[i]);
      }
    } else if (bankingStructure === 'individual') {
      const client1Count = parseInt(formData.client1BankCount || '0');
      const client1Institutions = formData.client1InstitutionsData || [];
      for (let i = 0; i < client1Count; i++) {
        if (yPosition > 180) {
          addPage();
          yPosition = 12;
        }

        const institutionName = client1Institutions[i]?.name || `Institution ${i + 1}`;
        addSubsectionHeader(`${client1Name} - ${institutionName}`);
        renderBankTable(`bank_client1_${i + 1}`, client1Institutions[i]);
      }

      const client2Count = parseInt(formData.client2BankCount || '0');
      const client2Institutions = formData.client2InstitutionsData || [];
      for (let i = 0; i < client2Count; i++) {
        if (yPosition > 180) {
          addPage();
          yPosition = 12;
        }
        const institutionName = client2Institutions[i]?.name || `Institution ${i + 1}`;
        addSubsectionHeader(`${client2Name} - ${institutionName}`);
        renderBankTable(`bank_client2_${i + 1}`, client2Institutions[i]);
      }
    } else if (bankingStructure === 'mixed') {
      const jointCount = parseInt(formData.mixedJointBankCount || '0');
      const mixedJointInstitutions = formData.mixedJointInstitutionsData || [];
      for (let i = 0; i < jointCount; i++) {
        if (yPosition > 180) {
          addPage();
          yPosition = 12;
        }

        const institutionName = mixedJointInstitutions[i]?.name || `Institution ${i + 1}`;
        addSubsectionHeader(`${institutionName} - Joint Banking Account`);
        renderBankTable(`bank_mixed_joint_${i + 1}`, mixedJointInstitutions[i]);
      }

      const client1Count = parseInt(formData.mixedClient1BankCount || '0');
      const mixedClient1Institutions = formData.mixedClient1InstitutionsData || [];
      for (let i = 0; i < client1Count; i++) {
        if (yPosition > 180) {
          addPage();
          yPosition = 12;
        }

        const institutionName = mixedClient1Institutions[i]?.name || `Institution ${i + 1}`;
        addSubsectionHeader(`${client1Name} - ${institutionName}`);
        renderBankTable(`bank_mixed_client1_${i + 1}`, mixedClient1Institutions[i]);
      }

      const client2Count = parseInt(formData.mixedClient2BankCount || '0');
      const mixedClient2Institutions = formData.mixedClient2InstitutionsData || [];
      for (let i = 0; i < client2Count; i++) {
        if (yPosition > 180) {
          addPage();
          yPosition = 12;
        }

        const institutionName = mixedClient2Institutions[i]?.name || `Institution ${i + 1}`;
        addSubsectionHeader(`${client2Name} - ${institutionName}`);
        renderBankTable(`bank_mixed_client2_${i + 1}`, mixedClient2Institutions[i]);
      }
    } else if (!hasSpouse) {
      const bankCount = parseInt(formData.client1BankCount || '0');
      const client1Institutions = formData.client1InstitutionsData || [];
      for (let i = 0; i < bankCount; i++) {
        if (yPosition > 180) {
          addPage();
          yPosition = 12;
        }

        const institutionName = client1Institutions[i]?.name || `Institution ${i + 1}`;
        addSubsectionHeader(`${institutionName} - Banking Account`);
        renderBankTable(`bank_single_${i + 1}`, client1Institutions[i]);
      }
    }

  // Real Estate section removed

  addSectionHeader('Vehicles and Major Personal Property');

  const vehicleItems = [
      'Automobiles:',
      'Recreational Vehicles\n(RVs, ATVs,\nMotorcycles):',
      'Major Home\nFurnishings:',
      'Other:',
      'Other:',
      'Other:',
      'Other:'
    ];

    const vehicleCellHeight = 10;
    checkPageBreak(vehicleCellHeight + vehicleItems.length * vehicleCellHeight + 4);
    const col1Width = fieldWidth * 0.25;
    const col2Width = fieldWidth * 0.25;
    const col3Width = fieldWidth * 0.25;
    const col4Width = fieldWidth * 0.25;
    let vehicleTableY = yPosition;

    doc.setDrawColor(...colors.tableBorder);
    doc.setLineWidth(0.3);
    doc.setFillColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...colors.darkText);

    doc.rect(margin, vehicleTableY, col1Width, vehicleCellHeight, 'FD');
    doc.text('Item Description:', margin + 0.5, vehicleTableY + 4.5);

    doc.rect(margin + col1Width, vehicleTableY, col2Width, vehicleCellHeight, 'FD');
    doc.text('Physical Location:', margin + col1Width + 0.5, vehicleTableY + 4.5);

    doc.rect(margin + col1Width + col2Width, vehicleTableY, col3Width, vehicleCellHeight, 'FD');
    doc.text('Ownership\n(Sole/Joint):', margin + col1Width + col2Width + 0.5, vehicleTableY + 3);

    doc.rect(margin + col1Width + col2Width + col3Width, vehicleTableY, col4Width, vehicleCellHeight, 'FD');
    doc.text('Insurance Provider:', margin + col1Width + col2Width + col3Width + 0.5, vehicleTableY + 4.5);

    vehicleTableY += vehicleCellHeight;

    vehicleItems.forEach((item, index) => {
      doc.setDrawColor(...colors.tableBorder);
      doc.setLineWidth(0.3);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'normal');
      doc.setFontSize(7);
      doc.setTextColor(...colors.darkText);

      doc.rect(margin, vehicleTableY, col1Width, vehicleCellHeight, 'FD');
      const lines = item.split('\n');
      lines.forEach((line, lineIndex) => {
        doc.text(line, margin + 0.5, vehicleTableY + 3.5 + (lineIndex * 3));
      });

      doc.setFillColor(...colors.tableHeader);
      doc.rect(margin + col1Width, vehicleTableY, col2Width, vehicleCellHeight, 'FD');
      doc.rect(margin + col1Width + col2Width, vehicleTableY, col3Width, vehicleCellHeight, 'FD');
      doc.rect(margin + col1Width + col2Width + col3Width, vehicleTableY, col4Width, vehicleCellHeight, 'FD');

      const field1 = new doc.AcroFormTextField();
      field1.fieldName = `vehicle_location_${index}`;
      field1.Rect = [margin + col1Width + 0.3, vehicleTableY + 0.3, col2Width - 0.6, vehicleCellHeight - 0.6];
      field1.fontSize = 7;
      field1.textColor = [0, 0, 0];
      field1.borderStyle = 'none';
      doc.addField(field1);

      const field2 = new doc.AcroFormTextField();
      field2.fieldName = `vehicle_ownership_${index}`;
      field2.Rect = [margin + col1Width + col2Width + 0.3, vehicleTableY + 0.3, col3Width - 0.6, vehicleCellHeight - 0.6];
      field2.fontSize = 7;
      field2.textColor = [0, 0, 0];
      field2.borderStyle = 'none';
      doc.addField(field2);

      const field3 = new doc.AcroFormTextField();
      field3.fieldName = `vehicle_insurance_${index}`;
      field3.Rect = [margin + col1Width + col2Width + col3Width + 0.3, vehicleTableY + 0.3, col4Width - 0.6, vehicleCellHeight - 0.6];
      field3.fontSize = 7;
      field3.textColor = [0, 0, 0];
      field3.borderStyle = 'none';
      doc.addField(field3);

      vehicleTableY += vehicleCellHeight;
    });

    yPosition = vehicleTableY + 15;

    checkPageBreak(30);
    addSectionHeader('High-Value Effects and Sentimental Heirlooms');

    doc.setFontSize(8);
    const heirloomText = "Listing these items here creates a 'Memorandum of Personal Effects' which allows for distribution outside the formal Will and can reduce probate complexity and family disputes. Keep in mind things like art and collections are subjective and your heirs might not know the true value of what you have as they are going through your belongings:";
    const splitText = doc.splitTextToSize(heirloomText, fieldWidth);
    splitText.forEach((line: string) => {
      doc.text(line, margin, yPosition);
      yPosition += 4;
    });
    yPosition += 4;

    const heirloomCellHeight = 10;
    checkPageBreak(heirloomCellHeight + 4);
    const hCol1Width = fieldWidth * 0.25;
    const hCol2Width = fieldWidth * 0.25;
    const hCol3Width = fieldWidth * 0.25;
    const hCol4Width = fieldWidth * 0.25;
    let heirloomTableY = yPosition;

    doc.setDrawColor(...colors.tableBorder);
    doc.setLineWidth(0.3);
    doc.setFillColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...colors.darkText);

    doc.rect(margin, heirloomTableY, hCol1Width, heirloomCellHeight, 'FD');
    doc.text('Item (Art, Jewelry,\nCollectibles)', margin + 0.5, heirloomTableY + 3.5);

    doc.rect(margin + hCol1Width, heirloomTableY, hCol2Width, heirloomCellHeight, 'FD');
    doc.text('Location (e.g., Safe,\nDisplay)', margin + hCol1Width + 0.5, heirloomTableY + 3.5);

    doc.rect(margin + hCol1Width + hCol2Width, heirloomTableY, hCol3Width, heirloomCellHeight, 'FD');
    doc.text('Estimated\nValue/Appraisal:', margin + hCol1Width + hCol2Width + 0.5, heirloomTableY + 3.5);

    doc.rect(margin + hCol1Width + hCol2Width + hCol3Width, heirloomTableY, hCol4Width, heirloomCellHeight, 'FD');
    doc.text('Intended Beneficiary:', margin + hCol1Width + hCol2Width + hCol3Width + 0.5, heirloomTableY + 4.5);

    heirloomTableY += heirloomCellHeight;

    for (let i = 0; i < 12; i++) {
      if (heirloomTableY + heirloomCellHeight > pageHeight - 20) {
        addPage();
        heirloomTableY = 25;
      }

      doc.setDrawColor(...colors.tableBorder);
      doc.setLineWidth(0.3);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...colors.darkText);

      doc.rect(margin, heirloomTableY, hCol1Width, heirloomCellHeight, 'FD');
      doc.setFillColor(...colors.tableHeader);
      doc.rect(margin + hCol1Width, heirloomTableY, hCol2Width, heirloomCellHeight, 'FD');
      doc.rect(margin + hCol1Width + hCol2Width, heirloomTableY, hCol3Width, heirloomCellHeight, 'FD');
      doc.rect(margin + hCol1Width + hCol2Width + hCol3Width, heirloomTableY, hCol4Width, heirloomCellHeight, 'FD');

      const hField1 = new doc.AcroFormTextField();
      hField1.fieldName = `heirloom_item_${i}`;
      hField1.Rect = [margin + 0.3, heirloomTableY + 0.3, hCol1Width - 0.6, heirloomCellHeight - 0.6];
      hField1.fontSize = 7;
      hField1.textColor = [0, 0, 0];
      hField1.borderStyle = 'none';
      doc.addField(hField1);

      const hField2 = new doc.AcroFormTextField();
      hField2.fieldName = `heirloom_location_${i}`;
      hField2.Rect = [margin + hCol1Width + 0.3, heirloomTableY + 0.3, hCol2Width - 0.6, heirloomCellHeight - 0.6];
      hField2.fontSize = 7;
      hField2.textColor = [0, 0, 0];
      hField2.borderStyle = 'none';
      doc.addField(hField2);

      const hField3 = new doc.AcroFormTextField();
      hField3.fieldName = `heirloom_value_${i}`;
      hField3.Rect = [margin + hCol1Width + hCol2Width + 0.3, heirloomTableY + 0.3, hCol3Width - 0.6, heirloomCellHeight - 0.6];
      hField3.fontSize = 7;
      hField3.textColor = [0, 0, 0];
      hField3.borderStyle = 'none';
      doc.addField(hField3);

      const hField4 = new doc.AcroFormTextField();
      hField4.fieldName = `heirloom_beneficiary_${i}`;
      hField4.Rect = [margin + hCol1Width + hCol2Width + hCol3Width + 0.3, heirloomTableY + 0.3, hCol4Width - 0.6, heirloomCellHeight - 0.6];
      hField4.fontSize = 7;
      hField4.textColor = [0, 0, 0];
      hField4.borderStyle = 'none';
      doc.addField(hField4);

      heirloomTableY += heirloomCellHeight;
    }

    yPosition = heirloomTableY + 15;

    checkPageBreak(30);
    addSectionHeader('Secure Access and Storage');

    doc.setFontSize(8);
    const storageText = "Your representatives cannot protect what they cannot reach. This table identifies the physical 'gateways' to your assets:";
    const splitStorageText = doc.splitTextToSize(storageText, fieldWidth);
    splitStorageText.forEach((line: string) => {
      doc.text(line, margin, yPosition);
      yPosition += 4;
    });
    yPosition += 4;

    const storageItems = [
      'Safety Deposit Box',
      'Home Safe',
      'Storage Locker',
      'Post Office Box',
      'Other:'
    ];

    const storageCellHeight = 10;
    checkPageBreak(storageCellHeight + storageItems.length * storageCellHeight + 4);
    const sCol1Width = fieldWidth * 0.25;
    const sCol2Width = fieldWidth * 0.25;
    const sCol3Width = fieldWidth * 0.25;
    const sCol4Width = fieldWidth * 0.25;
    let storageTableY = yPosition;

    doc.setDrawColor(...colors.tableBorder);
    doc.setLineWidth(0.3);
    doc.setFillColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...colors.darkText);

    doc.rect(margin, storageTableY, sCol1Width, storageCellHeight, 'FD');
    doc.text('Storage Type:', margin + 0.5, storageTableY + 4.5);

    doc.rect(margin + sCol1Width, storageTableY, sCol2Width, storageCellHeight, 'FD');
    doc.text('Physical Location:', margin + sCol1Width + 0.5, storageTableY + 4.5);

    doc.rect(margin + sCol1Width + sCol2Width, storageTableY, sCol3Width, storageCellHeight, 'FD');
    doc.text('Key/Combination\nLocation:', margin + sCol1Width + sCol2Width + 0.5, storageTableY + 3.5);

    doc.rect(margin + sCol1Width + sCol2Width + sCol3Width, storageTableY, sCol4Width, storageCellHeight, 'FD');
    doc.text('Box/Locker Number:', margin + sCol1Width + sCol2Width + sCol3Width + 0.5, storageTableY + 4.5);

    storageTableY += storageCellHeight;

    storageItems.forEach((item, index) => {
      doc.setDrawColor(...colors.tableBorder);
      doc.setLineWidth(0.3);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'normal');
      doc.setFontSize(7);
      doc.setTextColor(...colors.darkText);

      doc.rect(margin, storageTableY, sCol1Width, storageCellHeight, 'FD');
      doc.text(item, margin + 0.5, storageTableY + 4.5);

      doc.setFillColor(...colors.tableHeader);
      doc.rect(margin + sCol1Width, storageTableY, sCol2Width, storageCellHeight, 'FD');
      doc.rect(margin + sCol1Width + sCol2Width, storageTableY, sCol3Width, storageCellHeight, 'FD');
      doc.rect(margin + sCol1Width + sCol2Width + sCol3Width, storageTableY, sCol4Width, storageCellHeight, 'FD');

      const sField1 = new doc.AcroFormTextField();
      sField1.fieldName = `storage_location_${index}`;
      sField1.Rect = [margin + sCol1Width + 0.3, storageTableY + 0.3, sCol2Width - 0.6, storageCellHeight - 0.6];
      sField1.fontSize = 7;
      sField1.textColor = [0, 0, 0];
      sField1.borderStyle = 'none';
      doc.addField(sField1);

      const sField2 = new doc.AcroFormTextField();
      sField2.fieldName = `storage_key_location_${index}`;
      sField2.Rect = [margin + sCol1Width + sCol2Width + 0.3, storageTableY + 0.3, sCol3Width - 0.6, storageCellHeight - 0.6];
      sField2.fontSize = 7;
      sField2.textColor = [0, 0, 0];
      sField2.borderStyle = 'none';
      doc.addField(sField2);

      const sField3 = new doc.AcroFormTextField();
      sField3.fieldName = `storage_box_number_${index}`;
      sField3.Rect = [margin + sCol1Width + sCol2Width + sCol3Width + 0.3, storageTableY + 0.3, sCol4Width - 0.6, storageCellHeight - 0.6];
      sField3.fontSize = 7;
      sField3.textColor = [0, 0, 0];
      sField3.borderStyle = 'none';
      doc.addField(sField3);

      storageTableY += storageCellHeight;
    });

    yPosition = storageTableY + 10;
  }


  if (formData.hasRealEstate === 'yes') {
    const propertyCount = parseInt(formData.propertyCount || '0');

    for (let propNum = 1; propNum <= propertyCount; propNum++) {
      const propertyName = formData[`property${propNum}Name`] || `Property ${propNum}`;
      const purchaseYear = formData[`property${propNum}PurchaseYear`];
      const owners = formData[`property${propNum}Owners`] || [];
      const otherOwner = formData[`property${propNum}OtherOwner`];
      const ownershipStructure = formData[`property${propNum}OwnershipStructure`];
      const address = formData[`property${propNum}Address`];
      const city = formData[`property${propNum}City`];
      const province = formData[`property${propNum}Province`];
      const country = formData[`property${propNum}Country`];
      const postalCode = formData[`property${propNum}PostalCode`];
      const isRental = formData[`property${propNum}IsRental`];
      const leaseStorage = formData[`property${propNum}LeaseStorage`];
      const lawyerName = formData[`property${propNum}LawyerName`];
      const lawyerFirm = formData[`property${propNum}LawyerFirm`];
      const lawyerPhone = formData[`property${propNum}LawyerPhone`];
      const lawyerEmail = formData[`property${propNum}LawyerEmail`];

      addSectionHeader(`Real Estate: ${propertyName}`);

      doc.setFontSize(9);
      doc.setTextColor(...colors.mediumGray);
      doc.text('Information about real estate you own', margin, yPosition);
      yPosition += 12;
      doc.setTextColor(...colors.darkText);

      if (yPosition > 180) {
        addPage();
        yPosition = 12;
      }

      addSubsectionHeader('Property Overview');

      const tableStartY = yPosition;
      const rowHeight = 8;
      const col1Width = 70;
      const col2Width = pageWidth - margin * 2 - col1Width;

      const overviewRows = [];

      if (purchaseYear) {
        overviewRows.push(['Purchase Year', purchaseYear]);
      }

      if (ownershipStructure) {
        const structureLabel = ownershipStructure === 'joint' ? 'Joint with Right of Survivorship' : 'Tenants in Common';
        overviewRows.push(['Ownership Structure', structureLabel]);
      }

      if (owners && owners.length > 0) {
        const ownersList = Array.isArray(owners) ? owners : [owners];
        const ownersDisplay = ownersList.map(o => {
          if (o === 'client1') return formData.fullName || 'Client 1';
          if (o === 'client2') return formData.spouseFullName || 'Client 2';
          if (o.startsWith('trust')) {
            const trustNum = o.replace('trust', '');
            return formData[`trust${trustNum}Name`] || `Trust ${trustNum}`;
          }
          if (o.startsWith('corp')) {
            const corpNum = o.replace('corp', '');
            return formData[`corporation${corpNum}Name`] || `Corporation ${corpNum}`;
          }
          if (o === 'other' && otherOwner) return otherOwner;
          return o;
        }).join(', ');
        overviewRows.push(['Owners', ownersDisplay]);
      }

      let currentY = tableStartY;
      overviewRows.forEach(([label, value], rowIdx) => {
        if (currentY > 260) {
          addPage();
          currentY = 12;
        }

        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        const labelLines = doc.splitTextToSize(label, col1Width - 3);
        const dynH = Math.max(rowHeight, labelLines.length * 5 + 3);

        doc.setDrawColor(...colors.tableBorder);
        doc.setLineWidth(0.3);
        doc.setFillColor(255, 255, 255);
        doc.rect(margin, currentY, col1Width, dynH, 'FD');
        doc.setTextColor(...colors.darkText);
        doc.text(labelLines, margin + 2, currentY + 5);

        doc.setFillColor(255, 255, 255);
        doc.rect(margin + col1Width, currentY, col2Width, dynH, 'FD');
        const fldPropOverview = new doc.AcroFormTextField();
        fldPropOverview.fieldName = `prop${propNum}_overview_${rowIdx}`;
        fldPropOverview.Rect = [margin + col1Width + 0.5, currentY + 0.5, col2Width - 1, dynH - 1];
        fldPropOverview.fontSize = 8;
        fldPropOverview.textColor = colors.darkText;
        fldPropOverview.borderStyle = 'none';
        fldPropOverview.value = value || '';
        doc.addField(fldPropOverview);

        currentY += dynH;
      });

      yPosition = currentY + 8;

      if (yPosition > 180) {
        addPage();
        yPosition = 12;
      }

      addSubsectionHeader('Address');

      const addressLines = [];
      if (address) addressLines.push(address);
      if (city || province || postalCode) {
        const cityLine = [city, province, postalCode].filter(Boolean).join(', ');
        addressLines.push(cityLine);
      }
      if (country) addressLines.push(country);

      if (addressLines.length > 0) {
        const addressStartY = yPosition;
        addressLines.forEach((line, addrIdx) => {
          if (yPosition > 260) {
            addPage();
            yPosition = 12;
          }
          doc.setDrawColor(...colors.tableBorder);
          doc.setFillColor(255, 255, 255);
          doc.rect(margin, yPosition, pageWidth - margin * 2, rowHeight, 'FD');
          doc.setFontSize(8);
          const fldAddr = new doc.AcroFormTextField();
          fldAddr.fieldName = `prop${propNum}_address_${addrIdx}`;
          fldAddr.Rect = [margin + 0.5, yPosition + 0.5, pageWidth - margin * 2 - 1, rowHeight - 1];
          fldAddr.fontSize = 8;
          fldAddr.textColor = colors.darkText;
          fldAddr.borderStyle = 'none';
          fldAddr.value = line || '';
          doc.addField(fldAddr);
          yPosition += rowHeight;
        });
      }

      yPosition += 8;

      if (yPosition > 180) {
        addPage();
        yPosition = 12;
      }

      addSubsectionHeader('Records & Tax Information');

      doc.setFontSize(8);
      doc.setTextColor(...colors.mediumGray);
      doc.text('These records help determine the tax cost of your property and can significantly impact', margin, yPosition);
      yPosition += 4;
      doc.text('taxes owing when it is sold or transferred.', margin, yPosition);
      yPosition += 8;
      doc.setTextColor(...colors.darkText);

      const recordsStartY = yPosition;
      const recordTypes = [
        { key: 'RecordPurchaseDocs', label: 'Original Purchase Documents' },
        { key: 'RecordLegalFees', label: 'Legal Fees and Land Transfer Tax' },
        { key: 'RecordImprovements', label: 'Capital Improvements' },
        { key: 'RecordAppraisals', label: 'Appraisals or Valuations' }
      ];

      const recordCol1 = 60;
      const recordCol2 = 25;
      const recordCol3 = pageWidth - margin * 2 - recordCol1 - recordCol2;

      doc.setDrawColor(...colors.tableBorder);
      doc.setLineWidth(0.3);
      doc.setFillColor(255, 255, 255);
      doc.rect(margin, yPosition, recordCol1, rowHeight, 'FD');
      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...colors.darkText);
      doc.text('Record Type', margin + 2, yPosition + 5);

      doc.setFillColor(255, 255, 255);
      doc.rect(margin + recordCol1, yPosition, recordCol2, rowHeight, 'FD');
      doc.text('Available', margin + recordCol1 + 2, yPosition + 5);

      doc.setFillColor(255, 255, 255);
      doc.rect(margin + recordCol1 + recordCol2, yPosition, recordCol3, rowHeight, 'FD');
      doc.text('Storage Location', margin + recordCol1 + recordCol2 + 2, yPosition + 5);
      doc.setFont(undefined, 'normal');

      yPosition += rowHeight;

      recordTypes.forEach(({ key, label }) => {
        if (yPosition > 260) {
          addPage();
          yPosition = 12;
        }

        const hasRecord = formData[`property${propNum}${key}`] === 'yes';
        const location = formData[`property${propNum}${key}Location`] || '';

        doc.setDrawColor(...colors.tableBorder);
        doc.setLineWidth(0.3);
        doc.setFillColor(255, 255, 255);
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(...colors.darkText);
        doc.rect(margin, yPosition, recordCol1, rowHeight, 'FD');
        doc.text(label, margin + 2, yPosition + 5);

        doc.setFillColor(255, 255, 255);
        doc.rect(margin + recordCol1, yPosition, recordCol2, rowHeight, 'FD');
        doc.text(hasRecord ? 'Yes' : 'No', margin + recordCol1 + 2, yPosition + 5);

        doc.setFillColor(...colors.tableHeader);
        doc.rect(margin + recordCol1 + recordCol2, yPosition, recordCol3, rowHeight, 'FD');
        {
          const fldRecLoc = new doc.AcroFormTextField();
          fldRecLoc.fieldName = `prop${propNum}_rec_${key}_loc`;
          fldRecLoc.Rect = [margin + recordCol1 + recordCol2 + 0.5, yPosition + 0.5, recordCol3 - 1, rowHeight - 1];
          fldRecLoc.fontSize = 8;
          fldRecLoc.textColor = colors.darkText;
          fldRecLoc.borderStyle = 'none';
          fldRecLoc.value = (hasRecord && location) ? location : '';
          doc.addField(fldRecLoc);
        }

        yPosition += rowHeight;
      });

      yPosition += 8;

      if (isRental === 'yes') {
        if (yPosition > 180) {
          addPage();
          yPosition = 12;
        }

        addSubsectionHeader('Rental Information');

        const rentalStartY = yPosition;
        doc.setDrawColor(...colors.tableBorder);
        doc.setLineWidth(0.3);
        doc.setFillColor(255, 255, 255);
        doc.rect(margin, yPosition, col1Width, rowHeight, 'FD');
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(...colors.darkText);
        doc.text('Rental Property', margin + 2, yPosition + 5);

        doc.setFillColor(255, 255, 255);
        doc.rect(margin + col1Width, yPosition, col2Width, rowHeight, 'FD');
        doc.text('Yes', margin + col1Width + 2, yPosition + 5);
        yPosition += rowHeight;

        if (leaseStorage) {
          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);
          doc.setFillColor(255, 255, 255);
          doc.rect(margin, yPosition, col1Width, rowHeight, 'FD');
          doc.setFont(undefined, 'normal');
          doc.text('Lease Storage Location', margin + 2, yPosition + 5);

          doc.setFillColor(...colors.tableHeader);
          doc.rect(margin + col1Width, yPosition, col2Width, rowHeight, 'FD');
          const fldLease = new doc.AcroFormTextField();
          fldLease.fieldName = `prop${propNum}_lease_storage`;
          fldLease.Rect = [margin + col1Width + 0.5, yPosition + 0.5, col2Width - 1, rowHeight - 1];
          fldLease.fontSize = 8;
          fldLease.textColor = colors.darkText;
          fldLease.borderStyle = 'none';
          fldLease.value = leaseStorage || '';
          doc.addField(fldLease);
          yPosition += rowHeight;
        }

        yPosition += 8;
      }

      if (lawyerName || lawyerFirm || lawyerPhone || lawyerEmail) {
        if (yPosition > 180) {
          addPage();
          yPosition = 12;
        }

        addSubsectionHeader('Legal Contact');

        const lawyerRows = [];
        if (lawyerName) lawyerRows.push(['Lawyer Name', lawyerName]);
        if (lawyerFirm) lawyerRows.push(['Firm Name', lawyerFirm]);
        if (lawyerPhone) lawyerRows.push(['Phone Number', lawyerPhone]);
        if (lawyerEmail) lawyerRows.push(['Email Address', lawyerEmail]);

        lawyerRows.forEach(([label, value], lawyerRowIdx) => {
          if (yPosition > 260) {
            addPage();
            yPosition = 12;
          }

          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);
          doc.setFillColor(255, 255, 255);
          doc.rect(margin, yPosition, col1Width, rowHeight, 'FD');
          doc.setFontSize(8);
          doc.setFont(undefined, 'normal');
          doc.setTextColor(...colors.darkText);
          doc.text(label, margin + 2, yPosition + 5);

          doc.setFillColor(...colors.tableHeader);
          doc.rect(margin + col1Width, yPosition, col2Width, rowHeight, 'FD');
          const fldLawyer = new doc.AcroFormTextField();
          fldLawyer.fieldName = `prop${propNum}_lawyer_${lawyerRowIdx}`;
          fldLawyer.Rect = [margin + col1Width + 0.5, yPosition + 0.5, col2Width - 1, rowHeight - 1];
          fldLawyer.fontSize = 8;
          fldLawyer.textColor = colors.darkText;
          fldLawyer.borderStyle = 'none';
          fldLawyer.value = value || '';
          doc.addField(fldLawyer);

          yPosition += rowHeight;
        });

        yPosition += 8;
      }

      if (yPosition > 220) {
        addPage();
        yPosition = 12;
      }

      addSubsectionHeader('Additional Notes or Missing Information');

      const notesBoxHeight = 30;
      doc.setDrawColor(...colors.tableBorder);
      doc.setFillColor(255, 255, 255);
      doc.rect(margin, yPosition, pageWidth - margin * 2, notesBoxHeight, 'FD');

      const notesField = new doc.AcroFormTextField();
      notesField.fieldName = `property_${propNum}_additional_notes`;
      notesField.Rect = [margin + 0.3, yPosition + 0.3, pageWidth - margin * 2 - 0.6, notesBoxHeight - 0.6];
      notesField.multiline = true;
      notesField.fontSize = 8;
      notesField.textColor = [0, 0, 0];
      notesField.borderStyle = 'none';
      doc.addField(notesField);

      yPosition += notesBoxHeight + 15;

      if (propNum < propertyCount && yPosition > 220) {
        addPage();
        yPosition = 12;
      }
    }
  }
  if (formData.hasDebts === 'yes' && formData.debtsData && formData.debtsData.length > 0) {
    addSectionHeader('Outstanding Debts');

    doc.setFontSize(9);
    doc.setTextColor(...colors.mediumGray);
    doc.text('Information about outstanding debts (not including credit cards)', margin, yPosition);
    yPosition += 12;
    doc.setTextColor(...colors.darkText);

    const client1Name = formData.fullName || 'Client 1';
    const client2Name = formData.spouseName || 'Client 2';

    const client1Debts = formData.debtsData.filter(debt => debt.debtOwner === client1Name);
    const client2Debts = formData.debtsData.filter(debt => debt.debtOwner === client2Name);
    const jointDebts = formData.debtsData.filter(debt => debt.debtOwner === 'Jointly');
    const otherDebts = formData.debtsData.filter(debt =>
      debt.debtOwner !== client1Name &&
      debt.debtOwner !== client2Name &&
      debt.debtOwner !== 'Jointly'
    );

    const debtGroups = [
      { debts: client1Debts, heading: `${client1Name}'s Debts` },
      { debts: client2Debts, heading: `${client2Name}'s Debts` },
      { debts: jointDebts, heading: 'Joint Debts' },
      { debts: otherDebts, heading: 'Other Debts' }
    ];

    const debtRows = [
      'Lender Name:',
      'Loan Type:',
      'Interest Rate:',
      'Loan Maturity:',
      'Payment Amount:',
      'Payment Frequency:',
      'Contact Name:',
      'Contact Phone:',
      'Where is the Contract Stored:',
      'Other Details:',
    ];

    debtGroups.forEach((group, groupIndex) => {
      if (group.debts.length === 0) return;

      if (groupIndex > 0) {
        yPosition += 12;
      }

      if (yPosition > 200) {
        addPage();
        yPosition = 12;
      }

      addSubsectionHeader(group.heading);

      const debtsToProcess = group.debts;
      let debtStartIndex = 0;

      while (debtStartIndex < debtsToProcess.length) {
        const debtsInThisChart = debtsToProcess.slice(debtStartIndex, debtStartIndex + 3);

        if (debtStartIndex > 0) {
          if (yPosition > 150) {
            addPage();
            yPosition = 12;
          }
          doc.setFontSize(11);
          doc.setFont(undefined, 'bold');
          doc.text(`${group.heading} (continued)`, margin, yPosition);
          doc.setFont(undefined, 'normal');
          yPosition += 10;
        }

        const numDebts = debtsInThisChart.length;
        const cellHeight = 7;
        const labelColWidth = fieldWidth * 0.28;
        const valueColWidth = (fieldWidth - labelColWidth) / numDebts;
        let debtTableY = yPosition;

        debtRows.forEach((rowLabel, rowIndex) => {
          if (debtTableY > 275) {
            addPage();
            debtTableY = 12;
          }

          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);
          doc.setFillColor(255, 255, 255);
          doc.setFont(undefined, 'normal');
          doc.setFontSize(8);
          doc.setTextColor(...colors.darkText);

          const labelColX = margin;
          doc.rect(labelColX, debtTableY, labelColWidth, cellHeight, 'FD');
          doc.text(rowLabel, labelColX + 0.5, debtTableY + 4.5);

          for (let i = 0; i < numDebts; i++) {
            const debt = debtsInThisChart[i];
            const valueColX = margin + labelColWidth + (i * valueColWidth);

            if (rowIndex === 1 && debt.debtType) {
              doc.setFillColor(255, 255, 255);
              doc.rect(valueColX, debtTableY, valueColWidth, cellHeight, 'FD');
              doc.setFontSize(7);
              doc.text(debt.debtType, valueColX + 0.5, debtTableY + 4.5);
              doc.setFontSize(8);
            } else {
              doc.setFillColor(...colors.tableHeader);
              doc.rect(valueColX, debtTableY, valueColWidth, cellHeight, 'FD');
              const debtField = new doc.AcroFormTextField();
              const globalDebtIndex = formData.debtsData.indexOf(debt);
              debtField.fieldName = `debt_${globalDebtIndex + 1}_row_${rowIndex}_col`;
              debtField.Rect = [valueColX + 0.3, debtTableY + 0.3, valueColWidth - 0.6, cellHeight - 0.6];
              debtField.fontSize = 7;
              debtField.textColor = [0, 0, 0];
              debtField.borderStyle = 'none';
              doc.addField(debtField);
            }
          }

          debtTableY += cellHeight;
        });

        debtsInThisChart.forEach((debt, i) => {
          if (debt.hasOtherOnLoan === 'yes') {
            if (debtTableY > 270) {
              addPage();
              debtTableY = 12;
            }

            const valueColX = margin + labelColWidth + (i * valueColWidth);

            doc.setDrawColor(...colors.tableBorder);
            doc.setLineWidth(0.3);
            doc.setFillColor(255, 255, 255);
            doc.setTextColor(...colors.darkText);
            doc.rect(margin, debtTableY, labelColWidth, cellHeight, 'FD');
            doc.text('Other on Loan:', margin + 0.5, debtTableY + 4.5);

            doc.setFillColor(...colors.tableHeader);
            doc.rect(valueColX, debtTableY, valueColWidth, cellHeight, 'FD');
            const otherNameField = new doc.AcroFormTextField();
            const globalDebtIndex = formData.debtsData.indexOf(debt);
            otherNameField.fieldName = `debt_${globalDebtIndex + 1}_other_name`;
            otherNameField.Rect = [valueColX + 0.3, debtTableY + 0.3, valueColWidth - 0.6, cellHeight - 0.6];
            otherNameField.fontSize = 7;
            otherNameField.textColor = [0, 0, 0];
            otherNameField.borderStyle = 'none';
            if (debt.otherPersonName) {
              otherNameField.value = debt.otherPersonName;
            }
            doc.addField(otherNameField);
          }
        });

        if (debtsInThisChart.some(debt => debt.hasOtherOnLoan === 'yes')) {
          debtTableY += cellHeight;
        }

        debtsInThisChart.forEach((debt, i) => {
          if (debt.hasOtherOnLoan === 'yes') {
            const valueColX = margin + labelColWidth + (i * valueColWidth);

            if (debtTableY > 270) {
              addPage();
              debtTableY = 12;
            }

            doc.setDrawColor(...colors.tableBorder);
            doc.setLineWidth(0.3);
            doc.setFillColor(255, 255, 255);
            doc.setTextColor(...colors.darkText);
            doc.rect(margin, debtTableY, labelColWidth, cellHeight, 'FD');
            doc.text('Other Phone:', margin + 0.5, debtTableY + 4.5);

            doc.setFillColor(...colors.tableHeader);
            doc.rect(valueColX, debtTableY, valueColWidth, cellHeight, 'FD');
            const otherPhoneField = new doc.AcroFormTextField();
            const globalDebtIndex = formData.debtsData.indexOf(debt);
            otherPhoneField.fieldName = `debt_${globalDebtIndex + 1}_other_phone`;
            otherPhoneField.Rect = [valueColX + 0.3, debtTableY + 0.3, valueColWidth - 0.6, cellHeight - 0.6];
            otherPhoneField.fontSize = 7;
            otherPhoneField.textColor = [0, 0, 0];
            otherPhoneField.borderStyle = 'none';
            if (debt.otherPersonPhone) {
              otherPhoneField.value = debt.otherPersonPhone;
            }
            doc.addField(otherPhoneField);
          }
        });

        if (debtsInThisChart.some(debt => debt.hasOtherOnLoan === 'yes')) {
          debtTableY += cellHeight;
        }

        debtsInThisChart.forEach((debt, i) => {
          if (debtTableY > 270) {
            addPage();
            debtTableY = 12;
          }

          const valueColX = margin + labelColWidth + (i * valueColWidth);

          doc.setDrawColor(...colors.tableBorder);
          doc.setLineWidth(0.3);
          doc.setFillColor(255, 255, 255);
          doc.setTextColor(...colors.darkText);
          doc.rect(margin, debtTableY, labelColWidth, cellHeight, 'FD');
          doc.text('Secured/Unsecured:', margin + 0.5, debtTableY + 4.5);

          if (debt.isSecured === 'no') {
            doc.setFillColor(255, 255, 255);
            doc.rect(valueColX, debtTableY, valueColWidth, cellHeight, 'FD');
            doc.setFontSize(7);
            doc.text('Unsecured Loan', valueColX + 0.5, debtTableY + 4.5);
            doc.setFontSize(8);
          } else if (debt.isSecured === 'yes') {
            doc.setFillColor(255, 255, 255);
            doc.rect(valueColX, debtTableY, valueColWidth, cellHeight, 'FD');
            doc.setFontSize(7);
            doc.text('Secured', valueColX + 0.5, debtTableY + 4.5);
            doc.setFontSize(8);
          } else {
            doc.setFillColor(...colors.tableHeader);
            doc.rect(valueColX, debtTableY, valueColWidth, cellHeight, 'FD');
            const securedField = new doc.AcroFormTextField();
            const globalDebtIndex = formData.debtsData.indexOf(debt);
            securedField.fieldName = `debt_${globalDebtIndex + 1}_secured_status`;
            securedField.Rect = [valueColX + 0.3, debtTableY + 0.3, valueColWidth - 0.6, cellHeight - 0.6];
            securedField.fontSize = 7;
            securedField.textColor = [0, 0, 0];
            securedField.borderStyle = 'none';
            doc.addField(securedField);
          }
        });

        debtTableY += cellHeight;

        debtsInThisChart.forEach((debt, i) => {
          if (debt.isSecured === 'yes') {
            if (debtTableY > 270) {
              addPage();
              debtTableY = 12;
            }

            const valueColX = margin + labelColWidth + (i * valueColWidth);

            doc.setDrawColor(...colors.tableBorder);
            doc.setLineWidth(0.3);
            doc.setFillColor(255, 255, 255);
            doc.setTextColor(...colors.darkText);
            doc.rect(margin, debtTableY, labelColWidth, cellHeight, 'FD');
            doc.text('Secured By:', margin + 0.5, debtTableY + 4.5);

            doc.setFillColor(...colors.tableHeader);
            doc.rect(valueColX, debtTableY, valueColWidth, cellHeight, 'FD');
            const securedByField = new doc.AcroFormTextField();
            const globalDebtIndex = formData.debtsData.indexOf(debt);
            securedByField.fieldName = `debt_${globalDebtIndex + 1}_secured_by`;
            securedByField.Rect = [valueColX + 0.3, debtTableY + 0.3, valueColWidth - 0.6, cellHeight - 0.6];
            securedByField.fontSize = 7;
            securedByField.textColor = [0, 0, 0];
            securedByField.borderStyle = 'none';
            if (debt.securedBy) {
              securedByField.value = debt.securedBy;
            }
            doc.addField(securedByField);
          }
        });

        if (debtsInThisChart.some(debt => debt.isSecured === 'yes')) {
          debtTableY += cellHeight;
        }

        yPosition = debtTableY + 15;
        debtStartIndex += 3;
      }
    });
  }

  if (formData.client1HasCreditCards === 'yes' && formData.creditCardsData && formData.creditCardsData.length > 0) {
    yPosition += 12;
    addSectionHeader('Credit Cards');

    const client1Name = formData.fullName || 'Client 1';

    const cellHeight = 6;
    const colWidths = [
      fieldWidth * 0.28,
      fieldWidth * 0.22,
      fieldWidth * 0.18,
      fieldWidth * 0.32
    ];

    let ccTableY = yPosition;

    doc.setDrawColor(...colors.tableBorder);
    doc.setLineWidth(0.3);
    doc.setFillColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...colors.darkText);

    const col1X = margin;
    const col2X = margin + colWidths[0];
    const col3X = margin + colWidths[0] + colWidths[1];
    const col4X = margin + colWidths[0] + colWidths[1] + colWidths[2];

    doc.rect(col1X, ccTableY, colWidths[0], cellHeight, 'FD');
    doc.rect(col2X, ccTableY, colWidths[1], cellHeight, 'FD');
    doc.rect(col3X, ccTableY, colWidths[2], cellHeight, 'FD');
    doc.rect(col4X, ccTableY, colWidths[3], cellHeight, 'FD');

    doc.text('Credit Card Company:', col1X + 0.5, ccTableY + 4);
    doc.text('Last 4 Digits of the Card:', col2X + 0.5, ccTableY + 4);
    doc.text('Expiry Date:', col3X + 0.5, ccTableY + 4);
    doc.text('Other parties on this card (if applicable):', col4X + 0.5, ccTableY + 4);

    ccTableY += cellHeight;

    formData.creditCardsData.forEach((card, index) => {
      if (ccTableY > 275) {
        addPage();
        ccTableY = 12;
      }

      doc.setDrawColor(...colors.tableBorder);
      doc.setLineWidth(0.3);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'normal');
      doc.setFontSize(8);

      doc.rect(col1X, ccTableY, colWidths[0], cellHeight, 'FD');
      doc.setFillColor(...colors.tableHeader);
      doc.rect(col2X, ccTableY, colWidths[1], cellHeight, 'FD');
      doc.rect(col3X, ccTableY, colWidths[2], cellHeight, 'FD');
      doc.rect(col4X, ccTableY, colWidths[3], cellHeight, 'FD');

      const ccField1 = new doc.AcroFormTextField();
      ccField1.fieldName = `credit_card_${index + 1}_company`;
      ccField1.Rect = [col1X + 0.3, ccTableY + 0.3, colWidths[0] - 0.6, cellHeight - 0.6];
      ccField1.fontSize = 7;
      ccField1.textColor = [0, 0, 0];
      ccField1.borderStyle = 'none';
      if (card.company) {
        ccField1.value = card.company;
      }
      doc.addField(ccField1);

      const ccField2 = new doc.AcroFormTextField();
      ccField2.fieldName = `credit_card_${index + 1}_last_four`;
      ccField2.Rect = [col2X + 0.3, ccTableY + 0.3, colWidths[1] - 0.6, cellHeight - 0.6];
      ccField2.fontSize = 7;
      ccField2.textColor = [0, 0, 0];
      ccField2.borderStyle = 'none';
      if (card.lastFourDigits) {
        ccField2.value = card.lastFourDigits;
      }
      doc.addField(ccField2);

      const ccField3 = new doc.AcroFormTextField();
      ccField3.fieldName = `credit_card_${index + 1}_expiry`;
      ccField3.Rect = [col3X + 0.3, ccTableY + 0.3, colWidths[2] - 0.6, cellHeight - 0.6];
      ccField3.fontSize = 7;
      ccField3.textColor = [0, 0, 0];
      ccField3.borderStyle = 'none';
      if (card.expiryDate) {
        ccField3.value = card.expiryDate;
      }
      doc.addField(ccField3);

      const ccField4 = new doc.AcroFormTextField();
      ccField4.fieldName = `credit_card_${index + 1}_other_parties`;
      ccField4.Rect = [col4X + 0.3, ccTableY + 0.3, colWidths[3] - 0.6, cellHeight - 0.6];
      ccField4.fontSize = 7;
      ccField4.textColor = [0, 0, 0];
      ccField4.borderStyle = 'none';
      if (card.otherParties) {
        ccField4.value = card.otherParties;
      }
      doc.addField(ccField4);

      ccTableY += cellHeight;
    });

    yPosition = ccTableY + 15;
  } else if (formData.client1HasCreditCards === 'no') {
    yPosition += 12;
    if (yPosition > 270) {
      addPage();
      yPosition = 12;
    }

    const client1Name = formData.fullName || 'Client 1';

    addSectionHeader('Credit Cards');

    doc.setFontSize(10);
    doc.text(`${client1Name} indicated that they have no credit cards.`, margin, yPosition);
    yPosition += 15;
  }

  if ((formData.maritalStatus === 'married' || formData.maritalStatus === 'common_law')) {
    if (formData.client2HasCreditCards === 'yes' && formData.client2CreditCardsData && formData.client2CreditCardsData.length > 0) {
      yPosition += 12;
      if (yPosition > 240) {
        addPage();
        yPosition = 12;
      }

      const client2Name = formData.spouseName || 'Client 2';

      addSectionHeader(`${client2Name}'s Credit Cards`);

      const cellHeight = 6;
      const colWidths = [
        fieldWidth * 0.28,
        fieldWidth * 0.22,
        fieldWidth * 0.18,
        fieldWidth * 0.32
      ];

      let ccTableY = yPosition;

      doc.setDrawColor(...colors.tableBorder);
      doc.setLineWidth(0.3);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...colors.darkText);

      const col1X = margin;
      const col2X = margin + colWidths[0];
      const col3X = margin + colWidths[0] + colWidths[1];
      const col4X = margin + colWidths[0] + colWidths[1] + colWidths[2];

      doc.rect(col1X, ccTableY, colWidths[0], cellHeight, 'FD');
      doc.rect(col2X, ccTableY, colWidths[1], cellHeight, 'FD');
      doc.rect(col3X, ccTableY, colWidths[2], cellHeight, 'FD');
      doc.rect(col4X, ccTableY, colWidths[3], cellHeight, 'FD');

      doc.text('Credit Card Company:', col1X + 0.5, ccTableY + 4);
      doc.text('Last 4 Digits of the Card:', col2X + 0.5, ccTableY + 4);
      doc.text('Expiry Date:', col3X + 0.5, ccTableY + 4);
      doc.text('Other parties on this card (if applicable):', col4X + 0.5, ccTableY + 4);

      ccTableY += cellHeight;

      formData.client2CreditCardsData.forEach((card, index) => {
        if (ccTableY > 275) {
          addPage();
          ccTableY = 12;
        }

        doc.setDrawColor(...colors.tableBorder);
        doc.setLineWidth(0.3);
        doc.setFillColor(255, 255, 255);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(8);

        doc.rect(col1X, ccTableY, colWidths[0], cellHeight, 'FD');
        doc.setFillColor(...colors.tableHeader);
        doc.rect(col2X, ccTableY, colWidths[1], cellHeight, 'FD');
        doc.rect(col3X, ccTableY, colWidths[2], cellHeight, 'FD');
        doc.rect(col4X, ccTableY, colWidths[3], cellHeight, 'FD');

        const ccField1 = new doc.AcroFormTextField();
        ccField1.fieldName = `client2_credit_card_${index + 1}_company`;
        ccField1.Rect = [col1X + 0.3, ccTableY + 0.3, colWidths[0] - 0.6, cellHeight - 0.6];
        ccField1.fontSize = 7;
        ccField1.textColor = [0, 0, 0];
        ccField1.borderStyle = 'none';
        if (card.company) {
          ccField1.value = card.company;
        }
        doc.addField(ccField1);

        const ccField2 = new doc.AcroFormTextField();
        ccField2.fieldName = `client2_credit_card_${index + 1}_last_four`;
        ccField2.Rect = [col2X + 0.3, ccTableY + 0.3, colWidths[1] - 0.6, cellHeight - 0.6];
        ccField2.fontSize = 7;
        ccField2.textColor = [0, 0, 0];
        ccField2.borderStyle = 'none';
        if (card.lastFourDigits) {
          ccField2.value = card.lastFourDigits;
        }
        doc.addField(ccField2);

        const ccField3 = new doc.AcroFormTextField();
        ccField3.fieldName = `client2_credit_card_${index + 1}_expiry`;
        ccField3.Rect = [col3X + 0.3, ccTableY + 0.3, colWidths[2] - 0.6, cellHeight - 0.6];
        ccField3.fontSize = 7;
        ccField3.textColor = [0, 0, 0];
        ccField3.borderStyle = 'none';
        if (card.expiryDate) {
          ccField3.value = card.expiryDate;
        }
        doc.addField(ccField3);

        const ccField4 = new doc.AcroFormTextField();
        ccField4.fieldName = `client2_credit_card_${index + 1}_other_parties`;
        ccField4.Rect = [col4X + 0.3, ccTableY + 0.3, colWidths[3] - 0.6, cellHeight - 0.6];
        ccField4.fontSize = 7;
        ccField4.textColor = [0, 0, 0];
        ccField4.borderStyle = 'none';
        if (card.otherParties) {
          ccField4.value = card.otherParties;
        }
        doc.addField(ccField4);

        ccTableY += cellHeight;
      });

      yPosition = ccTableY + 15;
    } else if (formData.client2HasCreditCards === 'no') {
      yPosition += 12;
      if (yPosition > 270) {
        addPage();
        yPosition = 12;
      }

      const client2Name = formData.spouseName || 'Client 2';

      addSectionHeader(`${client2Name}'s Credit Cards`);

      doc.setFontSize(10);
      doc.text(`${client2Name} indicated that they have no credit cards.`, margin, yPosition);
      yPosition += 15;
    }
  }

  const generateInsuranceChart = (
    policyType: string,
    policyCount: number,
    clientName: string
  ) => {
    if (policyCount <= 0) return;

    if (yPosition > 200) {
      addPage();
      yPosition = 12;
    }

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(`${clientName}'s ${policyType}`, margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 10;

    const insuranceRows = [
      'Life Insured:',
      'Insurance Company:',
      'Insurance Policy Number (last 4 digits):',
      'Beneficiary:',
      'Policy Maturity Date:',
      'Premium Amount:',
      'Premium Payment Frequency:',
      'Benefit Amount:',
      'Benefit Frequency:',
      'Benefit Ends:',
      'Waiting Period:',
      'Where is the Policy Document Stored?',
      'Other Details:',
    ];

    const cellHeight = 7;
    const labelColWidth = fieldWidth * 0.28;
    const valueColWidth = (fieldWidth - labelColWidth) / policyCount;
    let insuranceTableY = yPosition;

    insuranceRows.forEach((rowLabel, rowIndex) => {
      if (insuranceTableY > 275) {
        addPage();
        insuranceTableY = 12;
      }

      doc.setFont(undefined, 'normal');
      doc.setFontSize(8);
      const labelLines = doc.splitTextToSize(rowLabel, labelColWidth - 2);
      const dynH = Math.max(cellHeight, labelLines.length * 5 + 3);

      doc.setDrawColor(...colors.tableBorder);
      doc.setLineWidth(0.3);
      doc.setFillColor(255, 255, 255);
      doc.setTextColor(...colors.darkText);

      const labelColX = margin;
      doc.rect(labelColX, insuranceTableY, labelColWidth, dynH, 'FD');
      doc.text(labelLines, labelColX + 0.5, insuranceTableY + 4.5);

      for (let i = 0; i < policyCount; i++) {
        const valueColX = margin + labelColWidth + (i * valueColWidth);
        doc.setFillColor(...colors.tableHeader);
        doc.rect(valueColX, insuranceTableY, valueColWidth, dynH, 'FD');

        const insuranceField = new doc.AcroFormTextField();
        insuranceField.fieldName = `${policyType.replace(/\s+/g, '_').toLowerCase()}_${clientName.replace(/\s+/g, '_').toLowerCase()}_${i + 1}_row_${rowIndex}`;
        insuranceField.Rect = [valueColX + 0.3, insuranceTableY + 0.3, valueColWidth - 0.6, dynH - 0.6];
        insuranceField.fontSize = 7;
        insuranceField.textColor = [0, 0, 0];
        insuranceField.borderStyle = 'none';
        doc.addField(insuranceField);
      }

      insuranceTableY += dynH;
    });

    yPosition = insuranceTableY + 15;
  };

  const generateWorkBenefitsChart = (clientName: string, hasWorkBenefits: string, isFirst: boolean = false) => {
    if (yPosition > 240) {
      addPage();
      yPosition = 12;
    }

    if (isFirst) {
      addSectionHeader('Insurance Summary');
    }

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(`${clientName}'s Work Benefits`, margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 10;

    if (hasWorkBenefits === 'no') {
      doc.setFontSize(10);
      doc.text(`${clientName} indicated that they have no life, disability, or critical illness insurance through their work.`, margin, yPosition);
      yPosition += 15;
      return;
    }

    const workBenefitsRows = [
      "Employer's Name:",
      'Insurance Provider:',
      'Life Insurance Death Benefit:',
      'Disability Benefit:',
      'Critical Illness Benefit:',
      'Location of a copy of your benefits package:',
    ];

    const cellHeight = 7;
    const labelColWidth = fieldWidth * 0.45;
    const valueColWidth = fieldWidth - labelColWidth;
    let workBenefitsTableY = yPosition;

    workBenefitsRows.forEach((rowLabel, rowIndex) => {
      if (workBenefitsTableY > 275) {
        addPage();
        workBenefitsTableY = 12;
      }

      doc.setFont(undefined, 'normal');
      doc.setFontSize(8);
      const labelLines = doc.splitTextToSize(rowLabel, labelColWidth - 2);
      const dynH = Math.max(cellHeight, labelLines.length * 5 + 3);

      doc.setDrawColor(...colors.tableBorder);
      doc.setLineWidth(0.3);
      doc.setFillColor(255, 255, 255);
      doc.setTextColor(...colors.darkText);

      const labelColX = margin;
      doc.rect(labelColX, workBenefitsTableY, labelColWidth, dynH, 'FD');
      doc.text(labelLines, labelColX + 0.5, workBenefitsTableY + 4.5);

      const valueColX = margin + labelColWidth;
      doc.setFillColor(...colors.tableHeader);
      doc.rect(valueColX, workBenefitsTableY, valueColWidth, dynH, 'FD');

      const workBenefitsField = new doc.AcroFormTextField();
      workBenefitsField.fieldName = `work_benefits_${clientName.replace(/\s+/g, '_').toLowerCase()}_row_${rowIndex}`;
      workBenefitsField.Rect = [valueColX + 0.3, workBenefitsTableY + 0.3, valueColWidth - 0.6, dynH - 0.6];
      workBenefitsField.fontSize = 7;
      workBenefitsField.textColor = [0, 0, 0];
      workBenefitsField.borderStyle = 'none';
      doc.addField(workBenefitsField);

      workBenefitsTableY += dynH;
    });

    yPosition = workBenefitsTableY + 15;
  };

  const hasAnyInsurance = formData.client1HasWorkBenefits || formData.client2HasWorkBenefits ||
    (formData.client1HasLifeInsurance === 'yes' && formData.client1LifeInsuranceCount && parseInt(formData.client1LifeInsuranceCount) > 0) ||
    (formData.client2HasLifeInsurance === 'yes' && formData.client2LifeInsuranceCount && parseInt(formData.client2LifeInsuranceCount) > 0) ||
    (formData.client1HasDisabilityInsurance === 'yes' && formData.client1DisabilityInsuranceCount && parseInt(formData.client1DisabilityInsuranceCount) > 0) ||
    (formData.client2HasDisabilityInsurance === 'yes' && formData.client2DisabilityInsuranceCount && parseInt(formData.client2DisabilityInsuranceCount) > 0) ||
    (formData.client1HasCriticalIllness === 'yes' && formData.client1CriticalIllnessCount && parseInt(formData.client1CriticalIllnessCount) > 0) ||
    (formData.client2HasCriticalIllness === 'yes' && formData.client2CriticalIllnessCount && parseInt(formData.client2CriticalIllnessCount) > 0) ||
    formData.hasHomeInsurance === 'yes' || formData.client1HasVehicleInsurance === 'yes' || formData.client2HasVehicleInsurance === 'yes';

  let isFirstInsuranceSection = hasAnyInsurance;

  if (formData.client1HasWorkBenefits) {
    generateWorkBenefitsChart(formData.fullName || 'Client 1', formData.client1HasWorkBenefits, isFirstInsuranceSection);
    isFirstInsuranceSection = false;
  }

  if (formData.client2HasWorkBenefits) {
    generateWorkBenefitsChart(formData.spouseName || 'Client 2', formData.client2HasWorkBenefits, isFirstInsuranceSection);
    isFirstInsuranceSection = false;
  }

  const hasAnyLifeInsurance =
    (formData.client1HasLifeInsurance === 'yes' && formData.client1LifeInsuranceCount && parseInt(formData.client1LifeInsuranceCount) > 0) ||
    (formData.client2HasLifeInsurance === 'yes' && formData.client2LifeInsuranceCount && parseInt(formData.client2LifeInsuranceCount) > 0);

  if (hasAnyLifeInsurance) {
    if (yPosition > 240) {
      addPage();
      yPosition = 12;
    }

    if (isFirstInsuranceSection) {
      addSectionHeader('Insurance Summary');
      isFirstInsuranceSection = false;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Life Insurance', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 15;
  }

  if (formData.client1HasLifeInsurance === 'yes' && formData.client1LifeInsuranceCount) {
    const count = parseInt(formData.client1LifeInsuranceCount);
    if (count > 0) {
      generateInsuranceChart('Life Insurance Policies', count, formData.fullName || 'Client 1');
    }
  }

  if (formData.client2HasLifeInsurance === 'yes' && formData.client2LifeInsuranceCount) {
    const count = parseInt(formData.client2LifeInsuranceCount);
    if (count > 0) {
      generateInsuranceChart('Life Insurance Policies', count, formData.spouseName || 'Client 2');
    }
  }

  const hasAnyDisabilityInsurance =
    (formData.client1HasDisabilityInsurance === 'yes' && formData.client1DisabilityInsuranceCount && parseInt(formData.client1DisabilityInsuranceCount) > 0) ||
    (formData.client2HasDisabilityInsurance === 'yes' && formData.client2DisabilityInsuranceCount && parseInt(formData.client2DisabilityInsuranceCount) > 0);

  if (hasAnyDisabilityInsurance) {
    if (yPosition > 240) {
      addPage();
      yPosition = 12;
    }

    if (isFirstInsuranceSection) {
      addSectionHeader('Insurance Summary');
      isFirstInsuranceSection = false;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Disability Insurance', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 15;
  }

  if (formData.client1HasDisabilityInsurance === 'yes' && formData.client1DisabilityInsuranceCount) {
    const count = parseInt(formData.client1DisabilityInsuranceCount);
    if (count > 0) {
      generateInsuranceChart('Disability Insurance Policies', count, formData.fullName || 'Client 1');
    }
  }

  if (formData.client2HasDisabilityInsurance === 'yes' && formData.client2DisabilityInsuranceCount) {
    const count = parseInt(formData.client2DisabilityInsuranceCount);
    if (count > 0) {
      generateInsuranceChart('Disability Insurance Policies', count, formData.spouseName || 'Client 2');
    }
  }

  const hasAnyCriticalIllness =
    (formData.client1HasCriticalIllness === 'yes' && formData.client1CriticalIllnessCount && parseInt(formData.client1CriticalIllnessCount) > 0) ||
    (formData.client2HasCriticalIllness === 'yes' && formData.client2CriticalIllnessCount && parseInt(formData.client2CriticalIllnessCount) > 0);

  if (hasAnyCriticalIllness) {
    if (yPosition > 240) {
      addPage();
      yPosition = 12;
    }

    if (isFirstInsuranceSection) {
      addSectionHeader('Insurance Summary');
      isFirstInsuranceSection = false;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Critical Illness Insurance', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 15;
  }

  if (formData.client1HasCriticalIllness === 'yes' && formData.client1CriticalIllnessCount) {
    const count = parseInt(formData.client1CriticalIllnessCount);
    if (count > 0) {
      generateInsuranceChart('Critical Illness Policies', count, formData.fullName || 'Client 1');
    }
  }

  if (formData.client2HasCriticalIllness === 'yes' && formData.client2CriticalIllnessCount) {
    const count = parseInt(formData.client2CriticalIllnessCount);
    if (count > 0) {
      generateInsuranceChart('Critical Illness Policies', count, formData.spouseName || 'Client 2');
    }
  }

  const generatePropertyInsuranceChart = (propertyLabel: string, documentLocation?: string) => {
    if (yPosition > 230) {
      addPage();
      yPosition = 12;
    }

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(propertyLabel, margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 10;

    const propertyRows = [
      'Property Address:',
      'Insurance Provider:',
      'Property Type:',
      'Coverage Amount:',
      'Document Location:',
      'Other Details:',
    ];

    const cellHeight = 7;
    const labelColWidth = fieldWidth * 0.35;
    const valueColWidth = fieldWidth - labelColWidth;
    let propertyTableY = yPosition;

    propertyRows.forEach((rowLabel, rowIndex) => {
      if (propertyTableY > 275) {
        addPage();
        propertyTableY = 12;
      }

      doc.setFont(undefined, 'normal');
      doc.setFontSize(8);
      const labelLines = doc.splitTextToSize(rowLabel, labelColWidth - 2);
      const dynH = Math.max(cellHeight, labelLines.length * 5 + 3);

      doc.setDrawColor(...colors.tableBorder);
      doc.setLineWidth(0.3);
      doc.setFillColor(255, 255, 255);
      doc.setTextColor(...colors.darkText);

      const labelColX = margin;
      doc.rect(labelColX, propertyTableY, labelColWidth, dynH, 'FD');
      doc.text(labelLines, labelColX + 0.5, propertyTableY + 4.5);

      const valueColX = margin + labelColWidth;
      doc.setFillColor(...colors.tableHeader);
      doc.rect(valueColX, propertyTableY, valueColWidth, dynH, 'FD');

      const propertyField = new doc.AcroFormTextField();
      propertyField.fieldName = `property_${propertyLabel.replace(/\s+/g, '_').toLowerCase()}_row_${rowIndex}`;
      propertyField.Rect = [valueColX + 0.3, propertyTableY + 0.3, valueColWidth - 0.6, dynH - 0.6];
      propertyField.fontSize = 7;
      propertyField.textColor = [0, 0, 0];
      propertyField.borderStyle = 'none';

      if (rowLabel === 'Document Location:' && documentLocation) {
        propertyField.value = documentLocation;
      }

      doc.addField(propertyField);

      propertyTableY += dynH;
    });

    yPosition = propertyTableY + 15;
  };

  if (formData.hasHomeInsurance) {
    if (yPosition > 240) {
      addPage();
      yPosition = 12;
    }

    if (isFirstInsuranceSection) {
      addSectionHeader('Insurance Summary');
      isFirstInsuranceSection = false;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Property and Casualty Insurance', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 15;

    if (formData.hasHomeInsurance === 'no') {
      doc.setFontSize(10);
      doc.text('Client(s) indicated that they have no property insurance.', margin, yPosition);
      yPosition += 15;
    } else if (formData.hasHomeInsurance === 'yes') {
      generatePropertyInsuranceChart('Primary Home Insurance', formData.homeInsuranceDocLocation);

      if (formData.hasAdditionalProperties === 'yes' && formData.additionalPropertiesCount) {
        const additionalCount = parseInt(formData.additionalPropertiesCount);
        for (let i = 1; i <= additionalCount; i++) {
          const docLocationKey = `additionalProperty${i}DocLocation` as keyof FormData;
          const docLocation = formData[docLocationKey] as string | undefined;
          generatePropertyInsuranceChart(`Additional Property ${i} Insurance`, docLocation);
        }
      }
    }
  }

  const generateVehicleInsuranceChart = (vehicleLabel: string, clientName: string, vehicleDescription?: string, docLocation?: string) => {
    if (yPosition > 230) {
      addPage();
      yPosition = 12;
    }

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(`${vehicleLabel} - ${clientName}`, margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 10;

    const vehicleRows = [
      'Vehicle Insured:',
      'Vehicle Owner:',
      'Insurance Provider:',
      'Coverage Amount:',
      'Document Location:',
    ];

    const rowValues = [
      vehicleDescription || '',
      '',
      '',
      '',
      docLocation || '',
    ];

    const cellHeight = 7;
    const labelColWidth = fieldWidth * 0.35;
    const valueColWidth = fieldWidth - labelColWidth;
    let vehicleTableY = yPosition;

    vehicleRows.forEach((rowLabel, rowIndex) => {
      if (vehicleTableY > 275) {
        addPage();
        vehicleTableY = 12;
      }

      doc.setFont(undefined, 'normal');
      doc.setFontSize(8);
      const labelLines = doc.splitTextToSize(rowLabel, labelColWidth - 2);
      const dynH = Math.max(cellHeight, labelLines.length * 5 + 3);

      doc.setDrawColor(...colors.tableBorder);
      doc.setLineWidth(0.3);
      doc.setFillColor(255, 255, 255);
      doc.setTextColor(...colors.darkText);

      const labelColX = margin;
      doc.rect(labelColX, vehicleTableY, labelColWidth, dynH, 'FD');
      doc.text(labelLines, labelColX + 0.5, vehicleTableY + 4.5);

      const valueColX = margin + labelColWidth;
      doc.setFillColor(...colors.tableHeader);
      doc.rect(valueColX, vehicleTableY, valueColWidth, dynH, 'FD');

      const vehicleField = new doc.AcroFormTextField();
      vehicleField.fieldName = `vehicle_${vehicleLabel.replace(/\s+/g, '_').toLowerCase()}_${clientName.replace(/\s+/g, '_').toLowerCase()}_row_${rowIndex}`;
      vehicleField.Rect = [valueColX + 0.3, vehicleTableY + 0.3, valueColWidth - 0.6, dynH - 0.6];
      vehicleField.fontSize = 7;
      vehicleField.textColor = [0, 0, 0];
      vehicleField.borderStyle = 'none';
      vehicleField.value = rowValues[rowIndex];
      doc.addField(vehicleField);

      vehicleTableY += dynH;
    });

    yPosition = vehicleTableY + 15;
  };

  if (formData.client1HasVehicleInsurance === 'yes' || formData.client2HasVehicleInsurance === 'yes') {
    if (yPosition > 240) {
      addPage();
      yPosition = 12;
    }

    if (isFirstInsuranceSection) {
      addSectionHeader('Insurance Summary');
      isFirstInsuranceSection = false;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Vehicle Insurance', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 15;

    let vehicleNumber = 1;

    if (formData.client1HasVehicleInsurance === 'yes') {
      generateVehicleInsuranceChart(
        `Vehicle ${vehicleNumber}`,
        formData.fullName || 'Client 1',
        formData.client1VehicleDescription,
        formData.client1VehicleInsuranceDocLocation
      );
      vehicleNumber++;
    }

    if (formData.client2HasVehicleInsurance === 'yes') {
      generateVehicleInsuranceChart(
        `Vehicle ${vehicleNumber}`,
        formData.spouseName || 'Client 2',
        formData.client2VehicleDescription,
        formData.client2VehicleInsuranceDocLocation
      );
      vehicleNumber++;
    }

    if (formData.hasAdditionalVehicles === 'yes' && formData.additionalVehiclesCount) {
      const additionalCount = parseInt(formData.additionalVehiclesCount);
      for (let i = 1; i <= additionalCount; i++) {
        const descriptionKey = `additionalVehicle${i}Description` as keyof FormData;
        const docLocationKey = `additionalVehicle${i}DocLocation` as keyof FormData;
        const description = formData[descriptionKey] as string | undefined;
        const docLocation = formData[docLocationKey] as string | undefined;

        generateVehicleInsuranceChart(
          `Vehicle ${vehicleNumber}`,
          'Additional Vehicle',
          description,
          docLocation
        );
        vehicleNumber++;
      }
    }
  }

  if (formData.client1HasVehicleInsurance === 'no' &&
      (formData.client2HasVehicleInsurance === 'no' || !formData.client2HasVehicleInsurance)) {
    if (yPosition > 240) {
      addPage();
      yPosition = 12;
    }

    if (isFirstInsuranceSection) {
      addSectionHeader('Insurance Summary');
      isFirstInsuranceSection = false;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Vehicle Insurance', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 15;

    doc.setFontSize(10);
    doc.text('Client(s) indicated that they have no vehicle insurance.', margin, yPosition);
    yPosition += 15;
  }

  // Your Virtual Footprint Section
  if (yPosition > 240) {
    addPage();
    yPosition = 12;
  }

  addSectionHeader('Your Virtual Footprint');

  // Digital Assets & Subscriptions heading
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Digital Assets & Subscriptions', margin, yPosition);
  doc.setFont(undefined, 'normal');
  yPosition += 8;

  // Introductory paragraph
  doc.setFontSize(8);
  const introText1 = "In a digital age, an executor's greatest challenge is often access. Digital assets are highly advised to be explicitly addressed in the Will or a memorandum to ensure they are managed or closed according to your wishes.";
  const splitIntro1 = doc.splitTextToSize(introText1, fieldWidth);
  splitIntro1.forEach((line: string) => {
    if (yPosition > 275) {
      addPage();
      yPosition = 12;
    }
    doc.text(line, margin, yPosition);
    yPosition += 4;
  });
  yPosition += 2;

  const introText2 = "Subscriptions that require payment are generally easier to locate/terminate as they have a credit card or a bank account attached to them, leaving a paper trail, and upon cancelling those accounts, the service is terminated.";
  const splitIntro2 = doc.splitTextToSize(introText2, fieldWidth);
  splitIntro2.forEach((line: string) => {
    if (yPosition > 275) {
      addPage();
      yPosition = 12;
    }
    doc.text(line, margin, yPosition);
    yPosition += 4;
  });
  yPosition += 2;

  const introText3 = "The bigger challenge to Powers of Attorney and Estate Trustees are the things that do not require payments and would otherwise continue indefinitely if not addressed.";
  const splitIntro3 = doc.splitTextToSize(introText3, fieldWidth);
  splitIntro3.forEach((line: string) => {
    if (yPosition > 275) {
      addPage();
      yPosition = 12;
    }
    doc.text(line, margin, yPosition);
    yPosition += 4;
  });
  yPosition += 6;

  // Warning - Social Media Scams
  if (yPosition > 240) {
    addPage();
    yPosition = 12;
  }

  doc.setFont(undefined, 'bold');
  doc.text('Warning – Social Media Scams:', margin, yPosition);
  doc.setFont(undefined, 'normal');
  yPosition += 5;

  const warningText = "A growing fraud is 'Obituaries Fraud' where scammers will gain access to deceased people's emails and social media accounts and begin posting, posing as the deceased.";
  const splitWarning = doc.splitTextToSize(warningText, fieldWidth);
  splitWarning.forEach((line: string) => {
    if (yPosition > 275) {
      addPage();
      yPosition = 12;
    }
    doc.text(line, margin, yPosition);
    yPosition += 4;
  });
  yPosition += 4;

  doc.text('These include:', margin, yPosition);
  yPosition += 5;

  const scamItems = [
    "Posing as the deceased – sending messages to their contacts saying they're in trouble, stranded in another country, needing emergency money etc…",
    "Running fake promotions – posting links with 'too good to be true' investment opportunities that are designed to steal peoples money.",
    "Selling fake goods.",
    "Phishing for personal information.",
    '"Memorial" scams – posting links to fake charities soliciting donations for a cause related to the deceased.'
  ];

  scamItems.forEach((item) => {
    if (yPosition > 270) {
      addPage();
      yPosition = 12;
    }
    const bulletText = `•  ${item}`;
    const splitBullet = doc.splitTextToSize(bulletText, fieldWidth - 3);
    splitBullet.forEach((line: string, idx: number) => {
      if (yPosition > 275) {
        addPage();
        yPosition = 12;
      }
      doc.text(line, margin + (idx === 0 ? 0 : 3), yPosition);
      yPosition += 4;
    });
  });
  yPosition += 4;

  const closingText = "This proactive step ensures that recurring subscriptions are cancelled to preserve estate cash flow and that your online personas are managed or memorialized according to your specific wishes. Because this information is highly sensitive, you must store this document securely, perhaps in a fireproof safe or a password-protected digital file, ensuring your designated representatives are the only ones who know how to access it.";
  const splitClosing = doc.splitTextToSize(closingText, fieldWidth);
  splitClosing.forEach((line: string) => {
    if (yPosition > 275) {
      addPage();
      yPosition = 12;
    }
    doc.text(line, margin, yPosition);
    yPosition += 4;
  });
  yPosition += 8;

  // Key things to Prepare
  if (yPosition > 240) {
    addPage();
    yPosition = 12;
  }

  doc.setFont(undefined, 'bold');
  doc.text('Key things to Prepare:', margin, yPosition);
  doc.setFont(undefined, 'normal');
  yPosition += 8;

  // Digital Hardware Access Table
  doc.setFont(undefined, 'bold');
  doc.text('Digital Hardware Access:', margin, yPosition);
  doc.setFont(undefined, 'normal');
  yPosition += 5;

  const hardwareText = "Use this table to list the devices that contain your personal information or act as gateways to your accounts:";
  const splitHardware = doc.splitTextToSize(hardwareText, fieldWidth);
  splitHardware.forEach((line: string) => {
    if (yPosition > 275) {
      addPage();
      yPosition = 12;
    }
    doc.text(line, margin, yPosition);
    yPosition += 4;
  });
  yPosition += 5;

  if (yPosition > 220) {
    addPage();
    yPosition = 12;
  }

  // Hardware table
  const hardwareHeaders = ['Device Description:', 'Physical Location:', 'Local Username:', 'PIN/Password:'];
  const hardwareRows = [
    'Primary Smartphone',
    'Home Computer/Laptop:',
    'Tablet:',
    'External Hard Drives',
    'Other:'
  ];

  const hardwareCellHeight = 7;
  const hardwareColWidth = fieldWidth / 4;
  let hardwareTableY = yPosition;

  // Headers
  doc.setDrawColor(...colors.tableBorder);
  doc.setLineWidth(0.3);
  doc.setFillColor(255, 255, 255);
  doc.setFont(undefined, 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...colors.darkText);

  hardwareHeaders.forEach((header, colIndex) => {
    const colX = margin + (colIndex * hardwareColWidth);
    doc.rect(colX, hardwareTableY, hardwareColWidth, hardwareCellHeight, 'FD');
    doc.text(header, colX + 0.5, hardwareTableY + 4.5);
  });
  hardwareTableY += hardwareCellHeight;

  // Rows
  doc.setFont(undefined, 'normal');
  doc.setFillColor(255, 255, 255);

  hardwareRows.forEach((rowLabel, rowIndex) => {
    if (hardwareTableY > 270) {
      addPage();
      hardwareTableY = 12;
    }

    doc.setDrawColor(...colors.tableBorder);
    doc.setLineWidth(0.3);
    doc.setFillColor(255, 255, 255);
    // First column (label)
    doc.rect(margin, hardwareTableY, hardwareColWidth, hardwareCellHeight, 'FD');

    // For "Other:" row, make it fillable
    if (rowLabel === 'Other:') {
      const otherLabelField = new doc.AcroFormTextField();
      otherLabelField.fieldName = `hardware_other_label_${rowIndex}`;
      otherLabelField.Rect = [margin + 0.3, hardwareTableY + 0.3, hardwareColWidth - 0.6, hardwareCellHeight - 0.6];
      otherLabelField.fontSize = 7;
      otherLabelField.textColor = [0, 0, 0];
      otherLabelField.borderStyle = 'none';
      otherLabelField.value = 'Other:';
      doc.addField(otherLabelField);
    } else {
      doc.text(rowLabel, margin + 0.5, hardwareTableY + 4.5);
    }

    // Other columns (fillable fields)
    for (let colIndex = 1; colIndex < 4; colIndex++) {
      const colX = margin + (colIndex * hardwareColWidth);
      doc.setFillColor(...colors.tableHeader);
      doc.rect(colX, hardwareTableY, hardwareColWidth, hardwareCellHeight, 'FD');

      const field = new doc.AcroFormTextField();
      field.fieldName = `hardware_row_${rowIndex}_col_${colIndex}`;
      field.Rect = [colX + 0.3, hardwareTableY + 0.3, hardwareColWidth - 0.6, hardwareCellHeight - 0.6];
      field.fontSize = 7;
      field.textColor = [0, 0, 0];
      field.borderStyle = 'none';
      doc.addField(field);
    }

    hardwareTableY += hardwareCellHeight;
  });

  yPosition = hardwareTableY + 10;

  // Email and Social Media Presence Section
  if (yPosition > 240) {
    addPage();
    yPosition = 12;
  }

  doc.setFontSize(8);
  doc.setFont(undefined, 'bold');
  doc.text('Email and Social Media Presence:', margin, yPosition);
  doc.setFont(undefined, 'normal');
  yPosition += 5;

  const socialText = "These accounts are often the 'master keys' for resetting passwords on other platforms:";
  const splitSocial = doc.splitTextToSize(socialText, fieldWidth);
  splitSocial.forEach((line: string) => {
    if (yPosition > 275) {
      addPage();
      yPosition = 12;
    }
    doc.text(line, margin, yPosition);
    yPosition += 4;
  });
  yPosition += 5;

  if (yPosition > 200) {
    addPage();
    yPosition = 12;
  }

  // Social Media table
  const socialHeaders = ['Online Persona / Platform:', 'Website URL:', 'Username/Handle:', 'Password:'];
  const socialRows = [
    'Primary Email Account',
    'Secondary/Backup Email',
    'Facebook / Instagram',
    'Linkedin / Professional',
    'Other:',
    'Other:',
    'Other:',
    'Other:',
    'Other:',
    'Other:'
  ];

  const socialCellHeight = 7;
  const socialColWidth = fieldWidth / 4;
  let socialTableY = yPosition;

  // Headers
  doc.setFillColor(255, 255, 255);
  doc.setFont(undefined, 'bold');
  doc.setFontSize(7);

  socialHeaders.forEach((header, colIndex) => {
    const colX = margin + (colIndex * socialColWidth);
    doc.rect(colX, socialTableY, socialColWidth, socialCellHeight);
    doc.text(header, colX + 0.5, socialTableY + 4.5);
  });
  socialTableY += socialCellHeight;

  // Rows
  doc.setFont(undefined, 'normal');
  doc.setFillColor(255, 255, 255);

  socialRows.forEach((rowLabel, rowIndex) => {
    if (socialTableY > 270) {
      addPage();
      socialTableY = 12;
    }

    // First column (label)
    doc.rect(margin, socialTableY, socialColWidth, socialCellHeight);

    // For "Other:" rows, make them fillable
    if (rowLabel === 'Other:') {
      const otherLabelField = new doc.AcroFormTextField();
      otherLabelField.fieldName = `social_other_label_${rowIndex}`;
      otherLabelField.Rect = [margin + 0.3, socialTableY + 0.3, socialColWidth - 0.6, socialCellHeight - 0.6];
      otherLabelField.fontSize = 7;
      otherLabelField.textColor = [0, 0, 0];
      otherLabelField.borderStyle = 'none';
      otherLabelField.value = 'Other:';
      doc.addField(otherLabelField);
    } else {
      doc.text(rowLabel, margin + 0.5, socialTableY + 4.5);
    }

    // Other columns (fillable fields)
    for (let colIndex = 1; colIndex < 4; colIndex++) {
      const colX = margin + (colIndex * socialColWidth);
      doc.rect(colX, socialTableY, socialColWidth, socialCellHeight);

      const field = new doc.AcroFormTextField();
      field.fieldName = `social_row_${rowIndex}_col_${colIndex}`;
      field.Rect = [colX + 0.3, socialTableY + 0.3, socialColWidth - 0.6, socialCellHeight - 0.6];
      field.fontSize = 7;
      field.textColor = [0, 0, 0];
      field.borderStyle = 'none';
      doc.addField(field);
    }

    socialTableY += socialCellHeight;
  });

  yPosition = socialTableY + 10;

  // Financial and Critical Digital Files Section
  if (yPosition > 240) {
    addPage();
    yPosition = 12;
  }

  doc.setFontSize(8);
  doc.setFont(undefined, 'bold');
  doc.text('Financial and Critical Digital Files:', margin, yPosition);
  doc.setFont(undefined, 'normal');
  yPosition += 5;

  const financialText = "This includes online-only assets that may not produce paper statements, such as cryptocurrency or digital rewards:";
  const splitFinancial = doc.splitTextToSize(financialText, fieldWidth);
  splitFinancial.forEach((line: string) => {
    if (yPosition > 275) {
      addPage();
      yPosition = 12;
    }
    doc.text(line, margin, yPosition);
    yPosition += 4;
  });
  yPosition += 5;

  // Financial table
  const financialHeaders = ['Service or Asset Name:', 'URL/Provider:', 'Account Number:', 'Username / Password:'];
  const financialRows = [
    'Online Banking Portal',
    'Crypto Wallet / Exchange',
    'Cloud Storage (photos/documents)',
    'Digital Loyalty Points',
    'Other:',
    'Other:',
    'Other:',
    'Other:',
    'Other:',
    'Other:'
  ];

  const financialCellHeight = 7;
  checkPageBreak(financialCellHeight + financialRows.length * financialCellHeight + 4);
  const financialColWidth = fieldWidth / 4;
  let financialTableY = yPosition;

  // Headers
  doc.setFillColor(255, 255, 255);
  doc.setFont(undefined, 'bold');
  doc.setFontSize(7);

  financialHeaders.forEach((header, colIndex) => {
    const colX = margin + (colIndex * financialColWidth);
    doc.rect(colX, financialTableY, financialColWidth, financialCellHeight);
    doc.text(header, colX + 0.5, financialTableY + 4.5);
  });
  financialTableY += financialCellHeight;

  // Rows
  doc.setFont(undefined, 'normal');
  doc.setFillColor(255, 255, 255);

  financialRows.forEach((rowLabel, rowIndex) => {
    // First column (label)
    doc.rect(margin, financialTableY, financialColWidth, financialCellHeight);

    // For "Other:" rows, make them fillable
    if (rowLabel === 'Other:') {
      const otherLabelField = new doc.AcroFormTextField();
      otherLabelField.fieldName = `financial_other_label_${rowIndex}`;
      otherLabelField.Rect = [margin + 0.3, financialTableY + 0.3, financialColWidth - 0.6, financialCellHeight - 0.6];
      otherLabelField.fontSize = 7;
      otherLabelField.textColor = [0, 0, 0];
      otherLabelField.borderStyle = 'none';
      otherLabelField.value = 'Other:';
      doc.addField(otherLabelField);
    } else {
      doc.text(rowLabel, margin + 0.5, financialTableY + 4.5);
    }

    // Other columns (fillable fields)
    for (let colIndex = 1; colIndex < 4; colIndex++) {
      const colX = margin + (colIndex * financialColWidth);
      doc.rect(colX, financialTableY, financialColWidth, financialCellHeight);

      const field = new doc.AcroFormTextField();
      field.fieldName = `financial_row_${rowIndex}_col_${colIndex}`;
      field.Rect = [colX + 0.3, financialTableY + 0.3, financialColWidth - 0.6, financialCellHeight - 0.6];
      field.fontSize = 7;
      field.textColor = [0, 0, 0];
      field.borderStyle = 'none';
      doc.addField(field);
    }

    financialTableY += financialCellHeight;
  });

  yPosition = financialTableY + 15;

  // Pensions Section
  const client1PensionsData = formData.client1PensionsData as Array<Record<string, string>> | undefined;
  const client2PensionsData = formData.client2PensionsData as Array<Record<string, string>> | undefined;
  const hasClient1Pensions = formData.client1HasPension === 'yes' && client1PensionsData && client1PensionsData.length > 0;
  const hasClient2Pensions = formData.client2HasPension === 'yes' && client2PensionsData && client2PensionsData.length > 0;

  if (hasClient1Pensions || hasClient2Pensions) {
    if (yPosition > 200) {
      addPage();
      yPosition = 12;
    }

    checkPageBreak(30);
    addSectionHeader('Pensions');

    if (hasClient1Pensions) {
      checkPageBreak(40);

      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...colors.darkText);
      doc.text(`${formData.fullName || 'Client 1'}'s Pensions`, margin, yPosition);
      yPosition += 10;

      const pensionCellHeight = 10;
      checkPageBreak(pensionCellHeight + client1PensionsData.length * pensionCellHeight + 4);
      const pensionCol1Width = fieldWidth * 0.35;
      const pensionCol2Width = fieldWidth * 0.25;
      const pensionCol3Width = fieldWidth * 0.40;
      let pensionTableY = yPosition;

      doc.setDrawColor(...colors.tableBorder);
      doc.setLineWidth(0.3);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...colors.darkText);

      // Header row
      doc.rect(margin, pensionTableY, pensionCol1Width, pensionCellHeight, 'FD');
      doc.text('Employer Name:', margin + 0.5, pensionTableY + 4.5);

      doc.rect(margin + pensionCol1Width, pensionTableY, pensionCol2Width, pensionCellHeight, 'FD');
      doc.text('Employment Status:', margin + pensionCol1Width + 0.5, pensionTableY + 4.5);

      doc.rect(margin + pensionCol1Width + pensionCol2Width, pensionTableY, pensionCol3Width, pensionCellHeight, 'FD');
      doc.text('Location of Pension Information:', margin + pensionCol1Width + pensionCol2Width + 0.5, pensionTableY + 4.5);

      pensionTableY += pensionCellHeight;
      doc.setFont(undefined, 'normal');

      // Data rows
      for (let i = 0; i < client1PensionsData.length; i++) {

        const pension = client1PensionsData[i];

        doc.setDrawColor(...colors.tableBorder);
        doc.setLineWidth(0.3);
        doc.setFillColor(255, 255, 255);
        // Employer Name column
        doc.rect(margin, pensionTableY, pensionCol1Width, pensionCellHeight, 'FD');
        const employerField = new doc.AcroFormTextField();
        employerField.fieldName = `client1_pension_employer_${i}`;
        employerField.Rect = [margin + 0.3, pensionTableY + 0.3, pensionCol1Width - 0.6, pensionCellHeight - 0.6];
        employerField.fontSize = 7;
        employerField.textColor = [0, 0, 0];
        employerField.borderStyle = 'none';
        employerField.value = pension?.employer || '';
        doc.addField(employerField);

        // Employment Status column
        doc.setFillColor(...colors.tableHeader);
        doc.rect(margin + pensionCol1Width, pensionTableY, pensionCol2Width, pensionCellHeight, 'FD');
        const statusField = new doc.AcroFormTextField();
        statusField.fieldName = `client1_pension_status_${i}`;
        statusField.Rect = [margin + pensionCol1Width + 0.3, pensionTableY + 0.3, pensionCol2Width - 0.6, pensionCellHeight - 0.6];
        statusField.fontSize = 7;
        statusField.textColor = [0, 0, 0];
        statusField.borderStyle = 'none';
        statusField.value = pension?.stillWorking === 'yes' ? 'Currently Employed' : 'Past Employer';
        doc.addField(statusField);

        // Document Location column
        doc.rect(margin + pensionCol1Width + pensionCol2Width, pensionTableY, pensionCol3Width, pensionCellHeight, 'FD');
        const locationField = new doc.AcroFormTextField();
        locationField.fieldName = `client1_pension_location_${i}`;
        locationField.Rect = [margin + pensionCol1Width + pensionCol2Width + 0.3, pensionTableY + 0.3, pensionCol3Width - 0.6, pensionCellHeight - 0.6];
        locationField.fontSize = 7;
        locationField.textColor = [0, 0, 0];
        locationField.borderStyle = 'none';
        locationField.value = pension?.documentLocation || '';
        doc.addField(locationField);

        pensionTableY += pensionCellHeight;
      }

      yPosition = pensionTableY + 15;
    }

    if (hasClient2Pensions) {
      checkPageBreak(40);

      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...colors.darkText);
      doc.text(`${formData.spouseName || 'Client 2'}'s Pensions`, margin, yPosition);
      yPosition += 10;

      const pensionCellHeight = 10;
      checkPageBreak(pensionCellHeight + client2PensionsData.length * pensionCellHeight + 4);
      const pensionCol1Width = fieldWidth * 0.35;
      const pensionCol2Width = fieldWidth * 0.25;
      const pensionCol3Width = fieldWidth * 0.40;
      let pensionTableY = yPosition;

      doc.setDrawColor(...colors.tableBorder);
      doc.setLineWidth(0.3);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...colors.darkText);

      // Header row
      doc.rect(margin, pensionTableY, pensionCol1Width, pensionCellHeight, 'FD');
      doc.text('Employer Name:', margin + 0.5, pensionTableY + 4.5);

      doc.rect(margin + pensionCol1Width, pensionTableY, pensionCol2Width, pensionCellHeight, 'FD');
      doc.text('Employment Status:', margin + pensionCol1Width + 0.5, pensionTableY + 4.5);

      doc.rect(margin + pensionCol1Width + pensionCol2Width, pensionTableY, pensionCol3Width, pensionCellHeight, 'FD');
      doc.text('Location of Pension Information:', margin + pensionCol1Width + pensionCol2Width + 0.5, pensionTableY + 4.5);

      pensionTableY += pensionCellHeight;
      doc.setFont(undefined, 'normal');

      // Data rows
      for (let i = 0; i < client2PensionsData.length; i++) {

        const pension = client2PensionsData[i];

        doc.setDrawColor(...colors.tableBorder);
        doc.setLineWidth(0.3);
        doc.setFillColor(255, 255, 255);
        // Employer Name column
        doc.rect(margin, pensionTableY, pensionCol1Width, pensionCellHeight, 'FD');
        const employerField = new doc.AcroFormTextField();
        employerField.fieldName = `client2_pension_employer_${i}`;
        employerField.Rect = [margin + 0.3, pensionTableY + 0.3, pensionCol1Width - 0.6, pensionCellHeight - 0.6];
        employerField.fontSize = 7;
        employerField.textColor = [0, 0, 0];
        employerField.borderStyle = 'none';
        employerField.value = pension?.employer || '';
        doc.addField(employerField);

        // Employment Status column
        doc.setFillColor(...colors.tableHeader);
        doc.rect(margin + pensionCol1Width, pensionTableY, pensionCol2Width, pensionCellHeight, 'FD');
        const statusField = new doc.AcroFormTextField();
        statusField.fieldName = `client2_pension_status_${i}`;
        statusField.Rect = [margin + pensionCol1Width + 0.3, pensionTableY + 0.3, pensionCol2Width - 0.6, pensionCellHeight - 0.6];
        statusField.fontSize = 7;
        statusField.textColor = [0, 0, 0];
        statusField.borderStyle = 'none';
        statusField.value = pension?.stillWorking === 'yes' ? 'Currently Employed' : 'Past Employer';
        doc.addField(statusField);

        // Document Location column
        doc.rect(margin + pensionCol1Width + pensionCol2Width, pensionTableY, pensionCol3Width, pensionCellHeight, 'FD');
        const locationField = new doc.AcroFormTextField();
        locationField.fieldName = `client2_pension_location_${i}`;
        locationField.Rect = [margin + pensionCol1Width + pensionCol2Width + 0.3, pensionTableY + 0.3, pensionCol3Width - 0.6, pensionCellHeight - 0.6];
        locationField.fontSize = 7;
        locationField.textColor = [0, 0, 0];
        locationField.borderStyle = 'none';
        locationField.value = pension?.documentLocation || '';
        doc.addField(locationField);

        pensionTableY += pensionCellHeight;
      }

      yPosition = pensionTableY + 15;
    }
  }

  // ESOP Section
  const hasClient1ESOP = formData.client1HasESOP === 'yes';
  const hasClient2ESOP = formData.client2HasESOP === 'yes';

  if (hasClient1ESOP || hasClient2ESOP) {
    if (yPosition > 200) {
      addPage();
      yPosition = 12;
    }

    checkPageBreak(30);
    addSectionHeader('Employee Stock Option Plans (ESOP)');

    if (hasClient1ESOP) {
      checkPageBreak(30);

      const labelText = `${formData.fullName || 'Client 1'} has an Employee Stock Option Plan (ESOP).`;
      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...colors.text);
      doc.text(labelText, margin, yPosition);
      yPosition += 8;

      // Employer Name
      doc.text('Name of Employer:', margin, yPosition);
      yPosition += 6;

      doc.setDrawColor(...colors.border);
      doc.setFillColor(255, 255, 255);
      doc.rect(margin, yPosition, fieldWidth, fieldHeight, 'FD');

      const client1ESOPEmployerField = new doc.AcroFormTextField();
      client1ESOPEmployerField.fieldName = 'client1_esop_employer';
      client1ESOPEmployerField.Rect = [margin, yPosition, fieldWidth, fieldHeight];
      client1ESOPEmployerField.multiline = false;
      client1ESOPEmployerField.fontSize = 11;
      client1ESOPEmployerField.value = formData.client1ESOPEmployer || '';
      doc.addField(client1ESOPEmployerField);

      yPosition += fieldHeight + 8;

      // Document Location
      doc.text('Where is the information on your ESOP stored?', margin, yPosition);
      yPosition += 6;

      doc.rect(margin, yPosition, fieldWidth, fieldHeight, 'FD');

      const client1ESOPLocationField = new doc.AcroFormTextField();
      client1ESOPLocationField.fieldName = 'client1_esop_location';
      client1ESOPLocationField.Rect = [margin, yPosition, fieldWidth, fieldHeight];
      client1ESOPLocationField.multiline = false;
      client1ESOPLocationField.fontSize = 11;
      client1ESOPLocationField.value = formData.client1ESOPLocation || '';
      doc.addField(client1ESOPLocationField);

      yPosition += fieldHeight + 15;
    }

    if (hasClient2ESOP) {
      checkPageBreak(30);

      const labelText = `${formData.spouseName || 'Client 2'} has an Employee Stock Option Plan (ESOP).`;
      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...colors.text);
      doc.text(labelText, margin, yPosition);
      yPosition += 8;

      // Employer Name
      doc.text('Name of Employer:', margin, yPosition);
      yPosition += 6;

      doc.setDrawColor(...colors.border);
      doc.setFillColor(255, 255, 255);
      doc.rect(margin, yPosition, fieldWidth, fieldHeight, 'FD');

      const client2ESOPEmployerField = new doc.AcroFormTextField();
      client2ESOPEmployerField.fieldName = 'client2_esop_employer';
      client2ESOPEmployerField.Rect = [margin, yPosition, fieldWidth, fieldHeight];
      client2ESOPEmployerField.multiline = false;
      client2ESOPEmployerField.fontSize = 11;
      client2ESOPEmployerField.value = formData.client2ESOPEmployer || '';
      doc.addField(client2ESOPEmployerField);

      yPosition += fieldHeight + 8;

      // Document Location
      doc.text('Where is the information on your ESOP stored?', margin, yPosition);
      yPosition += 6;

      doc.rect(margin, yPosition, fieldWidth, fieldHeight, 'FD');

      const client2ESOPLocationField = new doc.AcroFormTextField();
      client2ESOPLocationField.fieldName = 'client2_esop_location';
      client2ESOPLocationField.Rect = [margin, yPosition, fieldWidth, fieldHeight];
      client2ESOPLocationField.multiline = false;
      client2ESOPLocationField.fontSize = 11;
      client2ESOPLocationField.value = formData.client2ESOPLocation || '';
      doc.addField(client2ESOPLocationField);

      yPosition += fieldHeight + 15;
    }
  }

  // Add Supporting Document Summary section
  addPage();
  yPosition = 12;
  addSectionHeader('Supporting Document Summary');

  // Collect all document locations for Client 1
  const client1Documents: Array<{ type: string; location: string }> = [];

  if (formData.hasMarriageContract === 'yes' && formData.marriageContractLocation) {
    client1Documents.push({
      type: 'Marriage Contract',
      location: formData.marriageContractLocation
    });
  }

  if (formData.client1HasWill === 'yes' && formData.client1WillLocation) {
    client1Documents.push({
      type: `${client1Name} - Will`,
      location: formData.client1WillLocation
    });
  }

  if (formData.client1HasSecondaryWill === 'yes' && formData.client1SecondaryWillLocation) {
    client1Documents.push({
      type: `${client1Name} - Secondary Will`,
      location: formData.client1SecondaryWillLocation
    });
  }

  if (formData.client1UsesAccountant === 'yes' && formData.client1AccountingRecordsLocation) {
    client1Documents.push({
      type: `${client1Name} - Accounting Records`,
      location: formData.client1AccountingRecordsLocation
    });
  }

  if (formData.client1IsSpousalTrustBeneficiary === 'yes' && formData.client1SpousalTrustDocumentLocation) {
    client1Documents.push({
      type: `${client1Name} - Spousal Trust Document`,
      location: formData.client1SpousalTrustDocumentLocation
    });
  }

  if (formData.client1PreviousRelationshipsData && formData.client1PreviousRelationshipsData.length > 0) {
    formData.client1PreviousRelationshipsData.forEach((rel, index) => {
      if (rel.hasSpousalSupport === 'yes' && rel.supportDocumentLocation) {
        const relationshipName = rel.name ? ` with ${rel.name}` : '';
        const needsNameField = !rel.name;
        client1Documents.push({
          type: `${client1Name} - Spousal Support Agreement${relationshipName}`,
          location: rel.supportDocumentLocation,
          needsNameField: needsNameField,
          nameFieldId: `client1_spousal_support_name_${index}`
        } as any);
      }
    });
  }

  if (formData.client1BeneficiaryTrustsData && formData.client1BeneficiaryTrustsData.length > 0) {
    formData.client1BeneficiaryTrustsData.forEach((trust, index) => {
      if (trust.documentLocation) {
        client1Documents.push({
          type: `${client1Name} - Beneficiary Trust ${index + 1}`,
          location: trust.documentLocation
        });
      }
    });
  }

  if (formData.client1PensionsData && formData.client1PensionsData.length > 0) {
    formData.client1PensionsData.forEach((pension, index) => {
      if (pension.documentLocation) {
        client1Documents.push({
          type: `${client1Name} - Pension ${index + 1}`,
          location: pension.documentLocation
        });
      }
    });
  }

  if (formData.client1HasESOP === 'yes' && formData.client1ESOPLocation) {
    client1Documents.push({
      type: `${client1Name} - ESOP`,
      location: formData.client1ESOPLocation
    });
  }

  // Collect all document locations for Client 2
  const client2Documents: Array<{ type: string; location: string }> = [];

  if (hasSpouse) {
    if (formData.client2HasWill === 'yes' && formData.client2WillLocation) {
      client2Documents.push({
        type: `${client2Name} - Will`,
        location: formData.client2WillLocation
      });
    }

    if (formData.client2HasSecondaryWill === 'yes' && formData.client2SecondaryWillLocation) {
      client2Documents.push({
        type: `${client2Name} - Secondary Will`,
        location: formData.client2SecondaryWillLocation
      });
    }

    if (formData.client2UsesAccountant === 'yes' && formData.client2AccountingRecordsLocation) {
      client2Documents.push({
        type: `${client2Name} - Accounting Records`,
        location: formData.client2AccountingRecordsLocation
      });
    }

    if (formData.client2PreviousRelationshipsData && formData.client2PreviousRelationshipsData.length > 0) {
      formData.client2PreviousRelationshipsData.forEach((rel, index) => {
        if (rel.hasSpousalSupport === 'yes' && rel.supportDocumentLocation) {
          const relationshipName = rel.name ? ` with ${rel.name}` : '';
          const needsNameField = !rel.name;
          client2Documents.push({
            type: `${client2Name} - Spousal Support Agreement${relationshipName}`,
            location: rel.supportDocumentLocation,
            needsNameField: needsNameField,
            nameFieldId: `client2_spousal_support_name_${index}`
          } as any);
        }
      });
    }

    if (formData.client2BeneficiaryTrustsData && formData.client2BeneficiaryTrustsData.length > 0) {
      formData.client2BeneficiaryTrustsData.forEach((trust, index) => {
        if (trust.documentLocation) {
          client2Documents.push({
            type: `${client2Name} - Beneficiary Trust ${index + 1}`,
            location: trust.documentLocation
          });
        }
      });
    }

    if (formData.client2PensionsData && formData.client2PensionsData.length > 0) {
      formData.client2PensionsData.forEach((pension, index) => {
        if (pension.documentLocation) {
          client2Documents.push({
            type: `${client2Name} - Pension ${index + 1}`,
            location: pension.documentLocation
          });
        }
      });
    }

    if (formData.client2HasESOP === 'yes' && formData.client2ESOPLocation) {
      client2Documents.push({
        type: `${client2Name} - ESOP`,
        location: formData.client2ESOPLocation
      });
    }
  }

  // Collect child support documents
  if (formData.childrenData && formData.childrenData.length > 0) {
    formData.childrenData.forEach((child, index) => {
      if (child.childSupportDocLocation) {
        if (child.parentsOption === 'client1-other') {
          client1Documents.push({
            type: `${client1Name} - Child Support Documents (${child.name || `Child ${index + 1}`})`,
            location: child.childSupportDocLocation
          });
        } else if (child.parentsOption === 'client2-other') {
          client2Documents.push({
            type: `${client2Name} - Child Support Documents (${child.name || `Child ${index + 1}`})`,
            location: child.childSupportDocLocation
          });
        }
      }
    });
  }

  // Add family trust document
  if (formData.hasFamilyTrust === 'yes' && formData.trustDeedLocation) {
    client1Documents.push({
      type: 'Family Trust Deed',
      location: formData.trustDeedLocation
    });
  }

  // Add home insurance document
  if (formData.hasHomeInsurance === 'yes' && formData.homeInsuranceDocLocation) {
    client1Documents.push({
      type: 'Home Insurance',
      location: formData.homeInsuranceDocLocation
    });
  }

  // Add additional property insurance documents
  if (formData.hasAdditionalProperties === 'yes' && formData.additionalPropertiesCount) {
    const additionalCount = parseInt(formData.additionalPropertiesCount);
    for (let i = 1; i <= additionalCount; i++) {
      const docLocationKey = `additionalProperty${i}DocLocation` as keyof FormData;
      const docLocation = formData[docLocationKey] as string | undefined;
      if (docLocation) {
        client1Documents.push({
          type: `Additional Property ${i} Insurance`,
          location: docLocation
        });
      }
    }
  }

  // Add vehicle insurance documents
  if (formData.client1HasVehicleInsurance === 'yes' && formData.client1VehicleInsuranceDocLocation) {
    client1Documents.push({
      type: `${client1Name} - Vehicle Insurance${formData.client1VehicleDescription ? ` (${formData.client1VehicleDescription})` : ''}`,
      location: formData.client1VehicleInsuranceDocLocation
    });
  }

  if (formData.client2HasVehicleInsurance === 'yes' && formData.client2VehicleInsuranceDocLocation) {
    client2Documents.push({
      type: `${client2Name} - Vehicle Insurance${formData.client2VehicleDescription ? ` (${formData.client2VehicleDescription})` : ''}`,
      location: formData.client2VehicleInsuranceDocLocation
    });
  }

  // Add additional vehicle insurance documents
  if (formData.hasAdditionalVehicles === 'yes' && formData.additionalVehiclesCount) {
    const additionalVehicleCount = parseInt(formData.additionalVehiclesCount);
    for (let i = 1; i <= additionalVehicleCount; i++) {
      const descriptionKey = `additionalVehicle${i}Description` as keyof FormData;
      const docLocationKey = `additionalVehicle${i}DocLocation` as keyof FormData;
      const description = formData[descriptionKey] as string | undefined;
      const docLocation = formData[docLocationKey] as string | undefined;

      if (docLocation) {
        client1Documents.push({
          type: `Additional Vehicle ${i} Insurance${description ? ` (${description})` : ''}`,
          location: docLocation
        });
      }
    }
  }


  // Create Client 1 Document Summary Table
  if (client1Documents.length > 0) {
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colors.darkText);
    doc.text(`${client1Name} - Document Summary`, margin, yPosition);
    yPosition += 6;

    const docTableCellHeight = 8;
    const docTableLabelWidth = fieldWidth * 0.667;
    const docTableValueWidth = fieldWidth * 0.333;

    // Header row
    doc.setDrawColor(...colors.tableBorder);
    doc.setLineWidth(0.3);
    doc.setFillColor(255, 255, 255);
    doc.rect(margin, yPosition, docTableLabelWidth, docTableCellHeight, 'FD');
    doc.setFillColor(255, 255, 255);
    doc.rect(margin + docTableLabelWidth, yPosition, docTableValueWidth, docTableCellHeight, 'FD');

    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text('Document Type', margin + 2, yPosition + 5);
    doc.text('Location', margin + docTableLabelWidth + 2, yPosition + 5);
    yPosition += docTableCellHeight;

    // Data rows
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);

    client1Documents.forEach((docItem: any) => {
      if (yPosition > 270) {
        addPage();
        yPosition = 12;
      }

      doc.setDrawColor(...colors.tableBorder);
      doc.setLineWidth(0.3);
      doc.setFillColor(255, 255, 255);
      doc.rect(margin, yPosition, docTableLabelWidth, docTableCellHeight, 'FD');
      doc.setFillColor(255, 255, 255);
      doc.rect(margin + docTableLabelWidth, yPosition, docTableValueWidth, docTableCellHeight, 'FD');

      if (docItem.needsNameField) {
        // Create fillable text with "with _______" format
        const baseText = `${docItem.type} with `;
        const textWidth = doc.getTextWidth(baseText);
        doc.text(baseText, margin + 2, yPosition + 5);

        // Add fillable field for the name
        const nameField = new doc.AcroFormTextField();
        nameField.fieldName = docItem.nameFieldId;
        nameField.Rect = [margin + 2 + textWidth, yPosition + 1, docTableLabelWidth - textWidth - 4, docTableCellHeight - 2];
        nameField.fontSize = 8;
        nameField.textColor = colors.darkText;
        nameField.borderStyle = 'underline';
        doc.addField(nameField);
      } else {
        const typeText = doc.splitTextToSize(docItem.type, docTableLabelWidth - 4);
        doc.text(typeText, margin + 2, yPosition + 5);
      }

      const locationField = new doc.AcroFormTextField();
      locationField.fieldName = `doc_location_${docItem.type.replace(/[^a-zA-Z0-9]/g, '_')}`;
      locationField.Rect = [margin + docTableLabelWidth + 1, yPosition + 1, docTableValueWidth - 2, docTableCellHeight - 2];
      locationField.fontSize = 8;
      locationField.textColor = colors.darkText;
      locationField.value = docItem.location;
      locationField.borderStyle = 'none';
      doc.addField(locationField);

      yPosition += docTableCellHeight;
    });

    yPosition += 10;
  }

  // Create Client 2 Document Summary Table
  if (client2Documents.length > 0) {
    if (yPosition > 200) {
      addPage();
      yPosition = 12;
    }

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colors.darkText);
    doc.text(`${client2Name} - Document Summary`, margin, yPosition);
    yPosition += 6;

    const docTableCellHeight = 8;
    const docTableLabelWidth = fieldWidth * 0.667;
    const docTableValueWidth = fieldWidth * 0.333;

    // Header row
    doc.setDrawColor(...colors.tableBorder);
    doc.setLineWidth(0.3);
    doc.setFillColor(255, 255, 255);
    doc.rect(margin, yPosition, docTableLabelWidth, docTableCellHeight, 'FD');
    doc.setFillColor(255, 255, 255);
    doc.rect(margin + docTableLabelWidth, yPosition, docTableValueWidth, docTableCellHeight, 'FD');

    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text('Document Type', margin + 2, yPosition + 5);
    doc.text('Location', margin + docTableLabelWidth + 2, yPosition + 5);
    yPosition += docTableCellHeight;

    // Data rows
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);

    client2Documents.forEach((docItem: any) => {
      if (yPosition > 270) {
        addPage();
        yPosition = 12;
      }

      doc.setDrawColor(...colors.tableBorder);
      doc.setLineWidth(0.3);
      doc.setFillColor(255, 255, 255);
      doc.rect(margin, yPosition, docTableLabelWidth, docTableCellHeight, 'FD');
      doc.setFillColor(255, 255, 255);
      doc.rect(margin + docTableLabelWidth, yPosition, docTableValueWidth, docTableCellHeight, 'FD');

      if (docItem.needsNameField) {
        // Create fillable text with "with _______" format
        const baseText = `${docItem.type} with `;
        const textWidth = doc.getTextWidth(baseText);
        doc.text(baseText, margin + 2, yPosition + 5);

        // Add fillable field for the name
        const nameField = new doc.AcroFormTextField();
        nameField.fieldName = docItem.nameFieldId;
        nameField.Rect = [margin + 2 + textWidth, yPosition + 1, docTableLabelWidth - textWidth - 4, docTableCellHeight - 2];
        nameField.fontSize = 8;
        nameField.textColor = colors.darkText;
        nameField.borderStyle = 'underline';
        doc.addField(nameField);
      } else {
        const typeText = doc.splitTextToSize(docItem.type, docTableLabelWidth - 4);
        doc.text(typeText, margin + 2, yPosition + 5);
      }

      const locationField = new doc.AcroFormTextField();
      locationField.fieldName = `doc_location_${docItem.type.replace(/[^a-zA-Z0-9]/g, '_')}`;
      locationField.Rect = [margin + docTableLabelWidth + 1, yPosition + 1, docTableValueWidth - 2, docTableCellHeight - 2];
      locationField.fontSize = 8;
      locationField.textColor = colors.darkText;
      locationField.value = docItem.location;
      locationField.borderStyle = 'none';
      doc.addField(locationField);

      yPosition += docTableCellHeight;
    });

    yPosition += 10;
  }

  // Add new page for additional information
  addPage();
  yPosition = 30;

  // Add question text
  doc.setFontSize(11);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(...colors.darkText);
  const questionText = 'Any other information not captured so far that would be helpful to your Powers of Attorney(ies) or Estate Trustee(s)?';
  const splitQuestion = doc.splitTextToSize(questionText, fieldWidth);
  doc.text(splitQuestion, margin, yPosition);

  // Calculate height of question text
  const questionHeight = splitQuestion.length * 6;
  yPosition += questionHeight + 8;

  // Create large fillable field for the rest of the page
  const fieldHeight = pageHeight - yPosition - 20; // Leave space for footer

  doc.setDrawColor(...colors.borderGray);
  doc.setLineWidth(0.3);
  doc.rect(margin, yPosition, fieldWidth, fieldHeight);

  const additionalInfoField = new doc.AcroFormTextField();
  additionalInfoField.fieldName = 'additionalInformation';
  additionalInfoField.Rect = [margin, yPosition, fieldWidth, fieldHeight];
  additionalInfoField.multiline = true;
  additionalInfoField.fontSize = 10;
  additionalInfoField.textColor = colors.darkText;
  doc.addField(additionalInfoField);

  const fileName = `estate-planning-${formData.fullName?.replace(/\s+/g, '-').toLowerCase() || 'form'}.pdf`;
  doc.save(fileName);
};
