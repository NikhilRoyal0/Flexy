import React from "react";

import { Grid, Box } from "@mui/material";

import { ColorButton } from"../../components/Buttons/ColorButton";



const ExButton = () => {

  return (
    <Box>
      <Grid container spacing={0}>
        {/* ------------------------- row 2 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <ColorButton />
        </Grid>

        {/* ------------------------- row 4 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
        </Grid>

        {/* ------------------------- row 2 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
        </Grid>

        {/* ------------------------- row 2 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
        </Grid>
        {/* ------------------------- row 4 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
        </Grid>
        {/* ------------------------- row 4 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
        </Grid>

        {/* ------------------------- row 4 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExButton;
