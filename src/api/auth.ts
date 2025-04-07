import axios from 'axios';

const API_URL = 'https://pelicioni-auth-api.onrender.com/api/user';

interface User {
    name: string;
    email: string;
    password: string;
}

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
};

export const register = async (data: User) => {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
};