import React from 'react';
import { useQuizContext } from '../context/QuizContext';

import { Heading, Text, Image } from '@chakra-ui/react';

import firstPlace from 'assets/images/firstPlace.png';
import secondPlace from 'assets/images/secondPlace.png';
import thirdPlace from 'assets/images/thirdPlace.png';

const ResultsInformation: React.FC = () => {
  const { alias, score } = useQuizContext();

  const getHeading = () => {
    return score === 100 
    ? `Congratulations, ${alias}!`
    : `¡Good job, ${alias}!`;
  };

  const getScoreMessage = () => {
    return score === 0
      ? `You got ${score} points. Try again!`
      : `You got ${score} points. Keep it up!`;
  };

  const getImagePath = () => {
    if (score < 40) {
      return thirdPlace;
    } else if (score >= 40 && score < 80) {
      return secondPlace;
    } else if (score >= 80) {
      return firstPlace;
    }
  };

  return (
    <>
      <Heading as="h2" size="lg" textAlign="center" mb={4}>
        {getHeading()}
      </Heading>
      <Text fontSize="xl" textAlign="center" mb={8}>
        {getScoreMessage()}
      </Text>
      <Image src={getImagePath()} alt="Price" mb={4} />
    </>
  );
};

export default ResultsInformation;