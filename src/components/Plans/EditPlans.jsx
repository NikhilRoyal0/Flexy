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
  IconButton,
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { selectPlansData, fetchPlansData, updatePlansData } from "../../app/PlansSlice";

const EditPlan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { planId: planIdParam } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);


  const [data, setData] = useState({
    planId: "",
    planTitle: "",
    planInfo: "",
    planExtraDetails: "",
    image: "",
  });



  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(updatePlansData(data.planId, data))
      .then(() => {
        toggleEditMode();

        showSnackbar('Plan updated successfully!');

        setTimeout(() => {
          navigate("../plans");
        }, 1000);
      })

      .catch((error) => {
        showSnackbar('Error in updating plan. Please try again.');
        console.error('Error in updating plan:', error);
      });
  };

  const handleInputChange = (e) => {
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
    setData({ ...selectedPlans });
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
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
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
    const fileInput = document.getElementById("planImages");
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
        <Typography variant="h4">Edit Plan - {data && data.planId}</Typography>
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
                  src={data && data.planImages}
                  alt="Preview"
                  id="planImages"
                  name="planImages"
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
                      id="planImages"
                      name="planImages"
                      onChange={handleInputChange}
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
                name='planTitle'
                onChange={handleInputChange}
                fullWidth
                value={data && data.planTitle}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Info"
                variant="outlined"
                name='planInfo'
                onChange={handleInputChange}
                fullWidth
                value={data && data.planInfo}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="planExtraDetails"
                variant="outlined"
                name='planExtraDetails'
                onChange={handleInputChange}
                fullWidth
                value={data && data.planExtraDetails}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Created By"
                variant="outlined"
                name='isPublished'
                onChange={handleInputChange}
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
              <Button variant="contained" color="success" type="submit" onSubmit={handleSubmit}>
                Save
              </Button>
              <Button variant="contained" color="error" onClick={toggleEditMode}>
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
          message="Plan updated successfully!"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackbarClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />

      </CardContent>
    </Card>
  );
};

export default EditPlan;
