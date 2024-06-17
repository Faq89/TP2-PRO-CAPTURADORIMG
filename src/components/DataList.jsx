import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataList = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    id: '',
    nombre: '',
    apellido: '',
    fechaRegistro: '',
    email: '',
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users', { params: filters });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

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
    <div>
      <h1>Data List</h1>
      <div>
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={filters.id}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={filters.nombre}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={filters.apellido}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="fechaRegistro"
          placeholder="Fecha de Registro"
          value={filters.fechaRegistro}
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
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de Registro</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user._id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.fechaRegistro}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataList;