import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  Grid,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import Lists from "./Lists";

const UserList = () => {
  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("inactive");

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="h3">Users Lists</Typography>
            </Grid>
            <Grid
              item
              container
              xs={12}
              sm={6}
              spacing={1}
              justifyContent="flex-end"
              alignItems="center"
            >
              <Grid item>
                <TextField
                  label="Search User..."
                  variant="outlined"
                  size="small"
                  margin="normal"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </Grid>
              <Grid item>
                <FormControl variant="outlined" size="small" margin="normal">
                  <InputLabel>Filter</InputLabel>
                  <Select
                    value={filterOption}
                    onChange={handleFilterChange}
                    label="Filter"
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Lists searchText={searchText} filterOption={filterOption} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserList;
