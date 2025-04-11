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
import Companies from './Companies';
import CreateUser from './CreateUser';
import CreateLink from './CreateLink';
import CreateCompany from './CreateCompany';

import { UserData, UserLink } from '../Interfaces';

const HomePage = () => {
    const [userData, setUserData] = useState<UserData>({} as UserData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<UserLink | null>(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('auth-token');

    useEffect(() => {
        if (token) {
            getLinks(token)
                .then(response => {
                    setUserData(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    localStorage.removeItem('auth-token');
                    navigate('/login');
                    setLoading(false);
                });
        } else {
            setLoading(false);
            navigate('/login');
        }
    }, [navigate]);

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
        navigate('/');
        return null;
    }

    const handleSidebarClick = (item: any) => {
        setSelectedItem(item);
    };

    const renderContent = () => {
        if (!token) {
            navigate('/login');
            return null;
        }
        if (!selectedItem) {    
            return <Home />;
        }
        switch (selectedItem?.name) {
            case 'Home':
                return <Home />;
            case 'Users':
                return <Users onItemClick={handleSidebarClick} />;
            case 'Companies':
                return <Companies onItemClick={handleSidebarClick} />;
            case 'Create User':
                return <CreateUser />;
            case 'Create Link':
                return <CreateLink />;
            case 'Create Company':
                return <CreateCompany />;
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