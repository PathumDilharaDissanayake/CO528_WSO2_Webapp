import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context';
import { Card, Input, Button } from '../../components';
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineCalendarDays } from 'react-icons/hi2';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await login(formData);
    } catch (error) {
      // Error is handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center px-4 py-12 transition-colors duration-300">
      <div className="w-full max-w-md animate-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary-accent flex items-center justify-center mx-auto mb-4">
            <HiOutlineCalendarDays className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary">Welcome Back</h1>
          <p className="text-text-secondary-light dark:text-text-secondary mt-2">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <Card glass className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
            </div>

            <div className="relative">
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              className="mt-6"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-secondary-light dark:text-text-secondary">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-primary-accent hover:text-primary-accent-hover font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </Card>

        {/* Demo credentials */}
        <div className="mt-6 text-center">
          <p className="text-xs text-text-muted-light dark:text-text-muted">
            Demo: Use registered credentials to sign in
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
