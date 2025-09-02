import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface BulkActionsProps {
  selectedCount: number;
  entityName: string;
  onBulkDelete: () => void;
  onClearSelection: () => void;
}

export const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  entityName,
  onBulkDelete,
  onClearSelection,
}) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-300 rounded-lg shadow-md animate-slide-in">
      <div className="flex-1">
        <span className="text-sm font-semibold text-red-900">
          {selectedCount} {entityName.toLowerCase()}{selectedCount > 1 ? 's' : ''} selected
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Button 
          size="sm" 
          variant="destructive" 
          onClick={onBulkDelete}
          className="bg-red-600 hover:bg-red-700 text-white font-medium"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Selected
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={onClearSelection}
          className="border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Clear Selection
        </Button>
      </div>
    </div>
  );
};
