import '@testing-library/jest-dom';

// Mock window.matchMedia
window.matchMedia = jest.fn().mockImplementation(query => ({
  matches: query === '(prefers-color-scheme: dark)',
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

// Mock @tanstack/react-query
jest.mock('@tanstack/react-query', () => ({
  QueryClient: jest.fn(() => ({
    setDefaultOptions: jest.fn(),
    mount: jest.fn()
  })),
  QueryClientProvider: ({ children }: any) => children,
  useQuery: () => ({ data: null, isLoading: false, error: null })
}));
