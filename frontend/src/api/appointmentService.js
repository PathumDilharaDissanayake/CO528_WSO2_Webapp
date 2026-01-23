import axiosInstance from './axios';

export const appointmentService = {
  bookAppointment: async (appointmentData) => {
    const response = await axiosInstance.post('/appointments', appointmentData);
    return response.data;
  },

  getStudentAppointments: async () => {
    const response = await axiosInstance.get('/appointments/student');
    return response.data;
  },

  getLecturerAppointments: async () => {
    const response = await axiosInstance.get('/appointments/lecturer');
    return response.data;
  },

  updateAppointmentStatus: async (appointmentId, status) => {
    const response = await axiosInstance.put(`/appointments/${appointmentId}`, { status });
    return response.data;
  },
};

export default appointmentService;
