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
import { useDispatch } from "react-redux";
import { AddPlanData } from "../../app/PlansSlice";


const AddPlan = () => {
    const dispatch = useDispatch()
    const [selectedFiles, setSelectedFiles] = React.useState([]);
    const [popoverAnchor, setPopoverAnchor] = React.useState(null);

    const [formData, setFormData] = React.useState({
        'planId': '',
        'planTitle': '',
        'planInfo': '',
        'planExtraDetails': '',
        'planPrice': 0,
        "image": selectedFiles
    });


    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData()
        form.append('planId', formData.planId)
        form.append('planTitle', formData.planTitle)
        form.append('planInfo', formData.planInfo)
        form.append('planExtraDetails', formData.planExtraDetails)
        form.append('planPrice', formData.planPrice)
        form.append('image', formData.selectedFiles)

        dispatch(AddPlanData(form));

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
        setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, file]);
    };

    const handleRemoveClick = (index) => {
        setSelectedFiles((prevSelectedFiles) =>
            prevSelectedFiles.filter((file, i) => i !== index)
        );
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
                            Add Task
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
                            <Grid item xs={12} md={12} sx={{ display: "flex", flexWrap: "wrap" }}>
                                {selectedFiles.map((file, index) => (
                                    <Card key={index} variant="outlined"
                                        sx={{
                                            height: "150px",
                                            width: "190px",
                                            textAlign: "center",
                                            marginLeft: "10px",
                                            overflowY: "auto",
                                            "&::-webkit-scrollbar": {
                                                width: 0,
                                            },
                                            scrollbarWidth: "none",
                                        }}
                                    >
                                        <img
                                            src={URL.createObjectURL(file)}
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
                                                    onClick={() => handleRemoveClick(index)}
                                                    startIcon={<CancelIcon />}
                                                >
                                                    Remove
                                                </Button>
                                            </Box>
                                        </Popover>
                                        <Typography sx={{ mt: 1, fontSize: 9 }}>
                                            Selected File: {file.name}
                                        </Typography>
                                    </Card>
                                ))}
                                {selectedFiles.length < 4 && (
                                    <label htmlFor="file-input">
                                        <input
                                            id="file-input"
                                            type="file"
                                            name="planImages"
                                            onChange={handleFileSelect}
                                            style={{ display: 'none' }}
                                            required
                                        />
                                        <Card sx={{
                                            width: 190,
                                            height: 150,
                                            textAlign: "center",
                                            display: "flex",
                                            marginLeft: "10px"
                                        }}>
                                            <CardActionArea onClick={() => document.getElementById("file-input").click()}>
                                                <Grid direction="row">
                                                    <CardContent>
                                                        <AddIcon
                                                            sx={{ fontSize: 40, color: '#808080', cursor: 'pointer' }}
                                                        />
                                                        <br />
                                                        <Typography variant="caption" sx={{ color: '#000' }}>
                                                            Upload Image*
                                                        </Typography>
                                                    </CardContent>
                                                </Grid>
                                            </CardActionArea>
                                        </Card>
                                    </label>
                                )}
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="plan-title"
                                    label="Plan Title"
                                    name = "planTitle"
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    id="Plan-info"
                                    label="Plan Info"
                                    name="planInfo"
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                    multiline
                                    minRows={4}
                                    maxRows={2}
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    id="plan extra-details"
                                    label="Plan Extra-Details"
                                    name="planExtraDetails"
                                    onChange={handleInputChange}
                                    fullWidth
                                    multiline
                                    required
                                    minRows={4}
                                    maxRows={2}
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

export default AddPlan;