import React from "react";
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
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';

const AddBanner = () => {
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

    return (
        <div>
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
                            Add Banner
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
                                    id="banner-id"
                                    label="Banner ID"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="banner-title"
                                    label="Banner Title"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="banner-date"
                                    label="Banner Date/Time"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    sx={{
                                        mb: 2,
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
                                        <Card sx={{ maxWidth: 290, height: 230 ,textAlign: "center", display: "flex" }}>
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
        </div>
    );
};

export default AddBanner;
