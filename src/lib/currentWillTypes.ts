export type ClientUnderstanding =
  | 'believesAligned'
  | 'partiallyAligned'
  | 'notAligned'
  | 'unsure'
  | 'notAddressed';

export type AlignmentSubjectType =
  | 'legacyAsset'
  | 'residue'
  | 'executor'
  | 'guardian'
  | 'childTrust'
  | 'business'
  | 'charity'
  | 'other';

export type EstatePlanAlignment = {
  subjectType: AlignmentSubjectType;
  subjectId?: string;
  subjectLabel?: string;
  intentionSourceId?: string;
  clientUnderstanding: ClientUnderstanding;
  understoodDifference?: unknown;
  needsProfessionalReview: boolean;
};

export type FirstDeathUnderstanding =
  | 'all_to_spouse'
  | 'mostly_to_spouse'
  | 'some_to_spouse_some_to_others'
  | 'another_arrangement'
  | 'not_sure';

export type FirstDeathException = {
  id: string;
  type: 'dollar' | 'percentage' | 'asset' | 'charity' | 'other';
  recipientName?: string;
  recipientPersonId?: string;
  assetId?: string;
  description?: string;
  amount?: string;
};

export type ResidueUnderstanding =
  | 'children_equally'
  | 'children_different_shares'
  | 'by_family_branch'
  | 'specific_beneficiaries'
  | 'family_and_other'
  | 'charity'
  | 'other'
  | 'not_sure';

export type ChildPredeceaseUnderstanding =
  | 'to_that_child_descendants'
  | 'divided_among_surviving_children'
  | 'goes_elsewhere'
  | 'depends'
  | 'not_sure';

export type InheritanceType =
  | 'outright'
  | 'held_in_trust'
  | 'different_arrangements'
  | 'not_sure';

export type TrustStage = {
  id: string;
  age?: string;
  fraction?: string;
  description?: string;
};

export type SpecificGift = {
  id: string;
  type: 'asset' | 'dollar' | 'percentage' | 'possession' | 'person' | 'charity' | 'other';
  recipientName?: string;
  recipientPersonId?: string;
  assetId?: string;
  description?: string;
  amount?: string;
};

export type CharitableGift = {
  id: string;
  charityName: string;
  form: 'fixed_amount' | 'percentage' | 'residue' | 'specific_asset' | 'other';
  amount?: string;
  instructions?: string;
};

export type UltimateContingencyUnderstanding =
  | 'extended_family'
  | 'specific_people'
  | 'friends'
  | 'charity'
  | 'combination'
  | 'other'
  | 'not_sure';

export type OverallConfidence =
  | 'very_confident'
  | 'mostly_confident'
  | 'not_sure'
  | 'knows_changes_needed'
  | 'long_time_since_review';

export type WillDocumentBasics = {
  hasWill?: 'yes' | 'no';
  willYear?: string;
  willLocation?: string;
  willJurisdiction?: string;
  hasSecondaryWill?: 'yes' | 'no';
  secondaryWillLocation?: string;
  secondaryWillJurisdiction?: string;
  lawyerFirm?: string;
  hasMeaningfulChanges?: 'yes' | 'no';
  meaningfulChangesDetails?: string;
};

export type ClientWillUnderstanding = {
  clientId: 'client1' | 'client2';
  clientName: string;
  documentBasics: WillDocumentBasics;
  familiarity?: 'very_familiar' | 'generally_familiar' | 'remember_main_parts' | 'not_very_familiar' | 'dont_remember';
  firstDeath?: FirstDeathUnderstanding;
  firstDeathExceptions?: FirstDeathException[];
  firstDeathExceptionHas?: 'yes' | 'no' | 'not_sure';
  residue?: ResidueUnderstanding;
  residueRecipients?: string[];
  childPredecease?: ChildPredeceaseUnderstanding;
  inheritanceType?: InheritanceType;
  trustStages?: TrustStage[];
  trustTrusteePersonId?: string;
  trustTrusteeName?: string;
  childSpecificArrangements?: Array<{
    childId: string;
    childName: string;
    hasDifferentArrangement: 'yes' | 'no' | 'not_sure';
    arrangementType?: 'discretionary_trust' | 'henson_style' | 'testamentary_trust' | 'lifetime_trust' | 'different_ages' | 'different_trustees' | 'other' | 'not_sure_type';
    description?: string;
  }>;
  specificGifts?: SpecificGift[];
  specificGiftsHas?: 'yes' | 'no' | 'not_sure';
  charitableGifts?: CharitableGift[];
  charitableGiftsHas?: 'yes' | 'no' | 'not_sure';
  ultimateContingency?: UltimateContingencyUnderstanding;
  ultimateContingencyRecipients?: string[];
  otherProvisions?: string;
  overallConfidence?: OverallConfidence;
  wantsToDiscussWithLawyer?: string;
  alignments: EstatePlanAlignment[];
};

