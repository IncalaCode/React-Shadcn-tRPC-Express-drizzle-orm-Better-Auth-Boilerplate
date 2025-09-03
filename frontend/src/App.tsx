import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { TRPCProvider } from '@/providers/TRPCProvider';
import { AuthLayout } from '@/layouts/AuthLayout';
import { LoadingSpinner } from '@/components/LoadingSpinner';

// Pages
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';
import { ResetPasswordPage } from '@/pages/ResetPasswordPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AdminAccountPage } from '@/pages/admin/AdminAccountPage';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { ProtectedAuthRoute } from '@/components/ProtectedAuthRoute';

// App Routes Component
const AppRoutes: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      
      {/* Auth routes */}
      <Route
        path="/auth"
        element={
          user ? <Navigate to="/dashboard" replace /> : <AuthLayout />
        }
      >
        <Route 
          path="login" 
          element={
            <ProtectedAuthRoute requiredAccess="login">
              <LoginPage />
            </ProtectedAuthRoute>
          } 
        />
        <Route 
          path="register" 
          element={
            <ProtectedAuthRoute requiredAccess="register">
              <RegisterPage />
            </ProtectedAuthRoute>
          } 
        />
        <Route 
          path="forgot-password" 
          element={
            <ProtectedAuthRoute requiredAccess="forgotPassword">
              <ForgotPasswordPage />
            </ProtectedAuthRoute>
          } 
        />
      </Route>

      {/* Reset password route (public) */}
      <Route 
        path="/reset-password" 
        element={
          <ProtectedAuthRoute requiredAccess="resetPassword">
            <ResetPasswordPage />
          </ProtectedAuthRoute>
        } 
      />

      {/* Admin routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute admin={true}>
            <AdminLayout />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/account" 
        element={
          <ProtectedRoute admin={true}>
            <AdminAccountPage />
          </ProtectedRoute>
        } 
      />

      {/* 404 route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <TRPCProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </TRPCProvider>
  );
};

export default App;
