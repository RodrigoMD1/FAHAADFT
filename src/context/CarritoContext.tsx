import { createContext, useState, useEffect, ReactNode } from 'react';

export interface ProductoCarrito {
  id: number;
  titulo: string;
  precio: number;
  imagen: string;
  cantidad: number;
  talle?: string;
  categoria?: string;
}

interface CarritoContextType {
  productos: ProductoCarrito[];
  agregarProducto: (producto: Omit<ProductoCarrito, 'cantidad'>, cantidad?: number) => void;
  eliminarProducto: (id: number, talle?: string) => void;
  actualizarCantidad: (id: number, cantidad: number, talle?: string) => void;
  limpiarCarrito: () => void;
  obtenerTotal: () => number;
  obtenerCantidadTotal: () => number;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export { CarritoContext };

interface CarritoProviderProps {
  children: ReactNode;
}

export const CarritoProvider = ({ children }: CarritoProviderProps) => {
  // Función para cargar el carrito desde localStorage
  const cargarCarritoDeStorage = (): ProductoCarrito[] => {
    try {
      const carritoGuardado = localStorage.getItem('carrito');
      return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    } catch (error) {
      console.error('Error al cargar el carrito desde localStorage:', error);
      return [];
    }
  };

  // Función para guardar el carrito en localStorage
  const guardarCarritoEnStorage = (productos: ProductoCarrito[]) => {
    try {
      localStorage.setItem('carrito', JSON.stringify(productos));
    } catch (error) {
      console.error('Error al guardar el carrito en localStorage:', error);
    }
  };

  const [productos, setProductos] = useState<ProductoCarrito[]>(cargarCarritoDeStorage);

  // Efecto para guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    guardarCarritoEnStorage(productos);
  }, [productos]);

  const agregarProducto = (producto: Omit<ProductoCarrito, 'cantidad'>, cantidad = 1) => {
    setProductos(prev => {
      const productoExistente = prev.find(p => 
        p.id === producto.id && p.talle === producto.talle
      );

      if (productoExistente) {
        return prev.map(p =>
          p.id === producto.id && p.talle === producto.talle
            ? { ...p, cantidad: p.cantidad + cantidad }
            : p
        );
      }

      return [...prev, { ...producto, cantidad }];
    });
  };

  const eliminarProducto = (id: number, talle?: string) => {
    setProductos(prev => 
      prev.filter(p => !(p.id === id && p.talle === talle))
    );
  };

  const actualizarCantidad = (id: number, cantidad: number, talle?: string) => {
    if (cantidad <= 0) {
      eliminarProducto(id, talle);
      return;
    }

    setProductos(prev =>
      prev.map(p =>
        p.id === id && p.talle === talle
          ? { ...p, cantidad }
          : p
      )
    );
  };

  const limpiarCarrito = () => {
    setProductos([]);
  };

  const obtenerTotal = () => {
    return productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  };

  const obtenerCantidadTotal = () => {
    return productos.reduce((total, producto) => total + producto.cantidad, 0);
  };

  const value = {
    productos,
    agregarProducto,
    eliminarProducto,
    actualizarCantidad,
    limpiarCarrito,
    obtenerTotal,
    obtenerCantidadTotal
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};
