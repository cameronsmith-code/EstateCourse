import type { AnyFinancialAsset, ContactInfo } from './financialAssetTypes';

export type ProfessionalAdvisor = {
  id: string;
  name: string;
  firm: string;
  phone: string;
  email: string;
  website: string;
  worksWith: string[];
  services: string[];
  type: 'financial' | 'accountant' | 'lawyer' | 'insurance';
  active: boolean;
};

export type Person = {
  id: string;
  name: string;
  relationship: string;
};

export type Institution = {
  id: string;
  name: string;
};

export type AnswersMap = Map<string, Record<string, unknown>>;

let idCounter = 0;

function generateStableId(): string {
  idCounter += 1;
  return `adv_${Date.now().toString(36)}_${idCounter}_${Math.random().toString(36).substr(2, 6)}`;
}

function ensureAdvisorId(
  profTeam: Record<string, unknown>,
  key: string
): string {
  const existing = profTeam[key] as string | undefined;
  if (existing) return existing;
  const newId = generateStableId();
  return newId;
}

type AdditionalAdvisorRecord = {
  id?: string;
  name?: string;
  firm?: string;
  phone?: string;
  email?: string;
  website?: string;
  worksWith?: string[];
  services?: string[];
  isCameronSmith?: boolean;
  duration?: string;
  recordsLocation?: string;
  includeInContactList?: string;
  hasAdditional?: string;
};

function advisorFromFields(
  id: string,
  name: string,
  firm: string,
  phone: string,
  email: string,
  website: string,
  worksWith: string[],
  services: string[]
): ProfessionalAdvisor {
  return {
    id,
    name: name || '',
    firm: firm || '',
    phone: phone || '',
    email: email || '',
    website: website || '',
    worksWith,
    services,
    type: 'financial',
    active: true,
  };
}

