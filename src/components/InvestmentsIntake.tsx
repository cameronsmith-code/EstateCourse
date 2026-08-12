import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import {
  InvestmentAccount,
  BeneficiaryDesignation,
  generateAssetId,
  INVESTMENT_ACCOUNT_TYPES,
  JOINT_ELIGIBLE_ACCOUNT_TYPES,
  DESIGNATION_TYPES,
} from '../lib/financialAssetTypes';
import {
  inputClass,
  labelClass,
  sectionCardClass,
  subtleTextClass,
  OptionButton,
  ProgressBar,
  IntakeNav,
  SummaryCard,
  AddButton,
  DocumentLocationPicker,
  OwnerSelector,
} from './FinancialFootprintShared';

type Props = {
  assets: InvestmentAccount[];
  onChange: (assets: InvestmentAccount[]) => void;
  allAnswers?: Map<string, Record<string, unknown>>;
  client1Name: string;
  client2Name: string;
  hasSpouse: boolean;
  knownIndividuals: Array<{ id: string; name: string; relationship: string }>;
  advisorName?: string;
  advisorFirm?: string;
  advisorPhone?: string;
  advisorEmail?: string;
  advisorId?: string;
  institutions: Array<{ id: string; name: string }>;
  onAddInstitution?: (name: string) => string;
  startSignal?: number;
  presetType?: string;
  hideAddButton?: boolean;
  onSaved?: () => void;
  onCancelled?: () => void;
};

type Draft = Partial<InvestmentAccount> & {
  hasAccount?: string;
  accountTypes?: string[];
};

function emptyDraft(): Draft {
  return {
    id: generateAssetId('inv'),
    category: 'investmentAccount',
    accountType: '',
    ownerIds: [],
    currency: 'CAD',
  };
}

