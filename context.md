# Project Context: CO528 WSO2 Webapp (Appointment Booking)

Last updated: 2026-01-27

## Overview
A full-stack appointment booking system where students book time slots with lecturers.
Frontend is a React SPA (Vite) with role-based routes. Backend is an Express REST API using Sequelize + Postgres and JWT auth.

## Tech Stack
- Frontend: React 18, Vite, React Router, Axios, Tailwind CSS, react-hot-toast, dayjs, react-icons.
- Backend: Node.js, Express, Sequelize, Postgres, JWT, Joi validation, Swagger (swagger-jsdoc + swagger-ui-express).
- Tests: Jest + Supertest (backend).

## Repository Layout
- backend/: Express API
  - controllers/: auth, users, time slots, appointments
  - routes/: /api/auth, /api/users, /api/timeslots, /api/appointments
  - models/: User, TimeSlot, Appointment (Sequelize)
  - middleware/: auth (JWT + role), validation, error handling
  - validators/: Joi schemas
  - config/: database (Sequelize), swagger
  - tests/: Jest tests (auth)
- frontend/: React SPA
  - src/api/: axios instance + services
  - src/context/: Auth + Theme providers
  - src/pages/: auth, student, lecturer pages
  - src/components/: UI components and feature blocks
  - src/routes/: ProtectedRoute, PublicRoute
  - src/styles/: Tailwind layers and shared classes
- scripts/: smoke-test.ps1 (API smoke test)

## Backend Details
Entry points:
- backend/index.js: Express app, routes, swagger, error handlers.
- backend/server.js: starts server and runs sequelize.sync({ alter: true }).

Database (Sequelize + Postgres):
- User: name, email (unique), password (bcrypt), role (student|lecturer)
- TimeSlot: lecturerId, date, startTime, endTime, isBooked
- Appointment: studentId, lecturerId, timeSlotId, status (pending|approved|rejected|cancelled|completed)

Associations (backend/models/index.js):
- User -> TimeSlot (lecturerId)
- User -> Appointment (studentId and lecturerId)
- TimeSlot -> Appointment (timeSlotId)

Auth:
- JWT with payload { id, role }, expires in 30d.
- protect middleware attaches req.user (excluding password).
- authorize middleware enforces role.

Validation:
- Joi validators for auth, time slots, appointments.

## API Summary (Base: /api)
Auth:
- POST /auth/register
- POST /auth/login

Users (auth required):
- GET /users/lecturers
- GET /users/me

Time slots:
- POST /timeslots (lecturer only)
- GET /timeslots/lecturer/:id (auth required)
- DELETE /timeslots/:id (lecturer only)

Appointments:
- POST /appointments (student only)
- GET /appointments/student (student only)
- GET /appointments/lecturer (lecturer only)
- PUT /appointments/:id (status updates; role-limited)

Status rules (appointmentController):
- Students: only cancel
- Lecturers: approve/reject/complete
- Complete requires approved
- Cancel requires pending or approved
- Reject requires pending
- Cancel/reject releases the time slot

## Frontend Details
Routing (frontend/src/App.jsx):
- Public: /login, /register
- Student: /student/dashboard, /student/lecturers, /student/book/:lecturerId, /student/appointments
- Lecturer: /lecturer/dashboard, /lecturer/time-slots, /lecturer/appointments
- Root redirects to /login

Auth flow:
- AuthContext stores token + user in localStorage.
- Axios interceptor adds Bearer token and handles 401/403/404/500 toasts.
- ThemeContext controls light/dark styling.

API base URL:
- frontend/src/api/axios.js uses http://localhost:5000/api

UI:
- Tailwind-based design system in frontend/src/styles/index.css
- Shared components (Card, Button, Badge, Modal, etc.) under frontend/src/components

## Env Vars (backend/.env)
Use these keys (avoid committing real secrets):
- PORT
- JWT_SECRET
- DB_HOST
- DB_PORT
- DB_NAME
- DB_USER
- DB_PASS
- DATABASE_URL

## Common Commands
Backend (run inside backend/):
- npm start
- npm test

Frontend (run inside frontend/):
- npm run dev
- npm run build
- npm run lint
- npm run preview

## Known Mismatches / Notes
- README.md still references MongoDB and a docs-only scaffold; actual implementation uses Postgres + Sequelize.
- Swagger examples and scripts/smoke-test.ps1 still refer to _id fields; the API returns id.
- Smoke test should be updated to use id if you plan to run it.
