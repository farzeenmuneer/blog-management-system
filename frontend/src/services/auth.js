import api from './api';

export const login = async (username, password) => {
    try {
        const response = await api.post('/token/', { username, password });
        
        // Save tokens to localStorage
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        
        return { success: true, data: response.data };
    } catch (error) {
        return { 
            success: false, 
            error: error.response?.data?.detail || 'Login failed' 
        };
    }
};


export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};


export const isAuthenticated = () => {
    return !!localStorage.getItem('access_token');
};


export const getUserInfo = () => {
    const token = localStorage.getItem('access_token');
    if (!token) return null;
    
    try {
        // Decode JWT token to get user info
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
            username: payload.username,
            userId: payload.user_id,
        };
    } catch (error) {
        return null;
    }
};