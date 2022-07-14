
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, InputAdornment, Link, TextField, Typography } from '@mui/material'
import { Email, Google, Lock } from '@mui/icons-material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks';
import { SyntheticEvent, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGoogleSignIn } from '../../store/auth';
import { startLoginWithEmailPassword } from '../../store/auth/thunks';

const initialData = {
  email: '',
  password: ''
};

const formValidations = {
  email: [( value:string ) => value.includes('@'), 'El campo correo debe tener un @.'],
  password: [( value:string ) => value.length >= 6, 'El campo correo debe tener más de 6 caracteres.'],
};

export const LoginPage = () => {
  const [ formSubmitted, setFormSubmitted ] = useState(false);
  const { status, errorMessage } = useSelector<any, any>(state => state.auth);
  const isAuthenticating = useMemo(() => status === 'checking', [status]);
  const { formState, handleInputChange, formValidation, isFormValid  } = useForm(initialData, formValidations)
  const dispatch = useDispatch<any>();

  const { email, password } = formState;
  const { emailValid } = formValidation;

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setFormSubmitted(true)
    if( !isFormValid ) return;
    dispatch( startLoginWithEmailPassword(formState) )
  }

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() )
  }

  return (
    <AuthLayout
      title='Login'
    >
      <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 1 }}>
              <TextField 
                label="Correo"
                type="email"
                value={ email }
                placeholder="correo@gmail.com"
                onChange={ (e) => handleInputChange(e.target.value, 'email') }
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                error={ !!emailValid && formSubmitted }
                helperText={ emailValid }
              />
            </Grid>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña"
                type="password"
                placeholder="********"
                value={ password }
                onChange={ (e) => handleInputChange(e.target.value, 'password') }
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid container spacing={ 1.5 }  sx={{ mt: 2 }}>
              <Grid item xs={ 12 } display={ !!errorMessage ? '' : 'none' }>
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button disabled={ isAuthenticating } variant="contained" fullWidth onClick={ onGoogleSignIn }>
                  <Google/>
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button disabled={ isAuthenticating } type='submit' variant="contained" fullWidth>
                  Iniciar sesión
                </Button>
              </Grid>
            </Grid>

            <Grid 
              container
              direction="row"
              justifyContent="end"
              sx={{ mt: 2 }}
            >
              <Link component={ RouterLink } color="inherit" to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>
  )
}
