export const StorageKeys = {
  SAVED_RECIPES: 'savedRecipes',
  MEAL_PLAN: 'mealPlan',
  USER_PREFERENCES: 'userPreferences'
} as const;

export const storage = {
  get: (key: keyof typeof StorageKeys) => {
    try {
      const item = localStorage.getItem(StorageKeys[key]);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage:`, error);
      return null;
    }
  },

  set: (key: keyof typeof StorageKeys, value: any) => {
    try {
      localStorage.setItem(StorageKeys[key], JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage:`, error);
    }
  },

  remove: (key: keyof typeof StorageKeys) => {
    try {
      localStorage.removeItem(StorageKeys[key]);
    } catch (error) {
      console.error(`Error removing from localStorage:`, error);
    }
  }
};
