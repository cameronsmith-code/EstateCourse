import React, { useState, useMemo } from 'react';
import { Plus, Trash2, ChevronRight, ChevronDown, Users, Building2, Scale, FileText, AlertTriangle, Calendar, Landmark, CheckCircle2, CreditCard as Edit3 } from 'lucide-react';
import {
  inputClass,
  labelClass,
  sectionCardClass,
  subtleTextClass,
  OptionButton,
  YesNoCard,
  SummaryCard,
  AddButton,
  DocumentLocationPicker,
  SectionHeading,
} from './FinancialFootprintShared';
import {
  type FamilyTrust,
  type TrusteeEntry,
  type TrustBeneficiaryEntry,
  type TrustAssetHolding,
  type TrustDebt,
  type TrustReceivable,
  type TrustDocumentEntry,
  type TrusteeContinuity,
  type TrustAdvisorLink,
  type Trust21YearRule,
  emptyTrust,
  generateTrustId,
  generateTrustEntityId,
  calculate21YearAnniversary,
  getAnniversaryStatus,
  formatAnniversaryDate,
  generateReviewFlags,
} from '../lib/familyTrustTypes';
import type { ProfessionalAdvisor, Person } from '../lib/referentialIntegrity';
import { getProfessionalAdvisors, getKnownPeople } from '../lib/referentialIntegrity';

type Props = {
  answers: Record<string, unknown>;
  allAnswers: Map<string, Record<string, unknown>>;
  onAnswerChange: (key: string, value: unknown) => void;
};

type TrustSubsection =
  | 'about'
  | 'people'
  | 'continuity'
  | 'assets'
  | 'debts'
  | 'professionals'
  | '21year'
  | 'documents'
  | 'notes';

const SUBSECTION_ORDER: TrustSubsection[] = [
  'about', 'people', 'continuity', 'assets', 'debts', 'professionals', '21year', 'documents', 'notes',
];

const SUBSECTION_LABELS: Record<TrustSubsection, { label: string; icon: React.ReactNode }> = {
  about: { label: 'About the Trust', icon: <Landmark className="w-4 h-4" /> },
  people: { label: 'People & Roles', icon: <Users className="w-4 h-4" /> },
  continuity: { label: 'Trustee Continuity', icon: <Scale className="w-4 h-4" /> },
  assets: { label: 'What the Trust Owns', icon: <Building2 className="w-4 h-4" /> },
  debts: { label: 'Debts & Amounts Owing', icon: <AlertTriangle className="w-4 h-4" /> },
  professionals: { label: 'Professionals & Administration', icon: <FileText className="w-4 h-4" /> },
  '21year': { label: '21-Year Planning', icon: <Calendar className="w-4 h-4" /> },
  documents: { label: 'Important Documents', icon: <FileText className="w-4 h-4" /> },
  notes: { label: 'What Your Family Should Know', icon: <CheckCircle2 className="w-4 h-4" /> },
};

