import { useEffect, useState } from 'react';
import { HeroSection } from "./Layout/HeroSection";
import axios from 'axios';


//importacion de imagenes locales


//TODO hacer paginacion para productos 


interface Producto {
  id: number;
  titulo: string;
  precio: number;
  stock: number;
  talles: string[];
  imagenes: string[];
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
    <div className='text-white bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]'>
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




      {/* Sección de Productos */}
      <div className="text-3xl divider">Productos</div>
      {/* Contenedor flexible para las tarjetas */}
      <div className="flex flex-wrap justify-center gap-6">
        {/* Render dinámico de tarjetas */}
        {productos.map((producto) => (
          <div key={producto.id} className="w-full card glass sm:w-96">
            <figure>
              {/* Aquí puedes agregar una imagen principal del producto si lo deseas */}
            </figure>
            <div className="card-body">

              <h2 className="text-3xl card-title">{producto.titulo}</h2>

              {producto.imagenes.length > 0 && producto.imagenes.map((imagen, index) => (
                <img key={index} src={imagen} alt={producto.titulo} className="w-full" />
              ))}

              <p className='text-xl'><h1>Precio: </h1>{producto.precio}</p>
              <div className="justify-end card-actions">


                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button className="text-xl text-white btn" onClick={() => (document.getElementById(`modal_${producto.id}`) as HTMLDialogElement).showModal()}>Detalles</button>
                <dialog id={`modal_${producto.id}`} className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box">
                    <h3 className="text-3xl font-bold">{producto.titulo}</h3>
                    <p className="py-4 text-xl"><h1>Stock Disponible: </h1>{producto.stock}</p>
                    {producto.imagenes.length > 0 && producto.imagenes.map((imagen, index) => (
                      <img key={index} src={imagen} alt={producto.titulo} className="w-full" />
                    ))}
                    <div className="modal-action">

                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="text-xl btn">Cerrar</button>
                      </form>

                    </div>
                  </div>
                </dialog>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="divider"></div>


      <div className="flex justify-center ">
        <div className=" join">
          <input
            className=" join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="1"
            defaultChecked
          />
          <input className="join-item btn btn-square " type="radio" name="options" aria-label="2" />
          <input className="join-item btn btn-square" type="radio" name="options" aria-label="3" />
          <input className="join-item btn btn-square" type="radio" name="options" aria-label="4" />
        </div>
      </div>



      <div className="divider"></div>

    </div>
  );
};
