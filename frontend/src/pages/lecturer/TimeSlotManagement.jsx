import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context';
import { timeSlotService } from '../../api';
import {
  PageContainer,
  PageHeader,
  Button,
  TimeSlotList,
  CreateTimeSlotModal,
} from '../../components';
import { HiOutlinePlus } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const TimeSlotManagement = () => {
  const { user } = useAuth();
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTimeSlots = useCallback(async () => {
    if (!user?._id) return;
    
    try {
      setLoading(true);
      const data = await timeSlotService.getLecturerTimeSlots(user._id);
      // Sort by date and time
      const sortedData = data.sort((a, b) => {
        const dateCompare = new Date(a.date) - new Date(b.date);
        if (dateCompare !== 0) return dateCompare;
        return a.startTime.localeCompare(b.startTime);
      });
      setTimeSlots(sortedData);
    } catch (error) {
      toast.error('Failed to load time slots');
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    fetchTimeSlots();
  }, [fetchTimeSlots]);

  const handleCreateSlot = async (formData) => {
    setCreating(true);
    try {
      await timeSlotService.createTimeSlot(formData);
      toast.success('Time slot created successfully');
      fetchTimeSlots();
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to create time slot';
      toast.error(message);
      throw error;
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteSlot = async (slotId) => {
    if (!window.confirm('Are you sure you want to delete this time slot?')) {
      return;
    }

    setDeleting(true);
    try {
      await timeSlotService.deleteTimeSlot(slotId);
      toast.success('Time slot deleted');
      fetchTimeSlots();
    } catch (error) {
      toast.error('Failed to delete time slot');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Manage Time Slots"
        subtitle="Create and manage your available time slots for appointments"
        action={
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            <HiOutlinePlus className="w-4 h-4" />
            Add Time Slot
          </Button>
        }
      />

      {/* Results count */}
      {!loading && (
        <p className="text-sm text-text-muted mb-4">
          {timeSlots.length} time slot{timeSlots.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Time Slots List */}
      <TimeSlotList
        timeSlots={timeSlots}
        deletable
        onDelete={handleDeleteSlot}
        loading={loading}
        deleting={deleting}
        emptyMessage="No time slots created"
        emptyDescription="Create your first time slot to allow students to book appointments with you."
      />

      {/* Create Modal */}
      <CreateTimeSlotModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateSlot}
        loading={creating}
      />
    </PageContainer>
  );
};

export default TimeSlotManagement;
