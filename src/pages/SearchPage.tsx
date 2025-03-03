import { useState } from 'react';
import { Container, Grid, Typography, Alert, Button, Box } from '@mui/material';
import { SearchBar } from '../components/SearchBar';
import { RecipeCard } from '../components/RecipeCard';
import { Recipe, SearchResponse } from '../types';
import { recipeApi } from '../services/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRecipes } from '../context/RecipeContext';
import { RecipeCardSkeleton } from '../components/skeletons/RecipeCardSkeleton';

const RECIPES_PER_PAGE = 12;

export const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { state, dispatch } = useRecipes();

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<SearchResponse>({
    queryKey: ['recipes', searchTerm],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      return recipeApi.search({ 
        query: searchTerm, 
        offset: pageParam as number,
        number: RECIPES_PER_PAGE 
      });
    },
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.offset + RECIPES_PER_PAGE;
      return nextOffset < lastPage.totalResults ? nextOffset : undefined;
    },
    enabled: searchTerm.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleSaveRecipe = (recipe: Recipe) => {
    dispatch({ type: 'ADD_RECIPE', payload: recipe });
  };

  const isSaved = (recipe: Recipe) => {
    return state.savedRecipes.some(saved => saved.id === recipe.id);
  };

  // Flatten all pages of recipes into a single array
  const allRecipes = data?.pages.flatMap(page => page.results) || [];
  const hasMore = data?.pages && data.pages.length > 0
    ? (data.pages[data.pages.length - 1].offset + RECIPES_PER_PAGE) < data.pages[0].totalResults
    : false;

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Search Recipes
      </Typography>

      <SearchBar 
        value={searchTerm} 
        onChange={handleSearch}
      />

      {isLoading && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {Array(RECIPES_PER_PAGE).fill(null).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <RecipeCardSkeleton />
            </Grid>
          ))}
        </Grid>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Error loading recipes. Please try again later.
        </Alert>
      )}

      {!isLoading && !error && (
        <>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {allRecipes.length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="body1" color="text.secondary">
                  No recipes found. Try a different search term.
                </Typography>
              </Grid>
            ) : (
              allRecipes.map((recipe: Recipe) => (
                <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                  <RecipeCard 
                    recipe={recipe}
                    onSave={handleSaveRecipe}
                    isSaved={isSaved(recipe)}
                  />
                </Grid>
              ))
            )}
          </Grid>

          {hasMore && (
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                size="large"
              >
                {isFetchingNextPage ? 'Loading more recipes...' : 'Load More Recipes'}
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};
