import axios from 'axios';

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Public routes (read-only)
export const fetchTasks = () => apiClient.get('/tasks');

// Admin routes (require authentication)
export const createTask = (task) => apiClient.post('/tasks', task);
export const updateTask = (id, updates) => apiClient.put(`/tasks/${id}`, updates);
export const deleteTask = (id) => apiClient.delete(`/tasks/${id}`);
export const toggleTaskCompletion = (id) => apiClient.patch(`/tasks/${id}/toggle`);
export const toggleTaskExpanded = (id) => apiClient.patch(`/tasks/${id}/expand`);
export const clearCompletedTasks = () => apiClient.delete('/tasks/action/clear-completed');

// Admin auth
export const adminLogin = (password) => apiClient.post('/admin/login', { password });
