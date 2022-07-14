import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import { purpleTheme } from '../../theme/purpleTheme'
import { useSelector } from 'react-redux';
import { NoteProps } from '../../store/journal';
import { SideBarItem } from './SideBarItem';

interface Props {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: (value: boolean) => void,
}

export const SideBar = ({ drawerWidth, mobileOpen,  handleDrawerToggle }: Props) => {
  const { notes } = useSelector<any, any>(state => state.journal);
  const { displayName } = useSelector<any,any>(state => state.auth);

  const drawerContent = (
    <>
      <Toolbar
        style={{ backgroundColor: purpleTheme.palette.primary.main, color: 'white'}}
      >
        <Typography variant="h6" noWrap component="div">{ displayName }</Typography>
      </Toolbar>
      <Divider />
      <List>
        {
          notes.map( ( note:NoteProps ) => (
            <SideBarItem key={ note.id } note={ note }/>
          ))
        }
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
    >
      <Drawer
        container={ () => window.document.body }
        variant="temporary"
        open={ mobileOpen }
        onClose={ () => handleDrawerToggle(mobileOpen) }
        color='primary.main'
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        { drawerContent }
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          transition: '0.5s',
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        { drawerContent }
      </Drawer>
    </Box>
  )
}
