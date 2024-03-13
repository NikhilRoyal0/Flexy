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
import { baseTheme } from "../../../assets/global/Theme-variable";
import {
    fetchUpComingData,
    selectUpComingData,
    selectUpComingError,
    selectUpComingLoading,
    updateUpComingData,
} from "../../../app/UpComingSlice";

const Lists = ({ filterOption = "Active" }) => {
    const dispatch = useDispatch();
    const UpComingData = useSelector(selectUpComingData);
    const isLoading = useSelector(selectUpComingLoading);
    const error = useSelector(selectUpComingError);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUpComing, setSelectedUpComing] = useState(null);
    const [editable, setEditable] = useState(false);
    const [data, setData] = useState({
        title: "",
        dateTime: "",
        claimPrecentage: "",
        status: "",
        receiptNo: "",
    });

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
        dispatch(fetchUpComingData());
    }, [dispatch]);

    const editClick = (UpComing) => {
        setSelectedUpComing(UpComing);
        setData({
            title: UpComing.title,
            dateTime: UpComing.dateTime,
            claimPrecentage: UpComing.claimPrecentage,
            status: UpComing.status,
            receiptNo: UpComing.receiptNo,
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
console.log("before",data)
        dispatch(updateUpComingData(selectedUpComing.wi, data))
            .then(() => {
                toggleEditMode();
                setIsSuccess(true);
                showSnackbar("UpComing updated successfully!");
                setTimeout(() => {
                    setSnackbarOpen(false);
                    dispatch(fetchUpComingData());
                }, 1000);
            })
            .catch((error) => {
                setIsSuccess(false);
                showSnackbar("Error in updating UpComing. Please try again.");
                console.error("Error in updating UpComing:", error);
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
        return data.filter((UpComing) => {
            return (
                (filterOption === "Active" && UpComing.status == 0) ||
                (filterOption === "Inactive" && UpComing.status == 1) ||
                !filterOption
            );
        });
    };

    const filteredData = filterDataByStatus(UpComingData, filterOption);

    return (
        <Box>
            {filteredData.length === 0 ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100px"
                >
                    <Typography variant="h3">No UpComing available...</Typography>
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
                                        Receipt No.
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="h6">
                                        Date Time
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="h6">
                                        Claim Percentage
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
                            {filteredData.map((UpComing) => (
                                <TableRow key={UpComing.wi}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {UpComing.wi}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            {UpComing.title}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            {UpComing.receiptNo}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            {UpComing.dateTime}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            {UpComing.claimPrecentage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            style={{
                                                backgroundColor: UpComing.status == 0 ? "#4CAF50" : "#F44336",
                                                color: "#fff",
                                                paddingLeft: "4px",
                                                paddingRight: "4px",
                                            }}
                                            size="small"
                                            label={UpComing.status == 0 ? "Active" : "Inactive"}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => editClick(UpComing)}
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
                        fullWidth
                        margin="normal"
                        disabled
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
                            <MenuItem value={0}>Active</MenuItem>
                            <MenuItem value={1}>Inactive</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    {!editable ? (
                        <Button onClick={handleEdit}>Edit</Button>
                    ) : (
                        <>
                            <Button variant="contained" color="primary" onClick={toggleEditMode}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="success" onClick={handleSave}>
                                Save
                            </Button>
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
