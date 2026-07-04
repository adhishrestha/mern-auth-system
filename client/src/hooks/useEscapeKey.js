import React, { useEffect } from 'react';

const useEscapeKey = (callback) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        callback();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [callback]);
};

export default useEscapeKey;
