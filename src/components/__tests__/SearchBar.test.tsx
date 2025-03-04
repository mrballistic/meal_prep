import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('renders with provided value', () => {
    render(<SearchBar value="pasta" onChange={() => {}} />);
    const input = screen.getByRole('textbox', { name: /search recipes/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('pasta');
  });

  it('calls onChange when user types', () => {
    const onChange = jest.fn();
    render(<SearchBar value="" onChange={onChange} />);
    const input = screen.getByRole('textbox', { name: /search recipes/i });
    fireEvent.change(input, { target: { value: 'pizza' } });
    expect(onChange).toHaveBeenCalledWith('pizza');
  });

  it('has proper accessibility attributes', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    const input = screen.getByRole('textbox', { name: /search recipes/i });
    expect(input).toHaveAttribute('aria-label', 'Search recipes');
    expect(input).toHaveAttribute('aria-describedby', 'search-description');
    expect(input).toHaveAttribute('placeholder', 'Enter ingredients or recipe name...');
  });

  it('renders with fullWidth prop for responsive design', () => {
    const { container } = render(<SearchBar value="" onChange={() => {}} />);
    const searchBox = screen.getByTestId('SearchBar-root');
    expect(searchBox).toBeInTheDocument();
    const textField = container.querySelector('div.MuiFormControl-root');
    expect(textField).toHaveStyle({ width: '100%' });
  });

  it('applies correct margin styling', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    const searchBox = screen.getByTestId('SearchBar-root');
    expect(searchBox).toHaveStyle({ marginTop: '16px', marginBottom: '16px' });
  });

  it('displays label text correctly', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    const input = screen.getByRole('textbox', { name: /search recipes/i });
    expect(input).toHaveAttribute('aria-label', 'Search recipes');
    expect(screen.getByText('Search Recipes')).toBeInTheDocument();
  });

  it('handles empty value correctly', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    const input = screen.getByRole('textbox', { name: /search recipes/i });
    expect(input).toHaveValue('');
    expect(input).toHaveAttribute('placeholder', 'Enter ingredients or recipe name...');
  });

  it('handles keyboard interactions', () => {
    const onChange = jest.fn();
    render(<SearchBar value="" onChange={onChange} />);
    const input = screen.getByRole('textbox', { name: /search recipes/i });
    
    input.focus();
    fireEvent.keyDown(input, { key: 'a', code: 'KeyA' });
    fireEvent.keyPress(input, { key: 'a', code: 'KeyA' });
    fireEvent.keyUp(input, { key: 'a', code: 'KeyA' });
    
    expect(input).toHaveFocus();
    expect(document.activeElement).toBe(input);
  });

  it('handles long input values', () => {
    const longValue = 'This is a very long search query that should still be handled properly by the search bar component';
    render(<SearchBar value={longValue} onChange={() => {}} />);
    const input = screen.getByRole('textbox', { name: /search recipes/i });
    expect(input).toHaveValue(longValue);
  });
});
