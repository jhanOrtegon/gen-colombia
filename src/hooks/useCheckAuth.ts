
import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useGetStore } from './useGetStore';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '@/firebase';
import { login, logout } from '@/redux/slices';
import { loadTodos } from '@/thunks';

export const useCheckAuth = () => {
  
  const { auth:{status} } = useGetStore();
  const dispatch = useAppDispatch();

  useEffect(() => {
        
    onAuthStateChanged( FirebaseAuth, async( user ) => {
      if ( !user ) return dispatch( logout() );

      const { uid, email, displayName, photoURL } = user;

      dispatch(login({
        displayName:(displayName as string), 
        email: (email as string),
        photoURL:(photoURL as string), 
        uid: (uid as string), 
        status:'authenticated', 
      }));

      dispatch(loadTodos(uid));

    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {status};
};