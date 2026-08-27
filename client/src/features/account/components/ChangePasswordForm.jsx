import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@/components/ui/Button';
import PasswordInput from '@/features/auth/components/PasswordInput';

import { changePasswordSchema } from '@/features/auth/schemas/auth.schema';
import api from '@/lib/axios';
import { getApiErrorMessage } from '@/lib/apiError';

const ChangePasswordForm = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [apiError, setApiError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data) => {
    setSuccessMessage('');
    setApiError('');

    try {
      const { currentPassword, newPassword } = data;

      const response = await api.patch('/auth/change-password', {
        currentPassword,
        newPassword,
      });

      setSuccessMessage(
        response.data.message || 'Password changed successfully.',
      );

      reset();
    } catch (error) {
      setApiError(getApiErrorMessage(error));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 space-y-5"
      noValidate
    >
      <PasswordInput
        id="currentPassword"
        label="Current Password"
        placeholder="Enter your current password"
        autoComplete="current-password"
        error={errors.currentPassword?.message}
        {...register('currentPassword')}
      />

      <PasswordInput
        id="newPassword"
        label="New Password"
        placeholder="Enter your new password"
        autoComplete="new-password"
        error={errors.newPassword?.message}
        {...register('newPassword')}
      />

      <PasswordInput
        id="confirmPassword"
        label="Confirm New Password"
        placeholder="Confirm your new password"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      {successMessage && (
        <p className="text-sm text-green-600">{successMessage}</p>
      )}

      {apiError && <p className="text-sm text-red-600">{apiError}</p>}

      <Button
        type="submit"
        variant="dark"
        size="lg"
        fullWidth
        loading={isSubmitting}
      >
        {isSubmitting ? 'Changing Password...' : 'Change Password'}
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
