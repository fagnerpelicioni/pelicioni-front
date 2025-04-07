import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

import { CssVarsProvider, extendTheme, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import { Alert } from "@mui/joy";

import logo from '../assets/logo_new.png';

import { User, LoginFormElement } from '../Interfaces';

import ColorSchemeToggle from './ColorSchemeToggle';

const customTheme = extendTheme({
    colorSchemes: {
        dark: {
            palette: {
                mode: 'dark',
            },
        },
    },
});

const LoginPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: User) => {
    console.log('handleSubmit', e);
    setLoading(true);
    setError('');

    try {
      const response = await login(e.email, e.password);
      localStorage.setItem('auth-token', response.token);
      await navigate('/home');
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError('Erro desconhecido. Tente novamente mais tarde.');
      }
      setLoading(false);
    }
  };

  return (
    <CssVarsProvider theme={customTheme} disableTransitionOnChange>
    <CssBaseline />
    <GlobalStyles
      styles={{
        ':root': {
          '--Form-maxWidth': '800px',
          '--Transition-duration': '0.4s', // set to `none` to disable transition
        },
      }}
    />
    <Box
      sx={(theme) => ({
        width: { xs: '100%', md: '50vw' },
        transition: 'width var(--Transition-duration)',
        transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(255 255 255 / 0.2)',
        [theme.getColorSchemeSelector('dark')]: {
          backgroundColor: 'rgba(19 19 24 / 0.4)',
        },
      })}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100dvh',
          width: '100%',
          px: 2,
        }}
      >
        <Box
          component="header"
          sx={{ py: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ height: 75 }} />
          </Box>
          <ColorSchemeToggle />
        </Box>
        <Box
          component="main"
          sx={{
            my: 'auto',
            py: 2,
            pb: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: 400,
            maxWidth: '100%',
            mx: 'auto',
            borderRadius: 'sm',
            '& form': {
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            },
            [`& .MuiFormLabel-asterisk`]: {
              visibility: 'hidden',
            },
          }}
        >
          <Stack sx={{ gap: 4, mb: 2 }}>
            <Stack sx={{ gap: 1 }}>
              <Typography component="h1" level="h3">
                Fazer login
              </Typography>
            </Stack>
          </Stack>
          <Stack sx={{ gap: 4, mt: 2 }}>
            {error && ( // Display error message
              <Alert variant="solid" color="danger">
                  {error}
              </Alert>
            )}
            <form
              onSubmit={async(event: React.FormEvent<LoginFormElement>) => {
                event.preventDefault();
                const formElements = event.currentTarget.elements;
                const data = {
                  email: formElements.email.value,
                  password: formElements.password.value,
                };
                await handleSubmit(data);
              }}
            >
              <FormControl required>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" />
              </FormControl>
              <FormControl required>
                <FormLabel>Senha</FormLabel>
                <Input type="password" name="password" />
              </FormControl>
              <Stack sx={{ gap: 4, mt: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Link level="title-sm" href="#replace-with-a-link">
                    Esqueceu a senha?
                  </Link>
                </Box>
                <Button type="submit" fullWidth loading={loading}>
                  Entrar
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
        <Box component="footer" sx={{ py: 3 }}>
          <Typography level="body-xs" sx={{ textAlign: 'center' }}>
            © Soluções Inteligentes {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </Box>
    <Box
      sx={(theme) => ({
        height: '100%',
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        left: { xs: 0, md: '50vw' },
        transition:
          'background-image var(--Transition-duration), left var(--Transition-duration) !important',
        transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
        backgroundColor: 'background.level1',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'url(https://images.unsplash.com/photo-1542744173-05336fcc7ad4?q=80&w=2002&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        [theme.getColorSchemeSelector('dark')]: {
          backgroundImage:
            'url(https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        },
      })}
    />
  </CssVarsProvider>
);
};

export default LoginPage;