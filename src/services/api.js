import axios from 'axios';
import { BASE_URL, TMDB_API_KEY, TMDB_ACCESS_TOKEN, API_ENDPOINTS, IMAGE_BASE_URL, IMAGE_SIZES } from '../constants';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add API key to params if not using Bearer token
    if (!config.headers.Authorization) {
      config.params = {
        ...config.params,
        api_key: TMDB_API_KEY,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// Helper function to get full image URL
export const getImageUrl = (path, size = IMAGE_SIZES.POSTER) => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}${size}${path}`;
};
