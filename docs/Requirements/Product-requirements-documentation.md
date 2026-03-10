# Product Requirements Document (PRD): Lecturer Appointment Booking System - DECP

## 1. Introduction

* **Product Overview:** The Lecturer Appointment Booking System is a web-based application designed to streamline the scheduling process between students and lecturers in an educational institution. The platform enables students to browse available lecturers, view their available time slots, and book appointments, while allowing lecturers to manage their availability and approve/reject appointment requests. The system solves the common problem of inefficient appointment coordination in academic settings by providing a centralized, real-time booking platform.

* **Project Status:** As-Built / Completed Codebase.

## 2. Target Audience & User Personas


* **Persona 1:** Student
  - Can register and authenticate into the system
  - Can browse and search available lecturers
  - Can view lecturer's available time slots
  - Can book appointments with lecturers for available time slots
  - Can view all their appointments (pending, approved, rejected, cancelled, completed)
  - Can cancel pending or approved appointments
  - Has access to a personalized dashboard with appointment statistics
  - Receives notifications about appointment status changes

* **Persona 2:** Lecturer
  - Can register and authenticate into the system
  - Can create and manage available time slots (date, start time, end time)
  - Can delete unbooked time slots
  - Can view all student appointment requests
  - Can approve or reject pending appointment requests
  - Can mark approved appointments as completed
  - Has access to a personalized dashboard with appointment and time slot statistics
  - Receives notifications about new appointment bookings

* **Persona 3:** Admin
  - Can authenticate with elevated system privileges
  - Can manage all users (students and lecturers) - view, edit, deactivate accounts
  - Can manage system configuration and settings
  - Can view audit logs and system activity
  - Can broadcast system-wide notifications/announcements

## 3. Tech Stack & Architecture

### Frontend
* **Framework:** React 18.2.0 
* **Build Tool:** Vite 7.3.1
* **Routing:** React Router DOM 6.22.1
* **HTTP Client:** Axios 1.6.7
* **UI Styling:** TailwindCSS 3.4.1, PostCSS, Autoprefixer
* **State Management:** React Context API (AuthContext, ThemeContext)
* **Date Handling:** Day.js 1.11.10
* **Notifications/Toasts:** react-hot-toast 2.4.1
* **Icons:** react-icons 5.0.1
* **Linting:** ESLint with React plugins

### Backend
* **Runtime:** Node.js
* **Framework:** Express 5.2.1
* **Authentication:** JSON Web Tokens (jsonwebtoken 9.0.3) with bcryptjs 3.0.3 for password hashing
* **Validation:** Joi 18.0.2
* **API Documentation:** Swagger (swagger-jsdoc 6.2.8, swagger-ui-express 5.0.1)
* **Development:** Nodemon 3.1.11

### Database & Storage
* **Primary Database:** PostgreSQL
* **ORM:** Sequelize 6.37.7
* **Data Format:** JSONB support for notification payloads

### Message Queue / Event Bus
* **Message Broker:** RabbitMQ 
* **Exchange Type:** Fanout exchange for event publishing
* **Consumer Service:** Separate Node.js consumer service for processing appointment events

### Infrastructure/DevOps
* **Environment Management:** dotenv 17.2.3
* **Testing Framework:** Jest 30.2.0 with Supertest 7.2.2 for backend integration tests
* **CI/CD:** To be added 
* **CONTAINERIZATION:** 
## 4. Core Features & Capabilities

### 4.1 User Authentication & Authorization
* **Description:** Secure user registration and login system with role-based access control.
* **Key Functionalities:**
  * User registration with role selection (student or lecturer)
  * JWT-based authentication with 30-day token expiration
  * Password hashing using bcrypt (salt rounds: 10)
  * Email normalization (lowercase, trimmed) during authentication
  * Protected routes requiring valid JWT tokens
  * Role-based route authorization (e.g., only students can book, only lecturers can manage time slots)
  * Automatic redirect based on user role after login
  * Token persistence in localStorage for session management

### 4.2 Student Dashboard & Management
* **Description:** Central hub for students to manage their appointments and discover lecturers.
* **Key Functionalities:**
  * Personalized welcome dashboard with appointment statistics
  * Real-time statistics: Total appointments, Pending, Approved, Completed counts
  * Recent appointments quick view
  * Quick access to browse lecturers
  * Notification feed with automatic refresh (10-second polling)
  * Navigation to detailed appointment list
  * Navigation to lecturer discovery page

### 4.3 Lecturer Discovery & Search
* **Description:** Allows students to browse and search for available lecturers.
* **Key Functionalities:**
  * List of all registered lecturers with profile information
  * Search functionality by name or email (client-side filtering)
  * Result count display
  * Direct navigation to book appointments with selected lecturer
  * Lecturer profile cards displaying name and email

### 4.4 Time Slot Management (Lecturer)
* **Description:** Enables lecturers to create and manage their available appointment slots.
* **Key Functionalities:**
  * Create new time slots with date, start time, and end time
  * Automatic validation that end time is after start time
  * View all created time slots (sorted by date and time)
  * Delete unbooked time slots
  * Protection against deleting booked time slots
  * Authorization check ensuring lecturers can only manage their own slots
  * Booking status indicator (booked/available)

### 4.5 Appointment Booking (Student)
* **Description:** Allows students to book appointments with lecturers.
* **Key Functionalities:**
  * View lecturer profile information
  * Display only available (unbooked) future time slots
  * Time slots sorted by date and start time
  * Single slot selection with toggle behavior
  * Booking confirmation with immediate feedback
  * Automatic time slot marking as booked upon successful booking
  * Validation against double-booking
  * Event publishing to message queue on successful booking (AppointmentCreated event)

