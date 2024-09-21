import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQuizContext } from '../context/QuizContext';

import { 
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Stack,
} from '@chakra-ui/react';
import QuizInformationHeader from 'components/QuizInformationHeader';
import QuizBody from 'components/QuizBody';

const containerStyles = {
  padding: '16px',
  borderRadius: '8px',
  backgroundImage: 'radial-gradient(circle, #FFD700 1px, transparent 2px)', 
  backgroundSize: '20px 20px',
};

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
    <Flex align="center" justify="center" h="100vh" maxW="70vw" m="0 auto">
      <Card variant='outline' shadow="md" {...containerStyles}>
        <Stack>
          <CardHeader>
            <QuizInformationHeader
              currentQuestionIndex={currentQuestionIndex}
            />
          </CardHeader>
          <CardBody>
            <QuizBody
              currentQuestionIndex={currentQuestionIndex}
              selectedAnswer={selectedAnswer}
              handleAnswerClicked={handleAnswerClicked}
            />
          </CardBody>
          <CardFooter justify="center">
            <Button
              colorScheme={isLastQuestion ? 'red' : 'blue'}
              mt={4}
              onClick={!isLastQuestion ? handleNextQuestion : handleFinishQuiz}
              isDisabled={!questions[currentQuestionIndex].answered}
            >
              {isLastQuestion ? 'Finish' : 'Next Question'}
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </Flex>
  );
};

export default Quiz;