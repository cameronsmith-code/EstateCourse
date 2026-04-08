const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1900; year--) {
    years.push({ value: year.toString(), label: year.toString() });
  }
  return years;
};

export type StepQuestion = {
  key: string;
  label: string | ((answers: Map<number, Record<string, unknown>>) => string);
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'email' | 'date' | 'number';
  placeholder?: string;
  options?: Array<{ value: string; label: string }> | (() => Array<{ value: string; label: string }>);
  required?: boolean;
  videoUrl?: string;
  description?: string;
  condition?: (formData: Record<string, string>) => boolean;
  max?: number;
};

export type Step = {
  id: number;
  title: string;
  description?: string;
  questions: StepQuestion[];
  videoUrl?: string;
};

export const STEPS: Step[] = [
  {
    id: 1,
    title: 'Basic Information',
    description: 'Let\'s get started with a few quick questions',
    questions: [
      {
        key: 'fullName',
        label: 'What is your full name?',
        type: 'text',
        placeholder: 'Enter your full name',
        required: true,
      },
      {
        key: 'dateOfBirth',
        label: 'Date of Birth',
        type: 'date',
        required: true,
      },
      {
        key: 'address',
        label: 'Address',
        type: 'text',
        placeholder: 'Enter your street address',
        required: true,
      },
      {
        key: 'city',
        label: 'City',
        type: 'text',
        placeholder: 'Enter your city',
        required: true,
      },
      {
        key: 'province',
        label: 'Province',
        type: 'text',
        placeholder: 'Enter your province',
        required: true,
      },
      {
        key: 'postalCode',
        label: 'Postal Code',
        type: 'text',
        placeholder: 'Enter your postal code',
        required: true,
      },
      {
        key: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'Enter your email address',
        required: true,
      },
      {
        key: 'phone',
        label: 'Phone Number',
        type: 'text',
        placeholder: 'Enter your phone number',
        required: true,
      },
      {
        key: 'maritalStatus',
        label: 'Marital Status',
        type: 'select',
        options: [
          { value: 'single', label: 'Single' },
          { value: 'married', label: 'Married' },
          { value: 'divorced', label: 'Divorced' },
          { value: 'widowed', label: 'Widowed' },
          { value: 'legally_separated', label: 'Legally Separated' },
          { value: 'common_law', label: 'Common-Law' },
        ],
        required: true,
      },
      {
        key: 'spouseName',
        label: 'Spouse or common law partner\'s name',
        type: 'text',
        placeholder: 'Enter spouse/partner\'s name',
        required: false,
      },
      {
        key: 'hasMarriageContract',
        label: 'Do you have a marriage contract (prenuptial agreement)?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'marriageContractLocation',
        label: 'Where is the marriage contract located?',
        type: 'text',
        placeholder: 'Enter location of marriage contract',
        required: false,
      },
      {
        key: 'client1HasPreviousRelationship',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName || 'Client 1';
          return `${client1Name}, have you previously been married or in a common law relationship?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'client1NumberOfPreviousRelationships',
        label: 'How many previous marriages or common law relationships have you had?',
        type: 'number',
        placeholder: '0',
        required: false,
      },
      {
        key: 'spouseSameAddress',
        label: 'Do they live at the same address?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'spouseDateOfBirth',
        label: 'Spouse Date of Birth',
        type: 'date',
        required: false,
      },
      {
        key: 'spouseAddress',
        label: 'Spouse Address',
        type: 'text',
        placeholder: 'Enter spouse street address',
        required: false,
      },
      {
        key: 'spouseCity',
        label: 'Spouse City',
        type: 'text',
        placeholder: 'Enter spouse city',
        required: false,
      },
      {
        key: 'spouseProvince',
        label: 'Spouse Province',
        type: 'text',
        placeholder: 'Enter spouse province',
        required: false,
      },
      {
        key: 'spousePostalCode',
        label: 'Spouse Postal Code',
        type: 'text',
        placeholder: 'Enter spouse postal code',
        required: false,
      },
      {
        key: 'spouseEmail',
        label: 'Spouse Email Address',
        type: 'email',
        placeholder: 'Enter spouse email address',
        required: false,
      },
      {
        key: 'spousePhone',
        label: 'Spouse Phone Number',
        type: 'text',
        placeholder: 'Enter spouse phone number',
        required: false,
      },
      {
        key: 'client2HasPreviousRelationship',
        label: 'Has your spouse previously been married or in a common law relationship?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client2NumberOfPreviousRelationships',
        label: 'How many previous marriages or common law relationships has your spouse had?',
        type: 'number',
        placeholder: '0',
        required: false,
      },
      {
        key: 'hasChildren',
        label: 'Do you have children?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'numberOfChildren',
        label: 'How many children do you have?',
        type: 'number',
        placeholder: 'Enter number of children',
        required: false,
      },
    ],
  },
  {
    id: 2,
    title: 'Previous Relationships',
    description: 'Please provide details about previous marriages or common law relationships',
    questions: [],
  },
  {
    id: 3,
    title: 'Children Information',
    description: 'Please provide details about each of your children',
    questions: [],
  },
  {
    id: 4,
    title: 'Family Trusts',
    description: 'Information about family trusts you have established',
    questions: [
      {
        key: 'hasFamilyTrust',
        label: 'Have you established a family trust?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'trustLegalName',
        label: 'What is the Trust\'s legal name?',
        type: 'text',
        placeholder: 'Enter the trust\'s legal name',
        required: false,
      },
      {
        key: 'trustDeedLocation',
        label: 'Where is the Trust Deed located?',
        type: 'text',
        placeholder: 'e.g., Safe deposit box, lawyer\'s office, home safe',
        required: false,
      },
      {
        key: 'trustYearEstablished',
        label: 'What year was the Trust established?',
        type: 'number',
        placeholder: 'Enter year (e.g., 2020)',
        required: false,
      },
      {
        key: 'trustBeneficiariesCount',
        label: 'How many beneficiaries are there for the Trust?',
        type: 'number',
        placeholder: 'Enter number of beneficiaries',
        required: false,
      },
    ],
  },
  {
    id: 5,
    title: 'Sole Proprietorships and Partnerships',
    description: 'Information about any non-incorporated businesses you have an interest in.',
    questions: [
      {
        key: 'hasPartnership',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName || 'Client 1';
          return `${client1Name}, do you have ownership interests in a partnership?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'partnershipName',
        label: 'Business Name:',
        type: 'text',
        placeholder: 'Enter partnership name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasPartnership === 'yes',
      },
      {
        key: 'client2HasPartnership',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName || 'Client 2';
          return `${client2Name}, do you have ownership interests in a partnership?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          const maritalStatus = formData.maritalStatus;
          return maritalStatus === 'married' || maritalStatus === 'common_law';
        },
      },
      {
        key: 'client2PartnershipName',
        label: 'Business Name:',
        type: 'text',
        placeholder: 'Enter partnership name',
        required: false,
        condition: (formData: Record<string, string>) => {
          const maritalStatus = formData.maritalStatus;
          const hasSpouse = maritalStatus === 'married' || maritalStatus === 'common_law';
          return hasSpouse && formData.client2HasPartnership === 'yes';
        },
      },
    ],
  },
  {
    id: 6,
    title: 'Corporate Information',
    description: 'Information about corporations you own',
    questions: [
      {
        key: 'ownsCorporation',
        label: 'Do you own a corporation?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'numberOfCorporations',
        label: 'How many corporations do you own?',
        type: 'select',
        options: [
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
          { value: '4', label: '4' },
          { value: '5', label: '5' },
          { value: '6', label: '6' },
          { value: '7', label: '7' },
          { value: '8', label: '8' },
          { value: '9', label: '9' },
          { value: '10', label: '10' },
          { value: '11', label: '11' },
          { value: '12', label: '12' },
          { value: '13', label: '13' },
          { value: '14', label: '14' },
          { value: '15', label: '15' },
        ],
        required: false,
      },
    ],
  },
  {
    id: 7,
    title: 'Who is on your Team?',
    description: 'This section lists the core professionals who already know your history.',
    questions: [
      {
        key: 'client1HasWill',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName || 'Client 1';
          return `${client1Name}, do you have a Will?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'client1WillYear',
        label: (answers) => {
          const client1FirstName = (answers.get(1)?.fullName as string || 'Client 1').split(' ')[0];
          return `${client1FirstName}, in what year was your most recent Will prepared?`;
        },
        type: 'select',
        placeholder: 'Select year',
        options: generateYearOptions,
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasWill === 'yes',
      },
      {
        key: 'client1WillPreparedInCanada',
        label: (answers) => {
          const client1FirstName = (answers.get(1)?.fullName as string || 'Client 1').split(' ')[0];
          return `${client1FirstName}, was your Will prepared in Canada?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasWill === 'yes',
      },
      {
        key: 'client1WillCountry',
        label: (answers) => {
          const client1FirstName = (answers.get(1)?.fullName as string || 'Client 1').split(' ')[0];
          return `In what country was ${client1FirstName}'s Will prepared in?`;
        },
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasWill === 'yes' && formData.client1WillPreparedInCanada === 'no',
      },
      {
        key: 'client1WillProvince',
        label: (answers) => {
          const client1FirstName = (answers.get(1)?.fullName as string || 'Client 1').split(' ')[0];
          return `In what Province/Territory was ${client1FirstName}'s Will prepared in?`;
        },
        type: 'select',
        options: [
          { value: 'alberta', label: 'Alberta' },
          { value: 'british_columbia', label: 'British Columbia' },
          { value: 'manitoba', label: 'Manitoba' },
          { value: 'new_brunswick', label: 'New Brunswick' },
          { value: 'newfoundland_labrador', label: 'Newfoundland and Labrador' },
          { value: 'northwest_territories', label: 'Northwest Territories' },
          { value: 'nova_scotia', label: 'Nova Scotia' },
          { value: 'nunavut', label: 'Nunavut' },
          { value: 'ontario', label: 'Ontario' },
          { value: 'prince_edward_island', label: 'Prince Edward Island' },
          { value: 'quebec', label: 'Quebec' },
          { value: 'saskatchewan', label: 'Saskatchewan' },
          { value: 'yukon', label: 'Yukon' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasWill === 'yes' && formData.client1WillPreparedInCanada === 'yes',
      },
      {
        key: 'client1WillStorageLocation',
        label: (answers) => {
          const client1FirstName = (answers.get(1)?.fullName as string || 'Client 1').split(' ')[0];
          return `${client1FirstName}, where is your most recent Will stored ('wet ink'/original copy)?`;
        },
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasWill === 'yes',
      },
      {
        key: 'client1HasDigitalWillCopy',
        label: (answers) => {
          const client1FirstName = (answers.get(1)?.fullName as string || 'Client 1').split(' ')[0];
          return `${client1FirstName}, do you have a digital copy safely stored?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasWill === 'yes',
      },
      {
        key: 'client1DigitalWillLocation',
        label: 'Where is the digital copy stored?',
        type: 'text',
        placeholder: 'Enter digital storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasWill === 'yes' && formData.client1HasDigitalWillCopy === 'yes',
      },
      {
        key: 'client1HasSecondaryWill',
        label: (answers) => {
          const client1FirstName = (answers.get(1)?.fullName as string || 'Client 1').split(' ')[0];
          return `${client1FirstName}, do you have a Secondary Will?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasWill === 'yes',
      },
      {
        key: 'client1SecondaryWillSameTimeAndJurisdiction',
        label: (answers) => {
          const client1FirstName = (answers.get(1)?.fullName as string || 'Client 1').split(' ')[0];
          return `${client1FirstName}, was the Secondary Will prepared at the same time and same jurisdiction as the Primary Will?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasWill === 'yes' && formData.client1HasSecondaryWill === 'yes',
      },
      {
        key: 'client1SecondaryWillJurisdiction',
        label: (answers) => {
          const client1FirstName = (answers.get(1)?.fullName as string || 'Client 1').split(' ')[0];
          return `${client1FirstName}, in what jurisdiction was your Secondary Will prepared in?`;
        },
        type: 'text',
        placeholder: 'Enter jurisdiction',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasWill === 'yes' && formData.client1HasSecondaryWill === 'yes' && formData.client1SecondaryWillSameTimeAndJurisdiction === 'no',
      },
      {
        key: 'client1SecondaryWillDate',
        label: (answers) => {
          const client1FirstName = (answers.get(1)?.fullName as string || 'Client 1').split(' ')[0];
          return `${client1FirstName}, what date was your Secondary Will prepared on?`;
        },
        type: 'date',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasWill === 'yes' && formData.client1HasSecondaryWill === 'yes' && formData.client1SecondaryWillSameTimeAndJurisdiction === 'no',
      },
      {
        key: 'client1HasWillMeaningfulChanges',
        label: (answers) => {
          const client1FirstName = (answers.get(1)?.fullName as string || 'Client 1').split(' ')[0];
          return `${client1FirstName}, since creating your Will, have there been any meaningful changes in your life, family, or financial situation that could affect your wishes? Such as:\n• Marriage, separation, or divorce\n• Birth or adoption of children/grandchildren\n• Death or incapacity of a beneficiary, executor, or guardian\n• Significant changes in assets (real estate, business interests, investments)\n• Changes in residency or tax jurisdiction`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasWill === 'yes',
      },
      {
        key: 'client1WillMeaningfulChangesDetails',
        label: (answers) => {
          const client1FirstName = (answers.get(1)?.fullName as string || 'Client 1').split(' ')[0];
          return `${client1FirstName}, please describe the meaningful changes:`;
        },
        type: 'textarea',
        placeholder: 'Describe the meaningful changes',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasWill === 'yes' && formData.client1HasWillMeaningfulChanges === 'yes',
      },
      {
        key: 'client1HasHensonTrust',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName as string || 'Client 1';
          const childrenData = answers.get(3)?.childrenData as any[];
          const disabledChild = childrenData?.find((child: any) => child?.disabled === 'yes');
          const disabledChildName = disabledChild?.name || 'your disabled child';
          return `${client1Name}, with respect to ${disabledChildName}, have you included an 'Absolute Discretionary Trust' ("Henson Trust" in Ontario) in your Will?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          const childrenData = formData.childrenData as any;
          const hasDisabledChild = childrenData && Array.isArray(childrenData) && childrenData.some((child: any) => child?.disabled === 'yes');
          return formData.client1HasWill === 'yes' && hasDisabledChild;
        },
      },
      {
        key: 'client2HasWill',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName || 'Client 2';
          return `${client2Name}, do you have a Will?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client2WillYear',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `${client2FirstName}, in what year was your most recent Will prepared?`;
        },
        type: 'select',
        placeholder: 'Select year',
        options: generateYearOptions,
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasWill === 'yes',
      },
      {
        key: 'client2WillPreparedInCanada',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `${client2FirstName}, was your Will prepared in Canada?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasWill === 'yes',
      },
      {
        key: 'client2WillCountry',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `In what country was ${client2FirstName}'s Will prepared in?`;
        },
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasWill === 'yes' && formData.client2WillPreparedInCanada === 'no',
      },
      {
        key: 'client2WillProvince',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `In what Province/Territory was ${client2FirstName}'s Will prepared in?`;
        },
        type: 'select',
        options: [
          { value: 'alberta', label: 'Alberta' },
          { value: 'british_columbia', label: 'British Columbia' },
          { value: 'manitoba', label: 'Manitoba' },
          { value: 'new_brunswick', label: 'New Brunswick' },
          { value: 'newfoundland_labrador', label: 'Newfoundland and Labrador' },
          { value: 'northwest_territories', label: 'Northwest Territories' },
          { value: 'nova_scotia', label: 'Nova Scotia' },
          { value: 'nunavut', label: 'Nunavut' },
          { value: 'ontario', label: 'Ontario' },
          { value: 'prince_edward_island', label: 'Prince Edward Island' },
          { value: 'quebec', label: 'Quebec' },
          { value: 'saskatchewan', label: 'Saskatchewan' },
          { value: 'yukon', label: 'Yukon' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasWill === 'yes' && formData.client2WillPreparedInCanada === 'yes',
      },
      {
        key: 'client2WillStorageLocation',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `${client2FirstName}, where is your most recent Will stored ('wet ink'/original copy)?`;
        },
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasWill === 'yes',
      },
      {
        key: 'client2HasDigitalWillCopy',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `${client2FirstName}, do you have a digital copy safely stored?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasWill === 'yes',
      },
      {
        key: 'client2DigitalWillLocation',
        label: 'Where is the digital copy stored?',
        type: 'text',
        placeholder: 'Enter digital storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasWill === 'yes' && formData.client2HasDigitalWillCopy === 'yes',
      },
      {
        key: 'client2HasSecondaryWill',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `${client2FirstName}, do you have a Secondary Will?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasWill === 'yes',
      },
      {
        key: 'client2SecondaryWillSameTimeAndJurisdiction',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `${client2FirstName}, was the Secondary Will prepared at the same time and same jurisdiction as the Primary Will?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasWill === 'yes' && formData.client2HasSecondaryWill === 'yes',
      },
      {
        key: 'client2SecondaryWillJurisdiction',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `${client2FirstName}, in what jurisdiction was your Secondary Will prepared in?`;
        },
        type: 'text',
        placeholder: 'Enter jurisdiction',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasWill === 'yes' && formData.client2HasSecondaryWill === 'yes' && formData.client2SecondaryWillSameTimeAndJurisdiction === 'no',
      },
      {
        key: 'client2SecondaryWillDate',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `${client2FirstName}, what date was your Secondary Will prepared on?`;
        },
        type: 'date',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasWill === 'yes' && formData.client2HasSecondaryWill === 'yes' && formData.client2SecondaryWillSameTimeAndJurisdiction === 'no',
      },
      {
        key: 'client2HasWillMeaningfulChanges',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `${client2FirstName}, since creating your Will, have there been any meaningful changes in your life, family, or financial situation that could affect your wishes? Such as:\n• Marriage, separation, or divorce\n• Birth or adoption of children/grandchildren\n• Death or incapacity of a beneficiary, executor, or guardian\n• Significant changes in assets (real estate, business interests, investments)\n• Changes in residency or tax jurisdiction`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasWill === 'yes',
      },
      {
        key: 'client2WillMeaningfulChangesDetails',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `${client2FirstName}, please describe the meaningful changes:`;
        },
        type: 'textarea',
        placeholder: 'Describe the meaningful changes',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasWill === 'yes' && formData.client2HasWillMeaningfulChanges === 'yes',
      },
      {
        key: 'client1HasPoaPersonalCare',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName as string || 'Client 1';
          return `${client1Name}, have you named a Power of Attorney for Personal Care?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'client1SpouseIsPoaPersonalCare',
        label: (answers) => {
          const spouseName = answers.get(1)?.spouseName as string || 'your spouse or common law partner';
          return `Is ${spouseName} your Power of Attorney for Personal Care?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const maritalStatus = basicAnswers.maritalStatus as string;
          const hasSpouse = (maritalStatus === 'married' || maritalStatus === 'common_law') && basicAnswers.spouseName;
          return formData.client1HasPoaPersonalCare === 'yes' && hasSpouse;
        },
      },
      {
        key: 'client1PoaPersonalCareName',
        label: "Power of Attorney for Personal Care's Name:",
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' && (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no');
        },
      },
      {
        key: 'client1PoaPersonalCarePhone',
        label: 'Phone Number:',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' && (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no');
        },
      },
      {
        key: 'client1PoaPersonalCareEmail',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' && (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no');
        },
      },
      {
        key: 'client1PoaPersonalCareRelationship',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName as string || 'Client 1';
          return `Relationship to ${client1Name}:`;
        },
        type: 'text',
        placeholder: 'Enter relationship',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' && (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no');
        },
      },
      {
        key: 'client1PoaPersonalCareIsCanadaResident',
        label: 'Is this person a resident of Canada?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' && (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no');
        },
      },
      {
        key: 'client1PoaPersonalCareCountry',
        label: 'Which country is this person a resident of?',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' && (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no') && formData.client1PoaPersonalCareIsCanadaResident === 'no';
        },
      },
      {
        key: 'client1PoaPersonalCareProvince',
        label: 'Which Province or Territory is this person a resident of?',
        type: 'select',
        options: [
          { value: 'alberta', label: 'Alberta' },
          { value: 'british_columbia', label: 'British Columbia' },
          { value: 'manitoba', label: 'Manitoba' },
          { value: 'new_brunswick', label: 'New Brunswick' },
          { value: 'newfoundland_labrador', label: 'Newfoundland and Labrador' },
          { value: 'northwest_territories', label: 'Northwest Territories' },
          { value: 'nova_scotia', label: 'Nova Scotia' },
          { value: 'nunavut', label: 'Nunavut' },
          { value: 'ontario', label: 'Ontario' },
          { value: 'prince_edward_island', label: 'Prince Edward Island' },
          { value: 'quebec', label: 'Quebec' },
          { value: 'saskatchewan', label: 'Saskatchewan' },
          { value: 'yukon', label: 'Yukon' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' && (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no') && formData.client1PoaPersonalCareIsCanadaResident === 'yes';
        },
      },
      {
        key: 'client1PoaPersonalCareCity',
        label: 'City of Residence:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' && (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no');
        },
      },
      {
        key: 'client1PoaPersonalCareHasDocCopy',
        label: (answers) => {
          const client1FirstName = (answers.get(1)?.fullName as string || 'Client 1').split(' ')[0];
          return `${client1FirstName}, does this person have a copy of your most recent Power of Attorney for Personal Care document?`;
        },
        type: 'radio',
        options: [
          { value: 'yes_on_file', label: 'Yes, on their files' },
          { value: 'no_can_access', label: 'No, but they know how to access the document if/when necessary' },
          { value: 'no_not_discussed', label: 'No, this has not been discussed' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' && (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no');
        },
      },
      {
        key: 'client1HasAlternatePoaPersonalCare',
        label: 'Have you named an alternate attorney, should this person be unable or unwilling to act?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaPersonalCare1Name',
        label: "Alternate Power of Attorney for Personal Care's Name:",
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no') &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaPersonalCare1Phone',
        label: 'Phone Number:',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no') &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaPersonalCare1Email',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no') &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaPersonalCare1Relationship',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName as string || 'Client 1';
          return `Relationship to ${client1Name}:`;
        },
        type: 'text',
        placeholder: 'Enter relationship',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no') &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaPersonalCare1IsCanadaResident',
        label: 'Is this person a resident of Canada?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no') &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaPersonalCare1Country',
        label: 'Which country is this person a resident of?',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no') &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client1AlternatePoaPersonalCare1IsCanadaResident === 'no';
        },
      },
      {
        key: 'client1AlternatePoaPersonalCare1Province',
        label: 'Which Province or Territory is this person a resident of?',
        type: 'select',
        options: [
          { value: 'alberta', label: 'Alberta' },
          { value: 'british_columbia', label: 'British Columbia' },
          { value: 'manitoba', label: 'Manitoba' },
          { value: 'new_brunswick', label: 'New Brunswick' },
          { value: 'newfoundland_labrador', label: 'Newfoundland and Labrador' },
          { value: 'northwest_territories', label: 'Northwest Territories' },
          { value: 'nova_scotia', label: 'Nova Scotia' },
          { value: 'nunavut', label: 'Nunavut' },
          { value: 'ontario', label: 'Ontario' },
          { value: 'prince_edward_island', label: 'Prince Edward Island' },
          { value: 'quebec', label: 'Quebec' },
          { value: 'saskatchewan', label: 'Saskatchewan' },
          { value: 'yukon', label: 'Yukon' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no') &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client1AlternatePoaPersonalCare1IsCanadaResident === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaPersonalCare1City',
        label: 'City of Residence:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no') &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaPersonalCare1HasDocCopy',
        label: (answers) => {
          const client1FirstName = (answers.get(1)?.fullName as string || 'Client 1').split(' ')[0];
          return `${client1FirstName}, does this person have a copy of your most recent Power of Attorney for Personal Care document?`;
        },
        type: 'radio',
        options: [
          { value: 'yes_on_file', label: 'Yes, on their files' },
          { value: 'no_can_access', label: 'No, but they know how to access the document if/when necessary' },
          { value: 'no_not_discussed', label: 'No, this has not been discussed' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no') &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client1HasAlternatePoaPersonalCare2',
        label: 'Have you named an additional alternate attorney, should this person be unable or unwilling to act?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no') &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaPersonalCare2Name',
        label: "Alternate Power of Attorney for Personal Care's Name:",
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no') &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client1HasAlternatePoaPersonalCare2 === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaPersonalCare2Phone',
        label: 'Phone Number:',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no') &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client1HasAlternatePoaPersonalCare2 === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaPersonalCare2Email',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no') &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client1HasAlternatePoaPersonalCare2 === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaPersonalCare2Relationship',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName as string || 'Client 1';
          return `Relationship to ${client1Name}:`;
        },
        type: 'text',
        placeholder: 'Enter relationship',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no') &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client1HasAlternatePoaPersonalCare2 === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaPersonalCare2IsCanadaResident',
        label: 'Is this person a resident of Canada?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no') &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client1HasAlternatePoaPersonalCare2 === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaPersonalCare2Country',
        label: 'Which country is this person a resident of?',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no') &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client1HasAlternatePoaPersonalCare2 === 'yes' &&
                 formData.client1AlternatePoaPersonalCare2IsCanadaResident === 'no';
        },
      },
      {
        key: 'client1AlternatePoaPersonalCare2Province',
        label: 'Which Province or Territory is this person a resident of?',
        type: 'select',
        options: [
          { value: 'alberta', label: 'Alberta' },
          { value: 'british_columbia', label: 'British Columbia' },
          { value: 'manitoba', label: 'Manitoba' },
          { value: 'new_brunswick', label: 'New Brunswick' },
          { value: 'newfoundland_labrador', label: 'Newfoundland and Labrador' },
          { value: 'northwest_territories', label: 'Northwest Territories' },
          { value: 'nova_scotia', label: 'Nova Scotia' },
          { value: 'nunavut', label: 'Nunavut' },
          { value: 'ontario', label: 'Ontario' },
          { value: 'prince_edward_island', label: 'Prince Edward Island' },
          { value: 'quebec', label: 'Quebec' },
          { value: 'saskatchewan', label: 'Saskatchewan' },
          { value: 'yukon', label: 'Yukon' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no') &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client1HasAlternatePoaPersonalCare2 === 'yes' &&
                 formData.client1AlternatePoaPersonalCare2IsCanadaResident === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaPersonalCare2City',
        label: 'City of Residence:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no') &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client1HasAlternatePoaPersonalCare2 === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaPersonalCare2HasDocCopy',
        label: (answers) => {
          const client1FirstName = (answers.get(1)?.fullName as string || 'Client 1').split(' ')[0];
          return `${client1FirstName}, does this person have a copy of your most recent Power of Attorney for Personal Care document?`;
        },
        type: 'radio',
        options: [
          { value: 'yes_on_file', label: 'Yes, on their files' },
          { value: 'no_can_access', label: 'No, but they know how to access the document if/when necessary' },
          { value: 'no_not_discussed', label: 'No, this has not been discussed' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no') &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client1HasAlternatePoaPersonalCare2 === 'yes';
        },
      },
      {
        key: 'client1HasAlternatePoaPersonalCare3',
        label: 'Have you named an additional alternate attorney, should this person be unable or unwilling to act?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client1SpouseIsPoaPersonalCare === 'no') &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client1HasAlternatePoaPersonalCare2 === 'yes';
        },
      },
      {
        key: 'client2HasPoaPersonalCare',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          return `${client2Name}, have you named a Power of Attorney for Personal Care?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client2SpouseIsPoaPersonalCare',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName as string || 'Client 1';
          return `Is ${client1Name} your Power of Attorney for Personal Care?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const maritalStatus = basicAnswers.maritalStatus as string;
          const hasSpouse = (maritalStatus === 'married' || maritalStatus === 'common_law') && basicAnswers.spouseName;
          return formData.client2HasPoaPersonalCare === 'yes' && hasSpouse;
        },
      },
      {
        key: 'client2PoaPersonalCareName',
        label: "Power of Attorney for Personal Care's Name:",
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' && (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no');
        },
      },
      {
        key: 'client2PoaPersonalCarePhone',
        label: 'Phone Number:',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' && (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no');
        },
      },
      {
        key: 'client2PoaPersonalCareEmail',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' && (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no');
        },
      },
      {
        key: 'client2PoaPersonalCareRelationship',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          return `Relationship to ${client2Name}:`;
        },
        type: 'text',
        placeholder: 'Enter relationship',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' && (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no');
        },
      },
      {
        key: 'client2PoaPersonalCareIsCanadaResident',
        label: 'Is this person a resident of Canada?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' && (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no');
        },
      },
      {
        key: 'client2PoaPersonalCareCountry',
        label: 'Which country is this person a resident of?',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' && (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') && formData.client2PoaPersonalCareIsCanadaResident === 'no';
        },
      },
      {
        key: 'client2PoaPersonalCareProvince',
        label: 'Which Province or Territory is this person a resident of?',
        type: 'select',
        options: [
          { value: 'alberta', label: 'Alberta' },
          { value: 'british_columbia', label: 'British Columbia' },
          { value: 'manitoba', label: 'Manitoba' },
          { value: 'new_brunswick', label: 'New Brunswick' },
          { value: 'newfoundland_labrador', label: 'Newfoundland and Labrador' },
          { value: 'northwest_territories', label: 'Northwest Territories' },
          { value: 'nova_scotia', label: 'Nova Scotia' },
          { value: 'nunavut', label: 'Nunavut' },
          { value: 'ontario', label: 'Ontario' },
          { value: 'prince_edward_island', label: 'Prince Edward Island' },
          { value: 'quebec', label: 'Quebec' },
          { value: 'saskatchewan', label: 'Saskatchewan' },
          { value: 'yukon', label: 'Yukon' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' && (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') && formData.client2PoaPersonalCareIsCanadaResident === 'yes';
        },
      },
      {
        key: 'client2PoaPersonalCareCity',
        label: 'City of Residence:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' && (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no');
        },
      },
      {
        key: 'client2PoaPersonalCareHasDocCopy',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `${client2FirstName}, does this person have a copy of your most recent Power of Attorney for Personal Care document?`;
        },
        type: 'radio',
        options: [
          { value: 'yes_on_file', label: 'Yes, on their files' },
          { value: 'no_can_access', label: 'No, but they know how to access the document if/when necessary' },
          { value: 'no_not_discussed', label: 'No, this has not been discussed' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' && (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no');
        },
      },
      {
        key: 'client2HasAlternatePoaPersonalCare',
        label: 'Have you named an alternate attorney, should this person be unable or unwilling to act?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client2HasPoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare1Name',
        label: "Alternate Power of Attorney for Personal Care's Name:",
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare1Phone',
        label: 'Phone Number:',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare1Email',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare1Relationship',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          return `Relationship to ${client2Name}:`;
        },
        type: 'text',
        placeholder: 'Enter relationship',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare1IsCanadaResident',
        label: 'Is this person a resident of Canada?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare1Country',
        label: 'Which country is this person a resident of?',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client2AlternatePoaPersonalCare1IsCanadaResident === 'no';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare1Province',
        label: 'Which Province or Territory is this person a resident of?',
        type: 'select',
        options: [
          { value: 'alberta', label: 'Alberta' },
          { value: 'british_columbia', label: 'British Columbia' },
          { value: 'manitoba', label: 'Manitoba' },
          { value: 'new_brunswick', label: 'New Brunswick' },
          { value: 'newfoundland_labrador', label: 'Newfoundland and Labrador' },
          { value: 'northwest_territories', label: 'Northwest Territories' },
          { value: 'nova_scotia', label: 'Nova Scotia' },
          { value: 'nunavut', label: 'Nunavut' },
          { value: 'ontario', label: 'Ontario' },
          { value: 'prince_edward_island', label: 'Prince Edward Island' },
          { value: 'quebec', label: 'Quebec' },
          { value: 'saskatchewan', label: 'Saskatchewan' },
          { value: 'yukon', label: 'Yukon' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client2AlternatePoaPersonalCare1IsCanadaResident === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare1City',
        label: 'City of Residence:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare1HasDocCopy',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `${client2FirstName}, does this person have a copy of your most recent Power of Attorney for Personal Care document?`;
        },
        type: 'radio',
        options: [
          { value: 'yes_on_file', label: 'Yes, on their files' },
          { value: 'no_can_access', label: 'No, but they know how to access the document if/when necessary' },
          { value: 'no_not_discussed', label: 'No, this has not been discussed' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client2HasAlternatePoaPersonalCare2',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `${client2FirstName}, have you named an additional alternate attorney, should this person be unable or unwilling to act?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare2Name',
        label: "Alternate Power of Attorney for Personal Care's Name:",
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare2 === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare2Phone',
        label: 'Phone Number:',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare2 === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare2Email',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare2 === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare2Relationship',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          return `Relationship to ${client2Name}:`;
        },
        type: 'text',
        placeholder: 'Enter relationship',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare2 === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare2IsCanadaResident',
        label: 'Is this person a resident of Canada?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare2 === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare2Country',
        label: 'Which country is this person a resident of?',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare2 === 'yes' &&
                 formData.client2AlternatePoaPersonalCare2IsCanadaResident === 'no';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare2Province',
        label: 'Which Province or Territory is this person a resident of?',
        type: 'select',
        options: [
          { value: 'alberta', label: 'Alberta' },
          { value: 'british_columbia', label: 'British Columbia' },
          { value: 'manitoba', label: 'Manitoba' },
          { value: 'new_brunswick', label: 'New Brunswick' },
          { value: 'newfoundland_labrador', label: 'Newfoundland and Labrador' },
          { value: 'northwest_territories', label: 'Northwest Territories' },
          { value: 'nova_scotia', label: 'Nova Scotia' },
          { value: 'nunavut', label: 'Nunavut' },
          { value: 'ontario', label: 'Ontario' },
          { value: 'prince_edward_island', label: 'Prince Edward Island' },
          { value: 'quebec', label: 'Quebec' },
          { value: 'saskatchewan', label: 'Saskatchewan' },
          { value: 'yukon', label: 'Yukon' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare2 === 'yes' &&
                 formData.client2AlternatePoaPersonalCare2IsCanadaResident === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare2City',
        label: 'City of Residence:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare2 === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare2HasDocCopy',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `${client2FirstName}, does this person have a copy of your most recent Power of Attorney for Personal Care document?`;
        },
        type: 'radio',
        options: [
          { value: 'yes_on_file', label: 'Yes, on their files' },
          { value: 'no_can_access', label: 'No, but they know how to access the document if/when necessary' },
          { value: 'no_not_discussed', label: 'No, this has not been discussed' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare2 === 'yes';
        },
      },
      {
        key: 'client2HasAlternatePoaPersonalCare3',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `${client2FirstName}, have you named an additional alternate attorney, should this person be unable or unwilling to act?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare2 === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare3Name',
        label: "Alternate Power of Attorney for Personal Care's Name:",
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare2 === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare3 === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare3Phone',
        label: 'Phone Number:',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare2 === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare3 === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare3Email',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare2 === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare3 === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare3Relationship',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          return `Relationship to ${client2Name}:`;
        },
        type: 'text',
        placeholder: 'Enter relationship',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare2 === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare3 === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare3IsCanadaResident',
        label: 'Is this person a resident of Canada?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare2 === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare3 === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare3Country',
        label: 'Which country is this person a resident of?',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare2 === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare3 === 'yes' &&
                 formData.client2AlternatePoaPersonalCare3IsCanadaResident === 'no';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare3Province',
        label: 'Which Province or Territory is this person a resident of?',
        type: 'select',
        options: [
          { value: 'alberta', label: 'Alberta' },
          { value: 'british_columbia', label: 'British Columbia' },
          { value: 'manitoba', label: 'Manitoba' },
          { value: 'new_brunswick', label: 'New Brunswick' },
          { value: 'newfoundland_labrador', label: 'Newfoundland and Labrador' },
          { value: 'northwest_territories', label: 'Northwest Territories' },
          { value: 'nova_scotia', label: 'Nova Scotia' },
          { value: 'nunavut', label: 'Nunavut' },
          { value: 'ontario', label: 'Ontario' },
          { value: 'prince_edward_island', label: 'Prince Edward Island' },
          { value: 'quebec', label: 'Quebec' },
          { value: 'saskatchewan', label: 'Saskatchewan' },
          { value: 'yukon', label: 'Yukon' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare2 === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare3 === 'yes' &&
                 formData.client2AlternatePoaPersonalCare3IsCanadaResident === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare3City',
        label: 'City of Residence:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare2 === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare3 === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare3HasDocCopy',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `${client2FirstName}, does this person have a copy of your most recent Power of Attorney for Personal Care document?`;
        },
        type: 'radio',
        options: [
          { value: 'yes_on_file', label: 'Yes, on their files' },
          { value: 'no_can_access', label: 'No, but they know how to access the document if/when necessary' },
          { value: 'no_not_discussed', label: 'No, this has not been discussed' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (!hasSpouse || formData.client2SpouseIsPoaPersonalCare === 'no') &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare2 === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare3 === 'yes';
        },
      },
      {
        key: 'client1HasFuneralArrangements',
        label: 'Have you made arrangements for Funeral or Cemetery services?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'client1FuneralArrangementsLocation',
        label: 'Where is this document located?',
        type: 'text',
        placeholder: 'Enter location',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasFuneralArrangements === 'yes',
      },
      {
        key: 'client1HasDiscussedFuneral',
        label: 'Have you discussed the type of funeral you would like?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client1FuneralWrittenDown',
        label: 'Is this written down?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasDiscussedFuneral === 'yes',
      },
      {
        key: 'client1FuneralDocLocation',
        label: 'Where is this document located?',
        type: 'text',
        placeholder: 'Enter location',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1FuneralWrittenDown === 'yes',
      },
      {
        key: 'client2HasFuneralArrangements',
        label: 'Has your spouse made arrangements for Funeral or Cemetery services?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client2FuneralArrangementsLocation',
        label: 'Where is this document located?',
        type: 'text',
        placeholder: 'Enter location',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasFuneralArrangements === 'yes',
      },
      {
        key: 'client2HasDiscussedFuneral',
        label: 'Has your spouse discussed the type of funeral they would like?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client2FuneralWrittenDown',
        label: 'Is this written down?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasDiscussedFuneral === 'yes',
      },
      {
        key: 'client2FuneralDocLocation',
        label: 'Where is this document located?',
        type: 'text',
        placeholder: 'Enter location',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2FuneralWrittenDown === 'yes',
      },
      {
        key: 'client1UsesAccountant',
        label: 'Do you use a professional accountant?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No, I do my own accounting' },
        ],
        required: true,
      },
      {
        key: 'client1AccountingRecordsLocation',
        label: 'Where are your accounting records kept?',
        type: 'text',
        placeholder: 'Enter location of accounting records',
        required: false,
      },
      {
        key: 'client2UsesAccountant',
        label: 'Does your spouse use a professional accountant?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No, I do my own accounting' },
        ],
        required: false,
      },
      {
        key: 'client2AccountingRecordsLocation',
        label: 'Where are your accounting records kept?',
        type: 'text',
        placeholder: 'Enter location of accounting records',
        required: false,
      },
      {
        key: 'accountantSamePerson',
        label: 'Do you use the same accountant?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client1IsCameronSmithAdvisor',
        label: 'Is Cameron Smith, CFP® your financial advisor?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'client1FinancialAdvisors',
        label: 'How many Financial Advisors do you work with?',
        type: 'number',
        placeholder: '0',
        required: true,
      },
      {
        key: 'client2IsCameronSmithAdvisor',
        label: 'Is Cameron Smith, CFP® your financial advisor?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client2FinancialAdvisors',
        label: 'How many Financial Advisors does your spouse work with?',
        type: 'number',
        placeholder: '0',
        required: false,
      },
    ],
  },
  {
    id: 8,
    title: 'Your Financial Footprint',
    description: 'Banking and financial account information',
    questions: [
      {
        key: 'bankingStructure',
        label: 'For your personal banking, are your bank accounts joint, individually held, or some individual or joint?',
        type: 'radio',
        options: [
          { value: 'individual', label: 'Individually' },
          { value: 'joint', label: 'They are all joint accounts' },
          { value: 'mixed', label: 'Some are individually held, some are joint accounts' },
        ],
        required: false,
      },
      {
        key: 'jointBankCount',
        label: 'How many banks, trust companies or credit unions do you have accounts with?',
        type: 'number',
        placeholder: '0',
        required: false,
      },
      {
        key: 'jointInstitutionsData',
        label: 'Joint Institution Names',
        type: 'dynamic',
        required: false,
      },
      {
        key: 'client1BankCount',
        label: 'How many banks, trust companies or credit unions do you have accounts with?',
        type: 'number',
        placeholder: '0',
        required: false,
      },
      {
        key: 'client1InstitutionsData',
        label: 'Your Institution Names',
        type: 'dynamic',
        required: false,
      },
      {
        key: 'client2BankCount',
        label: 'How many banks, trust companies or credit unions does your spouse have accounts with?',
        type: 'number',
        placeholder: '0',
        required: false,
      },
      {
        key: 'client2InstitutionsData',
        label: 'Spouse Institution Names',
        type: 'dynamic',
        required: false,
      },
      {
        key: 'mixedJointBankCount',
        label: 'How many joint accounts are held?',
        type: 'number',
        placeholder: '0',
        required: false,
      },
      {
        key: 'mixedJointInstitutionsData',
        label: 'Joint Institution Names',
        type: 'dynamic',
        required: false,
      },
      {
        key: 'mixedClient1BankCount',
        label: 'How many individually held accounts do you have?',
        type: 'number',
        placeholder: '0',
        required: false,
      },
      {
        key: 'mixedClient1InstitutionsData',
        label: 'Your Institution Names',
        type: 'dynamic',
        required: false,
      },
      {
        key: 'mixedClient2BankCount',
        label: 'How many individually held accounts does your spouse have?',
        type: 'number',
        placeholder: '0',
        required: false,
      },
      {
        key: 'mixedClient2InstitutionsData',
        label: 'Spouse Institution Names',
        type: 'dynamic',
        required: false,
      },
    ],
  },
  {
    id: 9,
    title: 'Real Estate',
    description: 'Information about real estate you own',
    questions: [
      {
        key: 'hasRealEstate',
        label: 'Do you own any real estate?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'propertyCount',
        label: 'How many properties do you own?',
        type: 'number',
        placeholder: '0',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes',
      },
      {
        key: 'property1Name',
        label: 'Property Name:',
        type: 'text',
        placeholder: 'Enter property name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1,
      },
      {
        key: 'property1PurchaseYear',
        label: 'Purchase Year:',
        type: 'select',
        options: generateYearOptions,
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1,
      },
      {
        key: 'property1OwnersLabel',
        label: 'Who owns the property?',
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1,
      },
      {
        key: 'property1Owners',
        label: 'Select all that apply:',
        type: 'checkbox',
        options: (answers) => {
          const client1Name = answers.get(1)?.fullName || 'Client 1';
          const maritalStatus = answers.get(1)?.maritalStatus;
          const hasSpouse = maritalStatus === 'married' || maritalStatus === 'common_law';
          const client2Name = answers.get(1)?.spouseFullName || 'Client 2';

          const baseOptions = [
            { value: 'client1', label: client1Name },
          ];

          if (hasSpouse) {
            baseOptions.push({ value: 'client2', label: client2Name });
          }

          const trustCount = parseInt(String(answers.get(4)?.trustCount || '0'));
          for (let i = 1; i <= trustCount; i++) {
            const trustName = answers.get(4)?.[`trust${i}Name`] || `Trust ${i}`;
            baseOptions.push({ value: `trust${i}`, label: String(trustName) });
          }

          const corpCount = parseInt(String(answers.get(6)?.corporationCount || '0'));
          for (let i = 1; i <= corpCount; i++) {
            const corpName = answers.get(6)?.[`corporation${i}Name`] || `Corporation ${i}`;
            baseOptions.push({ value: `corp${i}`, label: String(corpName) });
          }

          baseOptions.push({ value: 'other', label: 'Other' });

          return baseOptions;
        },
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1,
      },
      {
        key: 'property1OtherOwner',
        label: 'Enter name of other owner:',
        type: 'text',
        placeholder: 'Enter owner name',
        required: false,
        condition: (formData: Record<string, string>) => {
          const owners = formData.property1Owners;
          const ownersArray = Array.isArray(owners) ? owners : (typeof owners === 'string' ? owners.split(',') : []);
          return formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1 && ownersArray.includes('other');
        },
      },
      {
        key: 'property1OwnershipStructure',
        label: 'Describe the ownership structure:',
        type: 'radio',
        options: [
          { value: 'joint', label: 'Joint with Right of Survivorship' },
          { value: 'tenants', label: 'Tenants in Common' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1,
      },
      {
        key: 'property1AddressLabel',
        label: (answers) => {
          const propertyName = answers.get(9)?.property1Name || 'this property';
          return `What is the address for ${propertyName}?`;
        },
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1,
      },
      {
        key: 'property1Address',
        label: 'Address Line:',
        type: 'text',
        placeholder: 'Enter street address',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1,
      },
      {
        key: 'property1City',
        label: 'City:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1,
      },
      {
        key: 'property1Province',
        label: 'Province/State:',
        type: 'text',
        placeholder: 'Enter province or state',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1,
      },
      {
        key: 'property1Country',
        label: 'Country:',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1,
      },
      {
        key: 'property1PostalCode',
        label: 'Postal Code:',
        type: 'text',
        placeholder: 'Enter postal code',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1,
      },
      {
        key: 'property1RecordsLabel',
        label: 'Please indicate what records you have and where they are stored.',
        type: 'label',
        description: 'These records help determine the tax cost of your property and can significantly impact taxes owing when it is sold or transferred.',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1,
      },
      {
        key: 'property1RecordPurchaseDocs',
        label: 'Do you have Original Purchase Documents?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1,
      },
      {
        key: 'property1RecordPurchaseDocsLocation',
        label: 'Storage Location for Purchase Documents:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1 && formData.property1RecordPurchaseDocs === 'yes',
      },
      {
        key: 'property1RecordLegalFees',
        label: 'Do you have Legal Fees and Land Transfer Tax Paid at Purchase?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1,
      },
      {
        key: 'property1RecordLegalFeesLocation',
        label: 'Storage Location for Legal Fees and Land Transfer Tax:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1 && formData.property1RecordLegalFees === 'yes',
      },
      {
        key: 'property1RecordImprovements',
        label: 'Do you have Capital Improvements records (e.g., renovations, additions, major upgrades)?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1,
      },
      {
        key: 'property1RecordImprovementsLocation',
        label: 'Storage Location for Capital Improvements:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1 && formData.property1RecordImprovements === 'yes',
      },
      {
        key: 'property1RecordAppraisals',
        label: 'Do you have Appraisals or Valuations?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1,
      },
      {
        key: 'property1RecordAppraisalsLocation',
        label: 'Storage Location for Appraisals or Valuations:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1 && formData.property1RecordAppraisals === 'yes',
      },
      {
        key: 'property1IsRental',
        label: 'Is this a rental property?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1,
      },
      {
        key: 'property1LeaseStorage',
        label: 'Where do you keep lease contracts?',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1 && formData.property1IsRental === 'yes',
      },
      {
        key: 'property1LawyerLabel',
        label: 'Lawyer who handled the purchase:',
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1,
      },
      {
        key: 'property1LawyerName',
        label: 'Lawyer Name:',
        type: 'text',
        placeholder: 'Enter lawyer name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1,
      },
      {
        key: 'property1LawyerFirm',
        label: 'Law Firm Name:',
        type: 'text',
        placeholder: 'Enter law firm name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1,
      },
      {
        key: 'property1LawyerPhone',
        label: 'Phone Number:',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1,
      },
      {
        key: 'property1LawyerEmail',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 1,
      },

      {
        key: 'property2Name',
        label: 'Property Name:',
        type: 'text',
        placeholder: 'Enter property name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2,
      },
      {
        key: 'property2PurchaseYear',
        label: 'Purchase Year:',
        type: 'select',
        options: generateYearOptions,
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2,
      },
      {
        key: 'property2OwnersLabel',
        label: 'Who owns the property?',
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2,
      },
      {
        key: 'property2Owners',
        label: 'Select all that apply:',
        type: 'checkbox',
        options: (answers) => {
          const client1Name = answers.get(1)?.fullName || 'Client 1';
          const maritalStatus = answers.get(1)?.maritalStatus;
          const hasSpouse = maritalStatus === 'married' || maritalStatus === 'common_law';
          const client2Name = answers.get(1)?.spouseFullName || 'Client 2';

          const baseOptions = [
            { value: 'client1', label: client1Name },
          ];

          if (hasSpouse) {
            baseOptions.push({ value: 'client2', label: client2Name });
          }

          const trustCount = parseInt(String(answers.get(4)?.trustCount || '0'));
          for (let i = 1; i <= trustCount; i++) {
            const trustName = answers.get(4)?.[`trust${i}Name`] || `Trust ${i}`;
            baseOptions.push({ value: `trust${i}`, label: String(trustName) });
          }

          const corpCount = parseInt(String(answers.get(6)?.corporationCount || '0'));
          for (let i = 1; i <= corpCount; i++) {
            const corpName = answers.get(6)?.[`corporation${i}Name`] || `Corporation ${i}`;
            baseOptions.push({ value: `corp${i}`, label: String(corpName) });
          }

          baseOptions.push({ value: 'other', label: 'Other' });

          return baseOptions;
        },
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2,
      },
      {
        key: 'property2OtherOwner',
        label: 'Enter name of other owner:',
        type: 'text',
        placeholder: 'Enter owner name',
        required: false,
        condition: (formData: Record<string, string>) => {
          const owners = formData.property2Owners;
          const ownersArray = Array.isArray(owners) ? owners : (typeof owners === 'string' ? owners.split(',') : []);
          return formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2 && ownersArray.includes('other');
        },
      },
      {
        key: 'property2OwnershipStructure',
        label: 'Describe the ownership structure:',
        type: 'radio',
        options: [
          { value: 'joint', label: 'Joint with Right of Survivorship' },
          { value: 'tenants', label: 'Tenants in Common' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2,
      },
      {
        key: 'property2AddressLabel',
        label: (answers) => {
          const propertyName = answers.get(9)?.property2Name || 'this property';
          return `What is the address for ${propertyName}?`;
        },
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2,
      },
      {
        key: 'property2Address',
        label: 'Address Line:',
        type: 'text',
        placeholder: 'Enter street address',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2,
      },
      {
        key: 'property2City',
        label: 'City:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2,
      },
      {
        key: 'property2Province',
        label: 'Province/State:',
        type: 'text',
        placeholder: 'Enter province or state',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2,
      },
      {
        key: 'property2Country',
        label: 'Country:',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2,
      },
      {
        key: 'property2PostalCode',
        label: 'Postal Code:',
        type: 'text',
        placeholder: 'Enter postal code',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2,
      },
      {
        key: 'property2RecordsLabel',
        label: 'Please indicate what records you have and where they are stored.',
        type: 'label',
        description: 'These records help determine the tax cost of your property and can significantly impact taxes owing when it is sold or transferred.',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2,
      },
      {
        key: 'property2RecordPurchaseDocs',
        label: 'Do you have Original Purchase Documents?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2,
      },
      {
        key: 'property2RecordPurchaseDocsLocation',
        label: 'Storage Location for Purchase Documents:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2 && formData.property2RecordPurchaseDocs === 'yes',
      },
      {
        key: 'property2RecordLegalFees',
        label: 'Do you have Legal Fees and Land Transfer Tax Paid at Purchase?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2,
      },
      {
        key: 'property2RecordLegalFeesLocation',
        label: 'Storage Location for Legal Fees and Land Transfer Tax:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2 && formData.property2RecordLegalFees === 'yes',
      },
      {
        key: 'property2RecordImprovements',
        label: 'Do you have Capital Improvements records (e.g., renovations, additions, major upgrades)?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2,
      },
      {
        key: 'property2RecordImprovementsLocation',
        label: 'Storage Location for Capital Improvements:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2 && formData.property2RecordImprovements === 'yes',
      },
      {
        key: 'property2RecordAppraisals',
        label: 'Do you have Appraisals or Valuations?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2,
      },
      {
        key: 'property2RecordAppraisalsLocation',
        label: 'Storage Location for Appraisals or Valuations:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2 && formData.property2RecordAppraisals === 'yes',
      },
      {
        key: 'property2IsRental',
        label: 'Is this a rental property?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2,
      },
      {
        key: 'property2LeaseStorage',
        label: 'Where do you keep lease contracts?',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2 && formData.property2IsRental === 'yes',
      },
      {
        key: 'property2LawyerLabel',
        label: 'Lawyer who handled the purchase:',
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2,
      },
      {
        key: 'property2LawyerName',
        label: 'Lawyer Name:',
        type: 'text',
        placeholder: 'Enter lawyer name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2,
      },
      {
        key: 'property2LawyerFirm',
        label: 'Law Firm Name:',
        type: 'text',
        placeholder: 'Enter law firm name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2,
      },
      {
        key: 'property2LawyerPhone',
        label: 'Phone Number:',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2,
      },
      {
        key: 'property2LawyerEmail',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 2,
      },
      {
        key: 'property3Name',
        label: 'Property Name:',
        type: 'text',
        placeholder: 'Enter property name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3,
      },
      {
        key: 'property3PurchaseYear',
        label: 'Purchase Year:',
        type: 'select',
        options: generateYearOptions,
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3,
      },
      {
        key: 'property3OwnersLabel',
        label: 'Who owns the property?',
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3,
      },
      {
        key: 'property3Owners',
        label: 'Select all that apply:',
        type: 'checkbox',
        options: (answers) => {
          const client1Name = answers.get(1)?.fullName || 'Client 1';
          const maritalStatus = answers.get(1)?.maritalStatus;
          const hasSpouse = maritalStatus === 'married' || maritalStatus === 'common_law';
          const client2Name = answers.get(1)?.spouseFullName || 'Client 2';

          const baseOptions = [
            { value: 'client1', label: client1Name },
          ];

          if (hasSpouse) {
            baseOptions.push({ value: 'client2', label: client2Name });
          }

          const trustCount = parseInt(String(answers.get(4)?.trustCount || '0'));
          for (let i = 1; i <= trustCount; i++) {
            const trustName = answers.get(4)?.[`trust${i}Name`] || `Trust ${i}`;
            baseOptions.push({ value: `trust${i}`, label: String(trustName) });
          }

          const corpCount = parseInt(String(answers.get(6)?.corporationCount || '0'));
          for (let i = 1; i <= corpCount; i++) {
            const corpName = answers.get(6)?.[`corporation${i}Name`] || `Corporation ${i}`;
            baseOptions.push({ value: `corp${i}`, label: String(corpName) });
          }

          baseOptions.push({ value: 'other', label: 'Other' });

          return baseOptions;
        },
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3,
      },
      {
        key: 'property3OtherOwner',
        label: 'Enter name of other owner:',
        type: 'text',
        placeholder: 'Enter owner name',
        required: false,
        condition: (formData: Record<string, string>) => {
          const owners = formData.property3Owners;
          const ownersArray = Array.isArray(owners) ? owners : (typeof owners === 'string' ? owners.split(',') : []);
          return formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3 && ownersArray.includes('other');
        },
      },
      {
        key: 'property3OwnershipStructure',
        label: 'Describe the ownership structure:',
        type: 'radio',
        options: [
          { value: 'joint', label: 'Joint with Right of Survivorship' },
          { value: 'tenants', label: 'Tenants in Common' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3,
      },
      {
        key: 'property3AddressLabel',
        label: (answers) => {
          const propertyName = answers.get(9)?.property3Name || 'this property';
          return `What is the address for ${propertyName}?`;
        },
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3,
      },
      {
        key: 'property3Address',
        label: 'Address Line:',
        type: 'text',
        placeholder: 'Enter street address',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3,
      },
      {
        key: 'property3City',
        label: 'City:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3,
      },
      {
        key: 'property3Province',
        label: 'Province/State:',
        type: 'text',
        placeholder: 'Enter province or state',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3,
      },
      {
        key: 'property3Country',
        label: 'Country:',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3,
      },
      {
        key: 'property3PostalCode',
        label: 'Postal Code:',
        type: 'text',
        placeholder: 'Enter postal code',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3,
      },
      {
        key: 'property3RecordsLabel',
        label: 'Please indicate what records you have and where they are stored.',
        type: 'label',
        description: 'These records help determine the tax cost of your property and can significantly impact taxes owing when it is sold or transferred.',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3,
      },
      {
        key: 'property3RecordPurchaseDocs',
        label: 'Do you have Original Purchase Documents?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3,
      },
      {
        key: 'property3RecordPurchaseDocsLocation',
        label: 'Storage Location for Purchase Documents:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3 && formData.property3RecordPurchaseDocs === 'yes',
      },
      {
        key: 'property3RecordLegalFees',
        label: 'Do you have Legal Fees and Land Transfer Tax Paid at Purchase?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3,
      },
      {
        key: 'property3RecordLegalFeesLocation',
        label: 'Storage Location for Legal Fees and Land Transfer Tax:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3 && formData.property3RecordLegalFees === 'yes',
      },
      {
        key: 'property3RecordImprovements',
        label: 'Do you have Capital Improvements records (e.g., renovations, additions, major upgrades)?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3,
      },
      {
        key: 'property3RecordImprovementsLocation',
        label: 'Storage Location for Capital Improvements:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3 && formData.property3RecordImprovements === 'yes',
      },
      {
        key: 'property3RecordAppraisals',
        label: 'Do you have Appraisals or Valuations?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3,
      },
      {
        key: 'property3RecordAppraisalsLocation',
        label: 'Storage Location for Appraisals or Valuations:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3 && formData.property3RecordAppraisals === 'yes',
      },
      {
        key: 'property3IsRental',
        label: 'Is this a rental property?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3,
      },
      {
        key: 'property3LeaseStorage',
        label: 'Where do you keep lease contracts?',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3 && formData.property3IsRental === 'yes',
      },
      {
        key: 'property3LawyerLabel',
        label: 'Lawyer who handled the purchase:',
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3,
      },
      {
        key: 'property3LawyerName',
        label: 'Lawyer Name:',
        type: 'text',
        placeholder: 'Enter lawyer name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3,
      },
      {
        key: 'property3LawyerFirm',
        label: 'Law Firm Name:',
        type: 'text',
        placeholder: 'Enter law firm name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3,
      },
      {
        key: 'property3LawyerPhone',
        label: 'Phone Number:',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3,
      },
      {
        key: 'property3LawyerEmail',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 3,
      },
      {
        key: 'property4Name',
        label: 'Property Name:',
        type: 'text',
        placeholder: 'Enter property name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4,
      },
      {
        key: 'property4PurchaseYear',
        label: 'Purchase Year:',
        type: 'select',
        options: generateYearOptions,
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4,
      },
      {
        key: 'property4OwnersLabel',
        label: 'Who owns the property?',
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4,
      },
      {
        key: 'property4Owners',
        label: 'Select all that apply:',
        type: 'checkbox',
        options: (answers) => {
          const client1Name = answers.get(1)?.fullName || 'Client 1';
          const maritalStatus = answers.get(1)?.maritalStatus;
          const hasSpouse = maritalStatus === 'married' || maritalStatus === 'common_law';
          const client2Name = answers.get(1)?.spouseFullName || 'Client 2';

          const baseOptions = [
            { value: 'client1', label: client1Name },
          ];

          if (hasSpouse) {
            baseOptions.push({ value: 'client2', label: client2Name });
          }

          const trustCount = parseInt(String(answers.get(4)?.trustCount || '0'));
          for (let i = 1; i <= trustCount; i++) {
            const trustName = answers.get(4)?.[`trust${i}Name`] || `Trust ${i}`;
            baseOptions.push({ value: `trust${i}`, label: String(trustName) });
          }

          const corpCount = parseInt(String(answers.get(6)?.corporationCount || '0'));
          for (let i = 1; i <= corpCount; i++) {
            const corpName = answers.get(6)?.[`corporation${i}Name`] || `Corporation ${i}`;
            baseOptions.push({ value: `corp${i}`, label: String(corpName) });
          }

          baseOptions.push({ value: 'other', label: 'Other' });

          return baseOptions;
        },
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4,
      },
      {
        key: 'property4OtherOwner',
        label: 'Enter name of other owner:',
        type: 'text',
        placeholder: 'Enter owner name',
        required: false,
        condition: (formData: Record<string, string>) => {
          const owners = formData.property4Owners;
          const ownersArray = Array.isArray(owners) ? owners : (typeof owners === 'string' ? owners.split(',') : []);
          return formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4 && ownersArray.includes('other');
        },
      },
      {
        key: 'property4OwnershipStructure',
        label: 'Describe the ownership structure:',
        type: 'radio',
        options: [
          { value: 'joint', label: 'Joint with Right of Survivorship' },
          { value: 'tenants', label: 'Tenants in Common' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4,
      },
      {
        key: 'property4AddressLabel',
        label: (answers) => {
          const propertyName = answers.get(9)?.property4Name || 'this property';
          return `What is the address for ${propertyName}?`;
        },
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4,
      },
      {
        key: 'property4Address',
        label: 'Address Line:',
        type: 'text',
        placeholder: 'Enter street address',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4,
      },
      {
        key: 'property4City',
        label: 'City:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4,
      },
      {
        key: 'property4Province',
        label: 'Province/State:',
        type: 'text',
        placeholder: 'Enter province or state',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4,
      },
      {
        key: 'property4Country',
        label: 'Country:',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4,
      },
      {
        key: 'property4PostalCode',
        label: 'Postal Code:',
        type: 'text',
        placeholder: 'Enter postal code',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4,
      },
      {
        key: 'property4RecordsLabel',
        label: 'Please indicate what records you have and where they are stored.',
        type: 'label',
        description: 'These records help determine the tax cost of your property and can significantly impact taxes owing when it is sold or transferred.',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4,
      },
      {
        key: 'property4RecordPurchaseDocs',
        label: 'Do you have Original Purchase Documents?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4,
      },
      {
        key: 'property4RecordPurchaseDocsLocation',
        label: 'Storage Location for Purchase Documents:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4 && formData.property4RecordPurchaseDocs === 'yes',
      },
      {
        key: 'property4RecordLegalFees',
        label: 'Do you have Legal Fees and Land Transfer Tax Paid at Purchase?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4,
      },
      {
        key: 'property4RecordLegalFeesLocation',
        label: 'Storage Location for Legal Fees and Land Transfer Tax:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4 && formData.property4RecordLegalFees === 'yes',
      },
      {
        key: 'property4RecordImprovements',
        label: 'Do you have Capital Improvements records (e.g., renovations, additions, major upgrades)?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4,
      },
      {
        key: 'property4RecordImprovementsLocation',
        label: 'Storage Location for Capital Improvements:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4 && formData.property4RecordImprovements === 'yes',
      },
      {
        key: 'property4RecordAppraisals',
        label: 'Do you have Appraisals or Valuations?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4,
      },
      {
        key: 'property4RecordAppraisalsLocation',
        label: 'Storage Location for Appraisals or Valuations:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4 && formData.property4RecordAppraisals === 'yes',
      },
      {
        key: 'property4IsRental',
        label: 'Is this a rental property?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4,
      },
      {
        key: 'property4LeaseStorage',
        label: 'Where do you keep lease contracts?',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4 && formData.property4IsRental === 'yes',
      },
      {
        key: 'property4LawyerLabel',
        label: 'Lawyer who handled the purchase:',
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4,
      },
      {
        key: 'property4LawyerName',
        label: 'Lawyer Name:',
        type: 'text',
        placeholder: 'Enter lawyer name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4,
      },
      {
        key: 'property4LawyerFirm',
        label: 'Law Firm Name:',
        type: 'text',
        placeholder: 'Enter law firm name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4,
      },
      {
        key: 'property4LawyerPhone',
        label: 'Phone Number:',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4,
      },
      {
        key: 'property4LawyerEmail',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 4,
      },
      {
        key: 'property5Name',
        label: 'Property Name:',
        type: 'text',
        placeholder: 'Enter property name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5,
      },
      {
        key: 'property5PurchaseYear',
        label: 'Purchase Year:',
        type: 'select',
        options: generateYearOptions,
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5,
      },
      {
        key: 'property5OwnersLabel',
        label: 'Who owns the property?',
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5,
      },
      {
        key: 'property5Owners',
        label: 'Select all that apply:',
        type: 'checkbox',
        options: (answers) => {
          const client1Name = answers.get(1)?.fullName || 'Client 1';
          const maritalStatus = answers.get(1)?.maritalStatus;
          const hasSpouse = maritalStatus === 'married' || maritalStatus === 'common_law';
          const client2Name = answers.get(1)?.spouseFullName || 'Client 2';

          const baseOptions = [
            { value: 'client1', label: client1Name },
          ];

          if (hasSpouse) {
            baseOptions.push({ value: 'client2', label: client2Name });
          }

          const trustCount = parseInt(String(answers.get(4)?.trustCount || '0'));
          for (let i = 1; i <= trustCount; i++) {
            const trustName = answers.get(4)?.[`trust${i}Name`] || `Trust ${i}`;
            baseOptions.push({ value: `trust${i}`, label: String(trustName) });
          }

          const corpCount = parseInt(String(answers.get(6)?.corporationCount || '0'));
          for (let i = 1; i <= corpCount; i++) {
            const corpName = answers.get(6)?.[`corporation${i}Name`] || `Corporation ${i}`;
            baseOptions.push({ value: `corp${i}`, label: String(corpName) });
          }

          baseOptions.push({ value: 'other', label: 'Other' });

          return baseOptions;
        },
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5,
      },
      {
        key: 'property5OtherOwner',
        label: 'Enter name of other owner:',
        type: 'text',
        placeholder: 'Enter owner name',
        required: false,
        condition: (formData: Record<string, string>) => {
          const owners = formData.property5Owners;
          const ownersArray = Array.isArray(owners) ? owners : (typeof owners === 'string' ? owners.split(',') : []);
          return formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5 && ownersArray.includes('other');
        },
      },
      {
        key: 'property5OwnershipStructure',
        label: 'Describe the ownership structure:',
        type: 'radio',
        options: [
          { value: 'joint', label: 'Joint with Right of Survivorship' },
          { value: 'tenants', label: 'Tenants in Common' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5,
      },
      {
        key: 'property5AddressLabel',
        label: (answers) => {
          const propertyName = answers.get(9)?.property5Name || 'this property';
          return `What is the address for ${propertyName}?`;
        },
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5,
      },
      {
        key: 'property5Address',
        label: 'Address Line:',
        type: 'text',
        placeholder: 'Enter street address',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5,
      },
      {
        key: 'property5City',
        label: 'City:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5,
      },
      {
        key: 'property5Province',
        label: 'Province/State:',
        type: 'text',
        placeholder: 'Enter province or state',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5,
      },
      {
        key: 'property5Country',
        label: 'Country:',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5,
      },
      {
        key: 'property5PostalCode',
        label: 'Postal Code:',
        type: 'text',
        placeholder: 'Enter postal code',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5,
      },
      {
        key: 'property5RecordsLabel',
        label: 'Please indicate what records you have and where they are stored.',
        type: 'label',
        description: 'These records help determine the tax cost of your property and can significantly impact taxes owing when it is sold or transferred.',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5,
      },
      {
        key: 'property5RecordPurchaseDocs',
        label: 'Do you have Original Purchase Documents?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5,
      },
      {
        key: 'property5RecordPurchaseDocsLocation',
        label: 'Storage Location for Purchase Documents:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5 && formData.property5RecordPurchaseDocs === 'yes',
      },
      {
        key: 'property5RecordLegalFees',
        label: 'Do you have Legal Fees and Land Transfer Tax Paid at Purchase?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5,
      },
      {
        key: 'property5RecordLegalFeesLocation',
        label: 'Storage Location for Legal Fees and Land Transfer Tax:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5 && formData.property5RecordLegalFees === 'yes',
      },
      {
        key: 'property5RecordImprovements',
        label: 'Do you have Capital Improvements records (e.g., renovations, additions, major upgrades)?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5,
      },
      {
        key: 'property5RecordImprovementsLocation',
        label: 'Storage Location for Capital Improvements:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5 && formData.property5RecordImprovements === 'yes',
      },
      {
        key: 'property5RecordAppraisals',
        label: 'Do you have Appraisals or Valuations?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5,
      },
      {
        key: 'property5RecordAppraisalsLocation',
        label: 'Storage Location for Appraisals or Valuations:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5 && formData.property5RecordAppraisals === 'yes',
      },
      {
        key: 'property5IsRental',
        label: 'Is this a rental property?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5,
      },
      {
        key: 'property5LeaseStorage',
        label: 'Where do you keep lease contracts?',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5 && formData.property5IsRental === 'yes',
      },
      {
        key: 'property5LawyerLabel',
        label: 'Lawyer who handled the purchase:',
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5,
      },
      {
        key: 'property5LawyerName',
        label: 'Lawyer Name:',
        type: 'text',
        placeholder: 'Enter lawyer name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5,
      },
      {
        key: 'property5LawyerFirm',
        label: 'Law Firm Name:',
        type: 'text',
        placeholder: 'Enter law firm name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5,
      },
      {
        key: 'property5LawyerPhone',
        label: 'Phone Number:',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5,
      },
      {
        key: 'property5LawyerEmail',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 5,
      },
      {
        key: 'property6Name',
        label: 'Property Name:',
        type: 'text',
        placeholder: 'Enter property name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6,
      },
      {
        key: 'property6PurchaseYear',
        label: 'Purchase Year:',
        type: 'select',
        options: generateYearOptions,
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6,
      },
      {
        key: 'property6OwnersLabel',
        label: 'Who owns the property?',
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6,
      },
      {
        key: 'property6Owners',
        label: 'Select all that apply:',
        type: 'checkbox',
        options: (answers) => {
          const client1Name = answers.get(1)?.fullName || 'Client 1';
          const maritalStatus = answers.get(1)?.maritalStatus;
          const hasSpouse = maritalStatus === 'married' || maritalStatus === 'common_law';
          const client2Name = answers.get(1)?.spouseFullName || 'Client 2';

          const baseOptions = [
            { value: 'client1', label: client1Name },
          ];

          if (hasSpouse) {
            baseOptions.push({ value: 'client2', label: client2Name });
          }

          const trustCount = parseInt(String(answers.get(4)?.trustCount || '0'));
          for (let i = 1; i <= trustCount; i++) {
            const trustName = answers.get(4)?.[`trust${i}Name`] || `Trust ${i}`;
            baseOptions.push({ value: `trust${i}`, label: String(trustName) });
          }

          const corpCount = parseInt(String(answers.get(6)?.corporationCount || '0'));
          for (let i = 1; i <= corpCount; i++) {
            const corpName = answers.get(6)?.[`corporation${i}Name`] || `Corporation ${i}`;
            baseOptions.push({ value: `corp${i}`, label: String(corpName) });
          }

          baseOptions.push({ value: 'other', label: 'Other' });

          return baseOptions;
        },
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6,
      },
      {
        key: 'property6OtherOwner',
        label: 'Enter name of other owner:',
        type: 'text',
        placeholder: 'Enter owner name',
        required: false,
        condition: (formData: Record<string, string>) => {
          const owners = formData.property6Owners;
          const ownersArray = Array.isArray(owners) ? owners : (typeof owners === 'string' ? owners.split(',') : []);
          return formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6 && ownersArray.includes('other');
        },
      },
      {
        key: 'property6OwnershipStructure',
        label: 'Describe the ownership structure:',
        type: 'radio',
        options: [
          { value: 'joint', label: 'Joint with Right of Survivorship' },
          { value: 'tenants', label: 'Tenants in Common' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6,
      },
      {
        key: 'property6AddressLabel',
        label: (answers) => {
          const propertyName = answers.get(9)?.property6Name || 'this property';
          return `What is the address for ${propertyName}?`;
        },
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6,
      },
      {
        key: 'property6Address',
        label: 'Address Line:',
        type: 'text',
        placeholder: 'Enter street address',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6,
      },
      {
        key: 'property6City',
        label: 'City:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6,
      },
      {
        key: 'property6Province',
        label: 'Province/State:',
        type: 'text',
        placeholder: 'Enter province or state',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6,
      },
      {
        key: 'property6Country',
        label: 'Country:',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6,
      },
      {
        key: 'property6PostalCode',
        label: 'Postal Code:',
        type: 'text',
        placeholder: 'Enter postal code',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6,
      },
      {
        key: 'property6RecordsLabel',
        label: 'Please indicate what records you have and where they are stored.',
        type: 'label',
        description: 'These records help determine the tax cost of your property and can significantly impact taxes owing when it is sold or transferred.',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6,
      },
      {
        key: 'property6RecordPurchaseDocs',
        label: 'Do you have Original Purchase Documents?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6,
      },
      {
        key: 'property6RecordPurchaseDocsLocation',
        label: 'Storage Location for Purchase Documents:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6 && formData.property6RecordPurchaseDocs === 'yes',
      },
      {
        key: 'property6RecordLegalFees',
        label: 'Do you have Legal Fees and Land Transfer Tax Paid at Purchase?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6,
      },
      {
        key: 'property6RecordLegalFeesLocation',
        label: 'Storage Location for Legal Fees and Land Transfer Tax:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6 && formData.property6RecordLegalFees === 'yes',
      },
      {
        key: 'property6RecordImprovements',
        label: 'Do you have Capital Improvements records (e.g., renovations, additions, major upgrades)?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6,
      },
      {
        key: 'property6RecordImprovementsLocation',
        label: 'Storage Location for Capital Improvements:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6 && formData.property6RecordImprovements === 'yes',
      },
      {
        key: 'property6RecordAppraisals',
        label: 'Do you have Appraisals or Valuations?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6,
      },
      {
        key: 'property6RecordAppraisalsLocation',
        label: 'Storage Location for Appraisals or Valuations:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6 && formData.property6RecordAppraisals === 'yes',
      },
      {
        key: 'property6IsRental',
        label: 'Is this a rental property?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6,
      },
      {
        key: 'property6LeaseStorage',
        label: 'Where do you keep lease contracts?',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6 && formData.property6IsRental === 'yes',
      },
      {
        key: 'property6LawyerLabel',
        label: 'Lawyer who handled the purchase:',
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6,
      },
      {
        key: 'property6LawyerName',
        label: 'Lawyer Name:',
        type: 'text',
        placeholder: 'Enter lawyer name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6,
      },
      {
        key: 'property6LawyerFirm',
        label: 'Law Firm Name:',
        type: 'text',
        placeholder: 'Enter law firm name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6,
      },
      {
        key: 'property6LawyerPhone',
        label: 'Phone Number:',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6,
      },
      {
        key: 'property6LawyerEmail',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 6,
      },
      {
        key: 'property7Name',
        label: 'Property Name:',
        type: 'text',
        placeholder: 'Enter property name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7,
      },
      {
        key: 'property7PurchaseYear',
        label: 'Purchase Year:',
        type: 'select',
        options: generateYearOptions,
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7,
      },
      {
        key: 'property7OwnersLabel',
        label: 'Who owns the property?',
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7,
      },
      {
        key: 'property7Owners',
        label: 'Select all that apply:',
        type: 'checkbox',
        options: (answers) => {
          const client1Name = answers.get(1)?.fullName || 'Client 1';
          const maritalStatus = answers.get(1)?.maritalStatus;
          const hasSpouse = maritalStatus === 'married' || maritalStatus === 'common_law';
          const client2Name = answers.get(1)?.spouseFullName || 'Client 2';

          const baseOptions = [
            { value: 'client1', label: client1Name },
          ];

          if (hasSpouse) {
            baseOptions.push({ value: 'client2', label: client2Name });
          }

          const trustCount = parseInt(String(answers.get(4)?.trustCount || '0'));
          for (let i = 1; i <= trustCount; i++) {
            const trustName = answers.get(4)?.[`trust${i}Name`] || `Trust ${i}`;
            baseOptions.push({ value: `trust${i}`, label: String(trustName) });
          }

          const corpCount = parseInt(String(answers.get(6)?.corporationCount || '0'));
          for (let i = 1; i <= corpCount; i++) {
            const corpName = answers.get(6)?.[`corporation${i}Name`] || `Corporation ${i}`;
            baseOptions.push({ value: `corp${i}`, label: String(corpName) });
          }

          baseOptions.push({ value: 'other', label: 'Other' });

          return baseOptions;
        },
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7,
      },
      {
        key: 'property7OtherOwner',
        label: 'Enter name of other owner:',
        type: 'text',
        placeholder: 'Enter owner name',
        required: false,
        condition: (formData: Record<string, string>) => {
          const owners = formData.property7Owners;
          const ownersArray = Array.isArray(owners) ? owners : (typeof owners === 'string' ? owners.split(',') : []);
          return formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7 && ownersArray.includes('other');
        },
      },
      {
        key: 'property7OwnershipStructure',
        label: 'Describe the ownership structure:',
        type: 'radio',
        options: [
          { value: 'joint', label: 'Joint with Right of Survivorship' },
          { value: 'tenants', label: 'Tenants in Common' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7,
      },
      {
        key: 'property7AddressLabel',
        label: (answers) => {
          const propertyName = answers.get(9)?.property7Name || 'this property';
          return `What is the address for ${propertyName}?`;
        },
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7,
      },
      {
        key: 'property7Address',
        label: 'Address Line:',
        type: 'text',
        placeholder: 'Enter street address',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7,
      },
      {
        key: 'property7City',
        label: 'City:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7,
      },
      {
        key: 'property7Province',
        label: 'Province/State:',
        type: 'text',
        placeholder: 'Enter province or state',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7,
      },
      {
        key: 'property7Country',
        label: 'Country:',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7,
      },
      {
        key: 'property7PostalCode',
        label: 'Postal Code:',
        type: 'text',
        placeholder: 'Enter postal code',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7,
      },
      {
        key: 'property7RecordsLabel',
        label: 'Please indicate what records you have and where they are stored.',
        type: 'label',
        description: 'These records help determine the tax cost of your property and can significantly impact taxes owing when it is sold or transferred.',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7,
      },
      {
        key: 'property7RecordPurchaseDocs',
        label: 'Do you have Original Purchase Documents?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7,
      },
      {
        key: 'property7RecordPurchaseDocsLocation',
        label: 'Storage Location for Purchase Documents:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7 && formData.property7RecordPurchaseDocs === 'yes',
      },
      {
        key: 'property7RecordLegalFees',
        label: 'Do you have Legal Fees and Land Transfer Tax Paid at Purchase?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7,
      },
      {
        key: 'property7RecordLegalFeesLocation',
        label: 'Storage Location for Legal Fees and Land Transfer Tax:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7 && formData.property7RecordLegalFees === 'yes',
      },
      {
        key: 'property7RecordImprovements',
        label: 'Do you have Capital Improvements records (e.g., renovations, additions, major upgrades)?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7,
      },
      {
        key: 'property7RecordImprovementsLocation',
        label: 'Storage Location for Capital Improvements:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7 && formData.property7RecordImprovements === 'yes',
      },
      {
        key: 'property7RecordAppraisals',
        label: 'Do you have Appraisals or Valuations?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7,
      },
      {
        key: 'property7RecordAppraisalsLocation',
        label: 'Storage Location for Appraisals or Valuations:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7 && formData.property7RecordAppraisals === 'yes',
      },
      {
        key: 'property7IsRental',
        label: 'Is this a rental property?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7,
      },
      {
        key: 'property7LeaseStorage',
        label: 'Where do you keep lease contracts?',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7 && formData.property7IsRental === 'yes',
      },
      {
        key: 'property7LawyerLabel',
        label: 'Lawyer who handled the purchase:',
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7,
      },
      {
        key: 'property7LawyerName',
        label: 'Lawyer Name:',
        type: 'text',
        placeholder: 'Enter lawyer name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7,
      },
      {
        key: 'property7LawyerFirm',
        label: 'Law Firm Name:',
        type: 'text',
        placeholder: 'Enter law firm name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7,
      },
      {
        key: 'property7LawyerPhone',
        label: 'Phone Number:',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7,
      },
      {
        key: 'property7LawyerEmail',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 7,
      },
      {
        key: 'property8Name',
        label: 'Property Name:',
        type: 'text',
        placeholder: 'Enter property name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8,
      },
      {
        key: 'property8PurchaseYear',
        label: 'Purchase Year:',
        type: 'select',
        options: generateYearOptions,
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8,
      },
      {
        key: 'property8OwnersLabel',
        label: 'Who owns the property?',
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8,
      },
      {
        key: 'property8Owners',
        label: 'Select all that apply:',
        type: 'checkbox',
        options: (answers) => {
          const client1Name = answers.get(1)?.fullName || 'Client 1';
          const maritalStatus = answers.get(1)?.maritalStatus;
          const hasSpouse = maritalStatus === 'married' || maritalStatus === 'common_law';
          const client2Name = answers.get(1)?.spouseFullName || 'Client 2';

          const baseOptions = [
            { value: 'client1', label: client1Name },
          ];

          if (hasSpouse) {
            baseOptions.push({ value: 'client2', label: client2Name });
          }

          const trustCount = parseInt(String(answers.get(4)?.trustCount || '0'));
          for (let i = 1; i <= trustCount; i++) {
            const trustName = answers.get(4)?.[`trust${i}Name`] || `Trust ${i}`;
            baseOptions.push({ value: `trust${i}`, label: String(trustName) });
          }

          const corpCount = parseInt(String(answers.get(6)?.corporationCount || '0'));
          for (let i = 1; i <= corpCount; i++) {
            const corpName = answers.get(6)?.[`corporation${i}Name`] || `Corporation ${i}`;
            baseOptions.push({ value: `corp${i}`, label: String(corpName) });
          }

          baseOptions.push({ value: 'other', label: 'Other' });

          return baseOptions;
        },
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8,
      },
      {
        key: 'property8OtherOwner',
        label: 'Enter name of other owner:',
        type: 'text',
        placeholder: 'Enter owner name',
        required: false,
        condition: (formData: Record<string, string>) => {
          const owners = formData.property8Owners;
          const ownersArray = Array.isArray(owners) ? owners : (typeof owners === 'string' ? owners.split(',') : []);
          return formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8 && ownersArray.includes('other');
        },
      },
      {
        key: 'property8OwnershipStructure',
        label: 'Describe the ownership structure:',
        type: 'radio',
        options: [
          { value: 'joint', label: 'Joint with Right of Survivorship' },
          { value: 'tenants', label: 'Tenants in Common' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8,
      },
      {
        key: 'property8AddressLabel',
        label: (answers) => {
          const propertyName = answers.get(9)?.property8Name || 'this property';
          return `What is the address for ${propertyName}?`;
        },
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8,
      },
      {
        key: 'property8Address',
        label: 'Address Line:',
        type: 'text',
        placeholder: 'Enter street address',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8,
      },
      {
        key: 'property8City',
        label: 'City:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8,
      },
      {
        key: 'property8Province',
        label: 'Province/State:',
        type: 'text',
        placeholder: 'Enter province or state',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8,
      },
      {
        key: 'property8Country',
        label: 'Country:',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8,
      },
      {
        key: 'property8PostalCode',
        label: 'Postal Code:',
        type: 'text',
        placeholder: 'Enter postal code',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8,
      },
      {
        key: 'property8RecordsLabel',
        label: 'Please indicate what records you have and where they are stored.',
        type: 'label',
        description: 'These records help determine the tax cost of your property and can significantly impact taxes owing when it is sold or transferred.',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8,
      },
      {
        key: 'property8RecordPurchaseDocs',
        label: 'Do you have Original Purchase Documents?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8,
      },
      {
        key: 'property8RecordPurchaseDocsLocation',
        label: 'Storage Location for Purchase Documents:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8 && formData.property8RecordPurchaseDocs === 'yes',
      },
      {
        key: 'property8RecordLegalFees',
        label: 'Do you have Legal Fees and Land Transfer Tax Paid at Purchase?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8,
      },
      {
        key: 'property8RecordLegalFeesLocation',
        label: 'Storage Location for Legal Fees and Land Transfer Tax:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8 && formData.property8RecordLegalFees === 'yes',
      },
      {
        key: 'property8RecordImprovements',
        label: 'Do you have Capital Improvements records (e.g., renovations, additions, major upgrades)?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8,
      },
      {
        key: 'property8RecordImprovementsLocation',
        label: 'Storage Location for Capital Improvements:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8 && formData.property8RecordImprovements === 'yes',
      },
      {
        key: 'property8RecordAppraisals',
        label: 'Do you have Appraisals or Valuations?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8,
      },
      {
        key: 'property8RecordAppraisalsLocation',
        label: 'Storage Location for Appraisals or Valuations:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8 && formData.property8RecordAppraisals === 'yes',
      },
      {
        key: 'property8IsRental',
        label: 'Is this a rental property?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8,
      },
      {
        key: 'property8LeaseStorage',
        label: 'Where do you keep lease contracts?',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8 && formData.property8IsRental === 'yes',
      },
      {
        key: 'property8LawyerLabel',
        label: 'Lawyer who handled the purchase:',
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8,
      },
      {
        key: 'property8LawyerName',
        label: 'Lawyer Name:',
        type: 'text',
        placeholder: 'Enter lawyer name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8,
      },
      {
        key: 'property8LawyerFirm',
        label: 'Law Firm Name:',
        type: 'text',
        placeholder: 'Enter law firm name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8,
      },
      {
        key: 'property8LawyerPhone',
        label: 'Phone Number:',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8,
      },
      {
        key: 'property8LawyerEmail',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 8,
      },
      {
        key: 'property9Name',
        label: 'Property Name:',
        type: 'text',
        placeholder: 'Enter property name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9,
      },
      {
        key: 'property9PurchaseYear',
        label: 'Purchase Year:',
        type: 'select',
        options: generateYearOptions,
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9,
      },
      {
        key: 'property9OwnersLabel',
        label: 'Who owns the property?',
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9,
      },
      {
        key: 'property9Owners',
        label: 'Select all that apply:',
        type: 'checkbox',
        options: (answers) => {
          const client1Name = answers.get(1)?.fullName || 'Client 1';
          const maritalStatus = answers.get(1)?.maritalStatus;
          const hasSpouse = maritalStatus === 'married' || maritalStatus === 'common_law';
          const client2Name = answers.get(1)?.spouseFullName || 'Client 2';

          const baseOptions = [
            { value: 'client1', label: client1Name },
          ];

          if (hasSpouse) {
            baseOptions.push({ value: 'client2', label: client2Name });
          }

          const trustCount = parseInt(String(answers.get(4)?.trustCount || '0'));
          for (let i = 1; i <= trustCount; i++) {
            const trustName = answers.get(4)?.[`trust${i}Name`] || `Trust ${i}`;
            baseOptions.push({ value: `trust${i}`, label: String(trustName) });
          }

          const corpCount = parseInt(String(answers.get(6)?.corporationCount || '0'));
          for (let i = 1; i <= corpCount; i++) {
            const corpName = answers.get(6)?.[`corporation${i}Name`] || `Corporation ${i}`;
            baseOptions.push({ value: `corp${i}`, label: String(corpName) });
          }

          baseOptions.push({ value: 'other', label: 'Other' });

          return baseOptions;
        },
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9,
      },
      {
        key: 'property9OtherOwner',
        label: 'Enter name of other owner:',
        type: 'text',
        placeholder: 'Enter owner name',
        required: false,
        condition: (formData: Record<string, string>) => {
          const owners = formData.property9Owners;
          const ownersArray = Array.isArray(owners) ? owners : (typeof owners === 'string' ? owners.split(',') : []);
          return formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9 && ownersArray.includes('other');
        },
      },
      {
        key: 'property9OwnershipStructure',
        label: 'Describe the ownership structure:',
        type: 'radio',
        options: [
          { value: 'joint', label: 'Joint with Right of Survivorship' },
          { value: 'tenants', label: 'Tenants in Common' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9,
      },
      {
        key: 'property9AddressLabel',
        label: (answers) => {
          const propertyName = answers.get(9)?.property9Name || 'this property';
          return `What is the address for ${propertyName}?`;
        },
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9,
      },
      {
        key: 'property9Address',
        label: 'Address Line:',
        type: 'text',
        placeholder: 'Enter street address',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9,
      },
      {
        key: 'property9City',
        label: 'City:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9,
      },
      {
        key: 'property9Province',
        label: 'Province/State:',
        type: 'text',
        placeholder: 'Enter province or state',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9,
      },
      {
        key: 'property9Country',
        label: 'Country:',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9,
      },
      {
        key: 'property9PostalCode',
        label: 'Postal Code:',
        type: 'text',
        placeholder: 'Enter postal code',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9,
      },
      {
        key: 'property9RecordsLabel',
        label: 'Please indicate what records you have and where they are stored.',
        type: 'label',
        description: 'These records help determine the tax cost of your property and can significantly impact taxes owing when it is sold or transferred.',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9,
      },
      {
        key: 'property9RecordPurchaseDocs',
        label: 'Do you have Original Purchase Documents?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9,
      },
      {
        key: 'property9RecordPurchaseDocsLocation',
        label: 'Storage Location for Purchase Documents:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9 && formData.property9RecordPurchaseDocs === 'yes',
      },
      {
        key: 'property9RecordLegalFees',
        label: 'Do you have Legal Fees and Land Transfer Tax Paid at Purchase?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9,
      },
      {
        key: 'property9RecordLegalFeesLocation',
        label: 'Storage Location for Legal Fees and Land Transfer Tax:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9 && formData.property9RecordLegalFees === 'yes',
      },
      {
        key: 'property9RecordImprovements',
        label: 'Do you have Capital Improvements records (e.g., renovations, additions, major upgrades)?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9,
      },
      {
        key: 'property9RecordImprovementsLocation',
        label: 'Storage Location for Capital Improvements:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9 && formData.property9RecordImprovements === 'yes',
      },
      {
        key: 'property9RecordAppraisals',
        label: 'Do you have Appraisals or Valuations?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9,
      },
      {
        key: 'property9RecordAppraisalsLocation',
        label: 'Storage Location for Appraisals or Valuations:',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9 && formData.property9RecordAppraisals === 'yes',
      },
      {
        key: 'property9IsRental',
        label: 'Is this a rental property?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9,
      },
      {
        key: 'property9LeaseStorage',
        label: 'Where do you keep lease contracts?',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9 && formData.property9IsRental === 'yes',
      },
      {
        key: 'property9LawyerLabel',
        label: 'Lawyer who handled the purchase:',
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9,
      },
      {
        key: 'property9LawyerName',
        label: 'Lawyer Name:',
        type: 'text',
        placeholder: 'Enter lawyer name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9,
      },
      {
        key: 'property9LawyerFirm',
        label: 'Law Firm Name:',
        type: 'text',
        placeholder: 'Enter law firm name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9,
      },
      {
        key: 'property9LawyerPhone',
        label: 'Phone Number:',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9,
      },
      {
        key: 'property9LawyerEmail',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes' && parseInt(formData.propertyCount || '0') >= 9,
      },
    ],
  },
  {
    id: 10,
    title: 'Outstanding Debts',
    description: 'Information about any outstanding debts (not including credit cards)',
    questions: [
      {
        key: 'hasDebts',
        label: 'Do you have any outstanding Debts not including credit cards?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
    ],
  },
  {
    id: 11,
    title: 'Life Insurance',
    description: 'Information about life insurance, disability insurance, and critical illness policies',
    questions: [
      {
        key: 'client1HasWorkBenefits',
        label: 'Do you have life, disability, or critical illness insurance through your work?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'client2HasWorkBenefits',
        label: 'Do you have life, disability, or critical illness insurance through your work?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client1HasLifeInsurance',
        label: 'Outside of benefits through your company, do you have any Life Insurance policies?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'client1LifeInsuranceCount',
        label: 'How many Life Insurance policies do you have?',
        type: 'number',
        placeholder: '0',
        required: false,
      },
      {
        key: 'client2HasLifeInsurance',
        label: 'Outside of benefits through your company, do you have any Life Insurance policies?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client2LifeInsuranceCount',
        label: 'How many Life Insurance policies do you have?',
        type: 'number',
        placeholder: '0',
        required: false,
      },
      {
        key: 'client1HasDisabilityInsurance',
        label: 'Do you have any Disability Insurance policies?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'client1DisabilityInsuranceCount',
        label: 'How many Disability Insurance policies do you have?',
        type: 'number',
        placeholder: '0',
        required: false,
      },
      {
        key: 'client2HasDisabilityInsurance',
        label: 'Do you have any Disability Insurance policies?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client2DisabilityInsuranceCount',
        label: 'How many Disability Insurance policies do you have?',
        type: 'number',
        placeholder: '0',
        required: false,
      },
      {
        key: 'client1HasCriticalIllness',
        label: 'Do you have any Critical Illness policies?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'client1CriticalIllnessCount',
        label: 'How many Critical Illness policies do you have?',
        type: 'number',
        placeholder: '0',
        required: false,
      },
      {
        key: 'client2HasCriticalIllness',
        label: 'Do you have any Critical Illness policies?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client2CriticalIllnessCount',
        label: 'How many Critical Illness policies do you have?',
        type: 'number',
        placeholder: '0',
        required: false,
      },
    ],
  },
  {
    id: 12,
    title: 'Property and Casualty Insurance',
    description: 'Information about home and property insurance',
    questions: [
      {
        key: 'hasHomeInsurance',
        label: 'Do you have home insurance?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'homeInsuranceDocLocation',
        label: 'Where is the home insurance document stored?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
      {
        key: 'hasAdditionalProperties',
        label: 'Do you have additional properties?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'additionalPropertiesCount',
        label: 'How many additional properties do you have?',
        type: 'number',
        placeholder: '0',
        required: false,
      },
      {
        key: 'additionalProperty1DocLocation',
        label: 'Where are the property insurance documents stored for Additional Property 1?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
      {
        key: 'additionalProperty2DocLocation',
        label: 'Where are the property insurance documents stored for Additional Property 2?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
      {
        key: 'additionalProperty3DocLocation',
        label: 'Where are the property insurance documents stored for Additional Property 3?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
      {
        key: 'additionalProperty4DocLocation',
        label: 'Where are the property insurance documents stored for Additional Property 4?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
      {
        key: 'additionalProperty5DocLocation',
        label: 'Where are the property insurance documents stored for Additional Property 5?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
      {
        key: 'additionalProperty6DocLocation',
        label: 'Where are the property insurance documents stored for Additional Property 6?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
      {
        key: 'additionalProperty7DocLocation',
        label: 'Where are the property insurance documents stored for Additional Property 7?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
      {
        key: 'additionalProperty8DocLocation',
        label: 'Where are the property insurance documents stored for Additional Property 8?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
      {
        key: 'additionalProperty9DocLocation',
        label: 'Where are the property insurance documents stored for Additional Property 9?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
      {
        key: 'additionalProperty10DocLocation',
        label: 'Where are the property insurance documents stored for Additional Property 10?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
      {
        key: 'client1HasVehicleInsurance',
        label: 'Do you have vehicle insurance?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'client1VehicleDescription',
        label: 'Vehicle description',
        type: 'text',
        placeholder: 'Enter vehicle description',
        required: false,
      },
      {
        key: 'client1VehicleInsuranceDocLocation',
        label: 'Where is the vehicle insurance stored?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
      {
        key: 'client2HasVehicleInsurance',
        label: 'Do you have vehicle insurance?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client2VehicleDescription',
        label: 'Vehicle description',
        type: 'text',
        placeholder: 'Enter vehicle description',
        required: false,
      },
      {
        key: 'client2VehicleInsuranceDocLocation',
        label: 'Where is the vehicle insurance stored?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
      {
        key: 'hasAdditionalVehicles',
        label: 'Do you have additional vehicles?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'additionalVehiclesCount',
        label: 'How many additional vehicles do you have?',
        type: 'number',
        placeholder: '0',
        required: false,
      },
      {
        key: 'additionalVehicle1Description',
        label: 'Vehicle description for Additional Vehicle 1',
        type: 'text',
        placeholder: 'Enter vehicle description',
        required: false,
      },
      {
        key: 'additionalVehicle1DocLocation',
        label: 'Where is the vehicle insurance stored for Additional Vehicle 1?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
      {
        key: 'additionalVehicle2Description',
        label: 'Vehicle description for Additional Vehicle 2',
        type: 'text',
        placeholder: 'Enter vehicle description',
        required: false,
      },
      {
        key: 'additionalVehicle2DocLocation',
        label: 'Where is the vehicle insurance stored for Additional Vehicle 2?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
      {
        key: 'additionalVehicle3Description',
        label: 'Vehicle description for Additional Vehicle 3',
        type: 'text',
        placeholder: 'Enter vehicle description',
        required: false,
      },
      {
        key: 'additionalVehicle3DocLocation',
        label: 'Where is the vehicle insurance stored for Additional Vehicle 3?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
      {
        key: 'additionalVehicle4Description',
        label: 'Vehicle description for Additional Vehicle 4',
        type: 'text',
        placeholder: 'Enter vehicle description',
        required: false,
      },
      {
        key: 'additionalVehicle4DocLocation',
        label: 'Where is the vehicle insurance stored for Additional Vehicle 4?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
      {
        key: 'additionalVehicle5Description',
        label: 'Vehicle description for Additional Vehicle 5',
        type: 'text',
        placeholder: 'Enter vehicle description',
        required: false,
      },
      {
        key: 'additionalVehicle5DocLocation',
        label: 'Where is the vehicle insurance stored for Additional Vehicle 5?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
      {
        key: 'additionalVehicle6Description',
        label: 'Vehicle description for Additional Vehicle 6',
        type: 'text',
        placeholder: 'Enter vehicle description',
        required: false,
      },
      {
        key: 'additionalVehicle6DocLocation',
        label: 'Where is the vehicle insurance stored for Additional Vehicle 6?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
      {
        key: 'additionalVehicle7Description',
        label: 'Vehicle description for Additional Vehicle 7',
        type: 'text',
        placeholder: 'Enter vehicle description',
        required: false,
      },
      {
        key: 'additionalVehicle7DocLocation',
        label: 'Where is the vehicle insurance stored for Additional Vehicle 7?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
      {
        key: 'additionalVehicle8Description',
        label: 'Vehicle description for Additional Vehicle 8',
        type: 'text',
        placeholder: 'Enter vehicle description',
        required: false,
      },
      {
        key: 'additionalVehicle8DocLocation',
        label: 'Where is the vehicle insurance stored for Additional Vehicle 8?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
      {
        key: 'additionalVehicle9Description',
        label: 'Vehicle description for Additional Vehicle 9',
        type: 'text',
        placeholder: 'Enter vehicle description',
        required: false,
      },
      {
        key: 'additionalVehicle9DocLocation',
        label: 'Where is the vehicle insurance stored for Additional Vehicle 9?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
      {
        key: 'additionalVehicle10Description',
        label: 'Vehicle description for Additional Vehicle 10',
        type: 'text',
        placeholder: 'Enter vehicle description',
        required: false,
      },
      {
        key: 'additionalVehicle10DocLocation',
        label: 'Where is the vehicle insurance stored for Additional Vehicle 10?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
    ],
  },
  {
    id: 13,
    title: 'Pensions and Retirement Benefits',
    description: 'Information about pension plans',
    questions: [
      {
        key: 'client1HasPension',
        label: 'Are you or have you been a member of a pension plan?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'client2HasPension',
        label: 'Are you or have you been a member of a pension plan?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client1HasESOP',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName || 'Client 1';
          return `${client1Name}, do you have an Employee Stock Option Plan (ESOP)?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'client1ESOPEmployer',
        label: 'Name of Employer:',
        type: 'text',
        placeholder: 'Enter employer name',
        required: false,
        condition: (answers) => answers.client1HasESOP === 'yes',
      },
      {
        key: 'client1ESOPLocation',
        label: 'Where is the information on your ESOP stored?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
        condition: (answers) => answers.client1HasESOP === 'yes',
      },
      {
        key: 'client2HasESOP',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName || 'Client 2';
          return `${client2Name}, do you have an Employee Stock Option Plan (ESOP)?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client2ESOPEmployer',
        label: 'Name of Employer:',
        type: 'text',
        placeholder: 'Enter employer name',
        required: false,
        condition: (answers) => answers.client2HasESOP === 'yes',
      },
      {
        key: 'client2ESOPLocation',
        label: 'Where is the information on your ESOP stored?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
        condition: (answers) => answers.client2HasESOP === 'yes',
      },
    ],
  },
  {
    id: 14,
    title: 'Professional Association Insurance',
    description: 'Insurance coverage through professional associations or alumni groups',
    questions: [
      {
        key: 'client1HasProfessionalAssociationInsurance',
        label: 'Do you have any insurance coverage through professional associations or alumni groups?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'client1ProfessionalAssociationDescription',
        label: 'Describe the association or group.',
        type: 'text',
        placeholder: 'Enter association or group description',
        required: false,
      },
      {
        key: 'client1ProfessionalAssociationDocLocation',
        label: 'Where is the document for insurance through a professional association or group located?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
      {
        key: 'client2HasProfessionalAssociationInsurance',
        label: 'Do you have any insurance coverage through professional associations or alumni groups?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client2ProfessionalAssociationDescription',
        label: 'Describe the association or group.',
        type: 'text',
        placeholder: 'Enter association or group description',
        required: false,
      },
      {
        key: 'client2ProfessionalAssociationDocLocation',
        label: 'Where is the document for insurance through a professional association or group located?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
      },
    ],
  },
];
