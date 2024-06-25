/** @jsxImportSource react */
import React from 'react';
import './NosotrosComp.css'; // Import the corresponding CSS file for styling

const Nosotros = () => {
  return (
    <div className="nosotros-container">
      <h1>¿Quiénes somos?</h1>
      <img src="src\assets\pricopia.jpg" alt="Imagen Principal" className="main-image" />
      <div className="content">
        <p className="text">Quiénes Somos
Somos un equipo de estudiantes dedicados y apasionados por la tecnología y los negocios, provenientes de diversos campos académicos. Juntos, combinamos nuestras habilidades y conocimientos para ofrecer soluciones innovadoras y efectivas.

Yanina: Estudiante de la Tecnicatura Universitaria en Programación y futura Ingeniera Mecánica. Ana aporta su pensamiento analítico y habilidades técnicas, garantizando que nuestras soluciones sean eficientes y robustas desde una perspectiva técnica.
Florencia: Estudiante de la Tecnicatura Universitaria en Programación y futura Contadora. Con una sólida base en contabilidad y un ojo agudo para la precisión financiera, María asegura que nuestras soluciones sean no solo técnicamente sólidas, sino también financieramente viables.
Facundo: Técnico en Comercio Exterior y Organización Bancaria, estudiante de la Tecnicatura Universitaria en Programación, además de desarrollador Fullstack. Jorge se especializa en la gestión y expansión de negocios a nivel internacional y en el desarrollo integral de software, proporcionando una perspectiva global y técnica a nuestros proyectos.

Juntos, somos capaces de crear sistemas contables robustos y personalizados que se adaptan a las necesidades específicas de cada cliente. Nuestra combinación de conocimientos en programación, contabilidad, ingeniería y comercio exterior nos permite ofrecer una propuesta de valor única en el mercado. ¡Estamos aquí para ayudarte a llevar tu negocio al siguiente nivel!</p>
        <img src="src\assets\seg.jpg" alt="Imagen Flotante" className="floating-image" />
      </div>
    </div>
  );
};

export default Nosotros;