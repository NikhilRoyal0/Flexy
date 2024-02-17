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
} from '@mui/material'; import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const dialogData = [
  { id: 1, title: 'Bhagat Singh', content: 'Inquilab Zindabad! Bhagat Singh, the fearless freedom fighter, who sacrificed his life for the nation.' },
  { id: 2, title: 'Rani Lakshmibai', content: 'The Rani of Jhansi, an epitome of courage and valor, who fought bravely in the Indian Rebellion of 1857.' },
  { id: 3, title: 'Subhas Chandra Bose', content: 'Netaji Subhas Chandra Bose, the charismatic leader, and his famous slogan - "Give me blood, and I shall give you freedom!"' },
  { id: 4, title: 'Sardar Patel', content: 'Sardar Vallabhbhai Patel, the Iron Man of India, played a key role in the integration of princely states into the Indian Union.' },
  { id: 5, title: 'Birsa Munda', content: 'Birsa Munda, the tribal leader and freedom fighter, who led the Munda Rebellion against British rule.' },
  { id: 6, title: 'Lala Lajpat Rai', content: 'Punjab Kesari Lala Lajpat Rai, a prominent leader of the Indian independence movement and a staunch advocate of Swadeshi.' },
  { id: 7, title: 'Rajendra Prasad', content: 'Dr. Rajendra Prasad, the first President of India, and a key figure in the Constituent Assembly framing the Indian Constitution.' },
  { id: 8, title: 'Bhagat Singh', content: 'Chandra Shekhar Azad, the fearless revolutionary who played a crucial role in the Kakori Conspiracy and remained undefeated by the British.' },
  { id: 9, title: 'Alluri Sitarama Raju', content: 'Alluri Sitarama Raju, a tribal leader and freedom fighter, who led the Rampa Rebellion against the British Raj.' },
  { id: 10, title: 'Khudiram Bose', content: 'Khudiram Bose, one of the youngest revolutionaries, sacrificed his life for the cause of Indian independence.' },
  { id: 11, title: 'Sarojini Naidu', content: 'Sarojini Naidu, the Nightingale of India, a poet, and a prominent leader in the Indian National Movement.' },
  { id: 12, title: 'Mangal Pandey', content: 'Mangal Pandey, the sepoy who played a crucial role in the events leading to the Indian Rebellion of 1857.' },
];


const DialogsList = () => {
  const [openDialog, setOpenDialog] = React.useState(null);

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

            <DialogTitle>{dialog.title}</DialogTitle>
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