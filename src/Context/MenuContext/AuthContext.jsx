// src/contexts/AuthContext.js
import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// 1. Créez un contexte
const AuthContext = createContext(null);

// 2. Créez un composant Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stocke les informations de l'utilisateur
  const [error, setError] = useState(null); // Pour gérer les erreurs
  const isAuthenticated = user !== null;
  const navigate = useNavigate();

  const login = (username, password) => {
    // 💡 Ici, vous feriez une requête API pour vérifier les identifiants
    if (username === "test@gmail.com" && password === "123") {
      setUser({ name: username }); // Simule la connexion
      navigate("/"); // Redirige vers la page d'accueil
    } else {
      setError("Incorrect credentials!");
    }
  };

  const logout = () => {
    setUser(null); // Déconnecte l'utilisateur
    navigate("/login"); // Redirige vers la page de connexion
  };

  // 3. Exposez l'état et les fonctions via la prop 'value'
  const value = { user, error, isAuthenticated, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 4. Créez un hook pour utiliser le contexte facilement
export const useAuth = () => useContext(AuthContext);
