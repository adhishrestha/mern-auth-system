import { Link } from 'react-router-dom';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PasswordInput from './PasswordInput';

const RegisterForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Full Name */}
      <Input
        id="fullName"
        name="fullName"
        label="Full Name"
        placeholder="John Doe"
        autoComplete="name"
        required
      />

      {/* Email */}
      <Input
        type="email"
        id="email"
        name="email"
        label="Email"
        placeholder="adhi@example.com"
        autoComplete="email"
        required
      />

      {/* Password */}
      <PasswordInput
        id="password"
        name="password"
        label="Password"
        autoComplete="new-password"
        required
      />

      {/* Confirm Password */}
      <PasswordInput
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        autoComplete="new-password"
        required
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
      <Button type="submit" className="w-full" variant="dark">
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;
