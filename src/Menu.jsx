/** @jsxImportSource react */
import Footer from "./components/Footer";
import Background from "./components/Background";
import React from "react";
import ReactDOM from 'react-dom/client';
import './components/Footer.css';
import './components/Header.css';
import './components/Background.css';


import MenuPanel from './components/MenuPanel'; // Ajusta la ruta según sea necesario



ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<Background/>

<MenuPanel/>
</React.StrictMode>
)