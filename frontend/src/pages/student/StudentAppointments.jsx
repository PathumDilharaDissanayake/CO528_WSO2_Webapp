import { useState, useEffect, useCallback } from 'react';
import { appointmentService } from '../../api';
import { PageContainer, PageHeader, AppointmentList, Select } from '../../components';
import toast from 'react-hot-toast';

const StudentAppointments = () => {
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
      const data = await appointmentService.getStudentAppointments();
      setAppointments(data);
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
        title="My Appointments"
        subtitle="View and manage your booked appointments"
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
        <p className="text-sm text-text-muted mb-4">
          {filteredAppointments.length} appointment{filteredAppointments.length !== 1 ? 's' : ''} found
        </p>
      )}

      {/* Appointments List */}
      <AppointmentList
        appointments={filteredAppointments}
        userRole="student"
        onStatusUpdate={handleStatusUpdate}
        loading={loading}
        updating={updating}
      />
    </PageContainer>
  );
};

export default StudentAppointments;
