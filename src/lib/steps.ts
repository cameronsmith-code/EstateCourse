
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
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'email' | 'tel' | 'date' | 'number' | 'checkbox-group';
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
    title: 'About You',
    description: 'Let\'s get started with a few quick questions',
    questions: [
      {
        key: 'fullName',
        label: 'Client 1 — Full Name',
        type: 'text',
        placeholder: 'Enter full name',
        required: true,
      },
      {
        key: 'dateOfBirth',
        label: (answers) => {
          const name = answers.get(1)?.fullName as string || 'Client 1';
          return `${name}'s Date of Birth`;
        },
        type: 'date',
        required: true,
      },
      {
        key: 'address',
        label: (answers) => {
          const name = answers.get(1)?.fullName as string || 'Client 1';
          return `${name}'s Address`;
        },
        type: 'text',
        placeholder: 'Enter street address',
        required: true,
      },
      {
        key: 'city',
        label: (answers) => {
          const name = answers.get(1)?.fullName as string || 'Client 1';
          return `${name}'s City`;
        },
        type: 'text',
        placeholder: 'Enter city',
        required: true,
      },
      {
        key: 'province',
        label: (answers) => {
          const name = answers.get(1)?.fullName as string || 'Client 1';
          return `${name}'s Province`;
        },
        type: 'text',
        placeholder: 'Enter province',
        required: true,
      },
      {
        key: 'postalCode',
        label: (answers) => {
          const name = answers.get(1)?.fullName as string || 'Client 1';
          return `${name}'s Postal Code`;
        },
        type: 'text',
        placeholder: 'Enter postal code',
        required: true,
      },
      {
        key: 'email',
        label: (answers) => {
          const name = answers.get(1)?.fullName as string || 'Client 1';
          return `${name}'s Email Address`;
        },
        type: 'email',
        placeholder: 'Enter email address',
        required: true,
      },
      {
        key: 'phone',
        label: (answers) => {
          const name = answers.get(1)?.fullName as string || 'Client 1';
          return `${name}'s Phone Number`;
        },
        type: 'text',
        placeholder: 'Enter phone number',
        required: true,
      },
      {
        key: 'maritalStatus',
        label: (answers) => {
          const name = answers.get(1)?.fullName as string || 'Client 1';
          return `${name}'s Marital Status`;
        },
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
        label: (answers) => {
          const name = answers.get(1)?.fullName as string || 'Client 1';
          return `${name}'s Spouse or Common-Law Partner's Name`;
        },
        type: 'text',
        placeholder: 'Enter spouse/partner\'s name',
        required: false,
      },
      {
        key: 'spouseSameAddress',
        label: (answers) => {
          const c1Full = answers.get(1)?.fullName as string || 'Client 1';
          const c2Full = answers.get(1)?.spouseName as string || 'Client 2';
          const c1 = c1Full.split(' ')[0];
          const c2 = c2Full.split(' ')[0];
          return `Does ${c1} and ${c2} live at the same address?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'spouseDateOfBirth',
        label: (answers) => {
          const name = answers.get(1)?.spouseName as string || 'Client 2';
          return `${name}'s Date of Birth`;
        },
        type: 'date',
        required: false,
      },
      {
        key: 'spouseAddress',
        label: (answers) => {
          const name = answers.get(1)?.spouseName as string || 'Client 2';
          return `${name}'s Address`;
        },
        type: 'text',
        placeholder: 'Enter street address',
        required: false,
      },
      {
        key: 'spouseCity',
        label: (answers) => {
          const name = answers.get(1)?.spouseName as string || 'Client 2';
          return `${name}'s City`;
        },
        type: 'text',
        placeholder: 'Enter city',
        required: false,
      },
      {
        key: 'spouseProvince',
        label: (answers) => {
          const name = answers.get(1)?.spouseName as string || 'Client 2';
          return `${name}'s Province`;
        },
        type: 'text',
        placeholder: 'Enter province',
        required: false,
      },
      {
        key: 'spousePostalCode',
        label: (answers) => {
          const name = answers.get(1)?.spouseName as string || 'Client 2';
          return `${name}'s Postal Code`;
        },
        type: 'text',
        placeholder: 'Enter postal code',
        required: false,
      },
      {
        key: 'spouseEmail',
        label: (answers) => {
          const name = answers.get(1)?.spouseName as string || 'Client 2';
          return `${name}'s Email Address`;
        },
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
      },
      {
        key: 'spousePhone',
        label: (answers) => {
          const name = answers.get(1)?.spouseName as string || 'Client 2';
          return `${name}'s Phone Number`;
        },
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
      },
      {
        key: 'hasMarriageContract',
        label: (answers) => {
          const c1Full = answers.get(1)?.fullName as string || 'Client 1';
          const c2Full = answers.get(1)?.spouseName as string || 'Client 2';
          const c1 = c1Full.split(' ')[0];
          const c2 = c2Full.split(' ')[0];
          return `Does ${c1} and ${c2} have a marriage contract (prenuptial agreement)?`;
        },
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
          const name = answers.get(1)?.fullName as string || 'Client 1';
          return `Has ${name} previously been married or in a common-law relationship?`;
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
        label: (answers) => {
          const name = answers.get(1)?.fullName as string || 'Client 1';
          return `How many previous marriages or common-law relationships has ${name} had?`;
        },
        type: 'number',
        placeholder: '0',
        required: false,
      },
      {
        key: 'client2HasPreviousRelationship',
        label: (answers) => {
          const name = answers.get(1)?.spouseName as string || 'Client 2';
          return `Has ${name} previously been married or in a common-law relationship?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client2NumberOfPreviousRelationships',
        label: (answers) => {
          const name = answers.get(1)?.spouseName as string || 'Client 2';
          return `How many previous marriages or common-law relationships has ${name} had?`;
        },
        type: 'number',
        placeholder: '0',
        required: false,
      },
      {
        key: 'hasChildren',
        label: (answers) => {
          const c1 = answers.get(1)?.fullName as string || 'Client 1';
          const c2 = answers.get(1)?.spouseName as string;
          return c2
            ? `Do ${c1} and ${c2} have any children (from their or any other relationship)?`
            : `Does ${c1} have any children (from their or any other relationship)?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'numberOfChildren',
        label: (answers) => {
          const c1 = answers.get(1)?.fullName as string || 'Client 1';
          const c2 = answers.get(1)?.spouseName as string;
          return c2 ? `How many children do ${c1} and ${c2} have?` : `How many children does ${c1} have?`;
        },
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
      {
        key: 'hasAdditionalFamilyTrust',
        label: 'Do you have additional Family Trusts?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasFamilyTrust === 'yes',
      },
      // ── Additional Trust 2 ───────────────────────────────────────────────────
      {
        key: 'trust2LegalName',
        label: 'What is the Trust\'s legal name?',
        type: 'text',
        placeholder: 'Enter the trust\'s legal name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasAdditionalFamilyTrust === 'yes',
      },
      {
        key: 'trust2DeedLocation',
        label: 'Where is the Trust Deed located?',
        type: 'text',
        placeholder: 'e.g., Safe deposit box, lawyer\'s office, home safe',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasAdditionalFamilyTrust === 'yes',
      },
      {
        key: 'trust2YearEstablished',
        label: 'What year was the Trust established?',
        type: 'number',
        placeholder: 'Enter year (e.g., 2020)',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasAdditionalFamilyTrust === 'yes',
      },
      {
        key: 'trust2BeneficiariesCount',
        label: 'How many beneficiaries are there for the Trust?',
        type: 'number',
        placeholder: 'Enter number of beneficiaries',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasAdditionalFamilyTrust === 'yes',
      },
      {
        key: 'hasAdditionalFamilyTrust2',
        label: 'Do you have additional Family Trusts?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasAdditionalFamilyTrust === 'yes',
      },
      // ── Additional Trust 3 ───────────────────────────────────────────────────
      {
        key: 'trust3LegalName',
        label: 'What is the Trust\'s legal name?',
        type: 'text',
        placeholder: 'Enter the trust\'s legal name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasAdditionalFamilyTrust2 === 'yes',
      },
      {
        key: 'trust3DeedLocation',
        label: 'Where is the Trust Deed located?',
        type: 'text',
        placeholder: 'e.g., Safe deposit box, lawyer\'s office, home safe',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasAdditionalFamilyTrust2 === 'yes',
      },
      {
        key: 'trust3YearEstablished',
        label: 'What year was the Trust established?',
        type: 'number',
        placeholder: 'Enter year (e.g., 2020)',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasAdditionalFamilyTrust2 === 'yes',
      },
      {
        key: 'trust3BeneficiariesCount',
        label: 'How many beneficiaries are there for the Trust?',
        type: 'number',
        placeholder: 'Enter number of beneficiaries',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasAdditionalFamilyTrust2 === 'yes',
      },
      {
        key: 'hasAdditionalFamilyTrust3',
        label: 'Do you have additional Family Trusts?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasAdditionalFamilyTrust2 === 'yes',
      },
      // ── Additional Trust 4 ───────────────────────────────────────────────────
      {
        key: 'trust4LegalName',
        label: 'What is the Trust\'s legal name?',
        type: 'text',
        placeholder: 'Enter the trust\'s legal name',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasAdditionalFamilyTrust3 === 'yes',
      },
      {
        key: 'trust4DeedLocation',
        label: 'Where is the Trust Deed located?',
        type: 'text',
        placeholder: 'e.g., Safe deposit box, lawyer\'s office, home safe',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasAdditionalFamilyTrust3 === 'yes',
      },
      {
        key: 'trust4YearEstablished',
        label: 'What year was the Trust established?',
        type: 'number',
        placeholder: 'Enter year (e.g., 2020)',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasAdditionalFamilyTrust3 === 'yes',
      },
      {
        key: 'trust4BeneficiariesCount',
        label: 'How many beneficiaries are there for the Trust?',
        type: 'number',
        placeholder: 'Enter number of beneficiaries',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasAdditionalFamilyTrust3 === 'yes',
      },
    ],
  },
  {
    id: 5,
    title: 'Sole Proprietorships and Partnerships',
    description: 'Information about any non-incorporated businesses you have an interest in.',
    questions: [
      {
        key: 'hasSoleProprietorship',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName || 'Client 1';
          return `${client1Name}, do you have ownership in a sole proprietorship?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'soleProprietorshipCount',
        label: 'How many sole proprietorships do you own?',
        type: 'number',
        placeholder: '0',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasSoleProprietorship === 'yes',
      },
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
        key: 'partnershipCount',
        label: 'How many partnerships do you own?',
        type: 'number',
        placeholder: '0',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasPartnership === 'yes',
      },
      {
        key: 'client2HasSoleProprietorship',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName || 'Client 2';
          return `${client2Name}, do you have ownership in a sole proprietorship?`;
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
        key: 'client2SoleProprietorshipCount',
        label: 'How many sole proprietorships do you own?',
        type: 'number',
        placeholder: '0',
        required: false,
        condition: (formData: Record<string, string>) => {
          const maritalStatus = formData.maritalStatus;
          const hasSpouse = maritalStatus === 'married' || maritalStatus === 'common_law';
          return hasSpouse && formData.client2HasSoleProprietorship === 'yes';
        },
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
        key: 'client2PartnershipCount',
        label: 'How many partnerships do you own?',
        type: 'number',
        placeholder: '0',
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
    title: 'Your Professional Team',
    description: 'The people who help manage your family\'s financial, legal, tax, and healthcare affairs.\nIf something happened to you, these are the professionals your executor, attorney for property, attorney for personal care, or future caregiver may need to contact.',
    questions: [
      {
        key: 'fpHasAdvisor',
        label: 'Do you currently work with a financial planner or investment advisor?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'fpAdvisor1Firm',
        label: 'Firm',
        type: 'text',
        placeholder: 'Enter firm name',
        required: false,
      },
      {
        key: 'fpAdvisor1Name',
        label: 'Advisor name',
        type: 'text',
        placeholder: 'Enter advisor name',
        required: false,
      },
      {
        key: 'fpAdvisor1Phone',
        label: 'Phone',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
      },
      {
        key: 'fpAdvisor1Email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
      },
      {
        key: 'fpAdvisor1Website',
        label: 'Website (optional)',
        type: 'text',
        placeholder: 'Enter website URL',
        required: false,
      },
      {
        key: 'fpAdvisor1Services',
        label: 'What do they help you with?',
        type: 'checkbox-group',
        options: [
          { value: 'investments', label: 'Investments' },
          { value: 'retirement_planning', label: 'Retirement planning' },
          { value: 'insurance', label: 'Insurance' },
          { value: 'estate_planning', label: 'Estate planning' },
          { value: 'tax_planning', label: 'Tax planning' },
          { value: 'cash_flow', label: 'Cash flow' },
          { value: 'business_planning', label: 'Business planning' },
          { value: 'other', label: 'Other' },
        ],
        required: false,
      },
      {
        key: 'fpAdvisor1Duration',
        label: 'How long have you worked together?',
        type: 'text',
        placeholder: 'e.g., 5 years',
        required: false,
      },
      {
        key: 'fpAdvisor1IncludeInContactList',
        label: 'May we include this professional in your executor\'s contact list and action guide?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'fpHasAdditionalAdvisor',
        label: 'Is there an additional Financial Planner/Wealth Advisor that you work with?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
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
    description: 'Real estate is often one of the largest and most emotionally significant parts of an estate. This section helps us understand what properties you own or rent, who owns them, where important documents are kept, and whether there are any planning opportunities or potential challenges for your executor and family.',
    questions: [
      {
        key: 'livingSituation',
        label: 'Which best describes your current living situation?',
        type: 'radio',
        options: [
          { value: 'own', label: 'I own my home' },
          { value: 'rent', label: 'I rent my home' },
          { value: 'family', label: 'I live with family' },
          { value: 'retirement', label: 'I live in a retirement residence' },
          { value: 'other', label: 'Other' },
        ],
        required: true,
      },
      {
        key: 'rentLandlordName',
        label: 'Landlord / Company Name',
        type: 'text',
        placeholder: 'Enter landlord or company name',
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'rent',
      },
      {
        key: 'rentSameAddress',
        label: (answers: Map<number, Record<string, unknown>>) => {
          const step1 = answers.get(1) as Record<string, string> | undefined;
          const addr = step1?.address || '';
          const shortAddr = addr.split(',')[0] || addr;
          return `Is the rental address the same as your address (${shortAddr || '123 Main Street'}?)`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'rent',
      },
      {
        key: 'rentAddress',
        label: 'Rental Street Address',
        type: 'text',
        placeholder: 'Enter street address',
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'rent' && formData.rentSameAddress !== 'yes',
      },
      {
        key: 'rentCity',
        label: 'Rental City',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'rent' && formData.rentSameAddress !== 'yes',
      },
      {
        key: 'rentProvince',
        label: 'Rental Province',
        type: 'text',
        placeholder: 'Enter province',
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'rent' && formData.rentSameAddress !== 'yes',
      },
      {
        key: 'rentPostalCode',
        label: 'Rental Postal Code',
        type: 'text',
        placeholder: 'Enter postal code',
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'rent' && formData.rentSameAddress !== 'yes',
      },
      {
        key: 'rentMonthlyAmount',
        label: 'Monthly Rent',
        type: 'text',
        placeholder: 'Enter monthly rent amount',
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'rent',
      },
      {
        key: 'rentLeaseRenewalDate',
        label: 'Lease Renewal Date',
        type: 'date',
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'rent',
      },
      {
        key: 'rentLeaseStorage',
        label: 'Where is the lease agreement stored?',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'rent',
      },
      {
        key: 'rentAutoPayments',
        label: 'Do you have automatic rent payments set up?',
        type: 'radio',
        options: [
          { value: 'void_cheques', label: 'Void Cheques' },
          { value: 'other', label: 'Other' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'rent',
      },
      {
        key: 'rentAutoPaymentsDetails',
        label: 'Provide details',
        type: 'text',
        placeholder: 'Enter details',
        required: false,
        condition: (formData: Record<string, string>) => formData.rentAutoPayments === 'other',
      },
      {
        key: 'rentSecurityDeposit',
        label: 'Did you pay a security deposit?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'rent',
      },
      {
        key: 'rentParkingStorage',
        label: 'Do you have parking or storage lockers?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'rent',
      },
      {
        key: 'rentKeyLocation',
        label: 'Location of the key to the storage locker:',
        type: 'text',
        placeholder: 'Enter where the key is located',
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'rent' && formData.rentParkingStorage === 'yes',
      },
      {
        key: 'rentNotifyName',
        label: 'Who should be notified in case of emergency?',
        type: 'text',
        placeholder: 'Enter name and contact information',
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'rent',
      },
      {
        key: 'retLandlordName',
        label: 'Retirement Residence Name',
        type: 'text',
        placeholder: 'Enter retirement residence name',
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'retirement',
      },
      {
        key: 'retSameAddress',
        label: (answers: Map<number, Record<string, unknown>>) => {
          const step1 = answers.get(1) as Record<string, string> | undefined;
          const addr = step1?.address || '';
          const shortAddr = addr.split(',')[0] || addr;
          return `Is the retirement residence address the same as your address (${shortAddr || '123 Main Street'}?)`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'retirement',
      },
      {
        key: 'retAddress',
        label: 'Retirement Residence Street Address',
        type: 'text',
        placeholder: 'Enter street address',
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'retirement' && formData.retSameAddress !== 'yes',
      },
      {
        key: 'retCity',
        label: 'Retirement Residence City',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'retirement' && formData.retSameAddress !== 'yes',
      },
      {
        key: 'retProvince',
        label: 'Retirement Residence Province',
        type: 'text',
        placeholder: 'Enter province',
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'retirement' && formData.retSameAddress !== 'yes',
      },
      {
        key: 'retPostalCode',
        label: 'Retirement Residence Postal Code',
        type: 'text',
        placeholder: 'Enter postal code',
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'retirement' && formData.retSameAddress !== 'yes',
      },
      {
        key: 'retMonthlyAmount',
        label: 'Monthly Fee',
        type: 'text',
        placeholder: 'Enter monthly fee amount',
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'retirement',
      },
      {
        key: 'retLeaseRenewalDate',
        label: 'Agreement Renewal Date',
        type: 'date',
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'retirement',
      },
      {
        key: 'retLeaseStorage',
        label: 'Where is the residence agreement stored?',
        type: 'text',
        placeholder: 'Enter storage location',
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'retirement',
      },
      {
        key: 'retAutoPayments',
        label: 'Do you have automatic monthly payments set up?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'retirement',
      },
      {
        key: 'retSecurityDeposit',
        label: 'Did you pay a security deposit?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'retirement',
      },
      {
        key: 'retParkingStorage',
        label: 'Do you have parking or storage lockers?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'retirement',
      },
      {
        key: 'retKeyLocation',
        label: 'Location of the key to the storage locker:',
        type: 'text',
        placeholder: 'Enter where the key is located',
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'retirement' && formData.retParkingStorage === 'yes',
      },
      {
        key: 'retNotifyName',
        label: 'Who should be notified in case of emergency?',
        type: 'text',
        placeholder: 'Enter name and contact information',
        required: false,
        condition: (formData: Record<string, string>) => formData.livingSituation === 'retirement',
      },
      {
        key: 'hasRealEstate',
        label: 'Do you own any real estate?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
        description: 'This includes your home, cottages, rental properties, vacation homes, commercial buildings, farmland, vacant land, or property owned through a corporation, trust, or partnership.',
      },
    ],
  },
];
