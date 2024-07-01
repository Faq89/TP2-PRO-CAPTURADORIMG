import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/GetApp'; // Importa el icono de descarga
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
  const [alertState, setAlertState] = useState({
    open: false,
    severity: "success",
    message: "",
  });

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
      showAlert("Factura eliminada exitosamente", "success");
    } catch (error) {
      console.error("Error al eliminar la factura:", error);
      showAlert("Error al eliminar la factura", "error");
    }
  };

  const handleDownload = (factura) => {
    const generarTextoFactura = (factura) => {
      const { fechaFacturacion, puntoVenta, numeroComprobante, cuit, razonSocial, importeTotal, iva } = factura;
  
      const fechaFormateada = fechaFacturacion.padEnd(8, '0');
      const puntoVentaFormateado = puntoVenta.padStart(5, '0');
      const numeroComprobanteFormateado = numeroComprobante.padStart(8, '0');
      const cuitFormateado = cuit.padStart(11, '0');
      const razonSocialFormateada = razonSocial.padEnd(40, ' ');
      const importeTotalFormateado = importeTotal.toString().padStart(15, '0');
      const ivaFormateado = iva.toString().padStart(15, '0');
  
      const textoFactura = `${fechaFormateada}${puntoVentaFormateado}${numeroComprobanteFormateado}${cuitFormateado}${razonSocialFormateada}0000000${importeTotalFormateado}0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000PES00010000002000000000${ivaFormateado}0000000000000000000000000                              000000000000000`;
  
      return textoFactura;
    };
  
    const textoFactura = generarTextoFactura(factura);
    const blob = new Blob([textoFactura], { type: 'text/plain' });
    const link = document.createElement('a');
    const fileName = factura.tipoOperacion === 'compra' ? 'iva_compra.txt' : 'iva_venta.txt';
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
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
      showAlert("Factura actualizada exitosamente", "success");
    } catch (error) {
      console.error("Error al actualizar la factura:", error);
      showAlert("Error al actualizar la factura", "error");
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

  const showAlert = (message, severity) => {
    setAlertState({
      open: true,
      severity,
      message,
    });
    setTimeout(() => {
      setAlertState({
        ...alertState,
        open: false,
      });
    }, 3000); // 3000 milisegundos (3 segundos)
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
          <input type="submit" value="Guardar" />
        </form>
      )}
      <div className="table-container">
        <table>
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
                <td className="actions-column">
                  <EditIcon className="edit-icon" onClick={() => handleEdit(index)} />
                  <DeleteIcon className="delete-icon" onClick={() => handleDelete(index)} />
                  <DownloadIcon className="download-icon" onClick={() => handleDownload(factura)} /> {/* Icono de descarga */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default FacturasEdit;
