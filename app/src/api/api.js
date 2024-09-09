import axios from 'axios';

const API_URL = 'http://localhost:9090'; // Backend URL

// Set up the Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to headers for authenticated routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const registerStudent = (studentData) => api.post('/students', studentData);
export const getStudent = (id) => api.get(`/students/${id}`);
export const updateStudent = (id, studentData) => api.put(`/students/${id}`, studentData);
export const deleteStudent = (id) => api.delete(`/students/${id}`);
export const loginUser = (credentials) => api.post('/auth/login', credentials);

export default api;
