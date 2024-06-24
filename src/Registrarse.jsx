/** @jsxImportSource react */
import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header.jsx';
import Background from './components/Background.jsx';
import Footer from './components/Footer.jsx';
import './assets/fonts/fonts.css';
import './components/General.css';
import './components/Footer.css';
import App from './App';
import RegisterUser from './components/RegisterUser';





ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
    <App />
    <RegisterUser/>
    <Background />
    <Footer />
  </React.StrictMode>
);
