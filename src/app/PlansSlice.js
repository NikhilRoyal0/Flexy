import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const PlansSlice = createSlice({
  name: "Plans",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    images: [],
  },
  reducers: {
    setPlansData: (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
      state.error = null;
    },
    addImage: (state, action) => {
      const newImage = action.payload;
      state.images.push(newImage);
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
      const updatedPlan = action.payload;
      state.data = state.data.map((plan) =>
        plan.planId === updatedPlan.planId ? updatedPlan : plan
      );
    },
    deletePlan: (state, action) => {
      const planIdToDelete = action.payload;
      state.data = state.data.filter((plan) => plan.planId !== planIdToDelete);
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setPlansData,
  setPlansLoading,
  setPlansError,
  updatePlans,
  deletePlan,
  addImage,
} = PlansSlice.actions;

export const fetchPlansData = () => async (dispatch) => {
  try {
    dispatch(setPlansLoading());
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + "feature/plans"
    );
    dispatch(setPlansData(response.data));
  } catch (error) {
    dispatch(setPlansError(error.message));
  }
};

export const AddPlanData = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + "feature/insertPlan",
      data,
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

export const AddImagesData = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + "feature/insertImages",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const imageData = response.data;
    console.log("Image Data before dispatch:", imageData);

    dispatch(addImage(imageData));

    return imageData.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updatePlansData = (planId, data) => async (dispatch) => {
  try {
    const response = await axios.put(
      import.meta.env.VITE_BASE_URL + `feature/updatePlan/${planId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const updatedPlansData = response.data;

    dispatch(updatePlans(updatedPlansData));
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deletePlanData = (planId) => async (dispatch) => {
  try {
    const response = await axios.delete(
      import.meta.env.VITE_BASE_URL + `feature/deletePlan/${planId}`
    );

    const deletePlanData = response.data;

    dispatch(deletePlan(deletePlanData));
  } catch (error) {
    console.error("Error:", error);
  }
};

export const selectPlansData = (state) => state.Plans.data;
export const selectPlansLoading = (state) => state.Plans.isLoading;
export const selectPlansError = (state) => state.Plans.error;

export default PlansSlice.reducer;
