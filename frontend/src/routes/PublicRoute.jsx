import { Navigate } from 'react-router-dom';
import { useAuth } from '../context';
import LoadingSpinner from '../components/common/LoadingSpinner';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isAuthenticated && user) {
    const redirectPath = user.role === 'lecturer' ? '/lecturer/dashboard' : '/student/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default PublicRoute;
