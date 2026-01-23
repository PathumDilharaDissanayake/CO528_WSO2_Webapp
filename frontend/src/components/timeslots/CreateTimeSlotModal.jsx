import { useState } from 'react';
import dayjs from 'dayjs';
import { Modal, Button, Input } from '../common';
import toast from 'react-hot-toast';

const CreateTimeSlotModal = ({ isOpen, onClose, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else if (dayjs(formData.date).isBefore(dayjs(), 'day')) {
      newErrors.date = 'Date cannot be in the past';
    }

    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }

    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    }

    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = 'End time must be after start time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      await onSubmit(formData);
      setFormData({ date: '', startTime: '', endTime: '' });
      onClose();
    } catch (error) {
      // Error handled by parent
    }
  };

  const handleClose = () => {
    setFormData({ date: '', startTime: '', endTime: '' });
    setErrors({});
    onClose();
  };

  // Get minimum date (today)
  const minDate = dayjs().format('YYYY-MM-DD');

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create Time Slot" size="md">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          min={minDate}
          error={errors.date}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Start Time"
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            error={errors.startTime}
          />

          <Input
            label="End Time"
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            error={errors.endTime}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            fullWidth
          >
            Create Slot
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTimeSlotModal;
