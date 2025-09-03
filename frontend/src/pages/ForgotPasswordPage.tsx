import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Phone, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { authAPI } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'email' | 'phone'>('email');
  const { authConfig, authConfigLoading } = useAuth();

  // Set default method based on auth config
  useEffect(() => {
    if (authConfig && !authConfigLoading) {
      setSelectedMethod(authConfig.settings.defaultMethod);
    }
  }, [authConfig, authConfigLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const identifier = selectedMethod === 'email' ? email : phone;
      const result = await authAPI.forgotPassword(identifier);
      
      if (result.success) {
        setIsSubmitted(true);
        const message = selectedMethod === 'email' 
          ? 'Check your email for the password reset link.'
          : 'Check your phone for the password reset code.';
        toast.success(`Password reset ${selectedMethod === 'email' ? 'email' : 'SMS'} sent!`, {
          description: message,
        });
      } else {
        setError(`Failed to send reset ${selectedMethod === 'email' ? 'email' : 'SMS'}. Please try again.`);
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
        <div className="w-full max-w-md">
          {/* Back to Home */}
          <div className="mb-6">
            <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-900">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Success Card */}
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Check your {selectedMethod === 'email' ? 'email' : 'phone'}
              </CardTitle>
              <CardDescription className="text-gray-600">
                We've sent a password reset {selectedMethod === 'email' ? 'link' : 'code'} to {selectedMethod === 'email' ? email : phone}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-6">
                Didn't receive the {selectedMethod === 'email' ? 'email' : 'SMS'}? {selectedMethod === 'email' ? 'Check your spam folder or' : ''} try again.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full"
                >
                  Try another {selectedMethod === 'email' ? 'email' : 'phone number'}
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/auth/login">
                    Back to login
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show loading state while auth config is loading
  if (authConfigLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Loading...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Don't render if no auth config
  if (!authConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="py-8">
            <Alert variant="destructive">
              <AlertDescription>
                Unable to load authentication configuration. Please try again.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-900">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Forgot Password Card */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Forgot your password?
            </CardTitle>
            <CardDescription className="text-gray-600">
              Enter your {selectedMethod === 'email' ? 'email address' : 'phone number'} and we'll send you a {selectedMethod === 'email' ? 'link' : 'code'} to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Method Selector */}
              {authConfig.ui.showMethodSelector && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    {authConfig.ui.methodSelectorLabel}
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {authConfig.availableMethods.map((method) => (
                      <Button
                        key={method.type}
                        type="button"
                        variant={selectedMethod === method.type ? "default" : "outline"}
                        onClick={() => setSelectedMethod(method.type)}
                        className="h-10"
                      >
                        {method.type === 'email' ? <Mail className="h-4 w-4 mr-2" /> : <Phone className="h-4 w-4 mr-2" />}
                        {method.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Email Field */}
              {authConfig.ui.showEmailOption && selectedMethod === 'email' && (
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    {authConfig.ui.emailLabel}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={authConfig.availableMethods.find(m => m.type === 'email')?.placeholder || "Enter your email"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              {/* Phone Field */}
              {authConfig.ui.showPhoneOption && selectedMethod === 'phone' && (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    {authConfig.ui.phoneLabel}
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={authConfig.availableMethods.find(m => m.type === 'phone')?.placeholder || "Enter your phone number"}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  `Send reset ${selectedMethod === 'email' ? 'link' : 'code'}`
                )}
              </Button>
            </form>

            {/* Links */}
            <div className="mt-6 text-center space-y-2">
              <div className="text-sm text-gray-600">
                Remember your password?{' '}
                <Link
                  to="/auth/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {authConfig.ui.signInButtonText}
                </Link>
              </div>
              <div className="text-sm text-gray-600">
                {authConfig.ui.noAccountText}{' '}
                <Link
                  to="/auth/register"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
