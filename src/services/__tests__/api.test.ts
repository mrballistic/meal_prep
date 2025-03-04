import { recipeApi } from '../api';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('recipeApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('searches for recipes', async () => {
    const mockRecipes = [
      { id: 1, title: 'Pasta', image: 'https://placehold.co/345x194/e0e0e0/666666.png?text=No+Image+Available' },
      { id: 2, title: 'Pizza', image: 'https://placehold.co/345x194/e0e0e0/666666.png?text=No+Image+Available' }
    ];

    const mockResponse = {
      results: mockRecipes,
      offset: 0,
      number: 12,
      totalResults: undefined
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await recipeApi.search({ query: 'italian' });

    expect(mockedAxios.get).toHaveBeenCalledWith('/recipes/complexSearch', {
      params: { query: 'italian', number: 12 }
    });
    expect(result).toEqual(mockResponse);
  });

  it('handles API errors', async () => {
    const errorMessage = 'API Error';
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    await expect(recipeApi.search({ query: 'italian' }))
      .rejects
      .toThrow(errorMessage);
  });
});
