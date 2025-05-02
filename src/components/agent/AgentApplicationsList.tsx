
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { FilterableTable } from '@/components/admin/FilterableTable';
import { useToast } from '@/hooks/use-toast';

const AgentApplicationsList = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
          setApplications(JSON.parse(storedApps));
        } else {
          // Mock data if nothing in localStorage
          const mockApplications = [
            {
              id: 'APP-001',
              studentName: 'أحمد محمد',
              program: 'هندسة البرمجيات',
              university: 'جامعة الملك سعود',
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
          ];
          setApplications(mockApplications);
          localStorage.setItem('agentApplications', JSON.stringify(mockApplications));
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
  };

  const renderStatus = (status: string, statusColor: string) => {
    return (
      <Badge className={statusColor}>
        {status === 'pending' ? 'قيد المراجعة' : 
         status === 'approved' ? 'مقبول' : 
         status === 'rejected' ? 'مرفوض' : status}
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
        { header: 'البرنامج', accessor: 'program' },
        { header: 'الجامعة', accessor: 'university' },
        { header: 'تاريخ التقديم', accessor: 'date' },
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
    />
  );
};

export default AgentApplicationsList;
