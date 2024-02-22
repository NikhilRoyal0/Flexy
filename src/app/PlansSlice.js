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
        }
    }
});

export const { setPlansData, setPlansLoading, setPlansError } = PlansSlice.actions;

export const fetchPlansData = () => async (dispatch) => {
    try {
        dispatch(setPlansLoading());
        const response = await axios.get(import.meta.env.VITE_BASE_URL + "feature/plans");
        dispatch(setPlansData(response.data));
    } catch (error) {
        dispatch(setPlansError(error.message));
        dispatch(apiData(error.message));
    }
};

export const AddPlanData = (form) => async (dispatch) => {
    try {
        const response = await axios.post(import.meta.env.VITE_BASE_URL + 'feature/insertPlan', 
        form, {
          headers: {
            'Content-Type': 'multipart/form-data',

          }
        });
        console.log('Response:', response.data);  //! Response for Success

      } catch (error) {
        console.error('Error:', error);  

      }
}

export const selectPlansData = (state) => state.Plans.data;
export const selectPlansLoading = (state) => state.Plans.isLoading;
export const selectPlansError = (state) => state.Plans.error;
export const selectApiData = (state) => state.Plans.apiData; 

export default PlansSlice.reducer;
