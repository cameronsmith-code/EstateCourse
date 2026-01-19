import { useState, FormEvent } from 'react';
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

    if (step.id === 2) {
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

  const handleChildChange = (index: number, field: string, value: string) => {
    const updated = [...childrenData];
    if (!updated[index]) {
      updated[index] = {};
    }
    updated[index][field] = value;
    onAnswerChange('childrenData', updated);
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

          {step.id === 3 && (
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

          {step.id === 4 && (
            <>
              {step.questions.map((question) => {
                const basicAnswers = allAnswers?.get(1) || {};
                const hasSpouse = basicAnswers['hasSpouse'] === 'yes';
                const client1Name = basicAnswers['fullName'] as string || 'you';
                const client2Name = basicAnswers['spouseName'] as string || 'your spouse';
                const bankingStructure = answers['bankingStructure'];

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

          {step.id === 2 && childCount > 0 && (
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
                  </div>
                </div>
              ))}
            </div>
          )}

          {step.id === 5 && (
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
                        </div>

                        {index === debtsData.length - 1 && (
                          <div className="mt-6 pt-6 border-t border-gray-600">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Do you have any other outstanding debts or credit cards?
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
            </>
          )}

          {step.id === 6 && (
            <>
              {step.questions.map((question) => {
                const basicAnswers = allAnswers?.get(1) || {};
                const hasSpouse = basicAnswers['hasSpouse'] === 'yes';
                const client1Name = basicAnswers['fullName'] as string || 'you';
                const client2Name = basicAnswers['spouseName'] as string || 'your spouse';

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
