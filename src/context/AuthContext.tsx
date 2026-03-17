import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider(props: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore session from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');
    if (token && email) {
      setIsAuthenticated(true);
      setUserEmail(email);
    }
  }, []);

  // Mock login function - accepts any valid email/password
  const login = async (email: string, password: string, rememberMe: boolean) => {
    setIsLoading(true);
    setError(null);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock authentication - accept any non-empty email and password
    if (email && password) {
      const token = `token-${Date.now()}`;
      localStorage.setItem('authToken', token);
      localStorage.setItem('userEmail', email);
      if (!rememberMe) {
        // If remember me is unchecked, clear on logout
        localStorage.setItem('rememberMe', 'false');
      } else {
        localStorage.setItem('rememberMe', 'true');
      }
      setIsAuthenticated(true);
      setUserEmail(email);
      setIsLoading(false);
    } else {
      setError('Email and password are required');
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('rememberMe');
    setIsAuthenticated(false);
    setUserEmail(null);
    setError(null);
  };

  const value: AuthContextType = {
    isAuthenticated,
    userEmail,
    isLoading,
    error,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
