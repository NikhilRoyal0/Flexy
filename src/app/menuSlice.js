import { createSlice } from '@reduxjs/toolkit';

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import SwitchCameraOutlinedIcon from '@mui/icons-material/SwitchCameraOutlined';
import SwitchLeftOutlinedIcon from '@mui/icons-material/SwitchLeftOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';

const initialState = {
  menuItems: [],
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuItems: (state, action) => {
      state.menuItems = action.payload;
    },
  },
});

export const { setMenuItems } = menuSlice.actions;

export const fetchMenuItems = () => (dispatch) => {

  const menuItems = [
    {
      title: "Dashboard",
      icon: 'DashboardOutlinedIcon',
      href: "/dashboard",
    },
    {
      title: "Autocomplete",
      icon: 'AddToPhotosOutlinedIcon',
      href: "/autocomplete",
    },
    {
      title: "Buttons",
      icon: 'AspectRatioOutlinedIcon',
      href: "/button",
    },
    {
      title: "Checkbox",
      icon: 'AssignmentTurnedInOutlinedIcon',
      href: "/checkbox",
    },
    {
      title: "Radio",
      icon: 'AlbumOutlinedIcon',
      href: "/radio",
    },
    {
      title: "Slider",
      icon: 'SwitchCameraOutlinedIcon',
      href: "/slider",
    },
    {
      title: "Switch",
      icon: 'SwitchLeftOutlinedIcon',
      href: "/switch",
    },
    {
      title: "Form",
      icon: 'DescriptionOutlinedIcon',
      href: "/form-layouts",
    },
    {
      title: "Table",
      icon: 'AutoAwesomeMosaicOutlinedIcon',
      href: "/basic-table",
    },
  ];
  

  dispatch(setMenuItems(menuItems));
};

export default menuSlice.reducer;
