
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Header() {

  const { closeSection } = useAuth();

  return (
    <header className="py-10 bg-indigo-600">
        <div className="container mx-auto flex-col md:flex-row flex justify-between items-center">
            <h1 className="font-bold text-2xl text-indigo-200 text-center">
                Administrador de Pacientes de Veterinaria {''} 
                <span className="text-white">Veterinaria</span>
            </h1>

            <nav className="flex gap-4 flex-col lg:flex-row text-center mt-5 lg:mt-0">
                <Link to="/admin" className="text-white text-sm uppercase font-bold">Pacientes</Link>
                <Link to="/admin/perfil" className="text-white text-sm uppercase font-bold">Perfil</Link>

                <button 
                    type="button"
                    className="text-white text-sm uppercase font-bold"
                    onClick={closeSection}
                >Cerrar Sección</button>
            </nav>
        </div>
    </header>
  )
}

export default Header;
