import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Typography,
  Box,
  Chip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { fetchUsersData, selectUsersData, selectUsersLoading, selectUsersError } from "../../app/UsersSlice";



const Lists = ({ searchText, setSearchText }) => {
  const dispatch = useDispatch();
  const usersData = useSelector(selectUsersData);
  const isLoading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [UserToDelete, setUserToDelete] = useState(null);

  const navigate = useNavigate();

  const editClick = (user) => {
    navigate(`edit-user/${user.uId}`);
  };

  useEffect(() => {
    dispatch(fetchUsersData());
  }, [dispatch]);

  const filteredUsersData = usersData.filter((user) =>
    user.userName.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchText.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const deleteClick = (user) => {
    setUserToDelete(user);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (UserToDelete) {
      dispatch(deleteUserData(userToDelete.userId)).then(() => {
        setDeleteConfirmationOpen(false);
        setUserToDelete(null);
        dispatch(fetchUsersData());
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmationOpen(false);
    setUserToDelete(null);
  };


  return (
    <Box>
      {filteredUsersData.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100px"
        >
          <Typography variant="h3">No user available...</Typography>
        </Box>) : (
        <div style={{ overflowX: "auto" }}>
          <Table
            aria-label="simple table"
            sx={{
              mt: 3,
              whiteSpace: "nowrap",
              overflow: "auto",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography color="textDanger" variant="h6">
                    Id
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Assigned To:
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Mobile no
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Priority
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography color="textSecondary" variant="h6">
                    Wallet
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Edit / Delete
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsersData.map((user) => (
                <TableRow key={user.uId}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {user.uId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "600",
                          }}
                        >
                          {user.userName}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          sx={{
                            fontSize: "13px",
                          }}
                        >
                          {user.referCode}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {user.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {user.phone}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        pl: "4px",
                        pr: "4px",
                        backgroundColor: user.status === 1 ? "#4CAF50" : "#F44336",
                        color: "#fff",
                      }}
                      size="small"
                      label={user.status === 1 ? "Active" : "Inactive"}
                    ></Chip>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6">${user.walletAmount}k</Typography>
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" onClick={() => editClick(user)}>
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteClick(user)}
                      sx={{ ml: 1 }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Dialog
            open={deleteConfirmationOpen}
            onClose={handleDeleteCancel}
          >
            <DialogTitle>Delete Confirmation</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this Banner?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteCancel} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDeleteConfirm} color="error" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </Box>
  );
};

export default Lists;
