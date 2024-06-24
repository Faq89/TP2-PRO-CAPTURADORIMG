import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ImageUploader from './ImageUploader';
import FacturaForm from './FacturaForm';
import './MenuPanel.css'; // Importa el archivo CSS

const MenuPanel = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div className="sidebar">
          <ul>
            <li>
              <Link to="/Reg-Manual-Fac">Reg. Factura Manual</Link>
            </li>

            <li>
              <Link to="/Reg-Img-Fac">Reg Img Factura</Link>
            </li>

          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="MenuConteiner">
            <Routes>
              <Route path="/Reg-Manual-Fac" element={<FacturaForm />} />
              <Route path="/Reg-Img-Fac" element={<ImageUploader />} />

              <Route path="/" element={<div>Seleccione una opción del menú</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default MenuPanel;
