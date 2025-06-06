
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { realUniversitiesService, RealProgram } from '@/services/realUniversitiesService';
import { Search, MapPin, Clock, DollarSign, Users, Globe, Loader2, GraduationCap } from 'lucide-react';

const Programs = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [programs, setPrograms] = useState<RealProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedDegreeType, setSelectedDegreeType] = useState(searchParams.get('degree') || '');
  const [selectedLanguage, setSelectedLanguage] = useState(searchParams.get('language') || '');

  useEffect(() => {
    fetchPrograms();
  }, [searchTerm, selectedDegreeType, selectedLanguage]);

  const fetchPrograms = async () => {
    try {
      setIsLoading(true);
      
      let data: RealProgram[];
      
      if (searchTerm || selectedDegreeType || selectedLanguage) {
        data = await realUniversitiesService.searchPrograms(searchTerm, {
          degreeType: selectedDegreeType,
          language: selectedLanguage
        });
      } else {
        data = await realUniversitiesService.getAllPrograms();
      }
      
      setPrograms(data);
    } catch (error) {
      console.error('Error fetching programs:', error);
      toast({
        title: "خطأ",
        description: "فشل في جلب بيانات البرامج",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProgramClick = (programId: number) => {
    navigate(`/programs/${programId}`);
  };

  const handleApplyClick = (programId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/apply?program=${programId}`);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            البرامج الدراسية
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            اكتشف البرامج الدراسية المتميزة في أفضل الجامعات
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="ابحث عن البرامج..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={selectedDegreeType}
            onChange={(e) => setSelectedDegreeType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">جميع الدرجات</option>
            <option value="Bachelor">البكالوريوس</option>
            <option value="Master">الماجستير</option>
            <option value="PhD">الدكتوراه</option>
          </select>
          
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">جميع اللغات</option>
            <option value="English">الإنجليزية</option>
            <option value="Turkish">التركية</option>
            <option value="Arabic">العربية</option>
          </select>
        </div>

        {/* Programs Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">جاري تحميل البرامج...</p>
            </div>
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-4">
              لم يتم العثور على برامج تطابق بحثك
            </p>
            <Button onClick={() => {
              setSearchTerm('');
              setSelectedDegreeType('');
              setSelectedLanguage('');
            }}>
              إعادة ضبط البحث
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Card 
                key={program.id}
                className="overflow-hidden transition-all hover:shadow-lg hover:border-blue-500 cursor-pointer"
                onClick={() => handleProgramClick(program.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="outline" className="bg-blue-50">
                      {program.degree_type}
                    </Badge>
                    <Badge variant="outline">
                      {program.language}
                    </Badge>
                  </div>
                  
                  <h3 className="font-bold text-xl mb-2">
                    {program.name_ar || program.name}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 ml-2" />
                    <span>{program.universityName}</span>
                  </div>
                  
                  {program.description_ar || program.description ? (
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                      {program.description_ar || program.description}
                    </p>
                  ) : null}
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-600" />
                      <div>
                        <p className="text-gray-600">المدة:</p>
                        <p className="font-medium">{program.duration} سنوات</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-gray-600" />
                      <div>
                        <p className="text-gray-600">الرسوم:</p>
                        <p className="font-medium text-blue-500">
                          ${program.tuition_fee.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    {program.quota && (
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-600" />
                        <div>
                          <p className="text-gray-600">المقاعد:</p>
                          <p className="font-medium">{program.quota}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-blue-500 hover:bg-blue-800"
                      onClick={() => handleProgramClick(program.id)}
                    >
                      <GraduationCap className="h-4 w-4 mr-2" />
                      عرض التفاصيل
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={(e) => handleApplyClick(program.id, e)}
                    >
                      تقدم الآن
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Programs;
