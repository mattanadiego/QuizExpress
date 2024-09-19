import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react';
import { useQuizContext } from '../context/QuizContext';

const QuizPage: React.FC = () => {
  const {
    alias,
    difficulty,
    category,
    questions,
  } = useQuizContext();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [questionData, setQuestionData] = useState({ question: '', mixedAnswers: [], correctAnswer: '' });
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const isLastQuestion = (currentQuestionIndex + 1 === questions.length);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setIsAnswerSubmitted(false);
  };

  const handleFinishQuiz = () => {

  }

  function randomQuestionArray(array: string[]) {
    const arrayCopy = [...array];

    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }

    return arrayCopy;
  }

  const handleAnswerClicked = (answer: string) => {
    setIsAnswerSubmitted(true);
    setSelectedAnswer(answer);
  }

  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex];
    const answerOptions = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    const mixedAnswers = randomQuestionArray(answerOptions);

    setQuestionData({
      question: currentQuestion.question,
      mixedAnswers: mixedAnswers as [],
      correctAnswer: currentQuestion.correct_answer,
    });

  }, [currentQuestionIndex, questions]);

  return (
    <Box p={4}>
      <h1>¡Welcome to the Quiz, {alias}! </h1>
      <Flex direction="column" gap={4}>
        <Text fontSize="lg">Difficulty: {difficulty || questions[currentQuestionIndex]?.difficulty}</Text>
        <Text fontSize="lg">Category: {category?.name || questions[currentQuestionIndex]?.category}</Text>
        <Text fontSize="lg">Question No.: {`${currentQuestionIndex + 1}/${questions.length}`}</Text>
        <Text fontSize="xl" fontWeight="bold">{questionData.question}</Text>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          {questionData.mixedAnswers.map((answer, index) => (
            <Button
              key={index}
              variant="outline"
              colorScheme={
                isAnswerSubmitted
                  ? answer === questionData.correctAnswer
                    ? 'green'
                    : answer === selectedAnswer
                    ? 'red'
                    : 'gray'
                  : 'blue'
              }
              onClick={() => handleAnswerClicked(answer)}
              isDisabled={isAnswerSubmitted}
              isActive={isAnswerSubmitted}
            >
              {answer}
            </Button>
          ))}
        </Grid>
        <Button
          colorScheme={isLastQuestion ? 'red' : 'blue'}
          mt={4}
          onClick={!isLastQuestion ? handleNextQuestion : handleFinishQuiz}
          isDisabled={!isAnswerSubmitted}
        >
          {isLastQuestion ? 'Finish' : 'Next Question'}
        </Button>
      </Flex>
    </Box>
  );
};

export default QuizPage;