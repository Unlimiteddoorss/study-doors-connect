import { useState } from 'react';
import { CheckCircle, Download, Edit, Eye, MoreHorizontal, Plus, Search, Trash, Upload } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormDialog } from '@/components/admin/FormDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  program: string;
  university: string;
  status: 'active' | 'inactive' | 'pending' | 'graduated';
  agentName?: string;
}

const dummyStudents: Student[] = [
  {
    id: "ST001",
    name: "أحمد محمد",
    email: "ahmed@example.com",
    phone: "+966501234567",
    nationality: "سعودي",
    program: "هندسة برمجيات",
    university: "جامعة الملك سعود",
    status: "active",
    agentName: "وكيل التعليم الدولي"
  },
  {
    id: "ST002",
    name: "سارة عبدالله",
    email: "sara@example.com",
    phone: "+966507654321",
    nationality: "سعودي",
    program: "طب بشري",
    university: "جامعة الملك عبدالعزيز",
    status: "pending"
  },
  {
    id: "ST003",
    name: "محمد العلي",
    email: "mohammed@example.com",
    phone: "+966509876543",
    nationality: "كويتي",
    program: "إدارة أعمال",
    university: "جامعة الكويت",
    status: "graduated",
    agentName: "وكيل الخليج التعليمي"
  }
];

const nationalities = [
  'سعودي',
  'إماراتي',
  'كويتي',
  'قطري',
  'بحريني',
  'عماني',
  'مصري',
  'أردني',
  'لبناني',
  'سوري',
  'عراقي',
  'يمني',
  'فلسطيني',
  'سوداني',
  'مغربي',
  'تونسي',
  'جزائري',
  'ليبي'
];

