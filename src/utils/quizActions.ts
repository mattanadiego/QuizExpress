import he from 'he';
import { quizLength } from 'utils/constants';
import { fetchQuestions } from 'services/apis';
import { Question } from 'interfaces/quiz';

const buildApiUrl = (categoryId: number, difficultyLevel: string) => {
  let baseUrl = `api.php?amount=${quizLength}&type=multiple`;

  if (categoryId && categoryId !== -1) {
    baseUrl +=  `&category=${categoryId}`;
  }

  if (difficultyLevel !== '') { 
    baseUrl +=  `&difficulty=${difficultyLevel}`;
  }

  return baseUrl;
};

export const startQuiz = async (categoryId: number, difficulty: string, handleQuestions: {(questions: Question[]) : void}) => {
  const apiUrl = buildApiUrl(categoryId, difficulty);
  try {
    const fetchedQuestions = await fetchQuestions(apiUrl);
    const fetchedQuestionsWithAnsweredProp = fetchedQuestions.map(question => ({
      ...question,
      question: he.decode(question.question),
      correct_answer: he.decode(question.correct_answer),
      incorrect_answers: question.incorrect_answers.map(answer => he.decode(answer)),
      answered: false
    }));

    handleQuestions(fetchedQuestionsWithAnsweredProp);
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
}