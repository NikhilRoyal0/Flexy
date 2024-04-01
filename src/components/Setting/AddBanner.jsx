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
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddBannerData } from "../../app/BannerSlice";
import { baseTheme } from "../../assets/global/Theme-variable";
import LoadingButton from "@mui/lab/LoadingButton";

const AddBanner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [popoverAnchor, setPopoverAnchor] = React.useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading button
  const [imageSelectError, setImageSelectError] = useState("");

  const [formData, setFormData] = React.useState({
    title: "",
    endDate: "",
    bannerType: "",
    onClick: "",
    image: selectedFile,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading
    const form = new FormData();
    form.append("title", formData.title);
    form.append("endDate", formData.endDate);
    form.append("bannerType", formData.bannerType);
    form.append("onClick", formData.onClick);
    form.append("image", selectedFile);

    dispatch(AddBannerData(form))
      .then(() => {
        setIsSuccess(true);
        console.log(formData);
        setTimeout(() => {
          navigate("../setting/banners-list");
        }, 1000);
      })
      .finally(() => {
        setIsLoading(false); // Stop loading
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const allowedExtensions = ["jpg", "png", "webp", "jpeg"];

    // Get the file extension
    const fileExtension = file.name.split(".").pop().toLowerCase();

    // Check if the file extension is allowed
    if (!allowedExtensions.includes(fileExtension)) {
      // Display error message
      setIsSuccess(false);
      setImageSelectError("Please select a JPG, PNG, WEBP, or JPEG image.");
      return;
    }

    // Reset error message if file extension is valid
    setImageSelectError("");

    setSelectedFile(file);
  };

  const handleRemoveClick = () => {
    setSelectedFile(null);
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
              Add Banner
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
              <Grid item xs={12} md={12}>
                {selectedFile ? (
                  <Card
                    variant="outlined"
                    sx={{
                      height: "150px",
                      width: "190px",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "130px",
                        marginRight: "10px",
                        marginTop: "auto",
                      }}
                      onClick={handleImageClick}
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
                      <Box p={2}>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={handleRemoveClick}
                          startIcon={<CancelIcon />}
                        >
                          Remove
                        </Button>
                      </Box>
                    </Popover>
                    <Typography sx={{ mt: 1, fontSize: 9 }}>
                      Selected File: {selectedFile.name}
                    </Typography>
                  </Card>
                ) : (
                  <label htmlFor="file-input">
                    <input
                      id="file-input"
                      type="file"
                      name="image"
                      onChange={handleFileSelect}
                      style={{ display: "none" }}
                      required
                    />
                    <Card
                      sx={{
                        maxWidth: 210,
                        height: 150,
                        textAlign: "center",
                        display: "flex",
                      }}
                    >
                      <CardActionArea
                        onClick={() =>
                          document.getElementById("file-input").click()
                        }
                      >
                        <CardContent>
                          <AddIcon
                            sx={{
                              fontSize: 40,
                              color: "#808080",
                              cursor: "pointer",
                            }}
                          />
                          <br />
                          <Typography variant="caption" sx={{ color: "#000" }}>
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
                      </CardActionArea>
                    </Card>
                    {imageSelectError && (
                      <Typography sx={{ color: "error.main" }}>
                        {imageSelectError}
                      </Typography>
                    )}
                  </label>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="title"
                  label="Title"
                  name="title"
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
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="paymentDate"></InputLabel>
                  <TextField
                    label="End Date"
                    type="datetime-local"
                    id="endDate"
                    name="endDate"
                    variant="outlined"
                    onChange={handleInputChange}
                    fullWidth
                    required
                    sx={{
                      mb: 2,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                  <InputLabel id="bannerType-label">Banner-type</InputLabel>
                  <Select
                    labelId="bannerType-label"
                    id="bannerType"
                    label="Banner-type"
                    name="bannerType"
                    onChange={handleInputChange}
                    required
                  >
                    <MenuItem value="social">Social</MenuItem>
                    <MenuItem value="link">Link</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="On click"
                  label="On click"
                  name="onClick"
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
    </div>
  );
};

export default AddBanner;
