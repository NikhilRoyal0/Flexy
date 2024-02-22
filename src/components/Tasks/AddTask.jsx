import React from "react";
import {
    Card,
    CardContent,
    CardActionArea,
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
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';


const AddTask = () => {
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
    const [isDailyTask, setIsDailyTask] = React.useState(0);

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
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="task-id"
                                    label="Task ID"
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
                                    id="task-title"
                                    label="Task Title"
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
                                    variant="outlined"
                                    fullWidth
                                    required
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="is-daily-task-label">Is Daily Task</InputLabel>
                                    <Select
                                        labelId="is-daily-task-label"
                                        id="is-daily-task"
                                        value={isDailyTask}
                                        onChange={() => setIsDailyTask(isDailyTask === 0 ? 1 : 0)}
                                        label="Is Daily Task"
                                        required
                                    >
                                        <MenuItem value={0}>No</MenuItem>
                                        <MenuItem value={1}>Yes</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <TextField
                                    id="task-info"
                                    label="Task Info"
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

export default AddTask;
