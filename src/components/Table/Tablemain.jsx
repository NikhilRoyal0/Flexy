import React from "react";

import { Card, CardContent, Box, Typography } from "@mui/material";

import Tableset from "./Tableset";

const Tablemain = () => {
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
            <Tableset/>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Tablemain;
