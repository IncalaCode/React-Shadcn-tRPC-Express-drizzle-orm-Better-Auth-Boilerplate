import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Lock, User, Phone } from 'lucide-react';
import { AuthMethodSelector } from './AuthMethodSelector';

export function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    name: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'email' | 'phone'>('email');
  const { register, authConfig, authConfigLoading } = useAuth();

  useEffect(() => {
    if (authConfig && !authConfigLoading) {
      setSelectedMethod(authConfig.settings.defaultMethod);
    }
  }, [authConfig, authConfigLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < (authConfig?.settings.passwordMinLength || 8)) {
      setError(`Password must be at least ${authConfig?.settings.passwordMinLength || 8} characters long`);
      return;
    }

    // Generate name field for Better Auth
    const name = formData.name || 
      (formData.firstName && formData.lastName 
        ? `${formData.firstName} ${formData.lastName}`.trim()
        : formData.email.split('@')[0]);

    if (!name) {
      setError('Please provide a name');
      return;
    }

    setIsLoading(true);

    try {
      const registerData: any = {
        password: formData.password,
        name,
        firstName: formData.firstName || undefined,
        lastName: formData.lastName || undefined,
      };

      // Add email or phone based on selected method
      if (selectedMethod === 'email') {
        registerData.email = formData.email;
      } else {
        registerData.phoneNumber = formData.phone;
      }

      await register(registerData);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
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
        <CardTitle>{authConfig.ui.signUpButtonText}</CardTitle>
        <CardDescription>
          Sign up for a new account and join us today
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
              <Label htmlFor="email">{authConfig.ui.emailLabel} *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={authConfig.availableMethods.find(m => m.type === 'email')?.placeholder || "Enter your email"}
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
              <Label htmlFor="phone">{authConfig.ui.phoneLabel} *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={authConfig.availableMethods.find(m => m.type === 'phone')?.placeholder || "Enter your phone number"}
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">{authConfig.ui.nameLabel}</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{authConfig.ui.passwordLabel} *</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={`Create a password (min ${authConfig.settings.passwordMinLength} characters)`}
                className="pl-10"
                required
                disabled={isLoading}
                minLength={authConfig.settings.passwordMinLength}
                maxLength={authConfig.settings.passwordMaxLength}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{authConfig.ui.confirmPasswordLabel} *</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="pl-10"
                required
                disabled={isLoading}
                minLength={authConfig.settings.passwordMinLength}
                maxLength={authConfig.settings.passwordMaxLength}
              />
            </div>
          </div>

          <div className="text-xs text-gray-600 space-y-1">
            <p>Password requirements:</p>
            <ul className="list-disc list-inside space-y-0.5 ml-2">
              <li>At least {authConfig.settings.passwordMinLength} characters long</li>
              <li>Must be secure and unique</li>
            </ul>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              authConfig.ui.signUpButtonText
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {authConfig.ui.hasAccountText}{' '}
            <Link
              to="/auth/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
