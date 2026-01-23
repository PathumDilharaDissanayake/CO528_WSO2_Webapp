# 📘 API Documentation
## Lecturer Appointment Booking System

---

### 🌐 Base URL
```
http://localhost:5000/api
```

### 🔐 Authentication
All protected routes require a **JWT token** in the request headers:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication APIs

### 1️⃣ Register User
**POST** `/auth/register`

**Request Body**
```json
{
  "name": "John Doe",
  "email": "john@uni.edu",
  "password": "password123",
  "role": "student"
}
```

**Response – 201 Created**
```json
{
  "message": "User registered successfully"
}
```

---

### 2️⃣ Login User
**POST** `/auth/login`

**Request Body**
```json
{
  "email": "john@uni.edu",
  "password": "password123"
}
```

**Response – 200 OK**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "ObjectId",
    "name": "John Doe",
    "role": "student"
  }
}
```

---

## 👥 User APIs

### 3️⃣ Get All Lecturers (Student)
**GET** `/users/lecturers`

**Response – 200 OK**
```json
[
  {
    "_id": "ObjectId",
    "name": "Dr. Smith",
    "email": "smith@uni.edu",
    "role": "lecturer"
  }
]
```

---

### 4️⃣ Get Logged-in User
**GET** `/users/me`

**Response – 200 OK**
```json
{
  "_id": "ObjectId",
  "name": "John Doe",
  "email": "john@uni.edu",
  "role": "student"
}
```

---

## 🕒 Time Slot APIs (Lecturer)

### 5️⃣ Create Time Slot
**POST** `/timeslots`

**Request Body**
```json
{
  "date": "2026-02-01",
  "startTime": "10:00",
  "endTime": "10:30"
}
```

**Response – 201 Created**
```json
{
  "message": "Time slot created successfully"
}
```

---

### 6️⃣ Get Lecturer Time Slots
**GET** `/timeslots/lecturer/:lecturerId`

**Response – 200 OK**
```json
[
  {
    "_id": "ObjectId",
    "date": "2026-02-01",
    "startTime": "10:00",
    "endTime": "10:30",
    "isBooked": false
  }
]
```

---

### 7️⃣ Delete Time Slot
**DELETE** `/timeslots/:id`

**Response – 200 OK**
```json
{
  "message": "Time slot deleted"
}
```

---

## 📅 Appointment APIs

### 8️⃣ Book Appointment (Student)
**POST** `/appointments`

**Request Body**
```json
{
  "lecturerId": "ObjectId",
  "timeSlotId": "ObjectId"
}
```

**Response – 201 Created**
```json
{
  "message": "Appointment booked successfully",
  "status": "pending"
}
```

---

### 9️⃣ View Student Appointments
**GET** `/appointments/student`

**Response – 200 OK**
```json
[
  {
    "_id": "ObjectId",
    "lecturerId": {
      "name": "Dr. Smith"
    },
    "status": "approved",
    "timeSlot": {
      "date": "2026-02-01",
      "startTime": "10:00",
      "endTime": "10:30"
    }
  }
]
```

---

### 🔟 View Lecturer Appointments
**GET** `/appointments/lecturer`

**Response – 200 OK**
```json
[
  {
    "_id": "ObjectId",
    "studentId": {
      "name": "John Doe"
    },
    "status": "pending",
    "timeSlot": {
      "date": "2026-02-01",
      "startTime": "10:00",
      "endTime": "10:30"
    }
  }
]
```

---

### 1️⃣1️⃣ Update Appointment Status
**PUT** `/appointments/:id`

**Request Body**
```json
{
  "status": "approved"
}
```

**Allowed Status Values**
```
approved | rejected | cancelled | completed
```

**Response – 200 OK**
```json
{
  "message": "Appointment status updated"
}
```

---

## 🗄 Data Models

### User
```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String",
  "password": "Hashed String",
  "role": "student | lecturer"
}
```

### TimeSlot
```json
{
  "_id": "ObjectId",
  "lecturerId": "ObjectId",
  "date": "YYYY-MM-DD",
  "startTime": "HH:mm",
  "endTime": "HH:mm",
  "isBooked": true | false
}
```

### Appointment
```json
{
  "_id": "ObjectId",
  "studentId": "ObjectId",
  "lecturerId": "ObjectId",
  "timeSlotId": "ObjectId",
  "status": "pending | approved | rejected | cancelled | completed",
  "createdAt": "Date"
}
```

---

## 🔒 Error Response Format
```json
{
  "error": "Error message description"
}
```

