'use client';
import React, {useState, useRef} from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ClickAwayListener, Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {StockInfo} from '@/app/api/get-tw-stock-info';

interface SearchProps {
  placeholder?: string;
  value?: string;
  onSearch: (value: string) => void;
  onSelect?: (value: StockInfo) => void;
  disabled?: boolean;
  searchResults?: StockInfo[];
}

const Search: React.FC<SearchProps> = ({
  placeholder = '輸入台／美股代號，查看公司價值',
  value = '',
  onSearch,
  onSelect,
  disabled = false,
  searchResults = [],
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !disabled) {
      onSearch(inputValue);
      setOpen(true);
    }
  };

  const handleSearchClick = () => {
    if (!disabled) {
      onSearch(inputValue);
      setOpen(true);
    }
  };

  const handleSelect = (stockInfo: StockInfo) => {
    if (onSelect) onSelect(stockInfo);
    setInputValue(`${stockInfo.stock_id} ${stockInfo.stock_name}`);
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box sx={{position: 'relative'}}>
        {/*搜索输入区域*/}
        <TextField
          ref={anchorRef}
          variant="outlined"
          size="small"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
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
        {/*搜索面板*/}
        <Popper
          open={open && searchResults.length > 0}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          style={{
            zIndex: 10,
            width: anchorRef.current?.offsetWidth ?? undefined,
          }}
        >
          <Paper elevation={3}>
            <List dense>
              {searchResults.map((result, idx) => (
                <ListItem key={idx} disablePadding>
                  <ListItemButton onClick={() => handleSelect(result)}>
                    <ListItemText primary={`${result.stock_id} ${result.stock_name}`} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default Search;
