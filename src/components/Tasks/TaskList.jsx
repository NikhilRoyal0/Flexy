import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksData, selectTasksData, selectTasksLoading, selectTasksError, deleteTaskData } from "../../app/TaskSlice";
import { useNavigate } from "react-router-dom";
import errorimage from '../../assets/images/errorimage.jpg'
import CircularProgress from '@mui/material/CircularProgress';




const TaskList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const taskData = useSelector(selectTasksData);
  const isLoading = useSelector(selectTasksLoading);
  const error = useSelector(selectTasksError);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null);

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
  }, [dispatch]);

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
    return <div>Error: {error}</div>;
  }

  const editClick = (Task) => {
    navigate(`edit-task/${Task.taskId}`);
  };

  const handleClick = () => {
    navigate('/tasks/task-list/add-task');
  }


  return (
    <div style={{ position: "relative" }}>
      <Button
         sx={{
          position: "absolute",
          top: "10px",
          right: "30px",
          mt: "5px",
          zIndex: 1,
        }}
        color="primary"
        onClick={handleClick}
      >
        <AddIcon />
        <Typography sx={{ ml: 1 }}>Add Task</Typography>
      </Button>
      <Card>
        <CardContent>
        <Grid container sx={{ marginTop: "25px" }}>
            {taskData.map((Task, index) => (
              <Grid
                key={index}
                item
                xs={12}
                s={7}
                md={5}
                lg={4}
                xl={2.4}
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
                    mt: "8px"
                  }}
                >
                  <img
                    src={Task.taskMedia}
                    alt={Task.taskMedia}
                    onError={(e) => {
                      e.target.src = errorimage;
                      e.target.alt = "Error Image";
                    }}
                    width="100%"
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
                      {Task.taskTitle}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "h4.fontSize",
                        fontWeight: "500",
                      }}
                    >
                      {Task.taskType}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        mt: 1,
                      }}
                    >
                      {Task.taskInfo}
                  </Typography>
                  <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        mt: 1,
                      }}
                    >
                      {Task.createdBy}
                  </Typography>
                    <br />
                    <Button variant="outlined" color="primary" onClick={() => editClick(Task)}>
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteClick(Task)}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteCancel}
      >
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
