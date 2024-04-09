import React, { useState } from "react";
import {
  Card,
  CardContent,
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
  LinearProgress,
  MenuItem,
  CardActionArea,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch } from "react-redux";
import { AddPlanData, AddImagesData } from "../../app/PlansSlice";
import { useNavigate } from "react-router-dom";
import { baseTheme } from "../../assets/global/Theme-variable";
import LoadingButton from "@mui/lab/LoadingButton";

const AddPlan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imgUrls, setImageUrls] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [popoverIndex, setPopoverIndex] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [imageSelectError, setImageSelectError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // New state for loading button

  const [formData, setFormData] = useState({
    planTitle: "",
    planInfo: "",
    planPrice: "",
    planExtraDetails: "",
    planImages: [],
    planMaxPayOut: "",
    planStatus: "",
    createdBy: 1,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading

    let imagearray = [];

    if (imgUrls.length > 0) {
      for (let index = 0; index < imgUrls.length; index++) {
        var plandataimage = {
          key: index,
          url: imgUrls[index],
        };
        imagearray.push(plandataimage);
      }
      console.log("array image", imagearray);

      const form = new FormData();
      form.append("planTitle", formData.planTitle);
      form.append("planInfo", formData.planInfo);
      form.append("planPrice", formData.planPrice);
      form.append("planExtraDetails", formData.planExtraDetails);
      form.append("planMaxPayOut", formData.planMaxPayOut);
      form.append("createdBy", formData.createdBy);
      form.append("planImages", JSON.stringify(imagearray));
      form.append("planStatus", formData.planStatus);

      try {
        console.log("Before Dispatch", formData);
        const response = await dispatch(AddPlanData(form));

        if (response && response.error) {
          console.error("Error adding plan:", response.error);
        } else {
          setIsSuccess(true);
          setSnackbarOpen(true);
          setTimeout(() => {
            navigate("../addon/plans");
          }, 1000);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    } else {
      window.alert("Please select at least one image");
    }
  };

  const handleUploadImage = async (index) => {
    const file = selectedFiles[index];

    if (file !== null) {
      const formDataForImage = new FormData();
      formDataForImage.append("image", file);

      try {
        const config = {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        };

        const imageUrl = await dispatch(
          AddImagesData(formDataForImage, config)
        );

        setImageUrls((prevImageUrls) => {
          const newImageUrls = [...prevImageUrls];
          newImageUrls[index] = imageUrl;
          return newImageUrls;
        });

        setTimeout(() => {
          setUploadProgress(100);
        }, 500);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setTimeout(() => {
          setUploadProgress(0);
        }, 1000);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
    const allowedExtensions = ["jpg", "png", "webp", "jpeg"];

    // Get the file extension
    const fileExtension = file.name.split(".").pop().toLowerCase();

    // Check if the file extension is allowed
    if (!allowedExtensions.includes(fileExtension)) {
      setImageSelectError("Please select a JPG, PNG, WEBP, or JPEG image.");
      return;
    }

    // Reset error message if file extension is valid
    setImageSelectError("");

    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, file]);

    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreviews((prevPreviews) => [...prevPreviews, reader.result]);
    };
    reader.readAsDataURL(file);

    setIsImageSelected(true);
  };

  const handleRemoveClick = () => {
    setSelectedFiles((prevSelectedFiles) => {
      const newSelectedFiles = [...prevSelectedFiles];
      newSelectedFiles[popoverIndex] = null;
      return newSelectedFiles.filter(Boolean);
    });

    setFilePreviews((prevPreviews) => {
      const newPreviews = [...prevPreviews];
      newPreviews.splice(popoverIndex, 1);
      return newPreviews;
    });

    setImageUrls((prevImageUrls) => {
      const newImageUrls = [...prevImageUrls];
      newImageUrls.splice(popoverIndex, 1);
      return newImageUrls;
    });

    setPopoverAnchor(null);
    setPopoverIndex(null);
  };

  const handleImageClick = (event, index) => {
    setPopoverAnchor(event.currentTarget);
    setPopoverIndex(index);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  return (
    <div>
      <LinearProgress
        variant="determinate"
        value={uploadProgress}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          backgroundColor: "#fff",
        }}
      />

      <Card
        variant="outlined"
        sx={{
          p: 0,
          borderRadius: baseTheme.shape.borderRadius,
          padding: baseTheme.mixins.toolbar.padding,
          marginTop: "10px",
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
              <Grid
                item
                xs={12}
                md={12}
                sx={{ display: "flex", flexWrap: "wrap" }}
              >
                {filePreviews.map((preview, index) => (
                  <Card
                    key={index}
                    variant="outlined"
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
                      position: "relative",
                    }}
                  >
                    <img
                      src={preview}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "130px",
                        marginRight: "10px",
                        marginTop: "auto",
                      }}
                      onClick={(event) => handleImageClick(event, index)}
                    />
                    <Popover
                      open={Boolean(popoverAnchor)}
                      anchorEl={popoverAnchor}
                      onClose={handlePopoverClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <Box p={1}>
                        <Button
                          color="secondary"
                          variant="outlined"
                          onClick={handleRemoveClick}
                        >
                          <DeleteIcon />
                        </Button>

                        <Button
                          color="secondary"
                          variant="outlined"
                          onClick={() => handleUploadImage(index)}
                        >
                          <CloudUploadIcon />
                        </Button>
                      </Box>
                    </Popover>
                    <Typography sx={{ mt: 1, fontSize: 9 }}>
                      Selected File: {selectedFiles[index]?.name}
                    </Typography>
                  </Card>
                ))}

                {selectedFiles.length < 4 && (
                  <label htmlFor="file-input">
                    <label htmlFor="file-input">
                      <input
                        id="file-input"
                        type="file"
                        name="planImages"
                        onChange={handleFileSelect}
                        style={{ display: "none" }}
                        required
                      />
                    </label>
                    <Card
                      sx={{
                        width: 210,
                        height: 150,
                        textAlign: "center",
                        display: "flex",
                        marginLeft: "10px",
                      }}
                    >
                      <CardActionArea
                        onClick={() =>
                          document.getElementById("file-input").click()
                        }
                      >
                        <Grid direction="row">
                          <CardContent>
                            <AddIcon
                              sx={{
                                fontSize: 40,
                                color: "#808080",
                                cursor: "pointer",
                              }}
                            />
                            <br />
                            <Typography
                              variant="caption"
                              sx={{ color: "black" }}
                            >
                              Upload Image
                            </Typography>
                            <br />
                            <Typography
                              variant="caption"
                              sx={{ color: "#bababa" }}
                            >
                              Support PNG, JPEG and WEBP upto (765*565 px)
                            </Typography>
                          </CardContent>
                        </Grid>
                      </CardActionArea>
                    </Card>
                    {imageSelectError && (
                      <Typography variant="body2" color="error">
                        {imageSelectError}
                      </Typography>
                    )}
                  </label>
                )}
              </Grid>

              {/* Other form fields */}
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
                  id="planStatus"
                  label="Plan Status"
                  name="planStatus"
                  select
                  variant="outlined"
                  onChange={handleInputChange}
                  fullWidth
                  required
                  sx={{
                    mb: 2,
                  }}
                >
                  <MenuItem value={1}>Active</MenuItem>
                  <MenuItem value={0}>Inactive</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="Plan-info"
                  label="Plan Info"
                  name="planInfo"
                  variant="outlined"
                  multiline
                  rows={4}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  sx={{
                    mb: 2,
                  }}
                />
              </Grid>
            </Grid>
            <div>
              <br />
              <LoadingButton
                color="secondary"
                variant="contained"
                type="submit"
                loading={isLoading}
              >
                Submit
              </LoadingButton>
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
            color: isSuccess ? "#fff" : undefined,
          }}
        />
      </Snackbar>
    </div>
  );
};

export default AddPlan;
