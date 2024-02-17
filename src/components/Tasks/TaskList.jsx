import React, { useState } from 'react';
import { Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Chip, Avatar, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function TaskList() {
  const [isTableVisible, setTableVisible] = useState(true);

  const updatedTasks = [
    { id: 1, title: 'Complete project documentation', name: 'Sonu', date: '12 Sep', priority: 'Critical', status: 'Not Started', avatar: 'url_to_avatar_1' },
    { id: 2, title: 'Implement new feature in app', name: 'Monu', date: '02 Feb', priority: 'Medium', status: 'In Progress', avatar: 'url_to_avatar_2' },
    { id: 3, title: 'Review and finalize design proposal', name: 'Harsh', date: '15 Mar', priority: 'Low', status: 'Completed', avatar: 'url_to_avatar_3' },
    { id: 4, title: 'Prepare presentation for client meeting', name: 'Vishal', date: '08 Apr', priority: 'High', status: 'Not Started', avatar: 'url_to_avatar_4' },
    { id: 5, title: 'Conduct user testing for website', name: 'Punit', date: '23 May', priority: 'Critical', status: 'In Progress', avatar: 'url_to_avatar_5' },
  ];

  const toggleTableVisibility = () => {
    setTableVisible(!isTableVisible);
  };

  return (
    <Card>
      <CardContent>
        <div style={{ overflow: 'hidden', borderRadius: '15px' }}>
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
                {updatedTasks.map((task) => (
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
        </div>
      </CardContent>
    </Card>
  );
}
