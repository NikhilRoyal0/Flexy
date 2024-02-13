import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import tableReducer from './tableSlice'
import movieReducer from './movieSlice'

const store = configureStore({
  reducer: {
    menu: menuReducer,
    table: tableReducer,
    movie: movieReducer,
  },
});

export default store;
