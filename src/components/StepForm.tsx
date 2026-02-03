import React, { useState, FormEvent } from 'react';
import { Step } from '../lib/steps';
import FormField from './FormField';
import VideoPlayer from './VideoPlayer';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

type StepFormProps = {
  step: Step;
  answers: Record<string, unknown>;
  allAnswers?: Map<number, Record<string, unknown>>;
  isFirstStep: boolean;
  isLastStep: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onAnswerChange: (key: string, value: unknown) => void;
};

export default function StepForm({
  step,
  answers,
  allAnswers,
  isFirstStep,
  isLastStep,
  onNext,
  onPrevious,
  onAnswerChange,
}: StepFormProps) {
  const [validationError, setValidationError] = useState('');

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
    } else if (step.id === 5) {
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
    } else if (step.id === 11) {
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

  const handleChildChange = (index: number, field: string, value: string) => {
    const updated = [...childrenData];
    if (!updated[index]) {
      updated[index] = {};
    }
    updated[index][field] = value;
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

  const client1EstateTrusteeCount = parseInt(answers['client1EstateTrusteeCount'] as string) || 0;
  const client1EstateTrusteeData = (answers['client1EstateTrusteeData'] as Array<Record<string, string>>) || Array(Math.max(0, client1EstateTrusteeCount || 0)).fill(null).map(() => ({}));

  const handleEstateTrusteeChange = (index: number, field: string, value: string) => {
    const updated = [...client1EstateTrusteeData];
    if (!updated[index]) {
      updated[index] = {};
    }
    updated[index][field] = value;
    onAnswerChange('client1EstateTrusteeData', updated);
  };

  const client1FinancialAdvisorsCount = parseInt(answers['client1FinancialAdvisors'] as string) || 0;
  const client1FinancialAdvisorsData = (answers['client1FinancialAdvisorsData'] as Array<Record<string, string>>) || Array(Math.max(0, client1FinancialAdvisorsCount || 0)).fill(null).map(() => ({}));

  const handleFinancialAdvisorChange = (index: number, field: string, value: string) => {
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

  const client2EstateTrusteeCount = parseInt(answers['client2EstateTrusteeCount'] as string) || 0;
  const client2EstateTrusteeData = (answers['client2EstateTrusteeData'] as Array<Record<string, string>>) || Array(Math.max(0, client2EstateTrusteeCount || 0)).fill(null).map(() => ({}));

  const handleClient2EstateTrusteeChange = (index: number, field: string, value: string) => {
    const updated = [...client2EstateTrusteeData];
    if (!updated[index]) {
      updated[index] = {};
    }
    updated[index][field] = value;
    onAnswerChange('client2EstateTrusteeData', updated);
  };

  const client2FinancialAdvisorsCount = parseInt(answers['client2FinancialAdvisors'] as string) || 0;
  const client2FinancialAdvisorsData = (answers['client2FinancialAdvisorsData'] as Array<Record<string, string>>) || Array(Math.max(0, client2FinancialAdvisorsCount || 0)).fill(null).map(() => ({}));

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
    if (!updated[index]) {
      updated[index] = {};
    }
    updated[index][field] = value;
    onAnswerChange('trustBeneficiariesData', updated);
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

                let customLabel = question.label;
                if (question.key === 'client1HasPreviousRelationship' && answers['maritalStatus'] === 'widowed') {
                  customLabel = 'Aside from your former spouse or common law partner\'s passing, have you previously been married or in a common law relationship with another person?';
                }

                return (
                  <FormField
                    key={question.key}
                    question={{...question, label: customLabel}}
                    value={answers[question.key]}
                    onChange={(value) => onAnswerChange(question.key, value)}
                  />
                );
              })}
            </>
          )}

          {step.id === 4 && (
            <>
              {step.questions.map((question) => {
                if (question.key === 'trustLegalName' && answers['hasFamilyTrust'] !== 'yes') {
                  return null;
                }
                if (question.key === 'trustDeedLocation' && answers['hasFamilyTrust'] !== 'yes') {
                  return null;
                }
                if (question.key === 'trustYearEstablished' && answers['hasFamilyTrust'] !== 'yes') {
                  return null;
                }
                if (question.key === 'trustBeneficiariesCount' && answers['hasFamilyTrust'] !== 'yes') {
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

              {answers['hasFamilyTrust'] === 'yes' && trustBeneficiariesCount > 0 && (
                <div className="space-y-6 mt-6">
                  <h3 className="text-xl font-semibold text-white">Trust Beneficiaries</h3>
                  {Array.from({ length: trustBeneficiariesCount }).map((_, index) => (
                    <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                      <h4 className="text-lg font-semibold text-white mb-4">Beneficiary {index + 1}</h4>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Beneficiary Name *
                          </label>
                          <input
                            type="text"
                            value={trustBeneficiariesData[index]?.beneficiaryName || ''}
                            onChange={(e) => handleBeneficiaryChange(index, 'beneficiaryName', e.target.value)}
                            placeholder="Enter beneficiary name"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Relationship to Settlor *
                          </label>
                          <input
                            type="text"
                            value={trustBeneficiariesData[index]?.relationshipToSettlor || ''}
                            onChange={(e) => handleBeneficiaryChange(index, 'relationshipToSettlor', e.target.value)}
                            placeholder="e.g., Daughter, Son, Spouse, etc."
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Country of Residence
                          </label>
                          <input
                            type="text"
                            value={trustBeneficiariesData[index]?.countryOfResidence || ''}
                            onChange={(e) => handleBeneficiaryChange(index, 'countryOfResidence', e.target.value)}
                            placeholder="Enter country of residence"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={trustBeneficiariesData[index]?.phoneNumber || ''}
                            onChange={(e) => handleBeneficiaryChange(index, 'phoneNumber', e.target.value)}
                            placeholder="Enter phone number"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={trustBeneficiariesData[index]?.emailAddress || ''}
                            onChange={(e) => handleBeneficiaryChange(index, 'emailAddress', e.target.value)}
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
          )}

          {step.id === 5 && (
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
                                                Are there any more to add?
                                              </label>
                                              <div className="flex space-x-4">
                                                <button
                                                  type="button"
                                                  onClick={handleAddMoreOwner}
                                                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                >
                                                  Yes
                                                </button>
                                                <button
                                                  type="button"
                                                  onClick={() => {}}
                                                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                                                >
                                                  No
                                                </button>
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
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step.id === 6 && (() => {
            const basicAnswers = allAnswers?.get(1) || {};
            const hasSpouse = (basicAnswers['maritalStatus'] === 'married' || basicAnswers['maritalStatus'] === 'common_law');
            const client1Name = basicAnswers['fullName'] as string || 'you';
            const client2Name = basicAnswers['spouseName'] as string || 'your spouse';

            return (
              <>
                {step.questions.map((question) => {

                if (question.key === 'client1WillLocation' && answers['client1HasWill'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client1HasSecondaryWill' && answers['client1HasWill'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client1SecondaryWillLocation' && answers['client1HasSecondaryWill'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client1SecondaryWillJurisdiction' && answers['client1HasSecondaryWill'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2HasWill' && !hasSpouse) {
                  return null;
                }
                if (question.key === 'client2WillLocation' && (answers['client2HasWill'] !== 'yes' || !hasSpouse)) {
                  return null;
                }
                if (question.key === 'client2HasSecondaryWill' && (answers['client2HasWill'] !== 'yes' || !hasSpouse)) {
                  return null;
                }
                if (question.key === 'client2SecondaryWillLocation' && answers['client2HasSecondaryWill'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2SecondaryWillJurisdiction' && answers['client2HasSecondaryWill'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2UsesAccountant' && !hasSpouse) {
                  return null;
                }
                if (question.key === 'willsSameLawyer' && !(answers['client1HasWill'] === 'yes' && answers['client2HasWill'] === 'yes')) {
                  return null;
                }
                if (question.key === 'spousesPoaPersonalCare' && !(hasSpouse && (answers['relationshipStatus'] === 'married' || answers['relationshipStatus'] === 'commonLaw') && answers['client1HasWill'] === 'yes' && answers['client2HasWill'] === 'yes')) {
                  return null;
                }
                if (question.key === 'spousesPoaProperty' && !(hasSpouse && (answers['relationshipStatus'] === 'married' || answers['relationshipStatus'] === 'commonLaw') && answers['client1HasWill'] === 'yes' && answers['client2HasWill'] === 'yes')) {
                  return null;
                }
                if (question.key === 'client1HasPoaPersonalCare' && answers['client1HasWill'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client1HasLivingWill' && answers['client1HasPoaPersonalCare'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client1PoaPersonalCareCount' && answers['client1HasPoaPersonalCare'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client1HasPoaProperty' && answers['client1HasWill'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client1PoaPropertyCount' && answers['client1HasPoaProperty'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client1HasEstateTrustee' && answers['client1HasWill'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client1EstateTrusteeCount' && answers['client1HasEstateTrustee'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2HasPoaPersonalCare' && (!hasSpouse || answers['client2HasWill'] !== 'yes')) {
                  return null;
                }
                if (question.key === 'client2HasLivingWill' && (answers['client2HasPoaPersonalCare'] !== 'yes' || !hasSpouse)) {
                  return null;
                }
                if (question.key === 'client2PoaPersonalCareCount' && answers['client2HasPoaPersonalCare'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2PoaPersonalCareCount' && answers['client2HasPoaPersonalCare'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2PoaPersonalCareHasDocCopy' && answers['client2HasPoaPersonalCare'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2HasPoaProperty' && (!hasSpouse || answers['client2HasWill'] !== 'yes')) {
                  return null;
                }
                if (question.key === 'client2PoaPropertyCount' && answers['client2HasPoaProperty'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2PoaPropertyHasDocCopy' && answers['client2HasPoaProperty'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2HasEstateTrustee' && (!hasSpouse || answers['client2HasWill'] !== 'yes')) {
                  return null;
                }
                if (question.key === 'client2EstateTrusteeCount' && answers['client2HasEstateTrustee'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2EstateTrusteeHasWillCopy' && answers['client2HasEstateTrustee'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2EstateTrusteeKnowsWillLocation' && answers['client2EstateTrusteeHasWillCopy'] !== 'no') {
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

                let customLabel = question.label;
                if (question.key === 'client1HasWill') {
                  customLabel = `Do you (${client1Name}) have a Will?`;
                }
                if (question.key === 'client1WillLocation') {
                  customLabel = `${client1Name}, where is the Will located?`;
                }
                if (question.key === 'client1SecondaryWillJurisdiction') {
                  customLabel = `In what jurisdiction was ${client1Name}'s secondary Will prepared?`;
                }
                if (question.key === 'client2HasWill') {
                  customLabel = `Does ${client2Name} have a Will?`;
                }
                if (question.key === 'client2WillLocation') {
                  customLabel = `${client2Name}, where is the Will located?`;
                }
                if (question.key === 'client2SecondaryWillJurisdiction') {
                  customLabel = `In what jurisdiction was ${client2Name}'s secondary Will prepared?`;
                }
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
                if (question.key === 'client1FinancialAdvisors') {
                  customLabel = `${client1Name}, how many Financial Advisors do you work with?`;
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
                if (question.key === 'client1HasPoaPersonalCare') {
                  if (answers['spousesPoaPersonalCare'] === 'yes') {
                    customLabel = `${client1Name}, have you named a contingent Power of Attorney(ies) for Personal Care?`;
                  } else {
                    customLabel = `${client1Name}, have you named a Power of Attorney(ies) for Personal Care?`;
                  }
                }
                if (question.key === 'client1PoaPersonalCareCount') {
                  if (answers['spousesPoaPersonalCare'] === 'yes') {
                    customLabel = `${client1Name}, how many contingent Powers of Attorney for Personal Care have you named?`;
                  } else {
                    customLabel = `${client1Name}, how many Powers of Attorney for Personal Care have you named?`;
                  }
                }
                if (question.key === 'client1HasPoaProperty') {
                  if (answers['spousesPoaProperty'] === 'yes') {
                    customLabel = `${client1Name}, have you named a contingent Power of Attorney(ies) for Property in your Will?`;
                  } else {
                    customLabel = `${client1Name}, have you named a Power of Attorney(ies) for Property in your Will?`;
                  }
                }
                if (question.key === 'client1PoaPropertyCount') {
                  if (answers['spousesPoaProperty'] === 'yes') {
                    customLabel = `${client1Name}, how many contingent Powers of Attorney for Property have you named?`;
                  } else {
                    customLabel = `${client1Name}, how many Powers of Attorney for Property have you named?`;
                  }
                }
                if (question.key === 'client1HasEstateTrustee') {
                  customLabel = `${client1Name}, have you named an Estate Trustee(s) in your Will?`;
                }
                if (question.key === 'client1EstateTrusteeCount') {
                  customLabel = `${client1Name}, how many Estate Trustees have you named?`;
                }
                if (question.key === 'client1HasLivingWill') {
                  customLabel = `${client1Name}, do you have a 'Living Will'? A POA-PC specifies who will look after you if you become incapacitated, a Living Will provides your written instructions about medical care, especially related to things like life support, resuscitation (CPR), feeding tubes, and end-of-life care.`;
                }
                if (question.key === 'client1PoaPropertyHasDocCopy') {
                  customLabel = `${client1Name}, do they have a copy of the most recent document in their files?`;
                }
                if (question.key === 'client1EstateTrusteeHasDocCopy') {
                  customLabel = `${client1Name}, do they have a copy of the most recent document in their files?`;
                }
                if (question.key === 'client2HasPoaPersonalCare') {
                  if (answers['spousesPoaPersonalCare'] === 'yes') {
                    customLabel = `${client2Name}, have you named a contingent Power of Attorney(ies) for Personal Care?`;
                  } else {
                    customLabel = `${client2Name}, have you named a Power of Attorney(ies) for Personal Care?`;
                  }
                }
                if (question.key === 'client2PoaPersonalCareCount') {
                  if (answers['spousesPoaPersonalCare'] === 'yes') {
                    customLabel = `${client2Name}, how many contingent Powers of Attorney for Personal Care have you named?`;
                  } else {
                    customLabel = `${client2Name}, how many Powers of Attorney for Personal Care have you named?`;
                  }
                }
                if (question.key === 'client2HasPoaProperty') {
                  if (answers['spousesPoaProperty'] === 'yes') {
                    customLabel = `${client2Name}, have you named a contingent Power of Attorney(ies) for Property in your Will?`;
                  } else {
                    customLabel = `${client2Name}, have you named a Power of Attorney(ies) for Property in your Will?`;
                  }
                }
                if (question.key === 'client2PoaPropertyCount') {
                  if (answers['spousesPoaProperty'] === 'yes') {
                    customLabel = `${client2Name}, how many contingent Powers of Attorney for Property have you named?`;
                  } else {
                    customLabel = `${client2Name}, how many Powers of Attorney for Property have you named?`;
                  }
                }
                if (question.key === 'client2HasEstateTrustee') {
                  customLabel = `${client2Name}, have you named an Estate Trustee(s) in your Will?`;
                }
                if (question.key === 'client2EstateTrusteeCount') {
                  customLabel = `${client2Name}, how many Estate Trustees have you named?`;
                }
                if (question.key === 'client2PoaPersonalCareHasDocCopy') {
                  customLabel = `${client2Name}, do they have a copy of the most recent document in their files?`;
                }
                if (question.key === 'client2HasLivingWill') {
                  customLabel = `${client2Name}, do you have a 'Living Will'? A POA-PC specifies who will look after you if you become incapacitated, a Living Will provides your written instructions about medical care, especially related to things like life support, resuscitation (CPR), feeding tubes, and end-of-life care.`;
                }
                if (question.key === 'client2PoaPropertyHasDocCopy') {
                  customLabel = `${client2Name}, do they have a copy of the most recent document in their files?`;
                }
                if (question.key === 'client2EstateTrusteeHasWillCopy') {
                  customLabel = `${client2Name}, do the named Estate Trustees have a copy of your most recent Will in their files?`;
                }
                if (question.key === 'client2EstateTrusteeKnowsWillLocation') {
                  customLabel = `${client2Name}, do your Estate Trustees know where to find a copy of your Will?`;
                }

                return (
                  <React.Fragment key={question.key}>
                    <FormField
                      question={{ ...question, label: customLabel }}
                      value={answers[question.key]}
                      onChange={(value) => onAnswerChange(question.key, value)}
                    />
                    {question.key === 'client1HasWill' && answers['client1HasWill'] === 'yes' && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          In what jurisdiction was {client1Name}'s Will prepared?
                        </label>
                        <input
                          type="text"
                          value={answers['client1WillJurisdiction'] || ''}
                          onChange={(e) => onAnswerChange('client1WillJurisdiction', e.target.value)}
                          placeholder="e.g., Ontario, British Columbia, etc."
                          className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    )}
                    {question.key === 'client2HasWill' && answers['client2HasWill'] === 'yes' && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          In what jurisdiction was {client2Name}'s Will prepared?
                        </label>
                        <input
                          type="text"
                          value={answers['client2WillJurisdiction'] || ''}
                          onChange={(e) => onAnswerChange('client2WillJurisdiction', e.target.value)}
                          placeholder="e.g., Ontario, British Columbia, etc."
                          className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    )}
                    {question.key === 'client1PoaPersonalCareCount' && client1PoaPersonalCareCount > 0 && (
                      <div className="space-y-6 mt-6">
                        <h3 className="text-xl font-semibold text-white">
                          {answers['spousesPoaPersonalCare'] === 'yes'
                            ? 'Contingent Powers of Attorney for Personal Care Details'
                            : 'Powers of Attorney for Personal Care Details'}
                        </h3>
                        {Array.from({ length: client1PoaPersonalCareCount }).map((_, index) => (
                          <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                            <h4 className="text-lg font-semibold text-white mb-4">
                              {answers['spousesPoaPersonalCare'] === 'yes'
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
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {question.key === 'client1PoaPropertyCount' && client1PoaPropertyCount > 0 && (
                      <div className="space-y-6 mt-6">
                        <h3 className="text-xl font-semibold text-white">
                          {answers['spousesPoaProperty'] === 'yes'
                            ? 'Contingent Powers of Attorney for Property Details'
                            : 'Powers of Attorney for Property Details'}
                        </h3>
                        {Array.from({ length: client1PoaPropertyCount }).map((_, index) => (
                          <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                            <h4 className="text-lg font-semibold text-white mb-4">
                              {answers['spousesPoaProperty'] === 'yes'
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
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {question.key === 'client2PoaPersonalCareCount' && client2PoaPersonalCareCount > 0 && (
                      <div className="space-y-6 mt-6">
                        <h3 className="text-xl font-semibold text-white">
                          {answers['spousesPoaPersonalCare'] === 'yes'
                            ? `${client2Name}'s Contingent Powers of Attorney for Personal Care Details`
                            : `${client2Name}'s Powers of Attorney for Personal Care Details`}
                        </h3>
                        {Array.from({ length: client2PoaPersonalCareCount }).map((_, index) => (
                          <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                            <h4 className="text-lg font-semibold text-white mb-4">
                              {answers['spousesPoaPersonalCare'] === 'yes'
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
                                  value={client2PoaPersonalCareData[index]?.name || ''}
                                  onChange={(e) => handleClient2PoaPersonalCareChange(index, 'name', e.target.value)}
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
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {question.key === 'client2PoaPropertyCount' && client2PoaPropertyCount > 0 && (
                      <div className="space-y-6 mt-6">
                        <h3 className="text-xl font-semibold text-white">
                          {answers['spousesPoaProperty'] === 'yes'
                            ? `${client2Name}'s Contingent Powers of Attorney for Property Details`
                            : `${client2Name}'s Powers of Attorney for Property Details`}
                        </h3>
                        {Array.from({ length: client2PoaPropertyCount }).map((_, index) => (
                          <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                            <h4 className="text-lg font-semibold text-white mb-4">
                              {answers['spousesPoaProperty'] === 'yes'
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
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}

              {step.id === 6 && client1FinancialAdvisorsCount > 0 && (
                <div className="space-y-6 mt-6">
                  <h3 className="text-xl font-semibold text-white">Your Financial Advisors Details</h3>
                  {Array.from({ length: client1FinancialAdvisorsCount }).map((_, index) => (
                    <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                      <h4 className="text-lg font-semibold text-white mb-4">Financial Advisor #{index + 1}</h4>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Name *
                          </label>
                          <input
                            type="text"
                            value={client1FinancialAdvisorsData[index]?.name || ''}
                            onChange={(e) => handleFinancialAdvisorChange(index, 'name', e.target.value)}
                            placeholder="Enter name"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Firm/Company *
                          </label>
                          <input
                            type="text"
                            value={client1FinancialAdvisorsData[index]?.firm || ''}
                            onChange={(e) => handleFinancialAdvisorChange(index, 'firm', e.target.value)}
                            placeholder="Enter firm/company name"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="text"
                            value={client1FinancialAdvisorsData[index]?.phone || ''}
                            onChange={(e) => handleFinancialAdvisorChange(index, 'phone', e.target.value)}
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
                            value={client1FinancialAdvisorsData[index]?.email || ''}
                            onChange={(e) => handleFinancialAdvisorChange(index, 'email', e.target.value)}
                            placeholder="Enter email address"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {step.id === 6 && client2FinancialAdvisorsCount > 0 && (
                <div className="space-y-6 mt-6">
                  <h3 className="text-xl font-semibold text-white">Spouse's Financial Advisors Details</h3>
                  {Array.from({ length: client2FinancialAdvisorsCount }).map((_, index) => (
                    <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                      <h4 className="text-lg font-semibold text-white mb-4">Financial Advisor #{index + 1}</h4>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Name *
                          </label>
                          <input
                            type="text"
                            value={client2FinancialAdvisorsData[index]?.name || ''}
                            onChange={(e) => handleClient2FinancialAdvisorChange(index, 'name', e.target.value)}
                            placeholder="Enter name"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Firm/Company *
                          </label>
                          <input
                            type="text"
                            value={client2FinancialAdvisorsData[index]?.firm || ''}
                            onChange={(e) => handleClient2FinancialAdvisorChange(index, 'firm', e.target.value)}
                            placeholder="Enter firm/company name"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="text"
                            value={client2FinancialAdvisorsData[index]?.phone || ''}
                            onChange={(e) => handleClient2FinancialAdvisorChange(index, 'phone', e.target.value)}
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

          {step.id === 7 && (() => {
            const basicAnswers = allAnswers?.get(1) || {};
            const hasSpouse = (basicAnswers['maritalStatus'] === 'married' || basicAnswers['maritalStatus'] === 'common_law');
            const client1Name = basicAnswers['fullName'] as string || 'Client 1';
            const client2Name = basicAnswers['spouseName'] as string || 'Client 2';
            const bankingStructure = answers['bankingStructure'];
            const ownsRealEstate = answers['ownsRealEstate'];
            const isPrimaryResidence = answers['isPrimaryResidence'];

            const renderInstitutions = (key: string, count: string, label: string) => {
              const institutionCount = parseInt(answers[count] as string) || 0;
              if (institutionCount === 0) return null;

              const institutionsData = (answers[key] as Array<Record<string, string>>) || Array(Math.max(0, institutionCount || 0)).fill(null).map(() => ({}));

              const handleInstitutionChange = (index: number, value: string) => {
                const updated = [...institutionsData];
                if (!updated[index]) {
                  updated[index] = {};
                }
                updated[index].name = value;
                onAnswerChange(key, updated);
              };

              return (
                <div className="space-y-4 mt-6">
                  <h3 className="text-md font-semibold text-white">{label}</h3>
                  {Array.from({ length: institutionCount }).map((_, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Institution {index + 1} Name:
                      </label>
                      <input
                        type="text"
                        value={institutionsData[index]?.name || ''}
                        onChange={(e) => handleInstitutionChange(index, e.target.value)}
                        placeholder="e.g., TD Bank, RBC, Scotiabank"
                        className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              );
            };

            return (
              <>
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

                  if (question.key === 'primaryResidenceOwner' && ownsRealEstate !== 'yes') {
                    return null;
                  }
                  if (question.key === 'isPrimaryResidence' && ownsRealEstate !== 'yes') {
                    return null;
                  }
                  if (question.key === 'isSameAddressAsBeginning' && isPrimaryResidence !== 'yes') {
                    return null;
                  }
                  if (question.key === 'hasAdditionalRealEstate' && (ownsRealEstate !== 'yes' || isPrimaryResidence !== 'yes')) {
                    return null;
                  }
                  if (question.key === 'additionalPropertiesCount' && answers['hasAdditionalRealEstate'] !== 'yes') {
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
                    if (answers['hasAdditionalRealEstate'] !== 'yes') {
                      return null;
                    }

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
                                <h3 className="text-lg font-semibold text-white mb-4">Additional Property {index + 1}</h3>
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
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Who is the named owner of this property?
                                    </label>
                                    <select
                                      value={propertiesData[index]?.propertyOwner || ''}
                                      onChange={(e) => handlePropertyChange(index, 'propertyOwner', e.target.value)}
                                      className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                      <option value="">Select owner</option>
                                      {ownerOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                      Is there anyone else who has ownership of the property?
                                    </label>
                                    <div className="flex gap-4">
                                      <label className="flex items-center">
                                        <input
                                          type="radio"
                                          name={`additional-owners-${index}`}
                                          value="yes"
                                          checked={propertiesData[index]?.hasAdditionalOwners === 'yes'}
                                          onChange={(e) => handlePropertyChange(index, 'hasAdditionalOwners', e.target.value)}
                                          className="mr-2"
                                        />
                                        <span className="text-gray-300">Yes</span>
                                      </label>
                                      <label className="flex items-center">
                                        <input
                                          type="radio"
                                          name={`additional-owners-${index}`}
                                          value="no"
                                          checked={propertiesData[index]?.hasAdditionalOwners === 'no'}
                                          onChange={(e) => handlePropertyChange(index, 'hasAdditionalOwners', e.target.value)}
                                          className="mr-2"
                                        />
                                        <span className="text-gray-300">No</span>
                                      </label>
                                    </div>
                                  </div>
                                  {propertiesData[index]?.hasAdditionalOwners === 'yes' && (
                                    <div>
                                      <label className="block text-sm font-medium text-gray-300 mb-2">
                                        How many TOTAL parties own the property?
                                      </label>
                                      <select
                                        value={propertiesData[index]?.additionalOwnersCount || ''}
                                        onChange={(e) => handlePropertyChange(index, 'additionalOwnersCount', e.target.value)}
                                        className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      >
                                        <option value="">Select number</option>
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                          <option key={num} value={num}>{num}</option>
                                        ))}
                                      </select>
                                    </div>
                                  )}
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
                    <h3 className="text-lg font-semibold text-white mb-4">Child {index + 1}</h3>

                    <div className="space-y-4">
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
                            <div className="flex gap-4">
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

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Are they disabled?
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
                      </div>
                    </div>

                    {childrenData[index]?.disabled === 'yes' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Do they qualify for the disability tax credit?
                        </label>
                        <div className="flex gap-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`disabilityTaxCredit-${index}`}
                              value="yes"
                              checked={childrenData[index]?.disabilityTaxCredit === 'yes'}
                              onChange={(e) => handleChildChange(index, 'disabilityTaxCredit', e.target.value)}
                              className="mr-2"
                            />
                            <span className="text-gray-300">Yes</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`disabilityTaxCredit-${index}`}
                              value="no"
                              checked={childrenData[index]?.disabilityTaxCredit === 'no'}
                              onChange={(e) => handleChildChange(index, 'disabilityTaxCredit', e.target.value)}
                              className="mr-2"
                            />
                            <span className="text-gray-300">No</span>
                          </label>
                        </div>
                      </div>
                    )}

                    {childrenData[index]?.disabilityTaxCredit === 'yes' && (
                      <div className="space-y-4 mt-4 p-4 bg-gray-600 rounded">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Nature of the disability and severity
                          </label>
                          <textarea
                            value={childrenData[index]?.disabilityNature || ''}
                            onChange={(e) => handleChildChange(index, 'disabilityNature', e.target.value)}
                            placeholder="Describe the nature and severity of the disability"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Care and assistance provided
                          </label>
                          <textarea
                            value={childrenData[index]?.disabilityCare || ''}
                            onChange={(e) => handleChildChange(index, 'disabilityCare', e.target.value)}
                            placeholder="Describe the care and assistance provided"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Key contacts and support including a description of their roles
                          </label>
                          <textarea
                            value={childrenData[index]?.disabilityContacts || ''}
                            onChange={(e) => handleChildChange(index, 'disabilityContacts', e.target.value)}
                            placeholder="Describe key contacts and their roles"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Other information that would assist a potential guardian
                          </label>
                          <textarea
                            value={childrenData[index]?.disabilityOther || ''}
                            onChange={(e) => handleChildChange(index, 'disabilityOther', e.target.value)}
                            placeholder="Any other information that would be helpful"
                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={3}
                          />
                        </div>
                      </div>
                    )}

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

{childrenData[index]?.independent !== 'yes' && (
                      <>
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

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Do they have any past or current medical issues or needs?
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

                        <div className="mt-6 pt-6 border-t border-gray-600">
                          <h4 className="text-md font-semibold text-white mb-2">Digital Identity and Access</h4>
                          <p className="text-sm text-gray-400 mb-4">
                            Modern parenting includes school portals, social accounts and gaming platforms that guardians must manage. Provide the information that you believe would best assist a potential guardian:
                          </p>
                          <div className="text-xs text-gray-400 italic mb-2">
                            Note: Detailed access information will be captured in the PDF form
                          </div>
                        </div>
                      </>
                    )}

                    <div className="mt-6 pt-6 border-t border-gray-600">
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

                          {childrenData[index]?.provinceTerritory && ['Alberta', 'Manitoba', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'].includes(childrenData[index]?.provinceTerritory) && (
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Is this child over the age of 18?
                              </label>
                              <div className="flex gap-4">
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name={`overAgeMajority-${index}`}
                                    value="yes"
                                    checked={childrenData[index]?.overAgeMajority === 'yes'}
                                    onChange={(e) => handleChildChange(index, 'overAgeMajority', e.target.value)}
                                    className="mr-2"
                                  />
                                  <span className="text-gray-300">Yes</span>
                                </label>
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name={`overAgeMajority-${index}`}
                                    value="no"
                                    checked={childrenData[index]?.overAgeMajority === 'no'}
                                    onChange={(e) => handleChildChange(index, 'overAgeMajority', e.target.value)}
                                    className="mr-2"
                                  />
                                  <span className="text-gray-300">No</span>
                                </label>
                              </div>
                            </div>
                          )}

                          {childrenData[index]?.provinceTerritory && ['British Columbia', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Northwest Territories', 'Nunavut', 'Yukon'].includes(childrenData[index]?.provinceTerritory) && (
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Is this child over the age of 19?
                              </label>
                              <div className="flex gap-4">
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name={`overAgeMajority-${index}`}
                                    value="yes"
                                    checked={childrenData[index]?.overAgeMajority === 'yes'}
                                    onChange={(e) => handleChildChange(index, 'overAgeMajority', e.target.value)}
                                    className="mr-2"
                                  />
                                  <span className="text-gray-300">Yes</span>
                                </label>
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name={`overAgeMajority-${index}`}
                                    value="no"
                                    checked={childrenData[index]?.overAgeMajority === 'no'}
                                    onChange={(e) => handleChildChange(index, 'overAgeMajority', e.target.value)}
                                    className="mr-2"
                                  />
                                  <span className="text-gray-300">No</span>
                                </label>
                              </div>
                            </div>
                          )}
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
                              onChange={(e) => handleChildChange(index, 'hasChildren', e.target.value)}
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
                                <div key={gcIndex}>
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
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            );
          })()}

          {step.id === 11 && (() => {
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

          {step.id === 8 && (
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

          {step.id === 9 && (
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

          {step.id === 10 && (
            <>
              {step.questions.map((question) => {
                const basicAnswers = allAnswers?.get(1) || {};
                const hasSpouse = (basicAnswers['maritalStatus'] === 'married' || basicAnswers['maritalStatus'] === 'common_law');
                const client1Name = basicAnswers['fullName'] as string || 'you';
                const client2Name = basicAnswers['spouseName'] as string || 'your spouse';

                if (question.key === 'hasAdditionalProperties' && answers['hasHomeInsurance'] !== 'yes') {
                  return null;
                }
                if (question.key === 'additionalPropertiesCount' && answers['hasAdditionalProperties'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2HasVehicleInsurance' && !hasSpouse) {
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

          <div className="flex justify-between items-center pt-6 border-t border-gray-600">
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
        </form>
      </div>
    </div>
  );
}
