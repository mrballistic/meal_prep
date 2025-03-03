import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { HomePageSkeleton } from '../components/skeletons/HomePageSkeleton';
import { Search as SearchIcon, Bookmark as BookmarkIcon, CalendarMonth as CalendarIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { RecipeCard } from '../components/RecipeCard';

export const HomePage = () => {
  const navigate = useNavigate();
  const { state } = useRecipes();
  const recentRecipes = state.savedRecipes.slice(0, 3);

  // Add a small delay to show loading state
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <HomePageSkeleton />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Meal Planner
        </Typography>
        <Typography variant="h5" component="h2" color="text.secondary" gutterBottom>
          Plan your meals, discover recipes, and eat healthier
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: 3, 
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}
          >
            <SearchIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h6" component="h3">
              Find Recipes
            </Typography>
            <Typography color="text.secondary">
              Search through thousands of recipes to find your next meal
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/search')}
              sx={{ mt: 'auto' }}
            >
              Search Recipes
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: 3, 
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}
          >
            <BookmarkIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h6" component="h3">
              Saved Recipes
            </Typography>
            <Typography color="text.secondary">
              Access your favorite recipes quickly
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/saved')}
              sx={{ mt: 'auto' }}
            >
              View Saved ({state.savedRecipes.length})
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: 3, 
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}
          >
            <CalendarIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h6" component="h3">
              Meal Planning
            </Typography>
            <Typography color="text.secondary">
              Plan your meals for the week ahead
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/planner')}
              sx={{ mt: 'auto' }}
            >
              Open Planner
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {recentRecipes.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Recently Saved Recipes
          </Typography>
          <Grid container spacing={3}>
            {recentRecipes.map(recipe => (
              <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                <RecipeCard 
                  recipe={recipe}
                  onSave={() => navigate('/saved')}
                  isSaved
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};
