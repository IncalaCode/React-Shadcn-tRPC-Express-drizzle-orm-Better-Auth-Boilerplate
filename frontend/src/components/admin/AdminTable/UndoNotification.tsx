import React from 'react';
import { Button } from '@/components/ui/button';
import { Undo2 } from 'lucide-react';

interface UndoNotificationProps {
  type: 'single' | 'bulk';
  entityName: string;
  countdown: number;
  ids?: string[];
  onUndo: () => void;
}

export const UndoNotification: React.FC<UndoNotificationProps> = ({
  type,
  entityName,
  countdown,
  ids,
  onUndo,
}) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-warning-50 border border-warning-200 rounded-lg animate-fade-in">
      <div className="flex-1">
        <span className="text-sm text-warning-800">
          {type === 'single' 
            ? `Deleting ${entityName.toLowerCase()} in ${countdown}s...`
            : `Deleting ${ids?.length} ${entityName.toLowerCase()}s in ${countdown}s...`
          }
        </span>
      </div>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={onUndo} 
        className="border-warning-300 text-warning-700 hover:bg-warning-100"
      >
        <Undo2 className="h-4 w-4 mr-1" />
        Undo
      </Button>
    </div>
  );
};
