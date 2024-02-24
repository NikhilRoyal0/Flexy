import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksData, selectTasksData, selectTasksLoading, selectTasksError } from "../../app/TaskSlice";
import { useNavigate } from "react-router-dom";
import errorimage from '../../assets/images/errorimage.jpg'




const TaskList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const taskData = useSelector(selectTasksData);
  const isLoading = useSelector(selectTasksLoading);
  const error = useSelector(selectTasksError);

  useEffect(() => {
    dispatch(fetchTasksData());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
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
                sm={6}
                md={4}
                lg={3}
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskList;
