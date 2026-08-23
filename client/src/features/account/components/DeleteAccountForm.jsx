import { useState } from 'react';

import Button from '@/components/ui/Button';
import PasswordInput from '@/features/auth/components/PasswordInput';

import api from '@/lib/axios';
import { useAuth } from '@/features/auth/context/AuthContext';

const DeleteAccountForm = () => {
  const { logout } = useAuth();

  const [isConfirming, setIsConfirming] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleCancel = () => {
    setIsConfirming(false);
    setCurrentPassword('');
    setError('');
  };

  const handleDelete = async () => {
    if (!currentPassword.trim()) {
      setError('Current password is required.');
      return;
    }

    setError('');
    setIsDeleting(true);

    try {
      await api.delete('/auth/delete-account', {
        data: {
          currentPassword,
        },
      });

      await logout();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          'Unable to delete your account. Please try again.',
      );
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isConfirming) {
    return (
      <div className="mt-5">
        <Button
          type="button"
          variant="outlineDark"
          size="md"
          onClick={() => setIsConfirming(true)}
        >
          Delete Account
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-5">
      <h3 className="text-base font-semibold text-red-700">
        Delete your account?
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        This action is permanent and cannot be undone. All account data
        associated with your account will be deleted.
      </p>

      <div className="mt-5 space-y-4">
        <PasswordInput
          id="deleteAccountPassword"
          label="Current Password"
          placeholder="Enter your current password"
          autoComplete="current-password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          error={error}
        />

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outlineDark"
            size="md"
            onClick={handleCancel}
            disabled={isDeleting}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="dark"
            size="md"
            disabled={!currentPassword.trim()}
            loading={isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? 'Deleting Account...' : 'Delete Account'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountForm;
