import React, { useState } from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [alertState, setAlertState] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:3001/api/facturas", formData);
      setAlertState({
        open: true,
        severity: "success",
        message: "Factura registrada exitosamente",
      });
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
      setTimeout(() => {
        setAlertState({
          ...alertState,
          open: false,
        });
      }, 3000); // 3000 milisegundos (3 segundos)
    } catch (error) {
      console.error("Error al registrar la factura:", error);
      setAlertState({
        open: true,
        severity: "error",
        message: "Error al registrar la factura",
      });
    }
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
        <button type="submit">Registrar Factura</button>
      </form>
      {alertState.open && (
        <div className="floating-alert">
          <Alert severity={alertState.severity}>
            <AlertTitle>{alertState.severity === "success" ? "Éxito" : "Error"}</AlertTitle>
            {alertState.message}
          </Alert>
        </div>
      )}
    </div>
  );
};

export default FacturaForm;
