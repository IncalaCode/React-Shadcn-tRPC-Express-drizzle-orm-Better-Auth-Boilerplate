import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface TableHeaderProps {
  columns: Array<{
    key: string;
    label: string;
    render?: (value: any, item: any) => React.ReactNode;
  }>;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  onSelectAll: (checked: boolean) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  isAllSelected,
  isIndeterminate,
  onSelectAll,
}) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="w-12 px-4 py-3 text-left">
          <Checkbox
            checked={isAllSelected}
            onCheckedChange={onSelectAll}
            ref={(el: any) => {
              if (el && el.querySelector) {
                const input = el.querySelector('input');
                if (input) input.indeterminate = isIndeterminate;
              }
            }}
          />
        </th>
        {columns.map((column) => (
          <th key={column.key} className="px-4 py-3 text-left text-sm font-medium text-gray-900">
            {column.label}
          </th>
        ))}
        <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Actions</th>
      </tr>
    </thead>
  );
};
