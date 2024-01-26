import React, { createContext, useState, useEffect } from 'react';
import oauthAPI from '../../api_layer/apis/authenticationAPIs/oauthAPI';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await oauthAPI.checkAuth();
      if (response.isAuthenticated) {
        setIsAuthenticated(true);
        setUser(response.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Authentication check failed', error);
    }
  };

  const signIn = async () => {
    await oauthAPI.googleSignIn();
  };

  const signOut = async () => {
    await oauthAPI.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
