import React, { useState } from 'react';
import axios from 'axios';

const RegisterClient = ({ userId }) => {
  const [cliente, setCliente] = useState({
    CUIT: '',
    domicilioFiscal: '',
    razonSocial: '',
    condicionFrenteAlIVA: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/clientes', {
      userId,
      cliente
    });
    // Manejar la respuesta y posibles errores
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="CUIT" value={cliente.CUIT} onChange={handleChange} required />
      <input type="text" name="domicilioFiscal" value={cliente.domicilioFiscal} onChange={handleChange} required />
      <input type="text" name="razonSocial" value={cliente.razonSocial} onChange={handleChange} required />
      <input type="text" name="condicionFrenteAlIVA" value={cliente.condicionFrenteAlIVA} onChange={handleChange} required />
      <button type="submit">Registrar Cliente</button>
    </form>
  );
};

export default RegisterClient;
