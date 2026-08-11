export type AssetCategory =
  | 'investmentAccount'
  | 'pension'
  | 'employerEquity'
  | 'receivable'
  | 'other';

export type OwnerType = 'client1' | 'client2' | 'joint' | 'other';

export type DocumentLocation = {
  accessMethod?: string;
  accessMethodOther?: string;
  location?: string;
  locationOther?: string;
};

export type ContactInfo = {
  contactName?: string;
  contactFirm?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactPersonId?: string;
};

export type BeneficiaryDesignation = {
  id: string;
  personId?: string;
  personName?: string;
  relationship?: string;
  percentage?: string;
  designationType?: string;
};

export type FinancialAssetBase = {
  id: string;
  category: AssetCategory;
  subtype: string;
  ownerIds: string[];
  institutionId?: string;
  institutionName?: string;
  approximateValue?: string;
  valueUnknown?: boolean;
  currency?: string;
  friendlyLabel?: string;
  lastFour?: string;
  contact?: ContactInfo;
  documentLocation?: DocumentLocation;
  notes?: string;
};

export type InvestmentAccount = FinancialAssetBase & {
  category: 'investmentAccount';
  accountType: string;
  accountTypeOther?: string;
  hasBeneficiary?: string;
  beneficiaries?: BeneficiaryDesignation[];
  managedBy?: string;
  managedByOther?: string;
  // RESP-specific
  respSubscriber?: string;
  respBeneficiaryChildIds?: string[];
  respBeneficiaryNames?: string[];
};

export type PensionRecord = FinancialAssetBase & {
  category: 'pension';
  pensionType: string;
  employer?: string;
  planName?: string;
  // DB-specific
  memberStatus?: string;
  estimatedPensionAmount?: string;
  pensionFrequency?: string;
  expectedStartAge?: string;
  currentPensionAmount?: string;
  // Survivor
  hasSurvivorBenefit?: string;
  survivorPersonId?: string;
  survivorPersonName?: string;
  // DC-specific
  planProvider?: string;
  // Contact/admin
  planAdministrator?: string;
  memberReference?: string;
};

export type EquityCompensation = FinancialAssetBase & {
  category: 'employerEquity';
  awardType: string;
  companyName?: string;
  quantity?: string;
  vestedQuantity?: string;
  unvestedQuantity?: string;
  exercisePrice?: string;
  expiryDate?: string;
  planTreatmentKnown?: string;
  planTreatmentNotes?: string;
  sharesHeldWhere?: string;
  payrollContributionsOngoing?: string;
  expectedSettlementDate?: string;
  payableStatus?: string;
};

export type ReceivableRecord = FinancialAssetBase & {
  category: 'receivable';
  debtor?: string;
  debtorRelationship?: string;
  interestRate?: string;
  paymentArrangement?: string;
  security?: string;
  hasWrittenAgreement?: string;
  derivedFrom?: string;
};

export type OtherAssetRecord = FinancialAssetBase & {
  category: 'other';
  assetDescription?: string;
  provider?: string;
  importantDates?: string;
};

export type AnyFinancialAsset =
  | InvestmentAccount
  | PensionRecord
  | EquityCompensation
  | ReceivableRecord
  | OtherAssetRecord;

export function generateAssetId(prefix: string = 'fa'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export const INVESTMENT_ACCOUNT_TYPES = [
  { value: 'rrsp', label: 'RRSP' },
  { value: 'rrif', label: 'RRIF' },
  { value: 'tfsa', label: 'TFSA' },
  { value: 'fhsa', label: 'FHSA' },
  { value: 'non_registered', label: 'Non-registered investment account' },
  { value: 'lira', label: 'Locked-in Retirement Account (LIRA / LIF / LRIF)' },
  { value: 'resp', label: 'RESP' },
  { value: 'gic', label: 'GIC / term deposit' },
  { value: 'other_registered', label: 'Other registered account' },
  { value: 'other_investment', label: 'Other investment account' },
];

export const PENSION_TYPES = [
  { value: 'db', label: 'Defined Benefit Pension' },
  { value: 'dc', label: 'Defined Contribution Pension' },
  { value: 'group_rrsp', label: 'Group RRSP' },
  { value: 'dpsp', label: 'DPSP' },
  { value: 'prpp', label: 'PRPP' },
  { value: 'group_savings', label: 'Group / Employer savings plan' },
  { value: 'ipp', label: 'IPP' },
  { value: 'rca', label: 'RCA' },
  { value: 'not_sure', label: "I'm not sure" },
  { value: 'other', label: 'Other' },
];

export const EQUITY_AWARD_TYPES = [
  { value: 'rsu', label: 'Restricted Share Units (RSUs)' },
  { value: 'psu', label: 'Performance Share Units (PSUs)' },
  { value: 'dsu', label: 'Deferred Share Units (DSUs)' },
  { value: 'stock_option', label: 'Employee Stock Options' },
  { value: 'espp', label: 'Employee Share Purchase Plan (ESPP)' },
  { value: 'employer_shares', label: 'Employer shares' },
  { value: 'deferred_comp', label: 'Deferred compensation' },
  { value: 'other', label: 'Other' },
];

export const JOINT_ELIGIBLE_ACCOUNT_TYPES = [
  'rrsp', 'rrif', 'tfsa', 'fhsa', 'non_registered', 'gic',
  'other_registered', 'other_investment',
];

export const RESP_BENEFICIARY_ACCOUNT_TYPES = ['resp'];

export const DESIGNATION_TYPES = [
  { value: 'beneficiary', label: 'Beneficiary' },
  { value: 'successor', label: 'Successor holder / successor annuitant' },
  { value: 'not_sure', label: "I'm not sure" },
];

export const STATEMENT_ACCESS_OPTIONS = [
  { value: 'online', label: 'Online statements' },
  { value: 'paper', label: 'Paper statements' },
  { value: 'advisor', label: 'Through our financial advisor' },
  { value: 'other', label: 'Other' },
  { value: 'not_sure', label: "I'm not sure" },
];

export const DOCUMENT_LOCATION_OPTIONS = [
  { value: 'home_office', label: 'Home office' },
  { value: 'safety_deposit', label: 'Safety deposit box' },
  { value: 'fireproof_box', label: 'Fireproof box' },
  { value: 'with_advisor', label: 'With financial advisor' },
  { value: 'with_lawyer', label: 'With lawyer' },
  { value: 'digital', label: 'Digital / password manager' },
  { value: 'other', label: 'Other' },
];
