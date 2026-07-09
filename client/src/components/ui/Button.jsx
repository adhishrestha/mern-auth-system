import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const Button = ({
  as: Component = 'button',
  children,
  variant = '',
  size = '',
  icon: Icon,
  iconPosition = 'right',
  loading = false,
  disabled = false,
  fullWidth = false,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold uppercase transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer rounded-md';

  const variants = {
    dark: 'bg-[#3A3845] text-white hover:opacity-80 focus:ring-[#3A3845]',

    outlineDark:
      'border border-[#3A3845] text-[#3A3845] hover:bg-[#3A3845] hover:text-white focus:ring-[#3A3845]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs leading-[18px] tracking-[0.08em]',

    md: 'px-5 py-3 text-sm leading-[20px] tracking-[0.04em]',

    lg: 'px-6 py-3.5 text-sm leading-[20px] tracking-[0.08em]',

  };

  return (
    <Component
      type={type}
      aria-disabled={disabled || loading}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <Icon className="h-4 w-4 shrink-0" />
          )}

          <span>{children}</span>

          {Icon && iconPosition === 'right' && (
            <Icon className="h-4 w-4 shrink-0" />
          )}
        </>
      )}
    </Component>
  );
};

export default Button;
