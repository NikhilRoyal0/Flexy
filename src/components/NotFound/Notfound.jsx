import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Errorimage from '../../assets/images/browser/firefox-logo.png'

export default function NotFound() {
  return (
    <Card
      style={{
        maxWidth: 400,
        margin: 'auto',
        marginTop: '10%',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f0f0f0', 
      }}
    >
      <img
        src={Errorimage} 
        alt="Error Image"
        style={{ width: '100%', height: 'auto' }}
      />

      <CardContent>
        <Typography variant="h4" component="h2" color="error">
          Oops!
        </Typography>
        <Typography variant="h5" component="div" color="textSecondary">
          The page you're looking for doesn't exist.
        </Typography>
      </CardContent>
    </Card>
  );
}
