
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface Announcement {
  id: string;
  title?: string;
  content: string;
  date: string;
  university?: string;
  isNew: boolean;
}

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    content: "IUS - لدينا قائمة طويلة من الطلاب المقبولين الذين لم يخبرونا عما إذا كانوا يقبلون عرضنا، وإذا لم يكن كذلك، فلماذا لم يسجلوا بعد. نطلب منك التحقق المزدوج معهم إذا كانوا سينضمون إلى IUS، وإذا لم يكن الأمر كذلك، فيرجى إخبارنا بالسبب.",
    date: "02/09/2024 12:14:50 PM",
    isNew: true
  },
  {
    id: "2",
    content: "جامعة اسطنبول التجارية ---- ماجستير إدارة الأعمال (رسالة) (إنجليزي) - تم ملء الحصة",
    date: "31/08/2024 11:50:28 AM",
    university: "Istanbul Ticaret University",
    isNew: true
  },
  {
    id: "3",
    content: "جامعة لقمان حكيم ---- بكالوريوس طب الأسنان (تركي) والطب (إنجليزي) تم الوصول إلى الحصة.",
    date: "19/08/2024 12:35:42 PM",
    university: "Lokman Hekim University",
    isNew: false
  },
  {
    id: "4",
    content: "جامعة كينت ---- جميع برامج الماجستير وصلت للحصة الكاملة. سنبلغكم في حال أي تغيير.",
    date: "14/08/2024 03:19:43 PM",
    university: "Kent University",
    isNew: false
  },
  {
    id: "5",
    content: "جامعة إسطنبول ميديبول ---- الطب (إنجليزي) وصلت للحصة الكاملة.",
    date: "09/08/2024 02:33:54 PM",
    university: "Istanbul Medipol University",
    isNew: false
  },
  {
    id: "6",
    content: "جامعة سابانجي - هذه هي فرصتك الأخيرة للتقدم لبرامج البكالوريوس. الموعد النهائي هو 29 أغسطس 2024 الساعة 4 مساءً (GMT+3).",
    date: "06/08/2024 01:07:47 PM",
    university: "Sabanci University",
    isNew: false
  },
  {
    id: "7",
    content: "جامعة إسطنبول ميديبول - نود إعلامك بإجراء مهم للطلاب من منطقة الشرق الأوسط وشمال إفريقيا (منطقة الشرق الأوسط وشمال إفريقيا) الذين يحملون أيضًا الجنسية التركية.",
    date: "31/07/2024 06:52:40 PM",
    university: "Istanbul Medipol University",
    isNew: false
  }
];

interface AnnouncementsSectionProps {
  maxItems?: number;
}

const AnnouncementsSection = ({ maxItems = 5 }: AnnouncementsSectionProps) => {
  const isMobile = useIsMobile();
  const announcements = maxItems ? mockAnnouncements.slice(0, maxItems) : mockAnnouncements;

  return (
    <Card>
      <CardHeader className="bg-unlimited-blue/5 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-unlimited-dark-blue text-lg">
            الإعلانات
          </CardTitle>
          {isMobile ? null : (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-unlimited-blue/10 text-unlimited-blue">
                التحديثات الجديدة تظهر خلال 24 ساعة
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0 divide-y">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="mb-2 flex justify-between items-start">
              <span className="text-xs text-unlimited-gray">{announcement.date}</span>
              {announcement.isNew && (
                <Badge className="bg-unlimited-blue">جديد</Badge>
              )}
            </div>
            <p className="text-unlimited-dark-blue">{announcement.content}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AnnouncementsSection;
