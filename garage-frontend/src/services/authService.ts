import axios from 'axios';
import { User, LoginCredentials, RegisterCredentials } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Login user
export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

// Register user
export const register = async (
  username: string,
  email: string,
  password: string,
  role?: string
) => {
  const response = await api.post('/auth/register', { username, email, password, role });
  return response.data;
};

// Get current user
export const getCurrentUser = async (token: string | null) => {
  if (!token) {
    throw new Error('No token provided');
  }

  const response = await api.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Logout user
export const logout = async () => {
  // Clear token from local storage
  localStorage.removeItem('token');
};

export default api;