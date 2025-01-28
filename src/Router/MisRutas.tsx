import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Header } from '../components/Layout/Header'
import { Footer } from '../components/Layout/Footer'
import { Inicio } from '../components/Inicio'
import { Contacto } from '../components/Contacto'
import { Login } from '../components/Login'
import { Register } from '../components/Register'
import { ControlPanel } from '../components/ControlPanel'
import { SubProductos } from '../components/subProductos'
import { Ofertas } from '../components/Ofertas'

export const MisRutas = () => {
  return (
    <BrowserRouter >
      {/* Header y navegación */}
      <Header />

      {/* Contenido central */}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/registro" element={<Register/>} />
        <Route path="/control-panel" element={<ControlPanel/>} />
        <Route path="/productos" element={<SubProductos/>} />
        <Route path="/ofertas" element={<Ofertas/>} />
        <Route
          path="*"
          element={
            <>
              <h1>Error 404</h1>
              <strong>Esta página no existe.</strong>
            </>
          }
        />
      </Routes>

      {/* Footer */}
      <Footer />
    </BrowserRouter>
  )
}


