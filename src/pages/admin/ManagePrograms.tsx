
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '@/components/layout/DashboardLayout';
import FilterableTable from '@/components/admin/FilterableTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Search, Filter, Edit, Trash2, GraduationCap, Check, X } from 'lucide-react';

const ManagePrograms = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [universityFilter, setUniversityFilter] = useState('all');
  const [degreeFilter, setDegreeFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const { toast } = useToast();

  // Mock data for programs
  const [programs, setPrograms] = useState([
    {
      id: 1,
      name: "Software Engineering",
      name_ar: "هندسة البرمجيات",
      university_id: 1,
      university_name: "جامعة الملك سعود",
      degree_type: "bachelor",
      duration: 4,
      language: "English",
      tuition_fee: 120000,
      quota: 50,
      description: "Bachelor's degree in Software Engineering",
      description_ar: "برنامج بكالوريوس في هندسة البرمجيات",
      is_active: true
    },
    {
      id: 2,
      name: "Medicine",
      name_ar: "الطب البشري",
      university_id: 2,
      university_name: "جامعة إسطنبول التقنية",
      degree_type: "medicine",
      duration: 6,
      language: "Turkish",
      tuition_fee: 200000,
      quota: 30,
      description: "Medicine program with specialization options",
      description_ar: "برنامج الطب البشري مع خيارات التخصص",
      is_active: true
    },
    {
      id: 3,
      name: "Business Administration",
      name_ar: "إدارة الأعمال",
      university_id: 3,
      university_name: "جامعة القاهرة",
      degree_type: "master",
      duration: 2,
      language: "English",
      tuition_fee: 80000,
      quota: 40,
      description: "Master's degree in Business Administration",
      description_ar: "برنامج ماجستير في إدارة الأعمال",
      is_active: false
    },
  ]);

  // Filter programs based on search and filters
  const filteredPrograms = programs.filter((program) => {
    const matchesSearch =
      program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.name_ar.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesUniversity = universityFilter === "all" || program.university_id.toString() === universityFilter;
    const matchesDegree = degreeFilter === "all" || program.degree_type === degreeFilter;

    return matchesSearch && matchesUniversity && matchesDegree;
  });

  // Extract unique universities for filter
  const universities = [...new Set(programs.map((program) => ({ 
    id: program.university_id, 
    name: program.university_name 
  })))];

  // Degree types configuration for UI
  const degreeTypes = {
    bachelor: { label: 'بكالوريوس', value: 'bachelor' },
    master: { label: 'ماجستير', value: 'master' },
    phd: { label: 'دكتوراه', value: 'phd' },
    medicine: { label: 'طب', value: 'medicine' },
    diploma: { label: 'دبلوم', value: 'diploma' },
  };

  // Handlers
  const handleAddProgram = () => {
    setIsAddDialogOpen(true);
  };

  const handleSaveNewProgram = (formData) => {
    // Here you would typically make an API call to add the program
    const newProgram = {
      id: programs.length + 1,
      ...formData,
      is_active: true
    };
    
    setPrograms([...programs, newProgram]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "تمت الإضافة بنجاح",
      description: `تمت إضافة ${formData.name_ar} إلى قائمة البرامج`,
    });
  };

  const handleEditProgram = (program) => {
    setSelectedProgram(program);
    setIsEditDialogOpen(true);
  };

  const handleSaveEditedProgram = (formData) => {
    // Here you would typically make an API call to update the program
    const updatedPrograms = programs.map((prog) =>
      prog.id === selectedProgram.id ? { ...prog, ...formData } : prog
    );
    
    setPrograms(updatedPrograms);
    setIsEditDialogOpen(false);
    
    toast({
      title: "تم التحديث بنجاح",
      description: `تم تحديث بيانات ${formData.name_ar}`,
    });
  };

  const handleDeleteProgram = (program) => {
    // Here you would typically confirm before deletion
    const updatedPrograms = programs.filter((prog) => prog.id !== program.id);
    setPrograms(updatedPrograms);
    
    toast({
      title: "تم الحذف بنجاح",
      description: `تم حذف ${program.name_ar} من قائمة البرامج`,
    });
  };

  const handleToggleProgramStatus = (program) => {
    const updatedPrograms = programs.map((prog) =>
      prog.id === program.id ? { ...prog, is_active: !prog.is_active } : prog
    );
    
    setPrograms(updatedPrograms);
    
    toast({
      title: program.is_active ? "تم تعطيل البرنامج" : "تم تفعيل البرنامج",
      description: `تم ${program.is_active ? "تعطيل" : "تفعيل"} برنامج ${program.name_ar}`,
    });
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-unlimited-dark-blue">إدارة البرامج الدراسية</h1>
          <Button onClick={handleAddProgram} className="gap-2">
            <PlusCircle className="h-4 w-4" />
            إضافة برنامج
          </Button>
        </div>

        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-unlimited-gray" />
              <Input
                placeholder="بحث باسم البرنامج"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={universityFilter} onValueChange={setUniversityFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="فلترة حسب الجامعة" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الجامعات</SelectItem>
                {universities.map((university) => (
                  <SelectItem key={university.id} value={university.id.toString()}>
                    {university.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={degreeFilter} onValueChange={setDegreeFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="فلترة حسب الدرجة العلمية" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الدرجات</SelectItem>
                {Object.values(degreeTypes).map((degree) => (
                  <SelectItem key={degree.value} value={degree.value}>
                    {degree.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <FilterableTable
            data={filteredPrograms}
            isLoading={isLoading}
            columns={[
              { header: "اسم البرنامج (عربي)", accessor: "name_ar" },
              { header: "اسم البرنامج (إنجليزي)", accessor: "name", hideOnMobile: true },
              { header: "الجامعة", accessor: "university_name" },
              { 
                header: "الدرجة العلمية", 
                accessor: "degree_type",
                render: (degree_type) => (
                  <span>{degreeTypes[degree_type]?.label || degree_type}</span>
                )
              },
              { header: "المدة (سنوات)", accessor: "duration" },
              { 
                header: "الرسوم الدراسية", 
                accessor: "tuition_fee",
                render: (fee) => <span>{fee.toLocaleString()} ر.س</span>,
                hideOnMobile: true
              },
              { 
                header: "المقاعد", 
                accessor: "quota",
                hideOnMobile: true
              },
              {
                header: "الحالة",
                accessor: "is_active",
                render: (is_active) => (
                  <Badge className={is_active ? "bg-green-500 text-white" : "bg-gray-500 text-white"}>
                    {is_active ? "متاح" : "غير متاح"}
                  </Badge>
                ),
              },
            ]}
            actions={(program) => [
              {
                icon: program.is_active ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />,
                label: program.is_active ? "تعطيل" : "تفعيل",
                onClick: () => handleToggleProgramStatus(program),
              },
              {
                icon: <Edit className="h-4 w-4" />,
                label: "تعديل",
                onClick: () => handleEditProgram(program),
              },
              {
                icon: <Trash2 className="h-4 w-4" />,
                label: "حذف",
                onClick: () => handleDeleteProgram(program),
                destructive: true,
              },
            ]}
          />
        </Card>

        {/* Add Program Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>إضافة برنامج جديد</DialogTitle>
              <DialogDescription>أدخل بيانات البرنامج الدراسي الجديد.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name_ar" className="text-right">الاسم (عربي)</Label>
                  <Input id="name_ar" className="col-span-3" placeholder="أدخل اسم البرنامج بالعربية" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">الاسم (إنجليزي)</Label>
                  <Input id="name" className="col-span-3" placeholder="أدخل اسم البرنامج بالإنجليزية" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="university_id" className="text-right">الجامعة</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="اختر الجامعة" />
                    </SelectTrigger>
                    <SelectContent>
                      {universities.map((university) => (
                        <SelectItem key={university.id} value={university.id.toString()}>
                          {university.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="degree_type" className="text-right">الدرجة العلمية</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="اختر الدرجة العلمية" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(degreeTypes).map((degree) => (
                        <SelectItem key={degree.value} value={degree.value}>
                          {degree.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">المدة (سنوات)</Label>
                  <Input id="duration" type="number" className="col-span-3" placeholder="أدخل المدة" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tuition_fee" className="text-right">الرسوم</Label>
                  <Input id="tuition_fee" type="number" className="col-span-3" placeholder="أدخل الرسوم الدراسية" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quota" className="text-right">المقاعد</Label>
                  <Input id="quota" type="number" className="col-span-3" placeholder="أدخل عدد المقاعد" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-5 items-center gap-4">
                  <Label htmlFor="language" className="text-right">لغة الدراسة</Label>
                  <Select>
                    <SelectTrigger className="col-span-4">
                      <SelectValue placeholder="اختر لغة الدراسة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Arabic">العربية</SelectItem>
                      <SelectItem value="English">الإنجليزية</SelectItem>
                      <SelectItem value="Turkish">التركية</SelectItem>
                      <SelectItem value="French">الفرنسية</SelectItem>
                      <SelectItem value="German">الألمانية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-5 items-center gap-4">
                  <Label htmlFor="description_ar" className="text-right">وصف البرنامج</Label>
                  <Textarea id="description_ar" className="col-span-4" placeholder="أدخل وصف البرنامج بالعربية" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>إلغاء</Button>
              <Button onClick={() => {
                handleSaveNewProgram({
                  name: "Program Name",
                  name_ar: "اسم البرنامج",
                  university_id: 1,
                  university_name: "جامعة الملك سعود",
                  degree_type: "bachelor",
                  duration: 4,
                  language: "English",
                  tuition_fee: 100000,
                  quota: 40,
                  description: "Program description",
                  description_ar: "وصف البرنامج",
                });
              }}>حفظ</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Program Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>تعديل بيانات البرنامج</DialogTitle>
              <DialogDescription>
                {selectedProgram && `تعديل بيانات ${selectedProgram.name_ar}`}
              </DialogDescription>
            </DialogHeader>
            {selectedProgram && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit_name_ar" className="text-right">الاسم (عربي)</Label>
                    <Input id="edit_name_ar" className="col-span-3" defaultValue={selectedProgram.name_ar} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit_name" className="text-right">الاسم (إنجليزي)</Label>
                    <Input id="edit_name" className="col-span-3" defaultValue={selectedProgram.name} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit_university_id" className="text-right">الجامعة</Label>
                    <Select defaultValue={selectedProgram.university_id.toString()}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {universities.map((university) => (
                          <SelectItem key={university.id} value={university.id.toString()}>
                            {university.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit_degree_type" className="text-right">الدرجة العلمية</Label>
                    <Select defaultValue={selectedProgram.degree_type}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(degreeTypes).map((degree) => (
                          <SelectItem key={degree.value} value={degree.value}>
                            {degree.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit_duration" className="text-right">المدة</Label>
                    <Input id="edit_duration" type="number" className="col-span-3" defaultValue={selectedProgram.duration} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit_tuition_fee" className="text-right">الرسوم</Label>
                    <Input id="edit_tuition_fee" type="number" className="col-span-3" defaultValue={selectedProgram.tuition_fee} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit_quota" className="text-right">المقاعد</Label>
                    <Input id="edit_quota" type="number" className="col-span-3" defaultValue={selectedProgram.quota} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit_language" className="text-right">لغة الدراسة</Label>
                    <Input id="edit_language" className="col-span-3" defaultValue={selectedProgram.language} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit_is_active" className="text-right">الحالة</Label>
                    <Select defaultValue={selectedProgram.is_active ? "true" : "false"}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">متاح</SelectItem>
                        <SelectItem value="false">غير متاح</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>إلغاء</Button>
              <Button onClick={() => handleSaveEditedProgram(selectedProgram)}>حفظ التغييرات</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ManagePrograms;
