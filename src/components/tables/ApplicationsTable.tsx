
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { ExternalLink, MessageSquare, FileText, Eye, Clock, Download, Upload } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface Application {
  id: number | string;
  program: string;
  programId?: number;
  university: string;
  status: string;
  date: string;
  statusColor: string;
  messages: number;
  academicYear?: string;
  semester?: string;
  pinCode?: string;
  scholarshipStatus?: string;
  assignedTo?: string;
  documents: {
    name: string;
    status: 'uploaded' | 'required' | 'approved';
  }[];
}

interface ApplicationsTableProps {
  applications: Application[];
  handleViewApplication: (application: Application) => void;
  handleDeleteApplication?: (id: string | number) => void;
  handleUpdateStatus?: (id: string | number, status: string) => void;
}

export const ApplicationsTable = ({ 
  applications,
  handleViewApplication,
  handleDeleteApplication,
  handleUpdateStatus 
}: ApplicationsTableProps) => {
  const { t, i18n } = useTranslation();
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge className="bg-green-500">مقبول</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">مرفوض</Badge>;
      case 'review':
        return <Badge className="bg-amber-500">قيد المراجعة</Badge>;
      case 'documents':
        return <Badge className="bg-blue-500">بانتظار المستندات</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">قيد الانتظار</Badge>;
      case 'conditional':
        return <Badge className="bg-purple-500">مقبول بشروط</Badge>;
      case 'paid':
        return <Badge className="bg-emerald-500">مدفوع</Badge>;
      case 'registered':
        return <Badge className="bg-indigo-500">مسجل</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  const handleMessageClick = (application: Application) => {
    setSelectedApplication(application);
    window.location.hash = '#messages';
  };

  const handleDocumentClick = (application: Application) => {
    setSelectedApplication(application);
    window.location.hash = '#documents';
  };
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>رقم الطلب</TableHead>
            <TableHead>البرنامج</TableHead>
            <TableHead className="hidden md:table-cell">الجامعة</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead className="hidden md:table-cell">التاريخ</TableHead>
            <TableHead>المستندات</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">{app.id}</TableCell>
              <TableCell>{app.program}</TableCell>
              <TableCell className="hidden md:table-cell">{app.university}</TableCell>
              <TableCell>{getStatusBadge(app.status)}</TableCell>
              <TableCell className="hidden md:table-cell">{app.date}</TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDocumentClick(app)}
                      >
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          <span>{app.documents?.filter(doc => doc.status === 'uploaded').length || 0}/{app.documents?.length || 0}</span>
                        </div>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>عرض ورفع المستندات</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" variant="ghost" onClick={() => handleViewApplication(app)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>عرض التفاصيل</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" variant="ghost" onClick={() => handleMessageClick(app)}>
                          <div className="relative">
                            <MessageSquare className="h-4 w-4" />
                            {app.messages > 0 && (
                              <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center" variant="destructive">
                                {app.messages}
                              </Badge>
                            )}
                          </div>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>الرسائل</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" variant="ghost" onClick={() => handleDocumentClick(app)}>
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>المستندات</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
            </TableRow>
          ))}
          
          {applications.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center">
                <div className="flex flex-col items-center justify-center">
                  <FileText className="h-8 w-8 text-unlimited-gray mb-2" />
                  <p className="text-unlimited-gray">لا توجد طلبات</p>
                  <Button variant="outline" className="mt-4">
                    إضافة طلب جديد
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {/* Messages Dialog */}
      <Dialog 
        open={selectedApplication !== null && window.location.hash === '#messages'} 
        onOpenChange={() => {
          setSelectedApplication(null);
          window.history.pushState("", document.title, window.location.pathname);
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>الرسائل</DialogTitle>
            <DialogDescription>
              رسائل الطلب: {selectedApplication?.program} - {selectedApplication?.university}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 h-96 overflow-auto border rounded-md p-4 bg-gray-50">
            <div className="space-y-4">
              <div className="flex flex-col">
                <div className={`max-w-[80%] bg-unlimited-blue text-white p-3 rounded-lg ${i18n.language === 'ar' ? 'self-start' : 'self-end'}`}>
                  <p>مرحباً، كيف يمكنني مساعدتك في طلبك؟</p>
                  <div className="text-xs text-unlimited-light mt-1">منذ ساعتين</div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className={`max-w-[80%] bg-white p-3 rounded-lg shadow-sm ${i18n.language === 'ar' ? 'self-end' : 'self-start'}`}>
                  <p>أحتاج إلى معلومات حول حالة طلبي</p>
                  <div className="text-xs text-unlimited-gray mt-1">منذ ساعة</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <input 
              type="text" 
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-unlimited-blue focus:border-transparent" 
              placeholder="اكتب رسالتك..."
            />
            <Button>إرسال</Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Documents Dialog */}
      <Dialog 
        open={selectedApplication !== null && window.location.hash === '#documents'} 
        onOpenChange={() => {
          setSelectedApplication(null);
          window.history.pushState("", document.title, window.location.pathname);
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>المستندات</DialogTitle>
            <DialogDescription>
              مستندات الطلب: {selectedApplication?.program} - {selectedApplication?.university}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {selectedApplication?.documents?.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-unlimited-gray" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-xs text-unlimited-gray">
                      {doc.status === 'uploaded' && "تم الرفع"}
                      {doc.status === 'required' && "مطلوب"}
                      {doc.status === 'approved' && "تم الموافقة"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {doc.status === 'uploaded' && (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      تنزيل
                    </Button>
                  )}
                  {doc.status === 'required' && (
                    <Button size="sm">
                      <Upload className="h-4 w-4 mr-1" />
                      رفع
                    </Button>
                  )}
                  {doc.status === 'approved' && (
                    <Badge className="bg-green-500">
                      موافق عليه
                    </Badge>
                  )}
                </div>
              </div>
            ))}
            
            {(!selectedApplication?.documents || selectedApplication.documents.length === 0) && (
              <div className="text-center p-6">
                <FileText className="h-12 w-12 mx-auto text-unlimited-gray mb-2" />
                <p>لا توجد مستندات</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationsTable;
