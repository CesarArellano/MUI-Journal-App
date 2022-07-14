import { createSlice } from '@reduxjs/toolkit';

export interface AuthReducerProps {
  status: 'checking' | 'not-authenticated' | 'authenticated';
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  errorMessage: string | null;
}

const initialValues = {
  status: 'checking', // 'not-authenticated', 'authenticated'
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
} as AuthReducerProps;

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialValues,
  reducers: {
    login: ( state, { payload }) => {
      state.status = 'authenticated';
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload;
    },
    checkingCredentials: ( state ) => {
      state.status = 'checking';
    },
  }
});


export const { login, logout, checkingCredentials } = authSlice.actions;