import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { NavBar, SideBar } from '../components'
import { Box } from '@mui/system'
import { Toolbar } from '@mui/material';

interface Props {
  children: ReactJSXElement;
}

const drawerWidth = 240;

export const JournalLayout = ({ children }: Props) => {
  return (
    <Box sx={{ display: 'flex' }} className="animate__animated animate__fadeIn animate__faster">
      {/* Navbar */}
      <NavBar drawerWidth={ drawerWidth } />
      {/* Sidebar */}
      <SideBar drawerWidth={ drawerWidth } />
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
