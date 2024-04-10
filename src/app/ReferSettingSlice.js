import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ReferSettingSlice = createSlice({
  name: "ReferSetting",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setReferSettingData: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setReferSettingLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setReferSettingError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateReferSetting: (state, action) => {
      const updatedReferSetting = action.payload;
      state.data = state.data.map((ReferSetting) =>
        ReferSetting.rpId === updatedReferSetting.rpId ? updatedReferSetting : ReferSetting
      );
    },
  },
});

export const {
  setReferSettingData,
  setReferSettingLoading,
  setReferSettingError,
  updateReferSetting,
} = ReferSettingSlice.actions;

export const fetchReferSettingData = () => async (dispatch) => {
  try {
    dispatch(setReferSettingLoading());
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "feature/getSettings");
    dispatch(setReferSettingData(response.data.data.referSettings));
  } catch (error) {
    dispatch(setReferSettingError(error.message));
  }
};


export const updateReferSettingData = (firstSetting) => async (dispatch) => {
  try {

    const response = await axios.put(
      import.meta.env.VITE_BASE_URL + `feature/updateReferSettings/1`,
      firstSetting,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const updatedReferSettingData = response.data;

    dispatch(updateReferSetting(updatedReferSettingData));

  } catch (error) {
    console.error('Error:', error);
  }
}



export const selectReferSettingData = (state) => state.ReferSetting.data;
export const selectReferSettingLoading = (state) => state.ReferSetting.isLoading;
export const selectReferSettingError = (state) => state.ReferSetting.error;

export default ReferSettingSlice.reducer;
