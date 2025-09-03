import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Lock, Phone } from 'lucide-react';
import { AuthMethodSelector } from './AuthMethodSelector';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'email' | 'phone'>('email');
  const { login, loginWithPhone, authConfig, authConfigLoading } = useAuth();

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
      if (selectedMethod === 'email') {
        await login(email, password);
      } else {
        await loginWithPhone(phone, password);
      }
      // Navigation is handled in AuthContext
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while auth config is loading
  if (authConfigLoading || !authConfig) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading auth config...</span>
        </CardContent>
      </Card>
    );
  }




  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{authConfig.ui.signInButtonText}</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
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
            <AuthMethodSelector
              availableMethods={authConfig.availableMethods}
              selectedMethod={selectedMethod}
              onMethodChange={setSelectedMethod}
            />
          )}

          {/* Email Input */}
          {authConfig.ui.showEmailOption && selectedMethod === 'email' && (
            <div className="space-y-2">
              <Label htmlFor="email">{authConfig.ui.emailLabel}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          {/* Phone Input */}
          {authConfig.ui.showPhoneOption && selectedMethod === 'phone' && (
            <div className="space-y-2">
              <Label htmlFor="phone">{authConfig.ui.phoneLabel}</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{authConfig.ui.passwordLabel}</Label>
              {authConfig.features.passwordReset && (
                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  {authConfig.ui.forgotPasswordText}
                </Link>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="pl-10"
                required
                disabled={isLoading}
                minLength={authConfig.settings.passwordMinLength}
                maxLength={authConfig.settings.passwordMaxLength}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              authConfig.ui.signInButtonText
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {authConfig.ui.noAccountText}{' '}
            <Link
              to="/auth/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
