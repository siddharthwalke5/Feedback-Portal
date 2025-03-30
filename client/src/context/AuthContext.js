import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.user;
      } catch (error) {
        console.error('Invalid token:', error);
        return null;
      }
    } else {
      return null;
    }
  });

  const [successMessage, setSuccessMessage] = useState('');

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser(decoded.user);
    setSuccessMessage('User login successfully!'); 
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setSuccessMessage('Logout successful!');
  };

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Clear message after 3 seconds
      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  return (
    <AuthContext.Provider value={{ user, login, logout, successMessage }}>
      {children}
    </AuthContext.Provider>
  );
};
