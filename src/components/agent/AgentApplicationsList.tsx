
import React from 'react';
import FilterableTable from '@/components/admin/FilterableTable';
import { Badge } from '@/components/ui/badge';
import { Eye, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AgentApplicationsListProps {
  searchQuery: string;
  statusFilter: string;
  universityFilter: string;
}

export const AgentApplicationsList = ({ searchQuery, statusFilter, universityFilter }: AgentApplicationsListProps) => {
  const navigate = useNavigate();

  // Mock data for applications
  const applications = [
    {
      id: "APP1001",
      studentName: "أحمد محمد",
      studentEmail: "ahmed@example.com",
      university: "جامعة الملك سعود",
      program: "هندسة البرمجيات",
      applyDate: "2023-08-15",
      status: "pending",
    },
    {
      id: "APP1002",
      studentName: "سارة خالد",
      studentEmail: "sarah@example.com",
      university: "جامعة القاهرة",
      program: "طب بشري",
      applyDate: "2023-08-10",
      status: "review",
    },
    {
      id: "APP1003",
      studentName: "محمد علي",
      studentEmail: "mohammed@example.com",
      university: "الجامعة الأمريكية",
      program: "إدارة أعمال",
      applyDate: "2023-08-05",
      status: "approved",
    },
    {
      id: "APP1004",
      studentName: "فاطمة أحمد",
      studentEmail: "fatima@example.com",
      university: "جامعة الملك سعود",
      program: "علوم الحاسب",
      applyDate: "2023-08-01",
      status: "rejected",
    },
  ];

  // Filter applications based on search and filters
  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.studentEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || application.status === statusFilter;
    const matchesUniversity = universityFilter === "all" || application.university === universityFilter;

    return matchesSearch && matchesStatus && matchesUniversity;
  });

  // Status configuration for UI
  const statusConfig = {
    pending: { label: 'قيد الانتظار', color: 'bg-yellow-500 text-white' },
    review: { label: 'قيد المراجعة', color: 'bg-blue-500 text-white' },
    approved: { label: 'مقبول', color: 'bg-green-500 text-white' },
    conditional: { label: 'قبول مشروط', color: 'bg-purple-500 text-white' },
    rejected: { label: 'مرفوض', color: 'bg-red-500 text-white' },
  };

  const handleViewApplication = (application: any) => {
    navigate(`/agent/applications/${application.id}`);
  };

  const handleContactStudent = (application: any) => {
    navigate(`/agent/messages?application=${application.id}`);
  };

  return (
    <FilterableTable
      data={filteredApplications}
      isLoading={false}
      columns={[
        { header: "رقم الطلب", accessor: "id" },
        { header: "الطالب", accessor: "studentName" },
        { header: "البريد الإلكتروني", accessor: "studentEmail", hideOnMobile: true },
        { header: "الجامعة", accessor: "university", hideOnMobile: true },
        { header: "البرنامج", accessor: "program", hideOnMobile: true },
        { header: "تاريخ التقديم", accessor: "applyDate", hideOnMobile: true },
        {
          header: "الحالة",
          accessor: "status",
          render: (status) => (
            <Badge className={statusConfig[status as keyof typeof statusConfig]?.color || "bg-gray-500"}>
              {statusConfig[status as keyof typeof statusConfig]?.label || status}
            </Badge>
          ),
        },
      ]}
      actions={(application) => [
        {
          icon: <Eye className="h-4 w-4" />,
          label: "عرض التفاصيل",
          onClick: () => handleViewApplication(application),
        },
        {
          icon: <MessageCircle className="h-4 w-4" />,
          label: "مراسلة الطالب",
          onClick: () => handleContactStudent(application),
        },
      ]}
    />
  );
};

export default AgentApplicationsList;
