import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizContext } from '../context/QuizContext';
import { Box, Button, Flex, useToast } from '@chakra-ui/react';
import QuizConfig from '../components/QuizConfig';
import { fetchQuestions } from 'services/apis';
import { quizLength } from 'utils/constants';

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
    let baseUrl = `api.php?amount=${quizLength}&type=multiple`;

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
      try {
        const fetchedQuestions = await fetchQuestions(apiUrl);
        const fetchedQuestionsWithAnsweredProp = fetchedQuestions.map(question => ({
          ...question,
          answered: false
        }));
        setQuestions(fetchedQuestionsWithAnsweredProp);

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
    <Flex align="center" justify="center" h="100vh">
      <Box p={8} maxWidth="800px" bg="white" borderRadius="md" shadow="md">
        <Flex
          flexDirection="column"
          p={4}
          gap={4}
        >
          <h1>Quiz Express</h1>
          <QuizConfig />
          <Button colorScheme="blue" mt={4} onClick={handleStartQuiz}>
            {`Let's Play!`}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Home;