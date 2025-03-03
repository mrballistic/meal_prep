import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, List, ListItem, ListItemText, Chip, CircularProgress, Alert, Paper } from '@mui/material';
import { RecipeDetails } from '../types';
import { recipeApi } from '../services/api';

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
          <Typography variant="h4" component="h1" gutterBottom>
            {recipe.title}
          </Typography>
          
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
          <Box>
            <Typography variant="h6" component="h2" gutterBottom>
              Nutrition Information
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Typography variant="body2">Calories: {recipe.nutrition.calories}</Typography>
              <Typography variant="body2">Protein: {recipe.nutrition.protein}</Typography>
              <Typography variant="body2">Carbs: {recipe.nutrition.carbs}</Typography>
              <Typography variant="body2">Fat: {recipe.nutrition.fat}</Typography>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};
