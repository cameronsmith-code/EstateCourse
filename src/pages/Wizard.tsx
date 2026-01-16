import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionnaire } from '../context/QuestionnaireContext';
import { STEPS } from '../lib/steps';
import StepForm from '../components/StepForm';
import ProgressBar from '../components/ProgressBar';
import { FileText, Loader2 } from 'lucide-react';

export default function Wizard() {
  const navigate = useNavigate();
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

  if (loading && !questionnaire) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading questionnaire...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => initQuestionnaire()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-yellow-800">Step not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <FileText className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Estate Planning Questionnaire</h1>
        </div>
        <p className="text-gray-600">
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
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <p className="text-green-800 font-medium">
            Questionnaire completed! All your answers have been saved.
          </p>
        </div>
      )}
    </div>
  );
}
