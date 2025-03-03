import { useState } from 'react';
import { Container, Grid, Typography, Alert } from '@mui/material';
import { SearchBar } from '../components/SearchBar';
import { RecipeCard } from '../components/RecipeCard';
import { Recipe } from '../types';
import { recipeApi } from '../services/api';
import { useQuery } from '@tanstack/react-query';
import { useRecipes } from '../context/RecipeContext';
import { RecipeCardSkeleton } from '../components/skeletons/RecipeCardSkeleton';

export const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: recipes, isLoading, error } = useQuery({
    queryKey: ['recipes', searchTerm],
    queryFn: () => recipeApi.search({ query: searchTerm }),
    enabled: searchTerm.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { state, dispatch } = useRecipes();

  const handleSaveRecipe = (recipe: Recipe) => {
    dispatch({ type: 'ADD_RECIPE', payload: recipe });
  };

  const isSaved = (recipe: Recipe) => {
    return state.savedRecipes.some(saved => saved.id === recipe.id);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Search Recipes
      </Typography>

      <SearchBar 
        value={searchTerm} 
        onChange={setSearchTerm}
      />

      {isLoading && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {Array(6).fill(null).map((_, index) => (
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

      {!isLoading && !error && recipes && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {recipes.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="body1" color="text.secondary">
                No recipes found. Try a different search term.
              </Typography>
            </Grid>
          ) : (
            recipes.map((recipe: Recipe) => (
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
      )}
    </Container>
  );
};
