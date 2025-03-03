import { Container, Grid, Typography, Alert } from '@mui/material';
import { RecipeCard } from '../components/RecipeCard';
import { useRecipes } from '../context/RecipeContext';
import { RecipeCardSkeleton } from '../components/skeletons/RecipeCardSkeleton';
import { useState, useEffect } from 'react';

export const SavedRecipesPage = () => {
  const { state, dispatch } = useRecipes();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for smoother UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRemoveRecipe = (recipeId: number) => {
    dispatch({ type: 'REMOVE_RECIPE', payload: recipeId });
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Saved Recipes
        </Typography>
        <Grid container spacing={3}>
          {Array(3).fill(null).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <RecipeCardSkeleton />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Saved Recipes
      </Typography>

      {state.savedRecipes.length === 0 ? (
        <Alert severity="info">
          You haven't saved any recipes yet. Search for recipes and save them to see them here!
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {state.savedRecipes.map(recipe => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <RecipeCard
                recipe={recipe}
                onSave={() => handleRemoveRecipe(recipe.id)}
                isSaved
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
