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
import Person4Icon from '@mui/icons-material/Person4';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import SettingsIcon from '@mui/icons-material/Settings';
import BallotIcon from '@mui/icons-material/Ballot';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import TaskIcon from '@mui/icons-material/Task';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LogoutIcon from '@mui/icons-material/Logout';

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

  const isVisible = true;

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
    {
      title: "Dashboard",
      icon: DashboardOutlinedIcon,
      href: "/dashboard",
      visible: isVisible,
    },
    {
      title: "User",
      icon: Person4Icon,
      href: '#',
      visible: isVisible,
      subItems: [
        {
          id: 31,
          title: "User List",
          icon: RecentActorsIcon,
          href: "/user/user-list",
        },
        {
          id: 32,
          title: "Add User",
          icon: PersonAddAltIcon,
          href: "/user/add-user",
        },
      ],
    },
    {
      title: "Plans",
      icon: LightbulbIcon,
      href: "/plans",
      visible: isVisible,
    },
    {
      title: "News",
      icon: NewspaperIcon,
      href: "/news",
      visible: isVisible,
    },
    {
      title: "Setting",
      icon: ManageAccountsIcon,
      href: '#',
      visible: isVisible,
      subItems: [
        {
          title: "App Setting",
          icon: SettingsApplicationsIcon,
          href: "/setting/app-setting",
        },
        {
          title: "Profile Setting",
          icon: SettingsIcon,
          href: "/setting/basic-setting",
        },
        {
          title: "Dialogs List",
          icon: BallotIcon,
          href: "/setting/dialogs-list",
        },
        {
          title: "Banners List",
          icon: ViewCarouselIcon,
          href: "/setting/banners-list",
        },
      ],
    },
    {
      title: "Tasks",
      icon: TaskIcon,
      href: '#',
      visible: isVisible,
      subItems: [
        {
          title: "Task Category",
          icon: SplitscreenIcon,
          href: "/tasks/task-category",
        },
        {
          title: "Task List",
          icon: FormatListBulletedIcon,
          href: "/tasks/task-list",
        },
      ],
    },
    {
      title: "Logout",
      icon: LogoutIcon,
      href: "/logout",
      visible: isVisible,
    },

  ];

  const filteredMenuItems = menuItems.filter((item) => item.visible);

  dispatch(setMenuItems(filteredMenuItems));
};

export default menuSlice.reducer;
