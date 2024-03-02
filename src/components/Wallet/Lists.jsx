import React, { useEffect } from "react";
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
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { fetchWithdrawalData, selectWithdrawalData, selectWithdrawalLoading, selectWithdrawalError } from "../../app/WithdrawalSlice";

const Lists = ({ filterOption }) => {
  const dispatch = useDispatch();
  const withdrawalData = useSelector(selectWithdrawalData);
  const isLoading = useSelector(selectWithdrawalLoading);
  const error = useSelector(selectWithdrawalError);

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

  const filterDataByStatus = (data, filterOption) => {
    return data.filter((user) => {
      return (
        (filterOption === "accepted" && user.status === 0) ||
        (filterOption === "rejected" && user.status === 1) ||
        (filterOption === "inProgress" && user.status === 2) ||
        !filterOption || filterOption === "all"
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
              <TableRow>
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
                <TableCell align="right">
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
                <TableRow key={user.user_id}>
                  <TableCell>
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
                        backgroundColor: user.status === 0 ? "#4CAF50" : (user.status === 1 ? "#F44336" : "#2196F3"),
                        color: "#fff",
                        paddingLeft: "4px",
                        paddingRight: "4px",
                      }}
                      size="small"
                      label={user.status === 0 ? "Accepted" : (user.status === 1 ? "Rejected" : "In Progress")}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{user.amount}k</Typography>
                  </TableCell>
                  <TableCell>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Box>
  );
};

export default Lists;
