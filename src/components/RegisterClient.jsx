import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegisterClient.css'; 

const RegisterClient = () => {
  const [razonSocial, setRazonSocial] = useState('');
  const [cuit, setCuit] = useState('');
  const [domicilioFiscal, setDomicilioFiscal] = useState('');
  const [condicionIVA, setCondicionIVA] = useState('');
  const [actividad, setActividad] = useState('');
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error fetching clientes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCliente = { razonSocial, cuit, domicilioFiscal, condicionIVA, actividad };
      const response = await axios.post('http://localhost:3001/api/clientes', newCliente);
      setClientes([...clientes, response.data]);
      clearForm();
    } catch (error) {
      console.error('Error al registrar cliente:', error);
    }
  };

  const clearForm = () => {
    setRazonSocial('');
    setCuit('');
    setDomicilioFiscal('');
    setCondicionIVA('');
    setActividad('');
  };

  return (
    <div>
      <h2>Registro de Cliente</h2>
      <form onSubmit={handleSubmit}>
        <label>Razón Social:</label>
        <input type="text" value={razonSocial} onChange={(e) => setRazonSocial(e.target.value)} required />
        <br />
        <label>CUIT:</label>
        <input type="text" value={cuit} onChange={(e) => setCuit(e.target.value)} required />
        <br />
        <label>Domicilio Fiscal:</label>
        <input type="text" value={domicilioFiscal} onChange={(e) => setDomicilioFiscal(e.target.value)} required />
        <br />
        <label>Condición Frente al IVA:</label>
        <input type="text" value={condicionIVA} onChange={(e) => setCondicionIVA(e.target.value)} required />
        <br />
        <label>Actividad:</label>
        <input type="text" value={actividad} onChange={(e) => setActividad(e.target.value)} required />
        <br />
        <button type="submit">Registrar Cliente</button>
      </form>

      <h2>Listado de Clientes</h2>
      <table>
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
          {clientes.map((cliente) => (
            <tr key={cliente._id}>
              <td>{cliente.razonSocial}</td>
              <td>{cliente.cuit}</td>
              <td>{cliente.domicilioFiscal}</td>
              <td>{cliente.condicionIVA}</td>
              <td>{cliente.actividad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegisterClient;
