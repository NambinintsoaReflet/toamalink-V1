// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/MenuContext/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth(); // Récupère l'état depuis le contexte

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;