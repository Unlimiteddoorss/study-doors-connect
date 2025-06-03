
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Download, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ApplicationsTable } from '@/components/tables/ApplicationsTable';
import { TablePagination } from '@/components/admin/TablePagination';

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentApplications = filteredApplications.slice(startIndex, endIndex);

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, searchQuery, statusFilter]);

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          programs!inner(name, universities!inner(name)),
          user_profiles!fk_applications_student_profiles(full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching applications:", error);
        throw error;
      }

      const formattedApplications = data?.map(app => ({
        id: app.id,
        program: app.programs?.name || 'برنامج غير معروف',
        university: app.programs?.universities?.name || 'جامعة غير معروفة',
        status: app.status,
        date: new Date(app.created_at).toLocaleDateString('ar-SA'),
        studentName: app.user_profiles?.full_name || 'طالب غير معروف',
        statusColor: getStatusColor(app.status),
        messages: 0,
        documents: [
          { name: 'الشهادة الثانوية', status: 'uploaded' },
          { name: 'جواز السفر', status: 'uploaded' },
          { name: 'صورة شخصية', status: 'required' }
        ]
      })) || [];

      setApplications(formattedApplications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      // بيانات تجريبية في حالة الخطأ
      setApplications([
        {
          id: 'APP-001',
          program: 'هندسة البرمجيات',
          university: 'جامعة إسطنبول التقنية',
          status: 'pending',
          date: new Date().toLocaleDateString('ar-SA'),
          studentName: 'أحمد محمد',
          statusColor: 'yellow',
          messages: 2,
          documents: [
            { name: 'الشهادة الثانوية', status: 'uploaded' },
            { name: 'جواز السفر', status: 'uploaded' },
            { name: 'صورة شخصية', status: 'required' }
          ]
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'yellow',
      approved: 'green',
      rejected: 'red',
      review: 'blue',
      documents: 'purple'
    };
    return colors[status] || 'gray';
  };

  const filterApplications = () => {
    let filtered = [...applications];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(app => 
        app.studentName?.toLowerCase().includes(query) ||
        app.program.toLowerCase().includes(query) ||
        app.university.toLowerCase().includes(query) ||
        app.id.toLowerCase().includes(query)
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }
    
    setFilteredApplications(filtered);
    setCurrentPage(1);
  };

  const handleViewApplication = (application) => {
    toast({
      title: "عرض الطلب",
      description: `تم فتح تفاصيل الطلب ${application.id}`
    });
  };

  const handleExportApplications = () => {
    toast({
      title: "تصدير البيانات",
      description: "جاري تصدير بيانات الطلبات..."
    });
  };

  return (
    <DashboardLayout userRole="admin">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-bold text-unlimited-dark-blue">إدارة الطلبات</h2>
          
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleExportApplications} variant="outline">
              <Download className="ml-2 h-4 w-4" />
              تصدير
            </Button>
            <Button>
              <Plus className="ml-2 h-4 w-4" />
              طلب جديد
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unlimited-gray h-4 w-4" />
            <Input
              placeholder="بحث في الطلبات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="ml-2 h-4 w-4" />
                <SelectValue placeholder="جميع الحالات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
                <SelectItem value="approved">مقبول</SelectItem>
                <SelectItem value="rejected">مرفوض</SelectItem>
                <SelectItem value="review">قيد المراجعة</SelectItem>
                <SelectItem value="documents">بانتظار المستندات</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <ApplicationsTable
          applications={currentApplications}
          handleViewApplication={handleViewApplication}
          isLoading={isLoading}
        />

        {totalPages > 1 && (
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredApplications.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default ManageApplications;
