import React from 'react';
import { cn } from '@/lib/utils';

const Container = ({ children, className = '' }) => {
  return (
    <div
      className={cn(
        '2xl:px-41. mx-auto w-full max-w-360 px-4 sm:px-8 md:px-12 lg:px-20',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Container;
