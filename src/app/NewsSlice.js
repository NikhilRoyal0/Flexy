import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const NewsSlice = createSlice({
  name: "News",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setNewsData: (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
      state.error = null;
    },
    setNewsLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setNewsError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateNews: (state, action) => {
      const updatedNews = action.payload;
      state.data.map((news) => news.newsId === updatedNews.newsId);

    },
  },
});

export const {
  setNewsData,
  setNewsLoading,
  setNewsError,
  updateNews,
} = NewsSlice.actions;

export const fetchNewsData = () => async (dispatch) => {
  try {
    dispatch(setNewsLoading());
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "feature/news");
    dispatch(setNewsData(response.data));
  } catch (error) {
    dispatch(setNewsError(error.message));
  }
};

export const AddData = (form) => async () => {
  try {
    const response = await axios.post(import.meta.env.VITE_BASE_URL + 'feature/insertNews', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

export const updateNewsData = (newsId, data) => async (dispatch) => {
  try {

    const response = await axios.put(
      import.meta.env.VITE_BASE_URL + `feature/updateNews/${newsId}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const updatedNewsData = response.data;

    dispatch(updateNews(updatedNewsData));

  } catch (error) {
    console.error('Error:', error);
  }
};



export const selectNewsData = (state) => state.News.data;
export const selectNewsLoading = (state) => state.News.isLoading;
export const selectNewsError = (state) => state.News.error;

export default NewsSlice.reducer;
