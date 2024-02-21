import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectNewsData, fetchNewsData } from "../../app/NewsSlice";

const EditNews = () => {
  const dispatch = useDispatch();
  const { newsId: newsIdParam } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [news, setNewsData] = useState({
    newsId: "",
    newsTitle: "",
    newsInfo: "",
    newsData: "",
    mediaPath: "",
    isPublished: "",
  });
  
  const [loading, setLoading] = useState(true);

  const newsData = useSelector(selectNewsData);

  const fetnewsdata = async () => {
    try {
      const newsId = parseInt(newsIdParam);
      const selectednews = newsData.find((ur) => ur.newsId === newsId);
      setNewsData(selectednews);
      setLoading(false);
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

  useEffect(() => {
    if (newsData.length === 0) {
      dispatch(fetchNewsData());
    } else {
      fetnewsdata();
    }
  }, [newsIdParam, dispatch, newsData]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }


  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Edit News - {news && news.newsId}</Typography>
        <br />
        <Divider />
        <br />
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="news Id"
                variant="outlined"
                fullWidth
                value={news && news.newsId}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={news && news.newsTitle}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Info"
                variant="outlined"
                fullWidth
                value={news && news.newsInfo}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="news Details"
                variant="outlined"
                fullWidth
                value={news && news.newsData}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="URL"
                variant="outlined"
                fullWidth
                value={news && news.mediaPath}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Status"
                variant="outlined"
                fullWidth
                value={news && news.isPublished}
                disabled={!editMode}
              />
            </Grid>

          </Grid>
          <br />
          <Divider />
          <br />
          {editMode ? (
            <>
              <Button variant="contained" color="success" onClick={handleSave}>
                Save
              </Button>
              <Button variant="contained" color="error" onClick={toggleEditMode}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={toggleEditMode}>
              Edit
            </Button>
          )}
        </form>
       
      </CardContent>
    </Card>
  );
};

export default EditNews;
