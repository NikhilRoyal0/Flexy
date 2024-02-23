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
import { AddTaskData } from "../../app/TaskSlice";


const AddTask = () => {
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [popoverAnchor, setPopoverAnchor] = React.useState(null);

        const [formData, setFormData] = React.useState({
            'taskTitle': '',
            'status': 0,
            'isDailyTask': 0,
            'taskInfo': '',
            'mediaPath': selectedFile
        });


        const handleSubmit = async (event) => {
            event.preventDefault();
            const form = new FormData()
            form.append('taskTitle', formData.taskTitle)
            form.append('status', formData.status)
            form.append('isDailyTask', formData.isDailyTask)
            form.append('taskInfo', formData.taskInfo)
            form.append('image', selectedFile)

            dispatch(AddTaskData(form));

            console.log(formData);
        }

        const handleInputChange = (e) => {
            const { name, value } = e.target
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
                                                mediaPath
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
                                        id="task-title"
                                        label="Task Title"
                                        name="taskTitle"
                                        onChange={handleInputChange}
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
                                        id="status"
                                        label="Status"
                                        name="status"
                                        onChange={handleInputChange}
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
                                        id="isDailyTask"
                                        label="isDailyTask"
                                        name="isDailyTask"
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        fullWidth
                                        required
                                        sx={{
                                            mb: 2,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <TextField
                                        id="task-info"
                                        label="Task Info"
                                        required
                                        fullWidth
                                        multiline
                                        name="taskInfo"
                                        onChange={handleInputChange}
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

    export default AddTask
