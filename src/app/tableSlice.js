import { createSlice } from "@reduxjs/toolkit";

const products = [
  {
    id: "1",
    name: "Sunil Joshi",
    post: "Web Designer",
    pname: "Elite Admin",
    priority: "Low",
    pbg: "primary.main",
    budget: "30009",
  },
  {
    id: "2",
    name: "Andrew McDownland",
    post: "Project Manager",
    pname: "Real Homes WP Theme",
    priority: "Medium",
    pbg: "secondary.main",
    budget: "24500",
  },
  {
    id: "3",
    name: "Christopher Jamil",
    post: "Project Manager",
    pname: "MedicalPro WP Theme",
    priority: "High",
    pbg: "error.main",
    budget: "12800",
  },
  {
    id: "4",
    name: "Nirav Joshi",
    post: "Frontend Engineer",
    pname: "Hosting Press HTML",
    priority: "Critical",
    pbg: "success.main",
    budget: "24000",
  },
  {
    id: "5",
    name: "Alice Johnson",
    post: "UI/UX Designer",
    pname: "Creative Portfolio",
    priority: "High",
    pbg: "warning.main",
    budget: "87000",
  },
  {
    id: "6",
    name: "Bob Smith",
    post: "Backend Developer",
    pname: "Server Admin Pro",
    priority: "Medium",
    pbg: "info.main",
    budget: "15200",
  },
  {
    id: "7",
    name: "Eva Williams",
    post: "Data Scientist",
    pname: "Data Cruncher App",
    priority: "Critical",
    pbg: "error.main",
    budget: "59000",
  },
  {
    id: "8",
    name: "Daniel Brown",
    post: "Mobile App Developer",
    pname: "Mobile App Pro",
    priority: "Low",
    pbg: "success.main",
    budget: "12400",
  },
  {
    id: "9",
    name: "Grace Lee",
    post: "DevOps Engineer",
    pname: "Cloud Manager",
    priority: "High",
    pbg: "warning.main",
    budget: "93000",
  },
];

const tableSlice = createSlice({
  name: "table",
  initialState: {
    data: products,
  },
  reducers: {
    setTableData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setTableData } = tableSlice.actions;
export const selectTableData = (state) => state.table.data;
export default tableSlice.reducer;
