# Meal Planning Application - Technical Documentation

## Core Architecture

### Technology Stack
1. Frontend
   - React 19 with TypeScript
   - Material-UI (MUI) v5 for components
   - React Router v6 for navigation
   - Axios for API calls
   - @tanstack/react-query for API state management
   - Local Storage for data persistence

### Project Structure
```
src/
├── components/      # Reusable UI components
├── pages/          # Route-level components
├── services/       # API and external services
├── hooks/          # Custom React hooks
├── context/        # React context providers
├── utils/          # Utility functions
├── types/          # TypeScript type definitions
└── assets/         # Static assets
```

## Core Features Implementation

### 1. Recipe Search & API Integration
```typescript
// services/api.ts
export const recipeApi = {
  search: async (params: { query: string }) => {
    const { data } = await api.get('/recipes/complexSearch', { params });
    return data.results;
  },

  getById: async (id: number) => {
    const { data } = await api.get(`/recipes/${id}/information`);
    return data;
  },

  getRandomRecipes: async (number: number = 10) => {
    const { data } = await api.get('/recipes/random', {
      params: { number },
    });
    return data.recipes;
  },
};
```

### 2. Local Storage Management
```typescript
// utils/storage.ts
type StorageKey = 'SAVED_RECIPES' | 'MEAL_PLAN' | 'USER_PREFERENCES';

export const storage = {
  get: (key: StorageKey) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage:`, error);
      return null;
    }
  },

  set: (key: StorageKey, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage:`, error);
    }
  },

  remove: (key: StorageKey) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage:`, error);
    }
  }
};
```

### 3. Branding and Assets
```typescript
// public/index.html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico?v=5" />

// Favicon Implementation
- Custom fork and knife favicon from Apple emoji set
- Multiple sizes for different devices (16x16 to 64x64)
- Cache-busting version parameter
- High-quality rendering for retina displays
```

### 3. Recipe State Management
```typescript
// context/RecipeContext.tsx
interface RecipeState {
  savedRecipes: Recipe[];
}

type RecipeAction =
  | { type: 'ADD_RECIPE'; payload: Recipe }
  | { type: 'REMOVE_RECIPE'; payload: number }
  | { type: 'SET_RECIPES'; payload: Recipe[] };

const recipeReducer = (state: RecipeState, action: RecipeAction): RecipeState => {
  switch (action.type) {
    case 'ADD_RECIPE':
      if (state.savedRecipes.some(recipe => recipe.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        savedRecipes: [...state.savedRecipes, action.payload],
      };

    case 'REMOVE_RECIPE':
      return {
        ...state,
        savedRecipes: state.savedRecipes.filter(recipe => recipe.id !== action.payload),
      };

    case 'SET_RECIPES':
      return {
        ...state,
        savedRecipes: action.payload,
      };

    default:
      return state;
  }
};
```

## Component Architecture

### 1. Navigation System
```typescript
// components/Navigation.tsx
export const Navigation = () => {
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

  // ... implementation
};
```

### 2. Recipe Card Component
```typescript
// components/RecipeCard.tsx
interface RecipeCardProps {
  recipe: Recipe;
  onSave?: (recipe: Recipe) => void;
  isSaved?: boolean;
}

export const RecipeCard = ({ recipe, onSave, isSaved }: RecipeCardProps) => {
  return (
    <Card 
      component="article"
      sx={{ 
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        component="img"
        height="194"
        image={recipe.image}
        alt={`Prepared ${recipe.title}`}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Card content */}
        {onSave && (
          <IconButton
            onClick={() => onSave(recipe)}
            aria-label={`Save ${recipe.title} recipe`}
          >
            {isSaved ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
};
```

### 3. Search Implementation
```typescript
// pages/SearchPage.tsx
export const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { state, dispatch } = useRecipes();

  const { data: recipes, isLoading, error } = useQuery({
    queryKey: ['recipes', searchTerm],
    queryFn: () => recipeApi.search({ query: searchTerm }),
    enabled: searchTerm.length > 0,
  });

  const handleSaveRecipe = (recipe: Recipe) => {
    dispatch({ type: 'ADD_RECIPE', payload: recipe });
  };

  const isSaved = (recipe: Recipe) => {
    return state.savedRecipes.some(saved => saved.id === recipe.id);
  };

  // ... render implementation
};
```

### 4. Home Page Layout
```typescript
// pages/HomePage.tsx
export const HomePage = () => {
  const { state } = useRecipes();
  const recentRecipes = state.savedRecipes.slice(0, 3);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome section */}
      <Grid container spacing={4}>
        {/* Quick access cards */}
      </Grid>
      {recentRecipes.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Recently Saved Recipes
          </Typography>
          <Grid container spacing={3}>
            {/* Recent recipes grid */}
          </Grid>
        </Box>
      )}
    </Container>
  );
};
```

## Type Definitions

```typescript
// types/index.ts
export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
  diets?: string[];
  summary?: string;
}

export interface RecipeDetails extends Recipe {
  instructions: string;
  extendedIngredients: Ingredient[];
  nutrition?: NutritionInfo;
}

export interface MealPlan {
  [day: string]: {
    breakfast?: Recipe;
    lunch?: Recipe;
    dinner?: Recipe;
  };
}
```

## Current Status

### Implemented Features
- Recipe search with Spoonacular API integration
- Recipe saving/unsaving with local storage persistence
- Responsive navigation with saved recipes counter
- Home page with quick access and recent recipes
- Search page with real-time recipe saving status
- Saved recipes page with recipe management

### In Progress
- Meal planning interface
- Drag and drop functionality
- User preferences system

### Pending
- Testing implementation
- Error boundaries
- Performance optimization
- Documentation completion
