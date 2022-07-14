import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { FirebaseAuth } from './config';
export const googleProvider = new GoogleAuthProvider();

interface ResponseProps {
  ok?: boolean;
  uid?: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
  errorMessage?: string | unknown;
}

export interface AuthProps {
  displayName?: string;
  email: string;
  password: string;
}

export const signInWithGoogle = async (): Promise<ResponseProps> => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      uid,
      displayName,
      email,
      photoURL,
    }
  } catch ( error:any ) {
    const errorMessage = `${ error.message }`;
    console.log(errorMessage);
    return { 
      ok: false,
      errorMessage
    };
  }
}

export const registerWithEmailAndPassword = async ({ displayName, email, password }: AuthProps ): Promise<ResponseProps> => {
  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL } = resp.user;
    
    await updateProfile(resp.user, { displayName });
    
    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName
    }
  } catch (error:any) {
    const errorMessage = `${ error.message }`;
    console.log(errorMessage);
    return { 
      ok: false,
      errorMessage
    };
  }
}

export const signInWithEmailPassword = async ({ email, password }: AuthProps): Promise<ResponseProps> => {
  try {
    const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { displayName, photoURL, uid } = result.user;
    return {
      ok: true,
      uid,
      displayName,
      email,
      photoURL,
    }
  } catch ( error:any ) {
    const errorMessage = `${ error.message }`;
    console.log(errorMessage);
    return { 
      ok: false,
      errorMessage
    };
  }
}

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
}