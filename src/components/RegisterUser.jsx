import React, { useState } from 'react';
import axios from 'axios';
import './RegisterUser.css'; // Importa los estilos CSS

const RegisterUser = () => {
  const [user, setUser] = useState({
    usuario: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:3001/api/users', user);
      console.log('User registered successfully:', response.data);
      setSuccessMessage('¡Usuario registrado exitosamente!');
      setErrorMessage('');
      setUser({
        usuario: '',
        password: '',
      });
    } catch (error) {
      console.error('Error registering user:', error);
      if (error.message === 'Network Error') {
        setErrorMessage('¡Error de red! Por favor, verifica tu conexión o inténtalo nuevamente más tarde.');
      } else if (error.response && error.response.status === 409) {
        setErrorMessage('¡El usuario ya existe! Por favor, elige otro nombre de usuario.');
      } else {
        setErrorMessage('¡Ocurrió un error al registrar el usuario! Por favor, inténtalo nuevamente.');
      }
      setSuccessMessage('');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="heading">Registrar Usuario</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Usuario:</label>
            <input
              type="text"
              name="usuario"
              value={user.usuario}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Contraseña:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <button type="submit" className="button">
            Registrar Usuario
          </button>
        </form>
        {successMessage && (
          <div className="message-container">
            <p className="success-message">{successMessage}</p>
          </div>
        )}
        {errorMessage && (
          <div className="message-container">
            <p className="error-message">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterUser;
