import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const WithdrawalSlice = createSlice({
    name: "Withdrawal",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setWithdrawalData: (state, action) => {
            state.data = action.payload.data;
            state.isLoading = false;
            state.error = null;
        },
        setWithdrawalLoading: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setWithdrawalError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        updateWithdrawal: (state, action) => {
            const updatedWithdrawal = action.payload;
            state.data.map((Withdrawal) => Withdrawal.wr_id === updatedWithdrawal.wr_id);
        },
    },
});

export const { setWithdrawalData, setWithdrawalLoading, setWithdrawalError } = WithdrawalSlice.actions;

export const fetchWithdrawalData = () => async (dispatch) => {
    try {
        dispatch(setWithdrawalLoading());
        const response = await axios.get(import.meta.env.VITE_BASE_URL + "client/get-all-withdrawRequests");
        dispatch(setWithdrawalData(response.data));
    } catch (error) {
        dispatch(setWithdrawalError(error.message));
    }
};

export const updateWithdrawalData = (wr_id, data) => async (dispatch) => {
    try {

        const response = await axios.put(
            import.meta.env.VITE_BASE_URL + `feature/updateWithdrawal/${wr_id}`,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        const updatedWithdrawalData = response.data;

        dispatch(updateWithdrawal(updatedWithdrawalData));

    } catch (error) {
        console.error('Error:', error);
    }
}



export const selectWithdrawalData = (state) => state.Withdrawal.data;
export const selectWithdrawalLoading = (state) => state.Withdrawal.isLoading;
export const selectWithdrawalError = (state) => state.Withdrawal.error;

export default WithdrawalSlice.reducer;