export type CurrentWillData = {
  clients: ClientWillUnderstanding[];
  mirrorWills?: 'yes' | 'mostly' | 'no' | 'not_sure';
  reviewConfirmed?: 'yes' | 'needs_changes';
  planningRiskFlags: string[];
};

export function generateCurrentWillId(): string {
  return `cw_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 8)}`;
}

export function emptyClientWill(clientId: 'client1' | 'client2', clientName: string): ClientWillUnderstanding {
  return {
    clientId,
    clientName,
    documentBasics: {},
    alignments: [],
  };
}

export function generatePlanningRiskFlags(data: CurrentWillData): string[] {
  const flags: string[] = [];

  for (const client of data.clients) {
    const name = client.clientName;
    const db = client.documentBasics;

    if (db.hasWill === 'no') {
      flags.push(`${name} does not currently have a Will`);
    }

    if (db.hasWill === 'yes') {
      if (db.willYear) {
        const yearNum = parseInt(db.willYear, 10);
        const currentYear = new Date().getFullYear();
        if (!isNaN(yearNum) && currentYear - yearNum > 5) {
          flags.push(`${name}'s Will was prepared in ${db.willYear} — it may be due for a review`);
        }
      }
      if (!db.willYear) {
        flags.push(`The year ${name}'s Will was prepared is unknown — consider confirming when it was last reviewed`);
      }

      if (client.familiarity === 'not_very_familiar' || client.familiarity === 'dont_remember') {
        flags.push(`${name} has low familiarity with their current Will`);
      }

      for (const a of client.alignments) {
        if (a.clientUnderstanding === 'notAligned') {
          flags.push(`${name} believes their Will differs from their stated intention for ${a.subjectLabel || 'an item'} — potential planning gap`);
        }
        if (a.clientUnderstanding === 'unsure') {
          flags.push(`${name} is unsure whether their Will reflects their intention for ${a.subjectLabel || 'an item'} — worth confirming`);
        }
        if (a.clientUnderstanding === 'notAddressed') {
          flags.push(`${name} doesn't believe their Will specifically addresses ${a.subjectLabel || 'an item'} — potential planning gap`);
        }
      }

      if (client.residue === 'not_sure') {
        flags.push(`${name} is unsure who receives the residue of their estate under their Will`);
      }

      if (client.inheritanceType === 'not_sure') {
        flags.push(`${name} is unsure whether their children's inheritance is held in trust or paid outright`);
      }

      if (client.inheritanceType === 'held_in_trust' && (!client.trustStages || client.trustStages.length === 0)) {
        flags.push(`${name}'s Will may hold children's inheritance in trust but distribution ages are unknown`);
      }

      if (client.ultimateContingency === 'not_sure') {
        flags.push(`${name} is unsure who ultimately receives their estate if no descendants survive`);
      }

      if (client.overallConfidence === 'knows_changes_needed') {
        flags.push(`${name} already knows they want changes to their Will`);
      }
      if (client.overallConfidence === 'long_time_since_review') {
        flags.push(`${name} hasn't reviewed their Will in a long time`);
      }
    }
  }

  if (data.mirrorWills === 'not_sure') {
    flags.push('It is unclear whether the couple\'s Wills follow the same plan');
  }

  return flags;
}

export function getUnderstandingLabel(understanding: ClientUnderstanding): string {
  switch (understanding) {
    case 'believesAligned':
      return 'Client believes intention is reflected';
    case 'partiallyAligned':
      return 'Some of it is reflected';
    case 'notAligned':
      return 'Client believes Will differs from intention';
    case 'unsure':
      return 'Client is unsure';
    case 'notAddressed':
      return "Client doesn't believe Will addresses this";
  }
}

export function getUnderstandingColor(understanding: ClientUnderstanding): string {
  switch (understanding) {
    case 'believesAligned':
      return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    case 'partiallyAligned':
      return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    case 'notAligned':
      return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    case 'unsure':
      return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    case 'notAddressed':
      return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
  }
}
