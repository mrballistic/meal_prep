import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('renders with minimal props', () => {
    const onChange = jest.fn();
    render(<SearchBar value="" onChange={onChange} />);
    
    const searchInput = screen.getByRole('textbox', { name: /search recipes/i });
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder', 'Enter ingredients or recipe name...');
  });

  it('calls onChange when user types', async () => {
    const onChange = jest.fn();
    render(<SearchBar value="" onChange={onChange} />);
    
    const searchInput = screen.getByRole('textbox', { name: /search recipes/i });
    await userEvent.type(searchInput, 'c');
    
    expect(onChange).toHaveBeenCalledWith('c');
  });

  it('displays the provided value', () => {
    const onChange = jest.fn();
    render(<SearchBar value="pasta" onChange={onChange} />);
    
    const searchInput = screen.getByRole('textbox', { name: /search recipes/i });
    expect(searchInput).toHaveValue('pasta');
  });
});
