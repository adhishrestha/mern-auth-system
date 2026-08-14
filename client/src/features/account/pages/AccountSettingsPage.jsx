import React from 'react';
import { Link } from 'react-router-dom';
import ChangePasswordForm from '../components/ChangePasswordForm';
import Button from '@/components/ui/Button';

const AccountSettingsPage = () => {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Account Settings
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Manage your account information and security settings.
          </p>
        </div>

        {/* Profile Settings */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Profile</h2>

            <p className="mt-1 text-sm text-slate-600">
              Update your personal information.
            </p>
          </div>

          <Button
            as={Link}
            to="/profile"
            variant="dark"
            size="md"
            className="mt-8"
          >
            Edit Profile
          </Button>
        </div>

        {/* Password & Security */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Password & Security
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Change your password to keep your account secure.
            </p>
          </div>

          <div className="mt-6">
            <ChangePasswordForm />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-xl border border-red-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-red-700">Danger Zone</h2>

            <p className="mt-1 text-sm text-slate-600">
              Permanently delete your account and all associated data.
            </p>
          </div>

          <div className="mt-5">
            <button
              type="button"
              disabled
              className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-400"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountSettingsPage;
