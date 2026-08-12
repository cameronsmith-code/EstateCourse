import type { AnyFinancialAsset, ContactInfo } from './financialAssetTypes';

export type ProfessionalAdvisor = {
  id: string;
  name: string;
  firm: string;
  phone: string;
  email: string;
  website: string;
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

export function getProfessionalAdvisors(allAnswers: AnswersMap): ProfessionalAdvisor[] {
  const profTeam = allAnswers.get('professionalTeam') || {};
  const advisors: ProfessionalAdvisor[] = [];

  if (profTeam['fpHasAdvisor'] === 'yes') {
    advisors.push({
      id: 'advisor_0',
      name: (profTeam['fpAdvisor1Name'] as string) || '',
      firm: (profTeam['fpAdvisor1Firm'] as string) || '',
      phone: (profTeam['fpAdvisor1Phone'] as string) || '',
      email: (profTeam['fpAdvisor1Email'] as string) || '',
      website: (profTeam['fpAdvisor1Website'] as string) || '',
      type: 'financial',
      active: true,
    });
  }

  if (profTeam['fpHasAdditionalAdvisor'] === 'yes') {
    advisors.push({
      id: 'advisor_1',
      name: (profTeam['fpAdvisor2Name'] as string) || '',
      firm: (profTeam['fpAdvisor2Firm'] as string) || '',
      phone: (profTeam['fpAdvisor2Phone'] as string) || '',
      email: (profTeam['fpAdvisor2Email'] as string) || '',
      website: (profTeam['fpAdvisor2Website'] as string) || '',
      type: 'financial',
      active: true,
    });
  }

  if (profTeam['acctHasAccountant'] === 'yes') {
    advisors.push({
      id: 'acct_0',
      name: (profTeam['acctAdvisor1Name'] as string) || '',
      firm: (profTeam['acctAdvisor1Firm'] as string) || '',
      phone: (profTeam['acctAdvisor1Phone'] as string) || '',
      email: (profTeam['acctAdvisor1Email'] as string) || '',
      website: '',
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
      type: 'insurance',
      active: true,
    });
  }

  return advisors;
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
