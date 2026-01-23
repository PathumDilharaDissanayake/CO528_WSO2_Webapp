import { forwardRef } from 'react';
import { HiChevronDown } from 'react-icons/hi2';

const Select = forwardRef(({
  label,
  error,
  options = [],
  placeholder = 'Select an option',
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
      <div className="relative">
        <select
          ref={ref}
          className={`
            w-full bg-light-secondary dark:bg-dark-secondary text-text-primary-light dark:text-text-primary
            py-3.5 px-4 pr-10 rounded-xl border border-border-subtle-light/50 dark:border-border-subtle/50
            transition-all duration-200 ease-out appearance-none cursor-pointer
            focus:outline-none focus:border-primary-accent focus:ring-2 focus:ring-primary-accent/20
            ${error ? 'border-danger focus:border-danger focus:ring-danger/20' : ''}
            ${className}
          `}
          {...props}
        >
          <option value="" disabled className="text-text-muted-light dark:text-text-muted bg-light-secondary dark:bg-dark-secondary">
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-light-secondary dark:bg-dark-secondary text-text-primary-light dark:text-text-primary"
            >
              {option.label}
            </option>
          ))}
        </select>
        <HiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted-light dark:text-text-muted pointer-events-none" />
      </div>
      {error && (
        <p className="mt-2 text-sm text-danger">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
