
import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alert from "../components/Alert";

function EditPerfil() {
  
  const { auth, updatePerfil } = useAuth();

  const [ perfil, setPerfil ] = useState({});
  const [ alert, setAlert ] = useState({});

  useEffect( () => {
    setPerfil(auth);
  }, [auth]);

  const handleSubmit = async e => {
    e.preventDefault();

    if([perfil.email, perfil.name].includes("")) {
      return setAlert({
        msg : "El campo nombre y email son obligatorio",
        error : true
      });
    }

    const result = await updatePerfil(perfil);
    setAlert(result);
  }

  const { msg } = alert;

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
      <p className="text-xl mb-10 text-center mt-5">Modifica tu {""} 
        <span className="text-indigo-600 font-bold" >Información aquí</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

            { msg && <Alert 
                alert={alert}
            />}

            <form
              onSubmit={handleSubmit}
            >
                <div className="my-3">
                    <label 
                        className="uppercase font-bold text-gray-600"
                    >Nombre</label>
                    <input
                        type="text"
                        className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                        name="name"
                        placeholder="Tu Nombre"
                        value={perfil.name || ""}
                        onChange={ e => setPerfil({
                            ...perfil, 
                            [e.target.name] : e.target.value
                        })}
                    />
                </div>

                <div className="my-3">
                    <label 
                        className="uppercase font-bold text-gray-600"
                    >Sitio Web</label>
                    <input
                        type="text"
                        className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                        name="web"
                        placeholder="Tu Sitio Web"
                        value={perfil.web || ""}
                        onChange={ e => setPerfil({
                            ...perfil, 
                            [e.target.name] : e.target.value
                        })}
                    />
                </div>

                <div className="my-3">
                    <label 
                        className="uppercase font-bold text-gray-600"
                    >Teléfono</label>
                    <input
                        type="text"
                        className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                        name="phone"
                        placeholder="Tu Número de Telefono"
                        value={perfil.phone || ""}
                        onChange={ e => setPerfil({
                            ...perfil, 
                            [e.target.name] : e.target.value ? e.target.value : null
                        })}
                    />
                </div>

                <div className="my-3">
                    <label 
                        className="uppercase font-bold text-gray-600"
                    >Email</label>
                    <input
                        type="email"
                        className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                        name="email"
                        placeholder="Tu Email"
                        value={perfil.email || ""}
                        onChange={ e => setPerfil({
                            ...perfil, 
                            [e.target.name] : e.target.value ? e.target.value : null
                        })}
                    />
                </div>

                <input 
                    type="submit"
                    value="Guardar Cambios"
                    className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:bg-indigo-800 cursor-pointer"
                />
            </form>
        </div>
      </div>

    </>
  )
}

export default EditPerfil;