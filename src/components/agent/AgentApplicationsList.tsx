
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FilterableTable from '@/components/admin/FilterableTable';
import { Eye, MessageCircle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface AgentApplicationsListProps {
  searchQuery: string;
  statusFilter: string;
  universityFilter: string;
}

const AgentApplicationsList: React.FC<AgentApplicationsListProps> = ({
  searchQuery,
  statusFilter,
  universityFilter,
}) => {
  const navigate = useNavigate();

  // Mock data for applications
  const applications = [
    {
      id: "APP1001",
      studentName: "أحمد محمد",
      university: "جامعة الملك سعود",
      program: "هندسة البرمجيات",
      applyDate: "2023-08-15",
      status: "pending",
    },
    {
      id: "APP1002",
      studentName: "سارة عبدالله",
      university: "جامعة القاهرة",
      program: "طب بشري",
      applyDate: "2023-08-10",
      status: "review",
    },
    {
      id: "APP1003",
      studentName: "محمد العلي",
      university: "الجامعة الأمريكية",
      program: "إدارة أعمال",
      applyDate: "2023-08-05",
      status: "approved",
    },
  ];

  // Filter applications based on props
  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.studentName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || application.status === statusFilter;
    const matchesUniversity = universityFilter === "all" || application.university === universityFilter;

    return matchesSearch && matchesStatus && matchesUniversity;
  });

  // Status configuration for UI
  const statusConfig = {
    pending: { label: 'قيد الانتظار', color: 'bg-yellow-500 text-white' },
    review: { label: 'قيد المراجعة', color: 'bg-blue-500 text-white' },
    approved: { label: 'مقبول', color: 'bg-green-500 text-white' },
    rejected: { label: 'مرفوض', color: 'bg-red-500 text-white' },
  };

  // Action handlers
  const handleViewApplication = (application) => {
    navigate(`/agent/applications/${application.id}`);
  };

  const handleViewDocuments = (application) => {
    navigate(`/agent/applications/${application.id}/documents`);
  };

  const handleStartChat = (application) => {
    navigate(`/agent/messages?application=${application.id}`);
  };

  return (
    <Card>
      <CardContent className="p-0">
        <FilterableTable
          data={filteredApplications}
          columns={[
            { header: "رقم الطلب", accessor: "id" },
            { header: "الطالب", accessor: "studentName" },
            { header: "الجامعة", accessor: "university" },
            { header: "البرنامج", accessor: "program", hideOnMobile: true },
            { header: "تاريخ التقديم", accessor: "applyDate", hideOnMobile: true },
            {
              header: "الحالة",
              accessor: "status",
              render: (status) => (
                <Badge className={statusConfig[status]?.color || "bg-gray-500"}>
                  {statusConfig[status]?.label || status}
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
              icon: <FileText className="h-4 w-4" />,
              label: "المستندات",
              onClick: () => handleViewDocuments(application),
            },
            {
              icon: <MessageCircle className="h-4 w-4" />,
              label: "مراسلة الطالب",
              onClick: () => handleStartChat(application),
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default AgentApplicationsList;
