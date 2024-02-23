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
  Popover,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { selectNewsData, fetchNewsData, updateNews } from "../../app/NewsSlice";
import { updateNewsData } from "../../app/NewsSlice";

const EditNews = () => {
  const dispatch = useDispatch();
  const { newsId: newsIdParam } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState(null);

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
    
      const response = dispatch(updateNewsData(data.newsId, data));
    
      const updatedNewsData = response.data;
      
      dispatch(updateNews(updatedNewsData));
    
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


  if (loading) {
    return <p>Loading...</p>;
  }

  const handleImageClick = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  const handleImageChange = () => {
    const fileInput = document.getElementById("mediaPath");
    if (fileInput) {
      fileInput.click();
    }
  };

  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Edit News - {data && data.newsId}</Typography>
        <br />
        <Divider />
        <br />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
              <Card
                variant="outlined"
                sx={{
                  height: "150px",
                  width: "190px",
                  textAlign: "center",
                }}
              >
                <img
                  src={data && data.mediaPath} 
                  alt="Preview"
                  id="image"
                  name="mediaPath"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "130px",
                    marginRight: "10px",
                    marginTop: "auto",
                  }}
                  onClick={handleImageClick}
                  />
                  {editMode && (
                <Popover
                  open={Boolean(popoverAnchor)}
                  anchorEl={popoverAnchor}
                  onClose={handlePopoverClose}
                  disabled={!editMode}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                    <input
                      type="file"
                      id="mediaPath"
                      name="mediaPath"
                      onChange={handleInputChange}
                      style={{ display: "none" }}
                    />
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleImageChange}
                      startIcon={<AddIcon />}
                    >
                      Change
                    </Button>
                </Popover>
              )}
              </Card>
            </Grid>

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
              <Button variant="contained" color="success"  type="submit" onSubmit={handleSubmit}>
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
