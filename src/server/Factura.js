import mongoose from 'mongoose';

const facturaSchema = new mongoose.Schema({
  tipoOperacion: { type: String, required: false },
  razonSocial: { type: String, required: false },
  cuit: { type: String, required: false },
  tipoFactura: { type: String, required: false },
  fechaFacturacion: { type: String, required: false }, // Cambiado a String
  puntoVenta: { type: String, required: false },
  numeroComprobante: { type: String, required: false },
  importeTotalNeto: { type: Number, required: false },
  iva: { type: Number, required: false },
  importeTotal: { type: Number, required: false }
});

const Factura = mongoose.model('Factura', facturaSchema);

export default Factura;
