import { Link } from 'react-router-dom';

import Input from '@/components/ui/Input';
import PasswordInput from './PasswordInput';
import Button from '@/components/ui/Button';

const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
      <div className="space-y-5">
        <Input
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="adhi@example.com"
          autoComplete="email"
          required
        />

        <PasswordInput
          id="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          required
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            name="rememberMe"
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          Remember me
        </label>

        <Link
          to="/forgot-password"
          className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full" variant="dark" size="lg">
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
