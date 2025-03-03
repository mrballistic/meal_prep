import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: any) => children,
  Routes: ({ children }: any) => children,
  Route: () => null
}));

// Mock @tanstack/react-query
jest.mock('@tanstack/react-query', () => ({
  QueryClient: jest.fn(),
  QueryClientProvider: ({ children }: any) => children
}));

// Mock components
jest.mock('./components/Navigation', () => ({
  Navigation: () => <div>Navigation</div>
}));

jest.mock('./pages/HomePage', () => ({
  HomePage: () => <div>Home Page</div>
}));

jest.mock('./pages/SearchPage', () => ({
  SearchPage: () => <div>Search Page</div>
}));

jest.mock('./pages/PlannerPage', () => ({
  PlannerPage: () => <div>Planner Page</div>
}));

jest.mock('./pages/SavedRecipesPage', () => ({
  SavedRecipesPage: () => <div>Saved Recipes Page</div>
}));

describe('App', () => {
  it('renders navigation and main content', () => {
    render(<App />);
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
