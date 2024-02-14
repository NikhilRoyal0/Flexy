import React from "react";

import { Grid, Box } from "@mui/material";

import { ColorButton } from "../../components/Buttons/ColorButton";
import { SizeButton } from "./SizeButton";
import { OutlineButton } from "./OutlineButton";
import { TextButton } from "./TextButton";
import { IconButtons } from "./IconButtons";
import { FloatButton } from "./FloatButton";
import { ButtonsGroup } from "./ButtonsGroup";



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
          <SizeButton />
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
          <OutlineButton />
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
          <TextButton/>
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
          <IconButtons/>
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
          <FloatButton/>
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
          <ButtonsGroup/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExButton;
