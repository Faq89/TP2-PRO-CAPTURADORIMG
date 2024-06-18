import React, { useState } from 'react';
import axios from 'axios';
import './AddCliente.css';

const AddCliente = () => {
  const [formData, setFormData] = useState({
    id: generateId(),
    CUIT: '',
    email: '',
    nombre: '',
    apellido: '',
    fechaRegistro: new Date().toISOString().split('T')[0]
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validar CUIT de 11 dígitos
    if (formData.CUIT.length !== 11) {
      setError('El CUIT debe tener exactamente 11 dígitos.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      if (response.data.success) {
        alert('Registro exitoso');
        // Limpiar el formulario después de un registro exitoso
        setFormData({
          id: generateId(),
          CUIT: '',
          email: '',
          nombre: '',
          apellido: '',
          fechaRegistro: new Date().toISOString().split('T')[0]
        });
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Error en el registro');
    }
  };

  // Función para generar un ID único alfanumérico de 12 caracteres
  function generateId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Nuevo cliente</h1>
        <div style={{ display: 'none' }}>
          <input
            type="text"
            name="id"
            id="id"
            value={formData.id}
            readOnly
          />
        </div>
        <div>
          <input
            type="text"
            name="CUIT"
            id="CUIT"
            placeholder="CUIT (11 dígitos)"
            value={formData.CUIT}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="apellido"
            id="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ display: 'none' }}>
          <input
            type="text"
            name="fechaRegistro"
            id="fechaRegistro"
            value={formData.fechaRegistro}
            readOnly
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default AddCliente;
