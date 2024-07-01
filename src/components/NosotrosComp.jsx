/** @jsxImportSource react */
import React from 'react';
import './NosotrosComp.css'; // Import the corresponding CSS file for styling

const Nosotros = () => {
  return (
    <div className="nosotros-container">
      <h1>¿Quiénes somos?</h1>
      <img src="src/assets/pricopia.jpg" alt="Imagen Principal" className="main-image" />
      <div className="content">
        <div className="text">
          <h2>Nuestros Integrantes</h2>
          <p>
            Somos un equipo apasionado por la tecnología y los negocios, combinando habilidades y conocimientos de diversos campos académicos para ofrecer soluciones innovadoras y efectivas.
          </p>
          <p><strong>Yanina:</strong> Estudiante de la Tecnicatura Universitaria en Programación y futura Ingeniera Mecánica. Yanina aporta su pensamiento analítico y habilidades técnicas para garantizar que nuestras soluciones sean eficientes y robustas.</p>
          <p><strong>Florencia:</strong> Estudiante de la Tecnicatura Universitaria en Programación y futura Contadora. Con una sólida base en contabilidad y precisión financiera, Florencia asegura que nuestras soluciones sean técnicamente sólidas y financieramente viables.</p>
          <p><strong>Facundo:</strong> Técnico en Comercio Exterior y Organización Bancaria, y estudiante de la Tecnicatura Universitaria en Programación. Facundo se especializa en la gestión y expansión de negocios, proporcionando una perspectiva global a nuestros proyectos.</p>
          <p>
            Juntos, creamos sistemas contables robustos y personalizados que se adaptan a las necesidades específicas de cada cliente. ¡Estamos aquí para ayudarte a llevar tu negocio al siguiente nivel!
          </p>
        </div>
        <img src="src/assets/seg.jpg" alt="Imagen Flotante" className="floating-image" />
      </div>
    </div>
  );
};

export default Nosotros;
