import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import tableReducer from './tableSlice';
import movieReducer from './movieSlice';
import TasksReducer from './TaskSlice';
import DialogReducer from './DialogSlice';
import UsersReducer from './UsersSlice';
import PlansReducer from './PlansSlice';
import NewsReducer from './NewsSlice';
import BannerReducer from './BannerSlice';

const store = configureStore({
  reducer: {
    menu: menuReducer,
    table: tableReducer,
    movie: movieReducer,
    Tasks: TasksReducer,
    dialogData: DialogReducer,
    Users: UsersReducer,
    Plans: PlansReducer,
    News: NewsReducer,
    Banner: BannerReducer,
  },
});

export default store;
