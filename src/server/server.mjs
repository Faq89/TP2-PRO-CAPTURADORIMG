import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import Factura from './Factura.js'; // Asegúrate de que la ruta sea correcta

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173' // Añade la URL de tu frontend
}));

// Conectar a MongoDB
const mongoURI = 'mongodb+srv://facundoledesma89:jOSwVHw0Hfs1Yohs@weatherapp.mkfsymc.mongodb.net/Triunviffy?retryWrites=true&w=majority';
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });

// Definir el esquema de usuario
const userSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Ruta para registrar un usuario
app.post('/api/users', async (req, res) => {
  const { usuario, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ usuario, password: hashedPassword });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(400).send({ error: 'Error al registrar el usuario' });
  }
});

// Ruta para iniciar sesión
app.post('/api/login', async (req, res) => {
  const { usuario, password } = req.body;
  try {
    const user = await User.findOne({ usuario });
    if (!user) {
      return res.status(400).send('Usuario no encontrado');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send('Contraseña incorrecta');
    }
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret_key', { expiresIn: '1h' });
    res.send({ token, userId: user._id });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).send({ error: 'Error al iniciar sesión' });
  }
});

// Ruta para registrar una factura
app.post('/api/facturas', async (req, res) => {
  const { tipoOperacion, razonSocial, cuit, tipoFactura, fechaFacturacion, puntoVenta, numeroComprobante, importeTotalNeto, iva, importeTotal } = req.body;
  try {
    const newFactura = new Factura({ tipoOperacion, razonSocial, cuit, tipoFactura, fechaFacturacion, puntoVenta, numeroComprobante, importeTotalNeto, iva, importeTotal });
    await newFactura.save();
    res.status(201).send(newFactura);
  } catch (error) {
    console.error('Error al registrar la factura:', error);
    res.status(400).send({ error: 'Error al registrar la factura' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://127.0.0.1:${port}`);
});
