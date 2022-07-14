import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { useDispatch } from 'react-redux';
import { startLogout } from '../../store/auth';

interface Props {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: (value: boolean) => void,
}

export const NavBar = ({ drawerWidth, mobileOpen, handleDrawerToggle }: Props) => {
  
  const dispatch = useDispatch<any>();

  const onLogout = () => {
    dispatch( startLogout() )
  }

  return (
    <AppBar 
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${ drawerWidth }px)`},
        ml: { sm: `${ drawerWidth }px`}
      }}
    >
      <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={ () => handleDrawerToggle(mobileOpen) }
            sx={{ mr: 2, display: { sm: 'none' }}}
          >
            <MenuOutlined />
          </IconButton>
          <Grid 
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" noWrap component="div">Journal App</Typography>
            <IconButton
              color="inherit"
              onClick={ onLogout }
            >
              <LogoutOutlined />
            </IconButton>
          </Grid>
      </Toolbar>
    </AppBar>
  )
}
