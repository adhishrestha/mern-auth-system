import { cn } from '@/lib/utils';

const variants = {
  underline:
    'border-b border-[#3A3845] bg-transparent px-1 py-3.5 focus:border-black',

  outlined:
    'border border-[#3A3845] bg-white px-4 py-3.5 focus:border-black focus:ring-1 focus:ring-black',
};

const Input = ({
  type = 'text',
  name,
  id,
  label,
  labelHidden = false,
  placeholder,
  value,
  onChange,
  variant = 'outlined',
  className = '',
  leftElement,
  rightElement,
  error,
  helperText,
  ...props
}) => {
  const inputId = id || name;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            'mb-2 block text-sm font-semibold tracking-wide text-slate-700',
            labelHidden && 'sr-only',
          )}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leftElement && (
          <div className="absolute inset-y-0 left-4 flex items-center">
            {leftElement}
          </div>
        )}

        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={cn(
            'w-full rounded-md transition outline-none',
            variants[variant],
            leftElement && 'pl-11',
            rightElement && 'pr-11',
            error && 'border-red-500 focus:border-red-500',
            className,
          )}
          {...props}
        />

        {rightElement && (
          <div className="absolute inset-y-0 right-4 flex items-center">
            {rightElement}
          </div>
        )}
      </div>

      {helperText && !error && (
        <p className="mt-2 text-sm text-slate-500">{helperText}</p>
      )}

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
