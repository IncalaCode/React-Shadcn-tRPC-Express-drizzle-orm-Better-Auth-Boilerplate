import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { TooltipProvider } from '@/components/ui/tooltip';
import { 
  TableHeader, 
  TableRow, 
  MobileCard, 
  Pagination, 
  UndoNotification, 
  BulkActions 
} from './AdminTable/index';

interface AdminTableProps {
  items: any[];
  entityName: string;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onView?: (item: any) => void;
  onBulkDelete?: (ids: string[]) => void;
  entityFields?: string[]; // Fields from the entity configuration
  columns?: {
    key: string;
    label: string;
    render?: (value: any, item: any) => React.ReactNode;
  }[];
  undoDelay?: number; // Delay in seconds, defaults to 5
}

export const AdminTable: React.FC<AdminTableProps> = ({
  items,
  entityName,
  onEdit,
  onDelete,
  onView,
  onBulkDelete,
  entityFields,
  columns,
  undoDelay = 5,
}) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Undo state management
  const [pendingDelete, setPendingDelete] = useState<{
    type: 'single' | 'bulk';
    id?: string;
    ids?: string[];
    countdown: number;
  } | null>(null);
  
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Countdown effect for pending delete
  useEffect(() => {
    if (pendingDelete && pendingDelete.countdown > 0) {
      countdownRef.current = setTimeout(() => {
        setPendingDelete(prev => prev ? { ...prev, countdown: prev.countdown - 1 } : null);
      }, 1000);
    } else if (pendingDelete && pendingDelete.countdown === 0) {
      // Execute the actual delete
      if (pendingDelete.type === 'single' && pendingDelete.id) {
        onDelete(pendingDelete.id);
      } else if (pendingDelete.type === 'bulk' && pendingDelete.ids && onBulkDelete) {
        onBulkDelete(pendingDelete.ids);
        setSelectedItems(new Set());
      }
      setPendingDelete(null);
    }

    return () => {
      if (countdownRef.current) {
        clearTimeout(countdownRef.current);
      }
    };
  }, [pendingDelete, onDelete, onBulkDelete]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearTimeout(countdownRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Generate columns from entity fields or use provided columns
  const generateColumns = () => {
    if (columns) return columns;
    
    if (entityFields && entityFields.length > 0) {
      return entityFields.map(field => {
        const render = (value: any) => {
          if (field.toLowerCase().includes('id')) {
            return <Badge variant="outline">{value?.slice(0, 8)}</Badge>;
          }
          if (field.toLowerCase().includes('role')) {
            return value ? <Badge>{value}</Badge> : null;
          }
          if (field.toLowerCase().includes('status')) {
            return value ? <Badge variant="secondary">{value}</Badge> : null;
          }
          if (field.toLowerCase().includes('date') || field.toLowerCase().includes('created') || field.toLowerCase().includes('updated')) {
            return value ? new Date(value).toLocaleDateString() : '-';
          }
          if (field.toLowerCase().includes('email')) {
            return <span className="font-medium">{value || '-'}</span>;
          }
          return value || '-';
        };

        return {
          key: field,
          label: field.charAt(0).toUpperCase() + field.slice(1),
          render
        };
      });
    }

    // Fallback to default columns if no entity fields
    return [
      { key: 'id', label: 'ID', render: (value: string) => <Badge variant="outline">{value?.slice(0, 8)}</Badge> },
      { key: 'email', label: 'Email' },
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role', render: (value: string) => value ? <Badge>{value}</Badge> : null },
      { key: 'status', label: 'Status', render: (value: string) => value ? <Badge variant="secondary">{value}</Badge> : null },
      { key: 'createdAt', label: 'Created', render: (value: string) => new Date(value).toLocaleDateString() },
    ];
  };

  const tableColumns = generateColumns();

  // Pagination logic
  const totalPages = Math.ceil(items.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = items.slice(startIndex, endIndex);

  // Selection logic
  const isAllSelected = paginatedItems.length > 0 && paginatedItems.every(item => selectedItems.has(item.id));
  const isIndeterminate = selectedItems.size > 0 && !isAllSelected;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const newSelected = new Set(selectedItems);
      paginatedItems.forEach(item => newSelected.add(item.id));
      setSelectedItems(newSelected);
    } else {
      const newSelected = new Set(selectedItems);
      paginatedItems.forEach(item => newSelected.delete(item.id));
      setSelectedItems(newSelected);
    }
  };

  const handleSelectItem = (itemId: string, checked: boolean) => {
    const newSelected = new Set(selectedItems);
    if (checked) {
      newSelected.add(itemId);
    } else {
      newSelected.delete(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleBulkDelete = () => {
    if (onBulkDelete && selectedItems.size > 0) {
      const ids = Array.from(selectedItems);
      setPendingDelete({
        type: 'bulk',
        ids,
        countdown: undoDelay
      });
    }
  };

  const handleSingleDelete = (id: string) => {
    setPendingDelete({
      type: 'single',
      id,
      countdown: undoDelay
    });
  };

  const handleUndo = () => {
    setPendingDelete(null);
    if (countdownRef.current) {
      clearTimeout(countdownRef.current);
      countdownRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No {entityName.toLowerCase()}s found
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Undo Notification */}
        {pendingDelete && (
          <UndoNotification
            type={pendingDelete.type}
            entityName={entityName}
            countdown={pendingDelete.countdown}
            ids={pendingDelete.ids}
            onUndo={handleUndo}
          />
        )}

        {/* Bulk Actions */}
        {selectedItems.size > 0 && !pendingDelete && (
          <BulkActions
            selectedCount={selectedItems.size}
            entityName={entityName}
            onBulkDelete={handleBulkDelete}
            onClearSelection={() => setSelectedItems(new Set())}
          />
        )}

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <TableHeader
                columns={tableColumns}
                isAllSelected={isAllSelected}
                isIndeterminate={isIndeterminate}
                onSelectAll={handleSelectAll}
              />
              <tbody className="divide-y divide-gray-200">
                {paginatedItems.map((item) => (
                  <TableRow
                    key={item.id}
                    item={item}
                    columns={tableColumns}
                    entityName={entityName}
                    isSelected={selectedItems.has(item.id)}
                    onSelect={handleSelectItem}
                    onEdit={onEdit}
                    onDelete={handleSingleDelete}
                    onView={onView}
                    isPendingDelete={pendingDelete?.id === item.id}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3 p-4">
            {paginatedItems.map((item) => (
              <MobileCard
                key={item.id}
                item={item}
                columns={tableColumns}
                entityName={entityName}
                isSelected={selectedItems.has(item.id)}
                onSelect={handleSelectItem}
                onEdit={onEdit}
                onDelete={handleSingleDelete}
                onView={onView}
                isPendingDelete={pendingDelete?.id === item.id}
              />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={items.length}
          startIndex={startIndex}
          endIndex={endIndex}
          onPageChange={handlePageChange}
          onPageSizeChange={(size: number) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>
    </TooltipProvider>
  );
};
