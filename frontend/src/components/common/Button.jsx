const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-primary-accent text-white hover:bg-primary-accent-hover hover:shadow-lg hover:shadow-primary-accent/25 active:scale-[0.98] focus:ring-2 focus:ring-primary-accent/50 focus:ring-offset-2 focus:ring-offset-dark-bg',
    secondary: 'bg-dark-card text-text-primary border border-border-subtle hover:bg-dark-secondary hover:border-text-muted active:scale-[0.98] focus:ring-2 focus:ring-border-subtle focus:ring-offset-2 focus:ring-offset-dark-bg',
    danger: 'bg-danger text-white hover:bg-red-600 hover:shadow-lg hover:shadow-danger/25 active:scale-[0.98] focus:ring-2 focus:ring-danger/50 focus:ring-offset-2 focus:ring-offset-dark-bg',
    success: 'bg-success text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-success/25 active:scale-[0.98] focus:ring-2 focus:ring-success/50 focus:ring-offset-2 focus:ring-offset-dark-bg',
    ghost: 'text-text-secondary hover:bg-dark-card hover:text-text-primary active:scale-[0.98] focus:ring-2 focus:ring-border-subtle focus:ring-offset-2 focus:ring-offset-dark-bg',
    warning: 'bg-warning text-white hover:bg-amber-600 hover:shadow-lg hover:shadow-warning/25 active:scale-[0.98] focus:ring-2 focus:ring-warning/50 focus:ring-offset-2 focus:ring-offset-dark-bg',
  };

  const sizeClasses = {
    sm: 'py-2 px-4 text-sm rounded-lg gap-1.5',
    md: 'py-3 px-6 text-base rounded-xl gap-2',
    lg: 'py-4 px-8 text-lg rounded-xl gap-2.5',
    icon: 'p-2.5 rounded-xl',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
