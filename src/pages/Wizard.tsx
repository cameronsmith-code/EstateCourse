import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionnaire } from '../context/QuestionnaireContext';
import { STEPS } from '../lib/steps';
import StepForm from '../components/StepForm';
import ProgressBar from '../components/ProgressBar';
import { FileText, Loader2, Trash2 } from 'lucide-react';

export default function Wizard() {
  const navigate = useNavigate();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const {
    questionnaire,
    answers,
    currentStep,
    loading,
    error,
    initQuestionnaire,
    updateAnswer,
    nextStep,
    previousStep,
    completeQuestionnaire,
    clearAllAnswers,
  } = useQuestionnaire();

  useEffect(() => {
    initQuestionnaire();
  }, [initQuestionnaire]);

  const currentStepData = STEPS.find((s) => s.id === currentStep);
  const currentAnswers = answers.get(currentStep) || {};

  const handleNext = async () => {
    if (currentStep === STEPS.length) {
      await completeQuestionnaire();
      navigate('/completion');
    } else {
      await nextStep();
    }
  };

  const handleClearAll = async () => {
    await clearAllAnswers();
    setShowClearConfirm(false);
  };

  if (loading && !questionnaire) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading questionnaire...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-900 border border-red-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-300 mb-2">Error</h2>
          <p className="text-red-200">{error}</p>
          <button
            onClick={() => initQuestionnaire()}
            className="mt-4 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!currentStepData) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-6">
          <p className="text-yellow-200">Step not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-blue-400 mr-3" />
            <h1 className="text-3xl font-bold text-white">Estate Planning Questionnaire</h1>
          </div>
          <button
            onClick={() => setShowClearConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear All Answers
          </button>
        </div>
        <p className="text-gray-400">
          Answer a few quick questions to generate your personalized fillable PDF.
        </p>
      </div>

      <ProgressBar currentStep={currentStep} totalSteps={STEPS.length} />

      <StepForm
        step={currentStepData}
        answers={currentAnswers}
        allAnswers={answers}
        isFirstStep={currentStep === 1}
        isLastStep={currentStep === STEPS.length}
        onNext={handleNext}
        onPrevious={previousStep}
        onAnswerChange={(key, value) => updateAnswer(currentStep, key, value)}
      />

      {questionnaire?.status === 'completed' && (
        <div className="bg-green-900 border border-green-700 rounded-lg p-6">
          <p className="text-green-300 font-medium">
            Questionnaire completed! All your answers have been saved.
          </p>
        </div>
      )}

      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-white mb-4">Clear All Answers?</h2>
            <p className="text-gray-300 mb-6">
              This will delete all your answers and reset the questionnaire to step 1. This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
