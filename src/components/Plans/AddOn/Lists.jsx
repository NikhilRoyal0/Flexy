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
    fetchAddOnData,
    selectAddOnData,
    selectAddOnError,
    selectAddOnLoading,
    updateAddOnData,
} from "../../../app/AddOnSlice";
import LoadingButton from "@mui/lab/LoadingButton";

const Lists = ({ filterOption = "Active" }) => {
    const dispatch = useDispatch();
    const addOnData = useSelector(selectAddOnData);
    const isLoading = useSelector(selectAddOnLoading);
    const error = useSelector(selectAddOnError);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAddOn, setSelectedAddOn] = useState(null);
    const [editable, setEditable] = useState(false);
    const [data, setData] = useState({
        title: "",
        planId: "",
        price: "",
        percentage: "",
        status: "",
        durationInDays: "",
    });
    const [isSaving, setIsSaving] = useState(false); // 1. Add useState for saving state

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
        dispatch(fetchAddOnData());
    }, [dispatch]);

    const editClick = (addOn) => {
        setSelectedAddOn(addOn);
        setData({
            title: addOn.title,
            planId: addOn.planId,
            price: addOn.price,
            percentage: addOn.percentage,
            status: addOn.status,
            durationInDays: addOn.durationInDays,
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
        setIsSaving(true); // 2. Set saving state to true
    
        console.log(data);
        dispatch(updateAddOnData(selectedAddOn.andon_id, data))
            .then(() => {
                toggleEditMode();
                setIsSuccess(true);
                showSnackbar("AddOn updated successfully!");
                setTimeout(() => {
                    setSnackbarOpen(false);
                    dispatch(fetchAddOnData()); 
                }, 1000);
            })
            .catch((error) => {
                setIsSuccess(false);
                showSnackbar("Error in updating AddOn. Please try again.");
                console.error("Error in updating AddOn:", error);
            })
            .finally(() => {
                setIsSaving(false); // 3. Reset saving state to false
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
        return data.filter((addOn) => {
            return (
                (filterOption === "Active" && addOn.status == 1) ||
                (filterOption === "Inactive" && addOn.status == 0) ||
                !filterOption
            );
        });
    };

    const filteredData = filterDataByStatus(addOnData, filterOption);

    return (
        <Box>
            {filteredData.length === 0 ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100px"
                >
                    <Typography variant="h3">No AddOn available...</Typography>
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
                                        Plan ID
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="h6">
                                        Price
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="h6">
                                        Percentage
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="h6">
                                        Duration Days
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
                            {filteredData.map((addOn) => (
                                <TableRow key={addOn.andon_id}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {addOn.andon_id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            {addOn.title}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            {addOn.planId}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            {addOn.price}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            {addOn.percentage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            {addOn.durationInDays}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            style={{
                                                backgroundColor: addOn.status == 1 ? "#4CAF50" : "#F44336",
                                                color: "#fff",
                                                paddingLeft: "4px",
                                                paddingRight: "4px",
                                            }}
                                            size="small"
                                            label={addOn.status == 1 ? "Active" : "Inactive"}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => editClick(addOn)}
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
                            <Button variant="contained" color="primary" onClick={toggleEditMode}>
                                Cancel
                            </Button>
                            <LoadingButton // 2. Replace with LoadingButton
                                variant="contained"
                                color="success"
                                onClick={handleSave}
                                loading={isSaving} // 3. Pass isSaving to loading prop
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
