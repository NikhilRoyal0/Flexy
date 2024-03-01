import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const appSettingSlice = createSlice({
  name: "appSetting",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setAppData: (state, action) => {
      state.data = action.payload.data;  
      state.isLoading = false;
      state.error = null;
    },
    setAppLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setAppError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setAppData,
  setAppLoading,
  setAppError,
} = appSettingSlice.actions;

export const fetchAppData = () => async (dispatch) => {
  try {
    dispatch(setAppLoading());
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "feature/appSetting");
    dispatch(setAppData(response.data)); 
  } catch (error) {
    dispatch(setAppError(error.message));
  }
};

export const updateappSettingData = (AppSetting) => async (dispatch) => {
  try {
    const response = await axios.put(
      import.meta.env.VITE_BASE_URL + 'feature/setSetting',
      AppSetting,
    );

    const updatedAppSettingData = response.data;

    dispatch(updatedAppSettingData);
  } catch (error) {
    console.error('Error in updateappSettingData:', error);
  }
};

export const selectAppData = (state) => state.appSetting.data;
export const selectAppLoading = (state) => state.appSetting.isLoading;
export const selectAppError = (state) => state.appSetting.error;

export default appSettingSlice.reducer;
