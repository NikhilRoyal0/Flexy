import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import ErrorImage from '../../assets/images/error-image.png';

export default function NotFound() {
  const [isButtonHovered, setButtonHovered] = useState(false);

  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: 'auto',
        marginTop: '10%',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        },
      }}
    >
      <img
        src={ErrorImage}
        alt="Error Image"
        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
      />

      <CardContent>
        <Typography variant="h4" component="h2" color="error">
          Oops!
        </Typography>
        <Typography variant="h5" component="div" color="textSecondary">
          The page you're looking for doesn't exist.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
          href="/"
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
        >
          {isButtonHovered ? 'Dashboard' : 'Go to Home Page'}
        </Button>
      </CardContent>
    </Card>
  );
}
