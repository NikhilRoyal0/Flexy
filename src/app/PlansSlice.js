import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const PlansSlice = createSlice({
    name: "Plans",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
        apiData: "",
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
        setApiData: (state, action) => {
            state.apiData = action.payload;
        },
    }
});

export const { setPlansData, setPlansLoading, setPlansError, setApiData } = PlansSlice.actions;

export const fetchPlansData = () => async (dispatch) => {
    try {
        dispatch(setPlansLoading());
        const response = await axios.get(import.meta.env.VITE_BASE_URL + "feature/plans");
        dispatch(setPlansData(response.data));
        const apiResponse = await axios.post(import.meta.env.VITE_BASE_URL + "feature/insertPlan", {
            planId: "", 
            planTitle: "",
            planInfo: "",
            planPrice: "",
            planExtraDetails: "",
            planImages: [],
            planMaxPayOut: "",
            planStatus: "",
            createdBy: "",
        });
        dispatch(setApiData(apiResponse.data));
    } catch (error) {
        dispatch(setPlansError(error.message));
        dispatch(apiData(error.message));
    }
};

export const selectPlansData = (state) => state.Plans.data;
export const selectPlansLoading = (state) => state.Plans.isLoading;
export const selectPlansError = (state) => state.Plans.error;
export const selectApiData = (state) => state.Plans.apiData; 

export default PlansSlice.reducer;
