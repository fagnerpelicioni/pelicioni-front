export const fetchUserData = async (token: string) => {
    console.log('Fetching user data with token:', token);
    const response = await fetch('https://pelicioni-auth-api.onrender.com/api/links', {
        method: 'GET',
        headers: {
            'auth-token': token,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    return data;
};