import React from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <h1 className="text-3xl font-bold text-slate-900">
        Welcome, {user?.fullName}
      </h1>

      <p className="mt-3 text-slate-600">You are successfully authenticated.</p>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Account Information
        </h2>

        <div className="mt-4 space-y-2 text-sm text-slate-600">
          <p>
            <span className="font-medium text-slate-900">Name:</span>{' '}
            {user?.fullName}
          </p>

          <p>
            <span className="font-medium text-slate-900">Email:</span>{' '}
            {user?.email}
          </p>

          <p>
            <span className="font-medium text-slate-900">Email verified:</span>{' '}
            {user?.isEmailVerified ? 'Yes' : 'No'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
