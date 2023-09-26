
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layout/AuthLayout";
import ProteRoute from "./layout/ProteRoute";

import Login from "./pages/Login"
import SignUp from "./pages/SignUp";
import ConfirmAccount from "./pages/ConfirmAccount";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/newPassword";

import ManagePatients from "./pages/ManagePatients";
import EditPerfil from "./pages/EditPerfil";
import ChangePassword from "./pages/ChangePassword";

import { AuthProvider } from "./context/AuthProvider";
import { PatientsProvider } from "./context/PatientsProvider";

function App() {

  return (
    <BrowserRouter>
        <AuthProvider>
          <PatientsProvider>
            <Routes>
              <Route path="/" element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path="registrar" element={<SignUp />} ></Route>
                <Route path="olvide-password" element={<ForgotPassword />} ></Route>
                <Route path="olvide-password/:token" element={<NewPassword />} ></Route>
                <Route path="confirmar/:id" element={<ConfirmAccount />} ></Route>
              </Route>

              <Route path="/admin" element={<ProteRoute />}>
                <Route index element={<ManagePatients />} />
                <Route path="perfil" element={<EditPerfil />} />
                <Route path="cambiar-password" element={<ChangePassword />} />
              </Route>
            </Routes>
          </PatientsProvider>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
