import { useState } from 'react';
import { CheckCircle, Download, Edit, Eye, MoreHorizontal, Plus, Search, Trash, Upload } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  DialogTrigger,
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
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { useTableFilters } from '@/hooks/admin/useTableFilters';
import { FormDialog } from '@/components/admin/FormDialog';
import { TablePagination } from '@/components/admin/TablePagination';
import { TableSkeleton } from '@/components/admin/TableSkeleton';

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
  const { toast } = useToast();
  const { t } = useTranslation();

  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredItems: filteredAgents
  } = useTableFilters(
    initialAgents,
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
    toast({
      title: t('admin.toasts.addSuccess'),
      description: t('admin.toasts.addSuccessDesc'),
    });
    setIsAddDialogOpen(false);
  };

  const handleImportAgents = () => {
    toast({
      title: t('admin.toasts.importSuccess'),
      description: t('admin.toasts.importSuccessDesc'),
    });
    setIsImportDialogOpen(false);
  };

  const handleExportAgents = () => {
    toast({
      title: t('admin.toasts.exportSuccess'),
      description: t('admin.toasts.exportSuccessDesc'),
    });
  };

  const handleDeleteAgent = (id: string) => {
    setAgents(agents.filter((agent) => agent.id !== id));
    toast({
      title: t('admin.toasts.deleteSuccess'),
      description: t('admin.toasts.deleteSuccessDesc'),
    });
  };

  const toggleAgentStatus = (id: string) => {
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
    
    const agent = agents.find((a) => a.id === id);
    if (agent) {
      toast({
        title: t('admin.toasts.statusChange'),
        description: t('admin.toasts.statusChangeDesc'),
      });
    }
  };

  const statusConfig = {
    active: { label: t('admin.agentsPage.active'), color: 'bg-unlimited-success text-white' },
    inactive: { label: t('admin.agentsPage.inactive'), color: 'bg-unlimited-gray text-white' },
    pending: { label: t('admin.agentsPage.pending'), color: 'bg-unlimited-warning text-white' },
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-unlimited-dark-blue">{t('admin.agentsPage.title')}</h2>
          
          <div className="flex flex-col md:flex-row gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  {t('admin.agentsPage.addAgent')}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t('admin.agentsPage.addNewAgent')}</DialogTitle>
                  <DialogDescription>
                    {t('admin.agentsPage.addNewAgentDesc')}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
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
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddAgent}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {t('admin.studentsPage.save')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  {t('admin.agentsPage.importAgents')}
                </Button>
              </DialogTrigger>
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
                  <Button type="submit" onClick={handleImportAgents}>
                    <Upload className="h-4 w-4 mr-2" />
                    {t('admin.studentsPage.import')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" onClick={handleExportAgents}>
              <Download className="h-4 w-4 mr-2" />
              {t('admin.agentsPage.exportAgents')}
            </Button>
          </div>
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
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
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

        
      </div>
    </DashboardLayout>
  );
};

export default ManageAgents;
