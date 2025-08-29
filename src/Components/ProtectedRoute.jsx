// src/components/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = () => {
  const { token } = useAuth(); // ou user, selon ton contexte
  const location = useLocation();

  if (!token) {
    // Redirige vers /login et garde l’endroit où on voulait aller
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
