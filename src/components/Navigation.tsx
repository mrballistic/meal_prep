import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItemButton, ListItemText, ListItemIcon, Box, Badge } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, Search as SearchIcon, CalendarMonth as CalendarIcon, Bookmark as BookmarkIcon } from '@mui/icons-material';
import { useRecipes } from '../context/RecipeContext';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { state } = useRecipes();
  
  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Search', path: '/search', icon: <SearchIcon /> },
    { text: 'Saved Recipes', path: '/saved', icon: 
      <Badge badgeContent={state.savedRecipes.length} color="primary" max={99}>
        <BookmarkIcon />
      </Badge>
    },
    { text: 'Planner', path: '/planner', icon: <CalendarIcon /> },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🍴 Meal Planner
          </Typography>
          
          {/* Skip Link for Keyboard Users */}
          <Box
            component="a"
            href="#main-content"
            sx={{
              position: 'absolute',
              left: '-9999px',
              '&:focus': {
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'background.paper',
                padding: 2,
                zIndex: 'tooltip',
              }
            }}
          >
            Skip to main content
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        aria-label="navigation menu"
      >
        <List sx={{ width: 250 }} role="menu">
          <ListItemText 
            primary="🍴 Meal Planner 🥄" 
            sx={{ 
              textAlign: 'center', 
              py: 2,
              '& .MuiTypography-root': {
                fontWeight: 'bold'
              }
            }} 
          />
          {menuItems.map(({ text, path, icon }) => (
            <ListItemButton
              key={text}
              onClick={() => handleNavigation(path)}
              selected={location.pathname === path}
              role="menuitem"
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};
