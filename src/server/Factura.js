import mongoose from 'mongoose';

const facturaSchema = new mongoose.Schema({
  tipoOperacion: { type: String, required: true }, // Nuevo campo
  razonSocial: { type: String, required: true },
  cuit: { type: String, required: true },
  tipoFactura: { type: String, required: true },
  fechaFacturacion: { type: Date, required: true },
  puntoVenta: { type: String, required: true },
  numeroComprobante: { type: String, required: true },
  importeTotalNeto: { type: Number, required: true },
  iva: { type: Number, required: true },
  importeTotal: { type: Number, required: true }
});

const Factura = mongoose.model('Factura', facturaSchema);

export default Factura;
