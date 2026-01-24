# Backend Context

## Stack
- Node.js + Express
- Sequelize ORM with Postgres
- JWT auth

## Entry Points
- `backend/server.js`: boots server and syncs DB schema (`sequelize.sync({ alter: true })`).
- `backend/index.js`: Express app and route wiring.

## Key Routes
- `POST /api/auth/register`, `POST /api/auth/login`
- `GET /api/users/lecturers`, `GET /api/users/me`
- `POST /api/timeslots`, `GET /api/timeslots/lecturer/:id`, `DELETE /api/timeslots/:id`
- `POST /api/appointments`, `GET /api/appointments/student`, `GET /api/appointments/lecturer`, `PUT /api/appointments/:id`

## Models
- `User`: `name`, `email`, `password` (hashed), `role`
- `TimeSlot`: `lecturerId`, `date`, `startTime`, `endTime`, `isBooked`
- `Appointment`: `studentId`, `lecturerId`, `timeSlotId`, `status` (`pending|approved|rejected|cancelled|completed`)

## Status Rules
- Students can only cancel their own appointments.
- Lecturers can approve, reject, and complete their own appointments.
- Rejected/cancelled releases the time slot.

## Env Vars
Read from `backend/.env`: `PORT`, `JWT_SECRET`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS`.
