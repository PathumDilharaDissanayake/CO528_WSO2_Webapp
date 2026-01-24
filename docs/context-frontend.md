# Frontend Context

## Stack
- React (Vite)
- React Router
- Tailwind CSS
- Axios (API)

## Entry
- `frontend/src/main.jsx` bootstraps the app and providers.
- `frontend/src/App.jsx` defines public and role-based routes.

## Core Routes
- Public: `/login`, `/register`
- Student: `/student/dashboard`, `/student/lecturers`, `/student/book/:lecturerId`, `/student/appointments`
- Lecturer: `/lecturer/dashboard`, `/lecturer/time-slots`, `/lecturer/appointments`

## Data Shapes (expected)
- `User`: `id`, `name`, `email`, `role`
- `TimeSlot`: `id`, `lecturerId`, `date`, `startTime`, `endTime`, `isBooked`
- `Appointment`: `id`, `status`, `timeSlot`, `lecturer` or `student`

## Services
- `authService`: `/auth/*`
- `userService`: `/users/*`
- `timeSlotService`: `/timeslots/*`
- `appointmentService`: `/appointments/*`
