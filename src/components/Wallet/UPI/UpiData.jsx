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
  Switch,
  Snackbar,
  SnackbarContent,
  IconButton,
  Chip,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import { baseTheme } from "../../../assets/global/Theme-variable";
import {
  fetchUPIData,
  selectUPIData,
  selectUPILoading,
  selectUPIError,
  updateUPIData,
} from "../../../app/UpiSlice";

const Lists = ({ filterOption = "Active" }) => {
  const dispatch = useDispatch();
  const UPIData = useSelector(selectUPIData);
  const isLoading = useSelector(selectUPILoading);
  const error = useSelector(selectUPIError);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [SwitchState, setSwitchState] = useState(true);


  const handleSnackbarClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (!isSuccess) {
      setSnackbarOpen(false);
    }
  };

  const handleToggleChange = async (user, e) => {
    const updatedStatus = user.status == 0 ? 1 : user.status == 1 ? 0 : user.status;
    setSwitchState(e.target.checked)

    try {
      await dispatch(updateUPIData(user.upi_id, updatedStatus));

      dispatch(fetchUPIData());

      setIsSuccess(true);
      showSnackbar("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      setIsSuccess(false);
      showSnackbar("Failed to update status!");
    }
  };



  const showSnackbar = (message) => {
    setSnackbarOpen(true);

    setTimeout(() => {
      setSnackbarOpen(false);
    }, 3000);
  };


  useEffect(() => {
    dispatch(fetchUPIData());
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
        (filterOption == "Active" && user.status == 0) ||
        (filterOption == "Inactive" && user.status == 1) ||
        !filterOption
      );
    });
  };

  const filteredData = filterDataByStatus(UPIData, filterOption);

  return (
    <Box>
      {filteredData.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100px"
        >
          <Typography variant="h3">No UPI available...</Typography>
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
                  <Typography color="textSecondary" variant="h6">
                    Status
                  </Typography>
                </TableCell>
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
                    UPI ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    UPI Hash
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((user) => (
                <TableRow key={user.upi_id}>
                  <TableCell>
                    <Switch
                      checked={SwitchState}
                      name="toggleStatus"
                      onChange={(e) => handleToggleChange(user, e)}
                      sx={{
                        "& .MuiSwitch-thumb": {
                          color: SwitchState ? baseTheme.palette.success.main : baseTheme.palette.danger.main,
                        },
                        "& .MuiSwitch-track": {
                          backgroundColor: SwitchState ? baseTheme.palette.success.main : baseTheme.palette.danger.main,
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {user.upi_id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {user.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {user.upiId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {user.upiHash}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

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