const ManageStudents = () => {
  const [students, setStudents] = useState<Student[]>(dummyStudents);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredItems: filteredStudents
  } = useTableFilters(
    students,
    ['name', 'email', 'id'],
    [
      { field: 'nationality', defaultValue: 'all' },
      { field: 'status', defaultValue: 'all' }
    ]
  );

  const handleAddStudent = () => {
    toast({
      title: t('admin.toasts.addSuccess'),
      description: t('admin.toasts.addSuccessDesc'),
    });
    setIsAddDialogOpen(false);
  };

  const handleImportStudents = () => {
    toast({
      title: t('admin.toasts.importSuccess'),
      description: t('admin.toasts.importSuccessDesc'),
    });
    setIsImportDialogOpen(false);
  };

  const handleExportStudents = () => {
    toast({
      title: t('admin.toasts.exportSuccess'),
      description: t('admin.toasts.exportSuccessDesc'),
    });
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter((student) => student.id !== id));
    toast({
      title: t('admin.toasts.deleteSuccess'),
      description: t('admin.toasts.deleteSuccessDesc'),
    });
  };

  const statusConfig = {
    active: { label: t('admin.studentsPage.active'), color: 'bg-unlimited-success text-white' },
    inactive: { label: t('admin.studentsPage.inactive'), color: 'bg-unlimited-gray text-white' },
    pending: { label: t('admin.studentsPage.pending'), color: 'bg-unlimited-warning text-white' },
    graduated: { label: t('admin.studentsPage.graduated'), color: 'bg-unlimited-blue text-white' },
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-unlimited-dark-blue">{t('admin.studentsPage.title')}</h2>
          
          <div className="flex flex-col md:flex-row gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  {t('admin.studentsPage.addStudent')}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>{t('admin.studentsPage.addNewStudent')}</DialogTitle>
                  <DialogDescription>
                    {t('admin.studentsPage.addNewStudentDesc')}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">{t('admin.studentsPage.tableHeaders.name')}</label>
                    <Input className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">{t('admin.studentsPage.tableHeaders.email')}</label>
                    <Input type="email" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">{t('admin.studentsPage.tableHeaders.phone')}</label>
                    <Input className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">{t('admin.studentsPage.tableHeaders.nationality')}</label>
                    <Input className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">{t('admin.studentsPage.tableHeaders.program')}</label>
                    <Input className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">{t('admin.studentsPage.tableHeaders.university')}</label>
                    <Input className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">{t('admin.studentsPage.agent')}</label>
                    <Input className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddStudent}>
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
                  {t('admin.studentsPage.importStudents')}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t('admin.studentsPage.importData')}</DialogTitle>
                  <DialogDescription>
                    {t('admin.studentsPage.importDataDesc')}
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
                  <Button type="submit" onClick={handleImportStudents}>
                    <Upload className="h-4 w-4 mr-2" />
                    {t('admin.studentsPage.import')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" onClick={handleExportStudents}>
              <Download className="h-4 w-4 mr-2" />
              {t('admin.studentsPage.exportStudents')}
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
            <Input
              placeholder={t('admin.studentsPage.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full md:w-[300px]"
            />
          </div>
          
          <div className="flex flex-row gap-2 items-center">
            <Select value={filters.nationality} onValueChange={(value) => setFilters({ ...filters, nationality: value })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('admin.studentsPage.nationality')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('admin.studentsPage.allNationalities')}</SelectItem>
                {nationalities.map((nationality) => (
                  <SelectItem key={nationality} value={nationality}>{nationality}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('admin.studentsPage.status')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('admin.studentsPage.allStatuses')}</SelectItem>
                <SelectItem value="active">{t('admin.studentsPage.active')}</SelectItem>
                <SelectItem value="inactive">{t('admin.studentsPage.inactive')}</SelectItem>
                <SelectItem value="pending">{t('admin.studentsPage.pending')}</SelectItem>
                <SelectItem value="graduated">{t('admin.studentsPage.graduated')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">{t('admin.studentsPage.tableHeaders.id')}</TableHead>
                <TableHead>{t('admin.studentsPage.tableHeaders.name')}</TableHead>
                <TableHead className="hidden md:table-cell">{t('admin.studentsPage.tableHeaders.email')}</TableHead>
                <TableHead className="hidden lg:table-cell">{t('admin.studentsPage.tableHeaders.phone')}</TableHead>
                <TableHead className="hidden lg:table-cell">{t('admin.studentsPage.tableHeaders.nationality')}</TableHead>
                <TableHead className="hidden lg:table-cell">{t('admin.studentsPage.tableHeaders.program')}</TableHead>
                <TableHead className="hidden md:table-cell">{t('admin.studentsPage.tableHeaders.university')}</TableHead>
                <TableHead>{t('admin.studentsPage.tableHeaders.status')}</TableHead>
                <TableHead className="text-left">{t('admin.studentsPage.tableHeaders.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center h-40 text-unlimited-gray">
                    {t('admin.studentsPage.noData')}
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.id}</TableCell>
                    <TableCell>
                      <div>
                        <p>{student.name}</p>
                        {student.agentName && (
                          <p className="text-xs text-unlimited-gray">{t('admin.studentsPage.agent')}: {student.agentName}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{student.email}</TableCell>
                    <TableCell className="hidden lg:table-cell">{student.phone}</TableCell>
                    <TableCell className="hidden lg:table-cell">{student.nationality}</TableCell>
                    <TableCell className="hidden lg:table-cell">{student.program}</TableCell>
                    <TableCell className="hidden md:table-cell">{student.university}</TableCell>
                    <TableCell>
                      <Badge className={statusConfig[student.status].color}>
                        {statusConfig[student.status].label}
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
                            <DropdownMenuLabel>{t('admin.studentsPage.tableHeaders.name')}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>{t('admin.actions.view')}</DropdownMenuItem>
                            <DropdownMenuItem>{t('admin.actions.edit')}</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-unlimited-danger focus:text-unlimited-danger"
                              onClick={() => handleDeleteStudent(student.id)}
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              {t('admin.actions.delete')}
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
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageStudents;