### 4.6 Appointment Management
* **Description:** Comprehensive appointment lifecycle management for both students and lecturers.
* **Key Functionalities:**
  * **Appointment Statuses:** pending, approved, rejected, cancelled, completed
  * **Student Actions:**
    - View all their appointments with lecturer details and time slot information
    - Cancel pending or approved appointments
    - Filter appointments by status
    - Auto-refresh every 10 seconds
  * **Lecturer Actions:**
    - View all appointment requests with student details
    - Approve pending appointments
    - Reject pending appointments
    - Mark approved appointments as completed
    - Filter appointments by status
    - Quick approve/reject actions from dashboard
  * **Business Rules:**
    - Only pending appointments can be approved
    - Only pending appointments can be rejected
    - Only pending or approved appointments can be cancelled
    - Only approved appointments can be marked as completed
    - Cancelled/rejected appointments release the time slot for rebooking
    - Appointments sorted by status priority (pending first)

### 4.7 Lecturer Dashboard
* **Description:** Central hub for lecturers to manage their availability and appointments.
* **Key Functionalities:**
  * Personalized welcome dashboard
  * Statistics: Total Appointments, Pending Requests, Total Time Slots, Available Slots
  * Pending appointment requests quick view with approve/reject actions
  * Quick action to manage time slots
  * Notification feed with automatic refresh
  * Direct navigation to detailed appointment management

### 4.8 Notification System
* **Description:** Event-driven notification system for tracking appointment activities.
* **Key Functionalities:**
  * Event publishing to RabbitMQ on appointment creation
  * Separate consumer service for processing events
  * Notification storage with event details (eventName, entityId, timestamp, payload)
  * Notification ingestion via secure webhook endpoint (x-notify-token)
  * Notification retrieval API (latest 50 notifications)
  * Dashboard notification widgets with 10-second auto-refresh
  * [NOTIFICATION DELIVERY]: [Currently stores notifications in database; actual delivery mechanism (email, push, SMS) not implemented - requires integration with notification providers]

### 4.9 Theme Support
* **Description:** User interface theme customization.
* **Key Functionalities:**
  * Light and dark mode support
  * Theme persistence via ThemeContext
  * Tailwind CSS-based theme switching
  * Responsive design for various screen sizes

### 4.10 API Documentation
* **Description:** Interactive API documentation using OpenAPI/Swagger.
* **Key Functionalities:**
  * Available at `/api-docs` endpoint
  * Complete documentation of all API endpoints
  * Request/response schema definitions
  * Authentication scheme documentation (Bearer JWT)
  * Try-it-out functionality for testing

## 5. Data Models & Entities

* **User:**
  - `id` (INTEGER, Primary Key, Auto-increment)
  - `name` (STRING, Required) - User's full name
  - `email` (STRING, Required, Unique, Email validation) - User's email address
  - `password` (STRING, Required) - Bcrypt-hashed password
  - `role` (ENUM: 'student' | 'lecturer', Required) - User type determining access permissions
  - `createdAt`, `updatedAt` (TIMESTAMP) - Sequelize timestamps

* **TimeSlot:**
  - `id` (INTEGER, Primary Key, Auto-increment)
  - `lecturerId` (INTEGER, Required, Foreign Key → User) - Owning lecturer
  - `date` (DATEONLY, Required) - Date of the time slot (YYYY-MM-DD)
  - `startTime` (TIME, Required) - Start time of availability
  - `endTime` (TIME, Required) - End time of availability
  - `isBooked` (BOOLEAN, Default: false) - Booking status flag
  - `createdAt`, `updatedAt` (TIMESTAMP) - Sequelize timestamps
  - Associations: Belongs to User (lecturer), Has one Appointment

* **Appointment:**
  - `id` (INTEGER, Primary Key, Auto-increment)
  - `studentId` (INTEGER, Required, Foreign Key → User) - Student who booked
  - `lecturerId` (INTEGER, Required, Foreign Key → User) - Lecturer being booked
  - `timeSlotId` (INTEGER, Required, Foreign Key → TimeSlot) - Associated time slot
  - `status` (ENUM: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'completed', Default: 'pending') - Current appointment status
  - `createdAt`, `updatedAt` (TIMESTAMP) - Sequelize timestamps
  - Associations: Belongs to User (student), Belongs to User (lecturer), Belongs to TimeSlot

* **Notification:**
  - `id` (INTEGER, Primary Key, Auto-increment)
  - `eventName` (STRING, Required) - Name of the event (e.g., 'AppointmentCreated')
  - `entityId` (INTEGER, Required) - ID of the related entity (e.g., appointment ID)
  - `eventTimestamp` (DATE, Required) - When the event occurred
  - `payload` (JSONB, Required) - Full event payload including metadata
  - `createdAt`, `updatedAt` (TIMESTAMP) - Sequelize timestamps

## 6. Integrations & External Services

* **RabbitMQ Message Broker:**
  - Used for asynchronous event publishing and processing
  - Exchange: `appointment.events` (fanout type, durable)
  - Queue: `notification-service` (durable)
  - Publishes `AppointmentCreated` events
  - Consumer service processes events and ingests notifications

* **PostgreSQL Database:**
  - Primary relational data store
  - Managed via Sequelize ORM with auto-migration (`sync({ alter: true })`)


