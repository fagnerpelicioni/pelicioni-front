import { useState } from "react";

import { CssVarsProvider } from '@mui/joy/styles';
import { Alert, Stack, Input, FormLabel, FormControl, Button, Box, CssBaseline, GlobalStyles } from "@mui/joy";

import { createCompany } from "../api/company";
import { NewCompany } from "../Interfaces";

export interface FormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    cnpj: HTMLInputElement;
    code: HTMLInputElement;
}
export interface CompanyFormElement extends HTMLFormElement {
readonly elements: FormElements;
}

const CreateCompany = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (event: NewCompany) => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null); // Clear success message before submission

        const token = localStorage.getItem('auth-token');
        if (!token) {
            setError('Não autorizado.');
            setLoading(false);
            return;
        }

        try {
            const response = await createCompany(token, event);
            console.log('Company created successfully:', response);
            setSuccessMessage('Empresa criada com sucesso!'); // Set success message
        } catch (err: any) {
            if (err.response) {
                setError(err.response.data.error);
              } else {
                setError('Erro desconhecido. Tente novamente mais tarde.');
              }
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
                                onSubmit={async (event: React.FormEvent<CompanyFormElement>) => {
                                    event.preventDefault();
                                    const form = event.currentTarget as CompanyFormElement;
                                    const formElements = event.currentTarget.elements;
                                    const companyData: NewCompany = {
                                        name: formElements.name.value,
                                        cnpj: formElements.cnpj.value,
                                        code: formElements.code.value,
                                        active: true,
                                    };
                                    await handleSubmit(companyData);
                                    form.reset(); // Reset the form after submission
                                }}
                            >
                                <FormControl required>
                                    <FormLabel>Nome da empresa</FormLabel>
                                    <Input type="text" name="name" />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>CNPJ</FormLabel>
                                    <Input type="text" name="cnpj" />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Código da empresa</FormLabel>
                                    <Input type="text" name="code" />
                                </FormControl>
                                <Stack sx={{ gap: 4, mt: 2 }}>
                                    <Button type="submit" fullWidth loading={loading}>
                                        Cadastrar empresa
                                    </Button>
                                </Stack>
                            </form>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </CssVarsProvider>
);

}

export default CreateCompany;