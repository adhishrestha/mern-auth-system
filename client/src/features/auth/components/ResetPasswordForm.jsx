import Button from '@/components/ui/Button';
import PasswordInput from './PasswordInput';

const ResetPasswordForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <PasswordInput
        id="password"
        name="password"
        label="New Password"
        autoComplete="new-password"
        required
      />

      <PasswordInput
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        autoComplete="new-password"
        required
      />

      <Button type="submit" variant="dark" size="lg" className="w-full">
        Reset Password
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
