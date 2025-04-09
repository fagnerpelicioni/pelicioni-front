import { useEffect, useState } from 'react';
import { getCompanies, putCompany } from '../api/company';
import { UserLink } from '../Interfaces'; // Adjust the import path as necessary

import {
  Box,
  Typography,
  Sheet,
  Button,
  Stack,
  CircularProgress,
  Switch,
} from '@mui/joy';

import { Company } from '../Interfaces';

const Users = ({onItemClick}: { onItemClick: (item: UserLink) => void}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companiesData, setCompaniesData] = useState<Company[]>([]);

  const getCompaniesData = async (token: string) => {
    await getCompanies(token)
      .then((response) => {
        setCompaniesData(response.data);
        setLoading(false);
      })
      .catch((err: any) => {
        if (err.response) {
            setError(err.response.data.error);
          } else {
            setError('Erro desconhecido. Tente novamente mais tarde.');
          }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('auth-token');

    if (token) {
      getCompaniesData(token);
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
                <Typography color="danger" >
                    {error}
                </Typography>
            </Box>
        );
    }

  const editCompany = async(id: string, flag: boolean) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('auth-token');

    if (token) {
      await putCompany(token, id, { active: !flag })
        .then(() => {
          setCompaniesData((prevCompanies) =>
            prevCompanies.map((company) =>
              company._id === id ? { ...company, active: !flag } : company
            )
          );
        })
        .catch((err: any) => {
          if (err.response) {
              setError(err.response.data.error);
            } else {
              setError('Erro desconhecido. Tente novamente mais tarde.');
            }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  const activeCompany = async(id: string, flag: boolean) => {
    await editCompany(id, flag )
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Page Title */}
      <Typography level="h4" sx={{ mb: 2 }}>
        Users Management
      </Typography>

      {/* Users List Container */}
      <Sheet
        variant="outlined"
        sx={{
          borderRadius: 'md',
          p: 2,
          boxShadow: 'sm',
          bgcolor: 'background.body',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            fontWeight: 'bold',
          }}
        >
          <Typography>ID</Typography>
          <Typography>Nome</Typography>
          <Typography>Código</Typography>
          <Typography>Ativo</Typography>
        </Box>

        {/* User Items */}
        {companiesData ? companiesData.map((company, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              py: 1,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography sx={{ width: "30%"}}>{company._id}</Typography>
            <Typography sx={{ width: "30%"}}>{company.name}</Typography>
            <Typography sx={{ width: "20%"}}>{company.code}</Typography>
            <Stack sx={{ flex: 1}}>
                <Switch variant="soft" checked={company.active} onChange={() => activeCompany(company._id, company.active ? company.active : false)}/>
            </Stack>
          </Box>
        )): ( <Typography>Sem empresas cadastradas</Typography>)} 

        <Button
          variant="solid"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => onItemClick({ name: "Users", link: '/' })}
        >
          Criar nova empresa
        </Button>
      </Sheet>
    </Box>
  );
};

export default Users;