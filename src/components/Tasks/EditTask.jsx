import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectTasksData } from "../../app/TaskSlice"

  const EditTask = () => {
    const { taskId: taskIdParam } = useParams();
    const [editMode, setEditMode] = useState(false);
    const [task, setTaskData] = useState(null);
    const taskData = useSelector(selectTasksData);
  
    const fetchTaskData = async () => {
      try {  
        const taskId = parseInt(taskIdParam);
        const selectedTask = taskData.find((ur) => ur.taskId === taskId);
        setTaskData(selectedTask);
      } catch (error) {
        console.error('Error processing data:', error);
      }
    };
  
    useEffect(() => {
      fetchTaskData();
    }, [taskIdParam, taskData]); 
  
    const toggleEditMode = () => {
      setEditMode(!editMode);
    };
  
    const handleSave = () => {
      setEditMode(false);
    };
  

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Edit Task - {task && task.taskId}</Typography>
        <br />
        <Divider />
        <br />
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Task Id"
                variant="outlined"
                fullWidth
                value={task && task.taskId}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={task && task.taskTitle}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Info"
                variant="outlined"
                fullWidth
                value={task && task.taskInfo}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Priority"
                variant="outlined"
                fullWidth
                value={task && task.isDailyTask}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Status"
                variant="outlined"
                fullWidth
                value={task && task.status}
                disabled={!editMode}
              />
            </Grid>

          </Grid>
          <br />
          <Divider />
          <br />
          {editMode ? (
            <>
              <Button variant="contained" color="success" onClick={handleSave}>
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
