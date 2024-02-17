import React from 'react';
import { Container, Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Divider, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import LanguageIcon from '@mui/icons-material/Language';

const BasicSetting = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
        <Typography variant="h5" gutterBottom>
          Basic Settings
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
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText primary="Security" />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary="Language" />
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

export default BasicSetting;
