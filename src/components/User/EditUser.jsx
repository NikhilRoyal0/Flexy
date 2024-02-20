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
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectUsersData } from "../../app/UsersSlice";

  const EditUser = () => {
    const { userId: userIdParam } = useParams();
    const [editMode, setEditMode] = useState(false);
    const [user, setUserData] = useState(null);
    const usersData = useSelector(selectUsersData);
  
    const fetchUserData = async () => {
      try {
        console.log('Processed data:', usersData);
  
        const userId = parseInt(userIdParam);
        const selectedUser = usersData.find((ur) => ur.uId === userId);
        setUserData(selectedUser);
      } catch (error) {
        console.error('Error processing data:', error);
      }
    };
  
    useEffect(() => {
      fetchUserData();
    }, [userIdParam, usersData]); 
  
    const toggleEditMode = () => {
      setEditMode(!editMode);
    };
  
    const handleSave = () => {
      setEditMode(false);
    };
  

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Edit User - {user && user.uId}</Typography>
        <br />
        <Divider />
        <br />
        <form>
          <Grid container spacing={2}>
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
                label="Assigned To"
                variant="outlined"
                fullWidth
                value={user && user.email}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Mobile No"
                variant="outlined"
                fullWidth
                value={user && user.phone}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Wallet"
                variant="outlined"
                fullWidth
                value={`${user && user.walletAmount}k`}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Status"
                variant="outlined"
                fullWidth
                value={user && user.status === 1 ? "Active" : "Inactive"}
                disabled={!editMode}
              />
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
              <Button variant="contained" color="error" onClick={toggleEditMode}>
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

export default EditUser;
