import React, { useState } from 'react';
import axios from 'axios';

const RegisterUser = () => {
  const [user, setUser] = useState({
    usuario: '',
    password: '', // Añadir el campo de contraseña
  });

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
      const response = await axios.post('/api/users', user);
      console.log('User registered successfully:', response.data);
      // Aquí puedes agregar cualquier lógica adicional como redirigir al usuario
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="usuario"
        value={user.usuario}
        onChange={handleChange}
        placeholder="Usuario"
        required
      />

      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Contraseña"
        required
      />
      <button type="submit">Registrar Usuario</button>
    </form>
  );
};

export default RegisterUser;
