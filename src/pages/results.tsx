import React from 'react';

import { Box, Flex } from '@chakra-ui/react';

import ResultsInformation from 'components/ResultsInformaton';
import ResultsFooter from 'components/ResultsFooter';

const Results: React.FC = () => {

  return (
    <Flex align="center" justify="center" h="100vh">
      <Box p={8} maxWidth="700px" bg="white" borderRadius="md" shadow="md">
        <ResultsInformation />
        <ResultsFooter />
      </Box>
    </Flex>
  );
};

export default Results;