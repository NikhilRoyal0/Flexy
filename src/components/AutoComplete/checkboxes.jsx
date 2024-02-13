import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Checkbox, Autocomplete } from "@mui/material";
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

import BaseCard from "./BaseCard";
import { selectCheckboxData } from "../../app/movieSlice"; 

const icon = <CheckBoxOutlineBlankOutlinedIcon fontSize="small" />;
const checkedIcon = <CheckBoxOutlinedIcon fontSize="small" />;

const Checkboxes = () => {
  const checkboxData = useSelector(selectCheckboxData);
  return (
    <BaseCard title="Checkboxes">
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={checkboxData}
        disableCloseOnSelect
        getOptionLabel={(option) => option.title}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}- {option.year}
          </li>
        )}
        fullWidth
        renderInput={(params) => (
          <TextField {...params} label="Checkboxes" placeholder="Favorites" />
        )}
      />
    </BaseCard>
  );
};

export default Checkboxes;
