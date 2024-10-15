// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyBAVbxtpHgW6zZD2cXnwEsPyHX5BpPIx-k',
  authDomain: 'todo-list-jhan.firebaseapp.com',
  projectId: 'todo-list-jhan',
  storageBucket: 'todo-list-jhan.appspot.com',
  messagingSenderId: '637859562682',
  appId: '1:637859562682:web:90b2ec1f3c8fd2a4aaae83'
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp );

export const FirebaseDB = getFirestore( FirebaseApp );