import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlansData, selectPlansData, selectPlansLoading, selectPlansError } from "../../app/PlansSlice";
import { useNavigate } from "react-router-dom";
import errorimage from '../../assets/images/errorimage.jpg'


const PlansPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const plansData = useSelector(selectPlansData);
  const isLoading = useSelector(selectPlansLoading);
  const error = useSelector(selectPlansError);

  useEffect(() => {
    dispatch(fetchPlansData());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
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
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlansPage;
