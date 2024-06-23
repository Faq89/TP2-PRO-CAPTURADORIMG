import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [CUIT, setCUIT] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { CUIT, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      navigate('/menu'); // Redirige a Menu.html
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error al iniciar sesión, verifica tus credenciales');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="CUIT">CUIT</label>
        <input
          type="text"
          id="CUIT"
          name="CUIT"
          value={CUIT}
          onChange={(e) => setCUIT(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Login;
