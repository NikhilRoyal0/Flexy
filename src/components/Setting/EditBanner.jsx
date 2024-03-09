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
  Popover,
  IconButton,
  Snackbar,
  SnackbarContent,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { selectBannerData, fetchBannerData, updateBannerData } from "../../app/BannerSlice";
import { baseTheme } from "../../assets/global/Theme-variable";

const EditBanner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bannerId: bannerIdParam } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  const [oldData, setoldData] = useState(null);

  const [data, setData] = useState({
    title: "",
    bannerType: "",
    endDate: "",
    bannerStatus: "",
    onClick: "",
    mediaPath: "",
  });


  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(updateBannerData(data.bannerId, data))
      .then(() => {
        toggleEditMode();
        setIsSuccess(true)
        showSnackbar('Banner updated successfully!');

        setTimeout(() => {
          navigate("../setting/banners-list");
        }, 1000);
      })

      .catch((error) => {
        setIsSuccess(false);
        showSnackbar('Error in updating banner. Please try again.');
        console.error('Error in updating banner:', error);
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
  const bannerData = useSelector(selectBannerData);

  const fetchBannerDataById = () => {
    const bannerId = parseInt(bannerIdParam);
    const selectedBanner = bannerData.find((banner) => banner.bannerId === bannerId);
    setoldData({ ...selectedBanner });
    setLoading(false);
  };

  useEffect(() => {
    if (bannerData.length === 0) {
      dispatch(fetchBannerData());
    } else {
      fetchBannerDataById();
    }
  }, [bannerIdParam, dispatch, bannerData]);


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
        <Typography variant="h4">Edit Banner - {data && oldData.bannerId}</Typography>
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
                  width: "190px",
                  textAlign: "center",
                }}
              >
                <img
                  src={data && oldData.mediaPath}
                  alt="Preview"
                  id="image"
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
                      id="image"
                      name="mediaPath"
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
                label="Title"
                variant="outlined"
                name='title'
                onChange={handleTextChange}
                fullWidth
                value={oldData.bannerTitle ?? data.title}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="bannerType-label">Banner Type</InputLabel>
                <Select
                   label="Banner Type"
                   variant="outlined"
                   name='bannerType'
                   onChange={handleTextChange}
                   fullWidth
                   value={data && oldData.bannerType}
                   disabled={!editMode}
                >
                  <MenuItem value="social">Social</MenuItem>
                  <MenuItem value="link">Link</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="datetime-local"
                variant="outlined"
                name='endDate'
                label='End Date'
                onChange={handleTextChange}
                fullWidth
                value={oldData.endDateTime ?? data.endDate}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" required sx={{ mb: 2 }}>
                <InputLabel htmlFor="status">Status</InputLabel>
                <Select
                  label="status"
                  id="status"
                  name="status"
                  value={data && oldData.bannerStatus}
                  onChange={handleTextChange}
                  disabled={!editMode}
                >
                  <MenuItem value="0">Active</MenuItem>
                  <MenuItem value="1">Inactive</MenuItem>
                  <MenuItem value="2">Progress</MenuItem>
                </Select>
              </FormControl>

            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="On Click"
                variant="outlined"
                name='onClick'
                onChange={handleTextChange}
                fullWidth
                value={oldData.bannerOnClick ?? data.onClick}
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
            message="Banner updated successfully!"
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

export default EditBanner;
