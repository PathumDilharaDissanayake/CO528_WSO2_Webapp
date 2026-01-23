import axiosInstance from './axios';

export const userService = {
  getLecturers: async () => {
    const response = await axiosInstance.get('/users/lecturers');
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await axiosInstance.get('/users/me');
    return response.data;
  },
};

export default userService;
