import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, List, ListItem, ListItemText, Chip, CircularProgress, Alert, Paper, Grid, IconButton, Tooltip } from '@mui/material';
import { Bookmark as BookmarkIcon, BookmarkBorder as BookmarkBorderIcon } from '@mui/icons-material';
import { Recipe, RecipeDetails } from '../types';
import { recipeApi } from '../services/api';
import { useRecipes } from '../context/RecipeContext';

const SaveButton = ({ recipe }: { recipe: Recipe }) => {
  const { state, dispatch } = useRecipes();
  const isSaved = state.savedRecipes.some(saved => saved.id === recipe.id);

  const handleClick = () => {
    if (isSaved) {
      dispatch({ type: 'REMOVE_RECIPE', payload: recipe.id });
    } else {
      dispatch({ type: 'ADD_RECIPE', payload: recipe });
    }
  };

  return (
    <Tooltip title={isSaved ? "Remove from saved recipes" : "Save recipe"}>
      <IconButton 
        onClick={handleClick}
        aria-label={isSaved ? "Remove from saved recipes" : "Save recipe"}
        color="primary"
        sx={{ mt: 1 }}
      >
        {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};

const htmlContentStyles = {
  '& a': {
    color: 'primary.main',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
};

export const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await recipeApi.getById(Number(id));
        setRecipe(data);
      } catch (err) {
        setError('Failed to load recipe details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Paper 
          elevation={2}
          sx={{ 
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh'
          }}
        >
          <CircularProgress />
        </Paper>
      </Container>
    );
  }

  if (error || !recipe) {
    return (
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Paper 
          elevation={2}
          sx={{ 
            p: { xs: 2, sm: 3 },
            borderRadius: 2
          }}
        >
          <Alert severity="error">
            {error || 'Recipe not found'}
          </Alert>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Paper 
        component="article"
        elevation={2}
        sx={{ 
          p: { xs: 2, sm: 3 },
          borderRadius: 2
        }}
      >
        {/* Header */}
        <Box mb={4}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ flex: 1 }}>
              {recipe.title}
            </Typography>
            <SaveButton recipe={recipe} />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            {recipe.readyInMinutes && (
              <Typography variant="body2" color="text.secondary">
                Prep time: {recipe.readyInMinutes} minutes
              </Typography>
            )}
            {recipe.servings && (
              <Typography variant="body2" color="text.secondary">
                Servings: {recipe.servings}
              </Typography>
            )}
          </Box>

          {recipe.diets && recipe.diets.length > 0 && (
            <Box sx={{ mb: 2 }}>
              {recipe.diets.map(diet => (
                <Chip 
                  key={diet}
                  label={diet}
                  size="small"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          )}
        </Box>

        {/* Image */}
        <Box 
          component="img"
          src={recipe.image}
          alt={`Prepared ${recipe.title}`}
          sx={{
            width: '100%',
            maxHeight: 400,
            objectFit: 'cover',
            borderRadius: 1,
            mb: 4
          }}
        />

        {/* Summary */}
        {recipe.summary && (
          <Box mb={4}>
            <Typography variant="h6" component="h2" gutterBottom>
              Summary
            </Typography>
            <Typography 
              variant="body1" 
              component="div"
              sx={htmlContentStyles}
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            />
          </Box>
        )}

        {/* Ingredients */}
        {recipe.extendedIngredients && (
          <Box mb={4}>
            <Typography variant="h6" component="h2" gutterBottom>
              Ingredients
            </Typography>
            <List>
              {recipe.extendedIngredients.map((ingredient) => (
                <ListItem key={ingredient.id}>
                  <ListItemText primary={ingredient.original} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Instructions */}
        {recipe.instructions && (
          <Box mb={4}>
            <Typography variant="h6" component="h2" gutterBottom>
              Instructions
            </Typography>
            <Typography 
              variant="body1" 
              component="div"
              sx={htmlContentStyles}
              dangerouslySetInnerHTML={{ __html: recipe.instructions }}
            />
          </Box>
        )}

        {/* Nutrition Information */}
        {recipe.nutrition && (
          <Box mb={4}>
            <Typography variant="h6" component="h2" gutterBottom>
              Nutrition Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    height: '100%'
                  }}
                >
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Calories
                  </Typography>
                  <Typography variant="h6">
                    {recipe.nutrition.calories}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    height: '100%'
                  }}
                >
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Protein
                  </Typography>
                  <Typography variant="h6">
                    {recipe.nutrition.protein}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    height: '100%'
                  }}
                >
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Carbs
                  </Typography>
                  <Typography variant="h6">
                    {recipe.nutrition.carbs}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    height: '100%'
                  }}
                >
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Fat
                  </Typography>
                  <Typography variant="h6">
                    {recipe.nutrition.fat}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  );
};
