import React from 'react';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AdminFormProps {
  isOpen: boolean;
  onClose: () => void;
  entityName: string;
  fields: string[];
  editingItem?: any;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export const AdminForm: React.FC<AdminFormProps> = ({
  isOpen,
  onClose,
  entityName,
  fields,
  editingItem,
  onSubmit,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  const handleButtonSubmit = () => {
    const form = document.querySelector('form') as HTMLFormElement;
    if (form) {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      onSubmit(data);
    }
  };

  const getInputType = (field: string) => {
    if (field.toLowerCase().includes('email')) return 'email';
    if (field.toLowerCase().includes('password')) return 'password';
    if (field.toLowerCase().includes('date')) return 'date';
    if (field.toLowerCase().includes('number')) return 'number';
    if (field.toLowerCase().includes('url')) return 'url';
    return 'text';
  };

  const getFieldComponent = (field: string) => {
    const type = getInputType(field);
    const defaultValue = editingItem?.[field] || '';

    if (field.toLowerCase().includes('role')) {
      return (
        <Select name={field} defaultValue={defaultValue}>
          <SelectTrigger className="bg-white border-gray-300">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg">
            <SelectItem value="user" className="hover:bg-gray-50">User</SelectItem>
            <SelectItem value="admin" className="hover:bg-gray-50">Admin</SelectItem>
            <SelectItem value="moderator" className="hover:bg-gray-50">Moderator</SelectItem>
          </SelectContent>
        </Select>
      );
    }

    if (field.toLowerCase().includes('description') || field.toLowerCase().includes('content')) {
      return (
        <Textarea
          name={field}
          defaultValue={defaultValue}
          rows={4}
          placeholder={`Enter ${field.toLowerCase()}`}
        />
      );
    }

    return (
      <Input
        name={field}
        type={type}
        defaultValue={defaultValue}
        placeholder={`Enter ${field.toLowerCase()}`}
      />
    );
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingItem ? 'Edit' : 'Create'} {entityName}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field} className="text-sm font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                {getFieldComponent(field)}
              </div>
            ))}
          </form>
        </div>

        {/* Modal Footer */}
        <div className="flex gap-3 p-6 border-t bg-gray-50">
          <Button 
            type="button" 
            disabled={isLoading}
            onClick={handleButtonSubmit}
            className="flex-1 sm:flex-none"
          >
            {isLoading ? 'Saving...' : editingItem ? 'Update' : 'Create'}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
