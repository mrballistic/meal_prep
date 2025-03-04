const mockNavigate = jest.fn();

const useNavigate = Object.assign(jest.fn(() => mockNavigate), {
  mockImplementation: (impl: () => any) => {
    (useNavigate as jest.Mock).mockReturnValue(impl());
    return useNavigate;
  }
});

const useLocation = jest.fn(() => ({ pathname: '/' }));

const createMockElement = (type: string, props: any) => ({
  $$typeof: Symbol.for('react.element'),
  type,
  props,
  ref: null,
  key: null
});

function BrowserRouter({ children }: any) {
  return createMockElement('div', {
    'data-testid': 'mock-browser-router',
    children
  });
}

function Routes({ children }: any) {
  return createMockElement('div', {
    'data-testid': 'mock-routes',
    children
  });
}

function Route() {
  return null;
}

function Link({ to, children }: any) {
  return createMockElement('a', {
    href: to,
    onClick: (e: any) => {
      e.preventDefault();
      mockNavigate(to);
    },
    'data-testid': 'mock-link',
    'data-to': to,
    children
  });
}

// Reset all mocks between tests
beforeEach(() => {
  mockNavigate.mockClear();
  useNavigate.mockClear();
  useLocation.mockClear();
});

export {
  mockNavigate,
  useNavigate,
  useLocation,
  BrowserRouter,
  Routes,
  Route,
  Link
};
