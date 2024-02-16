import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

import user1 from "../../assets/images/backgrounds/u2.jpg";
import user2 from "../../assets/images/backgrounds/u3.jpg";
import user3 from "../../assets/images/backgrounds/u4.jpg";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Banners = [
  {
    img: user1,
    title: "Exciting Banners in the Tech World!",
    subtitle:
      "A groundbreaking technology is set to revolutionize the industry. Experts predict major changes and advancements in the coming months.",
    btncolor: "error",
  },
  {
    img: user2,
    title: "Innovation Alert: New Discoveries in Science",
    subtitle:
      "Scientists have made a remarkable breakthrough in a critical area of research. The implications for the future are enormous.",
    btncolor: "warning",
  },
  {
    img: user3,
    title: "Global Event: Unveiling of a Remarkable Project",
    subtitle:
      "World leaders gather to announce a collaborative effort that promises to address pressing global challenges. Anticipation is high for the project's impact.",
    btncolor: "primary",
  },
  {
    img: user1,
    title: "Entertainment Buzz: Star-Studded Film Premiere",
    subtitle:
      "Celebrities from around the world grace the red carpet for the premiere of the highly anticipated blockbuster film. Fans are eager to see the movie's debut.",
    btncolor: "success",
  },
  {
    img: user2,
    title: "Health Breakthrough: New Treatment Shows Promise",
    subtitle:
      "Researchers unveil a breakthrough treatment that shows promising results in tackling a widespread health issue. The medical community is optimistic about its potential impact.",
    btncolor: "info",
  },
  {
    img: user3,
    title: "Finance Update: Market Surges to Record High",
    subtitle:
      "Financial markets experience a significant surge, reaching record highs. Analysts attribute the positive trend to various economic factors.",
    btncolor: "error",
  },
  {
    img: user1,
    title: "Sports Highlight: Historic Victory in Championship",
    subtitle:
      "In a thrilling match, the underdog team secures a historic victory in the championship. Fans celebrate the unexpected triumph.",
    btncolor: "warning",
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
