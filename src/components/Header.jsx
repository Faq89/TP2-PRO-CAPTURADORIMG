/** @jsxImportSource react */
import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/Triunvi.png'; // Asegúrate de que la ruta sea correcta
import './Header.css'; // Importa los estilos CSS

const Header = () => {
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const toggleLoginMenu = () => {
    setShowLoginMenu(!showLoginMenu);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        'http://127.0.0.1:3001/api/login',
        {
          usuario,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 200) {
        window.location.href = '../Menu.html';
      }
    } catch (error) {
      console.error('Error en la solicitud de login:', error);
      if (error.response) {
        if (error.response.status === 400) {
          setError('Solicitud incorrecta. Por favor, verifique sus datos.');
        } else if (error.response.status === 401) {
          setError('Credenciales incorrectas. Por favor, intente de nuevo.');
        } else {
          setError('Error de conexión. Por favor, intente más tarde.');
        }
      } else {
        setError('Error de conexión. Por favor, intente más tarde.');
      }
    }
  };

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <nav className="nav">
        <a href="../Index.html" className="navLink alignCenter">Home</a>
        <a href="../Nosotros.html" className="navLink alignCenter">Nosotros</a>
        <button className="navLink alignCenter" onClick={toggleLoginMenu}>
          Login
        </button>
      </nav>
      {showLoginMenu && (
        <div className="loginMenu">
          <form className="loginForm" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="usuario">User:</label>
              <input
                type="text"
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="inputField"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Pass:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="inputField"
                required
              />
            </div>
            {error && <div className="error">{error}</div>}
            <button type="submit" className="loginSubmitButton">Iniciar Sesión</button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
