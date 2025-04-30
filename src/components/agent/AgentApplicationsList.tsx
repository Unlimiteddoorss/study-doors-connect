
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for applications
const mockApplications = [
  {
    id: "APP-123456",
    studentName: "أحمد محمود",
    program: "هندسة البرمجيات",
    university: "جامعة إسطنبول التقنية",
    date: "2025-03-15",
    status: "pending",
    statusText: "قيد المعالجة"
  },
  {
    id: "APP-123457",
    studentName: "فاطمة علي",
    program: "إدارة الأعمال",
    university: "جامعة سابانجي",
    date: "2025-03-10",
    status: "approved",
    statusText: "مقبول"
  },
  {
    id: "APP-123458",
    studentName: "محمد خالد",
    program: "الطب البشري",
    university: "جامعة إسطنبول ميديبول",
    date: "2025-03-08",
    status: "conditional",
    statusText: "قبول مشروط"
  },
  {
    id: "APP-123459",
    studentName: "نور أحمد",
    program: "علوم الحاسب",
    university: "جامعة أوزيغين",
    date: "2025-03-05",
    status: "rejected",
    statusText: "مرفوض"
  }
];

const AgentApplicationsList = () => {
  const [applications] = useState(mockApplications);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleViewApplication = (applicationId: string) => {
    navigate(`/agent/applications/${applicationId}`);
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'conditional':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const filteredApplications = selectedStatus 
    ? applications.filter(app => app.status === selectedStatus)
    : applications;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-unlimited-gray" />
          <span className="text-sm text-unlimited-gray">تصفية:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {selectedStatus ? 
                  applications.find(app => app.status === selectedStatus)?.statusText : 
                  'جميع الحالات'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedStatus(null)}>
                جميع الحالات
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus('pending')}>
                قيد المعالجة
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus('approved')}>
                مقبول
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus('conditional')}>
                قبول مشروط
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus('rejected')}>
                مرفوض
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>رقم الطلب</TableHead>
              <TableHead>اسم الطالب</TableHead>
              <TableHead>البرنامج</TableHead>
              <TableHead>الجامعة</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="text-right">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">{application.id}</TableCell>
                <TableCell>{application.studentName}</TableCell>
                <TableCell>{application.program}</TableCell>
                <TableCell>{application.university}</TableCell>
                <TableCell>{new Date(application.date).toLocaleDateString('ar-SA')}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeStyle(application.status)}>
                    {application.statusText}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleViewApplication(application.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredApplications.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-unlimited-gray">
                  لا توجد طلبات تطابق التصفية المحددة
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AgentApplicationsList;
