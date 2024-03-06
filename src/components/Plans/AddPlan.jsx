import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Popover,
  Snackbar,
  SnackbarContent,
  IconButton,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch } from "react-redux";
import { AddPlanData, AddImagesData } from "../../app/PlansSlice";
import { useNavigate } from 'react-router-dom';
import { baseTheme } from "../../assets/global/Theme-variable";

const AddPlan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [popoverAnchor, setPopoverAnchor] = React.useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imgUrls, setImageUrls] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);

  const [formData, setFormData] = React.useState({
    "planTitle": '',
    "planInfo": '',
    "planPrice": '',
    "planExtraDetails": '',
    "planImages": [],
    "planMaxPayOut": '',
    "createdBy": '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    let imagearray = []
    if (imgUrls.length == 0) {
      console.log("data empty")
    } else

    for (let index = 0; index < imgUrls.length; index++){

      var plandataimage = {
        key: index,
        url: imgUrls[index]

      }
      imagearray.push(plandataimage)
    }
    const form = new FormData();
    form.append('planTitle', formData.planTitle);
    form.append('planInfo', formData.planInfo);
    form.append('planPrice', formData.planPrice);
    form.append('planExtraDetails', formData.planExtraDetails);
    form.append('planMaxPayOut', formData.planMaxPayOut);
    form.append('createdBy', formData.createdBy);
    form.append('planImages', JSON.stringify(imagearray));

    try {
      console.log("Before Dispatch", formData)
      const response = await dispatch(AddPlanData(form));

      if (response && response.error) {
        console.error("Error adding plan:", response.error);
      } else {
        setIsSuccess(true);
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate("../plans");
      }, 1000);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleUploadImage = async (index) => {
    const file = selectedFiles[index];
    if (file !== null) {
      const formDataForImage = new FormData();
      formDataForImage.append("image", file);

      try {
        const imageUrl = await dispatch(AddImagesData(formDataForImage));

        setImageUrls((prevImageUrls) => [...prevImageUrls, imageUrl]);

        console.log("Updated Image URLs:", [...imgUrls, imageUrl]);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    if (!isSuccess) {
      setSnackbarOpen(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, file]);

    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreviews((prevPreviews) => [...prevPreviews, reader.result]);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveClick = (index) => {
    setSelectedFiles((prevSelectedFiles) => {
      const newSelectedFiles = [...prevSelectedFiles];
      newSelectedFiles[index] = null;
      return newSelectedFiles;
    });

    setFilePreviews((prevPreviews) => {
      const newPreviews = [...prevPreviews];
      newPreviews.splice(index, 1);
      return newPreviews;
    });

    setPopoverAnchor(null);
  };

  const handleImageClick = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  return (
    <div>
      <Card
        variant="outlined"
        sx={{
          p: 0,
          borderRadius: baseTheme.shape.borderRadius,
          padding: baseTheme.mixins.toolbar.padding,
        }}
      >
        <Box
          sx={{
            padding: "15px 30px",
          }}
          display="flex"
          alignItems="center"
        >
          <Box flexGrow={1}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              Add Plan
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent
          sx={{
            padding: "30px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} sx={{ display: "flex", flexWrap: "wrap" }}>
                {filePreviews.map((preview, index) => (
                  <Card key={index} variant="outlined"
                    sx={{
                      height: "150px",
                      width: "190px",
                      textAlign: "center",
                      marginLeft: "10px",
                      overflowY: "auto",
                      "&::-webkit-scrollbar": {
                        width: 0,
                      },
                      scrollbarWidth: "none",
                    }}
                  >
                    <img
                      src={preview}
                      alt="Preview"
                      style={{ maxWidth: "100%", maxHeight: "130px", marginRight: "10px", marginTop: "auto" }}
                      onClick={handleImageClick}
                    />
                    <Popover
                      open={Boolean(popoverAnchor)}
                      anchorEl={popoverAnchor}
                      onClose={handlePopoverClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                    >
                      <Box p={1}>
                        <Button
                          color="secondary"
                          variant="outlined"
                          onClick={() => handleRemoveClick(index)}
                          startIcon={<DeleteIcon />}
                        >
                        </Button>
                        <Button
                          color="secondary"
                          variant="outlined"
                          onClick={() => handleUploadImage(index)}
                          startIcon={<CloudUploadIcon />}
                        >
                        </Button>
                      </Box>
                    </Popover>
                    <Typography sx={{ mt: 1, fontSize: 9 }}>
                      Selected File: {selectedFiles[index].name}
                    </Typography>
                  </Card>
                ))}
                
                {selectedFiles.length < 4 && (
                  <label htmlFor="file-input">
                    <input
                      id="file-input"
                      type="file"
                      name="planImages"
                      onChange={handleFileSelect}
                      style={{ display: 'none' }}
                      required={selectedFiles.length === 1}
                    />
                    <Card sx={{
                      width: 190,
                      height: 150,
                      textAlign: "center",
                      display: "flex",
                      marginLeft: "10px"
                    }}>
                      <CardActionArea onClick={() => document.getElementById("file-input").click()}>
                        <Grid direction="row">
                          <CardContent>
                            <AddIcon
                              sx={{ fontSize: 40, color: '#808080', cursor: 'pointer' }}
                            />
                            <br />
                            <Typography variant="caption" sx={{ color: '#000' }}>
                              Upload Image
                            </Typography>
                          </CardContent>
                        </Grid>
                      </CardActionArea>
                    </Card>
                  </label>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="plan-title"
                  label="Plan Title"
                  name="planTitle"
                  variant="outlined"
                  onChange={handleInputChange}
                  fullWidth
                  required
                  sx={{
                    mb: 2,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="Plan-info"
                  label="Plan Info"
                  name="planInfo"
                  variant="outlined"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  sx={{
                    mb: 2,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="planPrice"
                  label="Plan Price"
                  name="planPrice"
                  variant="outlined"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  sx={{
                    mb: 2,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="planExtraDetails"
                  label="Plan Extra-Details"
                  name="planExtraDetails"
                  variant="outlined"
                  onChange={handleInputChange}
                  fullWidth
                  required
                  sx={{
                    mb: 2,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="planMaxPayOut"
                  label="Plan Payout"
                  name="planMaxPayOut"
                  variant="outlined"
                  onChange={handleInputChange}
                  fullWidth
                  required
                  sx={{
                    mb: 2,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="createdBy"
                  label="Created By"
                  name="createdBy"
                  variant="outlined"
                  onChange={handleInputChange}
                  fullWidth
                  required
                  sx={{
                    mb: 2,
                  }}
                />
              </Grid>

            </Grid>
            <div>
              <br />
              <Button color="secondary" variant="contained" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
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
          message="New Plan added successfully!"
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
    </div>
  );
};

export default AddPlan;
