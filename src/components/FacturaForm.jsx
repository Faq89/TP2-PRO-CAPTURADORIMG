import React, { useState } from "react";
import axios from "axios";
import "./FacturaForm.css";

const FacturaForm = () => {
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

  const [facturas, setFacturas] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Handle editing
        const updatedFacturas = facturas.map((factura, index) =>
          index === editIndex ? formData : factura
        );
        setFacturas(updatedFacturas);
        setIsEditing(false);
        setEditIndex(-1);
        alert("Factura actualizada exitosamente");
      } else {
        await axios.post("http://127.0.0.1:3001/api/facturas", formData);
        setFacturas([...facturas, formData]);
        alert("Factura registrada exitosamente");
      }
      setFormData({
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
    } catch (error) {
      console.error("Error al registrar la factura:", error);
      alert("Error al registrar la factura");
    }
  };

  const handleEdit = (index) => {
    setFormData(facturas[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedFacturas = facturas.filter((_, i) => i !== index);
    setFacturas(updatedFacturas);
  };

  return (
    <div className="container">
      <h2>Registro Manual de Facturas</h2>
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
        <button type="submit">{isEditing ? "Guardar Cambios" : "Registrar Factura"}</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Tipo de Operación</th>
            <th>Razón Social</th>
            <th>CUIT</th>
            <th>Tipo de Factura</th>
            <th>Fecha de Facturación</th>
            <th>Punto de Venta</th>
            <th>Número de Comprobante</th>
            <th>Importe Total Neto</th>
            <th>IVA</th>
            <th>Importe Total</th>
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

export default FacturaForm;
