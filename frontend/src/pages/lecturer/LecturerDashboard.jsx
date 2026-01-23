import { useState, useEffect } from 'react';
import { useAuth } from '../../context';
import { appointmentService, timeSlotService } from '../../api';
import {
  PageContainer,
  PageHeader,
  Card,
  Button,
  Badge,
  Avatar,
  SkeletonLoader,
} from '../../components';
import {
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineArrowRight,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

const LecturerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    totalSlots: 0,
    availableSlots: 0,
  });
  const [pendingAppointments, setPendingAppointments] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [appointmentsData, slotsData] = await Promise.all([
        appointmentService.getLecturerAppointments(),
        timeSlotService.getLecturerTimeSlots(user?._id),
      ]);

      const statsData = {
        totalAppointments: appointmentsData.length,
        pendingAppointments: appointmentsData.filter((a) => a.status === 'pending').length,
        totalSlots: slotsData.length,
        availableSlots: slotsData.filter((s) => !s.isBooked).length,
      };

      setStats(statsData);
      setPendingAppointments(appointmentsData.filter((a) => a.status === 'pending').slice(0, 5));
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = async (appointmentId, status) => {
    try {
      await appointmentService.updateAppointmentStatus(appointmentId, status);
      toast.success(`Appointment ${status}`);
      fetchDashboardData();
    } catch (error) {
      toast.error('Failed to update appointment');
    }
  };

  const statCards = [
    { label: 'Total Appointments', value: stats.totalAppointments, icon: HiOutlineCalendarDays, color: 'text-primary-accent' },
    { label: 'Pending Requests', value: stats.pendingAppointments, icon: HiOutlineClock, color: 'text-warning' },
    { label: 'Total Time Slots', value: stats.totalSlots, icon: HiOutlineClock, color: 'text-success' },
    { label: 'Available Slots', value: stats.availableSlots, icon: HiOutlineCheckCircle, color: 'text-primary-accent' },
  ];

  return (
    <PageContainer>
      <PageHeader
        title={`Welcome, ${user?.name?.split(' ')[0] || 'Lecturer'}!`}
        subtitle="Manage your appointments and time slots"
        action={
          <Button variant="primary" onClick={() => navigate('/lecturer/time-slots')}>
            <HiOutlineClock className="w-4 h-4" />
            Manage Slots
          </Button>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 bg-light-card dark:bg-dark-card rounded-2xl animate-pulse" />
          ))
        ) : (
          statCards.map((stat, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-light-secondary dark:bg-dark-secondary flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-primary-light dark:text-text-primary">{stat.value}</p>
                  <p className="text-xs text-text-muted-light dark:text-text-muted">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Pending Appointments */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary-light dark:text-text-primary">Pending Appointment Requests</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/lecturer/appointments')}
          >
            View All
            <HiOutlineArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {loading ? (
          <SkeletonLoader variant="card" count={3} />
        ) : pendingAppointments.length === 0 ? (
          <Card className="text-center py-8">
            <HiOutlineCalendarDays className="w-12 h-12 text-text-muted-light dark:text-text-muted mx-auto mb-3" />
            <p className="text-text-secondary-light dark:text-text-secondary">No pending appointment requests</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {pendingAppointments.map((appointment) => (
              <Card key={appointment._id}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <Avatar name={appointment.studentId?.name} size="md" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-text-primary-light dark:text-text-primary truncate">
                          {appointment.studentId?.name || 'Unknown Student'}
                        </p>
                        <Badge status="pending" />
                      </div>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary">
                        {appointment.timeSlot?.date
                          ? dayjs(appointment.timeSlot.date).format('MMM D, YYYY')
                          : 'Date TBD'}{' '}
                        • {appointment.timeSlot?.startTime || 'Time TBD'} - {appointment.timeSlot?.endTime || ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleQuickAction(appointment._id, 'approved')}
                    >
                      <HiOutlineCheckCircle className="w-4 h-4" />
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleQuickAction(appointment._id, 'rejected')}
                    >
                      <HiOutlineXCircle className="w-4 h-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default LecturerDashboard;
