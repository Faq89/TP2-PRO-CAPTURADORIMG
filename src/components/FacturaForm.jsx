import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const FacturaForm = () => {
  const [formData, setFormData] = useState({
    tipoOperacion: "", // Nuevo campo para tipo de operación
    razonSocial: "",
    cuit: "",
    tipoFactura: "",
    fechaFacturacion: "",
    puntoVenta: "",
    numeroComprobante: "",
    importeTotalNeto: "",
    iva: "",
    importeTotal: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:3001/api/facturas", formData);
      alert("Factura registrada exitosamente");
    } catch (error) {
      console.error("Error al registrar la factura:", error);
      alert("Error al registrar la factura");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Tipo de Operación</InputLabel>
        <Select
          label="Tipo de Operación"
          name="tipoOperacion"
          value={formData.tipoOperacion}
          onChange={handleChange}
        >
          <MenuItem value="compra">Compra</MenuItem>
          <MenuItem value="venta">Venta</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Razón Social"
        name="razonSocial"
        value={formData.razonSocial}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="CUIT"
        name="cuit"
        value={formData.cuit}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Tipo de Factura</InputLabel>
        <Select
          label="Tipo de Factura"
          name="tipoFactura"
          value={formData.tipoFactura}
          onChange={handleChange}
        >
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
          <MenuItem value="C">C</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Fecha de Facturación"
        name="fechaFacturacion"
        value={formData.fechaFacturacion}
        onChange={handleChange}
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Punto de Venta"
        name="puntoVenta"
        value={formData.puntoVenta}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Número de Comprobante"
        name="numeroComprobante"
        value={formData.numeroComprobante}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Importe Total Neto"
        name="importeTotalNeto"
        value={formData.importeTotalNeto}
        onChange={handleChange}
        type="number"
        fullWidth
        margin="normal"
      />
      <TextField
        label="IVA"
        name="iva"
        value={formData.iva}
        onChange={handleChange}
        type="number"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Importe Total"
        name="importeTotal"
        value={formData.importeTotal}
        onChange={handleChange}
        type="number"
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Registrar Factura
      </Button>
    </form>
  );
};

export default FacturaForm;
