
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { realUniversitiesService } from '@/services/realUniversitiesService';
import { 
  Clock, 
  DollarSign, 
  Users, 
  Globe, 
  MapPin, 
  GraduationCap, 
  BookOpen,
  Calendar,
  ArrowRight,
  Loader2
} from 'lucide-react';

const ProgramDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [program, setProgram] = useState<any>(null);
  const [university, setUniversity] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProgramDetails();
    }
  }, [id]);

  const fetchProgramDetails = async () => {
    try {
      setIsLoading(true);
      
      // محاكاة جلب بيانات البرنامج
      const programs = await realUniversitiesService.getAllPrograms();
      const foundProgram = programs.find(p => p.id === parseInt(id!));
      
      if (!foundProgram) {
        throw new Error('البرنامج غير موجود');
      }
      
      setProgram(foundProgram);
      
      // جلب بيانات الجامعة
      const universityData = await realUniversitiesService.getUniversityWithPrograms(foundProgram.university_id);
      setUniversity(universityData);
      
    } catch (error) {
      console.error('Error fetching program details:', error);
      toast({
        title: "خطأ",
        description: "فشل في جلب بيانات البرنامج",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    navigate(`/apply?program=${id}`);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">جاري تحميل تفاصيل البرنامج...</p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!program) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              البرنامج غير موجود
            </h1>
            <Button onClick={() => navigate('/programs')}>
              العودة إلى البرامج
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <span>البرامج</span>
            <ArrowRight className="h-4 w-4" />
            <span className="text-blue-600">{program.name_ar || program.name}</span>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {program.name_ar || program.name}
              </h1>
              
              {university && (
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="h-5 w-5" />
                  <span className="text-lg">{university.name_ar || university.name}</span>
                  <span>•</span>
                  <span>{university.city}, {university.country}</span>
                </div>
              )}
              
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  {program.degree_type}
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  <Globe className="h-4 w-4 mr-1" />
                  {program.language}
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  <Clock className="h-4 w-4 mr-1" />
                  {program.duration} سنوات
                </Badge>
              </div>
            </div>
            
            <div className="lg:w-80">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      ${program.tuition_fee?.toLocaleString()}
                    </div>
                    <div className="text-gray-600">الرسوم الدراسية السنوية</div>
                  </div>
                  
                  <Button onClick={handleApply} className="w-full bg-blue-600 hover:bg-blue-700">
                    تقدم الآن
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* المحتوى الرئيسي */}
          <div className="lg:col-span-2 space-y-8">
            {/* وصف البرنامج */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  نبذة عن البرنامج
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {program.description_ar || program.description || 'لا يوجد وصف متاح للبرنامج حالياً.'}
                </p>
              </CardContent>
            </Card>

            {/* تفاصيل الجامعة */}
            {university && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    عن الجامعة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4 mb-4">
                    {university.image_url && (
                      <img 
                        src={university.image_url}
                        alt={university.name_ar || university.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <h3 className="font-bold text-lg mb-2">
                        {university.name_ar || university.name}
                      </h3>
                      <div className="text-gray-600 mb-2">
                        {university.city}, {university.country}
                      </div>
                      {university.founded_year && (
                        <div className="text-sm text-gray-500">
                          تأسست عام {university.founded_year}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {university.description_ar || university.description ? (
                    <p className="text-gray-700">
                      {university.description_ar || university.description}
                    </p>
                  ) : null}
                  
                  {university.website && (
                    <div className="mt-4">
                      <a 
                        href={university.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                      >
                        <Globe className="h-4 w-4" />
                        زيارة موقع الجامعة
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* الشريط الجانبي */}
          <div className="space-y-6">
            {/* معلومات البرنامج */}
            <Card>
              <CardHeader>
                <CardTitle>تفاصيل البرنامج</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-600">المدة</span>
                  </div>
                  <span className="font-medium">{program.duration} سنوات</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-600">لغة التدريس</span>
                  </div>
                  <span className="font-medium">{program.language}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-600">الرسوم السنوية</span>
                  </div>
                  <span className="font-medium text-blue-600">
                    ${program.tuition_fee?.toLocaleString()}
                  </span>
                </div>
                
                {program.quota && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-600">المقاعد المتاحة</span>
                    </div>
                    <span className="font-medium">{program.quota}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-600">الدرجة العلمية</span>
                  </div>
                  <span className="font-medium">{program.degree_type}</span>
                </div>
              </CardContent>
            </Card>

            {/* إجراءات سريعة */}
            <Card>
              <CardHeader>
                <CardTitle>إجراءات سريعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={handleApply}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  تقدم للبرنامج
                </Button>
                
                {university && (
                  <Button 
                    variant="outline"
                    onClick={() => navigate(`/universities/${university.id}`)}
                    className="w-full"
                  >
                    عرض الجامعة
                  </Button>
                )}
                
                <Button 
                  variant="outline"
                  onClick={() => navigate('/programs')}
                  className="w-full"
                >
                  برامج أخرى
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProgramDetails;
