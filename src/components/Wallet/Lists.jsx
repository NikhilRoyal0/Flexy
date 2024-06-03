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
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import { baseTheme } from "../../assets/global/Theme-variable";
import {
  fetchWithdrawalData,
  selectWithdrawalData,
  selectWithdrawalLoading,
  selectWithdrawalError,
  updateWithdrawalData,
} from "../../app/WithdrawalSlice";
import { LoadingButton } from "@mui/lab";

const Lists = ({ filterOption }) => {
  const dispatch = useDispatch();
  const withdrawalData = useSelector(selectWithdrawalData);
  const isLoading = useSelector(selectWithdrawalLoading);
  const error = useSelector(selectWithdrawalError);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    user_id: "",
    amount: "",
    status: "",
  });

  const handleSnackbarClose = (reason) => {
    if (reason === "clickaway") {
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

  const handleStatusChange = (event) => {
    const { name, value } = event.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitLoading(true);

    try {
      const { wr_id } = selectedUserDetails;
      await dispatch(updateWithdrawalData(updatedData, wr_id));

      dispatch(fetchWithdrawalData());

      setIsSuccess(true);
      showSnackbar("Status updated successfully!");
      setOpenDialog(false);
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchWithdrawalData());
  }, [dispatch, filterOption]);

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
    setUpdatedData({
      user_id: userDetails.user_id,
      amount: userDetails.amount,
      status: userDetails.status.toString(),
    });
  };

  const filterDataByStatus = (data, filterOption) => {
    return data.filter((user) => {
      return (
        (filterOption === "accepted" && user.wStatus === 1) ||
        (filterOption === "rejected" && user.wStatus === 2) ||
        (filterOption === "Pending" && user.wStatus === 0) ||
        !filterOption
      );
    });
  };

  const filteredData = filterDataByStatus(withdrawalData, filterOption);

  const unixTimeToRealTime = (time) => {
    const date = new Date(time * 1);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };
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
        </Box>
      ) : (
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
                    User Id
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Account Holder Name
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
                    <br />
                    IFSC Code
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
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Wallet Amount
                  </Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((user) => (
                <TableRow
                  key={user.user_id}
                  onClick={() => handleRowClick(user)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#ADD8E6" },
                  }}
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
                    <Typography color="textSecondary" variant="h6" align="center">
                      {user.accountHolder}
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
                      {unixTimeToRealTime(user.createdDateTime)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      style={{
                        backgroundColor:
                          user.wStatus === 1
                            ? "#4CAF50"
                            : user.wStatus === 0
                              ? "#2196F3"
                              : "#F44336",
                        color: "#fff",
                        paddingLeft: "4px",
                        paddingRight: "4px",
                      }}
                      size="small"
                      label={
                        user.wStatus === 1
                          ? "Accepted"
                          : user.wStatus === 0
                            ? "Pending"
                            : "Rejected"
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">Rs. {user.amount}</Typography>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle variant="h3">Withdrawal Details</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} style={{ margin: "16px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Withdrawal Request ID"
                  required
                  value={selectedUserDetails && selectedUserDetails.wr_id}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="User ID"
                  name="user_id"
                  required
                  value={selectedUserDetails && selectedUserDetails.user_id}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Amount"
                  required
                  value={selectedUserDetails && selectedUserDetails.amount}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="status">Status</InputLabel>
                  <Select
                    label="Status"
                    name="status"
                    required
                    value={updatedData && updatedData.status}
                    onChange={handleStatusChange}
                  >
                    <MenuItem value="1">Accepted</MenuItem>
                    <MenuItem value="2">Rejected</MenuItem>
                    <MenuItem disabled value="0">Pending</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          <LoadingButton
            color="primary"
            type="submit"
            onClick={handleSubmit}
            loading={submitLoading}
          >
            Submit
          </LoadingButton>
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
          message={
            isSuccess
              ? "Status updated successfully!"
              : "Failed to update status!"
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
    </Box>
  );
};

export default Lists;
