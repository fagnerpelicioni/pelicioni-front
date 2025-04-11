import { useState, useEffect } from "react";
import { register } from "../api/auth";
import { getCompanies } from "../api/company";

import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Alert, CircularProgress, Select, Option } from "@mui/joy";

import { UserData, NewUser, CreateUserFormElement } from '../Interfaces';
import { Form } from "react-router-dom";

const CreateUser = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // New state for success message
    const [companies, setCompanies] = useState<any[]>([]); // Adjust type as necessary
    const [loadingCompanies, setLoadingCompanies] = useState(true);
    const [selectedCompany, setSelectedCompany] = useState(""); // Add state for the selected company

    const handleSubmit = async (event: NewUser) => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null); // Clear success message before submission

        try {
            const response = await register(event);
            console.log('User created successfully:', response);
            setSuccessMessage('Usuário criado com sucesso!'); // Set success message
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setLoading(false);
        }
    };

    const fetchCompanies = async () => {
        const token = localStorage.getItem('auth-token');

        if (!token) {
            setError('Não autorizado.');
            setLoadingCompanies(false);
            return;
        }
        try {
            const response = await getCompanies(token);
            setCompanies(response.data);
        } catch (error) {
            console.error('Error fetching companies:', error);
            setError('Erro ao carregar empresas. Tente novamente.');
        } finally {
            setLoadingCompanies(false);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    if (loadingCompanies) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <CircularProgress />
            </Box>
        )
    }

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
                                onSubmit={async (event: React.FormEvent<CreateUserFormElement>) => {
                                    event.preventDefault();
                                    const form = event.currentTarget as CreateUserFormElement;
                                    const formElements = event.currentTarget.elements;
                                    const userData: NewUser = {
                                        name: formElements.name.value,
                                        email: formElements.email.value,
                                        password: formElements.password.value,
                                        company: selectedCompany || "",
                                    };
                                    await handleSubmit(userData);
                                    form.reset(); // Reset the form after submission
                                }}
                            >
                                <FormControl required>
                                    <FormLabel>Nome</FormLabel>
                                    <Input type="text" name="name" />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email" name="email" />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Empresa</FormLabel>
                                    <Select name="company" defaultValue={selectedCompany}>
                                        <Option value="" disabled>Selecione uma empresa</Option>
                                        {companies.map((company) => (
                                            <Option key={company._id} value={company._id} onClick={() => setSelectedCompany(company._id)}>
                                                {company.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Senha</FormLabel>
                                    <Input type="password" name="password" />
                                </FormControl>
                                <Stack sx={{ gap: 4, mt: 2 }}>
                                    <Button type="submit" fullWidth loading={loading}>
                                        Cadastrar usuário
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