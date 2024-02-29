import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import backgroundImage from '../../assets/images/backgrounds/login.jpg';
import uiBackgroundImage from '../../assets/images/backgrounds/ui-bg.avif';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      navigate('/');
    } else {
      console.log('Invalid credentials');
      alert("Username and password not matched");
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        backgroundImage: `url(${uiBackgroundImage})`,
        backgroundSize: 'cover',
        height: '100vh',
        
      }}
    >
      <Grid item>
        <Card
          style={{
            width: '100%',
            maxWidth: '500px',
            padding: '25px',
            boxSizing: 'border-box',
            textAlign: 'center',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom style={{ fontSize: '24px', color: '#ffffff' }}>
              Login
            </Typography>

            <form>
              <TextField
                label="Username"
                fullWidth
                margin="normal"
                variant="outlined"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                variant="outlined"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleTogglePasswordVisibility} edge="end" style={{ color: '#ffffff' }}>
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  ),
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Remember me"
                />

                <Link to="#" style={{ color: '#ffffff' }}>
                  Forgot password?
                </Link>
              </div>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="button"
                onClick={handleLogin}
                style={{ marginBottom: '10px', marginTop: '10px' }}
              >
                Login
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
                Continue with Google
              </Button>

              <div style={{ marginTop: '10px' }}>
                <Typography>
                  Don't have an account? <Link to="/register-now" style={{ color: '#ffffff' }}>Register now</Link>
                </Typography>
              </div>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
