
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Select,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Lists from "./Lists";
import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { AddData, fetchCouponData } from "../../app/CouponSlice";

const Coupon = () => {
  const dispatch = useDispatch();

  const [filterOption, setFilterOption] = useState("1");
  const [showAddCouponData, setShowAddCouponData] = useState(false);
  const [loading, setLoading] = useState(false);

  const [CouponData, setCouponData] = useState({
    title: "",
    code: "",
    amount: "",
    validUpto: "",
    type: "OneTime",
    status: 0,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); 

    const validUptoUnix = convertToUnixTimestamp(CouponData.validUpto);


    const form = new FormData();
    form.append("title", CouponData.title);
    form.append("code", CouponData.code);
    form.append("amount", CouponData.amount);
    form.append("validUpto", validUptoUnix);
    form.append("type", CouponData.type);
    form.append("status", CouponData.status);

    dispatch(AddData(form))
      .then(() => {
        console.log("Submitting form data:", CouponData);
        dispatch(fetchCouponData());
      })
      .catch((error) => {
        console.error("Error adding CouponData:", error);
      })
      .finally(() => {
        setLoading(false); // End loading
        handleCloseAddCouponData(); // Close dialog
      });
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleAddCouponData = () => {
    setShowAddCouponData(true);
  };

  const handleCloseAddCouponData = () => {
    setShowAddCouponData(false);
    setCouponData({
      title: "",
      code: "",
      amount: "",
      validUpto: "",
      type: "",
      status: "",
    });
  };

  const convertToUnixTimestamp = (dateTime) => {
    return Math.floor(new Date(dateTime).getTime() / 1000); 
  };

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4} md={5} lg={6} xl={6}>
              <Typography variant="h3">Coupons</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={8}
              md={7}
              lg={6}
              xl={6}
              container
              justifyContent="flex-end"
              alignItems="center"
            >
              <FormControl variant="outlined" sx={{ minWidth: "150px" }}>
                <InputLabel
                  htmlFor="status"
                  sx={{ marginLeft: 1, marginTop: 1 }}
                >
                  Filter By Status
                </InputLabel>
                <Select
                  label="Filter By Status"
                  variant="outlined"
                  size="small"
                  value={filterOption}
                  onChange={handleFilterChange}
                  sx={{ marginLeft: 1, marginTop: 1 }}
                >
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="0">Inactive</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddCouponData}
                sx={{ marginLeft: 1, marginTop: 1 }}
              >
                <AddIcon />
                <Typography sx={{ ml: 1 }}> New Coupon</Typography>
              </Button>
            </Grid>
          </Grid>
          <Lists filterOption={filterOption} />
        </CardContent>
      </Card>

      <Dialog open={showAddCouponData} onClose={handleCloseAddCouponData}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>New Coupon</DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={CouponData.title}
                  onChange={(e) =>
                    setCouponData({ ...CouponData, title: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Code"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={CouponData.code}
                  onChange={(e) =>
                    setCouponData({
                      ...CouponData,
                      code: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Amount"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={CouponData.amount}
                  onChange={(e) =>
                    setCouponData({
                      ...CouponData,
                      amount: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="validUpto"></InputLabel>
                  <TextField
                    label="Valid Upto"
                    variant="outlined"
                    type="datetime-local"
                    margin="normal"
                    required
                    fullWidth
                    value={CouponData.validUpto}
                    onChange={(e) =>
                      setCouponData({
                        ...CouponData,
                        validUpto: (e.target.value), 
                      })
                    }
                    sx={{
                      mb: 2,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              type="button"
              onClick={handleCloseAddCouponData}
              color="primary"
              variant="outlined"
            >
              Cancel
            </Button>
            <LoadingButton
              loading={loading}
              type="submit"
              color="primary"
              variant="outlined"
              onClick={handleSubmit}
              loadingPosition="center"
              sx={{ ml: 1 }}
            >
              Save
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Coupon;
