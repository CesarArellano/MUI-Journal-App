import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { signInWithGoogle, registerWithEmailAndPassword, AuthProps, signInWithEmailPassword, logoutFirebase } from '../../firebase/providers';
import { clearNotesLogout } from '../journal';
import { checkingCredentials, logout, login } from './';

export const checkingAuthentication = (email: string, password: string) => {
  return async( dispatch: Dispatch<AnyAction>) => {
    dispatch( checkingCredentials() );
  }
}

export const startGoogleSignIn = () => {
  return async( dispatch: Dispatch<AnyAction>) => {
    dispatch( checkingCredentials() );
    const result = await signInWithGoogle();
    if( !result.ok ) return dispatch(logout( result.errorMessage ));
    delete result.ok; 
    dispatch(login( result ))
  }
}

export const startLoginWithEmailPassword = (formValues: AuthProps) => {
  return async( dispatch: Dispatch<AnyAction>) => {
    dispatch( checkingCredentials() );
    const result = await signInWithEmailPassword(formValues);
    if( !result.ok ) return dispatch(logout( result.errorMessage ));
    delete result.ok; 
    dispatch(login( result ))
  }
}


export const startCreatingUserWithEmailAndPassword = (formValues: AuthProps) => {
  return async( dispatch: Dispatch<AnyAction>) => {
    dispatch( checkingCredentials() );
    const result = await registerWithEmailAndPassword(formValues);
    if( !result.ok ) return dispatch(logout( result.errorMessage ));
    delete result.ok; 
    dispatch(login( result ))
  }
}

export const startLogout = () => {
  return async( dispatch: Dispatch<AnyAction>) => {
    await logoutFirebase();
    dispatch(logout(null));
    dispatch(clearNotesLogout());
  }
}
