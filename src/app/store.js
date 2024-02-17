import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import tableReducer from './tableSlice';
import movieReducer from './movieSlice';
import UserReducer from './UserSlice';
import TaskReducer from './TaskSlice';
import DialogReducer from './DialogSlice';


const store = configureStore({
  reducer: {
    menu: menuReducer,
    table: tableReducer,
    movie: movieReducer,
    Person: UserReducer,
    task: TaskReducer,
    dialogData: DialogReducer
  },
});

export default store;
