import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
  
    if (!isAuthenticated) {
      // Redirect to the sign-in page
      return <Navigate to="/signin" />;
    }
  
    return children;
  };
  
  export default ProtectedRoute;
