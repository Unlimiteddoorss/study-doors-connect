
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, BarChart, LineChart, PieChart } from "@/components/ui/chart";
import { RecentApplications } from "@/components/admin/RecentApplications";
import { PendingTasks } from "@/components/admin/PendingTasks";
import { useTranslation } from 'react-i18next';
import { 
  Building, 
  BookOpen, 
  Users, 
  FileText, 
  School, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  Loader2,
  RefreshCw 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

// Import our new components
import QuickActionsPanel from '@/components/admin/QuickActionsPanel';
import NotificationCenter from '@/components/admin/NotificationCenter';
import AnimatedStatCard from '@/components/admin/AnimatedStatCard';
import ExpandableDataTable from '@/components/admin/ExpandableDataTable';

const AdminDashboard = () => {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [isDataLoading, setIsDataLoading] = useState(false);

  // Demo data for expanded data table
  const recentActivitiesData = [
    {
      id: '1',
      type: 'طلب جديد',
      user: 'أحمد محمد',
      timestamp: 'منذ 10 دقائق',
      status: 'قيد المعالجة',
      details: {
        universityName: 'جامعة الملك سعود',
        program: 'هندسة البرمجيات',
        submissionDate: '2023-05-12',
        documents: ['جواز السفر', 'الشهادة الثانوية', 'توصية']
      }
    },
    {
      id: '2',
      type: 'تسجيل مستخدم',
      user: 'سارة علي',
      timestamp: 'منذ 45 دقيقة',
      status: 'مكتمل',
      details: {
        email: 'sara@example.com',
        phone: '+966 50 123 4567',
        accountType: 'طالب',
        countries: ['المملكة العربية السعودية', 'الإمارات العربية المتحدة']
      }
    },
    {
      id: '3',
      type: 'تحديث بيانات',
      user: 'محمد خالد',
      timestamp: 'منذ 2 ساعة',
      status: 'مكتمل',
      details: {
        updatedFields: ['العنوان', 'رقم الهاتف', 'البريد الإلكتروني'],
        verificationStatus: 'موثّق',
        lastLogin: '2023-05-11 14:30'
      }
    }
  ];
  
  const recentActivitiesColumns = [
    { header: 'النوع', accessorKey: 'type' },
    { header: 'المستخدم', accessorKey: 'user' },
    { header: 'الوقت', accessorKey: 'timestamp' },
    {
      header: 'الحالة', 
      accessorKey: 'status',
      cell: (value: string) => {
        let bgColor = 'bg-gray-100 text-gray-800';
        if (value === 'قيد المعالجة') bgColor = 'bg-yellow-100 text-yellow-800';
        if (value === 'مكتمل') bgColor = 'bg-green-100 text-green-800';
        if (value === 'ملغي') bgColor = 'bg-red-100 text-red-800';
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
            {value}
          </span>
        );
      }
    }
  ];

  const applicationData = {
    daily: [
      { name: "الأحد", total: 12 },
      { name: "الاثنين", total: 18 },
      { name: "الثلاثاء", total: 15 },
      { name: "الأربعاء", total: 21 },
      { name: "الخميس", total: 19 },
      { name: "الجمعة", total: 8 },
      { name: "السبت", total: 10 },
    ],
    weekly: [
      { name: "الأسبوع 1", total: 45 },
      { name: "الأسبوع 2", total: 62 },
      { name: "الأسبوع 3", total: 58 },
      { name: "الأسبوع 4", total: 71 },
    ],
    monthly: [
      { name: "يناير", total: 180 },
      { name: "فبراير", total: 220 },
      { name: "مارس", total: 195 },
      { name: "أبريل", total: 202 },
      { name: "مايو", total: 240 },
      { name: "يونيو", total: 252 },
      { name: "يوليو", total: 210 },
      { name: "أغسطس", total: 232 },
      { name: "سبتمبر", total: 259 },
      { name: "أكتوبر", total: 290 },
      { name: "نوفمبر", total: 310 },
      { name: "ديسمبر", total: 0 },
    ],
  };

  const applicationsDistribution = [
    { name: "الهندسة", value: 35 },
    { name: "الطب", value: 22 },
    { name: "إدارة الأعمال", value: 18 },
    { name: "العلوم", value: 12 },
    { name: "تقنية المعلومات", value: 8 },
    { name: "أخرى", value: 5 },
  ];

  const applicationsByCountry = [
    { name: "المملكة المتحدة", total: 18 },
    { name: "الولايات المتحدة", total: 15 },
    { name: "كندا", total: 12 },
    { name: "أستراليا", total: 10 },
    { name: "ألمانيا", total: 8 },
    { name: "فرنسا", total: 6 },
    { name: "إسبانيا", total: 5 },
    { name: "إيطاليا", total: 4 },
    { name: "تركيا", total: 3 },
    { name: "ماليزيا", total: 2 },
  ];

  const refreshData = () => {
    setIsDataLoading(true);
    setTimeout(() => {
      setIsDataLoading(false);
    }, 1500);
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Stats with animated cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedStatCard
            title="إجمالي الطلاب"
            value="8,249"
            description="زيادة 12% عن الشهر الماضي"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            gradientFrom="unlimited-blue-500"
            gradientTo="unlimited-blue-700"
          />
          <AnimatedStatCard
            title="الطلبات الجديدة"
            value="184"
            description="هذا الأسبوع"
            icon={FileText}
            trend={{ value: 8, isPositive: true }}
            gradientFrom="unlimited-success-500"
            gradientTo="unlimited-success-700"
          />
          <AnimatedStatCard
            title="الجامعات"
            value="46"
            description="6 جامعات جديدة هذا الشهر"
            icon={School}
            trend={{ value: 15, isPositive: true }}
            gradientFrom="unlimited-warning-500"
            gradientTo="unlimited-warning-700"
          />
          <AnimatedStatCard
            title="البرامج الدراسية"
            value="329"
            description="إضافة 24 برنامج جديد"
            icon={BookOpen}
            trend={{ value: 9, isPositive: true }}
            gradientFrom="unlimited-dark-blue-500"
            gradientTo="unlimited-dark-blue-700"
          />
        </div>

        {/* Quick actions panel */}
        <QuickActionsPanel className="animate-fade-in" />

        {/* Statistics tabs with refreshable data */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-unlimited-dark-blue">لوحة التحليلات</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={refreshData}
            disabled={isDataLoading}
          >
            {isDataLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            تحديث البيانات
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <div className="overflow-x-auto">
            <TabsList>
              <TabsTrigger value="overview">{isRtl ? "نظرة عامة" : "Overview"}</TabsTrigger>
              <TabsTrigger value="analytics">{isRtl ? "التحليلات" : "Analytics"}</TabsTrigger>
              <TabsTrigger value="activities">{isRtl ? "الأنشطة" : "Activities"}</TabsTrigger>
              <TabsTrigger value="tasks">{isRtl ? "المهام" : "Tasks"}</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{isRtl ? "الطلبات الجديدة" : "New Applications"}</CardTitle>
                  <div className={`flex space-x-2 ${isRtl ? 'space-x-reverse' : ''}`}>
                    <button
                      onClick={() => setPeriod('daily')}
                      className={`px-2 py-1 text-xs rounded ${period === 'daily' ? 'bg-unlimited-blue text-white' : 'bg-gray-100'}`}
                    >
                      {isRtl ? "يومي" : "Daily"}
                    </button>
                    <button
                      onClick={() => setPeriod('weekly')}
                      className={`px-2 py-1 text-xs rounded ${period === 'weekly' ? 'bg-unlimited-blue text-white' : 'bg-gray-100'}`}
                    >
                      {isRtl ? "أسبوعي" : "Weekly"}
                    </button>
                    <button
                      onClick={() => setPeriod('monthly')}
                      className={`px-2 py-1 text-xs rounded ${period === 'monthly' ? 'bg-unlimited-blue text-white' : 'bg-gray-100'}`}
                    >
                      {isRtl ? "شهري" : "Monthly"}
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <AreaChart
                    data={applicationData[period]}
                    index="name"
                    categories={["total"]}
                    colors={["blue"]}
                    valueFormatter={(value: number) => isRtl ? `${value} طلب` : `${value} applications`}
                    className="aspect-[4/3]"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    {isRtl ? "توزيع الطلبات حسب التخصص" : "Applications by Specialization"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChart
                    data={applicationsDistribution}
                    index="name"
                    category="value"
                    valueFormatter={(value: number) => `${value}%`}
                    className="aspect-[4/3]"
                  />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  {isRtl ? "الطلبات حسب البلد" : "Applications by Country"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={applicationsByCountry}
                  index="name"
                  categories={["total"]}
                  colors={["blue"]}
                  valueFormatter={(value: number) => isRtl ? `${value} طلب` : `${value} applications`}
                  className="aspect-[4/3]"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  {isRtl ? "تحليل أداء الوكلاء" : "Agent Performance Analysis"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={[
                    { name: isRtl ? "يناير" : "January", "وكيل 1": 12, "وكيل 2": 18, "وكيل 3": 10 },
                    { name: isRtl ? "فبراير" : "February", "وكيل 1": 15, "وكيل 2": 20, "وكيل 3": 12 },
                    { name: isRtl ? "مارس" : "March", "وكيل 1": 18, "وكيل 2": 22, "وكيل 3": 14 },
                    { name: isRtl ? "أبريل" : "April", "وكيل 1": 20, "وكيل 2": 25, "وكيل 3": 18 },
                    { name: isRtl ? "مايو" : "May", "وكيل 1": 22, "وكيل 2": 28, "وكيل 3": 20 },
                    { name: isRtl ? "يونيو" : "June", "وكيل 1": 25, "وكيل 2": 30, "وكيل 3": 22 },
                  ]}
                  index="name"
                  categories={["وكيل 1", "وكيل 2", "وكيل 3"]}
                  colors={["blue", "green", "orange"]}
                  valueFormatter={(value: number) => isRtl ? `${value} طلب` : `${value} applications`}
                  className="aspect-[4/3]"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  الأنشطة الحديثة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ExpandableDataTable
                  columns={recentActivitiesColumns}
                  data={recentActivitiesData}
                  renderExpandedRow={(row) => (
                    <div className="p-2 bg-white rounded-md border border-gray-200">
                      {row.type === 'طلب جديد' && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-unlimited-gray mb-1">الجامعة</p>
                            <p className="font-medium">{row.details.universityName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-unlimited-gray mb-1">البرنامج</p>
                            <p className="font-medium">{row.details.program}</p>
                          </div>
                          <div>
                            <p className="text-sm text-unlimited-gray mb-1">تاريخ التقديم</p>
                            <p className="font-medium">{row.details.submissionDate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-unlimited-gray mb-1">المستندات</p>
                            <div className="flex gap-2 flex-wrap">
                              {row.details.documents.map((doc, idx) => (
                                <span 
                                  key={idx} 
                                  className="bg-gray-100 text-unlimited-gray rounded px-2 py-1 text-xs"
                                >
                                  {doc}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      {row.type === 'تسجيل مستخدم' && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-unlimited-gray mb-1">البريد الإلكتروني</p>
                            <p className="font-medium">{row.details.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-unlimited-gray mb-1">رقم الهاتف</p>
                            <p className="font-medium">{row.details.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm text-unlimited-gray mb-1">نوع الحساب</p>
                            <p className="font-medium">{row.details.accountType}</p>
                          </div>
                          <div>
                            <p className="text-sm text-unlimited-gray mb-1">الدول المهتم بها</p>
                            <div className="flex gap-2 flex-wrap">
                              {row.details.countries.map((country, idx) => (
                                <span 
                                  key={idx} 
                                  className="bg-gray-100 text-unlimited-gray rounded px-2 py-1 text-xs"
                                >
                                  {country}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      {row.type === 'تحديث بيانات' && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-unlimited-gray mb-1">الحقول المحدثة</p>
                            <div className="flex gap-2 flex-wrap">
                              {row.details.updatedFields.map((field, idx) => (
                                <span 
                                  key={idx} 
                                  className="bg-blue-50 text-unlimited-blue rounded px-2 py-1 text-xs"
                                >
                                  {field}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-unlimited-gray mb-1">حالة التوثيق</p>
                            <p className="font-medium">{row.details.verificationStatus}</p>
                          </div>
                          <div>
                            <p className="text-sm text-unlimited-gray mb-1">آخر تسجيل دخول</p>
                            <p className="font-medium">{row.details.lastLogin}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  isLoading={isDataLoading}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="text-base font-medium">
                    {isRtl ? "المهام المعلقة" : "Pending Tasks"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PendingTasks />
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="text-base font-medium">
                    {isRtl ? "الطلبات الحديثة" : "Recent Applications"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentApplications />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
