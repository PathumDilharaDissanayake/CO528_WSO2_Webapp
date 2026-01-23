import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { userService, appointmentService } from '../../api';
import {
  PageContainer,
  PageHeader,
  Card,
  Button,
  Avatar,
  Badge,
  SkeletonLoader,
} from '../../components';
import {
  HiOutlineCalendarDays,
  HiOutlineUserGroup,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
} from 'react-icons/hi2';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    completed: 0,
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [lecturers, setLecturers] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [appointmentsData, lecturersData] = await Promise.all([
        appointmentService.getStudentAppointments(),
        userService.getLecturers(),
      ]);

      // Calculate stats
      const statsData = {
        total: appointmentsData.length,
        pending: appointmentsData.filter((a) => a.status === 'pending').length,
        approved: appointmentsData.filter((a) => a.status === 'approved').length,
        completed: appointmentsData.filter((a) => a.status === 'completed').length,
      };

      setStats(statsData);
      setRecentAppointments(appointmentsData.slice(0, 3));
      setLecturers(lecturersData.slice(0, 4));
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Appointments', value: stats.total, icon: HiOutlineCalendarDays, color: 'text-primary-accent' },
    { label: 'Pending', value: stats.pending, icon: HiOutlineClock, color: 'text-warning' },
    { label: 'Approved', value: stats.approved, icon: HiOutlineCheckCircle, color: 'text-success' },
    { label: 'Completed', value: stats.completed, icon: HiOutlineCheckCircle, color: 'text-primary-accent' },
  ];

  return (
    <PageContainer>
      <PageHeader
        title={`Welcome, ${user?.name?.split(' ')[0] || 'Student'}!`}
        subtitle="Manage your appointments and book sessions with lecturers"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 bg-dark-card rounded-2xl animate-pulse" />
          ))
        ) : (
          statCards.map((stat, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-dark-secondary flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                  <p className="text-xs text-text-muted">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Appointments */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Recent Appointments</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/student/appointments')}
            >
              View All
              <HiOutlineArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {loading ? (
            <SkeletonLoader variant="list" count={3} />
          ) : recentAppointments.length === 0 ? (
            <Card className="text-center py-8">
              <HiOutlineCalendarDays className="w-12 h-12 text-text-muted mx-auto mb-3" />
              <p className="text-text-secondary">No appointments yet</p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/student/lecturers')}
                className="mt-4"
              >
                Book Your First Appointment
              </Button>
            </Card>
          ) : (
            <div className="space-y-3">
              {recentAppointments.map((appointment) => (
                <Card key={appointment._id} hover onClick={() => navigate('/student/appointments')}>
                  <div className="flex items-center gap-4">
                    <Avatar name={appointment.lecturerId?.name} size="md" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-text-primary truncate">
                          {appointment.lecturerId?.name || 'Unknown'}
                        </p>
                        <Badge status={appointment.status} />
                      </div>
                      <p className="text-sm text-text-secondary">
                        {appointment.timeSlot?.date
                          ? dayjs(appointment.timeSlot.date).format('MMM D, YYYY')
                          : 'Date TBD'}{' '}
                        • {appointment.timeSlot?.startTime || 'Time TBD'}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Available Lecturers */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Available Lecturers</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/student/lecturers')}
            >
              View All
              <HiOutlineArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {loading ? (
            <SkeletonLoader variant="list" count={4} />
          ) : lecturers.length === 0 ? (
            <Card className="text-center py-8">
              <HiOutlineUserGroup className="w-12 h-12 text-text-muted mx-auto mb-3" />
              <p className="text-text-secondary">No lecturers available</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {lecturers.map((lecturer) => (
                <Card
                  key={lecturer._id}
                  hover
                  onClick={() => navigate(`/student/book/${lecturer._id}`)}
                >
                  <div className="flex items-center gap-4">
                    <Avatar name={lecturer.name} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-text-primary truncate">{lecturer.name}</p>
                      <p className="text-sm text-text-muted truncate">{lecturer.email}</p>
                    </div>
                    <HiOutlineArrowRight className="w-5 h-5 text-text-muted" />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default StudentDashboard;
