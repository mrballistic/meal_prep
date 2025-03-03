import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Box, PaletteMode, CssBaseline } from '@mui/material';
import { getTheme } from './utils/theme';
import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { PlannerPage } from './pages/PlannerPage';
import { SavedRecipesPage } from './pages/SavedRecipesPage';
import { RecipeProvider } from './context/RecipeContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setMode(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const theme = getTheme(mode);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RecipeProvider>
        <BrowserRouter>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navigation />
            <Box 
              component="main" 
              id="main-content" 
              sx={{ 
                flexGrow: 1,
                bgcolor: 'background.default',
                minHeight: '100vh'
              }}
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/planner" element={<PlannerPage />} />
                <Route path="/saved" element={<SavedRecipesPage />} />
              </Routes>
            </Box>
          </Box>
        </BrowserRouter>
        </RecipeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
