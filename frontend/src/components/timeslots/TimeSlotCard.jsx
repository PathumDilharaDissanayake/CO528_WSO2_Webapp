import dayjs from 'dayjs';
import { Card, Badge, Button } from '../common';
import { HiOutlineClock, HiOutlineTrash } from 'react-icons/hi2';

const TimeSlotCard = ({
  timeSlot,
  onSelect,
  onDelete,
  selectable = false,
  deletable = false,
  selected = false,
  loading = false,
}) => {
  const { date, startTime, endTime, isBooked } = timeSlot;

  const formattedDate = dayjs(date).format('ddd, MMM D, YYYY');
  const isAvailable = !isBooked;
  const isSelectable = selectable && isAvailable;

  return (
    <Card
      hover={isSelectable}
      onClick={isSelectable ? () => onSelect?.(timeSlot) : undefined}
      className={`
        ${isSelectable ? 'cursor-pointer' : ''}
        ${selected ? 'ring-2 ring-primary-accent border-primary-accent' : ''}
        ${!isAvailable && selectable ? 'opacity-50' : ''}
      `}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-accent/10 flex items-center justify-center">
            <HiOutlineClock className="w-6 h-6 text-primary-accent" />
          </div>
          <div>
            <p className="font-medium text-text-primary-light dark:text-text-primary">{formattedDate}</p>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary">
              {startTime} - {endTime}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge status={isAvailable ? 'available' : 'booked'} />
          
          {deletable && isAvailable && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(timeSlot.id);
              }}
              disabled={loading}
              className="!p-2 text-text-muted-light dark:text-text-muted hover:text-danger"
            >
              <HiOutlineTrash className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TimeSlotCard;
