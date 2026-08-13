import React from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">My Profile</h1>

        <div className="mt-6 space-y-3">
          <p>
            <span className="font-medium">Name:</span> {user?.fullName}
          </p>

          <p>
            <span className="font-medium">Email:</span> {user?.email}
          </p>

          <p>
            <span className="font-medium">Email Verified:</span>{' '}
            {user?.isEmailVerified ? 'Yes' : 'No'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
