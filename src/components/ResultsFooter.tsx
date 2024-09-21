import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizContext } from '../context/QuizContext';

import { Text, Flex, Button } from '@chakra-ui/react';
import { startQuiz } from 'utils/quizActions';

const ResultsFooter: React.FC = () => {
  const navigate = useNavigate();
  const { category, difficulty, setQuestions } = useQuizContext();

  const handleResetQuiz = async () => {
    await startQuiz(category.id, difficulty.toLowerCase(), setQuestions);
    navigate('/quiz');
  }

  return (
    <>
      <Text fontSize="lg" textAlign="center" mb={4}>
        Do you want to continue playing?
      </Text>
      <Flex justify="center">
        <Button colorScheme="blue" mr={4} onClick={handleResetQuiz}>
          Play again
        </Button>
        <Button colorScheme="red" onClick={() => navigate('/')}>
          Go out
        </Button>
      </Flex>
    </>
  );
};

export default ResultsFooter;