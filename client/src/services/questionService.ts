import axios from 'axios';
import {  QuestionApiParams, QuestionApiResponse } from '../types/Question';

class QuestionService {
  private baseURL = 'https://bitbloom-1zw8.onrender.com/api/coding/questions';

  /**
   * Fetch coding questions from backend with optional filters.
   * @param params Query parameters like topics and difficulty.
   * @returns Promise resolving to an object of questions with pagination info.
   */
  async getQuestions(params?: QuestionApiParams): Promise<QuestionApiResponse> {
    try {
      const response = await axios.get<QuestionApiResponse>(this.baseURL, {
        params,
        withCredentials: true,
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error while fetching questions:', error.message);
        throw new Error(error.response?.data?.message || 'API error occurred');
      } else {
        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred while fetching questions');
      }
    }
  }
}

export const questionService = new QuestionService();
