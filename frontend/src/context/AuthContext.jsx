import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import client from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const response = await client.get('/api/auth/me');
      setUser(response.data?.data?.user || null);
    } catch (_error) {
      localStorage.removeItem('clutch_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('clutch_token');
    if (!token) {
      setLoading(false);
      return;
    }

    fetchMe();
  }, []);

  const login = async (email, password) => {
    const response = await client.post('/api/auth/login', { email, password });
    const token = response.data?.data?.token;
    if (token) {
      localStorage.setItem('clutch_token', token);
    }
    setUser(response.data?.data?.user || null);
    return response.data;
  };

  const register = async (payload) => {
    const response = await client.post('/api/auth/register', payload);
    const token = response.data?.data?.token;
    if (token) {
      localStorage.setItem('clutch_token', token);
    }
    setUser(response.data?.data?.user || null);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('clutch_token');
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      refreshMe: fetchMe,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
