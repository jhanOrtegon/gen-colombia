/* eslint-disable react-hooks/exhaustive-deps */
import { LayoutHome } from '@/components/layouts';
import { DeleteNote, SelectCustom } from '@/components/ui';
import { useAppDispatch, useGetStore } from '@/hooks';
import { Button, Input, Text, Table, Row, Col, Tooltip, User, Badge  } from '@nextui-org/react';
import React,{useEffect} from 'react';
import { FiSave } from 'react-icons/fi';
import { FiFilter } from 'react-icons/fi';
import { GiCancel } from 'react-icons/gi';
import { IconButton, EditIcon, DeleteIcon } from '@/components/svg';
import { deleteTodo, loadTodos, newTodo, updateTodo } from '@/thunks';
import { useForm } from '@/hooks/useForm';
import { useState } from 'react';
import { ITodoCategory, ITodo } from '@/interfaces';
import { ToastContainer } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '@/firebase';
import { login, logout } from '@/redux/slices';

interface IHttpAction {
  type: 'create' | 'update',
  id?: string
}

const HomePage = () => {

  const { ui, todos, auth } = useGetStore();
  const dispatch = useAppDispatch();
  const { onChange, newNote, resetForm, setValues} = useForm({ newNote:'' });
  const [touch, setTouch] = useState({
    newNote: false
  });
  const [filters, setFilters] = useState({
    active: false,
    todos: todos.todos
  });
  const [selectedCategory, setSelectedCategory] = React.useState(new Set(['Hogar']));
  const [selectedStatus, setSelectedStatus] = React.useState(new Set(['Finalizado']));
  const [httpAction, setHttpAction] = React.useState<IHttpAction>({
    type: 'create',
    id:''
  });

  const selectedValueCategory = React.useMemo(
    () => Array.from(selectedCategory).join(', ').replaceAll('_', ' '),
    [selectedCategory]
  );

  const selectedValueStatus = React.useMemo(
    () => Array.from(selectedStatus).join(', ').replaceAll('_', ' '),
    [selectedStatus]
  );

  const columns = [
    { name: 'CATEGORÍA', uid: 'category' },
    { name: 'NOTA', uid: 'note' },
    { name: 'ESTADO', uid: 'status' },
    { name: 'ACTIONS', uid: 'actions' },
  ];

  const renderCell = (todo: any, columnKey:any) => {
    const cellValue = todo[columnKey];
    switch (columnKey) {
    case 'category':
      switch (todo.category) {
      case 'Hogar':
        return <User squared src={'https://img.freepik.com/vector-gratis/hermosa-casa_24877-50819.jpg'} name={'Hogar'} css={{ p: 0 }}/>;
      case 'Tecnología':
        return <User squared src={'https://cdn-icons-png.flaticon.com/512/1186/1186520.png'} name={'Tecnologia'} css={{ p: 0 }}/>;
      case 'Estudios':
        return <User squared src={'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/48111/books-emoji-clipart-md.png'} name={'Estudios'} css={{ p: 0 }}/>;
      case 'Farmacia':
        return <User squared src={'https://cdn-icons-png.flaticon.com/512/4320/4320337.png'} name={'Farmacia'} css={{ p: 0 }}/>;
      case 'Viajes':
        return <User squared src={'https://cdn-icons-png.flaticon.com/512/3324/3324544.png'} name={'Viajes'} css={{ p: 0 }}/>;
      case 'Otros':
        return <User squared src={'https://img1.freepng.es/20180529/jui/kisspng-trivia-computer-icons-quiz-clip-art-metal-question-mark-5b0cd83b329c41.0980387915275684432073.jpg'} name={'Otros'} css={{ p: 0 }}/>;
      default:
        break;
      }

    case 'note':
      return (
        <Col>
          <Row>
            <Text b size={14} css={{ tt: 'capitalize' }}>
              {todo.note}
            </Text>
          </Row>
        </Col>
      );
    case 'status':
      return <Badge color={todo.status === 'Finalizado' ? 'success' : 'warning'}>{todo.status}</Badge>;

    case 'actions':
      return (
        <Row justify="center" align="center">

          <Col css={{ d: 'flex' }}>
            <Tooltip content="Actualizar">
              <IconButton
                onClick={() => {
                  setHttpAction({
                    type: 'update',
                    id: todo.id
                  });
                  setValues(state=>({...state, newNote: todo.note}));
                  setTouch({newNote:true});
                  setSelectedCategory(new Set([todo.category]));
                  setSelectedStatus(new Set([todo.status]));
                }}
              >
                <EditIcon size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: 'flex' }}>
            <Tooltip content='Eliminar' color="error">
              <DeleteNote onDelete={()=>dispatch(deleteTodo(todo.id as string))} >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </DeleteNote>
            </Tooltip>
          </Col>
        </Row>
      );
    default:
      return cellValue;
    }
  };

  const validCreateNewTodo = () =>{
    const todo:ITodo = {
      note: newNote,
      category: selectedValueCategory as ITodoCategory,
      status: 'Pendiente',
    };

    if(httpAction.type === 'create'){
      dispatch(newTodo(todo));
    }else{
      dispatch(updateTodo({
        ...todo,
        status:selectedValueStatus as 'Finalizado' | 'Pendiente',
        id: httpAction.id}));
    }
    setTouch(state => ({...state, newNote: false}));
    setValues({newNote:''});
    setHttpAction({type:'create', id:''});
    resetForm();
  };

  useEffect(()=>{
    if(filters.active){

      setFilters(state=>({
        ...state,
        todos: todos.todos.filter(
          todo => (
            todo.category === selectedValueCategory &&
            todo.status === selectedValueStatus &&
            todo.note.includes(newNote)
          )
        )
      }));
    }else{
      setFilters(state=>({
        ...state,
        todos:todos.todos
      }));
    }
  },[filters.active, newNote, selectedValueCategory, selectedValueStatus, todos.todos]);

  useEffect(()=>{
    onAuthStateChanged( FirebaseAuth, async( user ) => {
      if ( !user ) return dispatch( logout() );

      const { uid, email, displayName, photoURL } = user;

      dispatch(login({
        displayName:(displayName as string),
        email: (email as string),
        photoURL:(photoURL as string),
        uid: (uid as string),
        status:'authenticated',
      }));

      dispatch(loadTodos(uid));

    });

  },[]);


  return (
    <>
      {
        auth.status === 'authenticated'
          ? (
            <LayoutHome isLoading={ui.isLoading}>

              <section className='w-100 h-full' >

                <section className='mb-3'>
                  <div className='flex gap-5 items-center mb-4 flex-wrap md:mb-0 md:flex-nowrap '>
                    <Text h1 color='' className='text-primary-darkBlue'>
                      {filters.active ? 'Filtrar tareas' : httpAction.type === 'create' ? 'Crea una tarea' : 'Actualizar tarea'}

                    </Text>

                    <SelectCustom
                      setSelected={setSelectedCategory}
                      selected={selectedCategory}
                      selectedValue={selectedValueCategory}
                      options={['Tecnología','Farmacia','Viajes','Estudios','Otros']}
                    />

                    {
                      httpAction.type === 'update' || filters.active
                        ? (
                          <SelectCustom
                            setSelected={setSelectedStatus}
                            selected={selectedStatus}
                            selectedValue={selectedValueStatus}
                            options={['Finalizado','Pendiente',]}
                            color={selectedValueStatus==='Pendiente' ? 'warning' : 'success'}
                          />
                        ):''
                    }

                  </div>

                  <Input
                    size="xl"
                    placeholder="ejemplo: Ir de compras el sábado por la noche"
                    color={filters.active ? 'default' : newNote.trim().length < 10 && touch.newNote ? 'error' : 'default'}
                    status={filters.active ? 'default' : newNote.trim().length < 10 && touch.newNote ? 'error' : 'default'}
                    fullWidth
                    shadow
                    autoFocus
                    name='newNote'
                    value={newNote}
                    max={60}
                    maxLength={60}
                    onInput={()=>{
                      setTouch(state => ({...state, newNote: true}));
                    }}
                    onChange={onChange}
                  />

                  <div className='flex gap-5 items-end'>

                    <Button
                      icon={filters.active ? '' : <FiSave size='25' />}
                      size={'lg'}
                      className={newNote.trim().length > 9 && touch.newNote && !filters.active ? 'bg-primary-darkBlue mt-6' : 'mt-6'}
                      disabled={newNote.trim().length < 10 || !touch.newNote || filters.active}
                      onPress={validCreateNewTodo}

                    >
                      {filters.active ? 'Filtro activo' : httpAction.type === 'create' ? 'Crear Tarea' : 'Actualizar Tarea'}

                    </Button>

                    {
                      httpAction.type === 'update'
                        ? (
                          <Tooltip content="Cancelar">
                            <IconButton
                              className='pb-2'
                              onClick={()=>{
                                setHttpAction({id:'', type:'create'});
                                setValues({newNote:''});
                                setTouch({newNote:false});
                              }}
                            >
                              <GiCancel size={30} color='#F31260'/>
                            </IconButton>
                          </Tooltip>
                        ) :''
                    }


                    {
                      todos.todos.length ? (
                        <Tooltip
                          content={filters.active ? 'Cancelar Filtro': 'Filtrar'}
                          className='ml-auto'
                        >
                          <IconButton
                            onClick={() => {
                              setFilters(state=>({...state, active: !state.active}));
                              setTouch({newNote:false});
                              setValues({newNote:''});
                            }}
                          >
                            <FiFilter
                              style={filters.active ? {rotate: '270deg'} : {} }
                              size={30}
                              fill={filters.active ? '#17C964' : '#808080'}
                              className={filters.active ? 'text-primary-success' : 'text-primary-darkGray'}
                            />
                          </IconButton>
                        </Tooltip>
                      ) :''
                    }
                  </div>
                </section>

                <section className='my-6'>
                  { todos.todos.length ? (
                    <Table
                      shadow
                      bordered
                      aria-label="Example table with custom cells"
                      selectionMode="single"
                      color={'warning'}
                      css={{
                        height: 'auto',
                        minWidth: '100%',
                      }}
                    >
                      <Table.Header columns={columns}>
                        {(column) => (
                          <Table.Column
                            key={column.uid}
                            hideHeader={column.uid === 'actions'}
                            css={column.uid === 'status' ? {paddingLeft:'15px'}:{}}
                            align={column.uid === 'actions' ? 'center' : 'start'}
                          >
                            {column.name}
                          </Table.Column>
                        )}
                      </Table.Header>
                      <Table.Body items={filters.todos}>
                        {(item) => (
                          <Table.Row>
                            {(columnKey) => (
                              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                            )}
                          </Table.Row>
                        )}
                      </Table.Body>

                      <Table.Pagination
                        align="center"
                        color={'warning'}
                        rowsPerPage={3}
                        onPageChange={(page) => console.log({ page })}
                      />

                    </Table>
                  ) : ''}
                </section>
              </section>
              <ToastContainer />
            </LayoutHome>
          ):''
      }
    </>

  );

};

export default HomePage;

