// frontend/src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout, isAuthenticated, getUserInfo } from '../services/auth';

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user is already logged in on page load
    useEffect(() => {
        if (isAuthenticated()) {
            const userInfo = getUserInfo();
            setUser(userInfo);
        }
        setLoading(false);
    }, []);

    // Login function
    const login = async (username, password) => {
        setLoading(true);
        setError(null);
        
        const result = await apiLogin(username, password);
        
        if (result.success) {
            const userInfo = getUserInfo();
            setUser(userInfo);
            setLoading(false);
            return true;
        } else {
            setError(result.error);
            setLoading(false);
            return false;
        }
    };

    // Logout function
    const logout = () => {
        apiLogout();
        setUser(null);
    };

    // Value to be provided
    const value = {
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated: isAuthenticated(),
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};