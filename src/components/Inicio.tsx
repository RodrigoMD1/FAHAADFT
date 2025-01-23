import { useEffect, useState } from 'react';
import { HeroSection } from "./Layout/HeroSection";
import axios from 'axios';


//importacion de imagenes locales





interface Producto{
  id: number;
  titulo: string;
  precio: number;
  stock: number;
  talles: string[];
}


export const Inicio = () => {

  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    // Función para obtener los productos de la API
    const fetchProductos = async () => {
      try {
        const response = await axios.get('https://proyecto-tienda01backend-production.up.railway.app/api/productos');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductos();
  }, []);

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
              
            </figure>
            <div className="card-body">
              <h2 className="card-title">{producto.titulo}</h2>
              <p>{producto.precio}</p>
              <p>{producto.stock}</p>
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
