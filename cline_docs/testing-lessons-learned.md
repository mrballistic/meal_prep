# Testing Lessons Learned

## Testing Strategy

### 1. Component Testing Hierarchy

#### Atomic Components (e.g., RecipeCard)
- Test rendering with minimal props
- Test user interactions (clicks, hovers)
- Test error states (image loading)
- Test accessibility features
- Mock callbacks and verify they're called

Example:
```typescript
describe('RecipeCard', () => {
  const mockRecipe = {
    id: 1,
    title: 'Test Recipe',
    image: 'http://example.com/image.jpg'
  };

  it('renders with minimal props', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
  });

  it('handles image loading errors', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    const img = screen.getByRole('img');
    fireEvent.error(img);
    expect(img.src).toContain('placehold.co');
  });

  it('calls onSave when bookmark button is clicked', () => {
    const onSave = jest.fn();
    render(<RecipeCard recipe={mockRecipe} onSave={onSave} />);
    fireEvent.click(screen.getByLabelText(/save.*recipe/i));
    expect(onSave).toHaveBeenCalledWith(mockRecipe);
  });
});
```

#### Container Components (e.g., SearchPage)
- Test loading states
- Test error states
- Test data fetching
- Test state updates
- Mock child components when necessary

Example:
```typescript
describe('SearchPage', () => {
  it('shows loading state while fetching', () => {
    render(<SearchPage />);
    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'chicken' }
    });
    expect(screen.getAllByTestId('recipe-skeleton')).toHaveLength(12);
  });

  it('shows error message on API failure', async () => {
    server.use(
      rest.get('/recipes/search', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(<SearchPage />);
    // Test error handling
  });
});
```

### 2. Context Testing

#### Recipe Context
- Test initial state
- Test all reducer actions
- Test localStorage integration
- Test provider wrapper

Example:
```typescript
describe('RecipeContext', () => {
  it('loads saved recipes from localStorage', () => {
    const mockRecipes = [{ id: 1, title: 'Saved Recipe' }];
    localStorage.setItem('savedRecipes', JSON.stringify(mockRecipes));
    
    render(
      <RecipeProvider>
        <TestComponent />
      </RecipeProvider>
    );
    
    expect(screen.getByText('Saved Recipe')).toBeInTheDocument();
  });
});
```

### 3. Hook Testing

#### Custom Hooks
- Use renderHook from @testing-library/react-hooks
- Test all possible states
- Test cleanup/unmount
- Test error handling

Example:
```typescript
describe('useRecipeSearch', () => {
  it('returns recipes for search term', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useRecipeSearch('chicken')
    );
    
    expect(result.current.isLoading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.data).toHaveLength(12);
  });
});
```

### 4. API Testing

#### Mock Service Worker
- Set up MSW for API mocking
- Test successful responses
- Test error responses
- Test loading states

Example:
```typescript
describe('recipeApi', () => {
  const handlers = [
    rest.get('/recipes/search', (req, res, ctx) => {
      return res(ctx.json({ results: mockRecipes }));
    }),
  ];
  
  const server = setupServer(...handlers);
  
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
});
```

## Best Practices

### 1. Test Setup
- Use beforeEach for common setup
- Clean localStorage between tests
- Reset handlers between tests
- Use test-specific data
- Create a single test, then test it. when it passes, move to create another test
- Disable watch mode globally in package.json (set "test": "react-scripts test --watchAll=false") to ensure consistent, clean test runs without manual intervention

### 2. Testing Utilities
```typescript
// test-utils.tsx
const AllTheProviders = ({ children }) => {
  return (
    <RecipeProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </RecipeProvider>
  );
};

const customRender = (ui: ReactElement, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });
```

### 3. Common Patterns

#### Testing Loading States
```typescript
it('shows loading state', () => {
  customRender(<Component />);
  expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
});
```

#### Testing MUI Components
```typescript
// Mock MUI components with theme and style support
// src/__mocks__/@mui/material.tsx

// TextField with fullWidth and accessibility support
export const TextField = (props: any) => {
  const { fullWidth, InputProps = {}, label, ...rest } = props;
  return (
    <div 
      className={`MuiFormControl-root ${fullWidth ? 'MuiFormControl-fullWidth' : ''}`}
      style={fullWidth ? { width: '100%' } : undefined}
    >
      <input
        type="text"
        aria-label={label}
        aria-describedby={InputProps['aria-describedby']}
        {...rest}
        {...InputProps}
      />
    </div>
  );
};

// Box with sx prop and theme spacing support
export const Box = (props: any) => {
  const { sx, ...rest } = props;
  const style = sx && typeof sx === 'object' ? {
    ...(sx.my ? { marginTop: `${sx.my * 8}px`, marginBottom: `${sx.my * 8}px` } : {})
  } : {};
  
  return <div style={style} {...rest} />;
};

// Example tests for MUI components
describe('MUI Component Testing', () => {
  it('tests fullWidth prop', () => {
    render(<TextField fullWidth />);
    const element = screen.getByRole('textbox');
    expect(element.closest('.MuiFormControl-root')).toHaveStyle({ width: '100%' });
  });

  it('tests theme spacing', () => {
    render(<Box sx={{ my: 2 }} />);
    const element = screen.getByRole('generic');
    expect(element).toHaveStyle({ 
      marginTop: '16px',     // 2 * 8px
      marginBottom: '16px'   // 2 * 8px
    });
  });

  it('tests keyboard interactions', () => {
    render(<TextField label="Test Input" />);
    const input = screen.getByRole('textbox');
    
    // Always focus before keyboard events
    input.focus();
    fireEvent.keyDown(input, { key: 'a', code: 'KeyA' });
    
    // Verify focus state
    expect(input).toHaveFocus();
    expect(document.activeElement).toBe(input);
  });

  it('tests label rendering', () => {
    render(<TextField label="Test Label" />);
    // Test both the visible label and ARIA label
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', 'Test Label');
  });
});

// Important patterns for MUI testing:
// 1. Always test both visible labels and ARIA attributes
// 2. Focus elements before testing keyboard interactions
// 3. Use both toHaveFocus() and document.activeElement checks
// 4. Remember to handle theme spacing conversions (1 unit = 8px)
```

#### Testing Error States
```typescript
it('shows error message', async () => {
  server.use(
    rest.get('/api', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  
  customRender(<Component />);
  expect(await screen.findByText(/error/i)).toBeInTheDocument();
});
```

#### Testing User Interactions
```typescript
it('handles user interaction', () => {
  const onAction = jest.fn();
  customRender(<Component onAction={onAction} />);
  
  fireEvent.click(screen.getByRole('button'));
  expect(onAction).toHaveBeenCalled();
});
```

### 4. Test Coverage Goals
- Components: 90%+ coverage
- Hooks: 100% coverage
- Utils: 100% coverage
- Context: 100% coverage

### 5. Common Gotchas
1. Async Testing
   - Always await async operations
   - Use findBy* instead of getBy* for async elements
   - Handle loading states properly

2. Context Testing
   - Always wrap components in necessary providers
   - Mock context values when needed
   - Test provider and consumer separately

3. Event Handling
   - Use fireEvent for simple events
   - Use userEvent for complex interactions
   - Verify state changes after events

4. API Mocking
   - Keep mock data realistic
   - Test edge cases
   - Handle network errors
   - Test retry logic
