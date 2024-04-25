import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const DashSlice = createSlice({
  name: "Dash",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setDashData: (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
      state.error = null;
    },
    setDashLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setDashError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setDashData, setDashLoading, setDashError } = DashSlice.actions;

export const fetchDashData = () => async (dispatch) => {
  try {
    dispatch(setDashLoading());
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + "feature/getSettings"
    );
    dispatch(setDashData(response.data));
  } catch (error) {
    dispatch(setDashError(error.message));
  }
};

export const selectDashData = (state) => state.Dash.data;
export const selectDashLoading = (state) => state.Dash.isLoading;
export const selectDashError = (state) => state.Dash.error;

export default DashSlice.reducer;
