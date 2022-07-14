import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACIC19Ibdj1A-yq_4fxlC_BU6dG4zwgOY",
  authDomain: "react-app-cursos-eb1a3.firebaseapp.com",
  projectId: "react-app-cursos-eb1a3",
  storageBucket: "react-app-cursos-eb1a3.appspot.com",
  messagingSenderId: "555392882435",
  appId: "1:555392882435:web:03d75d642de24e425afb36",
  measurementId: "G-HMFZEMSLHV"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);