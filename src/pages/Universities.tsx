
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { realUniversitiesService, RealUniversity } from '@/services/realUniversitiesService';
import { Search, MapPin, GraduationCap, Users, Globe, Loader2 } from 'lucide-react';

const Universities = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [universities, setUniversities] = useState<RealUniversity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || '');

  useEffect(() => {
    fetchUniversities();
  }, [searchTerm, selectedCountry]);

  const fetchUniversities = async () => {
    try {
      setIsLoading(true);
      
      let data: RealUniversity[];
      
      if (searchTerm || selectedCountry) {
        data = await realUniversitiesService.searchUniversities(searchTerm, selectedCountry);
      } else {
        data = await realUniversitiesService.getAllUniversities();
      }
      
      setUniversities(data);
    } catch (error) {
      console.error('Error fetching universities:', error);
      toast({
        title: "خطأ",
        description: "فشل في جلب بيانات الجامعات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUniversityClick = (universityId: number) => {
    navigate(`/universities/${universityId}`);
  };

  const handleApplyClick = (universityId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/apply?university=${universityId}`);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            الجامعات المتاحة
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            اكتشف أفضل الجامعات وابدأ رحلتك الأكاديمية معنا
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="ابحث عن الجامعات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">جميع البلدان</option>
            <option value="Turkey">تركيا</option>
          </select>
        </div>

        {/* Universities Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">جاري تحميل الجامعات...</p>
            </div>
          </div>
        ) : universities.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-4">
              لم يتم العثور على جامعات تطابق بحثك
            </p>
            <Button onClick={() => {
              setSearchTerm('');
              setSelectedCountry('');
            }}>
              إعادة ضبط البحث
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {universities.map((university) => (
              <Card 
                key={university.id}
                className="overflow-hidden transition-all hover:shadow-lg hover:border-blue-500 cursor-pointer"
                onClick={() => handleUniversityClick(university.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={university.image_url || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800'}
                    alt={university.name_ar || university.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  {university.programCount && (
                    <Badge className="absolute top-2 left-2 bg-green-600">
                      <GraduationCap className="w-3 h-3 mr-1" />
                      {university.programCount} برنامج
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-2">
                    {university.name_ar || university.name}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 ml-2" />
                    <span>{university.city}, {university.country}</span>
                  </div>
                  
                  {university.description_ar || university.description ? (
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                      {university.description_ar || university.description}
                    </p>
                  ) : null}
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    {university.founded_year && (
                      <div className="flex items-center gap-1">
                        <Globe className="h-4 w-4 text-gray-600" />
                        <div>
                          <p className="text-gray-600">تأسست:</p>
                          <p className="font-medium">{university.founded_year}</p>
                        </div>
                      </div>
                    )}
                    
                    {university.programCount && (
                      <div className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4 text-gray-600" />
                        <div>
                          <p className="text-gray-600">البرامج:</p>
                          <p className="font-medium">{university.programCount} برنامج</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-blue-500 hover:bg-blue-800"
                      onClick={() => handleUniversityClick(university.id)}
                    >
                      عرض التفاصيل
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={(e) => handleApplyClick(university.id, e)}
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

export default Universities;
