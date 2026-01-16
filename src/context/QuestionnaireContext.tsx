import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type Answer = Record<string, unknown>;

type Questionnaire = {
  id: string;
  current_step: number;
  status: 'in_progress' | 'completed';
  created_at: string;
  updated_at: string;
};

type QuestionnaireContextType = {
  questionnaire: Questionnaire | null;
  answers: Map<number, Answer>;
  currentStep: number;
  loading: boolean;
  error: string | null;
  initQuestionnaire: (questionnaireId?: string) => Promise<void>;
  updateAnswer: (step: number, key: string, value: unknown) => void;
  saveAnswers: (step: number) => Promise<void>;
  nextStep: () => Promise<void>;
  previousStep: () => void;
  completeQuestionnaire: () => Promise<void>;
};

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

const STORAGE_KEY = 'willprep_questionnaire';
const ANSWERS_KEY = 'willprep_answers';

export function QuestionnaireProvider({ children }: { children: ReactNode }) {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
  const [answers, setAnswers] = useState<Map<number, Answer>>(new Map());
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initQuestionnaire = useCallback(async (questionnaireId?: string) => {
    setLoading(true);
    setError(null);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const storedAnswers = localStorage.getItem(ANSWERS_KEY);

      if (stored) {
        const q: Questionnaire = JSON.parse(stored);
        setQuestionnaire(q);
        setCurrentStep(q.current_step);

        if (storedAnswers) {
          const answersData = JSON.parse(storedAnswers);
          const answersMap = new Map<number, Answer>();
          Object.entries(answersData).forEach(([step, stepAnswers]) => {
            answersMap.set(parseInt(step), stepAnswers as Answer);
          });
          setAnswers(answersMap);
        }
      } else {
        const newQuestionnaire: Questionnaire = {
          id: crypto.randomUUID(),
          current_step: 1,
          status: 'in_progress',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newQuestionnaire));
        setQuestionnaire(newQuestionnaire);
        setCurrentStep(1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAnswer = useCallback((step: number, key: string, value: unknown) => {
    setAnswers((prev) => {
      const updated = new Map(prev);
      if (!updated.has(step)) {
        updated.set(step, {});
      }
      updated.get(step)![key] = value;
      return updated;
    });
  }, []);

  const saveAnswers = useCallback(
    async (step: number) => {
      if (!questionnaire) return;

      setLoading(true);
      setError(null);
      try {
        const answersObj: Record<number, Answer> = {};
        answers.forEach((value, key) => {
          answersObj[key] = value;
        });
        localStorage.setItem(ANSWERS_KEY, JSON.stringify(answersObj));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save answers');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [questionnaire, answers]
  );

  const nextStep = useCallback(async () => {
    if (!questionnaire) return;

    await saveAnswers(currentStep);

    const newStep = currentStep + 1;
    setCurrentStep(newStep);

    const updated = {
      ...questionnaire,
      current_step: newStep,
      updated_at: new Date().toISOString(),
    };
    setQuestionnaire(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, [questionnaire, currentStep, saveAnswers]);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  }, []);

  const completeQuestionnaire = useCallback(async () => {
    if (!questionnaire) return;

    await saveAnswers(currentStep);

    const updated = {
      ...questionnaire,
      status: 'completed' as const,
      current_step: currentStep,
      updated_at: new Date().toISOString(),
    };
    setQuestionnaire(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, [questionnaire, currentStep, saveAnswers]);

  return (
    <QuestionnaireContext.Provider
      value={{
        questionnaire,
        answers,
        currentStep,
        loading,
        error,
        initQuestionnaire,
        updateAnswer,
        saveAnswers,
        nextStep,
        previousStep,
        completeQuestionnaire,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaire() {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire must be used within QuestionnaireProvider');
  }
  return context;
}
