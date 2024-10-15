import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';
import { store } from '@/redux';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  
  return(
    <Provider store={store}>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </Provider>
  );
}
