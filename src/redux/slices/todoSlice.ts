// import { ICreateUser, UserEmptyState } from '@/models';
import { initialStateTodo, ITodo, ITodoList } from '@/interfaces';
import { PayloadAction, createSlice} from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todo',
  initialState:initialStateTodo,
  reducers: {

    createTodoStore: (state:ITodoList, action: PayloadAction<ITodo> ) => {
      state.todos.push(action.payload);
    },
    
    setTodosStore: (state, action: PayloadAction<ITodo[]> ) => {
      state.todos = action.payload;
    },
    
    updateTodoStore: (state, action: PayloadAction<ITodo> ) => {
      
      state.todos = state.todos.map(todo => {
        if(todo.id === action.payload.id){
          return action.payload;
        }
        return todo;
      });
    },
    
    deleteTodoStore: (state, action: PayloadAction<string> ) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    
    setInitialStateTodoStore: (state) => {
      state.todos = [];
    },

  }
});

export const { createTodoStore, setTodosStore, updateTodoStore, deleteTodoStore, setInitialStateTodoStore } = todoSlice.actions;    