import axios from 'axios';

const API_URL = 'https://pelicioni-auth-api.onrender.com/api/user';

export const getUsers = async (token: string) => {
    const response = await axios(`${API_URL}/users`, {
        method: 'GET',
        headers: {
            'auth-token': token,
            'Content-Type': 'application/json'
        }
    });
    return response;
};
