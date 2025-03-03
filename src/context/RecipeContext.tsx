import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Recipe } from '../types';
import { storage } from '../utils/storage';

interface RecipeState {
  savedRecipes: Recipe[];
}

type RecipeAction =
  | { type: 'ADD_RECIPE'; payload: Recipe }
  | { type: 'REMOVE_RECIPE'; payload: number }
  | { type: 'SET_RECIPES'; payload: Recipe[] };

const initialState: RecipeState = {
  savedRecipes: [],
};

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

const RecipeContext = createContext<{
  state: RecipeState;
  dispatch: React.Dispatch<RecipeAction>;
} | null>(null);

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);

  // Load saved recipes from localStorage on mount
  useEffect(() => {
    const savedRecipes = storage.get('SAVED_RECIPES');
    if (savedRecipes) {
      dispatch({ type: 'SET_RECIPES', payload: savedRecipes });
    }
  }, []);

  // Save recipes to localStorage when they change
  useEffect(() => {
    storage.set('SAVED_RECIPES', state.savedRecipes);
  }, [state.savedRecipes]);

  return (
    <RecipeContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};
