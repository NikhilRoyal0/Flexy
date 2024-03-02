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
  const [selectedNews, setSelectedNews] = useState(null);
  const [fullArticleDialogOpen, setFullArticleDialogOpen] = useState(false);


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
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <Typography variant="h4" color="error" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center">
          {error}
        </Typography>
      </Box>
    );
  }
  const editClick = (News) => {
    navigate(`edit-news/${News.newsId}`);
  };

  const handleClick = () => {
    navigate('/news/add-news');
  }

  const openFullArticleDialog = (news) => {
    setSelectedNews(news);
    setFullArticleDialogOpen(true);
  };

  const closeFullArticleDialog = () => {
    setFullArticleDialogOpen(false);
  };


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
        <CardContent
          sx={{
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
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
                    mt: "8px",
                    maxHeight: "600px",
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
                    height="210px"
                    style={{
                      objectFit: 'contain',
                    }}
                  />
                  <CardContent
                    sx={{
                      maxHeight: "500px",
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
                      color="textSecondary"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        mt: 1,
                      }}
                    >
                      {News.newsTitle}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "h4.fontSize",
                        fontWeight: "500",
                        overflow: "hidden",
                        maxWidth: "100%",
                      }}
                    >
                      {News.newsInfo.length <= 15 ? (
                        News.newsInfo
                      ) : (
                        <>
                          {News.newsInfo.split(' ').slice(0, 5).join(' ')}
                          <span
                            style={{
                              fontSize: "15px",
                              color: 'blue',
                              cursor: 'pointer',
                              display: 'inline-block',
                              marginLeft: '4px',
                            }}
                            onClick={() => openFullArticleDialog(News)}
                          >
                            ... <span style={{ display: 'inline' }}>read more</span>
                          </span>
                        </>
                      )}
                    </Typography>
                    <br />
                    <br />
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => editClick(News)}
                      sx={{ mt: "auto", ml: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteClick(News)}
                      sx={{ mt: "auto", ml: 1 }}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <Dialog
        open={fullArticleDialogOpen}
        onClose={closeFullArticleDialog}
      >
        <DialogTitle>{selectedNews?.newsTitle}</DialogTitle>
        <DialogContent>
          <img
            src={selectedNews?.mediaPath}
            alt={selectedNews?.mediaPath}
            onError={(e) => {
              e.target.src = errorimage;
              e.target.alt = "Error Image";
            }}
            width="100%"
            height="210px"
            style={{
              objectFit: 'contain',
            }}
          />
          <Typography>
            Date: {selectedNews?.newsDate}
          </Typography>
          <Typography>
            News Info: {selectedNews?.newsInfo}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFullArticleDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

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
          <Button sx={{ mr: 1 }} onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button sx={{ ml: 1 }} onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewsPage;
