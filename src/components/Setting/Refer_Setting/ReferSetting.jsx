import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReferSettingData,
  selectReferSettingData,
  updateReferSettingData,
} from "../../../app/ReferSettingSlice";

export default function ReferSetting() {
  const dispatch = useDispatch();
  const referSettingData = useSelector(selectReferSettingData);
  const firstSetting = referSettingData.length > 0 ? referSettingData[0] : null;
  const [isEditing, setIsEditing] = useState(false);
  const [modifiedSetting, setModifiedSetting] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  useEffect(() => {
    dispatch(fetchReferSettingData());
  }, [dispatch]);

  useEffect(() => {
    if (firstSetting) {
      const { rpId, ...modified } = firstSetting;
      setModifiedSetting(modified);
      setEditedValues(modified);
    }
  }, [firstSetting]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChange = () => {
    dispatch(updateReferSettingData(editedValues)).then(() => {
      console.log("success");
    });
    setIsEditing(false);
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setEditedValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
          ReferSetting
        </Typography>
        <Grid container spacing={2}>
          {firstSetting && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="zeroLevel"
                  label="Level 0"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={editedValues.zeroLevel || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstLevel"
                  label="Level 1"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={editedValues.firstLevel || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="secondLevel"
                  label="Level 2"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={editedValues.secondLevel || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="thirdLevel"
                  label="Level 3"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={editedValues.thirdLevel || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="forthLevel"
                  label="Level 4"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={editedValues.forthLevel || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="fifthLevel"
                  label="Level 5"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={editedValues.fifthLevel || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={12}>
            <Button
              variant="contained"
              color={isEditing ? "error" : "primary"}
              onClick={handleEdit}
              style={{ marginRight: "8px" }}
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
            {isEditing && (
              <Button
                variant="contained"
                color="success"
                type="submit"
                onClick={handleSaveChange}
              >
                Save
              </Button>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
