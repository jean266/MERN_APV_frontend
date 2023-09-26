
import { useState } from "react";
import Form from "../components/Form";
import ListPatients from "../components/ListPatients";

function ManagePatients() {
  
  const [ showForm, setForm ] = useState(false);

  return (
    <div className="flex flex-col md:flex-row">
        <button 
            type="button"
            className="bg-indigo-600 font-bold text-white uppercase mx-10 p-3 rounded-md mb-10 md:hidden"
            onClick={() => setForm(!showForm)}
        >
            {showForm ? "Ocultar Formulario" : "Mostrar Formulario"}
        </button>
        <div className={`${showForm ? "block" : "hidden" } md:block md:w-1/2 lg:w-2/5`}>
            <Form />
        </div>

        <div className="md:w-1/2 lg:w-3/5">
            <ListPatients />
        </div>
    </div>
  )
}

export default ManagePatients;