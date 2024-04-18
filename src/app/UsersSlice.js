import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const UsersSlice = createSlice({
  name: "Users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setUsersData: (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
      state.error = null;
    },
    setUsersLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setUsersError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      state.data.map((user) => user.uId === updatedUser.uId);
    },
  },
});

export const { setUsersData, setUsersLoading, setUsersError, updateUser } =
  UsersSlice.actions;

export const fetchUsersData = () => async (dispatch) => {
  try {
    dispatch(setUsersLoading());
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + "admin/usersList"
    );
    dispatch(setUsersData(response.data));
  } catch (error) {
    dispatch(setUsersError(error.message));
  }
};

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

export const selectUsersData = (state) => state.Users.data;
export const selectUsersLoading = (state) => state.Users.isLoading;
export const selectUsersError = (state) => state.Users.error;

export default UsersSlice.reducer;
