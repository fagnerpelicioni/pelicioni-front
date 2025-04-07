import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import logo from '../assets/logo_new.png';

import ColorSchemeToggle from './ColorSchemeToggle';
import { closeSidebar } from '../utils';
import { UserLink } from '../Interfaces'; // Adjust the import path as necessary

const Toggler = ({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) => {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={[
          {
            display: 'grid',
            transition: '0.2s ease',
            '& > *': {
              overflow: 'hidden',
            },
          },
          open ? { gridTemplateRows: '1fr' } : { gridTemplateRows: '0fr' },
        ]}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

const handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.href = '/login'; // Redirect to login page
}

const Sidebar = ({ userData, onItemClick }: { userData: any; onItemClick: (item: UserLink) => void }) => {
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <img src={logo} alt="Logo" style={{ height: 50 }} />
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton onClick={() => onItemClick({ name: 'Home', link: '/' })}>
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Home</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          {userData.links.map((link: any, index: number) => (
            <ListItem key={index}>
              <ListItemButton onClick={() => onItemClick(link)}>
                <DashboardRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">{link.name}</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <AssignmentRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Exemplo sublinks</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={[
                      open
                        ? {
                            transform: 'rotate(180deg)',
                          }
                        : {
                            transform: 'none',
                          },
                    ]}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton>Link 1</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Link 2</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Link 3</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Link 4</ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
        </List>
        <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton>
              <SupportRoundedIcon />
              Suporte
            </ListItemButton>
          </ListItem>
          {userData.role === 'admin' && (
          <ListItem>
            <ListItemButton onClick={() => onItemClick({ name: 'Users', link: '/' })}>
              <GroupRoundedIcon />
              Usuários
            </ListItemButton>
          </ListItem>
          )}
          {userData.role === 'admin' && (
            <ListItem nested>
              <Toggler
                renderToggle={({ open, setOpen }) => (
                  <ListItemButton onClick={() => setOpen(!open)}>
                    <SettingsRoundedIcon />
                    <ListItemContent>
                      <Typography level="title-sm">Configurações</Typography>
                    </ListItemContent>
                    <KeyboardArrowDownIcon
                      sx={[
                        open
                          ? {
                              transform: 'rotate(180deg)',
                            }
                          : {
                              transform: 'none',
                            },
                      ]}
                    />
                  </ListItemButton>
                )}
              >
                <List sx={{ gap: 0.5 }}>
                  <ListItem sx={{ mt: 0.5 }}>
                    <ListItemButton onClick={() => onItemClick({ name: 'Create User', link: '/' })}>Criar usuários</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton onClick={() => onItemClick({ name: 'Create Link', link: '/' })}>Criar link</ListItemButton>
                  </ListItem>
                </List>
              </Toggler>
            </ListItem>
          )}
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar
          variant="outlined"
          size="sm"
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{userData.name}</Typography>
          <Typography level="body-xs">{userData.email}</Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral" onClick={() => handleLogout()}>
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}

export default Sidebar;