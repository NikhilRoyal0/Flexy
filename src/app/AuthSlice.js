import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setAuthData: (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
      state.error = null;
    },
    setAuthLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setAuthError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      state.data.map((auth) => auth.uId === updatedUser.uId);
    },
  },
});

export const { setAuthData, setAuthLoading, setAuthError } = AuthSlice.actions;

export const updateUserData = (uId, data) => async (dispatch) => {
  try {
    const response = await axios.put(
      import.meta.env.VITE_BASE_URL + `client/updateUser/${uId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const updatedUserData = response.data;

    dispatch(updateUser(updatedUserData));
  } catch (error) {
    console.error("Error:", error);
  }
};

export const selectAuthData = (state) => state.Auth.data;
export const selectAuthLoading = (state) => state.Auth.isLoading;
export const selectAuthError = (state) => state.Auth.error;

export default AuthSlice.reducer;