export function getProfessionalAdvisors(allAnswers: AnswersMap): ProfessionalAdvisor[] {
  const profTeam = allAnswers.get('professionalTeam') || {};
  const advisors: ProfessionalAdvisor[] = [];

  if (profTeam['fpHasAdvisor'] === 'yes') {
    const id = ensureAdvisorId(profTeam, 'fpAdvisor1Id');
    advisors.push(
      advisorFromFields(
        id,
        (profTeam['fpAdvisor1Name'] as string) || '',
        (profTeam['fpAdvisor1Firm'] as string) || '',
        (profTeam['fpAdvisor1Phone'] as string) || '',
        (profTeam['fpAdvisor1Email'] as string) || '',
        (profTeam['fpAdvisor1Website'] as string) || '',
        (profTeam['fpAdvisor1WorksWith'] as string[]) || [],
        (profTeam['fpAdvisor1Services'] as string[]) || []
      )
    );
  }

  if (profTeam['fpHasAdditionalAdvisor'] === 'yes') {
    const id = ensureAdvisorId(profTeam, 'fpAdvisor2Id');
    advisors.push(
      advisorFromFields(
        id,
        (profTeam['fpAdvisor2Name'] as string) || '',
        (profTeam['fpAdvisor2Firm'] as string) || '',
        (profTeam['fpAdvisor2Phone'] as string) || '',
        (profTeam['fpAdvisor2Email'] as string) || '',
        (profTeam['fpAdvisor2Website'] as string) || '',
        (profTeam['fpAdvisor2WorksWith'] as string[]) || [],
        (profTeam['fpAdvisor2Services'] as string[]) || []
      )
    );
  }

  const additionalData = profTeam['fpAdditionalAdvisorsData'] as AdditionalAdvisorRecord[] | undefined;
  if (Array.isArray(additionalData)) {
    for (const record of additionalData) {
      if (!record.name && !record.firm && !record.isCameronSmith) continue;
      const id = record.id || generateStableId();
      advisors.push(
        advisorFromFields(
          id,
          record.name || (record.isCameronSmith ? 'Cameron Smith' : ''),
          record.firm || (record.isCameronSmith ? 'Clarify Wealth Ltd.' : ''),
          record.phone || (record.isCameronSmith ? '647-448-5963' : ''),
          record.email || (record.isCameronSmith ? 'cameron.smith@ipcsecurities.com' : ''),
          record.website || (record.isCameronSmith ? 'www.clarifywealth.ca' : ''),
          record.worksWith || [],
          record.services || []
        )
      );
    }
  }

  if (profTeam['acctHasAccountant'] === 'yes') {
    advisors.push({
      id: 'acct_0',
      name: (profTeam['acctAdvisor1Name'] as string) || '',
      firm: (profTeam['acctAdvisor1Firm'] as string) || '',
      phone: (profTeam['acctAdvisor1Phone'] as string) || '',
      email: (profTeam['acctAdvisor1Email'] as string) || '',
      website: '',
      worksWith: (profTeam['acctAdvisor1WorksWith'] as string[]) || [],
      services: (profTeam['acctAdvisor1Services'] as string[]) || [],
      type: 'accountant',
      active: true,
    });
  }

  if (profTeam['lawHasLawyer'] === 'yes') {
    advisors.push({
      id: 'law_0',
      name: (profTeam['lawAdvisor1Name'] as string) || '',
      firm: (profTeam['lawAdvisor1Firm'] as string) || '',
      phone: (profTeam['lawAdvisor1Phone'] as string) || '',
      email: (profTeam['lawAdvisor1Email'] as string) || '',
      website: '',
      worksWith: (profTeam['lawAdvisor1WorksWith'] as string[]) || [],
      services: (profTeam['lawAdvisor1Services'] as string[]) || [],
      type: 'lawyer',
      active: true,
    });
  }

  if (profTeam['insHasAdvisor'] && profTeam['insHasAdvisor'] !== 'na') {
    advisors.push({
      id: 'ins_0',
      name: (profTeam['insAdvisor1Name'] as string) || '',
      firm: (profTeam['insAdvisor1Firm'] as string) || '',
      phone: (profTeam['insAdvisor1Phone'] as string) || '',
      email: (profTeam['insAdvisor1Email'] as string) || '',
      website: '',
      worksWith: (profTeam['insAdvisor1WorksWith'] as string[]) || [],
      services: (profTeam['insAdvisor1Services'] as string[]) || [],
      type: 'insurance',
      active: true,
    });
  }

  if (profTeam['insHasAdditional'] === 'yes') {
    advisors.push({
      id: 'ins_1',
      name: (profTeam['insAdvisor2Name'] as string) || '',
      firm: (profTeam['insAdvisor2Firm'] as string) || '',
      phone: (profTeam['insAdvisor2Phone'] as string) || '',
      email: (profTeam['insAdvisor2Email'] as string) || '',
      website: '',
      worksWith: (profTeam['insAdvisor2WorksWith'] as string[]) || [],
      services: (profTeam['insAdvisor2Services'] as string[]) || [],
      type: 'insurance',
      active: true,
    });
  }

  return advisors;
}

export function getFinancialAdvisors(allAnswers: AnswersMap): ProfessionalAdvisor[] {
  return getProfessionalAdvisors(allAnswers).filter((a) => a.type === 'financial' && a.name);
}

export function resolveProfessionalReference(
  id: string | undefined,
  registry: ProfessionalAdvisor[]
): ProfessionalAdvisor | null {
  if (!id) return null;
  return registry.find((a) => a.id === id && a.active) || null;
}

export function resolvePersonReference(
  id: string | undefined,
  people: Person[]
): Person | null {
  if (!id) return null;
  return people.find((p) => p.id === id) || null;
}

export function resolveInstitutionReference(
  id: string | undefined,
  institutions: Institution[]
): Institution | null {
  if (!id) return null;
  return institutions.find((i) => i.id === id) || null;
}

