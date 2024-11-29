import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Cargar el estado de autenticación desde localStorage
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    // Verifica si hay un usuario en el localStorage al iniciar la aplicación y limpia el estado
    const storedUser = localStorage.getItem('username');
    if (!storedUser) {
      setIsAuthenticated(false); // Inicializa como no autenticado
    } else {
      setIsAuthenticated(true); // Solo si deseas mantener la sesión activa
    }
  }, []);


  const login = (username) => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Guardar en localStorage
    localStorage.setItem('username', username);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Eliminar de localStorage
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
