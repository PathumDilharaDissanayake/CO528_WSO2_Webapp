const Card = ({
  children,
  className = '',
  hover = false,
  glass = false,
  padding = 'md',
  onClick,
  ...props
}) => {
  const baseClasses = 'rounded-2xl border transition-all duration-300';

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const variantClasses = glass
    ? 'bg-dark-card/80 backdrop-blur-md border-border-subtle/50'
    : 'bg-dark-card border-border-subtle/30 shadow-card';

  const hoverClasses = hover
    ? 'cursor-pointer hover:border-primary-accent/50 hover:shadow-soft hover:-translate-y-0.5'
    : '';

  return (
    <div
      className={`${baseClasses} ${variantClasses} ${hoverClasses} ${paddingClasses[padding]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
