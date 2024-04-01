import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const NotificationSlice = createSlice({
    name: "Notification",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setNotificationData: (state, action) => {
            state.data = action.payload.data;
            state.isLoading = false;
            state.error = null;
        },
        setNotificationLoading: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setNotificationError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { setNotificationData, setNotificationLoading, setNotificationError } =
    NotificationSlice.actions;

export const fetchNotificationData = () => async (dispatch) => {
    try {
        dispatch(setNotificationLoading());
        const response = await axios.get(import.meta.env.VITE_BASE_URL + "feature/getNotification");
        dispatch(setNotificationData(response.data));
    } catch (error) {
        dispatch(setNotificationError(error.message));
    }
};

export const AddNotificationData = (form) => async (dispatch) => {
    try {
        const response = await axios.post(import.meta.env.VITE_BASE_URL + 'feature/addNotification', form, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error adding Notification Data:', error);
    }
};


export const selectNotificationData = (state) => state.Notification.data;
export const selectNotificationLoading = (state) => state.Notification.isLoading;
export const selectNotificationError = (state) => state.Notification.error;

export default NotificationSlice.reducer;
