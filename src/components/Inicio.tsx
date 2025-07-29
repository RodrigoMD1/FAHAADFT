import { useEffect, useState } from 'react';
import { HeroSection } from "./Layout/HeroSection";
import { useCarrito } from '../hooks/useCarrito';
import { Toast } from './Toast';
import axios from 'axios';

interface Producto {
  id: number;
  titulo: string;
  precio: number;
  stock: number;
  talles: string[];
  imagenes: string[];
  descripcion?: string;
  categoria?: string;
}

// Datos temporales de prendas de ropa hasta conectar con la base de datos
const prendasTemporales = [
  // Camisetas
  {
    id: 1001,
    titulo: "Camiseta Casual Roja",
    precio: 25.99,
    stock: 15,
    talles: ["S", "M", "L", "XL"],
    imagenes: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center"],
    categoria: "Camisetas",
    descripcion: "Camiseta de algodón 100% con diseño moderno y cómodo ajuste."
  },
  {
    id: 1007,
    titulo: "Camiseta Básica Blanca",
    precio: 19.99,
    stock: 25,
    talles: ["XS", "S", "M", "L", "XL", "XXL"],
    imagenes: ["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop&crop=center"],
    categoria: "Camisetas",
    descripcion: "Camiseta básica de algodón, perfecta para combinar con cualquier outfit."
  },
  {
    id: 1008,
    titulo: "Camiseta Estampada",
    precio: 32.50,
    stock: 18,
    talles: ["S", "M", "L", "XL"],
    imagenes: ["https://images.unsplash.com/photo-1583743814966-8936f37f86c6?w=400&h=400&fit=crop&crop=center"],
    categoria: "Camisetas",
    descripcion: "Camiseta con estampado exclusivo, diseño único y moderno."
  },
  {
    id: 1009,
    titulo: "Polo Clásico",
    precio: 45.00,
    stock: 14,
    talles: ["S", "M", "L", "XL", "XXL"],
    imagenes: ["https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop&crop=center"],
    categoria: "Camisetas",
    descripcion: "Polo clásico de piqué, ideal para ocasiones semi-formales."
  },

  // Pantalones
  {
    id: 1002,
    titulo: "Jeans Clásicos",
    precio: 89.99,
    stock: 8,
    talles: ["28", "30", "32", "34", "36"],
    imagenes: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center"],
    categoria: "Pantalones",
    descripcion: "Jeans de corte clásico, perfectos para cualquier ocasión."
  },
  {
    id: 1010,
    titulo: "Pantalón Chino",
    precio: 75.00,
    stock: 12,
    talles: ["28", "30", "32", "34", "36", "38"],
    imagenes: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center"],
    categoria: "Pantalones",
    descripcion: "Pantalón chino elegante, perfecto para look casual-formal."
  },
  {
    id: 1011,
    titulo: "Pantalón Deportivo",
    precio: 42.99,
    stock: 20,
    talles: ["S", "M", "L", "XL", "XXL"],
    imagenes: ["https://images.unsplash.com/photo-1506629905607-87b84c1592cf?w=400&h=400&fit=crop&crop=center"],
    categoria: "Pantalones",
    descripcion: "Pantalón deportivo cómodo, ideal para ejercicio y tiempo libre."
  },
  {
    id: 1012,
    titulo: "Shorts de Verano",
    precio: 35.50,
    stock: 16,
    talles: ["28", "30", "32", "34", "36"],
    imagenes: ["https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop&crop=center"],
    categoria: "Pantalones",
    descripcion: "Shorts ligeros y frescos, perfectos para el verano."
  },

  // Vestidos
  {
    id: 1004,
    titulo: "Vestido Elegante",
    precio: 120.00,
    stock: 6,
    talles: ["XS", "S", "M", "L"],
    imagenes: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop&crop=center"],
    categoria: "Vestidos",
    descripcion: "Vestido elegante perfecto para ocasiones especiales."
  },
  {
    id: 1013,
    titulo: "Vestido Casual",
    precio: 68.00,
    stock: 10,
    talles: ["XS", "S", "M", "L", "XL"],
    imagenes: ["https://images.unsplash.com/photo-1566479179817-c0b82b4dc5cd?w=400&h=400&fit=crop&crop=center"],
    categoria: "Vestidos",
    descripcion: "Vestido casual cómodo para uso diario, estilo relajado."
  },
  {
    id: 1014,
    titulo: "Vestido de Noche",
    precio: 180.00,
    stock: 4,
    talles: ["XS", "S", "M", "L"],
    imagenes: ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop&crop=center"],
    categoria: "Vestidos",
    descripcion: "Vestido sofisticado para eventos nocturnos y galas."
  },

  // Chaquetas
  {
    id: 1005,
    titulo: "Chaqueta de Cuero",
    precio: 199.99,
    stock: 4,
    talles: ["S", "M", "L", "XL"],
    imagenes: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop&crop=center"],
    categoria: "Chaquetas",
    descripcion: "Chaqueta de cuero genuino con estilo urbano contemporáneo."
  },
  {
    id: 1015,
    titulo: "Blazer Formal",
    precio: 145.00,
    stock: 8,
    talles: ["S", "M", "L", "XL", "XXL"],
    imagenes: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center"],
    categoria: "Chaquetas",
    descripcion: "Blazer elegante para ocasiones formales y profesionales."
  },
  {
    id: 1016,
    titulo: "Chaqueta Bomber",
    precio: 98.50,
    stock: 12,
    talles: ["S", "M", "L", "XL"],
    imagenes: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop&crop=center"],
    categoria: "Chaquetas",
    descripcion: "Chaqueta bomber moderna con estilo street wear."
  },
  {
    id: 1017,
    titulo: "Abrigo de Invierno",
    precio: 220.00,
    stock: 6,
    talles: ["S", "M", "L", "XL"],
    imagenes: ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop&crop=center"],
    categoria: "Chaquetas",
    descripcion: "Abrigo cálido y elegante para los días más fríos."
  },

  // Sudaderas
  {
    id: 1003,
    titulo: "Sudadera con Capucha",
    precio: 65.50,
    stock: 12,
    talles: ["S", "M", "L", "XL", "XXL"],
    imagenes: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&crop=center"],
    categoria: "Sudaderas",
    descripcion: "Sudadera cómoda con forro polar interior, ideal para días frescos."
  },
  {
    id: 1018,
    titulo: "Sudadera Sin Capucha",
    precio: 55.00,
    stock: 15,
    talles: ["S", "M", "L", "XL", "XXL"],
    imagenes: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center"],
    categoria: "Sudaderas",
    descripcion: "Sudadera clásica sin capucha, perfecta para entretiempo."
  },
  {
    id: 1019,
    titulo: "Sudadera Oversized",
    precio: 72.00,
    stock: 9,
    talles: ["S", "M", "L", "XL"],
    imagenes: ["https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400&h=400&fit=crop&crop=center"],
    categoria: "Sudaderas",
    descripcion: "Sudadera con corte oversized, tendencia y comodidad."
  },

  // Calzado
  {
    id: 1006,
    titulo: "Zapatillas Deportivas",
    precio: 85.00,
    stock: 20,
    talles: ["38", "39", "40", "41", "42", "43", "44"],
    imagenes: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center"],
    categoria: "Calzado",
    descripcion: "Zapatillas deportivas cómodas y versátiles para uso diario."
  },
  {
    id: 1020,
    titulo: "Zapatos Formales",
    precio: 125.00,
    stock: 8,
    talles: ["39", "40", "41", "42", "43", "44"],
    imagenes: ["https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=400&fit=crop&crop=center"],
    categoria: "Calzado",
    descripcion: "Zapatos elegantes de cuero para ocasiones formales."
  },
  {
    id: 1021,
    titulo: "Botas Casuales",
    precio: 95.50,
    stock: 12,
    talles: ["39", "40", "41", "42", "43", "44"],
    imagenes: ["https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=400&fit=crop&crop=center"],
    categoria: "Calzado",
    descripcion: "Botas resistentes y cómodas para uso diario."
  },
  {
    id: 1022,
    titulo: "Sandalias de Verano",
    precio: 45.00,
    stock: 15,
    talles: ["37", "38", "39", "40", "41", "42"],
    imagenes: ["https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400&h=400&fit=crop&crop=center"],
    categoria: "Calzado",
    descripcion: "Sandalias ligeras y frescas para el verano."
  },

  // Accesorios
  {
    id: 1023,
    titulo: "Gorra Deportiva",
    precio: 28.00,
    stock: 25,
    talles: ["Única"],
    imagenes: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop&crop=center"],
    categoria: "Accesorios",
    descripcion: "Gorra ajustable con protección UV para actividades al aire libre."
  },
  {
    id: 1024,
    titulo: "Cinturón de Cuero",
    precio: 38.50,
    stock: 18,
    talles: ["S", "M", "L", "XL"],
    imagenes: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center"],
    categoria: "Accesorios",
    descripcion: "Cinturón de cuero genuino con hebilla clásica."
  },
  {
    id: 1025,
    titulo: "Bufanda de Lana",
    precio: 42.00,
    stock: 14,
    talles: ["Única"],
    imagenes: ["https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop&crop=center"],
    categoria: "Accesorios",
    descripcion: "Bufanda suave de lana, perfecta para el invierno."
  },
  {
    id: 1026,
    titulo: "Mochila Urbana",
    precio: 65.00,
    stock: 10,
    talles: ["Única"],
    imagenes: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center"],
    categoria: "Accesorios",
    descripcion: "Mochila resistente con múltiples compartimentos."
  },

  // Deportivo
  {
    id: 1027,
    titulo: "Conjunto Deportivo",
    precio: 89.99,
    stock: 12,
    talles: ["S", "M", "L", "XL", "XXL"],
    imagenes: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center"],
    categoria: "Deportivo",
    descripcion: "Conjunto completo para entrenamientos y actividades deportivas."
  },
  {
    id: 1028,
    titulo: "Camiseta Técnica",
    precio: 35.00,
    stock: 20,
    talles: ["S", "M", "L", "XL", "XXL"],
    imagenes: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center"],
    categoria: "Deportivo",
    descripcion: "Camiseta con tecnología moisture-wicking para deportes."
  },
  {
    id: 1029,
    titulo: "Shorts Deportivos",
    precio: 32.50,
    stock: 18,
    talles: ["S", "M", "L", "XL", "XXL"],
    imagenes: ["https://images.unsplash.com/photo-1506629905607-87b84c1592cf?w=400&h=400&fit=crop&crop=center"],
    categoria: "Deportivo",
    descripcion: "Shorts ligeros y transpirables para entrenamientos."
  },
  {
    id: 1030,
    titulo: "Zapatillas Running",
    precio: 110.00,
    stock: 15,
    talles: ["38", "39", "40", "41", "42", "43", "44"],
    imagenes: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center"],
    categoria: "Deportivo",
    descripcion: "Zapatillas especializadas para running con amortiguación avanzada."
  }
];


