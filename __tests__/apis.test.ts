import axios from 'axios';
import { fetchCategories, fetchQuestions, OpenTDBErrorCode } from '../src/services/apis';

jest.mock('axios');

describe('API Functions', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('fetchCategories should return an array of categories', async () => {
    const categories = await fetchCategories();
    if (categories) {
      expect(categories).toBeInstanceOf(Array);
    } 
  });

  it('fetchCategories should handle errors properly', async () => {
    try {
      await fetchCategories();
    } catch (error) {
      expect(error).toHaveProperty('code', OpenTDBErrorCode.NoResults);
    }
  });

  it('fetchCategories should be successful', async () => {
    const mockCategories = [
      { id: 9, name: 'General Knowledge' },
      { id: 10, name: 'Books' },
    ];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { trivia_categories: mockCategories } });

    const categories = await fetchCategories();
    expect(categories).toEqual(mockCategories);
  });

  it('fetchCategories should fail', async () => {
    const error = { message: 'Request failed with status code 404', code: OpenTDBErrorCode.InvalidParameter };
    (axios.get as jest.Mock).mockRejectedValue(error);

    try {
      await fetchCategories();
    } catch (e) {
      expect(e).toEqual(error);
    }
  });

  it('fetchQuestions should be successful', async () => {
    const mockQuestions = [
      { question: 'What is the capital of France?', correct_answer: 'Paris' },
      { question: 'Who painted the Mona Lisa?', correct_answer: 'Leonardo da Vinci' },
    ];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { results: mockQuestions } });

    const questions = await fetchQuestions('api.php?amount=2');
    expect(questions).toEqual(mockQuestions);
  });

  it('fetchQuestions should fail', async () => {
    const error = { message: 'Request failed with status code 500', code: OpenTDBErrorCode.RateLimit };
    (axios.get as jest.Mock).mockRejectedValue(error);

    try {
      await fetchQuestions('api.php?amount=2');
    } catch (e) {
      expect(e).toEqual(error);
    }
  });
});