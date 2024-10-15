import { NextPage } from 'next';
import React from 'react';
import { Avatar, Button, Container, Navbar, Text } from '@nextui-org/react';
import { TbChecklist } from 'react-icons/tb';
import { logoutFirebase } from '@/firebase';
import { useAppDispatch, useGetStore } from '@/hooks';
import { useRouter } from 'next/router';
import { logout, setInitialStateTodoStore } from '@/redux/slices';
import { Loading } from '../ui';

interface ILayoutHome {
    children: React.ReactNode,
    isLoading: boolean
}

export const LayoutHome:NextPage<ILayoutHome> = ({children, isLoading}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { auth } = useGetStore();

  const onLogoutSesion = async () => {
    await logoutFirebase();

    router.push('/auth/login');

    dispatch(logout());

    dispatch(setInitialStateTodoStore());


  };

  return (
    <>
      <Loading isLoading={isLoading} />

      <Navbar isBordered variant="floating">
        <Navbar.Brand>
          <TbChecklist size={'40px'} className='mr-2'/>
          <Text b size={'$2xl'} color="inherit" hideIn="sm">
            TaskFlow
          </Text>
        </Navbar.Brand>

        <Navbar.Content>
          <Navbar.Item>
            <Text b css={{color:'White'}}>{auth.displayName}</Text>
          </Navbar.Item>
          <Navbar.Item>
            <Avatar
              size="md"
              src={'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Images.png'}
              color="default"
              bordered
              squared
            />
          </Navbar.Item>

          <Navbar.Item>
            <Button onPress={onLogoutSesion} auto bordered href="#" borderWeight={'light'} color={'error'}>
              <Text color='error' b >Salir</Text>
            </Button>
          </Navbar.Item>

        </Navbar.Content>
      </Navbar>

      <Container xl style={{maxWidth:'1400px'}} css={{height:'auto', marginTop:'4vh', marginBottom:'40px'}}>
        {children}
      </Container>
    </>
  );
};
