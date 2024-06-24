import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import RegisterUser from './components/RegisterUser';
import FacturaForm from './components/FacturaForm';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <FacturaForm/>
    <RegisterUser/>
  </React.StrictMode>
);
