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

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(`${BASE_URL}api_category.php`);
    return response?.data?.trivia_categories;
  } catch (error: unknown) {
    if (error instanceof Object && 'code' in error) {
      const typedError = error as { message: string; code: OpenTDBErrorCode };
      console.error('OpenTDB error:', getErrorMessage(typedError.code));
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

export const fetchQuestions = async (apiUrl: string): Promise<Question[]> => {
  try {
    const response = await axios.get(`${BASE_URL}${apiUrl}`);
    return response.data.results;
  } catch (error: unknown) {
    if (error instanceof Object && 'code' in error) {
      const typedError = error as { message: string; code: OpenTDBErrorCode };
      console.error('OpenTDB error:', getErrorMessage(typedError.code));
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};