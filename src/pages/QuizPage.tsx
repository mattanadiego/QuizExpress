import React from 'react';
import { Box } from '@chakra-ui/react';
import { useQuizContext } from '../context/QuizContext';

const QuizPage: React.FC = () => {
  const { alias: alias } = useQuizContext();

  return (
    <Box p={4}>
      <h1>¡Welcome to the Quiz, { alias }! </h1>
      {/* TODO: Invocar QuizComponent */ }
    </Box>
  );
};

export default QuizPage;