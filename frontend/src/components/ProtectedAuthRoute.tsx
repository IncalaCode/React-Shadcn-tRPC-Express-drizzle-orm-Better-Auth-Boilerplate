import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProtectedAuthRouteProps {
  children: React.ReactNode;
  requiredAccess: 'login' | 'register' | 'forgotPassword' | 'resetPassword';
  fallbackPath?: string;
}

export const ProtectedAuthRoute: React.FC<ProtectedAuthRouteProps> = ({
  children,
  requiredAccess,
}) => {
  const { authConfig, authConfigLoading } = useAuth();

  // Show loading state while auth config is loading
  if (authConfigLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-2">Loading...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if the required access is allowed
  const isAccessAllowed = authConfig?.pages?.[`allow${requiredAccess.charAt(0).toUpperCase() + requiredAccess.slice(1)}` as keyof typeof authConfig.pages] ?? true;

  if (!isAccessAllowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Access Restricted
                </h2>
                <p className="text-gray-600 mt-2">
                  This authentication page is currently disabled by the administrator.
                </p>
              </div>

              <Alert variant="destructive">
                <AlertDescription>
                  The {requiredAccess} page is not accessible at this time. 
                  Please contact your administrator if you believe this is an error.
                </AlertDescription>
              </Alert>

              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
                className="w-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};
