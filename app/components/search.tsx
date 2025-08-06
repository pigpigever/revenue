'use client';
import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchProps {
  placeholder?: string;
  value?: string;
  onSearch: (value: string) => void;
  disabled?: boolean;
}

const Search: React.FC<SearchProps> = ({
  placeholder = '輸入台／美股代號，查看公司價值',
  value = '',
  onSearch,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !disabled) {
      onSearch(inputValue);
    }
  };

  const handleSearchClick = () => {
    if (!disabled) {
      onSearch(inputValue);
    }
  };

  return (
    <TextField
      variant="outlined"
      size="small"
      value={inputValue}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      placeholder={placeholder}
      disabled={disabled}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleSearchClick}
              disabled={disabled}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        minWidth: 428,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#e0e0e0',
          },
          '&:hover fieldset': {
            borderColor: '#e0e0e0',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#e0e0e0',
            borderWidth: 1,
          },
        },
        '& .MuiInputBase-input::placeholder': {
          color: '#434343',
          opacity: 1,
        },
      }}
    />
  );
};

export default Search;