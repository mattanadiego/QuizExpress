import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { QuizProvider } from 'context/QuizContext';

import './index.css';
import Home from './pages/Home';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider>
        <QuizProvider>
          <Home />
        </QuizProvider>
      </ChakraProvider>
    </Router>
  </React.StrictMode>
);
