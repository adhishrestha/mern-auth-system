import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@/components/ui/Button';
import PasswordInput from './PasswordInput';

import api from '@/lib/axios';
import { getApiErrorMessage } from '@/lib/apiError';
import { resetPasswordSchema } from '../schemas/auth.schema';

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data) => {
    if (!token) {
      setError('root', {
        message: 'Invalid or missing password reset link.',
      });
      return;
    }

    try {
      await api.post(
        '/auth/reset-password',
        {
          password: data.password,
        },
        {
          params: {
            token,
          },
        },
      );

      navigate('/login');
    } catch (error) {
      setError('root', {
        message: getApiErrorMessage(error),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {errors.root?.message && (
        <p className="text-sm text-red-600" role="alert">
          {errors.root.message}
        </p>
      )}

      <PasswordInput
        id="password"
        name="password"
        label="New Password"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register('password')}
      />

      <PasswordInput
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <Button
        type="submit"
        variant="dark"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;