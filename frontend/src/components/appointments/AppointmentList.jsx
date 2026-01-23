import { HiOutlineCalendarDays } from 'react-icons/hi2';
import { EmptyState, SkeletonLoader } from '../common';
import AppointmentCard from './AppointmentCard';

const AppointmentList = ({
  appointments,
  userRole,
  onStatusUpdate,
  loading = false,
  updating = false,
}) => {
  if (loading) {
    return <SkeletonLoader variant="card" count={3} />;
  }

  if (!appointments || appointments.length === 0) {
    return (
      <EmptyState
        icon={HiOutlineCalendarDays}
        title="No appointments found"
        description={
          userRole === 'student'
            ? "You haven't booked any appointments yet. Browse lecturers to book one."
            : "You don't have any appointments yet."
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment._id}
          appointment={appointment}
          userRole={userRole}
          onStatusUpdate={onStatusUpdate}
          loading={updating}
        />
      ))}
    </div>
  );
};

export default AppointmentList;
