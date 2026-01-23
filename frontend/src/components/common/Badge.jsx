const Badge = ({ status, className = '' }) => {
  const statusConfig = {
    pending: {
      bg: 'bg-warning/20',
      text: 'text-warning',
      label: 'Pending',
    },
    approved: {
      bg: 'bg-success/20',
      text: 'text-success',
      label: 'Approved',
    },
    rejected: {
      bg: 'bg-danger/20',
      text: 'text-danger',
      label: 'Rejected',
    },
    cancelled: {
      bg: 'bg-text-muted/20',
      text: 'text-text-muted',
      label: 'Cancelled',
    },
    completed: {
      bg: 'bg-primary-accent/20',
      text: 'text-primary-accent',
      label: 'Completed',
    },
    available: {
      bg: 'bg-success/20',
      text: 'text-success',
      label: 'Available',
    },
    booked: {
      bg: 'bg-danger/20',
      text: 'text-danger',
      label: 'Booked',
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text} ${className}`}
    >
      {config.label}
    </span>
  );
};

export default Badge;
