
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, ExternalLink, CheckCircle, AlertCircle, XCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function RecentApplications() {
  const [applications, setApplications] = useState([
    {
      id: "app1",
      student: "فاطمة الزهراء",
      program: "بكالوريوس هندسة البرمجيات",
      university: "جامعة إسطنبول التقنية",
      date: "12/04/2025",
      status: "قيد المراجعة"
    },
    {
      id: "app2",
      student: "أحمد محمود",
      program: "ماجستير علوم الحاسوب",
      university: "جامعة أوزيجين",
      date: "11/04/2025",
      status: "بانتظار المستندات"
    },
    {
      id: "app3",
      student: "سارة عبد الرحمن",
      program: "دبلوم اللغة التركية",
      university: "جامعة بهجة شهير",
      date: "10/04/2025",
      status: "مقبول"
    }
  ]);
  
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const { toast } = useToast();
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "مقبول":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "قيد المراجعة":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "بانتظار المستندات":
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case "مرفوض":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-unlimited-gray" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "مقبول":
        return "bg-green-100 text-green-800";
      case "قيد المراجعة":
        return "bg-orange-100 text-orange-800";
      case "بانتظار المستندات":
        return "bg-blue-100 text-blue-800";
      case "مرفوض":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const handleApprove = () => {
    if (selectedApp) {
      setApplications(applications.map(app => 
        app.id === selectedApp.id ? { ...app, status: "مقبول" } : app
      ));
      
      toast({
        title: "تم قبول الطلب",
        description: `تم قبول طلب الطالب ${selectedApp.student} بنجاح`,
      });
      
      setSelectedApp(null);
    }
  };
  
  const handleReject = () => {
    if (selectedApp) {
      setApplications(applications.map(app => 
        app.id === selectedApp.id ? { ...app, status: "مرفوض" } : app
      ));
      
      toast({
        title: "تم رفض الطلب",
        description: `تم رفض طلب الطالب ${selectedApp.student}`,
        variant: "destructive"
      });
      
      setSelectedApp(null);
    }
  };

  return (
    <div className="space-y-4">
      {applications.map(app => (
        <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-start gap-3">
            <div className="bg-unlimited-blue/10 p-2 rounded-full">
              <FileText className="h-5 w-5 text-unlimited-blue" />
            </div>
            <div>
              <h4 className="font-medium text-sm">{app.student}</h4>
              <p className="text-xs text-unlimited-gray">{app.program}</p>
              <p className="text-xs text-unlimited-gray">{app.university}</p>
              <div className="mt-1">
                <Badge className={`text-xs ${getStatusColor(app.status)}`}>
                  <span className="flex items-center gap-1">
                    {getStatusIcon(app.status)}
                    {app.status}
                  </span>
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs text-unlimited-gray">{app.date}</span>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs h-7" onClick={() => setSelectedApp(app)}>
                  <ExternalLink className="h-3 w-3 ml-1" />
                  عرض
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>تفاصيل الطلب</DialogTitle>
                  <DialogDescription>
                    معلومات طلب التسجيل للطالب
                  </DialogDescription>
                </DialogHeader>
                
                {selectedApp && (
                  <div className="py-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg">{selectedApp.student}</h3>
                      <Badge className={getStatusColor(selectedApp.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(selectedApp.status)}
                          {selectedApp.status}
                        </span>
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-unlimited-gray text-sm">البرنامج</p>
                        <p className="font-medium">{selectedApp.program}</p>
                      </div>
                      <div>
                        <p className="text-unlimited-gray text-sm">الجامعة</p>
                        <p className="font-medium">{selectedApp.university}</p>
                      </div>
                      <div>
                        <p className="text-unlimited-gray text-sm">تاريخ التقديم</p>
                        <p className="font-medium">{selectedApp.date}</p>
                      </div>
                      <div>
                        <p className="text-unlimited-gray text-sm">رقم الطلب</p>
                        <p className="font-medium">{selectedApp.id}</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">المستندات المرفقة</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>جواز السفر</span>
                          <Button variant="ghost" size="sm">عرض</Button>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>الشهادة الثانوية</span>
                          <Button variant="ghost" size="sm">عرض</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <DialogFooter className="flex gap-2">
                  {selectedApp && selectedApp.status !== "مقبول" && (
                    <Button variant="outline" className="bg-green-500 text-white hover:bg-green-600" onClick={handleApprove}>
                      <CheckCircle className="h-4 w-4 ml-1" />
                      قبول
                    </Button>
                  )}
                  
                  {selectedApp && selectedApp.status !== "مرفوض" && (
                    <Button variant="outline" className="bg-red-500 text-white hover:bg-red-600" onClick={handleReject}>
                      <XCircle className="h-4 w-4 ml-1" />
                      رفض
                    </Button>
                  )}
                  
                  <Button variant="outline">
                    <Link to={`/admin/applications/${selectedApp?.id}`} className="flex items-center">
                      <ExternalLink className="h-4 w-4 ml-1" />
                      التفاصيل الكاملة
                    </Link>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
      
      <div className="text-center">
        <Link to="/admin/applications">
          <Button variant="link" className="text-unlimited-blue">
            عرض جميع الطلبات
          </Button>
        </Link>
      </div>
    </div>
  );
}
