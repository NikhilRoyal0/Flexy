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
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

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
      id: 1,
      title: "Dashboard",
      icon: DashboardOutlinedIcon,
      href: "/dashboard",
    },
    {
      id: 2,
      title: "Autocomplete",
      icon: AddToPhotosOutlinedIcon,
      href: "/autocomplete",
    },
    {
      id: 3,
      title: "Buttons",
      icon: AspectRatioOutlinedIcon,
      href: "/button",
      subItems: [
        {
          id: 31,
          title: "Button1",
          icon: AspectRatioOutlinedIcon,
          href: "/button/button1",
        },
        {
          id: 32,
          title: "Button2",
          icon: AspectRatioOutlinedIcon,
          href: "/button/button2",
        },
        {
          id: 33,
          title: "Button3",
          icon: AspectRatioOutlinedIcon,
          href: "/button/button3",
        },
      ],
    },
    {
      id: 4,
      title: "Checkbox",
      icon: AssignmentTurnedInOutlinedIcon,
      href: "/checkbox",
    },
    {
      id: 5,
      title: "Radio",
      icon: AlbumOutlinedIcon,
      href: "/radio",
    },
    {
      id: 6,
      title: "Slider",
      icon: SwitchCameraOutlinedIcon,
      href: "/slider",
    },
    {
      id: 7,
      title: "Switch",
      icon: SwitchLeftOutlinedIcon,
      href: "/switch",
    },
    {
      id: 8,
      title: "Form",
      icon: DescriptionOutlinedIcon,
      href: "/form-layouts",
    },
    {
      id: 9,
      title: "Table",
      icon: AutoAwesomeMosaicOutlinedIcon,
      href: "/basic-table",
    },
    {
      id: 10,
      title: "Register",
      icon: AppRegistrationIcon,
      href: "/register",
    },
  ];
  
  dispatch(setMenuItems(menuItems));
};

export default menuSlice.reducer;
