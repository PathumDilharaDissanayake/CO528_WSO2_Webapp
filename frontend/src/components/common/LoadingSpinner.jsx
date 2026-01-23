const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-3 border-light-card dark:border-dark-card border-t-primary-accent rounded-full animate-spin`}
        style={{ borderWidth: '3px' }}
      />
    </div>
  );
};

export default LoadingSpinner;
