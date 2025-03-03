import { render, screen, fireEvent } from '@testing-library/react';
import { RecipeCard } from '../RecipeCard';
import { Recipe } from '../../types';

describe('RecipeCard', () => {
  const mockRecipe: Recipe = {
    id: 1,
    title: 'Test Recipe',
    image: 'http://example.com/image.jpg',
    readyInMinutes: 30,
    servings: 4,
    diets: ['vegetarian', 'gluten-free']
  };

  it('renders recipe information correctly', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    
    // Test title
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    
    // Test recipe details
    expect(screen.getByText('Prep time: 30 minutes')).toBeInTheDocument();
    expect(screen.getByText('Servings: 4')).toBeInTheDocument();
    
    // Test diet tags
    expect(screen.getByText('vegetarian')).toBeInTheDocument();
    expect(screen.getByText('gluten-free')).toBeInTheDocument();
    
    // Test image
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'http://example.com/image.jpg');
    expect(image).toHaveAttribute('alt', 'Prepared Test Recipe');
  });

  it('handles image loading errors', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    
    const image = screen.getByRole('img');
    fireEvent.error(image);
    
    // Verify fallback image is used
    expect(image.src).toContain('placehold.co');
  });

  it('shows save button when onSave prop is provided', () => {
    const handleSave = jest.fn();
    render(<RecipeCard recipe={mockRecipe} onSave={handleSave} />);
    
    const saveButton = screen.getByLabelText(/save.*recipe/i);
    expect(saveButton).toBeInTheDocument();
  });

  it('calls onSave when save button is clicked', () => {
    const handleSave = jest.fn();
    render(<RecipeCard recipe={mockRecipe} onSave={handleSave} />);
    
    const saveButton = screen.getByLabelText(/save.*recipe/i);
    fireEvent.click(saveButton);
    
    expect(handleSave).toHaveBeenCalledWith(mockRecipe);
  });

  it('shows different icon when recipe is saved', () => {
    render(<RecipeCard recipe={mockRecipe} onSave={() => {}} isSaved={true} />);
    
    const removeButton = screen.getByLabelText(/remove from saved recipes/i);
    expect(removeButton).toBeInTheDocument();
  });

  it('renders without optional props', () => {
    const minimalRecipe: Recipe = {
      id: 1,
      title: 'Minimal Recipe',
      image: 'http://example.com/image.jpg'
    };
    
    render(<RecipeCard recipe={minimalRecipe} />);
    
    // Basic content should be present
    expect(screen.getByText('Minimal Recipe')).toBeInTheDocument();
    
    // Optional content should not be present
    expect(screen.queryByText(/prep time/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/servings/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/save recipe/i)).not.toBeInTheDocument();
  });

  it('maintains aspect ratio of card media', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveStyle({ objectFit: 'cover' });
  });
});
