import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ImageUploader from './ImageUploader';
import FacturaForm from './FacturaForm';
import './MenuPanel.css'; // Importa el archivo CSS
import FacturasEdit from './FacturasEdit';
import InformesGrafico from './InformeGraficos';

const MenuPanel = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const menuItems = [
    { id: 1, label: 'Registro manual de facturas', path: '/Reg-Manual-Fac' },
    { id: 2, label: 'Registro con IA de facturas', path: '/Reg-Img-Fac' },
    { id: 3, label: 'Gestión de Facturas', path: '/Edit-Fac-charge' },
    { id: 4, label: 'Información de Gráficos', path: '/Ver-inf-graf' },
  ];

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div className="sidebar">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={selectedItem === item.id ? 'active' : ''}
                  onClick={() => handleItemClick(item.id)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
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