export function clearStaleContact(contact: ContactInfo | undefined): ContactInfo {
  if (!contact) return {};
  if (!contact.contactPersonId) return contact;
  return {};
}

export function cleanStaleAdvisorReferences(
  allAnswers: AnswersMap
): AnswersMap {
  const advisors = getProfessionalAdvisors(allAnswers);
  const activeIds = new Set(advisors.map((a) => a.id));
  const updated = new Map(allAnswers);
  let changed = false;

  const assetKeys = [
    'investmentAccountsData',
    'pensionRecordsData',
    'equityCompensationData',
    'receivablesData',
    'otherAssetsData',
  ];

  for (const [sectionId, sectionData] of updated) {
    if (!sectionData || typeof sectionData !== 'object') continue;

    for (const assetKey of assetKeys) {
      const assets = sectionData[assetKey] as AnyFinancialAsset[] | undefined;
      if (!Array.isArray(assets) || assets.length === 0) continue;

      let assetChanged = false;
      const cleanedAssets = assets.map((asset) => {
        const contact = asset.contact;
        if (!contact || !contact.contactPersonId) return asset;

        if (!activeIds.has(contact.contactPersonId)) {
          assetChanged = true;
          return { ...asset, contact: {} };
        }
        return asset;
      });

      if (assetChanged) {
        if (!changed) changed = true;
        updated.set(sectionId, {
          ...sectionData,
          [assetKey]: cleanedAssets,
        });
      }
    }
  }

  return changed ? updated : allAnswers;
}

export function getKnownPeople(allAnswers: AnswersMap): Person[] {
  const people: Person[] = [];
  const aboutYou = allAnswers.get('aboutYou') || {};

  const client1Name = (aboutYou['fullName'] as string) || 'Client 1';
  people.push({ id: 'client1', name: client1Name, relationship: 'Self' });

  const maritalStatus = aboutYou['maritalStatus'] as string;
  if (maritalStatus === 'married' || maritalStatus === 'common_law') {
    const client2Name = (aboutYou['spouseName'] as string) || 'Client 2';
    people.push({ id: 'client2', name: client2Name, relationship: 'Spouse' });
  }

  const childrenData = allAnswers.get('children') || {};
  const children = (childrenData['childrenData'] as Array<Record<string, string>>) || [];
  children.forEach((c, i) => {
    if (c?.name) people.push({ id: `child_${i}`, name: c.name, relationship: 'Child' });
  });

  const prevRels = allAnswers.get('previousRelationships') || {};
  const c1Rels = (prevRels['client1PreviousRelationshipsData'] as Array<Record<string, string>>) || [];
  c1Rels.forEach((r, i) => {
    if (r?.name) people.push({ id: `c1prev_${i}`, name: r.name, relationship: 'Previous Partner' });
  });
  const c2Rels = (prevRels['client2PreviousRelationshipsData'] as Array<Record<string, string>>) || [];
  c2Rels.forEach((r, i) => {
    if (r?.name) people.push({ id: `c2prev_${i}`, name: r.name, relationship: 'Previous Partner' });
  });

  return people;
}

