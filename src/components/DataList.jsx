import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DataList.css';

const DataList = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    id: '',
    CUIT: '', // Corregido para que coincida con el nombre del campo en el esquema de Mongoose
    nombre: '',
    apellido: '',
    fechaRegistro: '',
    email: '',
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/clientes', { params: filters });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Dependencia vacía para que se ejecute solo una vez al montar el componente

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    fetchData();
  };

  return (
    <div className='containerData'>
      <h1>Data List</h1>
      <div className='box'>
        <input
          type="text"
          name="CUIT" // Corregido para que coincida con el nombre del campo en el esquema de Mongoose
          placeholder="CUIT"
          value={filters.CUIT}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={filters.email}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>CUIT</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Alta</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6">No data found</td>
            </tr>
          ) : (
            data.map((cliente) => (
              <tr key={cliente._id}>
                <td>{cliente.id}</td>
                <td>{cliente.CUIT}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.apellido}</td>
                <td>{cliente.email}</td>
                <td>{cliente.fechaRegistro}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataList;
