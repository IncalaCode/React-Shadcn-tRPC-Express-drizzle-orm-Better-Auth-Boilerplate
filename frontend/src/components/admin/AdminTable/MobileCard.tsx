import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Edit, Eye, Trash2, MoreHorizontal } from 'lucide-react';

interface MobileCardProps {
  item: any;
  columns: Array<{
    key: string;
    label: string;
    render?: (value: any, item: any) => React.ReactNode;
  }>;
  entityName: string;
  isSelected: boolean;
  onSelect: (itemId: string, checked: boolean) => void;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onView?: (item: any) => void;
  isPendingDelete: boolean;
}

export const MobileCard: React.FC<MobileCardProps> = ({
  item,
  columns,
  entityName,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onView,
  isPendingDelete,
}) => {
  return (
    <div className="bg-white border rounded-lg p-4 space-y-3">
      {/* Mobile Header with Checkbox */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked: boolean) => onSelect(item.id, checked)}
          />
          <div className="flex-1">
            {item.email && (
              <p className="font-medium text-gray-900">{item.email}</p>
            )}
            {item.name && (
              <p className="text-sm text-gray-600">{item.name}</p>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-48 bg-white border border-gray-200 shadow-lg"
          >
            {onView && (
              <DropdownMenuItem 
                onClick={() => onView(item)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <Eye className="mr-2 h-4 w-4" />
                View {entityName}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem 
              onClick={() => onEdit(item)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit {entityName}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => onDelete(item.id)}
              disabled={isPendingDelete}
              className="text-red-600 focus:text-red-600 cursor-pointer hover:bg-red-50"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete {entityName}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Content */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        {columns
          .filter(col => !['email', 'name'].includes(col.key))
          .map((column) => (
            <div key={column.key}>
              <span className="text-gray-500">{column.label}:</span>
              <div className="mt-1">
                {column.render 
                  ? column.render(item[column.key], item)
                  : item[column.key] || '-'
                }
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
