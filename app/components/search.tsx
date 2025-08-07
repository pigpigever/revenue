'use client';
import * as React from 'react';
import {
  Box,
  ClickAwayListener,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {StockInfo} from '@/app/api/get-tw-stock-info';
import {debounce} from '@/app/utils';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';

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
  const [inputValue, setInputValue] = React.useState(value);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLInputElement>(null);

  const debounceSearch = React.useMemo(() => {
    return debounce(onSearch, 300);
  }, [onSearch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    debounceSearch(value);
    setInputValue(value);
    setOpen(true);
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
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          style={{
            zIndex: 10,
            width: anchorRef.current?.offsetWidth ?? undefined,
          }}
        >
          <Paper elevation={3}>
            {!searchResults.length ? (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height={100}
                borderRadius={2}
              >
                <InsertChartOutlinedIcon sx={{ fontSize: 24, color: '#bdbdbd', mb: 1 }} />
                <Typography variant="subtitle1" color="text.secondary">
                  暫無數據
                </Typography>
              </Box>
            ) : (
              <List dense>
                {searchResults.map((result, idx) => (
                  <ListItem key={idx} disablePadding>
                    <ListItemButton onClick={() => handleSelect(result)}>
                      <ListItemText primary={`${result.stock_id} ${result.stock_name}`} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default Search;
