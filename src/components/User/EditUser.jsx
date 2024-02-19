import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Box, TextField, Button, Card, CardContent, Grid, Divider } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
import { selectUsersData } from "../../app/UsersSlice";

const EditUser = () => {
  const { userId } = useParams();
  const usersData = useSelector(selectUsersData);
  const [userData, setUserData] = useState("");
  const [editableUserData, setEditableUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  useEffect(() => {
    const user = usersData.find((user) => user && user.uId === (userId, user.uId));

    if (!user) {
      setUserData(null);
      setEditableUserData(null);
    } else {
      setUserData(user);
      setEditableUserData(user);
    }

    setIsLoading(false);
  }, [userId, usersData]);

  const handleEnableEditing = () => {
    setIsEditing(!isEditing);

    if (!isEditing) {
      setEditableUserData(userData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("Hello data", userData);

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Edit User - {userData?.uId}</Typography>
        <br />
        <Divider />
        <br />
        <form>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="userName"
                value={editableUserData?.userName || ""}
                fullWidth
                disabled={!isEditing}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                value={editableUserData?.email || ""}
                fullWidth
                disabled={!isEditing}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                name="phone"
                value={editableUserData?.phone || ""}
                fullWidth
                disabled={!isEditing}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Status"
                name="status"
                value={editableUserData?.status || ""}
                fullWidth
                disabled={!isEditing}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <br />
          <Button variant="outlined" color="primary" onClick={handleEnableEditing}>
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={!isEditing}>
            Save Changes
          </Button>
        </form>
        <br />
        <Divider />
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
