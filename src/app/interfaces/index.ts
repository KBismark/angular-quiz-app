export interface Question {
  type: "multiple" | 'boolean';
  difficulty: "medium" | 'hard' | 'easy';
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuestionsData{
  isLastQuestion: boolean;
  currentQuestionNumber: number;
  totalQuestions: number;
}
