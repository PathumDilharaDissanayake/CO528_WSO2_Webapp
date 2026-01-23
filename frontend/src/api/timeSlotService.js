import axiosInstance from './axios';

export const timeSlotService = {
  createTimeSlot: async (timeSlotData) => {
    const response = await axiosInstance.post('/timeslots', timeSlotData);
    return response.data;
  },

  getLecturerTimeSlots: async (lecturerId) => {
    const response = await axiosInstance.get(`/timeslots/lecturer/${lecturerId}`);
    return response.data;
  },

  deleteTimeSlot: async (timeSlotId) => {
    const response = await axiosInstance.delete(`/timeslots/${timeSlotId}`);
    return response.data;
  },
};

export default timeSlotService;
