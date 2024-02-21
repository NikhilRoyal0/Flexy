import React, { useEffect } from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchBannerData, selectBannerData, selectBannerLoading, selectBannerError } from "../../app/BannerSlice";
import { useNavigate } from "react-router-dom";
import errorimage from '../../assets/images/errorimage.jpg';
import AddIcon from '@mui/icons-material/Add';


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

  const handleClick = () =>{
    navigate("/setting/banners-list/add-banner")
  }

  return (
    <div style={{ position: "relative" }}>
      <Button
         sx={{
          position: "absolute",
          top: "10px",
          right: "30px",
          mt: "5px",
          zIndex: 1,
        }}
        color="primary"
        onClick={handleClick}
      >
        <AddIcon />
        <Typography sx={{ ml: 1 }}>Add Banner</Typography>
      </Button>
      <Card >
        <CardContent>
          <Grid container sx={{ marginTop: "25px" }}>
            {bannerData.map((Banner, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sm={6}
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
                    mt: "8px",
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
                      flex: "1",
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
                    <br />
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
        </CardContent>
      </Card>
    </div>
  );
};

export default BannersList;
