import React from 'react';
import { Text } from '@chakra-ui/react';
import { quizLength } from 'utils/constants';
import { useQuizContext } from 'context/QuizContext';

interface QuizInformationProps {
  currentQuestionIndex: number;
}

const QuizInformationHeader: React.FC<QuizInformationProps> = ({
  currentQuestionIndex,
}) => {
  const {
    alias,
    difficulty,
    category,
    questions,
    score,
  } = useQuizContext();

  return (
    <div>
      <h1>¡Welcome to the Quiz, {alias}! </h1>
      <Text fontSize="lg">Difficulty: {difficulty || questions[currentQuestionIndex]?.difficulty}</Text>
      <Text fontSize="lg">Category: {category?.name || questions[currentQuestionIndex]?.category}</Text>
      <Text fontSize="lg">Question No.: {`${currentQuestionIndex + 1}/${quizLength}`}</Text>
      <Text fontSize="lg">Score: {score}</Text>
      <Text fontSize="xl" fontWeight="bold">{questions[currentQuestionIndex]?.question}</Text>
    </div>
  );
};

export default QuizInformationHeader;