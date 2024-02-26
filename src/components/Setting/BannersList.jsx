import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import errorimage from '../../assets/images/errorimage.jpg';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBannerData, selectBannerData, selectBannerLoading, selectBannerError, deleteBannerData } from "../../app/BannerSlice";


const BannersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bannerData = useSelector(selectBannerData);
  const isLoading = useSelector(selectBannerLoading);
  const error = useSelector(selectBannerError);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
  const [bannerToDelete, setBannerToDelete] = useState(null);

  const deleteClick = (banner) => {
    setBannerToDelete(banner);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (bannerToDelete) {
      dispatch(deleteBannerData(bannerToDelete.bannerId)).then(() => {
        setDeleteConfirmationOpen(false);
        setBannerToDelete(null);
        dispatch(fetchBannerData());
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmationOpen(false);
    setBannerToDelete(null);
  };

  useEffect(() => {
    dispatch(fetchBannerData());
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

  const editClick = (Banner) => {
    navigate(`edit-banner/${Banner.bannerId}`);
  };

  const handleClick = () => {
    navigate("/setting/banners-list/add-banner")
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
        <Typography sx={{ ml: 1 }}>Add Banner</Typography>
      </Button>
      <Card >
        <CardContent>
          <Grid container sx={{ marginTop: "25px" }}>
            {bannerData.map((Banner, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
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
                  }}
                >
                  <img
                    src={Banner.mediaPath}
                    alt={Banner.mediaPath}
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
                      flex: "1",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "h4.fontSize",
                        fontWeight: "500",
                      }}
                    >
                      {Banner.bannerTitle}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "h5.fontSize",
                        fontWeight: "300",
                      }}
                    >
                      {Banner.endDateTime}
                    </Typography>
                    <br />
                    <Typography>
                      <Button variant="outlined" color="primary" onClick={() => editClick(Banner)}>
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteClick(Banner)}
                      >
                        Delete
                      </Button>
                    </Typography>
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
            Are you sure you want to delete this Banner?
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

export default BannersList;
