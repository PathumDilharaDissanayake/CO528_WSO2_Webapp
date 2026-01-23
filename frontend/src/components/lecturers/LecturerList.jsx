import { HiOutlineUserGroup } from 'react-icons/hi2';
import { EmptyState, SkeletonLoader } from '../common';
import LecturerCard from './LecturerCard';

const LecturerList = ({ lecturers, loading = false }) => {
  if (loading) {
    return <SkeletonLoader variant="card" count={3} />;
  }

  if (!lecturers || lecturers.length === 0) {
    return (
      <EmptyState
        icon={HiOutlineUserGroup}
        title="No lecturers found"
        description="There are no lecturers available at the moment."
      />
    );
  }

  return (
    <div className="space-y-4">
      {lecturers.map((lecturer) => (
        <LecturerCard key={lecturer._id} lecturer={lecturer} />
      ))}
    </div>
  );
};

export default LecturerList;
