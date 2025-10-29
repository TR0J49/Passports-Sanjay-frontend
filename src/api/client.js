import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add token to requests
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle response errors
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(error);
    } else if (error.request) {
      return Promise.reject(new Error('No response from server'));
    } else {
      return Promise.reject(error);
    }
  }
);

export const authAPI = {
  login: (username, password) => {
    if (!username || !password) {
      throw new Error('Username and password are required');
    }
    return client.post('/auth/login', { username, password });
  },
  register: (username, email, password, confirmPassword) => {
    if (!username || !email || !password || !confirmPassword) {
      throw new Error('All fields are required');
    }
    return client.post('/auth/register', { 
      username, 
      email, 
      password, 
      confirmPassword 
    });
  },
  checkAdmin: () => client.get('/auth/check-admin'),
};

export const usersAPI = {
  register: (formData) => client.post('/users/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  search: (query) => client.get('/users/search', { params: { query } }),
  getAll: () => client.get('/users'),
  getById: (id) => client.get(`/users/${id}`),
  downloadCV: (id) => client.get(`/users/${id}/download-cv`, { responseType: 'blob' }),
  getPhoto: (id) => `${API_BASE_URL}/users/${id}/photo`,
};

export default client;
