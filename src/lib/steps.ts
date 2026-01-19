export type StepQuestion = {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'email' | 'date' | 'number';
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  required?: boolean;
  videoUrl?: string;
  description?: string;
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
        key: 'hasSpouse',
        label: 'Do you have a spouse or common law partner?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
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
      {
        key: 'sameMedicalDoctor',
        label: 'Do all children use the same medical doctor?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'sameDentist',
        label: 'Do all children use the same dentist?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
        required: false,
      },
      {
        key: 'sameOrthodontist',
        label: 'Do all children use the same orthodontist?',
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
    id: 2,
    title: 'Children Information',
    description: 'Please provide details about each of your children',
    questions: [],
  },
];
