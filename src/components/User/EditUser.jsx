import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectUsersData, fetchUsersData } from "../../app/UsersSlice";

const EditUsers = () => {
  const dispatch = useDispatch();
  const { userId: usersIdParam } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [user, setUserData] = useState({
    uId: "",
    userName: "",
    email: "",
    phone: "",
    walletAmount: "",
    status: "",
  });

  const [loading, setLoading] = useState(true);

  const userData = useSelector(selectUsersData);

  const fetusersdata = async () => {
    try {
      const uId = parseInt(usersIdParam);
      const selecteduser = userData.find((ur) => ur.uId === uId);
      setUserData(selecteduser);
      setLoading(false);
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

  useEffect(() => {
    if (userData.length === 0) {
      dispatch(fetchUsersData());
    } else {
      fetusersdata();
    }
  }, [usersIdParam, dispatch, userData]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }


  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Edit users - {user && user.uId}</Typography>
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
                value={user && user.uId}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={user && user.userName}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Info"
                variant="outlined"
                fullWidth
                value={user && user.email}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={user && user.phone}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Wallet Amount"
                variant="outlined"
                fullWidth
                value={user && `${user.walletAmount}k`}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" required sx={{ mb: 2 }}>
                <InputLabel htmlFor="isPublished">isPublished</InputLabel>
                <Select
                  label="Status"
                  id="Status"
                  name="status"
                  value={user && user.status}
                  disabled={!editMode}
                  variant="outlined"
                  fullWidth
                >
                  <MenuItem value="0">Active</MenuItem>
                  <MenuItem value="1">Inactive</MenuItem>
                  <MenuItem value="2">Progress</MenuItem>
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
              <Button variant="contained" sx={{ ml: 1 }} color="error" onClick={toggleEditMode}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={toggleEditMode}>
              Edit
            </Button>
          )}
        </form>

      </CardContent>
    </Card>
  );
};

export default EditUsers;
