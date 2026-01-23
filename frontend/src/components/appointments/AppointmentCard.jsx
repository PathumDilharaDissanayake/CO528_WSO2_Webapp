import dayjs from 'dayjs';
import { Card, Badge, Avatar, Button } from '../common';
import { HiOutlineCalendarDays, HiOutlineClock, HiOutlineUser } from 'react-icons/hi2';

const AppointmentCard = ({
  appointment,
  userRole,
  onStatusUpdate,
  loading = false,
}) => {
  const { timeSlot, status, lecturerId, studentId } = appointment;
  
  const displayName = userRole === 'student'
    ? lecturerId?.name || 'Unknown Lecturer'
    : studentId?.name || 'Unknown Student';

  const formattedDate = timeSlot?.date
    ? dayjs(timeSlot.date).format('ddd, MMM D, YYYY')
    : 'Date not set';

  const formattedTime = timeSlot?.startTime && timeSlot?.endTime
    ? `${timeSlot.startTime} - ${timeSlot.endTime}`
    : 'Time not set';

  const canUpdateStatus = userRole === 'lecturer' && status === 'pending';
  const canCancel = status === 'pending' || status === 'approved';

  return (
    <Card className="slide-in">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Avatar and Name */}
        <div className="flex items-center gap-4 flex-1">
          <Avatar name={displayName} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-text-primary truncate">
                {displayName}
              </h3>
              <Badge status={status} />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-2 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5">
                <HiOutlineCalendarDays className="w-4 h-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <HiOutlineClock className="w-4 h-4" />
                {formattedTime}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        {(canUpdateStatus || canCancel) && (
          <div className="flex items-center gap-2 flex-wrap">
            {canUpdateStatus && (
              <>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => onStatusUpdate(appointment._id, 'approved')}
                  disabled={loading}
                >
                  Approve
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onStatusUpdate(appointment._id, 'rejected')}
                  disabled={loading}
                >
                  Reject
                </Button>
              </>
            )}
            {canCancel && userRole === 'student' && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onStatusUpdate(appointment._id, 'cancelled')}
                disabled={loading}
              >
                Cancel
              </Button>
            )}
            {status === 'approved' && userRole === 'lecturer' && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => onStatusUpdate(appointment._id, 'completed')}
                disabled={loading}
              >
                Mark Complete
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default AppointmentCard;
