
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Check, Flag, Award, Users, BookOpen, Home, CircleX } from 'lucide-react';
import { University } from '@/components/universities/UniversityCard';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface UniversityComparisonProps {
  universities: University[];
  selectedIds: number[];
  onClose: () => void;
  countryTranslations?: Record<string, string>;
}

const UniversityComparison: React.FC<UniversityComparisonProps> = ({
  universities,
  selectedIds,
  onClose,
  countryTranslations = {}
}) => {
  const { toast } = useToast();
  const [selectedUniversities, setSelectedUniversities] = useState<University[]>([]);
  
  useEffect(() => {
    const filtered = universities.filter(uni => selectedIds.includes(uni.id));
    setSelectedUniversities(filtered);
  }, [universities, selectedIds]);
  
  const translateLocation = (location: string): string => {
    return countryTranslations[location] || location;
  };
  
  const onShare = () => {
    // إنشاء عنوان URL مع معلمات مقارنة الجامعات
    const compareParams = selectedIds.map(id => `uni=${id}`).join('&');
    const shareUrl = `${window.location.origin}${window.location.pathname}?compare=true&${compareParams}`;
    
    // نسخ الرابط إلى الحافظة
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        toast({
          title: "تم نسخ الرابط",
          description: "يمكنك مشاركة هذا الرابط لمقارنة الجامعات المحددة",
        });
      })
      .catch(err => {
        console.error('فشل نسخ الرابط: ', err);
        toast({
          title: "فشل نسخ الرابط",
          description: "يرجى المحاولة مرة أخرى",
          variant: "destructive",
        });
      });
  };
  
  if (selectedUniversities.length === 0) return null;
  
  return (
    <Dialog open={selectedIds.length > 0} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">مقارنة الجامعات</DialogTitle>
          <DialogDescription>
            قارن بين الجامعات المختارة لاتخاذ قرار أفضل
          </DialogDescription>
        </DialogHeader>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-right w-[200px]">معلومات المقارنة</th>
                {selectedUniversities.map(uni => (
                  <th key={uni.id} className="py-2 px-4 text-center min-w-[200px]">
                    <div className="flex flex-col items-center">
                      <img src={uni.image} alt={uni.name} className="w-16 h-16 object-cover rounded-full mb-2" />
                      <span className="font-bold">{uni.nameAr || uni.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4 font-medium bg-gray-50 flex items-center">
                  <Flag className="w-4 h-4 ml-2" />
                  الموقع
                </td>
                {selectedUniversities.map(uni => (
                  <td key={uni.id} className="py-3 px-4 text-center">
                    {translateLocation(uni.city)}، {translateLocation(uni.country)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium bg-gray-50 flex items-center">
                  <Home className="w-4 h-4 ml-2" />
                  النوع
                </td>
                {selectedUniversities.map(uni => (
                  <td key={uni.id} className="py-3 px-4 text-center">
                    {uni.type === 'Private' ? 'خاصة' : 'حكومية'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium bg-gray-50 flex items-center">
                  <BookOpen className="w-4 h-4 ml-2" />
                  عدد البرامج
                </td>
                {selectedUniversities.map(uni => (
                  <td key={uni.id} className="py-3 px-4 text-center">
                    <span className="font-semibold text-unlimited-blue">{uni.programs}+</span> برنامج
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium bg-gray-50 flex items-center">
                  <Users className="w-4 h-4 ml-2" />
                  عدد الطلاب
                </td>
                {selectedUniversities.map(uni => (
                  <td key={uni.id} className="py-3 px-4 text-center">
                    <span className="font-semibold">{uni.students.toLocaleString()}+</span> طالب
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium bg-gray-50 flex items-center">
                  <Award className="w-4 h-4 ml-2" />
                  التصنيف العالمي
                </td>
                {selectedUniversities.map(uni => (
                  <td key={uni.id} className="py-3 px-4 text-center">
                    {uni.ranking ? (
                      <span className="font-semibold">#{uni.ranking}</span>
                    ) : (
                      <span className="text-gray-400">غير مصنفة</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium bg-gray-50">سنة التأسيس</td>
                {selectedUniversities.map(uni => (
                  <td key={uni.id} className="py-3 px-4 text-center">
                    {uni.founded}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium bg-gray-50">الرسوم الدراسية</td>
                {selectedUniversities.map(uni => (
                  <td key={uni.id} className="py-3 px-4 text-center font-semibold text-unlimited-blue">
                    {uni.fees}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium bg-gray-50">لغات التدريس</td>
                {selectedUniversities.map(uni => (
                  <td key={uni.id} className="py-3 px-4 text-center">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {uni.languages ? uni.languages.map((lang, idx) => (
                        <span key={idx} className="bg-unlimited-blue/10 text-unlimited-blue px-2 py-0.5 rounded-full text-xs">
                          {lang === 'English' ? 'الإنجليزية' : 
                          lang === 'Turkish' ? 'التركية' : 
                          lang === 'Arabic' ? 'العربية' : lang}
                        </span>
                      )) : (
                        <span className="text-gray-400">غير محدد</span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium bg-gray-50">الاعتمادات</td>
                {selectedUniversities.map(uni => (
                  <td key={uni.id} className="py-3 px-4 text-center">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {uni.accreditations && uni.accreditations.length > 0 ? uni.accreditations.map((item, idx) => (
                        <div key={idx} className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 ml-1" />
                          <span>{item}</span>
                        </div>
                      )) : (
                        <span className="text-gray-400">غير محدد</span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium bg-gray-50">روابط</td>
                {selectedUniversities.map(uni => (
                  <td key={uni.id} className="py-3 px-4 text-center">
                    <div className="flex justify-center space-x-2 space-x-reverse">
                      <Button asChild variant="outline" size="sm">
                        <a href={`/universities/${uni.id}`}>عرض التفاصيل</a>
                      </Button>
                      <Button asChild size="sm">
                        <a href={`/apply?university=${uni.id}`}>تقدم الآن</a>
                      </Button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={onClose} className="flex items-center gap-1">
            <CircleX className="w-4 h-4" />
            إغلاق
          </Button>
          <Button onClick={onShare} className="flex items-center gap-1">
            مشاركة المقارنة
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UniversityComparison;
