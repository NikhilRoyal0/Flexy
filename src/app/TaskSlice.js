import { createSlice } from "@reduxjs/toolkit";

const updatedTasks = [
    { id: 1, title: 'Complete project documentation', name: 'Sonu', date: '12 Sep', priority: 'Critical', status: 'Not Started', avatar: 'url_to_avatar_1' },
    { id: 2, title: 'Implement new feature in app', name: 'Monu', date: '02 Feb', priority: 'Medium', status: 'In Progress', avatar: 'url_to_avatar_2' },
    { id: 3, title: 'Review and finalize design proposal', name: 'Harsh', date: '15 Mar', priority: 'Low', status: 'Completed', avatar: 'url_to_avatar_3' },
    { id: 4, title: 'Prepare presentation for client meeting', name: 'Vishal', date: '08 Apr', priority: 'High', status: 'Not Started', avatar: 'url_to_avatar_4' },
    { id: 5, title: 'Conduct user testing for website', name: 'Punit', date: '23 May', priority: 'Critical', status: 'In Progress', avatar: 'url_to_avatar_5' },
];

const taskSlice = createSlice({
    name: "task",
    initialState: {
        data: updatedTasks,
    },
    reducers: {
        setTaskData: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setTaskData } = taskSlice.actions;
export const selectTaskData = (state) => state.task.data;
export default taskSlice.reducer;
