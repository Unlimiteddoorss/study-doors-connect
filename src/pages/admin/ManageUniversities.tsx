
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import FilterableTable from '@/components/admin/FilterableTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Search, Filter, PlusCircle, Edit, Trash2, MapPin, ExternalLink, Building, Check, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ManageUniversities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<any>(null);
  const { toast } = useToast();

  // Mock data for universities
  const [universities, setUniversities] = useState([
    {
      id: 1,
      name: 'جامعة الملك سعود',
      name_en: 'King Saud University',
      country: 'المملكة العربية السعودية',
      city: 'الرياض',
      website: 'https://ksu.edu.sa',
      description: 'جامعة سعودية حكومية تأسست عام 1957',
      programs_count: 45,
      image_url: '/images/ksu.jpg',
      is_active: true,
    },
    {
      id: 2,
      name: 'جامعة إسطنبول التقنية',
      name_en: 'Istanbul Technical University',
      country: 'تركيا',
      city: 'إسطنبول',
      website: 'https://itu.edu.tr',
      description: 'جامعة حكومية تركية تأسست عام 1773',
      programs_count: 30,
      image_url: '/images/itu.jpg',
      is_active: true,
    },
    {
      id: 3,
      name: 'جامعة القاهرة',
      name_en: 'Cairo University',
      country: 'مصر',
      city: 'القاهرة',
      website: 'https://cu.edu.eg',
      description: 'جامعة مصرية عريقة تأسست عام 1908',
      programs_count: 35,
      image_url: '/images/cairo-uni.jpg',
      is_active: false,
    },
  ]);

  // Filter universities based on search query and country filter
  const filteredUniversities = universities.filter((university) => {
    const matchesSearch =
      university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCountry = countryFilter === 'all' || university.country === countryFilter;

    return matchesSearch && matchesCountry;
  });

  // Get unique countries for the country filter
  const countries = [...new Set(universities.map((university) => university.country))];

  // Handlers
  const handleAddUniversity = () => {
    setIsDialogOpen(true);
  };

  const handleSaveUniversity = (university: any) => {
    setUniversities([...universities, { ...university, id: universities.length + 1 }]);
    setIsDialogOpen(false);
    toast({
      title: 'تمت الإضافة بنجاح',
      description: `تمت إضافة ${university.name} إلى قائمة الجامعات.`,
    });
  };

  const handleEditUniversity = (university: any) => {
    setSelectedUniversity(university);
    setIsEditDialogOpen(true);
  };

  const handleUpdateUniversity = (university: any) => {
    setUniversities(
      universities.map((uni) => (uni.id === university.id ? { ...university } : uni))
    );
    setIsEditDialogOpen(false);
    toast({
      title: 'تم التحديث بنجاح',
      description: `تم تحديث بيانات ${university.name}.`,
    });
  };

  const handleDeleteUniversity = (university: any) => {
    setUniversities(universities.filter((uni) => uni.id !== university.id));
    toast({
      title: 'تم الحذف بنجاح',
      description: `تم حذف ${university.name} من قائمة الجامعات.`,
    });
  };

  const handleToggleStatus = (university: any) => {
    setUniversities(
      universities.map((uni) =>
        uni.id === university.id ? { ...uni, is_active: !uni.is_active } : uni
      )
    );
    toast({
      title: university.is_active ? 'تم تعطيل الجامعة' : 'تم تفعيل الجامعة',
      description: `تم ${university.is_active ? 'تعطيل' : 'تفعيل'} جامعة ${university.name}.`,
    });
  };

  // Render functions to be used in the table
  const renderImageWithFallback = (value: any) => {
    return (
      <div className="w-10 h-10 relative rounded overflow-hidden bg-gray-100">
        {value ? (
          <img
            src={value}
            alt="University logo"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/images/university-placeholder.svg';
            }}
          />
        ) : (
          <Building className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-unlimited-gray" />
        )}
      </div>
    );
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-unlimited-gray" />
              <Input
                placeholder="بحث باسم الجامعة"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="md:col-span-2">
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
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <FilterableTable
            data={filteredUniversities}
            columns={[
              {
                header: "",
                accessor: "image_url",
                render: (value) => renderImageWithFallback(value)
              },
              { header: "اسم الجامعة", accessor: "name" },
              { header: "الاسم الإنجليزي", accessor: "name_en", hideOnMobile: true },
              { header: "الدولة", accessor: "country" },
              { header: "المدينة", accessor: "city", hideOnMobile: true },
              { header: "عدد البرامج", accessor: "programs_count", hideOnMobile: true },
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
            actions={(university) => [
              {
                icon: <ExternalLink className="h-4 w-4" />,
                label: "زيارة الموقع",
                onClick: () => window.open(university.website, '_blank'),
              },
              {
                icon: university.is_active ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />,
                label: university.is_active ? "تعطيل" : "تفعيل",
                onClick: () => handleToggleStatus(university),
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>إضافة جامعة جديدة</DialogTitle>
              <DialogDescription>أدخل بيانات الجامعة الجديدة.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">اسم الجامعة (بالعربية)</Label>
                  <Input id="name" placeholder="أدخل اسم الجامعة بالعربية" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name_en">اسم الجامعة (بالإنجليزية)</Label>
                  <Input id="name_en" placeholder="أدخل اسم الجامعة بالإنجليزية" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">الدولة</Label>
                  <Input id="country" placeholder="أدخل اسم الدولة" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">المدينة</Label>
                  <Input id="city" placeholder="أدخل اسم المدينة" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">الموقع الإلكتروني</Label>
                <Input id="website" placeholder="https://" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">الوصف</Label>
                <Textarea id="description" placeholder="أدخل وصفاً مختصراً للجامعة" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image_url">رابط الشعار</Label>
                <Input id="image_url" placeholder="أدخل رابط صورة شعار الجامعة" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                إلغاء
              </Button>
              <Button
                onClick={() =>
                  handleSaveUniversity({
                    name: 'جامعة جديدة',
                    name_en: 'New University',
                    country: 'المملكة العربية السعودية',
                    city: 'الرياض',
                    website: 'https://example.com',
                    description: 'وصف الجامعة الجديدة',
                    programs_count: 0,
                    image_url: '',
                    is_active: true,
                  })
                }
              >
                إضافة
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit University Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>تعديل بيانات الجامعة</DialogTitle>
              <DialogDescription>
                {selectedUniversity && `تعديل بيانات ${selectedUniversity.name}`}
              </DialogDescription>
            </DialogHeader>
            {selectedUniversity && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit_name">اسم الجامعة (بالعربية)</Label>
                    <Input id="edit_name" defaultValue={selectedUniversity.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit_name_en">اسم الجامعة (بالإنجليزية)</Label>
                    <Input id="edit_name_en" defaultValue={selectedUniversity.name_en} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit_country">الدولة</Label>
                    <Input id="edit_country" defaultValue={selectedUniversity.country} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit_city">المدينة</Label>
                    <Input id="edit_city" defaultValue={selectedUniversity.city} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit_website">الموقع الإلكتروني</Label>
                  <Input id="edit_website" defaultValue={selectedUniversity.website} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit_description">الوصف</Label>
                  <Textarea id="edit_description" defaultValue={selectedUniversity.description} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit_image_url">رابط الشعار</Label>
                  <Input id="edit_image_url" defaultValue={selectedUniversity.image_url} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit_status">الحالة</Label>
                  <Select defaultValue={selectedUniversity.is_active ? "true" : "false"}>
                    <SelectTrigger id="edit_status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">متاح</SelectItem>
                      <SelectItem value="false">غير متاح</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={() => selectedUniversity && handleUpdateUniversity(selectedUniversity)}>
                حفظ التغييرات
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ManageUniversities;
