
import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";


function ProteRoute() {

  const { auth, load } = useAuth();
  if(load) return "Cargando...";

  return (
    
    <>
        <Header />
        {auth?._id ?  (
        <main className="container mx-auto mt-10">
          <Outlet />
        </main>) : <Navigate to="/" /> }
        <Footer />
    </>
  )
}

export default ProteRoute;