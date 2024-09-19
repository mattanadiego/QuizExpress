import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { QuizProvider } from 'context/QuizContext';

import './index.css';
import Home from 'pages/home';
import QuizPage from 'pages/quizPage';

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
            <Route path="/quiz" element={<QuizPage />} />
        </Routes>
        </QuizProvider>
      </ChakraProvider>
    </Router>
  </React.StrictMode>
);
