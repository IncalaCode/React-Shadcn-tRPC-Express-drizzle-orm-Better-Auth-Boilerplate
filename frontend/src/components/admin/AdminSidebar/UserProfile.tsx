import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings } from 'lucide-react';

interface UserProfileProps {
  user: {
    name?: string;
    email?: string;
    imageUrl?: string;
    role?: string;
  };
  isOpen: boolean;
  onLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  isOpen,
  onLogout,
}) => {
  const getInitials = (name?: string) => {
    if (!name) return 'A';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarContent = user.imageUrl ? (
    <img
      src={user.imageUrl}
      alt={user.name || 'User'}
      className="w-8 h-8 rounded-full object-cover"
    />
  ) : (
    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
      {getInitials(user.name)}
    </div>
  );

  if (!isOpen) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center p-0 h-8 w-8"
          >
            {avatarContent}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          side="right" 
          className="w-56 bg-white border border-gray-200 shadow-lg"
          align="end"
        >
          <div className="flex items-center gap-3 p-3 bg-gray-50">
            {avatarContent}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name || 'Admin'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user.email}
              </p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => window.location.href = '/admin/account'}
          >
            <User className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={onLogout}
            className="text-red-600 focus:text-red-600 cursor-pointer hover:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start p-2 h-auto hover:bg-gray-100"
        >
          <div className="flex items-center gap-3 w-full">
            {avatarContent}
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name || 'Admin'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user.email}
              </p>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        side="right" 
        className="w-56 bg-white border border-gray-200 shadow-lg"
        align="end"
      >
        <div className="flex items-center gap-3 p-3 bg-gray-50">
          {avatarContent}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.name || 'Admin'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer hover:bg-gray-50"
          onClick={() => window.location.href = '/admin/account'}
        >
          <User className="mr-2 h-4 w-4" />
          Account
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={onLogout}
          className="text-red-600 focus:text-red-600 cursor-pointer hover:bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
