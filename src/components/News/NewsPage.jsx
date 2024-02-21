import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsData, selectNewsData, selectNewsLoading, selectNewsError } from "../../app/NewsSlice";
import { useNavigate } from "react-router-dom";
import errorimage from '../../assets/images/errorimage.jpg'




const NewsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newsData = useSelector(selectNewsData);
  const isLoading = useSelector(selectNewsLoading);
  const error = useSelector(selectNewsError);

  useEffect(() => {
    dispatch(fetchNewsData());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const editClick = (News) => {
    navigate(`edit-news/${News.newsId}`);
  };


  return (
    <Grid container>
      {newsData.map((News, index) => (
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
              src={News.mediaPath}
              alt={News.mediaPath}
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
                Date: {News.newsDate}
              </Typography>
              <Typography
                sx={{
                  fontSize: "h4.fontSize",
                  fontWeight: "500",
                }}
              >
                {News.newsInfo}
              </Typography>
              <Typography
                color="textSecondary"
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  mt: 1,
                }}
              >
                {News.newsTitle}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: "15px",
                }}
                color={News.btncolor}
              >
                Full Article
                <ArrowForwardIosIcon />
              </Button>
              <br />
              <br />
              <Button variant="outlined" color="primary" onClick={() => editClick(News)}>
                Edit
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default NewsPage;
