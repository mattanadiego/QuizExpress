import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizContext } from '../context/QuizContext';
import { Box, Button, Center, Flex, Image, useToast } from '@chakra-ui/react';
import QuizConfig from '../components/QuizConfig';
import { startQuiz } from 'utils/quizActions';

import QuizExpressLogo from 'assets/images/QuizExpressLogo.png';
import Loading from 'components/Loading';

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

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStartQuiz = async () => {
    if (alias) {
      setIsLoading(true)
      await startQuiz(category.id, difficulty.toLowerCase(), setQuestions);
      navigate('/quiz');
      setIsLoading(false);
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
      <Loading isLoading={isLoading}  />
      <Box p={8} maxWidth="700px" bg="white" borderRadius="md" shadow="md">
        <Flex
          flexDirection="column"
          p={4}
          gap={4}
        >
          <Center>
            <Image src={QuizExpressLogo} alt="Logo" width="75%" />
          </Center>
          <QuizConfig />
          <Center>
            <Button colorScheme="green" mt={4} onClick={handleStartQuiz}>
              {`Let's Play!`}
            </Button>
          </Center>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Home;