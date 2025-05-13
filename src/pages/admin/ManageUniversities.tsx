
import { useState } from 'react';
import { Building, CheckCircle, Download, Edit, Eye, MoreHorizontal, Search, Trash, Upload, Loader2, Grid, List, BookOpen, Users } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormDialog } from '@/components/admin/FormDialog';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { AdminPageActions } from '@/components/admin/AdminPageActions';
import { AnimatePresence } from 'framer-motion';
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
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { useTableFilters } from '@/hooks/admin/useTableFilters';
import { TablePagination } from '@/components/admin/TablePagination';
import { TableSkeleton } from '@/components/admin/TableSkeleton';
import { useAdminActions } from '@/hooks/admin/useAdminActions';

// استيراد المكونات الجديدة
import { UniversityQuickView } from '@/components/admin/universities/UniversityQuickView';
import { UniversitiesGridView } from '@/components/admin/universities/UniversitiesGridView';
import { UniversityStatsCard } from '@/components/admin/universities/UniversityStatsCard';

interface University {
  id: string;
  nameAr: string;
  nameEn: string;
  country: string;
  city: string;
  type: string;
  programsCount: number;
  studentsCount: number;
  ranking: number;
  status: 'active' | 'inactive';
}

// بيانات تجريبية أكثر للعرض
const dummyUniversities: University[] = [
  {
    id: "UNI001",
    nameAr: "جامعة الملك سعود",
    nameEn: "King Saud University",
    country: "المملكة العربية السعودية",
    city: "الرياض",
    type: "Public",
    programsCount: 150,
    studentsCount: 5000,
    ranking: 200,
    status: "active"
  },
  {
    id: "UNI002",
    nameAr: "جامعة الملك عبدالعزيز",
    nameEn: "King Abdulaziz University",
    country: "المملكة العربية السعودية",
    city: "جدة",
    type: "Public",
    programsCount: 120,
    studentsCount: 4500,
    ranking: 250,
    status: "active"
  },
  {
    id: "UNI003",
    nameAr: "جامعة إسطنبول",
    nameEn: "Istanbul University",
    country: "تركيا",
    city: "إسطنبول",
    type: "Public",
    programsCount: 180,
    studentsCount: 7000,
    ranking: 500,
    status: "active"
  },
  {
    id: "UNI004",
    nameAr: "الجامعة الأمريكية في بيروت",
    nameEn: "American University of Beirut",
    country: "لبنان",
    city: "بيروت",
    type: "Private",
    programsCount: 90,
    studentsCount: 3500,
    ranking: 300,
    status: "active"
  },
  {
    id: "UNI005",
    nameAr: "جامعة قطر",
    nameEn: "Qatar University",
    country: "قطر",
    city: "الدوحة",
    type: "Public",
    programsCount: 85,
    studentsCount: 3000,
    ranking: 350,
    status: "active"
  },
  {
    id: "UNI006",
    nameAr: "جامعة القاهرة",
    nameEn: "Cairo University",
    country: "مصر",
    city: "القاهرة",
    type: "Public",
    programsCount: 110,
    studentsCount: 5500,
    ranking: 420,
    status: "active"
  },
  {
    id: "UNI007",
    nameAr: "جامعة الشارقة",
    nameEn: "University of Sharjah",
    country: "الإمارات العربية المتحدة",
    city: "الشارقة",
    type: "Private",
    programsCount: 75,
    studentsCount: 2800,
    ranking: 650,
    status: "active"
  },
  {
    id: "UNI008",
    nameAr: "جامعة بيلكنت",
    nameEn: "Bilkent University",
    country: "تركيا",
    city: "أنقرة",
    type: "Private",
    programsCount: 65,
    studentsCount: 2500,
    ranking: 550,
    status: "inactive"
  }
];

const itemsPerPage = 8;

