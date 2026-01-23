const PageContainer = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-dark-bg px-4 py-6 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
