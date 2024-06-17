import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ImageUploader from './ImageUploader';
import DataList from './DataList';

const MenuPanel = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: '250px', background: '#f8f9fa', padding: '20px', borderRight: '1px solid #dee2e6' }}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ margin: '10px 0' }}>
              <Link to="/carga-de-comprobantes">Carga de Comprobantes</Link>
            </li>
            <li style={{ margin: '10px 0' }}>
              <Link to="/informes">Informes</Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/carga-de-comprobantes" element={<ImageUploader />} />
            <Route path="/informes" element={<DataList />} />
            <Route path="/" element={<div>Seleccione una opción del menú</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default MenuPanel;
