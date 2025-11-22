// TMDB API Configuration
export const TMDB_API_KEY = 'ea969b072257f169502906cb4b057cca';
export const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTk2OWIwNzIyNTdmMTY5NTAyOTA2Y2I0YjA1N2NjYSIsIm5iZiI6MTc2MzgwNzM0OS41NzIsInN1YiI6IjY5MjE5MDc1NDIzMGFiMjU0MTBiYTBhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EV0wqYTDHQpGinrljc2p3Td9ctlaTvbKWJBJcumq81k';

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
