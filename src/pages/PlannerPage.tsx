import { Container, Grid, Paper, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { MealPlan } from '../types';
import { PlannerSkeleton } from '../components/skeletons/PlannerSkeleton';

export const PlannerPage = () => {
  const [mealPlan] = useState<MealPlan>({});
  const [isLoading, setIsLoading] = useState(true);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['breakfast', 'lunch', 'dinner'] as const;

  useEffect(() => {
    // Simulate loading time for smoother UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Paper 
          elevation={2}
          sx={{ 
            p: { xs: 2, sm: 3 },
            borderRadius: 2
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Weekly Meal Planner
          </Typography>
          <PlannerSkeleton />
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper 
        elevation={2}
        sx={{ 
          p: { xs: 2, sm: 3 },
          mb: 3,
          borderRadius: 2
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Weekly Meal Planner
        </Typography>
      </Paper>

      <Grid container spacing={2}>
        {days.map(day => (
          <Grid item xs={12} key={day}>
            <Paper 
              elevation={2}
              sx={{ 
                p: { xs: 2, sm: 3 },
                borderRadius: 2
              }}
            >
              <Typography variant="h6" component="h2" gutterBottom>
                {day}
              </Typography>
              <Grid container spacing={2}>
                {mealTypes.map(mealType => (
                  <Grid item xs={12} md={4} key={mealType}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        minHeight: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderStyle: 'dashed',
                        bgcolor: 'background.default'
                      }}
                    >
                      <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {mealPlan[day]?.[mealType]?.title || `Add ${mealType}`}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
