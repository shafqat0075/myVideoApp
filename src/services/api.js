import axios from 'axios';

// Base URL - will be replaced with your Azure backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if user is logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API Functions
export const videoService = {
  // Get all videos
  getVideos: () => api.get('/videos'),
  
  // Get single video by ID
  getVideo: (id) => api.get(`/videos/${id}`),
  
  // Upload video (creator only)
  uploadVideo: (formData) => api.post('/videos/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  // Search videos
  searchVideos: (query) => api.get(`/videos/search?q=${query}`),
  
  // Add comment
  addComment: (videoId, comment) => api.post(`/videos/${videoId}/comments`, { comment }),
  
  // Like video
  likeVideo: (videoId) => api.post(`/videos/${videoId}/like`),
  
  // Dislike video
  dislikeVideo: (videoId) => api.post(`/videos/${videoId}/dislike`),
};

export const authService = {
  // Login
  login: (email, password) => api.post('/auth/login', { email, password }),
  
  // Signup
  signup: (username, email, password) => api.post('/auth/signup', { username, email, password }),
  
  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export default api;