import { useEffect } from 'react';

interface ToastProps {
  mensaje: string;
  tipo?: 'success' | 'error' | 'warning' | 'info';
  duracion?: number;
  onClose: () => void;
  producto?: {
    titulo: string;
    imagen: string;
    precio: number;
    talle?: string;
  };
}

export const Toast = ({ 
  mensaje, 
  tipo = 'success', 
  duracion = 4000, 
  onClose, 
  producto 
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duracion);

    return () => clearTimeout(timer);
  }, [duracion, onClose]);

  const getToastStyles = () => {
    const baseStyles = "fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300 ease-in-out";
    
    switch (tipo) {
      case 'success':
        return `${baseStyles} bg-green-500 text-white`;
      case 'error':
        return `${baseStyles} bg-red-500 text-white`;
      case 'warning':
        return `${baseStyles} bg-yellow-500 text-white`;
      case 'info':
        return `${baseStyles} bg-blue-500 text-white`;
      default:
        return `${baseStyles} bg-green-500 text-white`;
    }
  };

  const getIcon = () => {
    switch (tipo) {
      case 'success':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={getToastStyles()}>
      <div className="p-4 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-95">
        <div className="flex items-start gap-3">
          {/* Ícono */}
          <div className="flex-shrink-0 mt-0.5">
            {getIcon()}
          </div>

          {/* Contenido */}
          <div className="flex-1 min-w-0">
            {producto ? (
              <div className="flex items-center gap-3">
                {/* Imagen del producto */}
                <div className="flex-shrink-0">
                  <img 
                    src={producto.imagen} 
                    alt={producto.titulo}
                    className="w-12 h-12 object-cover rounded-lg border-2 border-white/20"
                  />
                </div>

                {/* Información del producto */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white mb-1">
                    ¡Agregado al carrito!
                  </p>
                  <p className="text-xs text-white/90 truncate">
                    {producto.titulo}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-white/80 font-medium">
                      ${producto.precio.toFixed(2)}
                    </span>
                    {producto.talle && (
                      <>
                        <span className="text-white/60">•</span>
                        <span className="text-xs text-white/80">
                          Talle {producto.talle}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm font-medium text-white">
                {mensaje}
              </p>
            )}
          </div>

          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Barra de progreso */}
        <div className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white/40 rounded-full"
            style={{
              width: '100%',
              animation: `shrinkWidth ${duracion}ms linear forwards`
            }}
          />
        </div>
      </div>
      
      <style>{`
        @keyframes shrinkWidth {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};
