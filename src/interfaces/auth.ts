export const AuthInitialState = {
  uid: '',
  displayName: '',
  email: '',
  photoURL: '',
  errorMessage: '',
  status: 'not-authenticated'
};

export type IAuthState =  'not-authenticated' | 'authenticated'

export interface IAuth {
  uid: string ,
  displayName: string,
  email: string,
  photoURL: string,
  errorMessage?: string,
  status: IAuthState
}
