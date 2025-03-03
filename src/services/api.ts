import axios from 'axios';
import { SearchResponse, Recipe, RecipeDetails } from '../types';

const DEFAULT_IMAGE = 'https://placehold.co/345x194/e0e0e0/666666.png?text=No+Image+Available';

const validateRecipe = (recipe: any): Recipe | RecipeDetails => {
  return {
    ...recipe,
    image: recipe.image && recipe.image.startsWith('http') 
      ? recipe.image 
      : DEFAULT_IMAGE
  };
};

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
  search: async (params: { query: string; offset?: number; number?: number }): Promise<SearchResponse> => {
    const { data } = await api.get('/recipes/complexSearch', {
      params: {
        ...params,
        number: params.number || 12 // Default to 12 recipes per page
      }
    });
    return {
      results: data.results.map(validateRecipe),
      totalResults: data.totalResults,
      offset: params.offset || 0,
      number: params.number || 12
    };
  },

  getById: async (id: number): Promise<RecipeDetails> => {
    const { data } = await api.get(`/recipes/${id}/information`, {
      params: {
        includeNutrition: true
      }
    });
    return validateRecipe(data) as RecipeDetails;
  },

  getRandomRecipes: async (number: number = 10): Promise<Recipe[]> => {
    const { data } = await api.get('/recipes/random', {
      params: { number },
    });
    return data.recipes.map(validateRecipe);
  },
};
