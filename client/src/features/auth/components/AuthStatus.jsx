import React from 'react';
import { cn } from '@/lib/utils';

const AuthStatus = ({
  icon: Icon,
  title,
  description,
  children,
  className,
}) => {
  return (
    <div className={cn('space-y-8 text-center', className)}>
      {/* Icon */}
      {Icon && (
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <Icon className="h-8 w-8 text-[#3A3845]" />
          </div>
        </div>
      )}

      {/* Content */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>

        {description && <p className="mt-3 text-slate-600">{description}</p>}
      </div>

      {/* Actions */}
      {children && <div className="space-y-4">{children}</div>}
    </div>
  );
};

export default AuthStatus;
