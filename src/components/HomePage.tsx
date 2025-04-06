import React, { useEffect, useState } from 'react';
import { fetchUserData } from '../api/links';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Paper, CircularProgress, Drawer, List, ListItem, ListItemText } from '@mui/material';

const HomePage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

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
                    setError('Error fetching user data.');
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <Typography color="error" variant="h6">
                    {error}
                </Typography>
            </Box>
        );
    }

    if (!userData) {
        navigate('/login');
        return null;
    }

    return (
        <Box display="flex" minHeight="100vh">
            {/* Sidebar */}
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
                }}
            >
                <List>
                    <ListItem component="button">
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem component="button">
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem component="button">
                        <ListItemText primary="Settings" />
                    </ListItem>
                    <ListItem component="button">
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Drawer>

            {/* Main Content */}
            <Box flexGrow={1} p={3}>
                <Typography variant="h4" gutterBottom>
                    Welcome to the Home Page
                </Typography>
                <Typography variant="h6" gutterBottom>
                    User Data:
                </Typography>
                <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
                    <pre>{JSON.stringify(userData, null, 2)}</pre>
                </Paper>
            </Box>
        </Box>
    );
};

export default HomePage;