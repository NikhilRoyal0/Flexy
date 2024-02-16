import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

import user1 from "../../assets/images/backgrounds/u2.jpg";
import user2 from "../../assets/images/backgrounds/u3.jpg";
import user3 from "../../assets/images/backgrounds/u4.jpg";

const Banners = [
  {
    img: user1,
    title: "Exciting Banners in the Tech World!",
  },
  {
    img: user2,
    title: "Innovation Alert: New Discoveries in Science",
  },
  {
    img: user3,
    title: "Global Event: Unveiling of a Remarkable Project",
  },
  {
    img: user1,
    title: "Entertainment Buzz: Star-Studded Film Premiere",
  },
  {
    img: user2,
    title: "Health Breakthrough: New Treatment Shows Promise",
  },
  {
    img: user3,
    title: "Finance Update: Market Surges to Record High",
  },
  {
    img: user1,
    title: "Sports Highlight: Historic Victory in Championship",
  },
];

const BannersList = () => {
  return (
    <Grid container>
      {Banners.map((Banners, index) => (
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
            <img src={Banners.img} alt="img" width="100%" />
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
                {Banners.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BannersList;
