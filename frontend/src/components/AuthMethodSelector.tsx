import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';
import { AuthMethod } from '@/services/authConfig.service';

interface AuthMethodSelectorProps {
  availableMethods: AuthMethod[];
  selectedMethod: 'email' | 'phone';
  onMethodChange: (method: 'email' | 'phone') => void;
  className?: string;
}

export const AuthMethodSelector: React.FC<AuthMethodSelectorProps> = ({
  availableMethods,
  selectedMethod,
  onMethodChange,
  className = '',
}) => {
  if (availableMethods.length <= 1) {
    return null; // Don't show selector if only one method available
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Choose Authentication Method
        </h3>
        <p className="text-sm text-gray-600">
          Select how you'd like to sign in to your account
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {availableMethods.map((method) => {
          const isSelected = selectedMethod === method.type;
          const Icon = method.type === 'email' ? Mail : Phone;

          return (
            <Button
              key={method.type}
              variant={isSelected ? "default" : "outline"}
              className={`
                h-auto p-4 flex flex-col items-center space-y-2
                ${isSelected 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'hover:bg-gray-50 border-gray-200'
                }
                transition-all duration-200
              `}
              onClick={() => onMethodChange(method.type)}
            >
              <Icon className={`h-6 w-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
              <div className="text-center">
                <div className={`font-medium ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                  {method.label}
                </div>
                <div className={`text-xs ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                  {method.verificationRequired ? 'Verification required' : 'No verification'}
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

interface AuthMethodCardProps {
  method: AuthMethod;
  isSelected: boolean;
  onClick: () => void;
}

export const AuthMethodCard: React.FC<AuthMethodCardProps> = ({
  method,
  isSelected,
  onClick,
}) => {
  const Icon = method.type === 'email' ? Mail : Phone;

  return (
    <Card 
      className={`
        cursor-pointer transition-all duration-200 hover:shadow-md
        ${isSelected 
          ? 'ring-2 ring-blue-600 bg-blue-50' 
          : 'hover:bg-gray-50'
        }
      `}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className={`
            p-2 rounded-lg
            ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}
          `}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className={`text-lg ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
              {method.label}
            </CardTitle>
            <CardDescription className={isSelected ? 'text-blue-700' : 'text-gray-600'}>
              {method.placeholder}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <span className={`text-sm ${isSelected ? 'text-blue-700' : 'text-gray-500'}`}>
            {method.verificationRequired ? '✓ Verification required' : '✓ No verification needed'}
          </span>
          {isSelected && (
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
