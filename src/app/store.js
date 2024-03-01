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
  },
});

export default store;
