import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/features/home/HomePage';
import LoginPage from '@/features/auth/pages/LoginPage';
import NotFoundPage from '@/pages/Errors/NotFoundPage';
import RegisterPage from '@/features/auth/pages/RegisterPage';
import ForgetPasswordPage from '@/features/auth/pages/ForgotPasswordPage';
import VerifyEmailPage from '@/features/auth/pages/VerifyEmailPage';
import ResendVerificationPage from '@/features/auth/pages/ResendVerificationPage';
import ResetPasswordPage from '@/features/auth/pages/ResetPasswordPage';
import CheckEmailPage from '@/features/auth/pages/CheckEmailPage';

const AppRouter = () => {
  return (
    <>
      <Routes>
        {/* Public */}
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgetPasswordPage />} />
          <Route path="check-email" element={<CheckEmailPage />} />
          <Route path="reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="verify-email" element={<VerifyEmailPage />} />
          <Route
            path="resend-verification"
            element={<ResendVerificationPage />}
          />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
