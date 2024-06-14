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
            <a href="https://www.instagram.com/" className="socialLink">Instagram</a>
            <a href="https://github.com/" className="socialLink">GitHub</a>
            <a href="https://www.facebook.com/" className="socialLink">Facebook</a>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
