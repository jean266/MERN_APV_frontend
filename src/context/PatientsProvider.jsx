/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PatientsContext = createContext();

function PatientsProvider({children}) {

  const { auth } = useAuth();

  const [ patients, setPatients ] = useState([]);
  const [ patient, setPatient ] = useState({});

  useEffect(() => {
    const getPatients = async () => {
        try {
            const token = localStorage.getItem("token");
            if(!token) return;

            const config = {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            }

            const { data } = await clientAxios("/pacientes", config);
            setPatients(data);
        } catch (error) {
            console.error(error);
        }
    }
    getPatients();
  }, [auth])

  const savePatient = async (patient) => {

    const token = localStorage.getItem("token");
    const config = {
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        }
    }

    if(patient.id !== null) {
        try {
            const { data } = await clientAxios.put(`/pacientes/${patient.id}`, patient, config);
            const patientUpdate = patients.map( patientState => patientState._id === data._id ? data : patientState);
            setPatients(patientUpdate);
        } catch (error) {
            console.error(error);
        }
    } else {
        try {
            const { data } = await clientAxios.post("/pacientes", patient, config);
            const { createdAt, updatedAt, __v, ...patientStored } = data;
            setPatients([patientStored, ...patients]);
        } catch (error) {
            console.error(error.response.data.msg);
        }
    }

  }

  const setEdition = patient => {
    setPatient(patient);
  }

  const deletePatient = async id => {
      
      const answer = confirm(`¿Comfirmas que desesas eliminar?`);
      
      if(answer) {
          try {
            const token = localStorage.getItem("token");
            const config = {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.delete(`/pacientes/${id}`, config);
            const patientsUpdate = patients.filter( patientsState => patientsState._id !== id);
            setPatients(patientsUpdate);
        } catch (error) {
            console.error(error);
        }
    }
  }

  return (
    <PatientsContext.Provider 
        value={{
            patients,
            savePatient,
            setEdition,
            patient,
            deletePatient
        }}
    >
        {children}
    </PatientsContext.Provider>
  )
}

export { PatientsProvider };

export default PatientsContext;