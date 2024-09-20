import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useQuizContext } from '../context/QuizContext';

import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Image,
} from '@chakra-ui/react';

import firstPlace from 'assets/images/firstPlace.png';
import secondPlace from 'assets/images/secondPlace.png';
import thirdPlace from 'assets/images/thirdPlace.png';

const Results: React.FC = () => {
  const { alias, score } = useQuizContext();
  const navigate = useNavigate();

  const getHeading = () => {
    return score === 100 ? `¡Felicidades, ${alias}!` : `¡Buen trabajo, ${alias}!`;
  };

  const getScoreMessage = () => {
    return score === 0
      ? `Obtuviste ${score} puntos. Vuelve a intentarlo!`
      : `Obtuviste ${score} puntos. ¡Sigue así!`;
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
    <Flex align="center" justify="center" h="100vh">
      <Box p={8} maxWidth="500px" bg="white" borderRadius="md" shadow="md">
        <Heading as="h2" size="lg" textAlign="center" mb={4}>
          {getHeading()}
        </Heading>
        <Text fontSize="xl" textAlign="center" mb={8}>
          {getScoreMessage()}
        </Text>
        <Image src={getImagePath()} alt="Trofeo" mb={4} />
        <Text fontSize="lg" textAlign="center" mb={4}>
          ¿Quieres seguir jugando?
        </Text>
        <Flex justify="center">
          <Button colorScheme="blue" mr={4} onClick={() => { /* Reiniciar trivia */ }}>
            Jugar otra vez
          </Button>
          <Button colorScheme="red" onClick={() => navigate('/')}>
            Salir
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Results;