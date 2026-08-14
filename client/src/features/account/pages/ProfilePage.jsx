import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '@/features/auth/context/AuthContext';
import { updateProfileSchema } from '@/features/auth/schemas/auth.schema';
import api from '@/lib/axios';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName: user?.fullName || '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.patch('/auth/profile', data);

      const updatedUser = response.data.data;

      updateUser(updatedUser);

      console.log('Profile updated successfully:', updatedUser);
    } catch (error) {
      console.error(
        'Profile update failed:',
        error.response?.data || error.message,
      );
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">My Profile</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 space-y-5"
          noValidate
        >
          <Input
            id="fullName"
            label="Full Name"
            autoComplete="name"
            error={errors.fullName?.message}
            {...register('fullName')}
          />

          <div className="space-y-3 text-sm text-slate-600">
            <p>
              <span className="font-medium text-slate-900">Email:</span>{' '}
              {user?.email}
            </p>

            <p>
              <span className="font-medium text-slate-900">
                Email Verified:
              </span>{' '}
              {user?.isEmailVerified ? 'Yes' : 'No'}
            </p>
          </div>

          <Button
            type="submit"
            variant="dark"
            size="md"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ProfilePage;
