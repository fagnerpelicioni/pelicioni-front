import React, { useEffect, useState } from 'react';
import { fetchUserData } from '../api/links';

const HomePage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        console.log('Token from localStorage:', token);
        if (token) {
            fetchUserData(token)
                .then(data => {
                    setUserData(data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching user data: {error}</div>;
    }

    if (!userData) {
        return <div>Please log in to see your data.</div>;
    }

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <h2>User Data:</h2>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
    );
};

export default HomePage;