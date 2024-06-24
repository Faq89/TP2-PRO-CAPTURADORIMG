import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Asegúrate de importar Header si aún no lo has hecho
import Login from './components/Login'; // Asegúrate de importar Login si aún no lo has hecho
import RegisterUser from './components/RegisterUser'; // Asegúrate de importar RegisterUser si aún no lo has hecho
import Home from './components/Home'; // Asegúrate de tener este componente


function App() {
  return (
    <Router>
      <Header /> {/* Asegúrate de que Header esté dentro de Router */}
      <Routes>
        <Route path="/Home" element={<Home />} />
        
        <Route path="/Login" element={<Login />} /> {/* Ruta por defecto al iniciar sesión */}
        <Route path="/register-user" element={<RegisterUser />} /> {/* Ruta para registrar usuario */}
        {/* Agrega más rutas según sea necesario */}
      </Routes>
    </Router>
  );
}

export default App;
