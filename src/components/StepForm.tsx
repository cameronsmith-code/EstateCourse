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
    } else {
      const requiredQuestions = step.questions.filter((q) => q.required);
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
  const childrenData = (answers['childrenData'] as Array<Record<string, string>>) || Array(childCount).fill(null).map(() => ({}));

  const client1NumberOfPreviousRelationships = allAnswers?.get(1)?.['client1NumberOfPreviousRelationships'];
  const client1PrevRelCount = client1NumberOfPreviousRelationships ? parseInt(client1NumberOfPreviousRelationships as string) : 0;
  const client1PreviousRelationshipsData = (answers['client1PreviousRelationshipsData'] as Array<Record<string, string>>) || Array(client1PrevRelCount).fill(null).map(() => ({}));

  const client2NumberOfPreviousRelationships = allAnswers?.get(1)?.['client2NumberOfPreviousRelationships'];
  const client2PrevRelCount = client2NumberOfPreviousRelationships ? parseInt(client2NumberOfPreviousRelationships as string) : 0;
  const client2PreviousRelationshipsData = (answers['client2PreviousRelationshipsData'] as Array<Record<string, string>>) || Array(client2PrevRelCount).fill(null).map(() => ({}));

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
                if (question.key === 'spouseName' && answers['hasSpouse'] !== 'yes') {
                  return null;
                }
                if (question.key === 'hasMarriageContract' && answers['hasSpouse'] !== 'yes') {
                  return null;
                }
                if (question.key === 'marriageContractLocation' && (answers['hasSpouse'] !== 'yes' || answers['hasMarriageContract'] !== 'yes')) {
                  return null;
                }
                if (question.key === 'spouseSameAddress' && answers['hasSpouse'] !== 'yes') {
                  return null;
                }
                if (question.key === 'spouseDateOfBirth' && answers['hasSpouse'] !== 'yes') {
                  return null;
                }
                if (
                  (question.key === 'spouseAddress' ||
                    question.key === 'spouseCity' ||
                    question.key === 'spouseProvince' ||
                    question.key === 'spousePostalCode') &&
                  (answers['hasSpouse'] !== 'yes' || answers['spouseSameAddress'] === 'yes')
                ) {
                  return null;
                }
                if (question.key === 'spouseEmail' && answers['hasSpouse'] !== 'yes') {
                  return null;
                }
                if (question.key === 'spousePhone' && answers['hasSpouse'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client1NumberOfPreviousRelationships' && answers['client1HasPreviousRelationship'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2HasPreviousRelationship' && answers['hasSpouse'] !== 'yes') {
                  return null;
                }
                if (question.key === 'client2NumberOfPreviousRelationships' && (answers['hasSpouse'] !== 'yes' || answers['client2HasPreviousRelationship'] !== 'yes')) {
                  return null;
                }
                if (question.key === 'numberOfChildren' && answers['hasChildren'] !== 'yes') {
                  return null;
                }
                if (
                  (question.key === 'sameMedicalDoctor' ||
                    question.key === 'sameDentist' ||
                    question.key === 'sameOrthodontist') &&
                  answers['hasChildren'] !== 'yes'
                ) {
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
            </>
          )}

          {step.id === 4 && (
            <>
              {step.questions.map((question) => {
                const basicAnswers = allAnswers?.get(1) || {};
                const hasSpouse = basicAnswers['hasSpouse'] === 'yes';
                const client1Name = basicAnswers['fullName'] as string || 'you';
                const client2Name = basicAnswers['spouseName'] as string || 'your spouse';

                if (question.key === 'client2HasWill' && !hasSpouse) {
                  return null;
                }
                if (question.key === 'client2UsesAccountant' && !hasSpouse) {
                  return null;
                }
                if (question.key === 'willsSameLawyer' && !(answers['client1HasWill'] === 'yes' && answers['client2HasWill'] === 'yes')) {
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
                if (question.key === 'client2HasWill') {
                  customLabel = `Does ${client2Name} have a Will?`;
                }
                if (question.key === 'client1UsesAccountant') {
                  customLabel = `Do you (${client1Name}) use a professional accountant?`;
                }
                if (question.key === 'client2UsesAccountant') {
                  customLabel = `Does ${client2Name} use a professional accountant?`;
                }
                if (question.key === 'client1FinancialAdvisors') {
                  customLabel = `${client1Name}, how many Financial Advisors do you work with?`;
                }
                if (question.key === 'client2FinancialAdvisors') {
                  customLabel = `${client2Name}, how many Financial Advisors do you work with?`;
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
                          In what jurisdiction was {client1Name}'s will prepared?
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
                          In what jurisdiction was {client2Name}'s will prepared?
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
                  </React.Fragment>
                );
              })}
            </>
          )}

          {step.id === 5 && (
            <>
              {step.questions.map((question) => {
                const basicAnswers = allAnswers?.get(1) || {};
                const hasSpouse = basicAnswers['hasSpouse'] === 'yes';
                const client1Name = basicAnswers['fullName'] as string || 'Client 1';
                const client2Name = basicAnswers['spouseName'] as string || 'Client 2';
                const bankingStructure = answers['bankingStructure'];
                const ownsRealEstate = answers['ownsRealEstate'];
                const isPrimaryResidence = answers['isPrimaryResidence'];

                if (question.key === 'bankingStructure' && !hasSpouse) {
                  return null;
                }

                if (question.key === 'jointBankCount' && bankingStructure !== 'joint') {
                  return null;
                }

                if (question.key === 'client1BankCount') {
                  if (hasSpouse && bankingStructure !== 'individual') {
                    return null;
                  }
                  if (!hasSpouse) {
                    return (
                      <FormField
                        key={question.key}
                        question={question}
                        value={answers[question.key]}
                        onChange={(value) => onAnswerChange(question.key, value)}
                      />
                    );
                  }
                  if (bankingStructure === 'individual') {
                    return (
                      <FormField
                        key={question.key}
                        question={{ ...question, label: `${client1Name}, how many banks, trust companies or credit unions do you have accounts with?` }}
                        value={answers[question.key]}
                        onChange={(value) => onAnswerChange(question.key, value)}
                      />
                    );
                  }
                  return null;
                }

                if (question.key === 'client2BankCount') {
                  if (!hasSpouse || bankingStructure !== 'individual') {
                    return null;
                  }
                  return (
                    <FormField
                      key={question.key}
                      question={{ ...question, label: `${client2Name}, how many banks, trust companies or credit unions do you have accounts with?` }}
                      value={answers[question.key]}
                      onChange={(value) => onAnswerChange(question.key, value)}
                    />
                  );
                }

                if (question.key === 'mixedJointBankCount' && bankingStructure !== 'mixed') {
                  return null;
                }

                if (question.key === 'mixedClient1BankCount') {
                  if (bankingStructure !== 'mixed') {
                    return null;
                  }
                  return (
                    <FormField
                      key={question.key}
                      question={{ ...question, label: `${client1Name}, how many individually held accounts do you have?` }}
                      value={answers[question.key]}
                      onChange={(value) => onAnswerChange(question.key, value)}
                    />
                  );
                }

                if (question.key === 'mixedClient2BankCount') {
                  if (bankingStructure !== 'mixed') {
                    return null;
                  }
                  return (
                    <FormField
                      key={question.key}
                      question={{ ...question, label: `${client2Name}, how many individually held accounts do you have?` }}
                      value={answers[question.key]}
                      onChange={(value) => onAnswerChange(question.key, value)}
                    />
                  );
                }

                if (question.key === 'primaryResidenceOwner' && ownsRealEstate !== 'yes') {
                  return null;
                }
                if (question.key === 'isPrimaryResidence' && ownsRealEstate !== 'yes') {
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

                return (
                  <FormField
                    key={question.key}
                    question={question}
                    value={answers[question.key]}
                    onChange={(value) => onAnswerChange(question.key, value)}
                  />
                );
              })}

              {answers['hasAdditionalRealEstate'] === 'yes' && (() => {
                const basicAnswers = allAnswers?.get(1) || {};
                const hasSpouse = basicAnswers['hasSpouse'] === 'yes';
                const client1Name = basicAnswers['fullName'] as string || 'Client 1';
                const client2Name = basicAnswers['spouseName'] as string || 'Client 2';

                const propertyCount = parseInt(answers['additionalPropertiesCount'] as string) || 0;
                const propertiesData = (answers['propertiesData'] as Array<Record<string, string>>) || Array(propertyCount).fill(null).map(() => ({}));

                const handlePropertyChange = (index: number, field: string, value: string) => {
                  const updated = [...propertiesData];
                  if (!updated[index]) {
                    updated[index] = {};
                  }
                  updated[index][field] = value;
                  onAnswerChange('propertiesData', updated);
                };

                const ownerOptions = [
                  { value: 'joint_survivorship', label: 'Jointly with right of survivorship' },
                  { value: 'joint_tenants', label: 'Jointly as tenants in common' },
                  { value: 'client1', label: client1Name },
                  { value: 'trust', label: 'a Trust' },
                  { value: 'corporation', label: 'a Corporation' },
                  { value: 'other', label: 'Other' },
                ];
                if (hasSpouse) {
                  ownerOptions.splice(3, 0, { value: 'client2', label: client2Name });
                }

                return (
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
                              <option value="Vacation Home">Vacation Home</option>
                              <option value="Rental Property">Rental Property</option>
                              <option value="Business/Commercial Property">Business/Commercial Property</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Who is it owned by?
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

                          {propertiesData[index]?.propertyOwner === 'trust' && (
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Trust Name
                              </label>
                              <input
                                type="text"
                                value={propertiesData[index]?.trustName || ''}
                                onChange={(e) => handlePropertyChange(index, 'trustName', e.target.value)}
                                placeholder="Enter trust name"
                                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          )}

                          {propertiesData[index]?.propertyOwner === 'corporation' && (
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Corporation Name
                              </label>
                              <input
                                type="text"
                                value={propertiesData[index]?.corporationName || ''}
                                onChange={(e) => handlePropertyChange(index, 'corporationName', e.target.value)}
                                placeholder="Enter corporation name"
                                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          )}

                          {propertiesData[index]?.propertyOwner === 'other' && (
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Additional Details
                              </label>
                              <input
                                type="text"
                                value={propertiesData[index]?.otherDetails || ''}
                                onChange={(e) => handlePropertyChange(index, 'otherDetails', e.target.value)}
                                placeholder="Enter additional details"
                                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          )}

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Does anyone outside of {client1Name} or {client2Name} have ownership in this property?
                            </label>
                            <div className="flex gap-4">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name={`hasAdditionalOwners-${index}`}
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
                                  name={`hasAdditionalOwners-${index}`}
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
                                How many people in total share ownership in this property?
                              </label>
                              <input
                                type="number"
                                value={propertiesData[index]?.additionalOwnersCount || ''}
                                onChange={(e) => handlePropertyChange(index, 'additionalOwnersCount', e.target.value)}
                                placeholder="0"
                                min="0"
                                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </>
          )}

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
            const hasSpouse = basicAnswers['hasSpouse'] === 'yes';

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
                    </div>
                  </div>
                </div>
              ))}
            </div>
            );
          })()}

          {step.id === 6 && (
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
                const hasSpouse = basicAnswers['hasSpouse'] === 'yes';
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
                              const newData = Array(count).fill(null).map((_, i) => creditCardsData[i] || {});
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
                const hasSpouse = basicAnswers['hasSpouse'] === 'yes';
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
                              const newData = Array(count).fill(null).map((_, i) => client2CreditCardsData[i] || {});
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

          {step.id === 7 && (
            <>
              {step.questions.map((question) => {
                const basicAnswers = allAnswers?.get(1) || {};
                const hasSpouse = basicAnswers['hasSpouse'] === 'yes';
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

          {step.id === 8 && (
            <>
              {step.questions.map((question) => {
                const basicAnswers = allAnswers?.get(1) || {};
                const hasSpouse = basicAnswers['hasSpouse'] === 'yes';
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

          {step.id === 9 && (
            <>
              {step.questions.map((question) => {
                if (question.key === 'corporationCount' && answers['hasCorporation'] !== 'yes') {
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
            </>
          )}

          {step.id === 10 && (
            <>
              {step.questions.map((question) => {
                if (question.key === 'familyTrustCount' && answers['hasFamilyTrust'] !== 'yes') {
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

              {answers['hasFamilyTrust'] === 'yes' && (() => {
                const trustCount = parseInt(answers['familyTrustCount'] as string) || 0;
                const trustsData = (answers['trustsData'] as Array<Record<string, string>>) || Array(trustCount).fill(null).map(() => ({}));

                const handleTrustChange = (index: number, field: string, value: string) => {
                  const updated = [...trustsData];
                  if (!updated[index]) {
                    updated[index] = {};
                  }
                  updated[index][field] = value;
                  onAnswerChange('trustsData', updated);
                };

                return (
                  <div className="space-y-8 mt-6">
                    {Array.from({ length: trustCount }).map((_, index) => (
                      <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                        <h3 className="text-lg font-semibold text-white mb-4">Trust {index + 1}</h3>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              What is the trust's legal name? *
                            </label>
                            <input
                              type="text"
                              value={trustsData[index]?.trustName || ''}
                              onChange={(e) => handleTrustChange(index, 'trustName', e.target.value)}
                              placeholder="Enter trust's legal name"
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Where is the Trust Deed Located? *
                            </label>
                            <input
                              type="text"
                              value={trustsData[index]?.deedLocation || ''}
                              onChange={(e) => handleTrustChange(index, 'deedLocation', e.target.value)}
                              placeholder="Enter trust deed location"
                              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </>
          )}

          {step.id === 11 && (() => {
            const basicAnswers = allAnswers?.get(1) || {};
            const hasSpouse = basicAnswers['hasSpouse'] === 'yes';
            const client1Name = basicAnswers['fullName'] as string || 'Client 1';
            const client2Name = basicAnswers['spouseName'] as string || 'Client 2';
            const client1IsBeneficiary = answers['client1IsTrustBeneficiary'];
            const client2IsBeneficiary = answers['client2IsTrustBeneficiary'];

            return (
              <>
                <FormField
                  key="client1IsTrustBeneficiary"
                  question={{
                    ...step.questions[0],
                    label: `${client1Name}, are you the beneficiary of a Trust?`
                  }}
                  value={answers['client1IsTrustBeneficiary']}
                  onChange={(value) => onAnswerChange('client1IsTrustBeneficiary', value)}
                />

                {client1IsBeneficiary === 'yes' && (
                  <>
                    <FormField
                      key="client1BeneficiaryTrustCount"
                      question={{
                        ...step.questions[1],
                        label: `${client1Name}, how many trusts are you the beneficiary of?`
                      }}
                      value={answers['client1BeneficiaryTrustCount']}
                      onChange={(value) => onAnswerChange('client1BeneficiaryTrustCount', value)}
                    />

                    {(() => {
                      const trustCount = parseInt(answers['client1BeneficiaryTrustCount'] as string) || 0;
                      const trustsData = (answers['client1BeneficiaryTrustsData'] as Array<Record<string, string>>) || Array(trustCount).fill(null).map(() => ({}));

                      const handleTrustChange = (index: number, field: string, value: string) => {
                        const updated = [...trustsData];
                        if (!updated[index]) {
                          updated[index] = {};
                        }
                        updated[index][field] = value;
                        onAnswerChange('client1BeneficiaryTrustsData', updated);
                      };

                      return (
                        <div className="space-y-8 mt-6">
                          <h3 className="text-lg font-semibold text-white mb-4">{client1Name} - Beneficiary Trusts</h3>
                          {Array.from({ length: trustCount }).map((_, index) => (
                            <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                              <h4 className="text-md font-semibold text-white mb-4">Trust {index + 1}</h4>

                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2">
                                    What is the legal name of the trust? *
                                  </label>
                                  <input
                                    type="text"
                                    value={trustsData[index]?.trustName || ''}
                                    onChange={(e) => handleTrustChange(index, 'trustName', e.target.value)}
                                    placeholder="Enter trust's legal name"
                                    className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Location of the Trust Deed *
                                  </label>
                                  <input
                                    type="text"
                                    value={trustsData[index]?.deedLocation || ''}
                                    onChange={(e) => handleTrustChange(index, 'deedLocation', e.target.value)}
                                    placeholder="Enter trust deed location"
                                    className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </>
                )}

                {hasSpouse && (
                  <>
                    <FormField
                      key="client2IsTrustBeneficiary"
                      question={{
                        ...step.questions[2],
                        label: `${client2Name}, are you the beneficiary of a Trust?`
                      }}
                      value={answers['client2IsTrustBeneficiary']}
                      onChange={(value) => onAnswerChange('client2IsTrustBeneficiary', value)}
                    />

                    {client2IsBeneficiary === 'yes' && (
                      <>
                        <FormField
                          key="client2BeneficiaryTrustCount"
                          question={{
                            ...step.questions[3],
                            label: `${client2Name}, how many trusts are you the beneficiary of?`
                          }}
                          value={answers['client2BeneficiaryTrustCount']}
                          onChange={(value) => onAnswerChange('client2BeneficiaryTrustCount', value)}
                        />

                        {(() => {
                          const trustCount = parseInt(answers['client2BeneficiaryTrustCount'] as string) || 0;
                          const trustsData = (answers['client2BeneficiaryTrustsData'] as Array<Record<string, string>>) || Array(trustCount).fill(null).map(() => ({}));

                          const handleTrustChange = (index: number, field: string, value: string) => {
                            const updated = [...trustsData];
                            if (!updated[index]) {
                              updated[index] = {};
                            }
                            updated[index][field] = value;
                            onAnswerChange('client2BeneficiaryTrustsData', updated);
                          };

                          return (
                            <div className="space-y-8 mt-6">
                              <h3 className="text-lg font-semibold text-white mb-4">{client2Name} - Beneficiary Trusts</h3>
                              {Array.from({ length: trustCount }).map((_, index) => (
                                <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700">
                                  <h4 className="text-md font-semibold text-white mb-4">Trust {index + 1}</h4>

                                  <div className="space-y-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-300 mb-2">
                                        What is the legal name of the trust? *
                                      </label>
                                      <input
                                        type="text"
                                        value={trustsData[index]?.trustName || ''}
                                        onChange={(e) => handleTrustChange(index, 'trustName', e.target.value)}
                                        placeholder="Enter trust's legal name"
                                        className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Location of the Trust Deed *
                                      </label>
                                      <input
                                        type="text"
                                        value={trustsData[index]?.deedLocation || ''}
                                        onChange={(e) => handleTrustChange(index, 'deedLocation', e.target.value)}
                                        placeholder="Enter trust deed location"
                                        className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </>
                    )}
                  </>
                )}
              </>
            );
          })()}

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
