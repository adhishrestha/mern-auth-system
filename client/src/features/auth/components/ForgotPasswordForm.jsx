import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const ForgotPasswordForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <Input
        id="email"
        name="email"
        type="email"
        label="Email Address"
        placeholder="adhi@example.com"
        autoComplete="email"
        required
      />

      <Button type="submit" className="w-full" variant="dark" size="lg">
        Send Reset Link
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
