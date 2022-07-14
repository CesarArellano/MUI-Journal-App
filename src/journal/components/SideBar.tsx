import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import { purpleTheme } from '../../theme/purpleTheme'
import { useSelector } from 'react-redux';
import { NoteProps } from '../../store/journal';
import { SideBarItem } from './SideBarItem';

interface Props {
  drawerWidth: number
}

export const SideBar = ({ drawerWidth }: Props) => {
  const { notes } = useSelector<any, any>(state => state.journal);
  const { displayName } = useSelector<any,any>(state => state.auth);
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
    >
      <Drawer
        variant="permanent"
        open
        color='primary.main'
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
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
      </Drawer>
    </Box>
  )
}
