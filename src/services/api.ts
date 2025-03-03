import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.spoonacular.com',
  params: {
    apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY
  }
});

// Add interceptors for error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 429) {
      // Handle rate limiting
      console.error('API rate limit reached');
    }
    return Promise.reject(error);
  }
);

export const recipeApi = {
  search: async (params: { query: string }) => {
    const { data } = await api.get('/recipes/complexSearch', { params });
    return data.results;
  },

  getById: async (id: number) => {
    const { data } = await api.get(`/recipes/${id}/information`);
    return data;
  },

  getRandomRecipes: async (number: number = 10) => {
    const { data } = await api.get('/recipes/random', {
      params: { number },
    });
    return data.recipes;
  },
};
