import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Menu } from 'lucide-react';
import { AdminSidebar, AdminTable, AdminForm } from '@/components/admin';
import { trpc } from '@/lib/trpc';

export const AdminDashboard: React.FC = () => {
  const [selectedEntity, setSelectedEntity] = useState<string>('User');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Start closed on mobile

  // TRPC React Query hooks
  const { data: config, isLoading: isLoadingConfig } = (trpc as any).admin.getConfig.useQuery();
  const { data: items, isLoading: isLoadingData, refetch: refetchData } = (trpc as any).admin.getData.useQuery(
    { entity: selectedEntity },
    { enabled: !!selectedEntity }
  );
  const crudMutation = (trpc as any).admin.crud.useMutation({
    onSuccess: () => {
      refetchData(); // Refetch data after successful mutation
    },
  });

  // Auto-open sidebar on desktop, keep closed on mobile
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // TRPC will automatically refetch when selectedEntity changes

  const handleEntitySelect = (entity: string) => {
    setSelectedEntity(entity);
    setShowForm(false);
    setEditingItem(null);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    crudMutation.mutate({
      entity: selectedEntity,
      action: 'delete',
      data: { id }
    });
  };

  const handleBulkDelete = async (ids: string[]) => {
    // Delete items one by one using TRPC mutation
    for (const id of ids) {
      crudMutation.mutate({
        entity: selectedEntity,
        action: 'delete',
        data: { id }
      });
    }
  };

  const handleFormSubmit = async (data: any) => {
    const submitData = editingItem ? { ...editingItem, ...data } : data;
    crudMutation.mutate({
      entity: selectedEntity,
      action: editingItem ? 'update' : 'create',
      data: submitData
    }, {
      onSuccess: () => {
        setShowForm(false);
        setEditingItem(null);
      }
    });
  };

  const currentEntity = config?.entities?.find((e: any) => e.name === selectedEntity);

  if (isLoadingConfig || isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading Admin Panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        selectedEntity={selectedEntity}
        onEntitySelect={handleEntitySelect}
        entities={config?.entities || []}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">
            {currentEntity?.label || 'Admin Dashboard'}
          </h1>
          <div className="w-8" /> {/* Spacer for centering */}
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block p-6 pb-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {currentEntity?.label || 'Admin Dashboard'}
            </h1>
            <p className="text-gray-600">Welcome, {config?.admin?.name}</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-6 pt-4 md:pt-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Manage {currentEntity?.label || selectedEntity}s
            </h2>
            <Button 
              onClick={() => setShowForm(true)}
              className="w-full sm:w-auto"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New
            </Button>
          </div>

          {/* Table */}
          <AdminTable
            items={items || []}
            entityName={currentEntity?.label || selectedEntity}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onBulkDelete={handleBulkDelete}
            entityFields={currentEntity?.fields || []}
          />

          {/* Form Modal */}
          <AdminForm
            isOpen={showForm}
            onClose={() => {
              setShowForm(false);
              setEditingItem(null);
            }}
            entityName={currentEntity?.label || selectedEntity}
            fields={currentEntity?.fields || []}
            editingItem={editingItem}
            onSubmit={handleFormSubmit}
            isLoading={crudMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
};
