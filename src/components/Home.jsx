import React from 'react';
import './Home.css';
import triunviImage from '../assets/Triunvipc2.png'; // Asegúrate de que la ruta sea correcta

const Home = () => {
  const handleRegistrarseClick = () => {
    // Redirigir al usuario a Registrarse.html
    window.location.href = '/Registrarse.html';
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="main-heading">Lo que necesitabas para tu estudio contable</h1>
        
        <p className="sub-heading">
          Una herramienta creada para facilitar la obtención de datos de facturas y para la producción de declaraciones juradas en Argentina
        </p>
       
        {/* Botón Registrarse */}
        <button className="register-button" onClick={handleRegistrarseClick}>
          Registrarse
        </button>
      </div>
      <div className="image-container">
        <img src={triunviImage} alt="Descripción de la imagen" className="home-image" />
      </div>
    </div>
  );
};

export default Home;
