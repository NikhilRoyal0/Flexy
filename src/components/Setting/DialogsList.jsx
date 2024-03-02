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
import errorimage from '../../assets/images/errorimage.jpg';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchdialogsData,
  selectdialogsData,
  selectdialogsLoading,
  selectdialogsError,
  deletedialogsData
} from "../../app/DialogSlice";

const DialogsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dialogsData = useSelector(selectdialogsData);
  const isLoading = useSelector(selectdialogsLoading);
  const error = useSelector(selectdialogsError);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [dialogsToDelete, setDialogsToDelete] = useState(null);
  const [selectedDialogs, setSelectedDialogs] = useState(null);
  const [fullArticleDialogOpen, setFullArticleDialogOpen] = useState(false);

  const deleteClick = (dialogs) => {
    setDialogsToDelete(dialogs);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (dialogsToDelete) {
      dispatch(deletedialogsData(dialogsToDelete.dId)).then(() => {
        setDeleteConfirmationOpen(false);
        setDialogsToDelete(null);
        dispatch(fetchdialogsData());
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmationOpen(false);
    setDialogsToDelete(null);
  };

  useEffect(() => {
    dispatch(fetchdialogsData());
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
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <Typography variant="h4" color="error" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center">
          {error}
        </Typography>
      </Box>
    );
  }

  const editClick = (dialogs) => {
    navigate(`/setting/dialogs-list/edit-dialog/${dialogs.dId}`);
  };

  const handleClick = () => {
    navigate('/setting/dialogs-list/add-dialog');
  };

  const openFullArticleDialog = (dialogs) => {
    setSelectedDialogs(dialogs);
    setFullArticleDialogOpen(true);
  };

  const closeFullArticleDialog = () => {
    setFullArticleDialogOpen(false);
  };

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
        <Typography sx={{ ml: 1 }}>Add Dialog</Typography>
      </Button>
      <Card>
        <CardContent
          sx={{
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <Grid container sx={{ marginTop: "25px" }}>
            {dialogsData.map((dialogs, index) => (
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
                    mt: "8px",
                    maxHeight: "600px",
                  }}
                >
                  <img
                    src={dialogs.imageLink}
                    alt={dialogs.imageLink}
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
                      maxHeight: "500px",
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
                      Date: {dialogs.startAt}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        mt: 1,
                      }}
                    >
                      {dialogs.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "h4.fontSize",
                        fontWeight: "500",
                        overflow: "hidden",
                        maxWidth: "100%",
                      }}
                    >
                      {dialogs.forUser.length <= 15 ? (
                        dialogs.forUser
                      ) : (
                        <>
                          {dialogs.forUser.slice(0, 15)}
                          {dialogs.forUser.length > 15 && (
                            <>
                              <span
                                style={{
                                  fontSize: "15px",
                                  color: 'blue',
                                  cursor: 'pointer',
                                  display: 'inline-block',
                                  marginLeft: '4px',
                                }}
                                onClick={() => openFullArticleDialog(dialogs)}
                              >
                                ... <span style={{ display: 'inline' }}>read more</span>
                              </span>
                            </>
                          )}
                        </>
                      )}
                    </Typography>
                    <br />
                    <br />
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => editClick(dialogs)}
                      sx={{ mt: "auto", ml: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteClick(dialogs)}
                      sx={{ mt: "auto", ml: 1 }}
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
        open={fullArticleDialogOpen}
        onClose={closeFullArticleDialog}
      >
        <DialogTitle>{selectedDialogs?.title}</DialogTitle>
        <DialogContent>
          <img
            src={selectedDialogs?.imageLink}
            alt={selectedDialogs?.imageLink}
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
          <Typography>
            Date: {selectedDialogs?.startAt}
          </Typography>
          <Typography>
            Dialog Info: {selectedDialogs?.forUser}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFullArticleDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this dialogs?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ mr: 1 }} onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button sx={{ ml: 1 }} onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogsPage;
