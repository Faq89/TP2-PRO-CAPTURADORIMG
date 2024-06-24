/** @jsxImportSource react */
import React, { useState } from 'react';
import axios from 'axios'; // Asegúrate de instalar axios con `npm install axios`


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar error previo

    try {
      const response = await axios.post('http://127.0.0.1:3001/api/login', {
        username,
        password
      });

      if (response.status === 200) {
        // Redirigir a Menu.html
        window.location.href = '../Menu.html';
      }
    } catch (error) {
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
    <div className="login">
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
