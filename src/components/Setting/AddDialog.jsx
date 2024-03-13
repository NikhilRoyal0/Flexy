import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardActionArea,
    Divider,
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Popover,
    Snackbar,
    SnackbarContent,
    IconButton,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from 'react-redux'
import { AddData } from "../../app/DialogSlice";
import { useNavigate } from "react-router-dom";
import { baseTheme } from "../../assets/global/Theme-variable";



const AddDialog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [popoverAnchor, setPopoverAnchor] = React.useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);


    const [formData, setFormData] = React.useState({
        'title': '',
        'forUser': '',
        'startAt': '',
        'endAt': '',
        'createdBy': '',
        'status': '',
        'image': selectedFile
    });


    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData()
        form.append('image', selectedFile)
        form.append('title', formData.title)
        form.append('forUser', formData.forUser)
        form.append('startAt', formData.startAt)
        form.append('endAt', formData.endAt)
        form.append('createdBy', formData.createdBy)
        form.append('status', formData.status)

        dispatch(AddData(form)).then(() => {
            setIsSuccess(true)
            console.log(formData);
            setSnackbarOpen(true);
            setTimeout(() => {
                navigate("../setting/dialogs-list");
            }, 1000);
        });
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'startAt' || name === 'endAt') {
            const startAt = new Date(formData.startAt);
            const endAt = new Date(formData.endAt);

            if (name === 'startAt' && endAt < startAt) {
                setFormData(prevState => ({
                    ...prevState,
                    endAt: value,
                }));
            } else if (name === 'endAt' && startAt > endAt) {
                setFormData(prevState => ({
                    ...prevState,
                    startAt: value,
                }));
            }
        }
    };


    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        if (!isSuccess) {
            setSnackbarOpen(false);
        }
    }


    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleRemoveClick = () => {
        setSelectedFile(null);
        setPopoverAnchor(null);
    };

    const handleImageClick = (event) => {
        setPopoverAnchor(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setPopoverAnchor(null);
    };

    return (
        <div>
            <Card
                variant="outlined"
                sx={{
                    p: 0,
                    borderRadius: baseTheme.shape.borderRadius,
                    padding: baseTheme.mixins.toolbar.padding,
                }}
            >
                <Box
                    sx={{
                        padding: "15px 30px",
                    }}
                    display="flex"
                    alignItems="center"
                >
                    <Box flexGrow={1}>
                        <Typography
                            sx={{
                                fontSize: "18px",
                                fontWeight: "500",
                            }}
                        >
                            Add Dialog
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent
                    sx={{
                        padding: "30px",
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                {selectedFile ? (
                                    <Card variant="outlined"
                                        sx={{
                                            height: "150px",
                                            width: "190px",
                                            textAlign: "center",
                                        }}
                                    >
                                        <img
                                            src={URL.createObjectURL(selectedFile)}
                                            alt="Preview"
                                            id="image"
                                            style={{ maxWidth: "100%", maxHeight: "130px", marginRight: "10px", marginTop: "auto" }}
                                            onClick={handleImageClick}
                                        />
                                        <Popover
                                            open={Boolean(popoverAnchor)}
                                            anchorEl={popoverAnchor}
                                            onClose={handlePopoverClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'center',
                                            }}
                                        >
                                            <Box p={2}>
                                                <Button
                                                    color="secondary"
                                                    variant="contained"
                                                    onClick={handleRemoveClick}
                                                    startIcon={<CancelIcon />}
                                                >
                                                    Remove
                                                </Button>
                                            </Box>
                                        </Popover>
                                        <Typography sx={{ mt: 1, fontSize: 9 }}>
                                            Selected File: {selectedFile.name}
                                        </Typography>
                                    </Card>
                                ) : (
                                    <label htmlFor="file-input">
                                        <input
                                            id="file-input"
                                            type="file"
                                            name="mediaPath"
                                            onChange={handleFileSelect}
                                            style={{ display: 'none' }}
                                            required
                                        />
                                        <Card sx={{ maxWidth: 190, height: 150, textAlign: "center", display: "flex" }}>
                                            <CardActionArea onClick={() => document.getElementById("file-input").click()}>
                                                <CardContent>
                                                    <AddIcon
                                                        sx={{ fontSize: 40, color: '#808080', cursor: 'pointer' }}
                                                    />
                                                    <br />
                                                    <Typography variant="caption" sx={{ color: '#000' }}>
                                                        Upload Image
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </label>
                                )}
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="Dialog Title"
                                    label="Dialog Title"
                                    name="title"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    onChange={handleInputChange}
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel htmlFor="Start At"></InputLabel>
                                    <TextField
                                        id="Start At"
                                        type="datetime-local"
                                        variant="outlined"
                                        name="startAt"
                                        label="Start At"
                                        fullWidth
                                        required
                                        onChange={handleInputChange}
                                        sx={{
                                            mb: 2,
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel htmlFor="End At"></InputLabel>
                                    <TextField
                                        label="End At"
                                        id="End At"
                                        type="datetime-local"
                                        variant="outlined"
                                        name="endAt"
                                        fullWidth
                                        required
                                        onChange={handleInputChange}
                                        sx={{
                                            mb: 2,
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="Created By"
                                    label="Created By"
                                    variant="outlined"
                                    name="createdBy"
                                    fullWidth
                                    required
                                    onChange={handleInputChange}
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth variant="outlined" required sx={{ mb: 2 }}>
                                    <InputLabel htmlFor="status">Status</InputLabel>
                                    <Select
                                        label="Status"
                                        id="Status"
                                        name="status"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="0">Active</MenuItem>
                                        <MenuItem value="1">Inactive</MenuItem>
                                        <MenuItem value="2">Progress</MenuItem>
                                    </Select>
                                </FormControl>

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth variant="outlined" required sx={{ mb: 2 }}>
                                    <InputLabel htmlFor="forUser">For User</InputLabel>
                                    <Select
                                        label="for User"
                                        variant="outlined"
                                        name='forUser'
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="None">none</MenuItem>
                                        <MenuItem value="havePlan">havePlan</MenuItem>
                                        <MenuItem value="noPlan">noPlan</MenuItem>
                                        <MenuItem value="allUser">allUser</MenuItem>
                                    </Select>
                                </FormControl>

                            </Grid>


                        </Grid>
                        <div>
                            <br />
                            <Button color="secondary" variant="contained" type="submit">
                                Submit
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}
            >
                <SnackbarContent
                    message="New Dialog added successfully!"
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
        </div>
    );
};

export default AddDialog;