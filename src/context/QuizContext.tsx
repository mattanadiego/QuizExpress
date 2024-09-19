import React, { createContext, useContext, useState, ReactNode } from 'react';

interface triviaCategory {
  id: number,
  name: string,
}

interface QuizContextType {
  alias: string;
  category: triviaCategory;
  difficulty: string;
  setAlias: (alias: string) => void;
  setCategory: (category: triviaCategory) => void;
  setDifficulty: (difficulty: string) => void;
  isAliasValid: boolean;
  setIsAliasValid: (isAliasValid: boolean) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuizContext = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext debe ser usado dentro de un QuizProvider');
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
    }}>
      {children}
    </QuizContext.Provider>
  );
};