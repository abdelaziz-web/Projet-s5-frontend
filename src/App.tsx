import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import StreamingPage from "./pages/Streaming";
import { useAuth } from './context/AuthContext';

// PrivateRoute component - for streaming page
function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

// AuthRoute component - for login/register pages
function AuthRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    
    if (user) {
        return <Navigate to="/streaming" replace />;
    }

    return <>{children}</>;
}

function AppRoutes() {
    return (
        <Routes>
            {/* Public home page */}
            <Route path="/" element={<Home />} />
            
            {/* Auth routes - redirect to streaming if logged in */}
            <Route 
                path="/login" 
                element={
                    <AuthRoute>
                        <Login />
                    </AuthRoute>
                } 
            />
            <Route 
                path="/register" 
                element={
                    <AuthRoute>
                        <Register />
                    </AuthRoute>
                } 
            />
            
            {/* Protected streaming page */}
            <Route 
                path="/streaming" 
                element={
                    <PrivateRoute>
                        <StreamingPage />
                    </PrivateRoute>
                } 
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Toaster position="top-right" />
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;