// Función para resaltar texto de búsqueda
const resaltarTexto = (texto: string, termino: string) => {
  if (!termino.trim()) return texto;
  
  const regex = new RegExp(`(${termino})`, 'gi');
  const partes = texto.split(regex);
  
  return partes.map((parte, index) =>
    regex.test(parte) ? (
      <mark key={index} className="px-1 bg-yellow-200 rounded">
        {parte}
      </mark>
    ) : (
      parte
    )
  );
};

// Función para filtrar productos por categoría
const filtrarPorCategoria = (categoria: string, productosBase: Producto[]) => {
  if (categoria === 'Todos') {
    return productosBase;
  }
  return productosBase.filter(producto => producto.categoria === categoria);
};

// Función para filtrar productos por búsqueda
const filtrarPorBusqueda = (termino: string, productosBase: Producto[]) => {
  if (!termino.trim()) {
    return productosBase;
  }
  
  const terminoLower = termino.toLowerCase();
  return productosBase.filter(producto => 
    producto.titulo.toLowerCase().includes(terminoLower) ||
    producto.descripcion?.toLowerCase().includes(terminoLower) ||
    producto.categoria?.toLowerCase().includes(terminoLower) ||
    producto.talles.some(talle => talle.toLowerCase().includes(terminoLower))
  );
};

