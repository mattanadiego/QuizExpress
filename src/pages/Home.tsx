import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizContext } from '../context/QuizContext';
import { Button, Flex, useToast } from '@chakra-ui/react';
import ConfigForm from '../components/ConfigForm';

const Home: React.FC = () => {
  const {
    alias,
    category,
    difficulty,
    setIsAliasValid,
  } = useQuizContext();
  const navigate = useNavigate();
  const toast = useToast()

  const handleStartQuiz = () => {
    if (alias) {
      // https://opentdb.com/api.php?amount=5&type=multiple
      const apiUrl = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`;
      // TODO: invocar servicios de fetch
      console.log('apiUrl: ', apiUrl);
      console.log('alias: ', alias);
      console.log('category: ', category);
      console.log('difficulty: ', difficulty);
      navigate('apiUrl'); 
    } else {
      setIsAliasValid(!!alias);
      toast({
        title: `Error!`,
        status: 'error',
        isClosable: true,
        description: 'Please complete all fields before starting to play.',
      })
    }
  };

  return (
    <Flex
      flexDirection="column"
      p={4}
      gap={4}
    >
      <h1>Quiz Express</h1>
      <ConfigForm />
      <Button colorScheme="blue" mt={4} onClick={handleStartQuiz}>
        {`Let's Play!`}
      </Button>
    </Flex>
  );
};

export default Home;