import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { Avatar, Button } from '../common';
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiOutlineArrowRightOnRectangle,
} from 'react-icons/hi2';

const Navbar = () => {
  const { user, isStudent, isLecturer, logout } = useAuth();
  const navigate = useNavigate();

  const studentLinks = [
    { to: '/student/dashboard', label: 'Dashboard', icon: HiOutlineHome },
    { to: '/student/lecturers', label: 'Lecturers', icon: HiOutlineUserGroup },
    { to: '/student/appointments', label: 'My Appointments', icon: HiOutlineCalendarDays },
  ];

  const lecturerLinks = [
    { to: '/lecturer/dashboard', label: 'Dashboard', icon: HiOutlineHome },
    { to: '/lecturer/time-slots', label: 'Time Slots', icon: HiOutlineClock },
    { to: '/lecturer/appointments', label: 'Appointments', icon: HiOutlineCalendarDays },
  ];

  const links = isStudent ? studentLinks : lecturerLinks;

  return (
    <nav className="bg-dark-secondary/95 backdrop-blur-md border-b border-border-subtle/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate(isLecturer ? '/lecturer/dashboard' : '/student/dashboard')}
          >
            <div className="w-9 h-9 rounded-xl bg-primary-accent flex items-center justify-center">
              <HiOutlineCalendarDays className="w-5 h-5 text-white" />
            </div>
            <span className="hidden sm:block text-lg font-semibold text-text-primary">
              AppointBook
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-accent/10 text-primary-accent'
                      : 'text-text-secondary hover:text-text-primary hover:bg-dark-card'
                  }`
                }
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <Avatar name={user?.name} size="sm" />
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">{user?.name}</p>
                <p className="text-xs text-text-muted capitalize">{user?.role}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="!p-2"
            >
              <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4 flex gap-1 overflow-x-auto scrollbar-none">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-accent/10 text-primary-accent'
                    : 'text-text-secondary hover:text-text-primary hover:bg-dark-card'
                }`
              }
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
