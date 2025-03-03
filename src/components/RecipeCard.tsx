import { Card, CardContent, CardMedia, Typography, IconButton, Chip, Box } from '@mui/material';
import { Bookmark as BookmarkIcon, BookmarkBorder as BookmarkBorderIcon } from '@mui/icons-material';
import { Recipe } from '../types';
import { useState } from 'react';

interface RecipeCardProps {
  recipe: Recipe;
  onSave?: (recipe: Recipe) => void;
  isSaved?: boolean;
}

const FALLBACK_IMAGE = 'https://placehold.co/345x194/e0e0e0/666666.png?text=No+Image+Available';

// Pre-load the fallback image
const preloadFallbackImage = new Image();
preloadFallbackImage.src = FALLBACK_IMAGE;

export const RecipeCard = ({ recipe, onSave, isSaved }: RecipeCardProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    if (img.src !== FALLBACK_IMAGE) {
      setImageError(true);
      img.src = FALLBACK_IMAGE;
    }
  };

  return (
    <Card 
      component="article"
      sx={{ 
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:focus-within': {
          outline: '2px solid #1976d2'
        }
      }}
    >
      <CardMedia
        component="img"
        height="194"
        image={imageError ? FALLBACK_IMAGE : recipe.image}
        alt={`Prepared ${recipe.title}`}
        onError={handleImageError}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography 
          variant="h6" 
          component="h2"
          gutterBottom
        >
          {recipe.title}
        </Typography>

        <Box 
          role="group" 
          aria-label="Recipe information"
          sx={{ mb: 2 }}
        >
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
          <Box 
            sx={{ mb: 2 }}
            role="group" 
            aria-label="Dietary information"
          >
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

        {onSave && (
          <IconButton
            onClick={() => onSave(recipe)}
            aria-label={`${isSaved ? 'Remove from' : 'Save to'} saved recipes: ${recipe.title}`}
            sx={{ mt: 'auto' }}
          >
            {isSaved ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
};
