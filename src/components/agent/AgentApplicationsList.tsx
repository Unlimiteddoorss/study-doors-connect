
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, FileCheck, AlertCircle, Clock } from 'lucide-react';
import { FilterableTable } from '@/components/admin/FilterableTable';
import { useToast } from '@/hooks/use-toast';

const AgentApplicationsList = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch data from an API
        // For demo, we'll use localStorage or mock data
        const storedApps = localStorage.getItem('agentApplications');
        if (storedApps) {
          const apps = JSON.parse(storedApps);
          setApplications(apps);
          setTotalPages(Math.ceil(apps.length / 10));
        } else {
          // Mock data if nothing in localStorage
          const mockApplications = [
            {
              id: 'APP-001',
              studentName: 'أحمد محمد',
              program: 'هندسة البرمجيات',
              university: 'جامعة اسطنبول التقنية',
              date: '2023-05-15',
              status: 'pending',
              statusColor: 'text-yellow-600 bg-yellow-100',
            },
            {
              id: 'APP-002',
              studentName: 'سارة عبدالله',
              program: 'الطب البشري',
              university: 'جامعة الملك عبدالعزيز',
              date: '2023-05-10',
              status: 'approved',
              statusColor: 'text-green-600 bg-green-100',
            },
            {
              id: 'APP-003',
              studentName: 'محمد عبدالرحمن',
              program: 'إدارة أعمال',
              university: 'جامعة الأميرة نورة',
              date: '2023-05-05',
              status: 'rejected',
              statusColor: 'text-red-600 bg-red-100',
            },
            {
              id: 'APP-004',
              studentName: 'نورا السيد',
              program: 'علوم الحاسب',
              university: 'جامعة اسطنبول',
              date: '2023-05-18',
              status: 'in_progress',
              statusColor: 'text-blue-600 bg-blue-100',
            },
            {
              id: 'APP-005',
              studentName: 'خالد العمري',
              program: 'الهندسة المدنية',
              university: 'جامعة مرمرة',
              date: '2023-05-20',
              status: 'pending',
              statusColor: 'text-yellow-600 bg-yellow-100',
            },
            {
              id: 'APP-006',
              studentName: 'فاطمة الزهراء',
              program: 'علم النفس',
              university: 'جامعة أنقرة',
              date: '2023-05-12',
              status: 'pending',
              statusColor: 'text-yellow-600 bg-yellow-100',
            },
            {
              id: 'APP-007',
              studentName: 'عمر حسين',
              program: 'الصيدلة',
              university: 'جامعة إسطنبول الطبية',
              date: '2023-05-08',
              status: 'approved',
              statusColor: 'text-green-600 bg-green-100',
            },
            {
              id: 'APP-008',
              studentName: 'لينا أحمد',
              program: 'الفنون الجميلة',
              university: 'جامعة الفنون التركية',
              date: '2023-05-03',
              status: 'rejected',
              statusColor: 'text-red-600 bg-red-100',
            },
          ];
          setApplications(mockApplications);
          localStorage.setItem('agentApplications', JSON.stringify(mockApplications));
          setTotalPages(Math.ceil(mockApplications.length / 10));
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
        toast({
          title: 'خطأ',
          description: 'حدث خطأ أثناء جلب البيانات',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [toast]);

  const handleViewApplication = (id: string) => {
    navigate(`/dashboard/applications/${id}`);
    toast({
      title: 'عرض التفاصيل',
      description: `جاري فتح تفاصيل الطلب رقم ${id}`,
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // في التطبيق الحقيقي، ستقوم بجلب البيانات هنا من API مع رقم الصفحة
  };

  const renderStatus = (status: string, statusColor: string) => {
    const getStatusIcon = (status: string) => {
      switch (status) {
        case 'pending':
          return <Clock className="h-4 w-4 ml-1" />;
        case 'approved':
          return <FileCheck className="h-4 w-4 ml-1" />;
        case 'rejected':
          return <AlertCircle className="h-4 w-4 ml-1" />;
        case 'in_progress':
          return <Clock className="h-4 w-4 ml-1" />;
        default:
          return null;
      }
    };

    const getStatusText = (status: string) => {
      switch (status) {
        case 'pending':
          return 'قيد المراجعة';
        case 'approved':
          return 'مقبول';
        case 'rejected':
          return 'مرفوض';
        case 'in_progress':
          return 'قيد التنفيذ';
        default:
          return status;
      }
    };

    return (
      <Badge className={`flex items-center ${statusColor}`}>
        {getStatusIcon(status)}
        {getStatusText(status)}
      </Badge>
    );
  };

  return (
    <FilterableTable
      data={applications}
      isLoading={isLoading}
      columns={[
        { header: 'رقم الطلب', accessor: 'id' },
        { header: 'اسم الطالب', accessor: 'studentName' },
        { header: 'البرنامج', accessor: 'program', hideOnMobile: true },
        { header: 'الجامعة', accessor: 'university', hideOnMobile: true },
        { header: 'تاريخ التقديم', accessor: 'date', hideOnMobile: true },
        { 
          header: 'الحالة', 
          accessor: 'status',
          render: (value, row) => renderStatus(value, row.statusColor)
        },
      ]}
      actions={(row) => [
        {
          label: 'عرض التفاصيل',
          onClick: () => handleViewApplication(row.id),
          icon: <Eye className="h-4 w-4" />
        }
      ]}
      emptyStateMessage="لا توجد طلبات تسجيل حالية"
      searchPlaceholder="ابحث عن طلب..."
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={applications.length}
      onPageChange={handlePageChange}
    />
  );
};

export default AgentApplicationsList;
