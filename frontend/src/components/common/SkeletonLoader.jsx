const SkeletonLoader = ({ variant = 'card', count = 1 }) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <div className="bg-light-card dark:bg-dark-card rounded-2xl border border-border-subtle-light/30 dark:border-border-subtle/30 p-6 animate-pulse">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-light-secondary dark:bg-dark-secondary rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-light-secondary dark:bg-dark-secondary rounded w-3/4 mb-2" />
                <div className="h-3 bg-light-secondary dark:bg-dark-secondary rounded w-1/2" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-3 bg-light-secondary dark:bg-dark-secondary rounded w-full" />
              <div className="h-3 bg-light-secondary dark:bg-dark-secondary rounded w-2/3" />
            </div>
          </div>
        );

      case 'list':
        return (
          <div className="flex items-center gap-4 p-4 animate-pulse">
            <div className="w-10 h-10 bg-light-secondary dark:bg-dark-secondary rounded-full" />
            <div className="flex-1">
              <div className="h-4 bg-light-secondary dark:bg-dark-secondary rounded w-1/2 mb-2" />
              <div className="h-3 bg-light-secondary dark:bg-dark-secondary rounded w-1/3" />
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-light-secondary dark:bg-dark-secondary rounded w-full" />
            <div className="h-4 bg-light-secondary dark:bg-dark-secondary rounded w-5/6" />
            <div className="h-4 bg-light-secondary dark:bg-dark-secondary rounded w-4/6" />
          </div>
        );

      case 'slot':
        return (
          <div className="bg-light-card dark:bg-dark-card rounded-xl border border-border-subtle-light/30 dark:border-border-subtle/30 p-4 animate-pulse">
            <div className="h-4 bg-light-secondary dark:bg-dark-secondary rounded w-2/3 mb-2" />
            <div className="h-3 bg-light-secondary dark:bg-dark-secondary rounded w-1/2" />
          </div>
        );

      default:
        return (
          <div className="h-16 bg-light-secondary dark:bg-dark-secondary rounded-xl animate-pulse" />
        );
    }
  };

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
