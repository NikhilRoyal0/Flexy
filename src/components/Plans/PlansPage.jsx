import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import errorimage from '../../assets/images/errorimage.jpg';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlansData, selectPlansData, selectPlansLoading, selectPlansError, deletePlanData } from "../../app/PlansSlice";



const PlansPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const plansData = useSelector(selectPlansData);
  const isLoading = useSelector(selectPlansLoading);
  const error = useSelector(selectPlansError);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [planToDelete, setplanToDelete] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [fullArticleDialogOpen, setFullArticleDialogOpen] = useState(false);
  const [filterOption, setFilterOption] = useState(0);

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const deleteClick = (plan) => {
    setplanToDelete(plan);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (planToDelete) {
      dispatch(deletePlanData(planToDelete.planId)).then(() => {
        console.log("Plan deleted successfully");
        setDeleteConfirmationOpen(false);
        setplanToDelete(null);
        // Update state after deletion
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
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <Typography variant="h4" color="error" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center">
          {error}
        </Typography>
      </Box>
    );
  }

  const editClick = (Plan) => {
    navigate(`edit-plan/${Plan.planId}`);
  };

  const handleClick = () => {
    navigate('/plans/add-plan')
  }

  const openFullArticleDialog = (Plan) => {
    setSelectedPlan(Plan);
    setFullArticleDialogOpen(true);
  };

  const closeFullArticleDialog = () => {
    setFullArticleDialogOpen(false);
  };

  const getFirstImageUrl = (Plan) => {
    if (Plan && Plan.planImages) {
      const myarray = JSON.parse(Plan.planImages);
      return myarray.length > 0 ? myarray[0].url : '';
    }
    return '';
  };

  const getSpecificImageUrl = (Plan, targetKey) => {
    if (Plan && Plan.planImages) {
      const imagesArray = JSON.parse(Plan.planImages);
      const targetImage = imagesArray.find((image) => image.key === targetKey);
      return targetImage ? targetImage.url : '';
    }
    return '';
  };

  
  const filteredPlans = plansData.filter((Plan) => {
    if (filterOption === 0) {
      return Plan.planStatus == 0; 
    } else if (filterOption === 1) {
      return Plan.planStatus == 1; 
    }
    return false;
  });


  return (
    <div style={{ position: "relative" }}>

      <Card>
        <CardContent
          sx={{
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
           <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Grid item>
          <FormControl variant="outlined" sx={{ minWidth: '150px' }}>
            <InputLabel htmlFor="status">Filter By Status</InputLabel>
            <Select
              label="Filter By Status"
              variant="outlined"
              size="small"
              value={filterOption}
              onChange={handleFilterChange}
            >
              <MenuItem value={0}>Active</MenuItem>
              <MenuItem value={1}>InActive</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            sx={{
              color: "primary",
              display: "flex",
              alignItems: "center",
            }}
            onClick={handleClick}
          >
            <AddIcon />
            <Typography sx={{ ml: 1 }}>Add Plan</Typography>
          </Button>
        </Grid>
      </Grid>
          <Grid container>
            {filteredPlans.map((Plan, index) => {
              const specificImageUrl = getSpecificImageUrl(Plan, 0);
              return (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={4}
                  xl={3}
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
                      src={specificImageUrl}
                      alt={specificImageUrl}
                      onError={(e) => {
                        e.target.src = errorimage;
                        e.target.alt = "Error Image";
                      }}
                      width="100%"
                      height="210px"
                      style={{
                        objectFit: 'contain',
                      }}
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
                          width: "100%",
                        }}
                      >
                        {Plan.planInfo.length <= 15 ? (
                          Plan.planInfo
                        ) : (
                          <>
                            {Plan.planInfo.split(' ').slice(0, 5).join(' ')}
                            <span
                              style={{
                                fontSize: "15px",
                                color: 'blue',
                                cursor: 'pointer',
                                display: 'inline-block',
                                marginLeft: '4px',
                              }}
                              onClick={() => openFullArticleDialog(Plan)}
                            >
                              ... <span style={{ display: 'inline' }}>read more</span>
                            </span>
                          </>
                        )}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: "14px",
                          fontWeight: "400",
                          mt: 1,
                          width: "100%",
                        }}
                      >
                        {Plan.planExtraDetails.length <= 15 ? (
                          Plan.planExtraDetails
                        ) : (
                          <>
                            {Plan.planExtraDetails.split(' ').slice(0, 5).join(' ')}
                            <span
                              style={{
                                fontSize: "15px",
                                color: 'blue',
                                cursor: 'pointer',
                                display: 'inline-block',
                                marginLeft: '4px',
                              }}
                              onClick={() => openFullArticleDialog(Plan)}
                            >
                              ... <span style={{ display: 'inline' }}>read more</span>
                            </span>
                          </>
                        )}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: "14px",
                          fontWeight: "400",
                          mt: 1,
                        }}
                      >
                        {Plan.createdBy}
                      </Typography>
                      <br />
                      <Typography>
                        <Button variant="outlined" color="primary" onClick={() => editClick(Plan)} sx={{ ml: 1 }}>
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => deleteClick(Plan)}
                          sx={{ ml: 1 }}
                        >
                          Delete
                        </Button>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </CardContent>
      </Card>

      <Dialog
        open={fullArticleDialogOpen}
        onClose={closeFullArticleDialog}
      >
        <DialogTitle>{selectedPlan?.planTitle}</DialogTitle>
        <DialogContent>

          <img
            src={getFirstImageUrl(selectedPlan)}
            alt={selectedPlan?.planTitle}
            onError={(e) => {
              e.target.src = errorimage;
              e.target.alt = "Error Image";
            }}
            width="100%"
            height="210px"
            style={{
              objectFit: 'contain',
            }}
          />
          <Typography>
            Created By: {selectedPlan?.createdBy}
          </Typography>
          <Typography>
            Plan Info: {selectedPlan?.planInfo}
          </Typography>
          <br />
          <Typography>
            Plan ExtraDetails: {selectedPlan?.planExtraDetails}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFullArticleDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>


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
