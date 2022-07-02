import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react'

import { store } from './app/store';
import App from './App';
import theme from './customTheme';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
);
