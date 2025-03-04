import { TextField, Box } from '@mui/material';
import { ChangeEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Box sx={{ my: 2 }} data-testid="SearchBar-root">
      <TextField
        fullWidth
        label="Search Recipes"
        value={value}
        onChange={handleChange}
        InputProps={{
          'aria-label': 'Search recipes',
          'aria-describedby': 'search-description'
        }}
        placeholder="Enter ingredients or recipe name..."
      />
    </Box>
  );
};
