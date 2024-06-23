import React, { useState } from 'react';
import axios from 'axios';

const RegisterInvoice = ({ userId, clienteId }) => {
  const [tipoFactura, setTipoFactura] = useState('factura venta');
  const [factura, setFactura] = useState({
    fecha: '',
    tipoFactura: '',
    numeroFactura: '',
    puntoDeVenta: '',
    CUIT: '',
    razonSocial: '',
    importeTotal: 0,
    importeNetoGravado: 0,
    IVA: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFactura((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTotalChange = (e) => {
    const importeTotal = parseFloat(e.target.value);
    const importeNetoGravado = importeTotal / 1.21;
    const IVA = importeTotal - importeNetoGravado;
    setFactura((prev) => ({
      ...prev,
      importeTotal,
      importeNetoGravado,
      IVA
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/facturas', {
      userId,
      clienteId,
      factura: { ...factura, tipoFactura }
    });
    // Manejar la respuesta y posibles errores
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={tipoFactura} onChange={(e) => setTipoFactura(e.target.value)}>
        <option value="factura venta">Factura Venta</option>
        <option value="factura compra">Factura Compra</option>
      </select>
      <input type="date" name="fecha" value={factura.fecha} onChange={handleChange} required />
      <input type="text" name="numeroFactura" value={factura.numeroFactura} onChange={handleChange} required />
      <input type="text" name="puntoDeVenta" value={factura.puntoDeVenta} onChange={handleChange} required />
      <input type="text" name="CUIT" value={factura.CUIT} onChange={handleChange} required />
      <input type="text" name="razonSocial" value={factura.razonSocial} onChange={handleChange} required />
      <input type="number" name="importeTotal" value={factura.importeTotal} onChange={handleTotalChange} required />
      <input type="number" name="importeNetoGravado" value={factura.importeNetoGravado} readOnly />
      <input type="number" name="IVA" value={factura.IVA} readOnly />
      <button type="submit">Registrar Factura</button>
    </form>
  );
};

export default RegisterInvoice;
