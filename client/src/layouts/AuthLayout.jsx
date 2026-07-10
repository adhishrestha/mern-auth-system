import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '@/components/common/Logo';

const AuthLayout = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-10 pt-4">
        <Logo />
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
