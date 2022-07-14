
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, InputAdornment, Link, TextField } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { AccountCircle, Email, Lock } from '@mui/icons-material'
import { useForm } from '../../hooks'
import { SyntheticEvent, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailAndPassword } from '../../store/auth'

// export interface RegisterFormValidationsProps {
//   displayName?: (string | ((value: string) => boolean))[];
//   email?: (string | ((value: string) => boolean))[];
//   password?: (string | ((value: string) => boolean))[];
// }

const initialData = {
  displayName: '',
  email: '',
  password: '',
};

const formValidations = {
  displayName: [( value:string ) => value.length >= 1, 'El campo nombre es obligatorio.'],
  email: [( value:string ) => value.includes('@'), 'El campo correo debe tener un @.'],
  password: [( value:string ) => value.length >= 6, 'El campo correo debe tener más de 6 caracteres.'],
}

export const RegisterPage = () => {
  const { status, errorMessage } = useSelector<any, any>(state => state.auth);
  const dispatch = useDispatch<any>();

  const isAuthenticating = useMemo(() => status === 'checking', [status]);
  const [ formSubmitted, setFormSubmitted ] = useState(false);
  const { formState, handleInputChange, formValidation, isFormValid } = useForm(initialData, formValidations)
  const { displayName, email, password } = formState;

  const onSubmit = (e:SyntheticEvent) => {
    e.preventDefault();
    setFormSubmitted(true)
    if( !isFormValid ) return;
    dispatch( startCreatingUserWithEmailAndPassword(formState))
  }
  
  const { displayNameValid , emailValid, passwordValid } = formValidation;

  return (
    <AuthLayout
      title="Register"
    >
      <form
        onSubmit={ onSubmit }
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={ 12 } sx={{ mt: 1 }}>
            <TextField 
              label="Nombre completo"
              type="text"
              placeholder="César Arellano"
              value={ displayName }
              onChange={ ({target}) => handleInputChange(target.value, 'displayName')}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              error={ !!displayNameValid && formSubmitted }
              helperText={ displayNameValid }
            />
          </Grid>
          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              label="Correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              value={ email }
              onChange={ ({ target }) => handleInputChange(target.value, 'email')}
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
              fullWidth
              value={ password }
              onChange={ ({ target }) => handleInputChange(target.value, 'password')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              error={ !!passwordValid && formSubmitted }
              helperText={ passwordValid }
            />
          </Grid>
          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={ 12 } display={ !!errorMessage ? '' : 'none' }>
              <Alert severity='error'>{ errorMessage }</Alert>
            </Grid>
            <Grid item xs={ 12 }>
              <Button type="submit" variant="contained" disabled={ isAuthenticating } fullWidth>
                Regístrate
              </Button>
            </Grid>
          </Grid>
          <Grid 
            container
            direction="row"
            justifyContent="end"
            sx={{ mt: 2 }}
          >
            <Link component={ RouterLink } color="inherit" to="/auth/login">
              ¿Ya tienes cuenta? inicia sesión
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
