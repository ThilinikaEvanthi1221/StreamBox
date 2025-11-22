import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of favourite movie IDs and basic info
  loading: false,
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavourite: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setFavourites: (state, action) => {
      state.items = action.payload;
    },
    clearFavourites: (state) => {
      state.items = [];
    },
    toggleFavourite: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const {
  addFavourite,
  removeFavourite,
  setFavourites,
  clearFavourites,
  toggleFavourite,
} = favouritesSlice.actions;

export default favouritesSlice.reducer;
