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
});
