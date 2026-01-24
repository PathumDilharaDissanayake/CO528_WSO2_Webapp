import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService, timeSlotService, appointmentService } from '../../api';
import {
  PageContainer,
  PageHeader,
  Card,
  Button,
  Avatar,
  TimeSlotList,
  LoadingSpinner,
  EmptyState,
} from '../../components';
import { HiOutlineArrowLeft, HiOutlineClock } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);

const BookAppointment = () => {
  const { lecturerId } = useParams();
  const navigate = useNavigate();

  const [lecturer, setLecturer] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [lecturersData, slotsData] = await Promise.all([
        userService.getLecturers(),
        timeSlotService.getLecturerTimeSlots(lecturerId),
      ]);

      const foundLecturer = lecturersData.find((l) => String(l.id) === String(lecturerId));
      if (!foundLecturer) {
        toast.error('Lecturer not found');
        navigate('/student/lecturers');
        return;
      }

      setLecturer(foundLecturer);

      // Filter only available (not booked) and future time slots
      const availableSlots = slotsData
        .filter((slot) => !slot.isBooked && dayjs(slot.date).isSameOrAfter(dayjs(), 'day'))
        .sort((a, b) => {
          const dateCompare = dayjs(a.date).diff(dayjs(b.date));
          if (dateCompare !== 0) return dateCompare;
          return a.startTime.localeCompare(b.startTime);
        });

      setTimeSlots(availableSlots);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [lecturerId, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSelectSlot = (slot) => {
    setSelectedSlot(selectedSlot?.id === slot.id ? null : slot);
  };

  const handleBookAppointment = async () => {
    if (!selectedSlot) {
      toast.error('Please select a time slot');
      return;
    }

    setBooking(true);
    try {
      await appointmentService.bookAppointment({
        lecturerId: Number(lecturerId),
        timeSlotId: selectedSlot.id,
      });
      toast.success('Appointment booked successfully!');
      navigate('/student/appointments');
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.error || 'Failed to book appointment';
      toast.error(message);
      // Refresh data in case slot was already booked
      fetchData();
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/student/lecturers')}
        className="mb-6"
      >
        <HiOutlineArrowLeft className="w-4 h-4" />
        Back to Lecturers
      </Button>

      {/* Lecturer Info */}
      {lecturer && (
        <Card className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Avatar name={lecturer.name} size="xl" />
            <div className="flex-1">
              <h1 className="text-xl font-bold text-text-primary-light dark:text-text-primary">{lecturer.name}</h1>
              <p className="text-text-secondary-light dark:text-text-secondary">{lecturer.email}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Time Slots Section */}
      <div className="mb-6">
        <PageHeader
          title="Available Time Slots"
          subtitle="Select a time slot to book your appointment"
        />
      </div>

      {timeSlots.length === 0 ? (
        <EmptyState
          icon={HiOutlineClock}
          title="No available time slots"
          description="This lecturer hasn't added any available time slots yet. Please check back later."
        />
      ) : (
        <>
          <TimeSlotList
            timeSlots={timeSlots}
            selectable
            selectedId={selectedSlot?.id}
            onSelect={handleSelectSlot}
          />

          {/* Booking Summary & Action */}
          {selectedSlot && (
            <Card glass className="mt-6 sticky bottom-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm text-text-muted-light dark:text-text-muted mb-1">Selected Time Slot</p>
                  <p className="font-semibold text-text-primary-light dark:text-text-primary">
                    {dayjs(selectedSlot.date).format('dddd, MMMM D, YYYY')}
                  </p>
                  <p className="text-text-secondary-light dark:text-text-secondary">
                    {selectedSlot.startTime} - {selectedSlot.endTime}
                  </p>
                </div>
                <Button
                  variant="primary"
                  onClick={handleBookAppointment}
                  loading={booking}
                  className="w-full sm:w-auto"
                >
                  Confirm Booking
                </Button>
              </div>
            </Card>
          )}
        </>
      )}
    </PageContainer>
  );
};

export default BookAppointment;
