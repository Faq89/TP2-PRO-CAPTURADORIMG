/** @jsxImportSource react */
import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/Triunvi.png'; // Asegúrate de que la ruta sea correcta
import './Header.css'; // Importa los estilos CSS

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está autenticado

  const handleLogout = () => {
    // Aquí podrías agregar lógica adicional para hacer logout en el backend si es necesario
    setIsLoggedIn(false); // Actualizamos el estado para indicar que el usuario está deslogueado
    window.location.href = '../Index.html'; // Redireccionamos al usuario a Index.html
  };

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <nav className="nav">
        <button className="navLink alignCenter" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
