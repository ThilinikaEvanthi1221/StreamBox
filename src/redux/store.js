import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import moviesReducer from './moviesSlice';
import favouritesReducer from './favouritesSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    favourites: favouritesReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
