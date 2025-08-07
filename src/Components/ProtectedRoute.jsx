// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuth }) => {
  // Si l'utilisateur est authentifié, on rend la route enfant via <Outlet />
  if (isAuth) {
    return <Outlet />;
  }

  // Sinon, on le redirige vers la page de connexion
  // L'attribut 'replace' évite de garder la page protégée dans l'historique
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;