// src/services/__tests__/resourceService.test.ts
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { resourceService } from '../resourceService';

const mock = new MockAdapter(axios);

describe('resourceService.getResources', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should fetch resources successfully', async () => {
    const mockData = [
      {
        _id: '1',
        title: 'Test Resource',
        description: 'A sample resource',
        isFree: true,
        user: {
          username: 'john',
          email: 'john@example.com',
        },
      },
    ];

    mock.onGet(/\/api\/resources/).reply(200, mockData);

    const result = await resourceService.getResources();
    expect(result).toEqual(mockData);
  });

  it('should throw error if request fails', async () => {
    mock.onGet(/\/api\/resources/).reply(500, {
      message: 'Internal Server Error',
    });

    await expect(resourceService.getResources()).rejects.toThrow('Internal Server Error');
  });
});
