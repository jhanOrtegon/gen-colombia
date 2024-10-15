// import { uiEmptyState } from '@/models';
import { IUiInitialState } from '@/interfaces';
import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: IUiInitialState,
  reducers: {
    startLoading: (state) => {
      return {...state, isLoading: true};
    },

    finishLoading: (state) => {
      return {...state, isLoading: false};
    },
  }
});

export const { startLoading, finishLoading } = uiSlice.actions;