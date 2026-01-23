# CO528 WSO2 Webapp — Appointment Booking System

A simple, well-scoped appointment booking system for **students to book appointments with lecturers**, built as a **React SPA + Node.js/Express REST API + MongoDB** project.


## 1) Tech Stack

### Frontend (SPA)

- React (Vite or CRA)
- React Router (client-side routing)
- Axios (API calls)
- UI: Bootstrap / MUI / plain CSS

### Backend

- Node.js + Express
- REST API
- JWT authentication

### Database

- MongoDB

## 2) User Roles

### Student

- Register / Login
- View available lecturers
- View available time slots
- Book an appointment
- View their appointments
- Cancel an appointment

### Lecturer

- Login
- Set available time slots
- View booked appointments / requests
- Approve / Reject appointments (optional)
- Mark appointment as completed (optional)

## 3) Core User Stories

### Student stories

1. As a student, I can register and log in
2. As a student, I can view lecturers
3. As a student, I can book an appointment with a lecturer
4. As a student, I can view my appointments
5. As a student, I can cancel an appointment

### Lecturer stories

1. As a lecturer, I can log in
2. As a lecturer, I can create available time slots
3. As a lecturer, I can view appointment requests
4. As a lecturer, I can approve or reject appointments

## 4) Database Design (MongoDB)

### `users` collection

```json
{
	"_id": "ObjectId",
	"name": "John Doe",
	"email": "john@uni.edu",
	"password": "hashed",
	"role": "student | lecturer"
}
```

### `timeslots` collection

```json
{
	"_id": "ObjectId",
	"lecturerId": "ObjectId",
	"date": "2026-02-01",
	"startTime": "10:00",
	"endTime": "10:30",
	"isBooked": false
}
```

### `appointments` collection

```json
{
	"_id": "ObjectId",
	"studentId": "ObjectId",
	"lecturerId": "ObjectId",
	"timeSlotId": "ObjectId",
	"status": "pending | approved | rejected | cancelled",
	"createdAt": "Date"
}
```

## 5) API Endpoints (REST)

Base URL: `/api`

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`

### Users

- `GET /api/users/lecturers` (students fetch lecturers)
- `GET /api/users/me` (current user profile)

### Time Slots (Lecturer)

- `POST /api/timeslots` (create availability)
- `GET /api/timeslots/lecturer/:id` (view a lecturer’s slots)
- `DELETE /api/timeslots/:id`

### Appointments

- `POST /api/appointments` (student books)
- `GET /api/appointments/student` (student views)
- `GET /api/appointments/lecturer` (lecturer views)
- `PUT /api/appointments/:id` (approve / reject / cancel)

## 6) Frontend Pages (SPA Routes)

- `/login`
- `/register`
- `/dashboard`
- `/lecturers`
- `/lecturer/:id`
- `/appointments`

### Example dashboards

**Student dashboard**

- List of lecturers
- My appointments

**Lecturer dashboard**

- Create time slots
- Appointment requests

## 7) Application Flow

1. User logs in
2. JWT stored in `localStorage`
3. React SPA loads dashboard based on role
4. Axios sends token in `Authorization: Bearer <token>`
5. Backend validates JWT
6. CRUD operations on time slots and appointments

## 8) Local Setup (Project Scaffold)

This repo currently contains documentation only. When you add the implementation, a common layout is:

```text
client/   # React SPA
server/   # Node.js + Express API
```

Suggested environment variables for the server (`server/.env`):

```text
PORT=5000
MONGO_URI=mongodb://localhost:27017/appointments
JWT_SECRET=change_me
```

## 8.1) API Smoke Test (PowerShell + curl.exe)

Once your backend is running on `http://localhost:5000`, you can run an end-to-end API smoke test that:

- registers a student + lecturer (unique emails)
- logs in and captures JWTs
- creates a lecturer time slot
- books an appointment as the student
- approves and completes the appointment as the lecturer

Run:

```powershell
./scripts/smoke-test.ps1
```

Optional:

```powershell
./scripts/smoke-test.ps1 -BaseUrl "http://localhost:5000/api" -Cleanup
```

