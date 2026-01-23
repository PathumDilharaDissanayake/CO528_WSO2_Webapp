import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from './routes';
import { Layout } from './components/layout';
import {
  Login,
  Register,
  StudentDashboard,
  LecturerListPage,
  BookAppointment,
  StudentAppointments,
  LecturerDashboard,
  TimeSlotManagement,
  LecturerAppointments,
  NotFound,
} from './pages';

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Student Routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="lecturers" element={<LecturerListPage />} />
        <Route path="book/:lecturerId" element={<BookAppointment />} />
        <Route path="appointments" element={<StudentAppointments />} />
      </Route>

      {/* Lecturer Routes */}
      <Route
        path="/lecturer"
        element={
          <ProtectedRoute allowedRoles={['lecturer']}>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<LecturerDashboard />} />
        <Route path="time-slots" element={<TimeSlotManagement />} />
        <Route path="appointments" element={<LecturerAppointments />} />
      </Route>

      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
