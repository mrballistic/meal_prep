import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { MealPlan } from '../types';

export const PlannerPage = () => {
  const [mealPlan] = useState<MealPlan>({});
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['breakfast', 'lunch', 'dinner'] as const;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Weekly Meal Planner
      </Typography>

      <Grid container spacing={2}>
        {days.map(day => (
          <Grid item xs={12} key={day}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                {day}
              </Typography>
              <Grid container spacing={2}>
                {mealTypes.map(mealType => (
                  <Grid item xs={12} md={4} key={mealType}>
                    <Box
                      sx={{
                        p: 2,
                        border: '1px dashed',
                        borderColor: 'divider',
                        borderRadius: 1,
                        minHeight: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {mealPlan[day]?.[mealType]?.title || `Add ${mealType}`}
                      </Typography>
                    </Box>
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
