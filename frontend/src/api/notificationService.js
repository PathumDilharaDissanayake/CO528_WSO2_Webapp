import axiosInstance from './axios';

export const notificationService = {
  getNotifications: async () => {
    const response = await axiosInstance.get('/notifications');
    return response.data;
  },
};

export default notificationService;
