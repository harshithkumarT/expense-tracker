import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            // Ideally verify token with backend here or decode user info
            // For now, let's assume we can keep user state simple or fetch profile
            // If backend had a /me endpoint, we'd call it here.
            // Since we don't have a /me endpoint readily visible in previous context, 
            // we successfully logged in if we have a token.
            // We might want to decode the token to get user info if it's a JWT.
            // But for simplicity of this step, we just set token.
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user } = response.data; // Adjust based on actual API response
            setToken(token);
            setUser(user);
            localStorage.setItem('token', token);
            return { success: true };
        } catch (error) {
            console.error("Login failed", error);
            return { success: false, error: error.response?.data?.message || "Login failed" };
        }
    };

    const register = async (username, email, password) => {
        try {
            await api.post('/auth/register', { name: username, email, password });
            return { success: true };
        } catch (error) {
            console.error("Registration failed full error:", error);
            console.error("Registration failed response data:", error.response?.data);
            return { success: false, error: error.response?.data?.message || "Registration failed" };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
