import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ChevronRight, Home, Building2, Landmark, Shield, FileText, DollarSign, User, Phone, Mail } from 'lucide-react';

type AdditionalDebt = {
  id: string;
  borrower?: string;
  borrowerOtherName?: string;
  borrowerOtherRelationship?: string;
  description?: string;
  lender?: string;
  amount?: string;
  amountUnknown?: string;
  interestRate?: string;
  interestRateUnknown?: string;
  paymentAmount?: string;
  paymentFrequency?: string;
  paymentFrequencyOther?: string;
  paymentSource?: string;
  paymentSourceOther?: string;
  isSecured?: string;
  securedByType?: string;
  securedByOther?: string;
  hasContact?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  hasDocument?: string;
  documentLocation?: string;
  documentLocationOther?: string;
  specialNotes?: string;
};

type PropertyDebt = {
  source: 'realEstate';
  propertyName: string;
  debtType: 'Mortgage' | 'HELOC';
  lender: string;
  balance: string;
  borrowers: string;
};

type GuaranteeDebt = {
  source: 'corporateGuarantee';
  corporation: string;
  lender: string;
  borrowingType: string;
  amount: string;
  guarantor: string;
  maxGuarantee: string;
};

type AmountOwedToClient = {
  source: 'corporateOwedByClient';
  corporation: string;
  amount: string;
  owedTo: string;
};

type DerivedObligations = {
  propertyDebts: PropertyDebt[];
  guarantees: GuaranteeDebt[];
  amountsOwedByClient: AmountOwedToClient[];
};

type Props = {
  answers: Record<string, unknown>;
  allAnswers?: Map<string, Record<string, unknown>>;
  onAnswerChange: (key: string, value: unknown) => void;
};

const BORROWING_TYPE_LABELS: Record<string, string> = {
  business_loan: 'Business Loan',
  operating_line: 'Operating Line',
  business_credit_card: 'Business Credit Card',
  commercial_mortgage: 'Commercial Mortgage',
  equipment_financing: 'Equipment Financing',
  equipment_lease: 'Equipment Lease',
  other: 'Other',
  not_sure: 'Not Sure',
};

const GUARANTEE_SCOPE_LABELS: Record<string, string> = {
  entire_amount: 'Entire amount',
  specific_maximum: 'Specific maximum',
  percentage: 'Percentage',
  another_arrangement: 'Another arrangement',
  not_sure: 'Not sure',
};

