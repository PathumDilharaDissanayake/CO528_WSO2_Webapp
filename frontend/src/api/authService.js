import axiosInstance from './axios';

export const authService = {
  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await axiosInstance.get('/users/me');
    return response.data;
  },
};

export default authService;
