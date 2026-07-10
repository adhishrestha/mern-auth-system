import React from 'react';
import AuthCard from '../components/AuthCard';
import AuthHeader from '../components/AuthHeader';
import AuthFooter from '../components/AuthFooter';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  return (
    <AuthCard>
      <AuthHeader
        title=" Create Account"
        description=" Join to get started with your account."
      />
      {/* Register form */}
      <RegisterForm />
      <AuthFooter
        text="Already have an account?"
        linkText="Sign In"
        to="/login"
      />
    </AuthCard>
  );
};

export default RegisterPage;