function formatCurrency(amount: string): string {
  if (!amount) return '';
  const num = parseFloat(amount.replace(/[^0-9.]/g, ''));
  if (isNaN(num)) return amount;
  return num.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function formatBorrowers(parties: string[], otherBorrowers?: Array<{ name?: string }>): string {
  const names: string[] = [];
  for (const p of parties) {
    if (p === 'client1') names.push('Client 1');
    else if (p === 'client2') names.push('Client 2');
    else if (p === 'joint') names.push('Joint');
    else if (p) names.push(p);
  }
  if (otherBorrowers) {
    otherBorrowers.forEach(o => { if (o.name) names.push(o.name); });
  }
  return names.join(' & ') || '';
}

function deriveObligations(allAnswers?: Map<string, Record<string, unknown>>): DerivedObligations {
  const result: DerivedObligations = { propertyDebts: [], guarantees: [], amountsOwedByClient: [] };
  if (!allAnswers) return result;

  const aboutYou = allAnswers.get('aboutYou') || {};
  const client1Name = (aboutYou['fullName'] as string) || 'Client 1';
  const client2Name = (aboutYou['spouseName'] as string) || 'Client 2';

  // Real Estate debts
  const realEstate = allAnswers.get('realEstate') || {};
  const primaryHome = realEstate['primaryHomeData'] as Record<string, unknown> | undefined;
  const propertiesData = (realEstate['propertiesData'] as Array<Record<string, unknown>>) || [];

  const allProperties: Array<{ name: string; data: Record<string, unknown> }> = [];
  if (primaryHome && primaryHome['hasDebt'] === 'yes') {
    allProperties.push({ name: (primaryHome['name'] as string) || 'Primary Home', data: primaryHome });
  }
  propertiesData.forEach((p) => {
    if (p && p['hasDebt'] === 'yes') {
      allProperties.push({ name: (p['name'] as string) || 'Property', data: p });
    }
  });

  allProperties.forEach(({ name, data }) => {
    const debtType = data['debtType'] as string;
    const responsibleParties = (data['mortgageResponsibleParties'] as string[]) || [];
    const otherBorrowers = data['mortgageOtherBorrowers'] as Array<{ name?: string }> | undefined;
    const borrowers = formatBorrowers(responsibleParties, otherBorrowers);

    if (debtType === 'mortgage' || debtType === 'both') {
      result.propertyDebts.push({
        source: 'realEstate',
        propertyName: name,
        debtType: 'Mortgage',
        lender: (data['mortgageLender'] as string) || '',
        balance: (data['mortgageBalance'] as string) || '',
        borrowers,
      });
    }
    if (debtType === 'heloc' || debtType === 'both') {
      const helocParties = (data['helocResponsibleParties'] as string[]) || [];
      const helocOtherBorrowers = data['helocOtherBorrowers'] as Array<{ name?: string }> | undefined;
      result.propertyDebts.push({
        source: 'realEstate',
        propertyName: name,
        debtType: 'HELOC',
        lender: (data['helocLender'] as string) || '',
        balance: (data['helocBalance'] as string) || '',
        borrowers: formatBorrowers(helocParties, helocOtherBorrowers),
      });
    }
  });

  // Corporate financial connections — personal guarantees
  const corpConnections = allAnswers.get('corporateFinancialConnections') || {};
  const guarantees = (corpConnections['personalGuaranteesData'] as Array<Record<string, unknown>>) || [];
  guarantees.forEach((g) => {
    const guarantors = (g['guarantors'] as string[]) || [];
    const otherGuarantors = g['otherGuarantors'] as Array<{ name?: string }> | undefined;
    const guarantorNames: string[] = [];
    guarantors.forEach((gtr) => {
      if (gtr === 'client1') guarantorNames.push(client1Name);
      else if (gtr === 'client2') guarantorNames.push(client2Name);
      else if (gtr === 'other') {
        if (otherGuarantors) otherGuarantors.forEach(og => { if (og.name) guarantorNames.push(og.name); });
      }
    });

    const scope = g['guaranteeScope'] as string;
    let maxGuarantee = '';
    if (scope === 'specific_maximum') maxGuarantee = (g['maximumAmount'] as string) || '';
    else if (scope === 'entire_amount') maxGuarantee = 'Entire amount';
    else if (scope === 'percentage') maxGuarantee = `${g['percentage'] || ''}%`;
    else if (scope && GUARANTEE_SCOPE_LABELS[scope]) maxGuarantee = GUARANTEE_SCOPE_LABELS[scope];

    result.guarantees.push({
      source: 'corporateGuarantee',
      corporation: (g['selectedCompany'] as string) || '',
      lender: (g['lenderName'] as string) || (g['lenderUnknown'] === 'yes' ? 'Unknown' : ''),
      borrowingType: BORROWING_TYPE_LABELS[(g['borrowingType'] as string)] || (g['borrowingTypeOther'] as string) || '',
      amount: g['amountOwedUnknown'] === 'yes' ? 'Unknown' : (g['amountOwed'] as string) || '',
      guarantor: guarantorNames.join(' & '),
      maxGuarantee,
    });
  });

  // Corporate financial connections — shareholder loans (corporation owes client)
  // These do NOT show as personal debt — they are assets owed TO the client.
  // We intentionally skip shareholderLoansData here.

  // Note: If there were a "client owes corporation" structure, we'd surface it here.
  // The current data model only has shareholderLoansData (corporation → client), which is an asset, not a debt.

  return result;
}

function getBankingOptions(allAnswers?: Map<string, Record<string, unknown>>): Array<{ value: string; label: string }> {
  const options: Array<{ value: string; label: string }> = [];
  if (!allAnswers) return options;

  const aboutYou = allAnswers.get('aboutYou') || {};
  const client1Name = (aboutYou['fullName'] as string) || 'Client 1';
  const client2Name = (aboutYou['spouseName'] as string) || 'Client 2';

  const footprint = allAnswers.get('financialFootprint') || {};

  // Non-registered banking institutions
  const institutions = (footprint['institutions'] as Array<Record<string, unknown>>) || [];
  institutions.forEach((inst, i) => {
    const name = (inst['name'] as string) || (inst['institution'] as string) || '';
    const acctType = (inst['accountType'] as string) || '';
    if (name) {
      const label = acctType ? `${name} — ${acctType}` : name;
      options.push({ value: `inst_${i}`, label });
    }
  });

  // Registered accounts
  const c1RegData = (footprint['client1RegisteredAccountData'] as Record<string, Array<Record<string, unknown>>>) || {};
  Object.entries(c1RegData).forEach(([typeKey, insts]) => {
    insts.forEach((inst, i) => {
      const name = (inst['institution'] as string) || (inst['name'] as string) || '';
      if (name) {
        options.push({ value: `c1reg_${typeKey}_${i}`, label: `${client1Name} — ${name}` });
      }
    });
  });

  const c2RegData = (footprint['client2RegisteredAccountData'] as Record<string, Array<Record<string, unknown>>>) || {};
  Object.entries(c2RegData).forEach(([typeKey, insts]) => {
    insts.forEach((inst, i) => {
      const name = (inst['institution'] as string) || (inst['name'] as string) || '';
      if (name) {
        options.push({ value: `c2reg_${typeKey}_${i}`, label: `${client2Name} — ${name}` });
      }
    });
  });

  return options;
}

function YesNoCard({
  value,
  onChange,
  options = ['yes', 'no'],
  labels = { yes: 'Yes', no: 'No' },
}: {
  value: string;
  onChange: (value: string) => void;
  options?: string[];
  labels?: Record<string, string>;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`flex items-center justify-center px-6 py-5 rounded-xl border-2 text-lg font-medium transition-all ${
            value === opt
              ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
              : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-750'
          }`}
        >
          {labels[opt] || opt}
        </button>
      ))}
    </div>
  );
}

