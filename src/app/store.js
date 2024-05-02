import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import tableReducer from './tableSlice';
import movieReducer from './movieSlice';
import TasksReducer from './TaskSlice';
import dialogsReducer from './DialogSlice';
import UsersReducer from './UsersSlice';
import PlansReducer from './PlansSlice';
import NewsReducer from './NewsSlice';
import BannerReducer from './BannerSlice';
import appSettingReducer from './AppSlice';
import WithdrawalReducer from './WithdrawalSlice';
import UPISliceReducer from './UpiSlice';
import RechargeReducer from './RechargeSlice';
import AddOnReducer from './AddOnSlice';
import UpComingReducer from './UpComingSlice';
import NotificationReducer from './NotificationSlice';
import ReferSettingReducer from './ReferSettingSlice';
import AuthReducer from "../app/AuthSlice";
import DashReducer from "../app/DashSlice";
import CouponReducer from "./CouponSlice";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    table: tableReducer,
    movie: movieReducer,
    Tasks: TasksReducer,
    dialogs: dialogsReducer,
    Users: UsersReducer,
    Plans: PlansReducer,
    News: NewsReducer,
    Banner: BannerReducer,
    appSetting: appSettingReducer,
    Withdrawal: WithdrawalReducer,
    UPI: UPISliceReducer,
    Recharge: RechargeReducer,
    AddOn: AddOnReducer,
    UpComing: UpComingReducer,
    Notification: NotificationReducer,
    ReferSetting: ReferSettingReducer,
    Auth: AuthReducer,
    Dash: DashReducer,
    Coupon: CouponReducer,

  },
});

export default store;
