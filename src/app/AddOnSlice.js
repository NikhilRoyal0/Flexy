import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const AddOnSlice = createSlice({
  name: "AddOn",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setAddOnData: (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
      state.error = null;
    },
    setAddOnLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setAddOnError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateAddOn: (state, action) => {
      const updatedAddOn = action.payload;
      state.data = state.data.map((AddOn) =>
        AddOn.AddOn_id === updatedAddOn.AddOn_id ? updatedAddOn : AddOn
      );
    },
  },
});

export const {
  setAddOnData,
  setAddOnLoading,
  setAddOnError,
  updateAddOn,
} = AddOnSlice.actions;

export const fetchAddOnData = () => async (dispatch) => {
  try {
    dispatch(setAddOnLoading());
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "feature/andons");
    dispatch(setAddOnData(response.data));
  } catch (error) {
    dispatch(setAddOnError(error.message));
  }
};

export const AddData = (form) => async () => {
  try {
    const response = await axios.post(import.meta.env.VITE_BASE_URL + 'feature/insertAndon', form, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

export const updateAddOnData = (andon_id, data) => async (dispatch) => {
    try {
  
      const response = await axios.put(
        import.meta.env.VITE_BASE_URL + `feature/updateAndon/${andon_id}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      const updatedAddOnData = response.data;
  
      dispatch(updateAddOn(updatedAddOnData));
  
    } catch (error) {
      console.error('Error:', error);
    }
  }



export const selectAddOnData = (state) => state.AddOn.data;
export const selectAddOnLoading = (state) => state.AddOn.isLoading;
export const selectAddOnError = (state) => state.AddOn.error;

export default AddOnSlice.reducer;
