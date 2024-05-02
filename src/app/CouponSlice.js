import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CouponSlice = createSlice({
  name: "Coupon",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setCouponData: (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
      state.error = null;
    },
    setCouponLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setCouponError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateCoupon: (state, action) => {
      const updatedCoupon = action.payload;
      state.data = state.data.map((Coupon) =>
        Coupon.couponId === updatedCoupon.couponId ? updatedCoupon : Coupon
      );
    },
  },
});

export const {
  setCouponData,
  setCouponLoading,
  setCouponError,
  updateCoupon,
} = CouponSlice.actions;

export const fetchCouponData = () => async (dispatch) => {
  try {
    dispatch(setCouponLoading());
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + "feature/coupons"
    );
    dispatch(setCouponData(response.data));
  } catch (error) {
    dispatch(setCouponError(error.message));
  }
};

export const AddData = (form) => async () => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + "feature/addCoupons",
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

export const updateCouponData = (couponId, data) => async (dispatch) => {
  try {
    const response = await axios.put(
      import.meta.env.VITE_BASE_URL + `feature/updateCoupon/${couponId}`,
      data
    );
    const updatedCouponData = response.data;
    dispatch(updateCoupon(updatedCouponData));
  } catch (error) {
    console.error("Error:", error);
  }
};

export const selectCouponData = (state) => state.Coupon.data;
export const selectCouponLoading = (state) => state.Coupon.isLoading;
export const selectCouponError = (state) => state.Coupon.error;

export default CouponSlice.reducer;
