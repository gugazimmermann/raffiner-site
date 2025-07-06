import { useState, useEffect } from 'react';
import { getToken, getUser, logout } from '../utils/auth';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    const userData = getUser();

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(userData);
    }

    setLoading(false);
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    user,
    loading,
    logout: handleLogout,
  };
};
