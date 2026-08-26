import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PasswordInput from './PasswordInput';

import { registerSchema } from '../schemas/auth.schema.js';
import api from '@/lib/axios';
import { getApiErrorMessage } from '@/lib/apiError';

const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...registrationData } = data;

      await api.post('/auth/register', registrationData);

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

      {/* Full Name */}
      <Input
        id="fullName"
        label="Full Name"
        placeholder="John Doe"
        autoComplete="name"
        error={errors.fullName?.message}
        {...register('fullName')}
      />

      {/* Email */}
      <Input
        type="email"
        id="email"
        label="Email"
        placeholder="adhi@example.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />

      {/* Password */}
      <PasswordInput
        id="password"
        label="Password"
        placeholder="Create a password"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register('password')}
      />

      {/* Confirm Password */}
      <PasswordInput
        id="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      {/* Terms */}
      <label className="flex items-start gap-3 text-sm text-slate-600">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-slate-300 text-black focus:ring-black"
        />

        <span>
          I agree to the{' '}
          <Link to="/terms" className="font-medium text-black hover:underline">
            Terms &amp; Conditions
          </Link>
        </span>
      </label>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full"
        variant="dark"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegisterForm;