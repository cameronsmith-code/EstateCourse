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
        <div className="flex items-center mb-4">
          <FileText className="w-8 h-8 text-blue-400 mr-3" />
          <h1 className="text-3xl font-bold text-white">Estate Planning Questionnaire</h1>
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
    </div>
  );
}
