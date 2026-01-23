import { HiOutlineClock } from 'react-icons/hi2';
import { EmptyState, SkeletonLoader } from '../common';
import TimeSlotCard from './TimeSlotCard';

const TimeSlotList = ({
  timeSlots,
  onSelect,
  onDelete,
  selectable = false,
  deletable = false,
  selectedId = null,
  loading = false,
  deleting = false,
  emptyMessage = "No time slots available",
  emptyDescription = "",
}) => {
  if (loading) {
    return <SkeletonLoader variant="slot" count={4} />;
  }

  if (!timeSlots || timeSlots.length === 0) {
    return (
      <EmptyState
        icon={HiOutlineClock}
        title={emptyMessage}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className="space-y-3">
      {timeSlots.map((timeSlot) => (
        <TimeSlotCard
          key={timeSlot._id}
          timeSlot={timeSlot}
          onSelect={onSelect}
          onDelete={onDelete}
          selectable={selectable}
          deletable={deletable}
          selected={selectedId === timeSlot._id}
          loading={deleting}
        />
      ))}
    </div>
  );
};

export default TimeSlotList;
