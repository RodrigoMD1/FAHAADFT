import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';

export function useCarrito() {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
}
