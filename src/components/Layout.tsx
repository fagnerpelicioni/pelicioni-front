import React, { useEffect, useState } from 'react';
import { getLinks } from '../api/links';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, CircularProgress } from '@mui/material';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Sidebar from './Sidebar';
import Header from './Header';
import LinkContent from './LinkContent';
import Home from './Home';
import Users from './Users';
import CreateUser from './CreateUser';
import CreateLink from './CreateLink';

interface Link {
    name: string;
    link: string;
};

const HomePage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<Link | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            getLinks(token)
                .then(response => {
                    setUserData(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    localStorage.removeItem('auth-token');
                    window.location.href = '/login'; // Redirect to login page
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

    const handleSidebarClick = (item: any) => {
        setSelectedItem(item);
    };

    const renderContent = () => {
        if (!selectedItem) {    
            return <Home />;
        }
        switch (selectedItem?.name) {
            case 'Home':
                return <Home />;
            case 'Users':
                return <Users />;
            case 'Create User':
                return <CreateUser />;
            case 'Create Link':
                return <CreateLink />;
            default:
                return selectedItem ? <LinkContent item={selectedItem} /> : null;
        }
    };

    return (
        <CssVarsProvider>
            <CssBaseline>
                <Box display="flex" minHeight="100dvh">
                    <Header />
                    <Sidebar userData={userData} onItemClick={handleSidebarClick} />
                    <Box
                        component="main"
                        className="MainContent"
                        sx={{
                            px: { xs: 2, md: 6 },
                            pt: {
                            xs: 'calc(12px + var(--Header-height))',
                            sm: 'calc(12px + var(--Header-height))',
                            md: 3,
                            },
                            pb: { xs: 2, sm: 2, md: 3 },
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: 0,
                            height: '100dvh',
                            gap: 1,
                        }}
                        >
                        {renderContent()}
                    </Box>
                </Box>
            </CssBaseline>
        </CssVarsProvider>
    );
};

export default HomePage;