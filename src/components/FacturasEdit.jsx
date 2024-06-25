import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FacturasEdit.css";

const FacturasEdit = () => {
  const [facturas, setFacturas] = useState([]);
  const [formData, setFormData] = useState({
    tipoOperacion: "",
    razonSocial: "",
    cuit: "",
    tipoFactura: "",
    fechaFacturacion: "",
    puntoVenta: "",
    numeroComprobante: "",
    importeTotalNeto: "",
    iva: "",
    importeTotal: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3001/api/facturas");
        setFacturas(response.data);
      } catch (error) {
        console.error("Error al obtener las facturas:", error);
      }
    };

    fetchFacturas();
  }, []);

  const handleEdit = (index) => {
    setFormData(facturas[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    try {
      const id = facturas[index]._id;
      await axios.delete(`http://127.0.0.1:3001/api/facturas/${id}`);
      const updatedFacturas = facturas.filter((_, i) => i !== index);
      setFacturas(updatedFacturas);
    } catch (error) {
      console.error("Error al eliminar la factura:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = facturas[editIndex]._id;
      const updatedFactura = { ...formData, _id: id };
      await axios.put(`http://127.0.0.1:3001/api/facturas/${id}`, updatedFactura);
      const updatedFacturas = facturas.map((factura, index) =>
        index === editIndex ? updatedFactura : factura
      );
      setFacturas(updatedFacturas);
      setIsEditing(false);
      setEditIndex(-1);
      alert("Factura actualizada exitosamente");
    } catch (error) {
      console.error("Error al actualizar la factura:", error);
      alert("Error al actualizar la factura");
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedFacturas = [...facturas].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setFacturas(sortedFacturas);
  };

  return (
    <div className="container">
      <h2>Listado y Edición de Facturas</h2>
      {isEditing && (
        <form onSubmit={handleSubmit}>
          <div className="form-column">
            <label>
              Tipo de Operación:
              <select
                name="tipoOperacion"
                value={formData.tipoOperacion}
                onChange={handleChange}
              >
                <option value="">Seleccione...</option>
                <option value="compra">Compra</option>
                <option value="venta">Venta</option>
              </select>
            </label>
            <label>
              Razón Social:
              <input
                type="text"
                name="razonSocial"
                value={formData.razonSocial}
                onChange={handleChange}
              />
            </label>
            <label>
              CUIT:
              <input
                type="text"
                name="cuit"
                value={formData.cuit}
                onChange={handleChange}
              />
            </label>
            <label>
              Tipo de Factura:
              <select
                name="tipoFactura"
                value={formData.tipoFactura}
                onChange={handleChange}
              >
                <option value="">Seleccione...</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </label>
            <label>
              Fecha de Facturación:
              <input
                type="date"
                name="fechaFacturacion"
                value={formData.fechaFacturacion}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-column">
            <label>
              Punto de Venta:
              <input
                type="text"
                name="puntoVenta"
                value={formData.puntoVenta}
                onChange={handleChange}
              />
            </label>
            <label>
              Número de Comprobante:
              <input
                type="text"
                name="numeroComprobante"
                value={formData.numeroComprobante}
                onChange={handleChange}
              />
            </label>
            <label>
              Importe Total Neto:
              <input
                type="number"
                name="importeTotalNeto"
                value={formData.importeTotalNeto}
                onChange={handleChange}
              />
            </label>
            <label>
              IVA:
              <input
                type="number"
                name="iva"
                value={formData.iva}
                onChange={handleChange}
              />
            </label>
            <label>
              Importe Total:
              <input
                type="number"
                name="importeTotal"
                value={formData.importeTotal}
                onChange={handleChange}
              />
            </label>
          </div>
          <button type="submit">Guardar Cambios</button>
        </form>
      )}

      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort('tipoOperacion')}>Tipo de Operación</th>
            <th onClick={() => handleSort('razonSocial')}>Razón Social</th>
            <th onClick={() => handleSort('cuit')}>CUIT</th>
            <th onClick={() => handleSort('tipoFactura')}>Tipo de Factura</th>
            <th onClick={() => handleSort('fechaFacturacion')}>Fecha de Facturación</th>
            <th onClick={() => handleSort('puntoVenta')}>Punto de Venta</th>
            <th onClick={() => handleSort('numeroComprobante')}>Número de Comprobante</th>
            <th onClick={() => handleSort('importeTotalNeto')}>Importe Total Neto</th>
            <th onClick={() => handleSort('iva')}>IVA</th>
            <th onClick={() => handleSort('importeTotal')}>Importe Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {facturas.map((factura, index) => (
            <tr key={index}>
              <td>{factura.tipoOperacion}</td>
              <td>{factura.razonSocial}</td>
              <td>{factura.cuit}</td>
              <td>{factura.tipoFactura}</td>
              <td>{factura.fechaFacturacion}</td>
              <td>{factura.puntoVenta}</td>
              <td>{factura.numeroComprobante}</td>
              <td>{factura.importeTotalNeto}</td>
              <td>{factura.iva}</td>
              <td>{factura.importeTotal}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Editar</button>
                <button onClick={() => handleDelete(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacturasEdit;