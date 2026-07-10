import AuthCard from '../components/AuthCard';
import AuthHeader from '../components/AuthHeader';
import ResetPasswordForm from '../components/ResetPasswordForm';

const ResetPasswordPage = () => {
  return (
    <AuthCard>
      <AuthHeader
        title="Reset Password"
        description="Create a new password for your account."
      />

      <ResetPasswordForm />
    </AuthCard>
  );
};

export default ResetPasswordPage;
