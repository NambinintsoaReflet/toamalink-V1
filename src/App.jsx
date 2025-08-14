import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react"; // Ajout de l'import de useState
import "./App.css";
import Layout from "./Pages/Layout";
import MenuContextProvider from "./Context/MenuContext/Provider";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signin from "./Pages/SignIn";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider } from "./Context/MenuContext/AuthContext";
import Welcome from "./Pages/Welcome";
import Messages from "./Pages/Messages";
import UnderConstruction from "./Pages/UnderConstruction";

// Importez votre composant ProtectedRoute

function App() {
  // Simulez l'état d'authentification, remplacez par votre logique de contexte
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <MenuContextProvider>
            <Routes>
              {/* Routes publiques */}
              <Route path="/login" element={<Login />} />
              <Route path="/signin" element={<Signin />} />
               <Route path="/welcome" element={<Welcome />} />

              {/* C'est ici que la route est protégée */}
              {/* Le composant ProtectedRoute vérifie l'authentification */}
              {/* <Route element={<ProtectedRoute isAuth={isAuthenticated} />}> */}
                {/* Ces routes ne seront accessibles que si l'utilisateur est authentifié */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="/message" element={<UnderConstruction />} />
                    <Route path="/*" element={<UnderConstruction />} />
                </Route>
              {/* </Route> */}
            </Routes>
          </MenuContextProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
