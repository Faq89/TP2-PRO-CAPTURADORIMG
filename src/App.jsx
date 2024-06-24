/** @jsxImportSource react */
import React from 'react';
import ReactDOM from 'react-dom/client';
import RegisterClient from './components/RegisterClient';
import RegisterInvoice from './components/RegisterInvoice';
import RegisterUser from './components/RegisterUser';
import MenuPanel from './components/MenuPanel';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RegisterClient />
    <RegisterInvoice />
    <RegisterUser />
    <MenuPanel />
  </React.StrictMode>
);