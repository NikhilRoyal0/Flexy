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
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogContent,
  TextField,
  Dialog,
  DialogActions,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import { baseTheme } from "../../assets/global/Theme-variable";
import {
  fetchCouponData,
  selectCouponData,
  selectCouponError,
  selectCouponLoading,
  updateCouponData,
} from "../../app/CouponSlice";
import { LoadingButton } from "@mui/lab";

const Lists = ({ filterOption = "1" }) => {
  const dispatch = useDispatch();
  const CouponData = useSelector(selectCouponData);
  const isLoading = useSelector(selectCouponLoading);
  const error = useSelector(selectCouponError);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [editable, setEditable] = useState(false);
  const [data, setData] = useState({
    title: "",
    code: "",
    amount: "",
    validUpto: "",
    type: "OneTime",
    status: "",
  });
  const [saveLoading, setSaveLoading] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const showSnackbar = (message) => {
    setSnackbarOpen(true);

    setTimeout(() => {
      setSnackbarOpen(false);
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(fetchCouponData());
  }, [dispatch]);

  const editClick = (Coupon) => {
    setSelectedCoupon(Coupon);
    setData({
      title: Coupon.title,
      code: Coupon.code,
      amount: Coupon.amount,
      validUpto: Coupon.validUpto,
      type: Coupon.validUpto,
      status: Coupon.status,
    });
    setOpenDialog(true);
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const toggleEditMode = () => {
    setEditable(false);
    setOpenDialog(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSaveLoading(true); 

    dispatch(updateCouponData(selectedCoupon.couponId, data))
      .then(() => {
        toggleEditMode();
        setIsSuccess(true);
        showSnackbar("Coupon updated successfully!");
        setTimeout(() => {
          setSnackbarOpen(false);
          dispatch(fetchCouponData());
        }, 1000);
      })
      .catch((error) => {
        setIsSuccess(false);
        showSnackbar("Error in updating Coupon. Please try again.");
        console.error("Error in updating Coupon:", error);
      })
      .finally(() => {
        setSaveLoading(false); 
      });
  };

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
    return data.filter((Coupon) => {
      return (
        (filterOption === "1" && Coupon.status == 1) ||
        (filterOption === "0" && Coupon.status == 0) ||
        !filterOption
      );
    });
  };

  const filteredData = filterDataByStatus(CouponData, filterOption);

  const convertUnixToReadable = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); 
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
    return formattedDateTime;
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
          <Typography variant="h3">No Coupon available...</Typography>
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
                    Id
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Title
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Code
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Amount
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Valid Upto
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Status
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Edit
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((Coupon) => (
                <TableRow key={Coupon.couponId}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {Coupon.couponId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {Coupon.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {Coupon.code}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {Coupon.amount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                    {convertUnixToReadable(Coupon.validUpto)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      style={{
                        backgroundColor:
                          Coupon.status == 1 ? "#4CAF50" : "#F44336",
                        color: "#fff",
                        paddingLeft: "4px",
                        paddingRight: "4px",
                      }}
                      size="small"
                      label={Coupon.status == 1 ? "Active" : "Inactive"}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => editClick(Coupon)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            value={data.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={!editable}
          />
          <TextField
            label="Code"
            name="code"
            value={data.code}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={!editable}
          />
          <TextField
            label="Amount"
            name="amount"
            value={data.amount}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={!editable}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={data.status}
              onChange={handleChange}
              label="Status"
              name="status"
              disabled={!editable}
            >
              <MenuItem value={1}>Active</MenuItem>
              <MenuItem value={0}>Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          {!editable ? (
            <Button onClick={handleEdit}>Edit</Button>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={toggleEditMode}
              >
                Cancel
              </Button>
              <LoadingButton
                variant="contained"
                color="success"
                onClick={handleSave}
                loading={saveLoading} 
              >
                Save
              </LoadingButton>
            </>
          )}
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
              ? "Coupon updated successfully!"
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
