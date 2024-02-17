import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";


import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { selectUserData } from "../../app/UserSlice";
import { useSelector } from "react-redux";



const NewsPage = () => {

const userData = useSelector(selectUserData)

  return (
    <Grid container>
      {userData.map((Person, index) => (
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
              <Typography
                color="textSecondary"
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  mt: 1,
                }}
              >
                {Person.subtitle}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: "15px",
                }}
                color={Person.btncolor}
              >
                Full Article
                <ArrowForwardIosIcon />
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default NewsPage;
