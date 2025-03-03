# Meal Planning Application - Technical Documentation

## Core Architecture

### Technology Stack
1. Frontend
   - React 19 with TypeScript
   - Material-UI (MUI) v6.4.6 for components
   - React Router v7.2.0 for navigation
   - Axios v1.8.1 for API calls
   - @tanstack/react-query v5.67.1 for API state management
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
  // ... other API methods
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
  // ... other storage methods
};
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

// ... reducer implementation
```

### 4. Branding and Assets
```typescript
// public/index.html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico?v=5" />

// Favicon Implementation
- Custom fork and knife favicon from Apple emoji set
- Multiple sizes for different devices (16x16 to 64x64)
- Cache-busting version parameter
- High-quality rendering for retina displays
```

## Current Status

### Implemented Features
- Recipe search with Spoonacular API integration
- Recipe saving/unsaving with local storage persistence
- Responsive navigation with saved recipes counter
- Home page with quick access and recent recipes
- Search page with real-time recipe saving status
- Saved recipes page with recipe management
- Custom favicon with cache-busting

### In Progress
- Meal planning interface
- Drag and drop functionality
- User preferences system

### Pending
- Testing implementation
- Error boundaries
- Performance optimization
- Documentation completion
