import React from "react";
import { TextField } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from "react-redux";
import BaseCard from "./BaseCard";
import { selectCheckboxData } from "../../app/movieSlice";

const Combo = () => {
  const checkboxData = useSelector(selectCheckboxData);

  return (
    <BaseCard title="Combo box">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={checkboxData}
        getOptionLabel={(option) => option.title} 
        fullWidth
        renderInput={(params) => <TextField {...params} label="Combo Box" />}
        renderOption={(props, option) => (
          <li {...props}>
            {option.title} - {option.year}
          </li>
        )}
      />
    </BaseCard>
  );
};

export { Combo };
