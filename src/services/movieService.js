import apiClient from './api';
import { API_ENDPOINTS } from '../constants';

// Fetch trending movies for the week
export const fetchTrendingMovies = async (page = 1) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.TRENDING_MOVIES, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch trending movies');
  }
};

// Fetch popular movies
export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.POPULAR_MOVIES, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch popular movies');
  }
};

// Fetch top rated movies
export const fetchTopRatedMovies = async (page = 1) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.TOP_RATED_MOVIES, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch top rated movies');
  }
};

// Fetch movie details by ID
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.MOVIE_DETAILS}/${movieId}`, {
      params: {
        append_to_response: 'credits,videos,similar',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch movie details');
  }
};

// Search movies by query
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.SEARCH_MOVIES, {
      params: {
        query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to search movies');
  }
};

// Fetch movie videos (trailers, teasers, etc.)
export const fetchMovieVideos = async (movieId) => {
  try {
    const response = await apiClient.get(
      API_ENDPOINTS.MOVIE_VIDEOS.replace('{movie_id}', movieId)
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch movie videos');
  }
};

// Fetch movie credits (cast and crew)
export const fetchMovieCredits = async (movieId) => {
  try {
    const response = await apiClient.get(
      API_ENDPOINTS.MOVIE_CREDITS.replace('{movie_id}', movieId)
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch movie credits');
  }
};
