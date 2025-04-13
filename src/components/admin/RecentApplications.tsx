
import { Button } from '@/components/ui/button';
import { FileText, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RecentApplications() {
  const applications = [
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
  ];

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
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs text-unlimited-gray">{app.date}</span>
            <Link to={`/admin/applications/${app.id}`}>
              <Button variant="outline" size="sm" className="text-xs h-7">
                <ExternalLink className="h-3 w-3 mr-1" />
                عرض
              </Button>
            </Link>
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
