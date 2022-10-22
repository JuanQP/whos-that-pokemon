import React from 'react'
import ReactDOM from 'react-dom/client'
import AppLayout from './AppLayout';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AppLayout />
    </HelmetProvider>
  </React.StrictMode>
)
