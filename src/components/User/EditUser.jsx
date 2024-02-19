import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, CardContent, Grid, Divider } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
import { selectUsersData } from "../../app/UsersSlice";

const EditUser = () => {
  const { userId: userIdParam } = useParams();
  const usersData = useSelector(selectUsersData);
  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  useEffect(() => {
    const userId = parseInt(userIdParam); // Convert userId to a number
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

  const userIndex = (currentPage - 1) * itemsPerPage;
  const currentUser = usersData[userIndex];

  if (!currentUser) {
    return <div>User not found for userId: {userIdParam}</div>;
  }

  return (
    <Card>
    <CardContent>
      <Typography variant="h4">View User - {currentUser.uId}</Typography>
      <br />
      <Divider />
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">Name: {currentUser.userName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">Assigned To: {currentUser.assignedTo}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">Mobile No: {currentUser.phone}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">Wallet: ${currentUser.walletAmount}k</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">Status: {currentUser.status === 1 ? "Active" : "Inactive"}</Typography>
        </Grid>
        {/* Add other user details as needed */}
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
