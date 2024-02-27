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
  DialogTitle
} from "@mui/material";
import errorimage from '../../assets/images/errorimage.jpg'
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTasksData, selectTasksData, selectTasksLoading, selectTasksError, deleteTaskData } from "../../app/TaskSlice";



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
        <CardContent
          sx={{
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >          <Grid container sx={{ marginTop: "25px" }}>
            {taskData.map((Task, index) => (
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
                    height="210px"
                    style={{
                      objectFit: 'contain',
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
                      {Task.taskTitle}
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
                    <Button variant="outlined" color="primary" onClick={() => editClick(Task)} sx={{ ml: 1 }}>
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteClick(Task)}
                      sx={{ ml: 1 }}
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