export default function InvestmentsIntake({
  assets,
  onChange,
  client1Name,
  client2Name,
  hasSpouse,
  knownIndividuals,
  advisorName,
  advisorFirm,
  advisorPhone,
  advisorEmail,
  advisorId,
  institutions,
  onAddInstitution,
  startSignal,
  presetType,
  hideAddButton,
  onSaved,
  onCancelled,
}: Props) {
  const [intakeActive, setIntakeActive] = useState(false);
  const [intakeStep, setIntakeStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(emptyDraft());
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (startSignal && startSignal > 0) {
      setDraft({ ...emptyDraft(), accountType: presetType || '' });
      setEditingIndex(null);
      setIntakeStep(presetType ? 1 : 0);
      setIntakeActive(true);
    }
  }, [startSignal]);

  const updateDraft = (field: keyof Draft, value: unknown) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const startNew = () => {
    setDraft(emptyDraft());
    setEditingIndex(null);
    setIntakeStep(0);
    setIntakeActive(true);
  };

  const startEdit = (index: number) => {
    setDraft({ ...assets[index] });
    setEditingIndex(index);
    setIntakeStep(0);
    setIntakeActive(true);
  };

  const cancelIntake = () => {
    setIntakeActive(false);
    setDraft(emptyDraft());
    setIntakeStep(0);
    setEditingIndex(null);
    onCancelled?.();
  };

  const saveDraft = () => {
    const cleanDraft: InvestmentAccount = {
      id: draft.id || generateAssetId('inv'),
      category: 'investmentAccount',
      subtype: draft.accountType || 'other_investment',
      accountType: draft.accountType || '',
      accountTypeOther: draft.accountTypeOther,
      ownerIds: draft.ownerIds || [],
      institutionId: draft.institutionId,
      institutionName: draft.institutionName,
      approximateValue: draft.approximateValue,
      valueUnknown: draft.valueUnknown,
      currency: draft.currency || 'CAD',
      friendlyLabel: draft.friendlyLabel,
      lastFour: draft.lastFour,
      hasBeneficiary: draft.hasBeneficiary,
      beneficiaries: draft.beneficiaries,
      managedBy: draft.managedBy,
      managedByOther: draft.managedByOther,
      respSubscriber: draft.respSubscriber,
      respBeneficiaryChildIds: draft.respBeneficiaryChildIds,
      respBeneficiaryNames: draft.respBeneficiaryNames,
      contact: effectiveContact,
      documentLocation: draft.documentLocation,
      notes: draft.notes,
    };

    if (editingIndex !== null) {
      const updated = [...assets];
      updated[editingIndex] = cleanDraft;
      onChange(updated);
    } else {
      onChange([...assets, cleanDraft]);
    }
    setIntakeActive(false);
    setDraft(emptyDraft());
    setIntakeStep(0);
    setEditingIndex(null);
    onSaved?.();
  };

  const deleteAsset = (index: number) => {
    onChange(assets.filter((_, i) => i !== index));
  };

  const accountTypeLabel = (t: string) =>
    INVESTMENT_ACCOUNT_TYPES.find((o) => o.value === t)?.label || t;

  const ownerLabel = (ids: string[]) => {
    if (ids.includes('joint')) return 'Joint';
    if (ids.includes('client1') && ids.includes('client2')) return `${client1Name} & ${client2Name}`;
    if (ids.includes('client2')) return client2Name;
    if (ids.includes('other')) return 'Other';
    return client1Name;
  };

  const isResp = draft.accountType === 'resp';
  const isJointEligible = JOINT_ELIGIBLE_ACCOUNT_TYPES.includes(draft.accountType || '');

  // Build intake questions dynamically
  const questions = buildQuestions(
    draft,
    updateDraft,
    client1Name,
    client2Name,
    hasSpouse,
    isResp,
    isJointEligible,
    knownIndividuals,
    institutions,
    advisorName,
    advisorFirm,
    advisorPhone,
    advisorEmail,
    advisorId,
    onAddInstitution,
  );

  const currentQuestion = questions[intakeStep];
  const isLastStep = intakeStep === questions.length - 1;
  const canProceed = currentQuestion?.canProceed() ?? false;

  if (intakeActive) {
    return (
      <div className="space-y-6">
        <ProgressBar current={intakeStep} total={questions.length} />
        <div className={sectionCardClass}>
          {currentQuestion.title && (
            <h3 className="text-xl font-semibold text-white">{currentQuestion.title}</h3>
          )}
          {currentQuestion.subtitle && (
            <p className="text-sm text-gray-400">{currentQuestion.subtitle}</p>
          )}
          <div className="pt-2">{currentQuestion.render()}</div>
        </div>
        <IntakeNav
          step={intakeStep}
          total={questions.length}
          isFirst={intakeStep === 0}
          isLast={isLastStep}
          canProceed={canProceed}
          onBack={intakeStep === 0 ? cancelIntake : () => setIntakeStep(intakeStep - 1)}
          onNext={() => (isLastStep ? saveDraft() : setIntakeStep(intakeStep + 1))}
          nextLabel={isLastStep ? 'Save Account' : 'Next'}
        />
      </div>
    );
  }

  // Review mode
  return (
    <div className="space-y-5">
      {assets.length > 0 && (
        <div className="space-y-3">
          {assets.map((asset, i) => (
            <SummaryCard
              key={asset.id}
              title={asset.friendlyLabel || `${accountTypeLabel(asset.accountType)}${asset.institutionName ? ` — ${asset.institutionName}` : ''}`}
              subtitle={ownerLabel(asset.ownerIds)}
              value={asset.valueUnknown ? 'Value unknown' : asset.approximateValue ? `Approximately ${asset.currency} ${asset.approximateValue}` : undefined}
              details={[
                ...(asset.accountType === 'resp' && asset.respBeneficiaryNames?.length ? [{ label: 'Beneficiary', value: asset.respBeneficiaryNames.join(', ') }] : []),
                ...(asset.hasBeneficiary === 'yes' && asset.beneficiaries?.length ? [{ label: 'Designation', value: asset.beneficiaries.map((b) => b.personName || b.relationship || '').filter(Boolean).join(', ') }] : []),
                ...(asset.lastFour ? [{ label: 'Last 4 digits', value: asset.lastFour }] : []),
              ]}
              onEdit={() => startEdit(i)}
              onDelete={() => deleteAsset(i)}
            />
          ))}
        </div>
      )}
      {!hideAddButton && <AddButton label="Add an investment or registered account" onClick={startNew} />}
    </div>
  );
}

type Question = {
  title?: string;
  subtitle?: string;
  render: () => React.ReactNode;
  canProceed: () => boolean;
};

