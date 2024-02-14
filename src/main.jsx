import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/Routes';
import { baseTheme } from './assets/global/Theme-variable';
import { ThemeProvider } from '@emotion/react';
import store from '../src/app/store'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={baseTheme}>
        <RouterProvider router={routes}>
        </RouterProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
