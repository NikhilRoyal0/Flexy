import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const NewsSlice = createSlice({
    name: "News",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setNewsData: (state, action) => {
            state.data = action.payload.data;
            state.isLoading = false;
            state.error = null;
        },
        setNewsLoading: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setNewsError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { setNewsData, setNewsLoading, setNewsError } = NewsSlice.actions;

export const fetchNewsData = () => async (dispatch) => {
    try {
        dispatch(setNewsLoading());
        const response = await axios.get( import.meta.env.VITE_BASE_URL + "feature/news");
        dispatch(setNewsData(response.data));
    } catch (error) {
        dispatch(setNewsError(error.message));
    }
};

export const selectNewsData = (state) => state.News.data;
export const selectNewsLoading = (state) => state.News.isLoading;
export const selectNewsError = (state) => state.News.error;

export default NewsSlice.reducer;
