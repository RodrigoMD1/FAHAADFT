import { useState } from 'react';
import { useCarrito } from '../hooks/useCarrito';

export const CarritoCompras = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { productos, eliminarProducto, actualizarCantidad, limpiarCarrito, obtenerTotal, obtenerCantidadTotal } = useCarrito();

  const cantidadTotal = obtenerCantidadTotal();
  const precioTotal = obtenerTotal();

  return (
    <>
      {/* Botón del carrito */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(true)}
          className="relative p-2 text-gray-700 transition-colors duration-200 rounded-lg hover:bg-gray-100"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 6H3m4 7h10m-4 4a2 2 0 100 4 2 2 0 000-4zm-4 0a2 2 0 100 4 2 2 0 000-4z" 
            />
          </svg>
          
          {/* Badge con cantidad */}
          {cantidadTotal > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
              {cantidadTotal > 99 ? '99+' : cantidadTotal}
            </span>
          )}
        </button>
      </div>

      {/* Modal del carrito */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div 
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={() => setIsOpen(false)}
            ></div>

            {/* Modal */}
            <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">
                  Carrito de Compras
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Contenido */}
              <div className="max-h-96 overflow-y-auto">
                {productos.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="mb-4 text-6xl">🛒</div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-700">Tu carrito está vacío</h3>
                    <p className="text-gray-500">Agrega algunos productos para comenzar</p>
                  </div>
                ) : (
                  <div className="p-6 space-y-4">
                    {productos.map((producto, index) => (
                      <div key={`${producto.id}-${producto.talle}-${index}`} className="flex items-center gap-4 p-4 border rounded-lg">
                        {/* Imagen del producto */}
                        <div className="flex-shrink-0">
                          <img 
                            src={producto.imagen} 
                            alt={producto.titulo}
                            className="object-cover w-16 h-16 rounded-lg"
                          />
                        </div>

                        {/* Información del producto */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 truncate">
                            {producto.titulo}
                          </h4>
                          <p className="text-sm text-gray-500">
                            ${producto.precio.toFixed(2)}
                            {producto.talle && ` • Talle: ${producto.talle}`}
                            {producto.categoria && ` • ${producto.categoria}`}
                          </p>
                        </div>

                        {/* Controles de cantidad */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => actualizarCantidad(producto.id, producto.cantidad - 1, producto.talle)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">
                            {producto.cantidad}
                          </span>
                          <button
                            onClick={() => actualizarCantidad(producto.id, producto.cantidad + 1, producto.talle)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="text-sm font-semibold text-gray-900">
                          ${(producto.precio * producto.cantidad).toFixed(2)}
                        </div>

                        {/* Botón eliminar */}
                        <button
                          onClick={() => eliminarProducto(producto.id, producto.talle)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {productos.length > 0 && (
                <div className="p-6 border-t bg-gray-50">
                  {/* Total */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-red-600">
                      ${precioTotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex gap-3">
                    <button
                      onClick={limpiarCarrito}
                      className="flex-1 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Vaciar Carrito
                    </button>
                    <button
                      onClick={() => {
                        // Aquí puedes agregar la lógica para proceder al checkout
                        alert('Función de checkout próximamente disponible');
                      }}
                      className="flex-1 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                    >
                      Proceder al Pago
                    </button>
                  </div>

                  {/* Información adicional */}
                  <p className="mt-3 text-xs text-gray-500 text-center">
                    Envío gratis en compras mayores a $100
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
