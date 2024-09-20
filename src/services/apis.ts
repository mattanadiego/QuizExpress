import axios from 'axios';

import { Category, Question } from 'interfaces/quiz';

const BASE_URL = 'https://opentdb.com/';

export enum OpenTDBErrorCode {
  Success = 0,
  NoResults = 1,
  InvalidParameter = 2,
  TokenNotFound = 3,
  TokenEmpty = 4,
  RateLimit = 5,
}

const api = axios.create({
  baseURL: BASE_URL
});

function getErrorMessage(code: OpenTDBErrorCode): string {
  switch (code) {
    case OpenTDBErrorCode.NoResults:
      return 'No results found.';
    case OpenTDBErrorCode.InvalidParameter:
      return 'Invalid parameter.';
    case OpenTDBErrorCode.TokenNotFound:
      return 'Session token not found.';
    case OpenTDBErrorCode.TokenEmpty:
      return 'Session token has returned all possible questions.';
    case OpenTDBErrorCode.RateLimit:
      return 'Rate limit exceeded.';
    default:
      return 'An unexpected error occurred.';
  }
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data && error.response.data.response_code) {
      const openTDBErrorCode = error.response.data.response_code;
      const errorMessage = getErrorMessage(openTDBErrorCode);
      const openTDBError = { message: errorMessage, code: openTDBErrorCode };
      return Promise.reject(openTDBError);
    }
    return Promise.reject(error);
  }
);

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get('api_category.php');
    return response.data.trivia_categories;
  } catch (error: unknown) {
    if (error instanceof Object && 'code' in error) {
      const typedError = error as { message: string; code: OpenTDBErrorCode };
      console.error('OpenTDB error:', typedError.message, typedError.code);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

export const fetchQuestions = async (url: string): Promise<Question[]> => {
  try {
    const response = await api.get(url);
    return response.data.results;
  } catch (error: unknown) {
    if (error instanceof Object && 'code' in error) {
      const typedError = error as { message: string; code: OpenTDBErrorCode };
      console.error('OpenTDB error:', typedError.message, typedError.code);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};