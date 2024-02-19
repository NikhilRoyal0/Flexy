import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, CardContent, Grid, Divider } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
import { selectUsersData } from "../../app/UsersSlice";

const EditUser = () => {
  const { userId } = useParams();
  const usersData = useSelector(selectUsersData);
  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  useEffect(() => {
    console.log("userId:", userId);
    console.log("usersData:", usersData);
  
    const user = usersData.find((user) => user && user.uId === +userId);
  
    if (user) {
      setUserData(user);
    } else {
      setUserData(null);
      console.log("User not found for userId:", userId);
    }
  }, [userId, usersData]);
  

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (!userData) {
    return <div>User not found for userId: {userId}</div>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">View User - {userData.uId}</Typography>
        <br />
        <Divider />
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Name: {userData.userName}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Email: {userData.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Phone: {userData.phone}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Status: {userData.status}</Typography>
          </Grid>
        </Grid>
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
