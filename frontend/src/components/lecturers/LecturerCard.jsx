import { useNavigate } from 'react-router-dom';
import { Card, Avatar, Button } from '../common';
import { HiOutlineEnvelope, HiOutlineCalendarDays } from 'react-icons/hi2';

const LecturerCard = ({ lecturer }) => {
  const navigate = useNavigate();
  const { _id, name, email } = lecturer;

  return (
    <Card hover className="slide-in">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Avatar name={name} size="xl" />
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-text-primary">{name}</h3>
          <p className="flex items-center gap-2 text-sm text-text-secondary mt-1">
            <HiOutlineEnvelope className="w-4 h-4" />
            <span className="truncate">{email}</span>
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate(`/student/book/${_id}`)}
          className="w-full sm:w-auto"
        >
          <HiOutlineCalendarDays className="w-4 h-4" />
          Book Appointment
        </Button>
      </div>
    </Card>
  );
};

export default LecturerCard;
