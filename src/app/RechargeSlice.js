import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const RechargeSlice = createSlice({
  name: "Recharge",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setRechargeData: (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
      state.error = null;
    },
    setRechargeLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setRechargeError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateRecharge: (state, action) => {
      const updatedRecharge = action.payload;
      state.data = state.data.map((recharge) =>
        recharge.r_id === updatedRecharge.r_id ? updatedRecharge : recharge
      );
    },
  },
});

export const {
  setRechargeData,
  setRechargeLoading,
  setRechargeError,
  updateRecharge,
} = RechargeSlice.actions;

export const fetchRechargeData = () => async (dispatch) => {
  try {
    dispatch(setRechargeLoading());
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + "client/get-all-rechargeRequests"
    );
    dispatch(setRechargeData(response.data));
  } catch (error) {
    dispatch(setRechargeError(error.message));
  }
};

export const AddData = (form) => async () => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + "client/add-withdrawRequest",
      form,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updateRechargeData = (updatedData, r_id) => async (dispatch) => {
  try {
    const response = await axios.put(
      import.meta.env.VITE_BASE_URL + `client/updateRechargeRequest/${r_id}`,
      updatedData
    );
    const updatedRechargeData = response.data;
    dispatch(updateRecharge(updatedRechargeData));
  } catch (error) {
    console.error("Error:", error);
  }
};

export const selectRechargeData = (state) => state.Recharge.data;
export const selectRechargeLoading = (state) => state.Recharge.isLoading;
export const selectRechargeError = (state) => state.Recharge.error;

export default RechargeSlice.reducer;
