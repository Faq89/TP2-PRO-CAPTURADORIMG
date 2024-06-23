import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

app.use(express.json());

// Conectar a MongoDB
mongoose.connect('MONGO_URI=mongodb+srv://facundoledesma89:jOSwVHw0Hfs1Yohs@weatherapp.mkfsymc.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Definir los esquemas
const facturaSchema = new mongoose.Schema({
  fecha: Date,
  tipoFactura: String,
  numeroFactura: String,
  puntoDeVenta: String,
  CUIT: String,
  razonSocial: String,
  importeTotal: Number,
  importeNetoGravado: Number,
  IVA: Number
});

const clienteSchema = new mongoose.Schema({
  CUIT: String,
  domicilioFiscal: String,
  razonSocial: String,
  condicionFrenteAlIVA: String,
  facturas: [facturaSchema]
});

const userSchema = new mongoose.Schema({
  CUIT: String,
  domicilioFiscal: String,
  razonSocial: String,
  condicionFrenteAlIVA: String,
  clientes: [clienteSchema]
});

const User = mongoose.model('User', userSchema);

// Ruta para registrar un cliente
app.post('/api/clientes', async (req, res) => {
  const { userId, cliente } = req.body;
  const user = await User.findById(userId);
  user.clientes.push(cliente);
  await user.save();
  res.status(201).send(user);
});

// Ruta para registrar un usuario
app.post('/api/users', async (req, res) => {
  const { CUIT, domicilioFiscal, razonSocial, condicionFrenteAlIVA } = req.body;
  const newUser = new User({
    CUIT,
    domicilioFiscal,
    razonSocial,
    condicionFrenteAlIVA,
    clientes: [] // Inicialmente vacío
  });
  try {
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
});
// Ruta para registrar una factura
app.post('/api/facturas', async (req, res) => {
  const { userId, clienteId, factura } = req.body;
  const user = await User.findById(userId);
  const cliente = user.clientes.id(clienteId);
  cliente.facturas.push(factura);
  await user.save();
  res.status(201).send(user);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
