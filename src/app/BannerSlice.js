import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BannerSlice = createSlice({
    name: "Banner",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setBannerData: (state, action) => {
            state.data = action.payload.data;
            state.isLoading = false;
            state.error = null;
        },
        setBannerLoading: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setBannerError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { setBannerData, setBannerLoading, setBannerError } = BannerSlice.actions;

export const fetchBannerData = () => async (dispatch) => {
    try {
        dispatch(setBannerLoading());
        const response = await axios.get( import.meta.env.VITE_BASE_URL + "feature/banners");
        dispatch(setBannerData(response.data));
    } catch (error) {
        dispatch(setBannerError(error.message));
    }
};

export const selectBannerData = (state) => state.Banner.data;
export const selectBannerLoading = (state) => state.Banner.isLoading;
export const selectBannerError = (state) => state.Banner.error;

export default BannerSlice.reducer;