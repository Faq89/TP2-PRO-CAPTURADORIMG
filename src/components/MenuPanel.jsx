import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ImageUploader from './ImageUploader';
import DataList from './DataList';
import AddCliente from './AddCliente';
import './MenuPanel.css'; // Importa el archivo CSS

const MenuPanel = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div className="sidebar">
          <ul>
            <li>
              <Link to="/nuevo-cliente">Nuevo Cliente</Link>
            </li>
            <li>
              <Link to="/carga-de-comprobantes">Carga de Comprobantes</Link>
            </li>
            <li>
              <Link to="/informes">Informes</Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="MenuConteiner">
            <Routes>
              <Route path="/nuevo-cliente" element={<AddCliente />} />
              <Route path="/carga-de-comprobantes" element={<ImageUploader />} />
              <Route path="/informes" element={<DataList />} />
              <Route path="/" element={<div>Seleccione una opción del menú</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default MenuPanel;
