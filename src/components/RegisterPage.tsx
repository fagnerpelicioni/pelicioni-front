import React, { useState } from 'react';
import { register } from '../api/auth';
import { TextField, Button, Typography, Box } from '@mui/material';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await register(username, password);
            if (response) {
                setSuccess('Registration successful! You can now log in.');
            }
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            p={3}
        >
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
                <Box mb={2}>
                    <TextField
                        label="Username"
                        type="text"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Box>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register
                </Button>
                {error && (
                    <Typography color="error" mt={2}>
                        {error}
                    </Typography>
                )}
                {success && (
                    <Typography color="success.main" mt={2}>
                        {success}
                    </Typography>
                )}
            </form>
        </Box>
    );
};

export default RegisterPage;