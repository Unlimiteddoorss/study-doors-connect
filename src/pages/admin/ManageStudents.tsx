import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { useTableFilters } from '@/hooks/admin/useTableFilters';
import { FilterableTable } from '@/components/admin/FilterableTable';
import { StudentFilters } from '@/components/admin/students/StudentFilters';
import { StudentActions } from '@/components/admin/students/StudentActions';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { Download, Edit, Eye, Search, Upload, MoreHorizontal, Plus, Trash, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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

const statusConfig = {
  active: { label: 'Active', color: 'bg-green-500 text-white' },
  inactive: { label: 'Inactive', color: 'bg-gray-500 text-white' },
  pending: { label: 'Pending', color: 'bg-yellow-500 text-white' },
  graduated: { label: 'Graduated', color: 'bg-blue-500 text-white' },
};

const ManageStudents = () => {
  const [students, setStudents] = useState<Student[]>(dummyStudents);
  const [isLoading, setIsLoading] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { toast } = useToast();
  const { t } = useTranslation();
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: '',
    email: '',
    phone: '',
    nationality: '',
    program: '',
    university: '',
    status: 'pending'
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

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
    // Here you would implement the actual export logic
    const csvContent = students.map(student => 
      Object.values(student).join(',')
    ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: t('admin.toasts.exportSuccess'),
      description: t('admin.toasts.exportSuccessDesc'),
    });
  };

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

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-unlimited-dark-blue">
            {t('admin.studentsPage.title')}
          </h2>
          
          <StudentActions
            onImport={handleImportStudents}
            onExport={handleExportStudents}
            isImportDialogOpen={isImportDialogOpen}
            setIsImportDialogOpen={setIsImportDialogOpen}
            setIsAddDialogOpen={setIsAddDialogOpen}
          />
        </div>
        
        <StudentFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filters={filters}
          setFilters={setFilters}
          nationalities={nationalities}
        />

        <FilterableTable
          data={filteredStudents}
          isLoading={isLoading}
          onViewDetails={handleViewStudent}
          onEdit={handleOpenEditDialog}
          onDelete={handleOpenDeleteDialog}
          columns={[
            { header: t('admin.studentsPage.tableHeaders.id'), accessor: 'id' },
            { header: t('admin.studentsPage.tableHeaders.name'), accessor: 'name' },
            { header: t('admin.studentsPage.tableHeaders.email'), accessor: 'email', hideOnMobile: true },
            { header: t('admin.studentsPage.tableHeaders.phone'), accessor: 'phone', hideOnMobile: true },
            { header: t('admin.studentsPage.tableHeaders.nationality'), accessor: 'nationality', hideOnMobile: true },
            { header: t('admin.studentsPage.tableHeaders.program'), accessor: 'program', hideOnMobile: true },
            { header: t('admin.studentsPage.tableHeaders.university'), accessor: 'university', hideOnMobile: true },
            { 
              header: t('admin.studentsPage.tableHeaders.status'), 
              accessor: 'status',
              render: (status) => (
                <Badge className={statusConfig[status].color}>
                  {t(`admin.studentsPage.${status}`)}
                </Badge>
              )
            }
          ]}
        />
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
                    {t(`admin.studentsPage.${selectedStudent.status}`)}
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
