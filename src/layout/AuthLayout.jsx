
import { Outlet } from "react-router-dom";

const AuthLayout = () => {

  return (
    <>
        <main className="container mx-auto md:grid md:grid-cols-2 gap-10 p-4 items-center md:min-h-screen mt-12 md:mt-0">
            <Outlet />
        </main>
    </>
  )
}

export default AuthLayout;