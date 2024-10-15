import { message } from '@/components/ui';
import { FirebaseDB } from '@/firebase';
import { AppDispatch,  RootState } from '@/redux';
import { deleteTodoStore, finishLoading, startLoading } from '@/redux/slices';
import { doc, deleteDoc } from 'firebase/firestore/lite';

export const deleteTodo = (id:string) =>{
  return async(dispatch:AppDispatch, getState:()=> RootState) => {

    try {
      dispatch(startLoading());
      const { uid } = getState().auth;

      const docRef = doc( FirebaseDB, (`${uid}/todo-list/notes/${id}`));
      await deleteDoc(docRef);

      dispatch(deleteTodoStore(id));
      message({message:'Tarea eliminada exitosamente', type:'success'});

    } catch (error) {
      message({message:'Error al eliminar la tarea', type:'error'});
    }finally{
      dispatch(finishLoading());
    }
  };
};