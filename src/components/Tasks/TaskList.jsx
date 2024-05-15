import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import errorimage from "../../assets/images/errorimage.jpg";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchTasksData,
  selectTasksData,
  selectTasksLoading,
  selectTasksError,
  deleteTaskData,
} from "../../app/TaskSlice";

const TaskList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const taskData = useSelector(selectTasksData);
  const isLoading = useSelector(selectTasksLoading);
  const error = useSelector(selectTasksError);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [fullArticleDialogOpen, setFullArticleDialogOpen] = useState(false);
  const [filterOption, setFilterOption] = useState("0");

  const deleteClick = (task) => {
    setTaskToDelete(task);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (taskToDelete) {
      dispatch(deleteTaskData(taskToDelete.taskId)).then(() => {
        setDeleteConfirmationOpen(false);
        setTaskToDelete(null);
        dispatch(fetchTasksData());
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmationOpen(false);
    setTaskToDelete(null);
  };

  useEffect(() => {
    dispatch(fetchTasksData());
  }, [dispatch, filterOption]);

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const filterDataByStatus = (data, filterOption) => {
    return data.filter((task) => {
      if (filterOption === "1") return task.status === 1;
      if (filterOption === "0") return task.status === 0;
      if (filterOption === "2") return task.status === 2;
      return true;
    });
  };

  if (isLoading) {
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

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <Typography variant="h4" color="error" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center">
          {error}
        </Typography>
      </Box>
    );
  }

  const editClick = (task) => {
    navigate(`edit-task/${task.taskId}`);
  };

  const handleClick = () => {
    navigate("/tasks/task-list/add-task");
  };

  const openFullArticleDialog = (task) => {
    setSelectedTask(task);
    setFullArticleDialogOpen(true);
  };

  const closeFullArticleDialog = () => {
    setFullArticleDialogOpen(false);
  };

  const filteredTasks = filterDataByStatus(taskData, filterOption);

  return (
    <div style={{ position: "relative" }}>
      <Card variant="outlined">
        <CardContent>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Grid item>
              <Typography variant="h3" fontWeight="bold">
                Task List
              </Typography>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                onClick={handleClick}
                startIcon={<AddIcon />}
                sx={{ mr: 1, mt: 1 }}
              >
                Add Task
              </Button>
              <FormControl variant="outlined" sx={{ minWidth: "150px" }}>
                <InputLabel
                  htmlFor="status"
                  sx={{ marginLeft: 1, marginTop: 1 }}
                >
                  Filter By Status
                </InputLabel>
                <Select
                  label="Filter By Status"
                  variant="outlined"
                  size="small"
                  value={filterOption}
                  onChange={handleFilterChange}
                  sx={{ marginLeft: 1, marginTop: 1 }}
                >
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="0">Inactive</MenuItem>
                  <MenuItem value="2">In Progress</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: "25px" }}>
            {filteredTasks.map((task, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                xl={3}
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    p: 0,
                    width: "100%",
                    mt: "8px",
                  }}
                >
                  <img
                    src={task.taskMedia}
                    alt={task.taskMedia}
                    onError={(e) => {
                      e.target.src = errorimage;
                      e.target.alt = "Error Image";
                    }}
                    width="100%"
                    height="210px"
                    style={{
                      objectFit: "contain",
                    }}
                  />
                  <CardContent
                    sx={{
                      paddingLeft: "30px",
                      paddingRight: "30px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "h4.fontSize",
                        fontWeight: "500",
                      }}
                    >
                      {task.taskTitle}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "h4.fontSize",
                        fontWeight: "500",
                      }}
                    >
                      {task.taskInfo.length <= 15 ? (
                        task.taskInfo
                      ) : (
                        <>
                          {task.taskInfo.split(" ").slice(0, 5).join(" ")}
                          <span
                            style={{
                              fontSize: "15px",
                              color: "blue",
                              cursor: "pointer",
                              display: "inline-block",
                              marginLeft: "4px",
                            }}
                            onClick={() => openFullArticleDialog(task)}
                          >
                            ...{" "}
                            <span style={{ display: "inline" }}>read more</span>
                          </span>
                        </>
                      )}
                    </Typography>
                    <br />
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => editClick(task)}
                      sx={{ ml: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteClick(task)}
                      sx={{ ml: 1 }}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {filteredTasks.length === 0 && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="10vh"
            >
              <Typography variant="h3">No tasks available...</Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <Dialog open={fullArticleDialogOpen} onClose={closeFullArticleDialog}>
        <DialogTitle>{selectedTask?.taskTitle}</DialogTitle>
        <DialogContent>
          <img
            src={selectedTask?.taskMedia}
            alt={selectedTask?.taskMedia}
            onError={(e) => {
              e.target.src = errorimage;
              e.target.alt = "Error Image";
            }}
            width="100%"
            height="210px"
            style={{
              objectFit: "contain",
            }}
          />
          <Typography>Created By: {selectedTask?.createdBy}</Typography>
          <Typography>Task Info: {selectedTask?.taskInfo}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFullArticleDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteConfirmationOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskList;
