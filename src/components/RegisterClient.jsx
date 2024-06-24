import React, { useState } from 'react';
import axios from 'axios';
import './RegisterClient.css';
import './HomePage.css';

const RegisterClient = ({ userId }) => {
  const [cliente, setCliente] = useState({
    CUIT: '',
    domicilioFiscal: '',
    razonSocial: '',
    condicionFrenteAlIVA: '',
    actividad: ''
  });
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/clientes', {
        userId,
        cliente
      });
      const newClient = response.data;
      setClientes([...clientes, newClient]);
      setCliente({
        CUIT: '',
        domicilioFiscal: '',
        razonSocial: '',
        condicionFrenteAlIVA: '',
        actividad: ''
      });
      setError(''); // Clear error if successful
    } catch (error) {
      console.error("Error al agregar el cliente:", error);
      setError('Error al agregar el cliente. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className="register-client-container">
      <form onSubmit={handleSubmit} className="register-client-form">
        <input 
          type="text" 
          name="razonSocial" 
          placeholder="Razón Social" 
          value={cliente.razonSocial} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="CUIT" 
          placeholder="CUIT" 
          value={cliente.CUIT} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="domicilioFiscal" 
          placeholder="Domicilio Fiscal" 
          value={cliente.domicilioFiscal} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="condicionFrenteAlIVA" 
          placeholder="Condición Frente al IVA" 
          value={cliente.condicionFrenteAlIVA} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="actividad" 
          placeholder="Actividad" 
          value={cliente.actividad} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Agregar Cliente</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <table className="clients-table">
        <thead>
          <tr>
            <th>Razón Social</th>
            <th>CUIT</th>
            <th>Domicilio Fiscal</th>
            <th>Condición Frente al IVA</th>
            <th>Actividad</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr key={index}>
              <td>{cliente.razonSocial}</td>
              <td>{cliente.CUIT}</td>
              <td>{cliente.domicilioFiscal}</td>
              <td>{cliente.condicionFrenteAlIVA}</td>
              <td>{cliente.actividad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegisterClient;
