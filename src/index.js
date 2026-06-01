import React from 'react';

import ReactDOM from 'react-dom/client';

import './styles/main.scss';

import App from './App';

import {
  OrderProvider,
} from './context/OrderContext';

import {
  Toaster,
} from 'react-hot-toast';

const root =
  ReactDOM.createRoot(
    document.getElementById(
      'root'
    )
  );

root.render(
  <React.StrictMode>

    <OrderProvider>

      <Toaster
        position="top-right"

        toastOptions={{
          duration: 3000,

          style: {
            background: '#3e3c47',
            color: '#fff',

            borderRadius: '14px',

            padding: '16px 18px',

            fontSize: '16px',
          },

          success: {
            style: {
              background: '#ffa800',
            },
          },
        }}
      />

      <App />

    </OrderProvider>

  </React.StrictMode>
);