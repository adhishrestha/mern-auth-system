import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

import Button from '@/components/ui/Button';
import PasswordInput from '@/features/auth/components/PasswordInput';

import api from '@/lib/axios';
import { useAuth } from '@/features/auth/context/AuthContext';
import { getApiErrorMessage } from '@/lib/apiError';

const DeleteAccountForm = () => {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuth();

  const [isConfirming, setIsConfirming] = useState(false);
  const [reauthMethod, setReauthMethod] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [isReauthenticating, setIsReauthenticating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const authProviders = user?.authProviders || [];

  const hasPasswordAuth = authProviders.includes('local');
  const hasGoogleAuth = authProviders.includes('google');

  const handleStartConfirmation = () => {
    setIsConfirming(true);
    setError('');
  };

  const handleCancel = () => {
    setIsConfirming(false);
    setReauthMethod(null);
    setCurrentPassword('');
    setError('');
  };

  const handlePasswordReauthentication = async () => {
    if (!currentPassword.trim()) {
      setError('Current password is required.');
      return;
    }

    setError('');
    setIsReauthenticating(true);

    try {
      const response = await api.post('/auth/reauthenticate', {
        method: 'password',
        password: currentPassword,
      });

      const reauthToken = response.data.data.reauthToken;

      await deleteAccount(reauthToken);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsReauthenticating(false);
    }
  };

  const handleGoogleReauthentication = async (credentialResponse) => {
    setError('');
    setIsReauthenticating(true);

    try {
      const response = await api.post('/auth/reauthenticate', {
        method: 'google',
        idToken: credentialResponse.credential,
      });

      const reauthToken = response.data.data.reauthToken;

      await deleteAccount(reauthToken);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setIsReauthenticating(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google re-authentication was unsuccessful. Please try again.');
  };

  const deleteAccount = async (reauthToken) => {
    setIsDeleting(true);
    setError('');

    try {
      await api.delete('/auth/delete-account', {
        headers: {
          'X-Reauthentication-Token': reauthToken,
        },
        data: {},
      });

      clearAuth();

      navigate('/login', {
        replace: true,
      });
    } catch (error) {
      setError(getApiErrorMessage(error));
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
          onClick={handleStartConfirmation}
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

      {!reauthMethod && (
        <div className="mt-5 space-y-4">
          <p className="text-sm font-medium text-slate-700">
            To continue, verify your identity:
          </p>

          <div className="flex flex-wrap gap-3">
            {hasPasswordAuth && (
              <Button
                type="button"
                variant="outlineDark"
                size="md"
                onClick={() => {
                  setReauthMethod('password');
                  setError('');
                }}
              >
                Use Password
              </Button>
            )}

            {hasGoogleAuth && (
              <Button
                type="button"
                variant="outlineDark"
                size="md"
                onClick={() => {
                  setReauthMethod('google');
                  setError('');
                }}
              >
                Use Google
              </Button>
            )}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      )}

      {reauthMethod === 'password' && (
        <div className="mt-5 space-y-4">
          <PasswordInput
            id="deleteAccountPassword"
            label="Current Password"
            placeholder="Enter your current password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(event) => {
              setCurrentPassword(event.target.value);
              setError('');
            }}
            error={error}
          />

          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="outlineDark"
              size="md"
              onClick={() => {
                setReauthMethod(null);
                setCurrentPassword('');
                setError('');
              }}
              disabled={isReauthenticating || isDeleting}
            >
              Back
            </Button>

            <Button
              type="button"
              variant="dark"
              size="md"
              disabled={!currentPassword.trim()}
              loading={isReauthenticating || isDeleting}
              onClick={handlePasswordReauthentication}
            >
              {isDeleting ? 'Deleting Account...' : 'Verify & Delete'}
            </Button>
          </div>
        </div>
      )}

      {reauthMethod === 'google' && (
        <div className="mt-5 space-y-4">
          <p className="text-sm leading-6 text-slate-600">
            Continue with Google to verify your identity before permanently
            deleting your account.
          </p>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="outlineDark"
              size="md"
              onClick={() => {
                setReauthMethod(null);
                setError('');
              }}
              disabled={isReauthenticating || isDeleting}
            >
              Back
            </Button>

            {!isDeleting && (
              <GoogleLogin
                onSuccess={handleGoogleReauthentication}
                onError={handleGoogleError}
                useOneTap={false}
              />
            )}

            {isDeleting && (
              <Button type="button" variant="dark" size="md" loading disabled>
                Deleting Account...
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccountForm;
