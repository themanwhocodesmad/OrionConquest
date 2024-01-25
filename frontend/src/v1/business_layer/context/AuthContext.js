// auth-context.js
import React, { createContext, useState } from 'react';
import httpClient from '../../api_layer/client';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    hasPlanets: false,
  });

  const updateAuthContext = async () => {
    try {
      const response = await httpClient.get('/auth/check-auth');
      const { isAuthenticated, user, hasPlanets } = response.data;

      setAuthState({ isAuthenticated, user, hasPlanets });
    } catch (error) {
      console.error('Error fetching authentication status:', error);
      // Handle error as needed
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, updateAuthContext }}>
      {children}
    </AuthContext.Provider>
  );
};
