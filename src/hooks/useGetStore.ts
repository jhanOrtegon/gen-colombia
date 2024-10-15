import { IAppStore } from '@/redux';
import { useSelector } from 'react-redux';

export const useGetStore = ():IAppStore =>{
  const state = useSelector(state => state) as IAppStore;
  return {...state};
};