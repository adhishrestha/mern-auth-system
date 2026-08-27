import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/features/home/HomePage';
import LoginPage from '@/features/auth/pages/LoginPage';
import NotFoundPage from '@/pages/Errors/NotFoundPage';
import RegisterPage from '@/features/auth/pages/RegisterPage';
import ForgotPasswordPage from '@/features/auth/pages/ForgotPasswordPage';
import VerifyEmailPage from '@/features/auth/pages/VerifyEmailPage';
import ResetPasswordPage from '@/features/auth/pages/ResetPasswordPage';
import CheckEmailPage from '@/features/auth/pages/CheckEmailPage';
import ProtectedRoute from './ProtectedRoute';
import DashboardPage from '@/features/dashboard/pages/DashboardPage';
import ProfilePage from '@/features/account/pages/ProfilePage';
import AccountSettingsPage from '@/features/account/pages/AccountSettingsPage';

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

          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="check-email" element={<CheckEmailPage />} />

          <Route path="reset-password/" element={<ResetPasswordPage />} />

          {/* After registration */}
          <Route path="verify-email" element={<VerifyEmailPage />} />
        </Route>

        {/* Protected */}
        <Route element={<MainLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<AccountSettingsPage />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
