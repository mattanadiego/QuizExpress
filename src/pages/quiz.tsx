import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQuizContext } from '../context/QuizContext';

import { Box, Button, Flex } from '@chakra-ui/react';
import QuizInformationHeader from 'components/QuizInformationHeader';
import QuizBody from 'components/QuizBody';

const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  
  const {
    questions,
    setScore,
  } = useQuizContext();

  const navigate = useNavigate();

  const isLastQuestion = (currentQuestionIndex + 1 === questions.length);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleFinishQuiz = () => {
    navigate('/results');
  }
  
  const handleAnswerClicked = (answer: string) => {
    questions[currentQuestionIndex].answered = true;
    setSelectedAnswer(answer);
  }

  useEffect(() => {
    setScore(0);
  }, []);

  return (
    <Box p={4}>
      <QuizInformationHeader
        currentQuestionIndex={currentQuestionIndex}
      />
      <Flex direction="column" gap={4}>
        <QuizBody
          currentQuestionIndex={currentQuestionIndex}
          selectedAnswer={selectedAnswer}
          handleAnswerClicked={handleAnswerClicked}
        />
        <Button
          colorScheme={isLastQuestion ? 'red' : 'blue'}
          mt={4}
          onClick={!isLastQuestion ? handleNextQuestion : handleFinishQuiz}
          isDisabled={!questions[currentQuestionIndex].answered}
        >
          {isLastQuestion ? 'Finish' : 'Next Question'}
        </Button>
      </Flex>
    </Box>
  );
};

export default Quiz;