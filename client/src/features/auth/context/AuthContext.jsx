import { createContext, useContext, useEffect, useState } from 'react';

import api, {
  setAccessToken as setApiAccessToken,
  setOnRefreshFailure,
} from '@/lib/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (authData) => {
    setUser(authData.user);
    setAccessToken(authData.accessToken);
    setApiAccessToken(authData.accessToken);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);
    } finally {
      setUser(null);
      setAccessToken(null);
      setApiAccessToken(null);
    }
  };

  useEffect(() => {
    setOnRefreshFailure(() => {
      setUser(null);
      setAccessToken(null);
      setApiAccessToken(null);
    });

    return () => {
      setOnRefreshFailure(null);
    };
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await api.post('/auth/refresh-token');

        const authData = response.data.data;

        setUser(authData.user);
        setAccessToken(authData.accessToken);
        setApiAccessToken(authData.accessToken);
      } catch (error) {
        // No valid refresh token means the user is not authenticated.
        setUser(null);
        setAccessToken(null);
        setApiAccessToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const value = {
    user,
    accessToken,
    isAuthenticated: Boolean(accessToken),
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }

  return context;
};
