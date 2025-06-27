import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { questionService } from '../questionService';
import { Question } from '../../types/Question';

const mock = new MockAdapter(axios);

describe('questionService.getQuestions', () => {
  afterEach(() => {
    mock.reset(); // Clear mock between tests
  });

  it('should fetch questions successfully', async () => {
    const mockQuestions: Question[] = [
      {
        _id: '1',
        title: 'Sample Question',
        difficulty: 'Easy',
        topics: ['arrays'],
        slug: 'sample-question',
        url: 'https://example.com/questions/sample-question'
      }
    ];

    mock.onGet('https://bitbloom-1zw8.onrender.com/api/coding/questions').reply(200, mockQuestions);

    const result = await questionService.getQuestions();
    expect(result).toEqual(mockQuestions);
  });

  it('should throw an error on failure', async () => {
    mock.onGet('https://bitbloom-1zw8.onrender.com/api/coding/questions').reply(500, {
      message: 'Internal Server Error',
    });

    await expect(questionService.getQuestions()).rejects.toThrow('Internal Server Error');
  });

  it('should fetch questions with filters (topics and difficulty)', async () => {
    const filters = { topics: 'Arrays', difficulty: 'Easy' };

    const mockQuestions: Question[] = [
      {
        _id: '2',
        title: 'Filtered Question',
        difficulty: 'Easy',
        topics: ['Arrays'],
        slug: 'filtered-question',
        url: 'https://example.com/questions/filtered-question'
      },
    ];

    mock.onGet('https://bitbloom-1zw8.onrender.com/api/coding/questions', {
      params: filters,
    }).reply(200, mockQuestions);

    const result = await questionService.getQuestions(filters);
    expect(result).toEqual(mockQuestions);
  });
});
