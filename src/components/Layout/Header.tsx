import { NavLink } from 'react-router-dom';
import { CarritoCompras } from '../CarritoCompras';



export const Header = () => {


  return (
    <div>

      <div className="text-black navbar  bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="z-20 p-2 mt-3 text-xl bg-white shadow menu menu-sm dropdown-content rounded-box w-52">
              <li><NavLink to="/inicio"></NavLink>Inicio</li>
              <li>
                <a>Catalogo</a>
                <ul className="p-2 ">
                  <li><a>Ofertas</a></li>
                  <li><a>Productos</a></li>
                </ul>
              </li>
              <li><NavLink to="/contacto">Contacto</NavLink></li>
            </ul>
          </div>
          <a className="text-xl btn btn-ghost">Logo</a>
        </div>
        <div className="z-20 hidden navbar-center lg:flex">
          <ul className="px-1 text-xl menu menu-horizontal">
            <li><NavLink to="/inicio">Inicio</NavLink></li>
            <li>
              <details>
                <summary>Catalogo</summary>
                <ul className="p-2 bg-white ">
                <li><NavLink to="/ofertas">Ofertas</NavLink></li>
                  <li><NavLink to="/productos">Productos</NavLink></li>
                </ul>
              </details>
            </li>
            <li><NavLink to="/contacto">Contacto</NavLink></li>
          </ul>
        </div>

        
        <div className='m-5 navbar-end'>
          <CarritoCompras />
        </div>
      </div>


     

    </div>
  )
}
