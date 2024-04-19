import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  TextField,
  Button,
  Snackbar,
  SnackbarContent,
  IconButton,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUsersData,
  fetchUsersData,
  updateUserData,
} from "../../app/UsersSlice";
import { baseTheme } from "../../assets/global/Theme-variable";

const EditUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId: userIdParam } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const userData = useSelector(selectUsersData);

  const [data, setData] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
    walletAmount: "",
    status: "",
    walletFreeze: "",
  });

  useEffect(() => {
    if (userData.length === 0) {
      dispatch(fetchUsersData());
    } else {
      const userId = parseInt(userIdParam);
      const selectedUser = userData.find((user) => user.uId === userId);
      if (selectedUser) {
        setData({ ...selectedUser, walletFreeze: !!selectedUser.walletFreeze });
      }
      setLoading(false);
    }
  }, [dispatch, userData, userIdParam]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      console.log("savedata", data);
      dispatch(updateUserData(data.uId, data));
      setIsSuccess(true);
      showSnackbar("User updated successfully!");
      toggleEditMode();
      setTimeout(() => {
        navigate("../user/user-list");
      }, 1000);
    } catch (error) {
      setIsSuccess(false);
      showSnackbar("Error in updating user. Please try again.");
      console.error("Error in updating user:", error);
    }
  };

  const showSnackbar = (message) => {
    setSnackbarOpen(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Edit users - {data && data.uId}</Typography>
        <br />
        <Divider />
        <br />
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="User Id"
                variant="outlined"
                fullWidth
                value={data && data.uId}
                disabled={!editMode}
                onChange={(e) => setData({ ...data, uId: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={data && data.userName}
                disabled={!editMode}
                onChange={(e) => setData({ ...data, userName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={data && data.email}
                disabled={!editMode}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={data && data.phone}
                disabled={!editMode}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                value={data && data.password}
                disabled={!editMode}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Wallet Amount"
                variant="outlined"
                fullWidth
                value={data && data.walletAmount}
                disabled={!editMode}
                onChange={(e) =>
                  setData({ ...data, walletAmount: e.target.value })
                }
                InputProps={{
                  startAdornment: <Typography>₹</Typography>,
                  endAdornment: (
                    <FormControlLabel
                      control={
                        <Checkbox
                        checked={(data.walletFreeze) == 1} 
                        onChange={(e) =>
                            setData({
                              ...data,
                              walletFreeze: e.target.checked ? 1 : 0,
                            })
                          }
                          disabled={!editMode}
                        />
                      }
                      label="Wallet Freeze"
                    />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel htmlFor="status">Status</InputLabel>
                <Select
                  label="Status"
                  id="status"
                  name="status"
                  value={data && data.status}
                  disabled={!editMode}
                  onChange={(e) => setData({ ...data, status: e.target.value })}
                >
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="0">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br />
          <Divider />
          <br />
          {editMode ? (
            <>
              <Button variant="contained" color="success" onClick={handleSave}>
                Save
              </Button>
              <Button
                variant="contained"
                sx={{ ml: 1 }}
                color="error"
                onClick={toggleEditMode}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={toggleEditMode}
            >
              Edit
            </Button>
          )}
        </form>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
        >
          <SnackbarContent
            message={
              isSuccess
                ? "User updated successfully!"
                : "Failed to update user. Please try again."
            }
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackbarClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
            sx={{
              backgroundColor: isSuccess
                ? baseTheme.palette.success.main
                : baseTheme.palette.error.main,
              color: isSuccess ? "#fff" : undefined,
            }}
          />
        </Snackbar>
      </CardContent>
    </Card>
  );
};

export default EditUsers;
