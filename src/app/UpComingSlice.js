import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const UpComingSlice = createSlice({
  name: "UpComing",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setUpComingData: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setUpComingLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setUpComingError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUpComing: (state, action) => {
      const updatedUpComing = action.payload;
      state.data = state.data.map((UpComing) =>
        UpComing.wi === updatedUpComing.wi ? updatedUpComing : UpComing
      );
    },
  },
});

export const {
  setUpComingData,
  setUpComingLoading,
  setUpComingError,
  updateUpComing,
} = UpComingSlice.actions;

export const fetchUpComingData = () => async (dispatch) => {
  try {
    dispatch(setUpComingLoading());
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "feature/getSettings");
    dispatch(setUpComingData(response.data.data.allWithdraw));
  } catch (error) {
    dispatch(setUpComingError(error.message));
  }
};

export const AddData = (form) => async () => {
  try {
    const response = await axios.post(import.meta.env.VITE_BASE_URL + 'feature/addUpCommingWithdraw', form, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

export const updateUpComingData = (wi, data) => async (dispatch) => {
  try {

    const response = await axios.put(
      import.meta.env.VITE_BASE_URL + `feature/updateUpCommingWithdraw/${wi}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const updatedUpComingData = response.data;

    dispatch(updateUpComing(updatedUpComingData));

  } catch (error) {
    console.error('Error:', error);
  }
}



export const selectUpComingData = (state) => state.UpComing.data;
export const selectUpComingLoading = (state) => state.UpComing.isLoading;
export const selectUpComingError = (state) => state.UpComing.error;

export default UpComingSlice.reducer;
