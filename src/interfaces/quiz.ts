import { Difficulty } from "utils/constants";

export interface Category {
  id: number,
  name: string,
}

export interface Question {
  type: 'multiple',
  difficulty: Difficulty,
  category: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[],
  answered?: boolean;
}