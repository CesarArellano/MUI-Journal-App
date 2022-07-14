import { Grid, Typography } from '@mui/material'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface Props {
  children: ReactJSXElement;
  title: string;
}

export const AuthLayout = ({ children, title }: Props) => {
  return (
    <Grid 
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4}}
    >
      <Grid
        item
        className='box-shadow'
        xs={ 3 }
        sx={{
          width: { sm: 500 },
          backgroundColor: 'white',
          padding: 4,
          botderRadius: 10 
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>{ title }</Typography>
        { children }
      </Grid>
    </Grid>
  )
}
