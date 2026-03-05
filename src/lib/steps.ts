export type StepQuestion = {
  key: string;
  label: string | ((answers: Map<number, Record<string, unknown>>) => string);
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
    title: 'Sole Proprietorships and Partnerships',
    description: 'Information about any non-incorporated businesses you have an interest in.',
    questions: [
      {
        key: 'hasSoleProprietorship',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName || 'Client 1';
          return `${client1Name}, do you operate a business as a sole proprietor?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'soleProprietorshipNature',
        label: 'Nature of Business:',
        type: 'select',
        options: [
          { value: 'professional_practice', label: 'Professional Practice (e.g., Physician, Lawyer, Consultant)' },
          { value: 'skilled_trade', label: 'Skilled Trade' },
          { value: 'service_business', label: 'Service Business (e.g., marketing, coaching)' },
          { value: 'retail_ecommerce', label: 'Retail/e-commerce' },
          { value: 'real_estate_rental', label: 'Real estate rental business' },
          { value: 'side_hustle', label: 'Side Hustle' },
          { value: 'other', label: 'Other' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasSoleProprietorship === 'yes',
      },
      {
        key: 'soleProprietorshipNatureOther',
        label: 'Please specify the nature of your business:',
        type: 'text',
        placeholder: 'Enter nature of business',
        required: false,
        condition: (formData: Record<string, string>) => formData.soleProprietorshipNature === 'other',
      },
      {
        key: 'soleProprietorshipRevenue',
        label: 'Approximate Annual Gross Revenue:',
        type: 'radio',
        options: [
          { value: 'under_100k', label: 'Under $100,000' },
          { value: '100k_500k', label: '$100,000 - $500,000' },
          { value: '500k_1m', label: '$500,000 - $1,000,000' },
          { value: 'over_1m', label: 'Over $1,000,000' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasSoleProprietorship === 'yes',
      },
      {
        key: 'businessAttributesLabel',
        label: 'Does the Business have:',
        type: 'label',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasSoleProprietorship === 'yes',
      },
      {
        key: 'hasEmployees',
        label: 'Employees',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasSoleProprietorship === 'yes',
      },
      {
        key: 'employeesDetails',
        label: 'Details:',
        type: 'text',
        placeholder: 'Number of employees, roles, etc.',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasEmployees === 'yes',
      },
      {
        key: 'employeesDocLocation',
        label: 'Location of Contracts/Documentation:',
        type: 'text',
        placeholder: 'Where employment contracts are stored',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasEmployees === 'yes',
      },
      {
        key: 'hasContractors',
        label: 'Contractors',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasSoleProprietorship === 'yes',
      },
      {
        key: 'contractorsDetails',
        label: 'Details:',
        type: 'text',
        placeholder: 'Number of contractors, services provided, etc.',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasContractors === 'yes',
      },
      {
        key: 'contractorsDocLocation',
        label: 'Location of Contracts/Documentation:',
        type: 'text',
        placeholder: 'Where contractor agreements are stored',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasContractors === 'yes',
      },
      {
        key: 'hasLongTermContracts',
        label: 'Long-term client contracts',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasSoleProprietorship === 'yes',
      },
      {
        key: 'longTermContractsDetails',
        label: 'Details:',
        type: 'text',
        placeholder: 'Contract terms, clients, etc.',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasLongTermContracts === 'yes',
      },
      {
        key: 'longTermContractsDocLocation',
        label: 'Location of Contracts/Documentation:',
        type: 'text',
        placeholder: 'Where client contracts are stored',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasLongTermContracts === 'yes',
      },
      {
        key: 'hasRecurringRevenue',
        label: 'Recurring revenue',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasSoleProprietorship === 'yes',
      },
      {
        key: 'recurringRevenueDetails',
        label: 'Details:',
        type: 'text',
        placeholder: 'Subscription models, retainer agreements, etc.',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRecurringRevenue === 'yes',
      },
      {
        key: 'recurringRevenueDocLocation',
        label: 'Location of Contracts/Documentation:',
        type: 'text',
        placeholder: 'Where recurring revenue agreements are stored',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasRecurringRevenue === 'yes',
      },
      {
        key: 'hasPhysicalInventory',
        label: 'Physical Inventory',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasSoleProprietorship === 'yes',
      },
      {
        key: 'physicalInventoryDetails',
        label: 'Details:',
        type: 'text',
        placeholder: 'Type of inventory, location, estimated value',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasPhysicalInventory === 'yes',
      },
      {
        key: 'physicalInventoryDocLocation',
        label: 'Location of Contracts/Documentation:',
        type: 'text',
        placeholder: 'Where inventory records are stored',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasPhysicalInventory === 'yes',
      },
      {
        key: 'hasEquipment',
        label: 'Equipment of material value',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasSoleProprietorship === 'yes',
      },
      {
        key: 'equipmentDetails',
        label: 'Details:',
        type: 'text',
        placeholder: 'Type of equipment, estimated value',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasEquipment === 'yes',
      },
      {
        key: 'equipmentDocLocation',
        label: 'Location of Contracts/Documentation:',
        type: 'text',
        placeholder: 'Where equipment records/receipts are stored',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasEquipment === 'yes',
      },
      {
        key: 'hasCommercialLease',
        label: 'Commercial lease',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasSoleProprietorship === 'yes',
      },
      {
        key: 'commercialLeaseDetails',
        label: 'Details:',
        type: 'text',
        placeholder: 'Property address, lease terms',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasCommercialLease === 'yes',
      },
      {
        key: 'commercialLeaseDocLocation',
        label: 'Location of Contracts/Documentation:',
        type: 'text',
        placeholder: 'Where lease agreement is stored',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasCommercialLease === 'yes',
      },
      {
        key: 'hasIntellectualProperty',
        label: 'Intellectual Property',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.hasSoleProprietorship === 'yes',
      },
      {
        key: 'intellectualPropertyDetails',
        label: 'Details:',
        type: 'text',
        placeholder: 'Trademarks, patents, proprietary systems, etc.',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasIntellectualProperty === 'yes',
      },
      {
        key: 'intellectualPropertyDocLocation',
        label: 'Location of Contracts/Documentation:',
        type: 'text',
        placeholder: 'Where IP documentation is stored',
        required: false,
        condition: (formData: Record<string, string>) => formData.hasIntellectualProperty === 'yes',
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
        key: 'client2HasSoleProprietorship',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName || 'Client 2';
          return `${client2Name}, do you operate a business as a sole proprietor?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client2SoleProprietorshipNature',
        label: 'Nature of Business:',
        type: 'select',
        options: [
          { value: 'professional_practice', label: 'Professional Practice (e.g., Physician, Lawyer, Consultant)' },
          { value: 'skilled_trade', label: 'Skilled Trade' },
          { value: 'service_business', label: 'Service Business (e.g., marketing, coaching)' },
          { value: 'retail_ecommerce', label: 'Retail/e-commerce' },
          { value: 'real_estate_rental', label: 'Real estate rental business' },
          { value: 'side_hustle', label: 'Side Hustle' },
          { value: 'other', label: 'Other' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasSoleProprietorship === 'yes',
      },
      {
        key: 'client2SoleProprietorshipNatureOther',
        label: 'Please specify the nature of your business:',
        type: 'text',
        placeholder: 'Enter nature of business',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2SoleProprietorshipNature === 'other',
      },
      {
        key: 'client2SoleProprietorshipRevenue',
        label: 'Approximate Annual Gross Revenue:',
        type: 'radio',
        options: [
          { value: 'under_100k', label: 'Under $100,000' },
          { value: '100k_500k', label: '$100,000 - $500,000' },
          { value: '500k_1m', label: '$500,000 - $1,000,000' },
          { value: 'over_1m', label: 'Over $1,000,000' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasSoleProprietorship === 'yes',
      },
      {
        key: 'client2SoleProprietorshipAttributes',
        label: 'Does the Business have: (check all that apply)',
        type: 'checkbox',
        options: [
          { value: 'employees', label: 'Employees' },
          { value: 'contractors', label: 'Contractors' },
          { value: 'long_term_contracts', label: 'Long-term Client Contracts' },
          { value: 'recurring_revenue', label: 'Recurring revenue' },
          { value: 'physical_inventory', label: 'Physical inventory' },
          { value: 'equipment', label: 'Equipment of material value' },
          { value: 'commercial_lease', label: 'Commercial lease' },
          { value: 'intellectual_property', label: 'Intellectual property (brand, patents, domain, proprietary systems)' },
          { value: 'other', label: 'Other' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasSoleProprietorship === 'yes',
      },
      {
        key: 'client2SoleProprietorshipAttributesOther',
        label: 'Please specify other business attributes:',
        type: 'text',
        placeholder: 'Enter other attributes',
        required: false,
        condition: (formData: Record<string, string>) => {
          const attributes = formData.client2SoleProprietorshipAttributes;
          return formData.client2HasSoleProprietorship === 'yes' && attributes && attributes.includes('other');
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
        ],
        required: false,
      },
    ],
  },
  {
    id: 7,
    title: 'Who is on your Team?',
    description: 'Your Power(s) of Attorney and Estate Trustees should not act in a vacuum. This section lists the core professionals who already know your history.',
    questions: [
      {
        key: 'client1HasWill',
        label: 'Do you have a Will?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: true,
      },
      {
        key: 'client1WillLocation',
        label: 'Where is your Will located?',
        type: 'text',
        placeholder: 'e.g., Safe deposit box, lawyer\'s office, home safe',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasWill === 'yes',
      },
      {
        key: 'client1HasSecondaryWill',
        label: 'Do you have a secondary Will?',
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
        label: 'Where is the secondary Will located?',
        type: 'text',
        placeholder: 'e.g., Safe deposit box, lawyer\'s office, home safe',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasSecondaryWill === 'yes',
      },
      {
        key: 'client1SecondaryWillJurisdiction',
        label: 'In what jurisdiction was your secondary Will prepared?',
        type: 'text',
        placeholder: 'e.g., Ontario, British Columbia',
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasSecondaryWill === 'yes',
      },
      {
        key: 'spousesPoaPersonalCare',
        label: 'Are you two each other\'s Powers of Attorney for Personal Care?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'spousesPoaProperty',
        label: 'Are you two each other\'s Powers of Attorney for Property?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client1HasPoaPersonalCare',
        label: 'Have you named a Power of Attorney(ies) for Personal Care?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'spouseIsPoaPersonalCare',
        label: 'Is your spouse or common law partner your POA for Personal Care?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          const basicAnswers = formData as unknown as Map<number, Record<string, unknown>>;
          const maritalStatus = typeof basicAnswers.get === 'function'
            ? basicAnswers.get(1)?.maritalStatus
            : formData.maritalStatus;
          return formData.client1HasPoaPersonalCare === 'yes' &&
                 (maritalStatus === 'married' || maritalStatus === 'common_law');
        },
      },
      {
        key: 'client1HasContingentPoaPersonalCare',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName || 'Client 1';
          return `${client1Name}, have you named other or contingent Power(s) of Attorney for Personal Care?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client1PoaPersonalCareCount',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName || 'Client 1';
          return `${client1Name}, how many contingent Power(s) of Attorney(ies) for Personal Care have you named?`;
        },
        type: 'select',
        options: [
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
          { value: '4', label: '4' },
          { value: '5', label: '5' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasContingentPoaPersonalCare === 'yes',
      },
      {
        key: 'client1HasLivingWill',
        label: 'Do you have a \'Living Will\'? A POA-PC specifies who will look after you if you become incapacitated, a Living Will provides your written instructions about medical care, especially related to things like life support, resuscitation (CPR), feeding tubes, and end-of-life care.',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client1HasPoaProperty',
        label: 'Have you named a Power of Attorney(ies) for Property?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'spouseIsPoaProperty',
        label: 'Is your spouse or common law partner your POA for Property?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          const basicAnswers = formData as unknown as Map<number, Record<string, unknown>>;
          const maritalStatus = typeof basicAnswers.get === 'function'
            ? basicAnswers.get(1)?.maritalStatus
            : formData.maritalStatus;
          return formData.client1HasPoaProperty === 'yes' &&
                 (maritalStatus === 'married' || maritalStatus === 'common_law');
        },
      },
      {
        key: 'client1HasContingentPoaProperty',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName || 'Client 1';
          return `${client1Name}, have you named any alternative or contingent Powers of Attorney for Property?`;
        },
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
        key: 'client1PoaPropertyCount',
        label: (answers) => {
          const client1Name = answers.get(1)?.fullName || 'Client 1';
          return `${client1Name}, how many alternative or contingent Powers of Attorney for Property have you named?`;
        },
        type: 'select',
        options: [
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
          { value: '4', label: '4' },
          { value: '5', label: '5' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client1HasContingentPoaProperty === 'yes';
        },
      },
      {
        key: 'client1PoaPropertyHasDocCopy',
        label: 'Do your Powers of Attorney for Property have a copy of the most recent document in their files?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasPoaProperty === 'yes',
      },
      {
        key: 'client1HasEstateTrustee',
        label: 'Have you named an Estate Trustee in your Will?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client1EstateTrusteeCount',
        label: 'How many Estate Trustees have you named?',
        type: 'select',
        options: [
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
          { value: '4', label: '4' },
          { value: '5', label: '5' },
        ],
        required: false,
      },
      {
        key: 'client1EstateTrusteeKnowsWillLocation',
        label: 'Do your Estate Trustees know where to find a copy of your Will?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client1HasEstateTrustee === 'yes',
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
        key: 'client2HasWill',
        label: 'Does your spouse have a Will?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client2WillLocation',
        label: 'Where is your spouse\'s Will located?',
        type: 'text',
        placeholder: 'e.g., Safe deposit box, lawyer\'s office, home safe',
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
        label: 'Where is the secondary Will located?',
        type: 'text',
        placeholder: 'e.g., Safe deposit box, lawyer\'s office, home safe',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasSecondaryWill === 'yes',
      },
      {
        key: 'client2SecondaryWillJurisdiction',
        label: 'In what jurisdiction was your spouse\'s secondary Will prepared?',
        type: 'text',
        placeholder: 'e.g., Ontario, British Columbia',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasSecondaryWill === 'yes',
      },
      {
        key: 'willsSameLawyer',
        label: 'Were they prepared at the same time/by the same lawyer?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client2HasPoaPersonalCare',
        label: 'Has your spouse named a Power of Attorney(ies) for Personal Care?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client2SpouseIsPoaPersonalCare',
        label: 'Is their spouse or common law partner the POA for Personal Care?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          const basicAnswers = formData as unknown as Map<number, Record<string, unknown>>;
          const maritalStatus = typeof basicAnswers.get === 'function'
            ? basicAnswers.get(1)?.maritalStatus
            : formData.maritalStatus;
          return formData.client2HasPoaPersonalCare === 'yes' &&
                 (maritalStatus === 'married' || maritalStatus === 'common_law');
        },
      },
      {
        key: 'client2PoaPersonalCareDisplay',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName || 'Client 2';
          return `${client2Name}'s Power of Attorney for Personal Care`;
        },
        type: 'display',
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client2SpouseIsPoaPersonalCare === 'yes';
        },
      },
      {
        key: 'client2HasContingentPoaPersonalCare',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName || 'Client 2';
          return `${client2Name}, have you named other or contingent Power(s) of Attorney for Personal Care?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasPoaPersonalCare === 'yes',
      },
      {
        key: 'client2PoaPersonalCareCount',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName || 'Client 2';
          return `${client2Name}, how many contingent Power(s) of Attorney(ies) for Personal Care have you named?`;
        },
        type: 'select',
        options: [
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
          { value: '4', label: '4' },
          { value: '5', label: '5' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasContingentPoaPersonalCare === 'yes',
      },
      {
        key: 'client2HasLivingWill',
        label: 'Does your spouse have a \'Living Will\'? A POA-PC specifies who will look after you if you become incapacitated, a Living Will provides your written instructions about medical care, especially related to things like life support, resuscitation (CPR), feeding tubes, and end-of-life care.',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client2PoaPersonalCareDocLocation',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName || 'Client 2';
          return `${client2Name}, where is the Power of Attorney for Personal Care document located?`;
        },
        type: 'text',
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasPoaPersonalCare === 'yes',
      },
      {
        key: 'client2HasPoaProperty',
        label: 'Has your spouse named a Power of Attorney(ies) for Property?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client2SpouseIsPoaProperty',
        label: 'Is their spouse or common law partner the POA for Property?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          const basicAnswers = formData as unknown as Map<number, Record<string, unknown>>;
          const maritalStatus = typeof basicAnswers.get === 'function'
            ? basicAnswers.get(1)?.maritalStatus
            : formData.maritalStatus;
          return formData.client2HasPoaProperty === 'yes' &&
                 (maritalStatus === 'married' || maritalStatus === 'common_law');
        },
      },
      {
        key: 'client2HasContingentPoaProperty',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName || 'Client 2';
          return `${client2Name}, have you named any alternative or contingent Powers of Attorney for Property?`;
        },
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client2HasPoaProperty === 'yes';
        },
      },
      {
        key: 'client2PoaPropertyCount',
        label: (answers) => {
          const client2Name = answers.get(1)?.spouseName || 'Client 2';
          return `${client2Name}, how many alternative or contingent Powers of Attorney for Property have you named?`;
        },
        type: 'select',
        options: [
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
          { value: '4', label: '4' },
          { value: '5', label: '5' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => {
          return formData.client2HasContingentPoaProperty === 'yes';
        },
      },
      {
        key: 'client2PoaPropertyHasDocCopy',
        label: 'Do your Powers of Attorney for Property have a copy of the most recent document in their files?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasPoaProperty === 'yes',
      },
      {
        key: 'client2HasEstateTrustee',
        label: 'Has your spouse named an Estate Trustee in their Will?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'client2EstateTrusteeCount',
        label: 'How many Estate Trustees has your spouse named?',
        type: 'select',
        options: [
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
          { value: '4', label: '4' },
          { value: '5', label: '5' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasEstateTrustee === 'yes',
      },
      {
        key: 'client2EstateTrusteeKnowsWillLocation',
        label: 'Do your Estate Trustees know where to find a copy of your Will?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
        condition: (formData: Record<string, string>) => formData.client2HasEstateTrustee === 'yes',
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 12,
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
    id: 13,
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
