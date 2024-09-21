import React from 'react';

import {
  Box,
  BoxProps,
  Spinner,
  SpinnerProps,
} from '@chakra-ui/react';

const boxStyles: BoxProps = {
  pos: 'fixed',
  insetX: 0,
  insetY: 0,
  zIndex: '999',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
};

const spinnerStyles: SpinnerProps = {
  emptyColor: 'gray.200',
  color: 'blue.500',
  thickness: '4px',
  size: 'xl',
};

export interface LoadingProps {
  isLoading?: boolean;
}

const Loading = ({
  isLoading = true,
} : LoadingProps) => {
  return (isLoading && (
    <Box
      as="div"
      className="loading-overlay"
      {...boxStyles}
    >
      <Spinner {...spinnerStyles} />
    </Box>
  ));
};

export default Loading;