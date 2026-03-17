import React, { createContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  email: string
  token: string
}

export interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider(props: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')
    
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser({ ...parsedUser, token: storedToken })
        setIsAuthenticated(true)
      } catch {
        // Invalid stored data, clear it
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Import here to avoid circular dependency
      const { loginUser } = await import('../services/authService')
      const response = await loginUser(email, password)
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify({ email: response.email }))
      localStorage.setItem('token', response.token)
      
      setUser(response)
      setIsAuthenticated(true)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    setIsAuthenticated(false)
  }

  const value: AuthContextType = {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}
