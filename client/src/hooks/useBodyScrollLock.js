import React, { useEffect } from 'react';

const useBodyScrollLock = (locked) => {
  // Lock body scroll when mobile menu opens
  useEffect(() => {
    document.body.style.overflow = locked ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [locked]);
};

export default useBodyScrollLock;
