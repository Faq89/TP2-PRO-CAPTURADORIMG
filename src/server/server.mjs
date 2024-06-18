import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://facundoledesma89:jOSwVHw0Hfs1Yohs@weatherapp.mkfsymc.mongodb.net/";
if (!MONGO_URI) {
  throw new Error('La variable de entorno MONGO_URI no está definida');
}
console.log('MONGO_URI:', MONGO_URI);

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const clienteSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  CUIT: { type: String, unique: true, required: true }, // Nuevo campo CUIT
  email: { type: String, unique: true, required: true },
  nombre: String,
  apellido: String,
  fechaRegistro: String,
});

const Cliente = mongoose.model('Cliente', clienteSchema);

app.post('/register', async (req, res) => {
  const { id, CUIT, email, nombre, apellido, fechaRegistro } = req.body;

  try {
    const newCliente = new Cliente({ id, CUIT, email, nombre, apellido, fechaRegistro });
    await newCliente.save();
    res.json({ success: true, message: 'Usuario registrado con éxito' });
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
      if (error.keyPattern.id) {
        return res.json({ success: false, message: 'El ID ya está en uso' });
      }
      if (error.keyPattern.CUIT) {
        return res.json({ success: false, message: 'El CUIT ya está en uso' });
      }
      if (error.keyPattern.email) {
        return res.json({ success: false, message: 'El email ya está en uso' });
      }
      
    }
    res.json({ success: false, message: 'Error en el registro' });
  }
});

// Nuevo endpoint para obtener datos con filtros
app.get('/api/clientes', async (req, res) => {
  const { id, CUIT, email, nombre, apellido, fechaRegistro } = req.query;
  let filter = {};

  if (id) filter.id = id;
  if (CUIT) filter.CUIT = CUIT;
  if (email) filter.email = new RegExp(email, 'i'); // Case insensitive
  if (nombre) filter.nombre = new RegExp(nombre, 'i'); // Case insensitive
  if (apellido) filter.apellido = new RegExp(apellido, 'i'); // Case insensitive
  if (fechaRegistro) filter.fechaRegistro = fechaRegistro;

  try {
    const clientes = await Cliente.find(filter);
    res.json(clientes);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
