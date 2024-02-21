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
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectPlansData } from "../../app/PlansSlice"

  const EditPlan = () => {
    const { planId: planIdParam } = useParams();
    const [editMode, setEditMode] = useState(false);
    const [plan, setPlansData] = useState(null);
    const planData = useSelector(selectPlansData);
  
    const fetchPlansData = async () => {
      try {  
        const planId = parseInt(planIdParam);
        const selectedPlan = planData.find((ur) => ur.planId === planId);
        setPlansData(selectedPlan);
      } catch (error) {
        console.error('Error processing data:', error);
      }
    };
  
    useEffect(() => {
      fetchPlansData();
    }, [planIdParam, planData]); 
  
    const toggleEditMode = () => {
      setEditMode(!editMode);
    };
  
    const handleSave = () => {
      setEditMode(false);
    };
  

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Edit Plan - {plan && plan.planId}</Typography>
        <br />
        <Divider />
        <br />
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Plan Id"
                variant="outlined"
                fullWidth
                value={plan && plan.planId}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={plan && plan.planTitle}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Info"
                variant="outlined"
                fullWidth
                value={plan && plan.planInfo}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Plan Details"
                variant="outlined"
                fullWidth
                value={plan && plan.planExtraDetails}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="URL"
                variant="outlined"
                fullWidth
                value={plan && plan.planImages}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Status"
                variant="outlined"
                fullWidth
                value={plan && plan.planStatus}
                disabled={!editMode}
              />
            </Grid>

          </Grid>
          <br />
          <Divider />
          <br />
          {editMode ? (
            <>
              <Button variant="contained" color="success" onClick={handleSave}>
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