function DebtCard({
  title,
  subtitle,
  lender,
  balance,
  borrower,
  badge,
  badgeIcon,
  badgeColor = 'blue',
  onDelete,
}: {
  title: string;
  subtitle: string;
  lender: string;
  balance: string;
  borrower: string;
  badge?: string;
  badgeIcon?: React.ReactNode;
  badgeColor?: 'blue' | 'amber';
  onDelete?: () => void;
}) {
  const badgeColors = {
    blue: 'bg-blue-900/40 text-blue-300 border-blue-700/50',
    amber: 'bg-amber-900/40 text-amber-300 border-amber-700/50',
  };
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-base font-semibold text-white truncate">{title}</h4>
            {badge && (
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeColors[badgeColor]}`}>
                {badgeIcon}
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>
        </div>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="flex-shrink-0 p-2 text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-4">
        {lender && (
          <div>
            <dt className="text-xs text-gray-500 uppercase tracking-wide">Lender</dt>
            <dd className="text-sm text-gray-200 mt-0.5">{lender}</dd>
          </div>
        )}
        {balance && (
          <div>
            <dt className="text-xs text-gray-500 uppercase tracking-wide">Balance</dt>
            <dd className="text-sm text-gray-200 mt-0.5">{balance}</dd>
          </div>
        )}
        {borrower && (
          <div>
            <dt className="text-xs text-gray-500 uppercase tracking-wide">Borrower(s)</dt>
            <dd className="text-sm text-gray-200 mt-0.5">{borrower}</dd>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionLabel({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-blue-400">{icon}</span>
      <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">{text}</h3>
    </div>
  );
}

const PAYMENT_FREQUENCY_OPTIONS = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Every two weeks' },
  { value: 'semimonthly', label: 'Twice a month' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'annually', label: 'Annually' },
  { value: 'other', label: 'Other' },
  { value: 'none', label: 'No regular payment' },
  { value: 'not_sure', label: "I'm not sure" },
];

const SECURED_BY_OPTIONS = [
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'vehicle', label: 'Vehicle' },
  { value: 'investment_account', label: 'Investment account' },
  { value: 'business_interest', label: 'Business / corporate interest' },
  { value: 'other', label: 'Other' },
];

export default function DebtObligations({ answers, allAnswers, onAnswerChange }: Props) {
  const aboutYou = allAnswers?.get('aboutYou') || {};
  const client1Name = (aboutYou['fullName'] as string) || 'Client 1';
  const client2Name = (aboutYou['spouseName'] as string) || 'Client 2';
  const maritalStatus = aboutYou['maritalStatus'] as string;
  const hasSpouse = maritalStatus === 'married' || maritalStatus === 'common_law';

  const derived = deriveObligations(allAnswers);
  const bankingOptions = getBankingOptions(allAnswers);
  const hasDerivedObligations = derived.propertyDebts.length > 0 || derived.guarantees.length > 0;

  const additionalDebts = (answers['additionalDebtsData'] as AdditionalDebt[]) || [];
  const hasAdditionalDebtsAnswer = (answers['hasAdditionalDebts'] as string) || '';
  const reviewConfirmed = (answers['reviewConfirmed'] as string) || '';

  // UI state for the intake flow
  const [intakeActive, setIntakeActive] = useState(false);
  const [intakeStep, setIntakeStep] = useState(0);
  const [draft, setDraft] = useState<AdditionalDebt>({ id: '' });

  // Reset intake when starting fresh
  const startIntake = () => {
    setDraft({ id: `debt-${Date.now()}-${additionalDebts.length}` });
    setIntakeStep(0);
    setIntakeActive(true);
  };

  const cancelIntake = () => {
    setIntakeActive(false);
    setDraft({ id: '' });
    setIntakeStep(0);
  };

  const saveDraft = () => {
    const updated = [...additionalDebts, draft];
    onAnswerChange('additionalDebtsData', updated);
    onAnswerChange('hasAdditionalDebts', 'yes');
    setIntakeActive(false);
    setDraft({ id: '' });
    setIntakeStep(0);
  };

  const deleteDebt = (index: number) => {
    const updated = additionalDebts.filter((_, i) => i !== index);
    onAnswerChange('additionalDebtsData', updated.length > 0 ? updated : undefined);
  };

  const updateDraft = (field: keyof AdditionalDebt, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  // Clean up conditional fields when parent answer changes
  useEffect(() => {
    if (answers['hasAdditionalDebts'] !== 'yes') {
      if (intakeActive) cancelIntake();
    }
  }, [answers['hasAdditionalDebts']]);

  // Clean up review state when debts change
  useEffect(() => {
    if (reviewConfirmed === 'add_another') {
      onAnswerChange('reviewConfirmed', undefined);
    }
  }, [additionalDebts.length]);

  const borrowerOptions: Array<{ value: string; label: string }> = [
    { value: 'client1', label: client1Name },
  ];
  if (hasSpouse) {
    borrowerOptions.push({ value: 'client2', label: client2Name });
    borrowerOptions.push({ value: 'joint', label: `${client1Name} & ${client2Name} jointly` });
  }
  borrowerOptions.push({ value: 'other', label: 'Other' });

  const inputClass = 'w-full px-4 py-2.5 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all';
  const labelClass = 'block text-sm font-medium text-gray-300 mb-2';
  const sectionCardClass = 'bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 space-y-4';

  // === INTAKE QUESTIONS ===
  const INTAKE_QUESTIONS = [
    // Q1: Whose debt is it?
    {
      title: 'Who is responsible for this debt or obligation?',
      render: () => (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {borrowerOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateDraft('borrower', opt.value)}
                className={`flex items-center justify-center px-5 py-4 rounded-xl border-2 text-base font-medium transition-all ${
                  draft.borrower === opt.value
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {draft.borrower === 'other' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className={labelClass}>Name</label>
                <input type="text" value={draft.borrowerOtherName || ''} onChange={(e) => updateDraft('borrowerOtherName', e.target.value)} placeholder="Enter name" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Relationship</label>
                <input type="text" value={draft.borrowerOtherRelationship || ''} onChange={(e) => updateDraft('borrowerOtherRelationship', e.target.value)} placeholder="e.g., Son, Daughter, Friend" className={inputClass} />
              </div>
            </div>
          )}
        </div>
      ),
      canProceed: () => !!draft.borrower && (draft.borrower !== 'other' || !!draft.borrowerOtherName?.trim()),
    },
    // Q2: What is it?
    {
      title: 'What would you call this debt or obligation?',
      subtitle: 'A short description is fine — you don\'t need to categorize it.',
      render: () => (
        <input
          type="text"
          value={draft.description || ''}
          onChange={(e) => updateDraft('description', e.target.value)}
          placeholder="e.g., Personal line of credit, Loan from family, Vehicle financing, Tax amount owing"
          className={inputClass}
        />
      ),
      canProceed: () => !!draft.description?.trim(),
    },
    // Q3: Lender
    {
      title: 'Who is the lender or who is the money owed to?',
      render: () => (
        <input
          type="text"
          value={draft.lender || ''}
          onChange={(e) => updateDraft('lender', e.target.value)}
          placeholder="e.g., RBC, Family member, Canada Revenue Agency"
          className={inputClass}
        />
      ),
      canProceed: () => !!draft.lender?.trim(),
    },
    // Q4: Amount
    {
      title: 'Approximately how much is currently owing?',
      render: () => (
        <div className="space-y-4">
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              inputMode="numeric"
              value={draft.amount || ''}
              onChange={(e) => updateDraft('amount', e.target.value)}
              placeholder="e.g., 25,000"
              className={`${inputClass} pl-10`}
              disabled={draft.amountUnknown === 'yes'}
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={draft.amountUnknown === 'yes'}
              onChange={(e) => {
                updateDraft('amountUnknown', e.target.checked ? 'yes' : '');
                if (e.target.checked) updateDraft('amount', '');
              }}
              className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-400">I'm not sure</span>
          </label>
        </div>
      ),
      canProceed: () => !!draft.amount?.trim() || draft.amountUnknown === 'yes',
    },
    // Q5: Interest rate
    {
      title: 'What is the current interest rate?',
      subtitle: 'Optional — skip if you\'re not sure.',
      render: () => (
        <div className="space-y-4">
          <div className="relative max-w-xs">
            <input
              type="text"
              inputMode="decimal"
              value={draft.interestRate || ''}
              onChange={(e) => updateDraft('interestRate', e.target.value)}
              placeholder="e.g., 5.25"
              className={`${inputClass} pr-8`}
              disabled={draft.interestRateUnknown === 'yes'}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={draft.interestRateUnknown === 'yes'}
              onChange={(e) => {
                updateDraft('interestRateUnknown', e.target.checked ? 'yes' : '');
                if (e.target.checked) updateDraft('interestRate', '');
              }}
              className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-400">I'm not sure</span>
          </label>
        </div>
      ),
      canProceed: () => true,
    },
    // Q6: Payment
    {
      title: 'What is the regular payment?',
      subtitle: 'If there\'s no regular payment, just say so below.',
      render: () => (
        <div className="space-y-5">
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              inputMode="numeric"
              value={draft.paymentAmount || ''}
              onChange={(e) => updateDraft('paymentAmount', e.target.value)}
              placeholder="e.g., 1,200"
              className={`${inputClass} pl-10`}
            />
          </div>
          <div>
            <label className={labelClass}>How often is it paid?</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {PAYMENT_FREQUENCY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateDraft('paymentFrequency', opt.value)}
                  className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                    draft.paymentFrequency === opt.value
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          {draft.paymentFrequency === 'other' && (
            <div>
              <label className={labelClass}>Please specify</label>
              <input type="text" value={draft.paymentFrequencyOther || ''} onChange={(e) => updateDraft('paymentFrequencyOther', e.target.value)} placeholder="Describe the payment schedule" className={inputClass} />
            </div>
          )}
        </div>
      ),
      canProceed: () => true,
    },
    // Q7: Payment account
    {
      title: 'Where is this payment usually made from?',
      subtitle: 'We\'ll use the banking information you\'ve already provided where possible.',
      render: () => {
        const sourceOptions: Array<{ value: string; label: string }> = [];
        if (bankingOptions.length > 0) {
          bankingOptions.forEach((opt) => sourceOptions.push(opt));
        }
        sourceOptions.push({ value: 'client1_account', label: `${client1Name}'s account` });
        if (hasSpouse) {
          sourceOptions.push({ value: 'client2_account', label: `${client2Name}'s account` });
          sourceOptions.push({ value: 'joint_account', label: 'Joint account' });
        }
        sourceOptions.push({ value: 'other', label: 'Other' });
        sourceOptions.push({ value: 'not_sure', label: "I'm not sure" });

        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {sourceOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateDraft('paymentSource', opt.value)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-all text-left ${
                    draft.paymentSource === opt.value
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <Landmark className="w-4 h-4 flex-shrink-0 opacity-60" />
                  {opt.label}
                </button>
              ))}
            </div>
            {draft.paymentSource === 'other' && (
              <div>
                <label className={labelClass}>Please specify</label>
                <input type="text" value={draft.paymentSourceOther || ''} onChange={(e) => updateDraft('paymentSourceOther', e.target.value)} placeholder="Describe where the payment comes from" className={inputClass} />
              </div>
            )}
          </div>
        );
      },
      canProceed: () => true,
    },
    // Q8: Secured or unsecured
    {
      title: 'Is this debt secured by anything?',
      subtitle: 'A secured debt is backed by an asset — like a car, property, or investment.',
      render: () => (
        <div className="space-y-5">
          <YesNoCard
            value={draft.isSecured || ''}
            onChange={(v) => updateDraft('isSecured', v)}
            options={['yes', 'no', 'not_sure']}
            labels={{ yes: 'Yes', no: 'No', not_sure: "I'm not sure" }}
          />
          {draft.isSecured === 'yes' && (
            <div>
              <label className={labelClass}>What is it secured by?</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SECURED_BY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => updateDraft('securedByType', opt.value)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-all text-left ${
                      draft.securedByType === opt.value
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {opt.value === 'real_estate' && <Home className="w-4 h-4 opacity-60" />}
                    {opt.value === 'vehicle' && <Plus className="w-4 h-4 opacity-60" />}
                    {opt.value === 'investment_account' && <DollarSign className="w-4 h-4 opacity-60" />}
                    {opt.value === 'business_interest' && <Building2 className="w-4 h-4 opacity-60" />}
                    {opt.value === 'other' && <FileText className="w-4 h-4 opacity-60" />}
                    {opt.label}
                  </button>
                ))}
              </div>
              {draft.securedByType === 'other' && (
                <input type="text" value={draft.securedByOther || ''} onChange={(e) => updateDraft('securedByOther', e.target.value)} placeholder="Describe what secures this debt" className={`${inputClass} mt-3`} />
              )}
            </div>
          )}
        </div>
      ),
      canProceed: () => !!draft.isSecured && (draft.isSecured !== 'yes' || !!draft.securedByType),
    },
    // Q9: Contact information
    {
      title: 'Is there a person someone managing your affairs should contact about this debt?',
      subtitle: 'Optional — but helpful for your executor or power of attorney.',
      render: () => (
        <div className="space-y-5">
          <YesNoCard value={draft.hasContact || ''} onChange={(v) => updateDraft('hasContact', v)} />
          {draft.hasContact === 'yes' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="sm:col-span-1">
                <label className={labelClass}>Contact name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input type="text" value={draft.contactName || ''} onChange={(e) => updateDraft('contactName', e.target.value)} placeholder="Full name" className={`${inputClass} pl-9`} />
                </div>
              </div>
              <div className="sm:col-span-1">
                <label className={labelClass}>Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input type="tel" value={draft.contactPhone || ''} onChange={(e) => updateDraft('contactPhone', e.target.value)} placeholder="Phone number" className={`${inputClass} pl-9`} />
                </div>
              </div>
              <div className="sm:col-span-1">
                <label className={labelClass}>Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input type="email" value={draft.contactEmail || ''} onChange={(e) => updateDraft('contactEmail', e.target.value)} placeholder="Email address" className={`${inputClass} pl-9`} />
                </div>
              </div>
            </div>
          )}
        </div>
      ),
      canProceed: () => true,
    },
    // Q10: Document location
    {
      title: 'Is there an agreement, statement, or other document someone may need?',
      render: () => (
        <div className="space-y-5">
          <YesNoCard
            value={draft.hasDocument || ''}
            onChange={(v) => updateDraft('hasDocument', v)}
            options={['yes', 'no', 'not_sure']}
            labels={{ yes: 'Yes', no: 'No', not_sure: "I'm not sure" }}
          />
          {draft.hasDocument === 'yes' && (
            <div>
              <label className={labelClass}>Where is it kept?</label>
              <input type="text" value={draft.documentLocation || ''} onChange={(e) => updateDraft('documentLocation', e.target.value)} placeholder="e.g., Home office filing cabinet, Safety deposit box at TD, Shared cloud folder" className={inputClass} />
            </div>
          )}
        </div>
      ),
      canProceed: () => true,
    },
    // Q11: Anything someone should know
    {
      title: 'Is there anything someone stepping in for you should know about this debt?',
      subtitle: 'For example, another person is expected to repay part of it, the balance changes frequently, or there are unusual repayment arrangements.',
      render: () => (
        <textarea
          value={draft.specialNotes || ''}
          onChange={(e) => updateDraft('specialNotes', e.target.value)}
          placeholder="Optional — add any context that would help someone managing your affairs"
          rows={4}
          className={`${inputClass} resize-none`}
        />
      ),
      canProceed: () => true,
    },
  ];

  const currentQuestion = INTAKE_QUESTIONS[intakeStep];
  const isLastIntakeStep = intakeStep === INTAKE_QUESTIONS.length - 1;
  const canProceedFromCurrent = currentQuestion?.canProceed() ?? false;

  // ====== RENDER ======

  // INTAKE MODE
  if (intakeActive) {
    return (
      <div className="space-y-6">
        {/* Progress indicator */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Debt {additionalDebts.length + 1}</span>
          <ChevronRight className="w-4 h-4" />
          <span>Question {intakeStep + 1} of {INTAKE_QUESTIONS.length}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-1.5">
          <div className="bg-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${((intakeStep + 1) / INTAKE_QUESTIONS.length) * 100}%` }} />
        </div>

        <div className={sectionCardClass}>
          <h3 className="text-xl font-semibold text-white">{currentQuestion.title}</h3>
          {currentQuestion.subtitle && <p className="text-sm text-gray-400">{currentQuestion.subtitle}</p>}
          <div className="pt-2">{currentQuestion.render()}</div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={intakeStep === 0 ? cancelIntake : () => setIntakeStep(intakeStep - 1)}
            className="px-5 py-2.5 text-gray-400 hover:text-gray-200 font-medium transition-colors"
          >
            {intakeStep === 0 ? 'Cancel' : 'Back'}
          </button>
          <button
            type="button"
            disabled={!canProceedFromCurrent}
            onClick={() => {
              if (isLastIntakeStep) saveDraft();
              else setIntakeStep(intakeStep + 1);
            }}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
              canProceedFromCurrent
                ? 'bg-blue-600 text-white hover:bg-blue-500'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLastIntakeStep ? 'Save Debt' : 'Next'}
          </button>
        </div>
      </div>
    );
  }

  // DEFAULT / REVIEW MODE
  return (
    <div className="space-y-8">
      {/* === SECTION INTRO === */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Debts & Obligations</h2>
        <p className="text-gray-400 leading-relaxed">
          We've already identified some debts and financial obligations from the information you provided earlier.
          Review them below, then let us know if there's anything else we should add.
        </p>
        <p className="text-gray-500 text-sm mt-3">
          You don't need to re-enter mortgages, home equity lines of credit, or personal guarantees that are already shown here.
        </p>
      </div>

      {/* === PREVIOUSLY IDENTIFIED OBLIGATIONS === */}
      {hasDerivedObligations ? (
        <div className="space-y-6">
          <SectionLabel icon={<Home className="w-4 h-4" />} text="Previously Identified Obligations" />

          {/* Real Estate debts */}
          {derived.propertyDebts.length > 0 && (
            <div className="space-y-3">
              {derived.propertyDebts.map((debt, i) => (
                <DebtCard
                  key={`prop-${i}`}
                  title={debt.propertyName}
                  subtitle={debt.debtType}
                  lender={debt.lender || 'Not specified'}
                  balance={debt.balance ? formatCurrency(debt.balance) : 'Not specified'}
                  borrower={debt.borrowers || 'Not specified'}
                />
              ))}
            </div>
          )}

          {/* Personal guarantees (contingent obligations) */}
          {derived.guarantees.length > 0 && (
            <div className="space-y-3 pt-2">
              {derived.guarantees.map((g, i) => (
                <DebtCard
                  key={`guar-${i}`}
                  title={g.corporation || 'Corporation'}
                  subtitle={g.borrowingType ? `Personal Guarantee — ${g.borrowingType}` : 'Personal Guarantee'}
                  lender={g.lender || 'Not specified'}
                  balance={g.amount ? (g.amount === 'Unknown' ? 'Unknown' : formatCurrency(g.amount)) : 'Not specified'}
                  borrower={g.guarantor || 'Not specified'}
                  badge="Contingent obligation"
                  badgeIcon={<Shield className="w-3 h-3" />}
                  badgeColor="amber"
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 text-center">
          <p className="text-gray-400">
            We haven't identified any debts or financial obligations from your earlier answers yet.
          </p>
        </div>
      )}

      {/* === ADDITIONAL DEBT SUMMARY === */}
      {additionalDebts.length > 0 && (
        <div className="space-y-6">
          <SectionLabel icon={<FileText className="w-4 h-4" />} text="Additional Debts You've Added" />
          <div className="space-y-3">
            {additionalDebts.map((debt, i) => (
              <DebtCard
                key={debt.id || i}
                title={debt.description || 'Additional Debt'}
                subtitle={debt.lender || ''}
                lender={debt.lender || ''}
                balance={debt.amountUnknown === 'yes' ? 'Unknown' : (debt.amount ? formatCurrency(debt.amount) : '')}
                borrower={
                  debt.borrower === 'client1' ? client1Name :
                  debt.borrower === 'client2' ? client2Name :
                  debt.borrower === 'joint' ? `${client1Name} & ${client2Name}` :
                  debt.borrower === 'other' ? (debt.borrowerOtherName || 'Other') :
                  ''
                }
                onDelete={() => deleteDebt(i)}
              />
            ))}
          </div>
        </div>
      )}

      {/* === "ANY ADDITIONAL DEBTS?" QUESTION === */}
      {additionalDebts.length === 0 && hasAdditionalDebtsAnswer === '' && (
        <div className={sectionCardClass}>
          <h3 className="text-xl font-semibold text-white">
            Do you have any additional debts or financial obligations, excluding credit cards?
          </h3>
          <p className="text-sm text-gray-400">
            Credit cards are handled separately. This is for loans, lines of credit, tax amounts owing, family loans, and similar obligations.
          </p>
          <YesNoCard
            value={hasAdditionalDebtsAnswer}
            onChange={(v) => {
              onAnswerChange('hasAdditionalDebts', v);
              if (v === 'yes') startIntake();
            }}
          />
        </div>
      )}

      {/* === REPEAT QUESTION (after adding first debt) === */}
      {additionalDebts.length > 0 && reviewConfirmed !== 'yes' && (
        <div className={sectionCardClass}>
          <h3 className="text-xl font-semibold text-white">
            Are there any additional debts or financial obligations, excluding credit cards?
          </h3>
          <YesNoCard
            value={hasAdditionalDebtsAnswer === 'yes' ? 'yes' : (hasAdditionalDebtsAnswer === 'no' ? 'no' : '')}
            onChange={(v) => {
              onAnswerChange('hasAdditionalDebts', v);
              if (v === 'yes') startIntake();
            }}
          />
        </div>
      )}

      {/* === FINAL REVIEW === */}
      {hasAdditionalDebtsAnswer === 'no' && additionalDebts.length > 0 && (
        <div className="space-y-6">
          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xl font-semibold text-white mb-2">Review</h3>
            <p className="text-gray-400 text-sm">
              Here's the full picture of your debts and financial obligations.
            </p>
          </div>

          {/* Previously identified */}
          {derived.propertyDebts.length > 0 && (
            <div className="space-y-3">
              <SectionLabel icon={<Home className="w-4 h-4" />} text="Real Estate & Property Debts" />
              {derived.propertyDebts.map((debt, i) => (
                <DebtCard
                  key={`rev-prop-${i}`}
                  title={debt.propertyName}
                  subtitle={debt.debtType}
                  lender={debt.lender || 'Not specified'}
                  balance={debt.balance ? formatCurrency(debt.balance) : 'Not specified'}
                  borrower={debt.borrowers || 'Not specified'}
                />
              ))}
            </div>
          )}

          {/* Contingent obligations */}
          {derived.guarantees.length > 0 && (
            <div className="space-y-3">
              <SectionLabel icon={<Shield className="w-4 h-4" />} text="Personally Guaranteed Obligations" />
              {derived.guarantees.map((g, i) => (
                <DebtCard
                  key={`rev-guar-${i}`}
                  title={g.corporation || 'Corporation'}
                  subtitle={g.borrowingType ? `Personal Guarantee — ${g.borrowingType}` : 'Personal Guarantee'}
                  lender={g.lender || 'Not specified'}
                  balance={g.amount ? (g.amount === 'Unknown' ? 'Unknown' : formatCurrency(g.amount)) : 'Not specified'}
                  borrower={g.guarantor || 'Not specified'}
                  badge="Contingent"
                  badgeIcon={<Shield className="w-3 h-3" />}
                  badgeColor="amber"
                />
              ))}
            </div>
          )}

          {/* Additional debts */}
          <div className="space-y-3">
            <SectionLabel icon={<FileText className="w-4 h-4" />} text="Additional Debts" />
            {additionalDebts.map((debt, i) => (
              <DebtCard
                key={`rev-debt-${debt.id || i}`}
                title={debt.description || 'Additional Debt'}
                subtitle={debt.lender || ''}
                lender={debt.lender || ''}
                balance={debt.amountUnknown === 'yes' ? 'Unknown' : (debt.amount ? formatCurrency(debt.amount) : '')}
                borrower={
                  debt.borrower === 'client1' ? client1Name :
                  debt.borrower === 'client2' ? client2Name :
                  debt.borrower === 'joint' ? `${client1Name} & ${client2Name}` :
                  debt.borrower === 'other' ? (debt.borrowerOtherName || 'Other') :
                  ''
                }
                onDelete={() => deleteDebt(i)}
              />
            ))}
          </div>

          {/* Completeness check */}
          <div className={sectionCardClass}>
            <h3 className="text-lg font-semibold text-white">
              Does this look like a complete picture of your debts and financial obligations?
            </h3>
            <YesNoCard
              value={reviewConfirmed}
              onChange={(v) => {
                onAnswerChange('reviewConfirmed', v);
                if (v === 'add_another') startIntake();
              }}
              options={['yes', 'add_another']}
              labels={{ yes: 'Yes, this is complete', add_another: 'I need to add another' }}
            />
          </div>
        </div>
      )}

      {/* If no additional debts and answered no */}
      {hasAdditionalDebtsAnswer === 'no' && additionalDebts.length === 0 && (
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
          <p className="text-gray-300 text-sm">
            No additional debts or obligations to add. {hasDerivedObligations ? 'The obligations shown above from your earlier answers will be included in your documents.' : 'You can come back to this section if your situation changes.'}
          </p>
        </div>
      )}
    </div>
  );
}