export function cleanStaleTrustReferences(allAnswers: AnswersMap): AnswersMap {
  const trustSection = allAnswers.get('familyTrusts');
  if (!trustSection) return allAnswers;

  const trusts = trustSection['familyTrustsData'] as Array<Record<string, unknown>> | undefined;
  if (!Array.isArray(trusts) || trusts.length === 0) return allAnswers;

  const activePeople = new Set(getKnownPeople(allAnswers).map((p) => p.id));
  const activeAdvisors = new Set(getProfessionalAdvisors(allAnswers).map((a) => a.id));

  const corpData = allAnswers.get('corporations')?.['corporationsData'] as Array<Record<string, string>> | undefined;
  const activeCorps = new Set((corpData || []).map((c, i) => `corp_${i}`));

  const propData = allAnswers.get('realEstate')?.['propertiesData'] as Array<Record<string, unknown>> | undefined;
  const activeProps = new Set((propData || []).map((p, i) => `prop_${i}`));
  if (allAnswers.get('realEstate')?.['primaryHomeData']) {
    activeProps.add('prop_primary');
  }

  let changed = false;
  const cleanedTrusts = trusts.map((trust) => {
    let trustChanged = false;

    const cleanedTrustees = (trust['trustees'] as Array<Record<string, unknown>> | undefined)?.map((t) => {
      if (t?.personId && t.personId !== 'client1' && t.personId !== 'client2' && !activePeople.has(t.personId as string)) {
        trustChanged = true;
        return { ...t, personId: undefined };
      }
      return t;
    });
    if (cleanedTrustees && cleanedTrustees.some((t, i) => t !== ((trust['trustees'] as Array<Record<string, unknown>>)[i]))) {
      trustChanged = true;
    }

    const cleanedBeneficiaries = (trust['beneficiaries'] as Array<Record<string, unknown>> | undefined)?.map((b) => {
      if (b?.personId && !activePeople.has(b.personId as string)) {
        trustChanged = true;
        return { ...b, personId: undefined };
      }
      return b;
    });

    const cleanedHoldings = (trust['assetHoldings'] as Array<Record<string, unknown>> | undefined)?.map((h) => {
      if (h?.corporationId && !activeCorps.has(h.corporationId as string)) {
        trustChanged = true;
        return { ...h, corporationId: undefined };
      }
      if (h?.propertyId && !activeProps.has(h.propertyId as string)) {
        trustChanged = true;
        return { ...h, propertyId: undefined };
      }
      return h;
    });

    const accountant = trust['accountantAdvisor'] as Record<string, unknown> | undefined;
    if (accountant?.advisorId && !activeAdvisors.has(accountant.advisorId as string)) {
      trustChanged = true;
    }
    const cleanedAccountant = accountant?.advisorId && !activeAdvisors.has(accountant.advisorId as string)
      ? { ...accountant, advisorId: undefined, isExisting: false }
      : accountant;

    const lawyer = trust['lawyerAdvisor'] as Record<string, unknown> | undefined;
    const cleanedLawyer = lawyer?.advisorId && !activeAdvisors.has(lawyer.advisorId as string)
      ? { ...lawyer, advisorId: undefined, isExisting: false }
      : lawyer;

    if (trustChanged) {
      changed = true;
      return {
        ...trust,
        trustees: cleanedTrustees || trust['trustees'],
        beneficiaries: cleanedBeneficiaries || trust['beneficiaries'],
        assetHoldings: cleanedHoldings || trust['assetHoldings'],
        accountantAdvisor: cleanedAccountant,
        lawyerAdvisor: cleanedLawyer,
      };
    }
    return trust;
  });

  if (changed) {
    const updated = new Map(allAnswers);
    updated.set('familyTrusts', { ...trustSection, familyTrustsData: cleanedTrusts });
    return updated;
  }

  return allAnswers;
}

