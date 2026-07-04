import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const Button = ({
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
    primary: 'bg-[#826F66] text-white hover:opacity-90 focus:ring-[#826F66]',

    dark: 'bg-[#3A3845] text-white hover:opacity-80 focus:ring-[#3A3845]',

    outlineDark:
      'border border-[#3A3845] text-[#3A3845] hover:bg-[#3A3845] hover:text-white focus:ring-[#3A3845]',

    outlineLight:
      'border border-[#F7F6F5] text-[#F7F6F5] hover:bg-[#F7F6F5] hover:text-[#3A3845] focus:ring-[#F7F6F5]',

    lightPrimary:
      'bg-white text-[#826F66] hover:bg-gray-100 focus:ring-[#826F66]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs leading-[18px] tracking-[0.08em]',

    md: 'px-5 py-3 text-sm leading-[20px] tracking-[0.04em]',

    lg: 'px-6 py-3.5 text-sm leading-[20px] tracking-[0.08em]',

    hero: 'min-w-56 h-12.5 px-6 text-sm font-semibold',
  };

  return (
    <button
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
    </button>
  );
};

export default Button;
