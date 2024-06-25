import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ImageUploader from './ImageUploader';
import FacturaForm from './FacturaForm';
import './MenuPanel.css'; // Importa el archivo CSS
import FacturasEdit from './FacturasEdit';
import InformesGrafico from './InformeGraficos';


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
            <li>
              <Link to="/Edit-Fac-charge">Ver Facturas</Link>
            </li>
            <li>
              <Link to="/Ver-inf-graf">Inf. Grafico</Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="MenuConteiner">
            <Routes>
              <Route path="/Reg-Manual-Fac" element={<FacturaForm />} />
              <Route path="/Reg-Img-Fac" element={<ImageUploader />} />
              <Route path="/Edit-Fac-charge" element={<FacturasEdit />} />
              <Route path="/Ver-inf-graf" element={<InformesGrafico />} />

              <Route path="/" element={<div>Seleccione una opción del menú</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default MenuPanel;
