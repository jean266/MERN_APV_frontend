/* eslint-disable react/prop-types */

import { useState, createContext, useEffect } from "react";
import clientAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [ load, setLoad ] = useState(true);
    const [ auth, setAuth ] = useState({});

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem("token");
            if(!token) {
               setLoad(false);
            }

            const config = {
                headers : {
                    "Content-Type" : "application/json",
                    authorization :  `Bearer ${token}`
                }
            }

            try {
                const { data } = await clientAxios("/veterinarios/perfil", config);
                
                setAuth(data.veterinary);
            } catch (error) {
                console.error(error.response.data.msg);
                setAuth({});
            }
            
            setLoad(false);
        }
        authenticateUser();
    }, []);

    const closeSection = () => {
        localStorage.removeItem("token");
        setAuth({});
    }

    const updatePerfil = async (datos) => {
        const token = localStorage.getItem("token");
        if(!token) {
            return setLoad(false);
        }
        const config = {
            headers : {
                "Content-Type" : "application/json",
                authorization :  `Bearer ${token}`
            }
        }
        try {
           const url = `/veterinarios/perfil/${datos._id}`;
           await clientAxios.put(url, datos, config);
           
           return {
             msg : "Almacenado Correctamente"
           }
        } catch (error) {
            return {
                msg : error.response.data.msg,
                error : true
            }
        }
    }
    
    const savePassword = async (password) => {
        const token = localStorage.getItem("token");
        if(!token) {
            return setLoad(false);
        }
        const config = {
            headers : {
                "Content-Type" : "application/json",
                authorization :  `Bearer ${token}`
            }
        }

        try {
           const url = `/veterinarios/actualizar-password`;
           const { data } = await clientAxios.put(url, password, config);
           return {
             msg : data.msg
           }
        } catch (error) {
            return {
                msg : error.response.data.msg,
                error : true
            }
        }
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                load,
                closeSection,
                updatePerfil,
                savePassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


export {
    AuthProvider
}

export default AuthContext;