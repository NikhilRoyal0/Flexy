import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

import backgroundImage from '../../assets/images/backgrounds/login.jpg';
import uiBackgroundImage from '../../assets/images/backgrounds/ui-bg.avif';



export default function Register() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        backgroundImage: `url(${uiBackgroundImage})`,
        backgroundSize: 'cover',
        height: '100vh',
        margin: '0',
        padding: '0',
      }}
    >
      <Grid item>
        <Card
          style={{
            width: '100%',
            maxHeight: '520px',
            maxWidth: '500px',
            padding: '15px',
            boxSizing: 'border-box',
            textAlign: 'center',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            overflow: 'auto',
            scrollbarWidth: 'none',
            overflowY: 'scroll',
          }}
        >

          <CardContent>
            <Typography variant="h4" gutterBottom style={{ fontSize: '24px', color: '#ffffff' }}>
              Register
            </Typography>

            <form>
              <TextField
                label="First Name"
                fullWidth
                margin="normal"
                variant="outlined"
                id="firstName"
                name="firstName"
                InputProps={{ style: { color: 'black' } }}
                InputLabelProps={{ style: { color: 'black' } }}
              />

              <TextField
                label="Last Name"
                fullWidth
                margin="normal"
                variant="outlined"
                id="lastName"
                name="lastName"
                InputProps={{ style: { color: 'black' } }}
                InputLabelProps={{ style: { color: 'black' } }}
              />

              <TextField
                label="Mobile or Email"
                fullWidth
                margin="normal"
                variant="outlined"
                id="mobileOrEmail"
                name="mobileOrEmail"
                InputProps={{ style: { color: 'black' } }}
                InputLabelProps={{ style: { color: 'black' } }}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                id="password"
                name="password"
                InputProps={{ style: { color: 'black' } }}
                InputLabelProps={{ style: { color: 'black' } }}
              />

              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                id="confirmPassword"
                name="confirmPassword"
                InputProps={{ style: { color: 'black' } }}
                InputLabelProps={{ style: { color: 'black' } }}
              />

              <Button variant="contained" color="primary" fullWidth type="submit" style={{ marginBottom: '10px', marginTop: '10px' }}>
                Register
              </Button>

              <Typography variant="body2" style={{ textAlign: 'center', marginBottom: '15px', position: 'relative', color: '#000000' }}>
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    padding: '8px',
                    borderRadius: '50%',
                    zIndex: '1',
                    position: 'relative',
                  }}
                >
                  or
                </span>

                <span
                  style={{
                    display: 'inline-block',
                    border: '1px solid #ffffff',
                    width: '100%',
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    left: '0',
                    zIndex: '0',
                  }}
                ></span>
              </Typography>

              <Button variant="contained" color="inherit" fullWidth type="button">
                Sign Up with Google
              </Button>

              <div style={{ marginTop: '10px' }}>
                <Typography>
                  Already have an account? <Link to="/login" style={{ color: '#ffffff' }}>Login</Link>
                </Typography>
              </div>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

