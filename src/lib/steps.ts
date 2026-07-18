
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
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'email' | 'tel' | 'date' | 'number' | 'checkbox-group' | 'dynamic';
  placeholder?: string;
  options?: Array<{ value: string; label: string }> | ((answers: Map<number, Record<string, unknown>>) => Array<{ value: string; label: string }>);
  required?: boolean;
  videoUrl?: string;
  description?: string;
  condition?: (formData: Record<string, string>) => boolean | "";
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
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes',
      },
      {
        key: 'fpAdvisor1Name',
        label: 'Advisor name',
        type: 'text',
        placeholder: 'Enter advisor name',
        required: false,
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes',
      },
      {
        key: 'fpAdvisor1Phone',
        label: 'Phone',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes',
      },
      {
        key: 'fpAdvisor1Email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes',
      },
      {
        key: 'fpAdvisor1Website',
        label: 'Website (optional)',
        type: 'text',
        placeholder: 'Enter website URL',
        required: false,
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes',
      },
      {
        key: 'fpAdvisor1WorksWith',
        label: (answers: Map<number, Record<string, unknown>>) => {
          const hasSpouse = (answers.get(1)?.['maritalStatus'] as string) === 'married' || (answers.get(1)?.['maritalStatus'] as string) === 'common_law';
          const advisorName = (answers.get(1)?.['fpAdvisor1Name'] as string) || 'this advisor';
          return hasSpouse ? `Which client(s) does ${advisorName} work with?` : `Do you work with ${advisorName}?`;
        },
        type: 'checkbox-group',
        options: (answers: Map<number, Record<string, unknown>>) => {
          const hasSpouse = (answers.get(1)?.['maritalStatus'] as string) === 'married' || (answers.get(1)?.['maritalStatus'] as string) === 'common_law';
          if (hasSpouse) {
            return [
              { value: 'client1', label: (answers.get(1)?.['fullName'] as string) || 'Client 1' },
              { value: 'client2', label: (answers.get(1)?.['spouseName'] as string) || 'Client 2' },
            ];
          }
          return [{ value: 'client1', label: 'Yes' }];
        },
        required: false,
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes',
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
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes',
      },
      {
        key: 'fpAdvisor1Duration',
        label: 'How long have you worked together?',
        type: 'text',
        placeholder: 'e.g., 5 years',
        required: false,
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes',
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
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes',
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
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes',
      },
      {
        key: 'fpAdvisor2Firm',
        label: 'Firm',
        type: 'text',
        placeholder: 'Enter firm name',
        required: false,
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes' && formData.fpHasAdditionalAdvisor === 'yes',
      },
      {
        key: 'fpAdvisor2Name',
        label: 'Advisor name',
        type: 'text',
        placeholder: 'Enter advisor name',
        required: false,
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes' && formData.fpHasAdditionalAdvisor === 'yes',
      },
      {
        key: 'fpAdvisor2Phone',
        label: 'Phone',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes' && formData.fpHasAdditionalAdvisor === 'yes',
      },
      {
        key: 'fpAdvisor2Email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes' && formData.fpHasAdditionalAdvisor === 'yes',
      },
      {
        key: 'fpAdvisor2Website',
        label: 'Website (optional)',
        type: 'text',
        placeholder: 'Enter website URL',
        required: false,
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes' && formData.fpHasAdditionalAdvisor === 'yes',
      },
      {
        key: 'fpAdvisor2WorksWith',
        label: (answers: Map<number, Record<string, unknown>>) => {
          const hasSpouse = (answers.get(1)?.['maritalStatus'] as string) === 'married' || (answers.get(1)?.['maritalStatus'] as string) === 'common_law';
          const advisorName = (answers.get(1)?.['fpAdvisor2Name'] as string) || 'this advisor';
          return hasSpouse ? `Which client(s) does ${advisorName} work with?` : `Do you work with ${advisorName}?`;
        },
        type: 'checkbox-group',
        options: (answers: Map<number, Record<string, unknown>>) => {
          const hasSpouse = (answers.get(1)?.['maritalStatus'] as string) === 'married' || (answers.get(1)?.['maritalStatus'] as string) === 'common_law';
          if (hasSpouse) {
            return [
              { value: 'client1', label: (answers.get(1)?.['fullName'] as string) || 'Client 1' },
              { value: 'client2', label: (answers.get(1)?.['spouseName'] as string) || 'Client 2' },
            ];
          }
          return [{ value: 'client1', label: 'Yes' }];
        },
        required: false,
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes' && formData.fpHasAdditionalAdvisor === 'yes',
      },
      {
        key: 'fpAdvisor2Services',
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
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes' && formData.fpHasAdditionalAdvisor === 'yes',
      },
      {
        key: 'fpAdvisor2Duration',
        label: 'How long have you worked together?',
        type: 'text',
        placeholder: 'e.g., 5 years',
        required: false,
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes' && formData.fpHasAdditionalAdvisor === 'yes',
      },
      {
        key: 'fpAdvisor2IncludeInContactList',
        label: 'May we include this professional in your executor\'s contact list and action guide?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes' && formData.fpHasAdditionalAdvisor === 'yes',
      },
      {
        key: 'fpHasAdditionalAdvisor2',
        label: 'Is there an additional Financial Planner/Wealth Advisor that you work with?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes' && formData.fpHasAdditionalAdvisor === 'yes',
      },
      {
        key: 'fpAdvisor3Firm',
        label: 'Firm',
        type: 'text',
        placeholder: 'Enter firm name',
        required: false,
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes' && formData.fpHasAdditionalAdvisor === 'yes' && formData.fpHasAdditionalAdvisor2 === 'yes',
      },
      {
        key: 'fpAdvisor3Name',
        label: 'Advisor name',
        type: 'text',
        placeholder: 'Enter advisor name',
        required: false,
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes' && formData.fpHasAdditionalAdvisor === 'yes' && formData.fpHasAdditionalAdvisor2 === 'yes',
      },
      {
        key: 'fpAdvisor3Phone',
        label: 'Phone',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes' && formData.fpHasAdditionalAdvisor === 'yes' && formData.fpHasAdditionalAdvisor2 === 'yes',
      },
      {
        key: 'fpAdvisor3Email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes' && formData.fpHasAdditionalAdvisor === 'yes' && formData.fpHasAdditionalAdvisor2 === 'yes',
      },
      {
        key: 'fpAdvisor3Website',
        label: 'Website (optional)',
        type: 'text',
        placeholder: 'Enter website URL',
        required: false,
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes' && formData.fpHasAdditionalAdvisor === 'yes' && formData.fpHasAdditionalAdvisor2 === 'yes',
      },
      {
        key: 'fpAdvisor3WorksWith',
        label: (answers: Map<number, Record<string, unknown>>) => {
          const hasSpouse = (answers.get(1)?.['maritalStatus'] as string) === 'married' || (answers.get(1)?.['maritalStatus'] as string) === 'common_law';
          const advisorName = (answers.get(1)?.['fpAdvisor3Name'] as string) || 'this advisor';
          return hasSpouse ? `Which client(s) does ${advisorName} work with?` : `Do you work with ${advisorName}?`;
        },
        type: 'checkbox-group',
        options: (answers: Map<number, Record<string, unknown>>) => {
          const hasSpouse = (answers.get(1)?.['maritalStatus'] as string) === 'married' || (answers.get(1)?.['maritalStatus'] as string) === 'common_law';
          if (hasSpouse) {
            return [
              { value: 'client1', label: (answers.get(1)?.['fullName'] as string) || 'Client 1' },
              { value: 'client2', label: (answers.get(1)?.['spouseName'] as string) || 'Client 2' },
            ];
          }
          return [{ value: 'client1', label: 'Yes' }];
        },
        required: false,
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes' && formData.fpHasAdditionalAdvisor === 'yes' && formData.fpHasAdditionalAdvisor2 === 'yes',
      },
      {
        key: 'fpAdvisor3Services',
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
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes' && formData.fpHasAdditionalAdvisor === 'yes' && formData.fpHasAdditionalAdvisor2 === 'yes',
      },
      {
        key: 'fpAdvisor3Duration',
        label: 'How long have you worked together?',
        type: 'text',
        placeholder: 'e.g., 5 years',
        required: false,
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes' && formData.fpHasAdditionalAdvisor === 'yes' && formData.fpHasAdditionalAdvisor2 === 'yes',
      },
      {
        key: 'fpAdvisor3IncludeInContactList',
        label: 'May we include this professional in your executor\'s contact list and action guide?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.fpHasAdvisor === 'yes' && formData.fpHasAdditionalAdvisor === 'yes' && formData.fpHasAdditionalAdvisor2 === 'yes',
      },
      {
        key: 'acctHasAccountant',
        label: 'Do you currently work with an accountant (CPA)?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'acctAdvisor1Firm',
        label: 'Firm',
        type: 'text',
        placeholder: 'Enter firm name',
        required: false,
        condition: (formData: Record<string, string>) => formData.acctHasAccountant === 'yes',
      },
      {
        key: 'acctAdvisor1Name',
        label: 'Accountant name',
        type: 'text',
        placeholder: 'Enter accountant name',
        required: false,
        condition: (formData: Record<string, string>) => formData.acctHasAccountant === 'yes',
      },
      {
        key: 'acctAdvisor1Phone',
        label: 'Phone',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.acctHasAccountant === 'yes',
      },
      {
        key: 'acctAdvisor1Email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => formData.acctHasAccountant === 'yes',
      },
      {
        key: 'acctAdvisor1WorksWith',
        label: (answers: Map<number, Record<string, unknown>>) => {
          const hasSpouse = (answers.get(1)?.['maritalStatus'] as string) === 'married' || (answers.get(1)?.['maritalStatus'] as string) === 'common_law';
          return hasSpouse ? 'Which client(s) does this accountant work with?' : 'Do you work with this accountant?';
        },
        type: 'checkbox-group',
        options: (answers: Map<number, Record<string, unknown>>) => {
          const hasSpouse = (answers.get(1)?.['maritalStatus'] as string) === 'married' || (answers.get(1)?.['maritalStatus'] as string) === 'common_law';
          if (hasSpouse) {
            return [
              { value: 'client1', label: (answers.get(1)?.['fullName'] as string) || 'Client 1' },
              { value: 'client2', label: (answers.get(1)?.['spouseName'] as string) || 'Client 2' },
            ];
          }
          return [{ value: 'client1', label: 'Yes' }];
        },
        required: false,
        condition: (formData: Record<string, string>) => formData.acctHasAccountant === 'yes',
      },
      {
        key: 'acctAdvisor1Services',
        label: 'What do they help you with?',
        type: 'checkbox-group',
        options: [
          { value: 'personal_tax_returns', label: 'Personal tax returns' },
          { value: 'corporate_tax', label: 'Corporate tax' },
          { value: 'trust_tax_returns', label: 'Trust tax returns' },
          { value: 'bookkeeping', label: 'Bookkeeping' },
          { value: 'payroll', label: 'Payroll' },
          { value: 'estate_tax', label: 'Estate tax' },
          { value: 'other', label: 'Other' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.acctHasAccountant === 'yes',
      },
      {
        key: 'acctAdvisor1Duration',
        label: 'How long have you worked together?',
        type: 'text',
        placeholder: 'e.g., 5 years',
        required: false,
        condition: (formData: Record<string, string>) => formData.acctHasAccountant === 'yes',
      },
      {
        key: 'acctAdvisor1DocLocation',
        label: 'Where are your tax documents stored?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
        condition: (formData: Record<string, string>) => formData.acctHasAccountant === 'yes',
      },
      {
        key: 'acctAdvisor1IncludeInContactList',
        label: 'May we include this professional in your executor\'s contact list and action guide?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.acctHasAccountant === 'yes',
      },
      {
        key: 'acctHasAdditional',
        label: 'Is there an additional Accountant (CPA) that you work with?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.acctHasAccountant === 'yes',
      },
      {
        key: 'lawHasLawyer',
        label: 'Do you currently work with a lawyer?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'lawAdvisor1Firm',
        label: 'Firm',
        type: 'text',
        placeholder: 'Enter firm name',
        required: false,
        condition: (formData: Record<string, string>) => formData.lawHasLawyer === 'yes',
      },
      {
        key: 'lawAdvisor1Name',
        label: 'Lawyer name',
        type: 'text',
        placeholder: 'Enter lawyer name',
        required: false,
        condition: (formData: Record<string, string>) => formData.lawHasLawyer === 'yes',
      },
      {
        key: 'lawAdvisor1Phone',
        label: 'Phone',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.lawHasLawyer === 'yes',
      },
      {
        key: 'lawAdvisor1Email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => formData.lawHasLawyer === 'yes',
      },
      {
        key: 'lawAdvisor1WorksWith',
        label: (answers: Map<number, Record<string, unknown>>) => {
          const hasSpouse = (answers.get(1)?.['maritalStatus'] as string) === 'married' || (answers.get(1)?.['maritalStatus'] as string) === 'common_law';
          return hasSpouse ? 'Which client(s) does this lawyer work with?' : 'Do you work with this lawyer?';
        },
        type: 'checkbox-group',
        options: (answers: Map<number, Record<string, unknown>>) => {
          const hasSpouse = (answers.get(1)?.['maritalStatus'] as string) === 'married' || (answers.get(1)?.['maritalStatus'] as string) === 'common_law';
          if (hasSpouse) {
            return [
              { value: 'client1', label: (answers.get(1)?.['fullName'] as string) || 'Client 1' },
              { value: 'client2', label: (answers.get(1)?.['spouseName'] as string) || 'Client 2' },
            ];
          }
          return [{ value: 'client1', label: 'Yes' }];
        },
        required: false,
        condition: (formData: Record<string, string>) => formData.lawHasLawyer === 'yes',
      },
      {
        key: 'lawAdvisor1Services',
        label: 'What do they help you with?',
        type: 'checkbox-group',
        options: [
          { value: 'wills_powers_of_attorney', label: 'Wills & Powers of Attorney' },
          { value: 'real_estate', label: 'Real estate' },
          { value: 'corporate_law', label: 'Corporate law' },
          { value: 'family_law', label: 'Family law' },
          { value: 'litigation', label: 'Litigation' },
          { value: 'other', label: 'Other' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.lawHasLawyer === 'yes',
      },
      {
        key: 'lawAdvisor1Duration',
        label: 'How long have you worked together?',
        type: 'text',
        placeholder: 'e.g., 5 years',
        required: false,
        condition: (formData: Record<string, string>) => formData.lawHasLawyer === 'yes',
      },
      {
        key: 'lawAdvisor1DocLocation',
        label: 'Where are your legal documents stored?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
        condition: (formData: Record<string, string>) => formData.lawHasLawyer === 'yes',
      },
      {
        key: 'lawAdvisor1IncludeInContactList',
        label: 'May we include this professional in your executor\'s contact list and action guide?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.lawHasLawyer === 'yes',
      },
      {
        key: 'lawHasAdditional',
        label: 'Is there an additional Lawyer that you work with?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.lawHasLawyer === 'yes',
      },
      {
        key: 'insHasAdvisor',
        label: 'Do you currently work with an insurance advisor?',
        type: 'radio',
        options: [
          { value: 'financial_planner', label: 'Yes, a Financial Planner' },
          { value: 'insurance_advisor', label: 'Yes, an Insurance Advisor' },
          { value: 'other', label: 'Yes, Other' },
          { value: 'na', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'insAdvisor1Firm',
        label: 'Firm',
        type: 'text',
        placeholder: 'Enter firm name',
        required: false,
        condition: (formData: Record<string, string>) => formData.insHasAdvisor && formData.insHasAdvisor !== 'na',
      },
      {
        key: 'insAdvisor1Name',
        label: 'Advisor name',
        type: 'text',
        placeholder: 'Enter advisor name',
        required: false,
        condition: (formData: Record<string, string>) => formData.insHasAdvisor && formData.insHasAdvisor !== 'na',
      },
      {
        key: 'insAdvisor1Phone',
        label: 'Phone',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.insHasAdvisor && formData.insHasAdvisor !== 'na',
      },
      {
        key: 'insAdvisor1Email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => formData.insHasAdvisor && formData.insHasAdvisor !== 'na',
      },
      {
        key: 'insAdvisor1WorksWith',
        label: (answers: Map<number, Record<string, unknown>>) => {
          const hasSpouse = (answers.get(1)?.['maritalStatus'] as string) === 'married' || (answers.get(1)?.['maritalStatus'] as string) === 'common_law';
          return hasSpouse ? 'Which client(s) does this advisor work with?' : 'Do you work with this advisor?';
        },
        type: 'checkbox-group',
        options: (answers: Map<number, Record<string, unknown>>) => {
          const hasSpouse = (answers.get(1)?.['maritalStatus'] as string) === 'married' || (answers.get(1)?.['maritalStatus'] as string) === 'common_law';
          if (hasSpouse) {
            return [
              { value: 'client1', label: (answers.get(1)?.['fullName'] as string) || 'Client 1' },
              { value: 'client2', label: (answers.get(1)?.['spouseName'] as string) || 'Client 2' },
            ];
          }
          return [{ value: 'client1', label: 'Yes' }];
        },
        required: false,
        condition: (formData: Record<string, string>) => formData.insHasAdvisor && formData.insHasAdvisor !== 'na',
      },
      {
        key: 'insAdvisor1Services',
        label: 'Which insurance policies do they handle?',
        type: 'checkbox-group',
        options: [
          { value: 'life', label: 'Life Insurance' },
          { value: 'disability', label: 'Disability Insurance' },
          { value: 'critical_illness', label: 'Critical Illness Insurance' },
          { value: 'long_term_care', label: 'Long-Term Care Insurance' },
          { value: 'extended_health_dental', label: 'Extended Health & Dental' },
          { value: 'home', label: 'Home Insurance' },
          { value: 'condo', label: 'Condo Insurance' },
          { value: 'tenant', label: 'Tenant Insurance' },
          { value: 'auto', label: 'Auto Insurance' },
          { value: 'umbrella_liability', label: 'Umbrella Liability Insurance' },
          { value: 'motorcycle_boat_atv_rv', label: 'Motorcycle / Boat / ATV / RV Insurance' },
          { value: 'business', label: 'Business Insurance' },
          { value: 'professional_liability', label: 'Professional Liability Insurance' },
          { value: 'other', label: 'Other' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.insHasAdvisor && formData.insHasAdvisor !== 'na',
      },
      {
        key: 'insAdvisor1Duration',
        label: 'How long have you worked together?',
        type: 'text',
        placeholder: 'e.g., 5 years',
        required: false,
        condition: (formData: Record<string, string>) => formData.insHasAdvisor && formData.insHasAdvisor !== 'na',
      },
      {
        key: 'insAdvisor1DocLocation',
        label: 'Where are your insurance documents stored?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
        condition: (formData: Record<string, string>) => formData.insHasAdvisor && formData.insHasAdvisor !== 'na',
      },
      {
        key: 'insAdvisor1IncludeInContactList',
        label: 'May we include this professional in your executor\'s contact list and action guide?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.insHasAdvisor && formData.insHasAdvisor !== 'na',
      },
      {
        key: 'insHasAdditional',
        label: 'Is there an additional Insurance Advisor that you work with?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.insHasAdvisor && formData.insHasAdvisor !== 'na',
      },
      {
        key: 'fp_health_0_name',
        label: 'Family Physician Name',
        type: 'text',
        placeholder: 'Enter physician name',
        required: false,
      },
      {
        key: 'fp_health_0_clinic',
        label: 'Clinic',
        type: 'text',
        placeholder: 'Enter clinic name',
        required: false,
      },
      {
        key: 'fp_health_0_phone',
        label: 'Phone',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
      },
      {
        key: 'fp_health_0_patients',
        label: 'Patients:',
        type: 'checkbox-group',
        options: (answers: Map<number, Record<string, unknown>>) => {
          const hasSpouse = (answers.get(1)?.['maritalStatus'] as string) === 'married' || (answers.get(1)?.['maritalStatus'] as string) === 'common_law';
          if (hasSpouse) {
            return [
              { value: 'client1', label: (answers.get(1)?.['fullName'] as string) || 'Client 1' },
              { value: 'client2', label: (answers.get(1)?.['spouseName'] as string) || 'Client 2' },
            ];
          }
          return [{ value: 'client1', label: (answers.get(1)?.['fullName'] as string) || 'Client 1' }];
        },
        required: false,
      },
      {
        key: 'fp_health_0_has_additional',
        label: 'Do you have an additional Family Physician?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'fp_health_1_name',
        label: 'Additional Family Physician Name',
        type: 'text',
        placeholder: 'Enter physician name',
        required: false,
        condition: (formData: Record<string, string>) => formData.fp_health_0_has_additional === 'yes',
      },
      {
        key: 'fp_health_1_clinic',
        label: 'Clinic',
        type: 'text',
        placeholder: 'Enter clinic name',
        required: false,
        condition: (formData: Record<string, string>) => formData.fp_health_0_has_additional === 'yes',
      },
      {
        key: 'fp_health_1_phone',
        label: 'Phone',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.fp_health_0_has_additional === 'yes',
      },
      {
        key: 'fp_health_1_patients',
        label: 'Patients:',
        type: 'checkbox-group',
        options: (answers: Map<number, Record<string, unknown>>) => {
          const hasSpouse = (answers.get(1)?.['maritalStatus'] as string) === 'married' || (answers.get(1)?.['maritalStatus'] as string) === 'common_law';
          if (hasSpouse) {
            return [
              { value: 'client1', label: (answers.get(1)?.['fullName'] as string) || 'Client 1' },
              { value: 'client2', label: (answers.get(1)?.['spouseName'] as string) || 'Client 2' },
            ];
          }
          return [{ value: 'client1', label: (answers.get(1)?.['fullName'] as string) || 'Client 1' }];
        },
        required: false,
        condition: (formData: Record<string, string>) => formData.fp_health_0_has_additional === 'yes',
      },
      {
        key: 'fp_health_1_has_additional',
        label: 'Do you have another additional Family Physician?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.fp_health_0_has_additional === 'yes',
      },
      {
        key: 'fp_health_2_name',
        label: 'Additional Family Physician Name',
        type: 'text',
        placeholder: 'Enter physician name',
        required: false,
        condition: (formData: Record<string, string>) => formData.fp_health_1_has_additional === 'yes',
      },
      {
        key: 'fp_health_2_clinic',
        label: 'Clinic',
        type: 'text',
        placeholder: 'Enter clinic name',
        required: false,
        condition: (formData: Record<string, string>) => formData.fp_health_1_has_additional === 'yes',
      },
      {
        key: 'fp_health_2_phone',
        label: 'Phone',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.fp_health_1_has_additional === 'yes',
      },
      {
        key: 'fp_health_2_patients',
        label: 'Patients:',
        type: 'checkbox-group',
        options: (answers: Map<number, Record<string, unknown>>) => {
          const hasSpouse = (answers.get(1)?.['maritalStatus'] as string) === 'married' || (answers.get(1)?.['maritalStatus'] as string) === 'common_law';
          if (hasSpouse) {
            return [
              { value: 'client1', label: (answers.get(1)?.['fullName'] as string) || 'Client 1' },
              { value: 'client2', label: (answers.get(1)?.['spouseName'] as string) || 'Client 2' },
            ];
          }
          return [{ value: 'client1', label: (answers.get(1)?.['fullName'] as string) || 'Client 1' }];
        },
        required: false,
        condition: (formData: Record<string, string>) => formData.fp_health_1_has_additional === 'yes',
      },
      {
        key: 'sp_health_has',
        label: 'Do you see any specialists?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'sp_health_0_name',
        label: 'Specialist Name',
        type: 'text',
        placeholder: 'Enter specialist name',
        required: false,
        condition: (formData: Record<string, string>) => formData.sp_health_has === 'yes',
      },
      {
        key: 'sp_health_0_specialty',
        label: 'Specialty',
        type: 'text',
        placeholder: 'e.g., Cardiologist, Neurologist',
        required: false,
        condition: (formData: Record<string, string>) => formData.sp_health_has === 'yes',
      },
      {
        key: 'sp_health_0_phone',
        label: 'Phone',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.sp_health_has === 'yes',
      },
      {
        key: 'sp_health_0_patients',
        label: 'Patients:',
        type: 'checkbox-group',
        options: (answers: Map<number, Record<string, unknown>>) => {
          const hasSpouse = (answers.get(1)?.['maritalStatus'] as string) === 'married' || (answers.get(1)?.['maritalStatus'] as string) === 'common_law';
          if (hasSpouse) {
            return [
              { value: 'client1', label: (answers.get(1)?.['fullName'] as string) || 'Client 1' },
              { value: 'client2', label: (answers.get(1)?.['spouseName'] as string) || 'Client 2' },
            ];
          }
          return [{ value: 'client1', label: (answers.get(1)?.['fullName'] as string) || 'Client 1' }];
        },
        required: false,
        condition: (formData: Record<string, string>) => formData.sp_health_has === 'yes',
      },
      {
        key: 'sp_health_0_has_additional',
        label: 'Do you have an additional Specialist?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.sp_health_has === 'yes',
      },
      {
        key: 'sp_health_1_name',
        label: 'Additional Specialist Name',
        type: 'text',
        placeholder: 'Enter specialist name',
        required: false,
        condition: (formData: Record<string, string>) => formData.sp_health_0_has_additional === 'yes',
      },
      {
        key: 'sp_health_1_specialty',
        label: 'Specialty',
        type: 'text',
        placeholder: 'e.g., Cardiologist, Neurologist',
        required: false,
        condition: (formData: Record<string, string>) => formData.sp_health_0_has_additional === 'yes',
      },
      {
        key: 'sp_health_1_phone',
        label: 'Phone',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.sp_health_0_has_additional === 'yes',
      },
      {
        key: 'sp_health_1_patients',
        label: 'Patients:',
        type: 'checkbox-group',
        options: (answers: Map<number, Record<string, unknown>>) => {
          const hasSpouse = (answers.get(1)?.['maritalStatus'] as string) === 'married' || (answers.get(1)?.['maritalStatus'] as string) === 'common_law';
          if (hasSpouse) {
            return [
              { value: 'client1', label: (answers.get(1)?.['fullName'] as string) || 'Client 1' },
              { value: 'client2', label: (answers.get(1)?.['spouseName'] as string) || 'Client 2' },
            ];
          }
          return [{ value: 'client1', label: (answers.get(1)?.['fullName'] as string) || 'Client 1' }];
        },
        required: false,
        condition: (formData: Record<string, string>) => formData.sp_health_0_has_additional === 'yes',
      },
      {
        key: 'sp_health_1_has_additional',
        label: 'Do you have another additional Specialist?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.sp_health_0_has_additional === 'yes',
      },
      {
        key: 'sp_health_2_name',
        label: 'Additional Specialist Name',
        type: 'text',
        placeholder: 'Enter specialist name',
        required: false,
        condition: (formData: Record<string, string>) => formData.sp_health_1_has_additional === 'yes',
      },
      {
        key: 'sp_health_2_specialty',
        label: 'Specialty',
        type: 'text',
        placeholder: 'e.g., Cardiologist, Neurologist',
        required: false,
        condition: (formData: Record<string, string>) => formData.sp_health_1_has_additional === 'yes',
      },
      {
        key: 'sp_health_2_phone',
        label: 'Phone',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.sp_health_1_has_additional === 'yes',
      },
      {
        key: 'sp_health_2_patients',
        label: 'Patients:',
        type: 'checkbox-group',
        options: (answers: Map<number, Record<string, unknown>>) => {
          const hasSpouse = (answers.get(1)?.['maritalStatus'] as string) === 'married' || (answers.get(1)?.['maritalStatus'] as string) === 'common_law';
          if (hasSpouse) {
            return [
              { value: 'client1', label: (answers.get(1)?.['fullName'] as string) || 'Client 1' },
              { value: 'client2', label: (answers.get(1)?.['spouseName'] as string) || 'Client 2' },
            ];
          }
          return [{ value: 'client1', label: (answers.get(1)?.['fullName'] as string) || 'Client 1' }];
        },
        required: false,
        condition: (formData: Record<string, string>) => formData.sp_health_1_has_additional === 'yes',
      },
      {
        key: 'ph_health_0_name',
        label: 'Pharmacist Name',
        type: 'text',
        placeholder: 'Enter pharmacist name',
        required: false,
      },
      {
        key: 'ph_health_0_pharmacy',
        label: 'Pharmacy',
        type: 'text',
        placeholder: 'Enter pharmacy name',
        required: false,
      },
      {
        key: 'ph_health_0_phone',
        label: 'Phone',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
      },
      {
        key: 'ph_health_0_of',
        label: 'Pharmacist of',
        type: 'checkbox-group',
        options: (answers: Map<number, Record<string, unknown>>) => {
          const hasSpouse = (answers.get(1)?.['maritalStatus'] as string) === 'married' || (answers.get(1)?.['maritalStatus'] as string) === 'common_law';
          if (hasSpouse) {
            return [
              { value: 'client1', label: (answers.get(1)?.['fullName'] as string) || 'Client 1' },
              { value: 'client2', label: (answers.get(1)?.['spouseName'] as string) || 'Client 2' },
            ];
          }
          return [{ value: 'client1', label: (answers.get(1)?.['fullName'] as string) || 'Client 1' }];
        },
        required: false,
      },
      {
        key: 'ph_health_0_has_additional',
        label: 'Do you have an additional Pharmacist?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'ph_health_1_name',
        label: 'Additional Pharmacist Name',
        type: 'text',
        placeholder: 'Enter pharmacist name',
        required: false,
        condition: (formData: Record<string, string>) => formData.ph_health_0_has_additional === 'yes',
      },
      {
        key: 'ph_health_1_pharmacy',
        label: 'Pharmacy',
        type: 'text',
        placeholder: 'Enter pharmacy name',
        required: false,
        condition: (formData: Record<string, string>) => formData.ph_health_0_has_additional === 'yes',
      },
      {
        key: 'ph_health_1_phone',
        label: 'Phone',
        type: 'text',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.ph_health_0_has_additional === 'yes',
      },
      {
        key: 'ph_health_1_of',
        label: 'Pharmacist of',
        type: 'checkbox-group',
        options: (answers: Map<number, Record<string, unknown>>) => {
          const hasSpouse = (answers.get(1)?.['maritalStatus'] as string) === 'married' || (answers.get(1)?.['maritalStatus'] as string) === 'common_law';
          if (hasSpouse) {
            return [
              { value: 'client1', label: (answers.get(1)?.['fullName'] as string) || 'Client 1' },
              { value: 'client2', label: (answers.get(1)?.['spouseName'] as string) || 'Client 2' },
            ];
          }
          return [{ value: 'client1', label: (answers.get(1)?.['fullName'] as string) || 'Client 1' }];
        },
        required: false,
        condition: (formData: Record<string, string>) => formData.ph_health_0_has_additional === 'yes',
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
  {
    id: 10,
    title: 'Wills',
    description: 'A Will is the foundation of your estate plan. It directs how your assets are distributed, names your executor, and can include trusts for beneficiaries with special needs. This section helps us understand the current state of your Will(s) and whether updates may be needed.',
    questions: [
      {
        key: 'client1HasWill',
        label: (answers: Map<number, Record<string, unknown>>) => {
          const name = (answers.get(1)?.['fullName'] as string) || 'Client 1';
          return `Does ${name} have a Will?`;
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
        label: 'In what year was your Will prepared?',
        type: 'select',
        options: generateYearOptions,
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasWill === 'yes',
      },
      {
        key: 'client1WillLocation',
        label: 'Where is your Will located?',
        type: 'text',
        placeholder: 'e.g., Lawyer\'s office, home safe, safety deposit box',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasWill === 'yes',
      },
      {
        key: 'client1WillJurisdiction',
        label: 'In what jurisdiction was your Will prepared?',
        type: 'text',
        placeholder: 'e.g., Ontario, British Columbia',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasWill === 'yes',
      },
      {
        key: 'client1HasSecondaryWill',
        label: 'Do you have a secondary Will (e.g., for assets in another jurisdiction)?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasWill === 'yes',
      },
      {
        key: 'client1SecondaryWillLocation',
        label: 'Where is your secondary Will located?',
        type: 'text',
        placeholder: 'Enter location',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasSecondaryWill === 'yes',
      },
      {
        key: 'client1SecondaryWillJurisdiction',
        label: 'In what jurisdiction was your secondary Will prepared?',
        type: 'text',
        placeholder: 'e.g., Ontario, Florida',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasSecondaryWill === 'yes',
      },
      {
        key: 'client1HasWillMeaningfulChanges',
        label: 'Have there been any meaningful changes in your life, family, or financial situation since your Will was prepared?',
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
        label: 'Please describe the meaningful changes:',
        type: 'textarea',
        placeholder: 'Describe the changes that have occurred...',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasWillMeaningfulChanges === 'yes',
      },
      {
        key: 'client1HasHensonTrust',
        label: 'Have you included an Absolute Discretionary Trust ("Henson Trust") in your Will for a disabled beneficiary?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasWill === 'yes',
      },
      {
        key: 'client2HasWill',
        label: (answers: Map<number, Record<string, unknown>>) => {
          const name = (answers.get(1)?.['spouseName'] as string) || 'Client 2';
          return `Does ${name} have a Will?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          const marital = formData.maritalStatus;
          return marital === 'married' || marital === 'common_law';
        },
      },
      {
        key: 'willsSameLawyer',
        label: 'Were both Wills prepared by the same lawyer?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasWill === 'yes' && formData.client2HasWill === 'yes',
      },
      {
        key: 'client2WillYear',
        label: 'In what year was your spouse\'s Will prepared?',
        type: 'select',
        options: generateYearOptions,
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasWill === 'yes',
      },
      {
        key: 'client2WillLocation',
        label: 'Where is your spouse\'s Will located?',
        type: 'text',
        placeholder: 'e.g., Lawyer\'s office, home safe, safety deposit box',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasWill === 'yes',
      },
      {
        key: 'client2WillJurisdiction',
        label: 'In what jurisdiction was your spouse\'s Will prepared?',
        type: 'text',
        placeholder: 'e.g., Ontario, British Columbia',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasWill === 'yes',
      },
      {
        key: 'client2HasSecondaryWill',
        label: 'Does your spouse have a secondary Will?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasWill === 'yes',
      },
      {
        key: 'client2SecondaryWillLocation',
        label: 'Where is your spouse\'s secondary Will located?',
        type: 'text',
        placeholder: 'Enter location',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasSecondaryWill === 'yes',
      },
      {
        key: 'client2SecondaryWillJurisdiction',
        label: 'In what jurisdiction was your spouse\'s secondary Will prepared?',
        type: 'text',
        placeholder: 'e.g., Ontario, Florida',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasSecondaryWill === 'yes',
      },
      {
        key: 'client2HasWillMeaningfulChanges',
        label: 'Have there been any meaningful changes in your spouse\'s life since their Will was prepared?',
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
        label: 'Please describe the meaningful changes:',
        type: 'textarea',
        placeholder: 'Describe the changes that have occurred...',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasWillMeaningfulChanges === 'yes',
      },
    ],
  },
  {
    id: 11,
    title: 'Powers of Attorney',
    description: 'A Power of Attorney (POA) lets you appoint someone to make decisions on your behalf if you become unable to do so. There are two types: one for personal care (health decisions) and one for property (financial decisions).',
    questions: [
      {
        key: 'client1HasPoaPersonalCare',
        label: (answers: Map<number, Record<string, unknown>>) => {
          const name = (answers.get(1)?.['fullName'] as string) || 'Client 1';
          return `Does ${name} have a Power of Attorney for Personal Care?`;
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
        label: 'Is your spouse your Attorney for Personal Care?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasPoaPersonalCare === 'yes' && (formData.maritalStatus === 'married' || formData.maritalStatus === 'common_law'),
      },
      {
        key: 'client1PoaPersonalCareName',
        label: 'Attorney Name',
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasPoaPersonalCare === 'yes' && formData.client1SpouseIsPoaPersonalCare !== 'yes',
      },
      {
        key: 'client1PoaPersonalCarePhone',
        label: 'Phone',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasPoaPersonalCare === 'yes' && formData.client1SpouseIsPoaPersonalCare !== 'yes',
      },
      {
        key: 'client1PoaPersonalCareEmail',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasPoaPersonalCare === 'yes' && formData.client1SpouseIsPoaPersonalCare !== 'yes',
      },
      {
        key: 'client1PoaPersonalCareRelationship',
        label: 'Relationship',
        type: 'text',
        placeholder: 'e.g., Son, Daughter, Friend',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasPoaPersonalCare === 'yes' && formData.client1SpouseIsPoaPersonalCare !== 'yes',
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
        condition: (formData: Record<string, string>) => formData.client1HasPoaPersonalCare === 'yes' && formData.client1SpouseIsPoaPersonalCare !== 'yes',
      },
      {
        key: 'client1PoaPersonalCareCountry',
        label: 'Country of Residence',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasPoaPersonalCare === 'yes' && formData.client1SpouseIsPoaPersonalCare !== 'yes' && formData.client1PoaPersonalCareIsCanadaResident !== 'yes',
      },
      {
        key: 'client1PoaPersonalCareProvince',
        label: 'Province',
        type: 'text',
        placeholder: 'Enter province',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasPoaPersonalCare === 'yes' && formData.client1SpouseIsPoaPersonalCare !== 'yes',
      },
      {
        key: 'client1PoaPersonalCareCity',
        label: 'City',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasPoaPersonalCare === 'yes' && formData.client1SpouseIsPoaPersonalCare !== 'yes',
      },
      {
        key: 'client1PoaPersonalCareHasDocCopy',
        label: 'Do you have a copy of the Power of Attorney document?',
        type: 'radio',
        options: [
          { value: 'yes_on_file', label: 'Yes, I have a copy on file' },
          { value: 'no_can_access', label: 'No, but I know where to access it' },
          { value: 'no_not_discussed', label: 'No, this has not been discussed' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasPoaPersonalCare === 'yes',
      },
      {
        key: 'client1HasLivingWill',
        label: 'Do you have a Living Will (advance directive)?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client1HasPoaProperty',
        label: 'Do you have a Power of Attorney for Property?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'spouseIsPoaProperty',
        label: 'Is your spouse your Attorney for Property?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasPoaProperty === 'yes' && (formData.maritalStatus === 'married' || formData.maritalStatus === 'common_law'),
      },
      {
        key: 'client1PoaPropertyHasDocCopy',
        label: 'Do you have a copy of the Power of Attorney for Property document?',
        type: 'radio',
        options: [
          { value: 'yes_on_file', label: 'Yes, I have a copy on file' },
          { value: 'no_can_access', label: 'No, but I know where to access it' },
          { value: 'no_not_discussed', label: 'No, this has not been discussed' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasPoaProperty === 'yes',
      },
      {
        key: 'client2HasPoaPersonalCare',
        label: (answers: Map<number, Record<string, unknown>>) => {
          const name = (answers.get(1)?.['spouseName'] as string) || 'Client 2';
          return `Does ${name} have a Power of Attorney for Personal Care?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.maritalStatus === 'married' || formData.maritalStatus === 'common_law',
      },
      {
        key: 'client2SpouseIsPoaPersonalCare',
        label: 'Is your spouse your Attorney for Personal Care?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasPoaPersonalCare === 'yes',
      },
      {
        key: 'client2PoaPersonalCareName',
        label: 'Attorney Name',
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasPoaPersonalCare === 'yes' && formData.client2SpouseIsPoaPersonalCare !== 'yes',
      },
      {
        key: 'client2PoaPersonalCarePhone',
        label: 'Phone',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasPoaPersonalCare === 'yes' && formData.client2SpouseIsPoaPersonalCare !== 'yes',
      },
      {
        key: 'client2PoaPersonalCareEmail',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasPoaPersonalCare === 'yes' && formData.client2SpouseIsPoaPersonalCare !== 'yes',
      },
      {
        key: 'client2PoaPersonalCareRelationship',
        label: 'Relationship',
        type: 'text',
        placeholder: 'e.g., Son, Daughter, Friend',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasPoaPersonalCare === 'yes' && formData.client2SpouseIsPoaPersonalCare !== 'yes',
      },
      {
        key: 'client2PoaPersonalCareCountry',
        label: 'Country of Residence',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasPoaPersonalCare === 'yes' && formData.client2SpouseIsPoaPersonalCare !== 'yes',
      },
      {
        key: 'client2PoaPersonalCareProvince',
        label: 'Province',
        type: 'text',
        placeholder: 'Enter province',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasPoaPersonalCare === 'yes' && formData.client2SpouseIsPoaPersonalCare !== 'yes',
      },
      {
        key: 'client2PoaPersonalCareCity',
        label: 'City',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasPoaPersonalCare === 'yes' && formData.client2SpouseIsPoaPersonalCare !== 'yes',
      },
      {
        key: 'client2PoaPersonalCareHasDocCopy',
        label: 'Do you have a copy of the Power of Attorney document?',
        type: 'radio',
        options: [
          { value: 'yes_on_file', label: 'Yes, I have a copy on file' },
          { value: 'no_can_access', label: 'No, but I know where to access it' },
          { value: 'no_not_discussed', label: 'No, this has not been discussed' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasPoaPersonalCare === 'yes',
      },
      {
        key: 'client2HasLivingWill',
        label: 'Does your spouse have a Living Will (advance directive)?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.maritalStatus === 'married' || formData.maritalStatus === 'common_law',
      },
      {
        key: 'client2HasPoaProperty',
        label: 'Does your spouse have a Power of Attorney for Property?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.maritalStatus === 'married' || formData.maritalStatus === 'common_law',
      },
      {
        key: 'client2SpouseIsPoaProperty',
        label: 'Is your spouse your Attorney for Property?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasPoaProperty === 'yes',
      },
      {
        key: 'client2SpousePoaPropertyHasDocAccess',
        label: 'Does your spouse have access to the Power of Attorney for Property document?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasPoaProperty === 'yes',
      },
      {
        key: 'client2PoaPropertyHasDocCopy',
        label: 'Does your spouse have a copy of the Power of Attorney for Property document?',
        type: 'radio',
        options: [
          { value: 'yes_on_file', label: 'Yes, copy on file' },
          { value: 'no_can_access', label: 'No, but can access it' },
          { value: 'no_not_discussed', label: 'No, not discussed' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasPoaProperty === 'yes',
      },
      {
        key: 'client2PoaPropertyDocLocation',
        label: 'Where is the Power of Attorney for Property document stored?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasPoaProperty === 'yes',
      },
    ],
  },
  {
    id: 12,
    title: 'Estate Trustees (Executors)',
    description: 'An Estate Trustee (also called an Executor) is the person or institution responsible for administering your estate after you pass away. This includes paying debts, filing taxes, and distributing assets according to your Will.',
    questions: [
      {
        key: 'client1HasEstateTrustee',
        label: (answers: Map<number, Record<string, unknown>>) => {
          const name = (answers.get(1)?.['fullName'] as string) || 'Client 1';
          return `Has ${name} named an Estate Trustee (Executor)?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'client1SpouseIsEstateTrustee',
        label: 'Is your spouse your Estate Trustee?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasEstateTrustee === 'yes' && (formData.maritalStatus === 'married' || formData.maritalStatus === 'common_law'),
      },
      {
        key: 'client1EstateTrusteeName',
        label: 'Estate Trustee Name',
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasEstateTrustee === 'yes' && formData.client1SpouseIsEstateTrustee !== 'yes',
      },
      {
        key: 'client1EstateTrusteePhone',
        label: 'Phone',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasEstateTrustee === 'yes' && formData.client1SpouseIsEstateTrustee !== 'yes',
      },
      {
        key: 'client1EstateTrusteeEmail',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasEstateTrustee === 'yes' && formData.client1SpouseIsEstateTrustee !== 'yes',
      },
      {
        key: 'client1EstateTrusteeRelationship',
        label: 'Relationship',
        type: 'text',
        placeholder: 'e.g., Son, Daughter, Friend, Trust Company',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasEstateTrustee === 'yes' && formData.client1SpouseIsEstateTrustee !== 'yes',
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
        condition: (formData: Record<string, string>) => formData.client1HasEstateTrustee === 'yes' && formData.client1SpouseIsEstateTrustee !== 'yes',
      },
      {
        key: 'client1EstateTrusteeCountry',
        label: 'Country of Residence',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasEstateTrustee === 'yes' && formData.client1SpouseIsEstateTrustee !== 'yes' && formData.client1EstateTrusteeIsCanadaResident !== 'yes',
      },
      {
        key: 'client1EstateTrusteeProvince',
        label: 'Province',
        type: 'text',
        placeholder: 'Enter province',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasEstateTrustee === 'yes' && formData.client1SpouseIsEstateTrustee !== 'yes',
      },
      {
        key: 'client1EstateTrusteeCity',
        label: 'City',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasEstateTrustee === 'yes' && formData.client1SpouseIsEstateTrustee !== 'yes',
      },
      {
        key: 'client1EstateTrusteeHasDocCopy',
        label: 'Does the Estate Trustee have a copy of the Will?',
        type: 'radio',
        options: [
          { value: 'yes_on_file', label: 'Yes, copy on file' },
          { value: 'no_can_access', label: 'No, but can access it' },
          { value: 'no_not_discussed', label: 'No, not discussed' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasEstateTrustee === 'yes',
      },
      {
        key: 'client1EstateTrusteeKnowsWillLocation',
        label: 'Does your Estate Trustee know where your Will is located?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasEstateTrustee === 'yes',
      },
      {
        key: 'client1HasAlternateEstateTrustee',
        label: 'Have you named an alternate Estate Trustee?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasEstateTrustee === 'yes',
      },
      {
        key: 'client1AlternateEstateTrustee1Name',
        label: 'Alternate Estate Trustee Name',
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasAlternateEstateTrustee === 'yes',
      },
      {
        key: 'client1AlternateEstateTrustee1Phone',
        label: 'Phone',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasAlternateEstateTrustee === 'yes',
      },
      {
        key: 'client1AlternateEstateTrustee1Email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasAlternateEstateTrustee === 'yes',
      },
      {
        key: 'client1AlternateEstateTrustee1Relationship',
        label: 'Relationship',
        type: 'text',
        placeholder: 'e.g., Son, Daughter, Friend',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasAlternateEstateTrustee === 'yes',
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
        condition: (formData: Record<string, string>) => formData.client1HasAlternateEstateTrustee === 'yes',
      },
      {
        key: 'client1AlternateEstateTrustee1Country',
        label: 'Country of Residence',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasAlternateEstateTrustee === 'yes' && formData.client1AlternateEstateTrustee1IsCanadaResident !== 'yes',
      },
      {
        key: 'client1AlternateEstateTrustee1Province',
        label: 'Province',
        type: 'text',
        placeholder: 'Enter province',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasAlternateEstateTrustee === 'yes',
      },
      {
        key: 'client1AlternateEstateTrustee1City',
        label: 'City',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasAlternateEstateTrustee === 'yes',
      },
      {
        key: 'client1AlternateEstateTrustee1HasDocCopy',
        label: 'Does the alternate Estate Trustee have a copy of the Will?',
        type: 'radio',
        options: [
          { value: 'yes_on_file', label: 'Yes, copy on file' },
          { value: 'no_can_access', label: 'No, but can access it' },
          { value: 'no_not_discussed', label: 'No, not discussed' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasAlternateEstateTrustee === 'yes',
      },
      {
        key: 'client2HasEstateTrustee',
        label: (answers: Map<number, Record<string, unknown>>) => {
          const name = (answers.get(1)?.['spouseName'] as string) || 'Client 2';
          return `Has ${name} named an Estate Trustee (Executor)?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.maritalStatus === 'married' || formData.maritalStatus === 'common_law',
      },
      {
        key: 'client2SpouseIsEstateTrustee',
        label: 'Is your spouse your Estate Trustee?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasEstateTrustee === 'yes',
      },
      {
        key: 'client2EstateTrusteeName',
        label: 'Estate Trustee Name',
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasEstateTrustee === 'yes' && formData.client2SpouseIsEstateTrustee !== 'yes',
      },
      {
        key: 'client2EstateTrusteePhone',
        label: 'Phone',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasEstateTrustee === 'yes' && formData.client2SpouseIsEstateTrustee !== 'yes',
      },
      {
        key: 'client2EstateTrusteeEmail',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasEstateTrustee === 'yes' && formData.client2SpouseIsEstateTrustee !== 'yes',
      },
      {
        key: 'client2EstateTrusteeRelationship',
        label: 'Relationship',
        type: 'text',
        placeholder: 'e.g., Son, Daughter, Friend, Trust Company',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasEstateTrustee === 'yes' && formData.client2SpouseIsEstateTrustee !== 'yes',
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
        condition: (formData: Record<string, string>) => formData.client2HasEstateTrustee === 'yes' && formData.client2SpouseIsEstateTrustee !== 'yes',
      },
      {
        key: 'client2EstateTrusteeCountry',
        label: 'Country of Residence',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasEstateTrustee === 'yes' && formData.client2SpouseIsEstateTrustee !== 'yes' && formData.client2EstateTrusteeIsCanadaResident !== 'yes',
      },
      {
        key: 'client2EstateTrusteeProvince',
        label: 'Province',
        type: 'text',
        placeholder: 'Enter province',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasEstateTrustee === 'yes' && formData.client2SpouseIsEstateTrustee !== 'yes',
      },
      {
        key: 'client2EstateTrusteeCity',
        label: 'City',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasEstateTrustee === 'yes' && formData.client2SpouseIsEstateTrustee !== 'yes',
      },
      {
        key: 'client2EstateTrusteeHasDocCopy',
        label: 'Does the Estate Trustee have a copy of the Will?',
        type: 'radio',
        options: [
          { value: 'yes_on_file', label: 'Yes, copy on file' },
          { value: 'no_can_access', label: 'No, but can access it' },
          { value: 'no_not_discussed', label: 'No, not discussed' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasEstateTrustee === 'yes',
      },
      {
        key: 'client2EstateTrusteeKnowsWillLocation',
        label: 'Does your spouse\'s Estate Trustee know where their Will is located?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasEstateTrustee === 'yes',
      },
      {
        key: 'client2HasAlternateEstateTrustee',
        label: 'Has your spouse named an alternate Estate Trustee?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasEstateTrustee === 'yes',
      },
      {
        key: 'client2AlternateEstateTrustee1Name',
        label: 'Alternate Estate Trustee Name',
        type: 'text',
        placeholder: 'Enter full name',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasAlternateEstateTrustee === 'yes',
      },
      {
        key: 'client2AlternateEstateTrustee1Phone',
        label: 'Phone',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasAlternateEstateTrustee === 'yes',
      },
      {
        key: 'client2AlternateEstateTrustee1Email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email address',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasAlternateEstateTrustee === 'yes',
      },
      {
        key: 'client2AlternateEstateTrustee1Relationship',
        label: 'Relationship',
        type: 'text',
        placeholder: 'e.g., Son, Daughter, Friend',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasAlternateEstateTrustee === 'yes',
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
        condition: (formData: Record<string, string>) => formData.client2HasAlternateEstateTrustee === 'yes',
      },
      {
        key: 'client2AlternateEstateTrustee1Country',
        label: 'Country of Residence',
        type: 'text',
        placeholder: 'Enter country',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasAlternateEstateTrustee === 'yes' && formData.client2AlternateEstateTrustee1IsCanadaResident !== 'yes',
      },
      {
        key: 'client2AlternateEstateTrustee1Province',
        label: 'Province',
        type: 'text',
        placeholder: 'Enter province',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasAlternateEstateTrustee === 'yes',
      },
      {
        key: 'client2AlternateEstateTrustee1City',
        label: 'City',
        type: 'text',
        placeholder: 'Enter city',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasAlternateEstateTrustee === 'yes',
      },
      {
        key: 'client2AlternateEstateTrustee1HasDocCopy',
        label: 'Does the alternate Estate Trustee have a copy of the Will?',
        type: 'radio',
        options: [
          { value: 'yes_on_file', label: 'Yes, copy on file' },
          { value: 'no_can_access', label: 'No, but can access it' },
          { value: 'no_not_discussed', label: 'No, not discussed' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasAlternateEstateTrustee === 'yes',
      },
    ],
  },
  {
    id: 13,
    title: 'Funeral Arrangements',
    description: 'Planning your funeral arrangements in advance can relieve your family of difficult decisions during an emotional time. This section captures your wishes regarding funeral arrangements and whether they have been documented.',
    questions: [
      {
        key: 'client1HasFuneralArrangements',
        label: (answers: Map<number, Record<string, unknown>>) => {
          const name = (answers.get(1)?.['fullName'] as string) || 'Client 1';
          return `Has ${name} made funeral arrangements?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client1FuneralArrangementsLocation',
        label: 'Where are the funeral arrangements documented?',
        type: 'text',
        placeholder: 'Enter location',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasFuneralArrangements === 'yes',
      },
      {
        key: 'client1HasDiscussedFuneral',
        label: 'Have you discussed your funeral wishes with your family?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client1FuneralWrittenDown',
        label: 'Have your funeral wishes been written down?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client1FuneralDocLocation',
        label: 'Where is the funeral wishes document stored?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1FuneralWrittenDown === 'yes',
      },
      {
        key: 'client2HasFuneralArrangements',
        label: (answers: Map<number, Record<string, unknown>>) => {
          const name = (answers.get(1)?.['spouseName'] as string) || 'Client 2';
          return `Has ${name} made funeral arrangements?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.maritalStatus === 'married' || formData.maritalStatus === 'common_law',
      },
      {
        key: 'client2FuneralArrangementsLocation',
        label: 'Where are your spouse\'s funeral arrangements documented?',
        type: 'text',
        placeholder: 'Enter location',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasFuneralArrangements === 'yes',
      },
      {
        key: 'client2HasDiscussedFuneral',
        label: 'Has your spouse discussed their funeral wishes with family?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.maritalStatus === 'married' || formData.maritalStatus === 'common_law',
      },
      {
        key: 'client2FuneralWrittenDown',
        label: 'Have your spouse\'s funeral wishes been written down?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.maritalStatus === 'married' || formData.maritalStatus === 'common_law',
      },
      {
        key: 'client2FuneralDocLocation',
        label: 'Where is your spouse\'s funeral wishes document stored?',
        type: 'text',
        placeholder: 'Enter document location',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2FuneralWrittenDown === 'yes',
      },
    ],
  },
  {
    id: 14,
    title: 'Pensions & Registered Accounts',
    description: 'Pensions and registered accounts (RRSP, RRIF, TFSA, etc.) often form a significant part of your estate. Understanding what you have and where it is located helps ensure these assets are properly managed and distributed.',
    questions: [
      {
        key: 'client1HasPension',
        label: (answers: Map<number, Record<string, unknown>>) => {
          const name = (answers.get(1)?.['fullName'] as string) || 'Client 1';
          return `Does ${name} have a pension or retirement plan?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client2HasPension',
        label: (answers: Map<number, Record<string, unknown>>) => {
          const name = (answers.get(1)?.['spouseName'] as string) || 'Client 2';
          return `Does ${name} have a pension or retirement plan?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.maritalStatus === 'married' || formData.maritalStatus === 'common_law',
      },
    ],
  },
];
