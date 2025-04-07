import axios from 'axios';

const API_URL = 'https://pelicioni-auth-api.onrender.com/api/links';

export const createLink = async (token: string, data: any) => {
    const response = await axios(`${API_URL}`, {
        method: 'POST',
        headers: {
            'auth-token': token,
            'Content-Type': 'application/json'
        },
        data: data
    });
    return response;
};

export const getLinks = async (token: string) => {
    const response = await axios(`${API_URL}`, {
        method: 'GET',
        headers: {
            'auth-token': token,
            'Content-Type': 'application/json'
        }
    });
    return response;
};
