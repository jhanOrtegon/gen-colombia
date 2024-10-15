import { FirebaseDB } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore/lite';
import { AppDispatch } from '@/redux';
import { finishLoading, setTodosStore, startLoading } from '@/redux/slices';
import { message } from '@/components/ui';

export const loadTodos = (uid = '') => {
  return async (dispatch:AppDispatch) => {
    if(!uid) throw new Error('El Uid del Usuario no existe');

    try {
      dispatch(startLoading());
      const collectionRef = collection(FirebaseDB, `${ uid }/todo-list/notes`);
      const docs = await getDocs(collectionRef);

      const todos:any = [];

      docs.forEach(doc => {
        todos.push({id: doc.id, ...doc.data()});
      });

      dispatch(setTodosStore(todos));


    } catch (error) {
      console.log(error);
      message({message:'Error al traer los todos', type:'error'});

    }finally{
      dispatch(finishLoading());
    }

  };
  
};