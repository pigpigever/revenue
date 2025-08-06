'use client';
import * as React from 'react';
import {Box} from '@mui/material';

export interface NavbarProps {
  children?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({children}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: '58px',
        borderBottom: '1px solid #dfdfdf',
        zIndex: 10
      }}
    >
      {children}
    </Box>
  );
};

export default Navbar;