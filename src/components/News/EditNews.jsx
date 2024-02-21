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
import { useSelector } from "react-redux";
import { selectNewsData } from "../../app/NewsSlice"
  const EditNews = () => {
    const { newsId: newsIdParam } = useParams();
    const [editMode, setEditMode] = useState(false);
    const [news, setNewsData] = useState(null);
    const newsData = useSelector(selectNewsData);
  
    const fetchNewsData = async () => {
      try {  
        const newsId = parseInt(newsIdParam);
        const selectedNews = newsData.find((ur) => ur.newsId === newsId);
        setNewsData(selectedNews);
      } catch (error) {
        console.error('Error processing data:', error);
      }
    };
  
    useEffect(() => {
      fetchNewsData();
    }, [newsIdParam, newsData]); 
  
    const toggleEditMode = () => {
      setEditMode(!editMode);
    };
  
    const handleSave = () => {
      setEditMode(false);
    };
  

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
                label="URL"
                variant="outlined"
                fullWidth
                value={news && news.mediaPath}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date"
                variant="outlined"
                fullWidth
                value={news && news.newsDate}
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
