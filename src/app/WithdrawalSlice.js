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
            state.data = state.data.map((withdraw) =>
                withdraw.wr_Id === updatedWithdrawal.wr_Id ? updatedWithdrawal : withdraw
            );
        },
    },
});

export const { setWithdrawalData, setWithdrawalLoading, setWithdrawalError, updateWithdrawal } =
    WithdrawalSlice.actions;

export const fetchWithdrawalData = () => async (dispatch) => {
    try {
        dispatch(setWithdrawalLoading());
        const response = await axios.get(import.meta.env.VITE_BASE_URL + "client/get-all-withdrawRequests");
        dispatch(setWithdrawalData(response.data));
    } catch (error) {
        dispatch(setWithdrawalError(error.message));
    }
};

export const updateWithdrawalData = (wr_id, updatedStatus) => async (dispatch) => {
    try {
        const response = await axios.put(
            import.meta.env.VITE_BASE_URL + `client/update-withdrawRequest/${wr_id} `,{ status: updatedStatus }
        );

        const updatedWithdrawalData = response.data;

        dispatch(updateWithdrawal(updatedWithdrawalData));
    } catch (error) {
        console.error('Error:', error);
    }
};

export const selectWithdrawalData = (state) => state.Withdrawal.data;
export const selectWithdrawalLoading = (state) => state.Withdrawal.isLoading;
export const selectWithdrawalError = (state) => state.Withdrawal.error;

export default WithdrawalSlice.reducer;
