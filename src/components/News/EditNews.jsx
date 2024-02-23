import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { selectNewsData, fetchNewsData, updateNews } from "../../app/NewsSlice";
import { updateNewsData } from "../../app/NewsSlice";

const EditNews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { newsId: newsIdParam } = useParams();
  const [editMode, setEditMode] = useState(false);

  const [data, setData] = useState({
    newsId: "",
    newsTitle: "",
    newsInfo: "",
    newsDate: "",
    mediaPath: "",
    isPublished: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response =  dispatch(updateNewsData(data.newsId, data));

      const updatedNewsData = response.data;

      console.log('Updated News Data:', updatedNewsData);

      dispatch(updateNews(updatedNewsData));

      navigate("/news");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [loading, setLoading] = useState(true);
  const newsData = useSelector(selectNewsData);

  const fetchNewsDataById = () => {
    const newsId = parseInt(newsIdParam);
    const selectedNews = newsData.find((news) => news.newsId === newsId);
    setData({ ...selectedNews });
    setLoading(false);
  };

  useEffect(() => {
    if (newsData.length === 0) {
      dispatch(fetchNewsData());
    } else {
      fetchNewsDataById();
    }
  }, [newsIdParam, dispatch, newsData]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Edit News - {data && data.newsId}</Typography>
        <br />
        <Divider />
        <br />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Title"
                variant="outlined"
                name='newsTitle'
                onChange={handleInputChange}
                fullWidth
                value={data && data.newsTitle}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Info"
                variant="outlined"
                name='newsInfo'
                onChange={handleInputChange}
                fullWidth
                value={data && data.newsInfo}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="news Details"
                variant="outlined"
                name='newsDate'
                onChange={handleInputChange}
                fullWidth
                value={data && data.newsDate}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="URL"
                variant="outlined"
                name='mediaPath'
                onChange={handleInputChange}
                fullWidth
                value={data && data.mediaPath}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Status"
                variant="outlined"
                name='isPublished'
                onChange={handleInputChange}
                fullWidth
                value={data && data.isPublished}
                disabled={!editMode}
              />
            </Grid>

          </Grid>
          <br />
          <Divider />
          <br />
          {editMode ? (
            <>
              <Button variant="contained" color="success"  type="submit">
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
