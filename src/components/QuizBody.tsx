import React, { useEffect, useState } from 'react';
import { Button, ButtonProps, Grid, GridProps, Text, TextProps, VStack } from '@chakra-ui/react';
import { useQuizContext } from 'context/QuizContext';

const questionStyles: TextProps = {
  fontSize: '20px',
  fontWeight: 'bold',
  mb: '20px',
  padding: '25px',
  border: '1px',
  borderRadius: '8px',
  background: '#F3F3F3',
};

const gridStyles: GridProps = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '10px',
};

const buttonStyles: ButtonProps = {
  paddingX: '20px',
  paddingY: '12px',
  fontSize: '16px',
  borderRadius: '8px',
  cursor: 'pointer',
  width: 'auto',
  height: 'auto',
  background: 'white',
  opacity: '1 !important',
};

interface QuizBodyProps {
  currentQuestionIndex: number;
  selectedAnswer: string;
  handleAnswerClicked: (answer: string) => void;
}

const defaultQuestionData = {
  question: '',
  mixedAnswers: [],
  correctAnswer: '',
  answered: false,
}

const QuizBody: React.FC<QuizBodyProps> = ({
  currentQuestionIndex,
  selectedAnswer,
  handleAnswerClicked,
}) => {
  const [questionData, setQuestionData] = useState(defaultQuestionData);

  const {
    questions,
    score,
    setScore,
  } = useQuizContext();

  function randomQuestionArray(array: string[]) {
    const arrayCopy = [...array];

    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }

    return arrayCopy;
  }

  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex];
    const answerOptions = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    const mixedAnswers = randomQuestionArray(answerOptions);
    const answered = questions[currentQuestionIndex]?.answered;

    setQuestionData({
      question: currentQuestion.question,
      mixedAnswers: mixedAnswers as [],
      correctAnswer: currentQuestion.correct_answer,
      answered: answered || false,
    });

  }, [currentQuestionIndex, questions]);

  const handleAnswerSubmit = (answer: string) => {
    handleAnswerClicked(answer);
    questionData.answered = true;
    if (answer === questionData.correctAnswer) {
      setScore(score + 20);
    }
  };

  return (
    <VStack>
      <Text {...questionStyles}>{questions[currentQuestionIndex]?.question}</Text>
      <Grid {...gridStyles}>
        {questionData.mixedAnswers.map((answer, index) => (
          <Button
            key={index}
            variant="outline"
            colorScheme={
              questionData.answered
                ? answer === questionData.correctAnswer
                  ? 'green'
                  : answer === selectedAnswer
                    ? 'red'
                    : 'gray'
                : 'blue'
            }
            onClick={() => handleAnswerSubmit(answer)}
            isDisabled={questionData.answered}
            isActive={questionData.answered}
            {...buttonStyles}
          >
            {answer}
          </Button>
        ))}
      </Grid>
    </VStack>
  );
};

export default QuizBody;