const ManageUniversities = () => {
  const [universities, setUniversities] = useState<University[]>(dummyUniversities);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [selectedUniversityId, setSelectedUniversityId] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { toast } = useToast();
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
    filteredItems: filteredUniversities
  } = useTableFilters(
    universities,
    ['nameAr', 'nameEn', 'country'],
    [
      { field: 'country', defaultValue: 'all' },
      { field: 'status', defaultValue: 'all' },
      { field: 'type', defaultValue: 'all' }
    ]
  );

  const countries = Array.from(new Set(universities.map(university => university.country)));
  
  // حساب الإحصائيات لعرضها
  const totalUniversities = universities.length;
  const activeUniversities = universities.filter(u => u.status === 'active').length;
  const publicUniversities = universities.filter(u => u.type === 'Public').length;
  const privateUniversities = universities.filter(u => u.type === 'Private').length;
  const totalStudents = universities.reduce((sum, u) => sum + u.studentsCount, 0);
  const totalPrograms = universities.reduce((sum, u) => sum + u.programsCount, 0);

  const handleAddUniversity = () => {
    handleAction(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        // Add university logic would go here
      },
      {
        successMessage: t('admin.toasts.addSuccess'),
        onSuccess: () => setIsAddDialogOpen(false)
      }
    );
  };

  const handleImportUniversities = () => {
    handleAction(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        // Import universities logic would go here
      },
      {
        successMessage: t('admin.toasts.importSuccess'),
        onSuccess: () => setIsImportDialogOpen(false)
      }
    );
  };

  const handleExportUniversities = () => {
    handleAction(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        // Export universities logic would go here
      },
      {
        successMessage: t('admin.toasts.exportSuccess')
      }
    );
  };

  const handleDeleteUniversity = (id: string) => {
    setSelectedUniversityId(id);
    const university = universities.find(u => u.id === id);
    
    confirmAction(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setUniversities(universities.filter(u => u.id !== id));
        setIsQuickViewOpen(false); // إغلاق عرض التفاصيل إذا كان مفتوحاً
      },
      {
        successMessage: t('admin.toasts.deleteSuccess')
      }
    );
  };

  const handleEditUniversity = (id: string) => {
    setSelectedUniversityId(id);
    setIsEditDialogOpen(true);
    setIsQuickViewOpen(false); // إغلاق عرض التفاصيل
  };

  const handleViewUniversity = (id: string) => {
    setSelectedUniversityId(id);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
  };

  const toggleUniversityStatus = (id: string) => {
    handleAction(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setUniversities(
          universities.map((university) =>
            university.id === id
              ? {
                  ...university,
                  status: university.status === 'active' ? 'inactive' : 'active',
                }
              : university
          )
        );
      },
      {
        successMessage: t('admin.toasts.statusChange')
      }
    );
  };

  const statusConfig = {
    active: { label: t('admin.universitiesPage.active'), color: 'bg-unlimited-success text-white' },
    inactive: { label: t('admin.universitiesPage.inactive'), color: 'bg-unlimited-gray text-white' },
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(filteredUniversities.length / itemsPerPage);
  const currentItems = filteredUniversities.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  const selectedUniversity = selectedUniversityId ? 
    universities.find(university => university.id === selectedUniversityId) : null;

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-unlimited-dark-blue">{t('admin.universitiesPage.title')}</h2>
          
          <AdminPageActions 
            onAdd={() => setIsAddDialogOpen(true)}
            onImport={() => setIsImportDialogOpen(true)}
            onExport={handleExportUniversities}
            addLabel={t('admin.universitiesPage.addUniversity')}
            importLabel={t('admin.universitiesPage.importUniversities')}
            exportLabel={t('admin.universitiesPage.exportUniversities')}
            isLoading={isActionLoading}
          />
        </div>
        
        {/* بطاقات الإحصائيات */}
        <UniversityStatsCard 
          totalUniversities={totalUniversities}
          activeUniversities={activeUniversities}
          publicUniversities={publicUniversities}
          privateUniversities={privateUniversities}
          totalStudents={totalStudents}
          totalPrograms={totalPrograms}
        />
        
        {/* مرشحات البحث */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
            <Input
              placeholder={t('admin.universitiesPage.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full md:w-[300px]"
            />
          </div>
          
          <div className="flex flex-row gap-2 items-center">
            <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="نوع الجامعة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="Public">حكومية</SelectItem>
                <SelectItem value="Private">خاصة</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filters.country} onValueChange={(value) => setFilters({...filters, country: value})}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('admin.universitiesPage.country')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('admin.universitiesPage.allCountries')}</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('admin.universitiesPage.status')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('admin.universitiesPage.allStatuses')}</SelectItem>
                <SelectItem value="active">{t('admin.universitiesPage.active')}</SelectItem>
                <SelectItem value="inactive">{t('admin.universitiesPage.inactive')}</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="bg-gray-100 rounded-md p-1 flex">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                className="h-9 w-9"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                className="h-9 w-9"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* التبديل بين وضعي العرض: قائمة أو شبكة */}
        <Tabs defaultValue="grid" value={viewMode} onValueChange={(value) => setViewMode(value as 'list' | 'grid')} className="w-full">
          <TabsContent value="grid" className="mt-0">
            <UniversitiesGridView
              universities={currentItems}
              isLoading={isLoading}
              onViewDetails={handleViewUniversity}
              onEdit={handleEditUniversity}
            />
          </TabsContent>
          
          <TabsContent value="list" className="mt-0">
            <div className="rounded-md border shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">{t('admin.universitiesPage.tableHeaders.id')}</TableHead>
                    <TableHead>{t('admin.universitiesPage.tableHeaders.name')}</TableHead>
                    <TableHead className="hidden md:table-cell">{t('admin.universitiesPage.tableHeaders.country')}</TableHead>
                    <TableHead className="hidden lg:table-cell">{t('admin.universitiesPage.tableHeaders.city')}</TableHead>
                    <TableHead className="hidden lg:table-cell">{t('admin.universitiesPage.tableHeaders.programsCount')}</TableHead>
                    <TableHead className="hidden md:table-cell">{t('admin.universitiesPage.tableHeaders.studentsCount')}</TableHead>
                    <TableHead className="hidden md:table-cell">{t('admin.universitiesPage.tableHeaders.ranking')}</TableHead>
                    <TableHead>{t('admin.universitiesPage.tableHeaders.status')}</TableHead>
                    <TableHead className="text-left">{t('admin.universitiesPage.tableHeaders.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableSkeleton columns={9} rows={itemsPerPage} />
                  ) : currentItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center h-40 text-unlimited-gray">
                        {t('admin.universitiesPage.noData')}
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentItems.map((university) => (
                      <TableRow key={university.id}>
                        <TableCell className="font-medium">{university.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{university.nameAr}</p>
                            <p className="text-xs text-unlimited-gray">{university.nameEn}</p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{university.country}</TableCell>
                        <TableCell className="hidden lg:table-cell">{university.city}</TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1.5 text-unlimited-blue" />
                            {university.programsCount}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1.5 text-unlimited-blue" />
                            {university.studentsCount}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">#{university.ranking}</TableCell>
                        <TableCell>
                          <Badge className={statusConfig[university.status].color}>
                            {statusConfig[university.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleViewUniversity(university.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleEditUniversity(university.id)}
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
                                <DropdownMenuLabel>{t('admin.universitiesPage.universityOptions')}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => toggleUniversityStatus(university.id)}>
                                  {university.status === 'active' ? 
                                    t('admin.universitiesPage.disableUniversity') : 
                                    t('admin.universitiesPage.enableUniversity')
                                  }
                                </DropdownMenuItem>
                                <DropdownMenuItem>{t('admin.universitiesPage.viewPrograms')}</DropdownMenuItem>
                                <DropdownMenuItem>{t('admin.universitiesPage.viewStudents')}</DropdownMenuItem>
                                <DropdownMenuItem>{t('admin.universitiesPage.visitWebsite')}</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-unlimited-danger focus:text-unlimited-danger"
                                  onClick={() => handleDeleteUniversity(university.id)}
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
          </TabsContent>
        </Tabs>
        
        {filteredUniversities.length > itemsPerPage && (
          <div className="py-4 flex justify-center">
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        <FormDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          title={t('admin.universitiesPage.addNewUniversity')}
          description={t('admin.universitiesPage.addNewUniversityDesc')}
          onSubmit={handleAddUniversity}
          submitLabel={t('admin.studentsPage.save')}
          isLoading={isActionLoading}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right col-span-1">{t('admin.universitiesPage.nameEn')}</label>
            <Input className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right col-span-1">{t('admin.universitiesPage.nameAr')}</label>
            <Input className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right col-span-1">{t('admin.universitiesPage.country')}</label>
            <Input className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right col-span-1">{t('admin.universitiesPage.city')}</label>
            <Input className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right col-span-1">{t('admin.universitiesPage.website')}</label>
            <Input type="url" className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right col-span-1">{t('admin.universitiesPage.ranking')}</label>
            <Input type="number" className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right col-span-1">{t('admin.universitiesPage.universityLogo')}</label>
            <div className="col-span-3">
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  {t('admin.studentsPage.chooseFile')}
                </Button>
              </div>
            </div>
          </div>
        </FormDialog>

        <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('admin.universitiesPage.importData')}</DialogTitle>
              <DialogDescription>
                {t('admin.universitiesPage.importDataDesc')}
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
            <div className="flex justify-end">
              <Button 
                type="submit" 
                onClick={handleImportUniversities} 
                disabled={isActionLoading}
              >
                {isActionLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                {t('admin.studentsPage.import')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* QuickView للجامعة */}
        <AnimatePresence>
          {selectedUniversity && isQuickViewOpen && (
            <UniversityQuickView 
              university={selectedUniversity}
              onClose={handleCloseQuickView}
              onEdit={(id) => handleEditUniversity(id)}
            />
          )}
        </AnimatePresence>

        {/* Dialog for editing university */}
        {selectedUniversity && (
          <FormDialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            title={t('admin.universitiesPage.editUniversity')}
            description={t('admin.universitiesPage.editUniversityDesc')}
            onSubmit={() => {
              handleAction(
                async () => {
                  // Simulate API call
                  await new Promise(resolve => setTimeout(resolve, 800));
                  // Edit university logic would go here
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
              <label className="text-right col-span-1">{t('admin.universitiesPage.nameEn')}</label>
              <Input className="col-span-3" defaultValue={selectedUniversity.nameEn} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right col-span-1">{t('admin.universitiesPage.nameAr')}</label>
              <Input className="col-span-3" defaultValue={selectedUniversity.nameAr} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right col-span-1">{t('admin.universitiesPage.country')}</label>
              <Input className="col-span-3" defaultValue={selectedUniversity.country} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right col-span-1">{t('admin.universitiesPage.city')}</label>
              <Input className="col-span-3" defaultValue={selectedUniversity.city} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right col-span-1">{t('admin.universitiesPage.type')}</label>
              <Select defaultValue={selectedUniversity.type}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="نوع الجامعة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Public">حكومية</SelectItem>
                  <SelectItem value="Private">خاصة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right col-span-1">{t('admin.universitiesPage.website')}</label>
              <Input type="url" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right col-span-1">{t('admin.universitiesPage.ranking')}</label>
              <Input type="number" className="col-span-3" defaultValue={selectedUniversity.ranking} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right col-span-1">{t('admin.universitiesPage.universityLogo')}</label>
              <div className="col-span-3">
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    {t('admin.studentsPage.chooseFile')}
                  </Button>
                </div>
              </div>
            </div>
          </FormDialog>
        )}

        {/* Confirmation Dialog */}
        <ConfirmDialog
          isOpen={isConfirmDialogOpen}
          onClose={cancelConfirmAction}
          onConfirm={executePendingAction}
          title={t('admin.universitiesPage.deleteConfirmTitle')}
          description={t('admin.universitiesPage.deleteConfirmDesc')}
          confirmLabel={t('admin.actions.delete')}
          cancelLabel={t('admin.actions.cancel')}
          isLoading={isActionLoading}
        />
      </div>
    </DashboardLayout>
  );
};

export default ManageUniversities;
