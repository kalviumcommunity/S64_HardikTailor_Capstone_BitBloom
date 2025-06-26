export interface Question {
  _id?: string;
  title: string;
  slug: string;
  url: string;
  topics: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface QuestionFilters {
  topics: string[];
  difficulty: string[];
}

export interface QuestionApiResponse {
  questions: Question[];
  total: number;
  page: number;
  limit: number;
}

export interface QuestionApiParams {
  topics?: string;
  difficulty?: string;
  page?: number;
  limit?: number;
  search?: string;
}