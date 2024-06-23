/** @jsxImportSource react */
import React, { useState } from 'react';
import logo from '../assets/Triunvi.png'; // Asegúrate de que la ruta sea correcta
import './Header.css'; // Importa los estilos CSS

const Header = () => {
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleLoginMenu = () => {
    setShowLoginMenu(!showLoginMenu);
  };

  const handleLogin = () => {
    // Aquí puedes manejar la lógica para autenticar al usuario
    console.log(`Correo: ${email}, Contraseña: ${password}`);
    // Por simplicidad, solo mostraremos los valores en la consola
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <nav className="nav">
        <a href="../Index.html" className="navLink alignCenter">Home</a>
        <a href="../Registrarse.html" className="navLink alignCenter">Registrarse</a>  
        <a href="../Menu.html" className="navLink alignCenter">Menu</a> 
        <a href="../" className="navLink alignCenter">Login</a>                 
      </nav>
    </header>
  );
};

export default Header;
