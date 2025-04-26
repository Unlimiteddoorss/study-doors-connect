
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

interface Announcement {
  id: number;
  university: string;
  title: string;
  date: string;
  type: 'info' | 'deadline' | 'update';
}

const announcements: Announcement[] = [
  {
    id: 1,
    university: "جامعة إسطنبول",
    title: "فتح باب التسجيل لبرنامج MBA",
    date: "2025-05-01",
    type: 'info'
  },
  {
    id: 2,
    university: "جامعة أنقرة",
    title: "الموعد النهائي للتقديم على المنح الدراسية",
    date: "2025-04-30",
    type: 'deadline'
  },
  {
    id: 3,
    university: "جامعة أنطاليا",
    title: "تحديث متطلبات القبول للطلاب الدوليين",
    date: "2025-04-25",
    type: 'update'
  }
];

export function UniversityAnnouncements() {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">آخر الإعلانات الجامعية</CardTitle>
        <Bell className="h-5 w-5 text-unlimited-blue" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="flex items-start space-x-4 rtl:space-x-reverse p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <h4 className="font-medium text-unlimited-dark-blue">
                  {announcement.title}
                </h4>
                <p className="text-sm text-unlimited-gray">{announcement.university}</p>
                <time className="text-xs text-unlimited-gray">{announcement.date}</time>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                announcement.type === 'deadline' ? 'bg-red-100 text-red-600' :
                announcement.type === 'update' ? 'bg-blue-100 text-blue-600' :
                'bg-green-100 text-green-600'
              }`}>
                {announcement.type === 'deadline' ? 'موعد نهائي' :
                 announcement.type === 'update' ? 'تحديث' : 'معلومات'}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
