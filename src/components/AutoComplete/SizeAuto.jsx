import React from "react";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import BaseCard from "./BaseCard";
import { useSelector } from "react-redux";
import { selectCheckboxData } from "../../app/movieSlice";

const SizesAuto = () => {
  const checkboxData = useSelector(selectCheckboxData);

  return (
    <BaseCard title="Sizes">
      <Autocomplete
        disablePortal
        id="medium-combo-box-demo"
        options={checkboxData}
        getOptionLabel={(option) => option.title} 
        fullWidth
        sx={{
          mb: 2,
        }}
        renderInput={(params) => <TextField {...params} label="Size Medium" />}
        renderOption={(props, option) => (
          <li {...props}>
            {option.title} - {option.year}
          </li>
        )}
      />
      <Autocomplete
        disablePortal
        id="small-combo-box-demo"
        options={checkboxData}
        getOptionLabel={(option) => option.title}  
        fullWidth
        size="small"
        renderInput={(params) => <TextField {...params} label="Size Small" />}
        renderOption={(props, option) => (
          <li {...props}>
            {option.title} - {option.year}
          </li>
        )}
      />
    </BaseCard>
  );
};

export { SizesAuto };
