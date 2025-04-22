
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { InfoIcon, Book, Award, Users, Building, Phone, Globe, MapPin, Mail, Clock, School, FileCheck } from 'lucide-react';
import { turkishUniversities } from '@/data/programsData';
import { getUniversityPrograms } from '@/data/universityPrograms';
import { useToast } from '@/hooks/use-toast';

import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UniversityPrograms from '@/components/universities/UniversityPrograms';
import UniversityAdminControls from '@/components/admin/UniversityAdminControls';

const translations: Record<string, string> = {
  'Turkey': 'تركيا',
  'Istanbul': 'إسطنبول',
  'Ankara': 'أنقرة',
  'Antalya': 'أنطاليا',
  'Izmir': 'إزمير',
  'Bursa': 'بورصة',
  'Konya': 'قونيا',
  'Adana': 'أضنة',
  'Gaziantep': 'غازي عنتاب',
  'Mersin': 'مرسين',
  'Kayseri': 'قيصري',
  'Alanya': 'ألانيا',
  'Eskisehir': 'إسكي شهير',
  'Trabzon': 'طرابزون',
  'Samsun': 'سامسون',
  'Sakarya': 'سكاريا',
  'Cyprus': 'قبرص',
  'Kyrenia': 'كيرينيا',
  'Nicosia': 'نيقوسيا',
  'Famagusta': 'فماغوستا',
  'Private': 'خاصة',
  'Public': 'حكومية'
};

const UniversityDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  const universityId = id ? parseInt(id) : -1;
  const university = turkishUniversities.find(uni => uni.id === universityId);
  
  const programs = getUniversityPrograms(universityId);
  
  useEffect(() => {
    if (!university) {
      toast({
        title: "لم يتم العثور على الجامعة",
        description: "الجامعة التي تبحث عنها غير موجودة",
        variant: "destructive"
      });
    }
  }, [university, toast]);

  const translate = (text: string): string => {
    return translations[text] || text;
  };

  if (!university) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">الجامعة غير موجودة</h1>
          <p className="mb-8">لا يمكن العثور على الجامعة التي تبحث عنها.</p>
          <Button asChild className="bg-unlimited-blue hover:bg-unlimited-dark-blue">
            <Link to="/universities">عرض جميع الجامعات</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <UniversityAdminControls universityId={universityId} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="relative mb-8">
          <div className="h-[300px] w-full bg-gray-300 overflow-hidden rounded-lg">
            <img 
              src={university.image} 
              alt={university.nameAr || university.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="absolute bottom-4 right-8 bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
              {university.type === 'Private' ? (
                <Badge className="bg-unlimited-blue">جامعة خاصة</Badge>
              ) : (
                <Badge className="bg-unlimited-dark-blue">جامعة حكومية</Badge>
              )}
              {university.isFeatured && <Badge className="bg-green-600">جامعة مميزة</Badge>}
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mt-2">{university.nameAr || university.name}</h1>
            <div className="flex items-center gap-2 text-gray-600 mt-2">
              <MapPin className="h-4 w-4" />
              <span>{translate(university.city)}، {translate(university.country)}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-unlimited-blue">
                <Book className="mx-auto h-8 w-8 mb-2" />
              </div>
              <div className="text-2xl font-bold">{university.programsCount}</div>
              <div className="text-gray-600">برنامج دراسي</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-unlimited-blue">
                <Award className="mx-auto h-8 w-8 mb-2" />
              </div>
              <div className="text-2xl font-bold">
                {university.globalRanking ? `#${university.globalRanking}` : 'غير مصنفة'}
              </div>
              <div className="text-gray-600">التصنيف العالمي</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-unlimited-blue">
                <Users className="mx-auto h-8 w-8 mb-2" />
              </div>
              <div className="text-2xl font-bold">{university.students.toLocaleString()}+</div>
              <div className="text-gray-600">طالب</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-unlimited-blue">
                <Clock className="mx-auto h-8 w-8 mb-2" />
              </div>
              <div className="text-2xl font-bold">{new Date().getFullYear() - parseInt(university.founded)}</div>
              <div className="text-gray-600">سنة من تأسيسها</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-center mb-8">
          <Button asChild size="lg" className="bg-unlimited-blue hover:bg-unlimited-dark-blue text-lg px-8">
            <Link to={`/apply?university=${university.id}`}>
              تقديم طلب للجامعة
            </Link>
          </Button>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mb-8"
        >
          <TabsList className="grid grid-cols-3 w-full max-w-3xl mx-auto mb-8">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="programs">البرامج الدراسية</TabsTrigger>
            <TabsTrigger value="info">معلومات إضافية</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <InfoIcon className="h-5 w-5 text-unlimited-blue" />
                      عن الجامعة
                    </h2>
                    
                    <div className="mb-6">
                      <p className="mb-4 text-gray-600">
                        تأسست جامعة {university.nameAr || university.name} في عام {university.founded} وهي واحدة من الجامعات {translate(university.type)} الرائدة في {translate(university.city)}، {translate(university.country)}.
                      </p>
                      
                      <p className="mb-4 text-gray-600">
                        تتميز الجامعة بتقديم أكثر من {university.programsCount} برنامج دراسي في مختلف التخصصات، وتضم أكثر من {university.students.toLocaleString()} طالب من مختلف أنحاء العالم.
                      </p>
                      
                      <p className="text-gray-600">
                        تقدم الجامعة برامج باللغات: {university.languages?.map(lang => translate(lang)).join('، ')}، وتتمتع باعتراف عالمي وسمعة متميزة في مجال التعليم العالي.
                      </p>
                    </div>
                    
                    <h3 className="font-bold mb-2 text-unlimited-blue">الاعتمادات والتصنيفات</h3>
                    <div className="mb-6 text-gray-600">
                      <p className="mb-2">- معتمدة من مجلس التعليم العالي التركي (YÖK)</p>
                      <p className="mb-2">- معترف بها دولياً</p>
                      {university.globalRanking && (
                        <p>- مصنفة عالمياً في المرتبة #{university.globalRanking}</p>
                      )}
                    </div>
                    
                    <h3 className="font-bold mb-2 text-unlimited-blue">الميزات</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <School className="h-4 w-4 text-unlimited-blue" />
                        <span>برامج دراسية متنوعة</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Globe className="h-4 w-4 text-unlimited-blue" />
                        <span>لغات تدريس متعددة</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Building className="h-4 w-4 text-unlimited-blue" />
                        <span>مرافق حديثة</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FileCheck className="h-4 w-4 text-unlimited-blue" />
                        <span>شهادات معترف بها دولياً</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">معلومات الاتصال</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <Globe className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">الموقع الإلكتروني</p>
                          <a 
                            href={university.website} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-unlimited-blue hover:underline break-all"
                          >
                            {university.website}
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">العنوان</p>
                          <p className="text-gray-600">
                            {translate(university.city)}، {translate(university.country)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Phone className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">رقم الهاتف</p>
                          <p className="text-gray-600">+90 XXX XXX XXXX</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Mail className="h-5 w-5 text-unlimited-blue shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">البريد الإلكتروني</p>
                          <p className="text-unlimited-blue hover:underline">info@{university.website.replace('https://www.', '')}</p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <h2 className="text-xl font-bold mb-4">معلومات الدراسة</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold">الرسوم الدراسية</p>
                        <p className="text-gray-600">{university.fees}</p>
                      </div>
                      
                      <div>
                        <p className="font-semibold">لغات الدراسة</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {university.languages?.map((language, index) => (
                            <Badge key={index} variant="outline">
                              {translate(language)}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="font-semibold">الاعتمادات</p>
                        <p className="text-gray-600">
                          {university.accreditations ? 
                            university.accreditations.join(', ') : 
                            'معتمدة من مجلس التعليم العالي التركي (YÖK)'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="programs">
            <UniversityPrograms 
              programs={programs}
              universityId={university.id}
              universityName={university.nameAr || university.name}
            />
          </TabsContent>
          
          <TabsContent value="info">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">معلومات إضافية عن الجامعة</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-unlimited-blue">الأقسام الأكاديمية</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                        <span>كلية الطب والعلوم الصحية</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                        <span>كلية الهندسة والتكنولوجيا</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                        <span>كلية إدارة الأعمال والاقتصاد</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                        <span>كلية العلوم الاجتماعية والإنسانية</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                        <span>كلية الفنون والتصميم</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                        <span>كلية التربية</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-unlimited-blue">الخدمات الطلابية</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                        <span>سكن جامعي</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                        <span>مكتبات حديثة</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                        <span>مرافق رياضية</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                        <span>مراكز ترفيهية</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                        <span>عيادات صحية</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                        <span>خدمات استشارية</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-unlimited-blue">المنح الدراسية</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium">منح التفوق الأكاديمي</p>
                        <p className="text-gray-600">
                          تقدم الجامعة منح دراسية للطلاب المتميزين أكاديمياً تصل إلى 50% من الرسوم الدراسية.
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">منح الاحتياجات المالية</p>
                        <p className="text-gray-600">
                          تتوفر منح للطلاب ذوي الاحتياجات المالية تتراوح بين 10% و30% من الرسوم الدراسية.
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">منح الرياضة والفنون</p>
                        <p className="text-gray-600">
                          منح خاصة للطلاب المتميزين في المجالات الرياضية والفنية.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-unlimited-blue">متطلبات القبول</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                        <span>شهادة الثانوية العامة أو ما يعادلها</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                        <span>اختبار اللغة الإنجليزية (للبرامج الإنجليزية)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                        <span>اختبار اللغة التركية (للبرامج التركية)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                        <span>صورة جواز السفر سارية المفعول</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                        <span>صور شخصية حديثة</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-unlimited-blue"></div>
                        <span>السيرة الذاتية (للدراسات العليا)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-16">
          <SectionTitle 
            title="جامعات مشابهة قد تهمك"
            subtitle="اكتشف خيارات أخرى للدراسة في جامعات تركية خاصة مميزة"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {turkishUniversities
              .filter(uni => uni.id !== universityId && uni.city === university.city)
              .slice(0, 3)
              .map(uni => (
                <Card key={uni.id} className="overflow-hidden hover:shadow-lg transition-all">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={uni.image}
                      alt={uni.nameAr || uni.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-xl mb-2">{uni.nameAr || uni.name}</h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 ml-1" />
                      <span>{translate(uni.city)}، {translate(uni.country)}</span>
                    </div>
                    <div className="flex justify-between mb-4 text-sm">
                      <span className="flex items-center">
                        <Book className="h-4 w-4 ml-1 text-unlimited-blue" />
                        {uni.programsCount} برنامج
                      </span>
                      <span className="flex items-center">
                        <Award className="h-4 w-4 ml-1 text-unlimited-blue" />
                        {uni.globalRanking ? `#${uni.globalRanking}` : 'غير مصنفة'}
                      </span>
                    </div>
                    <Button asChild className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
                      <Link to={`/universities/${uni.id}`}>
                        عرض التفاصيل
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline">
              <Link to="/turkish-universities">
                عرض جميع الجامعات التركية
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UniversityDetails;
