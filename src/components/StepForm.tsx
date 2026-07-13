import React, { useState, useEffect, FormEvent } from 'react';
import { Step } from '../lib/steps';
import FormField from './FormField';
import VideoPlayer from './VideoPlayer';
import SoleProprietorshipDetails, { SoleProprietorshipData } from './SoleProprietorshipDetails';
import PartnershipDetails, { PartnershipData } from './PartnershipDetails';
import Subsection from './Subsection';
import { ChevronLeft, ChevronRight, Check, Trash2, Info, X } from 'lucide-react';

type StepFormProps = {
  step: Step;
  answers: Record<string, unknown>;
  allAnswers?: Map<number, Record<string, unknown>>;
  isFirstStep: boolean;
  isLastStep: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onAnswerChange: (key: string, value: unknown) => void;
  onClearCurrentStep: () => void;
  currentStepNumber: number;
};

function TrustBeneficiariesSection({
  label,
  count,
  data,
  onChange,
}: {
  label: string;
  count: number;
  data: Array<Record<string, string>>;
  onChange: (index: number, field: string, value: string) => void;
}) {
  return (
    <div className="space-y-6 mt-6">
      <h3 className="text-xl font-semibold text-white">{label}</h3>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
          <h4 className="text-lg font-semibold text-white mb-4">Beneficiary {index + 1}</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Beneficiary Name *</label>
              <input type="text" value={data[index]?.beneficiaryName || ''} onChange={(e) => onChange(index, 'beneficiaryName', e.target.value)} placeholder="Enter beneficiary name" className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Relationship to Settlor *</label>
              <input type="text" value={data[index]?.relationshipToSettlor || ''} onChange={(e) => onChange(index, 'relationshipToSettlor', e.target.value)} placeholder="e.g., Daughter, Son, Spouse, etc." className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Country of Residence</label>
              <input type="text" value={data[index]?.countryOfResidence || ''} onChange={(e) => onChange(index, 'countryOfResidence', e.target.value)} placeholder="Enter country of residence" className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
              <input type="tel" value={data[index]?.phoneNumber || ''} onChange={(e) => onChange(index, 'phoneNumber', e.target.value)} placeholder="Enter phone number" className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input type="email" value={data[index]?.emailAddress || ''} onChange={(e) => onChange(index, 'emailAddress', e.target.value)} placeholder="Enter email address" className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function StepForm({
  step,
  answers,
  allAnswers,
  isFirstStep,
  isLastStep,
  onNext,
  onPrevious,
  onAnswerChange,
  onClearCurrentStep,
  currentStepNumber,
}: StepFormProps) {
  const [validationError, setValidationError] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [openInfoTooltip, setOpenInfoTooltip] = useState<string | null>(null);

  useEffect(() => {
    const client1IsCameronSmith = answers['client1IsCameronSmithAdvisor'];
    const client1AdvisorCount = parseInt(answers['client1FinancialAdvisors'] as string) || 0;

    if (client1IsCameronSmith === 'yes' && client1AdvisorCount > 0) {
      const currentAdvisorsData = (answers['client1FinancialAdvisorsData'] as Array<Record<string, string>>) || [];

      if (!currentAdvisorsData[0] || !currentAdvisorsData[0].name) {
        const cameronSmithData = {
          name: 'Cameron Smith',
          firm: 'Clarify Wealth / Investment Planning Counsel',
          phone: '(647) 448-5963',
          email: 'Cameron.Smith@ipcsecurities.com'
        };

        const updatedData = [...currentAdvisorsData];
        updatedData[0] = { ...cameronSmithData, ...updatedData[0] };
        onAnswerChange('client1FinancialAdvisorsData', updatedData);
      }
    }
  }, [answers['client1IsCameronSmithAdvisor'], answers['client1FinancialAdvisors']]);

  useEffect(() => {
    const client2IsCameronSmith = answers['client2IsCameronSmithAdvisor'];
    const client2AdvisorCount = parseInt(answers['client2FinancialAdvisors'] as string) || 0;

    if (client2IsCameronSmith === 'yes' && client2AdvisorCount > 0) {
      const currentAdvisorsData = (answers['client2FinancialAdvisorsData'] as Array<Record<string, string>>) || [];

      if (!currentAdvisorsData[0] || !currentAdvisorsData[0].name) {
        const cameronSmithData = {
          name: 'Cameron Smith',
          firm: 'Clarify Wealth / Investment Planning Counsel',
          phone: '(647) 448-5963',
          email: 'Cameron.Smith@ipcsecurities.com'
        };

        const updatedData = [...currentAdvisorsData];
        updatedData[0] = { ...cameronSmithData, ...updatedData[0] };
        onAnswerChange('client2FinancialAdvisorsData', updatedData);
      }
    }
  }, [answers['client2IsCameronSmithAdvisor'], answers['client2FinancialAdvisors']]);

  useEffect(() => {
    if (answers['spouseIsPoaPersonalCare'] === 'no') {
      if (answers['spousePoaPersonalCareHasDocCopy'] !== undefined) {
        onAnswerChange('spousePoaPersonalCareHasDocCopy', undefined);
      }
    }
  }, [answers['spouseIsPoaPersonalCare']]);

  useEffect(() => {
    if (answers['spouseIsPoaProperty'] === 'no') {
      if (answers['spousePoaPropertyHasDocCopy'] !== undefined) {
        onAnswerChange('spousePoaPropertyHasDocCopy', undefined);
      }
    }
  }, [answers['spouseIsPoaProperty']]);

  useEffect(() => {
    if (answers['client2SpouseIsPoaPersonalCare'] === 'no') {
      if (answers['client2SpousePoaPersonalCareHasDocCopy'] !== undefined) {
        onAnswerChange('client2SpousePoaPersonalCareHasDocCopy', undefined);
      }
    }
  }, [answers['client2SpouseIsPoaPersonalCare']]);

  useEffect(() => {
    if (answers['client2SpouseIsPoaProperty'] === 'no') {
      if (answers['client2SpousePoaPropertyHasDocCopy'] !== undefined) {
        onAnswerChange('client2SpousePoaPropertyHasDocCopy', undefined);
      }
    }
  }, [answers['client2SpouseIsPoaProperty']]);

  useEffect(() => {
    if (answers['client1HasSecondaryWill'] === 'no') {
      const keysToClear = [
        'client1SecondaryWillLocation',
        'client1SecondaryWillJurisdiction'
      ];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['client1HasSecondaryWill']]);

  useEffect(() => {
    if (answers['client2HasSecondaryWill'] === 'no') {
      const keysToClear = [
        'client2SecondaryWillLocation',
        'client2SecondaryWillJurisdiction'
      ];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['client2HasSecondaryWill']]);

  useEffect(() => {
    if (answers['client1HasWill'] === 'no') {
      const keysToClear = [
        'client1WillYear',
        'client1WillPreparedInCanada',
        'client1WillCountry',
        'client1WillProvince',
        'client1WillStorageLocation',
        'client1HasDigitalWillCopy',
        'client1DigitalWillLocation',
        'client1HasSecondaryWill',
        'client1SecondaryWillSameTimeAndJurisdiction',
        'client1SecondaryWillJurisdiction',
        'client1SecondaryWillDate',
        'client1HasHensonTrust'
      ];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['client1HasWill']]);

  useEffect(() => {
    if (answers['client2HasWill'] === 'no') {
      const keysToClear = [
        'client2WillYear',
        'client2WillPreparedInCanada',
        'client2WillCountry',
        'client2WillProvince',
        'client2WillStorageLocation',
        'client2HasDigitalWillCopy',
        'client2DigitalWillLocation',
        'client2HasSecondaryWill',
        'client2SecondaryWillSameTimeAndJurisdiction',
        'client2SecondaryWillJurisdiction',
        'client2SecondaryWillDate'
      ];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['client2HasWill']]);

  useEffect(() => {
    if (answers['client1WillPreparedInCanada'] === 'yes') {
      if (answers['client1WillCountry'] !== undefined) {
        onAnswerChange('client1WillCountry', undefined);
      }
    } else if (answers['client1WillPreparedInCanada'] === 'no') {
      if (answers['client1WillProvince'] !== undefined) {
        onAnswerChange('client1WillProvince', undefined);
      }
    }
  }, [answers['client1WillPreparedInCanada']]);

  useEffect(() => {
    if (answers['client2WillPreparedInCanada'] === 'yes') {
      if (answers['client2WillCountry'] !== undefined) {
        onAnswerChange('client2WillCountry', undefined);
      }
    } else if (answers['client2WillPreparedInCanada'] === 'no') {
      if (answers['client2WillProvince'] !== undefined) {
        onAnswerChange('client2WillProvince', undefined);
      }
    }
  }, [answers['client2WillPreparedInCanada']]);

  useEffect(() => {
    if (answers['client1HasDigitalWillCopy'] === 'no') {
      if (answers['client1DigitalWillLocation'] !== undefined) {
        onAnswerChange('client1DigitalWillLocation', undefined);
      }
    }
  }, [answers['client1HasDigitalWillCopy']]);

  useEffect(() => {
    if (answers['client2HasDigitalWillCopy'] === 'no') {
      if (answers['client2DigitalWillLocation'] !== undefined) {
        onAnswerChange('client2DigitalWillLocation', undefined);
      }
    }
  }, [answers['client2HasDigitalWillCopy']]);

  useEffect(() => {
    if (answers['client1SecondaryWillSameTimeAndJurisdiction'] === 'yes') {
      const keysToClear = [
        'client1SecondaryWillJurisdiction',
        'client1SecondaryWillDate'
      ];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['client1SecondaryWillSameTimeAndJurisdiction']]);

  useEffect(() => {
    if (answers['client2SecondaryWillSameTimeAndJurisdiction'] === 'yes') {
      const keysToClear = [
        'client2SecondaryWillJurisdiction',
        'client2SecondaryWillDate'
      ];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['client2SecondaryWillSameTimeAndJurisdiction']]);

  useEffect(() => {
    if (answers['client1HasFuneralArrangements'] === 'no') {
      if (answers['client1FuneralArrangementsLocation'] !== undefined) {
        onAnswerChange('client1FuneralArrangementsLocation', undefined);
      }
    }
  }, [answers['client1HasFuneralArrangements']]);

  useEffect(() => {
    if (answers['client2HasFuneralArrangements'] === 'no') {
      if (answers['client2FuneralArrangementsLocation'] !== undefined) {
        onAnswerChange('client2FuneralArrangementsLocation', undefined);
      }
    }
  }, [answers['client2HasFuneralArrangements']]);

  useEffect(() => {
    if (answers['client1HasDiscussedFuneral'] === 'no') {
      const keysToClear = [
        'client1FuneralWrittenDown',
        'client1FuneralDocLocation'
      ];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['client1HasDiscussedFuneral']]);

  useEffect(() => {
    if (answers['client2HasDiscussedFuneral'] === 'no') {
      const keysToClear = [
        'client2FuneralWrittenDown',
        'client2FuneralDocLocation'
      ];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['client2HasDiscussedFuneral']]);

  useEffect(() => {
    if (answers['client1FuneralWrittenDown'] === 'no') {
      if (answers['client1FuneralDocLocation'] !== undefined) {
        onAnswerChange('client1FuneralDocLocation', undefined);
      }
    }
  }, [answers['client1FuneralWrittenDown']]);

  useEffect(() => {
    if (answers['client2FuneralWrittenDown'] === 'no') {
      if (answers['client2FuneralDocLocation'] !== undefined) {
        onAnswerChange('client2FuneralDocLocation', undefined);
      }
    }
  }, [answers['client2FuneralWrittenDown']]);

  useEffect(() => {
    if (answers['client1HasPoaPersonalCare'] === 'no') {
      const keysToClear = [
        'client1SpouseIsPoaPersonalCare',
        'client1PoaPersonalCareName',
        'client1PoaPersonalCarePhone',
        'client1PoaPersonalCareEmail',
        'client1PoaPersonalCareRelationship',
        'client1PoaPersonalCareIsCanadaResident',
        'client1PoaPersonalCareCountry',
        'client1PoaPersonalCareProvince',
        'client1PoaPersonalCareCity',
        'client1PoaPersonalCareHasDocCopy'
      ];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['client1HasPoaPersonalCare']]);

  useEffect(() => {
    if (answers['client2HasPoaPersonalCare'] === 'no') {
      const keysToClear = [
        'client2SpouseIsPoaPersonalCare',
        'client2PoaPersonalCareName',
        'client2PoaPersonalCarePhone',
        'client2PoaPersonalCareEmail',
        'client2PoaPersonalCareRelationship',
        'client2PoaPersonalCareIsCanadaResident',
        'client2PoaPersonalCareCountry',
        'client2PoaPersonalCareProvince',
        'client2PoaPersonalCareCity',
        'client2PoaPersonalCareHasDocCopy'
      ];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['client2HasPoaPersonalCare']]);

  useEffect(() => {
    if (answers['client1SpouseIsPoaPersonalCare'] === 'yes') {
      const keysToClear = [
        'client1PoaPersonalCareName',
        'client1PoaPersonalCarePhone',
        'client1PoaPersonalCareEmail',
        'client1PoaPersonalCareRelationship',
        'client1PoaPersonalCareIsCanadaResident',
        'client1PoaPersonalCareCountry',
        'client1PoaPersonalCareProvince',
        'client1PoaPersonalCareCity',
        'client1PoaPersonalCareHasDocCopy'
      ];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['client1SpouseIsPoaPersonalCare']]);

  useEffect(() => {
    if (answers['client2SpouseIsPoaPersonalCare'] === 'yes') {
      const keysToClear = [
        'client2PoaPersonalCareName',
        'client2PoaPersonalCarePhone',
        'client2PoaPersonalCareEmail',
        'client2PoaPersonalCareRelationship',
        'client2PoaPersonalCareIsCanadaResident',
        'client2PoaPersonalCareCountry',
        'client2PoaPersonalCareProvince',
        'client2PoaPersonalCareCity',
        'client2PoaPersonalCareHasDocCopy'
      ];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['client2SpouseIsPoaPersonalCare']]);

  useEffect(() => {
    if (answers['client1PoaPersonalCareIsCanadaResident'] === 'yes') {
      if (answers['client1PoaPersonalCareCountry'] !== undefined) {
        onAnswerChange('client1PoaPersonalCareCountry', undefined);
      }
    } else if (answers['client1PoaPersonalCareIsCanadaResident'] === 'no') {
      if (answers['client1PoaPersonalCareProvince'] !== undefined) {
        onAnswerChange('client1PoaPersonalCareProvince', undefined);
      }
    }
  }, [answers['client1PoaPersonalCareIsCanadaResident']]);

  useEffect(() => {
    if (answers['client2PoaPersonalCareIsCanadaResident'] === 'yes') {
      if (answers['client2PoaPersonalCareCountry'] !== undefined) {
        onAnswerChange('client2PoaPersonalCareCountry', undefined);
      }
    } else if (answers['client2PoaPersonalCareIsCanadaResident'] === 'no') {
      if (answers['client2PoaPersonalCareProvince'] !== undefined) {
        onAnswerChange('client2PoaPersonalCareProvince', undefined);
      }
    }
  }, [answers['client2PoaPersonalCareIsCanadaResident']]);

  useEffect(() => {
    const isMarried = answers['maritalStatus'] === 'married' || answers['maritalStatus'] === 'common_law';
    if (!isMarried) {
      const keysToClear = [
        'spouseName', 'spouseDateOfBirth', 'spouseEmail', 'spousePhone',
        'spouseSameAddress', 'spouseAddress', 'spouseCity', 'spouseProvince', 'spousePostalCode',
        'hasMarriageContract', 'marriageContractLocation',
        'client2HasPreviousRelationship', 'client2NumberOfPreviousRelationships'
      ];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['maritalStatus']]);

  useEffect(() => {
    if (answers['hasMarriageContract'] !== 'yes') {
      if (answers['marriageContractLocation'] !== undefined) {
        onAnswerChange('marriageContractLocation', undefined);
      }
    }
  }, [answers['hasMarriageContract']]);

  useEffect(() => {
    if (answers['hasChildren'] !== 'yes') {
      if (answers['numberOfChildren'] !== undefined) {
        onAnswerChange('numberOfChildren', undefined);
      }
    }
  }, [answers['hasChildren']]);

  useEffect(() => {
    if (answers['client1HasPreviousRelationship'] !== 'yes') {
      if (answers['client1NumberOfPreviousRelationships'] !== undefined) {
        onAnswerChange('client1NumberOfPreviousRelationships', undefined);
      }
    }
  }, [answers['client1HasPreviousRelationship']]);

  useEffect(() => {
    if (answers['client2HasPreviousRelationship'] !== 'yes') {
      if (answers['client2NumberOfPreviousRelationships'] !== undefined) {
        onAnswerChange('client2NumberOfPreviousRelationships', undefined);
      }
    }
  }, [answers['client2HasPreviousRelationship']]);

  useEffect(() => {
    if (answers['hasFamilyTrust'] !== 'yes') {
      const keysToClear = [
        'trustLegalName', 'trustDeedLocation', 'trustYearEstablished',
        'trustBeneficiariesCount', 'trustBeneficiariesData',
        'hasAdditionalFamilyTrust',
      ];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['hasFamilyTrust']]);

  useEffect(() => {
    if (answers['hasAdditionalFamilyTrust'] !== 'yes') {
      const keysToClear = [
        'trust2LegalName', 'trust2DeedLocation', 'trust2YearEstablished',
        'trust2BeneficiariesCount', 'trust2BeneficiariesData',
        'hasAdditionalFamilyTrust2',
      ];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['hasAdditionalFamilyTrust']]);

  useEffect(() => {
    if (answers['hasAdditionalFamilyTrust2'] !== 'yes') {
      const keysToClear = [
        'trust3LegalName', 'trust3DeedLocation', 'trust3YearEstablished',
        'trust3BeneficiariesCount', 'trust3BeneficiariesData',
        'hasAdditionalFamilyTrust3',
      ];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['hasAdditionalFamilyTrust2']]);

  useEffect(() => {
    if (answers['hasAdditionalFamilyTrust3'] !== 'yes') {
      const keysToClear = [
        'trust4LegalName', 'trust4DeedLocation', 'trust4YearEstablished',
        'trust4BeneficiariesCount', 'trust4BeneficiariesData',
      ];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['hasAdditionalFamilyTrust3']]);

  useEffect(() => {
    if (answers['ownsCorporation'] !== 'yes') {
      const keysToClear = ['numberOfCorporations', 'corporationsData'];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['ownsCorporation']]);

  useEffect(() => {
    if (answers['client1HasPoaProperty'] === 'no') {
      const keysToClear = [
        'client1SpouseIsPoaProperty',
        'client1PoaPropertyCount',
        'client1PoaPropertyData',
        'client1AlternatePoaPropertyCount',
        'client1AlternatePoaPropertyData'
      ];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['client1HasPoaProperty']]);

  useEffect(() => {
    if (answers['client2HasPoaProperty'] === 'no') {
      const keysToClear = [
        'client2SpouseIsPoaProperty',
        'client2PoaPropertyCount',
        'client2PoaPropertyData',
        'client2AlternatePoaPropertyCount',
        'client2AlternatePoaPropertyData'
      ];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['client2HasPoaProperty']]);

  useEffect(() => {
    if (answers['client1HasAlternatePoaPersonalCare'] !== 'yes') {
      const keysToClear = ['client1AlternatePoaPersonalCareCount', 'client1AlternatePoaPersonalCareData'];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['client1HasAlternatePoaPersonalCare']]);

  useEffect(() => {
    if (answers['client2HasAlternatePoaPersonalCare'] !== 'yes') {
      const keysToClear = ['client2AlternatePoaPersonalCareCount', 'client2AlternatePoaPersonalCareData'];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['client2HasAlternatePoaPersonalCare']]);

  useEffect(() => {
    if (answers['client1HasPension'] !== 'yes') {
      if (answers['client1PensionsData'] !== undefined) {
        onAnswerChange('client1PensionsData', undefined);
      }
    }
  }, [answers['client1HasPension']]);

  useEffect(() => {
    if (answers['client2HasPension'] !== 'yes') {
      if (answers['client2PensionsData'] !== undefined) {
        onAnswerChange('client2PensionsData', undefined);
      }
    }
  }, [answers['client2HasPension']]);

  useEffect(() => {
    const count = parseInt(answers['trustBeneficiariesCount'] as string) || 0;
    const data = answers['trustBeneficiariesData'] as Array<unknown> | undefined;
    if (data && data.length > count) {
      onAnswerChange('trustBeneficiariesData', data.slice(0, count));
    }
  }, [answers['trustBeneficiariesCount']]);

  useEffect(() => {
    const count = parseInt(answers['numberOfCorporations'] as string) || 0;
    const data = answers['corporationsData'] as Array<unknown> | undefined;
    if (data && data.length > count) {
      onAnswerChange('corporationsData', data.slice(0, count));
    }
  }, [answers['numberOfCorporations']]);

  useEffect(() => {
    const count = parseInt(answers['client1PoaPersonalCareCount'] as string) || 0;
    const data = answers['client1PoaPersonalCareData'] as Array<unknown> | undefined;
    if (data && data.length > count) {
      onAnswerChange('client1PoaPersonalCareData', data.slice(0, count));
    }
  }, [answers['client1PoaPersonalCareCount']]);

  useEffect(() => {
    const count = parseInt(answers['client1AlternatePoaPersonalCareCount'] as string) || 0;
    const data = answers['client1AlternatePoaPersonalCareData'] as Array<unknown> | undefined;
    if (data && data.length > count) {
      onAnswerChange('client1AlternatePoaPersonalCareData', data.slice(0, count));
    }
  }, [answers['client1AlternatePoaPersonalCareCount']]);

  useEffect(() => {
    const count = parseInt(answers['client1PoaPropertyCount'] as string) || 0;
    const data = answers['client1PoaPropertyData'] as Array<unknown> | undefined;
    if (data && data.length > count) {
      onAnswerChange('client1PoaPropertyData', data.slice(0, count));
    }
  }, [answers['client1PoaPropertyCount']]);

  useEffect(() => {
    const count = parseInt(answers['client1FinancialAdvisors'] as string) || 0;
    const data = answers['client1FinancialAdvisorsData'] as Array<unknown> | undefined;
    if (data && data.length > count) {
      onAnswerChange('client1FinancialAdvisorsData', data.slice(0, count));
    }
  }, [answers['client1FinancialAdvisors']]);

  useEffect(() => {
    const count = parseInt(answers['client2PoaPersonalCareCount'] as string) || 0;
    const data = answers['client2PoaPersonalCareData'] as Array<unknown> | undefined;
    if (data && data.length > count) {
      onAnswerChange('client2PoaPersonalCareData', data.slice(0, count));
    }
  }, [answers['client2PoaPersonalCareCount']]);

  useEffect(() => {
    const count = parseInt(answers['client2AlternatePoaPersonalCareCount'] as string) || 0;
    const data = answers['client2AlternatePoaPersonalCareData'] as Array<unknown> | undefined;
    if (data && data.length > count) {
      onAnswerChange('client2AlternatePoaPersonalCareData', data.slice(0, count));
    }
  }, [answers['client2AlternatePoaPersonalCareCount']]);

  useEffect(() => {
    const count = parseInt(answers['client2PoaPropertyCount'] as string) || 0;
    const data = answers['client2PoaPropertyData'] as Array<unknown> | undefined;
    if (data && data.length > count) {
      onAnswerChange('client2PoaPropertyData', data.slice(0, count));
    }
  }, [answers['client2PoaPropertyCount']]);

  useEffect(() => {
    const count = parseInt(answers['client2FinancialAdvisors'] as string) || 0;
    const data = answers['client2FinancialAdvisorsData'] as Array<unknown> | undefined;
    if (data && data.length > count) {
      onAnswerChange('client2FinancialAdvisorsData', data.slice(0, count));
    }
  }, [answers['client2FinancialAdvisors']]);

  useEffect(() => {
    const count = parseInt(answers['client1EstateTrusteeCount'] as string) || 0;
    const data = answers['client1EstateTrusteeData'] as Array<unknown> | undefined;
    if (data && data.length > count) {
      onAnswerChange('client1EstateTrusteeData', data.slice(0, count));
    }
  }, [answers['client1EstateTrusteeCount']]);

  useEffect(() => {
    const count = parseInt(answers['client2EstateTrusteeCount'] as string) || 0;
    const data = answers['client2EstateTrusteeData'] as Array<unknown> | undefined;
    if (data && data.length > count) {
      onAnswerChange('client2EstateTrusteeData', data.slice(0, count));
    }
  }, [answers['client2EstateTrusteeCount']]);

  useEffect(() => {
    const count = parseInt(answers['mixedJointBankCount'] as string) || 0;
    const data = answers['mixedJointInstitutionsData'] as Array<unknown> | undefined;
    if (data && data.length > count) {
      onAnswerChange('mixedJointInstitutionsData', data.slice(0, count));
    }
  }, [answers['mixedJointBankCount']]);

  useEffect(() => {
    const count = parseInt(answers['mixedClient1BankCount'] as string) || 0;
    const data = answers['mixedClient1InstitutionsData'] as Array<unknown> | undefined;
    if (data && data.length > count) {
      onAnswerChange('mixedClient1InstitutionsData', data.slice(0, count));
    }
  }, [answers['mixedClient1BankCount']]);

  useEffect(() => {
    const count = parseInt(answers['mixedClient2BankCount'] as string) || 0;
    const data = answers['mixedClient2InstitutionsData'] as Array<unknown> | undefined;
    if (data && data.length > count) {
      onAnswerChange('mixedClient2InstitutionsData', data.slice(0, count));
    }
  }, [answers['mixedClient2BankCount']]);

  useEffect(() => {
    const count = parseInt(answers['additionalPropertiesCount'] as string) || 0;
    const data = answers['propertiesData'] as Array<unknown> | undefined;
    if (data && data.length > count) {
      onAnswerChange('propertiesData', data.slice(0, count));
    }
  }, [answers['additionalPropertiesCount']]);

  useEffect(() => {
    const count = parseInt((allAnswers?.get(1) || {})['numberOfChildren'] as string) || 0;
    const data = answers['childrenData'] as Array<unknown> | undefined;
    if (data && data.length > count) {
      onAnswerChange('childrenData', data.slice(0, count));
    }
  }, [(allAnswers?.get(1) || {})['numberOfChildren']]);

  useEffect(() => {
    const count = parseInt((allAnswers?.get(1) || {})['client1NumberOfPreviousRelationships'] as string) || 0;
    const data = answers['client1PreviousRelationshipsData'] as Array<unknown> | undefined;
    if (data && data.length > count) {
      onAnswerChange('client1PreviousRelationshipsData', data.slice(0, count));
    }
  }, [(allAnswers?.get(1) || {})['client1NumberOfPreviousRelationships']]);

  useEffect(() => {
    const count = parseInt((allAnswers?.get(1) || {})['client2NumberOfPreviousRelationships'] as string) || 0;
    const data = answers['client2PreviousRelationshipsData'] as Array<unknown> | undefined;
    if (data && data.length > count) {
      onAnswerChange('client2PreviousRelationshipsData', data.slice(0, count));
    }
  }, [(allAnswers?.get(1) || {})['client2NumberOfPreviousRelationships']]);

  useEffect(() => {
    if (answers['hasPartnership'] !== 'yes') {
      const keysToClear = ['partnershipCount', 'client1PartnershipsData'];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['hasPartnership']]);

  useEffect(() => {
    if (answers['client2HasPartnership'] !== 'yes') {
      const keysToClear = ['client2PartnershipCount', 'client2PartnershipsData'];
      keysToClear.forEach(key => {
        if (answers[key] !== undefined) {
          onAnswerChange(key, undefined);
        }
      });
    }
  }, [answers['client2HasPartnership']]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValidationError('');

    const basicAnswers = allAnswers?.get(1) || {};
    const numberOfChildren = basicAnswers['numberOfChildren'];
    const client1NumberOfPreviousRelationships = basicAnswers['client1NumberOfPreviousRelationships'];
    const client2NumberOfPreviousRelationships = basicAnswers['client2NumberOfPreviousRelationships'];

    if (step.id === 2) {
      const client1Count = client1NumberOfPreviousRelationships ? parseInt(client1NumberOfPreviousRelationships as string) : 0;
      const client2Count = client2NumberOfPreviousRelationships ? parseInt(client2NumberOfPreviousRelationships as string) : 0;
      const totalCount = client1Count + client2Count;

      if (totalCount > 0) {
        const client1PreviousRelationshipsData = answers['client1PreviousRelationshipsData'] as Array<Record<string, string>> | undefined;
        const client2PreviousRelationshipsData = answers['client2PreviousRelationshipsData'] as Array<Record<string, string>> | undefined;

        if (client1Count > 0) {
          if (!client1PreviousRelationshipsData || client1PreviousRelationshipsData.length < client1Count) {
            setValidationError('Please fill in details for all previous relationships.');
            return;
          }

          for (let i = 0; i < client1Count; i++) {
            const relationship = client1PreviousRelationshipsData[i];
            if (!relationship?.name) {
              setValidationError(`Please fill in the name for previous relationship ${i + 1}.`);
              return;
            }
            if (relationship?.hasSpousalSupport === 'yes' && !relationship?.spousalSupportType) {
              setValidationError(`Please specify if you are paying or receiving spousal support for relationship ${i + 1}.`);
              return;
            }
          }
        }

        if (client2Count > 0) {
          if (!client2PreviousRelationshipsData || client2PreviousRelationshipsData.length < client2Count) {
            setValidationError('Please fill in details for all previous relationships.');
            return;
          }

          for (let i = 0; i < client2Count; i++) {
            const relationship = client2PreviousRelationshipsData[i];
            if (!relationship?.name) {
              setValidationError(`Please fill in the name for previous relationship ${i + 1}.`);
              return;
            }
            if (relationship?.hasSpousalSupport === 'yes' && !relationship?.spousalSupportType) {
              setValidationError(`Please specify if paying or receiving spousal support for relationship ${i + 1}.`);
              return;
            }
          }
        }
      }
    } else if (step.id === 3) {
      if (!numberOfChildren) {
        setValidationError('Please go back and specify number of children.');
        return;
      }

      const childCount = numberOfChildren === '6+' ? 6 : parseInt(numberOfChildren as string);
      const childrenData = answers['childrenData'] as Array<Record<string, string>> | undefined;

      if (!childrenData || childrenData.length < childCount) {
        setValidationError('Please fill in details for all children.');
        return;
      }

      for (let i = 0; i < childCount; i++) {
        const child = childrenData[i];
        if (!child?.name || !child?.dateOfBirth) {
          setValidationError(`Please fill in name and date of birth for child ${i + 1}.`);
          return;
        }
      }
    } else if (step.id === 4) {
      if (answers['hasFamilyTrust'] === 'yes') {
        if (!answers['trustBeneficiariesCount']) {
          setValidationError('Please specify the number of beneficiaries for the trust.');
          return;
        }

        const beneficiariesCount = parseInt(answers['trustBeneficiariesCount'] as string);
        const trustBeneficiariesData = answers['trustBeneficiariesData'] as Array<Record<string, string>> | undefined;

        if (beneficiariesCount > 0) {
          if (!trustBeneficiariesData || trustBeneficiariesData.length < beneficiariesCount) {
            setValidationError('Please fill in details for all beneficiaries.');
            return;
          }

          for (let i = 0; i < beneficiariesCount; i++) {
            const beneficiary = trustBeneficiariesData[i];
            if (!beneficiary?.beneficiaryName || !beneficiary?.relationshipToSettlor) {
              setValidationError(`Please fill in name and relationship for beneficiary ${i + 1}.`);
              return;
            }
          }
        }
      }
    } else if (step.id === 6) {
      if (answers['ownsCorporation'] === 'yes') {
        if (!answers['numberOfCorporations']) {
          setValidationError('Please specify the number of corporations you own.');
          return;
        }

        const corporationsCount = parseInt(answers['numberOfCorporations'] as string);
        const corporationsData = answers['corporationsData'] as Array<Record<string, string>> | undefined;

        if (corporationsCount > 0) {
          if (!corporationsData || corporationsData.length < corporationsCount) {
            setValidationError('Please fill in details for all corporations.');
            return;
          }

          for (let i = 0; i < corporationsCount; i++) {
            const corporation = corporationsData[i];
            if (!corporation?.legalName) {
              setValidationError(`Please fill in the legal name for corporation ${i + 1}.`);
              return;
            }
            if (!corporation?.incorporatedInCanada) {
              setValidationError(`Please specify if corporation ${i + 1} was incorporated in Canada.`);
              return;
            }
            if (!corporation?.jurisdiction) {
              setValidationError(`Please specify the jurisdiction for corporation ${i + 1}.`);
              return;
            }
            if (!corporation?.corporationType) {
              setValidationError(`Please select the type for corporation ${i + 1}.`);
              return;
            }
            if (corporation?.corporationType === 'Other' && !corporation?.corporationTypeOther) {
              setValidationError(`Please describe the corporation type for corporation ${i + 1}.`);
              return;
            }
            if (!corporation?.owners || corporation.owners.trim() === '') {
              setValidationError(`Please select at least one owner for corporation ${i + 1}.`);
              return;
            }

            // Validate "Other" owners if the checkbox is checked
            if (corporation?.hasOtherOwner === 'true') {
              const otherOwnersData = corporation?.otherOwners ? JSON.parse(corporation.otherOwners) : [];
              if (otherOwnersData.length === 0 || otherOwnersData.some((owner: string) => !owner || owner.trim() === '')) {
                setValidationError(`Please enter all "Other" owner names for corporation ${i + 1}.`);
                return;
              }
            }
          }
        }
      }
    } else if (step.id === 13) {
      if (answers['client1HasPension'] === 'yes') {
        if (!client1PensionsData || client1PensionsData.length === 0) {
          setValidationError('Please add at least one pension for Client 1 or select "No".');
          return;
        }

        for (let i = 0; i < client1PensionsData.length; i++) {
          const pension = client1PensionsData[i];
          if (!pension?.employer) {
            setValidationError(`Please fill in the employer name for pension ${i + 1}.`);
            return;
          }
          if (!pension?.stillWorking) {
            setValidationError(`Please specify if still working for employer in pension ${i + 1}.`);
            return;
          }
          if (!pension?.documentLocation) {
            setValidationError(`Please specify the document location for pension ${i + 1}.`);
            return;
          }
        }
      }

      const basicAnswers = allAnswers?.get(1) || {};
      const hasSpouse = (basicAnswers['maritalStatus'] === 'married' || basicAnswers['maritalStatus'] === 'common_law');

      if (hasSpouse && answers['client2HasPension'] === 'yes') {
        if (!client2PensionsData || client2PensionsData.length === 0) {
          setValidationError('Please add at least one pension for Client 2 or select "No".');
          return;
        }

        for (let i = 0; i < client2PensionsData.length; i++) {
          const pension = client2PensionsData[i];
          if (!pension?.employer) {
            setValidationError(`Please fill in the employer name for pension ${i + 1}.`);
            return;
          }
          if (!pension?.stillWorking) {
            setValidationError(`Please specify if still working for employer in pension ${i + 1}.`);
            return;
          }
          if (!pension?.documentLocation) {
            setValidationError(`Please specify the document location for pension ${i + 1}.`);
            return;
          }
        }
      }
    } else {
      const requiredQuestions = step.questions.filter((q) => {
        if (!q.required) return false;
        if (q.condition && typeof q.condition === 'function') {
          const allFormData = Object.fromEntries(
            Array.from(allAnswers?.entries() || []).flatMap(([_, stepAnswers]) =>
              Object.entries(stepAnswers)
            )
          );
          return q.condition(allFormData);
        }
        return true;
      });
      const missingAnswers = requiredQuestions.filter((q) => !answers[q.key]);

      if (missingAnswers.length > 0) {
        setValidationError('Please answer all required questions before continuing.');
        return;
      }
    }

    onNext();
  };

  const numberOfChildren = allAnswers?.get(1)?.['numberOfChildren'];
  const childCount = numberOfChildren ? (numberOfChildren === '6+' ? 6 : parseInt(numberOfChildren as string)) : 0;
  const childrenData = (answers['childrenData'] as Array<Record<string, string>>) || Array(Math.max(0, childCount || 0)).fill(null).map(() => ({}));

  const client1NumberOfPreviousRelationships = allAnswers?.get(1)?.['client1NumberOfPreviousRelationships'];
  const client1PrevRelCount = client1NumberOfPreviousRelationships ? parseInt(client1NumberOfPreviousRelationships as string) : 0;
  const client1PreviousRelationshipsData = (answers['client1PreviousRelationshipsData'] as Array<Record<string, string>>) || Array(Math.max(0, client1PrevRelCount || 0)).fill(null).map(() => ({}));

  const client2NumberOfPreviousRelationships = allAnswers?.get(1)?.['client2NumberOfPreviousRelationships'];
  const client2PrevRelCount = client2NumberOfPreviousRelationships ? parseInt(client2NumberOfPreviousRelationships as string) : 0;
  const client2PreviousRelationshipsData = (answers['client2PreviousRelationshipsData'] as Array<Record<string, string>>) || Array(Math.max(0, client2PrevRelCount || 0)).fill(null).map(() => ({}));

  const CARE_COORD_CATEGORIES = ['family', 'school', 'doctor', 'other'] as const;

  const clearCareCoordCategory = (obj: Record<string, string>, cat: string) => {
    delete obj[`careCoord_${cat}_count`];
    for (let i = 0; i < 10; i++) {
      delete obj[`careCoord_${cat}_${i}_name`];
      delete obj[`careCoord_${cat}_${i}_phone`];
      delete obj[`careCoord_${cat}_${i}_email`];
      delete obj[`careCoord_${cat}_${i}_city`];
      delete obj[`careCoord_${cat}_${i}_province`];
      delete obj[`careCoord_${cat}_${i}_role`];
    }
  };

  const clearCareCoordFromPrefix = (obj: Record<string, string>, prefix: string) => {
    const cat = prefix.replace('careCoord_', '').replace('_', '');
    const count = parseInt(obj[`${prefix}_count`] || '1');
    for (let i = 1; i < count; i++) {
      delete obj[`${prefix}_${i}_name`];
      delete obj[`${prefix}_${i}_phone`];
      delete obj[`${prefix}_${i}_email`];
      delete obj[`${prefix}_${i}_city`];
      delete obj[`${prefix}_${i}_province`];
      delete obj[`${prefix}_${i}_role`];
    }
    obj[`${prefix}_count`] = '1';
  };

  const clearCareCoordFields = (obj: Record<string, string>) => {
    delete obj.careCoordinators;
    delete obj.careCoordSiblingNames;
    CARE_COORD_CATEGORIES.forEach(cat => clearCareCoordCategory(obj, cat));
  };

  const handleRemoveCareCoordEntry = (childIndex: number, cat: string, removeAt: number) => {
    const updated = [...childrenData];
    const obj = { ...updated[childIndex] };
    const countField = `careCoord_${cat}_count`;
    const additionalField = `careCoord_${cat}_additional`;
    const count = parseInt(obj[countField] || '1');
    const fields = ['name', 'phone', 'email', 'city', 'province', 'role'];
    for (let i = removeAt; i < count - 1; i++) {
      fields.forEach(f => {
        const val = obj[`careCoord_${cat}_${i + 1}_${f}`];
        if (val !== undefined) obj[`careCoord_${cat}_${i}_${f}`] = val;
        else delete obj[`careCoord_${cat}_${i}_${f}`];
      });
    }
    fields.forEach(f => delete obj[`careCoord_${cat}_${count - 1}_${f}`]);
    const newCount = count - 1;
    obj[countField] = String(newCount);
    if (newCount <= 1) obj[additionalField] = 'no';
    updated[childIndex] = obj;
    onAnswerChange('childrenData', updated);
  };

  const buildPrefilledContacts = (childIndex: number): { id: string; name: string; phone: string; email: string; city: string; province: string; source: string }[] => {
    const child = childrenData[childIndex] || {};
    const contacts: { id: string; name: string; phone: string; email: string; city: string; province: string; source: string }[] = [];

    const step1 = allAnswers?.get(1) || {};
    const hasSpouse = step1['maritalStatus'] === 'married' || step1['maritalStatus'] === 'common_law';

    if (child.parentsOption === 'both' || child.parentsOption === 'parent1') {
      contacts.push({ id: 'parent1', name: step1['fullName'] as string || '', phone: step1['phone'] as string || '', email: step1['email'] as string || '', city: step1['city'] as string || '', province: step1['province'] as string || '', source: 'parent1' });
    }
    if (hasSpouse && (child.parentsOption === 'both' || child.parentsOption === 'parent2')) {
      contacts.push({ id: 'parent2', name: step1['spouseName'] as string || '', phone: step1['spousePhone'] as string || '', email: step1['spouseEmail'] as string || '', city: step1['spouseCity'] as string || '', province: step1['spouseProvince'] as string || '', source: 'parent2' });
    }

    if (child.careCoordinators) {
      const selected = child.careCoordinators.split(',').filter(Boolean);

      if (selected.includes('sibling') && child.careCoordSiblingNames) {
        child.careCoordSiblingNames.split(',').map(s => s.trim()).filter(Boolean).forEach((sibName, si) => {
          contacts.push({ id: `sibling_${si}`, name: sibName, phone: '', email: '', city: '', province: '', source: 'sibling' });
        });
      }

      CARE_COORD_CATEGORIES.forEach(cat => {
        if (!selected.includes(cat)) return;
        const count = parseInt(child[`careCoord_${cat}_count`] || '1');
        for (let ci = 0; ci < count; ci++) {
          const name = child[`careCoord_${cat}_${ci}_name`];
          if (!name) continue;
          contacts.push({
            id: `${cat}_${ci}`,
            name,
            phone: child[`careCoord_${cat}_${ci}_phone`] || '',
            email: child[`careCoord_${cat}_${ci}_email`] || '',
            city: child[`careCoord_${cat}_${ci}_city`] || '',
            province: child[`careCoord_${cat}_${ci}_province`] || '',
            source: cat,
          });
        }
      });
    }

    return contacts;
  };

  const getPrefilledContact = (childIndex: number, contactId: string) => {
    const contacts = buildPrefilledContacts(childIndex);
    return contacts.find(c => c.id === contactId);
  };

  const clearFutureCareTeamFields = (obj: Record<string, string>) => {
    delete obj.futureCareTeamSelection;
    delete obj.futureCareTeamResponsibility;
    for (let i = 0; i < 20; i++) {
      delete obj[`futureCareTeam_${i}_name`];
      delete obj[`futureCareTeam_${i}_phone`];
      delete obj[`futureCareTeam_${i}_email`];
      delete obj[`futureCareTeam_${i}_city`];
      delete obj[`futureCareTeam_${i}_province`];
      delete obj[`futureCareTeam_${i}_relationship`];
      delete obj[`futureCareTeam_${i}_spoken`];
    }
    delete obj.futureCareTeamOtherCount;
    for (let i = 0; i < 20; i++) {
      delete obj[`futureCareTeamOther_${i}_name`];
      delete obj[`futureCareTeamOther_${i}_phone`];
      delete obj[`futureCareTeamOther_${i}_email`];
      delete obj[`futureCareTeamOther_${i}_city`];
      delete obj[`futureCareTeamOther_${i}_province`];
      delete obj[`futureCareTeamOther_${i}_relationship`];
      delete obj[`futureCareTeamOther_${i}_spoken`];
    }
    delete obj.futureCareTeamExtra;
    delete obj.futureCareTeamExtraCount;
    delete obj.futureCareTeamExtraAdditional;
    for (let i = 0; i < 20; i++) {
      delete obj[`futureCareTeamExtra_${i}_name`];
      delete obj[`futureCareTeamExtra_${i}_phone`];
      delete obj[`futureCareTeamExtra_${i}_email`];
      delete obj[`futureCareTeamExtra_${i}_city`];
      delete obj[`futureCareTeamExtra_${i}_province`];
      delete obj[`futureCareTeamExtra_${i}_relationship`];
      delete obj[`futureCareTeamExtra_${i}_spoken`];
    }
    delete obj.carePlanWritten;
    delete obj.carePlanStored;
    delete obj.carePlanWorries;
    delete obj.carePlanWorriesOther;
    delete obj.disabilitySupports;
    delete obj.disabilitySupportsList;
    delete obj.disabilitySupportsOther;
    delete obj.supportLocationDependent;
  };

  const handleRemoveFutureCareTeamOther = (childIndex: number, removeAt: number) => {
    const updated = [...childrenData];
    const obj = { ...updated[childIndex] };
    const count = parseInt(obj.futureCareTeamOtherCount || '0');
    const fields = ['name', 'phone', 'email', 'city', 'province', 'relationship', 'spoken'];
    for (let i = removeAt; i < count - 1; i++) {
      fields.forEach(f => {
        const val = obj[`futureCareTeamOther_${i + 1}_${f}`];
        if (val !== undefined) obj[`futureCareTeamOther_${i}_${f}`] = val;
        else delete obj[`futureCareTeamOther_${i}_${f}`];
      });
    }
    fields.forEach(f => delete obj[`futureCareTeamOther_${count - 1}_${f}`]);
    const newCount = count - 1;
    obj.futureCareTeamOtherCount = String(newCount);
    updated[childIndex] = obj;
    onAnswerChange('childrenData', updated);
  };

  const handleRemoveFutureCareTeamExtra = (childIndex: number, removeAt: number) => {
    const updated = [...childrenData];
    const obj = { ...updated[childIndex] };
    const count = parseInt(obj.futureCareTeamExtraCount || '0');
    const fields = ['name', 'phone', 'email', 'city', 'province', 'relationship', 'spoken'];
    for (let i = removeAt; i < count - 1; i++) {
      fields.forEach(f => {
        const val = obj[`futureCareTeamExtra_${i + 1}_${f}`];
        if (val !== undefined) obj[`futureCareTeamExtra_${i}_${f}`] = val;
        else delete obj[`futureCareTeamExtra_${i}_${f}`];
      });
    }
    fields.forEach(f => delete obj[`futureCareTeamExtra_${count - 1}_${f}`]);
    const newCount = count - 1;
    obj.futureCareTeamExtraCount = String(newCount);
    if (newCount <= 0) {
      obj.futureCareTeamExtra = 'no';
      obj.futureCareTeamExtraAdditional = undefined;
    }
    updated[childIndex] = obj;
    onAnswerChange('childrenData', updated);
  };

  const handleChildMultiChange = (index: number, fields: Record<string, string>) => {
    const updated = [...childrenData];
    if (!updated[index]) {
      updated[index] = {};
    }
    Object.entries(fields).forEach(([k, v]) => {
      if (v === '') {
        delete (updated[index] as Record<string, unknown>)[k];
      } else {
        updated[index][k] = v;
      }
    });
    setChildrenData(updated);
  };

  const handleChildChange = (index: number, field: string, value: string) => {
    const updated = [...childrenData];
    if (!updated[index]) {
      updated[index] = {};
    }
    updated[index][field] = value;

    if (field === 'disabled' && value === 'no') {
      updated[index].supportNeedTypes = undefined;
      updated[index].supportNeedOther = undefined;
      updated[index].disabilityTaxCredit = undefined;
      updated[index].disabilityTaxCreditDocLocation = undefined;
      updated[index].notSureSituation = undefined;
      updated[index].notSureRelianceAreas = undefined;
      updated[index].notSureFuture = undefined;
      clearCareCoordFields(updated[index]);
      updated[index].futureIndependenceLevel = undefined;
      updated[index].futureFinancialHelp = undefined;
      updated[index].futurePersonalHealthHelp = undefined;
      clearFutureCareTeamFields(updated[index]);
    }

    if (field === 'disabled' && value === 'yes') {
      updated[index].notSureSituation = undefined;
      updated[index].notSureRelianceAreas = undefined;
      updated[index].notSureFuture = undefined;
    }

    if (field === 'disabled' && value === 'not_sure') {
      updated[index].supportNeedTypes = undefined;
      updated[index].supportNeedOther = undefined;
      updated[index].disabilityTaxCredit = undefined;
      updated[index].disabilityTaxCreditDocLocation = undefined;
      clearCareCoordFields(updated[index]);
      clearFutureCareTeamFields(updated[index]);
    }

    if (field === 'disabilityTaxCredit' && value !== 'yes' && value !== 'in-progress') {
      updated[index].disabilityTaxCreditDocLocation = undefined;
    }

    if (field === 'careCoordinators') {
      const newVals = value.split(',').filter(Boolean);
      const oldVals = (updated[index].careCoordinators || '').split(',').filter(Boolean);
      const removed = oldVals.filter(v => !newVals.includes(v));
      removed.forEach(cat => clearCareCoordCategory(updated[index], cat));
      if (!newVals.includes('sibling')) {
        updated[index].careCoordSiblingNames = undefined;
      }
    }

    if (field.startsWith('careCoord') && field.endsWith('Additional') && value === 'no') {
      const prefix = field.replace('Additional', '');
      clearCareCoordFromPrefix(updated[index], prefix);
    }

    if (field === 'futureIndependenceLevel' && (value === 'likely_independent' || value === 'too_early')) {
      updated[index].futureFinancialHelp = undefined;
      updated[index].futurePersonalHealthHelp = undefined;
    }

    if (field === 'medications' && value === 'no') {
      updated[index].medicationList = undefined;
    }

    if (field === 'allergies' && value === 'no') {
      updated[index].allergyList = undefined;
      updated[index].allergyMedication = undefined;
      updated[index].allergyMedicationDescription = undefined;
    }

    if (field === 'medicalIssues' && value === 'no') {
      updated[index].medicalIssuesDescription = undefined;
    }

    if (field === 'attendingSchool' && value === 'yes') {
      updated[index].additionalEducationInfo = undefined;
      updated[index].additionalEducationDetails = undefined;
    }

    if (field === 'attendingSchool' && value === 'no') {
      updated[index].schoolName = undefined;
      updated[index].schoolContact = undefined;
      updated[index].schoolStrengths = undefined;
      updated[index].schoolExtraSupport = undefined;
      updated[index].schoolFocusHelps = undefined;
      updated[index].schoolDistractions = undefined;
      updated[index].schoolCalmingStrategies = undefined;
      updated[index].hasIEP = undefined;
      updated[index].individualEducationPlan = undefined;
      updated[index].iepDocumentLocation = undefined;
      updated[index].schoolActivitiesImportant = undefined;
      updated[index].homeworkRoutines = undefined;
      updated[index].educationHopes = undefined;
      updated[index].learningStyleNotes = undefined;
      updated[index].behaviouralConsiderations = undefined;
      updated[index].educationAdditionalDetails = undefined;
    }

    if (field === 'additionalEducationInfo' && value === 'no') {
      updated[index].additionalEducationDetails = undefined;
    }

    if (field === 'hasIEP' && value === 'no') {
      updated[index].individualEducationPlan = undefined;
      updated[index].iepDocumentLocation = undefined;
    }

    onAnswerChange('childrenData', updated);
  };

  const handleClient1PrevRelChange = (index: number, field: string, value: string) => {
    const updated = [...client1PreviousRelationshipsData];
    if (!updated[index]) {
      updated[index] = {};
    }
    updated[index][field] = value;
    onAnswerChange('client1PreviousRelationshipsData', updated);
  };

  const handleClient2PrevRelChange = (index: number, field: string, value: string) => {
    const updated = [...client2PreviousRelationshipsData];
    if (!updated[index]) {
      updated[index] = {};
    }
    updated[index][field] = value;
    onAnswerChange('client2PreviousRelationshipsData', updated);
  };

  const client1PensionsData = (answers['client1PensionsData'] as Array<Record<string, string>>) || [];
  const client2PensionsData = (answers['client2PensionsData'] as Array<Record<string, string>>) || [];

  const handleClient1PensionChange = (index: number, field: string, value: string) => {
    const updated = [...client1PensionsData];
    if (!updated[index]) {
      updated[index] = {};
    }
    updated[index][field] = value;
    onAnswerChange('client1PensionsData', updated);
  };

  const handleClient2PensionChange = (index: number, field: string, value: string) => {
    const updated = [...client2PensionsData];
    if (!updated[index]) {
      updated[index] = {};
    }
    updated[index][field] = value;
    onAnswerChange('client2PensionsData', updated);
  };

  const addClient1Pension = () => {
    const updated = [...client1PensionsData, {}];
    onAnswerChange('client1PensionsData', updated);
  };

  const addClient2Pension = () => {
    const updated = [...client2PensionsData, {}];
    onAnswerChange('client2PensionsData', updated);
  };

  const removeClient1Pension = (index: number) => {
    const updated = client1PensionsData.filter((_, i) => i !== index);
    onAnswerChange('client1PensionsData', updated);
  };

  const removeClient2Pension = (index: number) => {
    const updated = client2PensionsData.filter((_, i) => i !== index);
    onAnswerChange('client2PensionsData', updated);
  };

  const client1PoaPersonalCareCount = parseInt(answers['client1PoaPersonalCareCount'] as string) || 0;
  const client1PoaPersonalCareData = (answers['client1PoaPersonalCareData'] as Array<Record<string, string>>) || Array(Math.max(0, client1PoaPersonalCareCount || 0)).fill(null).map(() => ({}));

  const handlePoaPersonalCareChange = (index: number, field: string, value: string) => {
    const updated = [...client1PoaPersonalCareData];
    if (!updated[index]) {
      updated[index] = {};
    }
    updated[index][field] = value;
    onAnswerChange('client1PoaPersonalCareData', updated);
  };

  const client1AlternatePoaPersonalCareCount = parseInt(answers['client1AlternatePoaPersonalCareCount'] as string) || 0;
  const client1AlternatePoaPersonalCareData = (answers['client1AlternatePoaPersonalCareData'] as Array<Record<string, string>>) || Array(Math.max(0, client1AlternatePoaPersonalCareCount || 0)).fill(null).map(() => ({}));

  const handleAlternatePoaPersonalCareChange = (index: number, field: string, value: string) => {
    const updated = [...client1AlternatePoaPersonalCareData];
    if (!updated[index]) {
      updated[index] = {};
    }
    updated[index][field] = value;
    onAnswerChange('client1AlternatePoaPersonalCareData', updated);
  };

  const client2AlternatePoaPersonalCareCount = parseInt(answers['client2AlternatePoaPersonalCareCount'] as string) || 0;
  const client2AlternatePoaPersonalCareData = (answers['client2AlternatePoaPersonalCareData'] as Array<Record<string, string>>) || Array(Math.max(0, client2AlternatePoaPersonalCareCount || 0)).fill(null).map(() => ({}));

  const handleClient2AlternatePoaPersonalCareChange = (index: number, field: string, value: string) => {
    const updated = [...client2AlternatePoaPersonalCareData];
    if (!updated[index]) {
      updated[index] = {};
    }
    updated[index][field] = value;
    onAnswerChange('client2AlternatePoaPersonalCareData', updated);
  };

  const client1PoaPropertyCount = parseInt(answers['client1PoaPropertyCount'] as string) || 0;
  const client1PoaPropertyData = (answers['client1PoaPropertyData'] as Array<Record<string, string>>) || Array(Math.max(0, client1PoaPropertyCount || 0)).fill(null).map(() => ({}));

  const handlePoaPropertyChange = (index: number, field: string, value: string) => {
    const updated = [...client1PoaPropertyData];
    if (!updated[index]) {
      updated[index] = {};
    }
    updated[index][field] = value;
    onAnswerChange('client1PoaPropertyData', updated);
  };

  const client1FinancialAdvisorsCount = parseInt(answers['client1FinancialAdvisors'] as string) || 0;
  const client1FinancialAdvisorsDataRaw = (answers['client1FinancialAdvisorsData'] as Array<Record<string, string>>) || [];
  const client1FinancialAdvisorsData: Array<Record<string, string>> = Array.from({ length: client1FinancialAdvisorsCount }, (_, i) => client1FinancialAdvisorsDataRaw[i] || {});

  const handleClient1FinancialAdvisorChange = (index: number, field: string, value: string) => {
    const updated = [...client1FinancialAdvisorsData];
    if (!updated[index]) {
      updated[index] = {};
    }
    updated[index][field] = value;
    onAnswerChange('client1FinancialAdvisorsData', updated);
  };

  const client2PoaPersonalCareCount = parseInt(answers['client2PoaPersonalCareCount'] as string) || 0;
  const client2PoaPersonalCareData = (answers['client2PoaPersonalCareData'] as Array<Record<string, string>>) || Array(Math.max(0, client2PoaPersonalCareCount || 0)).fill(null).map(() => ({}));

  const handleClient2PoaPersonalCareChange = (index: number, field: string, value: string) => {
    const updated = [...client2PoaPersonalCareData];
    if (!updated[index]) {
      updated[index] = {};
    }
    updated[index][field] = value;
    onAnswerChange('client2PoaPersonalCareData', updated);
  };

  const client2PoaPropertyCount = parseInt(answers['client2PoaPropertyCount'] as string) || 0;
  const client2PoaPropertyData = (answers['client2PoaPropertyData'] as Array<Record<string, string>>) || Array(Math.max(0, client2PoaPropertyCount || 0)).fill(null).map(() => ({}));

  const handleClient2PoaPropertyChange = (index: number, field: string, value: string) => {
    const updated = [...client2PoaPropertyData];
    if (!updated[index]) {
      updated[index] = {};
    }
    updated[index][field] = value;
    onAnswerChange('client2PoaPropertyData', updated);
  };

  const client2FinancialAdvisorsCount = parseInt(answers['client2FinancialAdvisors'] as string) || 0;
  const client2FinancialAdvisorsDataRaw = (answers['client2FinancialAdvisorsData'] as Array<Record<string, string>>) || [];
  const client2FinancialAdvisorsData: Array<Record<string, string>> = Array.from({ length: client2FinancialAdvisorsCount }, (_, i) => client2FinancialAdvisorsDataRaw[i] || {});

  const handleClient2FinancialAdvisorChange = (index: number, field: string, value: string) => {
    const updated = [...client2FinancialAdvisorsData];
    if (!updated[index]) {
      updated[index] = {};
    }
    updated[index][field] = value;
    onAnswerChange('client2FinancialAdvisorsData', updated);
  };

  const trustBeneficiariesCount = parseInt(answers['trustBeneficiariesCount'] as string) || 0;
  const trustBeneficiariesData = (answers['trustBeneficiariesData'] as Array<Record<string, string>>) || Array(Math.max(0, trustBeneficiariesCount || 0)).fill(null).map(() => ({}));

  const handleBeneficiaryChange = (index: number, field: string, value: string) => {
    const updated = [...trustBeneficiariesData];
    if (!updated[index]) updated[index] = {};
    updated[index][field] = value;
    onAnswerChange('trustBeneficiariesData', updated);
  };

  const trust2BeneficiariesCount = parseInt(answers['trust2BeneficiariesCount'] as string) || 0;
  const trust2BeneficiariesData = (answers['trust2BeneficiariesData'] as Array<Record<string, string>>) || Array(Math.max(0, trust2BeneficiariesCount)).fill(null).map(() => ({}));

  const handleTrust2BeneficiaryChange = (index: number, field: string, value: string) => {
    const updated = [...trust2BeneficiariesData];
    if (!updated[index]) updated[index] = {};
    updated[index][field] = value;
    onAnswerChange('trust2BeneficiariesData', updated);
  };

  const trust3BeneficiariesCount = parseInt(answers['trust3BeneficiariesCount'] as string) || 0;
  const trust3BeneficiariesData = (answers['trust3BeneficiariesData'] as Array<Record<string, string>>) || Array(Math.max(0, trust3BeneficiariesCount)).fill(null).map(() => ({}));

  const handleTrust3BeneficiaryChange = (index: number, field: string, value: string) => {
    const updated = [...trust3BeneficiariesData];
    if (!updated[index]) updated[index] = {};
    updated[index][field] = value;
    onAnswerChange('trust3BeneficiariesData', updated);
  };

  const trust4BeneficiariesCount = parseInt(answers['trust4BeneficiariesCount'] as string) || 0;
  const trust4BeneficiariesData = (answers['trust4BeneficiariesData'] as Array<Record<string, string>>) || Array(Math.max(0, trust4BeneficiariesCount)).fill(null).map(() => ({}));

  const handleTrust4BeneficiaryChange = (index: number, field: string, value: string) => {
    const updated = [...trust4BeneficiariesData];
    if (!updated[index]) updated[index] = {};
    updated[index][field] = value;
    onAnswerChange('trust4BeneficiariesData', updated);
  };

  const numberOfCorporations = parseInt(answers['numberOfCorporations'] as string) || 0;
  const corporationsData = (answers['corporationsData'] as Array<Record<string, string>>) || Array(Math.max(0, numberOfCorporations || 0)).fill(null).map(() => ({}));

  const handleCorporationChange = (index: number, field: string, value: string) => {
    const updated = [...corporationsData];
    if (!updated[index]) {
      updated[index] = {};
    }
    updated[index][field] = value;
    onAnswerChange('corporationsData', updated);
  };

  return (
    <div>
      {step.videoUrl && (
        <VideoPlayer url={step.videoUrl} title={`${step.title} - Overview`} />
      )}

      <div className="bg-gray-800 rounded-lg shadow-md p-8 mb-6 border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-2">{step.title}</h2>
        {step.description && (
          <p className="text-gray-400 mb-6">{step.description}</p>
        )}

        <form onSubmit={handleSubmit}>
          {step.id === 1 && (
            <>
              {step.questions.map((question) => {
                if (question.key === 'spouseName' && (answers['maritalStatus'] !== 'married' && answers['maritalStatus'] !== 'common_law')) {
                  return null;
                }
                if (question.key === 'hasMarriageContract' && (answers['maritalStatus'] !== 'married' && answers['maritalStatus'] !== 'common_law')) {
                  return null;
                }
                if (question.key === 'marriageContractLocation' && ((answers['maritalStatus'] !== 'married' && answers['maritalStatus'] !== 'common_law') || answers['hasMarriageContract'] !== 'yes')) {
                  return null;
                }
                if (question.key === 'spouseSameAddress' && (answers['maritalStatus'] !== 'married' && answers['maritalStatus'] !== 'common_law')) {
                  return null;
                }
                if (question.key === 'spouseDateOfBirth' && (answers['maritalStatus'] !== 'married' && answers['maritalStatus'] !== 'common_law')) {
                  return null;
                }
                if (
                  (question.key === 'spouseAddress' ||
                    question.key === 'spouseCity' ||
                    question.key === 'spouseProvince' ||
                    question.key === 'spousePostalCode') &&
                  ((answers['maritalStatus'] !== 'married' && answers['maritalStatus'] !== 'common_law') || answers['spouseSameAddress'] === 'yes')
                ) {
                  return null;
                }
                if (question.key === 'spouseEmail' && (answers['maritalStatus'] !== 'married' && answers['maritalStatus'] !== 'common_law')) {
                  return null;
                }
                if (question.key === 'spousePhone' && (answers['maritalStatus'] !== 'married' && answers['maritalStatus'] !== 'common_law')) {
                  return null;
                }
                if (question.key === 'client1NumberOfPreviousRelationships' && answers['client1HasPreviousRelationship'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2HasPreviousRelationship' && (answers['maritalStatus'] !== 'married' && answers['maritalStatus'] !== 'common_law')) {
                  return null;
                }
                if (question.key === 'client2NumberOfPreviousRelationships' && ((answers['maritalStatus'] !== 'married' && answers['maritalStatus'] !== 'common_law') || answers['client2HasPreviousRelationship'] !== 'yes')) {
                  return null;
                }
                if (question.key === 'numberOfChildren' && answers['hasChildren'] !== 'yes') {
                  return null;
                }

                let customLabel = typeof question.label === 'function'
                  ? question.label(allAnswers || new Map())
                  : question.label;

                if (question.key === 'client1HasPreviousRelationship' && answers['maritalStatus'] === 'widowed') {
                  customLabel = 'Aside from your former spouse or common law partner\'s passing, have you previously been married or in a common law relationship with another person?';
                }

                const isMarriedOrCommonLaw = answers['maritalStatus'] === 'married' || answers['maritalStatus'] === 'common_law';
                const showRelationshipDivider = question.key === 'hasMarriageContract' && isMarriedOrCommonLaw;
                const showChildrenDivider = question.key === 'hasChildren';

                return (
                  <React.Fragment key={question.key}>
                    {showRelationshipDivider && (
                      <div className="pt-4 pb-2">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-px bg-gray-600" />
                          <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                            Relationship History
                          </span>
                          <div className="flex-1 h-px bg-gray-600" />
                        </div>
                      </div>
                    )}
                    {showChildrenDivider && (
                      <div className="pt-4 pb-2">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-px bg-gray-600" />
                          <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                            Children Information
                          </span>
                          <div className="flex-1 h-px bg-gray-600" />
                        </div>
                      </div>
                    )}
                    <FormField
                      question={{...question, label: customLabel}}
                      value={answers[question.key]}
                      onChange={(value) => onAnswerChange(question.key, value)}
                    />
                  </React.Fragment>
                );
              })}
            </>
          )}

          {step.id === 4 && (
            <>
              {/* ── Trust 1 ── */}
              {step.questions
                .filter(q => ['hasFamilyTrust','trustLegalName','trustDeedLocation','trustYearEstablished','trustBeneficiariesCount'].includes(q.key))
                .map((question) => {
                  if (question.key !== 'hasFamilyTrust' && answers['hasFamilyTrust'] !== 'yes') return null;
                  return (
                    <FormField
                      key={question.key}
                      question={question}
                      value={answers[question.key]}
                      onChange={(value) => onAnswerChange(question.key, value)}
                    />
                  );
                })}

              {answers['hasFamilyTrust'] === 'yes' && trustBeneficiariesCount > 0 && (
                <TrustBeneficiariesSection
                  label="Trust Beneficiaries"
                  count={trustBeneficiariesCount}
                  data={trustBeneficiariesData}
                  onChange={handleBeneficiaryChange}
                />
              )}

              {/* ── Additional Trust prompt ── */}
              {answers['hasFamilyTrust'] === 'yes' && (() => {
                const q = step.questions.find(q => q.key === 'hasAdditionalFamilyTrust');
                if (!q) return null;
                return <FormField key={q.key} question={q} value={answers[q.key]} onChange={(v) => onAnswerChange(q.key, v)} />;
              })()}

              {/* ── Trust 2 ── */}
              {answers['hasAdditionalFamilyTrust'] === 'yes' && (
                <>
                  <div className="mt-6 pt-4 border-t border-gray-600">
                    <h3 className="text-lg font-semibold text-white mb-4">Family Trust 2</h3>
                  </div>
                  {step.questions
                    .filter(q => ['trust2LegalName','trust2DeedLocation','trust2YearEstablished','trust2BeneficiariesCount'].includes(q.key))
                    .map((question) => (
                      <FormField
                        key={question.key}
                        question={question}
                        value={answers[question.key]}
                        onChange={(value) => onAnswerChange(question.key, value)}
                      />
                    ))}
                  {trust2BeneficiariesCount > 0 && (
                    <TrustBeneficiariesSection
                      label="Trust 2 Beneficiaries"
                      count={trust2BeneficiariesCount}
                      data={trust2BeneficiariesData}
                      onChange={handleTrust2BeneficiaryChange}
                    />
                  )}
                  {(() => {
                    const q = step.questions.find(q => q.key === 'hasAdditionalFamilyTrust2');
                    if (!q) return null;
                    return <FormField key={q.key} question={q} value={answers[q.key]} onChange={(v) => onAnswerChange(q.key, v)} />;
                  })()}
                </>
              )}

              {/* ── Trust 3 ── */}
              {answers['hasAdditionalFamilyTrust2'] === 'yes' && (
                <>
                  <div className="mt-6 pt-4 border-t border-gray-600">
                    <h3 className="text-lg font-semibold text-white mb-4">Family Trust 3</h3>
                  </div>
                  {step.questions
                    .filter(q => ['trust3LegalName','trust3DeedLocation','trust3YearEstablished','trust3BeneficiariesCount'].includes(q.key))
                    .map((question) => (
                      <FormField
                        key={question.key}
                        question={question}
                        value={answers[question.key]}
                        onChange={(value) => onAnswerChange(question.key, value)}
                      />
                    ))}
                  {trust3BeneficiariesCount > 0 && (
                    <TrustBeneficiariesSection
                      label="Trust 3 Beneficiaries"
                      count={trust3BeneficiariesCount}
                      data={trust3BeneficiariesData}
                      onChange={handleTrust3BeneficiaryChange}
                    />
                  )}
                  {(() => {
                    const q = step.questions.find(q => q.key === 'hasAdditionalFamilyTrust3');
                    if (!q) return null;
                    return <FormField key={q.key} question={q} value={answers[q.key]} onChange={(v) => onAnswerChange(q.key, v)} />;
                  })()}
                </>
              )}

              {/* ── Trust 4 ── */}
              {answers['hasAdditionalFamilyTrust3'] === 'yes' && (
                <>
                  <div className="mt-6 pt-4 border-t border-gray-600">
                    <h3 className="text-lg font-semibold text-white mb-4">Family Trust 4</h3>
                  </div>
                  {step.questions
                    .filter(q => ['trust4LegalName','trust4DeedLocation','trust4YearEstablished','trust4BeneficiariesCount'].includes(q.key))
                    .map((question) => (
                      <FormField
                        key={question.key}
                        question={question}
                        value={answers[question.key]}
                        onChange={(value) => onAnswerChange(question.key, value)}
                      />
                    ))}
                  {trust4BeneficiariesCount > 0 && (
                    <TrustBeneficiariesSection
                      label="Trust 4 Beneficiaries"
                      count={trust4BeneficiariesCount}
                      data={trust4BeneficiariesData}
                      onChange={handleTrust4BeneficiaryChange}
                    />
                  )}
                </>
              )}
            </>
          )}

          {step.id === 5 && (
            <>
              {step.questions.map((question) => {
                if (question.condition) {
                  const allFormData = Object.fromEntries(
                    Array.from(allAnswers?.entries() || []).flatMap(([_, stepAnswers]) =>
                      Object.entries(stepAnswers)
                    )
                  );
                  if (!question.condition(allFormData)) {
                    return null;
                  }
                }

                const displayLabel = typeof question.label === 'function'
                  ? question.label(allAnswers || new Map())
                  : question.label;

                const fieldElement = (
                  <FormField
                    key={question.key}
                    question={{ ...question, label: displayLabel }}
                    value={answers[question.key]}
                    onChange={(value) => onAnswerChange(question.key, value)}
                  />
                );

                if (question.key === 'soleProprietorshipCount' && answers['hasSoleProprietorship'] === 'yes') {
                  const count = parseInt(answers['soleProprietorshipCount'] as string) || 0;
                  const client1Name = (allAnswers?.get(1)?.['fullName'] as string) || 'Client 1';
                  const spData = (answers['client1SolePropsData'] as Array<Partial<SoleProprietorshipData>>) || [];
                  return (
                    <React.Fragment key={question.key}>
                      {fieldElement}
                      {count > 0 && (
                        <div className="space-y-6 mt-2">
                          {Array.from({ length: count }).map((_, i) => (
                            <SoleProprietorshipDetails
                              key={i}
                              index={i}
                              data={spData[i] || {}}
                              clientName={client1Name}
                              onChange={(field, value) => {
                                const updated = [...spData];
                                if (!updated[i]) updated[i] = {};
                                updated[i] = { ...updated[i], [field]: value };
                                onAnswerChange('client1SolePropsData', updated);
                              }}
                              onMultiChange={(updates) => {
                                const updated = [...spData];
                                if (!updated[i]) updated[i] = {};
                                updated[i] = { ...updated[i], ...updates };
                                onAnswerChange('client1SolePropsData', updated);
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </React.Fragment>
                  );
                }

                if (question.key === 'client2SoleProprietorshipCount') {
                  const maritalStatus = (allAnswers?.get(1)?.['maritalStatus'] as string);
                  const hasSpouse = maritalStatus === 'married' || maritalStatus === 'common_law';
                  if (hasSpouse && answers['client2HasSoleProprietorship'] === 'yes') {
                    const count = parseInt(answers['client2SoleProprietorshipCount'] as string) || 0;
                    const client2Name = (allAnswers?.get(1)?.['spouseName'] as string) || 'Client 2';
                    const spData = (answers['client2SolePropsData'] as Array<Partial<SoleProprietorshipData>>) || [];
                    return (
                      <React.Fragment key={question.key}>
                        {fieldElement}
                        {count > 0 && (
                          <div className="space-y-6 mt-2">
                            {Array.from({ length: count }).map((_, i) => (
                              <SoleProprietorshipDetails
                                key={i}
                                index={i}
                                data={spData[i] || {}}
                                clientName={client2Name}
                                onChange={(field, value) => {
                                  const updated = [...spData];
                                  if (!updated[i]) updated[i] = {};
                                  updated[i] = { ...updated[i], [field]: value };
                                  onAnswerChange('client2SolePropsData', updated);
                                }}
                                onMultiChange={(updates) => {
                                  const updated = [...spData];
                                  if (!updated[i]) updated[i] = {};
                                  updated[i] = { ...updated[i], ...updates };
                                  onAnswerChange('client2SolePropsData', updated);
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </React.Fragment>
                    );
                  }
                }

                if (question.key === 'partnershipCount' && answers['hasPartnership'] === 'yes') {
                  const count = parseInt(answers['partnershipCount'] as string) || 0;
                  const client1Name = (allAnswers?.get(1)?.['fullName'] as string) || 'Client 1';
                  const pData = (answers['client1PartnershipsData'] as Array<Partial<PartnershipData>>) || [];
                  return (
                    <React.Fragment key={question.key}>
                      {fieldElement}
                      {count > 0 && (
                        <div className="space-y-6 mt-2">
                          {Array.from({ length: count }).map((_, i) => (
                            <PartnershipDetails
                              key={i}
                              index={i}
                              data={pData[i] || {}}
                              clientName={client1Name}
                              onChange={(field, value) => {
                                const updated = [...pData];
                                if (!updated[i]) updated[i] = {};
                                updated[i] = { ...updated[i], [field]: value };
                                onAnswerChange('client1PartnershipsData', updated);
                              }}
                              onMultiChange={(updates) => {
                                const updated = [...pData];
                                if (!updated[i]) updated[i] = {};
                                updated[i] = { ...updated[i], ...updates };
                                onAnswerChange('client1PartnershipsData', updated);
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </React.Fragment>
                  );
                }

                if (question.key === 'client2PartnershipCount') {
                  const maritalStatus = (allAnswers?.get(1)?.['maritalStatus'] as string);
                  const hasSpouse = maritalStatus === 'married' || maritalStatus === 'common_law';
                  if (hasSpouse && answers['client2HasPartnership'] === 'yes') {
                    const count = parseInt(answers['client2PartnershipCount'] as string) || 0;
                    const client2Name = (allAnswers?.get(1)?.['spouseName'] as string) || 'Client 2';
                    const pData = (answers['client2PartnershipsData'] as Array<Partial<PartnershipData>>) || [];
                    return (
                      <React.Fragment key={question.key}>
                        {fieldElement}
                        {count > 0 && (
                          <div className="space-y-6 mt-2">
                            {Array.from({ length: count }).map((_, i) => (
                              <PartnershipDetails
                                key={i}
                                index={i}
                                data={pData[i] || {}}
                                clientName={client2Name}
                                onChange={(field, value) => {
                                  const updated = [...pData];
                                  if (!updated[i]) updated[i] = {};
                                  updated[i] = { ...updated[i], [field]: value };
                                  onAnswerChange('client2PartnershipsData', updated);
                                }}
                                onMultiChange={(updates) => {
                                  const updated = [...pData];
                                  if (!updated[i]) updated[i] = {};
                                  updated[i] = { ...updated[i], ...updates };
                                  onAnswerChange('client2PartnershipsData', updated);
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </React.Fragment>
                    );
                  }
                }

                return fieldElement;
              })}

              {false && answers['client1HasAlternatePoaPersonalCare'] === 'yes' && client1AlternatePoaPersonalCareCount > 0 && (
                <div className="space-y-6 mt-6">
                  <h3 className="text-xl font-semibold text-white">Alternate Powers of Attorney for Personal Care - Client 1</h3>
                  {Array.from({ length: client1AlternatePoaPersonalCareCount }).map((_, index) => (
                    <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                      <h4 className="text-lg font-semibold text-white mb-4">Alternate Attorney {index + 1}</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                          <input
                            type="text"
                            value={client1AlternatePoaPersonalCareData[index]?.name || ''}
                            onChange={(e) => handleAlternatePoaPersonalCareChange(index, 'name', e.target.value)}
                            placeholder="Enter full name"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                          <input
                            type="tel"
                            value={client1AlternatePoaPersonalCareData[index]?.phone || ''}
                            onChange={(e) => handleAlternatePoaPersonalCareChange(index, 'phone', e.target.value)}
                            placeholder="Enter phone number"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                          <input
                            type="email"
                            value={client1AlternatePoaPersonalCareData[index]?.email || ''}
                            onChange={(e) => handleAlternatePoaPersonalCareChange(index, 'email', e.target.value)}
                            placeholder="Enter email address"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Relationship to You *</label>
                          <input
                            type="text"
                            value={client1AlternatePoaPersonalCareData[index]?.relationship || ''}
                            onChange={(e) => handleAlternatePoaPersonalCareChange(index, 'relationship', e.target.value)}
                            placeholder="e.g., Spouse, Child, Sibling, etc."
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Is this person a resident of Canada? *</label>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                value="yes"
                                checked={client1AlternatePoaPersonalCareData[index]?.isCanadaResident === 'yes'}
                                onChange={(e) => handleAlternatePoaPersonalCareChange(index, 'isCanadaResident', e.target.value)}
                                className="mr-2"
                              />
                              <span className="text-white">Yes</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                value="no"
                                checked={client1AlternatePoaPersonalCareData[index]?.isCanadaResident === 'no'}
                                onChange={(e) => handleAlternatePoaPersonalCareChange(index, 'isCanadaResident', e.target.value)}
                                className="mr-2"
                              />
                              <span className="text-white">No</span>
                            </label>
                          </div>
                        </div>
                        {client1AlternatePoaPersonalCareData[index]?.isCanadaResident === 'no' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Country of Residence *</label>
                            <input
                              type="text"
                              value={client1AlternatePoaPersonalCareData[index]?.country || ''}
                              onChange={(e) => handleAlternatePoaPersonalCareChange(index, 'country', e.target.value)}
                              placeholder="Enter country"
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        )}
                        {client1AlternatePoaPersonalCareData[index]?.isCanadaResident === 'yes' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Province/Territory *</label>
                            <select
                              value={client1AlternatePoaPersonalCareData[index]?.province || ''}
                              onChange={(e) => handleAlternatePoaPersonalCareChange(index, 'province', e.target.value)}
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="">Select province/territory</option>
                              <option value="Alberta">Alberta</option>
                              <option value="British Columbia">British Columbia</option>
                              <option value="Manitoba">Manitoba</option>
                              <option value="New Brunswick">New Brunswick</option>
                              <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                              <option value="Northwest Territories">Northwest Territories</option>
                              <option value="Nova Scotia">Nova Scotia</option>
                              <option value="Nunavut">Nunavut</option>
                              <option value="Ontario">Ontario</option>
                              <option value="Prince Edward Island">Prince Edward Island</option>
                              <option value="Quebec">Quebec</option>
                              <option value="Saskatchewan">Saskatchewan</option>
                              <option value="Yukon">Yukon</option>
                            </select>
                          </div>
                        )}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">City of Residence *</label>
                          <input
                            type="text"
                            value={client1AlternatePoaPersonalCareData[index]?.city || ''}
                            onChange={(e) => handleAlternatePoaPersonalCareChange(index, 'city', e.target.value)}
                            placeholder="Enter city"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Does this person have a copy of your most recent Power of Attorney for Personal Care document? *</label>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                value="yes_on_file"
                                checked={client1AlternatePoaPersonalCareData[index]?.hasDocCopy === 'yes_on_file'}
                                onChange={(e) => handleAlternatePoaPersonalCareChange(index, 'hasDocCopy', e.target.value)}
                                className="mr-2"
                              />
                              <span className="text-white">Yes, on their files</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                value="no_can_access"
                                checked={client1AlternatePoaPersonalCareData[index]?.hasDocCopy === 'no_can_access'}
                                onChange={(e) => handleAlternatePoaPersonalCareChange(index, 'hasDocCopy', e.target.value)}
                                className="mr-2"
                              />
                              <span className="text-white">No, but they know how to access the document if/when necessary</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                value="no_not_discussed"
                                checked={client1AlternatePoaPersonalCareData[index]?.hasDocCopy === 'no_not_discussed'}
                                onChange={(e) => handleAlternatePoaPersonalCareChange(index, 'hasDocCopy', e.target.value)}
                                className="mr-2"
                              />
                              <span className="text-white">No, this has not been discussed</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {false && answers['client2HasAlternatePoaPersonalCare'] === 'yes' && client2AlternatePoaPersonalCareCount > 0 && (
                <div className="space-y-6 mt-6">
                  <h3 className="text-xl font-semibold text-white">Alternate Powers of Attorney for Personal Care - Client 2</h3>
                  {Array.from({ length: client2AlternatePoaPersonalCareCount }).map((_, index) => (
                    <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                      <h4 className="text-lg font-semibold text-white mb-4">Alternate Attorney {index + 1}</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                          <input
                            type="text"
                            value={client2AlternatePoaPersonalCareData[index]?.name || ''}
                            onChange={(e) => handleClient2AlternatePoaPersonalCareChange(index, 'name', e.target.value)}
                            placeholder="Enter full name"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                          <input
                            type="tel"
                            value={client2AlternatePoaPersonalCareData[index]?.phone || ''}
                            onChange={(e) => handleClient2AlternatePoaPersonalCareChange(index, 'phone', e.target.value)}
                            placeholder="Enter phone number"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                          <input
                            type="email"
                            value={client2AlternatePoaPersonalCareData[index]?.email || ''}
                            onChange={(e) => handleClient2AlternatePoaPersonalCareChange(index, 'email', e.target.value)}
                            placeholder="Enter email address"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Relationship to You *</label>
                          <input
                            type="text"
                            value={client2AlternatePoaPersonalCareData[index]?.relationship || ''}
                            onChange={(e) => handleClient2AlternatePoaPersonalCareChange(index, 'relationship', e.target.value)}
                            placeholder="e.g., Spouse, Child, Sibling, etc."
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Is this person a resident of Canada? *</label>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                value="yes"
                                checked={client2AlternatePoaPersonalCareData[index]?.isCanadaResident === 'yes'}
                                onChange={(e) => handleClient2AlternatePoaPersonalCareChange(index, 'isCanadaResident', e.target.value)}
                                className="mr-2"
                              />
                              <span className="text-white">Yes</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                value="no"
                                checked={client2AlternatePoaPersonalCareData[index]?.isCanadaResident === 'no'}
                                onChange={(e) => handleClient2AlternatePoaPersonalCareChange(index, 'isCanadaResident', e.target.value)}
                                className="mr-2"
                              />
                              <span className="text-white">No</span>
                            </label>
                          </div>
                        </div>
                        {client2AlternatePoaPersonalCareData[index]?.isCanadaResident === 'no' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Country of Residence *</label>
                            <input
                              type="text"
                              value={client2AlternatePoaPersonalCareData[index]?.country || ''}
                              onChange={(e) => handleClient2AlternatePoaPersonalCareChange(index, 'country', e.target.value)}
                              placeholder="Enter country"
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        )}
                        {client2AlternatePoaPersonalCareData[index]?.isCanadaResident === 'yes' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Province/Territory *</label>
                            <select
                              value={client2AlternatePoaPersonalCareData[index]?.province || ''}
                              onChange={(e) => handleClient2AlternatePoaPersonalCareChange(index, 'province', e.target.value)}
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="">Select province/territory</option>
                              <option value="Alberta">Alberta</option>
                              <option value="British Columbia">British Columbia</option>
                              <option value="Manitoba">Manitoba</option>
                              <option value="New Brunswick">New Brunswick</option>
                              <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                              <option value="Northwest Territories">Northwest Territories</option>
                              <option value="Nova Scotia">Nova Scotia</option>
                              <option value="Nunavut">Nunavut</option>
                              <option value="Ontario">Ontario</option>
                              <option value="Prince Edward Island">Prince Edward Island</option>
                              <option value="Quebec">Quebec</option>
                              <option value="Saskatchewan">Saskatchewan</option>
                              <option value="Yukon">Yukon</option>
                            </select>
                          </div>
                        )}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">City of Residence *</label>
                          <input
                            type="text"
                            value={client2AlternatePoaPersonalCareData[index]?.city || ''}
                            onChange={(e) => handleClient2AlternatePoaPersonalCareChange(index, 'city', e.target.value)}
                            placeholder="Enter city"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Does this person have a copy of your most recent Power of Attorney for Personal Care document? *</label>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                value="yes_on_file"
                                checked={client2AlternatePoaPersonalCareData[index]?.hasDocCopy === 'yes_on_file'}
                                onChange={(e) => handleClient2AlternatePoaPersonalCareChange(index, 'hasDocCopy', e.target.value)}
                                className="mr-2"
                              />
                              <span className="text-white">Yes, on their files</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                value="no_can_access"
                                checked={client2AlternatePoaPersonalCareData[index]?.hasDocCopy === 'no_can_access'}
                                onChange={(e) => handleClient2AlternatePoaPersonalCareChange(index, 'hasDocCopy', e.target.value)}
                                className="mr-2"
                              />
                              <span className="text-white">No, but they know how to access the document if/when necessary</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                value="no_not_discussed"
                                checked={client2AlternatePoaPersonalCareData[index]?.hasDocCopy === 'no_not_discussed'}
                                onChange={(e) => handleClient2AlternatePoaPersonalCareChange(index, 'hasDocCopy', e.target.value)}
                                className="mr-2"
                              />
                              <span className="text-white">No, this has not been discussed</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step.id === 6 && (
            <>
              {step.questions.map((question) => {
                if (question.key === 'numberOfCorporations' && answers['ownsCorporation'] !== 'yes') {
                  return null;
                }

                return (
                  <FormField
                    key={question.key}
                    question={question}
                    value={answers[question.key]}
                    onChange={(value) => onAnswerChange(question.key, value)}
                  />
                );
              })}

              {answers['ownsCorporation'] === 'yes' && numberOfCorporations > 0 && (
                <div className="space-y-6 mt-6">
                  <h3 className="text-xl font-semibold text-white">Corporation Details</h3>
                  {Array.from({ length: numberOfCorporations }).map((_, index) => (
                    <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                      <h4 className="text-lg font-semibold text-white mb-4">Corporation {index + 1}</h4>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            What is the legal name of the corporation? *
                          </label>
                          <input
                            type="text"
                            value={corporationsData[index]?.legalName || ''}
                            onChange={(e) => handleCorporationChange(index, 'legalName', e.target.value)}
                            placeholder="Enter legal name of corporation"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Was it incorporated in Canada? *
                          </label>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name={`corporation-${index}-incorporated-in-canada`}
                                value="yes"
                                checked={corporationsData[index]?.incorporatedInCanada === 'yes'}
                                onChange={(e) => handleCorporationChange(index, 'incorporatedInCanada', e.target.value)}
                                className="mr-2"
                              />
                              <span className="text-white">Yes</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name={`corporation-${index}-incorporated-in-canada`}
                                value="no"
                                checked={corporationsData[index]?.incorporatedInCanada === 'no'}
                                onChange={(e) => handleCorporationChange(index, 'incorporatedInCanada', e.target.value)}
                                className="mr-2"
                              />
                              <span className="text-white">No</span>
                            </label>
                          </div>
                        </div>

                        {corporationsData[index]?.incorporatedInCanada === 'yes' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              In what jurisdiction was it incorporated? *
                            </label>
                            <select
                              value={corporationsData[index]?.jurisdiction || ''}
                              onChange={(e) => handleCorporationChange(index, 'jurisdiction', e.target.value)}
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="">Select jurisdiction</option>
                              <option value="Canada">Canada</option>
                              <option value="Alberta">Alberta</option>
                              <option value="British Columbia">British Columbia</option>
                              <option value="Manitoba">Manitoba</option>
                              <option value="New Brunswick">New Brunswick</option>
                              <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                              <option value="Nova Scotia">Nova Scotia</option>
                              <option value="Ontario">Ontario</option>
                              <option value="Prince Edward Island">Prince Edward Island</option>
                              <option value="Quebec">Quebec</option>
                              <option value="Saskatchewan">Saskatchewan</option>
                              <option value="Northwest Territories">Northwest Territories</option>
                              <option value="Nunavut">Nunavut</option>
                              <option value="Yukon">Yukon</option>
                            </select>
                          </div>
                        )}

                        {corporationsData[index]?.incorporatedInCanada === 'no' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Where was it incorporated? *
                            </label>
                            <input
                              type="text"
                              value={corporationsData[index]?.jurisdiction || ''}
                              onChange={(e) => handleCorporationChange(index, 'jurisdiction', e.target.value)}
                              placeholder="Enter country/jurisdiction"
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            What type of corporation is this? *
                          </label>
                          <select
                            value={corporationsData[index]?.corporationType || ''}
                            onChange={(e) => handleCorporationChange(index, 'corporationType', e.target.value)}
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select type</option>
                            <option value="Operating Company">Operating Company</option>
                            <option value="Holding Company">Holding Company</option>
                            <option value="Professional Corporation">Professional Corporation</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        {corporationsData[index]?.corporationType === 'Other' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Please describe *
                            </label>
                            <input
                              type="text"
                              value={corporationsData[index]?.corporationTypeOther || ''}
                              onChange={(e) => handleCorporationChange(index, 'corporationTypeOther', e.target.value)}
                              placeholder="Enter corporation type"
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        )}

                        {corporationsData[index]?.corporationType === 'Holding Company' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Describe the assets of the Holding Company:
                            </label>
                            <textarea
                              value={corporationsData[index]?.holdingCompanyAssets || ''}
                              onChange={(e) => handleCorporationChange(index, 'holdingCompanyAssets', e.target.value)}
                              placeholder="Enter details about the holding company assets"
                              rows={4}
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Who has an ownership stake in this corporation? *
                          </label>
                          <div className="space-y-2">
                            {(() => {
                              const basicAnswers = allAnswers?.get(1) || {};
                              const trustAnswers = allAnswers?.get(4) || {};
                              const client1Name = basicAnswers['fullName'] as string || 'Client 1';
                              const client2Name = basicAnswers['spouseName'] as string || '';
                              const hasSpouse = (basicAnswers['maritalStatus'] === 'married' || basicAnswers['maritalStatus'] === 'common_law') && client2Name;
                              const trustName = trustAnswers['trustLegalName'] as string || '';
                              const hasTrust = trustAnswers['hasFamilyTrust'] === 'yes' && trustName;

                              const selectedOwners = corporationsData[index]?.owners ?
                                (typeof corporationsData[index].owners === 'string' ?
                                  corporationsData[index].owners.split(',') :
                                  corporationsData[index].owners) : [];

                              const otherOwners = corporationsData[index]?.otherOwners ?
                                (typeof corporationsData[index].otherOwners === 'string' ?
                                  JSON.parse(corporationsData[index].otherOwners) :
                                  corporationsData[index].otherOwners) : [];

                              const hasOtherChecked = corporationsData[index]?.hasOtherOwner === 'true';

                              const handleOwnerChange = (owner: string, checked: boolean) => {
                                let updatedOwners = [...(Array.isArray(selectedOwners) ? selectedOwners : [])];
                                if (checked) {
                                  if (!updatedOwners.includes(owner)) {
                                    updatedOwners.push(owner);
                                  }
                                } else {
                                  updatedOwners = updatedOwners.filter(o => o !== owner);
                                }
                                handleCorporationChange(index, 'owners', updatedOwners.join(','));
                              };

                              const handleOtherOwnerChange = (otherIndex: number, value: string) => {
                                const updated = [...otherOwners];
                                updated[otherIndex] = value;
                                handleCorporationChange(index, 'otherOwners', JSON.stringify(updated));

                                // Update the owners list
                                const predefinedOwners = [client1Name];
                                if (hasSpouse) predefinedOwners.push(client2Name);
                                if (hasTrust) predefinedOwners.push(trustName);
                                corporationsData.forEach((corp, corpIndex) => {
                                  if (corpIndex !== index && corp?.legalName) {
                                    predefinedOwners.push(corp.legalName);
                                  }
                                });

                                const currentSelected = selectedOwners.filter(o => predefinedOwners.includes(o));
                                const validOtherOwners = updated.filter(o => o && o.trim() !== '');
                                const allOwners = [...currentSelected, ...validOtherOwners];
                                handleCorporationChange(index, 'owners', allOwners.join(','));
                              };

                              const handleAddMoreOwner = () => {
                                const updated = [...otherOwners, ''];
                                handleCorporationChange(index, 'otherOwners', JSON.stringify(updated));
                              };

                              const handleRemoveOwner = (otherIndex: number) => {
                                const updated = otherOwners.filter((_: string, i: number) => i !== otherIndex);
                                handleCorporationChange(index, 'otherOwners', JSON.stringify(updated));

                                // Update the owners list
                                const predefinedOwners = [client1Name];
                                if (hasSpouse) predefinedOwners.push(client2Name);
                                if (hasTrust) predefinedOwners.push(trustName);
                                corporationsData.forEach((corp, corpIndex) => {
                                  if (corpIndex !== index && corp?.legalName) {
                                    predefinedOwners.push(corp.legalName);
                                  }
                                });

                                const currentSelected = selectedOwners.filter(o => predefinedOwners.includes(o));
                                const validOtherOwners = updated.filter(o => o && o.trim() !== '');
                                const allOwners = [...currentSelected, ...validOtherOwners];
                                handleCorporationChange(index, 'owners', allOwners.join(','));
                              };

                              const handleOtherCheckboxChange = (checked: boolean) => {
                                handleCorporationChange(index, 'hasOtherOwner', checked.toString());
                                if (checked && otherOwners.length === 0) {
                                  handleCorporationChange(index, 'otherOwners', JSON.stringify(['']));
                                } else if (!checked) {
                                  handleCorporationChange(index, 'otherOwners', JSON.stringify([]));

                                  // Remove other owners from the owners list
                                  const predefinedOwners = [client1Name];
                                  if (hasSpouse) predefinedOwners.push(client2Name);
                                  if (hasTrust) predefinedOwners.push(trustName);
                                  corporationsData.forEach((corp, corpIndex) => {
                                    if (corpIndex !== index && corp?.legalName) {
                                      predefinedOwners.push(corp.legalName);
                                    }
                                  });

                                  const currentSelected = selectedOwners.filter(o => predefinedOwners.includes(o));
                                  handleCorporationChange(index, 'owners', currentSelected.join(','));
                                }
                              };

                              return (
                                <>
                                  <label className="flex items-center">
                                    <input
                                      type="checkbox"
                                      checked={selectedOwners.includes(client1Name)}
                                      onChange={(e) => handleOwnerChange(client1Name, e.target.checked)}
                                      className="mr-2"
                                    />
                                    <span className="text-white">{client1Name}</span>
                                  </label>

                                  {hasSpouse && (
                                    <label className="flex items-center">
                                      <input
                                        type="checkbox"
                                        checked={selectedOwners.includes(client2Name)}
                                        onChange={(e) => handleOwnerChange(client2Name, e.target.checked)}
                                        className="mr-2"
                                      />
                                      <span className="text-white">{client2Name}</span>
                                    </label>
                                  )}

                                  {hasTrust && (
                                    <label className="flex items-center">
                                      <input
                                        type="checkbox"
                                        checked={selectedOwners.includes(trustName)}
                                        onChange={(e) => handleOwnerChange(trustName, e.target.checked)}
                                        className="mr-2"
                                      />
                                      <span className="text-white">{trustName}</span>
                                    </label>
                                  )}

                                  {corporationsData.map((corp, corpIndex) => {
                                    if (corpIndex !== index && corp?.legalName) {
                                      return (
                                        <label key={corpIndex} className="flex items-center">
                                          <input
                                            type="checkbox"
                                            checked={selectedOwners.includes(corp.legalName)}
                                            onChange={(e) => handleOwnerChange(corp.legalName, e.target.checked)}
                                            className="mr-2"
                                          />
                                          <span className="text-white">{corp.legalName}</span>
                                        </label>
                                      );
                                    }
                                    return null;
                                  })}

                                  <label className="flex items-center">
                                    <input
                                      type="checkbox"
                                      checked={hasOtherChecked}
                                      onChange={(e) => handleOtherCheckboxChange(e.target.checked)}
                                      className="mr-2"
                                    />
                                    <span className="text-white">Other</span>
                                  </label>

                                  {hasOtherChecked && (
                                    <div className="ml-6 mt-4 space-y-4">
                                      {otherOwners.map((ownerName: string, otherIndex: number) => (
                                        <div key={otherIndex} className="space-y-2">
                                          <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                              Enter owner name:
                                            </label>
                                            <input
                                              type="text"
                                              value={ownerName}
                                              onChange={(e) => handleOtherOwnerChange(otherIndex, e.target.value)}
                                              placeholder="Enter name"
                                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                          </div>

                                          {otherIndex === otherOwners.length - 1 && ownerName && ownerName.trim() !== '' && (
                                            <div>
                                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Are there any additional shareholders of this corporation?
                                              </label>
                                              <div className="flex gap-4">
                                                <label className="flex items-center">
                                                  <input
                                                    type="radio"
                                                    name={`additionalShareholders-${index}-${otherIndex}`}
                                                    value="yes"
                                                    onChange={() => handleAddMoreOwner()}
                                                    className="mr-2"
                                                  />
                                                  <span className="text-gray-300">Yes</span>
                                                </label>
                                                <label className="flex items-center">
                                                  <input
                                                    type="radio"
                                                    name={`additionalShareholders-${index}-${otherIndex}`}
                                                    value="no"
                                                    onChange={() => {}}
                                                    className="mr-2"
                                                  />
                                                  <span className="text-gray-300">No</span>
                                                </label>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Location of the Articles of Incorporation
                          </label>
                          <input
                            type="text"
                            value={corporationsData[index]?.articlesLocation || ''}
                            onChange={(e) => handleCorporationChange(index, 'articlesLocation', e.target.value)}
                            placeholder="e.g., Home office filing cabinet, Safety deposit box, etc."
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Location of Corporate Minute Book
                          </label>
                          <input
                            type="text"
                            value={corporationsData[index]?.minuteBookLocation || ''}
                            onChange={(e) => handleCorporationChange(index, 'minuteBookLocation', e.target.value)}
                            placeholder="e.g., Home office filing cabinet, Safety deposit box, etc."
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Is there a shareholder agreement? *
                          </label>
                          <div className="flex gap-4">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name={`hasShareholderAgreement-${index}`}
                                value="yes"
                                checked={corporationsData[index]?.hasShareholderAgreement === 'yes'}
                                onChange={(e) => handleCorporationChange(index, 'hasShareholderAgreement', e.target.value)}
                                className="mr-2"
                              />
                              <span className="text-gray-300">Yes</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name={`hasShareholderAgreement-${index}`}
                                value="no"
                                checked={corporationsData[index]?.hasShareholderAgreement === 'no'}
                                onChange={(e) => handleCorporationChange(index, 'hasShareholderAgreement', e.target.value)}
                                className="mr-2"
                              />
                              <span className="text-gray-300">No</span>
                            </label>
                          </div>
                        </div>

                        {corporationsData[index]?.hasShareholderAgreement === 'yes' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Location of the shareholder agreement *
                            </label>
                            <input
                              type="text"
                              value={corporationsData[index]?.shareholderAgreementLocation || ''}
                              onChange={(e) => handleCorporationChange(index, 'shareholderAgreementLocation', e.target.value)}
                              placeholder="e.g., Home office filing cabinet, Safety deposit box, etc."
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step.id === 14 && (() => {
            const basicAnswers = allAnswers?.get(1) || {};
            const hasSpouse = (basicAnswers['maritalStatus'] === 'married' || basicAnswers['maritalStatus'] === 'common_law');
            const client1Name = basicAnswers['fullName'] as string || 'you';
            const client2Name = basicAnswers['spouseName'] as string || 'your spouse';

            const client1WillKeys = new Set([
              'client1HasWill','client1WillYear','client1WillPreparedInCanada','client1WillCountry',
              'client1WillProvince','client1WillStorageLocation','client1HasDigitalWillCopy',
              'client1DigitalWillLocation','client1HasSecondaryWill',
              'client1SecondaryWillSameTimeAndJurisdiction','client1SecondaryWillJurisdiction',
              'client1SecondaryWillDate','client1HasWillMeaningfulChanges',
              'client1WillMeaningfulChangesDetails','client1HasHensonTrust',
            ]);
            const client2WillKeys = new Set([
              'client2HasWill','client2WillYear','client2WillPreparedInCanada','client2WillCountry',
              'client2WillProvince','client2WillStorageLocation','client2HasDigitalWillCopy',
              'client2DigitalWillLocation','client2HasSecondaryWill',
              'client2SecondaryWillSameTimeAndJurisdiction','client2SecondaryWillJurisdiction',
              'client2SecondaryWillDate','client2HasWillMeaningfulChanges',
              'client2WillMeaningfulChangesDetails',
            ]);
            const client1PoaPersonalCareKeys = new Set([
              'client1HasPoaPersonalCare','client1SpouseIsPoaPersonalCare',
              'client1PoaPersonalCareName','client1PoaPersonalCarePhone','client1PoaPersonalCareEmail',
              'client1PoaPersonalCareRelationship','client1PoaPersonalCareIsCanadaResident',
              'client1PoaPersonalCareCountry','client1PoaPersonalCareProvince','client1PoaPersonalCareCity',
              'client1PoaPersonalCareHasDocCopy','client1HasAlternatePoaPersonalCare',
              'client1AlternatePoaPersonalCare1Name','client1AlternatePoaPersonalCare1Phone',
              'client1AlternatePoaPersonalCare1Email','client1AlternatePoaPersonalCare1Relationship',
              'client1AlternatePoaPersonalCare1IsCanadaResident','client1AlternatePoaPersonalCare1Country',
              'client1AlternatePoaPersonalCare1Province','client1AlternatePoaPersonalCare1City',
              'client1AlternatePoaPersonalCare1HasDocCopy','client1HasAlternatePoaPersonalCare2',
              'client1AlternatePoaPersonalCare2Name','client1AlternatePoaPersonalCare2Phone',
              'client1AlternatePoaPersonalCare2Email','client1AlternatePoaPersonalCare2Relationship',
              'client1AlternatePoaPersonalCare2IsCanadaResident','client1AlternatePoaPersonalCare2Country',
              'client1AlternatePoaPersonalCare2Province','client1AlternatePoaPersonalCare2City',
              'client1AlternatePoaPersonalCare2HasDocCopy','client1HasAlternatePoaPersonalCare3',
            ]);
            const client2PoaPersonalCareKeys = new Set([
              'client2HasPoaPersonalCare','client2SpouseIsPoaPersonalCare',
              'client2PoaPersonalCareName','client2PoaPersonalCarePhone','client2PoaPersonalCareEmail',
              'client2PoaPersonalCareRelationship','client2PoaPersonalCareIsCanadaResident',
              'client2PoaPersonalCareCountry','client2PoaPersonalCareProvince','client2PoaPersonalCareCity',
              'client2PoaPersonalCareHasDocCopy','client2HasAlternatePoaPersonalCare',
              'client2AlternatePoaPersonalCare1Name','client2AlternatePoaPersonalCare1Phone',
              'client2AlternatePoaPersonalCare1Email','client2AlternatePoaPersonalCare1Relationship',
              'client2AlternatePoaPersonalCare1IsCanadaResident','client2AlternatePoaPersonalCare1Country',
              'client2AlternatePoaPersonalCare1Province','client2AlternatePoaPersonalCare1City',
              'client2AlternatePoaPersonalCare1HasDocCopy','client2HasAlternatePoaPersonalCare2',
              'client2AlternatePoaPersonalCare2Name','client2AlternatePoaPersonalCare2Phone',
              'client2AlternatePoaPersonalCare2Email','client2AlternatePoaPersonalCare2Relationship',
              'client2AlternatePoaPersonalCare2IsCanadaResident','client2AlternatePoaPersonalCare2Country',
              'client2AlternatePoaPersonalCare2Province','client2AlternatePoaPersonalCare2City',
              'client2AlternatePoaPersonalCare2HasDocCopy','client2HasAlternatePoaPersonalCare3',
              'client2AlternatePoaPersonalCare3Name','client2AlternatePoaPersonalCare3Phone',
              'client2AlternatePoaPersonalCare3Email','client2AlternatePoaPersonalCare3Relationship',
              'client2AlternatePoaPersonalCare3IsCanadaResident','client2AlternatePoaPersonalCare3Country',
              'client2AlternatePoaPersonalCare3Province','client2AlternatePoaPersonalCare3City',
              'client2AlternatePoaPersonalCare3HasDocCopy',
            ]);

            const renderQuestion = (question: typeof step.questions[0]) => {
              if (question.condition && !question.condition(answers, allAnswers)) return null;

              let customLabel = typeof question.label === 'function'
                ? question.label(allAnswers || new Map())
                : question.label;

              if (question.key === 'client1UsesAccountant') customLabel = `Do you (${client1Name}) use a professional accountant?`;
              if (question.key === 'client2UsesAccountant') customLabel = `Does ${client2Name} use a professional accountant?`;
              if (question.key === 'client1AccountingRecordsLocation') customLabel = `${client1Name}, where are your accounting records kept?`;
              if (question.key === 'client2AccountingRecordsLocation') customLabel = `${client2Name}, where are your accounting records kept?`;
              if (question.key === 'accountantSamePerson') customLabel = `${client1Name} and ${client2Name}, do you use the same accountant?`;
              if (question.key === 'client1IsCameronSmithAdvisor') customLabel = `${client1Name}, is Cameron Smith, CFP® your financial advisor?`;
              if (question.key === 'client1FinancialAdvisors') customLabel = `${client1Name}, how many Financial Advisors do you work with?`;
              if (question.key === 'client2IsCameronSmithAdvisor') customLabel = `${client2Name}, is Cameron Smith, CFP® your financial advisor?`;
              if (question.key === 'client2FinancialAdvisors') customLabel = `${client2Name}, how many Financial Advisors do you work with?`;
              if (question.key === 'client1HasFuneralArrangements') customLabel = `${client1Name}, have you made arrangements for Funeral or Cemetery services?`;
              if (question.key === 'client1FuneralArrangementsLocation') customLabel = `Where is this document located?`;
              if (question.key === 'client1HasDiscussedFuneral') customLabel = `${client1Name}, have you communicated to your loved ones what type of funeral you would like to have?`;
              if (question.key === 'client1FuneralWrittenDown') customLabel = `Is this written down anywhere?`;
              if (question.key === 'client1FuneralDocLocation') customLabel = `Where is this document stored?`;
              if (question.key === 'client2HasFuneralArrangements') customLabel = `${client2Name}, have you made arrangements for Funeral or Cemetery services?`;
              if (question.key === 'client2FuneralArrangementsLocation') customLabel = `Where is this document located?`;
              if (question.key === 'client2HasDiscussedFuneral') customLabel = `${client2Name}, have you communicated to your loved ones what type of funeral you would like to have?`;
              if (question.key === 'client2FuneralWrittenDown') customLabel = `Is this written down anywhere?`;
              if (question.key === 'client2FuneralDocLocation') customLabel = `Where is this document stored?`;

              return (
                <FormField
                  key={question.key}
                  question={{ ...question, label: customLabel }}
                  value={answers[question.key]}
                  onChange={(value) => onAnswerChange(question.key, value)}
                />
              );
            };

            const client1PoaPropertyKeys = new Set([
              'client1HasPoaProperty','client1PoaPropertySameAsPersonalCare',
              'client1PoaPropertyName','client1PoaPropertyPhone','client1PoaPropertyEmail',
              'client1PoaPropertyRelationship','client1PoaPropertyIsCanadaResident',
              'client1PoaPropertyCountry','client1PoaPropertyProvince','client1PoaPropertyCity',
              'client1PoaPropertyHasDocCopy','client1HasAlternatePoaProperty',
              'client1AlternatePoaProperty1Name','client1AlternatePoaProperty1Phone',
              'client1AlternatePoaProperty1Email','client1AlternatePoaProperty1Relationship',
              'client1AlternatePoaProperty1IsCanadaResident','client1AlternatePoaProperty1Country',
              'client1AlternatePoaProperty1Province','client1AlternatePoaProperty1City',
              'client1HasAlternatePoaProperty2',
              'client1AlternatePoaProperty2Name','client1AlternatePoaProperty2Phone',
              'client1AlternatePoaProperty2Email','client1AlternatePoaProperty2Relationship',
              'client1AlternatePoaProperty2IsCanadaResident','client1AlternatePoaProperty2Country',
              'client1AlternatePoaProperty2Province','client1AlternatePoaProperty2City',
              'client1HasAlternatePoaProperty3',
            ]);

            const prefillPropertyFromPersonalCare = answers['client1HasPoaProperty'] === 'yes' &&
              answers['client1HasPoaPersonalCare'] === 'yes' &&
              answers['client1PoaPropertySameAsPersonalCare'] === 'yes';

            const renderPoaPropertyQuestion = (question: typeof step.questions[0]) => {
              if (question.condition && !question.condition(answers, allAnswers)) return null;
              const prefillKeys = new Set([
                'client1PoaPropertyName','client1PoaPropertyPhone','client1PoaPropertyEmail',
                'client1PoaPropertyRelationship','client1PoaPropertyIsCanadaResident',
                'client1PoaPropertyCountry','client1PoaPropertyProvince','client1PoaPropertyCity',
              ]);
              if (prefillPropertyFromPersonalCare && prefillKeys.has(question.key)) {
                const pcKeyMap: Record<string, string> = {
                  client1PoaPropertyName: 'client1PoaPersonalCareName',
                  client1PoaPropertyPhone: 'client1PoaPersonalCarePhone',
                  client1PoaPropertyEmail: 'client1PoaPersonalCareEmail',
                  client1PoaPropertyRelationship: 'client1PoaPersonalCareRelationship',
                  client1PoaPropertyIsCanadaResident: 'client1PoaPersonalCareIsCanadaResident',
                  client1PoaPropertyCountry: 'client1PoaPersonalCareCountry',
                  client1PoaPropertyProvince: 'client1PoaPersonalCareProvince',
                  client1PoaPropertyCity: 'client1PoaPersonalCareCity',
                };
                const pcKey = pcKeyMap[question.key];
                const prefillValue = answers[pcKey] as string || '';
                let label = typeof question.label === 'function'
                  ? question.label(allAnswers || new Map())
                  : question.label;
                return (
                  <div key={question.key} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">{label}</label>
                    <input
                      type="text"
                      value={prefillValue}
                      disabled
                      className="w-full px-4 py-2 bg-gray-600/50 border border-gray-500 text-gray-300 rounded-lg cursor-not-allowed italic"
                    />
                    <p className="text-xs text-blue-400">Pre-filled from Power of Attorney for Personal Care</p>
                  </div>
                );
              }
              return renderQuestion(question);
            };

            const client2PoaPropertyKeys = new Set([
              'client2HasPoaProperty','client2PoaPropertySameAsPersonalCare',
              'client2PoaPropertyName','client2PoaPropertyPhone','client2PoaPropertyEmail',
              'client2PoaPropertyRelationship','client2PoaPropertyIsCanadaResident',
              'client2PoaPropertyCountry','client2PoaPropertyProvince','client2PoaPropertyCity',
              'client2PoaPropertyHasDocCopy','client2HasAlternatePoaProperty',
              'client2AlternatePoaProperty1Name','client2AlternatePoaProperty1Phone',
              'client2AlternatePoaProperty1Email','client2AlternatePoaProperty1Relationship',
              'client2AlternatePoaProperty1IsCanadaResident','client2AlternatePoaProperty1Country',
              'client2AlternatePoaProperty1Province','client2AlternatePoaProperty1City',
              'client2HasAlternatePoaProperty2',
              'client2AlternatePoaProperty2Name','client2AlternatePoaProperty2Phone',
              'client2AlternatePoaProperty2Email','client2AlternatePoaProperty2Relationship',
              'client2AlternatePoaProperty2IsCanadaResident','client2AlternatePoaProperty2Country',
              'client2AlternatePoaProperty2Province','client2AlternatePoaProperty2City',
              'client2HasAlternatePoaProperty3',
            ]);

            const prefillClient2PropertyFromPersonalCare = hasSpouse &&
              answers['client2HasPoaProperty'] === 'yes' &&
              answers['client2HasPoaPersonalCare'] === 'yes' &&
              answers['client2PoaPropertySameAsPersonalCare'] === 'yes';

            const renderPoaPropertyQuestion2 = (question: typeof step.questions[0]) => {
              if (question.condition && !question.condition(answers, allAnswers)) return null;
              const prefillKeys2 = new Set([
                'client2PoaPropertyName','client2PoaPropertyPhone','client2PoaPropertyEmail',
                'client2PoaPropertyRelationship','client2PoaPropertyIsCanadaResident',
                'client2PoaPropertyCountry','client2PoaPropertyProvince','client2PoaPropertyCity',
              ]);
              if (prefillClient2PropertyFromPersonalCare && prefillKeys2.has(question.key)) {
                const pcKeyMap2: Record<string, string> = {
                  client2PoaPropertyName: 'client2PoaPersonalCareName',
                  client2PoaPropertyPhone: 'client2PoaPersonalCarePhone',
                  client2PoaPropertyEmail: 'client2PoaPersonalCareEmail',
                  client2PoaPropertyRelationship: 'client2PoaPersonalCareRelationship',
                  client2PoaPropertyIsCanadaResident: 'client2PoaPersonalCareIsCanadaResident',
                  client2PoaPropertyCountry: 'client2PoaPersonalCareCountry',
                  client2PoaPropertyProvince: 'client2PoaPersonalCareProvince',
                  client2PoaPropertyCity: 'client2PoaPersonalCareCity',
                };
                const pcKey2 = pcKeyMap2[question.key];
                const prefillValue2 = answers[pcKey2] as string || '';
                const label2 = typeof question.label === 'function'
                  ? question.label(allAnswers || new Map())
                  : question.label;
                return (
                  <div key={question.key} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">{label2}</label>
                    <input
                      type="text"
                      value={prefillValue2}
                      disabled
                      className="w-full px-4 py-2 bg-gray-600/50 border border-gray-500 text-gray-300 rounded-lg cursor-not-allowed italic"
                    />
                    <p className="text-xs text-blue-400">Pre-filled from Power of Attorney for Personal Care</p>
                  </div>
                );
              }
              return renderQuestion(question);
            };

            const client1EstateTrusteeKeys = new Set([
              'client1HasEstateTrustee','client1SpouseIsEstateTrustee',
              'client1EstateTrusteeName','client1EstateTrusteePhone','client1EstateTrusteeEmail',
              'client1EstateTrusteeRelationship','client1EstateTrusteeIsCanadaResident',
              'client1EstateTrusteeCountry','client1EstateTrusteeProvince','client1EstateTrusteeCity',
              'client1EstateTrusteeHasDocCopy','client1HasAlternateEstateTrustee',
              'client1AlternateEstateTrustee1Name','client1AlternateEstateTrustee1Phone',
              'client1AlternateEstateTrustee1Email','client1AlternateEstateTrustee1Relationship',
              'client1AlternateEstateTrustee1IsCanadaResident','client1AlternateEstateTrustee1Country',
              'client1AlternateEstateTrustee1Province','client1AlternateEstateTrustee1City',
              'client1AlternateEstateTrustee1HasDocCopy','client1HasAlternateEstateTrustee2',
              'client1AlternateEstateTrustee2Name','client1AlternateEstateTrustee2Phone',
              'client1AlternateEstateTrustee2Email','client1AlternateEstateTrustee2Relationship',
              'client1AlternateEstateTrustee2IsCanadaResident','client1AlternateEstateTrustee2Country',
              'client1AlternateEstateTrustee2Province','client1AlternateEstateTrustee2City',
              'client1AlternateEstateTrustee2HasDocCopy','client1HasAlternateEstateTrustee3',
            ]);
            const client2EstateTrusteeKeys = new Set([
              'client2HasEstateTrustee','client2SpouseIsEstateTrustee',
              'client2EstateTrusteeName','client2EstateTrusteePhone','client2EstateTrusteeEmail',
              'client2EstateTrusteeRelationship','client2EstateTrusteeIsCanadaResident',
              'client2EstateTrusteeCountry','client2EstateTrusteeProvince','client2EstateTrusteeCity',
              'client2EstateTrusteeHasDocCopy','client2HasAlternateEstateTrustee',
              'client2AlternateEstateTrustee1Name','client2AlternateEstateTrustee1Phone',
              'client2AlternateEstateTrustee1Email','client2AlternateEstateTrustee1Relationship',
              'client2AlternateEstateTrustee1IsCanadaResident','client2AlternateEstateTrustee1Country',
              'client2AlternateEstateTrustee1Province','client2AlternateEstateTrustee1City',
              'client2AlternateEstateTrustee1HasDocCopy','client2HasAlternateEstateTrustee2',
              'client2AlternateEstateTrustee2Name','client2AlternateEstateTrustee2Phone',
              'client2AlternateEstateTrustee2Email','client2AlternateEstateTrustee2Relationship',
              'client2AlternateEstateTrustee2IsCanadaResident','client2AlternateEstateTrustee2Country',
              'client2AlternateEstateTrustee2Province','client2AlternateEstateTrustee2City',
              'client2AlternateEstateTrustee2HasDocCopy','client2HasAlternateEstateTrustee3',
            ]);

            const funeralPlanningKeys = new Set([
              'client1HasFuneralArrangements','client1FuneralArrangementsLocation',
              'client1HasDiscussedFuneral','client1FuneralWrittenDown','client1FuneralDocLocation',
              'client2HasFuneralArrangements','client2FuneralArrangementsLocation',
              'client2HasDiscussedFuneral','client2FuneralWrittenDown','client2FuneralDocLocation',
            ]);

            const client1WillQuestions = step.questions.filter(q => client1WillKeys.has(q.key));
            const client2WillQuestions = step.questions.filter(q => client2WillKeys.has(q.key));
            const client1PoaPersonalCareQuestions = step.questions.filter(q => client1PoaPersonalCareKeys.has(q.key));
            const client2PoaPersonalCareQuestions = step.questions.filter(q => client2PoaPersonalCareKeys.has(q.key));
            const client1PoaPropertyQuestions = step.questions.filter(q => client1PoaPropertyKeys.has(q.key));
            const client2PoaPropertyQuestions = step.questions.filter(q => client2PoaPropertyKeys.has(q.key));
            const funeralPlanningQuestions = step.questions.filter(q => funeralPlanningKeys.has(q.key));
            const client1EstateTrusteeQuestions = step.questions.filter(q => client1EstateTrusteeKeys.has(q.key));
            const client2EstateTrusteeQuestions = step.questions.filter(q => client2EstateTrusteeKeys.has(q.key));
            const otherQuestions = step.questions.filter(q =>
              !client1WillKeys.has(q.key) && !client2WillKeys.has(q.key) &&
              !client1PoaPersonalCareKeys.has(q.key) && !client2PoaPersonalCareKeys.has(q.key) &&
              !client1PoaPropertyKeys.has(q.key) && !client2PoaPropertyKeys.has(q.key) &&
              !client1EstateTrusteeKeys.has(q.key) && !client2EstateTrusteeKeys.has(q.key) &&
              !funeralPlanningKeys.has(q.key)
            );

            return (
              <>
                <Subsection title={`${client1Name} — Will`}>
                  {client1WillQuestions.map(q => renderQuestion(q))}
                </Subsection>

                {hasSpouse && (
                  <Subsection title={`${client2Name} — Will`}>
                    {client2WillQuestions.map(q => renderQuestion(q))}
                  </Subsection>
                )}

                <Subsection title={`${client1Name} — Power of Attorney for Personal Care`}>
                  {client1PoaPersonalCareQuestions.map(q => renderQuestion(q))}
                </Subsection>

                {hasSpouse && (
                  <Subsection title={`${client2Name} — Power of Attorney for Personal Care`}>
                    {client2PoaPersonalCareQuestions.map(q => renderQuestion(q))}
                  </Subsection>
                )}

                <Subsection title={`${client1Name} — Power of Attorney for Property`}>
                  {client1PoaPropertyQuestions.map(q => renderPoaPropertyQuestion(q))}
                </Subsection>

                {hasSpouse && (
                  <Subsection title={`${client2Name} — Power of Attorney for Property`}>
                    {client2PoaPropertyQuestions.map(q => renderPoaPropertyQuestion2(q))}
                  </Subsection>
                )}

                <Subsection title={`${client1Name} — Estate Trustee (Executor)`}>
                  {client1EstateTrusteeQuestions.map(q => renderQuestion(q))}
                </Subsection>

                {hasSpouse && (
                  <Subsection title={`${client2Name} — Estate Trustee (Executor)`}>
                    {client2EstateTrusteeQuestions.map(q => renderQuestion(q))}
                  </Subsection>
                )}

                <Subsection title="Funeral Planning">
                  {funeralPlanningQuestions.map(q => renderQuestion(q))}
                </Subsection>

                {otherQuestions.map((question) => {

                if (question.key.startsWith('client2') && question.key.includes('Will') && !hasSpouse) {
                  return null;
                }
                if (question.condition && !question.condition(answers)) {
                  return null;
                }

                if (question.key === 'client2UsesAccountant' && !hasSpouse) {
                  return null;
                }
                if (question.key === 'spouseIsPoaPersonalCare') {
                  const basicAnswers = allAnswers?.get(1);
                  const maritalStatus = basicAnswers?.maritalStatus;
                  if (answers['client1HasPoaPersonalCare'] !== 'yes' ||
                      (maritalStatus !== 'married' && maritalStatus !== 'common_law')) {
                    return null;
                  }
                }
                if (question.key === 'spouseIsPoaProperty') {
                  const basicAnswers = allAnswers?.get(1);
                  const maritalStatus = basicAnswers?.maritalStatus;
                  if (answers['client1HasPoaProperty'] !== 'yes' ||
                      (maritalStatus !== 'married' && maritalStatus !== 'common_law')) {
                    return null;
                  }
                }
                if (question.key === 'client1HasContingentPoaPersonalCare' && answers['client1HasPoaPersonalCare'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client1HasLivingWill' && answers['client1HasPoaPersonalCare'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client1PoaPersonalCareCount' && answers['client1HasContingentPoaPersonalCare'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client1HasContingentPoaProperty' && answers['client1HasPoaProperty'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client1PoaPropertyCount' && answers['client1HasContingentPoaProperty'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client1PoaPropertyHasDocCopy' && answers['client1HasPoaProperty'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2HasPoaPersonalCare' && !hasSpouse) {
                  return null;
                }
                if (question.key === 'client2SpouseIsPoaPersonalCare' && (answers['client2HasPoaPersonalCare'] !== 'yes' || !hasSpouse)) {
                  return null;
                }
                if (question.key === 'client2HasContingentPoaPersonalCare' && answers['client2HasPoaPersonalCare'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2HasLivingWill' && (answers['client2HasPoaPersonalCare'] !== 'yes' || !hasSpouse)) {
                  return null;
                }
                if (question.key === 'client2PoaPersonalCareDocLocation' && (answers['client2HasPoaPersonalCare'] !== 'yes' || !hasSpouse)) {
                  return null;
                }
                if (question.key === 'client2PoaPersonalCareCount' && answers['client2HasContingentPoaPersonalCare'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2PoaPersonalCareHasDocCopy' && answers['client2HasPoaPersonalCare'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2HasPoaProperty' && !hasSpouse) {
                  return null;
                }
                if (question.key === 'client2SpouseIsPoaProperty') {
                  const basicAnswers = allAnswers?.get(1);
                  const maritalStatus = basicAnswers?.maritalStatus;
                  if (answers['client2HasPoaProperty'] !== 'yes' ||
                      (maritalStatus !== 'married' && maritalStatus !== 'common_law')) {
                    return null;
                  }
                }
                if (question.key === 'client2HasContingentPoaProperty' && answers['client2HasPoaProperty'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2PoaPropertyCount' && answers['client2HasPoaProperty'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2PoaPropertyHasDocCopy' && answers['client2HasPoaProperty'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client1FuneralArrangementsLocation' && answers['client1HasFuneralArrangements'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client1FuneralWrittenDown' && answers['client1HasDiscussedFuneral'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client1FuneralDocLocation' && answers['client1FuneralWrittenDown'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2HasFuneralArrangements' && !hasSpouse) {
                  return null;
                }
                if (question.key === 'client2FuneralArrangementsLocation' && (!hasSpouse || answers['client2HasFuneralArrangements'] !== 'yes')) {
                  return null;
                }
                if (question.key === 'client2HasDiscussedFuneral' && !hasSpouse) {
                  return null;
                }
                if (question.key === 'client2FuneralWrittenDown' && (!hasSpouse || answers['client2HasDiscussedFuneral'] !== 'yes')) {
                  return null;
                }
                if (question.key === 'client2FuneralDocLocation' && (!hasSpouse || answers['client2FuneralWrittenDown'] !== 'yes')) {
                  return null;
                }
                if (question.key === 'client1AccountingRecordsLocation' && answers['client1UsesAccountant'] !== 'no') {
                  return null;
                }
                if (question.key === 'client2AccountingRecordsLocation' && (answers['client2UsesAccountant'] !== 'no' || !hasSpouse)) {
                  return null;
                }
                if (question.key === 'accountantSamePerson' && !(answers['client1UsesAccountant'] === 'yes' && answers['client2UsesAccountant'] === 'yes')) {
                  return null;
                }
                if (question.key === 'client2FinancialAdvisors' && !hasSpouse) {
                  return null;
                }
                if (question.key === 'client2IsCameronSmithAdvisor' && !hasSpouse) {
                  return null;
                }

                let customLabel = typeof question.label === 'function'
                  ? question.label(allAnswers || new Map())
                  : question.label;

                if (question.key === 'client1UsesAccountant') {
                  customLabel = `Do you (${client1Name}) use a professional accountant?`;
                }
                if (question.key === 'client2UsesAccountant') {
                  customLabel = `Does ${client2Name} use a professional accountant?`;
                }
                if (question.key === 'client1AccountingRecordsLocation') {
                  customLabel = `${client1Name}, where are your accounting records kept?`;
                }
                if (question.key === 'client2AccountingRecordsLocation') {
                  customLabel = `${client2Name}, where are your accounting records kept?`;
                }
                if (question.key === 'accountantSamePerson') {
                  customLabel = `${client1Name} and ${client2Name}, do you use the same accountant?`;
                }
                if (question.key === 'client1IsCameronSmithAdvisor') {
                  customLabel = `${client1Name}, is Cameron Smith, CFP® your financial advisor?`;
                }
                if (question.key === 'client1FinancialAdvisors') {
                  customLabel = `${client1Name}, how many Financial Advisors do you work with?`;
                }
                if (question.key === 'client2IsCameronSmithAdvisor') {
                  customLabel = `${client2Name}, is Cameron Smith, CFP® your financial advisor?`;
                }
                if (question.key === 'client2FinancialAdvisors') {
                  customLabel = `${client2Name}, how many Financial Advisors do you work with?`;
                }
                if (question.key === 'client1HasFuneralArrangements') {
                  customLabel = `${client1Name}, have you made arrangements for Funeral or Cemetery services?`;
                }
                if (question.key === 'client1FuneralArrangementsLocation') {
                  customLabel = `Where is this document located?`;
                }
                if (question.key === 'client1HasDiscussedFuneral') {
                  customLabel = `${client1Name}, have you communicated to your loved ones what type of funeral you would like to have?`;
                }
                if (question.key === 'client1FuneralWrittenDown') {
                  customLabel = `Is this written down anywhere?`;
                }
                if (question.key === 'client1FuneralDocLocation') {
                  customLabel = `Where is this document stored?`;
                }
                if (question.key === 'client2HasFuneralArrangements') {
                  customLabel = `${client2Name}, have you made arrangements for Funeral or Cemetery services?`;
                }
                if (question.key === 'client2FuneralArrangementsLocation') {
                  customLabel = `Where is this document located?`;
                }
                if (question.key === 'client2HasDiscussedFuneral') {
                  customLabel = `${client2Name}, have you communicated to your loved ones what type of funeral you would like to have?`;
                }
                if (question.key === 'client2FuneralWrittenDown') {
                  customLabel = `Is this written down anywhere?`;
                }
                if (question.key === 'client2FuneralDocLocation') {
                  customLabel = `Where is this document stored?`;
                }
                return (
                  <React.Fragment key={question.key}>
                    <FormField
                      question={{ ...question, label: customLabel }}
                      value={answers[question.key]}
                      onChange={(value) => onAnswerChange(question.key, value)}
                    />
                    {question.key === 'spousesPoaProperty' && answers['spousesPoaProperty'] === 'yes' && (
                      <div className="border border-gray-600 rounded-lg p-6 bg-gray-700 mt-6 mb-6">
                        <h4 className="text-lg font-semibold text-white mb-4">
                          POA for Property #1
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Name *
                            </label>
                            <input
                              type="text"
                              value={client1Name}
                              disabled
                              className="w-full px-4 py-2 bg-gray-500 border border-gray-500 text-white rounded-lg cursor-not-allowed"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Relationship to you *
                            </label>
                            <input
                              type="text"
                              value="Spouse/Common Law Partner"
                              disabled
                              className="w-full px-4 py-2 bg-gray-500 border border-gray-500 text-white rounded-lg cursor-not-allowed"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {question.key === 'client2PoaPersonalCareDisplay' && answers['client2SpouseIsPoaPersonalCare'] === 'yes' && (
                      <div className="border border-gray-600 rounded-lg p-6 bg-gray-700 mt-6 mb-6">
                        <h4 className="text-lg font-semibold text-white mb-4">
                          POA for Personal Care #1
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Name *
                            </label>
                            <input
                              type="text"
                              value={(allAnswers?.get(1)?.fullName as string) || ''}
                              disabled
                              className="w-full px-4 py-2 bg-gray-500 border border-gray-500 text-white rounded-lg cursor-not-allowed"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Relationship to {client2Name} *
                            </label>
                            <input
                              type="text"
                              value="Spouse/Common Law Partner"
                              disabled
                              className="w-full px-4 py-2 bg-gray-500 border border-gray-500 text-white rounded-lg cursor-not-allowed"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {question.key === 'client1PoaPersonalCareCount' && client1PoaPersonalCareCount > 0 && (
                      <div className="space-y-6 mt-6">
                        {answers['spouseIsPoaPersonalCare'] === 'yes' && (
                          <div className="border border-gray-600 rounded-lg p-6 bg-gray-700 mb-6">
                            <h4 className="text-lg font-semibold text-white mb-4">
                              POA for Personal Care #1
                            </h4>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Name *
                                </label>
                                <input
                                  type="text"
                                  value={allAnswers?.get(1)?.spouseName as string || ''}
                                  disabled
                                  className="w-full px-4 py-2 bg-gray-500 border border-gray-500 text-white rounded-lg cursor-not-allowed"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Relationship to You *
                                </label>
                                <input
                                  type="text"
                                  value="Spouse/Common Law Partner"
                                  disabled
                                  className="w-full px-4 py-2 bg-gray-500 border border-gray-500 text-white rounded-lg cursor-not-allowed"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        <h3 className="text-xl font-semibold text-white">
                          {answers['spouseIsPoaPersonalCare'] === 'yes'
                            ? 'Contingent Powers of Attorney for Personal Care Details'
                            : answers['spousesPoaPersonalCare'] === 'yes'
                            ? 'Contingent Powers of Attorney for Personal Care Details'
                            : 'Powers of Attorney for Personal Care Details'}
                        </h3>
                        {Array.from({ length: client1PoaPersonalCareCount }).map((_, index) => (
                          <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                            <h4 className="text-lg font-semibold text-white mb-4">
                              {answers['spouseIsPoaPersonalCare'] === 'yes'
                                ? `Contingent POA for Personal Care #${index + 1}`
                                : answers['spousesPoaPersonalCare'] === 'yes'
                                ? `Contingent POA for Personal Care #${index + 1}`
                                : `POA for Personal Care #${index + 1}`}
                            </h4>

                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Name *
                                </label>
                                <input
                                  type="text"
                                  value={client1PoaPersonalCareData[index]?.name || ''}
                                  onChange={(e) => handlePoaPersonalCareChange(index, 'name', e.target.value)}
                                  placeholder="Enter name"
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Phone Number *
                                </label>
                                <input
                                  type="text"
                                  value={client1PoaPersonalCareData[index]?.phone || ''}
                                  onChange={(e) => handlePoaPersonalCareChange(index, 'phone', e.target.value)}
                                  placeholder="Enter phone number"
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Email Address *
                                </label>
                                <input
                                  type="email"
                                  value={client1PoaPersonalCareData[index]?.email || ''}
                                  onChange={(e) => handlePoaPersonalCareChange(index, 'email', e.target.value)}
                                  placeholder="Enter email address"
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Relationship to You *
                                </label>
                                <input
                                  type="text"
                                  value={client1PoaPersonalCareData[index]?.relationship || ''}
                                  onChange={(e) => handlePoaPersonalCareChange(index, 'relationship', e.target.value)}
                                  placeholder="e.g., Spouse, Child, Sibling, etc."
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Country of Residence *
                                </label>
                                <div className="flex gap-4">
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      value="Canada"
                                      checked={client1PoaPersonalCareData[index]?.country === 'Canada'}
                                      onChange={(e) => handlePoaPersonalCareChange(index, 'country', e.target.value)}
                                      className="mr-2"
                                    />
                                    <span className="text-white">Canada</span>
                                  </label>
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      value="Other"
                                      checked={client1PoaPersonalCareData[index]?.country === 'Other'}
                                      onChange={(e) => handlePoaPersonalCareChange(index, 'country', e.target.value)}
                                      className="mr-2"
                                    />
                                    <span className="text-white">Other</span>
                                  </label>
                                </div>
                              </div>

                              {client1PoaPersonalCareData[index]?.country === 'Other' && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Please specify country *
                                  </label>
                                  <input
                                    type="text"
                                    value={client1PoaPersonalCareData[index]?.otherCountry || ''}
                                    onChange={(e) => handlePoaPersonalCareChange(index, 'otherCountry', e.target.value)}
                                    placeholder="Enter country"
                                    className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>
                              )}

                              {client1PoaPersonalCareData[index]?.country === 'Canada' && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Province/Territory *
                                  </label>
                                  <select
                                    value={client1PoaPersonalCareData[index]?.province || ''}
                                    onChange={(e) => handlePoaPersonalCareChange(index, 'province', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  >
                                    <option value="">Select province/territory</option>
                                    <option value="Alberta">Alberta</option>
                                    <option value="British Columbia">British Columbia</option>
                                    <option value="Manitoba">Manitoba</option>
                                    <option value="New Brunswick">New Brunswick</option>
                                    <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                                    <option value="Northwest Territories">Northwest Territories</option>
                                    <option value="Nova Scotia">Nova Scotia</option>
                                    <option value="Nunavut">Nunavut</option>
                                    <option value="Ontario">Ontario</option>
                                    <option value="Prince Edward Island">Prince Edward Island</option>
                                    <option value="Quebec">Quebec</option>
                                    <option value="Saskatchewan">Saskatchewan</option>
                                    <option value="Yukon">Yukon</option>
                                  </select>
                                </div>
                              )}

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  City of Residence *
                                </label>
                                <input
                                  type="text"
                                  value={client1PoaPersonalCareData[index]?.city || ''}
                                  onChange={(e) => handlePoaPersonalCareChange(index, 'city', e.target.value)}
                                  placeholder="Enter city"
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Does this person have access to your most recent documentation? *
                                </label>
                                <div className="flex flex-col gap-3">
                                  <label className="flex items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                                    <input
                                      type="radio"
                                      value="yes_copy"
                                      checked={client1PoaPersonalCareData[index]?.providedCopy === 'yes_copy'}
                                      onChange={(e) => handlePoaPersonalCareChange(index, 'providedCopy', e.target.value)}
                                      className="mr-3"
                                    />
                                    <span className="text-white">Yes - they have a copy</span>
                                  </label>
                                  <label className="flex items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                                    <input
                                      type="radio"
                                      value="yes_instructions"
                                      checked={client1PoaPersonalCareData[index]?.providedCopy === 'yes_instructions'}
                                      onChange={(e) => handlePoaPersonalCareChange(index, 'providedCopy', e.target.value)}
                                      className="mr-3"
                                    />
                                    <span className="text-white">Yes - they have instructions on where/how to access the documentation</span>
                                  </label>
                                  <label className="flex items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                                    <input
                                      type="radio"
                                      value="no"
                                      checked={client1PoaPersonalCareData[index]?.providedCopy === 'no'}
                                      onChange={(e) => handlePoaPersonalCareChange(index, 'providedCopy', e.target.value)}
                                      className="mr-3"
                                    />
                                    <span className="text-white">No</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {question.key === 'client1PoaPersonalCareCount' && client1PoaPersonalCareCount > 0 && (
                      <div className="mt-6 border border-gray-600 rounded-lg p-6 bg-gray-700">
                        <label className="block text-lg font-medium text-white mb-4">
                          {allAnswers?.get(1)?.fullName || 'Client 1'}, where is the Power of Attorney for Personal Care document located?
                        </label>
                        <input
                          type="text"
                          value={(answers['client1PoaPersonalCareDocLocation'] as string) || ''}
                          onChange={(e) => onAnswerChange('client1PoaPersonalCareDocLocation', e.target.value)}
                          placeholder="Enter location"
                          className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    )}
                    {question.key === 'client1PoaPropertyCount' && client1PoaPropertyCount > 0 && (
                      <div className="space-y-6 mt-6">
                        {answers['spouseIsPoaProperty'] === 'yes' && (
                          <div className="border border-gray-600 rounded-lg p-6 bg-gray-700 mb-6">
                            <h4 className="text-lg font-semibold text-white mb-4">
                              POA for Property #1
                            </h4>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Name *
                                </label>
                                <input
                                  type="text"
                                  value={allAnswers?.get(1)?.spouseName as string || ''}
                                  disabled
                                  className="w-full px-4 py-2 bg-gray-500 border border-gray-500 text-white rounded-lg cursor-not-allowed"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Relationship to You *
                                </label>
                                <input
                                  type="text"
                                  value="Spouse/Common Law Partner"
                                  disabled
                                  className="w-full px-4 py-2 bg-gray-500 border border-gray-500 text-white rounded-lg cursor-not-allowed"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        <h3 className="text-xl font-semibold text-white">
                          {answers['spouseIsPoaProperty'] === 'yes'
                            ? 'Contingent or additional Powers of Attorney for Property'
                            : answers['spousesPoaProperty'] === 'yes'
                            ? 'Contingent or additional Powers of Attorney for Property'
                            : 'Powers of Attorney for Property Details'}
                        </h3>
                        {Array.from({ length: client1PoaPropertyCount }).map((_, index) => (
                          <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                            <h4 className="text-lg font-semibold text-white mb-4">
                              {answers['spouseIsPoaProperty'] === 'yes'
                                ? `Alternative or Contingent POA for Property #${index + 1}`
                                : answers['spousesPoaProperty'] === 'yes'
                                ? `Alternative or Contingent POA for Property #${index + 1}`
                                : `POA for Property #${index + 1}`}
                            </h4>

                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Name *
                                </label>
                                <input
                                  type="text"
                                  value={client1PoaPropertyData[index]?.name || ''}
                                  onChange={(e) => handlePoaPropertyChange(index, 'name', e.target.value)}
                                  placeholder="Enter name"
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Phone Number *
                                </label>
                                <input
                                  type="text"
                                  value={client1PoaPropertyData[index]?.phone || ''}
                                  onChange={(e) => handlePoaPropertyChange(index, 'phone', e.target.value)}
                                  placeholder="Enter phone number"
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Email Address *
                                </label>
                                <input
                                  type="email"
                                  value={client1PoaPropertyData[index]?.email || ''}
                                  onChange={(e) => handlePoaPropertyChange(index, 'email', e.target.value)}
                                  placeholder="Enter email address"
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Relationship to You *
                                </label>
                                <input
                                  type="text"
                                  value={client1PoaPropertyData[index]?.relationship || ''}
                                  onChange={(e) => handlePoaPropertyChange(index, 'relationship', e.target.value)}
                                  placeholder="e.g., Spouse, Child, Sibling, etc."
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Country of Residence *
                                </label>
                                <div className="flex gap-4">
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      value="Canada"
                                      checked={client1PoaPropertyData[index]?.country === 'Canada'}
                                      onChange={(e) => handlePoaPropertyChange(index, 'country', e.target.value)}
                                      className="mr-2"
                                    />
                                    <span className="text-white">Canada</span>
                                  </label>
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      value="Other"
                                      checked={client1PoaPropertyData[index]?.country === 'Other'}
                                      onChange={(e) => handlePoaPropertyChange(index, 'country', e.target.value)}
                                      className="mr-2"
                                    />
                                    <span className="text-white">Other</span>
                                  </label>
                                </div>
                              </div>

                              {client1PoaPropertyData[index]?.country === 'Other' && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Please specify country *
                                  </label>
                                  <input
                                    type="text"
                                    value={client1PoaPropertyData[index]?.otherCountry || ''}
                                    onChange={(e) => handlePoaPropertyChange(index, 'otherCountry', e.target.value)}
                                    placeholder="Enter country"
                                    className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>
                              )}

                              {client1PoaPropertyData[index]?.country === 'Canada' && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Province/Territory *
                                  </label>
                                  <select
                                    value={client1PoaPropertyData[index]?.province || ''}
                                    onChange={(e) => handlePoaPropertyChange(index, 'province', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  >
                                    <option value="">Select province/territory</option>
                                    <option value="Alberta">Alberta</option>
                                    <option value="British Columbia">British Columbia</option>
                                    <option value="Manitoba">Manitoba</option>
                                    <option value="New Brunswick">New Brunswick</option>
                                    <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                                    <option value="Northwest Territories">Northwest Territories</option>
                                    <option value="Nova Scotia">Nova Scotia</option>
                                    <option value="Nunavut">Nunavut</option>
                                    <option value="Ontario">Ontario</option>
                                    <option value="Prince Edward Island">Prince Edward Island</option>
                                    <option value="Quebec">Quebec</option>
                                    <option value="Saskatchewan">Saskatchewan</option>
                                    <option value="Yukon">Yukon</option>
                                  </select>
                                </div>
                              )}

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  City of Residence *
                                </label>
                                <input
                                  type="text"
                                  value={client1PoaPropertyData[index]?.city || ''}
                                  onChange={(e) => handlePoaPropertyChange(index, 'city', e.target.value)}
                                  placeholder="Enter city"
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {question.key === 'client1EstateTrusteeCount' && client1EstateTrusteeCount > 0 && (
                      <div className="space-y-6 mt-6">
                        <h3 className="text-xl font-semibold text-white">Estate Trustees Details</h3>
                        {Array.from({ length: client1EstateTrusteeCount }).map((_, index) => (
                          <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                            <h4 className="text-lg font-semibold text-white mb-4">Estate Trustee #{index + 1}</h4>

                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Is this Trustee a person or a Corporate Trustee (through a Trust Company)? *
                                </label>
                                <div className="flex gap-4">
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      name={`client1_estate_trustee_type_${index}`}
                                      value="person"
                                      checked={client1EstateTrusteeData[index]?.type === 'person' || !client1EstateTrusteeData[index]?.type}
                                      onChange={(e) => handleEstateTrusteeChange(index, 'type', e.target.value)}
                                      className="mr-2"
                                    />
                                    <span className="text-white">Person</span>
                                  </label>
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      name={`client1_estate_trustee_type_${index}`}
                                      value="corporate"
                                      checked={client1EstateTrusteeData[index]?.type === 'corporate'}
                                      onChange={(e) => handleEstateTrusteeChange(index, 'type', e.target.value)}
                                      className="mr-2"
                                    />
                                    <span className="text-white">Corporate Trustee</span>
                                  </label>
                                </div>
                              </div>

                              {client1EstateTrusteeData[index]?.type === 'corporate' ? (
                                <>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Trust Company Name *
                                    </label>
                                    <input
                                      type="text"
                                      value={client1EstateTrusteeData[index]?.companyName || ''}
                                      onChange={(e) => handleEstateTrusteeChange(index, 'companyName', e.target.value)}
                                      placeholder="Enter trust company name"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Trust Company Address *
                                    </label>
                                    <input
                                      type="text"
                                      value={client1EstateTrusteeData[index]?.companyAddress || ''}
                                      onChange={(e) => handleEstateTrusteeChange(index, 'companyAddress', e.target.value)}
                                      placeholder="Enter trust company address"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Key Contact Name *
                                    </label>
                                    <input
                                      type="text"
                                      value={client1EstateTrusteeData[index]?.contactName || ''}
                                      onChange={(e) => handleEstateTrusteeChange(index, 'contactName', e.target.value)}
                                      placeholder="Enter key contact name"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Phone Number *
                                    </label>
                                    <input
                                      type="text"
                                      value={client1EstateTrusteeData[index]?.phone || ''}
                                      onChange={(e) => handleEstateTrusteeChange(index, 'phone', e.target.value)}
                                      placeholder="Enter phone number"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Email *
                                    </label>
                                    <input
                                      type="email"
                                      value={client1EstateTrusteeData[index]?.email || ''}
                                      onChange={(e) => handleEstateTrusteeChange(index, 'email', e.target.value)}
                                      placeholder="Enter email address"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Does this person have access to your most recent documentation? *
                                    </label>
                                    <div className="flex flex-col gap-3">
                                      <label className="flex items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                                        <input
                                          type="radio"
                                          value="yes_copy"
                                          checked={client1EstateTrusteeData[index]?.providedCopy === 'yes_copy'}
                                          onChange={(e) => handleEstateTrusteeChange(index, 'providedCopy', e.target.value)}
                                          className="mr-3"
                                        />
                                        <span className="text-white">Yes - they have a copy</span>
                                      </label>
                                      <label className="flex items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                                        <input
                                          type="radio"
                                          value="yes_instructions"
                                          checked={client1EstateTrusteeData[index]?.providedCopy === 'yes_instructions'}
                                          onChange={(e) => handleEstateTrusteeChange(index, 'providedCopy', e.target.value)}
                                          className="mr-3"
                                        />
                                        <span className="text-white">Yes - they have instructions on where/how to access the documentation</span>
                                      </label>
                                      <label className="flex items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                                        <input
                                          type="radio"
                                          value="no"
                                          checked={client1EstateTrusteeData[index]?.providedCopy === 'no'}
                                          onChange={(e) => handleEstateTrusteeChange(index, 'providedCopy', e.target.value)}
                                          className="mr-3"
                                        />
                                        <span className="text-white">No</span>
                                      </label>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Name *
                                    </label>
                                    <input
                                      type="text"
                                      value={client1EstateTrusteeData[index]?.name || ''}
                                      onChange={(e) => handleEstateTrusteeChange(index, 'name', e.target.value)}
                                      placeholder="Enter name"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Phone Number *
                                    </label>
                                    <input
                                      type="text"
                                      value={client1EstateTrusteeData[index]?.phone || ''}
                                      onChange={(e) => handleEstateTrusteeChange(index, 'phone', e.target.value)}
                                      placeholder="Enter phone number"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Email Address *
                                    </label>
                                    <input
                                      type="email"
                                      value={client1EstateTrusteeData[index]?.email || ''}
                                      onChange={(e) => handleEstateTrusteeChange(index, 'email', e.target.value)}
                                      placeholder="Enter email address"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Relationship to You *
                                    </label>
                                    <input
                                      type="text"
                                      value={client1EstateTrusteeData[index]?.relationship || ''}
                                      onChange={(e) => handleEstateTrusteeChange(index, 'relationship', e.target.value)}
                                      placeholder="e.g., Spouse, Child, Sibling, etc."
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Country of Residence *
                                    </label>
                                    <div className="flex gap-4">
                                      <label className="flex items-center">
                                        <input
                                          type="radio"
                                          value="Canada"
                                          checked={client1EstateTrusteeData[index]?.country === 'Canada'}
                                          onChange={(e) => handleEstateTrusteeChange(index, 'country', e.target.value)}
                                          className="mr-2"
                                        />
                                        <span className="text-white">Canada</span>
                                      </label>
                                      <label className="flex items-center">
                                        <input
                                          type="radio"
                                          value="Other"
                                          checked={client1EstateTrusteeData[index]?.country === 'Other'}
                                          onChange={(e) => handleEstateTrusteeChange(index, 'country', e.target.value)}
                                          className="mr-2"
                                        />
                                        <span className="text-white">Other</span>
                                      </label>
                                    </div>
                                  </div>

                                  {client1EstateTrusteeData[index]?.country === 'Other' && (
                                    <div>
                                      <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Please specify country *
                                      </label>
                                      <input
                                        type="text"
                                        value={client1EstateTrusteeData[index]?.otherCountry || ''}
                                        onChange={(e) => handleEstateTrusteeChange(index, 'otherCountry', e.target.value)}
                                        placeholder="Enter country"
                                        className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                    </div>
                                  )}

                                  {client1EstateTrusteeData[index]?.country === 'Canada' && (
                                    <div>
                                      <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Province/Territory *
                                      </label>
                                      <select
                                        value={client1EstateTrusteeData[index]?.province || ''}
                                        onChange={(e) => handleEstateTrusteeChange(index, 'province', e.target.value)}
                                        className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      >
                                        <option value="">Select province/territory</option>
                                        <option value="Alberta">Alberta</option>
                                        <option value="British Columbia">British Columbia</option>
                                        <option value="Manitoba">Manitoba</option>
                                        <option value="New Brunswick">New Brunswick</option>
                                        <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                                        <option value="Northwest Territories">Northwest Territories</option>
                                        <option value="Nova Scotia">Nova Scotia</option>
                                        <option value="Nunavut">Nunavut</option>
                                        <option value="Ontario">Ontario</option>
                                        <option value="Prince Edward Island">Prince Edward Island</option>
                                        <option value="Quebec">Quebec</option>
                                        <option value="Saskatchewan">Saskatchewan</option>
                                        <option value="Yukon">Yukon</option>
                                      </select>
                                    </div>
                                  )}

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      City of Residence *
                                    </label>
                                    <input
                                      type="text"
                                      value={client1EstateTrusteeData[index]?.city || ''}
                                      onChange={(e) => handleEstateTrusteeChange(index, 'city', e.target.value)}
                                      placeholder="Enter city"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Does this person have access to your most recent documentation? *
                                    </label>
                                    <div className="flex flex-col gap-3">
                                      <label className="flex items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                                        <input
                                          type="radio"
                                          value="yes_copy"
                                          checked={client1EstateTrusteeData[index]?.providedCopy === 'yes_copy'}
                                          onChange={(e) => handleEstateTrusteeChange(index, 'providedCopy', e.target.value)}
                                          className="mr-3"
                                        />
                                        <span className="text-white">Yes - they have a copy</span>
                                      </label>
                                      <label className="flex items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                                        <input
                                          type="radio"
                                          value="yes_instructions"
                                          checked={client1EstateTrusteeData[index]?.providedCopy === 'yes_instructions'}
                                          onChange={(e) => handleEstateTrusteeChange(index, 'providedCopy', e.target.value)}
                                          className="mr-3"
                                        />
                                        <span className="text-white">Yes - they have instructions on where/how to access the documentation</span>
                                      </label>
                                      <label className="flex items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                                        <input
                                          type="radio"
                                          value="no"
                                          checked={client1EstateTrusteeData[index]?.providedCopy === 'no'}
                                          onChange={(e) => handleEstateTrusteeChange(index, 'providedCopy', e.target.value)}
                                          className="mr-3"
                                        />
                                        <span className="text-white">No</span>
                                      </label>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {question.key === 'client2PoaPersonalCareCount' && client2PoaPersonalCareCount > 0 && (
                      <div className="space-y-6 mt-6">
                        {answers['spousesPoaPersonalCare'] === 'yes' && (
                          <div className="border border-gray-600 rounded-lg p-6 bg-gray-700 mb-6">
                            <h4 className="text-lg font-semibold text-white mb-4">
                              POA for Personal Care #1
                            </h4>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Name *
                                </label>
                                <input
                                  type="text"
                                  value={(allAnswers?.get(1)?.fullName as string) || ''}
                                  disabled
                                  className="w-full px-4 py-2 bg-gray-500 border border-gray-500 text-white rounded-lg cursor-not-allowed"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Relationship to {client2Name} *
                                </label>
                                <input
                                  type="text"
                                  value="Spouse/Common Law Partner"
                                  disabled
                                  className="w-full px-4 py-2 bg-gray-500 border border-gray-500 text-white rounded-lg cursor-not-allowed"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        <h3 className="text-xl font-semibold text-white">
                          {answers['spousesPoaPersonalCare'] === 'yes'
                            ? `${client2Name}'s contingent or additional Powers of Attorney for Personal Care Details`
                            : `${client2Name}'s additional or contingent Powers of Attorney for Personal Care Details`}
                        </h3>
                        {Array.from({ length: client2PoaPersonalCareCount }).map((_, index) => (
                          <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                            <h4 className="text-lg font-semibold text-white mb-4">
                              {answers['spousesPoaPersonalCare'] === 'yes'
                                ? `Contingent POA for Personal Care #${index + 1}`
                                : `Additional or contingent POA for Personal Care #${index + 1}`}
                            </h4>

                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Name *
                                </label>
                                <input
                                  type="text"
                                  value={client2PoaPersonalCareData[index]?.name || ''}
                                  onChange={(e) => handleClient2PoaPersonalCareChange(index, 'name', e.target.value)}
                                  placeholder="Enter name"
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Relationship to {client2Name} *
                                </label>
                                <input
                                  type="text"
                                  value={client2PoaPersonalCareData[index]?.relationship || ''}
                                  onChange={(e) => handleClient2PoaPersonalCareChange(index, 'relationship', e.target.value)}
                                  placeholder="e.g., Spouse, Child, Sibling, etc."
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Phone Number *
                                </label>
                                <input
                                  type="text"
                                  value={client2PoaPersonalCareData[index]?.phone || ''}
                                  onChange={(e) => handleClient2PoaPersonalCareChange(index, 'phone', e.target.value)}
                                  placeholder="Enter phone number"
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Email Address *
                                </label>
                                <input
                                  type="email"
                                  value={client2PoaPersonalCareData[index]?.email || ''}
                                  onChange={(e) => handleClient2PoaPersonalCareChange(index, 'email', e.target.value)}
                                  placeholder="Enter email address"
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Country of Residence *
                                </label>
                                <div className="flex gap-4">
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      value="Canada"
                                      checked={client2PoaPersonalCareData[index]?.country === 'Canada'}
                                      onChange={(e) => handleClient2PoaPersonalCareChange(index, 'country', e.target.value)}
                                      className="mr-2"
                                    />
                                    <span className="text-white">Canada</span>
                                  </label>
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      value="Other"
                                      checked={client2PoaPersonalCareData[index]?.country === 'Other'}
                                      onChange={(e) => handleClient2PoaPersonalCareChange(index, 'country', e.target.value)}
                                      className="mr-2"
                                    />
                                    <span className="text-white">Other</span>
                                  </label>
                                </div>
                              </div>

                              {client2PoaPersonalCareData[index]?.country === 'Other' && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Please specify country *
                                  </label>
                                  <input
                                    type="text"
                                    value={client2PoaPersonalCareData[index]?.otherCountry || ''}
                                    onChange={(e) => handleClient2PoaPersonalCareChange(index, 'otherCountry', e.target.value)}
                                    placeholder="Enter country"
                                    className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>
                              )}

                              {client2PoaPersonalCareData[index]?.country === 'Canada' && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Province/Territory *
                                  </label>
                                  <select
                                    value={client2PoaPersonalCareData[index]?.province || ''}
                                    onChange={(e) => handleClient2PoaPersonalCareChange(index, 'province', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  >
                                    <option value="">Select province/territory</option>
                                    <option value="Alberta">Alberta</option>
                                    <option value="British Columbia">British Columbia</option>
                                    <option value="Manitoba">Manitoba</option>
                                    <option value="New Brunswick">New Brunswick</option>
                                    <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                                    <option value="Northwest Territories">Northwest Territories</option>
                                    <option value="Nova Scotia">Nova Scotia</option>
                                    <option value="Nunavut">Nunavut</option>
                                    <option value="Ontario">Ontario</option>
                                    <option value="Prince Edward Island">Prince Edward Island</option>
                                    <option value="Quebec">Quebec</option>
                                    <option value="Saskatchewan">Saskatchewan</option>
                                    <option value="Yukon">Yukon</option>
                                  </select>
                                </div>
                              )}

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  City of Residence *
                                </label>
                                <input
                                  type="text"
                                  value={client2PoaPersonalCareData[index]?.city || ''}
                                  onChange={(e) => handleClient2PoaPersonalCareChange(index, 'city', e.target.value)}
                                  placeholder="Enter city"
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Does this person have access to your most recent documentation? *
                                </label>
                                <div className="flex flex-col gap-3">
                                  <label className="flex items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                                    <input
                                      type="radio"
                                      value="yes_copy"
                                      checked={client2PoaPersonalCareData[index]?.providedCopy === 'yes_copy'}
                                      onChange={(e) => handleClient2PoaPersonalCareChange(index, 'providedCopy', e.target.value)}
                                      className="mr-3"
                                    />
                                    <span className="text-white">Yes - they have a copy</span>
                                  </label>
                                  <label className="flex items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                                    <input
                                      type="radio"
                                      value="yes_instructions"
                                      checked={client2PoaPersonalCareData[index]?.providedCopy === 'yes_instructions'}
                                      onChange={(e) => handleClient2PoaPersonalCareChange(index, 'providedCopy', e.target.value)}
                                      className="mr-3"
                                    />
                                    <span className="text-white">Yes - they have instructions on where/how to access the documentation</span>
                                  </label>
                                  <label className="flex items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                                    <input
                                      type="radio"
                                      value="no"
                                      checked={client2PoaPersonalCareData[index]?.providedCopy === 'no'}
                                      onChange={(e) => handleClient2PoaPersonalCareChange(index, 'providedCopy', e.target.value)}
                                      className="mr-3"
                                    />
                                    <span className="text-white">No</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {question.key === 'client2PoaPropertyCount' && client2PoaPropertyCount > 0 && (
                      <div className="space-y-6 mt-6">
                        {answers['client2SpouseIsPoaProperty'] === 'yes' && (
                          <div className="border border-gray-600 rounded-lg p-6 bg-gray-700 mb-6">
                            <h4 className="text-lg font-semibold text-white mb-4">
                              {client2Name}'s Power of Attorney for Property
                            </h4>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  {client2Name}'s POA for Property:
                                </label>
                                <input
                                  type="text"
                                  value={client1Name}
                                  disabled
                                  className="w-full px-4 py-2 bg-gray-500 border border-gray-500 text-white rounded-lg cursor-not-allowed"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Relationship to {client2Name} *
                                </label>
                                <input
                                  type="text"
                                  value="Spouse/Common Law Partner"
                                  disabled
                                  className="w-full px-4 py-2 bg-gray-500 border border-gray-500 text-white rounded-lg cursor-not-allowed"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        <h3 className="text-xl font-semibold text-white">
                          {`${client2Name}'s additional or contingent Powers of Attorney for Property Details`}
                        </h3>
                        {Array.from({ length: client2PoaPropertyCount }).map((_, index) => (
                          <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                            <h4 className="text-lg font-semibold text-white mb-4">
                              {answers['client2SpouseIsPoaProperty'] === 'yes'
                                ? `Contingent POA for Property #${index + 1}`
                                : `POA for Property #${index + 1}`}
                            </h4>

                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Name *
                                </label>
                                <input
                                  type="text"
                                  value={client2PoaPropertyData[index]?.name || ''}
                                  onChange={(e) => handleClient2PoaPropertyChange(index, 'name', e.target.value)}
                                  placeholder="Enter name"
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Phone Number *
                                </label>
                                <input
                                  type="text"
                                  value={client2PoaPropertyData[index]?.phone || ''}
                                  onChange={(e) => handleClient2PoaPropertyChange(index, 'phone', e.target.value)}
                                  placeholder="Enter phone number"
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Email Address *
                                </label>
                                <input
                                  type="email"
                                  value={client2PoaPropertyData[index]?.email || ''}
                                  onChange={(e) => handleClient2PoaPropertyChange(index, 'email', e.target.value)}
                                  placeholder="Enter email address"
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Relationship to {client2Name} *
                                </label>
                                <input
                                  type="text"
                                  value={client2PoaPropertyData[index]?.relationship || ''}
                                  onChange={(e) => handleClient2PoaPropertyChange(index, 'relationship', e.target.value)}
                                  placeholder="e.g., Spouse, Child, Sibling, etc."
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Country of Residence *
                                </label>
                                <div className="flex gap-4">
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      value="Canada"
                                      checked={client2PoaPropertyData[index]?.country === 'Canada'}
                                      onChange={(e) => handleClient2PoaPropertyChange(index, 'country', e.target.value)}
                                      className="mr-2"
                                    />
                                    <span className="text-white">Canada</span>
                                  </label>
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      value="Other"
                                      checked={client2PoaPropertyData[index]?.country === 'Other'}
                                      onChange={(e) => handleClient2PoaPropertyChange(index, 'country', e.target.value)}
                                      className="mr-2"
                                    />
                                    <span className="text-white">Other</span>
                                  </label>
                                </div>
                              </div>

                              {client2PoaPropertyData[index]?.country === 'Other' && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Please specify country *
                                  </label>
                                  <input
                                    type="text"
                                    value={client2PoaPropertyData[index]?.otherCountry || ''}
                                    onChange={(e) => handleClient2PoaPropertyChange(index, 'otherCountry', e.target.value)}
                                    placeholder="Enter country"
                                    className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>
                              )}

                              {client2PoaPropertyData[index]?.country === 'Canada' && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Province/Territory *
                                  </label>
                                  <select
                                    value={client2PoaPropertyData[index]?.province || ''}
                                    onChange={(e) => handleClient2PoaPropertyChange(index, 'province', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  >
                                    <option value="">Select province/territory</option>
                                    <option value="Alberta">Alberta</option>
                                    <option value="British Columbia">British Columbia</option>
                                    <option value="Manitoba">Manitoba</option>
                                    <option value="New Brunswick">New Brunswick</option>
                                    <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                                    <option value="Northwest Territories">Northwest Territories</option>
                                    <option value="Nova Scotia">Nova Scotia</option>
                                    <option value="Nunavut">Nunavut</option>
                                    <option value="Ontario">Ontario</option>
                                    <option value="Prince Edward Island">Prince Edward Island</option>
                                    <option value="Quebec">Quebec</option>
                                    <option value="Saskatchewan">Saskatchewan</option>
                                    <option value="Yukon">Yukon</option>
                                  </select>
                                </div>
                              )}

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  City of Residence *
                                </label>
                                <input
                                  type="text"
                                  value={client2PoaPropertyData[index]?.city || ''}
                                  onChange={(e) => handleClient2PoaPropertyChange(index, 'city', e.target.value)}
                                  placeholder="Enter city"
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {question.key === 'client2EstateTrusteeCount' && client2EstateTrusteeCount > 0 && (
                      <div className="space-y-6 mt-6">
                        <h3 className="text-xl font-semibold text-white">{client2Name}'s Estate Trustees Details</h3>
                        {Array.from({ length: client2EstateTrusteeCount }).map((_, index) => (
                          <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                            <h4 className="text-lg font-semibold text-white mb-4">Estate Trustee #{index + 1}</h4>

                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Is this Trustee a person or a Corporate Trustee (through a Trust Company)? *
                                </label>
                                <div className="flex gap-4">
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      name={`client2_estate_trustee_type_${index}`}
                                      value="person"
                                      checked={client2EstateTrusteeData[index]?.type === 'person' || !client2EstateTrusteeData[index]?.type}
                                      onChange={(e) => handleClient2EstateTrusteeChange(index, 'type', e.target.value)}
                                      className="mr-2"
                                    />
                                    <span className="text-white">Person</span>
                                  </label>
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      name={`client2_estate_trustee_type_${index}`}
                                      value="corporate"
                                      checked={client2EstateTrusteeData[index]?.type === 'corporate'}
                                      onChange={(e) => handleClient2EstateTrusteeChange(index, 'type', e.target.value)}
                                      className="mr-2"
                                    />
                                    <span className="text-white">Corporate Trustee</span>
                                  </label>
                                </div>
                              </div>

                              {client2EstateTrusteeData[index]?.type === 'corporate' ? (
                                <>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Trust Company Name *
                                    </label>
                                    <input
                                      type="text"
                                      value={client2EstateTrusteeData[index]?.companyName || ''}
                                      onChange={(e) => handleClient2EstateTrusteeChange(index, 'companyName', e.target.value)}
                                      placeholder="Enter trust company name"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Trust Company Address *
                                    </label>
                                    <input
                                      type="text"
                                      value={client2EstateTrusteeData[index]?.companyAddress || ''}
                                      onChange={(e) => handleClient2EstateTrusteeChange(index, 'companyAddress', e.target.value)}
                                      placeholder="Enter trust company address"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Key Contact Name *
                                    </label>
                                    <input
                                      type="text"
                                      value={client2EstateTrusteeData[index]?.contactName || ''}
                                      onChange={(e) => handleClient2EstateTrusteeChange(index, 'contactName', e.target.value)}
                                      placeholder="Enter key contact name"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Phone Number *
                                    </label>
                                    <input
                                      type="text"
                                      value={client2EstateTrusteeData[index]?.phone || ''}
                                      onChange={(e) => handleClient2EstateTrusteeChange(index, 'phone', e.target.value)}
                                      placeholder="Enter phone number"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Email *
                                    </label>
                                    <input
                                      type="email"
                                      value={client2EstateTrusteeData[index]?.email || ''}
                                      onChange={(e) => handleClient2EstateTrusteeChange(index, 'email', e.target.value)}
                                      placeholder="Enter email address"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Does this person have access to your most recent documentation? *
                                    </label>
                                    <div className="flex flex-col gap-3">
                                      <label className="flex items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                                        <input
                                          type="radio"
                                          value="yes_copy"
                                          checked={client2EstateTrusteeData[index]?.providedCopy === 'yes_copy'}
                                          onChange={(e) => handleClient2EstateTrusteeChange(index, 'providedCopy', e.target.value)}
                                          className="mr-3"
                                        />
                                        <span className="text-white">Yes - they have a copy</span>
                                      </label>
                                      <label className="flex items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                                        <input
                                          type="radio"
                                          value="yes_instructions"
                                          checked={client2EstateTrusteeData[index]?.providedCopy === 'yes_instructions'}
                                          onChange={(e) => handleClient2EstateTrusteeChange(index, 'providedCopy', e.target.value)}
                                          className="mr-3"
                                        />
                                        <span className="text-white">Yes - they have instructions on where/how to access the documentation</span>
                                      </label>
                                      <label className="flex items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                                        <input
                                          type="radio"
                                          value="no"
                                          checked={client2EstateTrusteeData[index]?.providedCopy === 'no'}
                                          onChange={(e) => handleClient2EstateTrusteeChange(index, 'providedCopy', e.target.value)}
                                          className="mr-3"
                                        />
                                        <span className="text-white">No</span>
                                      </label>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Name *
                                    </label>
                                    <input
                                      type="text"
                                      value={client2EstateTrusteeData[index]?.name || ''}
                                      onChange={(e) => handleClient2EstateTrusteeChange(index, 'name', e.target.value)}
                                      placeholder="Enter name"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Phone Number *
                                    </label>
                                    <input
                                      type="text"
                                      value={client2EstateTrusteeData[index]?.phone || ''}
                                      onChange={(e) => handleClient2EstateTrusteeChange(index, 'phone', e.target.value)}
                                      placeholder="Enter phone number"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Email Address *
                                    </label>
                                    <input
                                      type="email"
                                      value={client2EstateTrusteeData[index]?.email || ''}
                                      onChange={(e) => handleClient2EstateTrusteeChange(index, 'email', e.target.value)}
                                      placeholder="Enter email address"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Relationship to {client2Name} *
                                    </label>
                                    <input
                                      type="text"
                                      value={client2EstateTrusteeData[index]?.relationship || ''}
                                      onChange={(e) => handleClient2EstateTrusteeChange(index, 'relationship', e.target.value)}
                                      placeholder="e.g., Spouse, Child, Sibling, etc."
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Country of Residence *
                                    </label>
                                    <div className="flex gap-4">
                                      <label className="flex items-center">
                                        <input
                                          type="radio"
                                          value="Canada"
                                          checked={client2EstateTrusteeData[index]?.country === 'Canada'}
                                          onChange={(e) => handleClient2EstateTrusteeChange(index, 'country', e.target.value)}
                                          className="mr-2"
                                        />
                                        <span className="text-white">Canada</span>
                                      </label>
                                      <label className="flex items-center">
                                        <input
                                          type="radio"
                                          value="Other"
                                          checked={client2EstateTrusteeData[index]?.country === 'Other'}
                                          onChange={(e) => handleClient2EstateTrusteeChange(index, 'country', e.target.value)}
                                          className="mr-2"
                                        />
                                        <span className="text-white">Other</span>
                                      </label>
                                    </div>
                                  </div>

                                  {client2EstateTrusteeData[index]?.country === 'Other' && (
                                    <div>
                                      <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Please specify country *
                                      </label>
                                      <input
                                        type="text"
                                        value={client2EstateTrusteeData[index]?.otherCountry || ''}
                                        onChange={(e) => handleClient2EstateTrusteeChange(index, 'otherCountry', e.target.value)}
                                        placeholder="Enter country"
                                        className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                    </div>
                                  )}

                                  {client2EstateTrusteeData[index]?.country === 'Canada' && (
                                    <div>
                                      <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Province/Territory *
                                      </label>
                                      <select
                                        value={client2EstateTrusteeData[index]?.province || ''}
                                        onChange={(e) => handleClient2EstateTrusteeChange(index, 'province', e.target.value)}
                                        className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      >
                                        <option value="">Select province/territory</option>
                                        <option value="Alberta">Alberta</option>
                                        <option value="British Columbia">British Columbia</option>
                                        <option value="Manitoba">Manitoba</option>
                                        <option value="New Brunswick">New Brunswick</option>
                                        <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                                        <option value="Northwest Territories">Northwest Territories</option>
                                        <option value="Nova Scotia">Nova Scotia</option>
                                        <option value="Nunavut">Nunavut</option>
                                        <option value="Ontario">Ontario</option>
                                        <option value="Prince Edward Island">Prince Edward Island</option>
                                        <option value="Quebec">Quebec</option>
                                        <option value="Saskatchewan">Saskatchewan</option>
                                        <option value="Yukon">Yukon</option>
                                      </select>
                                    </div>
                                  )}

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      City of Residence *
                                    </label>
                                    <input
                                      type="text"
                                      value={client2EstateTrusteeData[index]?.city || ''}
                                      onChange={(e) => handleClient2EstateTrusteeChange(index, 'city', e.target.value)}
                                      placeholder="Enter city"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Does this person have access to your most recent documentation? *
                                    </label>
                                    <div className="flex flex-col gap-3">
                                      <label className="flex items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                                        <input
                                          type="radio"
                                          value="yes_copy"
                                          checked={client2EstateTrusteeData[index]?.providedCopy === 'yes_copy'}
                                          onChange={(e) => handleClient2EstateTrusteeChange(index, 'providedCopy', e.target.value)}
                                          className="mr-3"
                                        />
                                        <span className="text-white">Yes - they have a copy</span>
                                      </label>
                                      <label className="flex items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                                        <input
                                          type="radio"
                                          value="yes_instructions"
                                          checked={client2EstateTrusteeData[index]?.providedCopy === 'yes_instructions'}
                                          onChange={(e) => handleClient2EstateTrusteeChange(index, 'providedCopy', e.target.value)}
                                          className="mr-3"
                                        />
                                        <span className="text-white">Yes - they have instructions on where/how to access the documentation</span>
                                      </label>
                                      <label className="flex items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                                        <input
                                          type="radio"
                                          value="no"
                                          checked={client2EstateTrusteeData[index]?.providedCopy === 'no'}
                                          onChange={(e) => handleClient2EstateTrusteeChange(index, 'providedCopy', e.target.value)}
                                          className="mr-3"
                                        />
                                        <span className="text-white">No</span>
                                      </label>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}

            </>
            );
          })()}

          {step.id === 7 && (() => {
            const basicAnswers = allAnswers?.get(1) || {};
            const hasSpouse = (basicAnswers['maritalStatus'] === 'married' || basicAnswers['maritalStatus'] === 'common_law');
            const client1Name = basicAnswers['fullName'] as string || 'you';
            const client2Name = basicAnswers['spouseName'] as string || 'your spouse';

            return (
              <>
                {step.questions.map((question) => {
                  if (question.key === 'client2UsesAccountant' && !hasSpouse) return null;
                  if (question.key === 'client2AccountingRecordsLocation' && !hasSpouse) return null;
                  if (question.key === 'accountantSamePerson' && !hasSpouse) return null;
                  if (question.key === 'client2IsCameronSmithAdvisor' && !hasSpouse) return null;
                  if (question.key === 'client2FinancialAdvisors' && !hasSpouse) return null;

                  let customLabel = question.label;
                  if (question.key === 'client1UsesAccountant') {
                    customLabel = `${client1Name}, do you use a professional accountant?`;
                  }
                  if (question.key === 'client1IsCameronSmithAdvisor') {
                    customLabel = `${client1Name}, is Cameron Smith, CFP® your financial advisor?`;
                  }
                  if (question.key === 'client1FinancialAdvisors') {
                    customLabel = `${client1Name}, how many Financial Advisors do you work with?`;
                  }
                  if (question.key === 'client2IsCameronSmithAdvisor') {
                    customLabel = `${client2Name}, is Cameron Smith, CFP® your financial advisor?`;
                  }
                  if (question.key === 'client2FinancialAdvisors') {
                    customLabel = `${client2Name}, how many Financial Advisors do you work with?`;
                  }

                  return (
                    <FormField
                      key={question.key}
                      question={{ ...question, label: customLabel }}
                      value={answers[question.key]}
                      onChange={(value) => onAnswerChange(question.key, value)}
                    />
                  );
                })}

                {client1FinancialAdvisorsCount > 0 && (
                  <div className="space-y-6 mt-6">
                    <h3 className="text-xl font-semibold text-white">
                      {allAnswers?.get(1)?.fullName || 'Client 1'}'s financial advisor's details:
                    </h3>
                    {Array.from({ length: client1FinancialAdvisorsCount }).map((_, index) => (
                      <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                        <h4 className="text-lg font-semibold text-white mb-4">Financial Advisor #{index + 1}</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                            <input
                              type="text"
                              value={client1FinancialAdvisorsData[index]?.name || ''}
                              onChange={(e) => handleClient1FinancialAdvisorChange(index, 'name', e.target.value)}
                              placeholder="Enter name"
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Firm/Company *</label>
                            <input
                              type="text"
                              value={client1FinancialAdvisorsData[index]?.firm || ''}
                              onChange={(e) => handleClient1FinancialAdvisorChange(index, 'firm', e.target.value)}
                              placeholder="Enter firm/company name"
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                            <input
                              type="text"
                              value={client1FinancialAdvisorsData[index]?.phone || ''}
                              onChange={(e) => handleClient1FinancialAdvisorChange(index, 'phone', e.target.value)}
                              placeholder="Enter phone number"
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                            <input
                              type="email"
                              value={client1FinancialAdvisorsData[index]?.email || ''}
                              onChange={(e) => handleClient1FinancialAdvisorChange(index, 'email', e.target.value)}
                              placeholder="Enter email address"
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {client2FinancialAdvisorsCount > 0 && (
                  <div className="space-y-6 mt-6">
                    <h3 className="text-xl font-semibold text-white">
                      {allAnswers?.get(1)?.spouseName || 'Client 2'}'s financial advisor's details:
                    </h3>
                    {Array.from({ length: client2FinancialAdvisorsCount }).map((_, index) => (
                      <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                        <h4 className="text-lg font-semibold text-white mb-4">Financial Advisor #{index + 1}</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                            <input
                              type="text"
                              value={client2FinancialAdvisorsData[index]?.name || ''}
                              onChange={(e) => handleClient2FinancialAdvisorChange(index, 'name', e.target.value)}
                              placeholder="Enter name"
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Firm/Company *</label>
                            <input
                              type="text"
                              value={client2FinancialAdvisorsData[index]?.firm || ''}
                              onChange={(e) => handleClient2FinancialAdvisorChange(index, 'firm', e.target.value)}
                              placeholder="Enter firm/company name"
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                            <input
                              type="text"
                              value={client2FinancialAdvisorsData[index]?.phone || ''}
                              onChange={(e) => handleClient2FinancialAdvisorChange(index, 'phone', e.target.value)}
                              placeholder="Enter phone number"
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                            <input
                              type="email"
                              value={client2FinancialAdvisorsData[index]?.email || ''}
                              onChange={(e) => handleClient2FinancialAdvisorChange(index, 'email', e.target.value)}
                              placeholder="Enter email address"
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            );
          })()}

          {step.id === 8 && (() => {
            const basicAnswers = allAnswers?.get(1) || {};
            const hasSpouse = (basicAnswers['maritalStatus'] === 'married' || basicAnswers['maritalStatus'] === 'common_law');
            const client1Name = basicAnswers['fullName'] as string || 'Client 1';
            const client2Name = basicAnswers['spouseName'] as string || 'Client 2';
            const bankingStructure = answers['bankingStructure'];

            const step2Answers = allAnswers?.get(2) || {};
            const step3Answers = allAnswers?.get(3) || {};
            const knownIndividuals: { name: string; relationship: string }[] = [];
            const c1PrevRels = (step2Answers['client1PreviousRelationshipsData'] as Array<Record<string, string>>) || [];
            c1PrevRels.forEach(r => { if (r?.name) knownIndividuals.push({ name: r.name, relationship: 'Previous Partner' }); });
            const c2PrevRels = (step2Answers['client2PreviousRelationshipsData'] as Array<Record<string, string>>) || [];
            c2PrevRels.forEach(r => { if (r?.name) knownIndividuals.push({ name: r.name, relationship: 'Previous Partner' }); });
            const childrenData = (step3Answers['childrenData'] as Array<Record<string, string>>) || [];
            childrenData.forEach(c => { if (c?.name) knownIndividuals.push({ name: c.name, relationship: 'Child' }); });

            const renderInstitutions = (key: string, count: string, label: string) => {
              const institutionCount = parseInt(answers[count] as string) || 0;
              if (institutionCount === 0) return null;

              const institutionsData = (answers[key] as Array<Record<string, unknown>>) || Array(Math.max(0, institutionCount || 0)).fill(null).map(() => ({}));

              const handleInstitutionFieldChange = (index: number, field: string, value: unknown) => {
                const updated = [...institutionsData];
                if (!updated[index]) {
                  updated[index] = {};
                }
                updated[index][field] = value;
                onAnswerChange(key, updated);
              };

              const handleAccountOwnerToggle = (index: number, owner: string) => {
                const updated = [...institutionsData];
                if (!updated[index]) {
                  updated[index] = {};
                }
                const currentOwners = (updated[index].accountOwners as string[]) || [];
                if (currentOwners.includes(owner)) {
                  updated[index].accountOwners = currentOwners.filter(o => o !== owner);
                } else {
                  updated[index].accountOwners = [...currentOwners, owner];
                }
                onAnswerChange(key, updated);
              };

              const handleAdditionalOwnerChange = (institutionIndex: number, ownerIndex: number, value: string) => {
                const updated = [...institutionsData];
                if (!updated[institutionIndex]) {
                  updated[institutionIndex] = {};
                }
                const additionalOwners = (updated[institutionIndex].additionalOwners as string[]) || [];
                additionalOwners[ownerIndex] = value;
                updated[institutionIndex].additionalOwners = additionalOwners;
                onAnswerChange(key, updated);
              };

              const addAdditionalOwner = (institutionIndex: number) => {
                const updated = [...institutionsData];
                if (!updated[institutionIndex]) {
                  updated[institutionIndex] = {};
                }
                const additionalOwners = (updated[institutionIndex].additionalOwners as string[]) || [];
                updated[institutionIndex].additionalOwners = [...additionalOwners, ''];
                onAnswerChange(key, updated);
              };

              const removeLastAdditionalOwner = (institutionIndex: number) => {
                const updated = [...institutionsData];
                if (!updated[institutionIndex]) {
                  return;
                }
                const additionalOwners = (updated[institutionIndex].additionalOwners as string[]) || [];
                if (additionalOwners.length > 0) {
                  updated[institutionIndex].additionalOwners = additionalOwners.slice(0, -1);
                  onAnswerChange(key, updated);
                }
              };

              const handleOtherKnownOwnerToggle = (institutionIndex: number, personName: string) => {
                const updated = [...institutionsData];
                if (!updated[institutionIndex]) updated[institutionIndex] = {};
                const current = (updated[institutionIndex].otherKnownOwners as string[]) || [];
                updated[institutionIndex].otherKnownOwners = current.includes(personName)
                  ? current.filter(n => n !== personName)
                  : [...current, personName];
                onAnswerChange(key, updated);
              };

              const handleCustomOtherToggle = (institutionIndex: number) => {
                const updated = [...institutionsData];
                if (!updated[institutionIndex]) updated[institutionIndex] = {};
                updated[institutionIndex].hasCustomOtherOwner = !updated[institutionIndex].hasCustomOtherOwner;
                if (!updated[institutionIndex].hasCustomOtherOwner) {
                  updated[institutionIndex].customOtherOwnerName = '';
                  updated[institutionIndex].customOtherOwnerRelationship = '';
                }
                onAnswerChange(key, updated);
              };

              const handleOwnershipPercentageChange = (institutionIndex: number, ownerKey: string, value: string) => {
                const updated = [...institutionsData];
                if (!updated[institutionIndex]) updated[institutionIndex] = {};
                const percentages = ({ ...(updated[institutionIndex].ownershipPercentages as Record<string, string> || {}) });
                percentages[ownerKey] = value;
                updated[institutionIndex].ownershipPercentages = percentages;
                onAnswerChange(key, updated);
              };

              return (
                <div className="space-y-6 mt-6">
                  <h3 className="text-md font-semibold text-white">{label}</h3>
                  {Array.from({ length: institutionCount }).map((_, index) => {
                    const institution = institutionsData[index] || {};
                    const accountOwners = (institution.accountOwners as string[]) || [];
                    const hasOtherOwner = accountOwners.includes('other');
                    const additionalOwners = (institution.additionalOwners as string[]) || [];
                    const otherKnownOwners = (institution.otherKnownOwners as string[]) || [];
                    const hasCustomOtherOwner = !!(institution.hasCustomOtherOwner);
                    const customOtherOwnerName = (institution.customOtherOwnerName as string) || '';
                    const customOtherOwnerRelationship = (institution.customOtherOwnerRelationship as string) || '';
                    const accountOwnershipType = (institution.accountOwnershipType as string) || '';
                    const ownershipPercentages = (institution.ownershipPercentages as Record<string, string>) || {};

                    const allOwnerLabels: { key: string; label: string }[] = [];
                    if (accountOwners.includes('client1')) allOwnerLabels.push({ key: 'client1', label: client1Name });
                    if (hasSpouse && accountOwners.includes('client2')) allOwnerLabels.push({ key: 'client2', label: client2Name });
                    otherKnownOwners.forEach(name => allOwnerLabels.push({ key: name, label: name }));
                    if (hasCustomOtherOwner && customOtherOwnerName) allOwnerLabels.push({ key: '__custom__', label: customOtherOwnerName });

                    const totalPct = allOwnerLabels.reduce((sum, o) => sum + (parseFloat(ownershipPercentages[o.key] || '0') || 0), 0);
                    const pctValid = Math.abs(totalPct - 100) < 0.01;

                    return (
                      <div key={index} className="p-4 bg-gray-700 rounded-lg space-y-4">
                        <h4 className="text-sm font-semibold text-gray-200">Institution {index + 1}</h4>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Institution Name:
                          </label>
                          <input
                            type="text"
                            value={(institution.name as string) || ''}
                            onChange={(e) => handleInstitutionFieldChange(index, 'name', e.target.value)}
                            placeholder="e.g., TD Bank, RBC, Scotiabank"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Account Type:
                          </label>
                          <input
                            type="text"
                            value={(institution.accountType as string) || ''}
                            onChange={(e) => handleInstitutionFieldChange(index, 'accountType', e.target.value)}
                            placeholder="e.g., Checking, Savings, TFSA"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">
                            Account Owner:
                          </label>
                          <div className="space-y-2">
                            <label className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={accountOwners.includes('client1')}
                                onChange={() => handleAccountOwnerToggle(index, 'client1')}
                                className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
                              />
                              <span className="text-white">{client1Name}</span>
                            </label>
                            {hasSpouse && (
                              <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={accountOwners.includes('client2')}
                                  onChange={() => handleAccountOwnerToggle(index, 'client2')}
                                  className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="text-white">{client2Name}</span>
                              </label>
                            )}
                            <label className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={hasOtherOwner}
                                onChange={() => handleAccountOwnerToggle(index, 'other')}
                                className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
                              />
                              <span className="text-white">Other</span>
                            </label>
                          </div>
                        </div>

                        {hasOtherOwner && (
                          <div className="pl-4 border-l-2 border-blue-500/40 space-y-3">
                            <label className="block text-sm font-medium text-gray-300">
                              Select from known individuals:
                            </label>
                            {knownIndividuals.length === 0 && (
                              <p className="text-xs text-gray-400 italic">No individuals from previous steps found.</p>
                            )}
                            {knownIndividuals.map((person) => (
                              <label key={person.name} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={otherKnownOwners.includes(person.name)}
                                  onChange={() => handleOtherKnownOwnerToggle(index, person.name)}
                                  className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="text-white">{person.name}</span>
                                <span className="text-xs text-gray-400">({person.relationship})</span>
                              </label>
                            ))}
                            <label className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={hasCustomOtherOwner}
                                onChange={() => handleCustomOtherToggle(index)}
                                className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
                              />
                              <span className="text-white">Other</span>
                            </label>
                            {hasCustomOtherOwner && (
                              <div className="pl-4 space-y-3">
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Enter Owner Name:
                                  </label>
                                  <input
                                    type="text"
                                    value={customOtherOwnerName}
                                    onChange={(e) => handleInstitutionFieldChange(index, 'customOtherOwnerName', e.target.value)}
                                    placeholder="Full name"
                                    className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Relationship to You:
                                  </label>
                                  <input
                                    type="text"
                                    value={customOtherOwnerRelationship}
                                    onChange={(e) => handleInstitutionFieldChange(index, 'customOtherOwnerRelationship', e.target.value)}
                                    placeholder="e.g., Sibling, Parent, Friend"
                                    className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {hasOtherOwner && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                              Is the account:
                            </label>
                            <div className="space-y-2">
                              {[
                                { value: 'joint_survivorship', label: 'Joint with Right-of-Survivorship' },
                                { value: 'joint_tenancy', label: 'Joint Tenancy-in-Common' },
                                { value: 'not_sure', label: "I'm not sure" },
                              ].map(opt => (
                                <label key={opt.value} className="flex items-center space-x-3 cursor-pointer">
                                  <input
                                    type="radio"
                                    name={`ownershipType-${key}-${index}`}
                                    value={opt.value}
                                    checked={accountOwnershipType === opt.value}
                                    onChange={() => handleInstitutionFieldChange(index, 'accountOwnershipType', opt.value)}
                                    className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500 focus:ring-2"
                                  />
                                  <span className="text-white">{opt.label}</span>
                                </label>
                              ))}
                            </div>

                            {accountOwnershipType === 'joint_tenancy' && allOwnerLabels.length > 0 && (
                              <div className="mt-4 pl-4 border-l-2 border-blue-500/40 space-y-3">
                                <label className="block text-sm font-medium text-gray-300">
                                  Enter ownership percentage for each owner (must total 100%):
                                </label>
                                {allOwnerLabels.map(owner => (
                                  <div key={owner.key} className="flex items-center gap-3">
                                    <span className="text-white text-sm w-40 shrink-0">{owner.label}</span>
                                    <div className="relative flex-1 max-w-[140px]">
                                      <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="0.01"
                                        value={ownershipPercentages[owner.key] || ''}
                                        onChange={(e) => handleOwnershipPercentageChange(index, owner.key, e.target.value)}
                                        placeholder="0"
                                        className="w-full px-4 py-2 pr-8 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
                                    </div>
                                  </div>
                                ))}
                                <div className={`flex items-center gap-2 text-sm font-medium ${pctValid ? 'text-green-400' : totalPct > 0 ? 'text-red-400' : 'text-gray-400'}`}>
                                  <span>Total: {totalPct.toFixed(totalPct % 1 === 0 ? 0 : 2)}%</span>
                                  {totalPct > 0 && !pctValid && <span>— must equal 100%</span>}
                                  {pctValid && <span>✓</span>}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            };

            return (
              <>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
                  <h3 className="text-sm font-semibold tracking-widest text-blue-400 uppercase whitespace-nowrap">Personal Banking Information</h3>
                  <div className="h-px flex-1 bg-gradient-to-l from-blue-500/50 to-transparent" />
                </div>
                {step.questions.map((question) => {
                  if (question.key === 'bankingStructure' && !hasSpouse) {
                    return null;
                  }

                  if (question.key === 'jointBankCount' && bankingStructure !== 'joint') {
                    return null;
                  }

                  if (question.key === 'jointInstitutionsData') {
                    return null;
                  }

                  if (question.key === 'client1BankCount') {
                    if (hasSpouse && bankingStructure !== 'individual') {
                      return null;
                    }
                    const customLabel = !hasSpouse ? question.label : `${client1Name}, how many banks, trust companies or credit unions do you have accounts with?`;
                    return (
                      <React.Fragment key={question.key}>
                        <FormField
                          question={{ ...question, label: customLabel }}
                          value={answers[question.key]}
                          onChange={(value) => onAnswerChange(question.key, value)}
                        />
                        {renderInstitutions('client1InstitutionsData', 'client1BankCount', !hasSpouse ? 'Your Banking Institutions' : `${client1Name}'s Banking Institutions`)}
                      </React.Fragment>
                    );
                  }

                  if (question.key === 'client1InstitutionsData') {
                    return null;
                  }

                  if (question.key === 'client2BankCount') {
                    if (!hasSpouse || bankingStructure !== 'individual') {
                      return null;
                    }
                    return (
                      <React.Fragment key={question.key}>
                        <FormField
                          question={{ ...question, label: `${client2Name}, how many banks, trust companies or credit unions do you have accounts with?` }}
                          value={answers[question.key]}
                          onChange={(value) => onAnswerChange(question.key, value)}
                        />
                        {renderInstitutions('client2InstitutionsData', 'client2BankCount', `${client2Name}'s Banking Institutions`)}
                      </React.Fragment>
                    );
                  }

                  if (question.key === 'client2InstitutionsData') {
                    return null;
                  }

                  if (question.key === 'jointBankCount') {
                    if (bankingStructure !== 'joint') {
                      return null;
                    }
                    return (
                      <React.Fragment key={question.key}>
                        <FormField
                          question={question}
                          value={answers[question.key]}
                          onChange={(value) => onAnswerChange(question.key, value)}
                        />
                        {renderInstitutions('jointInstitutionsData', 'jointBankCount', 'Joint Banking Institutions')}
                      </React.Fragment>
                    );
                  }

                  if (question.key === 'mixedJointBankCount') {
                    if (bankingStructure !== 'mixed') {
                      return null;
                    }
                    return (
                      <React.Fragment key={question.key}>
                        <FormField
                          question={question}
                          value={answers[question.key]}
                          onChange={(value) => onAnswerChange(question.key, value)}
                        />
                        {renderInstitutions('mixedJointInstitutionsData', 'mixedJointBankCount', 'Joint Banking Institutions')}
                      </React.Fragment>
                    );
                  }

                  if (question.key === 'mixedJointInstitutionsData') {
                    return null;
                  }

                  if (question.key === 'mixedClient1BankCount') {
                    if (bankingStructure !== 'mixed') {
                      return null;
                    }
                    return (
                      <React.Fragment key={question.key}>
                        <FormField
                          question={{ ...question, label: `${client1Name}, how many individually held accounts do you have?` }}
                          value={answers[question.key]}
                          onChange={(value) => onAnswerChange(question.key, value)}
                        />
                        {renderInstitutions('mixedClient1InstitutionsData', 'mixedClient1BankCount', `${client1Name}'s Individual Banking Institutions`)}
                      </React.Fragment>
                    );
                  }

                  if (question.key === 'mixedClient1InstitutionsData') {
                    return null;
                  }

                  if (question.key === 'mixedClient2BankCount') {
                    if (bankingStructure !== 'mixed') {
                      return null;
                    }
                    return (
                      <React.Fragment key={question.key}>
                        <FormField
                          question={{ ...question, label: `${client2Name}, how many individually held accounts do you have?` }}
                          value={answers[question.key]}
                          onChange={(value) => onAnswerChange(question.key, value)}
                        />
                        {renderInstitutions('mixedClient2InstitutionsData', 'mixedClient2BankCount', `${client2Name}'s Individual Banking Institutions`)}
                      </React.Fragment>
                    );
                  }

                  if (question.key === 'mixedClient2InstitutionsData') {
                    return null;
                  }


                  if (question.key === 'primaryResidenceOwner') {
                    const ownerOptions = [
                      { value: 'joint_survivorship', label: 'Jointly with right of survivorship' },
                      { value: 'joint_tenants', label: 'Jointly as tenants in common' },
                      { value: 'client1', label: client1Name },
                    ];
                    if (hasSpouse) {
                      ownerOptions.push({ value: 'client2', label: client2Name });
                    }
                    return (
                      <FormField
                        key={question.key}
                        question={{ ...question, options: ownerOptions }}
                        value={answers[question.key]}
                        onChange={(value) => onAnswerChange(question.key, value)}
                      />
                    );
                  }

                  if (question.key === 'additionalPropertiesCount') {
                    const propertyCount = parseInt(answers['additionalPropertiesCount'] as string) || 0;
                    const propertiesData = (answers['propertiesData'] as Array<Record<string, string>>) || Array(Math.max(0, propertyCount || 0)).fill(null).map(() => ({}));

                    const handlePropertyChange = (index: number, field: string, value: string) => {
                      const updated = [...propertiesData];
                      if (!updated[index]) {
                        updated[index] = {};
                      }
                      updated[index][field] = value;
                      onAnswerChange('propertiesData', updated);
                    };

                    const trustAnswers = allAnswers?.get(4) || {};
                    const corporationAnswers = allAnswers?.get(5) || {};

                    const ownerOptions = [
                      { value: 'joint_survivorship', label: 'Jointly with right of survivorship' },
                      { value: 'joint_tenants', label: 'Jointly as tenants in common' },
                      { value: 'client1', label: client1Name },
                    ];
                    if (hasSpouse) {
                      ownerOptions.push({ value: 'client2', label: client2Name });
                    }

                    if (trustAnswers['hasFamilyTrust'] === 'yes') {
                      const trustName = trustAnswers['trustLegalName'] as string || 'Trust 1';
                      ownerOptions.push({ value: 'trust', label: trustName });
                    }

                    if (corporationAnswers['ownsCorporation'] === 'yes') {
                      const corporationsData = corporationAnswers['corporationsData'] as Array<Record<string, string>> | undefined;
                      if (corporationsData && corporationsData.length > 0) {
                        corporationsData.forEach((corp, idx) => {
                          const corpName = corp?.legalName || `Corporation ${idx + 1}`;
                          ownerOptions.push({ value: `corporation_${idx}`, label: corpName });
                        });
                      }
                    }

                    ownerOptions.push({ value: 'other', label: 'Other' });

                    return (
                      <React.Fragment key={question.key}>
                        <FormField
                          question={question}
                          value={answers[question.key]}
                          onChange={(value) => onAnswerChange(question.key, value)}
                        />
                        {propertyCount > 0 && (
                          <div className="space-y-8 mt-6">
                            {Array.from({ length: propertyCount }).map((_, index) => (
                              <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">
                                  {propertiesData[index]?.propertyName
                                    ? propertiesData[index].propertyName
                                    : `Additional Property ${index + 1}`}
                                </h3>
                                <div className="space-y-6">
                                  <div>
                                    <div className="pb-1 border-b border-gray-500 mb-3">
                                      <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wide">Property Details</h4>
                                    </div>
                                    <div className="space-y-4">
                                    <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      What is the name of this property?
                                    </label>
                                    <input
                                      type="text"
                                      value={propertiesData[index]?.propertyName || ''}
                                      onChange={(e) => handlePropertyChange(index, 'propertyName', e.target.value)}
                                      placeholder="Enter property name"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      What type of property do you own?
                                    </label>
                                    <select
                                      value={propertiesData[index]?.propertyType || ''}
                                      onChange={(e) => handlePropertyChange(index, 'propertyType', e.target.value)}
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                      <option value="">Select property type</option>
                                      <option value="Residential">Residential</option>
                                      <option value="Commercial">Commercial</option>
                                      <option value="Cottage/Vacation">Cottage/Vacation</option>
                                      <option value="Rental">Rental</option>
                                      <option value="Land">Land</option>
                                      <option value="Farm">Farm</option>
                                      <option value="Other">Other</option>
                                    </select>
                                  </div>
                                  {(propertiesData[index]?.propertyType === 'Rental' || propertiesData[index]?.propertyType === 'Commercial') && (
                                    <>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                          Where do you keep your rental agreements?
                                        </label>
                                        <input
                                          type="text"
                                          value={propertiesData[index]?.rentalAgreementsLocation || ''}
                                          onChange={(e) => handlePropertyChange(index, 'rentalAgreementsLocation', e.target.value)}
                                          placeholder="Enter location"
                                          className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                          Where do you keep records of your revenues and expenses?
                                        </label>
                                        <input
                                          type="text"
                                          value={propertiesData[index]?.revenueExpensesLocation || ''}
                                          onChange={(e) => handlePropertyChange(index, 'revenueExpensesLocation', e.target.value)}
                                          placeholder="Enter location"
                                          className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                          Where do you keep records of your capital expenditures?
                                        </label>
                                        <input
                                          type="text"
                                          value={propertiesData[index]?.capitalExpendituresLocation || ''}
                                          onChange={(e) => handlePropertyChange(index, 'capitalExpendituresLocation', e.target.value)}
                                          placeholder="Enter location"
                                          className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                      </div>
                                    </>
                                  )}
                                  </div>{/* end Property Details space-y-4 */}
                                  </div>{/* end Property Details subsection */}

                                  <div>
                                    <div className="pb-1 border-b border-gray-500 mb-3">
                                      <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wide">Ownership</h4>
                                    </div>
                                    <div className="space-y-4">
                                  {(() => {
                                    const selectedOwners: string[] = JSON.parse(propertiesData[index]?.propertyOwners || '[]');
                                    const toggleOwner = (val: string) => {
                                      const updated = selectedOwners.includes(val)
                                        ? selectedOwners.filter(o => o !== val)
                                        : [...selectedOwners, val];
                                      handlePropertyChange(index, 'propertyOwners', JSON.stringify(updated));
                                      if (!updated.includes('other')) {
                                        handlePropertyChange(index, 'otherOwnerName', '');
                                        handlePropertyChange(index, 'otherOwnerPhone', '');
                                        handlePropertyChange(index, 'otherOwnerPercent', '');
                                        handlePropertyChange(index, 'hasAdditionalOtherOwners', '');
                                        handlePropertyChange(index, 'additionalOtherOwners', '[]');
                                      }
                                    };

                                    type ExtraOwner = { name: string; phone: string; percent: string };
                                    const additionalOtherOwners: ExtraOwner[] = JSON.parse(propertiesData[index]?.additionalOtherOwners || '[]');
                                    const updateAdditionalOwner = (oIdx: number, field: keyof ExtraOwner, val: string) => {
                                      const updated = [...additionalOtherOwners];
                                      if (!updated[oIdx]) updated[oIdx] = { name: '', phone: '', percent: '' };
                                      updated[oIdx][field] = val;
                                      handlePropertyChange(index, 'additionalOtherOwners', JSON.stringify(updated));
                                    };

                                    const ownerCheckboxOptions = [
                                      { value: 'client1', label: client1Name },
                                      ...(hasSpouse ? [{ value: 'client2', label: client2Name }] : []),
                                      { value: 'other', label: 'Other' },
                                    ];

                                    return (
                                      <div className="space-y-4">
                                        <div>
                                          <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Who owns the property? <span className="text-gray-500 font-normal">(Select all that apply)</span>
                                          </label>
                                          <div className="space-y-2">
                                            {ownerCheckboxOptions.map(opt => (
                                              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                  type="checkbox"
                                                  checked={selectedOwners.includes(opt.value)}
                                                  onChange={() => toggleOwner(opt.value)}
                                                  className="w-4 h-4 rounded border-gray-500 bg-gray-600 text-blue-500 focus:ring-blue-500"
                                                />
                                                <span className="text-gray-300">{opt.label}</span>
                                              </label>
                                            ))}
                                          </div>
                                        </div>

                                        {selectedOwners.includes('other') && (
                                          <div className="pl-4 border-l-2 border-blue-500 space-y-3">
                                            <p className="text-sm font-medium text-gray-300">Other owner's details:</p>
                                            <input
                                              type="text"
                                              value={propertiesData[index]?.otherOwnerName || ''}
                                              onChange={(e) => handlePropertyChange(index, 'otherOwnerName', e.target.value)}
                                              placeholder="Full name"
                                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <input
                                              type="text"
                                              value={propertiesData[index]?.otherOwnerPhone || ''}
                                              onChange={(e) => handlePropertyChange(index, 'otherOwnerPhone', e.target.value)}
                                              placeholder="Phone number"
                                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <input
                                              type="text"
                                              value={propertiesData[index]?.otherOwnerPercent || ''}
                                              onChange={(e) => handlePropertyChange(index, 'otherOwnerPercent', e.target.value)}
                                              placeholder="Ownership percentage (e.g., 33%)"
                                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />

                                            <div>
                                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Are there any additional owners?
                                              </label>
                                              <div className="flex gap-4">
                                                <label className="flex items-center">
                                                  <input
                                                    type="radio"
                                                    name={`has-additional-other-owners-${index}`}
                                                    value="yes"
                                                    checked={propertiesData[index]?.hasAdditionalOtherOwners === 'yes'}
                                                    onChange={(e) => {
                                                      handlePropertyChange(index, 'hasAdditionalOtherOwners', e.target.value);
                                                      if (additionalOtherOwners.length === 0) {
                                                        handlePropertyChange(index, 'additionalOtherOwners', JSON.stringify([{ name: '', phone: '', percent: '' }]));
                                                      }
                                                    }}
                                                    className="mr-2"
                                                  />
                                                  <span className="text-gray-300">Yes</span>
                                                </label>
                                                <label className="flex items-center">
                                                  <input
                                                    type="radio"
                                                    name={`has-additional-other-owners-${index}`}
                                                    value="no"
                                                    checked={propertiesData[index]?.hasAdditionalOtherOwners === 'no'}
                                                    onChange={(e) => {
                                                      handlePropertyChange(index, 'hasAdditionalOtherOwners', e.target.value);
                                                      handlePropertyChange(index, 'additionalOtherOwners', '[]');
                                                    }}
                                                    className="mr-2"
                                                  />
                                                  <span className="text-gray-300">No</span>
                                                </label>
                                              </div>
                                            </div>

                                            {propertiesData[index]?.hasAdditionalOtherOwners === 'yes' && (
                                              <div className="space-y-4">
                                                {additionalOtherOwners.map((owner, oIdx) => (
                                                  <div key={oIdx} className="pl-4 border-l-2 border-gray-500 space-y-3">
                                                    <p className="text-sm font-medium text-gray-400">Additional owner {oIdx + 1}:</p>
                                                    <input
                                                      type="text"
                                                      value={owner.name || ''}
                                                      onChange={(e) => updateAdditionalOwner(oIdx, 'name', e.target.value)}
                                                      placeholder="Full name"
                                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                    <input
                                                      type="text"
                                                      value={owner.phone || ''}
                                                      onChange={(e) => updateAdditionalOwner(oIdx, 'phone', e.target.value)}
                                                      placeholder="Phone number"
                                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                    <input
                                                      type="text"
                                                      value={owner.percent || ''}
                                                      onChange={(e) => updateAdditionalOwner(oIdx, 'percent', e.target.value)}
                                                      placeholder="Ownership percentage (e.g., 33%)"
                                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                    {oIdx === additionalOtherOwners.length - 1 && (
                                                      <button
                                                        type="button"
                                                        onClick={() => handlePropertyChange(index, 'additionalOtherOwners', JSON.stringify([...additionalOtherOwners, { name: '', phone: '', percent: '' }]))}
                                                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                                      >
                                                        + Add another owner
                                                      </button>
                                                    )}
                                                  </div>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })()}
                                  </div>{/* end Ownership space-y-4 */}
                                  </div>{/* end Ownership subsection */}

                                  <div>
                                    <div className="pb-1 border-b border-gray-500 mb-3">
                                      <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wide">Succession</h4>
                                    </div>
                                    <div className="space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Do you have a Property Succession Plan/Agreement in place for the property?
                                    </label>
                                    <div className="flex gap-4">
                                      <label className="flex items-center">
                                        <input
                                          type="radio"
                                          name={`succession-plan-${index}`}
                                          value="yes"
                                          checked={propertiesData[index]?.hasSuccessionPlan === 'yes'}
                                          onChange={(e) => handlePropertyChange(index, 'hasSuccessionPlan', e.target.value)}
                                          className="mr-2"
                                        />
                                        <span className="text-gray-300">Yes</span>
                                      </label>
                                      <label className="flex items-center">
                                        <input
                                          type="radio"
                                          name={`succession-plan-${index}`}
                                          value="no"
                                          checked={propertiesData[index]?.hasSuccessionPlan === 'no'}
                                          onChange={(e) => handlePropertyChange(index, 'hasSuccessionPlan', e.target.value)}
                                          className="mr-2"
                                        />
                                        <span className="text-gray-300">No</span>
                                      </label>
                                    </div>
                                  </div>
                                  {propertiesData[index]?.hasSuccessionPlan === 'yes' && (
                                    <div>
                                      <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Where is this document stored?
                                      </label>
                                      <input
                                        type="text"
                                        value={propertiesData[index]?.successionPlanLocation || ''}
                                        onChange={(e) => handlePropertyChange(index, 'successionPlanLocation', e.target.value)}
                                        placeholder="Enter document location"
                                        className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                    </div>
                                  )}
                                  </div>{/* end Succession space-y-4 */}
                                  </div>{/* end Succession subsection */}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </React.Fragment>
                    );
                  }

                  return (
                    <FormField
                      key={question.key}
                      question={question}
                      value={answers[question.key]}
                      onChange={(value) => onAnswerChange(question.key, value)}
                    />
                  );
                })}
                <div className="flex items-center gap-3 mt-8 mb-5">
                  <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
                  <h3 className="text-sm font-semibold tracking-widest text-blue-400 uppercase whitespace-nowrap">Investment Account Information: {client1Name}</h3>
                  <div className="h-px flex-1 bg-gradient-to-l from-blue-500/50 to-transparent" />
                </div>

                {(() => {
                  const REGISTERED_ACCOUNT_TYPES = [
                    { key: 'rrsp', label: 'Registered Retirement Savings Plan (RRSP)' },
                    { key: 'rrif', label: 'Registered Retirement Income Fund (RRIF)' },
                    { key: 'tfsa', label: 'Tax-Free Savings Account (TFSA)' },
                    { key: 'fhsa', label: 'Tax-Free First Home Savings Account (FHSA)' },
                    { key: 'resp', label: 'Registered Education Savings Plan (RESP)' },
                    { key: 'rdsp', label: 'Registered Disability Savings Plan (RDSP)' },
                  ];

                  const s2 = allAnswers?.get(2) || {};
                  const s3 = allAnswers?.get(3) || {};
                  const s7 = allAnswers?.get(7) || {};
                  const advisorsData = (s7['client1FinancialAdvisorsData'] as Array<Record<string,string>>) || [];
                  const advisors = advisorsData.filter(a => a?.name || a?.firm);
                  const knownNames: string[] = [];
                  if (hasSpouse) knownNames.push(client2Name);
                  (s2['client1PreviousRelationshipsData'] as Array<Record<string,string>> || []).forEach(r => { if (r?.name && !knownNames.includes(r.name)) knownNames.push(r.name); });
                  (s2['client2PreviousRelationshipsData'] as Array<Record<string,string>> || []).forEach(r => { if (r?.name && !knownNames.includes(r.name)) knownNames.push(r.name); });
                  (s3['childrenData'] as Array<Record<string,string>> || []).forEach(c => { if (c?.name && !knownNames.includes(c.name)) knownNames.push(c.name); });
                  if (!knownNames.includes('Estate')) knownNames.push('Estate');

                  const selectedTypes = (answers['client1RegisteredAccountTypes'] as string[]) || [];
                  const accountData = (answers['client1RegisteredAccountData'] as Record<string, Array<Record<string, unknown>>>) || {};

                  const toggleAccountType = (typeKey: string) => {
                    const updated = selectedTypes.includes(typeKey)
                      ? selectedTypes.filter(t => t !== typeKey)
                      : [...selectedTypes, typeKey];
                    if (selectedTypes.includes(typeKey)) {
                      const d = { ...accountData };
                      delete d[typeKey];
                      onAnswerChange('client1RegisteredAccountData', d);
                    }
                    onAnswerChange('client1RegisteredAccountTypes', updated);
                  };

                  const accountDecisions = (answers['client1RegisteredAccountDecisions'] as Record<string, 'yes'|'no'>) || {};

                  const setAccountDecision = (typeKey: string, decision: 'yes'|'no') => {
                    onAnswerChange('client1RegisteredAccountDecisions', { ...accountDecisions, [typeKey]: decision });
                    if (decision === 'yes') {
                      if (!selectedTypes.includes(typeKey)) {
                        onAnswerChange('client1RegisteredAccountTypes', [...selectedTypes, typeKey]);
                      }
                      if (!accountData[typeKey] || accountData[typeKey].length === 0) {
                        onAnswerChange('client1RegisteredAccountData', { ...accountData, [typeKey]: [{ institution: '' }] });
                      }
                    } else {
                      const d = { ...accountData };
                      delete d[typeKey];
                      onAnswerChange('client1RegisteredAccountData', d);
                      onAnswerChange('client1RegisteredAccountTypes', selectedTypes.filter(t => t !== typeKey));
                    }
                  };

                  const getInsts = (typeKey: string): Array<Record<string, unknown>> => accountData[typeKey] || [];

                  const setInsts = (typeKey: string, insts: Array<Record<string, unknown>>) => {
                    onAnswerChange('client1RegisteredAccountData', { ...accountData, [typeKey]: insts });
                  };

                  const updateInstField = (typeKey: string, idx: number, field: string, value: unknown) => {
                    const insts = [...getInsts(typeKey)];
                    insts[idx] = { ...insts[idx], [field]: value };
                    setInsts(typeKey, insts);
                  };

                  const toggleKnownBen = (typeKey: string, idx: number, name: string) => {
                    const insts = [...getInsts(typeKey)];
                    const cur = (insts[idx]?.selectedKnownBeneficiaries as string[]) || [];
                    insts[idx] = { ...insts[idx], selectedKnownBeneficiaries: cur.includes(name) ? cur.filter(n => n !== name) : [...cur, name] };
                    setInsts(typeKey, insts);
                  };

                  const addCustomBen = (typeKey: string, idx: number) => {
                    const insts = [...getInsts(typeKey)];
                    const cur = (insts[idx]?.customBeneficiaries as string[]) || [];
                    insts[idx] = { ...insts[idx], customBeneficiaries: [...cur, ''] };
                    setInsts(typeKey, insts);
                  };

                  const updateCustomBen = (typeKey: string, idx: number, bIdx: number, value: string) => {
                    const insts = [...getInsts(typeKey)];
                    const cur = [...((insts[idx]?.customBeneficiaries as string[]) || [])];
                    cur[bIdx] = value;
                    insts[idx] = { ...insts[idx], customBeneficiaries: cur };
                    setInsts(typeKey, insts);
                  };

                  const removeLastCustomBen = (typeKey: string, idx: number) => {
                    const insts = [...getInsts(typeKey)];
                    const cur = [...((insts[idx]?.customBeneficiaries as string[]) || [])];
                    if (cur.length > 0) cur.pop();
                    insts[idx] = { ...insts[idx], customBeneficiaries: cur };
                    setInsts(typeKey, insts);
                  };

                  const updateBenPct = (typeKey: string, idx: number, name: string, value: string) => {
                    const insts = [...getInsts(typeKey)];
                    const pcts = { ...((insts[idx]?.beneficiaryPercentages as Record<string,string>) || {}) };
                    pcts[name] = value;
                    insts[idx] = { ...insts[idx], beneficiaryPercentages: pcts };
                    setInsts(typeKey, insts);
                  };

                  const toggleKnownContingentBen = (typeKey: string, idx: number, name: string) => {
                    const insts = [...getInsts(typeKey)];
                    const cur = (insts[idx]?.selectedKnownContingentBeneficiaries as string[]) || [];
                    insts[idx] = { ...insts[idx], selectedKnownContingentBeneficiaries: cur.includes(name) ? cur.filter(n => n !== name) : [...cur, name] };
                    setInsts(typeKey, insts);
                  };

                  const addCustomContingentBen = (typeKey: string, idx: number) => {
                    const insts = [...getInsts(typeKey)];
                    const cur = (insts[idx]?.customContingentBeneficiaries as string[]) || [];
                    insts[idx] = { ...insts[idx], customContingentBeneficiaries: [...cur, ''] };
                    setInsts(typeKey, insts);
                  };

                  const updateCustomContingentBen = (typeKey: string, idx: number, bIdx: number, value: string) => {
                    const insts = [...getInsts(typeKey)];
                    const cur = [...((insts[idx]?.customContingentBeneficiaries as string[]) || [])];
                    cur[bIdx] = value;
                    insts[idx] = { ...insts[idx], customContingentBeneficiaries: cur };
                    setInsts(typeKey, insts);
                  };

                  const removeLastCustomContingentBen = (typeKey: string, idx: number) => {
                    const insts = [...getInsts(typeKey)];
                    const cur = [...((insts[idx]?.customContingentBeneficiaries as string[]) || [])];
                    if (cur.length > 0) cur.pop();
                    insts[idx] = { ...insts[idx], customContingentBeneficiaries: cur };
                    setInsts(typeKey, insts);
                  };

                  const updateContingentBenPct = (typeKey: string, idx: number, name: string, value: string) => {
                    const insts = [...getInsts(typeKey)];
                    const pcts = { ...((insts[idx]?.contingentBeneficiaryPercentages as Record<string,string>) || {}) };
                    pcts[name] = value;
                    insts[idx] = { ...insts[idx], contingentBeneficiaryPercentages: pcts };
                    setInsts(typeKey, insts);
                  };

                  const renderBeneficiarySection = (typeKey: string, instIdx: number, inst: Record<string, unknown>) => {
                    const hasPrimaryBen = (inst.hasPrimaryBeneficiary as string) || '';
                    const hasMultipleBen = (inst.hasMultipleBeneficiaries as string) || '';
                    const selectedKnown = (inst.selectedKnownBeneficiaries as string[]) || [];
                    const customBens = (inst.customBeneficiaries as string[]) || [];
                    const benPcts = (inst.beneficiaryPercentages as Record<string,string>) || {};
                    const allBens = [...selectedKnown, ...customBens.filter(b => b.trim())];
                    const totalPct = allBens.reduce((sum, n) => sum + (parseFloat(benPcts[n] || '0') || 0), 0);
                    const pctValid = Math.abs(totalPct - 100) < 0.01;
                    const hasSuccessorHolder = (inst.hasSuccessorHolder as string) || '';
                    const hasBenIfPredecease = (inst.hasBenIfPredecease as string) || '';
                    const saOrBen = (inst.successorAnnuitantOrBeneficiary as string) || '';
                    const hasContingentBen = (inst.hasContingentBeneficiary as string) || '';
                    const hasMultipleContingentBen = (inst.hasMultipleContingentBeneficiaries as string) || '';
                    const selectedKnownContingent = (inst.selectedKnownContingentBeneficiaries as string[]) || [];
                    const customContingentBens = (inst.customContingentBeneficiaries as string[]) || [];
                    const contingentBenPcts = (inst.contingentBeneficiaryPercentages as Record<string,string>) || {};
                    const allContingentBens = [...selectedKnownContingent, ...customContingentBens.filter(b => b.trim())];
                    const totalContingentPct = allContingentBens.reduce((sum, n) => sum + (parseFloat(contingentBenPcts[n] || '0') || 0), 0);
                    const contingentPctValid = Math.abs(totalContingentPct - 100) < 0.01;

                    const isResp = typeKey === 'resp';
                    const allChildren = (s3['childrenData'] as Array<Record<string,string>>) || [];
                    const respChildNames: string[] = allChildren.map(c => c?.name).filter((n): n is string => Boolean(n));
                    const respGrandchildNames: string[] = [];
                    allChildren.forEach(c => {
                      const gcCount = parseInt(c?.numberOfGrandchildren || '0');
                      for (let i = 1; i <= gcCount; i++) {
                        const gcName = c?.[`grandchild${i}Name`];
                        if (gcName) respGrandchildNames.push(gcName);
                      }
                    });
                    const respHasChildSelected = isResp && selectedKnown.some(n => respChildNames.includes(n));
                    const respHasGrandchildSelected = isResp && selectedKnown.some(n => respGrandchildNames.includes(n));

                    const isSingle = hasMultipleBen === 'no';
                    const singleIsCustom = isSingle && customBens.length > 0;
                    const singleSelected = isSingle ? (singleIsCustom ? '__custom__' : (selectedKnown[0] || '')) : '';
                    const isContingentSingle = hasMultipleContingentBen === 'no';
                    const contingentSingleIsCustom = isContingentSingle && customContingentBens.length > 0;
                    const contingentSingleSelected = isContingentSingle ? (contingentSingleIsCustom ? '__custom__' : (selectedKnownContingent[0] || '')) : '';

                    const selectSingleBen = (name: string, isCustom: boolean) => {
                      const cur = [...getInsts(typeKey)];
                      cur[instIdx] = {
                        ...cur[instIdx],
                        selectedKnownBeneficiaries: isCustom ? [] : [name],
                        customBeneficiaries: isCustom ? [''] : [],
                        beneficiaryPercentages: isCustom ? {} : { [name]: '100' },
                      };
                      setInsts(typeKey, cur);
                    };

                    const updateSingleCustomBen = (value: string) => {
                      const cur = [...getInsts(typeKey)];
                      cur[instIdx] = {
                        ...cur[instIdx],
                        customBeneficiaries: [value],
                        beneficiaryPercentages: value.trim() ? { [value]: '100' } : {},
                      };
                      setInsts(typeKey, cur);
                    };

                    const selectSingleContingentBen = (name: string, isCustom: boolean) => {
                      const cur = [...getInsts(typeKey)];
                      cur[instIdx] = {
                        ...cur[instIdx],
                        selectedKnownContingentBeneficiaries: isCustom ? [] : [name],
                        customContingentBeneficiaries: isCustom ? [''] : [],
                        contingentBeneficiaryPercentages: isCustom ? {} : { [name]: '100' },
                      };
                      setInsts(typeKey, cur);
                    };

                    const updateSingleCustomContingentBen = (value: string) => {
                      const cur = [...getInsts(typeKey)];
                      cur[instIdx] = {
                        ...cur[instIdx],
                        customContingentBeneficiaries: [value],
                        contingentBeneficiaryPercentages: value.trim() ? { [value]: '100' } : {},
                      };
                      setInsts(typeKey, cur);
                    };

                    const saInfoKey = `sa-${typeKey}-${instIdx}`;

                    const saFollowUp = (
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <label className="block text-sm font-medium text-gray-300">Are they named as a Successor Annuitant or Beneficiary?</label>
                            <button type="button" onClick={() => setOpenInfoTooltip(openInfoTooltip === saInfoKey ? null : saInfoKey)} className="text-gray-400 hover:text-blue-400 transition-colors flex-shrink-0" aria-label="More information">
                              <Info size={15} />
                            </button>
                          </div>
                          {openInfoTooltip === saInfoKey && (
                            <div className="mb-3 p-3 bg-gray-700 border border-blue-500/40 rounded-lg text-sm text-gray-300 leading-relaxed">
                              Naming your spouse as a beneficiary instead of a successor annuitant may provide additional flexibility to optimize taxes after death. While a successor annuitant designation is usually simpler administratively, a beneficiary designation can allow your executor and surviving spouse to decide how much of the RRIF should be rolled over versus taxed on your final return, depending on the family's circumstances at the time of death.
                            </div>
                          )}
                          <div className="flex flex-wrap gap-4">
                            {(['successor_annuitant', 'beneficiary', 'not_sure'] as const).map(opt => (
                              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name={`saorben-${typeKey}-${instIdx}`} value={opt} checked={saOrBen === opt}
                                  onChange={() => {
                                    const cur = [...getInsts(typeKey)];
                                    cur[instIdx] = { ...cur[instIdx], successorAnnuitantOrBeneficiary: opt, hasMultipleBeneficiaries: '', selectedKnownBeneficiaries: [], customBeneficiaries: [], beneficiaryPercentages: {}, hasContingentBeneficiary: '', hasMultipleContingentBeneficiaries: '', selectedKnownContingentBeneficiaries: [], customContingentBeneficiaries: [], contingentBeneficiaryPercentages: {} };
                                    setInsts(typeKey, cur);
                                  }}
                                  className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500" />
                                <span className="text-white text-sm">{opt === 'successor_annuitant' ? 'Successor Annuitant' : opt === 'beneficiary' ? 'Beneficiary' : "I'm not sure"}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    );

                    const saContingentSection = (
                      <div className="pt-3 border-t border-gray-600 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Have you named any contingent beneficiaries, should {client2Name} predecease?
                          </label>
                          <div className="flex flex-wrap gap-4">
                            {(['yes', 'no', 'not_sure'] as const).map(opt => (
                              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name={`sacben-${typeKey}-${instIdx}`} value={opt} checked={hasContingentBen === opt}
                                  onChange={() => {
                                    const cur = [...getInsts(typeKey)];
                                    cur[instIdx] = { ...cur[instIdx], hasContingentBeneficiary: opt, hasMultipleContingentBeneficiaries: '', selectedKnownContingentBeneficiaries: [], customContingentBeneficiaries: [], contingentBeneficiaryPercentages: {} };
                                    setInsts(typeKey, cur);
                                  }}
                                  className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500" />
                                <span className="text-white text-sm">{opt === 'yes' ? 'Yes' : opt === 'no' ? 'No' : "I'm not sure"}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        {hasContingentBen === 'yes' && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Are there multiple contingent beneficiaries?</label>
                              <div className="flex gap-4">
                                {(['yes', 'no'] as const).map(opt => (
                                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name={`samcben-${typeKey}-${instIdx}`} value={opt} checked={hasMultipleContingentBen === opt}
                                      onChange={() => {
                                        const cur = [...getInsts(typeKey)];
                                        cur[instIdx] = { ...cur[instIdx], hasMultipleContingentBeneficiaries: opt, selectedKnownContingentBeneficiaries: [], customContingentBeneficiaries: [], contingentBeneficiaryPercentages: {} };
                                        setInsts(typeKey, cur);
                                      }}
                                      className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500" />
                                    <span className="text-white text-sm">{opt === 'yes' ? 'Yes' : 'No'}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            {isContingentSingle && (
                              <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">Select contingent beneficiary:</label>
                                {knownNames.map(name => (
                                  <label key={name} className="flex items-center gap-3 cursor-pointer">
                                    <input type="radio" name={`sascben-${typeKey}-${instIdx}`} value={name} checked={contingentSingleSelected === name} onChange={() => selectSingleContingentBen(name, false)} className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500" />
                                    <span className="text-white text-sm">{name}</span>
                                  </label>
                                ))}
                                <label className="flex items-center gap-3 cursor-pointer">
                                  <input type="radio" name={`sascben-${typeKey}-${instIdx}`} value="__custom__" checked={contingentSingleSelected === '__custom__'} onChange={() => selectSingleContingentBen('', true)} className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500" />
                                  <span className="text-white text-sm">Other</span>
                                </label>
                                {contingentSingleIsCustom && (
                                  <input type="text" value={customContingentBens[0] || ''} onChange={e => updateSingleCustomContingentBen(e.target.value)} placeholder="Enter beneficiary name"
                                    className="ml-7 w-full max-w-xs px-3 py-2 bg-gray-500 border border-gray-400 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                                )}
                              </div>
                            )}
                            {!isContingentSingle && hasMultipleContingentBen === 'yes' && (
                              <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">Select contingent beneficiaries:</label>
                                {knownNames.map(name => (
                                  <label key={name} className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={selectedKnownContingent.includes(name)} onChange={() => toggleKnownContingentBen(typeKey, instIdx, name)} className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2" />
                                    <span className="text-white text-sm">{name}</span>
                                  </label>
                                ))}
                                {customContingentBens.map((name, bIdx) => (
                                  <div key={bIdx} className="space-y-2 pl-2">
                                    <div className="flex items-center gap-3">
                                      <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center shrink-0">
                                        <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                      </div>
                                      <input type="text" value={name} onChange={e => updateCustomContingentBen(typeKey, instIdx, bIdx, e.target.value)} placeholder="Enter beneficiary name"
                                        className="flex-1 px-3 py-2 bg-gray-500 border border-gray-400 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                                    </div>
                                    {bIdx === customContingentBens.length - 1 && (
                                      <div className="pl-7 space-y-2">
                                        <p className="text-sm text-gray-300">Are there other contingent beneficiaries?</p>
                                        <div className="flex gap-3">
                                          <button type="button" onClick={() => addCustomContingentBen(typeKey, instIdx)} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">Yes</button>
                                          <button type="button" onClick={() => removeLastCustomContingentBen(typeKey, instIdx)} className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors">No</button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                                {customContingentBens.length === 0 && (
                                  <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={false} onChange={() => addCustomContingentBen(typeKey, instIdx)} className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2" />
                                    <span className="text-white text-sm">Other</span>
                                  </label>
                                )}
                              </div>
                            )}
                            {allContingentBens.length > 0 && isContingentSingle && (
                              <div className="pl-4 border-l-2 border-blue-500/40">
                                <label className="block text-sm font-medium text-gray-300 mb-1">Beneficial Ownership:</label>
                                <div className="flex items-center gap-3">
                                  <span className="text-white text-sm w-40 shrink-0 truncate">{allContingentBens[0]}</span>
                                  <span className="text-green-400 text-sm font-medium">100%</span>
                                </div>
                              </div>
                            )}
                            {allContingentBens.length > 0 && !isContingentSingle && (
                              <div className="space-y-3 pl-4 border-l-2 border-blue-500/40">
                                <label className="block text-sm font-medium text-gray-300">Beneficial Ownership %: (must total 100%)</label>
                                {allContingentBens.map(name => (
                                  <div key={name} className="flex items-center gap-3">
                                    <span className="text-white text-sm w-40 shrink-0 truncate">{name}</span>
                                    <div className="relative flex-1 max-w-[140px]">
                                      <input type="number" min="0" max="100" step="0.01" value={contingentBenPcts[name] || ''} onChange={e => updateContingentBenPct(typeKey, instIdx, name, e.target.value)} placeholder="0"
                                        className="w-full px-4 py-2 pr-8 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
                                    </div>
                                  </div>
                                ))}
                                <p className={`text-sm font-medium ${contingentPctValid ? 'text-green-400' : totalContingentPct > 0 ? 'text-red-400' : 'text-gray-400'}`}>
                                  Total: {totalContingentPct.toFixed(totalContingentPct % 1 === 0 ? 0 : 2)}%{totalContingentPct > 0 && !contingentPctValid ? ' — must equal 100%' : ''}{contingentPctValid ? ' ✓' : ''}
                                </p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );

                    const primaryBenLabel = (typeKey === 'rrif' || typeKey === 'rrsp') && hasSpouse
                      ? `Is ${client2Name} named as a Successor Annuitant or Beneficiary?`
                      : 'Have you named a primary beneficiary(ies)?';

                    const primaryBenQuestion = (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">{primaryBenLabel}</label>
                        <div className="flex flex-wrap gap-4">
                          {(['yes', 'no', 'not_sure'] as const).map(opt => (
                            <label key={opt} className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" name={`pben-${typeKey}-${instIdx}`} value={opt} checked={hasPrimaryBen === opt}
                                onChange={() => updateInstField(typeKey, instIdx, 'hasPrimaryBeneficiary', opt)}
                                className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500" />
                              <span className="text-white text-sm">{opt === 'yes' ? 'Yes' : opt === 'no' ? 'No' : "I'm not sure"}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    );

                    const beneficiaryDetails = (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            {isResp
                              ? 'Is this an individual plan (one beneficiary) or a family plan (multiple beneficiaries on the same account)?'
                              : 'Are there multiple primary beneficiaries?'}
                          </label>
                          <div className="flex flex-wrap gap-4">
                            {(isResp
                              ? [{ value: 'no', label: 'Individual plan' }, { value: 'yes', label: 'Family plan' }]
                              : [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]
                            ).map(opt => (
                              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name={`mben-${typeKey}-${instIdx}`} value={opt.value} checked={hasMultipleBen === opt.value}
                                  onChange={() => { const cur = [...getInsts(typeKey)]; cur[instIdx] = { ...cur[instIdx], hasMultipleBeneficiaries: opt.value, selectedKnownBeneficiaries: [], customBeneficiaries: [], beneficiaryPercentages: {} }; setInsts(typeKey, cur); }}
                                  className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500" />
                                <span className="text-white text-sm">{opt.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        {isSingle && (
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Select primary beneficiary:</label>
                            {(isResp ? [...respChildNames, ...respGrandchildNames] : knownNames).map(name => (
                              <label key={name} className="flex items-center gap-3 cursor-pointer">
                                <input type="radio" name={`sben-${typeKey}-${instIdx}`} value={name} checked={singleSelected === name} onChange={() => selectSingleBen(name, false)} className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500" />
                                <span className="text-white text-sm">{name}</span>
                              </label>
                            ))}
                            {!isResp && (
                              <>
                                <label className="flex items-center gap-3 cursor-pointer">
                                  <input type="radio" name={`sben-${typeKey}-${instIdx}`} value="__custom__" checked={singleSelected === '__custom__'} onChange={() => selectSingleBen('', true)} className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500" />
                                  <span className="text-white text-sm">Other</span>
                                </label>
                                {singleIsCustom && (
                                  <input type="text" value={customBens[0] || ''} onChange={e => updateSingleCustomBen(e.target.value)} placeholder="Enter beneficiary name"
                                    className="ml-7 w-full max-w-xs px-3 py-2 bg-gray-500 border border-gray-400 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                                )}
                              </>
                            )}
                            {isResp && respChildNames.length === 0 && respGrandchildNames.length === 0 && (
                              <p className="text-sm text-gray-400">No children or grandchildren found. Please add them in the Children section.</p>
                            )}
                          </div>
                        )}
                        {!isSingle && hasMultipleBen === 'yes' && (
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Select primary beneficiaries:</label>
                            {isResp ? (
                              <div className="space-y-3">
                                {respChildNames.length > 0 && (
                                  <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Children</p>
                                    {respChildNames.map(name => (
                                      <label key={name} className={`flex items-center gap-3 ${respHasGrandchildSelected ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
                                        <input type="checkbox" checked={selectedKnown.includes(name)} disabled={respHasGrandchildSelected}
                                          onChange={() => !respHasGrandchildSelected && toggleKnownBen(typeKey, instIdx, name)}
                                          className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2" />
                                        <span className="text-white text-sm">{name}</span>
                                      </label>
                                    ))}
                                  </div>
                                )}
                                {respGrandchildNames.length > 0 && (
                                  <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Grandchildren</p>
                                    {respGrandchildNames.map(name => (
                                      <label key={name} className={`flex items-center gap-3 ${respHasChildSelected ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
                                        <input type="checkbox" checked={selectedKnown.includes(name)} disabled={respHasChildSelected}
                                          onChange={() => !respHasChildSelected && toggleKnownBen(typeKey, instIdx, name)}
                                          className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2" />
                                        <span className="text-white text-sm">{name}</span>
                                      </label>
                                    ))}
                                  </div>
                                )}
                                {respChildNames.length === 0 && respGrandchildNames.length === 0 && (
                                  <p className="text-sm text-gray-400">No children or grandchildren found. Please add them in the Children section.</p>
                                )}
                                {(respHasChildSelected || respHasGrandchildSelected) && (
                                  <p className="text-xs text-amber-400">Children and grandchildren cannot be mixed as beneficiaries on the same RESP.</p>
                                )}
                              </div>
                            ) : (
                              <>
                                {knownNames.map(name => (
                                  <label key={name} className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={selectedKnown.includes(name)} onChange={() => toggleKnownBen(typeKey, instIdx, name)} className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2" />
                                    <span className="text-white text-sm">{name}</span>
                                  </label>
                                ))}
                                {customBens.map((name, bIdx) => (
                                  <div key={bIdx} className="space-y-2 pl-2">
                                    <div className="flex items-center gap-3">
                                      <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center shrink-0">
                                        <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                      </div>
                                      <input type="text" value={name} onChange={e => updateCustomBen(typeKey, instIdx, bIdx, e.target.value)} placeholder="Enter beneficiary name"
                                        className="flex-1 px-3 py-2 bg-gray-500 border border-gray-400 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                                    </div>
                                    {bIdx === customBens.length - 1 && (
                                      <div className="pl-7 space-y-2">
                                        <p className="text-sm text-gray-300">Are there other primary beneficiaries?</p>
                                        <div className="flex gap-3">
                                          <button type="button" onClick={() => addCustomBen(typeKey, instIdx)} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">Yes</button>
                                          <button type="button" onClick={() => removeLastCustomBen(typeKey, instIdx)} className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors">No</button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                                {customBens.length === 0 && (
                                  <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={false} onChange={() => addCustomBen(typeKey, instIdx)} className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2" />
                                    <span className="text-white text-sm">Other</span>
                                  </label>
                                )}
                              </>
                            )}
                          </div>
                        )}
                        {allBens.length > 0 && isSingle && (
                          <div className="pl-4 border-l-2 border-blue-500/40">
                            <label className="block text-sm font-medium text-gray-300 mb-1">Beneficial Ownership:</label>
                            <div className="flex items-center gap-3">
                              <span className="text-white text-sm w-40 shrink-0 truncate">{allBens[0]}</span>
                              <span className="text-green-400 text-sm font-medium">100%</span>
                            </div>
                          </div>
                        )}
                        {allBens.length > 0 && !isSingle && (
                          <div className="space-y-3 pl-4 border-l-2 border-blue-500/40">
                            <label className="block text-sm font-medium text-gray-300">Beneficial Ownership %: (must total 100%)</label>
                            {allBens.map(name => (
                              <div key={name} className="flex items-center gap-3">
                                <span className="text-white text-sm w-40 shrink-0 truncate">{name}</span>
                                <div className="relative flex-1 max-w-[140px]">
                                  <input type="number" min="0" max="100" step="0.01" value={benPcts[name] || ''} onChange={e => updateBenPct(typeKey, instIdx, name, e.target.value)} placeholder="0"
                                    className="w-full px-4 py-2 pr-8 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
                                </div>
                              </div>
                            ))}
                            <p className={`text-sm font-medium ${pctValid ? 'text-green-400' : totalPct > 0 ? 'text-red-400' : 'text-gray-400'}`}>
                              Total: {totalPct.toFixed(totalPct % 1 === 0 ? 0 : 2)}%{totalPct > 0 && !pctValid ? ' — must equal 100%' : ''}{pctValid ? ' ✓' : ''}
                            </p>
                          </div>
                        )}

                        {allBens.length > 0 && !isResp && (
                          <div className="pt-3 border-t border-gray-600 space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Have you named any contingent beneficiaries, should {allBens.length === 1 ? allBens[0] : 'your primary beneficiary(ies)'} predecease?
                              </label>
                              <div className="flex flex-wrap gap-4">
                                {(['yes', 'no', 'not_sure'] as const).map(opt => (
                                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name={`cben-${typeKey}-${instIdx}`} value={opt} checked={hasContingentBen === opt}
                                      onChange={() => {
                                        const cur = [...getInsts(typeKey)];
                                        cur[instIdx] = { ...cur[instIdx], hasContingentBeneficiary: opt, hasMultipleContingentBeneficiaries: '', selectedKnownContingentBeneficiaries: [], customContingentBeneficiaries: [], contingentBeneficiaryPercentages: {} };
                                        setInsts(typeKey, cur);
                                      }}
                                      className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500" />
                                    <span className="text-white text-sm">{opt === 'yes' ? 'Yes' : opt === 'no' ? 'No' : "I'm not sure"}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            {hasContingentBen === 'yes' && (
                              <>
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2">Are there multiple contingent beneficiaries?</label>
                                  <div className="flex gap-4">
                                    {(['yes', 'no'] as const).map(opt => (
                                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name={`mcben-${typeKey}-${instIdx}`} value={opt} checked={hasMultipleContingentBen === opt}
                                          onChange={() => {
                                            const cur = [...getInsts(typeKey)];
                                            cur[instIdx] = { ...cur[instIdx], hasMultipleContingentBeneficiaries: opt, selectedKnownContingentBeneficiaries: [], customContingentBeneficiaries: [], contingentBeneficiaryPercentages: {} };
                                            setInsts(typeKey, cur);
                                          }}
                                          className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500" />
                                        <span className="text-white text-sm">{opt === 'yes' ? 'Yes' : 'No'}</span>
                                      </label>
                                    ))}
                                  </div>
                                </div>

                                {isContingentSingle && (
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">Select contingent beneficiary:</label>
                                    {knownNames.map(name => (
                                      <label key={name} className="flex items-center gap-3 cursor-pointer">
                                        <input type="radio" name={`scben-${typeKey}-${instIdx}`} value={name} checked={contingentSingleSelected === name} onChange={() => selectSingleContingentBen(name, false)} className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500" />
                                        <span className="text-white text-sm">{name}</span>
                                      </label>
                                    ))}
                                    <label className="flex items-center gap-3 cursor-pointer">
                                      <input type="radio" name={`scben-${typeKey}-${instIdx}`} value="__custom__" checked={contingentSingleSelected === '__custom__'} onChange={() => selectSingleContingentBen('', true)} className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500" />
                                      <span className="text-white text-sm">Other</span>
                                    </label>
                                    {contingentSingleIsCustom && (
                                      <input type="text" value={customContingentBens[0] || ''} onChange={e => updateSingleCustomContingentBen(e.target.value)} placeholder="Enter beneficiary name"
                                        className="ml-7 w-full max-w-xs px-3 py-2 bg-gray-500 border border-gray-400 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                                    )}
                                  </div>
                                )}

                                {!isContingentSingle && hasMultipleContingentBen === 'yes' && (
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">Select contingent beneficiaries:</label>
                                    {knownNames.map(name => (
                                      <label key={name} className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" checked={selectedKnownContingent.includes(name)} onChange={() => toggleKnownContingentBen(typeKey, instIdx, name)} className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2" />
                                        <span className="text-white text-sm">{name}</span>
                                      </label>
                                    ))}
                                    {customContingentBens.map((name, bIdx) => (
                                      <div key={bIdx} className="space-y-2 pl-2">
                                        <div className="flex items-center gap-3">
                                          <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center shrink-0">
                                            <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                          </div>
                                          <input type="text" value={name} onChange={e => updateCustomContingentBen(typeKey, instIdx, bIdx, e.target.value)} placeholder="Enter beneficiary name"
                                            className="flex-1 px-3 py-2 bg-gray-500 border border-gray-400 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                                        </div>
                                        {bIdx === customContingentBens.length - 1 && (
                                          <div className="pl-7 space-y-2">
                                            <p className="text-sm text-gray-300">Are there other contingent beneficiaries?</p>
                                            <div className="flex gap-3">
                                              <button type="button" onClick={() => addCustomContingentBen(typeKey, instIdx)} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">Yes</button>
                                              <button type="button" onClick={() => removeLastCustomContingentBen(typeKey, instIdx)} className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors">No</button>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                    {customContingentBens.length === 0 && (
                                      <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" checked={false} onChange={() => addCustomContingentBen(typeKey, instIdx)} className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2" />
                                        <span className="text-white text-sm">Other</span>
                                      </label>
                                    )}
                                  </div>
                                )}

                                {allContingentBens.length > 0 && isContingentSingle && (
                                  <div className="pl-4 border-l-2 border-blue-500/40">
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Beneficial Ownership:</label>
                                    <div className="flex items-center gap-3">
                                      <span className="text-white text-sm w-40 shrink-0 truncate">{allContingentBens[0]}</span>
                                      <span className="text-green-400 text-sm font-medium">100%</span>
                                    </div>
                                  </div>
                                )}

                                {allContingentBens.length > 0 && !isContingentSingle && (
                                  <div className="space-y-3 pl-4 border-l-2 border-blue-500/40">
                                    <label className="block text-sm font-medium text-gray-300">Beneficial Ownership %: (must total 100%)</label>
                                    {allContingentBens.map(name => (
                                      <div key={name} className="flex items-center gap-3">
                                        <span className="text-white text-sm w-40 shrink-0 truncate">{name}</span>
                                        <div className="relative flex-1 max-w-[140px]">
                                          <input type="number" min="0" max="100" step="0.01" value={contingentBenPcts[name] || ''} onChange={e => updateContingentBenPct(typeKey, instIdx, name, e.target.value)} placeholder="0"
                                            className="w-full px-4 py-2 pr-8 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
                                        </div>
                                      </div>
                                    ))}
                                    <p className={`text-sm font-medium ${contingentPctValid ? 'text-green-400' : totalContingentPct > 0 ? 'text-red-400' : 'text-gray-400'}`}>
                                      Total: {totalContingentPct.toFixed(totalContingentPct % 1 === 0 ? 0 : 2)}%{totalContingentPct > 0 && !contingentPctValid ? ' — must equal 100%' : ''}{contingentPctValid ? ' ✓' : ''}
                                    </p>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </>
                    );

                    return (
                      <div className="mt-3 space-y-4 pl-4 border-l-2 border-gray-500">
                        {(typeKey === 'tfsa' || typeKey === 'fhsa') && hasSpouse ? (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Is {client2Name} named as your Successor Holder?</label>
                              <div className="flex gap-4">
                                {(['yes', 'no', 'not_sure'] as const).map(opt => (
                                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name={`sh-${typeKey}-${instIdx}`} value={opt} checked={hasSuccessorHolder === opt}
                                      onChange={() => {
                                        const cur = [...getInsts(typeKey)];
                                        cur[instIdx] = { ...cur[instIdx], hasSuccessorHolder: opt, successorHolder: opt === 'yes' ? client2Name : '', hasBenIfPredecease: '', hasPrimaryBeneficiary: '', hasMultipleBeneficiaries: '', selectedKnownBeneficiaries: [], customBeneficiaries: [], beneficiaryPercentages: {} };
                                        setInsts(typeKey, cur);
                                      }}
                                      className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500" />
                                    <span className="text-white text-sm">{opt === 'yes' ? 'Yes' : opt === 'no' ? 'No' : "I'm not sure"}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            {hasSuccessorHolder === 'yes' && (
                              <>
                                <div className="text-sm text-gray-300">Successor Holder: <span className="text-white font-medium">{client2Name}</span></div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2">Have you named any beneficiaries, should your successor holder predecease?</label>
                                  <div className="flex gap-4">
                                    {(['yes', 'no', 'not_sure'] as const).map(opt => (
                                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name={`bip-${typeKey}-${instIdx}`} value={opt} checked={hasBenIfPredecease === opt}
                                          onChange={() => {
                                            const cur = [...getInsts(typeKey)];
                                            cur[instIdx] = { ...cur[instIdx], hasBenIfPredecease: opt, hasPrimaryBeneficiary: '', hasMultipleBeneficiaries: '', selectedKnownBeneficiaries: [], customBeneficiaries: [], beneficiaryPercentages: {} };
                                            setInsts(typeKey, cur);
                                          }}
                                          className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500" />
                                        <span className="text-white text-sm">{opt === 'yes' ? 'Yes' : opt === 'no' ? 'No' : "I'm not sure"}</span>
                                      </label>
                                    ))}
                                  </div>
                                </div>
                                {hasBenIfPredecease === 'yes' && beneficiaryDetails}
                              </>
                            )}
                            {hasSuccessorHolder === 'no' && beneficiaryDetails}
                          </>
                        ) : (typeKey === 'rrif' || typeKey === 'rrsp') && hasSpouse ? (
                          <>
                            {primaryBenQuestion}
                            {hasPrimaryBen === 'yes' && (
                              <>
                                {saFollowUp}
                                {saOrBen === 'successor_annuitant' && saContingentSection}
                                {saOrBen === 'beneficiary' && beneficiaryDetails}
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {beneficiaryDetails}
                            {isResp && (() => {
                              const hasSuccSub = (inst.hasSuccessorSubscriber as string) || '';
                              const additionalSubscriber = (inst.additionalSubscriber as string) || '';
                              const andCoSubscriber = additionalSubscriber ? ` (and ${additionalSubscriber} if applicable)` : '';

                              // Compute adult-eligible names based on province age of majority
                              const province = ((basicAnswers['province'] as string) || '').toLowerCase();
                              const higherMajorityProvinces = ['bc', 'british columbia', 'nova scotia', 'new brunswick', 'newfoundland', 'nl', 'ns', 'nb'];
                              const ageOfMajority = higherMajorityProvinces.some(p => province.includes(p)) ? 19 : 18;
                              const today = new Date();
                              const adultKnownOptions: string[] = [];
                              if (hasSpouse && client2Name) adultKnownOptions.push(client2Name);
                              ((s2['client1PreviousRelationshipsData'] as Array<Record<string,string>>) || []).forEach(r => {
                                if (r?.name && !adultKnownOptions.includes(r.name)) adultKnownOptions.push(r.name);
                              });
                              allChildren.forEach(c => {
                                if (!c?.name || !c?.dateOfBirth) return;
                                const ageMs = today.getTime() - new Date(c.dateOfBirth).getTime();
                                if (ageMs / (365.25 * 24 * 60 * 60 * 1000) >= ageOfMajority && !adultKnownOptions.includes(c.name)) adultKnownOptions.push(c.name);
                              });

                              const succSubSelected = (inst.succSubSelected as string[]) || [];
                              const other1Active = (inst.succSubOther1Active as string) === 'yes';
                              const other2Active = (inst.succSubOther2Active as string) === 'yes';
                              const other1 = (inst.succSubOther1 as Record<string,string>) || {};
                              const other2 = (inst.succSubOther2 as Record<string,string>) || {};
                              const otherRelationship = (inst.succSubOtherRelationship as string) || '';

                              const toggleKnownSuccSub = (name: string) => {
                                const cur = [...getInsts(typeKey)];
                                const prev = (cur[instIdx].succSubSelected as string[]) || [];
                                cur[instIdx] = { ...cur[instIdx], succSubSelected: prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name] };
                                setInsts(typeKey, cur);
                              };

                              const updateOther = (slot: 1 | 2, field: string, value: string) => {
                                const key = slot === 1 ? 'succSubOther1' : 'succSubOther2';
                                const cur = [...getInsts(typeKey)];
                                const prev = (cur[instIdx][key] as Record<string,string>) || {};
                                cur[instIdx] = { ...cur[instIdx], [key]: { ...prev, [field]: value } };
                                setInsts(typeKey, cur);
                              };

                              const contactFields = [
                                { key: 'name', label: 'Name', placeholder: 'Full name', type: 'text' },
                                { key: 'city', label: 'City', placeholder: 'City', type: 'text' },
                                { key: 'province', label: 'Province', placeholder: 'Province', type: 'text' },
                                { key: 'country', label: 'Country', placeholder: 'Country', type: 'text' },
                                { key: 'phone', label: 'Phone', placeholder: 'Phone number', type: 'tel' },
                                { key: 'email', label: 'Email', placeholder: 'Email address', type: 'email' },
                              ];

                              const inputClass = 'w-full px-2 py-1.5 bg-gray-500 border border-gray-400 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm';

                              return (
                                <div className="pt-3 border-t border-gray-600 space-y-3">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Have you named a Successor Subscriber (the person(s) who would oversee the account should you{andCoSubscriber} pass away)?
                                    </label>
                                    <div className="flex flex-wrap gap-4">
                                      {(['yes', 'no', 'not_sure'] as const).map(opt => (
                                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                          <input type="radio" name={`succsub-${typeKey}-${instIdx}`} value={opt}
                                            checked={hasSuccSub === opt}
                                            onChange={() => {
                                              const cur = [...getInsts(typeKey)];
                                              cur[instIdx] = { ...cur[instIdx], hasSuccessorSubscriber: opt, succSubSelected: [], succSubOther1Active: '', succSubOther2Active: '', succSubOther1: {}, succSubOther2: {}, succSubOtherRelationship: '' };
                                              setInsts(typeKey, cur);
                                            }}
                                            className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500" />
                                          <span className="text-white text-sm">{opt === 'yes' ? 'Yes' : opt === 'no' ? 'No' : "I'm not sure"}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </div>

                                  {hasSuccSub === 'yes' && (() => {
                                    // Compute total selected count and display names for relationship question
                                    const other1DisplayName = other1Active ? (other1.name?.trim() || 'Other (1)') : null;
                                    const other2DisplayName = other2Active ? (other2.name?.trim() || 'Other (2)') : null;
                                    const allSelectedNames: string[] = [
                                      ...succSubSelected,
                                      ...(other1DisplayName ? [other1DisplayName] : []),
                                      ...(other2DisplayName ? [other2DisplayName] : []),
                                    ];
                                    const totalSelected = allSelectedNames.length;
                                    const atMax = totalSelected >= 2;
                                    const canAddOther = !other1Active && !atMax;

                                    return (
                                      <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-300">
                                          Select Successor Subscriber(s): <span className="text-gray-400 font-normal">(maximum 2)</span>
                                        </label>

                                        {adultKnownOptions.map(name => {
                                          const isChecked = succSubSelected.includes(name);
                                          const isDisabled = atMax && !isChecked;
                                          return (
                                            <label key={name} className={`flex items-center gap-3 ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
                                              <input type="checkbox" checked={isChecked} disabled={isDisabled}
                                                onChange={() => !isDisabled && toggleKnownSuccSub(name)}
                                                className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2" />
                                              <span className="text-white text-sm">{name}</span>
                                            </label>
                                          );
                                        })}

                                        {/* Other — checkbox only shown when not already at max or already active */}
                                        {(canAddOther || other1Active) && (
                                          <label className={`flex items-center gap-3 ${!other1Active && atMax ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
                                            <input type="checkbox" checked={other1Active} disabled={!other1Active && atMax}
                                              onChange={() => {
                                                const cur = [...getInsts(typeKey)];
                                                const nowActive = !other1Active;
                                                cur[instIdx] = { ...cur[instIdx], succSubOther1Active: nowActive ? 'yes' : '', succSubOther1: {}, succSubOther2Active: '', succSubOther2: {}, succSubOtherRelationship: '' };
                                                setInsts(typeKey, cur);
                                              }}
                                              className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2" />
                                            <span className="text-white text-sm">Other</span>
                                          </label>
                                        )}

                                        {other1Active && (
                                          <div className="pl-7 space-y-3">
                                            <div className="grid grid-cols-2 gap-2">
                                              {contactFields.map(f => (
                                                <div key={f.key}>
                                                  <label className="block text-xs text-gray-400 mb-1">{f.label}:</label>
                                                  <input type={f.type} value={other1[f.key] || ''} onChange={e => updateOther(1, f.key, e.target.value)} placeholder={f.placeholder} className={inputClass} />
                                                </div>
                                              ))}
                                            </div>

                                            {/* Second other — only available if fewer than 2 total are selected */}
                                            {(other2Active || !atMax || other2Active) && (
                                              <label className={`flex items-center gap-3 ${!other2Active && atMax ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
                                                <input type="checkbox" checked={other2Active} disabled={!other2Active && atMax}
                                                  onChange={() => {
                                                    const cur = [...getInsts(typeKey)];
                                                    const nowActive = !other2Active;
                                                    cur[instIdx] = { ...cur[instIdx], succSubOther2Active: nowActive ? 'yes' : '', succSubOther2: {}, succSubOtherRelationship: '' };
                                                    setInsts(typeKey, cur);
                                                  }}
                                                  className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2" />
                                                <span className="text-white text-sm">Add a second person</span>
                                              </label>
                                            )}

                                            {other2Active && (
                                              <div className="pl-7 space-y-3">
                                                <div className="grid grid-cols-2 gap-2">
                                                  {contactFields.map(f => (
                                                    <div key={f.key}>
                                                      <label className="block text-xs text-gray-400 mb-1">{f.label}:</label>
                                                      <input type={f.type} value={other2[f.key] || ''} onChange={e => updateOther(2, f.key, e.target.value)} placeholder={f.placeholder} className={inputClass} />
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        )}

                                        {/* Relationship question — shown whenever exactly 2 people are selected */}
                                        {totalSelected === 2 && (
                                          <div className="pt-2">
                                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                              What is the relationship between {allSelectedNames[0]} and {allSelectedNames[1]}?
                                            </label>
                                            <input type="text" value={otherRelationship}
                                              onChange={e => updateInstField(typeKey, instIdx, 'succSubOtherRelationship', e.target.value)}
                                              placeholder="e.g. siblings, spouses, friends"
                                              className={inputClass} />
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })()}

                                  {(hasSuccSub === 'no' || hasSuccSub === 'not_sure') && (
                                    <div className="flex items-start gap-2 p-3 bg-amber-900/30 border border-amber-600/40 rounded-lg">
                                      <svg className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                                      <p className="text-amber-300 text-xs">Naming a Successor Subscriber is recommended. This will be flagged as an action item in your estate planning summary.</p>
                                    </div>
                                  )}
                                </div>
                              );
                            })()}
                          </>
                        )}
                      </div>
                    );
                  };

                  return (
                    <div className="mt-6 space-y-6">
                      <div className="pb-2 border-b border-gray-600">
                        <h4 className="text-sm font-semibold text-gray-200 uppercase tracking-wide">Registered Accounts</h4>
                      </div>

                      {REGISTERED_ACCOUNT_TYPES.map(({ key, label }) => {
                        const decision = accountDecisions[key] || (selectedTypes.includes(key) ? 'yes' : undefined);
                        const insts = getInsts(key);
                        return (
                          <div key={key} className="space-y-3 pb-4 border-b border-gray-700 last:border-0 last:pb-0">
                            <div>
                              <p className="text-sm font-medium text-gray-200 mb-2">Do you have a {label}?</p>
                              <div className="flex gap-4">
                                {(['yes', 'no'] as const).map(opt => (
                                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name={`has-account-${key}`} value={opt}
                                      checked={decision === opt}
                                      onChange={() => setAccountDecision(key, opt)}
                                      className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500" />
                                    <span className="text-white text-sm">{opt === 'yes' ? 'Yes' : 'No'}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            {decision === 'yes' && (
                            <div className="p-4 bg-gray-700 rounded-lg space-y-4">
                            <h5 className="text-sm font-semibold text-white">{label}</h5>
                            {insts.map((inst, instIdx) => {
                              const advisorSel = (inst.advisorSelection as string) || '';
                              const instLabel = (inst.institution as string) || '';

                              const renderAdvisorQuestion = () => {
                                if (advisors.length === 0) {
                                  return (
                                    <input type="text" value={instLabel}
                                      onChange={e => updateInstField(key, instIdx, 'institution', e.target.value)}
                                      placeholder="e.g., TD Waterhouse, Edward Jones, RBC Direct Investing"
                                      className="w-full px-4 py-2 bg-gray-500 border border-gray-400 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                  );
                                }

                                if (advisors.length === 1) {
                                  const a = advisors[0];
                                  const displayFirm = a.firm || a.name;
                                  const displayName = a.name || a.firm;
                                  return (
                                    <div className="space-y-3">
                                      <label className="block text-sm font-medium text-gray-300">
                                        Is this held at {displayFirm} with {displayName}?
                                      </label>
                                      <div className="flex gap-4">
                                        {(['yes', 'no'] as const).map(opt => (
                                          <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name={`advisor-sel-${key}-${instIdx}`} value={opt}
                                              checked={advisorSel === opt}
                                              onChange={() => {
                                                const cur = [...getInsts(key)];
                                                cur[instIdx] = { ...cur[instIdx], advisorSelection: opt, institution: opt === 'yes' ? `${displayFirm} (${displayName})` : '' };
                                                setInsts(key, cur);
                                              }}
                                              className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500" />
                                            <span className="text-white text-sm">{opt === 'yes' ? 'Yes' : 'No'}</span>
                                          </label>
                                        ))}
                                      </div>
                                      {advisorSel === 'no' && (
                                        <input type="text" value={instLabel}
                                          onChange={e => updateInstField(key, instIdx, 'institution', e.target.value)}
                                          placeholder="Enter institution / advisor name"
                                          className="w-full px-4 py-2 bg-gray-500 border border-gray-400 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                      )}
                                    </div>
                                  );
                                }

                                return (
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">Institution / Advisor:</label>
                                    {advisors.map((a, aIdx) => {
                                      const displayFirm = a.firm || a.name;
                                      const displayName = a.name || a.firm;
                                      const val = `advisor_${aIdx}`;
                                      return (
                                        <label key={aIdx} className="flex items-center gap-3 cursor-pointer">
                                          <input type="radio" name={`advisor-sel-${key}-${instIdx}`} value={val}
                                            checked={advisorSel === val}
                                            onChange={() => {
                                              const cur = [...getInsts(key)];
                                              cur[instIdx] = { ...cur[instIdx], advisorSelection: val, institution: `${displayFirm} (${displayName})` };
                                              setInsts(key, cur);
                                            }}
                                            className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500" />
                                          <span className="text-white text-sm">{displayFirm} — {displayName}</span>
                                        </label>
                                      );
                                    })}
                                    <label className="flex items-center gap-3 cursor-pointer">
                                      <input type="radio" name={`advisor-sel-${key}-${instIdx}`} value="other"
                                        checked={advisorSel === 'other'}
                                        onChange={() => { const cur = [...getInsts(key)]; cur[instIdx] = { ...cur[instIdx], advisorSelection: 'other', institution: '' }; setInsts(key, cur); }}
                                        className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500" />
                                      <span className="text-white text-sm">Other</span>
                                    </label>
                                    {advisorSel === 'other' && (
                                      <input type="text" value={instLabel}
                                        onChange={e => updateInstField(key, instIdx, 'institution', e.target.value)}
                                        placeholder="Enter institution / advisor name"
                                        className="w-full px-4 py-2 bg-gray-500 border border-gray-400 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                    )}
                                  </div>
                                );
                              };

                              return (
                                <div key={instIdx} className="p-4 bg-gray-600 rounded-lg space-y-3">
                                  <div className="flex items-center justify-between">
                                    <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Institution / Advisor {instIdx + 1}</p>
                                    {instIdx > 0 && (
                                      <button type="button"
                                        onClick={() => {
                                          const cur = [...getInsts(key)];
                                          cur.splice(instIdx);
                                          setInsts(key, cur);
                                        }}
                                        className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors">
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                                        </svg>
                                        Remove
                                      </button>
                                    )}
                                  </div>
                                  {renderAdvisorQuestion()}
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Account Balance:</label>
                                    <div className="relative max-w-xs">
                                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                      <input type="text" value={(inst.accountBalance as string) || ''}
                                        onChange={e => updateInstField(key, instIdx, 'accountBalance', e.target.value)}
                                        placeholder="0.00"
                                        className="w-full pl-7 pr-4 py-2 bg-gray-500 border border-gray-400 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                    </div>
                                  </div>
                                  {key === 'resp' && (() => {
                                    const isSoleSubscriber = (inst.isSoleSubscriber as string) || '';
                                    const additionalSubscriber = (inst.additionalSubscriber as string) || '';
                                    const prevRels = (s2['client1PreviousRelationshipsData'] as Array<Record<string,string>>) || [];
                                    const children = (s3['childrenData'] as Array<Record<string,string>>) || [];
                                    const prevNamesWithChildren = new Set(
                                      children
                                        .filter(c => c?.parentsOption === 'client1-other' && c?.otherParentName)
                                        .map(c => c.otherParentName)
                                    );
                                    const subscriberOptions: { value: string; label: string }[] = [];
                                    if (hasSpouse) subscriberOptions.push({ value: client2Name, label: `${client2Name} (current spouse / common-law partner)` });
                                    prevRels.forEach(r => {
                                      if (r?.name && prevNamesWithChildren.has(r.name)) {
                                        subscriberOptions.push({ value: r.name, label: `${r.name} (previous spouse / common-law partner)` });
                                      }
                                    });
                                    return (
                                      <div className="space-y-3">
                                        <div>
                                          <label className="block text-sm font-medium text-gray-300 mb-2">Are you the sole subscriber, or is there another subscriber?</label>
                                          <div className="flex flex-wrap gap-4">
                                            {[{ value: 'sole', label: 'I am the sole subscriber' }, { value: 'joint', label: 'There is another subscriber' }].map(opt => (
                                              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name={`sub-${key}-${instIdx}`} value={opt.value}
                                                  checked={isSoleSubscriber === opt.value}
                                                  onChange={() => {
                                                    const cur = [...getInsts(key)];
                                                    cur[instIdx] = { ...cur[instIdx], isSoleSubscriber: opt.value, additionalSubscriber: '' };
                                                    setInsts(key, cur);
                                                  }}
                                                  className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500" />
                                                <span className="text-white text-sm">{opt.label}</span>
                                              </label>
                                            ))}
                                          </div>
                                        </div>
                                        {isSoleSubscriber === 'joint' && (
                                          <div className="pl-4 border-l-2 border-gray-500">
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Who is the additional subscriber?</label>
                                            {subscriberOptions.length > 0 ? (
                                              <div className="space-y-2">
                                                {subscriberOptions.map(opt => (
                                                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                                                    <input type="radio" name={`addsub-${key}-${instIdx}`} value={opt.value}
                                                      checked={additionalSubscriber === opt.value}
                                                      onChange={() => updateInstField(key, instIdx, 'additionalSubscriber', opt.value)}
                                                      className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-500" />
                                                    <span className="text-white text-sm">{opt.label}</span>
                                                  </label>
                                                ))}
                                              </div>
                                            ) : (
                                              <p className="text-sm text-gray-400">No eligible co-subscribers found. An additional subscriber must be your current or a previous spouse or common-law partner with whom you have children.</p>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })()}
                                  {renderBeneficiarySection(key, instIdx, inst)}
                                </div>
                              );
                            })}
                            <button type="button" onClick={() => { const insts2 = [...getInsts(key), { institution: '' }]; setInsts(key, insts2); }}
                              className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                              <span>+</span><span>Add Institution / Advisor</span>
                            </button>
                            </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </>
            );
          })()}

          {step.id === 2 && (client1PrevRelCount > 0 || client2PrevRelCount > 0) && (() => {
            const basicAnswers = allAnswers?.get(1) || {};
            const client1Name = basicAnswers['fullName'] as string || 'Client 1';
            const client2Name = basicAnswers['spouseName'] as string || 'Client 2';

            return (
              <div className="space-y-8">
                {client1PrevRelCount > 0 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-white border-b border-gray-600 pb-2">
                      {client1Name}'s Previous Relationships
                    </h3>
                    {Array.from({ length: client1PrevRelCount }).map((_, index) => (
                      <div key={`client1-prev-${index}`} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                        <h4 className="text-lg font-semibold text-white mb-4">Previous Relationship {index + 1}</h4>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              What is the name of the person you previously had a marriage or common law relationship with? *
                            </label>
                            <input
                              type="text"
                              value={client1PreviousRelationshipsData[index]?.name || ''}
                              onChange={(e) => handleClient1PrevRelChange(index, 'name', e.target.value)}
                              placeholder="Enter name"
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Date of Separation
                            </label>
                            <input
                              type="date"
                              value={client1PreviousRelationshipsData[index]?.dateOfSeparation || ''}
                              onChange={(e) => handleClient1PrevRelChange(index, 'dateOfSeparation', e.target.value)}
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Date of Divorce
                            </label>
                            <input
                              type="date"
                              value={client1PreviousRelationshipsData[index]?.dateOfDivorce || ''}
                              onChange={(e) => handleClient1PrevRelChange(index, 'dateOfDivorce', e.target.value)}
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Other Information
                            </label>
                            <textarea
                              value={client1PreviousRelationshipsData[index]?.otherInfo || ''}
                              onChange={(e) => handleClient1PrevRelChange(index, 'otherInfo', e.target.value)}
                              placeholder="Enter any other relevant information"
                              rows={4}
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Are you paying or receiving spousal support?
                            </label>
                            <div className="flex gap-4">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name={`client1-spousal-support-${index}`}
                                  value="yes"
                                  checked={client1PreviousRelationshipsData[index]?.hasSpousalSupport === 'yes'}
                                  onChange={(e) => handleClient1PrevRelChange(index, 'hasSpousalSupport', e.target.value)}
                                  className="mr-2"
                                />
                                <span className="text-gray-300">Yes</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name={`client1-spousal-support-${index}`}
                                  value="no"
                                  checked={client1PreviousRelationshipsData[index]?.hasSpousalSupport === 'no'}
                                  onChange={(e) => handleClient1PrevRelChange(index, 'hasSpousalSupport', e.target.value)}
                                  className="mr-2"
                                />
                                <span className="text-gray-300">No</span>
                              </label>
                            </div>
                          </div>

                          {client1PreviousRelationshipsData[index]?.hasSpousalSupport === 'yes' && (
                            <>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Are you paying or receiving spousal support? *
                                </label>
                                <div className="flex gap-4">
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      name={`client1-support-type-${index}`}
                                      value="paying"
                                      checked={client1PreviousRelationshipsData[index]?.spousalSupportType === 'paying'}
                                      onChange={(e) => handleClient1PrevRelChange(index, 'spousalSupportType', e.target.value)}
                                      className="mr-2"
                                    />
                                    <span className="text-gray-300">Paying</span>
                                  </label>
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      name={`client1-support-type-${index}`}
                                      value="receiving"
                                      checked={client1PreviousRelationshipsData[index]?.spousalSupportType === 'receiving'}
                                      onChange={(e) => handleClient1PrevRelChange(index, 'spousalSupportType', e.target.value)}
                                      className="mr-2"
                                    />
                                    <span className="text-gray-300">Receiving</span>
                                  </label>
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Where is the document outlining this arrangement located?
                                </label>
                                <input
                                  type="text"
                                  value={client1PreviousRelationshipsData[index]?.supportDocumentLocation || ''}
                                  onChange={(e) => handleClient1PrevRelChange(index, 'supportDocumentLocation', e.target.value)}
                                  placeholder="Enter document location"
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {client2PrevRelCount > 0 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-white border-b border-gray-600 pb-2">
                      {client2Name}'s Previous Relationships
                    </h3>
                    {Array.from({ length: client2PrevRelCount }).map((_, index) => (
                      <div key={`client2-prev-${index}`} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                        <h4 className="text-lg font-semibold text-white mb-4">Previous Relationship {index + 1}</h4>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              What is the name of the person they previously had a marriage or common law relationship with? *
                            </label>
                            <input
                              type="text"
                              value={client2PreviousRelationshipsData[index]?.name || ''}
                              onChange={(e) => handleClient2PrevRelChange(index, 'name', e.target.value)}
                              placeholder="Enter name"
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Date of Separation
                            </label>
                            <input
                              type="date"
                              value={client2PreviousRelationshipsData[index]?.dateOfSeparation || ''}
                              onChange={(e) => handleClient2PrevRelChange(index, 'dateOfSeparation', e.target.value)}
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Date of Divorce
                            </label>
                            <input
                              type="date"
                              value={client2PreviousRelationshipsData[index]?.dateOfDivorce || ''}
                              onChange={(e) => handleClient2PrevRelChange(index, 'dateOfDivorce', e.target.value)}
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Other Information
                            </label>
                            <textarea
                              value={client2PreviousRelationshipsData[index]?.otherInfo || ''}
                              onChange={(e) => handleClient2PrevRelChange(index, 'otherInfo', e.target.value)}
                              placeholder="Enter any other relevant information"
                              rows={4}
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Are they paying or receiving spousal support?
                            </label>
                            <div className="flex gap-4">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name={`client2-spousal-support-${index}`}
                                  value="yes"
                                  checked={client2PreviousRelationshipsData[index]?.hasSpousalSupport === 'yes'}
                                  onChange={(e) => handleClient2PrevRelChange(index, 'hasSpousalSupport', e.target.value)}
                                  className="mr-2"
                                />
                                <span className="text-gray-300">Yes</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name={`client2-spousal-support-${index}`}
                                  value="no"
                                  checked={client2PreviousRelationshipsData[index]?.hasSpousalSupport === 'no'}
                                  onChange={(e) => handleClient2PrevRelChange(index, 'hasSpousalSupport', e.target.value)}
                                  className="mr-2"
                                />
                                <span className="text-gray-300">No</span>
                              </label>
                            </div>
                          </div>

                          {client2PreviousRelationshipsData[index]?.hasSpousalSupport === 'yes' && (
                            <>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Are they paying or receiving spousal support? *
                                </label>
                                <div className="flex gap-4">
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      name={`client2-support-type-${index}`}
                                      value="paying"
                                      checked={client2PreviousRelationshipsData[index]?.spousalSupportType === 'paying'}
                                      onChange={(e) => handleClient2PrevRelChange(index, 'spousalSupportType', e.target.value)}
                                      className="mr-2"
                                    />
                                    <span className="text-gray-300">Paying</span>
                                  </label>
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      name={`client2-support-type-${index}`}
                                      value="receiving"
                                      checked={client2PreviousRelationshipsData[index]?.spousalSupportType === 'receiving'}
                                      onChange={(e) => handleClient2PrevRelChange(index, 'spousalSupportType', e.target.value)}
                                      className="mr-2"
                                    />
                                    <span className="text-gray-300">Receiving</span>
                                  </label>
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Where is the document outlining this arrangement located?
                                </label>
                                <input
                                  type="text"
                                  value={client2PreviousRelationshipsData[index]?.supportDocumentLocation || ''}
                                  onChange={(e) => handleClient2PrevRelChange(index, 'supportDocumentLocation', e.target.value)}
                                  placeholder="Enter document location"
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          {step.id === 3 && childCount > 0 && (() => {
            const basicAnswers = allAnswers?.get(1) || {};
            const client1Name = basicAnswers['fullName'] as string || 'Client 1';
            const client2Name = basicAnswers['spouseName'] as string || 'Client 2';
            const hasSpouse = (basicAnswers['maritalStatus'] === 'married' || basicAnswers['maritalStatus'] === 'common_law');

            return (
              <div className="space-y-8">
                {Array.from({ length: childCount }).map((_, index) => (
                  <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                    <h3 className="text-xl font-bold text-white mb-6">
                      {childrenData[index]?.name ? childrenData[index].name : `Child ${index + 1}`}
                    </h3>

                    <div className="space-y-4">
                      <div className="pb-2 border-b border-gray-500 mb-2">
                        <h4 className="text-base font-semibold text-blue-400">Guardian Information</h4>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Child's Full Name *
                        </label>
                        <input
                          type="text"
                          value={childrenData[index]?.name || ''}
                          onChange={(e) => handleChildChange(index, 'name', e.target.value)}
                          placeholder="Enter full name"
                          className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Preferred Name/Nickname:
                        </label>
                        <input
                          type="text"
                          value={childrenData[index]?.nickname || ''}
                          onChange={(e) => handleChildChange(index, 'nickname', e.target.value)}
                          placeholder="Enter preferred name or nickname"
                          className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Child's parents names?
                        </label>
                        <select
                          value={childrenData[index]?.parentsOption || ''}
                          onChange={(e) => handleChildChange(index, 'parentsOption', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select parents</option>
                          {hasSpouse && (
                            <option value="both">{client1Name} and {client2Name}</option>
                          )}
                          <option value="client1-other">{client1Name} and other</option>
                          {hasSpouse && (
                            <option value="client2-other">{client2Name} and other</option>
                          )}
                        </select>
                      </div>

                      {(childrenData[index]?.parentsOption === 'client1-other' || childrenData[index]?.parentsOption === 'client2-other') && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Other parent's name:
                            </label>
                            <input
                              type="text"
                              value={childrenData[index]?.otherParentName || ''}
                              onChange={(e) => handleChildChange(index, 'otherParentName', e.target.value)}
                              placeholder="Enter other parent's name"
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Are you paying or receiving child support payments related to this child?
                            </label>
                            <div className="flex flex-col gap-2">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name={`childSupport-${index}`}
                                  value="receiving"
                                  checked={childrenData[index]?.childSupportStatus === 'receiving'}
                                  onChange={(e) => handleChildChange(index, 'childSupportStatus', e.target.value)}
                                  className="mr-2"
                                />
                                <span className="text-gray-300">Receiving Child Support Payments</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name={`childSupport-${index}`}
                                  value="paying"
                                  checked={childrenData[index]?.childSupportStatus === 'paying'}
                                  onChange={(e) => handleChildChange(index, 'childSupportStatus', e.target.value)}
                                  className="mr-2"
                                />
                                <span className="text-gray-300">Paying Child Support Payments</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name={`childSupport-${index}`}
                                  value="neither"
                                  checked={childrenData[index]?.childSupportStatus === 'neither'}
                                  onChange={(e) => handleChildChange(index, 'childSupportStatus', e.target.value)}
                                  className="mr-2"
                                />
                                <span className="text-gray-300">Neither paying nor receiving child support payments</span>
                              </label>
                            </div>
                          </div>

                          {(childrenData[index]?.childSupportStatus === 'receiving' || childrenData[index]?.childSupportStatus === 'paying') && (
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Where is/are the supporting document related to Child Support Payments located?
                              </label>
                              <input
                                type="text"
                                value={childrenData[index]?.childSupportDocLocation || ''}
                                onChange={(e) => handleChildChange(index, 'childSupportDocLocation', e.target.value)}
                                placeholder="Enter document location"
                                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          )}
                        </>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Date of Birth *
                        </label>
                      <input
                        type="date"
                        value={childrenData[index]?.dateOfBirth || ''}
                        onChange={(e) => handleChildChange(index, 'dateOfBirth', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="mt-6 pb-2 border-b border-gray-500 mb-2">
                      <h4 className="text-base font-semibold text-blue-400">Residency &amp; Family Status</h4>
                    </div>

                    <div className="mt-2 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Are they a resident of Canada?
                        </label>
                        <div className="flex gap-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`canadianResident-${index}`}
                              value="yes"
                              checked={childrenData[index]?.canadianResident === 'yes'}
                              onChange={(e) => handleChildChange(index, 'canadianResident', e.target.value)}
                              className="mr-2"
                            />
                            <span className="text-gray-300">Yes</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`canadianResident-${index}`}
                              value="no"
                              checked={childrenData[index]?.canadianResident === 'no'}
                              onChange={(e) => handleChildChange(index, 'canadianResident', e.target.value)}
                              className="mr-2"
                            />
                            <span className="text-gray-300">No</span>
                          </label>
                        </div>
                      </div>

                      {childrenData[index]?.canadianResident === 'yes' && (
                        <>
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Province/Territory of Residence
                            </label>
                            <select
                              value={childrenData[index]?.provinceTerritory || ''}
                              onChange={(e) => handleChildChange(index, 'provinceTerritory', e.target.value)}
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="">Select province/territory</option>
                              <option value="Alberta">Alberta</option>
                              <option value="British Columbia">British Columbia</option>
                              <option value="Manitoba">Manitoba</option>
                              <option value="New Brunswick">New Brunswick</option>
                              <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                              <option value="Northwest Territories">Northwest Territories</option>
                              <option value="Nova Scotia">Nova Scotia</option>
                              <option value="Nunavut">Nunavut</option>
                              <option value="Ontario">Ontario</option>
                              <option value="Prince Edward Island">Prince Edward Island</option>
                              <option value="Quebec">Quebec</option>
                              <option value="Saskatchewan">Saskatchewan</option>
                              <option value="Yukon">Yukon</option>
                            </select>
                          </div>

                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              City of residence:
                            </label>
                            <input
                              type="text"
                              value={childrenData[index]?.cityOfResidence || ''}
                              onChange={(e) => handleChildChange(index, 'cityOfResidence', e.target.value)}
                              placeholder="Enter city of residence"
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                        </>
                      )}

                      {childrenData[index]?.canadianResident === 'no' && (
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            In what country is this child a resident of?
                          </label>
                          <input
                            type="text"
                            value={childrenData[index]?.countryOfResidence || ''}
                            onChange={(e) => handleChildChange(index, 'countryOfResidence', e.target.value)}
                            placeholder="Enter country of residence"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      )}

                      {childrenData[index]?.canadianResident === 'no' && (
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            City of residence:
                          </label>
                          <input
                            type="text"
                            value={childrenData[index]?.cityOfResidence || ''}
                            onChange={(e) => handleChildChange(index, 'cityOfResidence', e.target.value)}
                            placeholder="Enter city of residence"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Do they have a spouse or common law partner?
                        </label>
                        <div className="flex gap-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`hasSpouse-${index}`}
                              value="yes"
                              checked={childrenData[index]?.hasSpouse === 'yes'}
                              onChange={(e) => handleChildChange(index, 'hasSpouse', e.target.value)}
                              className="mr-2"
                            />
                            <span className="text-gray-300">Yes</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`hasSpouse-${index}`}
                              value="no"
                              checked={childrenData[index]?.hasSpouse === 'no'}
                              onChange={(e) => handleChildChange(index, 'hasSpouse', e.target.value)}
                              className="mr-2"
                            />
                            <span className="text-gray-300">No</span>
                          </label>
                        </div>
                      </div>

                      {childrenData[index]?.hasSpouse === 'yes' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Enter the spouse or common law partner's name:
                          </label>
                          <input
                            type="text"
                            value={childrenData[index]?.spouseName || ''}
                            onChange={(e) => handleChildChange(index, 'spouseName', e.target.value)}
                            placeholder="Enter spouse/partner's name"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Does {childrenData[index]?.name || 'this child'} have any children?
                        </label>
                        <div className="flex gap-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`hasChildren-${index}`}
                              value="yes"
                              checked={childrenData[index]?.hasChildren === 'yes'}
                              onChange={(e) => handleChildChange(index, 'hasChildren', e.target.value)}
                              className="mr-2"
                            />
                            <span className="text-gray-300">Yes</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`hasChildren-${index}`}
                              value="no"
                              checked={childrenData[index]?.hasChildren === 'no'}
                              onChange={(e) => {
                                handleChildChange(index, 'hasChildren', e.target.value);
                                const count = parseInt(childrenData[index]?.numberOfGrandchildren || '0');
                                handleChildChange(index, 'numberOfGrandchildren', '');
                                for (let i = 1; i <= Math.max(count, 20); i++) {
                                  handleChildChange(index, `grandchild${i}Name`, '');
                                }
                              }}
                              className="mr-2"
                            />
                            <span className="text-gray-300">No</span>
                          </label>
                        </div>
                      </div>

                      {childrenData[index]?.hasChildren === 'yes' && (
                        <div className="space-y-4 mt-4 p-4 bg-gray-600 rounded">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              How many?
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="20"
                              value={childrenData[index]?.numberOfGrandchildren || ''}
                              onChange={(e) => handleChildChange(index, 'numberOfGrandchildren', e.target.value)}
                              placeholder="Enter number of grandchildren"
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          {childrenData[index]?.numberOfGrandchildren && parseInt(childrenData[index]?.numberOfGrandchildren || '0') > 0 && (
                            <div className="space-y-3">
                              <p className="text-sm font-medium text-gray-300">Grandchildren's Names:</p>
                              {Array.from({ length: Math.min(parseInt(childrenData[index]?.numberOfGrandchildren || '0'), 20) }).map((_, gcIndex) => (
                                <div key={gcIndex} className="space-y-2">
                                  <label className="block text-xs text-gray-400 mb-1">
                                    Grandchild {gcIndex + 1}:
                                  </label>
                                  <input
                                    type="text"
                                    value={childrenData[index]?.[`grandchild${gcIndex + 1}Name`] || ''}
                                    onChange={(e) => handleChildChange(index, `grandchild${gcIndex + 1}Name`, e.target.value)}
                                    placeholder={`Enter grandchild ${gcIndex + 1}'s name`}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                  <label className="block text-xs text-gray-400 mb-1">
                                    {childrenData[index]?.[`grandchild${gcIndex + 1}Name`]
                                      ? `${childrenData[index][`grandchild${gcIndex + 1}Name`]}'s other parent's name:`
                                      : `Grandchild ${gcIndex + 1}'s other parent's name:`}
                                  </label>
                                  <input
                                    type="text"
                                    value={childrenData[index]?.[`grandchild${gcIndex + 1}OtherParent`] || ''}
                                    onChange={(e) => handleChildChange(index, `grandchild${gcIndex + 1}OtherParent`, e.target.value)}
                                    placeholder="Enter other parent's name"
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Does {childrenData[index]?.nickname || childrenData[index]?.name || 'this child'} have a disability, medical condition, or support need that may affect their long-term care or independence?
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`disabled-${index}`}
                            value="yes"
                            checked={childrenData[index]?.disabled === 'yes'}
                            onChange={(e) => handleChildChange(index, 'disabled', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-gray-300">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`disabled-${index}`}
                            value="no"
                            checked={childrenData[index]?.disabled === 'no'}
                            onChange={(e) => handleChildChange(index, 'disabled', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-gray-300">No</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`disabled-${index}`}
                            value="not_sure"
                            checked={childrenData[index]?.disabled === 'not_sure'}
                            onChange={(e) => handleChildChange(index, 'disabled', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-gray-300">We're not sure yet</span>
                        </label>
                      </div>
                    </div>

                    {childrenData[index]?.disabled === 'not_sure' && (
                      <>
                        <div className="mt-6 pb-2 border-b border-gray-500 mb-2">
                          <h4 className="text-base font-semibold text-blue-400">Potential Future Support &amp; Independence</h4>
                        </div>
                        <p className="text-sm text-gray-300 italic mb-4">
                          That's completely okay. Many parents don't yet know what level of independence their child will have as an adult. The next few questions simply help us identify whether additional planning may be helpful in the future.
                        </p>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">
                            What best describes your situation today?
                          </label>
                          <div className="flex flex-col gap-2">
                            {[
                              { value: 'expect_independent', label: "We expect they'll become fully independent." },
                              { value: 'some_support', label: "We think they'll need some extra support as they get older." },
                              { value: 'professionals_unsure', label: "Doctors or professionals aren't sure yet." },
                              { value: 'too_young', label: "They're still too young to know." },
                              { value: 'not_sure', label: "We're not sure." },
                            ].map(({ value, label }) => (
                              <label key={value} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name={`notSureSituation-${index}`}
                                  value={value}
                                  checked={childrenData[index]?.notSureSituation === value}
                                  onChange={(e) => handleChildChange(index, 'notSureSituation', e.target.value)}
                                  className="mr-1"
                                />
                                <span className="text-gray-300 text-sm">{label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">
                            Are there any areas where they currently rely on adults more than most children their age? (Select all that apply)
                          </label>
                          <div className="flex flex-col gap-2">
                            {[
                              { value: 'communication', label: 'Communication' },
                              { value: 'learning', label: 'Learning' },
                              { value: 'money', label: 'Money' },
                              { value: 'safety_awareness', label: 'Safety awareness' },
                              { value: 'medical_care', label: 'Medical care' },
                              { value: 'personal_care', label: 'Personal care' },
                              { value: 'mobility', label: 'Mobility' },
                              { value: 'behaviour', label: 'Behaviour or emotional regulation' },
                              { value: 'none', label: 'None of these' },
                              { value: 'not_sure_reliance', label: "We're not sure" },
                            ].map(({ value, label }) => {
                              const current = (childrenData[index]?.notSureRelianceAreas || '').split(',').filter(Boolean);
                              const checked = current.includes(value);
                              return (
                                <label key={value} className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => {
                                      const next = checked ? current.filter(v => v !== value) : [...current, value];
                                      handleChildChange(index, 'notSureRelianceAreas', next.join(','));
                                    }}
                                    className="w-4 h-4 rounded border-gray-500 bg-gray-600 text-blue-500 focus:ring-blue-500"
                                  />
                                  <span className="text-gray-300 text-sm">{label}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">
                            Thinking 10 years from now, which statement feels closest to what you expect?
                          </label>
                          <div className="flex flex-col gap-2">
                            {[
                              { value: 'fully_independent', label: "They'll likely live completely independently." },
                              { value: 'occasional_support', label: "They'll probably need occasional support." },
                              { value: 'always_support', label: "They'll probably always have someone helping them make important decisions." },
                              { value: 'dont_know', label: "We honestly don't know yet." },
                            ].map(({ value, label }) => (
                              <label key={value} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name={`notSureFuture-${index}`}
                                  value={value}
                                  checked={childrenData[index]?.notSureFuture === value}
                                  onChange={(e) => handleChildChange(index, 'notSureFuture', e.target.value)}
                                  className="mr-1"
                                />
                                <span className="text-gray-300 text-sm">{label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {childrenData[index]?.disabled === 'yes' && (
                      <>
                        <div className="mt-6 pb-2 border-b border-gray-500 mb-2">
                          <h4 className="text-base font-semibold text-blue-400">Future Support &amp; Independence</h4>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">
                            What best describes the support need? (Select all that apply)
                          </label>
                          <div className="flex flex-col gap-2">
                            {[
                              { value: 'cognitive_developmental', label: 'Cognitive or developmental disability' },
                              { value: 'physical', label: 'Physical disability' },
                              { value: 'medical_condition', label: 'Medical condition' },
                              { value: 'mental_health', label: 'Mental health condition' },
                              { value: 'learning', label: 'Learning disability' },
                              { value: 'complex_care', label: 'Complex care needs' },
                              { value: 'prefer_no_label', label: 'Prefer not to label it - but planning support is needed' },
                            ].map(({ value, label }) => {
                              const current = (childrenData[index]?.supportNeedTypes || '').split(',').filter(Boolean);
                              const checked = current.includes(value);
                              return (
                                <label key={value} className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => {
                                      const next = checked ? current.filter(v => v !== value) : [...current, value];
                                      handleChildChange(index, 'supportNeedTypes', next.join(','));
                                    }}
                                    className="w-4 h-4 rounded border-gray-500 bg-gray-600 text-blue-500 focus:ring-blue-500"
                                  />
                                  <span className="text-gray-300 text-sm">{label}</span>
                                </label>
                              );
                            })}
                            <div className="mt-1">
                              <label className="flex items-start gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={(childrenData[index]?.supportNeedTypes || '').split(',').includes('other')}
                                  onChange={() => {
                                    const current = (childrenData[index]?.supportNeedTypes || '').split(',').filter(Boolean);
                                    const checked = current.includes('other');
                                    const next = checked ? current.filter(v => v !== 'other') : [...current, 'other'];
                                    handleChildChange(index, 'supportNeedTypes', next.join(','));
                                    if (checked) handleChildChange(index, 'supportNeedOther', '');
                                  }}
                                  className="w-4 h-4 mt-0.5 rounded border-gray-500 bg-gray-600 text-blue-500 focus:ring-blue-500"
                                />
                                <span className="text-gray-300 text-sm">Other</span>
                              </label>
                              {(childrenData[index]?.supportNeedTypes || '').split(',').includes('other') && (
                                <input
                                  type="text"
                                  value={childrenData[index]?.supportNeedOther || ''}
                                  onChange={(e) => handleChildChange(index, 'supportNeedOther', e.target.value)}
                                  placeholder="Please describe the situation"
                                  className="mt-2 ml-6 w-full max-w-md px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                />
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Do they qualify for the Disability Tax Credit (DTC)?
                          </label>
                        <div className="flex flex-col gap-2">
                          {[
                            { value: 'yes', label: 'Yes' },
                            { value: 'no', label: 'No' },
                            { value: 'in-progress', label: 'Application is in progress' },
                            { value: 'denied', label: 'Previously denied' },
                            { value: 'not-looked', label: "I/we haven't looked into this" },
                          ].map(({ value, label }) => (
                            <label key={value} className="flex items-center">
                              <input
                                type="radio"
                                name={`disabilityTaxCredit-${index}`}
                                value={value}
                                checked={childrenData[index]?.disabilityTaxCredit === value}
                                onChange={(e) => handleChildChange(index, 'disabilityTaxCredit', e.target.value)}
                                className="mr-2"
                              />
                              <span className="text-gray-300">{label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {childrenData[index]?.disabilityTaxCredit === 'yes' && (
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Location of supporting documentation (T2201 Disability Tax Credit Certificate)
                          </label>
                          <input
                            type="text"
                            value={childrenData[index]?.disabilityTaxCreditDocLocation || ''}
                            onChange={(e) => handleChildChange(index, 'disabilityTaxCreditDocLocation', e.target.value)}
                            placeholder="Enter document location"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      )}

                      {childrenData[index]?.disabilityTaxCredit === 'in-progress' && (
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            If/when the CRA approval is complete, you will be given a T2001 Disability Tax Credit Certificate, where will this document be stored?
                          </label>
                          <input
                            type="text"
                            value={childrenData[index]?.disabilityTaxCreditDocLocation || ''}
                            onChange={(e) => handleChildChange(index, 'disabilityTaxCreditDocLocation', e.target.value)}
                            placeholder="Enter planned document location"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      )}

                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Who helps coordinate their care today? (Select all that apply)
                        </label>
                        <div className="flex flex-col gap-2">
                          {(() => {
                            const pg1Name = (allAnswers?.get(1)?.['fullName'] as string) || 'Parent / guardian 1';
                            const pg2Name = (allAnswers?.get(1)?.['spouseName'] as string) || 'Parent / guardian 2';
                            const hasSpouse = (allAnswers?.get(1)?.['maritalStatus'] === 'married' || allAnswers?.get(1)?.['maritalStatus'] === 'common_law');
                            const coordOpts: { value: string; label: string }[] = [
                              { value: 'parent1', label: pg1Name },
                              ...(hasSpouse ? [{ value: 'parent2', label: pg2Name }] : []),
                              { value: 'sibling', label: 'Sibling' },
                              { value: 'family', label: 'Other family' },
                              { value: 'school', label: 'School team' },
                              { value: 'doctor', label: 'Doctor / therapist / support worker' },
                              { value: 'other', label: 'Other' },
                            ];
                            const current = (childrenData[index]?.careCoordinators || '').split(',').filter(Boolean);
                            return coordOpts.map(({ value, label }) => {
                              const checked = current.includes(value);
                              return (
                                <label key={value} className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => {
                                      const next = checked ? current.filter(v => v !== value) : [...current, value];
                                      handleChildChange(index, 'careCoordinators', next.join(','));
                                    }}
                                    className="w-4 h-4 rounded border-gray-500 bg-gray-600 text-blue-500 focus:ring-blue-500"
                                  />
                                  <span className="text-gray-300 text-sm">{label}</span>
                                </label>
                              );
                            });
                          })()}
                        </div>
                      </div>

                      {childrenData[index]?.careCoordinators?.split(',').includes('sibling') && (
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Sibling name(s)
                          </label>
                          <input
                            type="text"
                            value={childrenData[index]?.careCoordSiblingNames || ''}
                            onChange={(e) => handleChildChange(index, 'careCoordSiblingNames', e.target.value)}
                            placeholder="Enter sibling name(s)"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      )}

                      {(['family', 'school', 'doctor', 'other'] as const).map(cat => {
                        const catSelected = childrenData[index]?.careCoordinators?.split(',').includes(cat);
                        if (!catSelected) return null;
                        const catLabels: Record<string, string> = {
                          family: 'Other family member',
                          school: 'School team member',
                          doctor: 'Doctor / therapist / support worker',
                          other: 'Other contact',
                        };
                        const catLabel = catLabels[cat];
                        const countField = `careCoord_${cat}_count`;
                        const additionalField = `careCoord_${cat}_additional`;
                        const count = parseInt(childrenData[index]?.[countField] || '1');
                        const showRole = cat !== 'family';
                        return (
                          <div key={cat} className="mt-4 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                            <p className="text-sm font-medium text-blue-400 mb-3">{catLabel}(s)</p>
                            {Array.from({ length: count }).map((_, ci) => (
                              <div key={ci} className={ci > 0 ? 'mt-4 pt-4 border-t border-gray-600' : ''}>
                                <div className="flex items-center justify-between mb-2">
                                  <p className="text-xs text-gray-400">{catLabel} {ci + 1}</p>
                                  {ci > 0 && (
                                    <button type="button" onClick={() => handleRemoveCareCoordEntry(index, cat, ci)} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
                                      <X size={14} /> Remove
                                    </button>
                                  )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <input type="text" value={childrenData[index]?.[`careCoord_${cat}_${ci}_name`] || ''} onChange={(e) => handleChildChange(index, `careCoord_${cat}_${ci}_name`, e.target.value)} placeholder="Name" className="px-3 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
                                  <input type="tel" value={childrenData[index]?.[`careCoord_${cat}_${ci}_phone`] || ''} onChange={(e) => handleChildChange(index, `careCoord_${cat}_${ci}_phone`, e.target.value)} placeholder="Phone" className="px-3 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
                                  <input type="email" value={childrenData[index]?.[`careCoord_${cat}_${ci}_email`] || ''} onChange={(e) => handleChildChange(index, `careCoord_${cat}_${ci}_email`, e.target.value)} placeholder="Email" className="px-3 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
                                  <input type="text" value={childrenData[index]?.[`careCoord_${cat}_${ci}_city`] || ''} onChange={(e) => handleChildChange(index, `careCoord_${cat}_${ci}_city`, e.target.value)} placeholder="City" className="px-3 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
                                  <select value={childrenData[index]?.[`careCoord_${cat}_${ci}_province`] || ''} onChange={(e) => handleChildChange(index, `careCoord_${cat}_${ci}_province`, e.target.value)} className="px-3 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 text-sm">
                                    <option value="">Province</option>
                                    <option value="AB">Alberta</option>
                                    <option value="BC">British Columbia</option>
                                    <option value="MB">Manitoba</option>
                                    <option value="NB">New Brunswick</option>
                                    <option value="NL">Newfoundland and Labrador</option>
                                    <option value="NS">Nova Scotia</option>
                                    <option value="NT">Northwest Territories</option>
                                    <option value="NU">Nunavut</option>
                                    <option value="ON">Ontario</option>
                                    <option value="PE">Prince Edward Island</option>
                                    <option value="QC">Quebec</option>
                                    <option value="SK">Saskatchewan</option>
                                    <option value="YT">Yukon</option>
                                  </select>
                                  {showRole && <input type="text" value={childrenData[index]?.[`careCoord_${cat}_${ci}_role`] || ''} onChange={(e) => handleChildChange(index, `careCoord_${cat}_${ci}_role`, e.target.value)} placeholder="Role in support" className="px-3 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm md:col-span-2" />}
                                </div>
                              </div>
                            ))}
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                {`Are there additional ${catLabel.toLowerCase()}s to add?`}
                              </label>
                              <div className="flex gap-4">
                                <label className="flex items-center">
                                  <input type="radio" name={`${countField}-additional-${index}`} value="yes" checked={childrenData[index]?.[additionalField] === 'yes'} onChange={() => { handleChildChange(index, countField, String(count + 1)); handleChildChange(index, additionalField, 'yes'); }} className="mr-2" />
                                  <span className="text-gray-300">Yes</span>
                                </label>
                                <label className="flex items-center">
                                  <input type="radio" name={`${countField}-additional-${index}`} value="no" checked={childrenData[index]?.[additionalField] === 'no'} onChange={() => handleChildChange(index, additionalField, 'no')} className="mr-2" />
                                  <span className="text-gray-300">No</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    </>
                    )}

                    <div className="mt-6 pb-2 border-b border-gray-500 mb-2">
                      <h4 className="text-base font-semibold text-blue-400">Looking Ahead to Adulthood</h4>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        As they get older, what level of independence do you expect?
                      </label>
                      <div className="flex flex-col gap-2">
                        {[
                          { value: 'likely_independent', label: 'Likely independent as an adult' },
                          { value: 'mostly_independent', label: 'Mostly independent, with some support' },
                          { value: 'support_money', label: 'Will likely need ongoing support with money decisions' },
                          { value: 'support_health', label: 'Will likely need ongoing support with health or personal care decisions' },
                          { value: 'significant_lifelong', label: 'Will likely need significant lifelong support' },
                          { value: 'too_early', label: 'Too early to know' },
                        ].map(({ value, label }) => (
                          <label key={value} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`futureIndependence-${index}`}
                              value={value}
                              checked={childrenData[index]?.futureIndependenceLevel === value}
                              onChange={(e) => handleChildChange(index, 'futureIndependenceLevel', e.target.value)}
                              className="mr-1"
                            />
                            <span className="text-gray-300 text-sm">{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {(() => {
                      const lvl = childrenData[index]?.futureIndependenceLevel;
                      return lvl && lvl !== 'likely_independent' && lvl !== 'too_early';
                    })() && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">
                            Do you expect they may need help with financial decisions as an adult?
                          </label>
                          <div className="flex gap-4">
                            {[
                              { value: 'yes', label: 'Yes' },
                              { value: 'no', label: 'No' },
                              { value: 'unsure', label: 'Unsure' },
                            ].map(({ value, label }) => (
                              <label key={value} className="flex items-center cursor-pointer">
                                <input
                                  type="radio"
                                  name={`futureFinancialHelp-${index}`}
                                  value={value}
                                  checked={childrenData[index]?.futureFinancialHelp === value}
                                  onChange={(e) => handleChildChange(index, 'futureFinancialHelp', e.target.value)}
                                  className="mr-2"
                                />
                                <span className="text-gray-300 text-sm">{label}</span>
                              </label>
                            ))}
                          </div>
                          <p className="text-xs text-gray-400 italic mt-2">
                            Examples: Managing bank accounts, government benefits, RDSP, rent, bills, investments, signing documents.
                          </p>
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-300 mb-3">
                            Do you expect they may need help with personal or healthcare decisions as an adult?
                          </label>
                          <div className="flex gap-4">
                            {[
                              { value: 'yes', label: 'Yes' },
                              { value: 'no', label: 'No' },
                              { value: 'unsure', label: 'Unsure' },
                            ].map(({ value, label }) => (
                              <label key={value} className="flex items-center cursor-pointer">
                                <input
                                  type="radio"
                                  name={`futurePersonalHealthHelp-${index}`}
                                  value={value}
                                  checked={childrenData[index]?.futurePersonalHealthHelp === value}
                                  onChange={(e) => handleChildChange(index, 'futurePersonalHealthHelp', e.target.value)}
                                  className="mr-2"
                                />
                                <span className="text-gray-300 text-sm">{label}</span>
                              </label>
                            ))}
                          </div>
                          <p className="text-xs text-gray-400 italic mt-2">
                            Examples: Medical consent, housing, daily care, safety, services, appointments.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="mt-6 pb-2 border-b border-gray-500 mb-2">
                      <h4 className="text-base font-semibold text-blue-400">Future Care Team</h4>
                    </div>

                    {(() => {
                      const childDisplayName = childrenData[index]?.nickname || childrenData[index]?.name || 'this child';
                      const prefilled = buildPrefilledContacts(index);
                      const selected = (childrenData[index]?.futureCareTeamSelection || '').split(',').filter(Boolean);
                      const otherCount = parseInt(childrenData[index]?.futureCareTeamOtherCount || '0');
                      const otherSelected = selected.includes('other');
                      const extraSelected = childrenData[index]?.futureCareTeamExtra === 'yes';
                      const extraCount = parseInt(childrenData[index]?.futureCareTeamExtraCount || '0');

                      const toggleSelect = (id: string) => {
                        const next = selected.includes(id) ? selected.filter(v => v !== id) : [...selected, id];
                        handleChildChange(index, 'futureCareTeamSelection', next.join(','));
                      };

                      const sourceLabels: Record<string, string> = {
                        parent1: 'Parent / Guardian 1',
                        parent2: 'Parent / Guardian 2',
                        sibling: 'Sibling',
                        family: 'Other Family',
                        school: 'School Team',
                        doctor: 'Doctor / Therapist / Support Worker',
                        other: 'Other',
                      };

                      const renderContactFields = (fieldPrefix: string, ci: number, defaults?: { name?: string; phone?: string; email?: string; city?: string; province?: string }) => (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input type="text" value={childrenData[index]?.[`${fieldPrefix}_name`] ?? defaults?.name ?? ''} onChange={(e) => handleChildChange(index, `${fieldPrefix}_name`, e.target.value)} placeholder="Name" className="px-3 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
                          <input type="tel" value={childrenData[index]?.[`${fieldPrefix}_phone`] ?? defaults?.phone ?? ''} onChange={(e) => handleChildChange(index, `${fieldPrefix}_phone`, e.target.value)} placeholder="Phone" className="px-3 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
                          <input type="email" value={childrenData[index]?.[`${fieldPrefix}_email`] ?? defaults?.email ?? ''} onChange={(e) => handleChildChange(index, `${fieldPrefix}_email`, e.target.value)} placeholder="Email" className="px-3 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
                          <input type="text" value={childrenData[index]?.[`${fieldPrefix}_city`] ?? defaults?.city ?? ''} onChange={(e) => handleChildChange(index, `${fieldPrefix}_city`, e.target.value)} placeholder="City" className="px-3 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
                          <select value={childrenData[index]?.[`${fieldPrefix}_province`] ?? defaults?.province ?? ''} onChange={(e) => handleChildChange(index, `${fieldPrefix}_province`, e.target.value)} className="px-3 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 text-sm">
                            <option value="">Province</option>
                            <option value="AB">Alberta</option>
                            <option value="BC">British Columbia</option>
                            <option value="MB">Manitoba</option>
                            <option value="NB">New Brunswick</option>
                            <option value="NL">Newfoundland and Labrador</option>
                            <option value="NS">Nova Scotia</option>
                            <option value="NT">Northwest Territories</option>
                            <option value="NU">Nunavut</option>
                            <option value="ON">Ontario</option>
                            <option value="PE">Prince Edward Island</option>
                            <option value="QC">Quebec</option>
                            <option value="SK">Saskatchewan</option>
                            <option value="YT">Yukon</option>
                          </select>
                          <input type="text" value={childrenData[index]?.[`${fieldPrefix}_relationship`] ?? ''} onChange={(e) => handleChildChange(index, `${fieldPrefix}_relationship`, e.target.value)} placeholder={`Relationship to ${childDisplayName}`} className="px-3 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm md:col-span-2" />
                        </div>
                      );

                      const renderSpokenQuestion = (fieldPrefix: string) => (
                        <div className="mt-3">
                          <label className="block text-sm font-medium text-gray-300 mb-2">Have you spoken with this person about the role?</label>
                          <div className="flex gap-4">
                            {[
                              { value: 'yes', label: 'Yes' },
                              { value: 'no', label: 'No' },
                              { value: 'partly', label: 'Partly' },
                            ].map(({ value, label }) => (
                              <label key={value} className="flex items-center cursor-pointer">
                                <input type="radio" name={`${fieldPrefix}-spoken`} value={value} checked={childrenData[index]?.[`${fieldPrefix}_spoken`] === value} onChange={(e) => handleChildChange(index, `${fieldPrefix}_spoken`, e.target.value)} className="mr-2" />
                                <span className="text-gray-300 text-sm">{label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      );

                      return (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                              If you were no longer able to provide care, who would you hope steps in first? (Select all that apply)
                            </label>
                            <div className="flex flex-col gap-2">
                              {prefilled.map(c => {
                                const isSelected = selected.includes(c.id);
                                return (
                                  <label key={c.id} className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(c.id)} className="w-4 h-4 rounded border-gray-500 bg-gray-600 text-blue-500 focus:ring-blue-500" />
                                    <span className="text-gray-300 text-sm">{c.name || sourceLabels[c.source] || c.id}</span>
                                    {c.name && <span className="text-xs text-gray-500">({sourceLabels[c.source]})</span>}
                                  </label>
                                );
                              })}
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={otherSelected} onChange={() => { toggleSelect('other'); if (!otherSelected && otherCount === 0) { handleChildChange(index, 'futureCareTeamOtherCount', '1'); } }} className="w-4 h-4 rounded border-gray-500 bg-gray-600 text-blue-500 focus:ring-blue-500" />
                                <span className="text-gray-300 text-sm">Other (new person not previously identified)</span>
                              </label>
                            </div>
                          </div>

                          {prefilled.filter(c => selected.includes(c.id)).map((c, pi) => {
                            const fieldPrefix = `futureCareTeam_${pi}`;
                            return (
                              <div key={c.id} className="mt-4 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                                <p className="text-sm font-medium text-blue-400 mb-3">{c.name || sourceLabels[c.source]}</p>
                                {renderContactFields(fieldPrefix, pi, { name: c.name, phone: c.phone, email: c.email, city: c.city, province: c.province })}
                                {renderSpokenQuestion(fieldPrefix)}
                              </div>
                            );
                          })}

                          {otherSelected && Array.from({ length: otherCount }).map((_, oi) => {
                            const fieldPrefix = `futureCareTeamOther_${oi}`;
                            return (
                              <div key={`other-${oi}`} className="mt-4 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                                <div className="flex items-center justify-between mb-3">
                                  <p className="text-sm font-medium text-blue-400">Other Contact {oi + 1}</p>
                                  {oi > 0 && (
                                    <button type="button" onClick={() => handleRemoveFutureCareTeamOther(index, oi)} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
                                      <X size={14} /> Remove
                                    </button>
                                  )}
                                </div>
                                {renderContactFields(fieldPrefix, oi)}
                                {renderSpokenQuestion(fieldPrefix)}
                              </div>
                            );
                          })}

                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Are there additional people you would hope would step in to provide care for {childDisplayName}?</label>
                            <div className="flex gap-4">
                              <label className="flex items-center">
                                <input type="radio" name={`futureCareTeamExtra-${index}`} value="yes" checked={extraSelected} onChange={() => { if (extraCount === 0) handleChildChange(index, 'futureCareTeamExtraCount', '1'); handleChildChange(index, 'futureCareTeamExtra', 'yes'); }} className="mr-2" />
                                <span className="text-gray-300">Yes</span>
                              </label>
                              <label className="flex items-center">
                                <input type="radio" name={`futureCareTeamExtra-${index}`} value="no" checked={childrenData[index]?.futureCareTeamExtra === 'no'} onChange={() => { const obj = { ...childrenData[index] }; const cur = parseInt(obj.futureCareTeamExtraCount || '0'); const fields = ['name', 'phone', 'email', 'city', 'province', 'relationship', 'spoken']; for (let i = 0; i < cur; i++) { fields.forEach(f => delete obj[`futureCareTeamExtra_${i}_${f}`]); } delete obj.futureCareTeamExtraCount; delete obj.futureCareTeamExtraAdditional; obj.futureCareTeamExtra = 'no'; const updated = [...childrenData]; updated[index] = obj; onAnswerChange('childrenData', updated); }} className="mr-2" />
                                <span className="text-gray-300">No</span>
                              </label>
                            </div>
                          </div>

                          {extraSelected && Array.from({ length: extraCount }).map((_, ei) => {
                            const fieldPrefix = `futureCareTeamExtra_${ei}`;
                            return (
                              <div key={`extra-${ei}`} className="mt-4 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                                <div className="flex items-center justify-between mb-3">
                                  <p className="text-sm font-medium text-blue-400">Additional Person {ei + 1}</p>
                                  {ei > 0 && (
                                    <button type="button" onClick={() => handleRemoveFutureCareTeamExtra(index, ei)} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
                                      <X size={14} /> Remove
                                    </button>
                                  )}
                                </div>
                                {renderContactFields(fieldPrefix, ei)}
                                {renderSpokenQuestion(fieldPrefix)}
                              </div>
                            );
                          })}

                          {extraSelected && (
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-300 mb-2">Are there more additional people to add?</label>
                              <div className="flex gap-4">
                                <label className="flex items-center">
                                  <input type="radio" name={`futureCareTeamExtra-additional-${index}`} value="yes" checked={childrenData[index]?.futureCareTeamExtraAdditional === 'yes'} onChange={() => { handleChildChange(index, 'futureCareTeamExtraCount', String(extraCount + 1)); handleChildChange(index, 'futureCareTeamExtraAdditional', 'yes'); }} className="mr-2" />
                                  <span className="text-gray-300">Yes</span>
                                </label>
                                <label className="flex items-center">
                                  <input type="radio" name={`futureCareTeamExtra-additional-${index}`} value="no" checked={childrenData[index]?.futureCareTeamExtraAdditional === 'no'} onChange={() => { handleChildChange(index, 'futureCareTeamExtraAdditional', 'no'); const cur = parseInt(childrenData[index]?.futureCareTeamExtraCount || '0'); if (cur > 1) { const obj = { ...childrenData[index] }; const fields = ['name', 'phone', 'email', 'city', 'province', 'relationship', 'spoken']; for (let i = 1; i < cur; i++) { fields.forEach(f => delete obj[`futureCareTeamExtra_${i}_${f}`]); } obj.futureCareTeamExtraCount = '1'; const updated = [...childrenData]; updated[index] = obj; onAnswerChange('childrenData', updated); } }} className="mr-2" />
                                  <span className="text-gray-300">No</span>
                                </label>
                              </div>
                            </div>
                          )}

                          {(selected.length > 0 || otherCount > 0 || extraCount > 0) && (
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-300 mb-2">What would you want them to understand about this responsibility?</label>
                              <textarea value={childrenData[index]?.futureCareTeamResponsibility || ''} onChange={(e) => handleChildChange(index, 'futureCareTeamResponsibility', e.target.value)} placeholder="Enter your response" rows={4} className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                            </div>
                          )}

                          {/* Future Care Plan */}
                          <div className="mt-6 pb-2 border-b border-gray-500 mb-2">
                            <h4 className="text-base font-semibold text-blue-400">Future Care Plan</h4>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Have you written down a future care plan yet?</label>
                            <div className="flex flex-col gap-2">
                              {['yes', 'no', 'talked', 'need-help'].map((opt) => (
                                <label key={opt} className="flex items-center">
                                  <input type="radio" name={`carePlanWritten-${index}`} value={opt} checked={childrenData[index]?.carePlanWritten === opt} onChange={(e) => {
                                    const val = e.target.value;
                                    const obj: Record<string, string> = { carePlanWritten: val };
                                    if (val !== 'yes') { obj.carePlanStored = ''; obj.carePlanWorries = ''; obj.carePlanWorriesOther = ''; }
                                    handleChildMultiChange(index, obj);
                                  }} className="mr-2" />
                                  <span className="text-gray-300">{opt === 'yes' ? 'Yes' : opt === 'no' ? 'No' : opt === 'talked' ? "We've talked about it, but nothing is written" : 'We need help starting'}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {childrenData[index]?.carePlanWritten === 'yes' && (
                            <>
                              <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Where is the plan stored?</label>
                                <input type="text" value={childrenData[index]?.carePlanStored || ''} onChange={(e) => handleChildChange(index, 'carePlanStored', e.target.value)} placeholder="Enter your response" className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                              </div>
                              <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-300 mb-2">What worries you most about the future plan?</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {['Who would provide care', 'Where they would live', 'Money / funding', 'Government benefits', 'Sibling responsibilities', 'Medical care', 'School-to-adult transition', 'Other'].map((opt) => {
                                    const current = (childrenData[index]?.carePlanWorries || '').split(',').filter(Boolean);
                                    const isChecked = current.includes(opt);
                                    return (
                                      <label key={opt} className="flex items-center">
                                        <input type="checkbox" checked={isChecked} onChange={() => {
                                          const next = isChecked ? current.filter(v => v !== opt) : [...current, opt];
                                          handleChildChange(index, 'carePlanWorries', next.join(','));
                                          if (!isChecked && opt === 'Other') {} else if (isChecked && opt === 'Other') { handleChildChange(index, 'carePlanWorriesOther', ''); }
                                        }} className="w-4 h-4 rounded border-gray-500 bg-gray-600 text-blue-500 focus:ring-blue-500 mr-2" />
                                        <span className="text-gray-300">{opt}</span>
                                      </label>
                                    );
                                  })}
                                </div>
                                {(childrenData[index]?.carePlanWorries || '').split(',').includes('Other') && (
                                  <input type="text" value={childrenData[index]?.carePlanWorriesOther || ''} onChange={(e) => handleChildChange(index, 'carePlanWorriesOther', e.target.value)} placeholder="Please specify" className="mt-2 w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                )}
                              </div>
                            </>
                          )}

                          {/* Disability supports */}
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Are any benefits, funding, housing supports, or services connected to their disability or care needs?</label>
                            <div className="flex flex-col gap-2">
                              {['yes', 'no', 'not-sure'].map((opt) => (
                                <label key={opt} className="flex items-center">
                                  <input type="radio" name={`disabilitySupports-${index}`} value={opt} checked={childrenData[index]?.disabilitySupports === opt} onChange={(e) => {
                                    const val = e.target.value;
                                    const obj: Record<string, string> = { disabilitySupports: val };
                                    if (val !== 'yes') { obj.disabilitySupportsList = ''; obj.disabilitySupportsOther = ''; }
                                    handleChildMultiChange(index, obj);
                                  }} className="mr-2" />
                                  <span className="text-gray-300">{opt === 'yes' ? 'Yes' : opt === 'no' ? 'No' : 'Not sure'}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {childrenData[index]?.disabilitySupports === 'yes' && (
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-300 mb-2">Which ones?</label>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {['DTC', 'RDSP', 'ODSP / provincial disability support', 'Passport funding / respite funding', 'School supports', 'Housing supports', 'Private insurance', 'Other'].map((opt) => {
                                  const current = (childrenData[index]?.disabilitySupportsList || '').split(',').filter(Boolean);
                                  const isChecked = current.includes(opt);
                                  return (
                                    <label key={opt} className="flex items-center">
                                      <input type="checkbox" checked={isChecked} onChange={() => {
                                        const next = isChecked ? current.filter(v => v !== opt) : [...current, opt];
                                        handleChildChange(index, 'disabilitySupportsList', next.join(','));
                                        if (isChecked && opt === 'Other') handleChildChange(index, 'disabilitySupportsOther', '');
                                      }} className="w-4 h-4 rounded border-gray-500 bg-gray-600 text-blue-500 focus:ring-blue-500 mr-2" />
                                      <span className="text-gray-300">{opt}</span>
                                    </label>
                                  );
                                })}
                              </div>
                              {(childrenData[index]?.disabilitySupportsList || '').split(',').includes('Other') && (
                                <input type="text" value={childrenData[index]?.disabilitySupportsOther || ''} onChange={(e) => handleChildChange(index, 'disabilitySupportsOther', e.target.value)} placeholder="Please specify" className="mt-2 w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                              )}
                            </div>
                          )}

                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Does any support depend on where they live or who provides care?</label>
                            <div className="flex flex-col gap-2">
                              {['yes', 'no', 'not-sure'].map((opt) => (
                                <label key={opt} className="flex items-center">
                                  <input type="radio" name={`supportLocationDependent-${index}`} value={opt} checked={childrenData[index]?.supportLocationDependent === opt} onChange={(e) => handleChildChange(index, 'supportLocationDependent', e.target.value)} className="mr-2" />
                                  <span className="text-gray-300">{opt === 'yes' ? 'Yes' : opt === 'no' ? 'No' : 'Not sure'}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </>
                      );
                    })()}

                    <div className="mt-6 pb-2 border-b border-gray-500 mb-2">
                      <h4 className="text-base font-semibold text-blue-400">Financial Independence</h4>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Are they financially independent?
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`independent-${index}`}
                            value="yes"
                            checked={childrenData[index]?.independent === 'yes'}
                            onChange={(e) => handleChildChange(index, 'independent', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-gray-300">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`independent-${index}`}
                            value="no"
                            checked={childrenData[index]?.independent === 'no'}
                            onChange={(e) => handleChildChange(index, 'independent', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-gray-300">No</span>
                        </label>
                      </div>
                    </div>

{childrenData[index]?.independent === 'no' && (
                      <>
                        <div className="mt-6 pb-2 border-b border-gray-500 mb-2">
                          <h4 className="text-base font-semibold text-blue-400">Medical &amp; Care</h4>
                        </div>

                        <div className="mt-2 pb-1 border-b border-gray-600 mb-2">
                          <h5 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Medications</h5>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Are they on any long-term medications?
                          </label>
                          <div className="flex gap-4">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name={`medications-${index}`}
                                value="yes"
                                checked={childrenData[index]?.medications === 'yes'}
                                onChange={(e) => handleChildChange(index, 'medications', e.target.value)}
                                className="mr-2"
                              />
                              <span className="text-gray-300">Yes</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name={`medications-${index}`}
                                value="no"
                                checked={childrenData[index]?.medications === 'no'}
                                onChange={(e) => handleChildChange(index, 'medications', e.target.value)}
                                className="mr-2"
                              />
                              <span className="text-gray-300">No</span>
                            </label>
                          </div>
                        </div>

                        {childrenData[index]?.medications === 'yes' && (
                          <>
                            {(() => {
                              type MedEntry = { name: string; treats: string; prescription: string; prescribedBy: string; otherInfo: string; hasAdditional: string };
                              const medicationList = JSON.parse(childrenData[index]?.medicationList || '[]') as MedEntry[];

                              const handleMedicationChange = (medIndex: number, field: keyof MedEntry, value: string) => {
                                const updated = [...medicationList];
                                if (!updated[medIndex]) {
                                  updated[medIndex] = { name: '', treats: '', prescription: '', prescribedBy: '', otherInfo: '', hasAdditional: '' };
                                }
                                if (field === 'prescription' && value === 'no') {
                                  updated[medIndex] = { ...updated[medIndex], prescription: 'no', prescribedBy: '' };
                                } else {
                                  updated[medIndex][field] = value;
                                }
                                handleChildChange(index, 'medicationList', JSON.stringify(updated));
                              };

                              if (medicationList.length === 0) {
                                medicationList.push({ name: '', treats: '', prescription: '', prescribedBy: '', otherInfo: '', hasAdditional: '' });
                              }

                              return medicationList.map((medication, medIndex) => (
                                <div key={medIndex} className="space-y-4 border-l-2 border-blue-500 pl-4">
                                  {medIndex > 0 && (
                                    <div className="text-sm font-medium text-blue-400 -ml-4 pl-4">
                                      Additional Medication #{medIndex + 1}
                                    </div>
                                  )}

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Name of Medication:
                                    </label>
                                    <input
                                      type="text"
                                      value={medication.name || ''}
                                      onChange={(e) => handleMedicationChange(medIndex, 'name', e.target.value)}
                                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      What does it treat?
                                    </label>
                                    <input
                                      type="text"
                                      value={medication.treats || ''}
                                      onChange={(e) => handleMedicationChange(medIndex, 'treats', e.target.value)}
                                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Does it require a prescription?
                                    </label>
                                    <div className="flex gap-4">
                                      <label className="flex items-center">
                                        <input
                                          type="radio"
                                          name={`medPrescription-${index}-${medIndex}`}
                                          value="yes"
                                          checked={medication.prescription === 'yes'}
                                          onChange={(e) => handleMedicationChange(medIndex, 'prescription', e.target.value)}
                                          className="mr-2"
                                        />
                                        <span className="text-gray-300">Yes</span>
                                      </label>
                                      <label className="flex items-center">
                                        <input
                                          type="radio"
                                          name={`medPrescription-${index}-${medIndex}`}
                                          value="no"
                                          checked={medication.prescription === 'no'}
                                          onChange={(e) => handleMedicationChange(medIndex, 'prescription', e.target.value)}
                                          className="mr-2"
                                        />
                                        <span className="text-gray-300">No</span>
                                      </label>
                                    </div>
                                  </div>

                                  {medication.prescription === 'yes' && (
                                    <div>
                                      <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Prescribed by:
                                      </label>
                                      <input
                                        type="text"
                                        value={medication.prescribedBy || ''}
                                        onChange={(e) => handleMedicationChange(medIndex, 'prescribedBy', e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                    </div>
                                  )}

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Other information:
                                    </label>
                                    <input
                                      type="text"
                                      value={medication.otherInfo || ''}
                                      onChange={(e) => handleMedicationChange(medIndex, 'otherInfo', e.target.value)}
                                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Are there any additional long-term medications?
                                    </label>
                                    <div className="flex gap-4">
                                      <label className="flex items-center">
                                        <input
                                          type="radio"
                                          name={`hasAdditionalMedication-${index}-${medIndex}`}
                                          value="yes"
                                          checked={medication.hasAdditional === 'yes'}
                                          onChange={(e) => {
                                            handleMedicationChange(medIndex, 'hasAdditional', e.target.value);
                                            if (e.target.value === 'yes' && medIndex === medicationList.length - 1) {
                                              const updated = [...medicationList, { name: '', treats: '', prescription: '', prescribedBy: '', otherInfo: '', hasAdditional: '' }];
                                              handleChildChange(index, 'medicationList', JSON.stringify(updated));
                                            }
                                          }}
                                          className="mr-2"
                                        />
                                        <span className="text-gray-300">Yes</span>
                                      </label>
                                      <label className="flex items-center">
                                        <input
                                          type="radio"
                                          name={`hasAdditionalMedication-${index}-${medIndex}`}
                                          value="no"
                                          checked={medication.hasAdditional === 'no'}
                                          onChange={(e) => {
                                            const trimmed = medicationList.slice(0, medIndex + 1);
                                            trimmed[medIndex] = { ...trimmed[medIndex], hasAdditional: 'no' };
                                            handleChildChange(index, 'medicationList', JSON.stringify(trimmed));
                                          }}
                                          className="mr-2"
                                        />
                                        <span className="text-gray-300">No</span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              ));
                            })()}
                          </>
                        )}

                        <div className="mt-6 pb-1 border-b border-gray-600 mb-2">
                          <h5 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Allergies</h5>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Do they have any allergies?
                          </label>
                          <div className="flex gap-4">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name={`allergies-${index}`}
                                value="yes"
                                checked={childrenData[index]?.allergies === 'yes'}
                                onChange={(e) => handleChildChange(index, 'allergies', e.target.value)}
                                className="mr-2"
                              />
                              <span className="text-gray-300">Yes</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name={`allergies-${index}`}
                                value="no"
                                checked={childrenData[index]?.allergies === 'no'}
                                onChange={(e) => handleChildChange(index, 'allergies', e.target.value)}
                                className="mr-2"
                              />
                              <span className="text-gray-300">No</span>
                            </label>
                          </div>
                        </div>

                        {childrenData[index]?.allergies === 'yes' && (
                          <>
                            {(() => {
                              type AllergyEntry = { details: string; severity: string; medications: string; epipen: string; requiredFor: string; otherInfo: string; hasAdditional?: string };
                              const allergyList = JSON.parse(childrenData[index]?.allergyList || '[]') as AllergyEntry[];

                              const handleAllergyChange = (allergyIndex: number, field: keyof AllergyEntry, value: string) => {
                                const updated = [...allergyList];
                                if (!updated[allergyIndex]) {
                                  updated[allergyIndex] = { details: '', severity: '', medications: '', epipen: '', requiredFor: '', otherInfo: '', hasAdditional: '' };
                                }
                                updated[allergyIndex][field] = value;
                                handleChildChange(index, 'allergyList', JSON.stringify(updated));
                              };

                              if (allergyList.length === 0) {
                                allergyList.push({ details: '', severity: '', medications: '', epipen: '', requiredFor: '', otherInfo: '', hasAdditional: '' });
                              }

                              return allergyList.map((allergy, allergyIndex) => (
                                <div key={allergyIndex} className="space-y-4 border-l-2 border-blue-500 pl-4">
                                  {allergyIndex > 0 && (
                                    <div className="text-sm font-medium text-blue-400 -ml-4 pl-4">
                                      Additional Allergy #{allergyIndex + 1}
                                    </div>
                                  )}

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      What is {childrenData[index]?.nickname || childrenData[index]?.name || `Child ${index + 1}`} allergic to?
                                    </label>
                                    <input
                                      type="text"
                                      value={allergy.details || ''}
                                      onChange={(e) => handleAllergyChange(allergyIndex, 'details', e.target.value)}
                                      placeholder="List allergy"
                                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      What is the severity?
                                    </label>
                                    <input
                                      type="text"
                                      value={allergy.severity || ''}
                                      onChange={(e) => handleAllergyChange(allergyIndex, 'severity', e.target.value)}
                                      placeholder="e.g., Mild, Moderate, Severe, Life-threatening"
                                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      What medications are used to treat this allergy?
                                    </label>
                                    <input
                                      type="text"
                                      value={allergy.medications || ''}
                                      onChange={(e) => handleAllergyChange(allergyIndex, 'medications', e.target.value)}
                                      placeholder="e.g., Antihistamines, Corticosteroids"
                                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Do they carry an EpiPen?
                                    </label>
                                    <input
                                      type="text"
                                      value={allergy.epipen || ''}
                                      onChange={(e) => handleAllergyChange(allergyIndex, 'epipen', e.target.value)}
                                      placeholder="e.g., Yes, No, Yes - carried at all times"
                                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Where is this allergy plan required? (e.g., School, activities)
                                    </label>
                                    <input
                                      type="text"
                                      value={allergy.requiredFor || ''}
                                      onChange={(e) => handleAllergyChange(allergyIndex, 'requiredFor', e.target.value)}
                                      placeholder="e.g., School, sports, daycare"
                                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Any other information about this allergy?
                                    </label>
                                    <input
                                      type="text"
                                      value={allergy.otherInfo || ''}
                                      onChange={(e) => handleAllergyChange(allergyIndex, 'otherInfo', e.target.value)}
                                      placeholder="Any additional details"
                                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Does {childrenData[index]?.nickname || childrenData[index]?.name || `Child ${index + 1}`} have any additional allergies?
                                    </label>
                                    <div className="flex gap-4">
                                      <label className="flex items-center">
                                        <input
                                          type="radio"
                                          name={`hasAdditionalAllergy-${index}-${allergyIndex}`}
                                          value="yes"
                                          checked={allergy.hasAdditional === 'yes'}
                                          onChange={(e) => {
                                            handleAllergyChange(allergyIndex, 'hasAdditional', e.target.value);
                                            if (allergyIndex === allergyList.length - 1) {
                                              const updated = [...allergyList];
                                              updated.push({ details: '', severity: '', medications: '', epipen: '', requiredFor: '', otherInfo: '', hasAdditional: '' });
                                              handleChildChange(index, 'allergyList', JSON.stringify(updated));
                                            }
                                          }}
                                          className="mr-2"
                                        />
                                        <span className="text-gray-300">Yes</span>
                                      </label>
                                      <label className="flex items-center">
                                        <input
                                          type="radio"
                                          name={`hasAdditionalAllergy-${index}-${allergyIndex}`}
                                          value="no"
                                          checked={allergy.hasAdditional === 'no'}
                                          onChange={(e) => handleAllergyChange(allergyIndex, 'hasAdditional', e.target.value)}
                                          className="mr-2"
                                        />
                                        <span className="text-gray-300">No</span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              ));
                            })()}
                          </>
                        )}

                        <div className="mt-6 pb-1 border-b border-gray-600 mb-2">
                          <h5 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Additional Medical Information</h5>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Are there any additional medical related information that a guardian should be aware of with respect to {childrenData[index]?.nickname || childrenData[index]?.name || `Child ${index + 1}`}?
                          </label>
                          <div className="flex gap-4">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name={`medicalIssues-${index}`}
                                value="yes"
                                checked={childrenData[index]?.medicalIssues === 'yes'}
                                onChange={(e) => handleChildChange(index, 'medicalIssues', e.target.value)}
                                className="mr-2"
                              />
                              <span className="text-gray-300">Yes</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name={`medicalIssues-${index}`}
                                value="no"
                                checked={childrenData[index]?.medicalIssues === 'no'}
                                onChange={(e) => handleChildChange(index, 'medicalIssues', e.target.value)}
                                className="mr-2"
                              />
                              <span className="text-gray-300">No</span>
                            </label>
                          </div>
                        </div>

                        {childrenData[index]?.medicalIssues === 'yes' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Please provide details:
                            </label>
                            <textarea
                              value={childrenData[index]?.medicalIssuesDescription || ''}
                              onChange={(e) => handleChildChange(index, 'medicalIssuesDescription', e.target.value)}
                              placeholder="Describe any additional medical information a guardian should be aware of"
                              rows={4}
                              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                            />
                          </div>
                        )}

                        <div className="mt-6 pb-2 border-b border-gray-500 mb-2">
                          <h4 className="text-base font-semibold text-blue-400">Academic Snapshot</h4>
                        </div>
                        <div className="mt-2">

                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Is {childrenData[index]?.nickname || childrenData[index]?.name || `Child ${index + 1}`} attending school?
                            </label>
                            <div className="flex gap-4">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name={`attendingSchool-${index}`}
                                  value="yes"
                                  checked={childrenData[index]?.attendingSchool === 'yes'}
                                  onChange={(e) => handleChildChange(index, 'attendingSchool', e.target.value)}
                                  className="mr-2"
                                />
                                <span className="text-gray-300">Yes</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name={`attendingSchool-${index}`}
                                  value="no"
                                  checked={childrenData[index]?.attendingSchool === 'no'}
                                  onChange={(e) => handleChildChange(index, 'attendingSchool', e.target.value)}
                                  className="mr-2"
                                />
                                <span className="text-gray-300">No</span>
                              </label>
                            </div>
                          </div>

                          {childrenData[index]?.attendingSchool === 'yes' && (
                            <div className="space-y-4 mb-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  School Name:
                                </label>
                                <input
                                  type="text"
                                  value={childrenData[index]?.schoolName || ''}
                                  onChange={(e) => handleChildChange(index, 'schoolName', e.target.value)}
                                  placeholder="Enter school name"
                                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  School Contact Information:
                                </label>
                                <input
                                  type="text"
                                  value={childrenData[index]?.schoolContact || ''}
                                  onChange={(e) => handleChildChange(index, 'schoolContact', e.target.value)}
                                  placeholder="e.g., phone number, address, website"
                                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  What subjects does {childrenData[index]?.nickname || childrenData[index]?.name || `Child ${index + 1}`} naturally enjoy or succeed in?
                                </label>
                                <textarea
                                  value={childrenData[index]?.schoolStrengths || ''}
                                  onChange={(e) => handleChildChange(index, 'schoolStrengths', e.target.value)}
                                  placeholder="Describe subjects or areas they naturally enjoy or excel at"
                                  rows={3}
                                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Where do they typically need extra support?
                                </label>
                                <textarea
                                  value={childrenData[index]?.schoolExtraSupport || ''}
                                  onChange={(e) => handleChildChange(index, 'schoolExtraSupport', e.target.value)}
                                  placeholder="Describe areas where they typically need extra support"
                                  rows={3}
                                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  What helps {childrenData[index]?.nickname || childrenData[index]?.name || `Child ${index + 1}`} stay focused?
                                </label>
                                <textarea
                                  value={childrenData[index]?.schoolFocusHelps || ''}
                                  onChange={(e) => handleChildChange(index, 'schoolFocusHelps', e.target.value)}
                                  placeholder="Describe what helps them stay focused"
                                  rows={3}
                                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  What tends to distract or overwhelm them?
                                </label>
                                <textarea
                                  value={childrenData[index]?.schoolDistractions || ''}
                                  onChange={(e) => handleChildChange(index, 'schoolDistractions', e.target.value)}
                                  placeholder="Describe what tends to distract or overwhelm them"
                                  rows={3}
                                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Is there an Individual Education Plan (IEP)?
                                </label>
                                <div className="flex gap-4">
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      name={`hasIEP-${index}`}
                                      value="yes"
                                      checked={childrenData[index]?.hasIEP === 'yes'}
                                      onChange={(e) => handleChildChange(index, 'hasIEP', e.target.value)}
                                      className="mr-2"
                                    />
                                    <span className="text-gray-300">Yes</span>
                                  </label>
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      name={`hasIEP-${index}`}
                                      value="no"
                                      checked={childrenData[index]?.hasIEP === 'no'}
                                      onChange={(e) => handleChildChange(index, 'hasIEP', e.target.value)}
                                      className="mr-2"
                                    />
                                    <span className="text-gray-300">No</span>
                                  </label>
                                </div>
                              </div>
                              {childrenData[index]?.hasIEP === 'yes' && (
                                <>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Provide Details:
                                    </label>
                                    <textarea
                                      value={childrenData[index]?.individualEducationPlan || ''}
                                      onChange={(e) => handleChildChange(index, 'individualEducationPlan', e.target.value)}
                                      placeholder="Provide details about the individual education plan"
                                      rows={3}
                                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Location of the IEP document:
                                    </label>
                                    <input
                                      type="text"
                                      value={childrenData[index]?.iepDocumentLocation || ''}
                                      onChange={(e) => handleChildChange(index, 'iepDocumentLocation', e.target.value)}
                                      placeholder="e.g., filing cabinet, school office, digital folder"
                                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                  </div>
                                </>
                              )}
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Which school activities are most important for your child's confidence and social life?
                                </label>
                                <textarea
                                  value={childrenData[index]?.schoolActivitiesImportant || ''}
                                  onChange={(e) => handleChildChange(index, 'schoolActivitiesImportant', e.target.value)}
                                  placeholder="e.g., sports teams, drama, art club, recess friendships"
                                  rows={3}
                                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  What are your homework routines?
                                </label>
                                <textarea
                                  value={childrenData[index]?.homeworkRoutines || ''}
                                  onChange={(e) => handleChildChange(index, 'homeworkRoutines', e.target.value)}
                                  placeholder="e.g., time, location, who helps, any challenges"
                                  rows={3}
                                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  What are your hopes or expectations for your child's education over the next few years?
                                </label>
                                <textarea
                                  value={childrenData[index]?.educationHopes || ''}
                                  onChange={(e) => handleChildChange(index, 'educationHopes', e.target.value)}
                                  placeholder="e.g., post-secondary goals, skill development, personal growth"
                                  rows={3}
                                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Learning style notes or concerns:
                                </label>
                                <textarea
                                  value={childrenData[index]?.learningStyleNotes || ''}
                                  onChange={(e) => handleChildChange(index, 'learningStyleNotes', e.target.value)}
                                  placeholder="Describe any learning style notes or concerns"
                                  rows={3}
                                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Behavioural considerations (e.g., anxiety, ADHD triggers):
                                </label>
                                <textarea
                                  value={childrenData[index]?.behaviouralConsiderations || ''}
                                  onChange={(e) => handleChildChange(index, 'behaviouralConsiderations', e.target.value)}
                                  placeholder="Describe any behavioural considerations"
                                  rows={3}
                                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  If {childrenData[index]?.nickname || childrenData[index]?.name || `Child ${index + 1}`} is having a difficult day at school, what strategies work best to calm or support them?
                                </label>
                                <textarea
                                  value={childrenData[index]?.schoolCalmingStrategies || ''}
                                  onChange={(e) => handleChildChange(index, 'schoolCalmingStrategies', e.target.value)}
                                  placeholder="Describe strategies that work best to calm or support them"
                                  rows={3}
                                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Additional details:
                                </label>
                                <textarea
                                  value={childrenData[index]?.educationAdditionalDetails || ''}
                                  onChange={(e) => handleChildChange(index, 'educationAdditionalDetails', e.target.value)}
                                  placeholder="Any other educational information a guardian should know"
                                  rows={3}
                                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                />
                              </div>
                            </div>
                          )}

                          {childrenData[index]?.attendingSchool === 'no' && (
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Is there any additional information regarding {childrenData[index]?.nickname || childrenData[index]?.name || `Child ${index + 1}`} and education?
                              </label>
                              <div className="flex gap-4">
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name={`additionalEducationInfo-${index}`}
                                    value="yes"
                                    checked={childrenData[index]?.additionalEducationInfo === 'yes'}
                                    onChange={(e) => handleChildChange(index, 'additionalEducationInfo', e.target.value)}
                                    className="mr-2"
                                  />
                                  <span className="text-gray-300">Yes</span>
                                </label>
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name={`additionalEducationInfo-${index}`}
                                    value="no"
                                    checked={childrenData[index]?.additionalEducationInfo === 'no'}
                                    onChange={(e) => handleChildChange(index, 'additionalEducationInfo', e.target.value)}
                                    className="mr-2"
                                  />
                                  <span className="text-gray-300">No</span>
                                </label>
                              </div>
                            </div>
                          )}

                          {childrenData[index]?.attendingSchool === 'no' && childrenData[index]?.additionalEducationInfo === 'yes' && (
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Please provide details:
                              </label>
                              <textarea
                                value={childrenData[index]?.additionalEducationDetails || ''}
                                onChange={(e) => handleChildChange(index, 'additionalEducationDetails', e.target.value)}
                                placeholder="Provide any additional educational information"
                                rows={4}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                              />
                            </div>
                          )}
                        </div>

                        <div className="mt-6 pb-2 border-b border-gray-500 mb-2">
                          <h4 className="text-base font-semibold text-blue-400">Social Snapshot</h4>
                        </div>
                        <p className="text-sm text-gray-400 mb-4 mt-2">
                          This section helps a guardian preserve the child's relationships, routines, and emotional stability during a period of major life disruption.
                        </p>
                        <div className="mt-2 space-y-4 mb-4">
                          {(() => {
                            type FriendEntry = {
                              friendName: string;
                              relationship: string;
                              cityLocation: string;
                              parentGuardianName: string;
                              parentPhone: string;
                              parentEmail: string;
                              whyImportant: string;
                              activitiesTogether: string;
                              hasAdditional: string;
                            };
                            const friendList = JSON.parse(childrenData[index]?.friendList || '[]') as FriendEntry[];
                            if (friendList.length === 0) {
                              friendList.push({ friendName: '', relationship: '', cityLocation: '', parentGuardianName: '', parentPhone: '', parentEmail: '', whyImportant: '', activitiesTogether: '', hasAdditional: '' });
                            }
                            const handleFriendChange = (friendIndex: number, field: keyof FriendEntry, value: string) => {
                              const updated = [...friendList];
                              if (!updated[friendIndex]) {
                                updated[friendIndex] = { friendName: '', relationship: '', cityLocation: '', parentGuardianName: '', parentPhone: '', parentEmail: '', whyImportant: '', activitiesTogether: '', hasAdditional: '' };
                              }
                              updated[friendIndex][field] = value;
                              if (field === 'hasAdditional' && value === 'yes' && friendIndex === friendList.length - 1) {
                                updated.push({ friendName: '', relationship: '', cityLocation: '', parentGuardianName: '', parentPhone: '', parentEmail: '', whyImportant: '', activitiesTogether: '', hasAdditional: '' });
                              }
                              if (field === 'hasAdditional' && value === 'no') {
                                const trimmed = updated.slice(0, friendIndex + 1);
                                trimmed[friendIndex] = { ...trimmed[friendIndex], hasAdditional: 'no' };
                                handleChildChange(index, 'friendList', JSON.stringify(trimmed));
                                return;
                              }
                              handleChildChange(index, 'friendList', JSON.stringify(updated));
                            };
                            const childName = childrenData[index]?.nickname || childrenData[index]?.name || `Child ${index + 1}`;
                            return friendList.map((friend, friendIndex) => (
                              <div key={friendIndex} className="bg-gray-750 border border-gray-600 rounded-lg p-4 space-y-4">
                                {friendIndex > 0 && (
                                  <div className="pb-2 border-b border-gray-600 mb-2">
                                    <span className="text-sm font-semibold text-gray-300">Friend / Key Relationship #{friendIndex + 1}</span>
                                  </div>
                                )}
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2">Friend's Name:</label>
                                  <input
                                    type="text"
                                    value={friend.friendName}
                                    onChange={(e) => handleFriendChange(friendIndex, 'friendName', e.target.value)}
                                    placeholder="Enter friend's name"
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2">Relationship:</label>
                                  <input
                                    type="text"
                                    value={friend.relationship}
                                    onChange={(e) => handleFriendChange(friendIndex, 'relationship', e.target.value)}
                                    placeholder="e.g., best friend, teammate, neighbor, cousin"
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2">City / Location:</label>
                                  <input
                                    type="text"
                                    value={friend.cityLocation}
                                    onChange={(e) => handleFriendChange(friendIndex, 'cityLocation', e.target.value)}
                                    placeholder="City or general location"
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2">Parent / Guardian Name:</label>
                                  <input
                                    type="text"
                                    value={friend.parentGuardianName}
                                    onChange={(e) => handleFriendChange(friendIndex, 'parentGuardianName', e.target.value)}
                                    placeholder="Enter parent or guardian name"
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2">Parent Phone Number:</label>
                                  <input
                                    type="text"
                                    value={friend.parentPhone}
                                    onChange={(e) => handleFriendChange(friendIndex, 'parentPhone', e.target.value)}
                                    placeholder="Enter parent phone number"
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2">Parent Email:</label>
                                  <input
                                    type="text"
                                    value={friend.parentEmail}
                                    onChange={(e) => handleFriendChange(friendIndex, 'parentEmail', e.target.value)}
                                    placeholder="Enter parent email address"
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2">Why is this relationship important to {childName}?</label>
                                  <textarea
                                    value={friend.whyImportant}
                                    onChange={(e) => handleFriendChange(friendIndex, 'whyImportant', e.target.value)}
                                    placeholder="Describe why this relationship matters"
                                    rows={3}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2">What clubs, activities, camps, etc. do they do together?</label>
                                  <textarea
                                    value={friend.activitiesTogether}
                                    onChange={(e) => handleFriendChange(friendIndex, 'activitiesTogether', e.target.value)}
                                    placeholder="e.g., soccer team, art camp, chess club"
                                    rows={3}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Are there any additional friends and key relationships that the guardian should know about?
                                  </label>
                                  <div className="flex gap-4">
                                    <label className="flex items-center">
                                      <input
                                        type="radio"
                                        name={`friendHasAdditional-${index}-${friendIndex}`}
                                        value="yes"
                                        checked={friend.hasAdditional === 'yes'}
                                        onChange={(e) => handleFriendChange(friendIndex, 'hasAdditional', e.target.value)}
                                        className="mr-2"
                                      />
                                      <span className="text-gray-300">Yes</span>
                                    </label>
                                    <label className="flex items-center">
                                      <input
                                        type="radio"
                                        name={`friendHasAdditional-${index}-${friendIndex}`}
                                        value="no"
                                        checked={friend.hasAdditional === 'no'}
                                        onChange={(e) => handleFriendChange(friendIndex, 'hasAdditional', e.target.value)}
                                        className="mr-2"
                                      />
                                      <span className="text-gray-300">No</span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            ));
                          })()}
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Are there any important adults outside the immediate family (e.g., coaches, mentors, extended family) who play a meaningful role in {childrenData[index]?.nickname || childrenData[index]?.name || `Child ${index + 1}`}'s life?
                            </label>
                            <textarea
                              value={childrenData[index]?.importantAdults || ''}
                              onChange={(e) => handleChildChange(index, 'importantAdults', e.target.value)}
                              placeholder="e.g., names, relationship, how often they connect"
                              rows={3}
                              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              What daily or weekly routines are most important to {childrenData[index]?.nickname || childrenData[index]?.name || `Child ${index + 1}`}'s sense of stability?
                            </label>
                            <textarea
                              value={childrenData[index]?.importantRoutines || ''}
                              onChange={(e) => handleChildChange(index, 'importantRoutines', e.target.value)}
                              placeholder="e.g., bedtime rituals, meals, weekend traditions, after-school habits, Friday movie nights, annual camping trip"
                              rows={3}
                              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                            />
                          </div>
                          {(() => {
                            type ActivityFriendEntry = {
                              friendName: string;
                              relationship: string;
                              cityLocation: string;
                              parentGuardianName: string;
                              parentPhone: string;
                              parentEmail: string;
                              whyImportant: string;
                              activitiesTogether: string;
                              hasAdditional: string;
                            };
                            type ActivityEntry = {
                              activityName: string;
                              activityType: string;
                              importanceLevel: string;
                              frequency: string;
                              hasSharedFriends: string;
                              sharedFriendIds: string[];
                              otherFriends: ActivityFriendEntry[];
                              hasAdditional: string;
                            };
                            const activityList = JSON.parse(childrenData[index]?.activityList || '[]') as ActivityEntry[];
                            if (activityList.length === 0) {
                              activityList.push({ activityName: '', activityType: '', importanceLevel: '', frequency: '', hasSharedFriends: '', sharedFriendIds: [], otherFriends: [], hasAdditional: '' });
                            }
                            const existingFriends = JSON.parse(childrenData[index]?.friendList || '[]') as Array<{ friendName: string }>;
                            const childName = childrenData[index]?.nickname || childrenData[index]?.name || `Child ${index + 1}`;

                            const handleActivityChange = (ai: number, field: keyof ActivityEntry, value: string | string[]) => {
                              const updated = [...activityList];
                              if (!updated[ai]) {
                                updated[ai] = { activityName: '', activityType: '', importanceLevel: '', frequency: '', hasSharedFriends: '', sharedFriendIds: [], otherFriends: [], hasAdditional: '' };
                              }
                              (updated[ai] as Record<string, unknown>)[field] = value;
                              if (field === 'hasAdditional' && value === 'yes' && ai === activityList.length - 1) {
                                updated.push({ activityName: '', activityType: '', importanceLevel: '', frequency: '', hasSharedFriends: '', sharedFriendIds: [], otherFriends: [], hasAdditional: '' });
                              }
                              if (field === 'hasAdditional' && value === 'no') {
                                const trimmed = updated.slice(0, ai + 1);
                                trimmed[ai] = { ...trimmed[ai], hasAdditional: 'no' };
                                handleChildChange(index, 'activityList', JSON.stringify(trimmed));
                                return;
                              }
                              handleChildChange(index, 'activityList', JSON.stringify(updated));
                            };

                            const handleActivityOtherFriendChange = (ai: number, fi: number, field: keyof ActivityFriendEntry, value: string) => {
                              const updated = [...activityList];
                              const friends = [...(updated[ai].otherFriends || [])];
                              if (!friends[fi]) {
                                friends[fi] = { friendName: '', relationship: '', cityLocation: '', parentGuardianName: '', parentPhone: '', parentEmail: '', whyImportant: '', activitiesTogether: '', hasAdditional: '' };
                              }
                              friends[fi][field] = value;
                              if (field === 'hasAdditional' && value === 'yes' && fi === friends.length - 1) {
                                friends.push({ friendName: '', relationship: '', cityLocation: '', parentGuardianName: '', parentPhone: '', parentEmail: '', whyImportant: '', activitiesTogether: '', hasAdditional: '' });
                              }
                              if (field === 'hasAdditional' && value === 'no') {
                                const trimmed = friends.slice(0, fi + 1);
                                trimmed[fi] = { ...trimmed[fi], hasAdditional: 'no' };
                                updated[ai] = { ...updated[ai], otherFriends: trimmed };
                                handleChildChange(index, 'activityList', JSON.stringify(updated));
                                return;
                              }
                              updated[ai] = { ...updated[ai], otherFriends: friends };
                              handleChildChange(index, 'activityList', JSON.stringify(updated));
                            };

                            const toggleSharedFriend = (ai: number, friendName: string) => {
                              const updated = [...activityList];
                              const current = updated[ai].sharedFriendIds || [];
                              const next = current.includes(friendName)
                                ? current.filter(f => f !== friendName)
                                : [...current, friendName];
                              updated[ai] = { ...updated[ai], sharedFriendIds: next };
                              handleChildChange(index, 'activityList', JSON.stringify(updated));
                            };

                            return (
                              <div className="space-y-4">
                                <div className="pb-1">
                                  <label className="block text-sm font-medium text-gray-300">
                                    What extracurricular activities, hobbies, interests or identity anchors are most important to {childName}?
                                  </label>
                                </div>
                                {activityList.map((activity, ai) => (
                                  <div key={ai} className="bg-gray-750 border border-gray-600 rounded-lg p-4 space-y-4">
                                    {ai > 0 && (
                                      <div className="pb-2 border-b border-gray-600 mb-2">
                                        <span className="text-sm font-semibold text-gray-300">Identity Anchor #{ai + 1}</span>
                                      </div>
                                    )}
                                    <div>
                                      <label className="block text-sm font-medium text-gray-300 mb-2">Activity Name:</label>
                                      <input
                                        type="text"
                                        value={activity.activityName}
                                        onChange={(e) => handleActivityChange(ai, 'activityName', e.target.value)}
                                        placeholder="Enter activity name"
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-300 mb-2">Type:</label>
                                      <input
                                        type="text"
                                        value={activity.activityType}
                                        onChange={(e) => handleActivityChange(ai, 'activityType', e.target.value)}
                                        placeholder="e.g., sport / music / art / academic / social"
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-300 mb-2">Importance Level:</label>
                                      <div className="flex gap-4 flex-wrap">
                                        {['Critical', 'Important', 'Nice to have'].map((level) => (
                                          <label key={level} className="flex items-center cursor-pointer">
                                            <input
                                              type="radio"
                                              name={`importanceLevel-${index}-${ai}`}
                                              value={level}
                                              checked={activity.importanceLevel === level}
                                              onChange={(e) => handleActivityChange(ai, 'importanceLevel', e.target.value)}
                                              className="mr-2"
                                            />
                                            <span className="text-gray-300">{level}</span>
                                          </label>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-300 mb-2">Frequency:</label>
                                      <input
                                        type="text"
                                        value={activity.frequency}
                                        onChange={(e) => handleActivityChange(ai, 'frequency', e.target.value)}
                                        placeholder="e.g., weekly, every Saturday, daily"
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-300 mb-2">Do they participate with specific friends?</label>
                                      <div className="flex gap-4">
                                        {['yes', 'no'].map((val) => (
                                          <label key={val} className="flex items-center cursor-pointer">
                                            <input
                                              type="radio"
                                              name={`hasSharedFriends-${index}-${ai}`}
                                              value={val}
                                              checked={activity.hasSharedFriends === val}
                                              onChange={(e) => handleActivityChange(ai, 'hasSharedFriends', e.target.value)}
                                              className="mr-2"
                                            />
                                            <span className="text-gray-300 capitalize">{val}</span>
                                          </label>
                                        ))}
                                      </div>
                                    </div>
                                    {activity.hasSharedFriends === 'yes' && (
                                      <div className="space-y-3 pl-4 border-l border-gray-600">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Select friends who participate:</label>
                                        <div className="space-y-2">
                                          {existingFriends.filter(f => f.friendName).map((f, fi) => (
                                            <label key={fi} className="flex items-center cursor-pointer">
                                              <input
                                                type="checkbox"
                                                checked={(activity.sharedFriendIds || []).includes(f.friendName)}
                                                onChange={() => toggleSharedFriend(ai, f.friendName)}
                                                className="mr-2"
                                              />
                                              <span className="text-gray-300">{f.friendName}</span>
                                            </label>
                                          ))}
                                          <label className="flex items-center cursor-pointer">
                                            <input
                                              type="checkbox"
                                              checked={(activity.sharedFriendIds || []).includes('__other__')}
                                              onChange={() => toggleSharedFriend(ai, '__other__')}
                                              className="mr-2"
                                            />
                                            <span className="text-gray-300">Other</span>
                                          </label>
                                        </div>
                                        {(activity.sharedFriendIds || []).includes('__other__') && (
                                          <div className="space-y-4 mt-3">
                                            {(activity.otherFriends?.length ? activity.otherFriends : [{ friendName: '', relationship: '', cityLocation: '', parentGuardianName: '', parentPhone: '', parentEmail: '', whyImportant: '', activitiesTogether: '', hasAdditional: '' }]).map((otherFriend, ofi) => (
                                              <div key={ofi} className="bg-gray-700 border border-gray-600 rounded-lg p-4 space-y-3">
                                                {ofi > 0 && <div className="pb-1 border-b border-gray-600"><span className="text-xs font-semibold text-gray-400">Additional Friend #{ofi + 1}</span></div>}
                                                {[
                                                  { field: 'friendName' as keyof ActivityFriendEntry, label: "Friend's Name:", placeholder: "Enter friend's name" },
                                                  { field: 'relationship' as keyof ActivityFriendEntry, label: 'Relationship:', placeholder: 'e.g., best friend, teammate, neighbor, cousin' },
                                                  { field: 'cityLocation' as keyof ActivityFriendEntry, label: 'City / Location:', placeholder: 'City or general location' },
                                                  { field: 'parentGuardianName' as keyof ActivityFriendEntry, label: 'Parent / Guardian Name:', placeholder: 'Enter parent or guardian name' },
                                                  { field: 'parentPhone' as keyof ActivityFriendEntry, label: 'Parent Phone Number:', placeholder: 'Enter parent phone number' },
                                                  { field: 'parentEmail' as keyof ActivityFriendEntry, label: 'Parent Email:', placeholder: 'Enter parent email address' },
                                                ].map(({ field, label, placeholder }) => (
                                                  <div key={field}>
                                                    <label className="block text-xs font-medium text-gray-400 mb-1">{label}</label>
                                                    <input
                                                      type="text"
                                                      value={otherFriend[field] as string}
                                                      onChange={(e) => handleActivityOtherFriendChange(ai, ofi, field, e.target.value)}
                                                      placeholder={placeholder}
                                                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                                                    />
                                                  </div>
                                                ))}
                                                {[
                                                  { field: 'whyImportant' as keyof ActivityFriendEntry, label: `Why is this relationship important to ${childName}?`, placeholder: 'Describe why this relationship matters' },
                                                  { field: 'activitiesTogether' as keyof ActivityFriendEntry, label: 'What clubs, activities, camps, etc. do they do together?', placeholder: 'e.g., soccer team, art camp, chess club' },
                                                ].map(({ field, label, placeholder }) => (
                                                  <div key={field}>
                                                    <label className="block text-xs font-medium text-gray-400 mb-1">{label}</label>
                                                    <textarea
                                                      value={otherFriend[field] as string}
                                                      onChange={(e) => handleActivityOtherFriendChange(ai, ofi, field, e.target.value)}
                                                      placeholder={placeholder}
                                                      rows={2}
                                                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-sm"
                                                    />
                                                  </div>
                                                ))}
                                                <div>
                                                  <label className="block text-xs font-medium text-gray-400 mb-1">Are there additional friends to add for this activity?</label>
                                                  <div className="flex gap-4">
                                                    {['yes', 'no'].map((val) => (
                                                      <label key={val} className="flex items-center cursor-pointer">
                                                        <input
                                                          type="radio"
                                                          name={`activityOtherFriendAdditional-${index}-${ai}-${ofi}`}
                                                          value={val}
                                                          checked={otherFriend.hasAdditional === val}
                                                          onChange={(e) => handleActivityOtherFriendChange(ai, ofi, 'hasAdditional', e.target.value)}
                                                          className="mr-2"
                                                        />
                                                        <span className="text-gray-300 capitalize text-sm">{val}</span>
                                                      </label>
                                                    ))}
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    )}
                                    <div>
                                      <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Are there any additional identity anchors we should add?
                                      </label>
                                      <div className="flex gap-4">
                                        {['yes', 'no'].map((val) => (
                                          <label key={val} className="flex items-center cursor-pointer">
                                            <input
                                              type="radio"
                                              name={`activityHasAdditional-${index}-${ai}`}
                                              value={val}
                                              checked={activity.hasAdditional === val}
                                              onChange={(e) => handleActivityChange(ai, 'hasAdditional', e.target.value)}
                                              className="mr-2"
                                            />
                                            <span className="text-gray-300 capitalize">{val}</span>
                                          </label>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            );
                          })()}
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              How does {childrenData[index]?.nickname || childrenData[index]?.name || `Child ${index + 1}`} typically express or manage difficult emotions?
                            </label>
                            <textarea
                              value={childrenData[index]?.emotionalExpression || ''}
                              onChange={(e) => handleChildChange(index, 'emotionalExpression', e.target.value)}
                              placeholder="e.g., withdraws, talks it out, physical activity, art, needs space"
                              rows={3}
                              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              What comforts {childrenData[index]?.nickname || childrenData[index]?.name || `Child ${index + 1}`} when they are upset, scared, or overwhelmed?
                            </label>
                            <textarea
                              value={childrenData[index]?.comfortStrategies || ''}
                              onChange={(e) => handleChildChange(index, 'comfortStrategies', e.target.value)}
                              placeholder="e.g., specific people, objects, activities, words of reassurance"
                              rows={3}
                              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Are there any social or emotional challenges a guardian should be aware of?
                            </label>
                            <textarea
                              value={childrenData[index]?.socialChallenges || ''}
                              onChange={(e) => handleChildChange(index, 'socialChallenges', e.target.value)}
                              placeholder="e.g., social anxiety, difficulty with transitions, peer conflicts, sensitivities"
                              rows={3}
                              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Additional notes about {childrenData[index]?.nickname || childrenData[index]?.name || `Child ${index + 1}`}'s social and emotional world:
                            </label>
                            <textarea
                              value={childrenData[index]?.socialAdditionalNotes || ''}
                              onChange={(e) => handleChildChange(index, 'socialAdditionalNotes', e.target.value)}
                              placeholder="Any other information that would help a guardian maintain relationships and emotional stability"
                              rows={3}
                              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                            />
                          </div>
                        </div>

                        <div className="mt-6 pb-2 border-b border-gray-500 mb-2">
                          <h4 className="text-base font-semibold text-blue-400">Digital Identity and Access</h4>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-400 mb-4">
                            Modern parenting includes school portals, social accounts and gaming platforms that guardians must manage. Provide the information that you believe would best assist a potential guardian:
                          </p>
                          <div className="text-xs text-gray-400 italic mb-2">
                            Note: Detailed access information will be captured in the PDF form
                          </div>
                        </div>
                      </>
                    )}

                  </div>
                </div>
              ))}
            </div>
            );
          })()}

          {step.id === 13 && (() => {
            const basicAnswers = allAnswers?.get(1) || {};
            const client1Name = basicAnswers['fullName'] as string || 'Client 1';
            const client2Name = basicAnswers['spouseName'] as string || 'Client 2';
            const hasSpouse = (basicAnswers['maritalStatus'] === 'married' || basicAnswers['maritalStatus'] === 'common_law');

            const client1Question = step.questions.find(q => q.key === 'client1HasPension');
            const client2Question = step.questions.find(q => q.key === 'client2HasPension');

            return (
              <div className="space-y-8">
                {/* Client 1's Pension Question */}
                {client1Question && (
                  <FormField
                    key={client1Question.key}
                    question={{ ...client1Question, label: `${client1Name}, are you or have you been a member of a pension plan?` }}
                    value={answers[client1Question.key]}
                    onChange={(value) => {
                      onAnswerChange(client1Question.key, value);
                      if (value === 'yes' && client1PensionsData.length === 0) {
                        onAnswerChange('client1PensionsData', [{}]);
                      }
                    }}
                  />
                )}

                {/* Client 1's Pension Details */}
                {answers['client1HasPension'] === 'yes' && (
                  <div className="mt-6 space-y-6">
                    <div className="border border-blue-500 rounded-lg p-6 bg-gray-700">
                      <h3 className="text-lg font-semibold text-white mb-4">{client1Name}'s Pensions</h3>

                      {client1PensionsData.map((pension, index) => (
                        <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-600 mb-4">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="text-md font-semibold text-white">Pension {index + 1}</h4>
                            {client1PensionsData.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeClient1Pension(index)}
                                className="text-red-400 hover:text-red-300 text-sm"
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Which employer were you a member of a pension plan? *
                              </label>
                              <input
                                type="text"
                                value={pension?.employer || ''}
                                onChange={(e) => handleClient1PensionChange(index, 'employer', e.target.value)}
                                placeholder="Enter employer name"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Are you still working for this employer? *
                              </label>
                              <div className="flex gap-4">
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name={`client1-stillWorking-${index}`}
                                    value="yes"
                                    checked={pension?.stillWorking === 'yes'}
                                    onChange={(e) => handleClient1PensionChange(index, 'stillWorking', e.target.value)}
                                    className="mr-2"
                                  />
                                  <span className="text-gray-300">Yes</span>
                                </label>
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name={`client1-stillWorking-${index}`}
                                    value="no"
                                    checked={pension?.stillWorking === 'no'}
                                    onChange={(e) => handleClient1PensionChange(index, 'stillWorking', e.target.value)}
                                    className="mr-2"
                                  />
                                  <span className="text-gray-300">No</span>
                                </label>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Where is the pension document stored? *
                              </label>
                              <input
                                type="text"
                                value={pension?.documentLocation || ''}
                                onChange={(e) => handleClient1PensionChange(index, 'documentLocation', e.target.value)}
                                placeholder="e.g., Safe deposit box, home safe, lawyer's office"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={addClient1Pension}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add Another Pension
                      </button>
                    </div>
                  </div>
                )}

                {/* Client 2's Pension Question */}
                {hasSpouse && client2Question && (
                  <FormField
                    key={client2Question.key}
                    question={{ ...client2Question, label: `${client2Name}, are you or have you been a member of a pension plan?` }}
                    value={answers[client2Question.key]}
                    onChange={(value) => {
                      onAnswerChange(client2Question.key, value);
                      if (value === 'yes' && client2PensionsData.length === 0) {
                        onAnswerChange('client2PensionsData', [{}]);
                      }
                    }}
                  />
                )}

                {/* Client 2's Pension Details */}
                {hasSpouse && answers['client2HasPension'] === 'yes' && (
                  <div className="mt-6 space-y-6">
                    <div className="border border-blue-500 rounded-lg p-6 bg-gray-700">
                      <h3 className="text-lg font-semibold text-white mb-4">{client2Name}'s Pensions</h3>

                      {client2PensionsData.map((pension, index) => (
                        <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-600 mb-4">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="text-md font-semibold text-white">Pension {index + 1}</h4>
                            {client2PensionsData.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeClient2Pension(index)}
                                className="text-red-400 hover:text-red-300 text-sm"
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Which employer were you a member of a pension plan? *
                              </label>
                              <input
                                type="text"
                                value={pension?.employer || ''}
                                onChange={(e) => handleClient2PensionChange(index, 'employer', e.target.value)}
                                placeholder="Enter employer name"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Are you still working for this employer? *
                              </label>
                              <div className="flex gap-4">
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name={`client2-stillWorking-${index}`}
                                    value="yes"
                                    checked={pension?.stillWorking === 'yes'}
                                    onChange={(e) => handleClient2PensionChange(index, 'stillWorking', e.target.value)}
                                    className="mr-2"
                                  />
                                  <span className="text-gray-300">Yes</span>
                                </label>
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name={`client2-stillWorking-${index}`}
                                    value="no"
                                    checked={pension?.stillWorking === 'no'}
                                    onChange={(e) => handleClient2PensionChange(index, 'stillWorking', e.target.value)}
                                    className="mr-2"
                                  />
                                  <span className="text-gray-300">No</span>
                                </label>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Where is the pension document stored? *
                              </label>
                              <input
                                type="text"
                                value={pension?.documentLocation || ''}
                                onChange={(e) => handleClient2PensionChange(index, 'documentLocation', e.target.value)}
                                placeholder="e.g., Safe deposit box, home safe, lawyer's office"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={addClient2Pension}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add Another Pension
                      </button>
                    </div>
                  </div>
                )}

              </div>
            );
          })()}


          {step.id === 9 && (() => {
            const basicAnswers = allAnswers?.get(1) || {};
            const client1Name = (basicAnswers['fullName'] as string) || 'Client 1';
            const maritalStatus = basicAnswers['maritalStatus'] as string;
            const hasSpouseStep9 = maritalStatus === 'married' || maritalStatus === 'common_law';
            const client2Name = (basicAnswers['spouseName'] as string) || 'Client 2';

            // Keys suppressed because we render them in the custom ownership block
            const suppressedOwnershipKeys = new Set([
              ...Array.from({ length: 9 }, (_, i) => [
                `property${i + 1}Owners`,
                `property${i + 1}OtherOwner`,
                `property${i + 1}OtherOwnerPhone`,
                `property${i + 1}OtherOwnerPercent`,
                `property${i + 1}HasAdditionalOwners`,
                `property${i + 1}AdditionalOwnerName`,
                `property${i + 1}AdditionalOwnerPhone`,
                `property${i + 1}AdditionalOwnerPercent`,
              ]).flat(),
            ]);

            type OtherOwner = { name: string; phone: string; email: string; hasMore: 'yes' | 'no' | '' };

            const renderPropertyOwnershipBlock = (n: number) => {
              const ownersKey = `property${n}Owners`;
              const otherOwnersKey = `property${n}OtherOwnersData`;
              const percentsKey = `property${n}OwnerPercents`;

              const rawOwners = answers[ownersKey];
              const selectedOwners: string[] = Array.isArray(rawOwners)
                ? rawOwners
                : typeof rawOwners === 'string' && rawOwners
                  ? rawOwners.split(',')
                  : [];

              const otherOwners: OtherOwner[] = (() => {
                try { return JSON.parse(answers[otherOwnersKey] as string || '[]'); } catch { return []; }
              })();

              const percents: Record<string, string> = (() => {
                try { return JSON.parse(answers[percentsKey] as string || '{}'); } catch { return {}; }
              })();

              const toggleOwner = (val: string) => {
                const updated = selectedOwners.includes(val)
                  ? selectedOwners.filter(o => o !== val)
                  : [...selectedOwners, val];
                onAnswerChange(ownersKey, updated);
                if (!updated.includes('other')) {
                  onAnswerChange(otherOwnersKey, '[]');
                  const updatedPercents = { ...percents };
                  Object.keys(updatedPercents).filter(k => k.startsWith('other_')).forEach(k => delete updatedPercents[k]);
                  onAnswerChange(percentsKey, JSON.stringify(updatedPercents));
                }
              };

              const updateOtherOwner = (idx: number, field: keyof OtherOwner, val: string) => {
                const updated = [...otherOwners];
                if (!updated[idx]) updated[idx] = { name: '', phone: '', email: '', hasMore: '' };
                updated[idx] = { ...updated[idx], [field]: val };
                if (field === 'hasMore' && val === 'yes' && !updated[idx + 1]) {
                  updated.push({ name: '', phone: '', email: '', hasMore: '' });
                }
                if (field === 'hasMore' && val === 'no') {
                  // remove any entries after this one
                  updated.splice(idx + 1);
                }
                onAnswerChange(otherOwnersKey, JSON.stringify(updated));
              };

              const updatePercent = (ownerKey: string, val: string) => {
                onAnswerChange(percentsKey, JSON.stringify({ ...percents, [ownerKey]: val }));
              };

              const ownerCheckboxOptions = [
                { value: 'client1', label: client1Name },
                ...(hasSpouseStep9 ? [{ value: 'client2', label: client2Name }] : []),
                { value: 'other', label: 'Other' },
              ];

              // Build all owner entries for % section
              const allOwnerEntries: { key: string; label: string }[] = [];
              if (selectedOwners.includes('client1')) allOwnerEntries.push({ key: 'client1', label: client1Name });
              if (selectedOwners.includes('client2')) allOwnerEntries.push({ key: 'client2', label: client2Name });
              otherOwners.forEach((o, idx) => {
                if (o.name) allOwnerEntries.push({ key: `other_${idx}`, label: o.name });
                else allOwnerEntries.push({ key: `other_${idx}`, label: `Other Owner ${idx + 1}` });
              });

              const totalPercent = allOwnerEntries.reduce((sum, e) => sum + (parseFloat(percents[e.key] || '0') || 0), 0);
              const percentValid = Math.abs(totalPercent - 100) < 0.01;

              // Determine if other owner chain is complete (last entry has hasMore === 'no' or no entries)
              const otherChainComplete = !selectedOwners.includes('other') ||
                (otherOwners.length > 0 && otherOwners[otherOwners.length - 1]?.hasMore === 'no');

              return (
                <div className="space-y-4">
                  {/* Owner checkboxes */}
                  <div>
                    <label className="block text-base font-semibold text-white mb-3">
                      Who owns the property?
                    </label>
                    <div className="space-y-2">
                      {ownerCheckboxOptions.map(opt => (
                        <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedOwners.includes(opt.value)}
                            onChange={() => toggleOwner(opt.value)}
                            className="w-4 h-4 rounded border-gray-500 bg-gray-600 text-blue-500 focus:ring-blue-500"
                          />
                          <span className="text-gray-200">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Other owner entries */}
                  {selectedOwners.includes('other') && (
                    <div className="space-y-4">
                      {(otherOwners.length === 0 ? [{ name: '', phone: '', email: '', hasMore: '' as const }] : otherOwners).map((owner, idx) => (
                        <div key={idx} className="pl-4 border-l-2 border-blue-500 space-y-3">
                          <p className="text-sm font-semibold text-blue-300">Other Owner {idx + 1}</p>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Name:</label>
                            <input
                              type="text"
                              value={owner.name}
                              onChange={(e) => updateOtherOwner(idx, 'name', e.target.value)}
                              placeholder="Full name"
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number:</label>
                            <input
                              type="text"
                              value={owner.phone}
                              onChange={(e) => updateOtherOwner(idx, 'phone', e.target.value)}
                              placeholder="Phone number"
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address:</label>
                            <input
                              type="email"
                              value={owner.email}
                              onChange={(e) => updateOtherOwner(idx, 'email', e.target.value)}
                              placeholder="Email address"
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          {(owner.hasMore === '' || owner.hasMore === 'yes') && (
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Are there any additional owners?</label>
                              <div className="flex gap-4">
                                <label className="flex items-center">
                                  <input type="radio" name={`prop${n}-owner${idx}-more`} value="yes" checked={owner.hasMore === 'yes'} onChange={() => updateOtherOwner(idx, 'hasMore', 'yes')} className="mr-2" />
                                  <span className="text-gray-300">Yes</span>
                                </label>
                                <label className="flex items-center">
                                  <input type="radio" name={`prop${n}-owner${idx}-more`} value="no" checked={owner.hasMore === 'no'} onChange={() => updateOtherOwner(idx, 'hasMore', 'no')} className="mr-2" />
                                  <span className="text-gray-300">No</span>
                                </label>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Ownership % section — shown once owners are determined */}
                  {allOwnerEntries.length > 0 && otherChainComplete && (
                    <div className="mt-4 space-y-3">
                      <div className="pb-1 border-b border-gray-500">
                        <label className="block text-base font-semibold text-white">Ownership %</label>
                        <p className="text-xs text-gray-400 mt-1">All percentages must add up to 100%</p>
                      </div>
                      {allOwnerEntries.map(entry => (
                        <div key={entry.key} className="flex items-center gap-3">
                          <span className="text-gray-300 flex-1 text-sm">{entry.label}</span>
                          <div className="flex items-center gap-1 w-28">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={percents[entry.key] || ''}
                              onChange={(e) => updatePercent(entry.key, e.target.value)}
                              placeholder="0"
                              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                            />
                            <span className="text-gray-400">%</span>
                          </div>
                        </div>
                      ))}
                      <div className={`flex justify-between items-center pt-2 border-t border-gray-600 text-sm font-medium ${percentValid ? 'text-green-400' : totalPercent > 0 ? 'text-red-400' : 'text-gray-400'}`}>
                        <span>Total</span>
                        <span>{totalPercent.toFixed(totalPercent % 1 === 0 ? 0 : 1)}%{totalPercent > 0 && !percentValid ? ' (must equal 100%)' : ''}{percentValid ? ' ✓' : ''}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            };

            const allFormData = Object.fromEntries(
              Array.from(allAnswers?.entries() || []).flatMap(([_, stepAnswers]) =>
                Object.entries(stepAnswers)
              )
            );

            const isVisible = (question: typeof step.questions[0]) => {
              if (!question.condition) return true;
              return question.condition(allFormData);
            };

            // Separate global questions from per-property questions
            const globalQuestions = step.questions.filter(q => !/^property\d+/.test(q.key));
            const propertyCount = parseInt(answers['propertyCount'] as string || '0') || 0;

            const renderQuestion = (question: typeof step.questions[0]) => {
              if (!isVisible(question)) return null;
              if (suppressedOwnershipKeys.has(question.key)) return null;

              const ownerLabelMatch = question.key.match(/^property(\d+)OwnersLabel$/);
              if (ownerLabelMatch) {
                const n = parseInt(ownerLabelMatch[1]);
                return <div key={question.key}>{renderPropertyOwnershipBlock(n)}</div>;
              }

              const displayLabel = typeof question.label === 'function'
                ? question.label(allAnswers || new Map())
                : question.label;

              return (
                <FormField
                  key={question.key}
                  question={{ ...question, label: displayLabel }}
                  value={answers[question.key]}
                  onChange={(value) => onAnswerChange(question.key, value)}
                  answers={allAnswers}
                />
              );
            };

            return (
              <>
                {/* Global questions (hasRealEstate, propertyCount) */}
                {globalQuestions.map(renderQuestion)}

                {/* Per-property cards */}
                {propertyCount > 0 && Array.from({ length: propertyCount }, (_, i) => {
                  const n = i + 1;
                  const propQuestions = step.questions.filter(q => q.key.startsWith(`property${n}`));
                  const propertyName = (answers[`property${n}Name`] as string) || `Property ${n}`;

                  return (
                    <div key={`property-card-${n}`} className="border border-gray-600 rounded-xl p-6 bg-gray-800 space-y-5 mt-2">
                      <div className="flex items-center gap-3 pb-3 border-b border-gray-600">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold shrink-0">
                          {n}
                        </div>
                        <h3 className="text-lg font-semibold text-white">
                          {propertyName !== `Property ${n}` ? propertyName : `Property ${n}`}
                        </h3>
                      </div>
                      {propQuestions.map(renderQuestion)}
                    </div>
                  );
                })}
              </>
            );
          })()}

          {step.id === 10 && (
            <>
              {step.questions.map((question) => (
                <FormField
                  key={question.key}
                  question={question}
                  value={answers[question.key]}
                  onChange={(value) => onAnswerChange(question.key, value)}
                />
              ))}

              {answers['hasDebts'] === 'yes' && (() => {
                const basicAnswers = allAnswers?.get(1) || {};
                const hasSpouse = (basicAnswers['maritalStatus'] === 'married' || basicAnswers['maritalStatus'] === 'common_law');
                const client1Name = basicAnswers['fullName'] as string || 'Client 1';
                const client2Name = basicAnswers['spouseName'] as string || 'Client 2';

                const debtsData = (answers['debtsData'] as Array<Record<string, string>>) || [{}];

                const handleDebtChange = (index: number, field: string, value: string) => {
                  const updated = [...debtsData];
                  if (!updated[index]) {
                    updated[index] = {};
                  }
                  updated[index][field] = value;
                  onAnswerChange('debtsData', updated);
                };

                const addDebt = () => {
                  const updated = [...debtsData, {}];
                  onAnswerChange('debtsData', updated);
                };

                const removeDebt = (index: number) => {
                  const updated = debtsData.filter((_, i) => i !== index);
                  onAnswerChange('debtsData', updated.length > 0 ? updated : [{}]);
                };

                return (
                  <div className="space-y-8 mt-6">
                    {debtsData.map((debt, index) => (
                      <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold text-white">Debt {index + 1}</h3>
                          {debtsData.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeDebt(index)}
                              className="text-red-400 hover:text-red-300 text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              What type of debt?
                            </label>
                            <select
                              value={debt.debtType || ''}
                              onChange={(e) => handleDebtChange(index, 'debtType', e.target.value)}
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="">Select debt type</option>
                              <option value="Personal Loan">Personal Loan</option>
                              <option value="Mortgage">Mortgage</option>
                              <option value="Reverse Mortgage">Reverse Mortgage</option>
                              <option value="Business Loan">Business Loan</option>
                              <option value="Line of Credit">Line of Credit</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Is this debt owned by {client1Name}, {hasSpouse ? `${client2Name}, or Jointly` : 'or someone else'}?
                            </label>
                            <select
                              value={debt.debtOwner || ''}
                              onChange={(e) => handleDebtChange(index, 'debtOwner', e.target.value)}
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="">Select owner</option>
                              <option value={client1Name}>{client1Name}</option>
                              {hasSpouse && <option value={client2Name}>{client2Name}</option>}
                              {hasSpouse && <option value="Jointly">Jointly</option>}
                              {!hasSpouse && <option value="Other">Other</option>}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Is there anyone else named on the loan?
                            </label>
                            <div className="flex gap-4">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name={`hasOtherOnLoan-${index}`}
                                  value="yes"
                                  checked={debt.hasOtherOnLoan === 'yes'}
                                  onChange={(e) => handleDebtChange(index, 'hasOtherOnLoan', e.target.value)}
                                  className="mr-2"
                                />
                                <span className="text-gray-300">Yes</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name={`hasOtherOnLoan-${index}`}
                                  value="no"
                                  checked={debt.hasOtherOnLoan === 'no'}
                                  onChange={(e) => handleDebtChange(index, 'hasOtherOnLoan', e.target.value)}
                                  className="mr-2"
                                />
                                <span className="text-gray-300">No</span>
                              </label>
                            </div>
                          </div>

                          {debt.hasOtherOnLoan === 'yes' && (
                            <>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Other Person's Name
                                </label>
                                <input
                                  type="text"
                                  value={debt.otherPersonName || ''}
                                  onChange={(e) => handleDebtChange(index, 'otherPersonName', e.target.value)}
                                  placeholder="Enter name"
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Other Person's Phone Number
                                </label>
                                <input
                                  type="text"
                                  value={debt.otherPersonPhone || ''}
                                  onChange={(e) => handleDebtChange(index, 'otherPersonPhone', e.target.value)}
                                  placeholder="Enter phone number"
                                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>
                            </>
                          )}

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Is this debt secured against an asset?
                            </label>
                            <div className="flex gap-4">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name={`isSecured-${index}`}
                                  value="yes"
                                  checked={debt.isSecured === 'yes'}
                                  onChange={(e) => handleDebtChange(index, 'isSecured', e.target.value)}
                                  className="mr-2"
                                />
                                <span className="text-gray-300">Yes</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name={`isSecured-${index}`}
                                  value="no"
                                  checked={debt.isSecured === 'no'}
                                  onChange={(e) => handleDebtChange(index, 'isSecured', e.target.value)}
                                  className="mr-2"
                                />
                                <span className="text-gray-300">No</span>
                              </label>
                            </div>
                          </div>

                          {debt.isSecured === 'yes' && (
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                What is the loan secured by?
                              </label>
                              <input
                                type="text"
                                value={debt.securedBy || ''}
                                onChange={(e) => handleDebtChange(index, 'securedBy', e.target.value)}
                                placeholder="e.g., Property, Vehicle, etc."
                                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          )}
                        </div>

                        {index === debtsData.length - 1 && (
                          <div className="mt-6 pt-6 border-t border-gray-600">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Do you have any other outstanding debts, not including credit cards?
                            </label>
                            <div className="flex gap-4">
                              <button
                                type="button"
                                onClick={addDebt}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                Yes, add another debt
                              </button>
                              <span className="px-4 py-2 text-gray-300">
                                No (continue to next step)
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })()}

              {(() => {
                const basicAnswers = allAnswers?.get(1) || {};
                const client1Name = basicAnswers['fullName'] as string || 'Client 1';

                const hasCreditCards = answers['client1HasCreditCards'];
                const creditCardCount = answers['client1CreditCardCount'] || '0';
                const creditCardsData = (answers['creditCardsData'] as Array<Record<string, string>>) || [];

                const handleCreditCardChange = (index: number, field: string, value: string) => {
                  const updated = [...creditCardsData];
                  if (!updated[index]) {
                    updated[index] = {};
                  }
                  updated[index][field] = value;
                  onAnswerChange('creditCardsData', updated);
                };

                return (
                  <div className="space-y-6 mt-8 pt-8 border-t border-gray-600">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {client1Name}, do you have any credit cards?
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="client1HasCreditCards"
                            value="yes"
                            checked={hasCreditCards === 'yes'}
                            onChange={(e) => onAnswerChange('client1HasCreditCards', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-gray-300">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="client1HasCreditCards"
                            value="no"
                            checked={hasCreditCards === 'no'}
                            onChange={(e) => {
                              onAnswerChange('client1HasCreditCards', e.target.value);
                              onAnswerChange('client1CreditCardCount', '0');
                              onAnswerChange('creditCardsData', []);
                            }}
                            className="mr-2"
                          />
                          <span className="text-gray-300">No</span>
                        </label>
                      </div>
                    </div>

                    {hasCreditCards === 'yes' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            How many credit cards do you have?
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="20"
                            value={creditCardCount}
                            onChange={(e) => {
                              const count = parseInt(e.target.value) || 0;
                              onAnswerChange('client1CreditCardCount', e.target.value);
                              const newData = Array(Math.max(0, count)).fill(null).map((_, i) => creditCardsData[i] || {});
                              onAnswerChange('creditCardsData', newData);
                            }}
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        {parseInt(creditCardCount) > 0 && creditCardsData.length > 0 && (
                          <div className="space-y-4 mt-6">
                            <h3 className="text-lg font-semibold text-white">Credit Card Details</h3>
                            {creditCardsData.map((card, index) => (
                              <div key={index} className="border border-gray-600 rounded-lg p-4 bg-gray-700">
                                <h4 className="text-md font-semibold text-white mb-4">Credit Card {index + 1}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Credit Card Company
                                    </label>
                                    <input
                                      type="text"
                                      value={card.company || ''}
                                      onChange={(e) => handleCreditCardChange(index, 'company', e.target.value)}
                                      placeholder="e.g., Visa, MasterCard, Amex"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Last 4 Digits of the Card
                                    </label>
                                    <input
                                      type="text"
                                      maxLength={4}
                                      value={card.lastFourDigits || ''}
                                      onChange={(e) => handleCreditCardChange(index, 'lastFourDigits', e.target.value)}
                                      placeholder="1234"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Expiry Date
                                    </label>
                                    <input
                                      type="text"
                                      value={card.expiryDate || ''}
                                      onChange={(e) => handleCreditCardChange(index, 'expiryDate', e.target.value)}
                                      placeholder="MM/YY"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Other parties on this card (if applicable)
                                    </label>
                                    <input
                                      type="text"
                                      value={card.otherParties || ''}
                                      onChange={(e) => handleCreditCardChange(index, 'otherParties', e.target.value)}
                                      placeholder="Optional"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })()}

              {(() => {
                const basicAnswers = allAnswers?.get(1) || {};
                const hasSpouse = (basicAnswers['maritalStatus'] === 'married' || basicAnswers['maritalStatus'] === 'common_law');
                const client2Name = basicAnswers['spouseName'] as string || 'Client 2';

                if (!hasSpouse) return null;

                const hasClient2CreditCards = answers['client2HasCreditCards'];
                const client2CreditCardCount = answers['client2CreditCardCount'] || '0';
                const client2CreditCardsData = (answers['client2CreditCardsData'] as Array<Record<string, string>>) || [];

                const handleClient2CreditCardChange = (index: number, field: string, value: string) => {
                  const updated = [...client2CreditCardsData];
                  if (!updated[index]) {
                    updated[index] = {};
                  }
                  updated[index][field] = value;
                  onAnswerChange('client2CreditCardsData', updated);
                };

                return (
                  <div className="space-y-6 mt-8 pt-8 border-t border-gray-600">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {client2Name}, do you have any credit cards?
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="client2HasCreditCards"
                            value="yes"
                            checked={hasClient2CreditCards === 'yes'}
                            onChange={(e) => onAnswerChange('client2HasCreditCards', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-gray-300">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="client2HasCreditCards"
                            value="no"
                            checked={hasClient2CreditCards === 'no'}
                            onChange={(e) => {
                              onAnswerChange('client2HasCreditCards', e.target.value);
                              onAnswerChange('client2CreditCardCount', '0');
                              onAnswerChange('client2CreditCardsData', []);
                            }}
                            className="mr-2"
                          />
                          <span className="text-gray-300">No</span>
                        </label>
                      </div>
                    </div>

                    {hasClient2CreditCards === 'yes' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            How many credit cards do you have?
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="20"
                            value={client2CreditCardCount}
                            onChange={(e) => {
                              const count = parseInt(e.target.value) || 0;
                              onAnswerChange('client2CreditCardCount', e.target.value);
                              const newData = Array(Math.max(0, count)).fill(null).map((_, i) => client2CreditCardsData[i] || {});
                              onAnswerChange('client2CreditCardsData', newData);
                            }}
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        {parseInt(client2CreditCardCount) > 0 && client2CreditCardsData.length > 0 && (
                          <div className="space-y-4 mt-6">
                            <h3 className="text-lg font-semibold text-white">Credit Card Details</h3>
                            {client2CreditCardsData.map((card, index) => (
                              <div key={index} className="border border-gray-600 rounded-lg p-4 bg-gray-700">
                                <h4 className="text-md font-semibold text-white mb-4">Credit Card {index + 1}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Credit Card Company
                                    </label>
                                    <input
                                      type="text"
                                      value={card.company || ''}
                                      onChange={(e) => handleClient2CreditCardChange(index, 'company', e.target.value)}
                                      placeholder="e.g., Visa, MasterCard, Amex"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Last 4 Digits of the Card
                                    </label>
                                    <input
                                      type="text"
                                      maxLength={4}
                                      value={card.lastFourDigits || ''}
                                      onChange={(e) => handleClient2CreditCardChange(index, 'lastFourDigits', e.target.value)}
                                      placeholder="1234"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Expiry Date
                                    </label>
                                    <input
                                      type="text"
                                      value={card.expiryDate || ''}
                                      onChange={(e) => handleClient2CreditCardChange(index, 'expiryDate', e.target.value)}
                                      placeholder="MM/YY"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Other parties on this card (if applicable)
                                    </label>
                                    <input
                                      type="text"
                                      value={card.otherParties || ''}
                                      onChange={(e) => handleClient2CreditCardChange(index, 'otherParties', e.target.value)}
                                      placeholder="Optional"
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })()}
            </>
          )}

          {step.id === 11 && (
            <>
              {step.questions.map((question) => {
                const basicAnswers = allAnswers?.get(1) || {};
                const hasSpouse = (basicAnswers['maritalStatus'] === 'married' || basicAnswers['maritalStatus'] === 'common_law');
                const client1Name = basicAnswers['fullName'] as string || 'you';
                const client2Name = basicAnswers['spouseName'] as string || 'your spouse';

                if (question.key === 'client2HasWorkBenefits' && !hasSpouse) {
                  return null;
                }
                if (question.key === 'client2HasLifeInsurance' && !hasSpouse) {
                  return null;
                }
                if (question.key === 'client2LifeInsuranceCount' && (!hasSpouse || answers['client2HasLifeInsurance'] !== 'yes')) {
                  return null;
                }
                if (question.key === 'client1LifeInsuranceCount' && answers['client1HasLifeInsurance'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2HasDisabilityInsurance' && !hasSpouse) {
                  return null;
                }
                if (question.key === 'client2DisabilityInsuranceCount' && (!hasSpouse || answers['client2HasDisabilityInsurance'] !== 'yes')) {
                  return null;
                }
                if (question.key === 'client1DisabilityInsuranceCount' && answers['client1HasDisabilityInsurance'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2HasCriticalIllness' && !hasSpouse) {
                  return null;
                }
                if (question.key === 'client2CriticalIllnessCount' && (!hasSpouse || answers['client2HasCriticalIllness'] !== 'yes')) {
                  return null;
                }
                if (question.key === 'client1CriticalIllnessCount' && answers['client1HasCriticalIllness'] !== 'yes') {
                  return null;
                }

                let customLabel = question.label;
                if (question.key === 'client1HasWorkBenefits') {
                  customLabel = `${client1Name}, do you have life, disability, or critical illness insurance through your work?`;
                }
                if (question.key === 'client2HasWorkBenefits') {
                  customLabel = `${client2Name}, do you have life, disability, or critical illness insurance through your work?`;
                }
                if (question.key === 'client1HasLifeInsurance') {
                  customLabel = `${client1Name}, outside of benefits through your company, do you have any Life Insurance policies?`;
                }
                if (question.key === 'client2HasLifeInsurance') {
                  customLabel = `${client2Name}, outside of benefits through your company, do you have any Life Insurance policies?`;
                }
                if (question.key === 'client1HasDisabilityInsurance') {
                  customLabel = `${client1Name}, do you have any Disability Insurance policies?`;
                }
                if (question.key === 'client2HasDisabilityInsurance') {
                  customLabel = `${client2Name}, do you have any Disability Insurance policies?`;
                }
                if (question.key === 'client1HasCriticalIllness') {
                  customLabel = `${client1Name}, do you have any Critical Illness policies?`;
                }
                if (question.key === 'client2HasCriticalIllness') {
                  customLabel = `${client2Name}, do you have any Critical Illness policies?`;
                }

                const docLocationField = (key: string, answerKey: string) => {
                  if (answers[answerKey] !== 'yes') return null;
                  return (
                    <div key={`${key}-docLocation`} className="mt-1">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Location of the supporting documents:
                      </label>
                      <input
                        type="text"
                        value={(answers[`${answerKey}DocLocation`] as string) || ''}
                        onChange={(e) => onAnswerChange(`${answerKey}DocLocation`, e.target.value)}
                        placeholder="e.g., Home office filing cabinet, Google Drive, etc."
                        className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  );
                };

                return (
                  <React.Fragment key={question.key}>
                    <FormField
                      question={{ ...question, label: customLabel }}
                      value={answers[question.key]}
                      onChange={(value) => onAnswerChange(question.key, value)}
                    />
                    {question.key === 'client1HasWorkBenefits' && docLocationField(question.key, 'client1HasWorkBenefits')}
                    {question.key === 'client2HasWorkBenefits' && docLocationField(question.key, 'client2HasWorkBenefits')}
                  </React.Fragment>
                );
              })}
            </>
          )}

          {step.id === 12 && (
            <>
              {step.questions.map((question) => {
                const basicAnswers = allAnswers?.get(1) || {};
                const hasSpouse = (basicAnswers['maritalStatus'] === 'married' || basicAnswers['maritalStatus'] === 'common_law');
                const client1Name = basicAnswers['fullName'] as string || 'you';
                const client2Name = basicAnswers['spouseName'] as string || 'your spouse';

                if (question.key === 'homeInsuranceDocLocation' && answers['hasHomeInsurance'] !== 'yes') {
                  return null;
                }
                if (question.key === 'hasAdditionalProperties' && answers['hasHomeInsurance'] !== 'yes') {
                  return null;
                }
                if (question.key === 'additionalPropertiesCount' && answers['hasAdditionalProperties'] !== 'yes') {
                  return null;
                }

                // Conditional logic for additional property document locations
                const additionalPropCount = parseInt(answers['additionalPropertiesCount'] as string) || 0;
                if (question.key === 'additionalProperty1DocLocation' && additionalPropCount < 1) {
                  return null;
                }
                if (question.key === 'additionalProperty2DocLocation' && additionalPropCount < 2) {
                  return null;
                }
                if (question.key === 'additionalProperty3DocLocation' && additionalPropCount < 3) {
                  return null;
                }
                if (question.key === 'additionalProperty4DocLocation' && additionalPropCount < 4) {
                  return null;
                }
                if (question.key === 'additionalProperty5DocLocation' && additionalPropCount < 5) {
                  return null;
                }
                if (question.key === 'additionalProperty6DocLocation' && additionalPropCount < 6) {
                  return null;
                }
                if (question.key === 'additionalProperty7DocLocation' && additionalPropCount < 7) {
                  return null;
                }
                if (question.key === 'additionalProperty8DocLocation' && additionalPropCount < 8) {
                  return null;
                }
                if (question.key === 'additionalProperty9DocLocation' && additionalPropCount < 9) {
                  return null;
                }
                if (question.key === 'additionalProperty10DocLocation' && additionalPropCount < 10) {
                  return null;
                }

                if (question.key === 'client1VehicleDescription' && answers['client1HasVehicleInsurance'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client1VehicleInsuranceDocLocation' && answers['client1HasVehicleInsurance'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2HasVehicleInsurance' && !hasSpouse) {
                  return null;
                }
                if (question.key === 'client2VehicleDescription' && (answers['client2HasVehicleInsurance'] !== 'yes' || !hasSpouse)) {
                  return null;
                }
                if (question.key === 'client2VehicleInsuranceDocLocation' && (answers['client2HasVehicleInsurance'] !== 'yes' || !hasSpouse)) {
                  return null;
                }
                if (question.key === 'hasAdditionalVehicles' &&
                    answers['client1HasVehicleInsurance'] !== 'yes' &&
                    answers['client2HasVehicleInsurance'] !== 'yes') {
                  return null;
                }
                if (question.key === 'additionalVehiclesCount' && answers['hasAdditionalVehicles'] !== 'yes') {
                  return null;
                }

                // Conditional logic for additional vehicle descriptions and document locations
                const additionalVehicleCount = parseInt(answers['additionalVehiclesCount'] as string) || 0;
                if (question.key === 'additionalVehicle1Description' && additionalVehicleCount < 1) {
                  return null;
                }
                if (question.key === 'additionalVehicle1DocLocation' && additionalVehicleCount < 1) {
                  return null;
                }
                if (question.key === 'additionalVehicle2Description' && additionalVehicleCount < 2) {
                  return null;
                }
                if (question.key === 'additionalVehicle2DocLocation' && additionalVehicleCount < 2) {
                  return null;
                }
                if (question.key === 'additionalVehicle3Description' && additionalVehicleCount < 3) {
                  return null;
                }
                if (question.key === 'additionalVehicle3DocLocation' && additionalVehicleCount < 3) {
                  return null;
                }
                if (question.key === 'additionalVehicle4Description' && additionalVehicleCount < 4) {
                  return null;
                }
                if (question.key === 'additionalVehicle4DocLocation' && additionalVehicleCount < 4) {
                  return null;
                }
                if (question.key === 'additionalVehicle5Description' && additionalVehicleCount < 5) {
                  return null;
                }
                if (question.key === 'additionalVehicle5DocLocation' && additionalVehicleCount < 5) {
                  return null;
                }
                if (question.key === 'additionalVehicle6Description' && additionalVehicleCount < 6) {
                  return null;
                }
                if (question.key === 'additionalVehicle6DocLocation' && additionalVehicleCount < 6) {
                  return null;
                }
                if (question.key === 'additionalVehicle7Description' && additionalVehicleCount < 7) {
                  return null;
                }
                if (question.key === 'additionalVehicle7DocLocation' && additionalVehicleCount < 7) {
                  return null;
                }
                if (question.key === 'additionalVehicle8Description' && additionalVehicleCount < 8) {
                  return null;
                }
                if (question.key === 'additionalVehicle8DocLocation' && additionalVehicleCount < 8) {
                  return null;
                }
                if (question.key === 'additionalVehicle9Description' && additionalVehicleCount < 9) {
                  return null;
                }
                if (question.key === 'additionalVehicle9DocLocation' && additionalVehicleCount < 9) {
                  return null;
                }
                if (question.key === 'additionalVehicle10Description' && additionalVehicleCount < 10) {
                  return null;
                }
                if (question.key === 'additionalVehicle10DocLocation' && additionalVehicleCount < 10) {
                  return null;
                }

                let customLabel = question.label;
                if (question.key === 'client1HasVehicleInsurance') {
                  customLabel = `${client1Name}, do you have vehicle insurance?`;
                }
                if (question.key === 'client2HasVehicleInsurance') {
                  customLabel = `${client2Name}, do you have vehicle insurance?`;
                }

                return (
                  <FormField
                    key={question.key}
                    question={{ ...question, label: customLabel }}
                    value={answers[question.key]}
                    onChange={(value) => onAnswerChange(question.key, value)}
                  />
                );
              })}
            </>
          )}

          {validationError && (
            <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg">
              <p className="text-red-200 text-sm">{validationError}</p>
            </div>
          )}

          <div className="flex flex-col gap-4 pt-6 border-t border-gray-600">
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All Answers on ONLY this page
              </button>
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={onPrevious}
                disabled={isFirstStep}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  isFirstStep
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </button>

              <button
                type="submit"
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {isLastStep ? (
                  <>
                    Complete
                    <Check className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {showClearConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-md mx-4">
              <h3 className="text-xl font-semibold text-white mb-4">Clear Page Answers?</h3>
              <p className="text-gray-300 mb-6">
                This will clear all answers on this page and any answers in subsequent pages that depend on this page's information. This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onClearCurrentStep();
                    setShowClearConfirm(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Clear Answers
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