export default function FamilyTrustSection({ answers, allAnswers, onAnswerChange }: Props) {
  const trusts = (answers['familyTrustsData'] as FamilyTrust[]) || [];
  const hasFamilyTrust = (answers['hasFamilyTrust'] as string) || '';

  const client1Name = (allAnswers.get('aboutYou')?.['fullName'] as string) || 'Client 1';
  const client2Name = (allAnswers.get('aboutYou')?.['spouseName'] as string) || 'Client 2';
  const maritalStatus = allAnswers.get('aboutYou')?.['maritalStatus'] as string;
  const hasSpouse = maritalStatus === 'married' || maritalStatus === 'common_law';

  const people = useMemo(() => getKnownPeople(allAnswers), [allAnswers]);
  const advisors = useMemo(() => getProfessionalAdvisors(allAnswers), [allAnswers]);
  const accountants = advisors.filter((a) => a.type === 'accountant' && a.name);
  const lawyers = advisors.filter((a) => a.type === 'lawyer' && a.name);

  const corporations = useMemo(() => {
    const corpData = allAnswers.get('corporations')?.['corporationsData'] as Array<Record<string, string>> | undefined;
    if (!corpData) return [];
    return corpData.map((c, i) => ({ id: `corp_${i}`, name: c.legalName || `Corporation ${i + 1}` }));
  }, [allAnswers]);

  const properties = useMemo(() => {
    const propData = allAnswers.get('realEstate')?.['propertiesData'] as Array<Record<string, unknown>> | undefined;
    const props: Array<{ id: string; name: string }> = [];
    if (propData) {
      propData.forEach((p, i) => {
        props.push({ id: `prop_${i}`, name: (p.name as string) || (p.type as string) || `Property ${i + 1}` });
      });
    }
    const primaryHome = allAnswers.get('realEstate')?.['primaryHomeData'] as Record<string, unknown> | undefined;
    if (primaryHome?.name || primaryHome?.type) {
      props.unshift({ id: 'prop_primary', name: (primaryHome.name as string) || (primaryHome.type as string) || 'Primary Home' });
    }
    return props;
  }, [allAnswers]);

  const [activeTrustId, setActiveTrustId] = useState<string | null>(null);
  const [activeSubsection, setActiveSubsection] = useState<TrustSubsection>('about');
  const [showTrustList, setShowTrustList] = useState(true);

  const updateTrusts = (updated: FamilyTrust[]) => {
    onAnswerChange('familyTrustsData', updated.length > 0 ? updated : undefined);
  };

  const updateTrust = (id: string, updates: Partial<FamilyTrust>) => {
    const updated = trusts.map((t) => (t.id === id ? { ...t, ...updates } : t));
    const target = updated.find((t) => t.id === id);
    if (target) {
      target.reviewFlags = generateReviewFlags(target);
    }
    updateTrusts(updated);
  };

  const addTrust = () => {
    const newTrust = emptyTrust();
    updateTrusts([...trusts, newTrust]);
    setActiveTrustId(newTrust.id);
    setActiveSubsection('about');
    setShowTrustList(false);
  };

  const deleteTrust = (id: string) => {
    updateTrusts(trusts.filter((t) => t.id !== id));
    if (activeTrustId === id) {
      setActiveTrustId(null);
      setShowTrustList(true);
    }
  };

  const activeTrust = trusts.find((t) => t.id === activeTrustId);

  if (hasFamilyTrust !== 'yes') {
    return (
      <div className="space-y-6">
        <div>
          <label className={labelClass}>Does your family currently have a Family Trust?</label>
          <p className={subtleTextClass}>
            A Family Trust is generally established during someone's lifetime and may hold investments, shares of private corporations,
            real estate, or other family assets. Don't include trusts that would only be created through your Will after your death.
            We'll address those later.
          </p>
          <YesNoCard
            selectedValue={hasFamilyTrust}
            onClick={(v) => {
              onAnswerChange('hasFamilyTrust', v);
              if (v !== 'yes') {
                onAnswerChange('familyTrustsData', undefined);
              }
            }}
          />
        </div>
        {hasFamilyTrust === 'not_sure' && (
          <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-4 text-sm text-amber-300">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Review flag created</p>
                <p className="mt-1 text-amber-200/80">
                  We'll note that the existence of a Family Trust is uncertain. Consider confirming with your accountant or lawyer
                  whether a Family Trust has been established, and return to this section once confirmed.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (activeTrust && !showTrustList) {
    return (
      <TrustProfileEditor
        trust={activeTrust}
        onUpdate={(updates) => updateTrust(activeTrust.id, updates)}
        onBack={() => {
          setShowTrustList(true);
          setActiveTrustId(null);
        }}
        activeSubsection={activeSubsection}
        onSubsectionChange={setActiveSubsection}
        client1Name={client1Name}
        client2Name={client2Name}
        hasSpouse={hasSpouse}
        people={people}
        accountants={accountants}
        lawyers={lawyers}
        corporations={corporations}
        properties={properties}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <label className={labelClass}>Does your family currently have a Family Trust?</label>
        <p className={subtleTextClass}>
          A Family Trust is generally established during someone's lifetime and may hold investments, shares of private corporations,
          real estate, or other family assets. Don't include trusts that would only be created through your Will after your death.
        </p>
        <YesNoCard
          selectedValue={hasFamilyTrust}
          onClick={(v) => {
            onAnswerChange('hasFamilyTrust', v);
            if (v !== 'yes') {
              onAnswerChange('familyTrustsData', undefined);
            }
          }}
        />
      </div>

      {hasFamilyTrust === 'yes' && (
        <div className="space-y-4">
          <SectionHeading label="Your Family Trusts" icon={<Landmark className="w-4 h-4" />} />

          {trusts.length > 0 && (
            <div className="space-y-3">
              {trusts.map((trust) => {
                const flags = generateReviewFlags(trust);
                const anniversary = formatAnniversaryDate(trust);
                const anniversaryStatus = getAnniversaryStatus(trust);
                return (
                  <SummaryCard
                    key={trust.id}
                    title={trust.legalName || 'Unnamed Trust'}
                    subtitle={`Established: ${trust.establishmentDate.dateType === 'year' ? trust.establishmentDate.year : trust.establishmentDate.dateType === 'exact' ? trust.establishmentDate.exactDate : 'Unknown'}`}
                    value={anniversary !== 'Unknown' ? `21-Year Anniversary: ${anniversary}` : undefined}
                    details={[
                      ...(trust.trustees.length > 0 ? [{ label: 'Trustees', value: trust.trustees.map((t) => t.personName).join(', ') }] : []),
                      ...(trust.beneficiaries.length > 0 ? [{ label: 'Beneficiaries', value: trust.beneficiaries.map((b) => b.personName).join(', ') }] : []),
                      ...(trust.assetHoldings.length > 0 ? [{ label: 'Assets', value: `${trust.assetHoldings.length} holding(s)` }] : []),
                      ...(flags.length > 0 ? [{ label: 'Flags', value: `${flags.length} item(s) need attention` }] : []),
                      ...(anniversaryStatus === 'within_2_years' ? [{ label: 'URGENT', value: '21-year anniversary within 2 years' }] : []),
                      ...(anniversaryStatus === 'within_5_years' ? [{ label: 'Planning', value: '21-year anniversary within 5 years' }] : []),
                    ]}
                    onEdit={() => {
                      setActiveTrustId(trust.id);
                      setActiveSubsection('about');
                      setShowTrustList(false);
                    }}
                    onDelete={() => deleteTrust(trust.id)}
                  />
                );
              })}
            </div>
          )}

          <AddButton label="Add Another Family Trust" onClick={addTrust} />

          {trusts.length === 0 && (
            <div className="border border-dashed border-gray-600 rounded-xl p-8 text-center">
              <Landmark className="w-10 h-10 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No Family Trusts have been added yet.</p>
              <p className="text-gray-500 text-xs mt-1">Click "Add Another Family Trust" above to get started.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Trust Profile Editor ─────────────────────────────────────────────────

type EditorProps = {
  trust: FamilyTrust;
  onUpdate: (updates: Partial<FamilyTrust>) => void;
  onBack: () => void;
  activeSubsection: TrustSubsection;
  onSubsectionChange: (s: TrustSubsection) => void;
  client1Name: string;
  client2Name: string;
  hasSpouse: boolean;
  people: Person[];
  accountants: ProfessionalAdvisor[];
  lawyers: ProfessionalAdvisor[];
  corporations: Array<{ id: string; name: string }>;
  properties: Array<{ id: string; name: string }>;
};

function TrustProfileEditor({
  trust,
  onUpdate,
  onBack,
  activeSubsection,
  onSubsectionChange,
  client1Name,
  client2Name,
  hasSpouse,
  people,
  accountants,
  lawyers,
  corporations,
  properties,
}: EditorProps) {
  const trustName = trust.legalName || 'this trust';
  const completedSubsections = useMemo(() => {
    const completed = new Set<TrustSubsection>();
    if (trust.legalName) completed.add('about');
    if (trust.trustees.length > 0 || trust.beneficiaries.length > 0) completed.add('people');
    if (trust.trusteeContinuity.length > 0) completed.add('continuity');
    if (trust.assetHoldings.length > 0) completed.add('assets');
    if (trust.hasDebts !== 'no' || trust.hasReceivables !== 'no') completed.add('debts');
    if (trust.accountantAdvisor || trust.lawyerAdvisor || trust.taxRecords) completed.add('professionals');
    if (trust.twentyOneYearRule) completed.add('21year');
    if (trust.trustDocuments.length > 0) completed.add('documents');
    if (trust.familyNotes) completed.add('notes');
    return completed;
  }, [trust]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to Trust List
        </button>
      </div>

      <div className={sectionCardClass}>
        <h2 className="text-2xl font-bold text-white">{trustName}</h2>
        <p className="text-sm text-gray-400">
          {trust.establishmentDate.dateType === 'year' && trust.establishmentDate.year
            ? `Established ${trust.establishmentDate.year}`
            : trust.establishmentDate.dateType === 'exact' && trust.establishmentDate.exactDate
              ? `Established ${trust.establishmentDate.exactDate}`
              : 'Establishment date not yet entered'}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {SUBSECTION_ORDER.map((s) => {
          const isCompleted = completedSubsections.has(s);
          const isActive = activeSubsection === s;
          const meta = SUBSECTION_LABELS[s];
          return (
            <button
              key={s}
              type="button"
              onClick={() => onSubsectionChange(s)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : isCompleted
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-800 text-gray-500 hover:bg-gray-700'
              }`}
            >
              {meta.icon}
              <span className="hidden sm:inline">{meta.label}</span>
              <span className="sm:hidden">{meta.label.split(' ')[0]}</span>
              {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />}
            </button>
          );
        })}
      </div>

      <div className={sectionCardClass}>
        {activeSubsection === 'about' && (
          <AboutTrustSubsection trust={trust} onUpdate={onUpdate} trustName={trustName} />
        )}
        {activeSubsection === 'people' && (
          <PeopleRolesSubsection
            trust={trust}
            onUpdate={onUpdate}
            trustName={trustName}
            client1Name={client1Name}
            client2Name={client2Name}
            hasSpouse={hasSpouse}
            people={people}
          />
        )}
        {activeSubsection === 'continuity' && (
          <ContinuitySubsection trust={trust} onUpdate={onUpdate} trustName={trustName} client1Name={client1Name} client2Name={client2Name} hasSpouse={hasSpouse} people={people} />
        )}
        {activeSubsection === 'assets' && (
          <AssetsSubsection trust={trust} onUpdate={onUpdate} trustName={trustName} corporations={corporations} properties={properties} />
        )}
        {activeSubsection === 'debts' && (
          <DebtsSubsection trust={trust} onUpdate={onUpdate} trustName={trustName} />
        )}
        {activeSubsection === 'professionals' && (
          <ProfessionalsSubsection trust={trust} onUpdate={onUpdate} trustName={trustName} accountants={accountants} lawyers={lawyers} />
        )}
        {activeSubsection === '21year' && (
          <TwentyOneYearSubsection trust={trust} onUpdate={onUpdate} trustName={trustName} />
        )}
        {activeSubsection === 'documents' && (
          <DocumentsSubsection trust={trust} onUpdate={onUpdate} trustName={trustName} />
        )}
        {activeSubsection === 'notes' && (
          <NotesSubsection trust={trust} onUpdate={onUpdate} trustName={trustName} />
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 text-gray-400 hover:text-gray-200 font-medium transition-colors"
        >
          Done — Back to Trust List
        </button>
        <button
          type="button"
          onClick={() => {
            const idx = SUBSECTION_ORDER.indexOf(activeSubsection);
            if (idx < SUBSECTION_ORDER.length - 1) {
              onSubsectionChange(SUBSECTION_ORDER[idx + 1]);
            }
          }}
          disabled={activeSubsection === 'notes'}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
        >
          Next Section
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Subsection: About the Trust ─────────────────────────────────────────

function AboutTrustSubsection({
  trust,
  onUpdate,
  trustName,
}: {
  trust: FamilyTrust;
  onUpdate: (u: Partial<FamilyTrust>) => void;
  trustName: string;
}) {
  return (
    <div className="space-y-6">
      <SubsectionTitle icon={<Landmark className="w-5 h-5" />} title="About the Trust" />

      <div>
        <label className={labelClass}>What is the trust's legal name? *</label>
        <input
          type="text"
          value={trust.legalName}
          onChange={(e) => onUpdate({ legalName: e.target.value })}
          placeholder="Enter the trust's legal name"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>When was {trustName} established?</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3">
          <OptionButton label="Exact date" selected={trust.establishmentDate.dateType === 'exact'} onClick={() => onUpdate({ establishmentDate: { ...trust.establishmentDate, dateType: 'exact' } })} />
          <OptionButton label="Year only" selected={trust.establishmentDate.dateType === 'year'} onClick={() => onUpdate({ establishmentDate: { ...trust.establishmentDate, dateType: 'year' } })} />
          <OptionButton label="I'm not sure" selected={trust.establishmentDate.dateType === 'unknown'} onClick={() => onUpdate({ establishmentDate: { ...trust.establishmentDate, dateType: 'unknown' } })} />
        </div>
        {trust.establishmentDate.dateType === 'exact' && (
          <input type="date" value={trust.establishmentDate.exactDate || ''} onChange={(e) => onUpdate({ establishmentDate: { ...trust.establishmentDate, exactDate: e.target.value } })} className={inputClass} />
        )}
        {trust.establishmentDate.dateType === 'year' && (
          <input type="number" value={trust.establishmentDate.year || ''} onChange={(e) => onUpdate({ establishmentDate: { ...trust.establishmentDate, year: e.target.value } })} placeholder="e.g., 2015" className={inputClass} />
        )}
        {trust.establishmentDate.dateType === 'unknown' && (
          <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-3 text-sm text-amber-300">
            <p>The establishment date is needed to estimate the 21-year deemed disposition anniversary. Consider confirming this with your accountant or lawyer.</p>
          </div>
        )}
      </div>

      <div>
        <label className={labelClass}>Where is the Trust Deed for {trustName} located?</label>
        <DocumentLocationPicker
          value={trust.trustDeedLocation.accessMethod || ''}
          otherValue={trust.trustDeedLocation.accessMethodOther}
          locationValue={trust.trustDeedLocation.location}
          locationOtherValue={trust.trustDeedLocation.locationOther}
          onAccessMethodChange={(v) => onUpdate({ trustDeedLocation: { ...trust.trustDeedLocation, accessMethod: v } })}
          onAccessMethodOtherChange={(v) => onUpdate({ trustDeedLocation: { ...trust.trustDeedLocation, accessMethodOther: v } })}
          onLocationChange={(v) => onUpdate({ trustDeedLocation: { ...trust.trustDeedLocation, location: v } })}
          onLocationOtherChange={(v) => onUpdate({ trustDeedLocation: { ...trust.trustDeedLocation, locationOther: v } })}
        />
        <div className="mt-3 space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={trust.trustDeedMissing || false} onChange={(e) => onUpdate({ trustDeedMissing: e.target.checked })} className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600" />
            <span className="text-sm text-gray-300">I don't know where the Trust Deed is</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={trust.trustDeedNoCopy || false} onChange={(e) => onUpdate({ trustDeedNoCopy: e.target.checked })} className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600" />
            <span className="text-sm text-gray-300">I don't have a copy of the Trust Deed</span>
          </label>
        </div>
        {(trust.trustDeedMissing || trust.trustDeedNoCopy) && (
          <div className="mt-2 bg-amber-900/30 border border-amber-700 rounded-lg p-3 text-sm text-amber-300">
            <p>A review flag has been created — locating the Trust Deed is important for trust administration and estate planning.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Subsection: People & Roles ──────────────────────────────────────────

function PeopleRolesSubsection({
  trust,
  onUpdate,
  trustName,
  client1Name,
  client2Name,
  hasSpouse,
  people,
}: {
  trust: FamilyTrust;
  onUpdate: (u: Partial<FamilyTrust>) => void;
  trustName: string;
  client1Name: string;
  client2Name: string;
  hasSpouse: boolean;
  people: Person[];
}) {
  const [showTrusteePanel, setShowTrusteePanel] = useState(false);
  const [showBeneficiaryPanel, setShowBeneficiaryPanel] = useState(false);

  const usedTrusteeIds = new Set(trust.trustees.filter((t) => t.personId && !t.isClient).map((t) => t.personId));
  const availablePeople = people.filter((p) => !usedTrusteeIds.has(p.id));

  const usedBeneficiaryIds = new Set(trust.beneficiaries.filter((b) => b.personId).map((b) => b.personId));
  const availableBeneficiaryPeople = people.filter((p) => !usedBeneficiaryIds.has(p.id));

  const addTrustee = (entry: TrusteeEntry) => {
    onUpdate({ trustees: [...trust.trustees, entry] });
    setShowTrusteePanel(false);
  };
  const removeTrustee = (id: string) => {
    onUpdate({ trustees: trust.trustees.filter((t) => t.id !== id) });
  };

  const addBeneficiary = (entry: TrustBeneficiaryEntry) => {
    onUpdate({ beneficiaries: [...trust.beneficiaries, entry] });
    setShowBeneficiaryPanel(false);
  };
  const removeBeneficiary = (id: string) => {
    onUpdate({ beneficiaries: trust.beneficiaries.filter((b) => b.id !== id) });
  };

  return (
    <div className="space-y-8">
      <SubsectionTitle icon={<Users className="w-5 h-5" />} title="People & Roles" />

      {/* Settlor */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Settlor</h4>
        <div>
          <label className={labelClass}>Who established or originally settled {trustName}?</label>
          <input type="text" value={trust.settlor.name} onChange={(e) => onUpdate({ settlor: { ...trust.settlor, name: e.target.value } })} placeholder="Enter settlor name" className={inputClass} />
        </div>
        {trust.settlor.name && (
          <>
            <div>
              <label className={labelClass}>Relationship to {client1Name} (if applicable)</label>
              <input type="text" value={trust.settlor.relationshipToClient1 || ''} onChange={(e) => onUpdate({ settlor: { ...trust.settlor, relationshipToClient1: e.target.value } })} placeholder="e.g., Father, Accountant, Self" className={inputClass} />
            </div>
            {hasSpouse && (
              <div>
                <label className={labelClass}>Relationship to {client2Name} (if applicable)</label>
                <input type="text" value={trust.settlor.relationshipToClient2 || ''} onChange={(e) => onUpdate({ settlor: { ...trust.settlor, relationshipToClient2: e.target.value } })} placeholder="e.g., Father-in-law" className={inputClass} />
              </div>
            )}
            <div>
              <label className={labelClass}>Is the settlor living or deceased?</label>
              <div className="grid grid-cols-3 gap-2.5">
                <OptionButton label="Living" selected={trust.settlor.status === 'living'} onClick={() => onUpdate({ settlor: { ...trust.settlor, status: 'living' } })} />
                <OptionButton label="Deceased" selected={trust.settlor.status === 'deceased'} onClick={() => onUpdate({ settlor: { ...trust.settlor, status: 'deceased' } })} />
                <OptionButton label="Unknown" selected={trust.settlor.status === 'unknown'} onClick={() => onUpdate({ settlor: { ...trust.settlor, status: 'unknown' } })} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Trustees */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Current Trustees of {trustName}</h4>
        <p className={subtleTextClass}>Select all current trustees. You can choose from people already in the questionnaire or add someone new.</p>

        {trust.trustees.length > 0 && (
          <div className="space-y-2">
            {trust.trustees.map((t) => (
              <div key={t.id} className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-lg px-4 py-3">
                <div>
                  <span className="text-sm text-white font-medium">{t.personName}</span>
                  {t.isClient && <span className="text-xs text-blue-400 ml-2">(Client)</span>}
                  {t.personType === 'entity' && <span className="text-xs text-gray-400 ml-2">(Entity)</span>}
                </div>
                <button type="button" onClick={() => removeTrustee(t.id)} className="text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        )}

        {showTrusteePanel && (
          <div className="border border-blue-500/40 rounded-lg p-4 bg-gray-800 space-y-3">
            <p className="text-sm text-gray-300 mb-2">Select a trustee to add:</p>
            <OptionButton label={`${client1Name} (Client 1)`} selected={false} onClick={() => addTrustee({ id: generateTrustEntityId('tr'), personId: 'client1', personName: client1Name, personType: 'client1', isClient: true })} />
            {hasSpouse && <OptionButton label={`${client2Name} (Client 2)`} selected={false} onClick={() => addTrustee({ id: generateTrustEntityId('tr'), personId: 'client2', personName: client2Name, personType: 'client2', isClient: true })} />}
            {availablePeople.map((p) => (
              <OptionButton key={p.id} label={`${p.name} (${p.relationship})`} selected={false} onClick={() => addTrustee({ id: generateTrustEntityId('tr'), personId: p.id, personName: p.name, personType: 'person' })} />
            ))}
            <div className="pt-2 border-t border-gray-700">
              <label className={labelClass}>Or add another person or entity:</label>
              <div className="flex gap-2">
                <input type="text" id="trusteeOtherName" placeholder="Name or entity name" className={inputClass} />
                <button type="button" onClick={() => {
                  const input = document.getElementById('trusteeOtherName') as HTMLInputElement;
                  if (input?.value?.trim()) {
                    addTrustee({ id: generateTrustEntityId('tr'), personName: input.value.trim(), personType: 'entity' });
                    input.value = '';
                  }
                }} className="px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500">Add</button>
              </div>
            </div>
            <button type="button" onClick={() => setShowTrusteePanel(false)} className="text-sm text-gray-400 hover:text-gray-300">Cancel</button>
          </div>
        )}

        {!showTrusteePanel && (
          <button type="button" onClick={() => setShowTrusteePanel(true)} className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-500 text-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-400 transition-colors text-sm">
            <Plus className="w-4 h-4" /> Add a trustee
          </button>
        )}

        {trust.trustees.length > 0 && (
          <div>
            <label className={labelClass}>How are trustee decisions generally made?</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <OptionButton label="Any one trustee may act" selected={trust.trusteeDecisionRule === 'any_one'} onClick={() => onUpdate({ trusteeDecisionRule: 'any_one' })} />
              <OptionButton label="All trustees must act together" selected={trust.trusteeDecisionRule === 'all_together'} onClick={() => onUpdate({ trusteeDecisionRule: 'all_together' })} />
              <OptionButton label="Majority of trustees" selected={trust.trusteeDecisionRule === 'majority'} onClick={() => onUpdate({ trusteeDecisionRule: 'majority' })} />
              <OptionButton label="Other" selected={trust.trusteeDecisionRule === 'other'} onClick={() => onUpdate({ trusteeDecisionRule: 'other' })} />
              <OptionButton label="I'm not sure" selected={trust.trusteeDecisionRule === 'not_sure'} onClick={() => onUpdate({ trusteeDecisionRule: 'not_sure' })} />
            </div>
            {trust.trusteeDecisionRule === 'other' && (
              <input type="text" value={trust.trusteeDecisionRuleOther || ''} onChange={(e) => onUpdate({ trusteeDecisionRuleOther: e.target.value })} placeholder="Please explain" className={`${inputClass} mt-3`} />
            )}
          </div>
        )}
      </div>

      {/* Beneficiaries */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Beneficiaries of {trustName}</h4>
        <p className={subtleTextClass}>Select all known beneficiaries of the trust.</p>

        {trust.beneficiaries.length > 0 && (
          <div className="space-y-2">
            {trust.beneficiaries.map((b) => (
              <div key={b.id} className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-lg px-4 py-3">
                <div className="flex-1">
                  <span className="text-sm text-white font-medium">{b.personName}</span>
                  {b.relationship && <span className="text-xs text-gray-400 ml-2">({b.relationship})</span>}
                </div>
                <select
                  value={b.entitlement}
                  onChange={(e) => onUpdate({ beneficiaries: trust.beneficiaries.map((x) => x.id === b.id ? { ...x, entitlement: e.target.value as TrustBeneficiaryEntry['entitlement'] } : x) })}
                  className="text-xs px-2 py-1 bg-gray-700 border border-gray-600 text-white rounded mr-2"
                >
                  <option value="income">Income</option>
                  <option value="capital">Capital</option>
                  <option value="income_and_capital">Income & Capital</option>
                  <option value="not_sure">Not sure</option>
                </select>
                <button type="button" onClick={() => removeBeneficiary(b.id)} className="text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        )}

        {showBeneficiaryPanel && (
          <div className="border border-blue-500/40 rounded-lg p-4 bg-gray-800 space-y-3">
            <p className="text-sm text-gray-300 mb-2">Select a beneficiary to add:</p>
            {availableBeneficiaryPeople.map((p) => (
              <OptionButton key={p.id} label={`${p.name} (${p.relationship})`} selected={false} onClick={() => addBeneficiary({ id: generateTrustEntityId('ben'), personId: p.id, personName: p.name, relationship: p.relationship, entitlement: 'not_sure' })} />
            ))}
            <div className="pt-2 border-t border-gray-700">
              <label className={labelClass}>Or add another beneficiary:</label>
              <div className="flex gap-2">
                <input type="text" id="beneficiaryOtherName" placeholder="Beneficiary name" className={inputClass} />
                <button type="button" onClick={() => {
                  const input = document.getElementById('beneficiaryOtherName') as HTMLInputElement;
                  if (input?.value?.trim()) {
                    addBeneficiary({ id: generateTrustEntityId('ben'), personName: input.value.trim(), entitlement: 'not_sure' });
                    input.value = '';
                  }
                }} className="px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500">Add</button>
              </div>
            </div>
            <button type="button" onClick={() => setShowBeneficiaryPanel(false)} className="text-sm text-gray-400 hover:text-gray-300">Cancel</button>
          </div>
        )}

        {!showBeneficiaryPanel && (
          <button type="button" onClick={() => setShowBeneficiaryPanel(true)} className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-500 text-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-400 transition-colors text-sm">
            <Plus className="w-4 h-4" /> Add a beneficiary
          </button>
        )}

        <div className="pt-2">
          <label className={labelClass}>Does the Trust Deed describe any additional beneficiaries or groups of beneficiaries who haven't been individually listed above?</label>
          <p className={subtleTextClass}>This may include children, grandchildren, future descendants, or other classes of beneficiaries.</p>
          <YesNoCard
            selectedValue={trust.additionalBeneficiaryClasses}
            onClick={(v) => onUpdate({ additionalBeneficiaryClasses: v as FamilyTrust['additionalBeneficiaryClasses'] })}
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }, { value: 'not_sure', label: "I'm not sure" }]}
          />
          {trust.additionalBeneficiaryClasses === 'yes' && (
            <div className="mt-3">
              <label className={labelClass}>How are they described?</label>
              <textarea value={trust.additionalBeneficiaryDescription || ''} onChange={(e) => onUpdate({ additionalBeneficiaryDescription: e.target.value })} placeholder="e.g., All living descendants of the settlor, all children of Client 1 and Client 2..." rows={3} className={inputClass} />
              <p className={subtleTextClass}>This is important — the individually entered names above should not be treated as an exhaustive legal list unless confirmed.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Subsection: Trustee Continuity ──────────────────────────────────────

function ContinuitySubsection({
  trust,
  onUpdate,
  trustName,
  client1Name,
  client2Name,
  hasSpouse,
  people,
}: {
  trust: FamilyTrust;
  onUpdate: (u: Partial<FamilyTrust>) => void;
  trustName: string;
  client1Name: string;
  client2Name: string;
  hasSpouse: boolean;
  people: Person[];
}) {
  const clientTrustees = trust.trustees.filter((t) => t.isClient);
  const usedIds = new Set(trust.trusteeContinuity.map((c) => c.successorTrusteeId).filter(Boolean));

  const updateContinuity = (clientId: 'client1' | 'client2', updates: Partial<TrusteeContinuity>) => {
    const existing = trust.trusteeContinuity.find((c) => c.clientId === clientId);
    if (existing) {
      onUpdate({
        trusteeContinuity: trust.trusteeContinuity.map((c) => c.clientId === clientId ? { ...c, ...updates } : c),
      });
    } else {
      onUpdate({
        trusteeContinuity: [...trust.trusteeContinuity, { clientId, knownSuccession: 'not_sure', ...updates }],
      });
    }
  };

  return (
    <div className="space-y-6">
      <SubsectionTitle icon={<Scale className="w-5 h-5" />} title="Trustee Continuity" />
      <p className={subtleTextClass}>
        For each client who is currently a trustee, we'll ask what happens if they can no longer act.
        Do not assume that an Attorney for Property automatically has authority to act as trustee.
      </p>

      {clientTrustees.length === 0 && (
        <div className="border border-dashed border-gray-600 rounded-lg p-6 text-center">
          <p className="text-sm text-gray-400">Neither {client1Name}{hasSpouse ? ` nor ${client2Name}` : ''} is currently listed as a trustee of {trustName}.</p>
          <p className="text-xs text-gray-500 mt-1">Trustee continuity questions apply only when a client is a trustee.</p>
        </div>
      )}

      {clientTrustees.map((t) => {
        const clientId = t.personId as 'client1' | 'client2';
        const clientName = clientId === 'client1' ? client1Name : client2Name;
        const continuity = trust.trusteeContinuity.find((c) => c.clientId === clientId);
        const availablePeople = people.filter((p) => !usedIds.has(p.id));

        return (
          <div key={t.id} className="border border-gray-700 rounded-xl p-5 space-y-4">
            <h4 className="text-lg font-semibold text-white">{clientName} as Trustee</h4>

            <div>
              <label className={labelClass}>Do you know what happens if {clientName} dies or can no longer act as trustee of {trustName}?</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <OptionButton label="A replacement/successor trustee has been identified" selected={continuity?.knownSuccession === 'successor_identified'} onClick={() => updateContinuity(clientId, { knownSuccession: 'successor_identified' })} />
                <OptionButton label="The remaining trustee(s) continue" selected={continuity?.knownSuccession === 'remaining_continue'} onClick={() => updateContinuity(clientId, { knownSuccession: 'remaining_continue' })} />
                <OptionButton label="Another process applies" selected={continuity?.knownSuccession === 'other_process'} onClick={() => updateContinuity(clientId, { knownSuccession: 'other_process' })} />
                <OptionButton label="I'm not sure" selected={continuity?.knownSuccession === 'not_sure' || !continuity} onClick={() => updateContinuity(clientId, { knownSuccession: 'not_sure' })} />
              </div>
            </div>

            {continuity?.knownSuccession === 'successor_identified' && (
              <>
                <div>
                  <label className={labelClass}>Who would step in?</label>
                  <div className="space-y-2">
                    {availablePeople.map((p) => (
                      <OptionButton key={p.id} label={`${p.name} (${p.relationship})`} selected={continuity.successorTrusteeId === p.id} onClick={() => updateContinuity(clientId, { successorTrusteeId: p.id, successorTrusteeName: p.name, successorTrusteeType: 'person' })} />
                    ))}
                    <div className="flex gap-2 pt-2 border-t border-gray-700">
                      <input type="text" placeholder="Or enter another person/entity" value={(!continuity.successorTrusteeId ? continuity.successorTrusteeName || '' : '')} onChange={(e) => updateContinuity(clientId, { successorTrusteeId: undefined, successorTrusteeName: e.target.value, successorTrusteeType: 'person' })} className={inputClass} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Where is this trustee succession arrangement documented?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <OptionButton label="Trust Deed" selected={continuity?.successionDocLocation === 'trust_deed'} onClick={() => updateContinuity(clientId, { successionDocLocation: 'trust_deed' })} />
                    <OptionButton label="Amendment to the Trust Deed" selected={continuity?.successionDocLocation === 'amendment'} onClick={() => updateContinuity(clientId, { successionDocLocation: 'amendment' })} />
                    <OptionButton label="Trustee appointment/replacement document" selected={continuity?.successionDocLocation === 'appointment_document'} onClick={() => updateContinuity(clientId, { successionDocLocation: 'appointment_document' })} />
                    <OptionButton label="Other" selected={continuity?.successionDocLocation === 'other'} onClick={() => updateContinuity(clientId, { successionDocLocation: 'other' })} />
                    <OptionButton label="I'm not sure" selected={continuity?.successionDocLocation === 'not_sure' || !continuity?.successionDocLocation} onClick={() => updateContinuity(clientId, { successionDocLocation: 'not_sure' })} />
                  </div>
                  {continuity?.successionDocLocation === 'other' && (
                    <input type="text" value={continuity?.successionDocLocationOther || ''} onChange={(e) => updateContinuity(clientId, { successionDocLocationOther: e.target.value })} placeholder="Please specify" className={`${inputClass} mt-3`} />
                  )}
                </div>
              </>
            )}

            {(continuity?.knownSuccession === 'not_sure' || continuity?.knownSuccession === 'other_process') && (
              <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-3 text-sm text-amber-300">
                <p>A review flag has been created — trustee succession is unclear for {clientName}. Consider confirming what happens if they can no longer act as trustee.</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Subsection: Assets ──────────────────────────────────────────────────

function AssetsSubsection({
  trust,
  onUpdate,
  trustName,
  corporations,
  properties,
}: {
  trust: FamilyTrust;
  onUpdate: (u: Partial<FamilyTrust>) => void;
  trustName: string;
  corporations: Array<{ id: string; name: string }>;
  properties: Array<{ id: string; name: string }>;
}) {
  const [showAddPanel, setShowAddPanel] = useState(false);

  const assetTypeOptions: Array<{ value: string; label: string }> = [
    { value: 'private_corp_shares', label: 'Shares of a private corporation' },
    { value: 'investment_accounts', label: 'Investment accounts' },
    { value: 'bank_cash', label: 'Bank/cash accounts' },
    { value: 'real_estate', label: 'Real estate' },
    { value: 'loans_receivable', label: 'Loans or amounts receivable' },
    { value: 'life_insurance', label: 'Life insurance' },
    { value: 'partnership_interests', label: 'Partnership interests' },
    { value: 'other_assets', label: 'Other assets' },
    { value: 'not_sure', label: "I'm not sure" },
  ];

  const addHolding = (holding: TrustAssetHolding) => {
    onUpdate({ assetHoldings: [...trust.assetHoldings, holding] });
    setShowAddPanel(false);
  };
  const removeHolding = (id: string) => {
    onUpdate({ assetHoldings: trust.assetHoldings.filter((h) => h.id !== id) });
  };
  const updateHolding = (id: string, updates: Partial<TrustAssetHolding>) => {
    onUpdate({ assetHoldings: trust.assetHoldings.map((h) => h.id === id ? { ...h, ...updates } : h) });
  };

  return (
    <div className="space-y-6">
      <SubsectionTitle icon={<Building2 className="w-5 h-5" />} title={`What does ${trustName} currently own or have an interest in?`} />

      {trust.assetHoldings.length > 0 && (
        <div className="space-y-3">
          {trust.assetHoldings.map((h) => {
            const typeLabel = assetTypeOptions.find((o) => o.value === h.assetType)?.label || h.assetType;
            return (
              <div key={h.id} className="border border-gray-700 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{typeLabel}</span>
                  <button type="button" onClick={() => removeHolding(h.id)} className="text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>

                {h.assetType === 'private_corp_shares' && (
                  <div className="space-y-3">
                    <div>
                      <label className={labelClass}>Which corporation?</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {corporations.map((c) => (
                          <OptionButton key={c.id} label={c.name} selected={h.corporationId === c.id} onClick={() => updateHolding(h.id, { corporationId: c.id, corporationName: c.name })} />
                        ))}
                      </div>
                      {corporations.length === 0 && <p className={subtleTextClass}>No corporations have been entered in the Corporate section yet.</p>}
                      <div className="pt-2">
                        <input type="text" placeholder="Or enter a corporation name" value={(!h.corporationId ? h.corporationName || '' : '')} onChange={(e) => updateHolding(h.id, { corporationId: undefined, corporationName: e.target.value })} className={inputClass} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className={labelClass}>Share class</label>
                        <input type="text" value={h.shareClass || ''} onChange={(e) => updateHolding(h.id, { shareClass: e.target.value })} placeholder="e.g., Class A" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Approx. ownership %</label>
                        <input type="text" value={h.ownershipPercentage || ''} onChange={(e) => updateHolding(h.id, { ownershipPercentage: e.target.value })} placeholder="e.g., 100%" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Voting shares?</label>
                        <div className="grid grid-cols-3 gap-1">
                          <OptionButton label="Yes" selected={h.votingShares === 'yes'} onClick={() => updateHolding(h.id, { votingShares: 'yes' })} />
                          <OptionButton label="No" selected={h.votingShares === 'no'} onClick={() => updateHolding(h.id, { votingShares: 'no' })} />
                          <OptionButton label="?" selected={h.votingShares === 'not_sure'} onClick={() => updateHolding(h.id, { votingShares: 'not_sure' })} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {h.assetType === 'real_estate' && (
                  <div>
                    <label className={labelClass}>Which property?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {properties.map((p) => (
                        <OptionButton key={p.id} label={p.name} selected={h.propertyId === p.id} onClick={() => updateHolding(h.id, { propertyId: p.id, propertyName: p.name })} />
                      ))}
                    </div>
                    {properties.length === 0 && <p className={subtleTextClass}>No properties have been entered in the Real Estate section yet.</p>}
                  </div>
                )}

                {(h.assetType === 'investment_accounts' || h.assetType === 'bank_cash' || h.assetType === 'life_insurance' || h.assetType === 'partnership_interests' || h.assetType === 'loans_receivable' || h.assetType === 'other_assets' || h.assetType === 'not_sure') && (
                  <div>
                    <label className={labelClass}>Description</label>
                    <input type="text" value={h.description || ''} onChange={(e) => updateHolding(h.id, { description: e.target.value })} placeholder="Briefly describe the asset" className={inputClass} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showAddPanel && (
        <div className="border border-blue-500/40 rounded-lg p-4 bg-gray-800 space-y-3">
          <p className="text-sm text-gray-300">Select an asset type to add:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {assetTypeOptions.map((opt) => (
              <OptionButton key={opt.value} label={opt.label} selected={false} onClick={() => addHolding({ id: generateTrustEntityId('hold'), assetType: opt.value as TrustAssetHolding['assetType'] })} />
            ))}
          </div>
          <button type="button" onClick={() => setShowAddPanel(false)} className="text-sm text-gray-400 hover:text-gray-300">Cancel</button>
        </div>
      )}

      {!showAddPanel && (
        <button type="button" onClick={() => setShowAddPanel(true)} className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-500 text-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-400 transition-colors text-sm">
          <Plus className="w-4 h-4" /> Add an asset holding
        </button>
      )}
    </div>
  );
}

// ─── Subsection: Debts & Receivables ─────────────────────────────────────

function DebtsSubsection({ trust, onUpdate, trustName }: { trust: FamilyTrust; onUpdate: (u: Partial<FamilyTrust>) => void; trustName: string; }) {
  const [showDebtPanel, setShowDebtPanel] = useState(false);
  const [showReceivablePanel, setShowReceivablePanel] = useState(false);

  const addDebt = (debt: TrustDebt) => { onUpdate({ debts: [...trust.debts, debt] }); setShowDebtPanel(false); };
  const removeDebt = (id: string) => { onUpdate({ debts: trust.debts.filter((d) => d.id !== id) }); };
  const updateDebt = (id: string, u: Partial<TrustDebt>) => { onUpdate({ debts: trust.debts.map((d) => d.id === id ? { ...d, ...u } : d) }); };

  const addReceivable = (r: TrustReceivable) => { onUpdate({ receivables: [...trust.receivables, r] }); setShowReceivablePanel(false); };
  const removeReceivable = (id: string) => { onUpdate({ receivables: trust.receivables.filter((r) => r.id !== id) }); };
  const updateReceivable = (id: string, u: Partial<TrustReceivable>) => { onUpdate({ receivables: trust.receivables.map((r) => r.id === id ? { ...r, ...u } : r) }); };

  return (
    <div className="space-y-8">
      <SubsectionTitle icon={<AlertTriangle className="w-5 h-5" />} title="Debts & Amounts Owing" />

      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Does {trustName} currently owe money to anyone?</h4>
        <YesNoCard selectedValue={trust.hasDebts} onClick={(v) => onUpdate({ hasDebts: v as FamilyTrust['hasDebts'] })} />

        {trust.hasDebts === 'yes' && (
          <>
            {trust.debts.length > 0 && (
              <div className="space-y-3">
                {trust.debts.map((d) => (
                  <div key={d.id} className="border border-gray-700 rounded-xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{d.lender || 'Unnamed debt'}</span>
                      <button type="button" onClick={() => removeDebt(d.id)} className="text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div><label className={labelClass}>Lender</label><input type="text" value={d.lender} onChange={(e) => updateDebt(d.id, { lender: e.target.value })} className={inputClass} /></div>
                      <div><label className={labelClass}>Loan/debt type</label><input type="text" value={d.loanType || ''} onChange={(e) => updateDebt(d.id, { loanType: e.target.value })} placeholder="e.g., Line of credit, mortgage" className={inputClass} /></div>
                      <div><label className={labelClass}>Approx. balance</label><input type="text" value={d.approximateBalance || ''} onChange={(e) => updateDebt(d.id, { approximateBalance: e.target.value })} placeholder="e.g., $50,000" className={inputClass} /></div>
                      <div><label className={labelClass}>Secured?</label><div className="grid grid-cols-3 gap-1"><OptionButton label="Yes" selected={d.secured === 'yes'} onClick={() => updateDebt(d.id, { secured: 'yes' })} /><OptionButton label="No" selected={d.secured === 'no'} onClick={() => updateDebt(d.id, { secured: 'no' })} /><OptionButton label="?" selected={d.secured === 'not_sure'} onClick={() => updateDebt(d.id, { secured: 'not_sure' })} /></div></div>
                    </div>
                    <div>
                      <label className={labelClass}>Has {trustName.includes('Client') ? 'Client 1 or Client 2' : 'a client'} personally guaranteed this debt?</label>
                      <div className="grid grid-cols-3 gap-2.5">
                        <OptionButton label="Yes" selected={d.hasPersonalGuarantee === 'yes'} onClick={() => updateDebt(d.id, { hasPersonalGuarantee: 'yes' })} />
                        <OptionButton label="No" selected={d.hasPersonalGuarantee === 'no'} onClick={() => updateDebt(d.id, { hasPersonalGuarantee: 'no' })} />
                        <OptionButton label="?" selected={d.hasPersonalGuarantee === 'not_sure'} onClick={() => updateDebt(d.id, { hasPersonalGuarantee: 'not_sure' })} />
                      </div>
                      {d.hasPersonalGuarantee === 'yes' && (
                        <input type="text" value={d.guarantorName || ''} onChange={(e) => updateDebt(d.id, { guarantorName: e.target.value })} placeholder="Who is the guarantor?" className={`${inputClass} mt-2`} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showDebtPanel && (
              <div className="border border-blue-500/40 rounded-lg p-4 bg-gray-800">
                <button type="button" onClick={() => addDebt({ id: generateTrustEntityId('debt'), lender: '', secured: 'not_sure', hasPersonalGuarantee: 'not_sure' })} className="px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500">Add a debt entry</button>
                <button type="button" onClick={() => setShowDebtPanel(false)} className="ml-3 text-sm text-gray-400 hover:text-gray-300">Cancel</button>
              </div>
            )}
            {!showDebtPanel && <button type="button" onClick={() => setShowDebtPanel(true)} className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-500 text-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-400 transition-colors text-sm"><Plus className="w-4 h-4" /> Add a debt</button>}
          </>
        )}
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Is anyone currently indebted to {trustName}?</h4>
        <YesNoCard selectedValue={trust.hasReceivables} onClick={(v) => onUpdate({ hasReceivables: v as FamilyTrust['hasReceivables'] })} />

        {trust.hasReceivables === 'yes' && (
          <>
            {trust.receivables.length > 0 && (
              <div className="space-y-3">
                {trust.receivables.map((r) => (
                  <div key={r.id} className="border border-gray-700 rounded-xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{r.borrower || 'Unnamed borrower'}</span>
                      <button type="button" onClick={() => removeReceivable(r.id)} className="text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div><label className={labelClass}>Borrower</label><input type="text" value={r.borrower} onChange={(e) => updateReceivable(r.id, { borrower: e.target.value })} className={inputClass} /></div>
                      <div><label className={labelClass}>Relationship/entity</label><input type="text" value={r.borrowerType || ''} onChange={(e) => updateReceivable(r.id, { borrowerType: e.target.value as TrustReceivable['borrowerType'] })} placeholder="e.g., Family member, corporation" className={inputClass} /></div>
                      <div><label className={labelClass}>Type of amount owing</label><input type="text" value={r.amountOwingType || ''} onChange={(e) => updateReceivable(r.id, { amountOwingType: e.target.value })} placeholder="e.g., Shareholder loan, promissory note" className={inputClass} /></div>
                      <div><label className={labelClass}>Approx. amount</label><input type="text" value={r.approximateAmount || ''} onChange={(e) => updateReceivable(r.id, { approximateAmount: e.target.value })} placeholder="e.g., $25,000" className={inputClass} /></div>
                    </div>
                    <div><label className={labelClass}>Additional notes</label><textarea value={r.notes || ''} onChange={(e) => updateReceivable(r.id, { notes: e.target.value })} rows={2} className={inputClass} /></div>
                  </div>
                ))}
              </div>
            )}

            {showReceivablePanel && (
              <div className="border border-blue-500/40 rounded-lg p-4 bg-gray-800">
                <button type="button" onClick={() => addReceivable({ id: generateTrustEntityId('recv'), borrower: '' })} className="px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500">Add a receivable entry</button>
                <button type="button" onClick={() => setShowReceivablePanel(false)} className="ml-3 text-sm text-gray-400 hover:text-gray-300">Cancel</button>
              </div>
            )}
            {!showReceivablePanel && <button type="button" onClick={() => setShowReceivablePanel(true)} className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-500 text-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-400 transition-colors text-sm"><Plus className="w-4 h-4" /> Add a receivable</button>}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Subsection: Professionals & Administration ──────────────────────────

function ProfessionalsSubsection({
  trust,
  onUpdate,
  trustName,
  accountants,
  lawyers,
}: {
  trust: FamilyTrust;
  onUpdate: (u: Partial<FamilyTrust>) => void;
  trustName: string;
  accountants: ProfessionalAdvisor[];
  lawyers: ProfessionalAdvisor[];
}) {
  const [showAcctPanel, setShowAcctPanel] = useState(false);
  const [showLawPanel, setShowLawPanel] = useState(false);

  const setAccountant = (link: TrustAdvisorLink | null) => { onUpdate({ accountantAdvisor: link }); setShowAcctPanel(false); };
  const setLawyer = (link: TrustAdvisorLink | null) => { onUpdate({ lawyerAdvisor: link }); setShowLawPanel(false); };

  return (
    <div className="space-y-8">
      <SubsectionTitle icon={<FileText className="w-5 h-5" />} title="Professionals & Administration" />

      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Accounting & Tax Advice for {trustName}</h4>
        {trust.accountantAdvisor ? (
          <div className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-lg px-4 py-3">
            <div>
              <span className="text-sm text-white font-medium">{trust.accountantAdvisor.advisorName}</span>
              {trust.accountantAdvisor.isExisting && <span className="text-xs text-blue-400 ml-2">(from Professional Team)</span>}
            </div>
            <button type="button" onClick={() => setAccountant(null)} className="text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
          </div>
        ) : showAcctPanel ? (
          <div className="border border-blue-500/40 rounded-lg p-4 bg-gray-800 space-y-3">
            {accountants.length > 0 ? (
              accountants.map((a) => (
                <OptionButton key={a.id} label={`${a.name}${a.firm ? ` — ${a.firm}` : ''}`} selected={false} onClick={() => setAccountant({ advisorId: a.id, advisorName: a.name, advisorType: 'accountant', isExisting: true })} />
              ))
            ) : (
              <p className={subtleTextClass}>No accountants have been entered in your Professional Team yet.</p>
            )}
            <div className="pt-2 border-t border-gray-700">
              <div className="flex gap-2">
                <input type="text" id="acctOtherName" placeholder="Or enter an accountant name" className={inputClass} />
                <button type="button" onClick={() => { const input = document.getElementById('acctOtherName') as HTMLInputElement; if (input?.value?.trim()) { setAccountant({ advisorName: input.value.trim(), advisorType: 'accountant', isExisting: false }); input.value = ''; } }} className="px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500">Add</button>
              </div>
            </div>
            <button type="button" onClick={() => setShowAcctPanel(false)} className="text-sm text-gray-400 hover:text-gray-300">Cancel</button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button type="button" onClick={() => setShowAcctPanel(true)} className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-500 text-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-400 transition-colors text-sm"><Plus className="w-4 h-4" /> Select accountant</button>
            <button type="button" onClick={() => setAccountant({ advisorName: 'None', advisorType: 'accountant', isExisting: false })} className="px-4 py-2 text-gray-400 text-sm hover:text-gray-300">None</button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Legal Advice for {trustName}</h4>
        {trust.lawyerAdvisor ? (
          <div className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-lg px-4 py-3">
            <div>
              <span className="text-sm text-white font-medium">{trust.lawyerAdvisor.advisorName}</span>
              {trust.lawyerAdvisor.isExisting && <span className="text-xs text-blue-400 ml-2">(from Professional Team)</span>}
            </div>
            <button type="button" onClick={() => setLawyer(null)} className="text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
          </div>
        ) : showLawPanel ? (
          <div className="border border-blue-500/40 rounded-lg p-4 bg-gray-800 space-y-3">
            {lawyers.length > 0 ? (
              lawyers.map((a) => (
                <OptionButton key={a.id} label={`${a.name}${a.firm ? ` — ${a.firm}` : ''}`} selected={false} onClick={() => setLawyer({ advisorId: a.id, advisorName: a.name, advisorType: 'lawyer', isExisting: true })} />
              ))
            ) : (
              <p className={subtleTextClass}>No lawyers have been entered in your Professional Team yet.</p>
            )}
            <div className="pt-2 border-t border-gray-700">
              <div className="flex gap-2">
                <input type="text" id="lawOtherName" placeholder="Or enter a lawyer name" className={inputClass} />
                <button type="button" onClick={() => { const input = document.getElementById('lawOtherName') as HTMLInputElement; if (input?.value?.trim()) { setLawyer({ advisorName: input.value.trim(), advisorType: 'lawyer', isExisting: false }); input.value = ''; } }} className="px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500">Add</button>
              </div>
            </div>
            <button type="button" onClick={() => setShowLawPanel(false)} className="text-sm text-gray-400 hover:text-gray-300">Cancel</button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button type="button" onClick={() => setShowLawPanel(true)} className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-500 text-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-400 transition-colors text-sm"><Plus className="w-4 h-4" /> Select lawyer</button>
            <button type="button" onClick={() => setLawyer({ advisorName: 'None', advisorType: 'lawyer', isExisting: false })} className="px-4 py-2 text-gray-400 text-sm hover:text-gray-300">None</button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Tax & Accounting Records for {trustName}</h4>
        <label className={labelClass}>Where can the most recent tax returns and accounting records be found?</label>
        <DocumentLocationPicker
          value={trust.taxRecords?.documentLocation.accessMethod || ''}
          otherValue={trust.taxRecords?.documentLocation.accessMethodOther}
          locationValue={trust.taxRecords?.documentLocation.location}
          locationOtherValue={trust.taxRecords?.documentLocation.locationOther}
          onAccessMethodChange={(v) => onUpdate({ taxRecords: { documentLocation: { ...(trust.taxRecords?.documentLocation || {}), accessMethod: v } } })}
          onAccessMethodOtherChange={(v) => onUpdate({ taxRecords: { documentLocation: { ...(trust.taxRecords?.documentLocation || {}), accessMethodOther: v } } })}
          onLocationChange={(v) => onUpdate({ taxRecords: { documentLocation: { ...(trust.taxRecords?.documentLocation || {}), location: v } } })}
          onLocationOtherChange={(v) => onUpdate({ taxRecords: { documentLocation: { ...(trust.taxRecords?.documentLocation || {}), locationOther: v } } })}
        />
      </div>
    </div>
  );
}

// ─── Subsection: 21-Year Planning ────────────────────────────────────────

function TwentyOneYearSubsection({ trust, onUpdate, trustName }: { trust: FamilyTrust; onUpdate: (u: Partial<FamilyTrust>) => void; trustName: string; }) {
  const anniversary = calculate21YearAnniversary(trust);
  const anniversaryStatus = getAnniversaryStatus(trust);
  const rule = trust.twentyOneYearRule;

  const updateRule = (updates: Partial<Trust21YearRule>) => {
    onUpdate({ twentyOneYearRule: { ...(trust.twentyOneYearRule || { confirmedByProfessional: 'not_sure', planningCompleted: 'not_sure' }), ...updates } });
  };

  const statusLabel: Record<string, string> = {
    more_than_5_years: 'More than 5 years away — informational only',
    within_5_years: 'Within 5 years — planning item',
    within_2_years: 'Within 2 years — action required',
    passed: 'Anniversary may have already passed',
    unknown: 'Unknown — establishment date needed',
  };

  return (
    <div className="space-y-6">
      <SubsectionTitle icon={<Calendar className="w-5 h-5" />} title="21-Year Trust Planning" />

      <div className="bg-blue-900/20 border border-blue-700/40 rounded-xl p-5 space-y-3">
        <h4 className="text-lg font-semibold text-white">Potential 21-Year Trust Anniversary</h4>
        <p className="text-sm text-gray-300">
          Many Canadian trusts may be subject to tax rules that deem certain trust property to be disposed of at fair market value
          every 21 years, potentially realizing accrued gains even where assets have not actually been sold. The application and
          timing of these rules depend on the trust's circumstances and should be confirmed with the trust's accountant or lawyer.
        </p>
        {anniversary && (
          <div className="pt-2">
            <p className="text-sm text-blue-300">
              <span className="font-medium">Estimated Anniversary:</span> {formatAnniversaryDate(trust)}
            </p>
            <p className="text-xs text-gray-400 mt-1">Status: {statusLabel[anniversaryStatus]}</p>
          </div>
        )}
        {!anniversary && (
          <p className="text-sm text-amber-300 pt-2">
            The 21-year anniversary cannot be estimated without the establishment date. Consider confirming when {trustName} was established.
          </p>
        )}
      </div>

      <div>
        <label className={labelClass}>Has an accountant or lawyer confirmed the applicable 21-year deemed disposition date for {trustName}?</label>
        <YesNoCard selectedValue={rule?.confirmedByProfessional || 'not_sure'} onClick={(v) => updateRule({ confirmedByProfessional: v as Trust21YearRule['confirmedByProfessional'] })} />
      </div>

      {rule?.confirmedByProfessional === 'yes' && (
        <div>
          <label className={labelClass}>What date have they confirmed?</label>
          <input type="date" value={rule.confirmedDate || ''} onChange={(e) => updateRule({ confirmedDate: e.target.value })} className={inputClass} />
          <p className={subtleTextClass}>This professionally confirmed date will be used instead of the estimated date in all outputs.</p>
        </div>
      )}

      <div>
        <label className={labelClass}>Has any planning already been completed for this 21-year anniversary?</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <OptionButton label="Yes" selected={rule?.planningCompleted === 'yes'} onClick={() => updateRule({ planningCompleted: 'yes' })} />
          <OptionButton label="No" selected={rule?.planningCompleted === 'no'} onClick={() => updateRule({ planningCompleted: 'no' })} />
          <OptionButton label="Not yet — it is still several years away" selected={rule?.planningCompleted === 'years_away'} onClick={() => updateRule({ planningCompleted: 'years_away' })} />
          <OptionButton label="I'm not sure" selected={rule?.planningCompleted === 'not_sure' || !rule} onClick={() => updateRule({ planningCompleted: 'not_sure' })} />
        </div>
      </div>

      {rule?.planningCompleted === 'yes' && (
        <div className="space-y-3">
          <div>
            <label className={labelClass}>What planning has been completed, or where can the relevant information be found?</label>
            <textarea value={rule.planningNotes || ''} onChange={(e) => updateRule({ planningNotes: e.target.value })} rows={3} className={inputClass} placeholder="Describe the planning completed or where the information is located" />
          </div>
        </div>
      )}

      {anniversaryStatus === 'within_2_years' && (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-sm text-red-300">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Important Planning Issue — Action Required</p>
              <p className="mt-1 text-red-200/80">{trustName} may be approaching its 21-year deemed disposition date. Consider reviewing the Trust with its accountant and lawyer well in advance of this date.</p>
            </div>
          </div>
        </div>
      )}
      {anniversaryStatus === 'within_5_years' && (
        <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-4 text-sm text-amber-300">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Upcoming Trust Tax Planning</p>
              <p className="mt-1 text-amber-200/80">{trustName} may be approaching its 21-year deemed disposition date. Consider reviewing the Trust with its accountant and lawyer well in advance of this date.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Subsection: Important Documents ─────────────────────────────────────

function DocumentsSubsection({ trust, onUpdate, trustName }: { trust: FamilyTrust; onUpdate: (u: Partial<FamilyTrust>) => void; trustName: string; }) {
  const [showAddPanel, setShowAddPanel] = useState(false);

  const docTypeOptions: Array<{ value: string; label: string }> = [
    { value: 'trust_deed', label: 'Trust Deed' },
    { value: 'amendments', label: 'Amendments' },
    { value: 'trustee_appointment', label: 'Trustee appointment/resignation/replacement documents' },
    { value: 'trust_tax_returns', label: 'Trust tax returns' },
    { value: 'financial_statements', label: 'Financial statements/accounting records' },
    { value: 'bank_investment_statements', label: 'Bank/investment statements' },
    { value: 'share_certificates', label: 'Share certificates/corporate ownership records' },
    { value: 'loan_agreements', label: 'Loan agreements' },
    { value: 'trustee_resolutions', label: 'Trustee resolutions/minutes' },
    { value: 'letter_of_wishes', label: 'Letter of Wishes (if applicable)' },
    { value: 'other', label: 'Other important trust documents' },
  ];

  const addDoc = (docType: TrustDocumentEntry['docType']) => {
    onUpdate({ trustDocuments: [...trust.trustDocuments, { id: generateTrustEntityId('doc'), docType, documentLocation: {} }] });
    setShowAddPanel(false);
  };
  const removeDoc = (id: string) => { onUpdate({ trustDocuments: trust.trustDocuments.filter((d) => d.id !== id) }); };
  const updateDoc = (id: string, u: Partial<TrustDocumentEntry>) => { onUpdate({ trustDocuments: trust.trustDocuments.map((d) => d.id === id ? { ...d, ...u } : d) }); };

  return (
    <div className="space-y-6">
      <SubsectionTitle icon={<FileText className="w-5 h-5" />} title={`Important Documents for ${trustName}`} />

      {trust.trustDocuments.length > 0 && (
        <div className="space-y-3">
          {trust.trustDocuments.map((d) => {
            const typeLabel = docTypeOptions.find((o) => o.value === d.docType)?.label || d.docType;
            return (
              <div key={d.id} className="border border-gray-700 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{typeLabel}</span>
                  <button type="button" onClick={() => removeDoc(d.id)} className="text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
                <DocumentLocationPicker
                  value={d.documentLocation.accessMethod || ''}
                  otherValue={d.documentLocation.accessMethodOther}
                  locationValue={d.documentLocation.location}
                  locationOtherValue={d.documentLocation.locationOther}
                  onAccessMethodChange={(v) => updateDoc(d.id, { documentLocation: { ...d.documentLocation, accessMethod: v } })}
                  onAccessMethodOtherChange={(v) => updateDoc(d.id, { documentLocation: { ...d.documentLocation, accessMethodOther: v } })}
                  onLocationChange={(v) => updateDoc(d.id, { documentLocation: { ...d.documentLocation, location: v } })}
                  onLocationOtherChange={(v) => updateDoc(d.id, { documentLocation: { ...d.documentLocation, locationOther: v } })}
                />
                <div>
                  <input type="text" value={d.notes || ''} onChange={(e) => updateDoc(d.id, { notes: e.target.value })} placeholder="Notes (optional)" className={inputClass} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showAddPanel && (
        <div className="border border-blue-500/40 rounded-lg p-4 bg-gray-800 space-y-3">
          <p className="text-sm text-gray-300">Select a document type to add:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {docTypeOptions.map((opt) => (
              <OptionButton key={opt.value} label={opt.label} selected={false} onClick={() => addDoc(opt.value as TrustDocumentEntry['docType'])} />
            ))}
          </div>
          <button type="button" onClick={() => setShowAddPanel(false)} className="text-sm text-gray-400 hover:text-gray-300">Cancel</button>
        </div>
      )}

      {!showAddPanel && (
        <button type="button" onClick={() => setShowAddPanel(true)} className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-500 text-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-400 transition-colors text-sm">
          <Plus className="w-4 h-4" /> Add a document
        </button>
      )}
    </div>
  );
}

// ─── Subsection: Notes ───────────────────────────────────────────────────

function NotesSubsection({ trust, onUpdate, trustName }: { trust: FamilyTrust; onUpdate: (u: Partial<FamilyTrust>) => void; trustName: string; }) {
  const flags = generateReviewFlags(trust);
  return (
    <div className="space-y-6">
      <SubsectionTitle icon={<CheckCircle2 className="w-5 h-5" />} title="What Your Family Should Know" />

      <div>
        <label className={labelClass}>Is there anything your family, trustees, Executor, Attorney for Property, accountant or lawyer should know about {trustName}?</label>
        <p className={subtleTextClass}>Consider anything that may not be obvious from the legal documents — how the Trust is managed, who normally handles things, important upcoming decisions, or who should be contacted first.</p>
        <textarea value={trust.familyNotes || ''} onChange={(e) => onUpdate({ familyNotes: e.target.value })} rows={5} className={inputClass} placeholder="Enter any additional information your family should know..." />
      </div>

      {flags.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Review Flags ({flags.length})
          </h4>
          <div className="space-y-2">
            {flags.map((flag, i) => (
              <div key={i} className="bg-amber-900/20 border border-amber-700/40 rounded-lg p-3 text-sm text-amber-300">
                {flag}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Helper Component ─────────────────────────────────────────────────────

function SubsectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 pb-2">
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400">{icon}</div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
  );
}
