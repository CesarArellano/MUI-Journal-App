import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { NavBar, SideBar } from '../components'
import { Box } from '@mui/system'
import { Toolbar } from '@mui/material';
import { useState } from 'react';

interface Props {
  children: ReactJSXElement;
}

const drawerWidth = 240;

export const JournalLayout = ({ children }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = (value:boolean) => {
    console.log('handleDrawerToggle', {value});    
    setMobileOpen(!value);
  };
  
  return (
    <Box sx={{ display: 'flex' }} className="animate__animated animate__fadeIn animate__faster">
      {/* Navbar */}
      <NavBar drawerWidth={ drawerWidth } mobileOpen={ mobileOpen }  handleDrawerToggle={ handleDrawerToggle } />
      {/* Sidebar */}
      <SideBar drawerWidth={ drawerWidth } mobileOpen={ mobileOpen }  handleDrawerToggle={ handleDrawerToggle }  />
      <Box
        component='main'
        sx={{ flexGrow: 1, p: 3 }}
      >
        {/* Toolbar */}
        <Toolbar />
        { children }
      </Box>
    </Box>
  )
}
