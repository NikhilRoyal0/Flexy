import React from 'react';
import { Container, Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Divider, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import LanguageIcon from '@mui/icons-material/Language';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const AppSetting = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
        <Typography variant="h5" gutterBottom>
          App Settings
        </Typography>

        <Divider style={{ margin: '10px 0' }} />

        <List>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="General Settings" />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <Brightness4Icon />
            </ListItemIcon>
            <ListItemText primary="Dark Mode" />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary="Language" />
          </ListItem>
        </List>

        <Divider style={{ margin: '10px 0' }} />

        <List>
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>

        <Divider style={{ margin: '10px 0' }} />

        <IconButton color="primary" aria-label="Save">
          Save
        </IconButton>
      </Paper>
    </Container>
  );
};

export default AppSetting;
