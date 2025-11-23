import Constants from 'expo-constants';

// TMDB API Configuration from environment variables
export const TMDB_API_KEY = Constants.expoConfig?.extra?.tmdbApiKey || '';
export const TMDB_ACCESS_TOKEN = Constants.expoConfig?.extra?.tmdbAccessToken || '';

export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const API_ENDPOINTS = {
  TRENDING_MOVIES: '/trending/movie/week',
  POPULAR_MOVIES: '/movie/popular',
  TOP_RATED_MOVIES: '/movie/top_rated',
  MOVIE_DETAILS: '/movie',
  SEARCH_MOVIES: '/search/movie',
  MOVIE_VIDEOS: '/movie/{movie_id}/videos',
  MOVIE_CREDITS: '/movie/{movie_id}/credits',
};

export const IMAGE_SIZES = {
  POSTER: '/w500',
  BACKDROP: '/w780',
  PROFILE: '/w185',
  ORIGINAL: '/original',
};
