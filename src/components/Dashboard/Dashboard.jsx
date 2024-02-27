import React from "react";
import { Grid, Box } from "@mui/material";
import Charts from "./Charts";
import Blogs from "./Blogs";
import Activity from "./Activity";
import ProductPerformance from "./ProductPerformance";

const Dashboard = () => {

  return (
    <Box>
      <Grid container spacing={0}>
        
        {/* ------------------------- row 2 ------------------------- */}
        <Grid item xs={12} lg={4}>
            <Activity/>
        </Grid>
        <Grid item xs={12} lg={8}>
        <ProductPerformance />
        </Grid>
        {/* ------------------------- row 3 ------------------------- */}
        <Blogs/>
      </Grid>
    </Box>
  );
};

export default Dashboard;
