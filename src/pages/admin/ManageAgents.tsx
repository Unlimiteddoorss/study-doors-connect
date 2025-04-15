
import { useState } from 'react';
import { CheckCircle, Download, Edit, Eye, MoreHorizontal, Plus, Search, Trash, Upload, UserCheck } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { useTableFilters } from '@/hooks/admin/useTableFilters';
import { AdminPageActions } from '@/components/admin/AdminPageActions';
import { FormDialog } from '@/components/admin/FormDialog';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { TablePagination } from '@/components/admin/TablePagination';
import { TableSkeleton } from '@/components/admin/TableSkeleton';
import { useAdminActions } from '@/hooks/admin/useAdminActions';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Agent = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  students: number;
  applications: number;
  commission: number;
  status: 'active' | 'inactive' | 'pending';
  registrationDate: string;
};

const initialAgents: Agent[] = [
  {
    id: 'AGT-001',
    name: 'محمد العلي',
    email: 'mohammed@example.com',
    phone: '+966 50 123 4567',
    country: 'السعودية',
    students: 25,
    applications: 32,
    commission: 15000,
    status: 'active',
    registrationDate: '2022-05-15',
  },
  {
    id: 'AGT-002',
    name: 'خالد الأحمد',
    email: 'khaled@example.com',
    phone: '+971 55 987 6543',
    country: 'الإمارات',
    students: 18,
    applications: 22,
    commission: 12500,
    status: 'active',
    registrationDate: '2022-06-20',
  },
  {
    id: 'AGT-003',
    name: 'سارة المحمود',
    email: 'sarah@example.com',
    phone: '+965 60 123 4567',
    country: 'الكويت',
    students: 12,
    applications: 15,
    commission: 8000,
    status: 'inactive',
    registrationDate: '2022-08-05',
  },
  {
    id: 'AGT-004',
    name: 'فهد الراشد',
    email: 'fahad@example.com',
    phone: '+974 33 123 4567',
    country: 'قطر',
    students: 30,
    applications: 38,
    commission: 22000,
    status: 'active',
    registrationDate: '2022-09-12',
  },
  {
    id: 'AGT-005',
    name: 'نورة السعيد',
    email: 'noura@example.com',
    phone: '+973 35 123 4567',
    country: 'البحرين',
    students: 15,
    applications: 19,
    commission: 11000,
    status: 'pending',
    registrationDate: '2023-01-10',
  },
];

const itemsPerPage = 10;

