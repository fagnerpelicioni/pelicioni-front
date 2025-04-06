import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/users';

import {
  Box,
  Typography,
  Sheet,
  Button,
  Avatar,
  IconButton,
  Stack,
  CircularProgress,
} from '@mui/joy';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usersData, setUserData] = useState<{ _id: string; name: string; email: string; avatar: string }[] | null>(null);

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
    const token = localStorage.getItem('auth-token');
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

  // Handlers for edit and delete actions
  const handleEdit = (id: string) => {
    console.log(`Edit user with ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete user with ID: ${id}`);
  };

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
          <Typography>Name</Typography>
          <Typography>Email</Typography>
          <Typography>Avatar</Typography>
          <Typography>Actions</Typography>
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
            <Avatar src={user.avatar} alt={user.name} />
            <Stack direction="row" spacing={1}>
              <IconButton
                variant="soft"
                color="primary"
                onClick={() => handleEdit(user._id)}
              >
                <EditRoundedIcon />
              </IconButton>
              <IconButton
                variant="soft"
                color="danger"
                onClick={() => handleDelete(user._id)}
              >
                <DeleteRoundedIcon />
              </IconButton>
            </Stack>
          </Box>
        )): ( <Typography>Sem usuários cadastrados</Typography>)} 

        {/* Add New User Button */}
        <Button
          variant="solid"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => console.log('Add new user')}
        >
          Add New User
        </Button>
      </Sheet>
    </Box>
  );
};

export default Users;