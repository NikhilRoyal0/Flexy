import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  SnackbarContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAppData,
  fetchAppData,
  updateappSettingData,
} from "../../app/AppSlice";
import { baseTheme } from "../../assets/global/Theme-variable";

const AppSetting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: idParam } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [AppSetting, setAppSetting] = useState({
    id: "",
    appVersion: "",
    minVersion: "",
    appStatus: "",
    refMessage: "",
    termsConditions: "",
    aboutUs: "",
    contactUs: "",
    website: "",
    floatingButtonLink: "",
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
  });

  const [loading, setLoading] = useState(true);

  const helloData = useSelector(selectAppData);

  const fetchSettingData = async () => {
    try {
      setAppSetting(helloData);
      setLoading(false);
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

  useEffect(() => {
    if (helloData.length === 0) {
      dispatch(fetchAppData());
    } else {
      fetchSettingData();
    }
  }, [idParam, dispatch, helloData]);

  const handleSnackbarClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (isSuccess) {
      setSnackbarOpen(false);
    }
  };

  const showSnackbar = (message) => {
    setSnackbarOpen(true);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

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
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setAppSetting((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(updateappSettingData(AppSetting))
      .then(() => {
        toggleEditMode();
        setIsSuccess(true);
        showSnackbar("appSetting updated successfully!");
        setTimeout(() => {
          navigate("../setting/app-setting");
        }, 1000);
      })
      .catch((error) => {
        setIsSuccess(false);
        showSnackbar("Error in updating appSetting. Please try again.");
        console.error("Error in updating appSetting:", error);
      });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Edit App Setting</Typography>
        <br />
        <Divider />
        <br />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="App Version"
                variant="outlined"
                name="appVersion"
                fullWidth
                value={AppSetting && AppSetting.appVersion}
                onChange={handleTextChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Minimum Version"
                variant="outlined"
                name="minVersion"
                fullWidth
                value={AppSetting && AppSetting.minVersion}
                onChange={handleTextChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Website"
                variant="outlined"
                name="website"
                fullWidth
                value={AppSetting && AppSetting.website}
                onChange={handleTextChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ref Message"
                variant="outlined"
                name="refMessage"
                fullWidth
                value={AppSetting && AppSetting.refMessage}
                onChange={handleTextChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Terms and Conditions"
                variant="outlined"
                name="termsConditions"
                fullWidth
                value={AppSetting && AppSetting.termsConditions}
                onChange={handleTextChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" required sx={{ mb: 2 }}>
                <InputLabel htmlFor="Status">Status</InputLabel>
                <Select
                  label="App Status"
                  id="appstatus"
                  name="appStatus"
                  value={AppSetting && AppSetting.appStatus}
                  onChange={handleTextChange}
                  disabled={!editMode}
                  variant="outlined"
                  fullWidth
                >
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="0">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Link"
                variant="outlined"
                name="floatingButtonLink"
                fullWidth
                value={AppSetting && AppSetting.floatingButtonLink}
                onChange={handleTextChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="About Us"
                variant="outlined"
                name="aboutUs"
                fullWidth
                value={AppSetting && AppSetting.aboutUs}
                onChange={handleTextChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contact Us"
                variant="outlined"
                name="contactUs"
                fullWidth
                value={AppSetting && AppSetting.contactUs}
                onChange={handleTextChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Facebook"
                variant="outlined"
                name="facebook"
                fullWidth
                value={AppSetting && AppSetting.facebook}
                onChange={handleTextChange}
                disabled={!editMode}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Twitter"
                variant="outlined"
                name="twitter"
                fullWidth
                value={AppSetting && AppSetting.twitter}
                onChange={handleTextChange}
                disabled={!editMode}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Instagram"
                variant="outlined"
                name="instagram"
                fullWidth
                value={AppSetting && AppSetting.instagram}
                onChange={handleTextChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Youtube"
                variant="outlined"
                name="youtube"
                fullWidth
                value={AppSetting && AppSetting.youtube}
                onChange={handleTextChange}
                disabled={!editMode}
              />
            </Grid>
          </Grid>
          <br />
          <Divider />
          <br />
          {editMode ? (
            <>
              <Button variant="contained" color="success" type="submit">
                Save
              </Button>
              <Button
                variant="contained"
                sx={{ ml: 1 }}
                color="error"
                onClick={toggleEditMode}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={toggleEditMode}
            >
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
            message="task updated successfully!"
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
              color: isSuccess ? "#fff" : undefined,
            }}
          />
        </Snackbar>
      </CardContent>
    </Card>
  );
};

export default AppSetting;
