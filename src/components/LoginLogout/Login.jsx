import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
  Link,
  ThemeProvider,
  Hidden,
  IconButton,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import loginimg from "../../assets/images/backgrounds/login-bg.png";
import { baseTheme } from "../../assets/global/Theme-variable";
import { useNavigate } from "react-router-dom";
import { login, isAuthenticated } from "../../utils/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
       await login(phone, password);
      if (isAuthenticated()) {
        window.location.replace("/dashboard");

      } else {
        setError("Authentication failed. Please check your credentials.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error("Login Error:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
          minHeight: "100vh",
        }}
      >
        <Card
          sx={{
            width: 800,
            backgroundColor: baseTheme.palette.background.paper,
            color: baseTheme.palette.text.primary,
            borderRadius: baseTheme.shape.borderRadius,
            overflowX: "auto",
            overflowY: "auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            "@media (max-width: 960px)": {
              gridTemplateColumns: "1fr",
              width: "90%",
            },
          }}
        >
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h4" gutterBottom>
                  Welcome Back!
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Welcome Back! Please enter your details
                </Typography>

                <br />
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1" gutterBottom>
                    Phone Number
                  </Typography>
                  <TextField
                    placeholder="Enter your phone number"
                    fullWidth
                    size="small"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    Password
                  </Typography>
                  <TextField
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    size="small"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      ),
                    }}
                  />
                </Box>

                {error && (
                  <Typography variant="body2" color="error" gutterBottom>
                    {error}
                  </Typography>
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox defaultChecked={false} />}
                    label={
                      <Typography variant="body2" sx={{ fontSize: "15px" }}>
                        Remember me
                      </Typography>
                    }
                  />
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Sign in
                </Button>
              </Box>
            </form>
          </CardContent>
          <Hidden xsDown smDown mdDown>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={loginimg}
                alt="Portrait"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  height: 450,
                  objectFit: "cover",
                }}
              />
            </Box>
          </Hidden>
        </Card>
      </Box>
    </ThemeProvider>
  );
}