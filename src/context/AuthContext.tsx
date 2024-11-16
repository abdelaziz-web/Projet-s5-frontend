// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  csrfToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshCSRFToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'auth_user';
const CSRF_TOKEN_KEY = 'csrf_token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  // Load CSRF token on mount
  useEffect(() => {
    refreshCSRFToken();
  }, []);

  // Persist user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const refreshCSRFToken = useCallback(async () => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await fetch('/api/csrf-token');
      // const data = await response.json();
      // setCsrfToken(data.token);
      
      // Mock CSRF token for now
      const mockToken = `mock-csrf-${Date.now()}`;
      setCsrfToken(mockToken);
      localStorage.setItem(CSRF_TOKEN_KEY, mockToken);
    } catch (error) {
      console.error('Failed to refresh CSRF token:', error);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'X-CSRF-Token': csrfToken || '',
      //   },
      //   body: JSON.stringify({ email, password }),
      //   credentials: 'include'
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);

      // Mock successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser: User = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: email,
        dateOfBirth: '1990-01-01',
        gender: 'male',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setUser(mockUser);
      await refreshCSRFToken();
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [csrfToken]);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'X-CSRF-Token': csrfToken || '',
      //   },
      //   body: JSON.stringify(data),
      //   credentials: 'include'
      // });
      // const responseData = await response.json();
      // if (!response.ok) throw new Error(responseData.message);

      // Mock successful registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser: User = {
        id: '1',
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setUser(mockUser);
      await refreshCSRFToken();
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [csrfToken]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call when backend is ready
      // await fetch('/api/logout', {
      //   method: 'POST',
      //   headers: {
      //     'X-CSRF-Token': csrfToken || '',
      //   },
      //   credentials: 'include'
      // });

      // Mock logout delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(null);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(CSRF_TOKEN_KEY);
      setCsrfToken(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [csrfToken]);

  // Add request interceptor when backend is ready
  // useEffect(() => {
  //   const interceptor = axios.interceptors.response.use(
  //     response => response,
  //     async error => {
  //       if (error.response?.status === 401) {
  //         // Handle session expiration
  //         await logout();
  //       }
  //       return Promise.reject(error);
  //     }
  //   );
  //
  //   return () => {
  //     axios.interceptors.response.eject(interceptor);
  //   };
  // }, [logout]);

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      csrfToken,
      login,
      register,
      logout,
      refreshCSRFToken
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}