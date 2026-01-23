# Lecturer Appointment Booking System - Frontend

A modern, production-ready React.js frontend for the Lecturer Appointment Booking System with an Apple iOS-inspired dark theme.

## Features

- 🔐 **Authentication**: Secure JWT-based login and registration
- 👨‍🎓 **Student Dashboard**: View appointments, browse lecturers, book time slots
- 👨‍🏫 **Lecturer Dashboard**: Manage time slots, approve/reject appointments
- 🎨 **Apple iOS Dark Theme**: Glassmorphism, smooth animations, modern UI
- 📱 **Fully Responsive**: Mobile-first design approach
- 🔔 **Toast Notifications**: Real-time feedback for all actions
- 🛡️ **Protected Routes**: Role-based access control

## Tech Stack

- **React 18** with Vite
- **React Router v6** for routing
- **Axios** for API calls with interceptors
- **Context API** for state management
- **Tailwind CSS** for styling
- **Day.js** for date handling
- **React Hot Toast** for notifications
- **React Icons** for iconography

## Project Structure

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── api/                    # API service layer
│   │   ├── axios.js            # Axios instance with interceptors
│   │   ├── authService.js      # Authentication API calls
│   │   ├── userService.js      # User API calls
│   │   ├── timeSlotService.js  # Time slot API calls
│   │   ├── appointmentService.js # Appointment API calls
│   │   └── index.js
│   ├── components/
│   │   ├── common/             # Reusable UI components
│   │   │   ├── Avatar.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── PageContainer.jsx
│   │   │   ├── PageHeader.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── SkeletonLoader.jsx
│   │   │   └── index.js
│   │   ├── layout/             # Layout components
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── index.js
│   │   ├── appointments/       # Appointment components
│   │   │   ├── AppointmentCard.jsx
│   │   │   ├── AppointmentList.jsx
│   │   │   └── index.js
│   │   ├── timeslots/          # Time slot components
│   │   │   ├── CreateTimeSlotModal.jsx
│   │   │   ├── TimeSlotCard.jsx
│   │   │   ├── TimeSlotList.jsx
│   │   │   └── index.js
│   │   ├── lecturers/          # Lecturer components
│   │   │   ├── LecturerCard.jsx
│   │   │   ├── LecturerList.jsx
│   │   │   └── index.js
│   │   └── index.js
│   ├── context/                # React Context
│   │   ├── AuthContext.jsx     # Authentication context
│   │   └── index.js
│   ├── pages/
│   │   ├── auth/               # Authentication pages
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── index.js
│   │   ├── student/            # Student pages
│   │   │   ├── BookAppointment.jsx
│   │   │   ├── LecturerListPage.jsx
│   │   │   ├── StudentAppointments.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   └── index.js
│   │   ├── lecturer/           # Lecturer pages
│   │   │   ├── LecturerAppointments.jsx
│   │   │   ├── LecturerDashboard.jsx
│   │   │   ├── TimeSlotManagement.jsx
│   │   │   └── index.js
│   │   ├── NotFound.jsx
│   │   └── index.js
│   ├── routes/                 # Route protection
│   │   ├── ProtectedRoute.jsx
│   │   ├── PublicRoute.jsx
│   │   └── index.js
│   ├── styles/
│   │   └── index.css           # Global styles with Tailwind
│   ├── App.jsx                 # Main app component with routes
│   └── main.jsx                # Entry point
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on `http://localhost:5000`

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The frontend expects the backend API to be running at `http://localhost:5000/api`. The Vite development server is configured to proxy `/api` requests to avoid CORS issues.

### API Endpoints Used

- **Auth**: `/auth/register`, `/auth/login`
- **Users**: `/users/lecturers`, `/users/me`
- **Time Slots**: `/timeslots`, `/timeslots/lecturer/:id`, `/timeslots/:id`
- **Appointments**: `/appointments`, `/appointments/student`, `/appointments/lecturer`, `/appointments/:id`

## Theme Customization

The theme colors are defined in `tailwind.config.js`:

```javascript
colors: {
  'dark-bg': '#0B0F19',           // Main background
  'dark-secondary': '#111827',     // Secondary background
  'dark-card': '#1F2937',          // Card background
  'primary-accent': '#2563EB',     // Primary blue accent
  'text-primary': '#FFFFFF',       // Primary text
  'text-secondary': '#9CA3AF',     // Secondary text
  'border-subtle': '#374151',      // Subtle borders
}
```

## Features by Role

### Student
- View dashboard with appointment statistics
- Browse available lecturers
- View lecturer's available time slots
- Book appointments
- View and cancel own appointments

### Lecturer
- View dashboard with appointment and slot statistics
- Create and delete time slots
- View all appointment requests
- Approve/reject pending appointments
- Mark appointments as completed

## Security

- JWT tokens stored in localStorage
- Axios interceptors automatically attach tokens
- Automatic logout on token expiration
- Role-based route protection
- Form validation on all inputs

## License

MIT
