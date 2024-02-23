import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const TasksSlice = createSlice({
  name: "Tasks",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setTasksData: (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
      state.error = null;
    },
    setTasksLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setTasksError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateTask: (state, action) => {
      const updatedTask = action.payload;
      state.data.map((task) => task.taskId === updatedTask.taskId);

    },
  },
});

export const { setTasksData, setTasksLoading, setTasksError, updateTask, } = TasksSlice.actions;

export const fetchTasksData = () => async (dispatch) => {
  try {
    dispatch(setTasksLoading());
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "feature/dailyTask");
    dispatch(setTasksData(response.data));
  } catch (error) {
    dispatch(setTasksError(error.message));
  }
};

export const AddTaskData = (form) => async (dispatch) => {
  try {
      const response = await axios.post(import.meta.env.VITE_BASE_URL + 'feature/insertDailyTask', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log('Response:', response.data); 

    } catch (error) {
      console.error('Error:', error);  

    }

};


export const updateTaskData = (taskId, data) => async (dispatch) => {
  try {

    const response = await axios.put(
      import.meta.env.VITE_BASE_URL + `feature/updateDailyTask/${taskId}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const updatedTaskData = response.data;

    dispatch(updateTask(updatedTaskData));

  } catch (error) {
    console.error('Error:', error);
  }
};

export const selectTasksData = (state) => state.Tasks.data;
export const selectTasksLoading = (state) => state.Tasks.isLoading;
export const selectTasksError = (state) => state.Tasks.error;

export default TasksSlice.reducer;
