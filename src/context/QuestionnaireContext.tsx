import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

type Answer = Record<string, unknown>;

type Questionnaire = {
  id: string;
  session_id?: string;
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
const SESSION_KEY = 'willprep_session_id';

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
      let sessionId = localStorage.getItem(SESSION_KEY);
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem(SESSION_KEY, sessionId);
      }

      let loadedQuestionnaire: Questionnaire | null = null;
      let loadedAnswers: Map<number, Answer> = new Map();

      try {
        const { data: dbQuestionnaire } = await supabase
          .from('questionnaires')
          .select('*')
          .eq('session_id', sessionId)
          .maybeSingle();

        if (dbQuestionnaire) {
          loadedQuestionnaire = dbQuestionnaire as Questionnaire;

          const { data: dbAnswers } = await supabase
            .from('questionnaire_answers')
            .select('*')
            .eq('questionnaire_id', dbQuestionnaire.id);

          if (dbAnswers && dbAnswers.length > 0) {
            dbAnswers.forEach((ans) => {
              const step = ans.step;
              if (!loadedAnswers.has(step)) {
                loadedAnswers.set(step, {});
              }
              loadedAnswers.get(step)![ans.question_key] = ans.answer;
            });
          }
        }
      } catch (dbErr) {
        console.warn('Failed to load from database, using localStorage:', dbErr);
      }

      if (!loadedQuestionnaire) {
        const stored = localStorage.getItem(STORAGE_KEY);
        const storedAnswers = localStorage.getItem(ANSWERS_KEY);

        if (stored) {
          loadedQuestionnaire = JSON.parse(stored);

          if (storedAnswers) {
            const answersData = JSON.parse(storedAnswers);
            Object.entries(answersData).forEach(([step, stepAnswers]) => {
              loadedAnswers.set(parseInt(step), stepAnswers as Answer);
            });
          }
        }
      }

      if (loadedQuestionnaire) {
        setQuestionnaire(loadedQuestionnaire);
        setCurrentStep(loadedQuestionnaire.current_step);
        setAnswers(loadedAnswers);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loadedQuestionnaire));
        const answersObj: Record<number, Answer> = {};
        loadedAnswers.forEach((value, key) => {
          answersObj[key] = value;
        });
        localStorage.setItem(ANSWERS_KEY, JSON.stringify(answersObj));
      } else {
        const newQuestionnaire: Questionnaire = {
          id: crypto.randomUUID(),
          session_id: sessionId,
          current_step: 1,
          status: 'in_progress',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        try {
          await supabase.from('questionnaires').insert([{
            id: newQuestionnaire.id,
            session_id: sessionId,
            current_step: 1,
            status: 'in_progress',
          }]);
        } catch (dbErr) {
          console.warn('Failed to save to database:', dbErr);
        }

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

        try {
          const stepAnswers = answers.get(step);
          if (stepAnswers) {
            for (const [key, value] of Object.entries(stepAnswers)) {
              const { data: existing } = await supabase
                .from('questionnaire_answers')
                .select('id')
                .eq('questionnaire_id', questionnaire.id)
                .eq('step', step)
                .eq('question_key', key)
                .maybeSingle();

              if (existing) {
                await supabase
                  .from('questionnaire_answers')
                  .update({ answer: value, updated_at: new Date().toISOString() })
                  .eq('id', existing.id);
              } else {
                await supabase.from('questionnaire_answers').insert([{
                  questionnaire_id: questionnaire.id,
                  step,
                  question_key: key,
                  answer: value,
                }]);
              }
            }
          }
        } catch (dbErr) {
          console.warn('Failed to save answers to database:', dbErr);
        }
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

    try {
      await supabase
        .from('questionnaires')
        .update({ current_step: newStep, updated_at: new Date().toISOString() })
        .eq('id', questionnaire.id);
    } catch (dbErr) {
      console.warn('Failed to update questionnaire step in database:', dbErr);
    }
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

    try {
      await supabase
        .from('questionnaires')
        .update({ status: 'completed', updated_at: new Date().toISOString() })
        .eq('id', questionnaire.id);
    } catch (dbErr) {
      console.warn('Failed to mark questionnaire complete in database:', dbErr);
    }
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
