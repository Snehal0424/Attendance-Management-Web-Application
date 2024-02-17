// AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// Create a provider component to manage authentication state
export const AuthProvider = ({ children }) => {
  // State to store the authenticated user
  const [user, setUser] = useState(null);

  // Function to handle login
  const login = (userData) => {
    setUser(userData);
    // Additional logic for login (e.g., storing user data in local storage)
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
    // Additional logic for logout (e.g., clearing user data from local storage)
  };

  // Value object to provide in the context
  const value = {
    user,
    login,
    logout,
  };

  // Provide the context value to its children components
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the authentication context
export const useAuth = () => useContext(AuthContext);
