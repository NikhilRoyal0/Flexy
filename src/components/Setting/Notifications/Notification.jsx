import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Button,
} from "@mui/material";
import Lists from "./Lists";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNotificationData,
  fetchNotificationData,
} from "../../../app/NotificationSlice";
import LoadingButton from "@mui/lab/LoadingButton";

const Notification = () => {
  const dispatch = useDispatch();

  const [showAddNotification, setShowAddNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({
    notificationTitle: "",
    info: "",
    userId: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
  
    const form = new FormData();
    form.append("notificationTitle", notificationData.notificationTitle);
    form.append("info", notificationData.info);
    form.append("userId", notificationData.userId);
  
    console.log("Notification Data before dispatch:", notificationData);
  
    dispatch(AddNotificationData(form))
      .then(() => {
        console.log("Notification added successfully");
        dispatch(fetchNotificationData());
      })
      .catch((error) => {
        console.error("Error adding Notification:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
        handleCloseAddNotification();
      });
  };
  


  const handleAddNotificationData = () => {
    setShowAddNotification(true);
  };

  const handleCloseAddNotification = () => {
    setShowAddNotification(false);
    setNotificationData({
      notificationTitle: "",
      info: "",
      userId: "",
    });
  };

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="h3">Notification Lists</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              container
              justifyContent="flex-end"
              alignItems="center"
            >
              <LoadingButton // 4. Replace with LoadingButton
                variant="contained"
                color="primary"
                onClick={handleAddNotificationData}
                loading={isSubmitting} // 5. Pass isSubmitting to loading prop
                style={{ marginLeft: "1rem" }}
              >
                <AddIcon />
                <Typography style={{ marginLeft: "0.5rem" }}>
                  Add Notification
                </Typography>
              </LoadingButton>
            </Grid>
          </Grid>
          <Lists/>
        </CardContent>
      </Card>

      <Dialog open={showAddNotification} onClose={handleCloseAddNotification}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add Notification</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  value={notificationData.notificationTitle}
                  onChange={(e) =>
                    setNotificationData({
                      ...notificationData,
                      notificationTitle: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Info"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  value={notificationData.info}
                  onChange={(e) =>
                    setNotificationData({
                      ...notificationData,
                      info: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              type="button"
              onClick={handleCloseAddNotification}
              color="primary"
            >
              Cancel
            </Button>
            <LoadingButton // 6. Replace with LoadingButton
              type="submit"
              color="primary"
              loading={isSubmitting} // 7. Pass isSubmitting to loading prop
            >
              Add Notification
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Notification;
