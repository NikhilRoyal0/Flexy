import React, { useState } from "react";
import { Card, CardContent, Box, Typography, TextField, Grid } from "@mui/material";
import Lists from "./Lists";

const UserList = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <Typography variant="h3">Users Lists</Typography>
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end">
              <TextField
                label="Search User..."
                variant="outlined"
                size="small"
                margin="normal"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Grid>
          </Grid>
          <Lists searchText={searchText} setSearchText={setSearchText} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserList;