// Función combinada para aplicar ambos filtros
const aplicarFiltros = (categoria: string, termino: string, productosBase: Producto[]) => {
  let productosFiltrados = filtrarPorCategoria(categoria, productosBase);
  productosFiltrados = filtrarPorBusqueda(termino, productosFiltrados);
  return productosFiltrados;
};

export const Inicio = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todos');
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>('');
  const [talleSeleccionado, setTalleSeleccionado] = useState<{[key: number]: string}>({});
  const [toast, setToast] = useState<{
    show: boolean;
    mensaje: string;
    tipo: 'success' | 'error' | 'warning' | 'info';
    producto?: {
      titulo: string;
      imagen: string;
      precio: number;
      talle?: string;
    };
  }>({
    show: false,
    mensaje: '',
    tipo: 'success'
  });
  const { agregarProducto } = useCarrito();

  useEffect(() => {
    // Función para obtener los productos de la API
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://proyecto-tienda01backend-production.up.railway.app/api/productos');
        
        // Si hay productos de la API, los usamos, si no, usamos los temporales
        if (response.data && response.data.length > 0) {
          setProductos(response.data);
          setProductosFiltrados(aplicarFiltros('Todos', '', response.data));
        } else {
          // Si no hay productos en la base de datos, mostrar las prendas temporales
          setProductos(prendasTemporales);
          setProductosFiltrados(aplicarFiltros('Todos', '', prendasTemporales));
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        // En caso de error, mostrar las prendas temporales
        setProductos(prendasTemporales);
        setProductosFiltrados(aplicarFiltros('Todos', '', prendasTemporales));
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // Efecto para filtrar productos cuando cambia la categoría o el término de búsqueda
  useEffect(() => {
    setProductosFiltrados(aplicarFiltros(categoriaSeleccionada, terminoBusqueda, productos));
  }, [categoriaSeleccionada, terminoBusqueda, productos]);

  // Función para manejar el cambio de categoría
  const handleCategoriaChange = (categoria: string) => {
    setCategoriaSeleccionada(categoria);
  };

  // Función para manejar el cambio en el buscador
  const handleBusquedaChange = (termino: string) => {
    setTerminoBusqueda(termino);
  };

  // Función para limpiar filtros
  const limpiarFiltros = () => {
    setCategoriaSeleccionada('Todos');
    setTerminoBusqueda('');
  };

  // Función para mostrar notificaciones
  const mostrarToast = (
    mensaje: string, 
    tipo: 'success' | 'error' | 'warning' | 'info' = 'success', 
    producto?: {
      titulo: string;
      imagen: string;
      precio: number;
      talle?: string;
    }
  ) => {
    setToast({
      show: true,
      mensaje,
      tipo,
      producto
    });
  };

  // Función para cerrar notificaciones
  const cerrarToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  // Función para manejar la selección de talle
  const handleTalleChange = (productoId: number, talle: string) => {
    setTalleSeleccionado(prev => ({
      ...prev,
      [productoId]: talle
    }));
  };

  // Función para agregar producto al carrito
  const handleAgregarAlCarrito = (producto: Producto) => {
    const talle = talleSeleccionado[producto.id];
    
    // Si el producto tiene talles disponibles pero no se seleccionó ninguno
    if (producto.talles && producto.talles.length > 0 && !talle) {
      mostrarToast('Por favor selecciona un talle antes de agregar al carrito', 'warning');
      return;
    }

    agregarProducto({
      id: producto.id,
      titulo: producto.titulo,
      precio: producto.precio,
      imagen: producto.imagenes[0],
      categoria: producto.categoria,
      talle: talle
    }, 1);

    // Limpiar talle seleccionado después de agregar
    if (talle) {
      setTalleSeleccionado(prev => {
        const newState = { ...prev };
        delete newState[producto.id];
        return newState;
      });
    }

    // Mostrar notificación de éxito con información del producto
    mostrarToast('¡Producto agregado exitosamente!', 'success', {
      titulo: producto.titulo,
      imagen: producto.imagenes[0],
      precio: producto.precio,
      talle: talle
    });
  };

  return (
    <div className='text-black bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]'>
      <HeroSection />

      {/* Barra de información destacada */}
      <div className="py-3 text-white bg-red-600">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <span className="font-semibold">🚚 Envío gratis</span>
              <span>en compras mayores a $100</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">🔄 Devoluciones</span>
              <span>30 días sin preguntas</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">⭐ Calidad garantizada</span>
              <span>100% satisfacción</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Sobre Nosotros Mejorada */}
      <div className="px-6 py-16 sm:px-12 lg:px-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-red-600 sm:text-5xl">
              Sobre Nosotros
            </h2>
            <div className="w-24 h-1 mx-auto mb-6 bg-red-600"></div>
            <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-600">
              Somos una empresa líder en moda contemporánea, dedicada a ofrecer productos de alta calidad 
              que combinan estilo, comodidad y durabilidad. Con más de 10 años de experiencia, nos hemos 
              convertido en la elección preferida de miles de clientes que buscan lo mejor en indumentaria.
            </p>
          </div>

          {/* Grid de características */}
          <div className="grid gap-8 mb-12 md:grid-cols-3">
            <div className="p-6 text-center transition-shadow bg-white rounded-lg shadow-lg hover:shadow-xl">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
                <span className="text-2xl">👗</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-800">Moda Actual</h3>
              <p className="text-gray-600">Seguimos las últimas tendencias para ofrecerte siempre lo más actual del mercado.</p>
            </div>
            
            <div className="p-6 text-center transition-shadow bg-white rounded-lg shadow-lg hover:shadow-xl">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-800">Calidad Premium</h3>
              <p className="text-gray-600">Seleccionamos cuidadosamente cada material para garantizar la mejor calidad.</p>
            </div>
            
            <div className="p-6 text-center transition-shadow bg-white rounded-lg shadow-lg hover:shadow-xl">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-800">Envío Rápido</h3>
              <p className="text-gray-600">Procesamos y enviamos tu pedido en menos de 24 horas para que lo recibas pronto.</p>
            </div>
          </div>

          {/* Galería de imágenes mejorada */}
          <div className="grid gap-6 overflow-hidden rounded-lg shadow-2xl md:grid-cols-3">
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1519802772250-a52a9af0eacb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGluZGlhfGVufDB8fDB8fHww"
                alt="Nuestra inspiración"
                className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/50 to-transparent group-hover:opacity-100">
                <p className="p-4 font-semibold text-white">Inspiración Global</p>
              </div>
            </div>
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1589463349208-95817c91f971?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGluZGlhfGVufDB8fDB8fHww"
                alt="Nuestros valores"
                className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/50 to-transparent group-hover:opacity-100">
                <p className="p-4 font-semibold text-white">Tradición & Modernidad</p>
              </div>
            </div>
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D"
                alt="Nuestra tienda"
                className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/50 to-transparent group-hover:opacity-100">
                <p className="p-4 font-semibold text-white">Experiencia de Compra</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Búsqueda */}
      <div className="py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="container px-6 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Buscar Productos</h2>
            <div className="w-20 h-1 mx-auto mb-8 bg-red-600"></div>
            
            {/* Barra de búsqueda principal */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                <svg 
                  className="w-5 h-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar por nombre, descripción, categoría o talle..."
                value={terminoBusqueda}
                onChange={(e) => handleBusquedaChange(e.target.value)}
                className="w-full py-4 pl-12 pr-4 text-lg transition-all duration-300 border-2 border-gray-200 rounded-full focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
              />
              {terminoBusqueda && (
                <button
                  onClick={() => handleBusquedaChange('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-red-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Sugerencias de búsqueda */}
            <div className="mb-6">
              <p className="mb-3 text-sm text-gray-600">Búsquedas populares:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Camisetas', 'Jeans', 'Deportivo', 'Zapatos', 'Vestidos', 'L', 'XL', 'Casual'].map((sugerencia, index) => (
                  <button
                    key={index}
                    onClick={() => handleBusquedaChange(sugerencia)}
                    className="px-3 py-1 text-sm transition-colors bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600"
                  >
                    {sugerencia}
                  </button>
                ))}
              </div>
            </div>

            {/* Botón para limpiar filtros */}
            {(terminoBusqueda || categoriaSeleccionada !== 'Todos') && (
              <div className="flex justify-center">
                <button
                  onClick={limpiarFiltros}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 transition-colors rounded-full bg-red-50 hover:bg-red-100"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sección de Categorías Funcional */}
      <div className="py-16 bg-white">
        <div className="container px-6 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-800">Nuestras Categorías</h2>
            <div className="w-24 h-1 mx-auto mb-6 bg-red-600"></div>
            <p className="text-lg text-gray-600">Filtra productos por categoría</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-5">
            {/* Botón "Todos" */}
            <button
              onClick={() => handleCategoriaChange('Todos')}
              className={`p-4 rounded-lg text-center transition-all duration-300 ${
                categoriaSeleccionada === 'Todos'
                  ? 'bg-red-600 text-white shadow-lg transform scale-105'
                  : 'bg-gradient-to-br from-red-50 to-red-100 hover:shadow-lg hover:scale-105'
              }`}
            >
              <div className="mb-2 text-2xl">🏪</div>
              <h3 className="font-semibold">Todos</h3>
              <p className="mt-1 text-xs opacity-75">
                ({productos.length} productos)
              </p>
            </button>

            {/* Botones de categorías */}
            {[
              { nombre: 'Camisetas', icono: '👕' },
              { nombre: 'Pantalones', icono: '👖' },
              { nombre: 'Vestidos', icono: '👗' },
              { nombre: 'Chaquetas', icono: '🧥' },
              { nombre: 'Sudaderas', icono: '🔥' },
              { nombre: 'Calzado', icono: '👟' },
              { nombre: 'Accesorios', icono: '👜' },
              { nombre: 'Deportivo', icono: '🏃‍♂️' }
            ].map((categoria, index) => {
              const cantidadProductos = productos.filter(p => p.categoria === categoria.nombre).length;
              return (
                <button
                  key={index}
                  onClick={() => handleCategoriaChange(categoria.nombre)}
                  className={`p-4 rounded-lg text-center transition-all duration-300 ${
                    categoriaSeleccionada === categoria.nombre
                      ? 'bg-red-600 text-white shadow-lg transform scale-105'
                      : 'bg-gradient-to-br from-red-50 to-red-100 hover:shadow-lg hover:scale-105'
                  } ${cantidadProductos === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  disabled={cantidadProductos === 0}
                >
                  <div className="mb-2 text-2xl">{categoria.icono}</div>
                  <h3 className="font-semibold">{categoria.nombre}</h3>
                  <p className="mt-1 text-xs opacity-75">
                    ({cantidadProductos} productos)
                  </p>
                </button>
              );
            })}
          </div>

          {/* Indicador de filtros activos */}
          <div className="mb-8 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-3">
              {/* Estado de categoría */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                <span className="text-sm text-gray-600">Categoría:</span>
                <span className="text-sm font-semibold text-red-600">
                  {categoriaSeleccionada === 'Todos' ? 'Todas' : categoriaSeleccionada}
                </span>
              </div>
              
              {/* Estado de búsqueda */}
              {terminoBusqueda && (
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
                  <span className="text-sm text-blue-600">Buscando:</span>
                  <span className="text-sm font-semibold text-blue-800">
                    "{terminoBusqueda}"
                  </span>
                  <button
                    onClick={() => handleBusquedaChange('')}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              
              {/* Contador de resultados */}
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                <span className="text-sm text-green-600">Resultados:</span>
                <span className="text-sm font-semibold text-green-800">
                  {productosFiltrados.length} {productosFiltrados.length === 1 ? 'producto' : 'productos'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>





      {/* Sección de Productos Mejorada */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container px-6 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-red-600">
              {terminoBusqueda 
                ? `Resultados de búsqueda` 
                : categoriaSeleccionada === 'Todos' 
                  ? 'Nuestros Productos' 
                  : `Productos - ${categoriaSeleccionada}`
              }
            </h2>
            <div className="w-24 h-1 mx-auto mb-6 bg-red-600"></div>
            <p className="text-lg text-gray-600">
              {terminoBusqueda
                ? `Mostrando productos que coinciden con "${terminoBusqueda}"`
                : 'Descubre nuestra colección exclusiva de prendas'
              }
            </p>
            {loading && (
              <div className="flex items-center justify-center mt-8">
                <div className="w-12 h-12 border-b-2 border-red-600 rounded-full animate-spin"></div>
                <span className="ml-3 text-gray-600">Cargando productos...</span>
              </div>
            )}
          </div>
          
          {/* Grid de productos mejorado */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {productosFiltrados.map((producto) => (
              <div key={producto.id} className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-2xl group">
                {/* Imagen del producto */}
                <div className="relative h-64 overflow-hidden">
                  {producto.imagenes && producto.imagenes.length > 0 ? (
                    <img 
                      src={producto.imagenes[0]} 
                      alt={producto.titulo} 
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-red-100 to-red-200">
                      <span className="text-6xl text-red-400">👕</span>
                    </div>
                  )}
                  
                  {/* Badge de stock */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      producto.stock > 10 
                        ? 'bg-green-100 text-green-800' 
                        : producto.stock > 0 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {producto.stock > 0 ? `Stock: ${producto.stock}` : 'Agotado'}
                    </span>
                  </div>
                </div>
                
                {/* Contenido de la tarjeta */}
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-800 transition-colors group-hover:text-red-600">
                    {resaltarTexto(producto.titulo, terminoBusqueda)}
                  </h3>
                  
                  {/* Precio destacado */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-red-600">
                      ${producto.precio}
                    </span>
                    {producto.talles && producto.talles.length > 0 && (
                      <div className="text-sm text-gray-500">
                        Talles: {producto.talles.join(', ')}
                      </div>
                    )}
                  </div>
                  
                  {/* Descripción si existe */}
                  {producto.descripcion && (
                    <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                      {resaltarTexto(producto.descripcion, terminoBusqueda)}
                    </p>
                  )}
                  
                  {/* Botones de acción */}
                  <div className="flex gap-3">
                    <button 
                      className="flex-1 px-4 py-2 font-semibold text-white transition-colors duration-200 bg-red-600 rounded-lg hover:bg-red-700"
                      onClick={() => (document.getElementById(`modal_${producto.id}`) as HTMLDialogElement).showModal()}
                    >
                      Ver Detalles
                    </button>
                    <button className="px-4 py-2 font-semibold text-gray-800 transition-colors duration-200 bg-gray-200 rounded-lg hover:bg-gray-300">
                      ❤️
                    </button>
                  </div>
                </div>
                
                {/* Modal mejorado */}
                <dialog id={`modal_${producto.id}`} className="modal modal-bottom sm:modal-middle">
                  <div className="max-w-2xl modal-box">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-800">
                        {resaltarTexto(producto.titulo, terminoBusqueda)}
                      </h3>
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost">✕</button>
                      </form>
                    </div>
                    
                    {/* Galería de imágenes en modal */}
                    {producto.imagenes && producto.imagenes.length > 0 && (
                      <div className="mb-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          {producto.imagenes.map((imagen, index) => (
                            <img 
                              key={index} 
                              src={imagen} 
                              alt={`${producto.titulo} - ${index + 1}`} 
                              className="object-cover w-full h-48 rounded-lg"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-red-600">${producto.precio}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          producto.stock > 10 
                            ? 'bg-green-100 text-green-800' 
                            : producto.stock > 0 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          Stock disponible: {producto.stock}
                        </span>
                      </div>
                      
                      {producto.talles && producto.talles.length > 0 && (
                        <div>
                          <h4 className="mb-2 font-semibold text-gray-700">Talles disponibles:</h4>
                          <div className="flex flex-wrap gap-2">
                            {producto.talles.map((talle, index) => (
                              <button
                                key={index}
                                onClick={() => handleTalleChange(producto.id, talle)}
                                className={`px-3 py-1 text-sm rounded-full border-2 transition-colors ${
                                  talleSeleccionado[producto.id] === talle
                                    ? 'bg-red-600 text-white border-red-600'
                                    : 'text-gray-700 bg-gray-100 border-gray-300 hover:bg-gray-200'
                                }`}
                              >
                                {talle}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {producto.descripcion && (
                        <div>
                          <h4 className="mb-2 font-semibold text-gray-700">Descripción:</h4>
                          <p className="leading-relaxed text-gray-600">
                            {resaltarTexto(producto.descripcion, terminoBusqueda)}
                          </p>
                        </div>
                      )}
                      
                      {producto.categoria && (
                        <div>
                          <span className="inline-block px-3 py-1 text-sm font-medium text-red-800 bg-red-100 rounded-full">
                            {producto.categoria}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="modal-action">
                      <button 
                        onClick={() => handleAgregarAlCarrito(producto)}
                        className="text-white bg-red-600 border-0 btn hover:bg-red-700"
                      >
                        Añadir al Carrito
                      </button>
                      <form method="dialog">
                        <button className="btn btn-outline">Cerrar</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            ))}
          </div>
          
          {/* Mensaje cuando no hay productos */}
          {productosFiltrados.length === 0 && !loading && (
            <div className="py-12 text-center">
              <div className="mb-4 text-6xl">
                {terminoBusqueda ? '🔍' : '🛍️'}
              </div>
              <h3 className="mb-2 text-2xl font-semibold text-gray-700">
                {terminoBusqueda 
                  ? `No se encontraron productos para "${terminoBusqueda}"` 
                  : categoriaSeleccionada === 'Todos' 
                    ? 'No hay productos disponibles' 
                    : `No hay productos en la categoría "${categoriaSeleccionada}"`
                }
              </h3>
              <p className="mb-6 text-gray-500">
                {terminoBusqueda
                  ? 'Intenta con otros términos de búsqueda o explora nuestras categorías'
                  : categoriaSeleccionada === 'Todos' 
                    ? 'Pronto tendremos nuevos productos para ti' 
                    : 'Prueba con otra categoría o busca productos específicos'
                }
              </p>
              
              {/* Sugerencias cuando no hay resultados */}
              <div className="flex flex-wrap justify-center gap-3">
                {terminoBusqueda && (
                  <button
                    onClick={() => handleBusquedaChange('')}
                    className="px-4 py-2 text-blue-600 transition-colors bg-blue-100 rounded-lg hover:bg-blue-200"
                  >
                    Limpiar búsqueda
                  </button>
                )}
                {categoriaSeleccionada !== 'Todos' && (
                  <button
                    onClick={() => handleCategoriaChange('Todos')}
                    className="px-4 py-2 text-red-600 transition-colors bg-red-100 rounded-lg hover:bg-red-200"
                  >
                    Ver todas las categorías
                  </button>
                )}
                {(terminoBusqueda || categoriaSeleccionada !== 'Todos') && (
                  <button
                    onClick={limpiarFiltros}
                    className="px-4 py-2 text-gray-600 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Restablecer filtros
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sección de testimonios */}
      <div className="py-16 bg-white">
        <div className="container px-6 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-800">Lo que dicen nuestros clientes</h2>
            <div className="w-24 h-1 mx-auto mb-6 bg-red-600"></div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                nombre: "María González",
                comentario: "Excelente calidad en todas las prendas. Mi tienda favorita para comprar ropa.",
                rating: 5
              },
              {
                nombre: "Carlos Rodríguez",
                comentario: "Envío súper rápido y el servicio al cliente es increíble. Muy recomendado.",
                rating: 5
              },
              {
                nombre: "Ana López",
                comentario: "Me encanta la variedad de productos y los precios son muy competitivos.",
                rating: 5
              }
            ].map((testimonio, index) => (
              <div key={index} className="p-6 rounded-lg bg-gray-50">
                <div className="flex mb-4">
                  {[...Array(testimonio.rating)].map((_, i) => (
                    <span key={i} className="text-xl text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="mb-4 italic text-gray-600">"{testimonio.comentario}"</p>
                <h4 className="font-semibold text-gray-800">- {testimonio.nombre}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 text-white bg-gradient-to-r from-red-600 to-red-700">
        <div className="container px-6 mx-auto text-center">
          <h2 className="mb-4 text-4xl font-bold">¿Listo para renovar tu guardarropa?</h2>
          <p className="mb-8 text-xl opacity-90">Únete a miles de clientes satisfechos y descubre la moda que te define</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="px-8 py-3 font-semibold text-red-600 transition-colors duration-200 bg-white rounded-lg hover:bg-gray-100">
              Ver Catálogo Completo
            </button>
            <button className="px-8 py-3 font-semibold text-white transition-colors duration-200 border-2 border-white rounded-lg hover:bg-white hover:text-red-600">
              Suscribirse al Newsletter
            </button>
          </div>
        </div>
      </div>

      {/* Toast de notificaciones */}
      {toast.show && (
        <Toast
          mensaje={toast.mensaje}
          tipo={toast.tipo}
          producto={toast.producto}
          onClose={cerrarToast}
        />
      )}

    </div>
  );
};
