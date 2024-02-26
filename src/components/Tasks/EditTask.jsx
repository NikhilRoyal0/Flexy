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
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { selectTasksData, fetchTasksData, updateTaskData } from "../../app/TaskSlice";

const EditTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { taskId: taskIdParam } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState(null);

  const [data, setData] = useState({
    taskId: "",
    taskTitle: "",
    taskInfo: "",
    createdBy: "",
    taskMedia: "",
    status: "",
  });



  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(updateTaskData(data.taskId, data))
      .then(() => {
        toggleEditMode();
        navigate("../tasks/task-list");
      })

    toggleEditMode()

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
    return <p>Loading...</p>;
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
                  width: "190px",
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
                      onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                fullWidth
                value={data && data.taskInfo}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="status"
                variant="outlined"
                name='status'
                onChange={handleInputChange}
                fullWidth
                value={data && data.status}
                disabled={!editMode}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="createdBy"
                variant="outlined"
                name='createdBy'
                onChange={handleInputChange}
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
              <Button variant="contained" color="error" onClick={toggleEditMode}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={toggleEditMode}>
              Edit
            </Button>
          )}
        </form>

      </CardContent>
    </Card>
  );
};

export default EditTask;