export function cleanStaleLegacyIntentReferences(allAnswers: AnswersMap): AnswersMap {
  const legacySection = allAnswers.get('legacyIntent');
  if (!legacySection) return allAnswers;

  const intents = legacySection['legacyIntentsData'] as Array<Record<string, unknown>> | undefined;
  if (!Array.isArray(intents) || intents.length === 0) return allAnswers;

  const activePeople = new Set(getKnownPeople(allAnswers).map((p) => p.id));
  const activeAdvisors = new Set(getProfessionalAdvisors(allAnswers).map((a) => a.id));

  const corpData = allAnswers.get('corporations')?.['corporationsData'] as Array<Record<string, unknown>> | undefined;
  const activeCorps = new Set((corpData || []).map((_, i) => `corp_${i}`));

  const propData = allAnswers.get('realEstate')?.['propertiesData'] as Array<Record<string, unknown>> | undefined;
  const activeProps = new Set((propData || []).map((_, i) => `prop_${i}`));
  if (allAnswers.get('realEstate')?.['primaryHomeData']) {
    activeProps.add('prop_primary');
  }

  let changed = false;
  const cleanedIntents = intents.map((record) => {
    let recordChanged = false;
    const asset = record['asset'] as Record<string, unknown> | undefined;
    if (asset?.assetId && asset.assetSourceSectionId === 'corporations' && !activeCorps.has(asset.assetId as string)) {
      recordChanged = true;
    }
    if (asset?.assetId && asset.assetSourceSectionId === 'realEstate' && !activeProps.has(asset.assetId as string)) {
      recordChanged = true;
    }

    const cleanRecipientIds = (ids: unknown): string[] => {
      if (!Array.isArray(ids)) return [];
      return ids.filter((id) => typeof id === 'string' && (activePeople.has(id) || id.startsWith('other_')));
    };

    const cleanRecipients = (recipients: unknown): Array<Record<string, unknown>> => {
      if (!Array.isArray(recipients)) return [];
      return recipients.map((r) => {
        if (r && typeof r === 'object') {
          const rr = r as Record<string, unknown>;
          if (rr.personId && !activePeople.has(rr.personId as string) && !((rr.personId as string).startsWith('other_'))) {
            recordChanged = true;
            return { ...rr, personId: undefined };
          }
        }
        return r;
      });
    };

    const scenarios = ['firstDeath', 'bothDeceased', 'noSurvivingDescendants'] as const;
    const updatedScenarios: Record<string, unknown> = {};
    for (const field of scenarios) {
      const scenario = record[field] as Record<string, unknown> | undefined;
      if (!scenario) continue;
      const cleanedIds = cleanRecipientIds(scenario.recipientIds);
      if (cleanedIds.length !== (scenario.recipientIds as string[] | undefined)?.length) recordChanged = true;
      const cleanedRecipients = cleanRecipients(scenario.recipients);
      updatedScenarios[field] = { ...scenario, recipientIds: cleanedIds, recipients: cleanedRecipients };
    }

    const stayFamilyIds = cleanRecipientIds(record.stayInFamilyRecipientIds);
    if (stayFamilyIds.length !== (record.stayInFamilyRecipientIds as string[] | undefined)?.length) recordChanged = true;

    const businessBranch = record.businessBranch as Record<string, unknown> | undefined;
    let cleanedBranch: Record<string, unknown> | undefined;
    if (businessBranch) {
      const profIds = (businessBranch.professionalContactIds as string[]) || [];
      const cleanedProfIds = profIds.filter((id) => activeAdvisors.has(id));
      if (cleanedProfIds.length !== profIds.length) recordChanged = true;
      const cleanedBranchRecipients = cleanRecipients(businessBranch.ownershipSuccessionRecipients);
      const mgmtPersonId = businessBranch.managementSuccessionPersonId as string | undefined;
      if (mgmtPersonId && !activePeople.has(mgmtPersonId) && !mgmtPersonId.startsWith('other_')) {
        recordChanged = true;
        cleanedBranch = { ...businessBranch, professionalContactIds: cleanedProfIds, ownershipSuccessionRecipients: cleanedBranchRecipients, managementSuccessionPersonId: undefined, managementSuccessionPersonName: undefined };
      } else {
        cleanedBranch = { ...businessBranch, professionalContactIds: cleanedProfIds, ownershipSuccessionRecipients: cleanedBranchRecipients };
      }
    }

    if (recordChanged) {
      changed = true;
      return {
        ...record,
        ...updatedScenarios,
        stayInFamilyRecipientIds: stayFamilyIds,
        businessBranch: cleanedBranch || businessBranch,
      };
    }
    return record;
  });

  if (changed) {
    const updated = new Map(allAnswers);
    updated.set('legacyIntent', { ...legacySection, legacyIntentsData: cleanedIntents });
    return updated;
  }

  return allAnswers;
}
