import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trendingMovies: [],
  popularMovies: [],
  topRatedMovies: [],
  movieDetails: null,
  searchResults: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    fetchMoviesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTrendingSuccess: (state, action) => {
      state.loading = false;
      state.trendingMovies = action.payload.results;
      state.currentPage = action.payload.page;
      state.totalPages = action.payload.total_pages;
    },
    fetchPopularSuccess: (state, action) => {
      state.loading = false;
      state.popularMovies = action.payload.results;
      state.currentPage = action.payload.page;
      state.totalPages = action.payload.total_pages;
    },
    fetchTopRatedSuccess: (state, action) => {
      state.loading = false;
      state.topRatedMovies = action.payload.results;
      state.currentPage = action.payload.page;
      state.totalPages = action.payload.total_pages;
    },
    fetchMovieDetailsSuccess: (state, action) => {
      state.loading = false;
      state.movieDetails = action.payload;
    },
    fetchSearchResultsSuccess: (state, action) => {
      state.loading = false;
      state.searchResults = action.payload.results;
      state.currentPage = action.payload.page;
      state.totalPages = action.payload.total_pages;
    },
    fetchMoviesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearMovieDetails: (state) => {
      state.movieDetails = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchMoviesStart,
  fetchTrendingSuccess,
  fetchPopularSuccess,
  fetchTopRatedSuccess,
  fetchMovieDetailsSuccess,
  fetchSearchResultsSuccess,
  fetchMoviesFailure,
  clearMovieDetails,
  clearSearchResults,
  clearError,
} = moviesSlice.actions;

export default moviesSlice.reducer;
