import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  admin?: boolean; // Optional prop to check for admin role
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, admin = false }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If admin prop is true, check for admin role
  // if (admin && user.role !== 'admin') {
  //   return <Navigate to="/" replace />;
  // }

  return <>{children}</>;
};
