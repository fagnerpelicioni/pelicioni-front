import React, { useState } from 'react';
import { register } from '../api/auth';


import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import { Alert } from "@mui/joy";


import ColorSchemeToggle from './ColorSchemeToggle';

import { NewUser, CreateUserFormElement } from '../Interfaces';

const customTheme = extendTheme({
    colorSchemes: {
        dark: {
            palette: {
                mode: 'dark',
            },
        },
    },
});

const RegisterPage = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: NewUser) => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await register({ name: e.name, password: e.password, email: e.email });
            if (response) {
                setSuccess('Cadastro realizado com sucesso, por favor, faça login.');
            }
        } catch (err) {
            console.error('Error creating user:', err);
            setError('Ocorreu um erro ao cadastrar o usuário.');
        } finally {
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
              sx={{ py: 3, display: 'flex', justifyContent: 'space-between' }}
            >
              <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
                <IconButton variant="soft" color="primary" size="sm">
                  <BadgeRoundedIcon />
                </IconButton>
                <Typography level="title-lg">Company logo</Typography>
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
                    Faça seu cadastro
                  </Typography>
                </Stack>
              </Stack>
              <Stack sx={{ gap: 4, mt: 2 }}>
                {success && ( // Display success message
                    <Alert variant="solid" color="success">
                        {success}
                    </Alert>
                )}
                {error && ( // Display error message
                    <Alert variant="solid" color="danger">
                        {error}
                    </Alert>
                )}
                <form
                  onSubmit={async(event: React.FormEvent<CreateUserFormElement>) => {
                    event.preventDefault();
                    const form = event.currentTarget as CreateUserFormElement;
                    const formElements = event.currentTarget.elements;
                    const data = {
                      email: formElements.email.value,
                      password: formElements.password.value,
                      name: formElements.name.value,
                    };
                    await handleSubmit(data);
                    form.reset(); // Reset the form after submission
                  }}
                >
                  <FormControl required>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" name="email" />
                  </FormControl>
                  <FormControl required>
                    <FormLabel>Nome</FormLabel>
                    <Input type="text" name="name" />
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
                      <Link level="title-sm" href="/login">
                        Fazer login
                      </Link>
                    </Box>
                    <Button type="submit" fullWidth loading={loading}>
                      Cadastrar
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Box>
            <Box component="footer" sx={{ py: 3 }}>
              <Typography level="body-xs" sx={{ textAlign: 'center' }}>
                © Nome da empresa {new Date().getFullYear()}
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
              'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
            [theme.getColorSchemeSelector('dark')]: {
              backgroundImage:
                'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
            },
          })}
        />
      </CssVarsProvider>
    );
};

export default RegisterPage;