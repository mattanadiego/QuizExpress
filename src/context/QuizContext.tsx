import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Category, Question } from 'interfaces/quiz';

interface QuizContextType {
  alias: string;
  category: Category;
  difficulty: string;
  setAlias: (alias: string) => void;
  setCategory: (category: Category) => void;
  setDifficulty: (difficulty: string) => void;
  isAliasValid: boolean;
  setIsAliasValid: (isAliasValid: boolean) => void;
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  score: number;
  setScore: (score: number) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuizContext = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('There is no valid Quiz context');
  }
  return context;
};

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [alias, setAlias] = useState('');
  const [category, setCategory] = useState({id: -1, name: ''});
  const [difficulty, setDifficulty] = useState('');
  const [isAliasValid, setIsAliasValid] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);

  return (
    <QuizContext.Provider value={{
      alias,
      category,
      difficulty,
      setAlias,
      setCategory,
      setDifficulty,
      isAliasValid,
      setIsAliasValid,
      questions,
      setQuestions,
      score,
      setScore,
    }}>
      {children}
    </QuizContext.Provider>
  );
};