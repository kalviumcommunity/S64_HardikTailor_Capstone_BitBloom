import axios from 'axios';
const API_BASE_URL =  "https://bitbloom-1zw8.onrender.com";

export const resourceService = {
  async getResources() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/resources`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch resources');
      }
      throw new Error('Unexpected error');
    }
  },
};
