import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import errorimage from '../../assets/images/errorimage.jpg'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsData, selectNewsData, selectNewsLoading, selectNewsError, deleteNewsData } from "../../app/NewsSlice";


const NewsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newsData = useSelector(selectNewsData);
  const isLoading = useSelector(selectNewsLoading);
  const error = useSelector(selectNewsError);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
  const [newsToDelete, setNewsToDelete] = useState(null);


  const deleteClick = (news) => {
    setNewsToDelete(news);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (newsToDelete) {
      dispatch(deleteNewsData(newsToDelete.newsId)).then(() => {
        setDeleteConfirmationOpen(false);
        setNewsToDelete(null);
        dispatch(fetchNewsData());
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmationOpen(false);
    setNewsToDelete(null);
  };

  useEffect(() => {
    dispatch(fetchNewsData());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="primary" size={120} thickness={4} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const editClick = (News) => {
    navigate(`edit-news/${News.newsId}`);
  };

  const handleClick = () => {
    navigate('/news/add-news');
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
        <Typography sx={{ ml: 1 }}>Add News</Typography>
      </Button>
      <Card>
        <CardContent>
          <Grid container sx={{ marginTop: "25px" }}>
            {newsData.map((News, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                xl={3}
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
                    mt: "8px"
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
                    <br />
                    <br />
                    <Button variant="outlined" color="primary" onClick={() => editClick(News)}>
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteClick(News)}
                    >
                      Delete
                    </Button>
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this news?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewsPage;
