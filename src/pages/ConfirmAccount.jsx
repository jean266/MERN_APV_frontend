
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/axios";

function ConfirmAccount() {
  const [ accountConfirmed, setAccountConfirmed ] = useState(false);
  const [ load, setLoad ] = useState(true);
  const [ alert, setAlert ] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const { data } = await clientAxios(url);

        setAccountConfirmed(true);
        setAlert({
          msg : data.msg,
          error : accountConfirmed
        })
      } catch (error) {
        setAlert({
          msg : error.response.data.msg,
          error : true
        })
      }
      setLoad(false);
    }

    confirmAccount();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Confirma tu cuenta y comienza a Administra <span className="text-black">tus Pacientes</span></h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white mb-11 md:mb-0">
        {!load &&
          <Alert 
            alert={alert}
          />}

        {accountConfirmed && (
          <Link 
            className="block text-center my-5 text-gray-500"
            to="/">Iniciar Sección
          </Link>
        )}
      </div>
    </>
  )
}

export default ConfirmAccount;