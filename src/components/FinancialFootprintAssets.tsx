import { useState, useMemo } from 'react';
import {
  Landmark,
  TrendingUp,
  Briefcase,
  GraduationCap,
  HandCoins,
  MoreHorizontal,
  Check,
  Plus,
  ChevronRight,
} from 'lucide-react';
import {
  InvestmentAccount,
  PensionRecord,
  EquityCompensation,
  ReceivableRecord,
  OtherAssetRecord,
} from '../lib/financialAssetTypes';
import {
  sectionCardClass,
  SectionHeading,
  YesNoCard,
} from './FinancialFootprintShared';
import InvestmentsIntake from './InvestmentsIntake';
import PensionsIntake from './PensionsIntake';
import EmployerEquityIntake from './EmployerEquityIntake';
import ReceivablesIntake from './ReceivablesIntake';
import OtherAssetsIntake from './OtherAssetsIntake';

type Props = {
  answers: Record<string, unknown>;
  allAnswers?: Map<string, Record<string, unknown>>;
  onAnswerChange: (key: string, value: unknown) => void;
};

type Subsection = 'investments' | 'pensions' | 'employerEquity' | 'receivables' | 'other' | null;

export default function FinancialFootprintAssets({
  answers,
  allAnswers,
  onAnswerChange,
}: Props) {
  const aboutYou = allAnswers?.get('aboutYou') || {};
  const client1Name = (aboutYou['fullName'] as string) || 'Client 1';
  const client2Name = (aboutYou['spouseName'] as string) || 'Client 2';
  const maritalStatus = aboutYou['maritalStatus'] as string;
  const hasSpouse = maritalStatus === 'married' || maritalStatus === 'common_law';

  const [activeSubsection, setActiveSubsection] = useState<Subsection>(null);
  const [summaryConfirmed, setSummaryConfirmed] = useState(false);

  // Load existing assets from answers
  const investmentAccounts = (answers['investmentAccountsData'] as InvestmentAccount[]) || [];
  const pensionRecords = (answers['pensionRecordsData'] as PensionRecord[]) || [];
  const equityRecords = (answers['equityCompensationData'] as EquityCompensation[]) || [];
  const receivableRecords = (answers['receivablesData'] as ReceivableRecord[]) || [];
  const otherAssets = (answers['otherAssetsData'] as OtherAssetRecord[]) || [];

  // Derive known individuals for beneficiary/child selection
  const knownIndividuals = useMemo(() => {
    const individuals: Array<{ id: string; name: string; relationship: string }> = [];
    const prevRels = allAnswers?.get('previousRelationships') || {};
    const c1Rels = (prevRels['client1PreviousRelationshipsData'] as Array<Record<string, string>>) || [];
    c1Rels.forEach((r, i) => {
      if (r?.name) individuals.push({ id: `c1prev_${i}`, name: r.name, relationship: 'Previous Partner' });
    });
    const c2Rels = (prevRels['client2PreviousRelationshipsData'] as Array<Record<string, string>>) || [];
    c2Rels.forEach((r, i) => {
      if (r?.name) individuals.push({ id: `c2prev_${i}`, name: r.name, relationship: 'Previous Partner' });
    });
    const childrenData = allAnswers?.get('children') || {};
    const children = (childrenData['childrenData'] as Array<Record<string, string>>) || [];
    children.forEach((c, i) => {
      if (c?.name) individuals.push({ id: `child_${i}`, name: c.name, relationship: 'Child' });
    });
    if (hasSpouse) {
      individuals.unshift({ id: 'client2', name: client2Name, relationship: 'Spouse' });
    }
    individuals.unshift({ id: 'client1', name: client1Name, relationship: 'Self' });
    return individuals;
  }, [allAnswers, client1Name, client2Name, hasSpouse]);

  // Derive advisor info from professional team
  const advisorInfo = useMemo(() => {
    const profTeam = allAnswers?.get('professionalTeam') || {};
    const advisorData = (profTeam['financialAdvisorsData'] as Array<Record<string, string>>) || [];
    if (advisorData.length > 0) {
      const a = advisorData[0];
      return {
        name: a.name || a.contactName || '',
        firm: a.firm || a.companyName || '',
        phone: a.phone || a.contactPhone || '',
        email: a.email || a.contactEmail || '',
        id: `advisor_0`,
      };
    }
    return {};
  }, [allAnswers]);

  // Derive institutions from banking data
  const institutions = useMemo(() => {
    const footprint = allAnswers?.get('financialFootprint') || {};
    const insts: Array<{ id: string; name: string }> = [];
    const seen = new Set<string>();
    const addInst = (data: unknown, key: string) => {
      const arr = data as unknown as Array<Record<string, unknown>>;
      if (!Array.isArray(arr)) return;
      arr.forEach((inst, i) => {
        const name = (inst['name'] as string) || '';
        if (name && !seen.has(name)) {
          seen.add(name);
          insts.push({ id: `${key}_${i}`, name });
        }
      });
    };
    addInst(footprint['client1InstitutionsData'], 'c1');
    addInst(footprint['client2InstitutionsData'], 'c2');
    addInst(footprint['jointInstitutionsData'], 'j');
    addInst(footprint['mixedJointInstitutionsData'], 'mj');
    addInst(footprint['mixedClient1InstitutionsData'], 'mc1');
    addInst(footprint['mixedClient2InstitutionsData'], 'mc2');
    return insts;
  }, [allAnswers]);

  // Derive employers from corporations
  const employers = useMemo(() => {
    const corps = allAnswers?.get('corporations') || {};
    const corpData = (corps['corporationsData'] as Array<Record<string, string>>) || [];
    return corpData.map((c, i) => ({ id: `corp_${i}`, name: c.legalName || c.name || '' })).filter((e) => e.name);
  }, [allAnswers]);

  // Derive receivables from corporate financial connections (shareholder loans)
  const derivedReceivables = useMemo(() => {
    const corpConn = allAnswers?.get('corporateFinancialConnections') || {};
    const slData = (corpConn['shareholderLoansData'] as Array<Record<string, unknown>>) || [];
    return slData.map((sl, i) => {
      const owedTo = sl['owedTo'] === 'client2' ? client2Name : client1Name;
      return {
        id: `sl_${i}`,
        corporation: (sl['selectedCompany'] as string) || 'Company',
        amount: (sl['amount'] as string) || 'amount unknown',
        owedTo,
      };
    });
  }, [allAnswers, client1Name, client2Name]);

  // Derive banking summary from existing banking data
  const bankingSummary = useMemo(() => {
    const footprint = allAnswers?.get('financialFootprint') || {};
    const accounts: Array<{ name: string; type: string; owner: string }> = [];
    const addAccounts = (data: unknown, ownerLabel: string) => {
      const arr = data as Array<Record<string, unknown>>;
      if (!Array.isArray(arr)) return;
      arr.forEach((inst) => {
        const name = (inst['name'] as string) || '';
        const type = (inst['accountType'] as string) || '';
        if (name) accounts.push({ name, type, owner: ownerLabel });
      });
    };
    const bankingStructure = (footprint['bankingStructure'] as string) || '';
    if (!hasSpouse) {
      addAccounts(footprint['client1InstitutionsData'], client1Name);
    } else if (bankingStructure === 'individual') {
      addAccounts(footprint['client1InstitutionsData'], client1Name);
      addAccounts(footprint['client2InstitutionsData'], client2Name);
    } else if (bankingStructure === 'joint') {
      addAccounts(footprint['jointInstitutionsData'], `${client1Name} & ${client2Name}`);
    } else if (bankingStructure === 'mixed') {
      addAccounts(footprint['mixedJointInstitutionsData'], `${client1Name} & ${client2Name}`);
      addAccounts(footprint['mixedClient1InstitutionsData'], client1Name);
      addAccounts(footprint['mixedClient2InstitutionsData'], client2Name);
    }
    return accounts;
  }, [allAnswers, client1Name, client2Name, hasSpouse]);

  // Gate answers
  const hasInvestments = (answers['hasInvestments'] as string) || '';
  const hasPensions = (answers['hasPensions'] as string) || '';
  const hasEquity = (answers['hasEquity'] as string) || '';
  const hasReceivables = (answers['hasReceivables'] as string) || '';
  const hasOtherAssets = (answers['hasOtherAssets'] as string) || '';

  // If an active subsection is rendering, show it
  if (activeSubsection === 'investments') {
    return (
      <SubsectionWrapper title="Investments & Registered Accounts" onBack={() => setActiveSubsection(null)}>
        <InvestmentsIntake
          assets={investmentAccounts}
          onChange={(assets) => onAnswerChange('investmentAccountsData', assets)}
          allAnswers={allAnswers}
          client1Name={client1Name}
          client2Name={client2Name}
          hasSpouse={hasSpouse}
          knownIndividuals={knownIndividuals}
          advisorName={advisorInfo.name}
          advisorFirm={advisorInfo.firm}
          advisorPhone={advisorInfo.phone}
          advisorEmail={advisorInfo.email}
          advisorId={advisorInfo.id}
          institutions={institutions}
        />
      </SubsectionWrapper>
    );
  }

  if (activeSubsection === 'pensions') {
    return (
      <SubsectionWrapper title="Workplace Retirement Plans" onBack={() => setActiveSubsection(null)}>
        <PensionsIntake
          assets={pensionRecords}
          onChange={(assets) => onAnswerChange('pensionRecordsData', assets)}
          allAnswers={allAnswers}
          client1Name={client1Name}
          client2Name={client2Name}
          hasSpouse={hasSpouse}
          knownIndividuals={knownIndividuals}
          institutions={institutions}
        />
      </SubsectionWrapper>
    );
  }

  if (activeSubsection === 'employerEquity') {
    return (
      <SubsectionWrapper title="Employer Equity & Compensation" onBack={() => setActiveSubsection(null)}>
        <EmployerEquityIntake
          assets={equityRecords}
          onChange={(assets) => onAnswerChange('equityCompensationData', assets)}
          client1Name={client1Name}
          client2Name={client2Name}
          hasSpouse={hasSpouse}
          employers={employers}
        />
      </SubsectionWrapper>
    );
  }

  if (activeSubsection === 'receivables') {
    return (
      <SubsectionWrapper title="Amounts Owed to You" onBack={() => setActiveSubsection(null)}>
        <ReceivablesIntake
          assets={receivableRecords}
          onChange={(assets) => onAnswerChange('receivablesData', assets)}
          allAnswers={allAnswers}
          client1Name={client1Name}
          client2Name={client2Name}
          hasSpouse={hasSpouse}
          derivedReceivables={derivedReceivables}
        />
      </SubsectionWrapper>
    );
  }

  if (activeSubsection === 'other') {
    return (
      <SubsectionWrapper title="Other Financial Assets" onBack={() => setActiveSubsection(null)}>
        <OtherAssetsIntake
          assets={otherAssets}
          onChange={(assets) => onAnswerChange('otherAssetsData', assets)}
          client1Name={client1Name}
          client2Name={client2Name}
          hasSpouse={hasSpouse}
        />
      </SubsectionWrapper>
    );
  }

  // Main view
  const allSectionsDone =
    hasInvestments &&
    hasPensions &&
    hasEquity &&
    hasReceivables &&
    hasOtherAssets;

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className={sectionCardClass}>
        <p className="text-base text-gray-300 leading-relaxed">
          Next, let's make sure we have a clear picture of your savings, investments, pensions and other financial benefits.
        </p>
        <p className="text-sm text-gray-400 leading-relaxed">
          We'll use this information to help the people you trust understand what exists, who it belongs to, and where to find it if they ever need to step in.
        </p>
      </div>

      {/* Banking summary (existing data) */}
      {bankingSummary.length > 0 && (
        <div>
          <SectionHeading label="Everyday Banking" icon={<Landmark className="w-4 h-4" />} />
          <div className="space-y-2">
            {bankingSummary.map((acct, i) => (
              <div key={i} className="bg-gray-800/40 border border-gray-700/40 rounded-lg px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{acct.name}{acct.type ? ` — ${acct.type}` : ''}</p>
                </div>
                <span className="text-xs text-gray-400">{acct.owner}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Investments gate */}
      <SubsectionGate
        label="Investments & Registered Accounts"
        icon={<TrendingUp className="w-5 h-5" />}
        promptText={`Does ${hasSpouse ? 'either of you' : 'you'} have any investment or registered accounts?`}
        gateValue={hasInvestments}
        onGateChange={(v) => onAnswerChange('hasInvestments', v)}
        hasItems={investmentAccounts.length > 0}
        onOpen={() => setActiveSubsection('investments')}
        itemCount={investmentAccounts.length}
        itemLabel="account"
      />

      {/* Pensions gate */}
      {hasInvestments && (
        <SubsectionGate
          label="Workplace Retirement Plans"
          icon={<Briefcase className="w-5 h-5" />}
          promptText={`Does ${hasSpouse ? 'either of you' : 'you'} have a pension or retirement savings plan through work or a former employer?`}
          gateValue={hasPensions}
          onGateChange={(v) => onAnswerChange('hasPensions', v)}
          hasItems={pensionRecords.length > 0}
          onOpen={() => setActiveSubsection('pensions')}
          itemCount={pensionRecords.length}
          itemLabel="plan"
        />
      )}

      {/* Employer equity gate */}
      {hasPensions && (
        <SubsectionGate
          label="Employer Equity & Compensation"
          icon={<GraduationCap className="w-5 h-5" />}
          promptText={`Does ${hasSpouse ? 'either of you' : 'you'} receive shares, stock-based compensation, or other long-term incentives through work?`}
          gateValue={hasEquity}
          onGateChange={(v) => onAnswerChange('hasEquity', v)}
          hasItems={equityRecords.length > 0}
          onOpen={() => setActiveSubsection('employerEquity')}
          itemCount={equityRecords.length}
          itemLabel="award"
        />
      )}

      {/* Receivables gate */}
      {hasEquity && (
        <SubsectionGate
          label="Amounts Owed to You"
          icon={<HandCoins className="w-5 h-5" />}
          promptText={`Does anyone owe ${hasSpouse ? 'either of you' : 'you'} money that hasn't already been captured?`}
          gateValue={hasReceivables}
          onGateChange={(v) => onAnswerChange('hasReceivables', v)}
          hasItems={receivableRecords.length > 0 || derivedReceivables.length > 0}
          onOpen={() => setActiveSubsection('receivables')}
          itemCount={receivableRecords.length + derivedReceivables.length}
          itemLabel="amount"
        />
      )}

      {/* Other assets gate */}
      {hasReceivables && (
        <SubsectionGate
          label="Other Financial Assets"
          icon={<MoreHorizontal className="w-5 h-5" />}
          promptText="Are there any other financial assets we haven't captured?"
          gateValue={hasOtherAssets}
          onGateChange={(v) => onAnswerChange('hasOtherAssets', v)}
          hasItems={otherAssets.length > 0}
          onOpen={() => setActiveSubsection('other')}
          itemCount={otherAssets.length}
          itemLabel="asset"
        />
      )}

      {/* End-of-section summary */}
      {allSectionsDone && (
        <EndSummary
          bankingSummary={bankingSummary}
          investmentAccounts={investmentAccounts}
          pensionRecords={pensionRecords}
          equityRecords={equityRecords}
          receivableRecords={receivableRecords}
          derivedReceivables={derivedReceivables}
          otherAssets={otherAssets}
          client1Name={client1Name}
          client2Name={client2Name}
          confirmed={summaryConfirmed}
          onConfirm={() => setSummaryConfirmed(true)}
          onAddMore={() => setSummaryConfirmed(false)}
        />
      )}
    </div>
  );
}

function SubsectionWrapper({
  title,
  children,
  onBack,
}: {
  title: string;
  children: React.ReactNode;
  onBack: () => void;
}) {
  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 transition-colors"
      >
        <ChevronRight className="w-4 h-4 rotate-180" />
        Back to Financial Footprint
      </button>
      <SectionHeading label={title} />
      {children}
    </div>
  );
}

function SubsectionGate({
  label,
  icon,
  promptText,
  gateValue,
  onGateChange,
  hasItems,
  onOpen,
  itemCount,
  itemLabel,
}: {
  label: string;
  icon: React.ReactNode;
  promptText: string;
  gateValue: string;
  onGateChange: (v: string) => void;
  hasItems: boolean;
  onOpen: () => void;
  itemCount: number;
  itemLabel: string;
}) {
  return (
    <div className="space-y-4">
      <SectionHeading label={label} icon={icon} />
      {hasItems ? (
        <div className="space-y-3">
          <div className="bg-gray-800/40 border border-gray-700/40 rounded-xl p-4 flex items-center justify-between">
            <p className="text-sm text-gray-300">
              {itemCount} {itemLabel}{itemCount !== 1 ? 's' : ''} entered
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpen}
                className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                View & edit
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpen}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add another
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-400">{promptText}</p>
          <YesNoCard
            selectedValue={gateValue}
            onClick={onGateChange}
          />
          {gateValue === 'yes' && (
            <button
              type="button"
              onClick={onOpen}
              className="flex items-center gap-2 px-5 py-3 bg-gray-800 border border-gray-600 hover:border-blue-500 text-gray-300 hover:text-white rounded-xl font-medium transition-all w-full sm:w-auto"
            >
              <Plus className="w-5 h-5" />
              Get started
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function EndSummary({
  bankingSummary,
  investmentAccounts,
  pensionRecords,
  equityRecords,
  receivableRecords,
  derivedReceivables,
  otherAssets,
  client1Name,
  client2Name,
  confirmed,
  onConfirm,
  onAddMore,
}: {
  bankingSummary: Array<{ name: string; type: string; owner: string }>;
  investmentAccounts: InvestmentAccount[];
  pensionRecords: PensionRecord[];
  equityRecords: EquityCompensation[];
  receivableRecords: ReceivableRecord[];
  derivedReceivables: Array<{ id: string; corporation: string; amount: string; owedTo: string }>;
  otherAssets: OtherAssetRecord[];
  client1Name: string;
  client2Name: string;
  confirmed: boolean;
  onConfirm: () => void;
  onAddMore: () => void;
}) {
  const totalBanking = bankingSummary.length;
  const totalInvestments = investmentAccounts.length;
  const totalPensions = pensionRecords.length;
  const totalEquity = equityRecords.length;
  const totalReceivables = receivableRecords.length + derivedReceivables.length;
  const totalOther = otherAssets.length;

  if (totalBanking + totalInvestments + totalPensions + totalEquity + totalReceivables + totalOther === 0) {
    return null;
  }

  const accountTypeShort = (t: string) => {
    const map: Record<string, string> = {
      rrsp: 'RRSP', rrif: 'RRIF', tfsa: 'TFSA', fhsa: 'FHSA',
      resp: 'RESP', non_registered: 'Non-reg', lira: 'Locked-in',
      gic: 'GIC', other_registered: 'Other reg.', other_investment: 'Other inv.',
    };
    return map[t] || t;
  };

  const pensionTypeShort = (t: string) => {
    const map: Record<string, string> = {
      db: 'Defined Benefit', dc: 'Defined Contribution',
      group_rrsp: 'Group RRSP', dpsp: 'DPSP', prpp: 'PRPP',
      group_savings: 'Group Savings', ipp: 'IPP', rca: 'RCA',
    };
    return map[t] || t;
  };

  const awardTypeShort = (t: string) => {
    const map: Record<string, string> = {
      rsu: 'RSUs', psu: 'PSUs', dsu: 'DSUs',
      stock_option: 'Stock Options', espp: 'ESPP',
      employer_shares: 'Employer Shares', deferred_comp: 'Deferred Comp',
    };
    return map[t] || t;
  };

  const ownerShort = (ids: string[]) => {
    if (ids.includes('joint')) return 'Joint';
    if (ids.includes('client2')) return client2Name;
    return client1Name;
  };

  return (
    <div className="space-y-6">
      <SectionHeading label="Your Financial Picture" icon={<Check className="w-4 h-4" />} />

      <div className={sectionCardClass}>
        <p className="text-sm text-gray-400 mb-4">Here's what we've captured.</p>

        <div className="space-y-5">
          {/* Banking & Cash */}
          {totalBanking > 0 && (
            <SummaryGroup label="Banking & Cash" count={totalBanking}>
              {bankingSummary.map((acct, i) => (
                <SummaryLine key={i} title={`${acct.name}${acct.type ? ` — ${acct.type}` : ''}`} subtitle={acct.owner} />
              ))}
            </SummaryGroup>
          )}

          {/* Investments */}
          {totalInvestments > 0 && (
            <SummaryGroup label="Investments" count={totalInvestments}>
              {investmentAccounts.map((acct) => (
                <SummaryLine
                  key={acct.id}
                  title={acct.friendlyLabel || `${accountTypeShort(acct.accountType)}${acct.institutionName ? ` — ${acct.institutionName}` : ''}`}
                  subtitle={ownerShort(acct.ownerIds)}
                  value={acct.valueUnknown ? 'Value unknown' : acct.approximateValue ? `~${acct.currency} ${acct.approximateValue}` : undefined}
                />
              ))}
            </SummaryGroup>
          )}

          {/* Workplace Retirement */}
          {totalPensions > 0 && (
            <SummaryGroup label="Workplace Retirement" count={totalPensions}>
              {pensionRecords.map((pen) => (
                <SummaryLine
                  key={pen.id}
                  title={pen.planName || pensionTypeShort(pen.pensionType)}
                  subtitle={ownerShort(pen.ownerIds)}
                  value={pen.currentPensionAmount ? `Receiving ${pen.currentPensionAmount} ${pen.pensionFrequency || ''}` : pen.approximateValue ? `~${pen.currency} ${pen.approximateValue}` : undefined}
                />
              ))}
            </SummaryGroup>
          )}

          {/* Employer Equity */}
          {totalEquity > 0 && (
            <SummaryGroup label="Employer Equity" count={totalEquity}>
              {equityRecords.map((eq) => (
                <SummaryLine
                  key={eq.id}
                  title={`${awardTypeShort(eq.awardType)}${eq.companyName ? ` — ${eq.companyName}` : ''}`}
                  subtitle={ownerShort(eq.ownerIds)}
                />
              ))}
            </SummaryGroup>
          )}

          {/* Amounts Owed to You */}
          {totalReceivables > 0 && (
            <SummaryGroup label="Amounts Owed to You" count={totalReceivables}>
              {derivedReceivables.map((dr) => (
                <SummaryLine key={dr.id} title={`${dr.corporation} → ${dr.owedTo}`} value={dr.amount !== 'amount unknown' ? `~${dr.amount}` : 'Amount unknown'} />
              ))}
              {receivableRecords.map((rec) => (
                <SummaryLine
                  key={rec.id}
                  title={`${rec.debtor || 'Debtor'} → ${ownerShort(rec.ownerIds)}`}
                  value={rec.valueUnknown ? 'Value unknown' : rec.approximateValue ? `~${rec.currency} ${rec.approximateValue}` : undefined}
                />
              ))}
            </SummaryGroup>
          )}

          {/* Other */}
          {totalOther > 0 && (
            <SummaryGroup label="Other Financial Assets" count={totalOther}>
              {otherAssets.map((asset) => (
                <SummaryLine
                  key={asset.id}
                  title={asset.assetDescription || 'Other asset'}
                  subtitle={ownerShort(asset.ownerIds)}
                  value={asset.valueUnknown ? 'Value unknown' : asset.approximateValue ? `~${asset.currency} ${asset.approximateValue}` : undefined}
                />
              ))}
            </SummaryGroup>
          )}
        </div>

        {!confirmed ? (
          <div className="pt-6 space-y-3">
            <p className="text-sm text-gray-300">Does this look like a complete picture of your financial assets and retirement benefits?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={onConfirm}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 border border-blue-500 text-white rounded-lg font-medium transition-all hover:bg-blue-500"
              >
                <Check className="w-4 h-4" />
                Yes, this is complete
              </button>
              <button
                type="button"
                onClick={onAddMore}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 border border-gray-600 text-gray-300 rounded-lg font-medium transition-all hover:border-gray-500"
              >
                <Plus className="w-4 h-4" />
                I need to add something
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-4 flex items-center gap-2 text-sm text-green-400">
            <Check className="w-4 h-4" />
            Great — this looks complete. You can continue to the next section.
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryGroup({ label, count, children }: { label: string; count: number; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-white">{label}</p>
        <span className="text-xs text-gray-500">{count} {count !== 1 ? 'items' : 'item'}</span>
      </div>
      <div className="space-y-1.5 ml-2">
        {children}
      </div>
    </div>
  );
}

function SummaryLine({ title, subtitle, value }: { title: string; subtitle?: string; value?: string }) {
  return (
    <div className="flex items-center justify-between text-sm py-1.5 border-b border-gray-700/30 last:border-0">
      <div className="flex-1 min-w-0">
        <span className="text-gray-300 truncate">{title}</span>
        {subtitle && <span className="text-gray-500 ml-2 text-xs">— {subtitle}</span>}
      </div>
      {value && <span className="text-blue-400 text-xs ml-2 flex-shrink-0">{value}</span>}
    </div>
  );
}