const ManageAgents = () => {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const { t } = useTranslation();
  const { 
    isLoading: isActionLoading, 
    confirmAction, 
    isConfirmDialogOpen, 
    executePendingAction, 
    cancelConfirmAction,
    handleAction 
  } = useAdminActions();

  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredItems: filteredAgents
  } = useTableFilters(
    agents,
    ['name', 'email', 'id'],
    [
      { field: 'status', defaultValue: 'all' }
    ]
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);
  const currentItems = filteredAgents.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleAddAgent = () => {
    handleAction(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        // Add agent logic would go here
      },
      {
        successMessage: t('admin.toasts.addSuccess'),
        onSuccess: () => setIsAddDialogOpen(false)
      }
    );
  };

  const handleImportAgents = () => {
    handleAction(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        // Import agents logic would go here
      },
      {
        successMessage: t('admin.toasts.importSuccess'),
        onSuccess: () => setIsImportDialogOpen(false)
      }
    );
  };

  const handleExportAgents = () => {
    handleAction(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        // Export agents logic would go here
      },
      {
        successMessage: t('admin.toasts.exportSuccess')
      }
    );
  };

  const handleDeleteAgent = (id: string) => {
    setSelectedAgentId(id);
    confirmAction(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setAgents(agents.filter((agent) => agent.id !== id));
      },
      {
        successMessage: t('admin.toasts.deleteSuccess')
      }
    );
  };

  const handleViewAgent = (id: string) => {
    setSelectedAgentId(id);
    setIsViewDialogOpen(true);
  };

  const handleEditAgent = (id: string) => {
    setSelectedAgentId(id);
    setIsEditDialogOpen(true);
  };

  const toggleAgentStatus = (id: string) => {
    handleAction(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setAgents(
          agents.map((agent) =>
            agent.id === id
              ? {
                  ...agent,
                  status: agent.status === 'active' ? 'inactive' : 'active',
                }
              : agent
          )
        );
      },
      {
        successMessage: t('admin.toasts.statusChange')
      }
    );
  };

  const statusConfig = {
    active: { label: t('admin.agentsPage.active'), color: 'bg-unlimited-success text-white' },
    inactive: { label: t('admin.agentsPage.inactive'), color: 'bg-unlimited-gray text-white' },
    pending: { label: t('admin.agentsPage.pending'), color: 'bg-unlimited-warning text-white' },
  };

  const selectedAgent = selectedAgentId ? agents.find(agent => agent.id === selectedAgentId) : null;

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-unlimited-dark-blue">{t('admin.agentsPage.title')}</h2>
          
          <AdminPageActions 
            onAdd={() => setIsAddDialogOpen(true)}
            onImport={() => setIsImportDialogOpen(true)}
            onExport={handleExportAgents}
            addLabel={t('admin.agentsPage.addAgent')}
            importLabel={t('admin.agentsPage.importAgents')}
            exportLabel={t('admin.agentsPage.exportAgents')}
            isLoading={isActionLoading}
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
            <Input
              placeholder={t('admin.agentsPage.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full md:w-[300px]"
            />
          </div>
          
          <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder={t('admin.agentsPage.status')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('admin.agentsPage.allStatuses')}</SelectItem>
              <SelectItem value="active">{t('admin.agentsPage.active')}</SelectItem>
              <SelectItem value="inactive">{t('admin.agentsPage.inactive')}</SelectItem>
              <SelectItem value="pending">{t('admin.agentsPage.pending')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="rounded-md border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">{t('admin.agentsPage.tableHeaders.id')}</TableHead>
                <TableHead>{t('admin.agentsPage.tableHeaders.name')}</TableHead>
                <TableHead className="hidden md:table-cell">{t('admin.agentsPage.tableHeaders.email')}</TableHead>
                <TableHead className="hidden lg:table-cell">{t('admin.agentsPage.tableHeaders.phone')}</TableHead>
                <TableHead className="hidden lg:table-cell">{t('admin.agentsPage.tableHeaders.country')}</TableHead>
                <TableHead className="hidden md:table-cell">{t('admin.agentsPage.tableHeaders.students')}</TableHead>
                <TableHead className="hidden md:table-cell">{t('admin.agentsPage.tableHeaders.applications')}</TableHead>
                <TableHead>{t('admin.agentsPage.tableHeaders.commission')}</TableHead>
                <TableHead>{t('admin.agentsPage.tableHeaders.status')}</TableHead>
                <TableHead className="text-left">{t('admin.agentsPage.tableHeaders.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableSkeleton columns={10} rows={itemsPerPage} />
              ) : currentItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center h-40 text-unlimited-gray">
                    {t('admin.agentsPage.noData')}
                  </TableCell>
                </TableRow>
              ) : (
                currentItems.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell className="font-medium">{agent.id}</TableCell>
                    <TableCell>{agent.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{agent.email}</TableCell>
                    <TableCell className="hidden lg:table-cell">{agent.phone}</TableCell>
                    <TableCell className="hidden lg:table-cell">{agent.country}</TableCell>
                    <TableCell className="hidden md:table-cell">{agent.students}</TableCell>
                    <TableCell className="hidden md:table-cell">{agent.applications}</TableCell>
                    <TableCell>{agent.commission} ريال</TableCell>
                    <TableCell>
                      <Badge className={statusConfig[agent.status].color}>
                        {statusConfig[agent.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleViewAgent(agent.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleEditAgent(agent.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t('admin.agentsPage.agentOptions')}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => toggleAgentStatus(agent.id)}>
                              {agent.status === 'active' ? t('admin.agentsPage.disableAccount') : t('admin.agentsPage.enableAccount')}
                            </DropdownMenuItem>
                            <DropdownMenuItem>{t('admin.agentsPage.viewAgentRequests')}</DropdownMenuItem>
                            <DropdownMenuItem>{t('admin.agentsPage.viewAgentStudents')}</DropdownMenuItem>
                            <DropdownMenuItem>{t('admin.agentsPage.editCommissionRate')}</DropdownMenuItem>
                            <DropdownMenuItem>{t('admin.agentsPage.sendMessage')}</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-unlimited-danger focus:text-unlimited-danger"
                              onClick={() => handleDeleteAgent(agent.id)}
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              {t('admin.agentsPage.delete')}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {filteredAgents.length > itemsPerPage && (
            <div className="py-4 flex justify-center">
              <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>

        <FormDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          title={t('admin.agentsPage.addNewAgent')}
          description={t('admin.agentsPage.addNewAgentDesc')}
          onSubmit={handleAddAgent}
          submitLabel={t('admin.studentsPage.save')}
          isLoading={isActionLoading}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right col-span-1">{t('admin.agentsPage.tableHeaders.name')}</label>
            <Input className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right col-span-1">{t('admin.agentsPage.tableHeaders.email')}</label>
            <Input type="email" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right col-span-1">{t('admin.agentsPage.tableHeaders.phone')}</label>
            <Input className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right col-span-1">{t('admin.agentsPage.tableHeaders.country')}</label>
            <Input className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right col-span-1">{t('admin.agentsPage.commissionRate')}</label>
            <Input type="number" className="col-span-3" />
          </div>
        </FormDialog>

        <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('admin.agentsPage.importData')}</DialogTitle>
              <DialogDescription>
                {t('admin.agentsPage.importDataDesc')}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-unlimited-gray" />
                <p className="mt-2 text-sm text-unlimited-gray">
                  {t('admin.studentsPage.dragDrop')}
                </p>
                <input type="file" className="hidden" />
                <Button variant="outline" className="mt-4">
                  {t('admin.studentsPage.chooseFile')}
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="submit" 
                onClick={handleImportAgents} 
                disabled={isActionLoading}
              >
                {isActionLoading ? (
                  <CheckCircle className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                {t('admin.studentsPage.import')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Agent Dialog */}
        {selectedAgent && (
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{t('admin.agentsPage.viewAgent')}</DialogTitle>
                <DialogDescription>
                  {t('admin.agentsPage.viewAgentDesc')}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex justify-center mb-4">
                  <div className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center">
                    <UserCheck className="h-12 w-12 text-unlimited-gray" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-unlimited-gray">{t('admin.agentsPage.tableHeaders.name')}</p>
                    <p>{selectedAgent.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-unlimited-gray">{t('admin.agentsPage.tableHeaders.email')}</p>
                    <p>{selectedAgent.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-unlimited-gray">{t('admin.agentsPage.tableHeaders.phone')}</p>
                    <p>{selectedAgent.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-unlimited-gray">{t('admin.agentsPage.tableHeaders.country')}</p>
                    <p>{selectedAgent.country}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-unlimited-gray">{t('admin.agentsPage.tableHeaders.students')}</p>
                    <p>{selectedAgent.students}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-unlimited-gray">{t('admin.agentsPage.tableHeaders.applications')}</p>
                    <p>{selectedAgent.applications}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-unlimited-gray">{t('admin.agentsPage.tableHeaders.commission')}</p>
                    <p>{selectedAgent.commission} ريال</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-unlimited-gray">{t('admin.agentsPage.tableHeaders.status')}</p>
                    <Badge className={statusConfig[selectedAgent.status].color}>
                      {statusConfig[selectedAgent.status].label}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-unlimited-gray">{t('admin.agentsPage.registrationDate')}</p>
                    <p>{new Date(selectedAgent.registrationDate).toLocaleDateString('ar-SA')}</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  {t('admin.actions.close')}
                </Button>
                <Button 
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    handleEditAgent(selectedAgent.id);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {t('admin.actions.edit')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Edit Agent Dialog */}
        {selectedAgent && (
          <FormDialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            title={t('admin.agentsPage.editAgent')}
            description={t('admin.agentsPage.editAgentDesc')}
            onSubmit={() => {
              handleAction(
                async () => {
                  // Simulate API call
                  await new Promise(resolve => setTimeout(resolve, 800));
                  // Edit agent logic would go here
                },
                {
                  successMessage: t('admin.toasts.editSuccess'),
                  onSuccess: () => setIsEditDialogOpen(false)
                }
              );
            }}
            submitLabel={t('admin.actions.save')}
            isLoading={isActionLoading}
          >
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right col-span-1">{t('admin.agentsPage.tableHeaders.name')}</label>
              <Input className="col-span-3" defaultValue={selectedAgent.name} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right col-span-1">{t('admin.agentsPage.tableHeaders.email')}</label>
              <Input type="email" className="col-span-3" defaultValue={selectedAgent.email} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right col-span-1">{t('admin.agentsPage.tableHeaders.phone')}</label>
              <Input className="col-span-3" defaultValue={selectedAgent.phone} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right col-span-1">{t('admin.agentsPage.tableHeaders.country')}</label>
              <Input className="col-span-3" defaultValue={selectedAgent.country} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right col-span-1">{t('admin.agentsPage.commissionRate')}</label>
              <Input 
                type="number" 
                className="col-span-3" 
                defaultValue={selectedAgent.commission} 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right col-span-1">{t('admin.agentsPage.status')}</label>
              <Select defaultValue={selectedAgent.status} className="col-span-3">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">{t('admin.agentsPage.active')}</SelectItem>
                  <SelectItem value="inactive">{t('admin.agentsPage.inactive')}</SelectItem>
                  <SelectItem value="pending">{t('admin.agentsPage.pending')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FormDialog>
        )}

        {/* Confirmation Dialog */}
        <ConfirmDialog
          isOpen={isConfirmDialogOpen}
          onClose={cancelConfirmAction}
          onConfirm={executePendingAction}
          title={t('admin.agentsPage.deleteConfirmTitle')}
          description={t('admin.agentsPage.deleteConfirmDesc')}
          confirmLabel={t('admin.actions.delete')}
          cancelLabel={t('admin.actions.cancel')}
          isLoading={isActionLoading}
        />
      </div>
    </DashboardLayout>
  );
};

export default ManageAgents;
