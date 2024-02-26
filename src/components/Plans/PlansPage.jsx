import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlansData, selectPlansData, selectPlansLoading, selectPlansError, deletePlanData } from "../../app/PlansSlice";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import errorimage from '../../assets/images/errorimage.jpg';
import CircularProgress from '@mui/material/CircularProgress';



const PlansPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const plansData = useSelector(selectPlansData);
  const isLoading = useSelector(selectPlansLoading);
  const error = useSelector(selectPlansError);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [planToDelete, setplanToDelete] = useState(null);

  const deleteClick = (plan) => {
    setplanToDelete(plan);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (planToDelete) {
      dispatch(deletePlanData(planToDelete.planId)).then(() => {
        setDeleteConfirmationOpen(false);
        setplanToDelete(null);
        dispatch(fetchPlansData());
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmationOpen(false);
    setplanToDelete(null);
  };

  useEffect(() => {
    dispatch(fetchPlansData());
  }, [dispatch]);

  if (isLoading) {
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  const editClick = (Plan) => {
    navigate(`edit-plan/${Plan.planId}`);
  };

  const handleClick = () => {
    navigate('/plans/add-plan')
  }


  return (
    <div style={{ position: "relative" }}>
      <Button
        sx={{
          position: "absolute",
          top: "5px",
          right: "30px",
          mt: "5px",
          zIndex: 1,
        }}
        color="primary"
        onClick={handleClick}
      >
        <AddIcon />
        <Typography sx={{ ml: 1 }}>Add Plan</Typography>
      </Button>

      <Card>
        <CardContent>
          <Grid container>
            {plansData.map((Plan, index) => (
              <Grid
                key={index}
                item
                xs={12}
                s={7}
                md={5}
                lg={4}
                xl={2.4}
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                  mt: "8px",
                }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    p: 0,
                    width: "100%",
                  }}
                >
                  <img
                    src={Plan.planImages}
                    alt={Plan.planImages}
                    onError={(e) => {
                      e.target.src = errorimage;
                      e.target.alt = "Error Image";
                    }}
                    width="100%"
                  />

                  <CardContent
                    sx={{
                      paddingLeft: "30px",
                      paddingRight: "30px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "h4.fontSize",
                        fontWeight: "500",
                      }}
                    >
                      {Plan.planTitle}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        mt: 1,
                      }}
                    >
                      {Plan.planInfo}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        mt: 1,
                      }}
                    >
                      {Plan.planExtraDetails}
                    </Typography>
                    <br />
                    <Typography>
                      <Button variant="outlined" color="primary" onClick={() => editClick(Plan)}>
                        Edit
                      </Button>
                      <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteClick(Plan)}
                    >
                      Delete
                    </Button>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this plan?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PlansPage;
