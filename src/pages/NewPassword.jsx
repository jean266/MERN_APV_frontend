
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/axios";
import { Link } from "react-router-dom";

function NewPassword() {

  const [ password, setPassword ] = useState("");
  const [ repeatPassword, setRepeatPassword ] = useState("");
  const [ alert, setAlert ] = useState({});
  const [ tokenValid, setTokenValid ] = useState(false);
  const [ tokenModified, setTokenModified ] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const checkToken = async () => {
      try {
        await clientAxios(`/veterinarios/olvide-password/${token}`);
        setAlert({
          msg : "Coloca tu nuevo password"
        });
        setTokenValid(true);
      } catch (error) {
        setAlert({
          msg : "Hubo un error con el enlace",
          error : true
        })
      }
    }
    checkToken();
  }, [])

  const handleSubmit = async e => {
    e.preventDefault();

    if([password, repeatPassword].includes("")) {
      return setAlert({
        msg : "Hay campos vacios",
        error : true
      });
    }

    if(password.length < 6) {
      return setAlert({
        msg : "El Password debe tener al menos 6 caracteres",
        error : true
      });
    }

    if(password !== repeatPassword) {
      return setAlert({
        msg : "El Password no coincide",
        error : true
      });
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clientAxios.post(url, { password });
      setAlert({
        msg : data.msg
      });
      setTokenModified(true);
    } catch (error) {
      setAlert({
        msg : error.response.data.msg,
        error : true
      });
      setTokenValid(false);
    }

  }

  const { msg } = alert;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Reestablece tu Password y y no pierdas acceso a {""} <span className="text-black">tus Pacientes</span></h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white mb-11 md:mb-0">

        { msg && <Alert 
          alert={alert}
        />}

        { tokenValid && (

          <form 
            onSubmit={handleSubmit}
          >
            <div className="my-5">
              <label 
                className="uppercase text-gray-600 block text-xl font-bold"
              >
                Nuevo Password
              </label>
              <input 
                type="password" 
                placeholder="Tu Nuevo Password"
                className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className="my-5">
              <label 
                className="uppercase text-gray-600 block text-xl font-bold"
              >
                Repetir Password
              </label>
              <input 
                type="password" 
                placeholder="Repite tu Password"
                className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
                value={repeatPassword}
                onChange={e => setRepeatPassword(e.target.value)}
              />
            </div>

            <input 
              type="submit" 
              value="Reestablecer Password" 
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />
          </form>
        )}

        {tokenModified && (
          <Link 
            className="block text-center my-5 text-gray-500"
            to="/">Iniciar Sección</Link>
        )}

      </div>
    </>
  )
}

export default NewPassword;