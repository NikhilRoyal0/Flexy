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
import { selectBannerData, fetchBannerData, updateBanner, updateBannerData } from "../../app/BannerSlice";

const EditBanner = () => {
  const dispatch = useDispatch();
  const { bannerId: bannerIdParam } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState(null);

  const [data, setData] = useState({
    bannerId: "",
    bannerTitle: "",
    bannerType: "",
    endDateTime: "",
    mediaPath: "",
    bannerStatus: "",
  });



    const handleSubmit = async (event) => {
      event.preventDefault();
    
      const response = dispatch(updateBannerData(data.bannerId, data));
    
      const updatedBannerData = response.data;
      
      dispatch(updateBanner(updatedBannerData));
    
    };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [loading, setLoading] = useState(true);
  const bannerData = useSelector(selectBannerData);

  const fetchBannerDataById = () => {
    const bannerId = parseInt(bannerIdParam);
    const selectedBanner = bannerData.find((banner) => banner.bannerId === bannerId);
    setData({ ...selectedBanner });
    setLoading(false);
  };

  useEffect(() => {
    if (bannerData.length === 0) {
      dispatch(fetchBannerData());
    } else {
      fetchBannerDataById();
    }
  }, [bannerIdParam, dispatch, bannerData]);


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
        <Typography variant="h4">Edit Banner - {data && data.bannerId}</Typography>
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
                      id="image"
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
                name='bannerTitle'
                onChange={handleInputChange}
                fullWidth
                value={data && data.bannerTitle}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Banner Type"
                variant="outlined"
                name='bannerType'
                onChange={handleInputChange}
                fullWidth
                value={data && data.bannerType}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="endDateTime"
                variant="outlined"
                name='endDateTime'
                onChange={handleInputChange}
                fullWidth
                value={data && data.endDateTime}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Status"
                variant="outlined"
                name='bannerStatus'
                onChange={handleInputChange}
                fullWidth
                value={data && data.bannerStatus}
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

export default EditBanner;
