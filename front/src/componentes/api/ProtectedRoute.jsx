

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext'; 

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Guardar la ruta que el usuario intentaba visitar antes de redirigir a /login
    sessionStorage.setItem('redirectAfterLogin', location.pathname);
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
