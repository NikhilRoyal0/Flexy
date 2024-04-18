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
  Snackbar,
  SnackbarContent,
  IconButton,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import { baseTheme } from "../../../assets/global/Theme-variable";
import {
  fetchNotificationData,
  selectNotificationData,
  selectNotificationLoading,
  selectNotificationError,
} from "../../../app/NotificationSlice";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Lists = () => {
  const dispatch = useDispatch();
  const notificationData = useSelector(selectNotificationData);
  const isLoading = useSelector(selectNotificationLoading);
  const error = useSelector(selectNotificationError);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSnackbarClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    dispatch(fetchNotificationData());
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

  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedData = notificationData.slice().sort((a, b) => {
    if (sortOrder === "asc") {
      return a.notificationId - b.notificationId;
    } else {
      return b.notificationId - a.notificationId;
    }
  });

  return (
    <Box>
      {notificationData.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100px"
        >
          <Typography variant="h3">No Notification available...</Typography>
        </Box>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <Table
            aria-label="simple table"
            sx={{
              mt: 2,
              whiteSpace: "",
              overflow: "auto",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Notification Id
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textDanger" variant="h6">
                    Title
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Info
                  </Typography>
                </TableCell>
                <IconButton size="lg" onClick={handleSortToggle}>
                  {sortOrder === "asc" ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  )}
                </IconButton>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((notification) => (
                <TableRow key={notification.notificationId}>
                  <TableCell>
                    <Typography
                    ml={5}
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {notification.notificationId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {notification.notificationTitle}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {notification.info}
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
