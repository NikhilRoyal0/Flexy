import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ListItemIcon,
  Card,
  CardContent,
  Typography,
  Divider,
} from '@mui/material'; import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { selectDialogData } from "../../app/DialogSlice";
import { useSelector } from "react-redux";

const DialogsList = () => {
  const [openDialog, setOpenDialog] = React.useState(null);

  const dialogData = useSelector(selectDialogData)

  const handleOpenDialog = (dialogId) => {
    setOpenDialog(dialogId);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  return (
    <Card>
      <CardContent>
        <List>
        <Typography variant="h1" gutterBottom>
          Dialogs
        </Typography>
        <Divider/>
        <br />
          {dialogData.map((dialog) => (
            <ListItem key={dialog.id} button onClick={() => handleOpenDialog(dialog.id)}>
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText primary={dialog.title} />
            </ListItem>
          ))}
        </List>

        {dialogData.map((dialog) => (
          <Dialog key={dialog.id}
            open={openDialog === dialog.id}
            onClose={handleCloseDialog}
            sx={{ width: '100%' }}
          >
            <DialogTitle variant='h2'>{dialog.title}</DialogTitle>
            <Divider/>
            <DialogContent>
              <Typography>{dialog.content}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </Dialog>
        ))}
      </CardContent>
    </Card>
  );
};

export default DialogsList;