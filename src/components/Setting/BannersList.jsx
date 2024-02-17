import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

import { selectUserData } from "../../app/UserSlice";
import { useSelector } from "react-redux";



const BannersList = () => {
const BannerData = useSelector(selectUserData)

  return (
    <Grid container>
      {BannerData.map((Person, index) => (
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
            <img src={Person.img} alt="img" width="100%" />
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
                {Person.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BannersList;
