import React from 'react';
import {
  Box,
  BoxProps,
  Center,
  Grid,
  GridProps,
  Heading,
  Text,
  TextProps,
  VStack,
} from '@chakra-ui/react';
import { quizLength } from 'utils/constants';
import { useQuizContext } from 'context/QuizContext';

const headingStyles = {
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '2rem',
  fontWeight: 'bold',  
};

const gridStyles: GridProps = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '10px',
};

const boxStyles: BoxProps = {
  padding: '16px',
  borderRadius: '8px',
  boxShadow: 'md',
};

const textStyles: TextProps = {
  fontSize: '16px',
  mb: '4px',
};

const box1Color = '#AFEEEE';
const box2Color = '#E6E6FA';
const box3Color = '#FFDAB9';
const box4Color = '#98FB98';

interface QuizInformationProps {
  currentQuestionIndex: number;
}

const QuizInformationHeader: React.FC<QuizInformationProps> = ({
  currentQuestionIndex,
}) => {
  const {
    alias,
    category,
    difficulty,
    questions,
    score,
  } = useQuizContext();

  return (
    <VStack gap={6}>
    <Center>
      <Heading {...headingStyles}>¡{alias}, here is your Quiz!</Heading>
    </Center>
    <Grid {...gridStyles}>
      <Box backgroundColor={box1Color} {...boxStyles}>
        <Text {...textStyles}>
          {'Category: '}
          <span style={{ fontWeight: 'bold' }}>{category?.name || questions[currentQuestionIndex]?.category}</span>
        </Text>
      </Box>
      <Box backgroundColor={box2Color} {...boxStyles}>
        <Text {...textStyles}>
          {'Difficulty: '}
          <span style={{ fontWeight: 'bold' }}>{difficulty.toLocaleUpperCase() || questions[currentQuestionIndex]?.difficulty.toLocaleUpperCase()}</span>
        </Text>
      </Box>
      <Box backgroundColor={box3Color} {...boxStyles}>
        <Text {...textStyles}>
          {'Question No.: '}
          <span style={{ fontWeight: 'bold' }}>{`${currentQuestionIndex + 1}/${quizLength}`}</span>
        </Text>
      </Box>
      <Box backgroundColor={box4Color} {...boxStyles}>
        <Text {...textStyles}>
          {'Score:  '}
          <span style={{ fontWeight: 'bold' }}>{score}</span>
        </Text>
      </Box>
    </Grid>
  </VStack>
  );
};

export default QuizInformationHeader;