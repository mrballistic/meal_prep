import '@testing-library/jest-dom';

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: '/' }),
  BrowserRouter: ({ children }: any) => children,
  Routes: ({ children }: any) => children,
  Route: () => null
}));

// Mock @tanstack/react-query
jest.mock('@tanstack/react-query', () => ({
  QueryClient: jest.fn(),
  QueryClientProvider: ({ children }: any) => children
}));

// Mock @mui/material
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

// Mock @mui/icons-material
jest.mock('@mui/icons-material', () => ({
  Menu: () => 'Menu Icon',
  Home: () => 'Home Icon',
  Search: () => 'Search Icon',
  CalendarMonth: () => 'Calendar Icon',
  Bookmark: () => 'Bookmark Icon'
}));
