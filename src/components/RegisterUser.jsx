import React, { useState } from 'react';
import axios from 'axios';

const RegisterUser = () => {
  const [user, setUser] = useState({
    CUIT: '',
    domicilioFiscal: '',
    razonSocial: '',
    condicionFrenteAlIVA: '',
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
        name="CUIT"
        value={user.CUIT}
        onChange={handleChange}
        placeholder="CUIT"
        required
      />
      <input
        type="text"
        name="domicilioFiscal"
        value={user.domicilioFiscal}
        onChange={handleChange}
        placeholder="Domicilio Fiscal"
        required
      />
      <input
        type="text"
        name="razonSocial"
        value={user.razonSocial}
        onChange={handleChange}
        placeholder="Razón Social"
        required
      />
      <input
        type="text"
        name="condicionFrenteAlIVA"
        value={user.condicionFrenteAlIVA}
        onChange={handleChange}
        placeholder="Condición frente al IVA"
        required
      />
      <button type="submit">Registrar Usuario</button>
    </form>
  );
};

export default RegisterUser;
