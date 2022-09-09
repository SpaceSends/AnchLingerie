import {
  Box,
  Button,
  Icon,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { MouseEvent, useState } from 'react';

interface IToolbarProps {
  searchText?: string;
  changeTextSearch?: (newText: string) => void;
  showSearchText?: boolean;
  showFilter?: boolean;
  onClickFilter?: () => void;
}

const options = [
  'Filtro',
  'Tamanho P',
  'Tamanho M',
  'Tamanho G',
  'Tamanho GG',
  'Tamanho Plus Size',
  'Do maior R$ pro menor R$',
  'Do menor R$ pro maior R$',
];

export const Toolbar: React.FC<IToolbarProps> = ({
  searchText = '',
  changeTextSearch,
  showSearchText = false,
  showFilter = false,
  onClickFilter,
}) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [selectedIndex, setSelectedIndex] = useState(1);

  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuItemClick = (_: MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    onClickFilter?.();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display='flex'
      component={Paper}
      alignItems='center'
      flexDirection='row'
      height={theme.spacing(5)}
    >
      {showSearchText && (
        <TextField
          value={searchText}
          onChange={(e) => changeTextSearch?.(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Icon>search</Icon>
              </InputAdornment>
            ),
          }}
          placeholder='Pesquisar...'
          size='small'
        />
      )}
      <Box flex={1} display='flex' justifyContent='end'>
        {showFilter && (
          <Button
            variant='contained'
            aria-haspopup='true'
            onClick={handleMenuClick}
            aria-expanded={openMenu ? 'true' : undefined}
            aria-controls={openMenu ? 'basic-menu' : undefined}
            endIcon={<Icon>arrow_drop_down</Icon>}
          >
            {<Typography>{options[selectedIndex]}</Typography>}
          </Button>
        )}
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          MenuListProps={{ 'aria-labelledby': 'lock-button', role: 'listbox' }}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === selectedIndex}
              onClick={(e) => handleMenuItemClick(e, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
};
