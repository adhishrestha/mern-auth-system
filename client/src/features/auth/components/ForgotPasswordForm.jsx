import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import { forgotPasswordSchema } from '../schemas/auth.schema';
import api from '@/lib/axios';
import { getApiErrorMessage } from '@/lib/apiError';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email : '' },
  });

  const onSubmit = async (data) => {
    try {
      await api.post('/auth/forgot-password', data);
      navigate('/check-email');
    } catch (error) {
      setError('root.serverError', {
        type: 'server',
        message: getApiErrorMessage(error),
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Server/API Error */}
      {errors.root?.serverError?.message && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errors.root.serverError.message}
        </div>
      )}
      <Input
        id="email"
        name="email"
        type="email"
        label="Email Address"
        placeholder="adhi@example.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <Button
        type="submit"
        className="w-full"
        variant="dark"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Send Reset Link...' : 'Send Reset Link'}
      </Button>

      <Button
        as={Link}
        to="/login"
        icon={ArrowLeft}
        iconPosition="left"
        variant="ghost"
      >
        Back to Login
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
