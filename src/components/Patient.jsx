/* eslint-disable react/prop-types */

import usePatinet from "../hooks/usePatients";

function Patient({patient}) {

  const { setEdition, deletePatient } = usePatinet();

  const { email, date, name, owner, symptoms } = patient;

  const formatDate = date => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat("es-CO", {dateStyle : "long"}).format(newDate);
  }
  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
        <p className="font-bold uppercase text-indigo-700 my-2">Nombre: {''}
            <span className="font-normal normal-case text-black"> {name}</span>
        </p>

        <p className="font-bold uppercase text-indigo-700 my-2">Propetario: {''}
            <span className="font-normal normal-case text-black"> {owner}</span>
        </p>

        <p className="font-bold uppercase text-indigo-700 my-2">Email de Contacto: {''}
            <span className="font-normal normal-case text-black"> {email}</span>
        </p>

        <p className="font-bold uppercase text-indigo-700 my-2">Fecha de Fecha: {''}
            <span className="font-normal normal-case text-black"> {formatDate(date)}</span>
        </p>

        <p className="font-bold uppercase text-indigo-700 my-2">Sintomas: {''}
            <span className="font-normal normal-case text-black"> {symptoms}</span>
        </p>

        <div className="flex justify-between my-5">
            <button
              type="button"
              className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
              onClick={() => setEdition(patient)}
              >Editar</button>

            <button
              type="button"
              className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg"
              onClick={() => deletePatient(patient._id)}
            >Eliminar</button>
        </div>
    </div>
  )
}

export default Patient;