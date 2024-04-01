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
import BallotIcon from '@mui/icons-material/Ballot';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import TaskIcon from '@mui/icons-material/Task';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LogoutIcon from '@mui/icons-material/Logout';
import WalletIcon from '@mui/icons-material/Wallet';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PaidIcon from '@mui/icons-material/Paid';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

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
      id: 11,
      title: "Dashboard",
      icon: DashboardOutlinedIcon,
      href: "/dashboard",
      visible: isVisible,
    },
    {
      id: 12,
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
      id: 13,
      title: "Wallet",
      icon: WalletIcon,
      href: '#',
      visible: isVisible,
      subItems: [
        {
          id: 41,
          title: "Withdrawal Request",
          icon: RequestPageIcon,
          href: "/wallet/withdrawal-request",
        },
        {
          id: 44,
          title: "Next Withdrawal",
          icon: LocalAtmIcon,
          href: "/wallet/next-withdraw",
        },
        {
          id: 42,
          title: "UPI Lists",
          icon: ListAltIcon,
          href: "/upi-lists",
        },
        {
          id: 43,
          title: "Recharge Request",
          icon: PaidIcon,
          href: "/recharge-request",
        },
      ],
    },
    {
      id: 14,
      title: "Add On",
      icon: LibraryAddIcon,
      href: "#",
      visible: isVisible,
      subItems: [
        {
          id: 41,
          title: "Plans",
          icon: LightbulbIcon,
          href: "/addon/plans",
        },
        {
          id: 41,
          title: "Add On",
          icon: ControlPointIcon,
          href: "/addon/add-on",
        },
      ]
    },
    {
      id: 15,
      title: "News",
      icon: NewspaperIcon,
      href: "/news",
      visible: isVisible,
    },
    {
      id: 16,
      title: "Setting",
      icon: ManageAccountsIcon,
      href: '#',
      visible: isVisible,
      subItems: [
        {
          id: 38,
          title: "Notification",
          icon: NotificationsActiveIcon,
          href: "/setting/notifications",
        },
        {
          id: 33,
          title: "App Setting",
          icon: SettingsApplicationsIcon,
          href: "/setting/app-setting",
        },
        {
          id: 35,
          title: "Dialogs List",
          icon: BallotIcon,
          href: "/setting/dialogs-list",
        },
        {
          id: 36,
          title: "Banners List",
          icon: ViewCarouselIcon,
          href: "/setting/banners-list",
        },
      ],
    },
    {
      id: 17,
      title: "Tasks",
      icon: TaskIcon,
      href: '#',
      visible: isVisible,
      subItems: [
        {
          id: 38,
          title: "Task List",
          icon: FormatListBulletedIcon,
          href: "/tasks/task-list",
        },
      ],
    },
    {
      id: 18,
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
