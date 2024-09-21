import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@chakra-ui/react';
import { useQuizContext } from 'context/QuizContext';

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
    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
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
        >
          {answer}
        </Button>
      ))}
    </Grid>
  );
};

export default QuizBody;