import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import RegisterUser from './components/RegisterUser';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />

    <RegisterUser/>
  </React.StrictMode>
);
