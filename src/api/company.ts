import axios from 'axios';

const API_URL = 'https://pelicioni-auth-api.onrender.com/api/company';

export const createCompany = async (token: string, data: any) => {
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

export const getCompanies = async (token: string) => {
    const response = await axios(`${API_URL}`, {
        method: 'GET',
        headers: {
            'auth-token': token,
            'Content-Type': 'application/json'
        }
    });
    return response;
};

export const putCompany = async (token: string, id: string, data: any) => {
    const response = await axios(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'auth-token': token,
            'Content-Type': 'application/json'
        },
        data: data
    });
    return response;
};
