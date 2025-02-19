import fondo011 from '../../assets/img/fondoIndia02.jpg';

export const HeroSection = () => {
  return (
    <div>
      <div
        className="min-h-screen hero"
        style={{
          backgroundImage: `url(${fondo011})`, // Aquí llamamos a la imagen local
        }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="text-center hero-content text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold ">TITULO </h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button className="bg-red-800 btn btn-active">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};
