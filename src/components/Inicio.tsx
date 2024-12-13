import { HeroSection } from "./Layout/HeroSection";


//importacion de imagenes locales
import productoImg02 from "../assets/img/prueba01.jpg"

// Simulación de base de datos
const productos = [
  {
    id: 1,
    nombre: "Producto 1",
    imagen: productoImg02,
    descripcion: "Descripción del producto 1.",
  },
  {
    id: 2,
    nombre: "Producto 2",
    imagen: productoImg02,
    descripcion: "Descripción del producto 2.",
  },
  {
    id: 3,
    nombre: "Producto 3",
    imagen: productoImg02,
    descripcion: "Descripción del producto 3.",
  },
  {
    id: 4,
    nombre: "Producto 4",
    imagen: productoImg02,
    descripcion: "Descripción del producto 3.",
  },
];

export const Inicio = () => {
  return (
    <div>
      <HeroSection />

      {/* Sección Sobre Nosotros */}
      <div className="px-6 py-12 m:px-12 lg:px-20 ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Sobre Nosotros
          </h2>
          <p className="mt-4 text-white sm:text-lg">
            Somos una empresa dedicada a ofrecer productos y servicios de alta calidad.
            Nuestro objetivo principal es satisfacer las necesidades de nuestros clientes,
            combinando innovación, pasión y compromiso. Creemos en el poder de la colaboración
            y en construir relaciones duraderas con nuestra comunidad.
          </p>
        </div>
      </div>

      <div className="text-3xl divider">Productos</div>

      {/* Contenedor flexible para las tarjetas */}
      <div className="flex flex-wrap justify-center gap-6">
        {/* Render dinámico de tarjetas */}
        {productos.map((producto) => (
          <div key={producto.id} className="w-full card glass sm:w-96">
            <figure>
              <img src={producto.imagen} alt={producto.nombre} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{producto.nombre}</h2>
              <p>{producto.descripcion}</p>
              <div className="justify-end card-actions">
                <button className="btn btn-primary">Ver más</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="divider">Default</div>






    </div>
  );
};
