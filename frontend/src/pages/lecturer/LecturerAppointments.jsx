import { useState, useEffect, useCallback } from 'react';
import { appointmentService } from '../../api';
import { PageContainer, PageHeader, AppointmentList, Select } from '../../components';
import toast from 'react-hot-toast';

const LecturerAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'completed', label: 'Completed' },
  ];

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await appointmentService.getLecturerAppointments();
      // Sort by status priority and date
      const sorted = data.sort((a, b) => {
        const statusOrder = { pending: 0, approved: 1, completed: 2, rejected: 3, cancelled: 4 };
        const statusDiff = (statusOrder[a.status] || 5) - (statusOrder[b.status] || 5);
        if (statusDiff !== 0) return statusDiff;
        return new Date(a.timeSlot?.date || 0) - new Date(b.timeSlot?.date || 0);
      });
      setAppointments(sorted);
    } catch (error) {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(appointments.filter((a) => a.status === statusFilter));
    }
  }, [statusFilter, appointments]);

  const handleStatusUpdate = async (appointmentId, status) => {
    setUpdating(true);
    try {
      await appointmentService.updateAppointmentStatus(appointmentId, status);
      toast.success(`Appointment ${status}`);
      fetchAppointments();
    } catch (error) {
      toast.error('Failed to update appointment');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Appointments"
        subtitle="Review and manage student appointment requests"
      />

      {/* Filter */}
      <div className="mb-6">
        <div className="max-w-xs">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
          />
        </div>
      </div>

      {/* Results count */}
      {!loading && (
        <p className="text-sm text-text-muted-light dark:text-text-muted mb-4">
          {filteredAppointments.length} appointment{filteredAppointments.length !== 1 ? 's' : ''} found
        </p>
      )}

      {/* Appointments List */}
      <AppointmentList
        appointments={filteredAppointments}
        userRole="lecturer"
        onStatusUpdate={handleStatusUpdate}
        loading={loading}
        updating={updating}
      />
    </PageContainer>
  );
};

export default LecturerAppointments;
