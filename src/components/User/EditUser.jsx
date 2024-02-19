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
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
import { selectUsersData } from "../../app/UsersSlice";

const EditUser = () => {
  const { userId: userIdParam } = useParams();
  const usersData = useSelector(selectUsersData);
  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(false); // Track edit mode
  const itemsPerPage = 1;

  useEffect(() => {
    const userId = parseInt(userIdParam);
    const user = usersData.find((user) => user && user.uId === userId);

    if (user) {
      setUserData(user);
    } else {
      setUserData(null);
    }
  }, [userIdParam, usersData]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    // Add logic here to save changes (e.g., dispatch an action to update the Redux state)
    setEditMode(false); // Exit edit mode after saving
  };

  const userIndex = (currentPage - 1) * itemsPerPage;
  const currentUser = usersData[userIndex];

  if (!currentUser) {
    return <div>User not found for userId: {userIdParam}</div>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Edit User - {currentUser.uId}</Typography>
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
                value={currentUser.userName}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Assigned To"
                variant="outlined"
                fullWidth
                value={currentUser.email}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Mobile No"
                variant="outlined"
                fullWidth
                value={currentUser.phone}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Wallet"
                variant="outlined"
                fullWidth
                value={`${currentUser.walletAmount}k`}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Status"
                variant="outlined"
                fullWidth
                value={currentUser.status === 1 ? "Active" : "Inactive"}
                disabled={!editMode}
              />
            </Grid>
            {/* Add other form fields as needed */}
          </Grid>
          <br />
          <Divider />
          <br />
          {editMode ? (
            <>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="contained" color="secondary" onClick={toggleEditMode}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={toggleEditMode}>
              Edit
            </Button>
          )}
        </form>
        <br />
        <Pagination
          count={Math.ceil(usersData.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </CardContent>
    </Card>
  );
};

export default EditUser;
