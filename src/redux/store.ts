import { IAuth, ITodoList, IUi,  } from '@/interfaces';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice, todoSlice, uiSlice } from './slices';

export interface IAppStore {
    ui: IUi,
    auth: IAuth
    todos: ITodoList,
}

export const store = configureStore({
  reducer:{
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    todos: todoSlice.reducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;