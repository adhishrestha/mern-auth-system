import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/Home/HomePage';
import LoginPage from '@/pages/Auth/LoginPage';
import NotFoundPage from '@/pages/Errors/NotFoundPage';
import RegisterPage from '@/pages/Auth/RegisterPage';
import React from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import ForgetPasswordPage from '@/pages/Auth/ForgetPasswordPage';
import VerifyEmailPage from '@/pages/Auth/VerifyEmailPage';
import ResendVerificationPage from '@/pages/Auth/ResendVerificationPage';
import ResetPasswordPage from '@/pages/Auth/ResetPasswordPage';

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
          <Route path="forget-password" element={<ForgetPasswordPage />} />
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
