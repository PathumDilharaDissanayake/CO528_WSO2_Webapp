import { Link } from 'react-router-dom';
import { Button, Card } from '../components';
import { HiOutlineExclamationTriangle, HiOutlineHome } from 'react-icons/hi2';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center px-4 transition-colors duration-300">
      <Card glass className="max-w-md w-full text-center p-8">
        <div className="w-20 h-20 rounded-2xl bg-warning/20 flex items-center justify-center mx-auto mb-6">
          <HiOutlineExclamationTriangle className="w-10 h-10 text-warning" />
        </div>
        <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary mb-2">404</h1>
        <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary mb-4">Page Not Found</h2>
        <p className="text-text-secondary-light dark:text-text-secondary mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button variant="primary" fullWidth>
            <HiOutlineHome className="w-4 h-4" />
            Go to Home
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default NotFound;
