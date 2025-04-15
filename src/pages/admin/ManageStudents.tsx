
import { useState, useEffect } from 'react';
import { CheckCircle, Download, Edit, Eye, MoreHorizontal, Plus, Search, Trash, Upload } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormDialog } from '@/components/admin/FormDialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { useTableFilters } from '@/hooks/admin/useTableFilters';
import { TablePagination } from '@/components/admin/TablePagination';
import { TableSkeleton } from '@/components/admin/TableSkeleton';

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

const itemsPerPage = 10;

const ManageStudents = () => {
  const [students, setStudents] = useState<Student[]>(dummyStudents);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: '',
    email: '',
    phone: '',
    nationality: '',
    program: '',
    university: '',
    status: 'pending'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (selectedStudent) {
      setSelectedStudent({
        ...selectedStudent,
        [name]: value
      });
    } else {
      setNewStudent({
        ...newStudent,
        [name]: value
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    if (selectedStudent) {
      setSelectedStudent({
        ...selectedStudent,
        [name]: value
      });
    } else {
      setNewStudent({
        ...newStudent,
        [name]: value
      });
    }
  };

  const handleAddStudent = () => {
    const newStudentWithId = {
      ...newStudent,
      id: `ST${String(students.length + 1).padStart(3, '0')}`,
      status: newStudent.status as 'active' | 'inactive' | 'pending' | 'graduated',
    } as Student;

    setStudents([...students, newStudentWithId]);
    setNewStudent({
      name: '',
      email: '',
      phone: '',
      nationality: '',
      program: '',
      university: '',
      status: 'pending'
    });
    setIsAddDialogOpen(false);
    toast({
      title: t('admin.toasts.addSuccess'),
      description: t('admin.toasts.addSuccessDesc'),
    });
  };

  const handleEditStudent = () => {
    if (!selectedStudent) return;

    setStudents(students.map(student => 
      student.id === selectedStudent.id ? selectedStudent : student
    ));
    setSelectedStudent(null);
    setIsEditDialogOpen(false);
    toast({
      title: t('admin.toasts.updateSuccess'),
      description: t('admin.toasts.updateSuccessDesc'),
    });
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsViewDialogOpen(true);
  };

  const handleOpenEditDialog = (student: Student) => {
    setSelectedStudent(student);
    setIsEditDialogOpen(true);
  };

  const handleOpenDeleteDialog = (student: Student) => {
    setSelectedStudent(student);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteStudent = () => {
    if (!selectedStudent) return;
    
    setStudents(students.filter((student) => student.id !== selectedStudent.id));
    setSelectedStudent(null);
    setIsDeleteDialogOpen(false);
    toast({
      title: t('admin.toasts.deleteSuccess'),
      description: t('admin.toasts.deleteSuccessDesc'),
    });
  };

  const handleImportStudents = () => {
    // Simulate importing students
    const importedStudents = [
      {
        id: `ST${String(students.length + 1).padStart(3, '0')}`,
        name: "عبدالرحمن ناصر",
        email: "abdulrahman@example.com",
        phone: "+966512345678",
        nationality: "سعودي",
        program: "علوم الحاسب",
        university: "جامعة الإمام",
        status: "active" as const
      },
      {
        id: `ST${String(students.length + 2).padStart(3, '0')}`,
        name: "نورة علي",
        email: "noura@example.com",
        phone: "+966523456789",
        nationality: "سعودي",
        program: "طب أسنان",
        university: "جامعة الملك سعود",
        status: "pending" as const
      }
    ];

    setStudents([...students, ...importedStudents]);
    setIsImportDialogOpen(false);
    toast({
      title: t('admin.toasts.importSuccess'),
      description: t('admin.toasts.importSuccessDesc'),
    });
  };

  const handleExportStudents = () => {
    // Simulate exporting students
    toast({
      title: t('admin.toasts.exportSuccess'),
      description: t('admin.toasts.exportSuccessDesc'),
    });
  };

  const statusConfig = {
    active: { label: t('admin.studentsPage.active'), color: 'bg-unlimited-success text-white' },
    inactive: { label: t('admin.studentsPage.inactive'), color: 'bg-unlimited-gray text-white' },
    pending: { label: t('admin.studentsPage.pending'), color: 'bg-unlimited-warning text-white' },
    graduated: { label: t('admin.studentsPage.graduated'), color: 'bg-unlimited-blue text-white' },
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentItems = filteredStudents.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
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
                    <Input 
                      name="name" 
                      value={newStudent.name} 
                      onChange={handleInputChange} 
                      className="col-span-3" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">{t('admin.studentsPage.tableHeaders.email')}</label>
                    <Input 
                      name="email" 
                      type="email" 
                      value={newStudent.email} 
                      onChange={handleInputChange} 
                      className="col-span-3" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">{t('admin.studentsPage.tableHeaders.phone')}</label>
                    <Input 
                      name="phone" 
                      value={newStudent.phone} 
                      onChange={handleInputChange} 
                      className="col-span-3" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">{t('admin.studentsPage.tableHeaders.nationality')}</label>
                    <Select 
                      name="nationality" 
                      value={newStudent.nationality} 
                      onValueChange={(value) => handleSelectChange("nationality", value)}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder={t('admin.studentsPage.tableHeaders.nationality')} />
                      </SelectTrigger>
                      <SelectContent>
                        {nationalities.map((nationality) => (
                          <SelectItem key={nationality} value={nationality}>{nationality}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">{t('admin.studentsPage.tableHeaders.program')}</label>
                    <Input 
                      name="program" 
                      value={newStudent.program} 
                      onChange={handleInputChange} 
                      className="col-span-3" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">{t('admin.studentsPage.tableHeaders.university')}</label>
                    <Input 
                      name="university" 
                      value={newStudent.university} 
                      onChange={handleInputChange} 
                      className="col-span-3" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">{t('admin.studentsPage.status')}</label>
                    <Select 
                      name="status" 
                      value={newStudent.status} 
                      onValueChange={(value) => handleSelectChange("status", value)}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder={t('admin.studentsPage.status')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">{t('admin.studentsPage.active')}</SelectItem>
                        <SelectItem value="inactive">{t('admin.studentsPage.inactive')}</SelectItem>
                        <SelectItem value="pending">{t('admin.studentsPage.pending')}</SelectItem>
                        <SelectItem value="graduated">{t('admin.studentsPage.graduated')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right col-span-1">{t('admin.studentsPage.agent')}</label>
                    <Input 
                      name="agentName" 
                      value={newStudent.agentName || ''} 
                      onChange={handleInputChange} 
                      className="col-span-3" 
                    />
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
        
        <div className="rounded-md border shadow-sm">
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
              {isLoading ? (
                <TableSkeleton columns={9} rows={itemsPerPage} />
              ) : currentItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center h-40 text-unlimited-gray">
                    {t('admin.studentsPage.noData')}
                  </TableCell>
                </TableRow>
              ) : (
                currentItems.map((student) => (
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
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleViewStudent(student)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleOpenEditDialog(student)}
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
                            <DropdownMenuLabel>{student.name}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleViewStudent(student)}>
                              <Eye className="h-4 w-4 mr-2" />
                              {t('admin.actions.view')}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleOpenEditDialog(student)}>
                              <Edit className="h-4 w-4 mr-2" />
                              {t('admin.actions.edit')}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-unlimited-danger focus:text-unlimited-danger"
                              onClick={() => handleOpenDeleteDialog(student)}
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
          {filteredStudents.length > itemsPerPage && (
            <div className="py-4 flex justify-center">
              <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>

      {/* View Student Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t('admin.studentsPage.viewStudentDetails')}</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-unlimited-gray">{t('admin.studentsPage.tableHeaders.id')}</p>
                  <p className="font-medium">{selectedStudent.id}</p>
                </div>
                <div>
                  <p className="text-sm text-unlimited-gray">{t('admin.studentsPage.tableHeaders.name')}</p>
                  <p className="font-medium">{selectedStudent.name}</p>
                </div>
                <div>
                  <p className="text-sm text-unlimited-gray">{t('admin.studentsPage.tableHeaders.email')}</p>
                  <p className="font-medium">{selectedStudent.email}</p>
                </div>
                <div>
                  <p className="text-sm text-unlimited-gray">{t('admin.studentsPage.tableHeaders.phone')}</p>
                  <p className="font-medium">{selectedStudent.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-unlimited-gray">{t('admin.studentsPage.tableHeaders.nationality')}</p>
                  <p className="font-medium">{selectedStudent.nationality}</p>
                </div>
                <div>
                  <p className="text-sm text-unlimited-gray">{t('admin.studentsPage.tableHeaders.program')}</p>
                  <p className="font-medium">{selectedStudent.program}</p>
                </div>
                <div>
                  <p className="text-sm text-unlimited-gray">{t('admin.studentsPage.tableHeaders.university')}</p>
                  <p className="font-medium">{selectedStudent.university}</p>
                </div>
                <div>
                  <p className="text-sm text-unlimited-gray">{t('admin.studentsPage.tableHeaders.status')}</p>
                  <Badge className={statusConfig[selectedStudent.status].color}>
                    {statusConfig[selectedStudent.status].label}
                  </Badge>
                </div>
                {selectedStudent.agentName && (
                  <div className="col-span-2">
                    <p className="text-sm text-unlimited-gray">{t('admin.studentsPage.agent')}</p>
                    <p className="font-medium">{selectedStudent.agentName}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>
              {t('admin.actions.close')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t('admin.studentsPage.editStudent')}</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right col-span-1">{t('admin.studentsPage.tableHeaders.name')}</label>
                <Input 
                  name="name" 
                  value={selectedStudent.name} 
                  onChange={handleInputChange} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right col-span-1">{t('admin.studentsPage.tableHeaders.email')}</label>
                <Input 
                  name="email" 
                  type="email" 
                  value={selectedStudent.email} 
                  onChange={handleInputChange} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right col-span-1">{t('admin.studentsPage.tableHeaders.phone')}</label>
                <Input 
                  name="phone" 
                  value={selectedStudent.phone} 
                  onChange={handleInputChange} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right col-span-1">{t('admin.studentsPage.tableHeaders.nationality')}</label>
                <Select 
                  value={selectedStudent.nationality} 
                  onValueChange={(value) => handleSelectChange("nationality", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder={t('admin.studentsPage.tableHeaders.nationality')} />
                  </SelectTrigger>
                  <SelectContent>
                    {nationalities.map((nationality) => (
                      <SelectItem key={nationality} value={nationality}>{nationality}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right col-span-1">{t('admin.studentsPage.tableHeaders.program')}</label>
                <Input 
                  name="program" 
                  value={selectedStudent.program} 
                  onChange={handleInputChange} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right col-span-1">{t('admin.studentsPage.tableHeaders.university')}</label>
                <Input 
                  name="university" 
                  value={selectedStudent.university} 
                  onChange={handleInputChange} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right col-span-1">{t('admin.studentsPage.status')}</label>
                <Select 
                  value={selectedStudent.status} 
                  onValueChange={(value) => handleSelectChange("status", value as 'active' | 'inactive' | 'pending' | 'graduated')}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder={t('admin.studentsPage.status')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">{t('admin.studentsPage.active')}</SelectItem>
                    <SelectItem value="inactive">{t('admin.studentsPage.inactive')}</SelectItem>
                    <SelectItem value="pending">{t('admin.studentsPage.pending')}</SelectItem>
                    <SelectItem value="graduated">{t('admin.studentsPage.graduated')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right col-span-1">{t('admin.studentsPage.agent')}</label>
                <Input 
                  name="agentName" 
                  value={selectedStudent.agentName || ''} 
                  onChange={handleInputChange} 
                  className="col-span-3" 
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={handleEditStudent}>
              <CheckCircle className="h-4 w-4 mr-2" />
              {t('admin.studentsPage.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('admin.actions.confirmDelete')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('admin.actions.deleteConfirmMessage')} "{selectedStudent?.name}"؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('admin.actions.cancel')}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteStudent}
              className="bg-unlimited-danger hover:bg-unlimited-danger/90"
            >
              {t('admin.actions.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default ManageStudents;
