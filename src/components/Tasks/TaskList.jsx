import React, { useState } from 'react';
import { Card, Typography, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Chip, Avatar, Button, Grid } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSelector } from 'react-redux';
import { selectTaskData } from '../../app/TaskSlice';
import AddIcon from '@mui/icons-material/Add';

export default function TaskList() {
  const [isTableVisible, setTableVisible] = useState(true);
  const taskData = useSelector(selectTaskData);

  const toggleTableVisibility = () => {
    setTableVisible(!isTableVisible);
  };

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
                  <TableCell>Tasks List</TableCell>
                  <TableCell>Action Required</TableCell>
                  <TableCell>Schedule</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              {isTableVisible && (
                <TableBody>
                  {taskData.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        {task.title}
                      </TableCell>
                      <TableCell>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar src={task.avatar} alt={task.name} sx={{ marginRight: 1 }} />
                          {task.name}
                        </div>
                      </TableCell>
                      <TableCell>{task.date}</TableCell>
                      <TableCell>
                        {task.priority === 'Low' && <Chip label="Low" color="default" />}
                        {task.priority === 'Medium' && <Chip label="Medium" color="primary" />}
                        {task.priority === 'High' && <Chip label="High" color="secondary" />}
                        {task.priority === 'Critical' && <Chip label="Critical" color="error" />}
                      </TableCell>
                      <TableCell>
                        {task.status === 'Not Started' && <Chip label="Not Started" color="default" />}
                        {task.status === 'In Progress' && <Chip label="In Progress" color="info" />}
                        {task.status === 'Completed' && <Chip label="Completed" color="success" />}
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
              <Typography sx={{ ml: 1 }}>New Task</Typography>
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
