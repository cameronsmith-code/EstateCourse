import { generatePropertyQuestions } from './realEstateHelpers';

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
      {
        key: 'propertyTypes',
        label: 'Which types of property do you own?',
        type: 'checkbox-group',
        options: [
          { value: 'Principal residence', label: 'Principal residence' },
          { value: 'Cottage', label: 'Cottage' },
          { value: 'Vacation property', label: 'Vacation property' },
          { value: 'Rental property', label: 'Rental property' },
          { value: 'Commercial property', label: 'Commercial property' },
          { value: 'Vacant land', label: 'Vacant land' },
          { value: 'Farm', label: 'Farm' },
          { value: 'Condo', label: 'Condo' },
          { value: 'Foreign property', label: 'Foreign property' },
          { value: 'Other', label: 'Other' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes',
      },
      {
        key: 'propertyCount',
        label: 'How many properties do you own?',
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
        condition: (formData: Record<string, string>) => formData.hasRealEstate === 'yes',
      },
      ...generatePropertyQuestions(1),
      ...generatePropertyQuestions(2),
      ...generatePropertyQuestions(3),
      ...generatePropertyQuestions(4),
      ...generatePropertyQuestions(5),
      ...generatePropertyQuestions(6),
      ...generatePropertyQuestions(7),
      ...generatePropertyQuestions(8),
      ...generatePropertyQuestions(9),
      ...generatePropertyQuestions(10),
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
    ],
  },
  {
    id: 14,
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
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaPersonalCare1Phone',
        label: 'Phone Number:',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaPersonalCare1Email',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaPersonalCare1Country',
        label: 'Which country is this person a resident of?',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaPersonalCare2Name',
        label: "Alternate Power of Attorney for Personal Care's Name:",
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 formData.client1HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client1HasAlternatePoaPersonalCare2 === 'yes';
        },
      },
      {
        key: 'client1HasPoaProperty',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName as string || 'Client 1';
          return `${client1Name}, have you named a Power of Attorney for Property?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'client1PoaPropertySameAsPersonalCare',
        label: 'Is it the same person as your Power of Attorney for Personal Care?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' && formData.client1HasPoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client1PoaPropertyName',
        label: "Power of Attorney for Property's Name:",
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' &&
            (formData.client1HasPoaPersonalCare !== 'yes' || formData.client1PoaPropertySameAsPersonalCare === 'no');
        },
      },
      {
        key: 'client1PoaPropertyPhone',
        label: 'Phone Number:',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' &&
            (formData.client1HasPoaPersonalCare !== 'yes' || formData.client1PoaPropertySameAsPersonalCare === 'no');
        },
      },
      {
        key: 'client1PoaPropertyEmail',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' &&
            (formData.client1HasPoaPersonalCare !== 'yes' || formData.client1PoaPropertySameAsPersonalCare === 'no');
        },
      },
      {
        key: 'client1PoaPropertyRelationship',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName as string || 'Client 1';
          return `Relationship to ${client1Name}:`;
        },
        type: 'text',
        placeholder: 'Enter relationship',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' &&
            (formData.client1HasPoaPersonalCare !== 'yes' || formData.client1PoaPropertySameAsPersonalCare === 'no');
        },
      },
      {
        key: 'client1PoaPropertyIsCanadaResident',
        label: 'Is this person a resident of Canada?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' &&
            (formData.client1HasPoaPersonalCare !== 'yes' || formData.client1PoaPropertySameAsPersonalCare === 'no');
        },
      },
      {
        key: 'client1PoaPropertyCountry',
        label: 'Which country is this person a resident of?',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' &&
            (formData.client1HasPoaPersonalCare !== 'yes' || formData.client1PoaPropertySameAsPersonalCare === 'no') &&
            formData.client1PoaPropertyIsCanadaResident === 'no';
        },
      },
      {
        key: 'client1PoaPropertyProvince',
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
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' &&
            (formData.client1HasPoaPersonalCare !== 'yes' || formData.client1PoaPropertySameAsPersonalCare === 'no') &&
            formData.client1PoaPropertyIsCanadaResident === 'yes';
        },
      },
      {
        key: 'client1PoaPropertyCity',
        label: 'City of Residence:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' &&
            (formData.client1HasPoaPersonalCare !== 'yes' || formData.client1PoaPropertySameAsPersonalCare === 'no');
        },
      },
      {
        key: 'client1PoaPropertyHasDocCopy',
        label: (answers) => {
          const client1FirstName = (answers.get(1)?.fullName as string || 'Client 1').split(' ')[0];
          return `${client1FirstName}, does this person have a copy of your most recent Power of Attorney for Property document?`;
        },
        type: 'radio',
        options: [
          { value: 'yes_on_file', label: 'Yes, on their files' },
          { value: 'no_can_access', label: 'No, but they know how to access the document if/when necessary' },
          { value: 'no_not_discussed', label: 'No, this has not been discussed' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes';
        },
      },
      {
        key: 'client1HasAlternatePoaProperty',
        label: 'Have you named an alternate attorney, should this person be unable or unwilling to act?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaProperty1Name',
        label: "Alternate Power of Attorney for Property's Name:",
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' && formData.client1HasAlternatePoaProperty === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaProperty1Phone',
        label: 'Phone Number:',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' && formData.client1HasAlternatePoaProperty === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaProperty1Email',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' && formData.client1HasAlternatePoaProperty === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaProperty1Relationship',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName as string || 'Client 1';
          return `Relationship to ${client1Name}:`;
        },
        type: 'text',
        placeholder: 'Enter relationship',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' && formData.client1HasAlternatePoaProperty === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaProperty1IsCanadaResident',
        label: 'Is this person a resident of Canada?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' && formData.client1HasAlternatePoaProperty === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaProperty1Country',
        label: 'Which country is this person a resident of?',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' &&
            formData.client1HasAlternatePoaProperty === 'yes' &&
            formData.client1AlternatePoaProperty1IsCanadaResident === 'no';
        },
      },
      {
        key: 'client1AlternatePoaProperty1Province',
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
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' &&
            formData.client1HasAlternatePoaProperty === 'yes' &&
            formData.client1AlternatePoaProperty1IsCanadaResident === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaProperty1City',
        label: 'City of Residence:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' && formData.client1HasAlternatePoaProperty === 'yes';
        },
      },
      {
        key: 'client1HasAlternatePoaProperty2',
        label: 'Have you named an additional alternate attorney, should this person be unable or unwilling to act?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' && formData.client1HasAlternatePoaProperty === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaProperty2Name',
        label: "Alternate Power of Attorney for Property's Name:",
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' &&
            formData.client1HasAlternatePoaProperty === 'yes' &&
            formData.client1HasAlternatePoaProperty2 === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaProperty2Phone',
        label: 'Phone Number:',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' &&
            formData.client1HasAlternatePoaProperty === 'yes' &&
            formData.client1HasAlternatePoaProperty2 === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaProperty2Email',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' &&
            formData.client1HasAlternatePoaProperty === 'yes' &&
            formData.client1HasAlternatePoaProperty2 === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaProperty2Relationship',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName as string || 'Client 1';
          return `Relationship to ${client1Name}:`;
        },
        type: 'text',
        placeholder: 'Enter relationship',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' &&
            formData.client1HasAlternatePoaProperty === 'yes' &&
            formData.client1HasAlternatePoaProperty2 === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaProperty2IsCanadaResident',
        label: 'Is this person a resident of Canada?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' &&
            formData.client1HasAlternatePoaProperty === 'yes' &&
            formData.client1HasAlternatePoaProperty2 === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaProperty2Country',
        label: 'Which country is this person a resident of?',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' &&
            formData.client1HasAlternatePoaProperty === 'yes' &&
            formData.client1HasAlternatePoaProperty2 === 'yes' &&
            formData.client1AlternatePoaProperty2IsCanadaResident === 'no';
        },
      },
      {
        key: 'client1AlternatePoaProperty2Province',
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
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' &&
            formData.client1HasAlternatePoaProperty === 'yes' &&
            formData.client1HasAlternatePoaProperty2 === 'yes' &&
            formData.client1AlternatePoaProperty2IsCanadaResident === 'yes';
        },
      },
      {
        key: 'client1AlternatePoaProperty2City',
        label: 'City of Residence:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' &&
            formData.client1HasAlternatePoaProperty === 'yes' &&
            formData.client1HasAlternatePoaProperty2 === 'yes';
        },
      },
      {
        key: 'client1HasAlternatePoaProperty3',
        label: 'Have you named an additional alternate attorney, should this person be unable or unwilling to act?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasPoaProperty === 'yes' &&
            formData.client1HasAlternatePoaProperty === 'yes' &&
            formData.client1HasAlternatePoaProperty2 === 'yes';
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
        condition: (formData: Record<string, string>) => {
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare1Phone',
        label: 'Phone Number:',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare1Email',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client2HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client2HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare1Country',
        label: 'Which country is this person a resident of?',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client2HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client2HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client2HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client2HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaPersonalCare2Name',
        label: "Alternate Power of Attorney for Personal Care's Name:",
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client2HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client2HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client2HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client2HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client2HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client2HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client2HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client2HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client2HasPoaPersonalCare === 'yes' &&
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
        condition: (formData: Record<string, string>) => {
          return formData.client2HasPoaPersonalCare === 'yes' &&
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
                 formData.client2HasAlternatePoaPersonalCare === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare2 === 'yes' &&
                 formData.client2HasAlternatePoaPersonalCare3 === 'yes';
        },
      },
      {
        key: 'client2HasPoaProperty',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          return `${client2Name}, have you named a Power of Attorney for Property?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          return !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
        },
      },
      {
        key: 'client2PoaPropertySameAsPersonalCare',
        label: 'Is it the same person as your Power of Attorney for Personal Care?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' && formData.client2HasPoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client2PoaPropertyName',
        label: "Power of Attorney for Property's Name:",
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' &&
            (formData.client2HasPoaPersonalCare !== 'yes' || formData.client2PoaPropertySameAsPersonalCare === 'no');
        },
      },
      {
        key: 'client2PoaPropertyPhone',
        label: 'Phone Number:',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' &&
            (formData.client2HasPoaPersonalCare !== 'yes' || formData.client2PoaPropertySameAsPersonalCare === 'no');
        },
      },
      {
        key: 'client2PoaPropertyEmail',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' &&
            (formData.client2HasPoaPersonalCare !== 'yes' || formData.client2PoaPropertySameAsPersonalCare === 'no');
        },
      },
      {
        key: 'client2PoaPropertyRelationship',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          return `Relationship to ${client2Name}:`;
        },
        type: 'text',
        placeholder: 'Enter relationship',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' &&
            (formData.client2HasPoaPersonalCare !== 'yes' || formData.client2PoaPropertySameAsPersonalCare === 'no');
        },
      },
      {
        key: 'client2PoaPropertyIsCanadaResident',
        label: 'Is this person a resident of Canada?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' &&
            (formData.client2HasPoaPersonalCare !== 'yes' || formData.client2PoaPropertySameAsPersonalCare === 'no');
        },
      },
      {
        key: 'client2PoaPropertyCountry',
        label: 'Which country is this person a resident of?',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' &&
            (formData.client2HasPoaPersonalCare !== 'yes' || formData.client2PoaPropertySameAsPersonalCare === 'no') &&
            formData.client2PoaPropertyIsCanadaResident === 'no';
        },
      },
      {
        key: 'client2PoaPropertyProvince',
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
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' &&
            (formData.client2HasPoaPersonalCare !== 'yes' || formData.client2PoaPropertySameAsPersonalCare === 'no') &&
            formData.client2PoaPropertyIsCanadaResident === 'yes';
        },
      },
      {
        key: 'client2PoaPropertyCity',
        label: 'City of Residence:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' &&
            (formData.client2HasPoaPersonalCare !== 'yes' || formData.client2PoaPropertySameAsPersonalCare === 'no');
        },
      },
      {
        key: 'client2PoaPropertyHasDocCopy',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `${client2FirstName}, does this person have a copy of your most recent Power of Attorney for Property document?`;
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
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes';
        },
      },
      {
        key: 'client2HasAlternatePoaProperty',
        label: 'Have you named an alternate attorney, should this person be unable or unwilling to act?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaProperty1Name',
        label: "Alternate Power of Attorney for Property's Name:",
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' && formData.client2HasAlternatePoaProperty === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaProperty1Phone',
        label: 'Phone Number:',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' && formData.client2HasAlternatePoaProperty === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaProperty1Email',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' && formData.client2HasAlternatePoaProperty === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaProperty1Relationship',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          return `Relationship to ${client2Name}:`;
        },
        type: 'text',
        placeholder: 'Enter relationship',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' && formData.client2HasAlternatePoaProperty === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaProperty1IsCanadaResident',
        label: 'Is this person a resident of Canada?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' && formData.client2HasAlternatePoaProperty === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaProperty1Country',
        label: 'Which country is this person a resident of?',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' &&
            formData.client2HasAlternatePoaProperty === 'yes' &&
            formData.client2AlternatePoaProperty1IsCanadaResident === 'no';
        },
      },
      {
        key: 'client2AlternatePoaProperty1Province',
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
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' &&
            formData.client2HasAlternatePoaProperty === 'yes' &&
            formData.client2AlternatePoaProperty1IsCanadaResident === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaProperty1City',
        label: 'City of Residence:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' && formData.client2HasAlternatePoaProperty === 'yes';
        },
      },
      {
        key: 'client2HasAlternatePoaProperty2',
        label: 'Have you named an additional alternate attorney, should this person be unable or unwilling to act?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' && formData.client2HasAlternatePoaProperty === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaProperty2Name',
        label: "Alternate Power of Attorney for Property's Name:",
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' &&
            formData.client2HasAlternatePoaProperty === 'yes' &&
            formData.client2HasAlternatePoaProperty2 === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaProperty2Phone',
        label: 'Phone Number:',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' &&
            formData.client2HasAlternatePoaProperty === 'yes' &&
            formData.client2HasAlternatePoaProperty2 === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaProperty2Email',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' &&
            formData.client2HasAlternatePoaProperty === 'yes' &&
            formData.client2HasAlternatePoaProperty2 === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaProperty2Relationship',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          return `Relationship to ${client2Name}:`;
        },
        type: 'text',
        placeholder: 'Enter relationship',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' &&
            formData.client2HasAlternatePoaProperty === 'yes' &&
            formData.client2HasAlternatePoaProperty2 === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaProperty2IsCanadaResident',
        label: 'Is this person a resident of Canada?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' &&
            formData.client2HasAlternatePoaProperty === 'yes' &&
            formData.client2HasAlternatePoaProperty2 === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaProperty2Country',
        label: 'Which country is this person a resident of?',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' &&
            formData.client2HasAlternatePoaProperty === 'yes' &&
            formData.client2HasAlternatePoaProperty2 === 'yes' &&
            formData.client2AlternatePoaProperty2IsCanadaResident === 'no';
        },
      },
      {
        key: 'client2AlternatePoaProperty2Province',
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
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' &&
            formData.client2HasAlternatePoaProperty === 'yes' &&
            formData.client2HasAlternatePoaProperty2 === 'yes' &&
            formData.client2AlternatePoaProperty2IsCanadaResident === 'yes';
        },
      },
      {
        key: 'client2AlternatePoaProperty2City',
        label: 'City of Residence:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' &&
            formData.client2HasAlternatePoaProperty === 'yes' &&
            formData.client2HasAlternatePoaProperty2 === 'yes';
        },
      },
      {
        key: 'client2HasAlternatePoaProperty3',
        label: 'Have you named an additional alternate attorney, should this person be unable or unwilling to act?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasPoaProperty === 'yes' &&
            formData.client2HasAlternatePoaProperty === 'yes' &&
            formData.client2HasAlternatePoaProperty2 === 'yes';
        },
      },
      // ── Client 1 Estate Trustee (Executor) ──────────────────────────────────
      {
        key: 'client1HasEstateTrustee',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName as string || 'Client 1';
          return `${client1Name}, have you named an Estate Trustee (Executor) in your Will?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client1SpouseIsEstateTrustee',
        label: (answers) => {
          const spouseName = answers.get(1)?.spouseName as string || 'your spouse or common law partner';
          return `Is ${spouseName} your Estate Trustee (Executor)?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const maritalStatus = basicAnswers.maritalStatus as string;
          const hasSpouse = (maritalStatus === 'married' || maritalStatus === 'common_law') && basicAnswers.spouseName;
          return formData.client1HasEstateTrustee === 'yes' && !!hasSpouse;
        },
      },
      {
        key: 'client1EstateTrusteeName',
        label: "Estate Trustee (Executor)'s Name:",
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasEstateTrustee === 'yes' && (!hasSpouse || formData.client1SpouseIsEstateTrustee === 'no');
        },
      },
      {
        key: 'client1EstateTrusteePhone',
        label: 'Phone Number:',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasEstateTrustee === 'yes' && (!hasSpouse || formData.client1SpouseIsEstateTrustee === 'no');
        },
      },
      {
        key: 'client1EstateTrusteeEmail',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasEstateTrustee === 'yes' && (!hasSpouse || formData.client1SpouseIsEstateTrustee === 'no');
        },
      },
      {
        key: 'client1EstateTrusteeRelationship',
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
          return formData.client1HasEstateTrustee === 'yes' && (!hasSpouse || formData.client1SpouseIsEstateTrustee === 'no');
        },
      },
      {
        key: 'client1EstateTrusteeIsCanadaResident',
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
          return formData.client1HasEstateTrustee === 'yes' && (!hasSpouse || formData.client1SpouseIsEstateTrustee === 'no');
        },
      },
      {
        key: 'client1EstateTrusteeCountry',
        label: 'Which country is this person a resident of?',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasEstateTrustee === 'yes' && (!hasSpouse || formData.client1SpouseIsEstateTrustee === 'no') && formData.client1EstateTrusteeIsCanadaResident === 'no';
        },
      },
      {
        key: 'client1EstateTrusteeProvince',
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
          return formData.client1HasEstateTrustee === 'yes' && (!hasSpouse || formData.client1SpouseIsEstateTrustee === 'no') && formData.client1EstateTrusteeIsCanadaResident === 'yes';
        },
      },
      {
        key: 'client1EstateTrusteeCity',
        label: 'City of Residence:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client1HasEstateTrustee === 'yes' && (!hasSpouse || formData.client1SpouseIsEstateTrustee === 'no');
        },
      },
      {
        key: 'client1EstateTrusteeHasDocCopy',
        label: (answers) => {
          const client1FirstName = (answers.get(1)?.fullName as string || 'Client 1').split(' ')[0];
          return `${client1FirstName}, does this person have a copy of your most recent Will?`;
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
          return formData.client1HasEstateTrustee === 'yes' && (!hasSpouse || formData.client1SpouseIsEstateTrustee === 'no');
        },
      },
      {
        key: 'client1HasAlternateEstateTrustee',
        label: 'Have you named an alternate Estate Trustee (Executor), should this person be unable or unwilling to act?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasEstateTrustee === 'yes';
        },
      },
      {
        key: 'client1AlternateEstateTrustee1Name',
        label: "Alternate Estate Trustee (Executor)'s Name:",
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee === 'yes';
        },
      },
      {
        key: 'client1AlternateEstateTrustee1Phone',
        label: 'Phone Number:',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee === 'yes';
        },
      },
      {
        key: 'client1AlternateEstateTrustee1Email',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee === 'yes';
        },
      },
      {
        key: 'client1AlternateEstateTrustee1Relationship',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName as string || 'Client 1';
          return `Relationship to ${client1Name}:`;
        },
        type: 'text',
        placeholder: 'Enter relationship',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee === 'yes';
        },
      },
      {
        key: 'client1AlternateEstateTrustee1IsCanadaResident',
        label: 'Is this person a resident of Canada?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee === 'yes';
        },
      },
      {
        key: 'client1AlternateEstateTrustee1Country',
        label: 'Which country is this person a resident of?',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee === 'yes' && formData.client1AlternateEstateTrustee1IsCanadaResident === 'no';
        },
      },
      {
        key: 'client1AlternateEstateTrustee1Province',
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
        condition: (formData: Record<string, string>) => {
          return formData.client1HasEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee === 'yes' && formData.client1AlternateEstateTrustee1IsCanadaResident === 'yes';
        },
      },
      {
        key: 'client1AlternateEstateTrustee1City',
        label: 'City of Residence:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee === 'yes';
        },
      },
      {
        key: 'client1AlternateEstateTrustee1HasDocCopy',
        label: (answers) => {
          const client1FirstName = (answers.get(1)?.fullName as string || 'Client 1').split(' ')[0];
          return `${client1FirstName}, does this person have a copy of your most recent Will?`;
        },
        type: 'radio',
        options: [
          { value: 'yes_on_file', label: 'Yes, on their files' },
          { value: 'no_can_access', label: 'No, but they know how to access the document if/when necessary' },
          { value: 'no_not_discussed', label: 'No, this has not been discussed' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee === 'yes';
        },
      },
      {
        key: 'client1HasAlternateEstateTrustee2',
        label: 'Have you named an additional alternate Estate Trustee (Executor), should this person be unable or unwilling to act?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee === 'yes';
        },
      },
      {
        key: 'client1AlternateEstateTrustee2Name',
        label: "Alternate Estate Trustee (Executor)'s Name:",
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee2 === 'yes';
        },
      },
      {
        key: 'client1AlternateEstateTrustee2Phone',
        label: 'Phone Number:',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee2 === 'yes';
        },
      },
      {
        key: 'client1AlternateEstateTrustee2Email',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee2 === 'yes';
        },
      },
      {
        key: 'client1AlternateEstateTrustee2Relationship',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName as string || 'Client 1';
          return `Relationship to ${client1Name}:`;
        },
        type: 'text',
        placeholder: 'Enter relationship',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee2 === 'yes';
        },
      },
      {
        key: 'client1AlternateEstateTrustee2IsCanadaResident',
        label: 'Is this person a resident of Canada?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee2 === 'yes';
        },
      },
      {
        key: 'client1AlternateEstateTrustee2Country',
        label: 'Which country is this person a resident of?',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee2 === 'yes' && formData.client1AlternateEstateTrustee2IsCanadaResident === 'no';
        },
      },
      {
        key: 'client1AlternateEstateTrustee2Province',
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
        condition: (formData: Record<string, string>) => {
          return formData.client1HasEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee2 === 'yes' && formData.client1AlternateEstateTrustee2IsCanadaResident === 'yes';
        },
      },
      {
        key: 'client1AlternateEstateTrustee2City',
        label: 'City of Residence:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee2 === 'yes';
        },
      },
      {
        key: 'client1AlternateEstateTrustee2HasDocCopy',
        label: (answers) => {
          const client1FirstName = (answers.get(1)?.fullName as string || 'Client 1').split(' ')[0];
          return `${client1FirstName}, does this person have a copy of your most recent Will?`;
        },
        type: 'radio',
        options: [
          { value: 'yes_on_file', label: 'Yes, on their files' },
          { value: 'no_can_access', label: 'No, but they know how to access the document if/when necessary' },
          { value: 'no_not_discussed', label: 'No, this has not been discussed' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee2 === 'yes';
        },
      },
      {
        key: 'client1HasAlternateEstateTrustee3',
        label: 'Have you named an additional alternate Estate Trustee (Executor), should this person be unable or unwilling to act?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee === 'yes' && formData.client1HasAlternateEstateTrustee2 === 'yes';
        },
      },
      // ── Client 2 Estate Trustee (Executor) ──────────────────────────────────
      {
        key: 'client2HasEstateTrustee',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          return `${client2Name}, have you named an Estate Trustee (Executor) in your Will?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          return !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
        },
      },
      {
        key: 'client2SpouseIsEstateTrustee',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName as string || 'Client 1';
          return `Is ${client1Name} your Estate Trustee (Executor)?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const maritalStatus = basicAnswers.maritalStatus as string;
          const hasSpouse = (maritalStatus === 'married' || maritalStatus === 'common_law') && basicAnswers.spouseName;
          return formData.client2HasEstateTrustee === 'yes' && !!hasSpouse;
        },
      },
      {
        key: 'client2EstateTrusteeName',
        label: "Estate Trustee (Executor)'s Name:",
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasEstateTrustee === 'yes' && (!hasSpouse || formData.client2SpouseIsEstateTrustee === 'no');
        },
      },
      {
        key: 'client2EstateTrusteePhone',
        label: 'Phone Number:',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasEstateTrustee === 'yes' && (!hasSpouse || formData.client2SpouseIsEstateTrustee === 'no');
        },
      },
      {
        key: 'client2EstateTrusteeEmail',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasEstateTrustee === 'yes' && (!hasSpouse || formData.client2SpouseIsEstateTrustee === 'no');
        },
      },
      {
        key: 'client2EstateTrusteeRelationship',
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
          return formData.client2HasEstateTrustee === 'yes' && (!hasSpouse || formData.client2SpouseIsEstateTrustee === 'no');
        },
      },
      {
        key: 'client2EstateTrusteeIsCanadaResident',
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
          return formData.client2HasEstateTrustee === 'yes' && (!hasSpouse || formData.client2SpouseIsEstateTrustee === 'no');
        },
      },
      {
        key: 'client2EstateTrusteeCountry',
        label: 'Which country is this person a resident of?',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasEstateTrustee === 'yes' && (!hasSpouse || formData.client2SpouseIsEstateTrustee === 'no') && formData.client2EstateTrusteeIsCanadaResident === 'no';
        },
      },
      {
        key: 'client2EstateTrusteeProvince',
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
          return formData.client2HasEstateTrustee === 'yes' && (!hasSpouse || formData.client2SpouseIsEstateTrustee === 'no') && formData.client2EstateTrusteeIsCanadaResident === 'yes';
        },
      },
      {
        key: 'client2EstateTrusteeCity',
        label: 'City of Residence:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = basicAnswers.spouseName && basicAnswers.spouseName !== '';
          return formData.client2HasEstateTrustee === 'yes' && (!hasSpouse || formData.client2SpouseIsEstateTrustee === 'no');
        },
      },
      {
        key: 'client2EstateTrusteeHasDocCopy',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `${client2FirstName}, does this person have a copy of your most recent Will?`;
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
          return formData.client2HasEstateTrustee === 'yes' && (!hasSpouse || formData.client2SpouseIsEstateTrustee === 'no');
        },
      },
      {
        key: 'client2HasAlternateEstateTrustee',
        label: 'Have you named an alternate Estate Trustee (Executor), should this person be unable or unwilling to act?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasEstateTrustee === 'yes';
        },
      },
      {
        key: 'client2AlternateEstateTrustee1Name',
        label: "Alternate Estate Trustee (Executor)'s Name:",
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee === 'yes';
        },
      },
      {
        key: 'client2AlternateEstateTrustee1Phone',
        label: 'Phone Number:',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee === 'yes';
        },
      },
      {
        key: 'client2AlternateEstateTrustee1Email',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee === 'yes';
        },
      },
      {
        key: 'client2AlternateEstateTrustee1Relationship',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          return `Relationship to ${client2Name}:`;
        },
        type: 'text',
        placeholder: 'Enter relationship',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee === 'yes';
        },
      },
      {
        key: 'client2AlternateEstateTrustee1IsCanadaResident',
        label: 'Is this person a resident of Canada?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee === 'yes';
        },
      },
      {
        key: 'client2AlternateEstateTrustee1Country',
        label: 'Which country is this person a resident of?',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee === 'yes' && formData.client2AlternateEstateTrustee1IsCanadaResident === 'no';
        },
      },
      {
        key: 'client2AlternateEstateTrustee1Province',
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
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee === 'yes' && formData.client2AlternateEstateTrustee1IsCanadaResident === 'yes';
        },
      },
      {
        key: 'client2AlternateEstateTrustee1City',
        label: 'City of Residence:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee === 'yes';
        },
      },
      {
        key: 'client2AlternateEstateTrustee1HasDocCopy',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `${client2FirstName}, does this person have a copy of your most recent Will?`;
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
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee === 'yes';
        },
      },
      {
        key: 'client2HasAlternateEstateTrustee2',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `${client2FirstName}, have you named an additional alternate Estate Trustee (Executor), should this person be unable or unwilling to act?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee === 'yes';
        },
      },
      {
        key: 'client2AlternateEstateTrustee2Name',
        label: "Alternate Estate Trustee (Executor)'s Name:",
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee2 === 'yes';
        },
      },
      {
        key: 'client2AlternateEstateTrustee2Phone',
        label: 'Phone Number:',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee2 === 'yes';
        },
      },
      {
        key: 'client2AlternateEstateTrustee2Email',
        label: 'Email Address:',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee2 === 'yes';
        },
      },
      {
        key: 'client2AlternateEstateTrustee2Relationship',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          return `Relationship to ${client2Name}:`;
        },
        type: 'text',
        placeholder: 'Enter relationship',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee2 === 'yes';
        },
      },
      {
        key: 'client2AlternateEstateTrustee2IsCanadaResident',
        label: 'Is this person a resident of Canada?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee2 === 'yes';
        },
      },
      {
        key: 'client2AlternateEstateTrustee2Country',
        label: 'Which country is this person a resident of?',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee2 === 'yes' && formData.client2AlternateEstateTrustee2IsCanadaResident === 'no';
        },
      },
      {
        key: 'client2AlternateEstateTrustee2Province',
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
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee2 === 'yes' && formData.client2AlternateEstateTrustee2IsCanadaResident === 'yes';
        },
      },
      {
        key: 'client2AlternateEstateTrustee2City',
        label: 'City of Residence:',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee2 === 'yes';
        },
      },
      {
        key: 'client2AlternateEstateTrustee2HasDocCopy',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `${client2FirstName}, does this person have a copy of your most recent Will?`;
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
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee2 === 'yes';
        },
      },
      {
        key: 'client2HasAlternateEstateTrustee3',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName as string || 'Client 2';
          const client2FirstName = client2Name.split(' ')[0];
          return `${client2FirstName}, have you named an additional alternate Estate Trustee (Executor), should this person be unable or unwilling to act?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>, allAnswers?: Map<number, Record<string, unknown>>) => {
          const basicAnswers = allAnswers?.get(1) || {};
          const hasSpouse = !!(basicAnswers.spouseName && basicAnswers.spouseName !== '');
          return hasSpouse && formData.client2HasEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee === 'yes' && formData.client2HasAlternateEstateTrustee2 === 'yes';
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
    ],
  },
];
