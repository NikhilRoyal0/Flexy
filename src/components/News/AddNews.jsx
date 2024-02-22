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
import {useDispatch} from 'react-redux'
import { AddData } from "../../app/NewsSlice";


const AddNews = () => {
    const dispatch = useDispatch()
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [popoverAnchor, setPopoverAnchor] = React.useState(null);

    const [formData, setFormData] = React.useState({
        'newsTitle': '',
        'newsInfo': '',
        'newsDate': 0,
        'isPublished': 0,
        'createdBy': 0,
        'image': selectedFile
    });


    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData()
        form.append('image', selectedFile)
        form.append('newsTitle', formData.newsTitle)
        form.append('newsInfo', formData.newsInfo)
        form.append('newsDate', formData.newsDate)
        form.append('isPublished', formData.isPublished)
        form.append('createdBy', formData.createdBy)

        dispatch(AddData(form));

        console.log(formData);
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData, 
            [name]: value
        })
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
                            Add News
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
                                            name = "mediaPath"
                                            onChange={handleFileSelect}
                                            style={{ display: 'none' }}
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
                                    id="news-title"
                                    label="News Title"
                                    name = "newsTitle"
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
                                <TextField
                                    id="news-date"
                                    label="News Date"
                                    variant="outlined"
                                    name = "newsDate"
                                    fullWidth
                                    required
                                    onChange={handleInputChange}
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    id="news-info"
                                    label="News Info"
                                    name ="newsInfo"
                                    required
                                    onChange={handleInputChange}
                                    fullWidth
                                    multiline
                                    minRows={4}
                                    sx={{
                                        mb: 2,
                                    }}
                                />
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

export default AddNews;