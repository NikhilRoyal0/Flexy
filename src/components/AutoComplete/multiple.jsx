import React from "react";
import { TextField } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from "react-redux";
import BaseCard from "./BaseCard";
import { selectCheckboxData } from "../../app/movieSlice";

const Multiple = () => {
  const checkboxData = useSelector(selectCheckboxData);

  return (
    <BaseCard title="Multiple values">
      <Autocomplete
        multiple
        fullWidth
        id="tags-outlined"
        options={checkboxData}
        getOptionLabel={(option) => option.title}
        defaultValue={checkboxData.slice(0, 1)} 
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Multiple Values"
            placeholder="Favorites"
          />
        )}
      />
    </BaseCard>
  );
};

export { Multiple };
