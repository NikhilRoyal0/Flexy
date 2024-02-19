import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const PlansSlice = createSlice({
    name: "Plans",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setPlansData: (state, action) => {
            state.data = action.payload.data;
            state.isLoading = false;
            state.error = null;
        },
        setPlansLoading: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setPlansError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { setPlansData, setPlansLoading, setPlansError } = PlansSlice.actions;

export const fetchPlansData = () => async (dispatch) => {
    try {
        dispatch(setPlansLoading());
        const response = await axios.get( import.meta.env.VITE_BASE_URL + "feature/plans");
        dispatch(setPlansData(response.data));
    } catch (error) {
        dispatch(setPlansError(error.message));
    }
};

export const selectPlansData = (state) => state.Plans.data;
export const selectPlansLoading = (state) => state.Plans.isLoading;
export const selectPlansError = (state) => state.Plans.error;

export default PlansSlice.reducer;
