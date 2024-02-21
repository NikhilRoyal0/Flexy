import React from "react";
import {
    Card,
    CardContent,
    Divider,
    Box,
    Typography,
    TextField,
    FormControl,
    Button,
    Grid,
    MenuItem,
    InputLabel,
    Select,
    Popover,
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import CancelIcon from '@mui/icons-material/Cancel';


const numbers = [
    {
        value: "one",
        label: "One",
    },
    {
        value: "two",
        label: "Two",
    },
    {
        value: "three",
        label: "Three",
    },
    {
        value: "four",
        label: "Four",
    },
    {
        value: "five",
        label: "Five",
    },
];

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const AddUser = () => {
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [popoverAnchor, setPopoverAnchor] = React.useState(null);

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


    const [state, setState] = React.useState({
        gender: "",
    });

    const handleChange = (event) => {
        setState({ ...state, gender: event.target.value });
    };

    const [number, setNumber] = React.useState("");

    const handleChange3 = (event) => {
        setNumber(event.target.value);
    };

    return (
        <div>
            {/* ------------------------------------------------------------------------------------------------ */}
            {/* Basic Checkbox */}
            {/* ------------------------------------------------------------------------------------------------ */}
            <Card
                variant="outlined"
                sx={{
                    p: 0,
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
                            Add Yourself
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent
                    sx={{
                        padding: "30px",
                    }}
                >
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="first-name"
                                    label="First Name"
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="last-name"
                                    label="Last Name"
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                    <InputLabel id="gender-label">Gender</InputLabel>
                                    <Select
                                        labelId="gender-label"
                                        id="gender"
                                        value={state.gender}
                                        onChange={handleChange}
                                        label="Gender"
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="dob"
                                    label="Date of Birth"
                                    type="date"
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="phone-number"
                                    label="Phone Number"
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="email"
                                    label="Email Address"
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                            </Grid>


                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                    <InputLabel id="Higher-Qualification">Higher Qualification</InputLabel>
                                    <Select
                                        labelId="Higher-Qualification"
                                        id="Higher-Qualification"
                                        value={number}
                                        onChange={handleChange3}
                                        label="Higher-Qualification"
                                    >
                                        {numbers.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    id="Intro"
                                    label="Describe Yourself..."
                                    fullWidth
                                    multiline
                                    minRows={4}
                                    maxRows={2}
                                    sx={{
                                        mb: 1,
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                {selectedFile ? (
                                    <Card variant="outlined"
                                        sx={{
                                            height: "230px",
                                            width: "290px",
                                            textAlign: "center",
                                        }}
                                    >
                                        <img
                                            src={URL.createObjectURL(selectedFile)}
                                            alt="Preview"
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
                                        <Typography sx={{ mt: 2 }}>
                                            Selected File: {selectedFile.name}
                                        </Typography>
                                    </Card>
                                ) : (
                                    <label htmlFor="file-input">
                                        <input
                                            id="file-input"
                                            type="file"
                                            onChange={handleFileSelect}
                                            style={{ display: 'none' }}
                                        />
                                        <Card variant="outlined"
                                            sx={{ height: "230px", width: "290px", display: "flex", alignItems: "center", justifyContent: "center" }}
                                        >
                                            <CardContent>
                                                <Button
                                                    component="span"
                                                    role={undefined}
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    Upload Image
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </label>
                                )}

                            </Grid>
                        </Grid>
                        <div>
                            <br />
                            <Button color="primary" variant="contained">
                                Submit
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddUser;
