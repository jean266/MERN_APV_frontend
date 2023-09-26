
import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alert from "../components/Alert";
import useAuth from "../hooks/useAuth";

function ChangePassword() {

  const { savePassword } = useAuth();

  const [ password, setPassword ] = useState({
    pwd_current : "",
    pwd_new : "",
    pwd_repeat : ""
  });
  const [ alert, setAlert ] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if( Object.values(password).some( field => field === "")) {
      return setAlert({
        msg : "Todos los campos son obligatorios",
        error : true
      });
    }

    if(password.pwd_new.length < 6) {
      return setAlert({
        msg : "El password debe contener al menos 6 caracteres",
        error : true
      })
    }

    if(password.pwd_new !== password.pwd_repeat) {
      return setAlert({
        msg : "El nuevo password no coincide",
        error : true
      })
    }

    const result = await savePassword(password);
    setAlert(result);
  }

  const { msg } = alert;
  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
      <p className="text-xl mb-10 text-center mt-5">Modifica tu {""} 
        <span className="text-indigo-600 font-bold" >Password aquí</span>
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
                    >Password Actual</label>
                    <input
                        type="password"
                        className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                        placeholder="Password Actual"
                        name="pwd_current"
                        onChange={e => setPassword({
                          ...password,
                          [e.target.name] : e.target.value
                        })}
                    />
                </div>

                <div className="my-3">
                    <label 
                        className="uppercase font-bold text-gray-600"
                    >Nuevo Password</label>
                    <input
                        type="password"
                        className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                        placeholder="Nuevo Password"
                        name="pwd_new"
                        onChange={e => setPassword({
                          ...password,
                          [e.target.name] : e.target.value
                        })}
                    />
                </div>

                <div className="my-3">
                    <label 
                        className="uppercase font-bold text-gray-600"
                    >Repite Nuevo Password</label>
                    <input
                        type="password"
                        className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                        placeholder="Repite Nuevo Password"
                        name="pwd_repeat"
                        onChange={e => setPassword({
                          ...password,
                          [e.target.name] : e.target.value
                        })}
                    />
                </div>

                <input 
                    type="submit"
                    value="Actualizar Password"
                    className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:bg-indigo-800 cursor-pointer"
                />
            </form>
        </div>
      </div>
      
    </>
  )
}

export default ChangePassword;