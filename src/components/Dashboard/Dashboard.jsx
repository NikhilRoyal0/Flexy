import React, { useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import {
  AccountCircle,
  AttachMoney,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import { fetchDashData, selectDashData } from "../../app/DashSlice";
import { useSelector, useDispatch } from "react-redux";
import Blogs from "./Blogs";
import ProductPerformance from "./ProductPerformance";
import Activity from "./Activity";

const Dashboard = () => {
  const dispatch = useDispatch();
  const dashData = useSelector(selectDashData);

  useEffect(() => {
    dispatch(fetchDashData());
  }, [dispatch]);

  return (
    <Grid container spacing={1}>
      {/* Total Amount Card */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <AttachMoney
                  fontSize="large"
                  color="primary"
                  style={{ fontSize: 40 }}
                />
              </Grid>
              <Grid item>
                <Typography variant="h6">Total Amount</Typography>
                <Typography variant="h2">₹{dashData.totalWalletAmt}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Total Withdrawal Card */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <ArrowDownward
                  fontSize="large"
                  style={{ color: "red", fontSize: 40 }}
                />
              </Grid>
              <Grid item>
                <Typography variant="h6">Total Withdrawal</Typography>
                <Typography variant="h2">₹{dashData.totalWithdraw}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Total Recharge Card */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <ArrowUpward
                  fontSize="large"
                  style={{ color: "green", fontSize: 40 }}
                />
              </Grid>
              <Grid item>
                <Typography variant="h6">Total Recharge</Typography>
                <Typography variant="h2">
                  ₹{dashData.totalRechargeAmt}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Total Users Card */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <AccountCircle
                  fontSize="large"
                  color="primary"
                  style={{ fontSize: 40 }}
                />
              </Grid>
              <Grid item>
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h2">{dashData.totalUsers}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Activity />
      </Grid>
      <Grid item xs={12} lg={8}>
        <ProductPerformance />
      </Grid>
      <Blogs />
    </Grid>
  );
};

export default Dashboard;
