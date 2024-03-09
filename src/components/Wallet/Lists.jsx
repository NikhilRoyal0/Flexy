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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Snackbar,
  SnackbarContent,
  IconButton,
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from "@mui/icons-material/Close";
import { baseTheme } from "../../assets/global/Theme-variable";
import { fetchWithdrawalData, selectWithdrawalData, selectWithdrawalLoading, selectWithdrawalError, updateWithdrawalData } from "../../app/WithdrawalSlice";

const Lists = ({ filterOption }) => {
  const dispatch = useDispatch();
  const withdrawalData = useSelector(selectWithdrawalData);
  const isLoading = useSelector(selectWithdrawalLoading);
  const error = useSelector(selectWithdrawalError);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState(null);


  const handleSnackbarClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if (!isSuccess) {
      setSnackbarOpen(false);
    }
  };

  const showSnackbar = (message) => {
    setSnackbarOpen(true);

    setTimeout(() => {
      setSnackbarOpen(false);
    }, 3000);
  };

  const handleStatusChange = (newStatus) => {
    setSelectedUserDetails((prevDetails) => ({
      ...prevDetails,
      wStatus: newStatus,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedStatus = selectedUserDetails.wStatus;

      await dispatch(updateWithdrawalData(selectedUserDetails.wr_id, updatedStatus));

      dispatch(fetchWithdrawalData());

      setIsSuccess(true);
      showSnackbar('Status updated successfully!');
      setOpenDialog(false);

    } catch (error) {
      console.error('Error updating status:', error);
    }
  };


  useEffect(() => {
    dispatch(fetchWithdrawalData());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="primary" size={120} thickness={4} />
      </div>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <Typography variant="h4" color="error" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center">
          {error}
        </Typography>
      </Box>
    );
  }

  const handleRowClick = (userDetails) => {
    setSelectedUserDetails(userDetails);
    setOpenDialog(true);
    setUpdatedStatus(userDetails.wStatus);

  };

  const filterDataByStatus = (data, filterOption) => {
    return data.filter((user) => {
      return (
        (filterOption === "accepted" && user.wStatus === 0) ||
        (filterOption === "rejected" && user.wStatus === 1) ||
        (filterOption === "inProgress" && user.wStatus === 2) ||
        !filterOption
      );
    });
  };

  const filteredData = filterDataByStatus(withdrawalData, filterOption);


  return (
    <Box>
      {filteredData.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100px"
        >
          <Typography variant="h3">No request available...</Typography>
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
              <TableRow >
                <TableCell>
                  <Typography color="textDanger" variant="h6">
                    User Id
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Account Number
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Bank Name/
                    <br />IFSC Code
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    UPI ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Created Date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Status
                  </Typography>
                </TableCell>
                <TableCell >
                  <Typography color="textSecondary" variant="h6">
                    Wallet Amount
                  </Typography>
                </TableCell>
                <TableCell>

                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((user) => (
                <TableRow key={user.user_id} onClick={() => handleRowClick(user)}
                  sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#ADD8E6' } }}
                >
                  <TableCell align="center">
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {user.user_id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {user.accountNumber}
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
                          {user.bankName}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          sx={{
                            fontSize: "13px",
                          }}
                        >
                          {user.ifscCode}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {user.upiId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {user.createdDateTime}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      style={{
                        backgroundColor: user.wStatus === 0 ? "#4CAF50" : (user.wStatus === 1 ? "#F44336" : "#2196F3"),
                        color: "#fff",
                        paddingLeft: "4px",
                        paddingRight: "4px",
                      }}
                      size="small"
                      label={user.wStatus === 0 ? "Accepted" : (user.wStatus === 1 ? "Rejected" : "In Progress")}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">Rs. {user.amount}</Typography>
                  </TableCell>
                  <TableCell>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle variant="h3">Withdrawal Details</DialogTitle>
        <span />
        <DialogContent>
          <form onSubmit={handleSubmit} style={{ margin: '16px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Withdrawal Request ID" value={selectedUserDetails && selectedUserDetails.wr_id} disabled fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="User ID" value={selectedUserDetails && selectedUserDetails.userId} disabled fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Amount" value={selectedUserDetails && selectedUserDetails.amount} disabled fullWidth />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="status">Status</InputLabel>
                  <Select
                    label="Status"
                    name="status"
                    value={selectedUserDetails && selectedUserDetails.wStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}
                  >
                    <MenuItem value="0">Accepted</MenuItem>
                    <MenuItem value="1">Rejected</MenuItem>
                    <MenuItem value="2">In Progress</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          <Button color="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <SnackbarContent
          message={isSuccess ? 'Status updated successfully!' : 'Failed to update status!'}
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
            color: isSuccess ? '#fff' : undefined,
          }}
        />
      </Snackbar>
    </Box>
  );
};

export default Lists;
