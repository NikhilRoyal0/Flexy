import React from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBannerData, selectBannerData, selectBannerLoading, selectBannerError } from "../../app/BannerSlice";
import { useNavigate } from "react-router-dom";
import errorimage from '../../assets/images/errorimage.jpg'


const BannersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bannerData = useSelector(selectBannerData);
  const isLoading = useSelector(selectBannerLoading);
  const error = useSelector(selectBannerError);

  useEffect(() => {
    dispatch(fetchBannerData());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const editClick = (Banner) => {
    navigate(`edit-banner/${Banner.bannerId}`);
  };



  return (
    <Grid container>
      {bannerData.map((Banner, index) => (
        <Grid
          key={index}
          item
          xs={12}
          s={6}
          md={4}
          lg={3}
          sx={{
            display: "flex",
            alignItems: "stretch",
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
              src={Banner.mediaPath}
              alt={Banner.mediaPath}
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
                {Banner.bannerTitle}
              </Typography>
              <Typography
                sx={{
                  fontSize: "h5.fontSize",
                  fontWeight: "300",
                }}
              >
                {Banner.endDateTime}
              </Typography>
              <Typography>
                <Button variant="outlined" color="primary" onClick={() => editClick(Banner)}>
                  Edit
                </Button>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BannersList;
