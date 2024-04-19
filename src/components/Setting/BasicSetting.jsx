import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  TextField,
  Button,
  Box,
  Snackbar,
  CircularProgress,
} from "@mui/material";

import LockIcon from "@mui/icons-material/Lock";
import { changePassword } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const BasicSetting = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
    setError("");
    setSuccess("");
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    if (confirmPassword !== event.target.value) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    if (newPassword !== event.target.value) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await changePassword(newPassword);
      setSuccess("Password changed successfully");
      setOpenSnackbar(true);
      setSnackbarStatus("success");
      setTimeout(() => {
        setOpenSnackbar(false);
        navigate("/");
      }, 3000);
    } catch (error) {
      setError("Failed to change password. Please try again later.");
      setOpenSnackbar(true);
      setSnackbarStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px" }}>
        <Typography variant="h5" gutterBottom>
          Profile Settings
        </Typography>

        <Divider style={{ margin: "10px 0" }} />

        <List>
          <ListItem button onClick={togglePasswordForm}>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText primary="Change Password" />
          </ListItem>
        </List>

        {showPasswordForm && (
          <Box>
            <form onSubmit={handlePasswordChange}>
              <TextField
                id="newPassword"
                label="New Password"
                type="password"
                fullWidth
                margin="normal"
                required
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
              <TextField
                id="confirmPassword"
                label="Confirm New Password"
                type="password"
                fullWidth
                margin="normal"
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={error !== ""}
                helperText={error}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                style={{ marginTop: "10px" }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Change Password"
                )}
              </Button>
            </form>
          </Box>
        )}
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Password changed successfully"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </Container>
  );
};

export default BasicSetting;
