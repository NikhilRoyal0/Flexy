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
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { baseTheme } from "../../../assets/global/Theme-variable";
import { fetchRechargeData, selectRechargeData, selectRechargeLoading, selectRechargeError, updateRechargeData } from "../../../app/RechargeSlice";

const Lists = ({ filterOption }) => {
    const dispatch = useDispatch();
    const RechargeData = useSelector(selectRechargeData);
    const isLoading = useSelector(selectRechargeLoading);
    const error = useSelector(selectRechargeError);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUserDetails, setSelectedUserDetails] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [updatedStatus, setUpdatedStatus] = useState(null);
    const [rejectedReason, setRejectedReason] = useState('');

    const unixTimeToRealTime = (time) => {
        const date = new Date(time * 1000);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    };



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

    const handleStatusChange = (nestatus) => {
        setSelectedUserDetails((prevDetails) => ({
            ...prevDetails,
            status: nestatus,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const updatedStatus = selectedUserDetails.status;

            await dispatch(updateRechargeData(selectedUserDetails.r_id, updatedStatus));

            dispatch(fetchRechargeData());

            setIsSuccess(true);
            showSnackbar('Status updated successfully!');
            setOpenDialog(false);

        } catch (error) {
            console.error('Error updating status:', error);
        }
    };


    useEffect(() => {
        dispatch(fetchRechargeData());
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
                    Oops! Something went rong.
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
        setUpdatedStatus(userDetails.status);

    };

    const filterDataByStatus = (data, filterOption) => {
        return data.filter((user) => {
            return (
                (filterOption === "accepted" && user.status === 0) ||
                (filterOption === "rejected" && user.status === 1) ||
                (filterOption === "inProgress" && user.status === 2) ||
                !filterOption
            );
        });
    };

    const filteredData = filterDataByStatus(RechargeData, filterOption);
    console.log("filteredData:", filteredData);



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
                            whiteSpace: "norap",
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
                                        Request ID
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="h6">
                                        UTR/
                                        <br />QR
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="h6">
                                        Date Time
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="h6">
                                        Wallet Amount
                                    </Typography>
                                </TableCell>
                                <TableCell >
                                    <Typography color="textSecondary" variant="h6">
                                        Status
                                    </Typography>
                                </TableCell>
                                <TableCell>

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map((user) => (
                                <TableRow key={user.r_id} onClick={() => handleRowClick(user)}
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
                                            {user.r_id}
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
                                                    {user.utr}
                                                </Typography>
                                                <Typography
                                                    color="textSecondary"
                                                    sx={{
                                                        fontSize: "13px",
                                                    }}
                                                >
                                                    {user.qrCode}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            {unixTimeToRealTime(user.dateTime)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="h6">Rs. {user.amount}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Chip
                                                style={{
                                                    backgroundColor: user.status === 0 ? "#4CAF50" : (user.status === 1 ? "#F44336" : "#2196F3"),
                                                    color: "#fff",
                                                    paddingLeft: "4px",
                                                    paddingRight: "4px",
                                                    marginRight: '4px',
                                                }}
                                                size="small"
                                                label={user.status === 0 ? "Accepted" : (user.status === 1 ? "Rejected" : "In Progress")}
                                            />
                                            {user.status === 1 && (
                                                <InfoOutlinedIcon
                                                    style={{
                                                        color: '#F44336',
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle variant="h3">Recharge Details</DialogTitle>
                <span />
                <DialogContent>
                    <form onSubmit={handleSubmit} style={{ margin: '16px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField label="Recharge Request ID" value={selectedUserDetails && selectedUserDetails.r_id} disabled fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="User ID" value={selectedUserDetails && selectedUserDetails.user_id} disabled fullWidth />
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
                                        value={selectedUserDetails && selectedUserDetails.status}
                                        onChange={(e) => {
                                            handleStatusChange(e.target.value);
                                            setRejectedReason('');
                                        }}
                                    >
                                        <MenuItem value="0">Accepted</MenuItem>
                                        <MenuItem value="1">Rejected</MenuItem>
                                        <MenuItem value="2">In Progress</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {(selectedUserDetails && selectedUserDetails.status === "1") && (
                                <Grid item xs={12}>
                                    <TextField
                                        label="Rejected Reason"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => setRejectedReason(e.target.value)}
                                        value={rejectedReason || (selectedUserDetails && selectedUserDetails.info) || ''}
                                    />
                                </Grid>
                            )}
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
