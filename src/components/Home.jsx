import React from 'react';
import './Home.css';
import triunviImage from '../assets/Triunvipc2.jpg'; // Asegúrate de que la ruta sea correcta
import sliderImage1 from '../assets/slider1.jpg';
import sliderImage2 from '../assets/slider2.png';
import sliderImage3 from '../assets/slider3.png';

const Home = () => {
  const handleRegistrarseClick = () => {
    // Redirigir al usuario a Registrarse.html
    window.location.href = '/Registrarse.html';
  };

  return (
    <div className="home-container">
      <div className="top-section">
        <div className="image-container">
          <img src={triunviImage} alt="Equipo" className="home-image" />
          <button className="register-button" onClick={handleRegistrarseClick}>
            Registrarse
          </button>
        </div>
      </div>
      <div className="slider-container">
        <div className="slider">
          <div className="slide-track">
            <div className="slide">
              <img src={sliderImage1} alt="Servicio 1" />
            </div>
            <div className="slide">
              <img src={sliderImage2} alt="Servicio 2" />
            </div>
            <div className="slide">
              <img src={sliderImage3} alt="Servicio 3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
