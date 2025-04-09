import { useEffect, useState } from 'react';
import { getUsers, putUser } from '../api/users';
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
import { UserData } from '../Interfaces';

const Users = ({onItemClick}: { onItemClick: (item: UserLink) => void}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usersData, setUserData] = useState<UserData[] | null>(null);
  const token = localStorage.getItem('auth-token');

  const getUsersData = async (token: string) => {
    await getUsers(token)
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching user data.');
        setLoading(false);
      }
      );
  };

  useEffect(() => {
    if (token) {
      getUsersData(token);
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

  const editUser = async(id: string, flag: boolean) => {
    setLoading(true);
    setError(null);

    if (token) {
      await putUser(token, id, { active: !flag })
        .then(() => {
          setUserData((prevUsers) =>
            prevUsers
              ? prevUsers.map((user) =>
                  user._id === id ? { ...user, active: !flag } : user
                )
              : null
          );
        })
        .catch((err) => {
          if (err.response) {
            setError(err.response.data.error);
          } else {
            setError('Erro desconhecido. Tente novamente mais tarde.');
          }
        }).finally(() => {
          setLoading(false);
    });
    }
  };

  // Handlers for edit and delete actions
  const activeUser = async(id: string, flag: boolean) => {
    console.log(`Edit user with ID: ${id}`);
    await editUser(id, flag);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Page Title */}
      <Typography level="h4" sx={{ mb: 2 }}>
        Gerenciamento de usuários
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
          <Typography>Email</Typography>
          <Typography>Empresa</Typography>
          <Typography>Ativo</Typography>
        </Box>

        {/* User Items */}
        {usersData ? usersData.map((user, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 1,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography>{user._id}</Typography>
            <Typography>{user.name}</Typography>
            <Typography>{user.email}</Typography>
            <Typography>{user.company?.name}</Typography>
            <Switch variant="soft" checked={user.active} onChange={() => activeUser(user._id, user.active ? user.active : false)} />
          </Box>
        )): ( <Typography>Sem usuários cadastrados</Typography>)} 

        <Button
          variant="solid"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => onItemClick({ name: "Users", link: '/' })}
        >
          Criar novo usuário
        </Button>
      </Sheet>
    </Box>
  );
};

export default Users;