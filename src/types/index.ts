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

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  original: string;
}

export interface NutritionInfo {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

export interface MealPlan {
  [day: string]: {
    breakfast?: Recipe;
    lunch?: Recipe;
    dinner?: Recipe;
  };
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  excludedIngredients: string[];
  servingSize: number;
}
