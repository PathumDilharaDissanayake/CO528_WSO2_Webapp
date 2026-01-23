import { useEffect } from 'react';
import { HiXMark } from 'react-icons/hi2';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 py-6">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in"
          onClick={onClose}
        />

        {/* Modal content */}
        <div
          className={`relative w-full ${sizeClasses[size]} bg-dark-card rounded-2xl border border-border-subtle/50 shadow-glass p-6 slide-in`}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between mb-6">
              {title && (
                <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-dark-secondary transition-all duration-200"
                >
                  <HiXMark className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
