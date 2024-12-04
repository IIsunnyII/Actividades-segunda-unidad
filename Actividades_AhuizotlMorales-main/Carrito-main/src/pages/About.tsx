import React from 'react';

const About: React.FC = () => {
    return (
        <div className="about-section">
            {/* Cuadro con el contenido de "Acerca de nosotros" */}
            <div className="about-container">
                <h1>Acerca de nosotros</h1>
                <p>
                    Bienvenido a Market Foro, tu destino en línea para las mejores ofertas en productos de alta calidad.
                    Nos esforzamos por ofrecer una experiencia de compra excepcional, brindando una amplia variedad de productos que se adaptan a tus necesidades y gustos.
                    Nuestro objetivo es hacer que cada compra sea fácil y satisfactoria, asegurando que nuestros clientes siempre estén contentos con su elección.
                </p>
                <p>
                    Creemos en la transparencia, la calidad y el servicio al cliente.
                    Nuestro equipo está dedicado a ofrecer un servicio amable y eficiente, siempre listo para ayudarte con cualquier consulta.
                    Gracias por elegir Market Foro. ¡Esperamos que disfrutes de tu experiencia de compra con nosotros!
                </p>
            </div>

            {/* Pie de página fuera del cuadro */}
            <footer className="footer bg-dark text-light py-3 mt-3">
                <div className="container text-center">
                    <p>&copy; 2024 Market Foro. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default About;
