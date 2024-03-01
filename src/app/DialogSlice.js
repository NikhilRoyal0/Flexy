import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const dialogsSlice = createSlice({
    name: "dialogs",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setdialogsData: (state, action) => {
            state.data = action.payload.data;
            state.isLoading = false;
            state.error = null;
        },
        setdialogsLoading: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setdialogsError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        updatedialogs: (state, action) => {
            const updateddialogs = action.payload;
            state.data = state.data.map((dialogs) =>
                dialogs.dId === updateddialogs.dId ? updatedDialogs : dialogs
            );
            state.isLoading = false;
            state.error = null;
        },
        deletedialogs: (state, action) => {
            const dIdToDelete = action.payload;
            state.data = state.data.filter((dialogs) => dialogs.dId !== dIdToDelete);
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const {
    setdialogsData,
    setdialogsLoading,
    setdialogsError,
    updatedialogs,
    deletedialogs,
} = dialogsSlice.actions;

export const fetchdialogsData = () => async (dispatch) => {
    try {
        dispatch(setdialogsLoading());
        const response = await axios.get(
            import.meta.env.VITE_BASE_URL + "feature/appDialogs"
        );
        dispatch(setdialogsData(response.data));
    } catch (error) {
        dispatch(setdialogsError(error.message));
    }
};

export const AddData = (form) => async () => {
    try {
        const response = await axios.post(
            import.meta.env.VITE_BASE_URL + "feature/addDialog",
            form,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        console.log("Response:", response.data);
    } catch (error) {
        console.error("Error:", error);
    }
};

export const updatedialogsData = (dId, data) => async (dispatch) => {
    try {
        const response = await axios.put(
            import.meta.env.VITE_BASE_URL + `feature/updateDialog/${dId}`,
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        const updateddialogsData = response.data;

        dispatch(updatedialogs(updateddialogsData));
    } catch (error) {
        console.error("Error:", error);
    }
};

export const deletedialogsData = (dId) => async (dispatch) => {
    try {
        const response = await axios.delete(
            import.meta.env.VITE_BASE_URL + `feature/deleteDialog/${dId}`
        );

        const deletedialogsData = response.data;

        dispatch(deletedialogs(deletedialogsData));
    } catch (error) {
        console.error("Error:", error);
    }
};

export const selectdialogsData = (state) => state.dialogs.data;
export const selectdialogsLoading = (state) => state.dialogs.isLoading;
export const selectdialogsError = (state) => state.dialogs.error;

export default dialogsSlice.reducer;
