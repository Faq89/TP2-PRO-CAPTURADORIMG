/** @jsxImportSource react */
import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header.jsx';
import ImageUploader from './components/ImageUploader.jsx';
import Background from './components/Background.jsx';
import Footer from './components/Footer.jsx';
import './assets/fonts/fonts.css';
import './components/HomePage.css';
import './components/Footer.css';
import Home from './components/Home.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <ImageUploader/>
    <Background />
    <Footer />
  </React.StrictMode>
);
