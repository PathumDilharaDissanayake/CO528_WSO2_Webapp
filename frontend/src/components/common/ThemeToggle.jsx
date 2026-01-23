import { useTheme } from '../../context';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-14 h-8 rounded-full p-1 transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-primary-accent/50 focus:ring-offset-2
        dark:focus:ring-offset-dark-bg focus:ring-offset-light-bg
        ${isDark 
          ? 'bg-dark-card border border-border-subtle/50' 
          : 'bg-light-card border border-border-subtle-light'
        }
        ${className}
      `}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      role="switch"
      aria-checked={isDark}
    >
      {/* Toggle circle with icon */}
      <span
        className={`
          flex items-center justify-center w-6 h-6 rounded-full shadow-md
          transition-all duration-300 ease-out transform
          ${isDark 
            ? 'translate-x-6 bg-primary-accent' 
            : 'translate-x-0 bg-white'
          }
        `}
      >
        {isDark ? (
          <HiOutlineMoon className="w-3.5 h-3.5 text-white" />
        ) : (
          <HiOutlineSun className="w-3.5 h-3.5 text-warning" />
        )}
      </span>

      {/* Background icons */}
      <span className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <HiOutlineSun 
          className={`w-4 h-4 transition-opacity duration-300 ${
            isDark ? 'opacity-30 text-text-muted' : 'opacity-0'
          }`} 
        />
        <HiOutlineMoon 
          className={`w-4 h-4 transition-opacity duration-300 ${
            isDark ? 'opacity-0' : 'opacity-30 text-text-muted-light'
          }`} 
        />
      </span>
    </button>
  );
};

export default ThemeToggle;
