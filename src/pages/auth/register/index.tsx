/* eslint-disable @next/next/no-img-element */
import { Loading, message } from '@/components/ui';
import { registerUserWithEmailPassword } from '@/firebase';
import { validateEmail } from '@/helpers';
import { useAppDispatch, useCheckAuth, useForm, useGetStore } from '@/hooks';
import { finishLoading, login, startLoading } from '@/redux/slices';
import { Button, Input, Spacer } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoIosArrowDropleft } from 'react-icons/io';
import { ToastContainer } from 'react-toastify';

export const RegisterPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { ui } = useGetStore();
  const { status:statusAuth } = useCheckAuth();

  const [touch, setTouch] = useState({
    user: false,
    password: false,
    validateEmail: false
  });

  const { password,email, user, onChange } = useForm({
    user : '',
    password : '',
    email: ''
  });

  const onRegisterWithUserAndPassword = async () =>{
    dispatch(startLoading());

    const { 
      displayName,
      email:resEmail, 
      photoURL,
      uid,
      ok,
    } = await registerUserWithEmailPassword({displayName: user, email: (email as string), password});
    
    if(ok){

      dispatch(login({
        displayName:(displayName as string), 
        email: (resEmail as string),
        photoURL:(photoURL as string), 
        uid: (uid as string), 
        status:'authenticated', 
        errorMessage:''
      }));
      
      router.push('/home');
      dispatch(finishLoading());
      return;
    }

    message({message:'Error al registrarse, ingrese un correo diferente', type:'error'});
    dispatch(finishLoading());

  };

  useEffect(()=>{
    if(statusAuth === 'authenticated'){
      router.push('/home'); 
    }
  },[statusAuth, router]);

  return (
    <>
      <Loading isLoading={ui.isLoading} />

      <div 
        style={{display:'grid', gridTemplateColumns:'60% 40%'}}
        className='h-screen overflow-scroll md:overflow-hidden bg-primary-gray responsiveRegister'
      >
     
        <div className='marginRightNone' style={{margin:'10vh 100px 20vh auto', maxWidth:'90%', minWidth:'70%'}}>
          <h1 className='text-primary-darkBlue m-0 ml-2'>Regístrate</h1>
          <h5 className='text-primary-darkBlue ml-3 font-medium'>Comienza tu viaje con nosotros hoy</h5>

          <div className='mt-16 ml-3'>
            <Input 
              name='user'
              onChange={onChange}
              fullWidth  
              size='xl' 
              clearable 
              label="Usuario" 
              placeholder='jhan carlos ortegon' 
              onInput={()=>setTouch(state=>({...state, user: true}))}
              color={!user.length && touch.user ? 'error' : 'default'}
              status={!user.length && touch.user ? 'error' : 'default'}
              helperColor={!user.length && touch.user ? 'error' : 'default'}
              helperText={!user.length && touch.user ? 'Requerido' : ''}
            />
            <Spacer y={1.5} />
            <Input 
              name='email'
              onChange={onChange}
              onInput={(e:any)=>{
                const validate = validateEmail(e.target.value);
                validate 
                  ? setTouch(state=>({...state, validateEmail: true}))
                  : setTouch(state=>({...state, validateEmail: false}));
              }}
              fullWidth
              type='email'
              size='xl' 
              clearable 
              label="Correo electrónico" 
              placeholder='jhancarlos.ortegon@gmail.com' 
              color={!touch.validateEmail && email ? 'error' : 'default'}
              status={!touch.validateEmail && email ? 'error' : 'default'}
              helperColor={!touch.validateEmail && email ? 'error' : 'default'}
              helperText={!touch.validateEmail && email  ? 'Ingrese un correo valido' : ''} 
            />
          
            <Spacer y={1.5} />
            <Input.Password
              onChange={onChange}
              name='password'
              size='xl'
              fullWidth 
              clearable 
              label="Contraseña" 
              placeholder='***' 
              onInput={()=>setTouch(state=>({...state, password: true}))}
              color={password.length <= 5 && touch.password ? 'error' : 'default'}
              status={password.length <= 5 && touch.password ? 'error' : 'default'}
              helperColor={password.length <= 5 && touch.password ? 'error' : 'default'}
              helperText={password.length <= 5 && touch.password ? 'Ingrese mínimo 6 caracteres' : ''}
            />
          
            <Spacer y={2} />

            <div className='flex gap-3'>
              <Button 
                disabled={statusAuth === 'authenticated' || password.length <= 5 || !user.length || !touch.validateEmail}
                icon={<IoIosArrowDropleft size={40} />} 
                size={'xl'} color={'error'} 
                auto
                onClick={()=>{
                  router.push('/auth/login');
                }}
              >
                  Cancelar
              </Button>
            
              <Button 
                size={'xl'} 
                auto
                disabled={statusAuth === 'authenticated' || password.length <= 5 || !user.length || !touch.validateEmail}
                className={statusAuth !== 'authenticated' || password.length > 5 && user.length && touch.validateEmail ? 'bg-primary-darkBlue' : ''}
                onPress={onRegisterWithUserAndPassword}
              >
                Guardar
              </Button>
            </div>
          
          </div>
        </div>

        <div className='relative bgLogin noneLogin'>
          <img src={'/images/Ellipse_right.png'} alt='images/Ellipse_right.png' className='h-screen w-full' />
          <img src={'/images/startRegister.png'} alt='starRegister' className='absolute right-0 top-16  w-3/4 topLogin' id='starRegister' />
          <img src={'/images/endRegister.png'} alt='endRegister' className='absolute right-0 top-16  w-3/4 hidden topLogin' id='endRegister' />
        </div>

        <ToastContainer />
      </div>
    
    </>
  );
};

export default RegisterPage;