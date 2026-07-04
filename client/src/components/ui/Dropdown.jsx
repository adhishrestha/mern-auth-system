import React, { useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { cn } from '@/lib/utils';

const Dropdown = ({ open, setOpen, trigger, children, className }) => {
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setOpen(false));
  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger */}
      <div onClick={() => setOpen((p) => !p)}>{trigger}</div>

      {/* Menu */}
      <div
        className={cn(
          'border-primary/15 absolute top-12 right-0 rounded-xl border bg-white shadow-xl transition-all duration-300',
          open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
