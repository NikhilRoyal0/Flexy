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
    updatePlans: (state, action) => {
      const updatedPlans = action.payload;
      console.log(action.payload);
      state.data.map((Plans) => Plans.planId === updatedPlans.planId);

    },
  }
});

export const { setPlansData, setPlansLoading, setPlansError, updatePlans } = PlansSlice.actions;

export const fetchPlansData = () => async (dispatch) => {
  try {
    dispatch(setPlansLoading());
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "feature/plans");
    dispatch(setPlansData(response.data));
  } catch (error) {
    dispatch(setPlansError(error.message));
  }
};

export const AddPlanData = (data) => async (dispatch) => {
  try {
    const response = await axios.post(import.meta.env.VITE_BASE_URL + 'feature/insertPlan',
      data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    console.log('Response:', response.data);  //! Response for Success

  } catch (error) {
    console.error('Error:', error);

  }
};


export const updatePlansData = (planId, data) => async (dispatch) => {
  try {

    const response = await axios.put(
      import.meta.env.VITE_BASE_URL + `feature/updatePlan/${planId}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const updatedPlansData = response.data;

    dispatch(updatePlans(updatedPlansData));

  } catch (error) {
    console.error('Error:', error);
  }
};

export const selectPlansData = (state) => state.Plans.data;
export const selectPlansLoading = (state) => state.Plans.isLoading;
export const selectPlansError = (state) => state.Plans.error;


export default PlansSlice.reducer;
