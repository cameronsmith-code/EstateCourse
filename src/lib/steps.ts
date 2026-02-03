export type StepQuestion = {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'email' | 'date' | 'number';
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  required?: boolean;
  videoUrl?: string;
  description?: string;
  condition?: (formData: Record<string, string>) => boolean;
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
        label: 'Have you previously been married or in a common law relationship?',
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
        ],
        required: false,
      },
    ],
  },
  {
    id: 6,
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
      {
        key: 'ownsRealEstate',
        label: 'Do you own any real estate?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'primaryResidenceOwner',
        label: 'Who is it owned by?',
        type: 'select',
        options: [
          { value: 'joint_survivorship', label: 'Jointly with right of survivorship' },
          { value: 'joint_tenants', label: 'Jointly as tenants in common' },
          { value: 'client1', label: 'Client 1' },
          { value: 'client2', label: 'Client 2' },
          { value: 'other', label: 'Other' },
        ],
        required: false,
      },
      {
        key: 'isPrimaryResidence',
        label: 'Is this your primary residence?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'isSameAddressAsBeginning',
        label: 'Is it the same address as what we filled in at the beginning of this questionnaire?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        dependsOn: { key: 'isPrimaryResidence', value: 'yes' },
      },
      {
        key: 'hasAdditionalRealEstate',
        label: 'Do you own additional properties?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'additionalPropertiesCount',
        label: 'How many additional properties do you own?',
        type: 'number',
        placeholder: '0',
        required: false,
      },
    ],
  },
  {
    id: 7,
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
    id: 8,
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
    id: 9,
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
    ],
  },
  {
    id: 10,
    title: 'Pensions',
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
    ],
  },
];
