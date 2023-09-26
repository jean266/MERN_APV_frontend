
import { useState, useEffect } from "react";
import Alert from "../components/Alert";
import usePatients from "../hooks/usePatients";

function Form() {

  const [ name, setName ] = useState("");
  const [ owner, setOwner ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ date, setDate ] = useState("");
  const [ symptoms, setSymptoms ] = useState("");
  const [ id, setId ] = useState(null);

  const [ alert, setAlert ] = useState({});

  const { savePatient, patient } = usePatients();
  
  useEffect(() => {
    if(patient?.name) {
        setName(patient.name);
        setOwner(patient.owner);
        setEmail(patient.email);
        setDate(patient.date);
        setSymptoms(patient.symptoms);
        setId(patient._id);
    }

  }, [patient]);

  const handleSubmit = e => {
    e.preventDefault();

    // validar el formulario
    if([name, owner, email, date, symptoms].includes("")) {
        return setAlert({
            msg : "Todos los mensajes son obligatorios",
            error : true
        })
    }

    setAlert({});

    savePatient({
        name : name.trim(), 
        owner : owner.trim(), 
        email : email.trim(), 
        date, 
        symptoms : symptoms.trim(),
        id
    });

    setAlert({
        msg : "Guardado correctamente"
    });

    setName("");
    setOwner("");
    setEmail("");
    setDate("");
    setSymptoms("");
    setId("");

  }

  const { msg } = alert;

  return (
    <>
        <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>

        <p className="text-xl mt-5 mb-10 text-center">
            Añade tus pacientes y {""} 
            <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form
            className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md "
            onSubmit={handleSubmit}
        >
            <div className="mb-5">
                <label 
                    htmlFor="name"
                    className="text-gray-700 font-bold uppercase"
                >Nombre Mascota</label>
                <input 
                    type="text" 
                    id="name"
                    placeholder="Nombre de la mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label 
                    htmlFor="owner"
                    className="text-gray-700 font-bold uppercase"
                >Nombre Propetario</label>
                <input 
                    type="text" 
                    id="owner"
                    placeholder="Nombre del propetario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={owner}
                    onChange={e => setOwner(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label 
                    htmlFor="email"
                    className="text-gray-700 font-bold uppercase"
                >Email</label>
                <input 
                    type="email" 
                    id="emial"
                    placeholder="Email del propetario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label 
                    htmlFor="date"
                    className="text-gray-700 font-bold uppercase"
                >Fecha Alta</label>
                <input 
                    type="date" 
                    id="date"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label 
                    htmlFor="symptons"
                    className="text-gray-700 font-bold uppercase"
                >Sintomas</label>
                <textarea 
                    id="symptoms"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Describe los sintomas"
                    value={symptoms}
                    onChange={e => setSymptoms(e.target.value)}
                ></textarea>
            </div>

            <input 
                type="submit" 
                className="bg-indigo-600 w-full p-3 font-bold text-white uppercase hover:bg-indigo-800 cursor-pointer transition-colors"
                value={id !== null ? "Guardar Cambios" : "Agregar Paciente"} 
            />
        </form>

        
        { msg && <Alert 
            alert={alert}
        />}
    </>
  )
}

export default Form;