import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, User } from 'firebase/auth';
import { FirebaseAuth } from './config';

interface ILoginWithEmailPassword{
    email: string,
    password: string,
}

interface IRegisterUserWithEmailPassword extends ILoginWithEmailPassword{
    displayName: string
}

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async() => {

  try {
        
    const result = await signInWithPopup(FirebaseAuth, googleProvider );

    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName, email, photoURL, uid
    };
        

  } catch (error:any) {
        
    const errorMessage = error.message;
    
    return {
      ok: false,
      errorMessage,
    };
  }

};

export const registerUserWithEmailPassword = async({ email, password, displayName }: IRegisterUserWithEmailPassword) => {

  try {
    const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
    const { uid, photoURL } = resp.user;

    await updateProfile( FirebaseAuth.currentUser as User, { displayName });

    return {
      ok: true,
      uid, photoURL, email, displayName
    };

  } catch (error:any) {
    
    return { ok: false, errorMessage: error.message };
  }

};

export const loginWithEmailPassword = async({ email, password }:ILoginWithEmailPassword) => {

  try {
    const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
    const { uid, photoURL, displayName } = resp.user;

    return {
      ok: true,
      uid, photoURL, displayName
    };

  } catch (error:any) {
    return { ok: false, errorMessage: error.message };
  }
};

export const logoutFirebase = async() => {
  return await FirebaseAuth.signOut();
};
