import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  TextField,
  Button,
  Popover,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { selectPlansData, fetchPlansData, updatePlans, updatePlansData } from "../../app/PlansSlice";

const EditPlan = () => {
  const dispatch = useDispatch();
  const { planId: planIdParam } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState(null);

  const [data, setData] = useState({
    planId: "",
    planTitle: "",
    planInfo: "",
    planExtraDetails: "",
    image: "",
    createdBy: "",
  });



    const handleSubmit = async (event) => {
      event.preventDefault();
    
      const response = dispatch(updatePlansData(data.planId, data));
    
      const updatedPlansData = response.data;
      
      dispatch(updatePlans(updatedPlansData));
      console.log(updatePlans)
    
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
    return <p>Loading...</p>;
  }

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
                label="Status"
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
              <Button variant="contained" color="success"  type="submit" onSubmit={handleSubmit}>
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

      </CardContent>
    </Card>
  );
};

export default EditPlan;
