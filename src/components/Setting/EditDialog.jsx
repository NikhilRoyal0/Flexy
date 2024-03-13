import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  TextField,
  Button,
  Popover,
  Snackbar,
  SnackbarContent,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { selectdialogsData, fetchdialogsData, updatedialogsData } from "../../app/DialogSlice";
import { baseTheme } from "../../assets/global/Theme-variable";

const EditDialog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dId: dIdParam } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);



  const [data, setData] = useState({
    title: "",
    forUser: "",
    startAt: "",
    endAt: "",
    status: "",
    createdBy: "",
    imageLink: file,

  });


  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(updatedialogsData(data.dId, data))
      .then(() => {
        toggleEditMode();
        setIsSuccess(true)

        showSnackbar('Dialog updated successfully!');
        console.log(data)

        setTimeout(() => {
          navigate("../setting/dialogs-list");
        }, 1000);
      })

      .catch((error) => {
        setIsSuccess(false);
        showSnackbar('Error in updating Dialog. Please try again.');
        console.error('Error in updating dialog:', error);
      });
  };


  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      const selectedFile = files[0];

      const reader = new FileReader();
      reader.onload = (event) => {
        setFile(event.target.result);
        setData((prevData) => ({
          ...prevData,
          [name]: event.target.result,
        }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };


  const [loading, setLoading] = useState(true);
  const dialogsData = useSelector(selectdialogsData);

  const fetchdialogsDataById = () => {
    const dId = parseInt(dIdParam);
    const selecteddialogs = dialogsData.find((dialog) => dialog.dId === dId);
    setData({ ...selecteddialogs });
    setLoading(false);
  };

  useEffect(() => {
    if (dialogsData.length === 0) {
      dispatch(fetchdialogsData());
    } else {
      fetchdialogsDataById();
    }
  }, [dIdParam, dispatch, dialogsData]);


  if (loading) {
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

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if (!isSuccess) {
      setSnackbarOpen(false);
    }
  };

  const showSnackbar = (message) => {
    setSnackbarOpen(true);
  };

  const handleImageClick = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  const handleImageChange = () => {
    const fileInput = document.getElementById("mediaPath");
    if (fileInput) {
      fileInput.click();
    }
  };

  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Edit Dialog - {data && data.dId}</Typography>
        <br />
        <Divider />
        <br />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Card
                variant="outlined"
                sx={{
                  height: "150px",
                  width: "210px",
                  textAlign: "center",
                }}
              >
                <img
                  src={file || (data && data.imageLink)}
                  alt="Preview"
                  id="image"
                  name="mediaPath"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "130px",
                    marginRight: "10px",
                    marginTop: "auto",
                  }}
                  onClick={handleImageClick}
                />
                {editMode && (
                  <Popover
                    open={Boolean(popoverAnchor)}
                    anchorEl={popoverAnchor}
                    onClose={handlePopoverClose}
                    disabled={!editMode}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <input
                      type="file"
                      id="mediaPath"
                      name="image"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleImageChange}
                      startIcon={<AddIcon />}
                    >
                      Change
                    </Button>
                  </Popover>
                )}
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Dialog Title"
                variant="outlined"
                name='title'
                onChange={handleTextChange}
                fullWidth
                value={data && data.title}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" required sx={{ mb: 2 }}>
                <InputLabel htmlFor="forUser">For User</InputLabel>
                <Select
                  label="for User"
                  variant="outlined"
                  name='forUser'
                  onChange={handleTextChange}
                  fullWidth
                  value={data && data.forUser}
                  disabled={!editMode}
                >
                  <MenuItem value="None">none</MenuItem>
                  <MenuItem value="havePlan">havePlan</MenuItem>
                  <MenuItem value="noPlan">noPlan</MenuItem>
                  <MenuItem value="allUser">allUser</MenuItem>
                </Select>
              </FormControl>

            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="datetime-local"
                label="Start At"
                variant="outlined"
                name='startAt'
                onChange={handleTextChange}
                fullWidth
                value={data && data.startAt}
                disabled={!editMode}

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="datetime-local"
                label="End At"
                variant="outlined"
                name='endAt'
                onChange={handleTextChange}
                fullWidth
                value={data && data.endAt}
                disabled={!editMode}

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Created By"
                variant="outlined"
                name='createdBy'
                onChange={handleTextChange}
                fullWidth
                value={data && data.createdBy}
                disabled={!editMode}

              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" required sx={{ mb: 2 }}>
                <InputLabel htmlFor="status">Status</InputLabel>
                <Select
                  label="Status"
                  variant="outlined"
                  name='status'
                  onChange={handleTextChange}
                  fullWidth
                  value={data && data.status}
                  disabled={!editMode}
                >
                  <MenuItem value="0">Active</MenuItem>
                  <MenuItem value="1">Inactive</MenuItem>
                  <MenuItem value="2">Progress</MenuItem>
                </Select>
              </FormControl>

            </Grid>

          </Grid>
          <br />
          <Divider />
          <br />
          {editMode ? (
            <>
              <Button variant="contained" color="success" type="submit" onSubmit={handleSubmit}>
                Save
              </Button>
              <Button variant="contained" color="error" sx={{ ml: 1 }} onClick={toggleEditMode}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={toggleEditMode}>
              Edit
            </Button>
          )}
        </form>

        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
        >
          <SnackbarContent
            message="Dialog updated successfully!"
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackbarClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
            sx={{
              backgroundColor: isSuccess
                ? baseTheme.palette.success.main
                : baseTheme.palette.error.main,
              color: isSuccess ? '#fff' : undefined,
            }}
          />
        </Snackbar>

      </CardContent>
    </Card>
  );
};

export default EditDialog;
