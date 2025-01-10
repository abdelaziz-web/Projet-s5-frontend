import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // You'll need to: npm install jwt-decode

interface User {
    id: number;
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

interface AuthResponse {
    token: string;
    user: User;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    refreshToken: () => Promise<void>;
}

interface JWTPayload {
    exp: number;
    sub: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem(USER_KEY);
        return storedUser ? JSON.parse(storedUser) : null;
    });
    
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem(TOKEN_KEY);
    });
    
    const [isLoading, setIsLoading] = useState(false);

    // Check token expiration
    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode<JWTPayload>(token);
                const currentTime = Date.now() / 1000;
                
                if (decoded.exp < currentTime) {
                    // Token has expired
                    refreshToken();
                } else {
                    // Schedule refresh before token expires
                    const timeUntilExpiry = decoded.exp - currentTime;
                    const refreshTime = Math.max(timeUntilExpiry - 60, 0); // Refresh 1 minute before expiry
                    const refreshTimeout = setTimeout(refreshToken, refreshTime * 1000);
                    
                    return () => clearTimeout(refreshTimeout);
                }
            } catch (error) {
                console.error('Invalid token:', error);
                logout();
            }
        }
    }, [token]);

    const setAuthData = (response: AuthResponse) => {
        setToken(response.token);
        setUser(response.user);
        localStorage.setItem(TOKEN_KEY, response.token);
        localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    };

    const login = useCallback(async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Login failed');
            }

            const data: AuthResponse = await response.json();
            setAuthData(data);

        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const register = useCallback(async (data: RegisterData) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Registration failed');
            }

            const responseData: AuthResponse = await response.json();
            setAuthData(responseData);

        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const refreshToken = useCallback(async () => {
        if (!token) return;

        try {
            const response = await fetch('/api/auth/refresh', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Token refresh failed');
            }

            const data: AuthResponse = await response.json();
            setAuthData(data);

        } catch (error) {
            console.error('Token refresh failed:', error);
            logout();
        }
    }, [token]);

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            token,
            login,
            register,
            logout,
            refreshToken
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