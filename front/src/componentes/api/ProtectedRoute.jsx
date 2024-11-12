// import { Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext'; 

// const ProtectedRoute = ({ element }) => {
//   const { isAuthenticated } = useAuth();
//   const location = useLocation();

//   if (isAuthenticated) {
//     //alert('Sesión iniciada');
//   }

//   return isAuthenticated ? element : <Navigate to="/login" />;
// };

// export default ProtectedRoute;

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext'; 

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Guardar la ruta que el usuario intentaba visitar antes de redirigir a /login
    sessionStorage.setItem('redirectAfterLogin', location.pathname);
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