function buildQuestions(
  draft: Draft,
  updateDraft: (field: keyof Draft, value: unknown) => void,
  client1Name: string,
  client2Name: string,
  hasSpouse: boolean,
  isResp: boolean,
  isJointEligible: boolean,
  knownIndividuals: Array<{ id: string; name: string; relationship: string }>,
  institutions: Array<{ id: string; name: string }>,
  advisorName?: string,
  advisorFirm?: string,
  advisorPhone?: string,
  advisorEmail?: string,
  advisorId?: string,
  onAddInstitution?: (name: string) => string,
): Question[] {
  const questions: Question[] = [];

  // Q1: Account type
  questions.push({
    title: 'What type of account is this?',
    subtitle: 'Select the account type. You can add more accounts after this one.',
    render: () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {INVESTMENT_ACCOUNT_TYPES.map((opt) => (
          <OptionButton
            key={opt.value}
            label={opt.label}
            selected={draft.accountType === opt.value}
            onClick={() => {
              updateDraft('accountType', opt.value);
              if (opt.value !== 'resp') {
                updateDraft('respSubscriber', undefined);
                updateDraft('respBeneficiaryChildIds', undefined);
                updateDraft('respBeneficiaryNames', undefined);
              }
            }}
          />
        ))}
      </div>
    ),
    canProceed: () => !!draft.accountType,
  });

  // Q1b: Other account type
  if (draft.accountType === 'other_investment') {
    questions.push({
      title: 'What would you call this account type?',
      render: () => (
        <input
          type="text"
          value={draft.accountTypeOther || ''}
          onChange={(e) => updateDraft('accountTypeOther', e.target.value)}
          placeholder="Enter the account type name"
          className={inputClass}
        />
      ),
      canProceed: () => !!draft.accountTypeOther?.trim(),
    });
  }

  // RESP branch: subscriber
  if (isResp) {
    questions.push({
      title: 'Who is the subscriber of this RESP?',
      subtitle: 'The subscriber is the person who set up and contributes to the plan.',
      render: () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <OptionButton label={client1Name} selected={draft.respSubscriber === 'client1'} onClick={() => updateDraft('respSubscriber', 'client1')} />
          {hasSpouse && <OptionButton label={client2Name} selected={draft.respSubscriber === 'client2'} onClick={() => updateDraft('respSubscriber', 'client2')} />}
          {hasSpouse && <OptionButton label="Joint subscribers" selected={draft.respSubscriber === 'joint'} onClick={() => updateDraft('respSubscriber', 'joint')} />}
          <OptionButton label="Other" selected={draft.respSubscriber === 'other'} onClick={() => updateDraft('respSubscriber', 'other')} />
        </div>
      ),
      canProceed: () => !!draft.respSubscriber,
    });
  }

  // Q2: Ownership
  questions.push({
    title: isResp ? 'Who owns this account?' : 'Who owns this account?',
    subtitle: isJointEligible ? undefined : 'This account type is typically individually held.',
    render: () => (
      <OwnerSelector
        value={draft.ownerIds || []}
        onChange={(v) => updateDraft('ownerIds', v)}
        client1Name={client1Name}
        client2Name={client2Name}
        hasSpouse={hasSpouse}
        allowJoint={isJointEligible}
        singleSelect
      />
    ),
    canProceed: () => (draft.ownerIds || []).length > 0,
  });

  // Q3: Institution
  questions.push({
    title: 'Where is this account held?',
    subtitle: 'Select an institution you have already mentioned, or enter a new one.',
    render: () => (
      <div className="space-y-3">
        {institutions.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {institutions.map((inst) => (
              <OptionButton
                key={inst.id}
                label={inst.name}
                selected={draft.institutionId === inst.id}
                onClick={() => {
                  updateDraft('institutionId', inst.id);
                  updateDraft('institutionName', inst.name);
                }}
              />
            ))}
          </div>
        )}
        <div className="pt-2">
          <label className={labelClass}>Or enter a new institution</label>
          <input
            type="text"
            value={draft.institutionName && !institutions.find((i) => i.id === draft.institutionId) ? draft.institutionName : ''}
            onChange={(e) => {
              updateDraft('institutionName', e.target.value);
              updateDraft('institutionId', undefined);
              if (e.target.value.trim() && onAddInstitution) {
                const newId = onAddInstitution(e.target.value);
                updateDraft('institutionId', newId);
              }
            }}
            placeholder="e.g., TD Bank, RBC, Scotiabank"
            className={inputClass}
          />
        </div>
      </div>
    ),
    canProceed: () => !!draft.institutionName?.trim(),
  });

  // Q4: Friendly label
  questions.push({
    title: 'How would you identify this account?',
    subtitle: 'A friendly label helps everyone understand which account this is.',
    render: () => (
      <div>
        <input
          type="text"
          value={draft.friendlyLabel || ''}
          onChange={(e) => updateDraft('friendlyLabel', e.target.value)}
          placeholder={`e.g., ${client1Name}'s TD RRSP`}
          className={inputClass}
        />
        <p className={subtleTextClass}>This is optional but recommended.</p>
      </div>
    ),
    canProceed: () => true,
  });

  // Q5: Value
  questions.push({
    title: 'Approximately what is it worth today?',
    render: () => (
      <div className="space-y-4">
        <div className="flex gap-3">
          <select
            value={draft.currency || 'CAD'}
            onChange={(e) => updateDraft('currency', e.target.value)}
            className="w-28 px-3 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg"
          >
            <option value="CAD">CAD</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
          <input
            type="text"
            value={draft.approximateValue || ''}
            onChange={(e) => {
              updateDraft('approximateValue', e.target.value);
              updateDraft('valueUnknown', false);
            }}
            placeholder="Enter approximate value"
            className={inputClass}
          />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={draft.valueUnknown || false}
            onChange={(e) => {
              updateDraft('valueUnknown', e.target.checked);
              if (e.target.checked) updateDraft('approximateValue', undefined);
            }}
            className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600"
          />
          <span className="text-sm text-gray-300">I'm not sure of the current value</span>
        </label>
      </div>
    ),
    canProceed: () => !!draft.approximateValue?.trim() || !!draft.valueUnknown,
  });

  // Q5b: Last four digits (optional)
  questions.push({
    title: 'Last four digits of the account (optional)',
    subtitle: 'Never enter the full account number — just the last four digits help identify it.',
    render: () => (
      <input
        type="text"
        maxLength={4}
        value={draft.lastFour || ''}
        onChange={(e) => updateDraft('lastFour', e.target.value)}
        placeholder="e.g., 1234"
        className={inputClass}
      />
    ),
    canProceed: () => true,
  });

  // RESP branch: beneficiaries
  if (isResp) {
    questions.push({
      title: 'Who is this RESP intended for?',
      subtitle: 'Select the child or children this RESP was set up for.',
      render: () => {
        const children = knownIndividuals.filter((k) => k.relationship === 'Child');
        const selectedIds = draft.respBeneficiaryChildIds || [];
        const toggleChild = (id: string, name: string) => {
          const ids = [...selectedIds];
          const names = [...(draft.respBeneficiaryNames || [])];
          if (ids.includes(id)) {
            updateDraft('respBeneficiaryChildIds', ids.filter((x) => x !== id));
            updateDraft('respBeneficiaryNames', names.filter((n) => n !== name));
          } else {
            updateDraft('respBeneficiaryChildIds', [...ids, id]);
            updateDraft('respBeneficiaryNames', [...names, name]);
          }
        };
        return (
          <div className="space-y-3">
            {children.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {children.map((child) => (
                  <OptionButton
                    key={child.id}
                    label={child.name}
                    selected={selectedIds.includes(child.id)}
                    onClick={() => toggleChild(child.id, child.name)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No children have been entered yet.</p>
            )}
            <div>
              <label className={labelClass}>Or enter a name directly</label>
              <input
                type="text"
                value={(draft.respBeneficiaryNames || []).join(', ')}
                onChange={(e) => {
                  const names = e.target.value.split(',').map((n) => n.trim()).filter(Boolean);
                  updateDraft('respBeneficiaryNames', names);
                }}
                placeholder="Enter name(s), separated by commas"
                className={inputClass}
              />
            </div>
          </div>
        );
      },
      canProceed: () => (draft.respBeneficiaryNames || []).length > 0 || (draft.respBeneficiaryChildIds || []).length > 0,
    });
  }

  // Q6: Beneficiary / successor designation (not for RESP, handled separately)
  if (!isResp) {
    questions.push({
      title: 'Have you made a beneficiary or successor designation for this account?',
      subtitle: 'This helps identify whether the account passes outside the estate.',
      render: () => (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'not_sure', label: "I'm not sure" },
            { value: 'not_applicable', label: 'Not applicable' },
          ].map((opt) => (
            <OptionButton
              key={opt.value}
              label={opt.label}
              selected={draft.hasBeneficiary === opt.value}
              onClick={() => updateDraft('hasBeneficiary', opt.value)}
            />
          ))}
        </div>
      ),
      canProceed: () => !!draft.hasBeneficiary,
    });

    // Q6b: Beneficiary details
    if (draft.hasBeneficiary === 'yes') {
      questions.push({
        title: 'Who is currently designated?',
        subtitle: 'You can add multiple beneficiaries. Use existing people where possible.',
        render: () => {
          const beneficiaries = draft.beneficiaries || [];
          const addBeneficiary = (personId: string, name: string, relationship: string) => {
            const newBen: BeneficiaryDesignation = {
              id: generateAssetId('ben'),
              personId,
              personName: name,
              relationship,
            };
            updateDraft('beneficiaries', [...beneficiaries, newBen]);
          };
          const removeBeneficiary = (id: string) => {
            updateDraft('beneficiaries', beneficiaries.filter((b) => b.id !== id));
          };
          return (
            <div className="space-y-4">
              <div>
                <p className={subtleTextClass}>Select from people you have already mentioned:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {knownIndividuals.map((person) => (
                    <OptionButton
                      key={person.id}
                      label={`${person.name} (${person.relationship})`}
                      selected={false}
                      onClick={() => addBeneficiary(person.id, person.name, person.relationship)}
                    />
                  ))}
                </div>
              </div>
              {beneficiaries.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Designated beneficiaries</p>
                  {beneficiaries.map((ben) => (
                    <div key={ben.id} className="flex items-center justify-between bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5">
                      <span className="text-sm text-gray-300">{ben.personName}</span>
                      <div className="flex items-center gap-2">
                        <select
                          value={ben.designationType || ''}
                          onChange={(e) => {
                            const updated = beneficiaries.map((b) =>
                              b.id === ben.id ? { ...b, designationType: e.target.value } : b,
                            );
                            updateDraft('beneficiaries', updated);
                          }}
                          className="text-xs px-2 py-1 bg-gray-700 border border-gray-600 text-white rounded"
                        >
                          <option value="">Designation type...</option>
                          {DESIGNATION_TYPES.map((dt) => (
                            <option key={dt.value} value={dt.value}>{dt.label}</option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={ben.percentage || ''}
                          onChange={(e) => {
                            const updated = beneficiaries.map((b) =>
                              b.id === ben.id ? { ...b, percentage: e.target.value } : b,
                            );
                            updateDraft('beneficiaries', updated);
                          }}
                          placeholder="%"
                          className="w-12 text-xs px-2 py-1 bg-gray-700 border border-gray-600 text-white rounded text-center"
                        />
                        <button type="button" onClick={() => removeBeneficiary(ben.id)} className="text-gray-400 hover:text-red-400">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        },
        canProceed: () => (draft.beneficiaries || []).length > 0,
      });
    }
  }

  // Q7: Account management
  questions.push({
    title: 'Who normally looks after or manages this account?',
    render: () => {
      const managedByOptions: Array<{ value: string; label: string }> = [
        { value: 'client1', label: client1Name },
      ];
      if (hasSpouse) managedByOptions.push({ value: 'client2', label: client2Name });
      managedByOptions.push({ value: 'advisor', label: 'Financial advisor' });
      managedByOptions.push({ value: 'other', label: 'Another person' });
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {managedByOptions.map((opt) => (
            <OptionButton
              key={opt.value}
              label={opt.label}
              selected={draft.managedBy === opt.value}
              onClick={() => updateDraft('managedBy', opt.value)}
            />
          ))}
        </div>
      );
    },
    canProceed: () => !!draft.managedBy,
  });

  // Q8: Financial professional contact
  const hasStaleAdvisorLink = draft.contact?.contactPersonId && !advisorId;
  const effectiveContact = hasStaleAdvisorLink ? { ...draft.contact, contactPersonId: undefined, contactName: undefined, contactFirm: undefined, contactPhone: undefined, contactEmail: undefined } : draft.contact;

  questions.push({
    title: 'Is there a financial professional someone could contact about this account?',
    subtitle: advisorName ? `Your advisor from the Professional Team section: ${advisorName}` : undefined,
    render: () => (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { value: 'yes_advisor', label: advisorName ? `Yes — ${advisorName}` : 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'not_sure', label: "I'm not sure" },
          ].map((opt) => (
            <OptionButton
              key={opt.value}
              label={opt.label}
              selected={effectiveContact?.contactPersonId === advisorId && !!advisorId || (opt.value === 'no' && !effectiveContact?.contactName)}
              onClick={() => {
                if (opt.value === 'yes_advisor') {
                  updateDraft('contact', {
                    contactPersonId: advisorId,
                    contactName: advisorName,
                    contactFirm: advisorFirm,
                    contactPhone: advisorPhone,
                    contactEmail: advisorEmail,
                  });
                } else {
                  updateDraft('contact', { contactPersonId: undefined });
                }
              }}
            />
          ))}
        </div>
        {(!effectiveContact?.contactPersonId && !effectiveContact?.contactName) && (
          <p className={subtleTextClass}>If yes, you can provide contact details on the next step.</p>
        )}
      </div>
    ),
    canProceed: () => true,
  });

  // Q8b: Contact details if yes but no advisor
  if (!effectiveContact?.contactPersonId && effectiveContact?.contactPersonId !== advisorId) {
    questions.push({
      title: 'Contact details for this account (optional)',
      subtitle: 'Someone stepping in may need to reach this person.',
      render: () => (
        <div className="space-y-3">
          <div>
            <label className={labelClass}>Name</label>
            <input type="text" value={effectiveContact?.contactName || ''} onChange={(e) => updateDraft('contact', { ...effectiveContact, contactName: e.target.value })} placeholder="Contact name" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Firm</label>
            <input type="text" value={effectiveContact?.contactFirm || ''} onChange={(e) => updateDraft('contact', { ...effectiveContact, contactFirm: e.target.value })} placeholder="Firm or company" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input type="tel" value={effectiveContact?.contactPhone || ''} onChange={(e) => updateDraft('contact', { ...effectiveContact, contactPhone: e.target.value })} placeholder="Phone number" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" value={effectiveContact?.contactEmail || ''} onChange={(e) => updateDraft('contact', { ...effectiveContact, contactEmail: e.target.value })} placeholder="Email address" className={inputClass} />
          </div>
        </div>
      ),
      canProceed: () => true,
    });
  }

  // Q9: Statements / documents
  questions.push({
    title: 'How would someone find information about this account if they needed it?',
    render: () => (
      <DocumentLocationPicker
        value={draft.documentLocation?.accessMethod || ''}
        otherValue={draft.documentLocation?.accessMethodOther}
        locationValue={draft.documentLocation?.location || ''}
        locationOtherValue={draft.documentLocation?.locationOther}
        onAccessMethodChange={(v) => updateDraft('documentLocation', { ...draft.documentLocation, accessMethod: v })}
        onAccessMethodOtherChange={(v) => updateDraft('documentLocation', { ...draft.documentLocation, accessMethodOther: v })}
        onLocationChange={(v) => updateDraft('documentLocation', { ...draft.documentLocation, location: v })}
        onLocationOtherChange={(v) => updateDraft('documentLocation', { ...draft.documentLocation, locationOther: v })}
      />
    ),
    canProceed: () => true,
  });

  // Q10: Notes
  questions.push({
    title: 'Anything someone stepping in should know about this account? (optional)',
    render: () => (
      <textarea
        value={draft.notes || ''}
        onChange={(e) => updateDraft('notes', e.target.value)}
        placeholder="e.g., This account has a beneficiary designation that supersedes the will. Contributions are made automatically each month."
        rows={3}
        className={inputClass}
      />
    ),
    canProceed: () => true,
  });

  return questions;
}
