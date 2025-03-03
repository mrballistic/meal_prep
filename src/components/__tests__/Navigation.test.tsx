import { render, screen } from '@testing-library/react';
import { Navigation } from '../Navigation';
import { useRecipes } from '../../context/RecipeContext';
import { useNavigate } from 'react-router-dom';

// Mock modules
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
  BrowserRouter: ({ children }: any) => children,
  Routes: ({ children }: any) => children,
  Route: () => null
}));

jest.mock('../../context/RecipeContext');

jest.mock('@mui/material', () => ({
  AppBar: ({ children }: any) => children,
  Toolbar: ({ children }: any) => children,
  IconButton: ({ onClick, children, 'aria-label': ariaLabel }: any) => children,
  Typography: ({ children }: any) => children,
  Drawer: ({ children, open }: any) => open ? children : null,
  List: ({ children }: any) => children,
  ListItemButton: ({ onClick, children }: any) => children,
  ListItemText: ({ primary }: any) => primary,
  ListItemIcon: ({ children }: any) => children,
  Box: ({ children }: any) => children,
  Badge: ({ badgeContent, children }: any) => `${children}${badgeContent}`
}));

jest.mock('@mui/icons-material', () => ({
  Menu: () => 'Menu Icon',
  Home: () => 'Home Icon',
  Search: () => 'Search Icon',
  CalendarMonth: () => 'Calendar Icon',
  Bookmark: () => 'Bookmark Icon'
}));

// Setup mock implementations
const mockNavigate = jest.fn();
(useNavigate as jest.Mock).mockImplementation(() => mockNavigate);

describe('Navigation', () => {
  beforeEach(() => {
    // Set up default mock implementation
    (useRecipes as jest.Mock).mockReturnValue({
      state: {
        savedRecipes: []
      }
    });
    jest.clearAllMocks();
  });

  it('renders the app title', () => {
    render(<Navigation />);
    expect(screen.getByText('Meal Planner')).toBeInTheDocument();
  });

  it('renders menu items with correct paths', () => {
    render(<Navigation />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Saved Recipes')).toBeInTheDocument();
    expect(screen.getByText('Planner')).toBeInTheDocument();
  });

  it('shows badge with number of saved recipes', () => {
    (useRecipes as jest.Mock).mockReturnValue({
      state: {
        savedRecipes: [{ id: 1 }, { id: 2 }]
      }
    });
    render(<Navigation />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('navigates when menu item is clicked', () => {
    render(<Navigation />);
    screen.getByText('Search').click();
    expect(mockNavigate).toHaveBeenCalledWith('/search');
  });

  it('renders skip link for accessibility', () => {
    render(<Navigation />);
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });

  it('opens and closes drawer', () => {
    render(<Navigation />);
    
    // Initially drawer should be closed
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    
    // Open drawer
    const menuButton = screen.getByLabelText('open menu');
    menuButton.click();
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    // Close drawer
    const drawer = screen.getByRole('menu');
    drawer.click();
    expect(mockNavigate).toHaveBeenCalled();
  });
});
