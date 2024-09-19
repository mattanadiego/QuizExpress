import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizContext } from '../context/QuizContext';
import { Button, Flex, useToast } from '@chakra-ui/react';
import ConfigForm from '../components/ConfigForm';
import { fetchQuestions } from 'services/apis';

const Home: React.FC = () => {
  const {
    alias,
    category,
    difficulty,
    setIsAliasValid,
    setQuestions,
  } = useQuizContext();
  const navigate = useNavigate();
  const toast = useToast()

  const buildApiUrl = (categoryId: number, difficultyLevel: string) => {
    let baseUrl = 'https://opentdb.com/api.php?amount=5&type=multiple';

    if (categoryId && categoryId !== -1) {
      baseUrl +=  `&category=${categoryId}`;
    }

    if (difficultyLevel !== '') { 
      baseUrl +=  `&difficulty=${difficultyLevel}`;
    }

    return baseUrl;
  };

  const handleStartQuiz = async () => {
    if (alias) {
      const apiUrl = buildApiUrl(category.id, difficulty.toLowerCase());
      console.log('apiUrl: ', apiUrl);
      try {
        const fetchedQuestions = await fetchQuestions(apiUrl);
        setQuestions(fetchedQuestions);

        navigate('/quiz');
      } catch (error) {
        console.error('Error fetching questions:', error);
      } 
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