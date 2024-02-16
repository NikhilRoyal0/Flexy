import React from "react";

import { Card, CardContent, Box, Typography } from "@mui/material";

import Lists from "./Lists";

const UserList = () => {
  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3">Basic Table</Typography>
          <Box
            sx={{
              overflow: {
                xs: "auto",
                sm: "unset",
              },
            }}
          >
            <Lists/>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserList;
