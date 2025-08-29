
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { setAuthToken } from "../api/axios";


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Charger l’état depuis le localStorage au démarrage
  useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed.user);
      setToken(parsed.token);
      setAuthToken(parsed.token);
    }
  }, []);

  const login = (tk, usr) => {
    setUser(usr);
    setToken(tk);
    setAuthToken(tk);
    localStorage.setItem("auth", JSON.stringify({ token: tk, user: usr }));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAuthToken(null);
    localStorage.removeItem("auth");
  };

  const value = useMemo(() => ({ user, token, login, logout }), [user, token]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
};
