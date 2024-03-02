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
} from "@mui/material";
import Lists from "./Lists";

const Withdrawal = () => {
  const [filterOption, setFilterOption] = useState("all");

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} s={8} md={7} lg={6} xl={6}>
              <Typography variant="h3">Withdrawal Requests</Typography>
            </Grid>
            <Grid item xs={12} s={4} md={5} lg={6} xl={6} container justifyContent="flex-end">
              <FormControl variant="outlined" sx={{ minWidth: '150px' }}>
                <InputLabel htmlFor="status">Filter By Status</InputLabel>
                <Select
                  label="Filter By Status"
                  variant="outlined"
                  size="small"
                  value={filterOption}
                  onChange={handleFilterChange}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="accepted">Accepted</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                  <MenuItem value="inProgress">In Progress</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Lists filterOption={filterOption} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Withdrawal;
