import { Grid, Paper, Skeleton, Box } from '@mui/material';

export const HomePageSkeleton = () => {
  return (
    <>
      {/* Welcome Section */}
      <Box sx={{ mb: 6 }}>
        <Skeleton variant="text" height={60} width="60%" sx={{ mb: 2 }} />
        <Skeleton variant="text" height={32} width="40%" />
      </Box>

      {/* Feature Cards */}
      <Grid container spacing={4}>
        {Array(3).fill(null).map((_, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Skeleton variant="circular" width={48} height={48} />
              <Skeleton variant="text" height={32} width="60%" />
              <Skeleton variant="text" height={20} width="80%" />
              <Skeleton variant="text" height={20} width="70%" />
              <Box sx={{ mt: 'auto' }}>
                <Skeleton variant="rounded" width={120} height={36} />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Recent Recipes Section */}
      <Box sx={{ mt: 6 }}>
        <Skeleton variant="text" height={40} width="200px" sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          {Array(3).fill(null).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box sx={{ height: '100%' }}>
                <Skeleton variant="rectangular" height={194} />
                <Box sx={{ pt: 2 }}>
                  <Skeleton variant="text" height={24} width="80%" />
                  <Skeleton variant="text" height={20} width="60%" />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
