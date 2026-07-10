import React from 'react';
import AuthCard from '../components/AuthCard';
import AuthHeader from '../components/AuthHeader';
import LoginForm from '../components/LoginForm';
import AuthFooter from '../components/AuthFooter';

const LoginPage = () => {
  return (
    <AuthCard>
      <AuthHeader
        title="Welcome Back"
        description="Sign in to your account to continue."
      />

      {/* Login form  */}
      <LoginForm />

      <AuthFooter
        text="Don't have an account?"
        linkText=" Create one"
        to="/register"
      />
    </AuthCard>
  );
};

export default LoginPage;
