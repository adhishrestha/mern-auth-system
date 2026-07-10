import React from 'react';
import AuthCard from '../components/AuthCard';
import AuthHeader from '../components/AuthHeader';
import AuthFooter from '../components/AuthFooter';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  return (
    <AuthCard>
      <AuthHeader
        title="Forgot Password"
        description="Enter your email address and we'll send you a password reset link."
      />
      <ForgotPasswordForm />
      <AuthFooter text="" linkText="" to="" />
    </AuthCard>
  );
};

export default ForgotPasswordPage;
