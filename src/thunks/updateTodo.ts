import { message } from '@/components/ui';
import { FirebaseDB } from '@/firebase';
import { ITodo } from '@/interfaces';
import { AppDispatch,  RootState } from '@/redux';
import { updateTodoStore, finishLoading, startLoading } from '@/redux/slices';
import { doc, setDoc } from 'firebase/firestore/lite';

export const updateTodo = ({ category, note, status, id }:ITodo) =>{
  return async(dispatch:AppDispatch, getState:()=> RootState) => {

    try {
      dispatch(startLoading());
      const { uid } = getState().auth;
      const updateTodo = {category, note, status};

      const docRef = doc( FirebaseDB, (`${uid}/todo-list/notes/${id}`));
      await setDoc(docRef, updateTodo, {merge: true});

      dispatch(updateTodoStore({...updateTodo, id}));
      message({message:'Tarea actualizada exitosamente', type:'success'});

    } catch (error) {
      message({message:'Error al actualizar la tarea', type:'error'});
    }finally{
      dispatch(finishLoading());
    }
  };
};