
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, PieChart } from '@/components/charts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AgentApplicationsList from '@/components/agent/AgentApplicationsList';

const AgentDashboard = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [universityFilter, setUniversityFilter] = useState('all');

  // Sample data for statistics
  const applicationStatsData = [
    { month: 'يناير', applications: 15 },
    { month: 'فبراير', applications: 22 },
    { month: 'مارس', applications: 18 },
    { month: 'أبريل', applications: 25 },
    { month: 'مايو', applications: 30 },
    { month: 'يونيو', applications: 28 },
  ];

  const applicationsByStatus = [
    { name: 'مقبول', value: 32 },
    { name: 'قيد المراجعة', value: 18 },
    { name: 'قيد الانتظار', value: 12 },
    { name: 'مرفوض', value: 8 },
  ];

  // Universities list for filter
  const universities = [
    'جامعة الملك سعود',
    'جامعة القاهرة',
    'الجامعة الأمريكية',
  ];

  return (
    <DashboardLayout userRole="agent">
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6 text-unlimited-dark-blue">
          لوحة التحكم
        </h1>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">إجمالي الطلاب</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-unlimited-dark-blue">24</div>
              <p className="text-sm text-unlimited-gray">زيادة بنسبة 8% عن الشهر الماضي</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">طلبات الالتحاق</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-unlimited-dark-blue">70</div>
              <p className="text-sm text-unlimited-gray">زيادة بنسبة 12% عن الشهر الماضي</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">طلبات مقبولة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-unlimited-dark-blue">32</div>
              <p className="text-sm text-unlimited-gray">معدل قبول 45.7%</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">العمولات المستحقة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-unlimited-dark-blue">18,500 ر.س</div>
              <p className="text-sm text-unlimited-gray">زيادة بنسبة 15% عن الشهر الماضي</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">طلبات الالتحاق حسب الشهر</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-80">
                <BarChart 
                  data={applicationStatsData} 
                  index="month" 
                  categories={["applications"]} 
                  valueFormatter={(value) => `${value} طلب`}
                  className="h-full"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">الطلبات حسب الحالة</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-80">
                <PieChart 
                  data={applicationsByStatus}
                  valueFormatter={(value) => `${value} طلب`}
                  className="h-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Applications */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-unlimited-dark-blue">
            أحدث طلبات الالتحاق
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-unlimited-gray" />
              <Input
                placeholder="بحث برقم الطلب أو اسم الطالب"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="فلترة حسب الحالة" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
                <SelectItem value="review">قيد المراجعة</SelectItem>
                <SelectItem value="approved">مقبول</SelectItem>
                <SelectItem value="rejected">مرفوض</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={universityFilter} onValueChange={setUniversityFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="فلترة حسب الجامعة" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الجامعات</SelectItem>
                {universities.map((university) => (
                  <SelectItem key={university} value={university}>{university}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <AgentApplicationsList
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            universityFilter={universityFilter}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AgentDashboard;
