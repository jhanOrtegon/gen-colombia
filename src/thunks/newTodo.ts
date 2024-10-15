import { message } from '@/components/ui';
import { FirebaseDB } from '@/firebase';
import { ITodo } from '@/interfaces';
import { AppDispatch,  RootState } from '@/redux';
import { createTodoStore, finishLoading, startLoading } from '@/redux/slices';
import { collection, doc, setDoc } from 'firebase/firestore/lite';

export const newTodo = ({ category, note, status }:ITodo) =>{
  return async(dispatch:AppDispatch, getState:()=> RootState) => {

    try {
      dispatch(startLoading());
      const { uid } = getState().auth;
      const newTodo = {category, note, status};
      const newDoc = doc( collection( FirebaseDB, `${uid}/todo-list/notes`));
      await setDoc(newDoc, newTodo);
      
      dispatch(createTodoStore({...newTodo, id: newDoc.id }));
      message({message:'Tarea creada exitosamente', type:'success'});

    } catch (error) {
      message({message:'Error al crear un nuevo Todo', type:'error'});
    }finally{
      dispatch(finishLoading());
    }
  };
};