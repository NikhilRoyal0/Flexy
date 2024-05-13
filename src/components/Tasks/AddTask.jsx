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
  IconButton,
  Snackbar,
  SnackbarContent,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddTaskData } from "../../app/TaskSlice";
import { baseTheme } from "../../assets/global/Theme-variable";

const AddTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [popoverAnchor, setPopoverAnchor] = React.useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = React.useState({
    taskTitle: "",
    taskInfo: "",
    isDailyTask: "",
    createdBy: "0",
    taskType: "",
    taskPayout: "",
    onClick: "",
    image: selectedFile,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData();
    form.append("taskTitle", formData.taskTitle);
    form.append("taskInfo", formData.taskInfo);
    form.append("isDailyTask", formData.isDailyTask);
    form.append("createdBy", formData.createdBy);
    form.append("taskType", formData.taskType);
    form.append("taskPayout", formData.taskPayout);
    form.append("onClick", formData.onClick);
    form.append("image", selectedFile);

    dispatch(AddTaskData(form)).then(() => {
      setIsSuccess(true);
      console.log(formData);
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate("../tasks/task-list");
      }, 1000);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSnackbarClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    if (!isSuccess) {
      setSnackbarOpen(false);
    }
  };

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
                  <Card
                    variant="outlined"
                    sx={{
                      height: "150px",
                      width: "190px",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "130px",
                        marginRight: "10px",
                        marginTop: "auto",
                      }}
                      onClick={handleImageClick}
                    />
                    <Popover
                      open={Boolean(popoverAnchor)}
                      anchorEl={popoverAnchor}
                      onClose={handlePopoverClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
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
                      name="taskMedia"
                      onChange={handleFileSelect}
                      style={{ display: "none" }}
                      required
                    />
                    <Card
                      sx={{
                        maxWidth: 210,
                        height: 150,
                        textAlign: "center",
                        display: "flex",
                      }}
                    >
                      <CardActionArea
                        onClick={() =>
                          document.getElementById("file-input").click()
                        }
                      >
                        <CardContent>
                          <AddIcon
                            sx={{
                              fontSize: 40,
                              color: "#808080",
                              cursor: "pointer",
                            }}
                          />
                          <br />
                          <Typography variant="caption" sx={{ color: "#000" }}>
                            Upload Image
                          </Typography>
                          <br />
                          <Typography
                            variant="caption"
                            sx={{ color: "#bababa" }}
                          >
                            Support PNG, JPEG and WEBP upto (765*565 px)
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
                <FormControl
                  fullWidth
                  variant="outlined"
                  required
                  sx={{ mb: 2 }}
                >
                  <InputLabel htmlFor="Task Type">Task Type</InputLabel>
                  <Select
                    label="Task Type"
                    id="Task type"
                    name="taskType"
                    value={formData.taskType}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="0">Daily Checkin</MenuItem>
                    <MenuItem value="1">Refer with limit 5</MenuItem>
                    <MenuItem value="2">Register or Subscribe</MenuItem>
                    <MenuItem value="3">Visit Task</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="taskPayout"
                  label="Payout"
                  name="taskPayout"
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
                  id="onClick"
                  label="on Click"
                  name="onClick"
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
                <FormControl
                  fullWidth
                  variant="outlined"
                  required
                  sx={{ mb: 2 }}
                >
                  <InputLabel htmlFor="isDailyTask">Is Daily Task</InputLabel>
                  <Select
                    label="isDailyTask"
                    id="isDailyTask"
                    name="isDailyTask"
                    value={formData.isDailyTask}
                    onChange={handleInputChange}
                  > 
                    <MenuItem value="1">Active</MenuItem>
                    <MenuItem value="0">Inactive</MenuItem>
                    <MenuItem value="2">Progress</MenuItem>
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
          message="New Task added successfully!"
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
    </div>
  );
};

export default AddTask;
