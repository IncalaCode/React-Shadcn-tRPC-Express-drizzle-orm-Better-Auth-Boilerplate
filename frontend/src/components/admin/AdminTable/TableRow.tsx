import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Edit, Eye, Trash2, MoreHorizontal } from 'lucide-react';

interface TableRowProps {
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

export const TableRow: React.FC<TableRowProps> = ({
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
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked: boolean) => onSelect(item.id, checked)}
        />
      </td>
      {columns.map((column) => (
        <td key={column.key} className="px-4 py-3 text-sm text-gray-900">
          {column.render 
            ? column.render(item[column.key], item)
            : item[column.key] || '-'
          }
        </td>
      ))}
      <td className="px-4 py-3 text-right">
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
      </td>
    </tr>
  );
};
