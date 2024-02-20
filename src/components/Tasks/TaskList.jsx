import React, { useState, useEffect } from 'react';
import { Card, Typography, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Chip, Button, Grid } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksData, selectTasksData, selectTasksLoading, selectTasksError } from "../../app/TaskSlice";
import { useNavigate } from 'react-router-dom';


const TasksList = () => {
  const dispatch = useDispatch();
  const tasksData = useSelector(selectTasksData);
  console.log("Tasks Data:", tasksData);

  const isLoading = useSelector(selectTasksLoading);
  const error = useSelector(selectTasksError);
  const [isTableVisible, setTableVisible] = useState(true);

  const navigate = useNavigate();
  console.log(tasksData)

  const editClick = (task) => {
    navigate(`edit-task/${task.taskId}`);
  };

  useEffect(() => {
    dispatch(fetchTasksData());
  }, [dispatch]);

  const toggleTableVisibility = () => {
    setTableVisible(!isTableVisible);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Table style={{ border: '2px solid #ddd' }}>
              <TableHead style={{ backgroundColor: '#ADD8E6' }}>
                <TableRow>
                  <TableCell>
                    <Button onClick={toggleTableVisibility} sx={{ marginLeft: -1 }}>
                      {isTableVisible ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </Button>
                  </TableCell>
                  <TableCell>Id</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Info</TableCell>
                  <TableCell>Daily Tasks</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              {isTableVisible && (
                <TableBody>
                  {tasksData.map((task) => (
                    <TableRow key={task.taskId}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        {task.taskId}
                      </TableCell>
                      <TableCell>{task.taskTitle}</TableCell>
                      <TableCell>{task.taskInfo}</TableCell>
                      <TableCell>
                        {task.isDailyTask === 0 && <Chip label="No" color="default" />}
                        {task.isDailyTask === 1 && <Chip label="Yes" color="primary" />}
                      </TableCell>
                      <TableCell>
                        {task.status === 0 && <Chip label="Active" color="default" />}
                        {task.status === 1 && <Chip label="InActive" color="primary" />}
                      </TableCell>
                      <TableCell>
                        <Button variant="outlined" color="primary" onClick={() => editClick(task)}>
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </Grid>

          <Grid item xs={12} sx={{ textAlign: 'left' }}>
            <Button
              sx={{
                mt: "20px",
              }}
              color="primary"
            >
              <AddIcon />
              <Typography sx={{ ml: 1 }}>New Tasks</Typography>
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default TasksList;
