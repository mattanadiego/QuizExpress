import React from 'react';
import { useQuizContext } from '../context/QuizContext';

const Results: React.FC = () => {
  const {
    alias,
  } = useQuizContext();

  return (
    <div>
      <h1>¡Results, {alias}! </h1>
    </div>
  );
};

export default Results;