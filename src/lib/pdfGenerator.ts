import { jsPDF } from 'jspdf';

interface ChildData {
  name?: string;
  dateOfBirth?: string;
  parentsOption?: string;
  otherParentName?: string;
  disabled?: string;
  disabilityTaxCredit?: string;
  disabilityNature?: string;
  disabilityCare?: string;
  disabilityContacts?: string;
  disabilityOther?: string;
  independent?: string;
  medications?: string;
  allergies?: string;
  medicalIssues?: string;
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

interface FormData {
  fullName?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
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
  client1HasWill?: string;
  client1WillJurisdiction?: string;
  client1WillLocation?: string;
  client1HasSecondaryWill?: string;
  client1SecondaryWillLocation?: string;
  client1SecondaryWillJurisdiction?: string;
  client2HasWill?: string;
  client2WillJurisdiction?: string;
  client2WillLocation?: string;
  client2HasSecondaryWill?: string;
  client2SecondaryWillLocation?: string;
  client2SecondaryWillJurisdiction?: string;
  willsSameLawyer?: string;
  spousesPoaPersonalCare?: string;
  spousesPoaProperty?: string;
  client1UsesAccountant?: string;
  client1AccountingRecordsLocation?: string;
  client2UsesAccountant?: string;
  client2AccountingRecordsLocation?: string;
  accountantSamePerson?: string;
  client1FinancialAdvisors?: string;
  client1FinancialAdvisorsData?: Array<{
    name?: string;
    firm?: string;
    phone?: string;
    email?: string;
  }>;
  client2FinancialAdvisors?: string;
  client2FinancialAdvisorsData?: Array<{
    name?: string;
    firm?: string;
    phone?: string;
    email?: string;
  }>;
  client1HasPoaPersonalCare?: string;
  client1PoaPersonalCareCount?: string;
  client1PoaPersonalCareData?: Array<{
    name?: string;
    phone?: string;
    email?: string;
    relationship?: string;
  }>;
  client1HasPoaProperty?: string;
  client1PoaPropertyCount?: string;
  client1PoaPropertyData?: Array<{
    name?: string;
    phone?: string;
    email?: string;
    relationship?: string;
  }>;
  client1HasEstateTrustee?: string;
  client1EstateTrusteeCount?: string;
  client1EstateTrusteeData?: Array<{
    name?: string;
    phone?: string;
    email?: string;
    relationship?: string;
  }>;
  client2HasPoaPersonalCare?: string;
  client2PoaPersonalCareCount?: string;
  client2PoaPersonalCareData?: Array<{
    name?: string;
    phone?: string;
    email?: string;
    relationship?: string;
  }>;
  client2HasPoaProperty?: string;
  client2PoaPropertyCount?: string;
  client2PoaPropertyData?: Array<{
    name?: string;
    phone?: string;
    email?: string;
    relationship?: string;
  }>;
  client2HasEstateTrustee?: string;
  client2EstateTrusteeCount?: string;
  client2EstateTrusteeData?: Array<{
    name?: string;
    phone?: string;
    email?: string;
    relationship?: string;
  }>;
  client2PoaPersonalCareHasDocCopy?: string;
  client1PoaPropertyHasDocCopy?: string;
  client2PoaPropertyHasDocCopy?: string;
  client1EstateTrusteeHasWillCopy?: string;
  client2EstateTrusteeHasWillCopy?: string;
  client1EstateTrusteeKnowsWillLocation?: string;
  client2EstateTrusteeKnowsWillLocation?: string;
  client1HasLivingWill?: string;
  client2HasLivingWill?: string;
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
  ownsRealEstate?: string;
  primaryResidenceOwner?: string;
  isPrimaryResidence?: string;
  isSameAddressAsBeginning?: string;
  hasAdditionalRealEstate?: string;
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
  hasAdditionalProperties?: string;
  additionalPropertiesCount?: string;
  client1HasVehicleInsurance?: string;
  client2HasVehicleInsurance?: string;
  hasAdditionalVehicles?: string;
  additionalVehiclesCount?: string;
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
    hasOtherOwner?: string;
    otherOwners?: string;
  }>;
  client1HasFuneralArrangements?: string;
  client1HasDiscussedFuneral?: string;
  client1FuneralWrittenDown?: string;
  client1FuneralDocLocation?: string;
  client2HasFuneralArrangements?: string;
  client2HasDiscussedFuneral?: string;
  client2FuneralWrittenDown?: string;
  client2FuneralDocLocation?: string;
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
  };

  // Helper function: Add page header (for pages after the first)
  const addPageHeader = () => {
    const currentY = yPosition;
    doc.setFontSize(8);
    doc.setTextColor(...colors.mediumGray);
    doc.text('Estate Planning Questionnaire', margin, 12);
    doc.setTextColor(...colors.mediumGray);
    doc.text(`Page ${pageNumber}`, pageWidth - margin, 12, { align: 'right' });
    doc.setDrawColor(...colors.borderGray);
    doc.setLineWidth(0.3);
    doc.line(margin, 14, pageWidth - margin, 14);
    yPosition = currentY;
  };

  // Helper function: Add page footer
  const addPageFooter = () => {
    doc.setFontSize(8);
    doc.setTextColor(...colors.mediumGray);
    doc.text('Confidential & Proprietary', pageWidth / 2, pageHeight - 10, { align: 'center' });
  };

  // Helper function: Check if new page is needed
  const checkPageBreak = (spaceNeeded: number) => {
    if (yPosition + spaceNeeded > pageHeight - 20) {
      addPageFooter();
      doc.addPage();
      pageNumber++;
      yPosition = 22;
      addPageHeader();
      yPosition = 25;
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
    yPosition += 10;
  };

  // Introduction Page (Page 1)
  yPosition = margin + 10;

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

  // Client names
  const clientNames = formData.hasSpouse === 'yes' && formData.spouseName
    ? `${formData.fullName || ''} and ${formData.spouseName}`
    : formData.fullName || '';

  if (clientNames) {
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colors.darkText);
    doc.text(clientNames, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;
  }

  // Welcome title
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(...colors.navyBlue);
  const welcomeLines = doc.splitTextToSize('Welcome to your Will Companion Kit from Clarify Wealth.', fieldWidth);
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
    'Most Canadians remain underprepared when it comes to estate planning. A report on Estate Planning published in April 2022 by the National Institute on Aging (NAI), in collaboration with Royal Trust, found that 26% of Canadians over age 55 do not have a Will, and that 66% of Canadians between the ages of 35 and 54 do not have one. In addition, only 28% of Canadians aged 35–54 have a Power of Attorney in place, and just 53% of Canadians over age 55 have one.',
    '',
    'This document is designed to make life significantly easier for your Powers of Attorney, Estate Trustees (or Executors), and heirs when they are called upon to look after your affairs—whether during your lifetime or after your passing.',
    '',
    'It is not intended to replace or override any appointments or instructions set out in your Will or other legal documents. Rather, it is meant to support those documents by helping the individuals responsible for carrying out your wishes do so in an organized and efficient manner.',
    '',
    'Store this document along with your Will and Power of Attorney documents so it will be readily available for those who it will help.',
    '',
    'Congratulations on taking this important step. Your heirs, Powers of Attorney, and Estate Trustees will be grateful that you did.'
  ];

  introText.forEach((paragraph) => {
    if (paragraph === '') {
      yPosition += 5;
    } else {
      const lines = doc.splitTextToSize(paragraph, fieldWidth);
      lines.forEach((line: string) => {
        if (yPosition > pageHeight - 30) {
          addPageFooter();
          doc.addPage();
          pageNumber++;
          yPosition = 22;
          addPageHeader();
          yPosition = 25;
        }
        doc.text(line, margin, yPosition);
        yPosition += 5;
      });
    }
  });

  // Add footer to introduction page
  addPageFooter();

  // Start new page for the title and questionnaire content
  doc.addPage();
  pageNumber++;
  yPosition = 35;

  // Title Page Design (now on page 2)
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

  // Instructions
  yPosition += 12;
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

  addField('Full Name:', 'fullName', formData.fullName || '');
  addField('Date of Birth:', 'dateOfBirth', formData.dateOfBirth || '');
  addField('Address:', 'address', formData.address || '');
  addField('City:', 'city', formData.city || '');
  addField('Province:', 'province', formData.province || '');
  addField('Postal Code:', 'postalCode', formData.postalCode || '');
  addField('Email Address:', 'email', formData.email || '');
  addField('Phone Number:', 'phone', formData.phone || '');

  if ((formData.maritalStatus === 'married' || formData.maritalStatus === 'common_law')) {
    addSectionHeader('Spouse/Partner Information');

    addField('Spouse/Partner Name:', 'spouseName', formData.spouseName || '');
    addField('Date of Birth:', 'spouseDateOfBirth', formData.spouseDateOfBirth || '');

    if (formData.spouseSameAddress === 'yes') {
      addField('Address:', 'spouseAddress', formData.address || '');
      addField('City:', 'spouseCity', formData.city || '');
      addField('Province:', 'spouseProvince', formData.province || '');
      addField('Postal Code:', 'spousePostalCode', formData.postalCode || '');
    } else {
      addField('Address:', 'spouseAddress', formData.spouseAddress || '');
      addField('City:', 'spouseCity', formData.spouseCity || '');
      addField('Province:', 'spouseProvince', formData.spouseProvince || '');
      addField('Postal Code:', 'spousePostalCode', formData.spousePostalCode || '');
    }

    addField('Email Address:', 'spouseEmail', formData.spouseEmail || '');
    addField('Phone Number:', 'spousePhone', formData.spousePhone || '');

    if (formData.hasMarriageContract === 'yes') {
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
      const client1Name = formData.fullName || 'Client 1';
      const client2Name = formData.spouseName || 'Client 2';
      const labelText = `${client1Name} and ${client2Name} have a marriage contract, and the document is located:`;
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

      doc.setFontSize(9);
      addField('Previous Partner Name:', `client1PrevRel${index}Name`, relationship.name || '');

      const labelColumnWidth = 45;
      const tableWidth = fieldWidth;
      const valueColumnWidth = tableWidth - labelColumnWidth;
      const rowHeight = 6;
      const largeRowHeight = 20;

      checkPageBreak(rowHeight * 2 + largeRowHeight + 10);
      yPosition += 2;

      // Professional table styling
      doc.setDrawColor(...colors.borderGray);
      doc.setLineWidth(0.3);
      doc.setFontSize(9);

      // Email row
      doc.setFillColor(...colors.lightGray);
      doc.rect(margin, yPosition, labelColumnWidth, rowHeight, 'FD');
      doc.rect(margin + labelColumnWidth, yPosition, valueColumnWidth, rowHeight, 'D');
      doc.setTextColor(...colors.darkText);
      doc.text('Email Address:', margin + 2, yPosition + 4);

      const emailField = new doc.AcroFormTextField();
      emailField.fieldName = `client1PrevRel${index}Email`;
      emailField.Rect = [margin + labelColumnWidth, yPosition, valueColumnWidth, rowHeight];
      emailField.value = relationship.email || '';
      emailField.fontSize = 9;
      emailField.textColor = colors.darkText;
      doc.addField(emailField);
      yPosition += rowHeight;

      // Phone row
      doc.setFillColor(...colors.lightGray);
      doc.rect(margin, yPosition, labelColumnWidth, rowHeight, 'FD');
      doc.rect(margin + labelColumnWidth, yPosition, valueColumnWidth, rowHeight, 'D');
      doc.text('Phone Number:', margin + 2, yPosition + 4);

      const phoneField = new doc.AcroFormTextField();
      phoneField.fieldName = `client1PrevRel${index}Phone`;
      phoneField.Rect = [margin + labelColumnWidth, yPosition, valueColumnWidth, rowHeight];
      phoneField.value = relationship.phone || '';
      phoneField.fontSize = 9;
      phoneField.textColor = colors.darkText;
      doc.addField(phoneField);
      yPosition += rowHeight;

      // Other information row
      doc.setFillColor(...colors.lightGray);
      doc.rect(margin, yPosition, labelColumnWidth, largeRowHeight, 'FD');
      doc.rect(margin + labelColumnWidth, yPosition, valueColumnWidth, largeRowHeight, 'D');
      doc.text('Other Information:', margin + 2, yPosition + 4);

      const otherInfoField = new doc.AcroFormTextField();
      otherInfoField.fieldName = `client1PrevRel${index}OtherInfo`;
      otherInfoField.Rect = [margin + labelColumnWidth, yPosition, valueColumnWidth, largeRowHeight];
      otherInfoField.value = relationship.otherInfo || '';
      otherInfoField.fontSize = 9;
      otherInfoField.textColor = colors.darkText;
      otherInfoField.multiline = true;
      doc.addField(otherInfoField);
      yPosition += largeRowHeight + 10;

      if (relationship.hasSpousalSupport === 'no') {
        checkPageBreak(15);
        doc.setFontSize(9);
        doc.setTextColor(...colors.darkText);
        const labelText = `${client1Name} is not paying or receiving spousal support from a previous marriage or common law relationship with ${relationship.name || 'the indicated person'}.`;
        doc.text(labelText, margin, yPosition, { maxWidth: fieldWidth });
        yPosition += 12;
      } else if (relationship.hasSpousalSupport === 'yes' && relationship.spousalSupportType) {
        checkPageBreak(20);
        const supportAction = relationship.spousalSupportType === 'paying' ? 'paying' : 'receiving';
        const preposition = relationship.spousalSupportType === 'paying' ? 'to' : 'from';
        doc.setFontSize(9);
        doc.setTextColor(...colors.darkText);
        const labelText = `${client1Name} is ${supportAction} spousal support ${preposition} ${relationship.name || 'the indicated person'}. This document outlining this arrangement is located:`;
        doc.text(labelText, margin, yPosition, { maxWidth: fieldWidth });
        yPosition += 10;

        doc.setDrawColor(...colors.borderGray);
        doc.setLineWidth(0.3);
        doc.rect(margin, yPosition, fieldWidth, 6);

        const supportDocField = new doc.AcroFormTextField();
        supportDocField.fieldName = `client1PrevRel${index}SupportDocLocation`;
        supportDocField.Rect = [margin, yPosition, fieldWidth, 6];
        supportDocField.fontSize = 9;
        supportDocField.textColor = colors.darkText;
        supportDocField.value = relationship.supportDocumentLocation || '';
        doc.addField(supportDocField);

        yPosition += 14;
      }
    });
  }

  if ((formData.maritalStatus === 'married' || formData.maritalStatus === 'common_law') && formData.client2HasPreviousRelationship === 'yes' && formData.client2PreviousRelationshipsData) {
    const prevRelCount = parseInt(formData.client2NumberOfPreviousRelationships || '0');
    const prevRelData = formData.client2PreviousRelationshipsData.slice(0, prevRelCount);

    console.log('Client 2 Previous Relationships Data:', prevRelData);

    prevRelData.forEach((relationship, index) => {
      console.log(`Client 2 Relationship ${index}:`, relationship);

      addSubsectionHeader(`${client2Name}'s Previous Relationship ${index + 1}`);

      doc.setFontSize(9);
      addField('Previous Partner Name:', `client2PrevRel${index}Name`, relationship.name || '');

      const labelColumnWidth = 45;
      const tableWidth = fieldWidth;
      const valueColumnWidth = tableWidth - labelColumnWidth;
      const rowHeight = 6;
      const largeRowHeight = 20;

      checkPageBreak(rowHeight * 2 + largeRowHeight + 10);
      yPosition += 2;

      // Professional table styling
      doc.setDrawColor(...colors.borderGray);
      doc.setLineWidth(0.3);
      doc.setFontSize(9);

      // Email row
      doc.setFillColor(...colors.lightGray);
      doc.rect(margin, yPosition, labelColumnWidth, rowHeight, 'FD');
      doc.rect(margin + labelColumnWidth, yPosition, valueColumnWidth, rowHeight, 'D');
      doc.setTextColor(...colors.darkText);
      doc.text('Email Address:', margin + 2, yPosition + 4);

      const emailField = new doc.AcroFormTextField();
      emailField.fieldName = `client2PrevRel${index}Email`;
      emailField.Rect = [margin + labelColumnWidth, yPosition, valueColumnWidth, rowHeight];
      emailField.value = relationship.email || '';
      emailField.fontSize = 9;
      emailField.textColor = colors.darkText;
      doc.addField(emailField);
      yPosition += rowHeight;

      // Phone row
      doc.setFillColor(...colors.lightGray);
      doc.rect(margin, yPosition, labelColumnWidth, rowHeight, 'FD');
      doc.rect(margin + labelColumnWidth, yPosition, valueColumnWidth, rowHeight, 'D');
      doc.text('Phone Number:', margin + 2, yPosition + 4);

      const phoneField = new doc.AcroFormTextField();
      phoneField.fieldName = `client2PrevRel${index}Phone`;
      phoneField.Rect = [margin + labelColumnWidth, yPosition, valueColumnWidth, rowHeight];
      phoneField.value = relationship.phone || '';
      phoneField.fontSize = 9;
      phoneField.textColor = colors.darkText;
      doc.addField(phoneField);
      yPosition += rowHeight;

      // Other information row
      doc.setFillColor(...colors.lightGray);
      doc.rect(margin, yPosition, labelColumnWidth, largeRowHeight, 'FD');
      doc.rect(margin + labelColumnWidth, yPosition, valueColumnWidth, largeRowHeight, 'D');
      doc.text('Other Information:', margin + 2, yPosition + 4);

      const otherInfoField = new doc.AcroFormTextField();
      otherInfoField.fieldName = `client2PrevRel${index}OtherInfo`;
      otherInfoField.Rect = [margin + labelColumnWidth, yPosition, valueColumnWidth, largeRowHeight];
      otherInfoField.value = relationship.otherInfo || '';
      otherInfoField.fontSize = 9;
      otherInfoField.textColor = colors.darkText;
      otherInfoField.multiline = true;
      doc.addField(otherInfoField);
      yPosition += largeRowHeight + 10;

      if (relationship.hasSpousalSupport === 'no') {
        checkPageBreak(15);
        doc.setFontSize(9);
        doc.setTextColor(...colors.darkText);
        const labelText = `${client2Name} is not paying or receiving spousal support from a previous marriage or common law relationship with ${relationship.name || 'the indicated person'}.`;
        doc.text(labelText, margin, yPosition, { maxWidth: fieldWidth });
        yPosition += 12;
      } else if (relationship.hasSpousalSupport === 'yes' && relationship.spousalSupportType) {
        checkPageBreak(20);
        const supportAction = relationship.spousalSupportType === 'paying' ? 'paying' : 'receiving';
        const preposition = relationship.spousalSupportType === 'paying' ? 'to' : 'from';
        doc.setFontSize(9);
        doc.setTextColor(...colors.darkText);
        const labelText = `${client2Name} is ${supportAction} spousal support ${preposition} ${relationship.name || 'the indicated person'}. This document outlining this arrangement is located:`;
        doc.text(labelText, margin, yPosition, { maxWidth: fieldWidth });
        yPosition += 10;

        doc.setDrawColor(...colors.borderGray);
        doc.setLineWidth(0.3);
        doc.rect(margin, yPosition, fieldWidth, 6);

        const supportDocField = new doc.AcroFormTextField();
        supportDocField.fieldName = `client2PrevRel${index}SupportDocLocation`;
        supportDocField.Rect = [margin, yPosition, fieldWidth, 6];
        supportDocField.fontSize = 9;
        supportDocField.textColor = colors.darkText;
        supportDocField.value = relationship.supportDocumentLocation || '';
        doc.addField(supportDocField);

        yPosition += 14;
      }
    });
  }

  if (formData.hasChildren === 'yes' && formData.childrenData && formData.childrenData.length > 0) {
    doc.addPage();
    yPosition = 12;
    addSectionHeader('Children Information');

    const childCount = formData.numberOfChildren === '6+' ? 6 : parseInt(formData.numberOfChildren || '0');
    const childrenToProcess = formData.childrenData.slice(0, childCount);

    childrenToProcess.forEach((child, index) => {
      const childName = child.name || `Child ${index + 1}`;
      addSubsectionHeader(`Child ${index + 1}`);

      doc.setFontSize(9);
      doc.setTextColor(...colors.darkText);

      doc.setFont(undefined, 'bold');
      doc.text('Child Name:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 2;

      const childNameField = new doc.AcroFormTextField();
      childNameField.fieldName = `child${index + 1}_name`;
      childNameField.Rect = [margin, yPosition, fieldWidth - 15, 6];
      childNameField.fontSize = 9;
      childNameField.textColor = colors.darkText;
      childNameField.value = child.name || '';
      doc.addField(childNameField);

      yPosition += 10;

      doc.setFont(undefined, 'bold');
      doc.text('Date of Birth:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 2;

      const childDobField = new doc.AcroFormTextField();
      childDobField.fieldName = `child${index + 1}_dob`;
      childDobField.Rect = [margin, yPosition, fieldWidth - 15, 6];
      childDobField.fontSize = 9;
      childDobField.textColor = colors.darkText;
      childDobField.value = child.dateOfBirth || '';
      doc.addField(childDobField);

      yPosition += 10;

      if (child.parentsOption) {
        let parentsText = '';
        if (child.parentsOption === 'both') {
          parentsText = `Parents: ${client1Name} and ${client2Name}`;
        } else if (child.parentsOption === 'client1-other') {
          parentsText = `Parents: ${client1Name} and ${child.otherParentName || 'Other'}`;
        } else if (child.parentsOption === 'client2-other') {
          parentsText = `Parents: ${client2Name} and ${child.otherParentName || 'Other'}`;
        }
        if (parentsText) {
          doc.text(parentsText, margin, yPosition);
          yPosition += 4;
        }
      }

      doc.text(`Disabled: ${child.disabled === 'yes' ? 'Yes' : child.disabled === 'no' ? 'No' : ''}`, margin, yPosition);
      yPosition += 4;

      if (child.disabled === 'yes' && child.disabilityTaxCredit === 'yes') {
        doc.setFont(undefined, 'bold');
        doc.text(`${childName} is disabled and qualifies for the disability tax credit`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 4;
      }

      doc.text(`Financially Independent: ${child.independent === 'yes' ? 'Yes' : child.independent === 'no' ? 'No' : ''}`, margin, yPosition);
      yPosition += 4;

      if (child.independent !== 'yes') {
        doc.text(`Long-term Medications: ${child.medications === 'yes' ? 'Yes' : child.medications === 'no' ? 'No' : ''}`, margin, yPosition);
        yPosition += 4;
        doc.text(`Allergies: ${child.allergies === 'yes' ? 'Yes' : child.allergies === 'no' ? 'No' : ''}`, margin, yPosition);
        yPosition += 4;
        doc.text(`Medical Issues/Needs: ${child.medicalIssues === 'yes' ? 'Yes' : child.medicalIssues === 'no' ? 'No' : ''}`, margin, yPosition);

        yPosition += 10;
      } else {
        yPosition += 6;
      }

      if (child.independent !== 'yes' && (child.medications === 'yes' || child.allergies === 'yes' || child.medicalIssues === 'yes')) {
        yPosition += 3;
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('Medical Information', margin, yPosition);
        doc.setFont(undefined, 'normal');

        yPosition += 6;

        if (child.medications === 'yes') {
          doc.setFontSize(8);
          doc.text('Long-term Medications:', margin, yPosition);
          yPosition += 2;
          const medField = new doc.AcroFormTextField();
          medField.fieldName = `child${index + 1}_medications`;
          medField.Rect = [margin, yPosition, fieldWidth - 15, 8];
          medField.multiline = true;
          medField.fontSize = 8;
          medField.textColor = [0, 0, 0];
          doc.addField(medField);
          yPosition += 12;
        }

        if (child.allergies === 'yes') {
          doc.setFontSize(8);
          doc.text('Allergies:', margin, yPosition);
          yPosition += 2;
          const allergiesField = new doc.AcroFormTextField();
          allergiesField.fieldName = `child${index + 1}_allergies`;
          allergiesField.Rect = [margin, yPosition, fieldWidth - 15, 8];
          allergiesField.multiline = true;
          allergiesField.fontSize = 8;
          allergiesField.textColor = [0, 0, 0];
          doc.addField(allergiesField);
          yPosition += 12;
        }

        if (child.medicalIssues === 'yes') {
          doc.setFontSize(8);
          doc.text('Medical Issues/Needs:', margin, yPosition);
          yPosition += 2;
          const issuesField = new doc.AcroFormTextField();
          issuesField.fieldName = `child${index + 1}_medicalIssues`;
          issuesField.Rect = [margin, yPosition, fieldWidth - 15, 8];
          issuesField.multiline = true;
          issuesField.fontSize = 8;
          issuesField.textColor = [0, 0, 0];
          doc.addField(issuesField);
          yPosition += 12;
        }

        if (child.disabilityTaxCredit === 'yes') {
          yPosition += 3;
          doc.setFontSize(9);
          doc.setFont(undefined, 'bold');
          doc.setTextColor(...colors.mediumGray);
          doc.text('Disability Information', margin, yPosition);
          doc.setFont(undefined, 'normal');
          doc.setTextColor(...colors.darkText);
          yPosition += 6;

          doc.setFontSize(8);
          doc.text('Nature of the disability and severity:', margin, yPosition);
          yPosition += 2;
          const natureField = new doc.AcroFormTextField();
          natureField.fieldName = `child${index + 1}_disabilityNature`;
          natureField.Rect = [margin, yPosition, fieldWidth - 15, 10];
          natureField.multiline = true;
          natureField.fontSize = 8;
          natureField.textColor = [0, 0, 0];
          doc.addField(natureField);
          yPosition += 14;

          doc.setFontSize(8);
          doc.text('Care and assistance provided:', margin, yPosition);
          yPosition += 2;
          const careField = new doc.AcroFormTextField();
          careField.fieldName = `child${index + 1}_disabilityCare`;
          careField.Rect = [margin, yPosition, fieldWidth - 15, 10];
          careField.multiline = true;
          careField.fontSize = 8;
          careField.textColor = [0, 0, 0];
          doc.addField(careField);
          yPosition += 14;

          doc.setFontSize(8);
          doc.text('Key contacts and support including a description of their roles:', margin, yPosition);
          yPosition += 2;
          const contactsField = new doc.AcroFormTextField();
          contactsField.fieldName = `child${index + 1}_disabilityContacts`;
          contactsField.Rect = [margin, yPosition, fieldWidth - 15, 10];
          contactsField.multiline = true;
          contactsField.fontSize = 8;
          contactsField.textColor = [0, 0, 0];
          doc.addField(contactsField);
          yPosition += 14;

          doc.setFontSize(8);
          doc.text('Other information that would assist a potential guardian:', margin, yPosition);
          yPosition += 2;
          const otherField = new doc.AcroFormTextField();
          otherField.fieldName = `child${index + 1}_disabilityOther`;
          otherField.Rect = [margin, yPosition, fieldWidth - 15, 10];
          otherField.multiline = true;
          otherField.fontSize = 8;
          otherField.textColor = [0, 0, 0];
          doc.addField(otherField);
          yPosition += 14;
        }
      }

      if (child.independent !== 'yes') {
        const cellHeight = 6;
        const colWidths = [fieldWidth * 0.27, fieldWidth * 0.24, fieldWidth * 0.24, fieldWidth * 0.25];

        if (yPosition > 270) {
          doc.addPage();
          yPosition = 12;
        }

        const healthRows = [
          { label: 'Detail', value: 'Information/Provider' },
          { label: 'Family Doctor:', value: '' },
          { label: 'Dentist:', value: '' },
          { label: 'Orthodontist:', value: '' },
          ...(child.medications === 'yes' ? [{ label: 'Current Medications/Dosage:', value: '' }] : []),
          { label: 'Blood Type:', value: '' },
          { label: 'Psychologist/Therapist:', value: '' },
          { label: 'Health Card Number:', value: '' },
          ...(child.allergies === 'yes' ? [{ label: 'Allergies:', value: '' }] : []),
          ...(child.medicalIssues === 'yes' ? [{ label: 'Past Health Issues/Concerns:', value: '' }] : []),
          { label: 'Health Insurance Policy Number (if applicable):', value: '' },
          { label: 'Insurance Policies:', value: '' },
        ];

        let tableY = yPosition;

        healthRows.forEach((row, rowIndex) => {
          if (tableY > 275) {
            doc.addPage();
            tableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(8);

          const col1X = margin;
          const col2X = margin + colWidths[0];
          const col3X = margin + colWidths[0] + colWidths[1];
          const col4X = margin + colWidths[0] + colWidths[1] + colWidths[2];

          doc.rect(col1X, tableY, colWidths[0], cellHeight);
          doc.rect(col2X, tableY, colWidths[1], cellHeight);
          doc.rect(col3X, tableY, colWidths[2], cellHeight);
          doc.rect(col4X, tableY, colWidths[3], cellHeight);

          if (rowIndex === 0) {
            doc.text('Detail:', col1X + 0.5, tableY + 4);
            doc.text('Information/Provider:', col2X + 0.5, tableY + 4);
            doc.text('Location of Records:', col3X + 0.5, tableY + 4);
            doc.text('Other Details:', col4X + 0.5, tableY + 4);
          } else {
            doc.setFont(undefined, 'normal');

            if (row.label === 'Other Details:' || row.label === 'Other:' || row.label === 'Joint with _____:') {
              const labelField = new doc.AcroFormTextField();
              labelField.fieldName = `child${index + 1}_health_${rowIndex}_col1`;
              labelField.Rect = [col1X + 0.3, tableY + 0.3, colWidths[0] - 0.6, cellHeight - 0.6];
              labelField.fontSize = 7;
              labelField.textColor = [0, 0, 0];
              labelField.borderStyle = 'none';
              labelField.value = row.label;
              doc.addField(labelField);
            } else {
              doc.text(row.label, col1X + 0.5, tableY + 4);
            }

            const field1 = new doc.AcroFormTextField();
            field1.fieldName = `child${index + 1}_health_${rowIndex}_col2`;
            field1.Rect = [col2X + 0.3, tableY + 0.3, colWidths[1] - 0.6, cellHeight - 0.6];
            field1.fontSize = 7;
            field1.textColor = [0, 0, 0];
            field1.borderStyle = 'none';
            doc.addField(field1);

            const field2 = new doc.AcroFormTextField();
            field2.fieldName = `child${index + 1}_health_${rowIndex}_col3`;
            field2.Rect = [col3X + 0.3, tableY + 0.3, colWidths[2] - 0.6, cellHeight - 0.6];
            field2.fontSize = 7;
            field2.textColor = [0, 0, 0];
            field2.borderStyle = 'none';
            doc.addField(field2);

            const field3 = new doc.AcroFormTextField();
            field3.fieldName = `child${index + 1}_health_${rowIndex}_col4`;
            field3.Rect = [col4X + 0.3, tableY + 0.3, colWidths[3] - 0.6, cellHeight - 0.6];
            field3.fontSize = 7;
            field3.textColor = [0, 0, 0];
            field3.borderStyle = 'none';
            doc.addField(field3);
          }

          tableY += cellHeight;
        });

        yPosition = tableY + 8;

        if (yPosition > 270) {
          doc.addPage();
          yPosition = 12;
        }
      }

      if (child.independent !== 'yes') {
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text(`${childName} - Educational and Extra Curricular Activities`, margin, yPosition);
        doc.setFont(undefined, 'normal');

        yPosition += 6;

        const eduColWidths = [fieldWidth * 0.22, fieldWidth * 0.26, fieldWidth * 0.26, fieldWidth * 0.26];
        const eduCellHeight = 5;
        let eduTableY = yPosition;

        const eduRows = [
          { label: 'Category:', col2: 'Institution/Instructor/Club', col3: 'Notes/Preferences', col4: 'Other' },
          { label: 'School:' },
          { label: '' },
          { label: '' },
          { label: '' },
          { label: 'Special Education Needs:' },
          { label: '' },
          { label: '' },
          { label: '' },
          { label: 'Sports Clubs/Lessons:' },
          { label: '' },
          { label: '' },
          { label: '' },
          { label: 'Music Clubs/Lessons:' },
          { label: '' },
          { label: '' },
          { label: '' },
          { label: 'Tutoring:' },
          { label: '' },
          { label: '' },
          { label: '' },
          { label: 'Summer Camps:' },
          { label: '' },
          { label: '' },
          { label: '' },
          { label: 'Other:' },
          { label: '' },
          { label: '' },
          { label: '' },
        ];

        eduRows.forEach((row, rowIndex) => {
          if (eduTableY > 275) {
            doc.addPage();
            eduTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(7);

          const eduCol1X = margin;
          const eduCol2X = margin + eduColWidths[0];
          const eduCol3X = margin + eduColWidths[0] + eduColWidths[1];
          const eduCol4X = margin + eduColWidths[0] + eduColWidths[1] + eduColWidths[2];

          doc.rect(eduCol1X, eduTableY, eduColWidths[0], eduCellHeight);
          doc.rect(eduCol2X, eduTableY, eduColWidths[1], eduCellHeight);
          doc.rect(eduCol3X, eduTableY, eduColWidths[2], eduCellHeight);
          doc.rect(eduCol4X, eduTableY, eduColWidths[3], eduCellHeight);

          if (rowIndex === 0) {
            doc.text('Category:', eduCol1X + 0.3, eduTableY + 3.5);
            doc.text('Institution/Instructor/Club:', eduCol2X + 0.3, eduTableY + 3.5);
            doc.text('Notes/Preferences:', eduCol3X + 0.3, eduTableY + 3.5);
            doc.text('Other:', eduCol4X + 0.3, eduTableY + 3.5);
          } else {
            if (row.label === 'Other Details:' || row.label === 'Other:' || row.label === 'Joint with _____:') {
              const labelField = new doc.AcroFormTextField();
              labelField.fieldName = `child${index + 1}_edu_${rowIndex}_col1`;
              labelField.Rect = [eduCol1X + 0.3, eduTableY + 0.3, eduColWidths[0] - 0.6, eduCellHeight - 0.6];
              labelField.fontSize = 7;
              labelField.textColor = [0, 0, 0];
              labelField.borderStyle = 'none';
              labelField.value = row.label;
              doc.addField(labelField);
            } else {
              doc.text(row.label, eduCol1X + 0.3, eduTableY + 3.5);
            }

            const activityKey = [
              'school',
              'specialEd',
              'sports',
              'music',
              'tutoring',
              'camps',
              'other1',
              'other2',
            ][rowIndex - 1];

            const eduField1 = new doc.AcroFormTextField();
            eduField1.fieldName = `child${index + 1}_edu_${rowIndex}_col2`;
            eduField1.Rect = [eduCol2X + 0.2, eduTableY + 0.2, eduColWidths[1] - 0.4, eduCellHeight - 0.4];
            eduField1.fontSize = 6;
            eduField1.textColor = [0, 0, 0];
            eduField1.borderStyle = 'none';
            doc.addField(eduField1);

            const eduField2 = new doc.AcroFormTextField();
            eduField2.fieldName = `child${index + 1}_edu_${rowIndex}_col3`;
            eduField2.Rect = [eduCol3X + 0.2, eduTableY + 0.2, eduColWidths[2] - 0.4, eduCellHeight - 0.4];
            eduField2.fontSize = 6;
            eduField2.textColor = [0, 0, 0];
            eduField2.borderStyle = 'none';
            doc.addField(eduField2);

            const eduField3 = new doc.AcroFormTextField();
            eduField3.fieldName = `child${index + 1}_edu_${rowIndex}_col4`;
            eduField3.Rect = [eduCol4X + 0.2, eduTableY + 0.2, eduColWidths[3] - 0.4, eduCellHeight - 0.4];
            eduField3.fontSize = 6;
            eduField3.textColor = [0, 0, 0];
            eduField3.borderStyle = 'none';
            doc.addField(eduField3);
          }

          eduTableY += eduCellHeight;
        });

        yPosition = eduTableY + 10;
      }

      if (child.independent !== 'yes') {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text(`${childName} - Digital Identity and Access`, margin, yPosition);
        doc.setFont(undefined, 'normal');

        yPosition += 4;
        doc.setFontSize(8);
        doc.text('Modern parenting includes school portals, social accounts and gaming platforms that guardians must', margin, yPosition);
        yPosition += 3;
        doc.text('manage. Provide the information that you believe would best assist a potential guardian:', margin, yPosition);

        yPosition += 6;

        const digitalColWidths = [fieldWidth * 0.22, fieldWidth * 0.26, fieldWidth * 0.26, fieldWidth * 0.26];
        const digitalCellHeight = 5;
        let digitalTableY = yPosition;

        const digitalRows = [
          { label: 'Digital Asset:', col2: 'Login/Portal URL:', col3: 'Username:', col4: 'Password/PIN:' },
          { label: 'School Portal:' },
          { label: 'Child\'s Smartphone / Tablet:' },
          { label: 'Gaming Accounts (Steam/Epic):' },
          { label: 'Social Media (Private/Public):' },
          { label: 'Cloud Photo Storage:' },
          { label: 'Other:' },
          { label: 'Other:' },
          { label: 'Other:' },
        ];

        digitalRows.forEach((row, rowIndex) => {
          if (digitalTableY > 275) {
            doc.addPage();
            digitalTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(7);

          const digitalCol1X = margin;
          const digitalCol2X = margin + digitalColWidths[0];
          const digitalCol3X = margin + digitalColWidths[0] + digitalColWidths[1];
          const digitalCol4X = margin + digitalColWidths[0] + digitalColWidths[1] + digitalColWidths[2];

          doc.rect(digitalCol1X, digitalTableY, digitalColWidths[0], digitalCellHeight);
          doc.rect(digitalCol2X, digitalTableY, digitalColWidths[1], digitalCellHeight);
          doc.rect(digitalCol3X, digitalTableY, digitalColWidths[2], digitalCellHeight);
          doc.rect(digitalCol4X, digitalTableY, digitalColWidths[3], digitalCellHeight);

          if (rowIndex === 0) {
            doc.text('Digital Asset:', digitalCol1X + 0.3, digitalTableY + 3.5);
            doc.text('Login/Portal URL:', digitalCol2X + 0.3, digitalTableY + 3.5);
            doc.text('Username:', digitalCol3X + 0.3, digitalTableY + 3.5);
            doc.text('Password/PIN:', digitalCol4X + 0.3, digitalTableY + 3.5);
          } else {
            if (row.label === 'Other Details:' || row.label === 'Other:' || row.label === 'Joint with _____:') {
              const labelField = new doc.AcroFormTextField();
              labelField.fieldName = `child${index + 1}_digital_${rowIndex}_col1`;
              labelField.Rect = [digitalCol1X + 0.3, digitalTableY + 0.3, digitalColWidths[0] - 0.6, digitalCellHeight - 0.6];
              labelField.fontSize = 6;
              labelField.textColor = [0, 0, 0];
              labelField.borderStyle = 'none';
              labelField.value = row.label;
              doc.addField(labelField);
            } else {
              doc.text(row.label, digitalCol1X + 0.3, digitalTableY + 3.5);
            }

            const digitalField1 = new doc.AcroFormTextField();
            digitalField1.fieldName = `child${index + 1}_digital_${rowIndex}_col2`;
            digitalField1.Rect = [digitalCol2X + 0.2, digitalTableY + 0.2, digitalColWidths[1] - 0.4, digitalCellHeight - 0.4];
            digitalField1.fontSize = 6;
            digitalField1.textColor = [0, 0, 0];
            digitalField1.borderStyle = 'none';
            doc.addField(digitalField1);

            const digitalField2 = new doc.AcroFormTextField();
            digitalField2.fieldName = `child${index + 1}_digital_${rowIndex}_col3`;
            digitalField2.Rect = [digitalCol3X + 0.2, digitalTableY + 0.2, digitalColWidths[2] - 0.4, digitalCellHeight - 0.4];
            digitalField2.fontSize = 6;
            digitalField2.textColor = [0, 0, 0];
            digitalField2.borderStyle = 'none';
            doc.addField(digitalField2);

            const digitalField3 = new doc.AcroFormTextField();
            digitalField3.fieldName = `child${index + 1}_digital_${rowIndex}_col4`;
            digitalField3.Rect = [digitalCol4X + 0.2, digitalTableY + 0.2, digitalColWidths[3] - 0.4, digitalCellHeight - 0.4];
            digitalField3.fontSize = 6;
            digitalField3.textColor = [0, 0, 0];
            digitalField3.borderStyle = 'none';
            doc.addField(digitalField3);
          }

          digitalTableY += digitalCellHeight;
        });

        yPosition = digitalTableY + 10;
      }

      if (child.canadianResident === 'yes' && child.provinceTerritory && child.dateOfBirth) {
        const provinces18 = ['Alberta', 'Manitoba', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'];
        const provinces19 = ['British Columbia', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Northwest Territories', 'Nunavut', 'Yukon'];

        const ageOfMajority = provinces18.includes(child.provinceTerritory) ? 18 : provinces19.includes(child.provinceTerritory) ? 19 : null;

        if (ageOfMajority) {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 12;
          }

          yPosition += 6;
          doc.setFontSize(9);
          doc.setFont(undefined, 'bold');
          doc.text('Age of Majority:', margin, yPosition);
          doc.setFont(undefined, 'normal');
          yPosition += 5;

          if (child.overAgeMajority === 'yes') {
            doc.setFontSize(9);
            doc.text(`${childName} has reached the age of majority in their province.`, margin, yPosition);
          } else if (child.overAgeMajority === 'no') {
            const [year, month, day] = child.dateOfBirth.split('-').map(Number);
            const majorityDate = new Date(year + ageOfMajority, month - 1, day);

            const formattedDate = majorityDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });

            doc.setFontSize(9);
            doc.text(`${childName} will reach the age of majority in ${child.provinceTerritory} on ${formattedDate}.`, margin, yPosition);
          }
          yPosition += 6;
        }
      }

      if (child.canadianResident === 'no') {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 12;
        }

        yPosition += 6;
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('Country of Residence:', margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 5;

        const countryField = new doc.AcroFormTextField();
        countryField.fieldName = `child${index + 1}_countryOfResidence`;
        countryField.Rect = [margin, yPosition, fieldWidth - 15, 6];
        countryField.fontSize = 9;
        countryField.textColor = [0, 0, 0];
        countryField.value = child.countryOfResidence || '';
        doc.addField(countryField);

        yPosition += 10;
      }

      if (yPosition > 250) {
        doc.addPage();
        yPosition = 12;
      }

      yPosition += 6;
      doc.setFontSize(9);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...colors.mediumGray);
      doc.text('Spouse/Partner:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...colors.darkText);
      yPosition += 5;

      const hasSpouseField = new doc.AcroFormTextField();
      hasSpouseField.fieldName = `child${index + 1}_hasSpouse`;
      hasSpouseField.Rect = [margin, yPosition, fieldWidth - 15, 6];
      hasSpouseField.fontSize = 9;
      hasSpouseField.textColor = colors.darkText;
      hasSpouseField.value = child.hasSpouse === 'yes' ? 'Yes' : child.hasSpouse === 'no' ? 'No' : '';
      doc.addField(hasSpouseField);

      yPosition += 10;

      if (child.hasSpouse === 'yes') {
        doc.setFontSize(8);
        doc.text('Spouse/Partner Name:', margin, yPosition);
        yPosition += 2;

        const spouseNameField = new doc.AcroFormTextField();
        spouseNameField.fieldName = `child${index + 1}_spouseName`;
        spouseNameField.Rect = [margin, yPosition, fieldWidth - 15, 6];
        spouseNameField.fontSize = 9;
        spouseNameField.textColor = colors.darkText;
        spouseNameField.value = child.spouseName || '';
        doc.addField(spouseNameField);

        yPosition += 10;
      }

      if (yPosition > 250) {
        doc.addPage();
        yPosition = 12;
      }

      yPosition += 6;
      doc.setFontSize(9);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...colors.mediumGray);
      doc.text(`Does ${childName} have any children:`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...colors.darkText);
      yPosition += 5;

      const hasChildrenField = new doc.AcroFormTextField();
      hasChildrenField.fieldName = `child${index + 1}_hasChildren`;
      hasChildrenField.Rect = [margin, yPosition, fieldWidth - 15, 6];
      hasChildrenField.fontSize = 9;
      hasChildrenField.textColor = colors.darkText;
      hasChildrenField.value = child.hasChildren === 'yes' ? 'Yes' : child.hasChildren === 'no' ? 'No' : '';
      doc.addField(hasChildrenField);

      yPosition += 10;

      if (child.hasChildren === 'yes') {
        doc.setFontSize(8);
        doc.text('Number of Grandchildren:', margin, yPosition);
        yPosition += 2;

        const numGrandchildrenField = new doc.AcroFormTextField();
        numGrandchildrenField.fieldName = `child${index + 1}_numberOfGrandchildren`;
        numGrandchildrenField.Rect = [margin, yPosition, 30, 6];
        numGrandchildrenField.fontSize = 9;
        numGrandchildrenField.textColor = colors.darkText;
        numGrandchildrenField.value = child.numberOfGrandchildren || '';
        doc.addField(numGrandchildrenField);

        yPosition += 10;

        const gcCount = parseInt(child.numberOfGrandchildren || '0');
        if (gcCount > 0) {
          doc.setFontSize(8);
          doc.setFont(undefined, 'bold');
          doc.text('Grandchildren Names:', margin, yPosition);
          doc.setFont(undefined, 'normal');
          yPosition += 5;

          for (let gc = 1; gc <= Math.min(gcCount, 20); gc++) {
            if (yPosition > 270) {
              doc.addPage();
              yPosition = 12;
            }

            doc.setFontSize(8);
            doc.text(`Grandchild ${gc}:`, margin, yPosition);
            yPosition += 2;

            const gcNameField = new doc.AcroFormTextField();
            gcNameField.fieldName = `child${index + 1}_grandchild${gc}Name`;
            gcNameField.Rect = [margin, yPosition, fieldWidth - 15, 6];
            gcNameField.fontSize = 9;
            gcNameField.textColor = colors.darkText;
            gcNameField.value = child[`grandchild${gc}Name`] || '';
            doc.addField(gcNameField);

            yPosition += 10;
          }
        }
      }

      yPosition += 8;
    });
  }

  if (formData.hasFamilyTrust === 'yes') {
    doc.addPage();
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
      const rowY = yPosition;

      doc.setDrawColor(...colors.borderGray);
      doc.setLineWidth(0.5);
      doc.rect(margin, rowY, labelWidth, cellHeight);
      doc.rect(margin + labelWidth, rowY, valueWidth, cellHeight);

      doc.setFontSize(9);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...colors.darkText);
      doc.text(row.label, margin + 1, rowY + 5);

      const field = new doc.AcroFormTextField();
      field.fieldName = `trust_${index}`;
      field.Rect = [margin + labelWidth + 0.5, rowY + 0.5, valueWidth - 1, cellHeight - 1];
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

      // Check if we need a new page (5 rows * 6 height + 8 margin)
      if (yPosition + 38 > pageHeight - margin) {
        doc.addPage();
        yPosition = 12;
      }

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
        const rowY = yPosition;

        doc.setDrawColor(...colors.borderGray);
        doc.setLineWidth(0.5);
        doc.rect(margin, rowY, beneLabelWidth, beneCellHeight);
        doc.rect(margin + beneLabelWidth, rowY, beneValueWidth, beneCellHeight);

        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...colors.darkText);
        doc.text(field.label, margin + 1, rowY + 4);

        const inputField = new doc.AcroFormTextField();
        inputField.fieldName = `trust_beneficiary_${i + 1}_${field.fieldName}`;
        inputField.Rect = [margin + beneLabelWidth + 0.5, rowY + 0.5, beneValueWidth - 1, beneCellHeight - 1];
        inputField.fontSize = 8;
        inputField.textColor = colors.darkText;
        inputField.borderStyle = 'none';
        inputField.value = field.value;
        doc.addField(inputField);

        yPosition += beneCellHeight;
      });

      yPosition += 8;
    }

    yPosition += 8;

    if (yPosition + 80 > pageHeight - margin) {
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colors.darkText);
    doc.text('Trust and Professional Contracts:', margin, yPosition);
    yPosition += 6;
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
    doc.setLineWidth(0.5);

    tpcHeaders.forEach((header, colIdx) => {
      const colWidths = [tpcCol1Width, tpcCol2Width, tpcCol3Width, tpcCol4Width];
      const xPos = margin + colWidths.slice(0, colIdx).reduce((a, b) => a + b, 0);
      doc.setDrawColor(180, 180, 180);
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

      doc.setDrawColor(...colors.borderGray);
      doc.setLineWidth(0.5);
      doc.rect(margin, rowY, tpcCol1Width, tpcRowHeight);
      doc.setFontSize(8);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...colors.darkText);
      doc.text(label, margin + 1, rowY + 6);

      [tpcCol2Width, tpcCol3Width, tpcCol4Width].forEach((colWidth, colIdx) => {
        const xPos = margin + [tpcCol1Width, tpcCol1Width + tpcCol2Width, tpcCol1Width + tpcCol2Width + tpcCol3Width][colIdx];
        doc.setDrawColor(...colors.borderGray);
        doc.setLineWidth(0.5);
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
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colors.darkText);
    doc.text('Trustee Information:', margin, yPosition);
    yPosition += 8;

    const tiRowHeight = 10;
    const tiHeaderHeight = 12;
    const tiRowCount = 6;
    const tiCol1Width = fieldWidth * 0.40;
    const tiCol2Width = fieldWidth * 0.30;
    const tiCol3Width = fieldWidth * 0.30;

    const tiHeaders = ['Trustee Name:', 'Phone Number:', 'Email Address:'];

    currentY = yPosition;
    doc.setLineWidth(0.5);

    tiHeaders.forEach((header, colIdx) => {
      const colWidths = [tiCol1Width, tiCol2Width, tiCol3Width];
      const xPos = margin + colWidths.slice(0, colIdx).reduce((a, b) => a + b, 0);
      doc.setDrawColor(180, 180, 180);
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
        doc.setDrawColor(...colors.borderGray);
        doc.setLineWidth(0.5);
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
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colors.darkText);
    doc.text('Trust Contents:', margin, yPosition);
    yPosition += 8;

    const tcRowHeight = 10;
    const tcHeaderHeight = 12;
    const tcRowCount = 8;
    const tcCol1Width = fieldWidth * 0.25;
    const tcCol2Width = fieldWidth * 0.25;
    const tcCol3Width = fieldWidth * 0.25;
    const tcCol4Width = fieldWidth * 0.25;

    const tcHeaders = ['Asset Type:', 'Estimated Value:', 'Book Value/Cost Base:', 'Other Information:'];

    currentY = yPosition;
    doc.setLineWidth(0.5);

    tcHeaders.forEach((header, colIdx) => {
      const colWidths = [tcCol1Width, tcCol2Width, tcCol3Width, tcCol4Width];
      const xPos = margin + colWidths.slice(0, colIdx).reduce((a, b) => a + b, 0);
      doc.setDrawColor(180, 180, 180);
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
        doc.setDrawColor(...colors.borderGray);
        doc.setLineWidth(0.5);
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

  doc.addPage();
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
      doc.text(`${corpClient1Name} and ${corpClient2Name} indicated that they do not own a corporation.`, margin, yPosition);
    } else {
      doc.text(`${corpClient1Name} indicated that they do not own a corporation.`, margin, yPosition);
    }
    yPosition += 8;
  } else if (formData.ownsCorporation === 'yes') {
    const corporationCount = parseInt(formData.numberOfCorporations || '0');

    if (corporationCount > 0) {
      for (let i = 0; i < corporationCount; i++) {
        const corporation = formData.corporationsData?.[i];
        const ordinal = getOrdinalLabel(i + 1);

        yPosition += 6;
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...colors.darkText);
        doc.text(`${ordinal} Corporation:`, margin, yPosition);
        yPosition += 8;

        const corporationTypeValue = corporation?.corporationType === 'Other' && corporation?.corporationTypeOther
          ? `${corporation.corporationType} - ${corporation.corporationTypeOther}`
          : (corporation?.corporationType || '');

        const ownersValue = corporation?.owners ? corporation.owners.replace(/,/g, ', ') : '';

        const corpRows = [
          { label: `${ordinal} Corporation's Name:`, value: corporation?.legalName || '', fieldName: 'name' },
          { label: 'This company was incorporated in:', value: corporation?.jurisdiction || '', fieldName: 'jurisdiction' },
          { label: 'Type of corporation:', value: corporationTypeValue, fieldName: 'type' },
          { label: 'Owner(s):', value: ownersValue, fieldName: 'owners' },
          { label: 'Location of the Articles of Incorporation:', value: corporation?.articlesLocation || '', fieldName: 'articlesLocation' },
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
          doc.addPage();
          yPosition = 12;
          doc.setFontSize(11);
          doc.setFont(undefined, 'bold');
          doc.setTextColor(...colors.darkText);
          doc.text(`${ordinal} Corporation:`, margin, yPosition);
          yPosition += 8;
        }

        corpRows.forEach((row, rowIndex) => {
          const isHoldingAssets = row.fieldName === 'holdingCompanyAssets';
          const rowHeight = isHoldingAssets ? 24 : cellHeight;
          const rowY = yPosition;

          doc.setDrawColor(...colors.borderGray);
          doc.setLineWidth(0.5);
          doc.rect(margin, rowY, labelWidth, rowHeight);
          doc.rect(margin + labelWidth, rowY, valueWidth, rowHeight);

          doc.setFontSize(9);
          doc.setFont(undefined, 'bold');
          doc.setTextColor(...colors.darkText);
          doc.text(row.label, margin + 1, rowY + 5);

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
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...colors.darkText);
        doc.text(`${corpName} - Business and Professional Contracts:`, margin, yPosition);
        yPosition += 6;
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.text('For clients with corporations, your trustee must know your \'Quarterback Team\' to manage transitions or wind-ups effectively.', margin, yPosition);
        yPosition += 8;

        const bpcRowHeight = 10;
        const bpcHeaderHeight = 14;
        const bpcCol1Width = fieldWidth * 0.25;
        const bpcCol2Width = fieldWidth * 0.25;
        const bpcCol3Width = fieldWidth * 0.25;
        const bpcCol4Width = fieldWidth * 0.25;

        const bpcHeaders = ['Professional:', 'Name:', 'Firm/Contact Info:', 'Role in the Estate:'];
        const bpcRows = ['Lawyer(s):', 'Accountant/Tax Prep(s):', 'Trustee(s):', 'Life/Disability/Critical Illness Provider(s):'];

        let currentY = yPosition;
        doc.setLineWidth(0.5);

        bpcHeaders.forEach((header, colIdx) => {
          const colWidths = [bpcCol1Width, bpcCol2Width, bpcCol3Width, bpcCol4Width];
          const xPos = margin + colWidths.slice(0, colIdx).reduce((a, b) => a + b, 0);
          doc.setDrawColor(180, 180, 180);
          doc.setFillColor(250, 250, 250);
          doc.rect(xPos, currentY, colWidths[colIdx], bpcHeaderHeight, 'FD');
          doc.setFontSize(8);
          doc.setFont(undefined, 'bold');
          doc.setTextColor(0, 0, 0);
          const lines = doc.splitTextToSize(header, colWidths[colIdx] - 2);
          const textY = currentY + (bpcHeaderHeight - lines.length * 3) / 2 + 3;
          doc.text(lines, xPos + 1, textY);
        });

        currentY += bpcHeaderHeight;

        bpcRows.forEach((rowLabel, rowIdx) => {
          const rowY = currentY;
          doc.setDrawColor(...colors.borderGray);
          doc.setFillColor(240, 240, 250);
          doc.setLineWidth(0.5);
          doc.rect(margin, rowY, bpcCol1Width, bpcRowHeight, 'FD');

          doc.setFontSize(7);
          doc.setFont(undefined, 'normal');
          doc.setTextColor(...colors.darkText);
          doc.text(rowLabel, margin + 1, rowY + 6);

          [bpcCol2Width, bpcCol3Width, bpcCol4Width].forEach((colWidth, colIdx) => {
            const xPos = margin + bpcCol1Width + [0, bpcCol2Width, bpcCol2Width + bpcCol3Width][colIdx];
            doc.rect(xPos, rowY, colWidth, bpcRowHeight);

            const field = new doc.AcroFormTextField();
            field.fieldName = `corp_${i + 1}_bpc_${rowIdx}_${colIdx}`;
            field.Rect = [xPos + 0.5, rowY + 0.5, colWidth - 1, bpcRowHeight - 1];
            field.fontSize = 7;
            field.textColor = colors.darkText;
            field.borderStyle = 'none';
            field.multiline = true;
            doc.addField(field);
          });

          currentY += bpcRowHeight;
        });

        yPosition = currentY + 12;

        const ptRowHeight = 10;
        const ptHeaderHeight = 14;
        const ptRows = ['Corporate Accountant:', 'Commercial Banker:', 'Business Valuator:', 'Other:', 'Other:'];
        const ptTableHeight = ptHeaderHeight + (ptRows.length * ptRowHeight) + 14;

        if (yPosition + ptTableHeight > pageHeight - margin) {
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...colors.darkText);
        doc.text(`${corpName} - Professional Team:`, margin, yPosition);
        yPosition += 6;
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.text('These are the professionals that are related to your corporate needs:', margin, yPosition);
        yPosition += 8;

        const ptCol1Width = fieldWidth * 0.25;
        const ptCol2Width = fieldWidth * 0.25;
        const ptCol3Width = fieldWidth * 0.25;
        const ptCol4Width = fieldWidth * 0.25;

        const ptHeaders = ['Professional:', 'Name:', 'Firm & Contact Info:', 'Primary Role:'];

        currentY = yPosition;
        doc.setLineWidth(0.5);

        ptHeaders.forEach((header, colIdx) => {
          const colWidths = [ptCol1Width, ptCol2Width, ptCol3Width, ptCol4Width];
          const xPos = margin + colWidths.slice(0, colIdx).reduce((a, b) => a + b, 0);
          doc.setDrawColor(180, 180, 180);
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

        ptRows.forEach((rowLabel, rowIdx) => {
          const rowY = currentY;
          doc.setDrawColor(...colors.borderGray);
          doc.setFillColor(240, 240, 250);
          doc.setLineWidth(0.5);
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
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...colors.darkText);
        doc.text(`${corpName} - Financial Obligations and Personal Guarantees:`, margin, yPosition);
        yPosition += 8;

        const fopgCol1Width = fieldWidth * 0.20;
        const fopgCol2Width = fieldWidth * 0.22;
        const fopgCol3Width = fieldWidth * 0.18;
        const fopgCol4Width = fieldWidth * 0.15;
        const fopgCol5Width = fieldWidth * 0.25;

        const fopgHeaders = ['Creditor/Bank:', 'Loan Type (term, LOC, Mortgage):', 'Account Number:', 'Personal Guarantee? (Y/N)', 'Location of Supporting Documents'];

        currentY = yPosition;
        doc.setLineWidth(0.5);

        fopgHeaders.forEach((header, colIdx) => {
          const colWidths = [fopgCol1Width, fopgCol2Width, fopgCol3Width, fopgCol4Width, fopgCol5Width];
          const xPos = margin + colWidths.slice(0, colIdx).reduce((a, b) => a + b, 0);
          doc.setDrawColor(180, 180, 180);
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
            doc.setDrawColor(...colors.borderGray);
            doc.setLineWidth(0.5);
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
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...colors.darkText);
        doc.text(`${corpName} - Business Continuity and Risk Management:`, margin, yPosition);
        yPosition += 6;
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
        doc.setLineWidth(0.5);

        bcrmHeaders.forEach((header, colIdx) => {
          const colWidths = [bcrmCol1Width, bcrmCol2Width, bcrmCol3Width, bcrmCol4Width, bcrmCol5Width, bcrmCol6Width];
          const xPos = margin + colWidths.slice(0, colIdx).reduce((a, b) => a + b, 0);
          doc.setDrawColor(180, 180, 180);
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
          doc.setDrawColor(...colors.borderGray);
          doc.setFillColor(240, 240, 250);
          doc.setLineWidth(0.5);
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
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...colors.darkText);
        doc.text(`${corpName} - Succession and Buy-Sell Triggers:`, margin, yPosition);
        yPosition += 6;
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
        doc.setLineWidth(0.5);

        sbstHeaders.forEach((header, colIdx) => {
          const colWidths = [sbstCol1Width, sbstCol2Width, sbstCol3Width, sbstCol4Width];
          const xPos = margin + colWidths.slice(0, colIdx).reduce((a, b) => a + b, 0);
          doc.setDrawColor(180, 180, 180);
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
          doc.setDrawColor(180, 180, 180);
          doc.setFillColor(240, 240, 250);
          doc.setLineWidth(0.5);
          doc.rect(margin, rowY, sbstCol1Width, sbstRowHeight, 'FD');

          doc.setFontSize(7);
          doc.setFont(undefined, 'normal');
          doc.setTextColor(...colors.darkText);
          doc.text(row.label, margin + 1, rowY + 6);

          [sbstCol2Width, sbstCol3Width, sbstCol4Width].forEach((colWidth, colIdx) => {
            const xPos = margin + sbstCol1Width + [0, sbstCol2Width, sbstCol2Width + sbstCol3Width][colIdx];
            doc.setDrawColor(180, 180, 180);
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

  yPosition += 12;
  doc.addPage();
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
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Estate Lawyer / Notary:', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 6;
    doc.setFontSize(9);
    doc.setFont(undefined, 'italic');
    doc.text('It is recommended that you have a Will done', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 12;
  } else if (formData.client1HasWill === 'yes' || formData.client2HasWill === 'yes') {
    const bothHaveWills = formData.client1HasWill === 'yes' && formData.client2HasWill === 'yes';
    const sameLawyer = formData.willsSameLawyer === 'yes';

    if (formData.client1HasWill === 'yes' && formData.client1WillJurisdiction) {
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text(`${client1Name}'s Will was prepared in ${formData.client1WillJurisdiction}.`, margin, yPosition);
      yPosition += 6;
    }

    if (formData.client1HasWill === 'yes' && formData.client1WillLocation) {
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text(`${client1Name} has a Will, and it is located: ${formData.client1WillLocation}`, margin, yPosition);
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

    if (formData.client2HasWill === 'yes' && formData.client2WillJurisdiction && hasSpouse) {
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text(`${client2Name}'s Will was prepared in ${formData.client2WillJurisdiction}.`, margin, yPosition);
      yPosition += 6;
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

    if ((formData.client1HasWill === 'yes' && (formData.client1WillJurisdiction || formData.client1WillLocation)) ||
        (formData.client2HasWill === 'yes' && (formData.client2WillJurisdiction || formData.client2WillLocation) && hasSpouse)) {
      yPosition += 4;
    }

    if (bothHaveWills && sameLawyer) {
      if (yPosition > 240) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('Estate Lawyer / Notary:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      const lawyerRows = [
        { label: 'Estate Lawyer/Notary:', col2: 'Information:', col3: 'Other Details (If Applicable)' },
        { label: 'Name:' },
        { label: 'Firm:' },
        { label: 'City, Province:' },
        { label: 'Email Address:' },
        { label: 'Date of last Will update:' },
        { label: 'Will Location:' },
        { label: '' },
      ];

      const lawyerCellHeight = 6;
      const lawyerColWidths = [fieldWidth * 0.30, fieldWidth * 0.35, fieldWidth * 0.35];
      let lawyerTableY = yPosition;

      lawyerRows.forEach((row, rowIndex) => {
        if (lawyerTableY > 275) {
          doc.addPage();
          lawyerTableY = 12;
        }

        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
        doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
        doc.setFontSize(8);

        const lawyerCol1X = margin;
        const lawyerCol2X = margin + lawyerColWidths[0];
        const lawyerCol3X = margin + lawyerColWidths[0] + lawyerColWidths[1];

        doc.rect(lawyerCol1X, lawyerTableY, lawyerColWidths[0], lawyerCellHeight);
        doc.rect(lawyerCol2X, lawyerTableY, lawyerColWidths[1], lawyerCellHeight);
        doc.rect(lawyerCol3X, lawyerTableY, lawyerColWidths[2], lawyerCellHeight);

        if (rowIndex === 0) {
          doc.text('Estate Lawyer/Notary:', lawyerCol1X + 0.5, lawyerTableY + 4);
          doc.text('Information:', lawyerCol2X + 0.5, lawyerTableY + 4);
          doc.text('Other Details (If Applicable):', lawyerCol3X + 0.5, lawyerTableY + 4);
        } else {
          doc.setFont(undefined, 'normal');

          if (row.label === 'Other Details:' || row.label === 'Other:' || row.label === 'Joint with _____:') {
            const labelField = new doc.AcroFormTextField();
            labelField.fieldName = `lawyer_shared_${rowIndex}_col1`;
            labelField.Rect = [lawyerCol1X + 0.3, lawyerTableY + 0.3, lawyerColWidths[0] - 0.6, lawyerCellHeight - 0.6];
            labelField.fontSize = 8;
            labelField.textColor = [0, 0, 0];
            labelField.borderStyle = 'none';
            labelField.value = row.label;
            doc.addField(labelField);
          } else {
            doc.text(row.label, lawyerCol1X + 0.5, lawyerTableY + 4);
          }

          const lawyerField1 = new doc.AcroFormTextField();
          lawyerField1.fieldName = `lawyer_shared_${rowIndex}_col2`;
          lawyerField1.Rect = [lawyerCol2X + 0.3, lawyerTableY + 0.3, lawyerColWidths[1] - 0.6, lawyerCellHeight - 0.6];
          lawyerField1.fontSize = 7;
          lawyerField1.textColor = [0, 0, 0];
          lawyerField1.borderStyle = 'none';
          if (row.label === 'Will Location:' && formData.client1WillLocation) {
            lawyerField1.value = formData.client1WillLocation;
          }
          doc.addField(lawyerField1);

          const lawyerField2 = new doc.AcroFormTextField();
          lawyerField2.fieldName = `lawyer_shared_${rowIndex}_col3`;
          lawyerField2.Rect = [lawyerCol3X + 0.3, lawyerTableY + 0.3, lawyerColWidths[2] - 0.6, lawyerCellHeight - 0.6];
          lawyerField2.fontSize = 7;
          lawyerField2.textColor = [0, 0, 0];
          lawyerField2.borderStyle = 'none';
          doc.addField(lawyerField2);
        }

        lawyerTableY += lawyerCellHeight;
      });

      yPosition = lawyerTableY + 10;
    } else if (bothHaveWills && !sameLawyer) {
      [client1Name, client2Name].forEach((clientName, clientIndex) => {
        if (yPosition > 230) {
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text(`Estate Lawyer / Notary - ${clientName}:`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 6;

        const lawyerRows = [
          { label: 'Estate Lawyer/Notary:', col2: 'Information:', col3: 'Other Details (If Applicable)' },
          { label: 'Name:' },
          { label: 'Firm:' },
          { label: 'City, Province:' },
          { label: 'Email Address:' },
          { label: 'Date of last Will update:' },
          { label: 'Will Location:' },
          { label: '' },
        ];

        const lawyerCellHeight = 6;
        const lawyerColWidths = [fieldWidth * 0.30, fieldWidth * 0.35, fieldWidth * 0.35];
        let lawyerTableY = yPosition;

        lawyerRows.forEach((row, rowIndex) => {
          if (lawyerTableY > 275) {
            doc.addPage();
            lawyerTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(8);

          const lawyerCol1X = margin;
          const lawyerCol2X = margin + lawyerColWidths[0];
          const lawyerCol3X = margin + lawyerColWidths[0] + lawyerColWidths[1];

          doc.rect(lawyerCol1X, lawyerTableY, lawyerColWidths[0], lawyerCellHeight);
          doc.rect(lawyerCol2X, lawyerTableY, lawyerColWidths[1], lawyerCellHeight);
          doc.rect(lawyerCol3X, lawyerTableY, lawyerColWidths[2], lawyerCellHeight);

          if (rowIndex === 0) {
            doc.text('Estate Lawyer/Notary:', lawyerCol1X + 0.5, lawyerTableY + 4);
            doc.text('Information:', lawyerCol2X + 0.5, lawyerTableY + 4);
            doc.text('Other Details (If Applicable):', lawyerCol3X + 0.5, lawyerTableY + 4);
          } else {
            doc.setFont(undefined, 'normal');

            if (row.label === 'Other Details:' || row.label === 'Other:' || row.label === 'Joint with _____:') {
              const labelField = new doc.AcroFormTextField();
              labelField.fieldName = `lawyer_client${clientIndex + 1}_${rowIndex}_col1`;
              labelField.Rect = [lawyerCol1X + 0.3, lawyerTableY + 0.3, lawyerColWidths[0] - 0.6, lawyerCellHeight - 0.6];
              labelField.fontSize = 8;
              labelField.textColor = [0, 0, 0];
              labelField.borderStyle = 'none';
              labelField.value = row.label;
              doc.addField(labelField);
            } else {
              doc.text(row.label, lawyerCol1X + 0.5, lawyerTableY + 4);
            }

            const lawyerField1 = new doc.AcroFormTextField();
            lawyerField1.fieldName = `lawyer_client${clientIndex + 1}_${rowIndex}_col2`;
            lawyerField1.Rect = [lawyerCol2X + 0.3, lawyerTableY + 0.3, lawyerColWidths[1] - 0.6, lawyerCellHeight - 0.6];
            lawyerField1.fontSize = 7;
            lawyerField1.textColor = [0, 0, 0];
            lawyerField1.borderStyle = 'none';
            if (row.label === 'Will Location:') {
              const willLocation = clientIndex === 0 ? formData.client1WillLocation : formData.client2WillLocation;
              if (willLocation) {
                lawyerField1.value = willLocation;
              }
            }
            doc.addField(lawyerField1);

            const lawyerField2 = new doc.AcroFormTextField();
            lawyerField2.fieldName = `lawyer_client${clientIndex + 1}_${rowIndex}_col3`;
            lawyerField2.Rect = [lawyerCol3X + 0.3, lawyerTableY + 0.3, lawyerColWidths[2] - 0.6, lawyerCellHeight - 0.6];
            lawyerField2.fontSize = 7;
            lawyerField2.textColor = [0, 0, 0];
            lawyerField2.borderStyle = 'none';
            doc.addField(lawyerField2);
          }

          lawyerTableY += lawyerCellHeight;
        });

        yPosition = lawyerTableY + 10;
      });
    } else {
      if (yPosition > 240) {
        doc.addPage();
        yPosition = 12;
      }

      const clientWithWill = formData.client1HasWill === 'yes' ? client1Name : client2Name;

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text(`Estate Lawyer / Notary - ${clientWithWill}:`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      const lawyerRows = [
        { label: 'Estate Lawyer/Notary:', col2: 'Information:', col3: 'Other Details (If Applicable)' },
        { label: 'Name:' },
        { label: 'Firm:' },
        { label: 'City, Province:' },
        { label: 'Email Address:' },
        { label: 'Date of last Will update:' },
        { label: 'Will Location:' },
        { label: '' },
      ];

      const lawyerCellHeight = 6;
      const lawyerColWidths = [fieldWidth * 0.30, fieldWidth * 0.35, fieldWidth * 0.35];
      let lawyerTableY = yPosition;

      lawyerRows.forEach((row, rowIndex) => {
        if (lawyerTableY > 275) {
          doc.addPage();
          lawyerTableY = 12;
        }

        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
        doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
        doc.setFontSize(8);

        const lawyerCol1X = margin;
        const lawyerCol2X = margin + lawyerColWidths[0];
        const lawyerCol3X = margin + lawyerColWidths[0] + lawyerColWidths[1];

        doc.rect(lawyerCol1X, lawyerTableY, lawyerColWidths[0], lawyerCellHeight);
        doc.rect(lawyerCol2X, lawyerTableY, lawyerColWidths[1], lawyerCellHeight);
        doc.rect(lawyerCol3X, lawyerTableY, lawyerColWidths[2], lawyerCellHeight);

        if (rowIndex === 0) {
          doc.text('Estate Lawyer/Notary:', lawyerCol1X + 0.5, lawyerTableY + 4);
          doc.text('Information:', lawyerCol2X + 0.5, lawyerTableY + 4);
          doc.text('Other Details (If Applicable):', lawyerCol3X + 0.5, lawyerTableY + 4);
        } else {
          doc.setFont(undefined, 'normal');
          doc.text(row.label, lawyerCol1X + 0.5, lawyerTableY + 4);

          const lawyerField1 = new doc.AcroFormTextField();
          lawyerField1.fieldName = `lawyer_single_${rowIndex}_col2`;
          lawyerField1.Rect = [lawyerCol2X + 0.3, lawyerTableY + 0.3, lawyerColWidths[1] - 0.6, lawyerCellHeight - 0.6];
          lawyerField1.fontSize = 7;
          lawyerField1.textColor = [0, 0, 0];
          lawyerField1.borderStyle = 'none';
          if (row.label === 'Will Location:') {
            const willLocation = formData.client1HasWill === 'yes' ? formData.client1WillLocation : formData.client2WillLocation;
            if (willLocation) {
              lawyerField1.value = willLocation;
            }
          }
          doc.addField(lawyerField1);

          const lawyerField2 = new doc.AcroFormTextField();
          lawyerField2.fieldName = `lawyer_single_${rowIndex}_col3`;
          lawyerField2.Rect = [lawyerCol3X + 0.3, lawyerTableY + 0.3, lawyerColWidths[2] - 0.6, lawyerCellHeight - 0.6];
          lawyerField2.fontSize = 7;
          lawyerField2.textColor = [0, 0, 0];
          lawyerField2.borderStyle = 'none';
          doc.addField(lawyerField2);
        }

        lawyerTableY += lawyerCellHeight;
      });

      yPosition = lawyerTableY + 10;
    }
  }

  if (formData.client1HasPoaPersonalCare === 'yes' && formData.client1PoaPersonalCareCount) {
    const poaCount = parseInt(formData.client1PoaPersonalCareCount, 10);

    if (yPosition > 210) {
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    if (formData.spousesPoaPersonalCare === 'yes') {
      const client1Name = formData.fullName || 'Client 1';
      const client2Name = formData.spouseName || 'Client 2';
      doc.text('Powers of Attorney for Personal Care:', margin, yPosition);
      yPosition += 6;
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.text(`${client1Name} and ${client2Name} indicated that they are each other's Powers of Attorney for Personal Care.`, margin, yPosition);
      yPosition += 6;
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('Their contingent POAs are:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 8;
    } else {
      doc.text('Powers of Attorney for Personal Care:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 8;
    }

    const poaCellHeight = 6;
    const poaColWidths = [fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25];
    let poaTableY = yPosition;

    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(200, 200, 200);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(8);

    const poaCol1X = margin;
    const poaCol2X = margin + poaColWidths[0];
    const poaCol3X = margin + poaColWidths[0] + poaColWidths[1];
    const poaCol4X = margin + poaColWidths[0] + poaColWidths[1] + poaColWidths[2];

    doc.rect(poaCol1X, poaTableY, poaColWidths[0], poaCellHeight);
    doc.rect(poaCol2X, poaTableY, poaColWidths[1], poaCellHeight);
    doc.rect(poaCol3X, poaTableY, poaColWidths[2], poaCellHeight);
    doc.rect(poaCol4X, poaTableY, poaColWidths[3], poaCellHeight);

    doc.text('Name:', poaCol1X + 0.5, poaTableY + 4);
    doc.text('Phone Number:', poaCol2X + 0.5, poaTableY + 4);
    doc.text('Email Address:', poaCol3X + 0.5, poaTableY + 4);
    doc.text('Relationship to You:', poaCol4X + 0.5, poaTableY + 4);

    poaTableY += poaCellHeight;

    for (let i = 0; i < poaCount; i++) {
      if (poaTableY > 275) {
        doc.addPage();
        poaTableY = 12;
      }

      const poaData = formData.client1PoaPersonalCareData?.[i];

      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'normal');

      doc.rect(poaCol1X, poaTableY, poaColWidths[0], poaCellHeight);
      doc.rect(poaCol2X, poaTableY, poaColWidths[1], poaCellHeight);
      doc.rect(poaCol3X, poaTableY, poaColWidths[2], poaCellHeight);
      doc.rect(poaCol4X, poaTableY, poaColWidths[3], poaCellHeight);

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

      poaTableY += poaCellHeight;
    }

    yPosition = poaTableY + 10;

    if (formData.client1HasLivingWill === 'yes') {
      if (yPosition > 260) {
        doc.addPage();
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
  }

  if (formData.client2HasPoaPersonalCare === 'yes' && formData.client2PoaPersonalCareCount) {
    const poaCount = parseInt(formData.client2PoaPersonalCareCount, 10);

    if (yPosition > 210) {
      doc.addPage();
      yPosition = 12;
    }

    const client2Name = formData.spouseName || 'Client 2';

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    if (formData.spousesPoaPersonalCare === 'yes') {
      const client1Name = formData.fullName || 'Client 1';
      doc.text(`${client2Name}'s Contingent Powers of Attorney for Personal Care:`, margin, yPosition);
      yPosition += 6;
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.text(`(Note: ${client1Name} and ${client2Name} are each other's primary POA for Personal Care)`, margin, yPosition);
      yPosition += 6;
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text(`${client2Name}'s contingent POAs are:`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 8;
    } else {
      doc.text(`${client2Name}'s Powers of Attorney for Personal Care:`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 8;
    }

    const poaCellHeight = 6;
    const poaColWidths = [fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25];
    let poaTableY = yPosition;

    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(200, 200, 200);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(8);

    const poaCol1X = margin;
    const poaCol2X = margin + poaColWidths[0];
    const poaCol3X = margin + poaColWidths[0] + poaColWidths[1];
    const poaCol4X = margin + poaColWidths[0] + poaColWidths[1] + poaColWidths[2];

    doc.rect(poaCol1X, poaTableY, poaColWidths[0], poaCellHeight);
    doc.rect(poaCol2X, poaTableY, poaColWidths[1], poaCellHeight);
    doc.rect(poaCol3X, poaTableY, poaColWidths[2], poaCellHeight);
    doc.rect(poaCol4X, poaTableY, poaColWidths[3], poaCellHeight);

    doc.text('Name:', poaCol1X + 0.5, poaTableY + 4);
    doc.text('Phone Number:', poaCol2X + 0.5, poaTableY + 4);
    doc.text('Email Address:', poaCol3X + 0.5, poaTableY + 4);
    doc.text('Relationship to You:', poaCol4X + 0.5, poaTableY + 4);

    poaTableY += poaCellHeight;

    for (let i = 0; i < poaCount; i++) {
      if (poaTableY > 275) {
        doc.addPage();
        poaTableY = 12;
      }

      const poaData = formData.client2PoaPersonalCareData?.[i];

      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'normal');

      doc.rect(poaCol1X, poaTableY, poaColWidths[0], poaCellHeight);
      doc.rect(poaCol2X, poaTableY, poaColWidths[1], poaCellHeight);
      doc.rect(poaCol3X, poaTableY, poaColWidths[2], poaCellHeight);
      doc.rect(poaCol4X, poaTableY, poaColWidths[3], poaCellHeight);

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
    }

    yPosition = poaTableY + 10;

    if (formData.client2PoaPersonalCareHasDocCopy === 'yes') {
      if (yPosition > 260) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      const docCopyText = `${client2Name} indicated that the Power(s) of Attorney for Personal Care have a copy of the most recent documentation in their files.`;
      const docCopyLines = doc.splitTextToSize(docCopyText, fieldWidth);
      doc.text(docCopyLines, margin, yPosition);
      yPosition += docCopyLines.length * 5 + 5;
    }

    if (formData.client2HasLivingWill === 'yes') {
      if (yPosition > 260) {
        doc.addPage();
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
      doc.addPage();
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
        doc.addPage();
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
      doc.addPage();
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
        doc.addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 2
    doc.setFont(undefined, 'bold');
    if (yPosition > 270) {
      doc.addPage();
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
        doc.addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 3
    doc.setFont(undefined, 'bold');
    if (yPosition > 270) {
      doc.addPage();
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
        doc.addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 4
    doc.setFont(undefined, 'bold');
    if (yPosition > 270) {
      doc.addPage();
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
        doc.addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 12;
  }

  if (formData.client1HasPoaProperty === 'yes' && formData.client1PoaPropertyCount) {
    const poaPropertyCount = parseInt(formData.client1PoaPropertyCount, 10);

    if (yPosition > 210) {
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    if (formData.spousesPoaProperty === 'yes') {
      const client1Name = formData.fullName || 'Client 1';
      const client2Name = formData.spouseName || 'Client 2';
      doc.text('Powers of Attorney for Property:', margin, yPosition);
      yPosition += 6;
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.text(`${client1Name} and ${client2Name} indicated that they are each other's Powers of Attorney for Property.`, margin, yPosition);
      yPosition += 6;
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('Their contingent POAs are:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 8;
    } else {
      doc.text('Powers of Attorney for Property:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 8;
    }

    const poaPropertyCellHeight = 6;
    const poaPropertyColWidths = [fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25];
    let poaPropertyTableY = yPosition;

    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(200, 200, 200);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(8);

    const poaPropertyCol1X = margin;
    const poaPropertyCol2X = margin + poaPropertyColWidths[0];
    const poaPropertyCol3X = margin + poaPropertyColWidths[0] + poaPropertyColWidths[1];
    const poaPropertyCol4X = margin + poaPropertyColWidths[0] + poaPropertyColWidths[1] + poaPropertyColWidths[2];

    doc.rect(poaPropertyCol1X, poaPropertyTableY, poaPropertyColWidths[0], poaPropertyCellHeight);
    doc.rect(poaPropertyCol2X, poaPropertyTableY, poaPropertyColWidths[1], poaPropertyCellHeight);
    doc.rect(poaPropertyCol3X, poaPropertyTableY, poaPropertyColWidths[2], poaPropertyCellHeight);
    doc.rect(poaPropertyCol4X, poaPropertyTableY, poaPropertyColWidths[3], poaPropertyCellHeight);

    doc.text('Name:', poaPropertyCol1X + 0.5, poaPropertyTableY + 4);
    doc.text('Phone Number:', poaPropertyCol2X + 0.5, poaPropertyTableY + 4);
    doc.text('Email Address:', poaPropertyCol3X + 0.5, poaPropertyTableY + 4);
    doc.text('Relationship to You:', poaPropertyCol4X + 0.5, poaPropertyTableY + 4);

    poaPropertyTableY += poaPropertyCellHeight;

    for (let i = 0; i < poaPropertyCount; i++) {
      if (poaPropertyTableY > 275) {
        doc.addPage();
        poaPropertyTableY = 12;
      }

      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'normal');

      doc.rect(poaPropertyCol1X, poaPropertyTableY, poaPropertyColWidths[0], poaPropertyCellHeight);
      doc.rect(poaPropertyCol2X, poaPropertyTableY, poaPropertyColWidths[1], poaPropertyCellHeight);
      doc.rect(poaPropertyCol3X, poaPropertyTableY, poaPropertyColWidths[2], poaPropertyCellHeight);
      doc.rect(poaPropertyCol4X, poaPropertyTableY, poaPropertyColWidths[3], poaPropertyCellHeight);

      const field1 = new doc.AcroFormTextField();
      field1.fieldName = `poa_property_${i}_name`;
      field1.Rect = [poaPropertyCol1X + 0.3, poaPropertyTableY + 0.3, poaPropertyColWidths[0] - 0.6, poaPropertyCellHeight - 0.6];
      field1.fontSize = 7;
      field1.textColor = [0, 0, 0];
      field1.borderStyle = 'none';
      doc.addField(field1);

      const field2 = new doc.AcroFormTextField();
      field2.fieldName = `poa_property_${i}_phone`;
      field2.Rect = [poaPropertyCol2X + 0.3, poaPropertyTableY + 0.3, poaPropertyColWidths[1] - 0.6, poaPropertyCellHeight - 0.6];
      field2.fontSize = 7;
      field2.textColor = [0, 0, 0];
      field2.borderStyle = 'none';
      doc.addField(field2);

      const field3 = new doc.AcroFormTextField();
      field3.fieldName = `poa_property_${i}_email`;
      field3.Rect = [poaPropertyCol3X + 0.3, poaPropertyTableY + 0.3, poaPropertyColWidths[2] - 0.6, poaPropertyCellHeight - 0.6];
      field3.fontSize = 7;
      field3.textColor = [0, 0, 0];
      field3.borderStyle = 'none';
      doc.addField(field3);

      const field4 = new doc.AcroFormTextField();
      field4.fieldName = `poa_property_${i}_relationship`;
      field4.Rect = [poaPropertyCol4X + 0.3, poaPropertyTableY + 0.3, poaPropertyColWidths[3] - 0.6, poaPropertyCellHeight - 0.6];
      field4.fontSize = 7;
      field4.textColor = [0, 0, 0];
      field4.borderStyle = 'none';
      doc.addField(field4);

      poaPropertyTableY += poaPropertyCellHeight;
    }

    yPosition = poaPropertyTableY + 10;

    if (formData.client1PoaPropertyHasDocCopy === 'yes') {
      if (yPosition > 260) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      const clientName = formData.fullName || 'The client';
      const docCopyText = `${clientName} indicated that the Power(s) of Attorney for Property have a copy of the most recent documentation in their files.`;
      const docCopyLines = doc.splitTextToSize(docCopyText, fieldWidth);
      doc.text(docCopyLines, margin, yPosition);
      yPosition += docCopyLines.length * 5 + 5;
    }
  }

  if (formData.client2HasPoaProperty === 'yes' && formData.client2PoaPropertyCount) {
    const poaPropertyCount = parseInt(formData.client2PoaPropertyCount, 10);

    if (yPosition > 210) {
      doc.addPage();
      yPosition = 12;
    }

    const client2Name = formData.spouseName || 'Client 2';

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    if (formData.spousesPoaProperty === 'yes') {
      const client1Name = formData.fullName || 'Client 1';
      doc.text(`${client2Name}'s Contingent Powers of Attorney for Property:`, margin, yPosition);
      yPosition += 6;
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.text(`(Note: ${client1Name} and ${client2Name} are each other's primary POA for Property)`, margin, yPosition);
      yPosition += 6;
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text(`${client2Name}'s contingent POAs are:`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 8;
    } else {
      doc.text(`${client2Name}'s Powers of Attorney for Property:`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 8;
    }

    const poaPropertyCellHeight = 6;
    const poaPropertyColWidths = [fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25];
    let poaPropertyTableY = yPosition;

    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(200, 200, 200);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(8);

    const poaPropertyCol1X = margin;
    const poaPropertyCol2X = margin + poaPropertyColWidths[0];
    const poaPropertyCol3X = margin + poaPropertyColWidths[0] + poaPropertyColWidths[1];
    const poaPropertyCol4X = margin + poaPropertyColWidths[0] + poaPropertyColWidths[1] + poaPropertyColWidths[2];

    doc.rect(poaPropertyCol1X, poaPropertyTableY, poaPropertyColWidths[0], poaPropertyCellHeight);
    doc.rect(poaPropertyCol2X, poaPropertyTableY, poaPropertyColWidths[1], poaPropertyCellHeight);
    doc.rect(poaPropertyCol3X, poaPropertyTableY, poaPropertyColWidths[2], poaPropertyCellHeight);
    doc.rect(poaPropertyCol4X, poaPropertyTableY, poaPropertyColWidths[3], poaPropertyCellHeight);

    doc.text('Name:', poaPropertyCol1X + 0.5, poaPropertyTableY + 4);
    doc.text('Phone Number:', poaPropertyCol2X + 0.5, poaPropertyTableY + 4);
    doc.text('Email Address:', poaPropertyCol3X + 0.5, poaPropertyTableY + 4);
    doc.text('Relationship to You:', poaPropertyCol4X + 0.5, poaPropertyTableY + 4);

    poaPropertyTableY += poaPropertyCellHeight;

    for (let i = 0; i < poaPropertyCount; i++) {
      if (poaPropertyTableY > 275) {
        doc.addPage();
        poaPropertyTableY = 12;
      }

      const poaData = formData.client2PoaPropertyData?.[i];

      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'normal');

      doc.rect(poaPropertyCol1X, poaPropertyTableY, poaPropertyColWidths[0], poaPropertyCellHeight);
      doc.rect(poaPropertyCol2X, poaPropertyTableY, poaPropertyColWidths[1], poaPropertyCellHeight);
      doc.rect(poaPropertyCol3X, poaPropertyTableY, poaPropertyColWidths[2], poaPropertyCellHeight);
      doc.rect(poaPropertyCol4X, poaPropertyTableY, poaPropertyColWidths[3], poaPropertyCellHeight);

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
    }

    yPosition = poaPropertyTableY + 10;

    if (formData.client2PoaPropertyHasDocCopy === 'yes') {
      if (yPosition > 260) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      const docCopyText = `${client2Name} indicated that the Power(s) of Attorney for Property have a copy of the most recent documentation in their files.`;
      const docCopyLines = doc.splitTextToSize(docCopyText, fieldWidth);
      doc.text(docCopyLines, margin, yPosition);
      yPosition += docCopyLines.length * 5 + 5;
    }
  }

  // Additional Reading for Powers of Attorney for Property
  if (formData.client1HasWill === 'yes') {
    if (yPosition > 150) {
      doc.addPage();
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
        doc.addPage();
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
      doc.addPage();
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
        doc.addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 2: Responsibilities and Fiduciary Duties
    doc.setFont(undefined, 'bold');
    if (yPosition > 270) {
      doc.addPage();
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
        doc.addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 3: Revocation and Termination
    doc.setFont(undefined, 'bold');
    if (yPosition > 270) {
      doc.addPage();
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
        doc.addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 4: Best Practices for an Effective POA
    doc.setFont(undefined, 'bold');
    if (yPosition > 270) {
      doc.addPage();
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
        doc.addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 12;
  }

  if (formData.client1HasEstateTrustee === 'yes' && formData.client1EstateTrusteeCount) {
    const estateTrusteeCount = parseInt(formData.client1EstateTrusteeCount, 10);

    if (yPosition > 210) {
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Estate Trustees:', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 8;

    const etCellHeight = 6;
    const etColWidths = [fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25];
    let etTableY = yPosition;

    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(200, 200, 200);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(8);

    const etCol1X = margin;
    const etCol2X = margin + etColWidths[0];
    const etCol3X = margin + etColWidths[0] + etColWidths[1];
    const etCol4X = margin + etColWidths[0] + etColWidths[1] + etColWidths[2];

    doc.rect(etCol1X, etTableY, etColWidths[0], etCellHeight);
    doc.rect(etCol2X, etTableY, etColWidths[1], etCellHeight);
    doc.rect(etCol3X, etTableY, etColWidths[2], etCellHeight);
    doc.rect(etCol4X, etTableY, etColWidths[3], etCellHeight);

    doc.text('Name:', etCol1X + 0.5, etTableY + 4);
    doc.text('Phone Number:', etCol2X + 0.5, etTableY + 4);
    doc.text('Email Address:', etCol3X + 0.5, etTableY + 4);
    doc.text('Relationship to You:', etCol4X + 0.5, etTableY + 4);

    etTableY += etCellHeight;

    for (let i = 0; i < estateTrusteeCount; i++) {
      if (etTableY > 275) {
        doc.addPage();
        etTableY = 12;
      }

      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'normal');

      doc.rect(etCol1X, etTableY, etColWidths[0], etCellHeight);
      doc.rect(etCol2X, etTableY, etColWidths[1], etCellHeight);
      doc.rect(etCol3X, etTableY, etColWidths[2], etCellHeight);
      doc.rect(etCol4X, etTableY, etColWidths[3], etCellHeight);

      const field1 = new doc.AcroFormTextField();
      field1.fieldName = `estate_trustee_${i}_name`;
      field1.Rect = [etCol1X + 0.3, etTableY + 0.3, etColWidths[0] - 0.6, etCellHeight - 0.6];
      field1.fontSize = 7;
      field1.textColor = [0, 0, 0];
      field1.borderStyle = 'none';
      doc.addField(field1);

      const field2 = new doc.AcroFormTextField();
      field2.fieldName = `estate_trustee_${i}_phone`;
      field2.Rect = [etCol2X + 0.3, etTableY + 0.3, etColWidths[1] - 0.6, etCellHeight - 0.6];
      field2.fontSize = 7;
      field2.textColor = [0, 0, 0];
      field2.borderStyle = 'none';
      doc.addField(field2);

      const field3 = new doc.AcroFormTextField();
      field3.fieldName = `estate_trustee_${i}_email`;
      field3.Rect = [etCol3X + 0.3, etTableY + 0.3, etColWidths[2] - 0.6, etCellHeight - 0.6];
      field3.fontSize = 7;
      field3.textColor = [0, 0, 0];
      field3.borderStyle = 'none';
      doc.addField(field3);

      const field4 = new doc.AcroFormTextField();
      field4.fieldName = `estate_trustee_${i}_relationship`;
      field4.Rect = [etCol4X + 0.3, etTableY + 0.3, etColWidths[3] - 0.6, etCellHeight - 0.6];
      field4.fontSize = 7;
      field4.textColor = [0, 0, 0];
      field4.borderStyle = 'none';
      doc.addField(field4);

      etTableY += etCellHeight;
    }

    yPosition = etTableY + 10;

    const clientName = formData.fullName || 'The client';

    if (formData.client1EstateTrusteeHasWillCopy === 'yes') {
      if (yPosition > 260) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      const willCopyText = `${clientName} indicated that their chosen Estate Trustee(s) have a copy of their Will on file.`;
      const willCopyLines = doc.splitTextToSize(willCopyText, fieldWidth);
      doc.text(willCopyLines, margin, yPosition);
      yPosition += willCopyLines.length * 5 + 5;
    } else if (formData.client1EstateTrusteeKnowsWillLocation === 'yes') {
      if (yPosition > 260) {
        doc.addPage();
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
        doc.addPage();
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

    if (yPosition > 210) {
      doc.addPage();
      yPosition = 12;
    }

    const client2Name = formData.spouseName || 'Client 2';

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text(`${client2Name}'s Estate Trustees:`, margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 8;

    const etCellHeight = 6;
    const etColWidths = [fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25];
    let etTableY = yPosition;

    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(200, 200, 200);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(8);

    const etCol1X = margin;
    const etCol2X = margin + etColWidths[0];
    const etCol3X = margin + etColWidths[0] + etColWidths[1];
    const etCol4X = margin + etColWidths[0] + etColWidths[1] + etColWidths[2];

    doc.rect(etCol1X, etTableY, etColWidths[0], etCellHeight);
    doc.rect(etCol2X, etTableY, etColWidths[1], etCellHeight);
    doc.rect(etCol3X, etTableY, etColWidths[2], etCellHeight);
    doc.rect(etCol4X, etTableY, etColWidths[3], etCellHeight);

    doc.text('Name:', etCol1X + 0.5, etTableY + 4);
    doc.text('Phone Number:', etCol2X + 0.5, etTableY + 4);
    doc.text('Email Address:', etCol3X + 0.5, etTableY + 4);
    doc.text('Relationship to You:', etCol4X + 0.5, etTableY + 4);

    etTableY += etCellHeight;

    for (let i = 0; i < etCount; i++) {
      if (etTableY > 275) {
        doc.addPage();
        etTableY = 12;
      }

      const etData = formData.client2EstateTrusteeData?.[i];

      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'normal');

      doc.rect(etCol1X, etTableY, etColWidths[0], etCellHeight);
      doc.rect(etCol2X, etTableY, etColWidths[1], etCellHeight);
      doc.rect(etCol3X, etTableY, etColWidths[2], etCellHeight);
      doc.rect(etCol4X, etTableY, etColWidths[3], etCellHeight);

      const field1 = new doc.AcroFormTextField();
      field1.fieldName = `estate_trustee_client2_${i}_name`;
      field1.Rect = [etCol1X + 0.3, etTableY + 0.3, etColWidths[0] - 0.6, etCellHeight - 0.6];
      field1.fontSize = 7;
      field1.textColor = [0, 0, 0];
      field1.borderStyle = 'none';
      field1.value = etData?.name || '';
      doc.addField(field1);

      const field2 = new doc.AcroFormTextField();
      field2.fieldName = `estate_trustee_client2_${i}_phone`;
      field2.Rect = [etCol2X + 0.3, etTableY + 0.3, etColWidths[1] - 0.6, etCellHeight - 0.6];
      field2.fontSize = 7;
      field2.textColor = [0, 0, 0];
      field2.borderStyle = 'none';
      field2.value = etData?.phone || '';
      doc.addField(field2);

      const field3 = new doc.AcroFormTextField();
      field3.fieldName = `estate_trustee_client2_${i}_email`;
      field3.Rect = [etCol3X + 0.3, etTableY + 0.3, etColWidths[2] - 0.6, etCellHeight - 0.6];
      field3.fontSize = 7;
      field3.textColor = [0, 0, 0];
      field3.borderStyle = 'none';
      field3.value = etData?.email || '';
      doc.addField(field3);

      const field4 = new doc.AcroFormTextField();
      field4.fieldName = `estate_trustee_client2_${i}_relationship`;
      field4.Rect = [etCol4X + 0.3, etTableY + 0.3, etColWidths[3] - 0.6, etCellHeight - 0.6];
      field4.fontSize = 7;
      field4.textColor = [0, 0, 0];
      field4.borderStyle = 'none';
      field4.value = etData?.relationship || '';
      doc.addField(field4);

      etTableY += etCellHeight;
    }

    yPosition = etTableY + 10;

    if (formData.client2EstateTrusteeHasWillCopy === 'yes') {
      if (yPosition > 260) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      const docCopyText = `${client2Name} indicated that the Estate Trustees have a copy of the most recent Will in their files.`;
      const docCopyLines = doc.splitTextToSize(docCopyText, fieldWidth);
      doc.text(docCopyLines, margin, yPosition);
      yPosition += docCopyLines.length * 5 + 5;
    }

    if (formData.client2EstateTrusteeKnowsWillLocation === 'yes') {
      if (yPosition > 240) {
        doc.addPage();
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
        doc.addPage();
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
      doc.addPage();
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
        doc.addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 1: Preliminary Duties and Probate
    doc.setFont(undefined, 'bold');
    if (yPosition > 270) {
      doc.addPage();
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
        doc.addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 2: Safeguarding and Valuing Assets
    doc.setFont(undefined, 'bold');
    if (yPosition > 270) {
      doc.addPage();
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
        doc.addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 3: Tax and Legal Obligations
    doc.setFont(undefined, 'bold');
    if (yPosition > 270) {
      doc.addPage();
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
        doc.addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 4: Distribution and Final Accounting
    doc.setFont(undefined, 'bold');
    if (yPosition > 270) {
      doc.addPage();
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
        doc.addPage();
        yPosition = 12;
      }
      doc.text(line, margin, yPosition);
      yPosition += 4.5;
    });

    yPosition += 2;

    // Section 5: Compensation
    doc.setFont(undefined, 'bold');
    if (yPosition > 270) {
      doc.addPage();
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
        doc.addPage();
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
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Funeral and Cemetery Arrangements:', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 8;

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
        doc.addPage();
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
          doc.addPage();
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
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('Accountant/Tax Professional:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 4;
      doc.setFontSize(8);
      doc.text(`${client1Name} and ${client2Name} use the same accountant:`, margin, yPosition);
      yPosition += 4;
      doc.text('Location of tax returns for the last 3-5 years and financial statements.', margin, yPosition);
      yPosition += 6;

      const accountantRows = [
        { label: 'Name:', col2: 'Information:', col3: 'Other Details:' },
        { label: 'Name:' },
        { label: 'Firm:' },
        { label: 'Phone Number:' },
        { label: 'Email Address:' },
        { label: 'City, Province:' },
        { label: 'What Year did you begin working with this person?' },
        { label: 'Other Details:' },
        { label: 'Other Details:' },
        { label: 'Other Details:' },
      ];

      const accountantCellHeight = 6;
      const accountantColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
      let accountantTableY = yPosition;

      accountantRows.forEach((row, rowIndex) => {
        if (accountantTableY > 275) {
          doc.addPage();
          accountantTableY = 12;
        }

        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
        doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
        doc.setFontSize(8);

        const accountantCol1X = margin;
        const accountantCol2X = margin + accountantColWidths[0];
        const accountantCol3X = margin + accountantColWidths[0] + accountantColWidths[1];

        doc.rect(accountantCol1X, accountantTableY, accountantColWidths[0], accountantCellHeight);
        doc.rect(accountantCol2X, accountantTableY, accountantColWidths[1], accountantCellHeight);
        doc.rect(accountantCol3X, accountantTableY, accountantColWidths[2], accountantCellHeight);

        if (rowIndex === 0) {
          doc.text('Name:', accountantCol1X + 0.5, accountantTableY + 4);
          doc.text('Information:', accountantCol2X + 0.5, accountantTableY + 4);
          doc.text('Other Details:', accountantCol3X + 0.5, accountantTableY + 4);
        } else {
          doc.setFont(undefined, 'normal');

          if (row.label === 'Other Details:' || row.label === 'Other:' || row.label === 'Joint with _____:') {
            const labelField = new doc.AcroFormTextField();
            labelField.fieldName = `accountant_shared_${rowIndex}_col1`;
            labelField.Rect = [accountantCol1X + 0.3, accountantTableY + 0.3, accountantColWidths[0] - 0.6, accountantCellHeight - 0.6];
            labelField.fontSize = 8;
            labelField.textColor = [0, 0, 0];
            labelField.borderStyle = 'none';
            labelField.value = row.label;
            doc.addField(labelField);
          } else {
            doc.text(row.label, accountantCol1X + 0.5, accountantTableY + 4);
          }

          const accountantField1 = new doc.AcroFormTextField();
          accountantField1.fieldName = `accountant_shared_${rowIndex}_col2`;
          accountantField1.Rect = [accountantCol2X + 0.3, accountantTableY + 0.3, accountantColWidths[1] - 0.6, accountantCellHeight - 0.6];
          accountantField1.fontSize = 7;
          accountantField1.textColor = [0, 0, 0];
          accountantField1.borderStyle = 'none';
          doc.addField(accountantField1);

          const accountantField2 = new doc.AcroFormTextField();
          accountantField2.fieldName = `accountant_shared_${rowIndex}_col3`;
          accountantField2.Rect = [accountantCol3X + 0.3, accountantTableY + 0.3, accountantColWidths[2] - 0.6, accountantCellHeight - 0.6];
          accountantField2.fontSize = 7;
          accountantField2.textColor = [0, 0, 0];
          accountantField2.borderStyle = 'none';
          doc.addField(accountantField2);
        }

        accountantTableY += accountantCellHeight;
      });

      yPosition = accountantTableY + 10;
    } else if (bothUseAccountant && !sameAccountant) {
      if (yPosition > 210) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('Accountant/Tax Professional:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 4;
      doc.setFontSize(8);
      doc.text(`${client1Name} and ${client2Name} use separate accountants.`, margin, yPosition);
      yPosition += 6;

      [client1Name, client2Name].forEach((clientName, clientIndex) => {
        if (yPosition > 200) {
          doc.addPage();
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

        const accountantRows = [
          { label: 'Name:', col2: 'Information:', col3: 'Other Details:' },
          { label: 'Name:' },
          { label: 'Firm:' },
          { label: 'Phone Number:' },
          { label: 'Email Address:' },
          { label: 'City, Province:' },
          { label: 'What Year did you begin working with this person?' },
          { label: 'Other Details:' },
          { label: 'Other Details:' },
          { label: 'Other Details:' },
        ];

        const accountantCellHeight = 6;
        const accountantColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
        let accountantTableY = yPosition;

        accountantRows.forEach((row, rowIndex) => {
          if (accountantTableY > 275) {
            doc.addPage();
            accountantTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(8);

          const accountantCol1X = margin;
          const accountantCol2X = margin + accountantColWidths[0];
          const accountantCol3X = margin + accountantColWidths[0] + accountantColWidths[1];

          doc.rect(accountantCol1X, accountantTableY, accountantColWidths[0], accountantCellHeight);
          doc.rect(accountantCol2X, accountantTableY, accountantColWidths[1], accountantCellHeight);
          doc.rect(accountantCol3X, accountantTableY, accountantColWidths[2], accountantCellHeight);

          if (rowIndex === 0) {
            doc.text('Name:', accountantCol1X + 0.5, accountantTableY + 4);
            doc.text('Information:', accountantCol2X + 0.5, accountantTableY + 4);
            doc.text('Other Details:', accountantCol3X + 0.5, accountantTableY + 4);
          } else {
            doc.setFont(undefined, 'normal');

            if (row.label === 'Other Details:' || row.label === 'Other:' || row.label === 'Joint with _____:') {
              const labelField = new doc.AcroFormTextField();
              labelField.fieldName = `accountant_client${clientIndex + 1}_${rowIndex}_col1`;
              labelField.Rect = [accountantCol1X + 0.3, accountantTableY + 0.3, accountantColWidths[0] - 0.6, accountantCellHeight - 0.6];
              labelField.fontSize = 8;
              labelField.textColor = [0, 0, 0];
              labelField.borderStyle = 'none';
              labelField.value = row.label;
              doc.addField(labelField);
            } else {
              doc.text(row.label, accountantCol1X + 0.5, accountantTableY + 4);
            }

            const accountantField1 = new doc.AcroFormTextField();
            accountantField1.fieldName = `accountant_client${clientIndex + 1}_${rowIndex}_col2`;
            accountantField1.Rect = [accountantCol2X + 0.3, accountantTableY + 0.3, accountantColWidths[1] - 0.6, accountantCellHeight - 0.6];
            accountantField1.fontSize = 7;
            accountantField1.textColor = [0, 0, 0];
            accountantField1.borderStyle = 'none';
            doc.addField(accountantField1);

            const accountantField2 = new doc.AcroFormTextField();
            accountantField2.fieldName = `accountant_client${clientIndex + 1}_${rowIndex}_col3`;
            accountantField2.Rect = [accountantCol3X + 0.3, accountantTableY + 0.3, accountantColWidths[2] - 0.6, accountantCellHeight - 0.6];
            accountantField2.fontSize = 7;
            accountantField2.textColor = [0, 0, 0];
            accountantField2.borderStyle = 'none';
            doc.addField(accountantField2);
          }

          accountantTableY += accountantCellHeight;
        });

        yPosition = accountantTableY + 10;
      });
    } else {
      if (yPosition > 210) {
        doc.addPage();
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

        const accountantRows = [
          { label: 'Name:', col2: 'Information:', col3: 'Other Details:' },
          { label: 'Name:' },
          { label: 'Firm:' },
          { label: 'Phone Number:' },
          { label: 'Email Address:' },
          { label: 'City, Province:' },
          { label: 'What Year did you begin working with this person?' },
          { label: 'Other Details:' },
          { label: 'Other Details:' },
          { label: 'Other Details:' },
        ];

        const accountantCellHeight = 6;
        const accountantColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
        let accountantTableY = yPosition;

        accountantRows.forEach((row, rowIndex) => {
          if (accountantTableY > 275) {
            doc.addPage();
            accountantTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(8);

          const accountantCol1X = margin;
          const accountantCol2X = margin + accountantColWidths[0];
          const accountantCol3X = margin + accountantColWidths[0] + accountantColWidths[1];

          doc.rect(accountantCol1X, accountantTableY, accountantColWidths[0], accountantCellHeight);
          doc.rect(accountantCol2X, accountantTableY, accountantColWidths[1], accountantCellHeight);
          doc.rect(accountantCol3X, accountantTableY, accountantColWidths[2], accountantCellHeight);

          if (rowIndex === 0) {
            doc.text('Name:', accountantCol1X + 0.5, accountantTableY + 4);
            doc.text('Information:', accountantCol2X + 0.5, accountantTableY + 4);
            doc.text('Other Details:', accountantCol3X + 0.5, accountantTableY + 4);
          } else {
            doc.setFont(undefined, 'normal');
            doc.text(row.label, accountantCol1X + 0.5, accountantTableY + 4);

            const accountantField1 = new doc.AcroFormTextField();
            accountantField1.fieldName = `accountant_client1_${rowIndex}_col2`;
            accountantField1.Rect = [accountantCol2X + 0.3, accountantTableY + 0.3, accountantColWidths[1] - 0.6, accountantCellHeight - 0.6];
            accountantField1.fontSize = 7;
            accountantField1.textColor = [0, 0, 0];
            accountantField1.borderStyle = 'none';
            doc.addField(accountantField1);

            const accountantField2 = new doc.AcroFormTextField();
            accountantField2.fieldName = `accountant_client1_${rowIndex}_col3`;
            accountantField2.Rect = [accountantCol3X + 0.3, accountantTableY + 0.3, accountantColWidths[2] - 0.6, accountantCellHeight - 0.6];
            accountantField2.fontSize = 7;
            accountantField2.textColor = [0, 0, 0];
            accountantField2.borderStyle = 'none';
            doc.addField(accountantField2);
          }

          accountantTableY += accountantCellHeight;
        });

        yPosition = accountantTableY + 10;
      }

      if (formData.client2UsesAccountant === 'yes') {
        if (yPosition > 200) {
          doc.addPage();
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

        const accountantRows = [
          { label: 'Name:', col2: 'Information:', col3: 'Other Details:' },
          { label: 'Name:' },
          { label: 'Firm:' },
          { label: 'Phone Number:' },
          { label: 'Email Address:' },
          { label: 'City, Province:' },
          { label: 'What Year did you begin working with this person?' },
          { label: 'Other Details:' },
          { label: 'Other Details:' },
          { label: 'Other Details:' },
        ];

        const accountantCellHeight = 6;
        const accountantColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
        let accountantTableY = yPosition;

        accountantRows.forEach((row, rowIndex) => {
          if (accountantTableY > 275) {
            doc.addPage();
            accountantTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(8);

          const accountantCol1X = margin;
          const accountantCol2X = margin + accountantColWidths[0];
          const accountantCol3X = margin + accountantColWidths[0] + accountantColWidths[1];

          doc.rect(accountantCol1X, accountantTableY, accountantColWidths[0], accountantCellHeight);
          doc.rect(accountantCol2X, accountantTableY, accountantColWidths[1], accountantCellHeight);
          doc.rect(accountantCol3X, accountantTableY, accountantColWidths[2], accountantCellHeight);

          if (rowIndex === 0) {
            doc.text('Name:', accountantCol1X + 0.5, accountantTableY + 4);
            doc.text('Information:', accountantCol2X + 0.5, accountantTableY + 4);
            doc.text('Other Details:', accountantCol3X + 0.5, accountantTableY + 4);
          } else {
            doc.setFont(undefined, 'normal');
            doc.text(row.label, accountantCol1X + 0.5, accountantTableY + 4);

            const accountantField1 = new doc.AcroFormTextField();
            accountantField1.fieldName = `accountant_client2_${rowIndex}_col2`;
            accountantField1.Rect = [accountantCol2X + 0.3, accountantTableY + 0.3, accountantColWidths[1] - 0.6, accountantCellHeight - 0.6];
            accountantField1.fontSize = 7;
            accountantField1.textColor = [0, 0, 0];
            accountantField1.borderStyle = 'none';
            doc.addField(accountantField1);

            const accountantField2 = new doc.AcroFormTextField();
            accountantField2.fieldName = `accountant_client2_${rowIndex}_col3`;
            accountantField2.Rect = [accountantCol3X + 0.3, accountantTableY + 0.3, accountantColWidths[2] - 0.6, accountantCellHeight - 0.6];
            accountantField2.fontSize = 7;
            accountantField2.textColor = [0, 0, 0];
            accountantField2.borderStyle = 'none';
            doc.addField(accountantField2);
          }

          accountantTableY += accountantCellHeight;
        });

        yPosition = accountantTableY + 10;
      }
    }

    if (formData.client1UsesAccountant === 'no' && formData.client1AccountingRecordsLocation) {
      if (yPosition > 260) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(8);
      doc.setFont(undefined, 'normal');
      doc.text(`${client1Name} indicated that they do their accounting on their own, and the location of their past records are: ${formData.client1AccountingRecordsLocation}`, margin, yPosition, { maxWidth: fieldWidth });
      yPosition += 10;
    }

    if (formData.client2UsesAccountant === 'no' && formData.client2AccountingRecordsLocation) {
      if (yPosition > 260) {
        doc.addPage();
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

  if (client1AdvisorCount > 0) {
    for (let advisorIndex = 0; advisorIndex < client1AdvisorCount; advisorIndex++) {
      if (yPosition > 190) {
        doc.addPage();
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

      const advisorRows = [
        { label: 'Name:', col2: 'Information:', col3: 'Other Details:' },
        { label: 'Firm Name:' },
        { label: 'Key Contact:' },
        { label: 'Phone Number:' },
        { label: 'Email Address:' },
        { label: 'City, Province:' },
        { label: 'What Year did you begin working with this person?' },
        { label: 'Where are past statements/tax documents stored?' },
        { label: 'Other Details:' },
        { label: 'Other Details:' },
      ];

      const advisorCellHeight = 6;
      const advisorColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
      let advisorTableY = yPosition;

      advisorRows.forEach((row, rowIndex) => {
        if (advisorTableY > 275) {
          doc.addPage();
          advisorTableY = 12;
        }

        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
        doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
        doc.setFontSize(8);

        const advisorCol1X = margin;
        const advisorCol2X = margin + advisorColWidths[0];
        const advisorCol3X = margin + advisorColWidths[0] + advisorColWidths[1];

        doc.rect(advisorCol1X, advisorTableY, advisorColWidths[0], advisorCellHeight);
        doc.rect(advisorCol2X, advisorTableY, advisorColWidths[1], advisorCellHeight);
        doc.rect(advisorCol3X, advisorTableY, advisorColWidths[2], advisorCellHeight);

        if (rowIndex === 0) {
          doc.text('Name:', advisorCol1X + 0.5, advisorTableY + 4);
          doc.text('Information:', advisorCol2X + 0.5, advisorTableY + 4);
          doc.text('Other Details:', advisorCol3X + 0.5, advisorTableY + 4);
        } else {
          doc.setFont(undefined, 'normal');

          if (row.label === 'Other Details:' || row.label === 'Other:' || row.label === 'Joint with _____:') {
            const labelField = new doc.AcroFormTextField();
            labelField.fieldName = `advisor_client1_${advisorIndex + 1}_${rowIndex}_col1`;
            labelField.Rect = [advisorCol1X + 0.3, advisorTableY + 0.3, advisorColWidths[0] - 0.6, advisorCellHeight - 0.6];
            labelField.fontSize = 8;
            labelField.textColor = [0, 0, 0];
            labelField.borderStyle = 'none';
            labelField.value = row.label;
            doc.addField(labelField);
          } else {
            doc.text(row.label, advisorCol1X + 0.5, advisorTableY + 4);
          }

          const advisorField1 = new doc.AcroFormTextField();
          advisorField1.fieldName = `advisor_client1_${advisorIndex + 1}_${rowIndex}_col2`;
          advisorField1.Rect = [advisorCol2X + 0.3, advisorTableY + 0.3, advisorColWidths[1] - 0.6, advisorCellHeight - 0.6];
          advisorField1.fontSize = 7;
          advisorField1.textColor = [0, 0, 0];
          advisorField1.borderStyle = 'none';
          if (rowIndex === 1) {
            advisorField1.value = advisorData?.firm || '';
          } else if (rowIndex === 2) {
            advisorField1.value = advisorData?.name || '';
          } else if (rowIndex === 3) {
            advisorField1.value = advisorData?.phone || '';
          } else if (rowIndex === 4) {
            advisorField1.value = advisorData?.email || '';
          }
          doc.addField(advisorField1);

          const advisorField2 = new doc.AcroFormTextField();
          advisorField2.fieldName = `advisor_client1_${advisorIndex + 1}_${rowIndex}_col3`;
          advisorField2.Rect = [advisorCol3X + 0.3, advisorTableY + 0.3, advisorColWidths[2] - 0.6, advisorCellHeight - 0.6];
          advisorField2.fontSize = 7;
          advisorField2.textColor = [0, 0, 0];
          advisorField2.borderStyle = 'none';
          doc.addField(advisorField2);
        }

        advisorTableY += advisorCellHeight;
      });

      yPosition = advisorTableY + 10;

      if (yPosition > 150) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      const institutionLabel = advisorData?.firm ? `${advisorData.firm} Accounts Held` : `Institution ${advisorIndex + 1} Accounts Held`;
      doc.text(institutionLabel, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      const accountRows = [
        { label: 'Account Type:', col2: 'Institution:', col3: 'Last 4 Digits of the Account Number:', col4: 'Beneficiary on File (if applicable):' },
        { label: 'RRSP' },
        { label: 'Spousal RRSP' },
        { label: 'Locked In RRSP/LIRA' },
        { label: 'RRIF' },
        { label: 'Spousal RRIF' },
        { label: 'Life Income Fund (LIF)' },
        { label: 'TFSA' },
        { label: 'Non-Registered Account' },
        { label: 'RESP' },
        { label: 'RDSP' },
        { label: 'FHSA' },
        { label: 'In Trust For:' },
        { label: 'Group RRSP:' },
        { label: 'Deferred Profit-Sharing Plan:' },
        { label: 'Joint with _____:' },
        { label: 'Other:' },
        { label: 'Other:' },
        { label: 'Other:' },
      ];

      const accountCellHeight = 6;
      const accountColWidths = [fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25];
      let accountTableY = yPosition;

      accountRows.forEach((row, rowIndex) => {
        if (accountTableY > 275) {
          doc.addPage();
          accountTableY = 12;
        }

        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
        doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
        doc.setFontSize(7);

        const accountCol1X = margin;
        const accountCol2X = margin + accountColWidths[0];
        const accountCol3X = margin + accountColWidths[0] + accountColWidths[1];
        const accountCol4X = margin + accountColWidths[0] + accountColWidths[1] + accountColWidths[2];

        doc.rect(accountCol1X, accountTableY, accountColWidths[0], accountCellHeight);
        doc.rect(accountCol2X, accountTableY, accountColWidths[1], accountCellHeight);
        doc.rect(accountCol3X, accountTableY, accountColWidths[2], accountCellHeight);
        doc.rect(accountCol4X, accountTableY, accountColWidths[3], accountCellHeight);

        if (rowIndex === 0) {
          doc.text('Account Type:', accountCol1X + 0.5, accountTableY + 4);
          doc.text('Institution:', accountCol2X + 0.5, accountTableY + 4);
          doc.text('Last 4 Digits of the', accountCol3X + 0.5, accountTableY + 2.5);
          doc.text('Account Number:', accountCol3X + 0.5, accountTableY + 4.5);
          doc.text('Beneficiary on File (if', accountCol4X + 0.5, accountTableY + 2.5);
          doc.text('applicable):', accountCol4X + 0.5, accountTableY + 4.5);
        } else {
          doc.setFont(undefined, 'normal');

          if (row.label === 'Other Details:' || row.label === 'Other:' || row.label === 'Joint with _____:') {
            const labelField = new doc.AcroFormTextField();
            labelField.fieldName = `accounts_client1_advisor${advisorIndex + 1}_${rowIndex}_col1`;
            labelField.Rect = [accountCol1X + 0.3, accountTableY + 0.3, accountColWidths[0] - 0.6, accountCellHeight - 0.6];
            labelField.fontSize = 7;
            labelField.textColor = [0, 0, 0];
            labelField.borderStyle = 'none';
            labelField.value = row.label;
            doc.addField(labelField);
          } else {
            doc.text(row.label, accountCol1X + 0.5, accountTableY + 4);
          }

          const accountField1 = new doc.AcroFormTextField();
          accountField1.fieldName = `accounts_client1_advisor${advisorIndex + 1}_${rowIndex}_col2`;
          accountField1.Rect = [accountCol2X + 0.3, accountTableY + 0.3, accountColWidths[1] - 0.6, accountCellHeight - 0.6];
          accountField1.fontSize = 7;
          accountField1.textColor = [0, 0, 0];
          accountField1.borderStyle = 'none';
          doc.addField(accountField1);

          const accountField2 = new doc.AcroFormTextField();
          accountField2.fieldName = `accounts_client1_advisor${advisorIndex + 1}_${rowIndex}_col3`;
          accountField2.Rect = [accountCol3X + 0.3, accountTableY + 0.3, accountColWidths[2] - 0.6, accountCellHeight - 0.6];
          accountField2.fontSize = 7;
          accountField2.textColor = [0, 0, 0];
          accountField2.borderStyle = 'none';
          doc.addField(accountField2);

          const accountField3 = new doc.AcroFormTextField();
          accountField3.fieldName = `accounts_client1_advisor${advisorIndex + 1}_${rowIndex}_col4`;
          accountField3.Rect = [accountCol4X + 0.3, accountTableY + 0.3, accountColWidths[3] - 0.6, accountCellHeight - 0.6];
          accountField3.fontSize = 7;
          accountField3.textColor = [0, 0, 0];
          accountField3.borderStyle = 'none';
          doc.addField(accountField3);
        }

        accountTableY += accountCellHeight;
      });

      yPosition = accountTableY + 10;
    }
  }

  if (client2AdvisorCount > 0 && hasSpouse) {
    for (let advisorIndex = 0; advisorIndex < client2AdvisorCount; advisorIndex++) {
      if (yPosition > 190) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text(`Financial Advisor/Investment Manager - ${client2Name} (${advisorIndex + 1} of ${client2AdvisorCount}):`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 4;
      doc.setFontSize(8);
      doc.text('Contact details for the person managing your portfolios and the location of current statements.', margin, yPosition);
      yPosition += 6;

      const advisorRows = [
        { label: 'Name:', col2: 'Information:', col3: 'Other Details:' },
        { label: 'Firm Name:' },
        { label: 'Key Contact:' },
        { label: 'Phone Number:' },
        { label: 'Email Address:' },
        { label: 'City, Province:' },
        { label: 'What Year did you begin working with this person?' },
        { label: 'Where are past statements/tax documents stored?' },
        { label: 'Other Details:' },
        { label: 'Other Details:' },
      ];

      const advisorCellHeight = 6;
      const advisorColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
      let advisorTableY = yPosition;

      const advisorData = formData.client2FinancialAdvisorsData?.[advisorIndex];

      advisorRows.forEach((row, rowIndex) => {
        if (advisorTableY > 275) {
          doc.addPage();
          advisorTableY = 12;
        }

        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
        doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
        doc.setFontSize(8);

        const advisorCol1X = margin;
        const advisorCol2X = margin + advisorColWidths[0];
        const advisorCol3X = margin + advisorColWidths[0] + advisorColWidths[1];

        doc.rect(advisorCol1X, advisorTableY, advisorColWidths[0], advisorCellHeight);
        doc.rect(advisorCol2X, advisorTableY, advisorColWidths[1], advisorCellHeight);
        doc.rect(advisorCol3X, advisorTableY, advisorColWidths[2], advisorCellHeight);

        if (rowIndex === 0) {
          doc.text('Name:', advisorCol1X + 0.5, advisorTableY + 4);
          doc.text('Information:', advisorCol2X + 0.5, advisorTableY + 4);
          doc.text('Other Details:', advisorCol3X + 0.5, advisorTableY + 4);
        } else {
          doc.setFont(undefined, 'normal');

          if (row.label === 'Other Details:' || row.label === 'Other:' || row.label === 'Joint with _____:') {
            const labelField = new doc.AcroFormTextField();
            labelField.fieldName = `advisor_client2_${advisorIndex + 1}_${rowIndex}_col1`;
            labelField.Rect = [advisorCol1X + 0.3, advisorTableY + 0.3, advisorColWidths[0] - 0.6, advisorCellHeight - 0.6];
            labelField.fontSize = 8;
            labelField.textColor = [0, 0, 0];
            labelField.borderStyle = 'none';
            labelField.value = row.label;
            doc.addField(labelField);
          } else {
            doc.text(row.label, advisorCol1X + 0.5, advisorTableY + 4);
          }

          const advisorField1 = new doc.AcroFormTextField();
          advisorField1.fieldName = `advisor_client2_${advisorIndex + 1}_${rowIndex}_col2`;
          advisorField1.Rect = [advisorCol2X + 0.3, advisorTableY + 0.3, advisorColWidths[1] - 0.6, advisorCellHeight - 0.6];
          advisorField1.fontSize = 7;
          advisorField1.textColor = [0, 0, 0];
          advisorField1.borderStyle = 'none';
          if (rowIndex === 1) {
            advisorField1.value = advisorData?.firm || '';
          } else if (rowIndex === 2) {
            advisorField1.value = advisorData?.name || '';
          } else if (rowIndex === 3) {
            advisorField1.value = advisorData?.phone || '';
          } else if (rowIndex === 4) {
            advisorField1.value = advisorData?.email || '';
          }
          doc.addField(advisorField1);

          const advisorField2 = new doc.AcroFormTextField();
          advisorField2.fieldName = `advisor_client2_${advisorIndex + 1}_${rowIndex}_col3`;
          advisorField2.Rect = [advisorCol3X + 0.3, advisorTableY + 0.3, advisorColWidths[2] - 0.6, advisorCellHeight - 0.6];
          advisorField2.fontSize = 7;
          advisorField2.textColor = [0, 0, 0];
          advisorField2.borderStyle = 'none';
          doc.addField(advisorField2);
        }

        advisorTableY += advisorCellHeight;
      });

      yPosition = advisorTableY + 10;

      if (yPosition > 150) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      const institutionLabel = advisorData?.firm ? `${advisorData.firm} Accounts Held` : `Institution ${advisorIndex + 1} Accounts Held`;
      doc.text(institutionLabel, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      const accountRows = [
        { label: 'Account Type:', col2: 'Institution:', col3: 'Last 4 Digits of the Account Number:', col4: 'Beneficiary on File (if applicable):' },
        { label: 'RRSP' },
        { label: 'Spousal RRSP' },
        { label: 'Locked In RRSP/LIRA' },
        { label: 'RRIF' },
        { label: 'Spousal RRIF' },
        { label: 'Life Income Fund (LIF)' },
        { label: 'TFSA' },
        { label: 'Non-Registered Account' },
        { label: 'RESP' },
        { label: 'RDSP' },
        { label: 'FHSA' },
        { label: 'In Trust For:' },
        { label: 'Group RRSP:' },
        { label: 'Deferred Profit-Sharing Plan:' },
        { label: 'Joint with _____:' },
        { label: 'Other:' },
        { label: 'Other:' },
        { label: 'Other:' },
      ];

      const accountCellHeight = 6;
      const accountColWidths = [fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25];
      let accountTableY = yPosition;

      accountRows.forEach((row, rowIndex) => {
        if (accountTableY > 275) {
          doc.addPage();
          accountTableY = 12;
        }

        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
        doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
        doc.setFontSize(7);

        const accountCol1X = margin;
        const accountCol2X = margin + accountColWidths[0];
        const accountCol3X = margin + accountColWidths[0] + accountColWidths[1];
        const accountCol4X = margin + accountColWidths[0] + accountColWidths[1] + accountColWidths[2];

        doc.rect(accountCol1X, accountTableY, accountColWidths[0], accountCellHeight);
        doc.rect(accountCol2X, accountTableY, accountColWidths[1], accountCellHeight);
        doc.rect(accountCol3X, accountTableY, accountColWidths[2], accountCellHeight);
        doc.rect(accountCol4X, accountTableY, accountColWidths[3], accountCellHeight);

        if (rowIndex === 0) {
          doc.text('Account Type:', accountCol1X + 0.5, accountTableY + 4);
          doc.text('Institution:', accountCol2X + 0.5, accountTableY + 4);
          doc.text('Last 4 Digits of the', accountCol3X + 0.5, accountTableY + 2.5);
          doc.text('Account Number:', accountCol3X + 0.5, accountTableY + 4.5);
          doc.text('Beneficiary on File (if', accountCol4X + 0.5, accountTableY + 2.5);
          doc.text('applicable):', accountCol4X + 0.5, accountTableY + 4.5);
        } else {
          doc.setFont(undefined, 'normal');

          if (row.label === 'Other Details:' || row.label === 'Other:' || row.label === 'Joint with _____:') {
            const labelField = new doc.AcroFormTextField();
            labelField.fieldName = `accounts_client2_advisor${advisorIndex + 1}_${rowIndex}_col1`;
            labelField.Rect = [accountCol1X + 0.3, accountTableY + 0.3, accountColWidths[0] - 0.6, accountCellHeight - 0.6];
            labelField.fontSize = 7;
            labelField.textColor = [0, 0, 0];
            labelField.borderStyle = 'none';
            labelField.value = row.label;
            doc.addField(labelField);
          } else {
            doc.text(row.label, accountCol1X + 0.5, accountTableY + 4);
          }

          const accountField1 = new doc.AcroFormTextField();
          accountField1.fieldName = `accounts_client2_advisor${advisorIndex + 1}_${rowIndex}_col2`;
          accountField1.Rect = [accountCol2X + 0.3, accountTableY + 0.3, accountColWidths[1] - 0.6, accountCellHeight - 0.6];
          accountField1.fontSize = 7;
          accountField1.textColor = [0, 0, 0];
          accountField1.borderStyle = 'none';
          doc.addField(accountField1);

          const accountField2 = new doc.AcroFormTextField();
          accountField2.fieldName = `accounts_client2_advisor${advisorIndex + 1}_${rowIndex}_col3`;
          accountField2.Rect = [accountCol3X + 0.3, accountTableY + 0.3, accountColWidths[2] - 0.6, accountCellHeight - 0.6];
          accountField2.fontSize = 7;
          accountField2.textColor = [0, 0, 0];
          accountField2.borderStyle = 'none';
          doc.addField(accountField2);

          const accountField3 = new doc.AcroFormTextField();
          accountField3.fieldName = `accounts_client2_advisor${advisorIndex + 1}_${rowIndex}_col4`;
          accountField3.Rect = [accountCol4X + 0.3, accountTableY + 0.3, accountColWidths[3] - 0.6, accountCellHeight - 0.6];
          accountField3.fontSize = 7;
          accountField3.textColor = [0, 0, 0];
          accountField3.borderStyle = 'none';
          doc.addField(accountField3);
        }

        accountTableY += accountCellHeight;
      });

      yPosition = accountTableY + 10;
    }
  }

  // Additional Reading Section for Funeral Arrangements
  const needsFuneralReading = formData.client1HasFuneralArrangements === 'no' ||
                               (hasSpouse && formData.client2HasFuneralArrangements === 'no');

  if (needsFuneralReading) {
    if (yPosition > 200) {
      doc.addPage();
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
        doc.addPage();
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
    doc.addPage();
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
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        const institutionName = jointInstitutions[i]?.name || `Institution ${i + 1}`;
        doc.text(`${institutionName} - Joint Banking Account`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 6;

        const bankRows = [
          { label: 'Detail:', col2: 'Information:', col3: 'Other Details:' },
          { label: 'Institution Name:' },
          { label: 'Branch/Location:' },
          { label: 'Account Type:' },
          { label: 'Last 4 Digits of Account Number:' },
          { label: 'Primary Contact Person:' },
          { label: 'Online Banking Access:' },
          { label: 'Other Details:' },
        ];

        const bankCellHeight = 6;
        const bankColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
        let bankTableY = yPosition;

        bankRows.forEach((row, rowIndex) => {
          if (bankTableY > 275) {
            doc.addPage();
            bankTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(8);

          const bankCol1X = margin;
          const bankCol2X = margin + bankColWidths[0];
          const bankCol3X = margin + bankColWidths[0] + bankColWidths[1];

          doc.rect(bankCol1X, bankTableY, bankColWidths[0], bankCellHeight);
          doc.rect(bankCol2X, bankTableY, bankColWidths[1], bankCellHeight);
          doc.rect(bankCol3X, bankTableY, bankColWidths[2], bankCellHeight);

          if (rowIndex === 0) {
            doc.text('Detail:', bankCol1X + 0.5, bankTableY + 4);
            doc.text('Information:', bankCol2X + 0.5, bankTableY + 4);
            doc.text('Other Details:', bankCol3X + 0.5, bankTableY + 4);
          } else {
            doc.setFont(undefined, 'normal');

            if (row.label === 'Other Details:' || row.label === 'Other:' || row.label === 'Joint with _____:') {
              const labelField = new doc.AcroFormTextField();
              labelField.fieldName = `bank_joint_${i + 1}_${rowIndex}_col1`;
              labelField.Rect = [bankCol1X + 0.3, bankTableY + 0.3, bankColWidths[0] - 0.6, bankCellHeight - 0.6];
              labelField.fontSize = 7;
              labelField.textColor = [0, 0, 0];
              labelField.borderStyle = 'none';
              labelField.value = row.label;
              doc.addField(labelField);
            } else {
              doc.text(row.label, bankCol1X + 0.5, bankTableY + 4);
            }

            const bankField1 = new doc.AcroFormTextField();
            bankField1.fieldName = `bank_joint_${i + 1}_${rowIndex}_col2`;
            bankField1.Rect = [bankCol2X + 0.3, bankTableY + 0.3, bankColWidths[1] - 0.6, bankCellHeight - 0.6];
            bankField1.fontSize = 7;
            bankField1.textColor = [0, 0, 0];
            bankField1.borderStyle = 'none';
            doc.addField(bankField1);

            const bankField2 = new doc.AcroFormTextField();
            bankField2.fieldName = `bank_joint_${i + 1}_${rowIndex}_col3`;
            bankField2.Rect = [bankCol3X + 0.3, bankTableY + 0.3, bankColWidths[2] - 0.6, bankCellHeight - 0.6];
            bankField2.fontSize = 7;
            bankField2.textColor = [0, 0, 0];
            bankField2.borderStyle = 'none';
            doc.addField(bankField2);
          }

          bankTableY += bankCellHeight;
        });

        yPosition = bankTableY + 10;
      }
    } else if (bankingStructure === 'individual') {
      const client1Count = parseInt(formData.client1BankCount || '0');
      const client1Institutions = formData.client1InstitutionsData || [];
      for (let i = 0; i < client1Count; i++) {
        if (yPosition > 180) {
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        const institutionName = client1Institutions[i]?.name || `Institution ${i + 1}`;
        doc.text(`${client1Name} - ${institutionName}`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 6;

        const bankRows = [
          { label: 'Detail:', col2: 'Information:', col3: 'Other Details:' },
          { label: 'Institution Name:' },
          { label: 'Branch/Location:' },
          { label: 'Account Type:' },
          { label: 'Last 4 Digits of Account Number:' },
          { label: 'Primary Contact Person:' },
          { label: 'Online Banking Access:' },
          { label: 'Other Details:' },
        ];

        const bankCellHeight = 6;
        const bankColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
        let bankTableY = yPosition;

        bankRows.forEach((row, rowIndex) => {
          if (bankTableY > 275) {
            doc.addPage();
            bankTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(8);

          const bankCol1X = margin;
          const bankCol2X = margin + bankColWidths[0];
          const bankCol3X = margin + bankColWidths[0] + bankColWidths[1];

          doc.rect(bankCol1X, bankTableY, bankColWidths[0], bankCellHeight);
          doc.rect(bankCol2X, bankTableY, bankColWidths[1], bankCellHeight);
          doc.rect(bankCol3X, bankTableY, bankColWidths[2], bankCellHeight);

          if (rowIndex === 0) {
            doc.text('Detail:', bankCol1X + 0.5, bankTableY + 4);
            doc.text('Information:', bankCol2X + 0.5, bankTableY + 4);
            doc.text('Other Details:', bankCol3X + 0.5, bankTableY + 4);
          } else {
            doc.setFont(undefined, 'normal');

            if (row.label === 'Other Details:' || row.label === 'Other:' || row.label === 'Joint with _____:') {
              const labelField = new doc.AcroFormTextField();
              labelField.fieldName = `bank_client1_${i + 1}_${rowIndex}_col1`;
              labelField.Rect = [bankCol1X + 0.3, bankTableY + 0.3, bankColWidths[0] - 0.6, bankCellHeight - 0.6];
              labelField.fontSize = 7;
              labelField.textColor = [0, 0, 0];
              labelField.borderStyle = 'none';
              labelField.value = row.label;
              doc.addField(labelField);
            } else {
              doc.text(row.label, bankCol1X + 0.5, bankTableY + 4);
            }

            const bankField1 = new doc.AcroFormTextField();
            bankField1.fieldName = `bank_client1_${i + 1}_${rowIndex}_col2`;
            bankField1.Rect = [bankCol2X + 0.3, bankTableY + 0.3, bankColWidths[1] - 0.6, bankCellHeight - 0.6];
            bankField1.fontSize = 7;
            bankField1.textColor = [0, 0, 0];
            bankField1.borderStyle = 'none';
            doc.addField(bankField1);

            const bankField2 = new doc.AcroFormTextField();
            bankField2.fieldName = `bank_client1_${i + 1}_${rowIndex}_col3`;
            bankField2.Rect = [bankCol3X + 0.3, bankTableY + 0.3, bankColWidths[2] - 0.6, bankCellHeight - 0.6];
            bankField2.fontSize = 7;
            bankField2.textColor = [0, 0, 0];
            bankField2.borderStyle = 'none';
            doc.addField(bankField2);
          }

          bankTableY += bankCellHeight;
        });

        yPosition = bankTableY + 10;
      }

      const client2Count = parseInt(formData.client2BankCount || '0');
      const client2Institutions = formData.client2InstitutionsData || [];
      for (let i = 0; i < client2Count; i++) {
        if (yPosition > 180) {
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        const institutionName = client2Institutions[i]?.name || `Institution ${i + 1}`;
        doc.text(`${client2Name} - ${institutionName}`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 6;

        const bankRows = [
          { label: 'Detail:', col2: 'Information:', col3: 'Other Details:' },
          { label: 'Institution Name:' },
          { label: 'Branch/Location:' },
          { label: 'Account Type:' },
          { label: 'Last 4 Digits of Account Number:' },
          { label: 'Primary Contact Person:' },
          { label: 'Online Banking Access:' },
          { label: 'Other Details:' },
        ];

        const bankCellHeight = 6;
        const bankColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
        let bankTableY = yPosition;

        bankRows.forEach((row, rowIndex) => {
          if (bankTableY > 275) {
            doc.addPage();
            bankTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(8);

          const bankCol1X = margin;
          const bankCol2X = margin + bankColWidths[0];
          const bankCol3X = margin + bankColWidths[0] + bankColWidths[1];

          doc.rect(bankCol1X, bankTableY, bankColWidths[0], bankCellHeight);
          doc.rect(bankCol2X, bankTableY, bankColWidths[1], bankCellHeight);
          doc.rect(bankCol3X, bankTableY, bankColWidths[2], bankCellHeight);

          if (rowIndex === 0) {
            doc.text('Detail:', bankCol1X + 0.5, bankTableY + 4);
            doc.text('Information:', bankCol2X + 0.5, bankTableY + 4);
            doc.text('Other Details:', bankCol3X + 0.5, bankTableY + 4);
          } else {
            doc.setFont(undefined, 'normal');

            if (row.label === 'Other Details:' || row.label === 'Other:' || row.label === 'Joint with _____:') {
              const labelField = new doc.AcroFormTextField();
              labelField.fieldName = `bank_client2_${i + 1}_${rowIndex}_col1`;
              labelField.Rect = [bankCol1X + 0.3, bankTableY + 0.3, bankColWidths[0] - 0.6, bankCellHeight - 0.6];
              labelField.fontSize = 7;
              labelField.textColor = [0, 0, 0];
              labelField.borderStyle = 'none';
              labelField.value = row.label;
              doc.addField(labelField);
            } else {
              doc.text(row.label, bankCol1X + 0.5, bankTableY + 4);
            }

            const bankField1 = new doc.AcroFormTextField();
            bankField1.fieldName = `bank_client2_${i + 1}_${rowIndex}_col2`;
            bankField1.Rect = [bankCol2X + 0.3, bankTableY + 0.3, bankColWidths[1] - 0.6, bankCellHeight - 0.6];
            bankField1.fontSize = 7;
            bankField1.textColor = [0, 0, 0];
            bankField1.borderStyle = 'none';
            doc.addField(bankField1);

            const bankField2 = new doc.AcroFormTextField();
            bankField2.fieldName = `bank_client2_${i + 1}_${rowIndex}_col3`;
            bankField2.Rect = [bankCol3X + 0.3, bankTableY + 0.3, bankColWidths[2] - 0.6, bankCellHeight - 0.6];
            bankField2.fontSize = 7;
            bankField2.textColor = [0, 0, 0];
            bankField2.borderStyle = 'none';
            doc.addField(bankField2);
          }

          bankTableY += bankCellHeight;
        });

        yPosition = bankTableY + 10;
      }
    } else if (bankingStructure === 'mixed') {
      const jointCount = parseInt(formData.mixedJointBankCount || '0');
      const mixedJointInstitutions = formData.mixedJointInstitutionsData || [];
      for (let i = 0; i < jointCount; i++) {
        if (yPosition > 180) {
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        const institutionName = mixedJointInstitutions[i]?.name || `Institution ${i + 1}`;
        doc.text(`${institutionName} - Joint Banking Account`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 6;

        const bankRows = [
          { label: 'Detail:', col2: 'Information:', col3: 'Other Details:' },
          { label: 'Institution Name:' },
          { label: 'Branch/Location:' },
          { label: 'Account Type:' },
          { label: 'Last 4 Digits of Account Number:' },
          { label: 'Primary Contact Person:' },
          { label: 'Online Banking Access:' },
          { label: 'Other Details:' },
        ];

        const bankCellHeight = 6;
        const bankColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
        let bankTableY = yPosition;

        bankRows.forEach((row, rowIndex) => {
          if (bankTableY > 275) {
            doc.addPage();
            bankTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(8);

          const bankCol1X = margin;
          const bankCol2X = margin + bankColWidths[0];
          const bankCol3X = margin + bankColWidths[0] + bankColWidths[1];

          doc.rect(bankCol1X, bankTableY, bankColWidths[0], bankCellHeight);
          doc.rect(bankCol2X, bankTableY, bankColWidths[1], bankCellHeight);
          doc.rect(bankCol3X, bankTableY, bankColWidths[2], bankCellHeight);

          if (rowIndex === 0) {
            doc.text('Detail:', bankCol1X + 0.5, bankTableY + 4);
            doc.text('Information:', bankCol2X + 0.5, bankTableY + 4);
            doc.text('Other Details:', bankCol3X + 0.5, bankTableY + 4);
          } else {
            doc.setFont(undefined, 'normal');

            if (row.label === 'Other Details:' || row.label === 'Other:' || row.label === 'Joint with _____:') {
              const labelField = new doc.AcroFormTextField();
              labelField.fieldName = `bank_mixed_joint_${i + 1}_${rowIndex}_col1`;
              labelField.Rect = [bankCol1X + 0.3, bankTableY + 0.3, bankColWidths[0] - 0.6, bankCellHeight - 0.6];
              labelField.fontSize = 7;
              labelField.textColor = [0, 0, 0];
              labelField.borderStyle = 'none';
              labelField.value = row.label;
              doc.addField(labelField);
            } else {
              doc.text(row.label, bankCol1X + 0.5, bankTableY + 4);
            }

            const bankField1 = new doc.AcroFormTextField();
            bankField1.fieldName = `bank_mixed_joint_${i + 1}_${rowIndex}_col2`;
            bankField1.Rect = [bankCol2X + 0.3, bankTableY + 0.3, bankColWidths[1] - 0.6, bankCellHeight - 0.6];
            bankField1.fontSize = 7;
            bankField1.textColor = [0, 0, 0];
            bankField1.borderStyle = 'none';
            doc.addField(bankField1);

            const bankField2 = new doc.AcroFormTextField();
            bankField2.fieldName = `bank_mixed_joint_${i + 1}_${rowIndex}_col3`;
            bankField2.Rect = [bankCol3X + 0.3, bankTableY + 0.3, bankColWidths[2] - 0.6, bankCellHeight - 0.6];
            bankField2.fontSize = 7;
            bankField2.textColor = [0, 0, 0];
            bankField2.borderStyle = 'none';
            doc.addField(bankField2);
          }

          bankTableY += bankCellHeight;
        });

        yPosition = bankTableY + 10;
      }

      const client1Count = parseInt(formData.mixedClient1BankCount || '0');
      const mixedClient1Institutions = formData.mixedClient1InstitutionsData || [];
      for (let i = 0; i < client1Count; i++) {
        if (yPosition > 180) {
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        const institutionName = mixedClient1Institutions[i]?.name || `Institution ${i + 1}`;
        doc.text(`${client1Name} - ${institutionName}`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 6;

        const bankRows = [
          { label: 'Detail:', col2: 'Information:', col3: 'Other Details:' },
          { label: 'Institution Name:' },
          { label: 'Branch/Location:' },
          { label: 'Account Type:' },
          { label: 'Last 4 Digits of Account Number:' },
          { label: 'Primary Contact Person:' },
          { label: 'Online Banking Access:' },
          { label: 'Other Details:' },
        ];

        const bankCellHeight = 6;
        const bankColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
        let bankTableY = yPosition;

        bankRows.forEach((row, rowIndex) => {
          if (bankTableY > 275) {
            doc.addPage();
            bankTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(8);

          const bankCol1X = margin;
          const bankCol2X = margin + bankColWidths[0];
          const bankCol3X = margin + bankColWidths[0] + bankColWidths[1];

          doc.rect(bankCol1X, bankTableY, bankColWidths[0], bankCellHeight);
          doc.rect(bankCol2X, bankTableY, bankColWidths[1], bankCellHeight);
          doc.rect(bankCol3X, bankTableY, bankColWidths[2], bankCellHeight);

          if (rowIndex === 0) {
            doc.text('Detail:', bankCol1X + 0.5, bankTableY + 4);
            doc.text('Information:', bankCol2X + 0.5, bankTableY + 4);
            doc.text('Other Details:', bankCol3X + 0.5, bankTableY + 4);
          } else {
            doc.setFont(undefined, 'normal');

            if (row.label === 'Other Details:' || row.label === 'Other:' || row.label === 'Joint with _____:') {
              const labelField = new doc.AcroFormTextField();
              labelField.fieldName = `bank_mixed_client1_${i + 1}_${rowIndex}_col1`;
              labelField.Rect = [bankCol1X + 0.3, bankTableY + 0.3, bankColWidths[0] - 0.6, bankCellHeight - 0.6];
              labelField.fontSize = 7;
              labelField.textColor = [0, 0, 0];
              labelField.borderStyle = 'none';
              labelField.value = row.label;
              doc.addField(labelField);
            } else {
              doc.text(row.label, bankCol1X + 0.5, bankTableY + 4);
            }

            const bankField1 = new doc.AcroFormTextField();
            bankField1.fieldName = `bank_mixed_client1_${i + 1}_${rowIndex}_col2`;
            bankField1.Rect = [bankCol2X + 0.3, bankTableY + 0.3, bankColWidths[1] - 0.6, bankCellHeight - 0.6];
            bankField1.fontSize = 7;
            bankField1.textColor = [0, 0, 0];
            bankField1.borderStyle = 'none';
            doc.addField(bankField1);

            const bankField2 = new doc.AcroFormTextField();
            bankField2.fieldName = `bank_mixed_client1_${i + 1}_${rowIndex}_col3`;
            bankField2.Rect = [bankCol3X + 0.3, bankTableY + 0.3, bankColWidths[2] - 0.6, bankCellHeight - 0.6];
            bankField2.fontSize = 7;
            bankField2.textColor = [0, 0, 0];
            bankField2.borderStyle = 'none';
            doc.addField(bankField2);
          }

          bankTableY += bankCellHeight;
        });

        yPosition = bankTableY + 10;
      }

      const client2Count = parseInt(formData.mixedClient2BankCount || '0');
      const mixedClient2Institutions = formData.mixedClient2InstitutionsData || [];
      for (let i = 0; i < client2Count; i++) {
        if (yPosition > 180) {
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        const institutionName = mixedClient2Institutions[i]?.name || `Institution ${i + 1}`;
        doc.text(`${client2Name} - ${institutionName}`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 6;

        const bankRows = [
          { label: 'Detail:', col2: 'Information:', col3: 'Other Details:' },
          { label: 'Institution Name:' },
          { label: 'Branch/Location:' },
          { label: 'Account Type:' },
          { label: 'Last 4 Digits of Account Number:' },
          { label: 'Primary Contact Person:' },
          { label: 'Online Banking Access:' },
          { label: 'Other Details:' },
        ];

        const bankCellHeight = 6;
        const bankColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
        let bankTableY = yPosition;

        bankRows.forEach((row, rowIndex) => {
          if (bankTableY > 275) {
            doc.addPage();
            bankTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(8);

          const bankCol1X = margin;
          const bankCol2X = margin + bankColWidths[0];
          const bankCol3X = margin + bankColWidths[0] + bankColWidths[1];

          doc.rect(bankCol1X, bankTableY, bankColWidths[0], bankCellHeight);
          doc.rect(bankCol2X, bankTableY, bankColWidths[1], bankCellHeight);
          doc.rect(bankCol3X, bankTableY, bankColWidths[2], bankCellHeight);

          if (rowIndex === 0) {
            doc.text('Detail:', bankCol1X + 0.5, bankTableY + 4);
            doc.text('Information:', bankCol2X + 0.5, bankTableY + 4);
            doc.text('Other Details:', bankCol3X + 0.5, bankTableY + 4);
          } else {
            doc.setFont(undefined, 'normal');

            if (row.label === 'Other Details:' || row.label === 'Other:' || row.label === 'Joint with _____:') {
              const labelField = new doc.AcroFormTextField();
              labelField.fieldName = `bank_mixed_client2_${i + 1}_${rowIndex}_col1`;
              labelField.Rect = [bankCol1X + 0.3, bankTableY + 0.3, bankColWidths[0] - 0.6, bankCellHeight - 0.6];
              labelField.fontSize = 7;
              labelField.textColor = [0, 0, 0];
              labelField.borderStyle = 'none';
              labelField.value = row.label;
              doc.addField(labelField);
            } else {
              doc.text(row.label, bankCol1X + 0.5, bankTableY + 4);
            }

            const bankField1 = new doc.AcroFormTextField();
            bankField1.fieldName = `bank_mixed_client2_${i + 1}_${rowIndex}_col3`;
            bankField1.Rect = [bankCol2X + 0.3, bankTableY + 0.3, bankColWidths[1] - 0.6, bankCellHeight - 0.6];
            bankField1.fontSize = 7;
            bankField1.textColor = [0, 0, 0];
            bankField1.borderStyle = 'none';
            doc.addField(bankField1);

            const bankField2 = new doc.AcroFormTextField();
            bankField2.fieldName = `bank_mixed_client2_${i + 1}_${rowIndex}_col3`;
            bankField2.Rect = [bankCol3X + 0.3, bankTableY + 0.3, bankColWidths[2] - 0.6, bankCellHeight - 0.6];
            bankField2.fontSize = 7;
            bankField2.textColor = [0, 0, 0];
            bankField2.borderStyle = 'none';
            doc.addField(bankField2);
          }

          bankTableY += bankCellHeight;
        });

        yPosition = bankTableY + 10;
      }
    } else if (!hasSpouse) {
      const bankCount = parseInt(formData.client1BankCount || '0');
      const client1Institutions = formData.client1InstitutionsData || [];
      for (let i = 0; i < bankCount; i++) {
        if (yPosition > 180) {
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        const institutionName = client1Institutions[i]?.name || `Institution ${i + 1}`;
        doc.text(`${institutionName} - Banking Account`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 6;

        const bankRows = [
          { label: 'Detail:', col2: 'Information:', col3: 'Other Details:' },
          { label: 'Institution Name:' },
          { label: 'Branch/Location:' },
          { label: 'Account Type:' },
          { label: 'Last 4 Digits of Account Number:' },
          { label: 'Primary Contact Person:' },
          { label: 'Online Banking Access:' },
          { label: 'Other Details:' },
        ];

        const bankCellHeight = 6;
        const bankColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
        let bankTableY = yPosition;

        bankRows.forEach((row, rowIndex) => {
          if (bankTableY > 275) {
            doc.addPage();
            bankTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(8);

          const bankCol1X = margin;
          const bankCol2X = margin + bankColWidths[0];
          const bankCol3X = margin + bankColWidths[0] + bankColWidths[1];

          doc.rect(bankCol1X, bankTableY, bankColWidths[0], bankCellHeight);
          doc.rect(bankCol2X, bankTableY, bankColWidths[1], bankCellHeight);
          doc.rect(bankCol3X, bankTableY, bankColWidths[2], bankCellHeight);

          if (rowIndex === 0) {
            doc.text('Detail:', bankCol1X + 0.5, bankTableY + 4);
            doc.text('Information:', bankCol2X + 0.5, bankTableY + 4);
            doc.text('Other Details:', bankCol3X + 0.5, bankTableY + 4);
          } else {
            doc.setFont(undefined, 'normal');

            if (row.label === 'Other Details:' || row.label === 'Other:' || row.label === 'Joint with _____:') {
              const labelField = new doc.AcroFormTextField();
              labelField.fieldName = `bank_single_${i + 1}_${rowIndex}_col1`;
              labelField.Rect = [bankCol1X + 0.3, bankTableY + 0.3, bankColWidths[0] - 0.6, bankCellHeight - 0.6];
              labelField.fontSize = 7;
              labelField.textColor = [0, 0, 0];
              labelField.borderStyle = 'none';
              labelField.value = row.label;
              doc.addField(labelField);
            } else {
              doc.text(row.label, bankCol1X + 0.5, bankTableY + 4);
            }

            const bankField1 = new doc.AcroFormTextField();
            bankField1.fieldName = `bank_single_${i + 1}_${rowIndex}_col2`;
            bankField1.Rect = [bankCol2X + 0.3, bankTableY + 0.3, bankColWidths[1] - 0.6, bankCellHeight - 0.6];
            bankField1.fontSize = 7;
            bankField1.textColor = [0, 0, 0];
            bankField1.borderStyle = 'none';
            doc.addField(bankField1);

            const bankField2 = new doc.AcroFormTextField();
            bankField2.fieldName = `bank_single_${i + 1}_${rowIndex}_col3`;
            bankField2.Rect = [bankCol3X + 0.3, bankTableY + 0.3, bankColWidths[2] - 0.6, bankCellHeight - 0.6];
            bankField2.fontSize = 7;
            bankField2.textColor = [0, 0, 0];
            bankField2.borderStyle = 'none';
            doc.addField(bankField2);
          }

          bankTableY += bankCellHeight;
        });

        yPosition = bankTableY + 10;
      }
    }
  }

  if (formData.ownsRealEstate === 'yes') {
    yPosition += 12;
    addSectionHeader('Real Estate');

    doc.setFontSize(9);
    doc.setTextColor(...colors.mediumGray);
    doc.text('Information about owned properties', margin, yPosition);
    yPosition += 12;
    doc.setTextColor(...colors.darkText);

    if (formData.isPrimaryResidence === 'yes') {
      const ownerMap: Record<string, string> = {
        'joint_survivorship': 'Jointly with right of survivorship',
        'joint_tenants': 'Jointly as tenants in common',
        'client1': formData.fullName || 'Client 1',
        'client2': formData.spouseName || 'Client 2',
      };
      const ownerLabel = ownerMap[formData.primaryResidenceOwner || ''] || formData.primaryResidenceOwner || '';

      if (yPosition > 220) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text(`Primary Residence, owned by ${ownerLabel}`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      const primaryResRows = [
        'Primary Residence:',
        'Physical Address:',
        'Deed/Title Location:',
        'Mortgage Holder (if applicable):',
        'Line of Credit (if applicable):',
      ];

      const primaryCellHeight = 7;
      const primaryLabelWidth = fieldWidth * 0.35;
      const primaryFieldWidth = fieldWidth * 0.65;
      let primaryTableY = yPosition;

      primaryResRows.forEach((rowLabel, rowIndex) => {
        if (primaryTableY > 275) {
          doc.addPage();
          primaryTableY = 12;
        }

        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(255, 255, 255);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(8);

        doc.rect(margin, primaryTableY, primaryLabelWidth, primaryCellHeight);
        doc.rect(margin + primaryLabelWidth, primaryTableY, primaryFieldWidth, primaryCellHeight);
        doc.text(rowLabel, margin + 0.5, primaryTableY + 4.5);

        if (rowIndex > 0) {
          const primaryField = new doc.AcroFormTextField();
          primaryField.fieldName = `primary_residence_row_${rowIndex}`;
          primaryField.Rect = [margin + primaryLabelWidth + 0.3, primaryTableY + 0.3, primaryFieldWidth - 0.6, primaryCellHeight - 0.6];
          primaryField.fontSize = 7;
          primaryField.textColor = [0, 0, 0];
          primaryField.borderStyle = 'none';

          if (rowIndex === 1 && formData.isSameAddressAsBeginning === 'yes') {
            const fullAddress = [
              formData.address,
              formData.city,
              formData.province,
              formData.postalCode
            ].filter(Boolean).join(', ');
            primaryField.value = fullAddress;
          }

          doc.addField(primaryField);
        }

        primaryTableY += primaryCellHeight;
      });

      yPosition = primaryTableY + 10;
    }

    if (formData.propertiesData && formData.propertiesData.length > 0) {
      formData.propertiesData.forEach((property, propIndex) => {
        if (yPosition > 200) {
          doc.addPage();
          yPosition = 12;
        }

        const ownerMap: Record<string, string> = {
          'joint_survivorship': 'Jointly with right of survivorship',
          'joint_tenants': 'Jointly as tenants in common',
          'client1': formData.fullName || 'Client 1',
          'client2': formData.spouseName || 'Client 2',
          'other': 'Other',
        };

        if (formData.trustLegalName) {
          ownerMap['trust'] = formData.trustLegalName;
        }

        if (formData.corporationsData && formData.corporationsData.length > 0) {
          formData.corporationsData.forEach((corp, idx) => {
            const corpName = corp?.legalName || `Corporation ${idx + 1}`;
            ownerMap[`corporation_${idx}`] = corpName;
          });
        }

        const ownerLabel = ownerMap[property.propertyOwner || ''] || property.propertyOwner || '';

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('Property Name:', margin, yPosition);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        if (property.propertyName) {
          doc.text(property.propertyName, margin + 30, yPosition);
        }
        yPosition += 6;

        doc.setFont(undefined, 'bold');
        doc.text('Property Type:', margin, yPosition);
        doc.setFont(undefined, 'normal');
        if (property.propertyType) {
          doc.text(property.propertyType, margin + 30, yPosition);
        }
        yPosition += 6;

        doc.setFont(undefined, 'bold');
        doc.text('Ownership Structure:', margin, yPosition);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(8);
        doc.text(`Owned by ${ownerLabel}`, margin, yPosition + 4);
        yPosition += 8;

        if (property.hasAdditionalOwners === 'yes' && property.additionalOwnersCount) {
          const additionalOwnerCount = parseInt(property.additionalOwnersCount) || 0;
          const totalRows = 2 + additionalOwnerCount;

          const ownershipCellHeight = 7;
          const ownerNameColWidth = fieldWidth * 0.5;
          const ownershipPercentColWidth = fieldWidth * 0.5;
          let ownershipTableY = yPosition;

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(255, 255, 255);
          doc.setFont(undefined, 'bold');
          doc.setFontSize(8);

          doc.rect(margin, ownershipTableY, ownerNameColWidth, ownershipCellHeight);
          doc.text('Owner Name:', margin + 0.5, ownershipTableY + 4.5);

          doc.rect(margin + ownerNameColWidth, ownershipTableY, ownershipPercentColWidth, ownershipCellHeight);
          doc.text('Ownership %:', margin + ownerNameColWidth + 0.5, ownershipTableY + 4.5);

          ownershipTableY += ownershipCellHeight;

          for (let i = 0; i < totalRows; i++) {
            if (ownershipTableY > 275) {
              doc.addPage();
              ownershipTableY = 12;
            }

            doc.setFont(undefined, 'normal');
            doc.rect(margin, ownershipTableY, ownerNameColWidth, ownershipCellHeight);
            doc.rect(margin + ownerNameColWidth, ownershipTableY, ownershipPercentColWidth, ownershipCellHeight);

            const ownerNameField = new doc.AcroFormTextField();
            ownerNameField.fieldName = `property_${propIndex + 1}_owner_name_${i + 1}`;
            ownerNameField.Rect = [margin + 0.3, ownershipTableY + 0.3, ownerNameColWidth - 0.6, ownershipCellHeight - 0.6];
            ownerNameField.fontSize = 7;
            ownerNameField.textColor = [0, 0, 0];
            ownerNameField.borderStyle = 'none';
            doc.addField(ownerNameField);

            const ownerPercentField = new doc.AcroFormTextField();
            ownerPercentField.fieldName = `property_${propIndex + 1}_owner_percent_${i + 1}`;
            ownerPercentField.Rect = [margin + ownerNameColWidth + 0.3, ownershipTableY + 0.3, ownershipPercentColWidth - 0.6, ownershipCellHeight - 0.6];
            ownerPercentField.fontSize = 7;
            ownerPercentField.textColor = [0, 0, 0];
            ownerPercentField.borderStyle = 'none';
            doc.addField(ownerPercentField);

            ownershipTableY += ownershipCellHeight;
          }

          yPosition = ownershipTableY + 10;
        } else {
          doc.setFontSize(8);
          doc.text(`Owned by ${ownerLabel}`, margin, yPosition);
          yPosition += 10;
        }

        if (yPosition > 250) {
          doc.addPage();
          yPosition = 12;
        }

        const propertyRows = [
          'Physical Address',
          'Deed/Title Location:',
          'Mortgage/Lein Holder (if applicable):',
          'Line of Credit (if applicable):',
        ];

        const propertyCellHeight = 7;
        const propertyLabelWidth = fieldWidth * 0.35;
        const propertyFieldWidth = fieldWidth * 0.65;
        let propertyTableY = yPosition;

        propertyRows.forEach((rowLabel, rowIndex) => {
          if (propertyTableY > 275) {
            doc.addPage();
            propertyTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(255, 255, 255);
          doc.setFont(undefined, 'normal');
          doc.setFontSize(8);

          doc.rect(margin, propertyTableY, propertyLabelWidth, propertyCellHeight);
          doc.rect(margin + propertyLabelWidth, propertyTableY, propertyFieldWidth, propertyCellHeight);
          doc.text(rowLabel, margin + 0.5, propertyTableY + 4.5);

          const propertyField = new doc.AcroFormTextField();
          propertyField.fieldName = `property_${propIndex + 1}_row_${rowIndex}`;
          propertyField.Rect = [margin + propertyLabelWidth + 0.3, propertyTableY + 0.3, propertyFieldWidth - 0.6, propertyCellHeight - 0.6];
          propertyField.fontSize = 7;
          propertyField.textColor = [0, 0, 0];
          propertyField.borderStyle = 'none';
          doc.addField(propertyField);

          propertyTableY += propertyCellHeight;
        });

        yPosition = propertyTableY + 10;

        if (property.propertyType === 'Rental' || property.propertyType === 'Commercial') {
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 12;
          }

          const rentalRows = [
            { label: 'Rental Agreements Location:', fieldKey: 'rentalAgreementsLocation' },
            { label: 'Revenue & Expenses Records Location:', fieldKey: 'revenueExpensesLocation' },
            { label: 'Capital Expenditures Records Location:', fieldKey: 'capitalExpendituresLocation' },
          ];

          const rentalCellHeight = 7;
          const rentalLabelWidth = fieldWidth * 0.45;
          const rentalFieldWidth = fieldWidth * 0.55;
          let rentalTableY = yPosition;

          rentalRows.forEach((row, rowIndex) => {
            if (rentalTableY > 275) {
              doc.addPage();
              rentalTableY = 12;
            }

            doc.setDrawColor(0, 0, 0);
            doc.setFillColor(255, 255, 255);
            doc.setFont(undefined, 'normal');
            doc.setFontSize(8);

            doc.rect(margin, rentalTableY, rentalLabelWidth, rentalCellHeight);
            doc.rect(margin + rentalLabelWidth, rentalTableY, rentalFieldWidth, rentalCellHeight);
            doc.text(row.label, margin + 0.5, rentalTableY + 4.5);

            const rentalField = new doc.AcroFormTextField();
            rentalField.fieldName = `property_${propIndex + 1}_${row.fieldKey}`;
            rentalField.Rect = [margin + rentalLabelWidth + 0.3, rentalTableY + 0.3, rentalFieldWidth - 0.6, rentalCellHeight - 0.6];
            rentalField.fontSize = 7;
            rentalField.textColor = [0, 0, 0];
            rentalField.borderStyle = 'none';
            if (property[row.fieldKey as keyof typeof property]) {
              rentalField.value = property[row.fieldKey as keyof typeof property] as string;
            }
            doc.addField(rentalField);

            rentalTableY += rentalCellHeight;
          });

          yPosition = rentalTableY + 10;
        }

        if (yPosition > 250) {
          doc.addPage();
          yPosition = 12;
        }

        doc.setFont(undefined, 'bold');
        doc.setFontSize(9);
        doc.text('Succession Planning', margin, yPosition);
        yPosition += 6;

        doc.setFont(undefined, 'normal');
        doc.setFontSize(8);
        const successionQuestion = `Is there a written plan for what to do with this property should ${formData.fullName || 'Client 1'}${formData.spouseName ? ` and ${formData.spouseName}` : ''} pass away?`;
        const successionAnswer = property.hasSuccessionPlan === 'yes' ? 'Yes' : property.hasSuccessionPlan === 'no' ? 'No' : 'Not answered';
        doc.text(successionQuestion, margin, yPosition);
        yPosition += 5;
        doc.setFont(undefined, 'bold');
        doc.text(`Answer: ${successionAnswer}`, margin, yPosition);
        yPosition += 6;

        if (property.hasSuccessionPlan === 'yes') {
          doc.setFont(undefined, 'normal');
          const successionCellHeight = 7;
          const successionLabelWidth = fieldWidth * 0.35;
          const successionFieldWidth = fieldWidth * 0.65;

          if (yPosition > 275) {
            doc.addPage();
            yPosition = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(255, 255, 255);
          doc.rect(margin, yPosition, successionLabelWidth, successionCellHeight);
          doc.rect(margin + successionLabelWidth, yPosition, successionFieldWidth, successionCellHeight);
          doc.text('Document Location:', margin + 0.5, yPosition + 4.5);

          const successionField = new doc.AcroFormTextField();
          successionField.fieldName = `property_${propIndex + 1}_succession_plan_location`;
          successionField.Rect = [margin + successionLabelWidth + 0.3, yPosition + 0.3, successionFieldWidth - 0.6, successionCellHeight - 0.6];
          successionField.fontSize = 7;
          successionField.textColor = [0, 0, 0];
          successionField.borderStyle = 'none';
          if (property.successionPlanLocation) {
            successionField.value = property.successionPlanLocation;
          }
          doc.addField(successionField);

          yPosition += successionCellHeight + 10;
        } else {
          yPosition += 5;
        }
      });
    }

    const hasPropertyWithoutPlan = formData.propertiesData?.some(
      (property) => property.hasSuccessionPlan === 'no'
    );

    if (hasPropertyWithoutPlan) {
      if (yPosition > 240) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFont(undefined, 'bold');
      doc.setFontSize(12);
      doc.text('Additional Reading', margin, yPosition);
      yPosition += 8;

      doc.setFont(undefined, 'normal');
      doc.setFontSize(9);

      const introText = [
        'Julia Chung, CFP®, FEA, TEP is a Financial Planning and Family Enterprise Consultant based in',
        'Vancouver, and one of the leading minds in multigenerational financial planning.',
        '',
        'She wrote the following which is a great way to introduce the idea of planning for what may come up',
        'should properties like vacation homes pass to the next generation. A similar logic would still apply',
        'with rental properties. I have included her work for educational purposes as you indicated that one or',
        'more properties do not have a written plan in place:'
      ];

      introText.forEach(line => {
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 12;
        }
        doc.text(line, margin, yPosition);
        yPosition += 5;
      });

      yPosition += 5;

      doc.setFont(undefined, 'bold');
      doc.setFontSize(11);
      const articleTitle = 'Planning for the Family Cottage, Cabin, or Camp';
      if (yPosition > 280) {
        doc.addPage();
        yPosition = 12;
      }
      doc.text(articleTitle, margin, yPosition);
      yPosition += 8;

      doc.setFont(undefined, 'normal');
      doc.setFontSize(8);

      const articleParagraphs = [
        'Summer is sacred in Canada, and for many families, summers include a family cottage, cabin, or camp, stuffed with memories and nostalgic knickknacks. No matter what name you gave the place where your clan gets together to enjoy the outdoors - and each other - it\'s often an important part of who you are, and how your family connects.',
        '',
        'Many of these kinds of properties were purchased at a time when land, even waterfront land, was relatively inexpensive. Back when the founding family members were young, the options were endless, and capital gains taxes were a strange idea that only existed in foreign lands*.',
        '',
        'Today, many founding family members are grandparents or great-grandparents. The children are grown, with children, and even grandchildren of their own. The summer getaway might feel a little tighter with so many family members arriving each season, or may be organized under a strict schedule. Perhaps you\'ve added another lot here, and an additional building there.',
        '',
        'If your family has a summer hideaway, it\'s likely that determining how best to deal with this legacy might weigh a little heavy on your mind. Perhaps you\'ve talked to your professional advisors, or even searched the internet for ideas on how to move ahead.',
        '',
        'You may find that the differences in opinions about the "best" way to approach this varies widely. An advisor might tell you that second generations of owners never get along, and it\'s best to sell now before the fist fights begin. An article might advise you that the best approach is a trust, or a corporation, because tax planning is the only possible concern. Yet another resource might advise you to leave just one family member "in charge", or that the whole thing isn\'t even your problem to manage, because you\'ll be dead when the trouble starts.',
        '',
        'There are many people who have "been there, done that", who have strong opinions and strategies built on that experience. The important thing to remember is that they haven\'t "been there, done that" with your family. There isn\'t one right way to do... anything.',
        '',
        'There\'s might be the "right" way for your family, with your particular holiday home, your family culture, your specific way of communicating (or not communicating), your rules (usually, unwritten), and your aspirations.',
        '',
        'Here\'s how we find out what that is:',
      ];

      articleParagraphs.forEach(para => {
        if (para === '') {
          yPosition += 3;
          return;
        }

        if (yPosition > 275) {
          doc.addPage();
          yPosition = 12;
        }

        const lines = doc.splitTextToSize(para, fieldWidth);
        lines.forEach((line: string) => {
          if (yPosition > 280) {
            doc.addPage();
            yPosition = 12;
          }
          doc.text(line, margin, yPosition);
          yPosition += 4;
        });
        yPosition += 2;
      });

      const sections = [
        {
          title: 'Start with an exploration... with the current legal owners...',
          content: [
            '• How does the ongoing management of this property impact our lives? What parts of it, whether financial, physical, or emotional, would we want to see change before the ends of our lives. Tip: This may involve a financial planning exercise.',
            '',
            '• What hopes or dreams do we have about this property? When we envision the last few decades of our own lives, and then the continuing lives of the generations that follow us, what do we wish to see?',
            '',
            '• If we do want the property passed down to the preceding generations, what concerns do we have about ongoing management?'
          ]
        },
        {
          title: 'Next... let\'s have a conversation...',
          content: [
            'Of course, whatever the current owners decide to do with the property is legally their own concern. From a family perspective, however, it might be everyone\'s concern. If maintaining family harmony is important, the next best step is a conversation with the generations who have grown up in, contributed to, and loved that family home.',
            '',
            'It might be best to start with each individual, and then later, have a family meeting where everyone is working with the same information. Tip: A professional facilitator could help make these conversations easier.',
            '',
            'For each individual, you may want to learn directly from them:',
            '',
            '• What does the family property mean to you?',
            '• What would you like to see happen with, or what are your hopes regarding, this property?',
            '• What are your concerns about the property, both now and in the future?',
            '• Do you intend to make regular use of the property?',
            '• How would you envision sharing this property with your family members?',
            '• How much would you be willing to commit, whether in time or money or both, to routine costs?',
            '• How would you want to approach decision making around things like regular repairs and upgrades?',
            '• How would you see major decisions being made, such as whether to sell, when to make capital improvements, who gets to be on title, and more?',
            '• What approach would you want to take to solving disagreements?',
            '',
            'From this conversation, you\'ll hopefully uncover whether or not each individual is emotionally connected to the property, and what kind of commitments they\'d make to it. You\'ll also find out what their biggest concerns are, and if they feel they have an interest in the property that comes ahead of, or after, another family member.',
            '',
            'This could be a great time to discuss the realities of the property, from maintenance and costs involved in keeping it going, to agreements with family members if ownership became shared. Of course, there\'s always that capital gains tax concern when the property ownership changes hands. It\'s best to come to these conversations equipped with that information, so everyone understands the level of responsibility required. Your professional advisors (financial planner and accountant) should be able to help you get quite a bit of that together.',
            '',
            'From there, you may find that there are just a few people who really want to keep the property. Or perhaps there are none and it\'s time for you to sell. Or perhaps everyone wants in. If more than one person definitely wants to maintain the property, then you know it\'s time for a family meeting.',
            '',
            'These conversations can be emotionally trying for some families, and incredibly easy for others. You may want assistance with these conversations, whether to on the finance side for technical information, or experts in facilitation and family therapy for wrangling through the more emotional aspects. If you find that the conversations feel tough, that doesn\'t mean they won\'t work. It usually means that the depth of feeling is enormous, which might mean that the tough conversations are very much worth it.'
          ]
        },
        {
          title: 'From there... create a plan',
          content: [
            'Yes, I skipped over the hardest part. It\'s not that I don\'t want to get into - I do. But the way your family meeting goes is going to be determined by your family and the information you learn in those deep discussions.',
            '',
            'Once you\'ve had these discussions and that (hopefully, professionally facilitated) family meeting, you\'ll find you can direct your professional advisors in the technical stuff - taxes, finances, legal documents - far more effectively. You\'ll know why you\'re taking the next steps that you\'re taking, and you\'ll feel confident that the "right" path for your family is the one you\'re already on.'
          ]
        }
      ];

      sections.forEach(section => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 12;
        }

        doc.setFont(undefined, 'bold');
        doc.setFontSize(9);
        doc.text(section.title, margin, yPosition);
        yPosition += 6;

        doc.setFont(undefined, 'normal');
        doc.setFontSize(8);

        section.content.forEach(para => {
          if (para === '') {
            yPosition += 3;
            return;
          }

          if (yPosition > 275) {
            doc.addPage();
            yPosition = 12;
          }

          const lines = doc.splitTextToSize(para, fieldWidth);
          lines.forEach((line: string) => {
            if (yPosition > 280) {
              doc.addPage();
              yPosition = 12;
            }
            doc.text(line, margin, yPosition);
            yPosition += 4;
          });
          yPosition += 2;
        });

        yPosition += 3;
      });

      if (yPosition > 270) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);
      doc.text('*The History of Canada\'s Capital Gains Tax', margin, yPosition);
      yPosition += 5;

      doc.setFont(undefined, 'normal');
      const historyText = [
        'Prior to 1972, Canada did not have a capital gains tax. In 1972, the tax was introduced as a way of equalizing the tax system, removing inheritance tax, and funding our social security system. A capital gain is the difference between the purchase price and the sale price of an asset. Only a portion of that gain is considered taxable. Over the decades since the capital gains tax was introduced, the inclusion rate - the taxable amount of the gain - has changed several times.',
        '',
        '1972-1988: 50%',
        '1988-1990: 66.67%',
        '1990-1999: 75%',
        'February 2000: 66.67%',
        'October 2000: 50%'
      ];

      historyText.forEach(line => {
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 12;
        }
        if (line === '') {
          yPosition += 3;
        } else {
          const lines = doc.splitTextToSize(line, fieldWidth);
          lines.forEach((textLine: string) => {
            if (yPosition > 280) {
              doc.addPage();
              yPosition = 12;
            }
            doc.text(textLine, margin, yPosition);
            yPosition += 4;
          });
        }
      });

      yPosition += 10;
    }

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
    const col1Width = fieldWidth * 0.25;
    const col2Width = fieldWidth * 0.25;
    const col3Width = fieldWidth * 0.25;
    const col4Width = fieldWidth * 0.25;
    let vehicleTableY = yPosition;

    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(8);

    doc.rect(margin, vehicleTableY, col1Width, vehicleCellHeight);
    doc.text('Item Description:', margin + 0.5, vehicleTableY + 4.5);

    doc.rect(margin + col1Width, vehicleTableY, col2Width, vehicleCellHeight);
    doc.text('Physical Location:', margin + col1Width + 0.5, vehicleTableY + 4.5);

    doc.rect(margin + col1Width + col2Width, vehicleTableY, col3Width, vehicleCellHeight);
    doc.text('Ownership\n(Sole/Joint):', margin + col1Width + col2Width + 0.5, vehicleTableY + 3);

    doc.rect(margin + col1Width + col2Width + col3Width, vehicleTableY, col4Width, vehicleCellHeight);
    doc.text('Insurance Provider:', margin + col1Width + col2Width + col3Width + 0.5, vehicleTableY + 4.5);

    vehicleTableY += vehicleCellHeight;

    vehicleItems.forEach((item, index) => {
      if (vehicleTableY > 275) {
        doc.addPage();
        vehicleTableY = 12;
      }

      doc.setFont(undefined, 'normal');
      doc.setFontSize(7);

      doc.rect(margin, vehicleTableY, col1Width, vehicleCellHeight);
      const lines = item.split('\n');
      lines.forEach((line, lineIndex) => {
        doc.text(line, margin + 0.5, vehicleTableY + 3.5 + (lineIndex * 3));
      });

      doc.rect(margin + col1Width, vehicleTableY, col2Width, vehicleCellHeight);
      doc.rect(margin + col1Width + col2Width, vehicleTableY, col3Width, vehicleCellHeight);
      doc.rect(margin + col1Width + col2Width + col3Width, vehicleTableY, col4Width, vehicleCellHeight);

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

    if (yPosition > 200) {
      doc.addPage();
      yPosition = 12;
    }

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
    const hCol1Width = fieldWidth * 0.25;
    const hCol2Width = fieldWidth * 0.25;
    const hCol3Width = fieldWidth * 0.25;
    const hCol4Width = fieldWidth * 0.25;
    let heirloomTableY = yPosition;

    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(8);

    doc.rect(margin, heirloomTableY, hCol1Width, heirloomCellHeight);
    doc.text('Item (Art, Jewelry,\nCollectibles)', margin + 0.5, heirloomTableY + 3.5);

    doc.rect(margin + hCol1Width, heirloomTableY, hCol2Width, heirloomCellHeight);
    doc.text('Location (e.g., Safe,\nDisplay)', margin + hCol1Width + 0.5, heirloomTableY + 3.5);

    doc.rect(margin + hCol1Width + hCol2Width, heirloomTableY, hCol3Width, heirloomCellHeight);
    doc.text('Estimated\nValue/Appraisal:', margin + hCol1Width + hCol2Width + 0.5, heirloomTableY + 3.5);

    doc.rect(margin + hCol1Width + hCol2Width + hCol3Width, heirloomTableY, hCol4Width, heirloomCellHeight);
    doc.text('Intended Beneficiary:', margin + hCol1Width + hCol2Width + hCol3Width + 0.5, heirloomTableY + 4.5);

    heirloomTableY += heirloomCellHeight;

    for (let i = 0; i < 12; i++) {
      if (heirloomTableY > 275) {
        doc.addPage();
        heirloomTableY = 12;
      }

      doc.setFont(undefined, 'normal');

      doc.rect(margin, heirloomTableY, hCol1Width, heirloomCellHeight);
      doc.rect(margin + hCol1Width, heirloomTableY, hCol2Width, heirloomCellHeight);
      doc.rect(margin + hCol1Width + hCol2Width, heirloomTableY, hCol3Width, heirloomCellHeight);
      doc.rect(margin + hCol1Width + hCol2Width + hCol3Width, heirloomTableY, hCol4Width, heirloomCellHeight);

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

    if (yPosition > 200) {
      doc.addPage();
      yPosition = 12;
    }

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
    const sCol1Width = fieldWidth * 0.25;
    const sCol2Width = fieldWidth * 0.25;
    const sCol3Width = fieldWidth * 0.25;
    const sCol4Width = fieldWidth * 0.25;
    let storageTableY = yPosition;

    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(8);

    doc.rect(margin, storageTableY, sCol1Width, storageCellHeight);
    doc.text('Storage Type:', margin + 0.5, storageTableY + 4.5);

    doc.rect(margin + sCol1Width, storageTableY, sCol2Width, storageCellHeight);
    doc.text('Physical Location:', margin + sCol1Width + 0.5, storageTableY + 4.5);

    doc.rect(margin + sCol1Width + sCol2Width, storageTableY, sCol3Width, storageCellHeight);
    doc.text('Key/Combination\nLocation:', margin + sCol1Width + sCol2Width + 0.5, storageTableY + 3.5);

    doc.rect(margin + sCol1Width + sCol2Width + sCol3Width, storageTableY, sCol4Width, storageCellHeight);
    doc.text('Box/Locker Number:', margin + sCol1Width + sCol2Width + sCol3Width + 0.5, storageTableY + 4.5);

    storageTableY += storageCellHeight;

    storageItems.forEach((item, index) => {
      if (storageTableY > 275) {
        doc.addPage();
        storageTableY = 12;
      }

      doc.setFont(undefined, 'normal');
      doc.setFontSize(7);

      doc.rect(margin, storageTableY, sCol1Width, storageCellHeight);
      doc.text(item, margin + 0.5, storageTableY + 4.5);

      doc.rect(margin + sCol1Width, storageTableY, sCol2Width, storageCellHeight);
      doc.rect(margin + sCol1Width + sCol2Width, storageTableY, sCol3Width, storageCellHeight);
      doc.rect(margin + sCol1Width + sCol2Width + sCol3Width, storageTableY, sCol4Width, storageCellHeight);

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
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text(group.heading, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 8;

      const debtsToProcess = group.debts;
      let debtStartIndex = 0;

      while (debtStartIndex < debtsToProcess.length) {
        const debtsInThisChart = debtsToProcess.slice(debtStartIndex, debtStartIndex + 3);

        if (debtStartIndex > 0) {
          if (yPosition > 150) {
            doc.addPage();
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
            doc.addPage();
            debtTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(255, 255, 255);
          doc.setFont(undefined, 'normal');
          doc.setFontSize(8);

          const labelColX = margin;
          doc.rect(labelColX, debtTableY, labelColWidth, cellHeight);
          doc.text(rowLabel, labelColX + 0.5, debtTableY + 4.5);

          for (let i = 0; i < numDebts; i++) {
            const debt = debtsInThisChart[i];
            const valueColX = margin + labelColWidth + (i * valueColWidth);
            doc.rect(valueColX, debtTableY, valueColWidth, cellHeight);

            if (rowIndex === 1 && debt.debtType) {
              doc.setFontSize(7);
              doc.text(debt.debtType, valueColX + 0.5, debtTableY + 4.5);
              doc.setFontSize(8);
            } else {
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
              doc.addPage();
              debtTableY = 12;
            }

            const valueColX = margin + labelColWidth + (i * valueColWidth);

            doc.setFillColor(240, 240, 240);
            doc.rect(margin, debtTableY, labelColWidth, cellHeight);
            doc.setFillColor(255, 255, 255);
            doc.text('Other on Loan:', margin + 0.5, debtTableY + 4.5);

            doc.rect(valueColX, debtTableY, valueColWidth, cellHeight);
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
              doc.addPage();
              debtTableY = 12;
            }

            doc.setFillColor(240, 240, 240);
            doc.rect(margin, debtTableY, labelColWidth, cellHeight);
            doc.setFillColor(255, 255, 255);
            doc.text('Other Phone:', margin + 0.5, debtTableY + 4.5);

            doc.rect(valueColX, debtTableY, valueColWidth, cellHeight);
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
            doc.addPage();
            debtTableY = 12;
          }

          const valueColX = margin + labelColWidth + (i * valueColWidth);

          doc.setFillColor(240, 240, 240);
          doc.rect(margin, debtTableY, labelColWidth, cellHeight);
          doc.setFillColor(255, 255, 255);
          doc.text('Secured/Unsecured:', margin + 0.5, debtTableY + 4.5);

          doc.rect(valueColX, debtTableY, valueColWidth, cellHeight);

          if (debt.isSecured === 'no') {
            doc.setFontSize(7);
            doc.text('Unsecured Loan', valueColX + 0.5, debtTableY + 4.5);
            doc.setFontSize(8);
          } else if (debt.isSecured === 'yes') {
            doc.setFontSize(7);
            doc.text('Secured', valueColX + 0.5, debtTableY + 4.5);
            doc.setFontSize(8);
          } else {
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
              doc.addPage();
              debtTableY = 12;
            }

            const valueColX = margin + labelColWidth + (i * valueColWidth);

            doc.setFillColor(240, 240, 240);
            doc.rect(margin, debtTableY, labelColWidth, cellHeight);
            doc.setFillColor(255, 255, 255);
            doc.text('Secured By:', margin + 0.5, debtTableY + 4.5);

            doc.rect(valueColX, debtTableY, valueColWidth, cellHeight);
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

    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(200, 200, 200);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(8);

    const col1X = margin;
    const col2X = margin + colWidths[0];
    const col3X = margin + colWidths[0] + colWidths[1];
    const col4X = margin + colWidths[0] + colWidths[1] + colWidths[2];

    doc.rect(col1X, ccTableY, colWidths[0], cellHeight);
    doc.rect(col2X, ccTableY, colWidths[1], cellHeight);
    doc.rect(col3X, ccTableY, colWidths[2], cellHeight);
    doc.rect(col4X, ccTableY, colWidths[3], cellHeight);

    doc.text('Credit Card Company:', col1X + 0.5, ccTableY + 4);
    doc.text('Last 4 Digits of the Card:', col2X + 0.5, ccTableY + 4);
    doc.text('Expiry Date:', col3X + 0.5, ccTableY + 4);
    doc.text('Other parties on this card (if applicable):', col4X + 0.5, ccTableY + 4);

    ccTableY += cellHeight;

    formData.creditCardsData.forEach((card, index) => {
      if (ccTableY > 275) {
        doc.addPage();
        ccTableY = 12;
      }

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'normal');
      doc.setFontSize(8);

      doc.rect(col1X, ccTableY, colWidths[0], cellHeight);
      doc.rect(col2X, ccTableY, colWidths[1], cellHeight);
      doc.rect(col3X, ccTableY, colWidths[2], cellHeight);
      doc.rect(col4X, ccTableY, colWidths[3], cellHeight);

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
      doc.addPage();
      yPosition = 12;
    }

    const client1Name = formData.fullName || 'Client 1';

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Credit Cards', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 8;

    doc.setFontSize(10);
    doc.text(`${client1Name} indicated that they have no credit cards.`, margin, yPosition);
    yPosition += 15;
  }

  if ((formData.maritalStatus === 'married' || formData.maritalStatus === 'common_law')) {
    if (formData.client2HasCreditCards === 'yes' && formData.client2CreditCardsData && formData.client2CreditCardsData.length > 0) {
      yPosition += 12;
      if (yPosition > 240) {
        doc.addPage();
        yPosition = 12;
      }

      const client2Name = formData.spouseName || 'Client 2';

      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(`${client2Name}'s Credit Cards`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 10;

      const cellHeight = 6;
      const colWidths = [
        fieldWidth * 0.28,
        fieldWidth * 0.22,
        fieldWidth * 0.18,
        fieldWidth * 0.32
      ];

      let ccTableY = yPosition;

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(200, 200, 200);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);

      const col1X = margin;
      const col2X = margin + colWidths[0];
      const col3X = margin + colWidths[0] + colWidths[1];
      const col4X = margin + colWidths[0] + colWidths[1] + colWidths[2];

      doc.rect(col1X, ccTableY, colWidths[0], cellHeight);
      doc.rect(col2X, ccTableY, colWidths[1], cellHeight);
      doc.rect(col3X, ccTableY, colWidths[2], cellHeight);
      doc.rect(col4X, ccTableY, colWidths[3], cellHeight);

      doc.text('Credit Card Company:', col1X + 0.5, ccTableY + 4);
      doc.text('Last 4 Digits of the Card:', col2X + 0.5, ccTableY + 4);
      doc.text('Expiry Date:', col3X + 0.5, ccTableY + 4);
      doc.text('Other parties on this card (if applicable):', col4X + 0.5, ccTableY + 4);

      ccTableY += cellHeight;

      formData.client2CreditCardsData.forEach((card, index) => {
        if (ccTableY > 275) {
          doc.addPage();
          ccTableY = 12;
        }

        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(255, 255, 255);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(8);

        doc.rect(col1X, ccTableY, colWidths[0], cellHeight);
        doc.rect(col2X, ccTableY, colWidths[1], cellHeight);
        doc.rect(col3X, ccTableY, colWidths[2], cellHeight);
        doc.rect(col4X, ccTableY, colWidths[3], cellHeight);

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
        doc.addPage();
        yPosition = 12;
      }

      const client2Name = formData.spouseName || 'Client 2';

      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(`${client2Name}'s Credit Cards`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 8;

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
      doc.addPage();
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
        doc.addPage();
        insuranceTableY = 12;
      }

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'normal');
      doc.setFontSize(8);

      const labelColX = margin;
      doc.rect(labelColX, insuranceTableY, labelColWidth, cellHeight);
      doc.text(rowLabel, labelColX + 0.5, insuranceTableY + 4.5);

      for (let i = 0; i < policyCount; i++) {
        const valueColX = margin + labelColWidth + (i * valueColWidth);
        doc.rect(valueColX, insuranceTableY, valueColWidth, cellHeight);

        const insuranceField = new doc.AcroFormTextField();
        insuranceField.fieldName = `${policyType.replace(/\s+/g, '_').toLowerCase()}_${clientName.replace(/\s+/g, '_').toLowerCase()}_${i + 1}_row_${rowIndex}`;
        insuranceField.Rect = [valueColX + 0.3, insuranceTableY + 0.3, valueColWidth - 0.6, cellHeight - 0.6];
        insuranceField.fontSize = 7;
        insuranceField.textColor = [0, 0, 0];
        insuranceField.borderStyle = 'none';
        doc.addField(insuranceField);
      }

      insuranceTableY += cellHeight;
    });

    yPosition = insuranceTableY + 15;
  };

  const generateWorkBenefitsChart = (clientName: string, hasWorkBenefits: string, isFirst: boolean = false) => {
    if (yPosition > 240) {
      doc.addPage();
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
        doc.addPage();
        workBenefitsTableY = 12;
      }

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'normal');
      doc.setFontSize(8);

      const labelColX = margin;
      doc.rect(labelColX, workBenefitsTableY, labelColWidth, cellHeight);
      doc.text(rowLabel, labelColX + 0.5, workBenefitsTableY + 4.5);

      const valueColX = margin + labelColWidth;
      doc.rect(valueColX, workBenefitsTableY, valueColWidth, cellHeight);

      const workBenefitsField = new doc.AcroFormTextField();
      workBenefitsField.fieldName = `work_benefits_${clientName.replace(/\s+/g, '_').toLowerCase()}_row_${rowIndex}`;
      workBenefitsField.Rect = [valueColX + 0.3, workBenefitsTableY + 0.3, valueColWidth - 0.6, cellHeight - 0.6];
      workBenefitsField.fontSize = 7;
      workBenefitsField.textColor = [0, 0, 0];
      workBenefitsField.borderStyle = 'none';
      doc.addField(workBenefitsField);

      workBenefitsTableY += cellHeight;
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
      doc.addPage();
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
      doc.addPage();
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
      doc.addPage();
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

  const generatePropertyInsuranceChart = (propertyLabel: string) => {
    if (yPosition > 230) {
      doc.addPage();
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
        doc.addPage();
        propertyTableY = 12;
      }

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'normal');
      doc.setFontSize(8);

      const labelColX = margin;
      doc.rect(labelColX, propertyTableY, labelColWidth, cellHeight);
      doc.text(rowLabel, labelColX + 0.5, propertyTableY + 4.5);

      const valueColX = margin + labelColWidth;
      doc.rect(valueColX, propertyTableY, valueColWidth, cellHeight);

      const propertyField = new doc.AcroFormTextField();
      propertyField.fieldName = `property_${propertyLabel.replace(/\s+/g, '_').toLowerCase()}_row_${rowIndex}`;
      propertyField.Rect = [valueColX + 0.3, propertyTableY + 0.3, valueColWidth - 0.6, cellHeight - 0.6];
      propertyField.fontSize = 7;
      propertyField.textColor = [0, 0, 0];
      propertyField.borderStyle = 'none';
      doc.addField(propertyField);

      propertyTableY += cellHeight;
    });

    yPosition = propertyTableY + 15;
  };

  if (formData.hasHomeInsurance) {
    if (yPosition > 240) {
      doc.addPage();
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
      generatePropertyInsuranceChart('Primary Home Insurance');

      if (formData.hasAdditionalProperties === 'yes' && formData.additionalPropertiesCount) {
        const additionalCount = parseInt(formData.additionalPropertiesCount);
        for (let i = 1; i <= additionalCount; i++) {
          generatePropertyInsuranceChart(`Additional Property ${i} Insurance`);
        }
      }
    }
  }

  const generateVehicleInsuranceChart = (vehicleLabel: string, clientName: string) => {
    if (yPosition > 230) {
      doc.addPage();
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

    const cellHeight = 7;
    const labelColWidth = fieldWidth * 0.35;
    const valueColWidth = fieldWidth - labelColWidth;
    let vehicleTableY = yPosition;

    vehicleRows.forEach((rowLabel, rowIndex) => {
      if (vehicleTableY > 275) {
        doc.addPage();
        vehicleTableY = 12;
      }

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'normal');
      doc.setFontSize(8);

      const labelColX = margin;
      doc.rect(labelColX, vehicleTableY, labelColWidth, cellHeight);
      doc.text(rowLabel, labelColX + 0.5, vehicleTableY + 4.5);

      const valueColX = margin + labelColWidth;
      doc.rect(valueColX, vehicleTableY, valueColWidth, cellHeight);

      const vehicleField = new doc.AcroFormTextField();
      vehicleField.fieldName = `vehicle_${vehicleLabel.replace(/\s+/g, '_').toLowerCase()}_${clientName.replace(/\s+/g, '_').toLowerCase()}_row_${rowIndex}`;
      vehicleField.Rect = [valueColX + 0.3, vehicleTableY + 0.3, valueColWidth - 0.6, cellHeight - 0.6];
      vehicleField.fontSize = 7;
      vehicleField.textColor = [0, 0, 0];
      vehicleField.borderStyle = 'none';
      doc.addField(vehicleField);

      vehicleTableY += cellHeight;
    });

    yPosition = vehicleTableY + 15;
  };

  if (formData.client1HasVehicleInsurance === 'yes' || formData.client2HasVehicleInsurance === 'yes') {
    if (yPosition > 240) {
      doc.addPage();
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
      generateVehicleInsuranceChart(`Vehicle ${vehicleNumber}`, formData.fullName || 'Client 1');
      vehicleNumber++;
    }

    if (formData.client2HasVehicleInsurance === 'yes') {
      generateVehicleInsuranceChart(`Vehicle ${vehicleNumber}`, formData.spouseName || 'Client 2');
      vehicleNumber++;
    }

    if (formData.hasAdditionalVehicles === 'yes' && formData.additionalVehiclesCount) {
      const additionalCount = parseInt(formData.additionalVehiclesCount);
      for (let i = 0; i < additionalCount; i++) {
        generateVehicleInsuranceChart(`Vehicle ${vehicleNumber}`, 'Additional Vehicle');
        vehicleNumber++;
      }
    }
  }

  if (formData.client1HasVehicleInsurance === 'no' &&
      (formData.client2HasVehicleInsurance === 'no' || !formData.client2HasVehicleInsurance)) {
    if (yPosition > 240) {
      doc.addPage();
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
    doc.addPage();
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
      doc.addPage();
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
      doc.addPage();
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
      doc.addPage();
      yPosition = 12;
    }
    doc.text(line, margin, yPosition);
    yPosition += 4;
  });
  yPosition += 6;

  // Warning - Social Media Scams
  if (yPosition > 240) {
    doc.addPage();
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
      doc.addPage();
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
      doc.addPage();
      yPosition = 12;
    }
    const bulletText = `•  ${item}`;
    const splitBullet = doc.splitTextToSize(bulletText, fieldWidth - 3);
    splitBullet.forEach((line: string, idx: number) => {
      if (yPosition > 275) {
        doc.addPage();
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
      doc.addPage();
      yPosition = 12;
    }
    doc.text(line, margin, yPosition);
    yPosition += 4;
  });
  yPosition += 8;

  // Key things to Prepare
  if (yPosition > 240) {
    doc.addPage();
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
      doc.addPage();
      yPosition = 12;
    }
    doc.text(line, margin, yPosition);
    yPosition += 4;
  });
  yPosition += 5;

  if (yPosition > 220) {
    doc.addPage();
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
  doc.setDrawColor(0, 0, 0);
  doc.setFillColor(255, 255, 255);
  doc.setFont(undefined, 'bold');
  doc.setFontSize(7);

  hardwareHeaders.forEach((header, colIndex) => {
    const colX = margin + (colIndex * hardwareColWidth);
    doc.rect(colX, hardwareTableY, hardwareColWidth, hardwareCellHeight);
    doc.text(header, colX + 0.5, hardwareTableY + 4.5);
  });
  hardwareTableY += hardwareCellHeight;

  // Rows
  doc.setFont(undefined, 'normal');
  doc.setFillColor(255, 255, 255);

  hardwareRows.forEach((rowLabel, rowIndex) => {
    if (hardwareTableY > 270) {
      doc.addPage();
      hardwareTableY = 12;
    }

    // First column (label)
    doc.rect(margin, hardwareTableY, hardwareColWidth, hardwareCellHeight);

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
      doc.rect(colX, hardwareTableY, hardwareColWidth, hardwareCellHeight);

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
    doc.addPage();
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
      doc.addPage();
      yPosition = 12;
    }
    doc.text(line, margin, yPosition);
    yPosition += 4;
  });
  yPosition += 5;

  if (yPosition > 200) {
    doc.addPage();
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
      doc.addPage();
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
    doc.addPage();
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
      doc.addPage();
      yPosition = 12;
    }
    doc.text(line, margin, yPosition);
    yPosition += 4;
  });
  yPosition += 5;

  if (yPosition > 200) {
    doc.addPage();
    yPosition = 12;
  }

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
    if (financialTableY > 270) {
      doc.addPage();
      financialTableY = 12;
    }

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
      doc.addPage();
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
      const pensionCol1Width = fieldWidth * 0.35;
      const pensionCol2Width = fieldWidth * 0.25;
      const pensionCol3Width = fieldWidth * 0.40;
      let pensionTableY = yPosition;

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);

      // Header row
      doc.rect(margin, pensionTableY, pensionCol1Width, pensionCellHeight);
      doc.text('Employer Name:', margin + 0.5, pensionTableY + 4.5);

      doc.rect(margin + pensionCol1Width, pensionTableY, pensionCol2Width, pensionCellHeight);
      doc.text('Employment Status:', margin + pensionCol1Width + 0.5, pensionTableY + 4.5);

      doc.rect(margin + pensionCol1Width + pensionCol2Width, pensionTableY, pensionCol3Width, pensionCellHeight);
      doc.text('Location of Pension Information:', margin + pensionCol1Width + pensionCol2Width + 0.5, pensionTableY + 4.5);

      pensionTableY += pensionCellHeight;
      doc.setFont(undefined, 'normal');

      // Data rows
      for (let i = 0; i < client1PensionsData.length; i++) {
        if (pensionTableY > 275) {
          doc.addPage();
          pensionTableY = 12;
        }

        const pension = client1PensionsData[i];

        // Employer Name column
        doc.rect(margin, pensionTableY, pensionCol1Width, pensionCellHeight);
        const employerField = new doc.AcroFormTextField();
        employerField.fieldName = `client1_pension_employer_${i}`;
        employerField.Rect = [margin + 0.3, pensionTableY + 0.3, pensionCol1Width - 0.6, pensionCellHeight - 0.6];
        employerField.fontSize = 7;
        employerField.textColor = [0, 0, 0];
        employerField.borderStyle = 'none';
        employerField.value = pension?.employer || '';
        doc.addField(employerField);

        // Employment Status column
        doc.rect(margin + pensionCol1Width, pensionTableY, pensionCol2Width, pensionCellHeight);
        const statusField = new doc.AcroFormTextField();
        statusField.fieldName = `client1_pension_status_${i}`;
        statusField.Rect = [margin + pensionCol1Width + 0.3, pensionTableY + 0.3, pensionCol2Width - 0.6, pensionCellHeight - 0.6];
        statusField.fontSize = 7;
        statusField.textColor = [0, 0, 0];
        statusField.borderStyle = 'none';
        statusField.value = pension?.stillWorking === 'yes' ? 'Currently Employed' : 'Past Employer';
        doc.addField(statusField);

        // Document Location column
        doc.rect(margin + pensionCol1Width + pensionCol2Width, pensionTableY, pensionCol3Width, pensionCellHeight);
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
      const pensionCol1Width = fieldWidth * 0.35;
      const pensionCol2Width = fieldWidth * 0.25;
      const pensionCol3Width = fieldWidth * 0.40;
      let pensionTableY = yPosition;

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);

      // Header row
      doc.rect(margin, pensionTableY, pensionCol1Width, pensionCellHeight);
      doc.text('Employer Name:', margin + 0.5, pensionTableY + 4.5);

      doc.rect(margin + pensionCol1Width, pensionTableY, pensionCol2Width, pensionCellHeight);
      doc.text('Employment Status:', margin + pensionCol1Width + 0.5, pensionTableY + 4.5);

      doc.rect(margin + pensionCol1Width + pensionCol2Width, pensionTableY, pensionCol3Width, pensionCellHeight);
      doc.text('Location of Pension Information:', margin + pensionCol1Width + pensionCol2Width + 0.5, pensionTableY + 4.5);

      pensionTableY += pensionCellHeight;
      doc.setFont(undefined, 'normal');

      // Data rows
      for (let i = 0; i < client2PensionsData.length; i++) {
        if (pensionTableY > 275) {
          doc.addPage();
          pensionTableY = 12;
        }

        const pension = client2PensionsData[i];

        // Employer Name column
        doc.rect(margin, pensionTableY, pensionCol1Width, pensionCellHeight);
        const employerField = new doc.AcroFormTextField();
        employerField.fieldName = `client2_pension_employer_${i}`;
        employerField.Rect = [margin + 0.3, pensionTableY + 0.3, pensionCol1Width - 0.6, pensionCellHeight - 0.6];
        employerField.fontSize = 7;
        employerField.textColor = [0, 0, 0];
        employerField.borderStyle = 'none';
        employerField.value = pension?.employer || '';
        doc.addField(employerField);

        // Employment Status column
        doc.rect(margin + pensionCol1Width, pensionTableY, pensionCol2Width, pensionCellHeight);
        const statusField = new doc.AcroFormTextField();
        statusField.fieldName = `client2_pension_status_${i}`;
        statusField.Rect = [margin + pensionCol1Width + 0.3, pensionTableY + 0.3, pensionCol2Width - 0.6, pensionCellHeight - 0.6];
        statusField.fontSize = 7;
        statusField.textColor = [0, 0, 0];
        statusField.borderStyle = 'none';
        statusField.value = pension?.stillWorking === 'yes' ? 'Currently Employed' : 'Past Employer';
        doc.addField(statusField);

        // Document Location column
        doc.rect(margin + pensionCol1Width + pensionCol2Width, pensionTableY, pensionCol3Width, pensionCellHeight);
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

  // Add new page for additional information
  doc.addPage();
  yPosition = 30;
  addPageHeader();

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

  // Add footer to final page
  addPageFooter();

  const fileName = `estate-planning-${formData.fullName?.replace(/\s+/g, '-').toLowerCase() || 'form'}.pdf`;
  doc.save(fileName);
};
