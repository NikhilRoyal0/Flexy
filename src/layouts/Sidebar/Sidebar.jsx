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
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import loginimg from "../../assets/images/backgrounds/login-bg.png";
import { baseTheme } from "../../assets/global/Theme-variable";
import { useNavigate } from "react-router-dom";
import { login, isAuthenticated } from "../../utils/auth"; // Import isAuthenticated function

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const isAuthenticated = login(email, password);
    if (isAuthenticated) {
      navigate("/");
    } else {
      console.log("Authentication failed. Please check your credentials.");
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
                    Email
                  </Typography>
                  <TextField
                    placeholder="Enter your email"
                    fullWidth
                    size="small"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    Password
                  </Typography>
                  <TextField
                    placeholder="Enter your password"
                    type="password"
                    fullWidth
                    size="small"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                  />
                </Box>

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
                  <Link href="#" variant="body2">
                    Forgot Password?
                  </Link>
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
