import { Paper, Grid, Skeleton, Box } from '@mui/material';

export const PlannerSkeleton = () => {
  const days = Array(7).fill(null); // 7 days of the week
  const meals = Array(3).fill(null); // 3 meals per day

  return (
    <Grid container spacing={2}>
      {days.map((_, dayIndex) => (
        <Grid item xs={12} key={dayIndex}>
          <Paper sx={{ p: 2 }}>
            <Skeleton variant="text" height={32} width="120px" sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              {meals.map((_, mealIndex) => (
                <Grid item xs={12} md={4} key={mealIndex}>
                  <Box
                    sx={{
                      p: 2,
                      border: '1px dashed',
                      borderColor: 'divider',
                      borderRadius: 1,
                      minHeight: 100,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                    }}
                  >
                    <Skeleton variant="text" height={24} width="60%" />
                    <Skeleton variant="text" height={20} width="40%" />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
