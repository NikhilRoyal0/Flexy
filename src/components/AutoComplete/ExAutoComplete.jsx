import React from "react";
import { Grid, Box } from "@mui/material";
import Checkboxes from "./checkboxes";
import { Combo } from "./Combo";
import { Multiple } from "./multiple";
import { SizesAuto } from "./SizeAuto";

const ExAutoComplete = () => {
  // 2

  return (
    <Box>
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={4}
          sm={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Combo/>
        </Grid>

        {/* ------------------------- row 5 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={4}
          sm={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Multiple/>
        </Grid>

        {/* ------------------------- row 6 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={4}
          sm={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Checkboxes />
        </Grid>
        {/* ------------------------- row 7 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={4}
          sm={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <SizesAuto/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExAutoComplete;
