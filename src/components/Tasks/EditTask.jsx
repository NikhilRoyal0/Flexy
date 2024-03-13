import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  TextField,
  Button,
  Popover,
  Snackbar,
  SnackbarContent,
  IconButton,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { selectTasksData, fetchTasksData, updateTaskData } from "../../app/TaskSlice";
import { baseTheme } from "../../assets/global/Theme-variable";


const EditTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { taskId: taskIdParam } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);



  const [data, setData] = useState({
    taskId: "",
    taskTitle: "",
    taskInfo: "",
    createdBy: "",
    taskMedia: "",
    status: "",
  });

  const handleSnackbarClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if (!isSuccess) {
      setSnackbarOpen(false);
    }
  };

  const showSnackbar = (message) => {
    setSnackbarOpen(true);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(updateTaskData(data.taskId, data))
      .then(() => {
        toggleEditMode();
        setIsSuccess(true)

        showSnackbar('Task updated successfully!');

        setTimeout(() => {
          navigate("../tasks/task-list");
        }, 1000);
      })

      .catch((error) => {
        setIsSuccess(false);

        showSnackbar('Error in updating task. Please try again.');
        console.error('Error in updating task:', error);
      });
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      const selectedFile = files[0];

      const reader = new FileReader();
      reader.onload = (event) => {
        setFile(event.target.result);
        setData((prevData) => ({
          ...prevData,
          [name]: event.target.result,
        }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const [loading, setLoading] = useState(true);
  const taskData = useSelector(selectTasksData);

  const fetchTaskDataById = () => {
    const taskId = parseInt(taskIdParam);
    const selectedTask = taskData.find((task) => task.taskId === taskId);
    setData({ ...selectedTask });
    setLoading(false);
  };

  useEffect(() => {
    if (taskData.length === 0) {
      dispatch(fetchTasksData());
    } else {
      fetchTaskDataById();
    }
  }, [taskIdParam, dispatch, taskData]);


  if (loading) {
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



  const handleImageClick = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  const handleImageChange = () => {
    const fileInput = document.getElementById("taskMedia");
    if (fileInput) {
      fileInput.click();
    }
  };

  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Edit Task - {data && data.taskId}</Typography>
        <br />
        <Divider />
        <br />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Card
                variant="outlined"
                sx={{
                  height: "150px",
                  width: "210px",
                  textAlign: "center",
                }}
              >
                <img
                  src={data && data.taskMedia}
                  alt="Preview"
                  id="image"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "130px",
                    marginRight: "10px",
                    marginTop: "auto",
                  }}
                  onClick={handleImageClick}
                />
                {editMode && (
                  <Popover
                    open={Boolean(popoverAnchor)}
                    anchorEl={popoverAnchor}
                    onClose={handlePopoverClose}
                    disabled={!editMode}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <input
                      type="file"
                      id="image"
                      name="taskMedia"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleImageChange}
                      startIcon={<AddIcon />}
                    >
                      Change
                    </Button>
                  </Popover>
                )}
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Title"
                variant="outlined"
                name='taskTitle'
                onChange={handleTextChange}
                fullWidth
                value={data && data.taskTitle}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Info"
                variant="outlined"
                name='taskInfo'
                onChange={handleTextChange}
                fullWidth
                value={data && data.taskInfo}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" required sx={{ mb: 2 }}>
                <InputLabel htmlFor="status">Status</InputLabel>
                <Select
                  label="status"
                  id="status"
                  name="status"
                  value={data && data.status}
                  onChange={handleTextChange}
                  disabled={!editMode}
                >
                  <MenuItem value="0">Active</MenuItem>
                  <MenuItem value="1">Inactive</MenuItem>
                  <MenuItem value="2">Progress</MenuItem>
                </Select>
              </FormControl>

            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="createdBy"
                variant="outlined"
                name='createdBy'
                onChange={handleTextChange}
                fullWidth
                value={data && data.createdBy}
                disabled={!editMode}
              />
            </Grid>

          </Grid>
          <br />
          <Divider />
          <br />
          {editMode ? (
            <>
              <Button variant="contained" color="success" type="submit" >
                Save
              </Button>
              <Button variant="contained" color="error" onClick={toggleEditMode} sx={{ ml: 1 }}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={toggleEditMode}>
              Edit
            </Button>
          )}
        </form>

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
            message="task updated successfully!"
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
      </CardContent>
    </Card>
  );
};

export default EditTask;
