const PageContainer = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-light-bg dark:bg-dark-bg px-4 py-6 sm:px-6 lg:px-8 transition-colors duration-300 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
