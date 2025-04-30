
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
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

const AgentApplications = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [universityFilter, setUniversityFilter] = useState('all');
  
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
          طلبات الالتحاق
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative md:col-span-2">
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
        
        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">جميع الطلبات</TabsTrigger>
            <TabsTrigger value="pending">قيد الانتظار</TabsTrigger>
            <TabsTrigger value="review">قيد المراجعة</TabsTrigger>
            <TabsTrigger value="approved">مقبولة</TabsTrigger>
            <TabsTrigger value="rejected">مرفوضة</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <AgentApplicationsList 
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              universityFilter={universityFilter}
            />
          </TabsContent>
          
          <TabsContent value="pending">
            <AgentApplicationsList 
              searchQuery={searchQuery}
              statusFilter="pending"
              universityFilter={universityFilter}
            />
          </TabsContent>
          
          <TabsContent value="review">
            <AgentApplicationsList 
              searchQuery={searchQuery}
              statusFilter="review"
              universityFilter={universityFilter}
            />
          </TabsContent>
          
          <TabsContent value="approved">
            <AgentApplicationsList 
              searchQuery={searchQuery}
              statusFilter="approved"
              universityFilter={universityFilter}
            />
          </TabsContent>
          
          <TabsContent value="rejected">
            <AgentApplicationsList 
              searchQuery={searchQuery}
              statusFilter="rejected"
              universityFilter={universityFilter}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AgentApplications;
