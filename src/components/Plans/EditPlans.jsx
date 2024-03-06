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
  Snackbar,
  SnackbarContent,
  IconButton,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPlansData,
  fetchPlansData,
  updatePlansData,
} from "../../app/PlansSlice";
import { baseTheme } from "../../assets/global/Theme-variable";

const EditPlan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { planId: planIdParam } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [data, setData] = useState({
    planTitle: "",
    planInfo: "",
    planPrice: "",
    planExtraDetails: "",
    planImages: [],
    planMaxPayOut: "",
    createdBy: "",
  });

  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    console.log("Data before dispatch:", data)
  
    dispatch(updatePlansData(data.planId, data))
      .then(() => {
        toggleEditMode();
        setIsSuccess(true);
        showSnackbar("Plan updated successfully!");
        // setTimeout(() => {
        //   // navigate("../plans");
        // }, 1000);
      })
      .catch((error) => {
        setIsSuccess(false);
        showSnackbar("Error in updating plan. Please try again.");
        console.error("Error in updating plan:", error);
      });
  };


  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [loading, setLoading] = useState(true);
  const planData = useSelector(selectPlansData);

  const fetchPlansDataById = () => {
    const planId = parseInt(planIdParam);
    const selectedPlans = planData.find((Plans) => Plans.planId === planId);

    const parsedPlanImages = JSON.parse(selectedPlans.planImages);

    const updatedSelectedPlans = {
      ...selectedPlans,
      planImages: parsedPlanImages,
    };

    setData(updatedSelectedPlans);
    setLoading(false);
  };

  useEffect(() => {
    if (planData.length === 0) {
      dispatch(fetchPlansData());
    } else {
      fetchPlansDataById();
    }
  }, [planIdParam, dispatch, planData]);

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
    if (reason === "clickaway") {
      return;
    }
    if (!isSuccess) {
      setSnackbarOpen(false);
    }
  };

  const showSnackbar = (message) => {
    setSnackbarOpen(true);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const newImage = {
          url: reader.result,
        };

        setData((prevData) => ({
          ...prevData,
          planImages: [...prevData.planImages, newImage],
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...data.planImages];
    updatedImages.splice(index, 1);
    setData((prevData) => ({
      ...prevData,
      planImages: updatedImages,
    }));
    handlePopoverClose();
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Edit Plan - {data && data.planId}</Typography>
        <br />
        <Divider />
        <br />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {data.planImages.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={1} key={index}>
                <Card style={{ height: "180px", width: "220px" }}>
                  <CardContent>
                    <img
                      src={image.url}
                      alt={`Preview ${index + 1}`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "130px",
                        marginBottom: "10px",
                      }}
                    />
                    {editMode && (
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
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={(event) => handleDeleteImage(index, event)}
                        >
                          <DeleteIcon />
                          Delete
                        </Button>
                      </Popover>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
            {editMode && data.planImages.length < 4 && (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={1}>
                <Card style={{ height: "180px", width: "220px" }}>
                  <label htmlFor={`file-input-upload`}>
                    <input
                      id={`file-input-upload`}
                      type="file"
                      name={`planImages-upload`}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />

                    <CardContent
                      onClick={() =>
                        document.getElementById(`file-input-upload`)
                      }
                      style={{ textAlign: "center", marginTop: 23 }}
                    >
                      <AddIcon sx={{ fontSize: 40, color: "#808080" }} />
                      <br />
                      <Typography variant="caption" sx={{ color: "#000" }}>
                        Upload Image
                      </Typography>
                    </CardContent>
                  </label>
                </Card>
              </Grid>
            )}
          </Grid>
          <br />
          <Divider />
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                label="Title"
                variant="outlined"
                name="planTitle"
                onChange={handleTextChange}
                fullWidth
                value={data && data.planTitle}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Info"
                variant="outlined"
                name="planInfo"
                onChange={handleTextChange}
                fullWidth
                value={data && data.planInfo}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="planExtraDetails"
                variant="outlined"
                name="planExtraDetails"
                onChange={handleTextChange}
                fullWidth
                value={data && data.planExtraDetails}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Created By"
                variant="outlined"
                name="createdBy" // Corrected the field name
                onChange={handleTextChange}
                fullWidth
                value={data && data.createdBy}
                disabled={!editMode}
              />
            </Grid>
          </Grid>
          <br />
          <Divider />
          <br />
          {editMode ? (
            <>
              <Button
                variant="contained"
                color="success"
                type="submit"
              // onSubmit should be removed from here
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ ml: 1 }}
                onClick={toggleEditMode}
              >
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
            message="Plan updated successfully!"
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

export default EditPlan;
