import { useState } from "react";
import { createLink } from "../api/links";

import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import { Alert } from "@mui/joy";

interface FormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    userEmail: HTMLInputElement;
    link: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
readonly elements: FormElements;
}

interface UserLink {
    name: string;
    userEmail: string;
    link: string;
}

const CreateUser = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // New state for success message

    const handleSubmit = async (event: UserLink) => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null); // Clear success message before submission
        const token = localStorage.getItem('auth-token');
        if (!token) {
            setError('Não autorizado!');
            setLoading(false);
            return;
        }
        try {
            const response = await createLink(token, event);
            console.log('Link created successfully:', response);
            setSuccessMessage('Link criado com sucesso!'); // Set success message
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <CssVarsProvider>
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
                        <Stack sx={{ gap: 4, mt: 2 }}>
                            {successMessage && ( // Display success message
                                <Alert variant="solid" color="success">
                                    {successMessage}
                                </Alert>
                            )}
                            {error && ( // Display error message
                                <Alert variant="solid" color="danger">
                                    {error}
                                </Alert>
                            )}
                            <form
                                onSubmit={async (event: React.FormEvent<SignInFormElement>) => {
                                    event.preventDefault();
                                    const form = event.currentTarget as SignInFormElement;
                                    const formElements = event.currentTarget.elements;
                                    const userData: UserLink = {
                                        name: formElements.name.value,
                                        userEmail: formElements.userEmail.value,
                                        link: formElements.link.value,
                                    };
                                    await handleSubmit(userData);
                                    form.reset(); // Reset the form after submission
                                }}
                            >
                                <FormControl required>
                                    <FormLabel>Email do usuário</FormLabel>
                                    <Input type="email" name="userEmail" />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Nome do link</FormLabel>
                                    <Input type="text" name="name" />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Link</FormLabel>
                                    <Input type="text" name="link" />
                                </FormControl>
                                <Stack sx={{ gap: 4, mt: 2 }}>
                                    <Button type="submit" fullWidth loading={loading}>
                                        Cadastrar link
                                    </Button>
                                </Stack>
                            </form>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </CssVarsProvider>
    );
};

export default CreateUser;