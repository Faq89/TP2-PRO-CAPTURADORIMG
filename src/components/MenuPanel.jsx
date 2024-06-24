import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ImageUploader from './ImageUploader';



import './MenuPanel.css'; // Importa el archivo CSS
import RegisterClient from './RegisterClient';
const MenuPanel = () => {
  const [showClientesMenu, setShowClientesMenu] = useState(false);
  const [showIvaCompraMenu, setShowIvaCompraMenu] = useState(false);
  const [showIvaVentaMenu, setShowIvaVentaMenu] = useState(false);
  const [showInformesMenu, setShowInformesMenu] = useState(false);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div className="sidebar">
          <ul>
            <li>
              <div onClick={() => setShowClientesMenu(!showClientesMenu)}>Clientes</div>
              {showClientesMenu && (
                <ul>
                  <li><Link to="/cliente/alta">Alta/Baja/Modificaciones</Link></li>
                </ul>
              )}
            </li>

            <li>
              <div onClick={() => setShowIvaCompraMenu(!showIvaCompraMenu)}>IVA Compra</div>
              {showIvaCompraMenu && (
                <ul>
                  <li><Link to="/iva-compra/carga-de-comprobantes">Carga de Comprobantes</Link></li>
                </ul>
              )}
            </li>
            <li>
              <div onClick={() => setShowIvaVentaMenu(!showIvaVentaMenu)}>IVA Venta</div>
              {showIvaVentaMenu && (
                <ul>
                  <li><Link to="/iva-venta/carga-de-comprobantes">Carga de Comprobantes</Link></li>
                </ul>
              )}
            </li>
            <li>
              <div onClick={() => setShowInformesMenu(!showInformesMenu)}>Informes</div>
              {showInformesMenu && (
                <ul>
                  <li><Link to="/informes/proyeccion-de-ventas">Proyección de Ventas</Link></li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="MenuConteiner">
            <Routes>
              <Route path="/cliente/alta" element={<RegisterClient/>} />
              <Route path="/iva-compra/carga-de-comprobantes" element={<ImageUploader />} />
              <Route path="/iva-venta/carga-de-comprobantes" element={<ImageUploader />} />
              <Route path="/informes/proyeccion-de-ventas" element={<div>Proyección de Ventas</div>} />
              <Route path="/" element={<div>Seleccione una opción del menú</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default MenuPanel;
