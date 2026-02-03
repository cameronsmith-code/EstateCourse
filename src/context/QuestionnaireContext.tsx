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
  clearAllAnswers: () => Promise<void>;
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

      const stored = localStorage.getItem(STORAGE_KEY);
      const storedAnswers = localStorage.getItem(ANSWERS_KEY);

      let loadedQuestionnaire: Questionnaire | null = null;
      let loadedAnswers: Map<number, Answer> = new Map();

      if (stored) {
        loadedQuestionnaire = JSON.parse(stored);

        if (storedAnswers) {
          const answersData = JSON.parse(storedAnswers);
          Object.entries(answersData).forEach(([step, stepAnswers]) => {
            loadedAnswers.set(parseInt(step), stepAnswers as Answer);
          });
        }

        setQuestionnaire(loadedQuestionnaire);
        setCurrentStep(loadedQuestionnaire.current_step);
        setAnswers(loadedAnswers);
        setLoading(false);

        if (supabase) {
          Promise.race([
            supabase
              .from('questionnaires')
              .select('*')
              .eq('session_id', sessionId)
              .maybeSingle()
              .then(async ({ data: dbQuestionnaire }) => {
                if (dbQuestionnaire) {
                  const { data: dbAnswers } = await supabase
                    .from('questionnaire_answers')
                    .select('*')
                    .eq('questionnaire_id', dbQuestionnaire.id);

                  const syncedAnswers: Map<number, Answer> = new Map();
                  if (dbAnswers && dbAnswers.length > 0) {
                    dbAnswers.forEach((ans) => {
                      const step = ans.step;
                      if (!syncedAnswers.has(step)) {
                        syncedAnswers.set(step, {});
                      }
                      syncedAnswers.get(step)![ans.question_key] = ans.answer;
                    });
                  }

                  setAnswers(syncedAnswers);
                  setQuestionnaire(dbQuestionnaire as Questionnaire);
                  setCurrentStep(dbQuestionnaire.current_step);
                }
              }),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Database timeout')), 5000))
          ]).catch((err) => {
            console.warn('Background sync failed:', err);
          });
        }
      } else {
        const newQuestionnaire: Questionnaire = {
          id: crypto.randomUUID(),
          session_id: sessionId,
          current_step: 1,
          status: 'in_progress',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newQuestionnaire));
        setQuestionnaire(newQuestionnaire);
        setCurrentStep(1);
        setLoading(false);

        if (supabase) {
          supabase.from('questionnaires').insert([{
            id: newQuestionnaire.id,
            session_id: sessionId,
            current_step: 1,
            status: 'in_progress',
          }]).then(
            () => {},
            (err) => {
              console.warn('Failed to save to database:', err);
            }
          );
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  }, []);

  const updateAnswer = useCallback((step: number, key: string, value: unknown) => {
    console.log(`=== CONTEXT - UPDATE ANSWER ===`);
    console.log(`Step: ${step}, Key: ${key}, Value:`, value);

    setAnswers((prev) => {
      const updated = new Map(prev);
      if (!updated.has(step)) {
        updated.set(step, {});
      }
      const stepData = updated.get(step)!;
      stepData[key] = value;

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

        if (supabase) {
          try {
            const stepAnswers = answers.get(step);

            // Get all existing answers for this step
            const { data: existingAnswers } = await supabase
              .from('questionnaire_answers')
              .select('id, question_key')
              .eq('questionnaire_id', questionnaire.id)
              .eq('step', step);

            const existingMap = new Map(
              (existingAnswers || []).map(a => [a.question_key, a.id])
            );

            const toInsert = [];
            const toUpdate = [];
            const toDelete = [];

            // Handle current answers
            if (stepAnswers && Object.keys(stepAnswers).length > 0) {
              for (const [key, value] of Object.entries(stepAnswers)) {
                const existingId = existingMap.get(key);
                if (existingId) {
                  toUpdate.push({
                    id: existingId,
                    answer: value,
                    updated_at: new Date().toISOString()
                  });
                  existingMap.delete(key); // Remove from map
                } else {
                  toInsert.push({
                    questionnaire_id: questionnaire.id,
                    step,
                    question_key: key,
                    answer: value,
                  });
                }
              }
            }

            // Any remaining items in existingMap should be deleted
            for (const [key, id] of existingMap.entries()) {
              toDelete.push(id);
            }

            // Execute database operations
            if (toInsert.length > 0) {
              await supabase.from('questionnaire_answers').insert(toInsert);
            }

            for (const update of toUpdate) {
              await supabase
                .from('questionnaire_answers')
                .update({ answer: update.answer, updated_at: update.updated_at })
                .eq('id', update.id);
            }

            if (toDelete.length > 0) {
              await supabase
                .from('questionnaire_answers')
                .delete()
                .in('id', toDelete);
            }
          } catch (dbErr) {
            console.warn('Failed to save answers to database:', dbErr);
          }
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

    const answersObj: Record<number, Answer> = {};
    answers.forEach((value, key) => {
      answersObj[key] = value;
    });
    localStorage.setItem(ANSWERS_KEY, JSON.stringify(answersObj));

    const newStep = currentStep + 1;
    setCurrentStep(newStep);

    const updated = {
      ...questionnaire,
      current_step: newStep,
      updated_at: new Date().toISOString(),
    };
    setQuestionnaire(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    saveAnswers(currentStep).catch((err) => {
      console.warn('Background save failed:', err);
    });

    if (supabase) {
      supabase
        .from('questionnaires')
        .update({ current_step: newStep, updated_at: new Date().toISOString() })
        .eq('id', questionnaire.id)
        .then(
          () => {},
          (err) => {
            console.warn('Failed to update questionnaire step in database:', err);
          }
        );
    }
  }, [questionnaire, currentStep, answers, saveAnswers]);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  }, []);

  const completeQuestionnaire = useCallback(async () => {
    if (!questionnaire) return;

    const answersObj: Record<number, Answer> = {};
    answers.forEach((value, key) => {
      answersObj[key] = value;
    });
    localStorage.setItem(ANSWERS_KEY, JSON.stringify(answersObj));

    const updated = {
      ...questionnaire,
      status: 'completed' as const,
      current_step: currentStep,
      updated_at: new Date().toISOString(),
    };
    setQuestionnaire(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    saveAnswers(currentStep).catch((err) => {
      console.warn('Background save failed:', err);
    });

    if (supabase) {
      supabase
        .from('questionnaires')
        .update({ status: 'completed', updated_at: new Date().toISOString() })
        .eq('id', questionnaire.id)
        .then(
          () => {},
          (err) => {
            console.warn('Failed to mark questionnaire complete in database:', err);
          }
        );
    }
  }, [questionnaire, currentStep, answers, saveAnswers]);

  const clearAllAnswers = useCallback(async () => {
    if (!questionnaire) return;

    setAnswers(new Map());
    setCurrentStep(1);

    const updated = {
      ...questionnaire,
      current_step: 1,
      updated_at: new Date().toISOString(),
    };
    setQuestionnaire(updated);

    localStorage.removeItem(ANSWERS_KEY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    if (supabase) {
      Promise.all([
        supabase
          .from('questionnaire_answers')
          .delete()
          .eq('questionnaire_id', questionnaire.id),
        supabase
          .from('questionnaires')
          .update({ current_step: 1, updated_at: new Date().toISOString() })
          .eq('id', questionnaire.id)
      ]).then(
        () => {},
        (err) => {
          console.warn('Failed to clear answers in database:', err);
        }
      );
    }
  }, [questionnaire]);

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
        clearAllAnswers,
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
