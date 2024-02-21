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
import { selectBannerData, fetchBannerData } from "../../app/BannerSlice";

const EditBanners = () => {
  const dispatch = useDispatch();
  const { bannerId: bannersIdParam } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [banner, setBannerData] = useState({
    bannerId: "",
    bannerTitle: "",
    bannerendDateTime: "",
    bannerType: "",
    mediaPath: "",
    bannerStatus: "",
  });
  
  const [loading, setLoading] = useState(true);

  const bannerData = useSelector(selectBannerData);

  const fetbannersdata = async () => {
    try {
      const bannerId = parseInt(bannersIdParam);
      const selectedbanner = bannerData.find((ur) => ur.bannerId === bannerId);
      setBannerData(selectedbanner);
      setLoading(false);
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

  useEffect(() => {
    if (bannerData.length === 0) {
      dispatch(fetchBannerData());
    } else {
      fetbannersdata();
    }
  }, [bannersIdParam, dispatch, bannerData]);

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
        <Typography variant="h4">Edit Banners - {banner && banner.bannerId}</Typography>
        <br />
        <Divider />
        <br />
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Banner Id"
                variant="outlined"
                fullWidth
                value={banner && banner.bannerId}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={banner && banner.bannerTitle}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Info"
                variant="outlined"
                fullWidth
                value={banner && banner.bannerendDateTime}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Banners Details"
                variant="outlined"
                fullWidth
                value={banner && banner.bannerType}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="URL"
                variant="outlined"
                fullWidth
                value={banner && banner.mediaPath}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Status"
                variant="outlined"
                fullWidth
                value={banner && banner.bannerStatus}
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

export default EditBanners;
