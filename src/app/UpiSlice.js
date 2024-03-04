import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const UPISlice = createSlice({
  name: "UPI",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setUPIData: (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
      state.error = null;
    },
    setUPILoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setUPIError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUPI: (state, action) => {
      const updatedUPI = action.payload;
      state.data = state.data.map((UPi) =>
        UPi.upi_id === updatedUPI.upi_id ? updatedUPI : UPi
      );
    },
  },
});

export const {
  setUPIData,
  setUPILoading,
  setUPIError,
  updateUPI,
} = UPISlice.actions;

export const fetchUPIData = () => async (dispatch) => {
  try {
    dispatch(setUPILoading());
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "admin/getUpis");
    dispatch(setUPIData(response.data));
  } catch (error) {
    dispatch(setUPIError(error.message));
  }
};

export const AddData = (form) => async () => {
  try {
    const response = await axios.post(import.meta.env.VITE_BASE_URL + 'admin/addUpi', form, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

export const updateUPIData = (upi_id, updatedStatus) => async (dispatch) => {
  try {
    const response = await axios.put(
      import.meta.env.VITE_BASE_URL + `admin/updateUpi/${upi_id} `, { status: updatedStatus }
    );

    const updatedUPIData = response.data;

    dispatch(updateUPI(updatedUPIData));
  } catch (error) {
    console.error('Error:', error);
  }
};



export const selectUPIData = (state) => state.UPI.data;
export const selectUPILoading = (state) => state.UPI.isLoading;
export const selectUPIError = (state) => state.UPI.error;

export default UPISlice.reducer;
