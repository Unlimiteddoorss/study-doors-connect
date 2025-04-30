
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FilterableTable } from '@/components/admin/FilterableTable';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Search, Filter, Edit, Eye, Trash2, Building, GraduationCap } from 'lucide-react';

const ManageUniversities = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const { toast } = useToast();

  // Mock data for universities
  const [universities, setUniversities] = useState([
    {
      id: 1,
      name: "جامعة الملك سعود",
      name_ar: "جامعة الملك سعود",
      country: "المملكة العربية السعودية",
      city: "الرياض",
      foundedYear: 1957,
      website: "https://ksu.edu.sa",
      isActive: true,
      programsCount: 25,
      image_url: "https://example.com/ksu.png"
    },
    {
      id: 2,
      name: "Istanbul Technical University",
      name_ar: "جامعة إسطنبول التقنية",
      country: "تركيا",
      city: "إسطنبول",
      foundedYear: 1773,
      website: "https://www.itu.edu.tr",
      isActive: true,
      programsCount: 18,
      image_url: "https://example.com/itu.png"
    },
    {
      id: 3,
      name: "Cairo University",
      name_ar: "جامعة القاهرة",
      country: "مصر",
      city: "القاهرة",
      foundedYear: 1908,
      website: "https://cu.edu.eg",
      isActive: false,
      programsCount: 12,
      image_url: "https://example.com/cairo-uni.png"
    },
  ]);

  // Filter universities based on search and filters
  const filteredUniversities = universities.filter((university) => {
    const matchesSearch =
      university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.name_ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCountry = countryFilter === "all" || university.country === countryFilter;

    return matchesSearch && matchesCountry;
  });

  // Extract unique countries for filter
  const countries = [...new Set(universities.map((uni) => uni.country))];

  // Handlers
  const handleAddUniversity = () => {
    setIsAddDialogOpen(true);
  };

  const handleSaveNewUniversity = (formData) => {
    // Here you would typically make an API call to add the university
    const newUniversity = {
      id: universities.length + 1,
      ...formData,
      programsCount: 0,
      isActive: true
    };
    
    setUniversities([...universities, newUniversity]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "تمت الإضافة بنجاح",
      description: `تمت إضافة ${formData.name_ar} إلى قائمة الجامعات`,
    });
  };

  const handleEditUniversity = (university) => {
    setSelectedUniversity(university);
    setIsEditDialogOpen(true);
  };

  const handleSaveEditedUniversity = (formData) => {
    // Here you would typically make an API call to update the university
    const updatedUniversities = universities.map((uni) =>
      uni.id === selectedUniversity.id ? { ...uni, ...formData } : uni
    );
    
    setUniversities(updatedUniversities);
    setIsEditDialogOpen(false);
    
    toast({
      title: "تم التحديث بنجاح",
      description: `تم تحديث بيانات ${formData.name_ar}`,
    });
  };

  const handleDeleteUniversity = (university) => {
    // Here you would typically confirm before deletion
    const updatedUniversities = universities.filter((uni) => uni.id !== university.id);
    setUniversities(updatedUniversities);
    
    toast({
      title: "تم الحذف بنجاح",
      description: `تم حذف ${university.name_ar} من قائمة الجامعات`,
    });
  };

  const handleViewUniversityPrograms = (university) => {
    // Navigate to view university programs
    console.log("View programs for:", university.name);
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-unlimited-dark-blue">إدارة الجامعات</h1>
          <Button onClick={handleAddUniversity} className="gap-2">
            <PlusCircle className="h-4 w-4" />
            إضافة جامعة
          </Button>
        </div>

        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-unlimited-gray" />
              <Input
                placeholder="بحث باسم الجامعة أو المدينة"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="فلترة حسب الدولة" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الدول</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <FilterableTable
            data={filteredUniversities}
            isLoading={isLoading}
            columns={[
              {
                header: "",
                accessor: "image_url",
                render: (image_url, university) => (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {image_url ? (
                      <img src={image_url} alt={university.name} className="w-full h-full object-cover" />
                    ) : (
                      <Building className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                ),
              },
              { header: "الاسم (عربي)", accessor: "name_ar" },
              { header: "الاسم (إنجليزي)", accessor: "name", hideOnMobile: true },
              { header: "الدولة", accessor: "country" },
              { header: "المدينة", accessor: "city" },
              { header: "سنة التأسيس", accessor: "foundedYear", hideOnMobile: true },
              {
                header: "البرامج",
                accessor: "programsCount",
                render: (count) => <span>{count}</span>,
              },
              {
                header: "الحالة",
                accessor: "isActive",
                render: (isActive) => (
                  <Badge className={isActive ? "bg-green-500 text-white" : "bg-gray-500 text-white"}>
                    {isActive ? "نشطة" : "غير نشطة"}
                  </Badge>
                ),
              },
            ]}
            actions={(university) => [
              {
                icon: <GraduationCap className="h-4 w-4" />,
                label: "البرامج",
                onClick: () => handleViewUniversityPrograms(university),
              },
              {
                icon: <Edit className="h-4 w-4" />,
                label: "تعديل",
                onClick: () => handleEditUniversity(university),
              },
              {
                icon: <Trash2 className="h-4 w-4" />,
                label: "حذف",
                onClick: () => handleDeleteUniversity(university),
                destructive: true,
              },
            ]}
          />
        </Card>

        {/* Add University Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>إضافة جامعة جديدة</DialogTitle>
              <DialogDescription>أدخل بيانات الجامعة الجديدة.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name_ar" className="text-right">الاسم (عربي)</Label>
                  <Input id="name_ar" className="col-span-3" placeholder="أدخل اسم الجامعة بالعربية" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">الاسم (إنجليزي)</Label>
                  <Input id="name" className="col-span-3" placeholder="أدخل اسم الجامعة بالإنجليزية" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="country" className="text-right">الدولة</Label>
                  <Input id="country" className="col-span-3" placeholder="أدخل اسم الدولة" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="city" className="text-right">المدينة</Label>
                  <Input id="city" className="col-span-3" placeholder="أدخل اسم المدينة" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="foundedYear" className="text-right">سنة التأسيس</Label>
                  <Input id="foundedYear" type="number" className="col-span-3" placeholder="أدخل سنة التأسيس" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="website" className="text-right">الموقع الإلكتروني</Label>
                  <Input id="website" className="col-span-3" placeholder="أدخل الموقع الإلكتروني" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-5 items-center gap-4">
                  <Label htmlFor="description_ar" className="text-right">وصف الجامعة</Label>
                  <Textarea id="description_ar" className="col-span-4" placeholder="أدخل وصف الجامعة بالعربية" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>إلغاء</Button>
              <Button onClick={() => {
                handleSaveNewUniversity({
                  name: "اسم الجامعة باللغة الإنجليزية",
                  name_ar: "اسم الجامعة باللغة العربية",
                  country: "الدولة",
                  city: "المدينة",
                  foundedYear: 2000,
                  website: "https://example.com",
                });
              }}>حفظ</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit University Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>تعديل بيانات الجامعة</DialogTitle>
              <DialogDescription>
                {selectedUniversity && `تعديل بيانات ${selectedUniversity.name_ar}`}
              </DialogDescription>
            </DialogHeader>
            {selectedUniversity && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit_name_ar" className="text-right">الاسم (عربي)</Label>
                    <Input id="edit_name_ar" className="col-span-3" defaultValue={selectedUniversity.name_ar} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit_name" className="text-right">الاسم (إنجليزي)</Label>
                    <Input id="edit_name" className="col-span-3" defaultValue={selectedUniversity.name} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit_country" className="text-right">الدولة</Label>
                    <Input id="edit_country" className="col-span-3" defaultValue={selectedUniversity.country} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit_city" className="text-right">المدينة</Label>
                    <Input id="edit_city" className="col-span-3" defaultValue={selectedUniversity.city} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit_foundedYear" className="text-right">سنة التأسيس</Label>
                    <Input id="edit_foundedYear" type="number" className="col-span-3" defaultValue={selectedUniversity.foundedYear} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit_website" className="text-right">الموقع الإلكتروني</Label>
                    <Input id="edit_website" className="col-span-3" defaultValue={selectedUniversity.website} />
                  </div>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="edit_isActive" className="text-right">الحالة</Label>
                  <Select defaultValue={selectedUniversity.isActive ? "true" : "false"}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">نشطة</SelectItem>
                      <SelectItem value="false">غير نشطة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>إلغاء</Button>
              <Button onClick={() => handleSaveEditedUniversity(selectedUniversity)}>حفظ التغييرات</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ManageUniversities;
