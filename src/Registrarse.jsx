/** @jsxImportSource react */

import Footer from "./components/Footer";
import Background from "./components/Background";
import React from "react";
import ReactDOM from 'react-dom/client';
import './components/Footer.css';
import './components/Header.css';
import './components/Background.css';
import './components/General.css'
import RegisterUser from "./components/RegisterUser";
import App from "./App";




ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<Background/>
<App/>
<RegisterUser/>
<Footer/>
</React.StrictMode>
)