/** @jsxImportSource react */
import React, { useState } from 'react';
import './Footer.css'; // Importa los estilos CSS

const Footer = () => {
  const [showSocialMenu, setShowSocialMenu] = useState(false);

  const toggleSocialMenu = () => {
    setShowSocialMenu(!showSocialMenu);
  };

  return (
    <footer className="footer">
      <div className="footerContentLeft">
        <p>&copy; 2024 Triunviffy. Todos los derechos reservados.</p>
      </div>
      <div className="footerContentRight">
        <button onClick={toggleSocialMenu} className="socialButton">
          Contacto
        </button>
        {showSocialMenu && (
          <div className="socialMenu">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="socialLink">Linkedln</a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="socialLink">GitHub</a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="socialLink">WhatsApp</a>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
