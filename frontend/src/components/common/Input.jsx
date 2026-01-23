import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  type = 'text',
  error,
  helperText,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`
          w-full bg-light-secondary dark:bg-dark-secondary text-text-primary-light dark:text-text-primary placeholder-text-muted-light dark:placeholder-text-muted
          py-3.5 px-4 rounded-xl border border-border-subtle-light/50 dark:border-border-subtle/50
          transition-all duration-200 ease-out
          focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20
          ${error ? 'border-danger focus:border-danger focus:ring-danger/20' : ''}
          ${className}
        `}
        {...props}
      />
      {(error || helperText) && (
        <p className={`mt-2 text-sm ${error ? 'text-danger' : 'text-text-muted-light dark:text-text-muted'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
