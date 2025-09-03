import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronRight, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserProfile } from './AdminSidebar/UserProfile';
import { getIconByName } from '@/utils/iconUtils';

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedEntity: string;
  onEntitySelect: (entity: string) => void;
  entities: Array<{
    name: string;
    label: string;
    icon?: string;
  }>;
}



export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isOpen,
  onToggle,
  selectedEntity,
  onEntitySelect,
  entities,
}) => {
  const { user, logout } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);



  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      <TooltipProvider>
        <div className={`
          ${isMobile 
            ? `fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : `relative transition-all duration-300 ease-in-out`
          }
          ${isOpen ? 'w-64' : 'w-16'} 
          bg-white shadow-lg flex flex-col
        `}>
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              {isOpen && (
                <h2 className="text-lg font-semibold text-gray-800 animate-in slide-in-from-left-2 duration-300">
                  Admin Panel
                </h2>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onToggle}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                {isOpen ? (
                  <X className="h-4 w-4 transition-transform duration-200" />
                ) : (
                  <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                )}
              </Button>
            </div>
          </div>
        
          <div className="flex-1 p-4 space-y-2">
            {entities.map((entity, index) => {
              // Use dynamic icon loading with fallback to default
              const Icon = getIconByName(entity.icon || 'Database');
              return (
                <Tooltip key={entity.name}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={selectedEntity === entity.name ? "default" : "ghost"}
                      className={`
                        w-full transition-all duration-200 group
                        ${isOpen ? 'justify-start' : 'justify-center'}
                        ${selectedEntity === entity.name 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : 'hover:bg-gray-100 text-gray-700'
                        }
                      `}
                      onClick={() => onEntitySelect(entity.name)}
                      style={{
                        animationDelay: `${index * 50}ms`
                      }}
                    >
                      <Icon className={`h-4 w-4 transition-transform duration-200 ${
                        selectedEntity === entity.name ? 'scale-110' : 'group-hover:scale-105'
                      }`} />
                      {isOpen && (
                        <span className={`ml-2 transition-all duration-300 ${
                          selectedEntity === entity.name 
                            ? 'font-medium' 
                            : 'group-hover:translate-x-0.5'
                        }`}>
                          {entity.label}
                        </span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  {!isOpen && (
                    <TooltipContent side="right" className="bg-gray-900 text-white">
                      <p>{entity.label}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </div>

          {/* User Profile */}
          <div className="border-t p-4">
            <UserProfile
              user={{
                name: user?.name,
                email: user?.email,
                imageUrl: (user as any)?.imageUrl,
                role: user?.role || 'System Administrator'
              }}
              isOpen={isOpen}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </TooltipProvider>
    </>
  );
};
