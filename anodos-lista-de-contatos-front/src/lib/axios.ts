// lib/axios.js
import { getAuthToken } from '@/utils/cookies';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api", // URL base da API
    timeout: 10000, // Tempo limite da requisição
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para adicionar o token JWT, se necessário
axiosInstance.interceptors.request.use((config) => {
    const token = getAuthToken(); // ou cookies, dependendo da sua implementação
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor para tratamento de erros
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || 'Erro inesperado';
        return Promise.reject(message);
    }
);

export default axiosInstance;
