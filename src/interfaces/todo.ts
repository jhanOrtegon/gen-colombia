export type ITodoCategory = 'Hogar' | 'Tecnología' | 'Farmacia' | 'Viajes' | 'Estudios' | 'Otros'
export interface ITodo {
    id?:string 
    category: ITodoCategory
    note: string,
    status: 'Finalizado' | 'Pendiente'
 }

export interface ITodoList{
  todos: ITodo[],
  active: string
}


export const initialStateTodo:ITodoList = {
  todos:[],
  active: ''
};
