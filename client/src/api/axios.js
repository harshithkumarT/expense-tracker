import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // Backend runs on port 3000 as per .env
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
