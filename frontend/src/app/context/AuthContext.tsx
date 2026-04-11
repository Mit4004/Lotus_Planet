import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem('lotusplanet_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('lotusplanet_user', JSON.stringify(user));
      // Sync admin state for the navigation guard
      if (user.isAdmin) localStorage.setItem('isAdmin', 'true');
    } else {
      localStorage.removeItem('lotusplanet_user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await apiRequest<{ success: boolean; data: AuthUser }>('/auth/login', {
        method: 'POST',
        body: { email, password },
      });
      setUser(res.data);
      // Synchronously patch localStorage to avoid redirect race conditions
      if (res.data.isAdmin) {
        localStorage.setItem('isAdmin', 'true');
      }
      return res.data;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, phone?: string) => {
    setIsLoading(true);
    try {
      const res = await apiRequest<{ success: boolean; data: AuthUser }>('/auth/register', {
        method: 'POST',
        body: { name, email, password, phone },
      });
      setUser(res.data);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('isAdmin');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
