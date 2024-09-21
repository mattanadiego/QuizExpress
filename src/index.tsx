import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { QuizProvider } from 'context/QuizContext';

import Home from 'pages/home';
import Quiz from 'pages/quiz';
import Results from 'pages/results';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider>
        <QuizProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </QuizProvider>
      </ChakraProvider>
    </Router>
  </React.StrictMode>
);
