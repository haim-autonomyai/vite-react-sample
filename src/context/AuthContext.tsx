import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider(props: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Auto-restore session on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedToken = localStorage.getItem('authToken');

    if (storedEmail && storedToken) {
      setUserEmail(storedEmail);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setError(null);

    // Mock authentication - accept any email/password combination
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock token generation
    const mockToken = `token_${Date.now()}`;

    // Store auth state in localStorage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('authToken', mockToken);

    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const logout = (): void => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('authToken');
    setUserEmail(null);
    setIsAuthenticated(false);
    setError(null);
  };

  const value: AuthContextType = {
    isAuthenticated,
    userEmail,
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

function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
